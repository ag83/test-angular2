const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
  provider:  {
        type: 'string',
        required: true
    }
});

module.exports = mongoose.model('Provider', providerSchema);