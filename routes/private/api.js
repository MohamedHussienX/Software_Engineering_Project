const db = require('../../connectors/db');

function handlePrivateBackendApi(app) {


    
  app.get('/employee/view' , async function(req , res) {
    // the idea of try and catch is to display error messages
    // and continue running your code without restarting your system
    try{
      const result = await db.raw(`select * from "backendTutorial"."Employee"`);
      console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });
  
  // you need to test it using thunderclient or postman
  app.post("/employee/new", async (req, res) => {
    
    try{
      console.log("req",req.body);
      // the below line check array destructuring slide in tutorial 1 slides 
      const {firstname, middlename, lastname, country, salary, birthdate } = req.body 
      const result = await db.raw(
        `insert into "backendTutorial"."Employee"(firstname, middlename, lastname, country, salary , birthdate)
          values('${firstname}', '${middlename}', '${lastname}', '${country}', ${salary}, '${birthdate}');`);
      return res.status(200).send('new employee has successfully added')
    }catch(err){
      console.log("eror message", err.message);
      return res.status(400).send("failed to add new employee")
    }
  
  });
  
  // there is huge difference between /employee/:id and /employee/id
  // try with and without colon : 
  // /employee/:sid then it is req.params.sid
  app.get('/employee/:id', async (req, res)=> {
    try {
      // `` backtick syntax check tutorial 1 slides 
      const query = `select * from "backendTutorial"."Employee" where id = ${req.params.id}`;
      console.log("req.params id",req.params.id);
      const result = await db.raw(query);
      return res.status(200).send(result.rows);
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send("failed to get this employee id");
    }
  })
  
  
  app.delete('/employee/:id', async (req, res)=> {
    
    try {
      const query = `delete from "backendTutorial"."Employee" where id=${req.params.id}`;
      const result = await db.raw(query);
      return res.status(200).send("deleted succesfully");
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send("failed to delete employee");
    }
  
  })
  
  app.put('/employee/:id', async (req, res)=> {
    
    try {
      //console.log(req.body);
      const {country , birthdate  , salary} = req.body;
      console.log(req.body,salary);
      const query = `update "backendTutorial"."Employee"
                         set country = '${country}',
                         salary = '${salary}',
                         birthdate = '${birthdate}'
                         where id = ${req.params.id}`
      const result = await db.raw(query);
      return res.status(200).send("updated succesfully");
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send("failed to update employee");
    }
  
  });
  };


// makes function public and accessible by other classes 
module.exports = {handlePrivateBackendApi};
