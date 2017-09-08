let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let MenuComponent = require('../../controller/admin/menu.js');

router.get('/', MenuComponent.getMenu);
router.post('/', MenuComponent.addMenu);
router.post('/delete_batch', MenuComponent.deleteBatch);
router.put('/exchange_menu', MenuComponent.exchangeMenu);

router.get('/:_id', MenuComponent.getItem);
router.put('/:_id', MenuComponent.updateItem);
router.delete('/:_id', MenuComponent.deleteItem);

module.exports = router;

