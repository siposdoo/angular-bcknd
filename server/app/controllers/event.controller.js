const Event = require("../models/event.model.js");

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Event title can not be empty",
    });
  }
  // Validate request
  if (!req.body.location) {
    return res.status(400).send({
      message: "Event location can not be empty",
    });
  }

  // Validate request
  if (!req.body.date) {
    return res.status(400).send({
      message: "Event date can not be empty",
    });
  }
  // Create a Event
  const event = new Event({
    title: req.body.title,
    coordinates: req.body.coordinates,
    location: req.body.location,
    date: req.body.date,
  });

  // Save Event in the database
  event
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
};

// Retrieve and return all events from the database.
exports.findAll = (req, res) => {
  Event.find()
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Find a single event with a eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving event with id " + req.params.eventId
        });
    });  
};

// Update a event identified by the eventId in the request
exports.update = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
          message: "Event title can not be empty",
        });
      }
      // Validate request
      if (!req.body.location) {
        return res.status(400).send({
          message: "Event location can not be empty",
        });
      }
    
      // Validate request
      if (!req.body.date) {
        return res.status(400).send({
          message: "Event date can not be empty",
        });
      }
  // Find event and update it with the request body
  Event.findByIdAndUpdate(
    req.params.eventId,
    {
      title: req.body.title ,
      location: req.body.location ,
      date: req.body.date ,
      coordinates: req.body.coordinates ,
     },
    { new: true }
  )
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Error updating event with id " + req.params.eventId,
      });
    });
};

// Delete a event with the specified eventId in the request
exports.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      res.send({ message: "Event deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Could not delete event with id " + req.params.eventId,
      });
    });
};
