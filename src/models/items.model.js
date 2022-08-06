var dbConn  = require('../../config/db.config');

var items = function(items){
    this.item_name    =   items.name;
    this.item_id     =   items.id;
    this.item_price   =  items.price;
   
}

// get all items
items.getAllitems = (result) =>{
    dbConn.query('SELECT * FROM items WHERE is_deleted=0', (err, res)=>{
        if(err){
            console.log('Error while fetching items', err);
            result(null,err);
        }else{
            console.log('items fetched successfully');
            result(null,res);
        }
    })
}

// get items by ID from DB
items.getitemsByID = (id, result)=>{
    dbConn.query('SELECT * FROM items WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching items by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// add new items
items.additems = (itemsReqData, result) =>{
    dbConn.query('INSERT INTO items SET ? ', itemsReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('items added successfully');
            result(null, res)
        }
    })
}

// update items
items.updateitems = (id, itemsReqData, result)=>{
    dbConn.query("UPDATE items SET item_name=?,item_id=?,item_price=? WHERE id = ?", [itemsReqData.item_name,itemsReqData.item_id,itemsReqData.item_price, id], (err, res)=>{
        if(err){
            console.log('Error while updating the items');
            result(null, err);
        }else{
            console.log("items updated successfully");
            result(null, res);
        }
    });
}

// delete items
items.deleteitems = (id, result)=>{
    // dbConn.query('DELETE FROM items WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the items');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE items SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Error while deleting the items');
            result(null, err);
        }else{
            console.log("items deleted successfully");
            result(null, res);
        }
    });
}

module.exports = items;