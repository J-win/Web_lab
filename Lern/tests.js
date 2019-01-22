var db = require("mysql");
var connection = db.createConnection({
  host:"localhost",
  user:"alex",
  password:"Qwerty123",
  database:"world"
});
connection.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connection established");
});
connection.query("select * from country", function(err, rows) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(rows);
  console.log(JSON.stringify(rows));
});
