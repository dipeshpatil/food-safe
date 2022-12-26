const express = require("express");
const request = require("request");
const config = require("config");

const router = express.Router();

const { SERVER_ERROR } = require("./../../strings/errors.json");

const SubstanceUtil = require("./../../utils/SubstanceUtil");
const API_ENDPOINT = config.get("api.substance.endpoint");

/**
 * @route   GET api/substance
 * @desc    Get substances list
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    request(API_ENDPOINT, (error, response, body) => {
      if (error) res.status(500).send(SERVER_ERROR);
      res
        .status(response.statusCode)
        .json(SubstanceUtil.getSubstancesList(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR);
  }
});

module.exports = router;
