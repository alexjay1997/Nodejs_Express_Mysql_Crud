const mysql =  require('mysql');
const express =  require('express');
const cors = require('cors') //you need to `npm install cors` first
const path = require('path');
const router = express.Router();
const basicAuth = require('express-basic-auth'); //use basic auth for accessing api

var app = express();
const bodyparser = require('body-parser');

app.use(cors()) //enable cors requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(basicAuth({
    users: { 'admin':'test' },  //or  Basic YWRtaW46dGVzdA==  "Basic Auth"
    challenge: true,// login first 
    ////realm: 'foo',
    unauthorizedResponse: getUnauthorizedResponse
}))
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('UnAuthorized!')
        : 'No credentials provided'
}
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
    //res.header('Access-Control-Allow-Origin', '*');
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
 // delete data by id for front end
app.get('/delete_tests/:id' ,( req ,res )=> {
    mysqlConnection.query( ' DELETE FROM test WHERE id = ?',[req.params.id] ,( err , rows , fields ) => {
    //res.header('Access-Control-Allow-Origin', '*');

     if(!err)
     res.send("Deleted Successfully!"+"<a href=http://localhost:3000>"+"  "+'Go back'+"</a>");
     else
     console.log(err);
    })
 });
//update data by id
app.put('/tests/:id',( req ,res )=> {
    const name = req.body.name;
    const address = req.body.address;
    const age = req.body.age;
    mysqlConnection.query("UPDATE test SET name=?, address=?,age=? WHERE id=?",[name,address,age,req.params.id],(err,rows)=>{
    res.header('Access-Control-Allow-Origin', '*');
     if(!err){
        res.send('Update Sucessfully!');
    }
     else{
     console.log(err);
     }
    })
 }); 

 //edit page
app.get('/edit/:id',function(req,res,next){
    mysqlConnection.query( ' SELECT * FROM test  where id =?' ,[req.params.id] ,( err , rows , fields ) => {
        if(!err){
        res.render('edit',{
            datas:rows
        })
        // res.render('edit', {
        //     title: 'Edit suer', 
        //     //data: rows[0],
        //     id: data[0].id,
        //     name: data[0].name,
        //     age: data[0].age,
        //     address: data[0].address                    
        // })

    
    
    }
        else{
            res.send('Error Sorry! you cant access this page!');

        }
    });

});
 
//add template 
app.get('/add/',function(req,res,next){
  
      
        res.render('add',{
        
        })
        // res.render('edit', {
        //     title: 'Edit suer', 
        //     //data: rows[0],
        //     id: data[0].id,
        //     name: data[0].name,
        //     age: data[0].age,
        //     address: data[0].address                    
        // })

    })
 
//add new user function front end
router.post('/add_new',( req ,res )=> {
        const name = req.body.name;
        const address = req.body.address;
        const age = req.body.age;
        mysqlConnection.query("insert into test(name,address,age) values(?,?,?)",[name,address,age],(err,rows)=>{
        //res.header('Access-Control-Allow-Origin', '*');
         if(!err){
            res.send('Insert Sucessfully!'+"<a href=http://localhost:3000>"+"  "+'Go back'+"</a>");
        }
         else{
         console.log(err);
         }
        })
     }); 

 //add ejs templating for front end
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//update data in template
//render data to html template
router.get('/',function(req,res){
    mysqlConnection.query( ' SELECT * FROM test ' ,( err , rows , fields ) => {
        if(!err){
        res.render('index',{
            datas:rows
        })
        }
        else{
            res.send('Error Sorry! you cant access this page!');

        }
    });

});
// Update Product
router.post('/update', function(req, res){


 // update query product update short way!
    // mysqlConnection.query("update test SET name='"+req.body.name+"', address='"+req.body.address+"',age='"+req.body.age+"' Where id='"+req.body.id+"'",(err,rows)=>{     
    //     // redirect to products list page
    //     console.log(err);
    //     res.redirect('/')
    // });

// get id user
   var id = req.body.id;
   var name = req.body.name;
   var address = req.body.address;
   var age = req.body.age;
   var updateQuery = `UPDATE test SET name = "${name}", address = "${address}", age = "${age}" WHERE id = "${id}"`;
    mysqlConnection.query(updateQuery, function(error,result){
       //  req.flash('success', 'User update successfully!')
        res.send("Updated Successfully!"+"<a href=http://localhost:3000>"+"  "+'Go back'+"</a>");
        // redirect to products list page
        //res.redirect('/')
    });
});



  app.use('/', router);

