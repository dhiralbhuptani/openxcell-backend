const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  eventName: { 
    type: String, 
    required: true 
  },
  eventDate: { 
    type: Date,    
    required: true 
  },
  eventAddress: {
    type: String,
    required: true
  },
  eventCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Event', EventSchema);