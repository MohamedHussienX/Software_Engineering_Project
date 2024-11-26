// auth.js/middleware/DB-Tutorial-Backend
// ../ means parent folder of the parent folder of your current file
// we are searching for files and folders inside DB-Tutorial-Backend
// db connects to postgres database using knex library
// you need to change password inside the db.js file 
// inside connectors folder 
const db = require('../connectors/db');

async function authMiddleware(req, res, next) {
  // whenever you are using await you need to 
  // add keyword async before function
  // any database operation is considered to be async function
  // async function is low priority meaning
  // it will be executed later
  // check tutorial 6 Ex 6.2 if you don't remember async function 

  // db.raw execute query 
  // the below query tells if table in a particular schema exists or not

  let result = await db.raw(`select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'backendTutorial' 
    and table_name = 'Employee');`);
  // since the status variable depends on result
  // Thus, we need to execute result first then status
  // we added the await keyword to wait for execution of result first
  // then start to execute the line that contains status
  
  // result is object with many properties.
  // the output of query is in property rows
  // rows has type of array of object  
  //return res.send(result.rows[0].exists);
  //return res.send(result.rows[0].exists);
  let status = result.rows[0].exists;
  // uncomment the below line to determine why we used result.rows[0].exists
  //return res.send(result);

  if(status == false ){
    return res.send("you need to create database table Employee")
  }
  // If all checks have passed, we can consider the user authenticated
  // next() : if code reachs to next() then proceed to private api
  next();
};


module.exports = {authMiddleware}