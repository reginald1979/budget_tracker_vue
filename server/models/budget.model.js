const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    type: {
        type:String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},
    {timestamps: true, collection: 'budget'});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;