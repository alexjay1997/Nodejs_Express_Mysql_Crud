const mysql =  require('mysql');
const express =  require('express');
const cors = require('cors') //you need to `npm install cors` first
const path = require('path');
const router = express.Router();

var app = express();
const bodyparser = require('body-parser');

app.use(cors()) //enable cors requests
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        port:'3307',//port is 3307 because i have also a wamp server installed in my computer! the default is 3306!
        database:'Nodejs_Mysql'
     
    });

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('db connection success!');
    else
    console.log('db connection failed! \n Error:'+ JSON.stringify(err,undefined,2));
}) ;  

app.listen(3000,() =>console.log( ' Express server is runnig at port no : 3000 ' ) ) ;

//get all data
app.get('/tests' ,( req ,res )=> {
   mysqlConnection.query( ' SELECT * FROM test ' ,( err , rows , fields ) => {
    res.header('Access-Control-Allow-Origin', '*');
    if(!err)
    res.send(rows);
    //console.log(rows);
    else
    console.log(err);
   })
}); 
// select data by id
app.get('/tests/:id' ,( req ,res )=> {
    mysqlConnection.query( ' SELECT * FROM test WHERE id = ?',[req.params.id] ,( err , rows , fields ) => {
    res.header('Access-Control-Allow-Origin', '*');
     if(!err)
     res.send(rows);
     //console.log(rows);
     else
     console.log(err);
    })
 }); 
 //insert new data
 app.post('/tests',( req ,res )=> {
    const name = req.body.name;
    const address = req.body.address;
    const age = req.body.age;
    mysqlConnection.query("insert into test(name,address,age) values(?,?,?)",[name,address,age],(err,rows)=>{
    res.header('Access-Control-Allow-Origin', '*');
     if(!err){
        res.send('Insert Sucessfully!');
    }
     else{
     console.log(err);
     }
    })
 }); 
// delete data by id
app.delete('/tests/:id' ,( req ,res )=> {
    mysqlConnection.query( ' DELETE FROM test WHERE id = ?',[req.params.id] ,( err , rows , fields ) => {
    res.header('Access-Control-Allow-Origin', '*');
     if(!err)
     res.send("Deleted Successfully!");
     else
     console.log(err);
    })
 });


 router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views'+'/index.html'));

  });
  app.use('/', router);
  
