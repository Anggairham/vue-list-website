require('dotenv').config();
module.exports = app => {
  const controllers = require('../controllers/website_list.controller.js');

  var router = require('express').Router();

  // Create
  router.post(`/`, controllers.create);

  // Retrieve all
  router.get(`/`, controllers.findAll);

  // Retrieve a single data with id
  router.get(`/:id`, controllers.findOne);

  // Update a data with id
  router.put(`/:id`, controllers.update);

  // Delete a data with id
  router.delete(`/:id`, controllers.delete);

  // Delete all data
  router.delete(`/`, controllers.deleteAll);

  app.use(`${process.env.BASE_URL}/api/website_lists`, router);
};
