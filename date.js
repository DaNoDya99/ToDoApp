
module.exports.getDate = getDate;

function getDate() {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const day = date.toLocaleDateString("en-us", options);
  return day;
}
