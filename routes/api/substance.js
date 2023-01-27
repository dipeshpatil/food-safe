const express = require('express');
const request = require('request');
const config = require('config');

const router = express.Router();
const {check, validationResult} = require('express-validator');

const ObjectId = require('mongoose').Types.ObjectId;

// Middlewares
const auth = require('./../../middleware/auth');

// Models
const Substance = require('../../models/Substance');

const {SERVER_ERROR} = require('./../../strings/errors.json');

const SubstanceUtil = require('./../../utils/SubstanceUtil');
const API_ENDPOINT = config.get('api.substance.endpoint');

/**
 * @route   GET api/substance
 * @desc    Get substances list
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    request(API_ENDPOINT, (error, response, body) => {
      if (error) res.status(500).send(SERVER_ERROR);
      res.status(response.statusCode).json(SubstanceUtil.getSubstancesList(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR);
  }
});

/**
 * @route   POST api/substance
 * @desc    Add a substance to db
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required').not().isEmpty(),
      check('iconFlag', 'iconFlag is required').not().isEmpty(),
      check('flag', 'flag is required').not().isEmpty(),
      check('purpose', 'purpose is required').not().isEmpty(),
      check('additionalData', 'additionalData is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const substanceExists = await Substance.findOne({
        name: req.body.name,
        user: ObjectId(req.user.id),
      });

      if (!substanceExists) {
        const newSubstance = {
          user: req.user.id,
          name: req.body.name,
          iconFlag: req.body.iconFlag,
          flag: req.body.flag,
          purpose: req.body.purpose,
          healthConcern: req.body.healthConcern,
          additionalData: req.body.additionalData,
        };
        const substance = new Substance(newSubstance);
        await substance.save();

        res.json(substance);
      } else {
        res.json({msg: 'Substance Already Exists!'});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
