const express = require('express');
const checkAuth = require('../middleware/check-auth');
const EventsController = require('../controllers/events.controller');
const router = express.Router();

// Event Routes
router.post('', checkAuth, EventsController.createEvent);
router.put('/:id', checkAuth, EventsController.updateEvent);
router.get('', EventsController.getEvents);
router.get('/:id', EventsController.getSingleEvent);
router.get('/search/:query', EventsController.getSearchedEvents);
router.delete('/:id', checkAuth, EventsController.deleteEvent);

module.exports = router;