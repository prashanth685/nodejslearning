const { Categories } = require("./new");

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
module.exports = add;

Categories.map((i) => {
  console.log(i);
});
