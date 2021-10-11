const db = require("../models");
const Website_list = db.website_lists;
const Op = db.Sequelize.Op;

// Create and Save a new Data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Nama can not be empty!"
    });
    return;
  }

  // Create a Data
  const request_data = {
    nama: req.body.nama ? req.body.nama : '',
    url: req.body.url ? req.body.url : '',
  };
  const options = {
    benchmark:true,
    // fields:['nama','url']
  };

  // Save Data in the database
  Website_list.create(request_data,options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating data."
      });
    });
};

// Retrieve all Data from the database.
exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;

  Website_list.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

// Find a single Data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Website_list.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id
      });
    });
};

// Update a Data by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  Website_list.update(req.body, {
    where: { id: id },
  })
  .then(num => {
    if (num == 1) {
        // const result = await Website_list.findByPk(id);
       
        res.send({
          // data : result,
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      });
    });
};

// Delete a Data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Website_list.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
};

// Delete all Data from the database.
exports.deleteAll = (req, res) => {
  Website_list.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Data were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all data."
      });
    });
};

// find all published Data
exports.findAllPublished = (req, res) => {
  Website_list.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};