# members.

A members-only message board. You need an account to read the messages, and only members can see who wrote them and when.

**Live site:** [https://members-ten-chi.vercel.app/](https://members-ten-chi.vercel.app/)

Built as part of [The Odin Project](https://www.theodinproject.com/) Node.js curriculum.

## Features

- Sign up and log in
- Write messages with a title and text
- Join the club with a secret passcode to unlock authors and timestamps
- Delete your own messages

## Who sees what

|                         | Message | Author and time   | Delete       |
| ----------------------- | ------- | ----------------- | ------------ |
| Visitor (not logged in) | no      | no                | no           |
| Logged-in user          | yes     | own messages only | own messages |
| Member                  | yes     | yes               | own messages |

## Try it

1. Sign up for an account on the live site.
2. Open **Join the club** and enter the membership passcode:

   ```
   let-me-in
   ```

3. Go back to the home page to see who wrote each message and when.

## Tech stack

- Node.js and Express
- EJS templates
- PostgreSQL
- Deployed on [Vercel](https://vercel.com/)
