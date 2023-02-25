const express = require("express");
const helpers = require("./services/fileHelper");
const bigW = require("./services/bigw_scraper");

const app = express();
const PORT = 3000;

setInterval(() => {
  bigW().then((data) => {
    if (data) {
      helpers.write_json_toFile("./database/bigw_database.json", data);
      console.log("Saved data sucessfully");
    } else {
      console.log("Failed to save data");
    }
  });
}, 1000 * 60 * 60 * 3);

app.listen(PORT || 8000, () => {
  console.log(`server started ${PORT}`);
});
