document.querySelectorAll("time").forEach((el) => {
  el.textContent = new Date(el.dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
});
