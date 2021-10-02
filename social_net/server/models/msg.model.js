const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const msgSchema = new Schema({
    room: {
        type: Array,
        items: { type: 'string' }
    },
    messages: {
        type: Array,
        items: { type: 'string' }
    },
}, {
    timestamps: true,
});

const MSG = mongoose.model('Message', msgSchema);

module.exports = MSG;