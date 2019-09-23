const pg = require('pg')
const connectingString = `postgres://postgres:1234@localhost:5432/postgres`;
const client = new pg.Client(connectingString);

client.connect(function(err,res){
    if(err){
        console.log('connection to database failed',err);
    }
    else{
        console.log('connected to  BUS-Database');
    }
});

function createuser(user){
    let insertQuery = `INSERT INTO bus.info (busnumber,service,departure,"from",destination,price,"option") VALUES ('${user.busnumber}','${user.service}','${user.departure}','${user.from}','${user.destination}','${user.price}','${user.option}')`;
    console.log('Inserted Query------>',insertQuery);
    client.query(insertQuery,function(err,res){
        if(err){
            console.log('INSERTION Query Failed');
        }
        else{
            console.log('Inserted',res.rows);
        }
    });
}

function listuser(fn){
    let selectQuery = `SELECT * FROM bus.info`;
    console.log('Selected Query ----->',selectQuery);
    client.query(selectQuery,function(err,res){
        if(err){
            fn({'error':"error"});
        }
        else{
            fn(res.rows);
        }
    });
}
function deleteuser(dl){
    let deleteQuery = `DELETE FROM bus.info WHERE busnumber=${dl.busnumber}`;
    console.log('Delected Query----->',deleteQuery);
    client.query(deleteQuery,function(err,res){
        if(err){
            console.log('Error while deleting User');
        }
        else{
            console.log(res.rows);
        }
    });
}
function selectbus(fn,callback){
     let selectQuery = `SELECT * FROM bus.info WHERE "from"='${fn.from}' AND "destination"='${fn.destination}' AND "option"='${fn.option}'`;
         client.query(selectQuery,function(err,res){
             if(err){
                 callback('{error:error}',err);
             }
             else{
                 callback(res.rows);
             }
         });
     }

     module.exports = {createuser:createuser,listuser:listuser,deleteuser:deleteuser,selectbus:selectbus};
