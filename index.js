const mysql =  require('mysql');
const express =  require('express');

var app = express();

const bodyparser = require('body-parser');

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
app.get('/tests' ,( req ,res )=> {
   mysqlConnection.query( ' SELECT * FROM test ' ,( err , rows , fields ) => {

    if(!err)
    res.send(rows);
    //console.log(rows);
    else
    console.log(err);
   })
}); 