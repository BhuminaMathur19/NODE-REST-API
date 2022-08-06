const itemsModel = require('../models/items.model');

// get all items list
exports.getitemsList = (req, res)=> {
    //console.log('here all items list');
    itemsModel.getAllitems((err, items) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('items', items);
        res.send(items)
    })
}

// get items by ID
exports.getitemsByID = (req, res)=>{
    //console.log('get items by id');
    itemsModel.getitemsByID(req.params.id, (err, items)=>{
        if(err)
        res.send(err);
        console.log('single item data',items);
        res.send(items);
    })
}

// add new item
exports.addNewitems = (req, res) =>{
    const itemsReqData = new itemsModel(req.body);
    console.log('itemsReqData', itemsReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        itemsModel.addNewitems(itemsReqData, (err, items)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Items added Successfully', data: items.insertId})
        })
    }
}

// update items
exports.updateitems = (req, res)=>{
    const itemsReqData = new itemsModel(req.body);
    console.log('itemsReqData update', itemsReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        itemsModel.updateitems(req.params.id, itemsReqData, (err, items)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'items updated Successfully'})
        })
    }
}

// delete items
exports.deleteitems = (req, res)=>{
    itemsModel.deleteitems(req.params.id, (err, items)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'items deleted successully!'});
    })
}

