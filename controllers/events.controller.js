const Event = require('../models/event.model');

// POST Events data
exports.createEvent = (req, res) => {
  const event = new Event({
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    eventAddress: req.body.eventAddress,
    eventCreator: req.userData.userId
  });  
  event.save().then(newEventData => {    
    res.status(201).json({
      message: 'Event created successfully',
      eventCreated: {
        ...newEventData,
        eventId: newEventData._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Event cannot be created.' + error
    })
  });  
};

// PUT Event data
exports.updateEvent = (req, res) => {
  const event = new Event({
    _id: req.body.id,
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    eventAddress: req.body.eventAddress,
    eventCreator: req.userData.userId
  });
  // console.log(event)
  Event.updateOne({
    _id: req.params.id,
    eventCreator: req.userData.userId
  }, event)
  .then((result) => {
    if (result.n > 0) {
      res.status(200).json({      
        message: 'Event Updated!'
      });
    } else {
      res.status(401).json({      
        message: 'Not Authorized'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not update Event.' + error
    });
  });
};

// GET Events data
exports.getEvents = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const eventQuery = Event.find();
  let allEvents;
  if (pageSize && currentPage) {
    eventQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  eventQuery
  .then(documents => {
    allEvents = documents;
    return Event.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Event fetched successfully',
      events: allEvents,
      getAllEventsCount: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not fetch events.'
    });
  });
};

// GET single event data
exports.getSingleEvent = (req, res) => {
  Event.findById(req.params.id)
  .then(getEvent => {
    if (getEvent)
      res.status(200).json(getEvent);
    else
      res.status(404).json({ message: 'Event not found!' });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not fetch an Event.'
    });
  });
};

// GET event data with search query
exports.getSearchedEvents = (req, res) => {
  const searchEvent = Event.find({
    eventName: {
      $regex: req.params.query,
      $options: 'i'
    }
  })
  .limit(5);
  searchEvent.exec((err, events) => {
    if (err)
      res.status(404).json({ message: 'No Events found.' });
    else
      res.status(200).json(events);
  });
};

// DELETE events data
exports.deleteEvent = (req, res) => {
  Event.deleteOne({
    _id: req.params.id,
    eventCreator: req.userData.userId
  })
  .then(result => {
    if (result.n > 0) {    
      res.status(200).json({
        message: 'Event Deleted.'
      });
    } else {
      res.status(401).json({
        message: 'Not authorized to delete Event.'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not delete Event.'
    });
  });
};