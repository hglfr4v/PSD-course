const express = require("express");

const petController = require("../controllers/pet");
const router = express.Router();


/**
 * @swagger
 * /pet:
 *  get:
 *      description: a simple get
 *  responses:
 *      '200':
 *          description: get complete
 */

router.get('/pet', petController.getPets);

router.post('/pet', petController.postPet);

module.exports = router;