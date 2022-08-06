const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items.controller');

// get all items
router.get('/', itemsController.getitemsList);

// get items by ID
router.get('/:id',itemsController.getitemsByID);

// add new items
router.post('/', itemsController.addNewitems);

// update items
router.put('/:id', itemsController.updateitems);

// delete items
router.delete('/:id',itemsController.deleteitems);

module.exports = router;