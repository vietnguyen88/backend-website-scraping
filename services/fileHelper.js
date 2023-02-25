const fs = require("fs");

const write_json_toFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const read_json_fromFile = (filename) => {
  try {
    const data = fs.readFileSync(filename);
    const output = JSON.parse(data);
    return output;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {read_json_fromFile, write_json_toFile}