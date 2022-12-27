const fs = require("fs");

const HTMLParser = require("node-html-parser");
const config = require("config");

const URL = config.get("api.substance.url");

class Substance {
  constructor(substanceObj = {}) {
    const {
      cell_0,
      cell_0_icon_classname,
      cell_0_rich,
      cell_1,
      cell_2,
      cell_3,
    } = substanceObj;

    this.name = cell_0;
    this.iconFlag = cell_0_icon_classname;
    this.flag = cell_1;
    this.purpose = cell_2;
    this.healthConcern = cell_3;
    this.additionalData = this.extractData(cell_0_rich);
  }

  extractData(dataString = "") {
    const node = HTMLParser.parse(dataString).firstChild;
    const nodeAttributes = node.attrs;
    return {
      substitution: nodeAttributes["data-entity-substitution"],
      type: nodeAttributes["data-entity-type"],
      uuid: nodeAttributes["data-entity-uuid"],
      href: URL + nodeAttributes["href"],
    };
  }
}

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
