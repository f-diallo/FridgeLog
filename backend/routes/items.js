const express = require('express'); //import package
const router = express.Router();
const Item = require('../models/Item');


//CREATE/SUBMIT A NEW ITEM
router.post('/', async (req, res) => {//retrieves message, can use post, delete, or patch to do other functions
    const item = new Item(req.body);
    try {
        const savedItem = await item.save()//; 
        res.json(savedItem);
    } catch(err) {
        res.json({message: err});
        console.log("IT FAILEDDD")
    }
});


//READ/VIEW ALL THE ITEMS
router.get('/', async (req, res) => {    
    try{
        const items = await Item.find();    //can 'limit' number of items returned
        res.json(items); 
    }catch{
        res.json({message: err});
    }
});


//READ/VIEW SPECIFIC ITEM
router.get('/:itemId', async (req, res) => {
    const item = await Item.findById(req.params.itemId);
    try {
        res.json(item);
    } catch(err) {
        res.json({message: err});
    }
});


//UPDATE AN ITEM
router.patch('/:itemId', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            {_id: req.params.itemId}, 
            {$set: req.body}
        );
        res.json(updatedItem);
    } catch(err) {
        res.json({message: err});
    }

});


//DELETES/REMOVES ITEM
router.delete('/:itemId', async (req, res) => {
    try {
        const removedItem = await Item.deleteOne({_id: req.params.itemId});
        res.json(removedItem);
    } catch(err) {
        res.json({message: err});
    }

});

module.exports = router;

