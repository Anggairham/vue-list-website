require('dotenv').config();
module.exports = app => {
  const tutorials = require('../controllers/tutorial.controller.js');

  var router = require('express').Router();

  // Create a
  router.post(`/`, tutorials.create);

  // Retrieve all
  router.get(`/`, tutorials.findAll);

  // Retrieve all published
  router.get(`/published`, tutorials.findAllPublished);

  // Retrieve a single data with id
  router.get(`/:id`, tutorials.findOne);

  // Update a data with id
  router.put(`/:id`, tutorials.update);

  // Delete a data with id
  router.delete(`/:id`, tutorials.delete);

  // Delete all data
  router.delete(`/`, tutorials.deleteAll);

  app.use(`${process.env.BASE_URL}/api/tutorials`, router);
};
