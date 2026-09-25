const LocalStrategy = require("passport-local");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

async function verify(req, username, password, done) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    const user = rows[0];
    if (!user) {
      return done(null, false, req.flash("messages", "Incorrect username"));
    }

    // Validate the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, req.flash("messages", "Incorrect password"));
    }

    return done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
}

const strategy = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  verify
);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});
