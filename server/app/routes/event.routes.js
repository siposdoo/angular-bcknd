
module.exports = (app) => {
    const events = require('../controllers/event.controller.js');

    // Create a new Event
    app.post('/events', events.create);

    // Retrieve all Event
    app.get('/events', events.findAll);

    // Retrieve a single Event with noteId
    app.get('/event/:eventId', events.findOne);

    // Update a Event with noteId
    app.put('/event/:eventId', events.update);

    // Delete a Event with noteId
    app.delete('/event/:eventId', events.delete);
}