const fs = require("fs");
const Substance = require("./Substance");

class SubstanceUtil {
  static getSubstancesList(response) {
    const substancesList = [];
    const { table_data } = JSON.parse(response);

    table_data.forEach((data) => {
      substancesList.push(new Substance(data));
    });

    fs.writeFileSync("response.json", JSON.stringify(substancesList, null, 2));
    return substancesList;
  }
}

module.exports = SubstanceUtil;
