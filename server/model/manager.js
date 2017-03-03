const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  manager:  {
        type: 'string',
        required: true
    }
});

module.exports =  mongoose.model('Manager', managerSchema);