const mongoose= require('mongoose');


const ItemSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        //required: false
    },
    quantity: {   //weight, volume, number
        type: String,
        required: true
    },
    expDate: {
        type: String,
        default: Date.now//how do i make default two weeks and format date differently
    }
    //itemImage: {} maybe add later
});

module.exports= mongoose.model('Items', ItemSchema);