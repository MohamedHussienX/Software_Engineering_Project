const db = require('../../connectors/db');
const crypto = require('crypto');

function handlePrivateBackendApi(app) {
  
  app.get('/employee/view' , async function(req , res) {
    try{
      const result = await db.raw(`select * from "backendTutorial"."Employee" order by id`);
      //console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });   //HELLO

  app.get('/employee/search/:countryName' , async function(req , res) {
    try{
      const query = `select * from "backendTutorial"."Employee" where country like '%${req.params.countryName}%'`;
      const result = await db.raw(query);
      //console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });
  
  app.post("/api/v1/users/new", async (req, res) => {
    
    try{
      console.log("req",req.body);
      const {userId, username, email, password, role} = req.body 
      const hashedpassword=crypto.createHash('sha256').update(password).digest('hex')
      const result = await db.raw(
        `insert into "project"."users"(userID, username, email, password, role , createdAt)
          values('${userId}', '${username}', '${email}', '${hashedpassword}',' ${role}', '${new Date().toISOString()}');`);
      return res.status(200).send('new user has successfully added')
    }catch(err){
      console.log("eror message", err.message);
      return res.status(400).send("failed to add new user")
    }
  
  });
  
  app.get('/employee/:id', async (req, res)=> {
    try {
      const query = `select * from "backendTutorial"."Employee" where id = ${req.params.id}`;
      console.log(req.params.id);
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

  app.put('/employee/update' , async (req , res) => {
    try{
        const empArray = req.body.row;
        console.log("empArray" , empArray);
        console.log(req.body);
        for( let i = 0; i < empArray.length; i++){
            embObj = empArray[i];
            let {id,salary } = embObj;
            await db.raw(
                `update "backendTutorial"."Employee"
                set salary = ${salary}
                where id = ${id}`);
        }
        return res.status(200).send("updated Successfully");
    }catch(err){
        console.log("error message",err.message);
        return res.status(400).send(err.message);
    }
  });   
  
  app.put('/employee/:id', async (req, res)=> {
    
    try {
      //console.log(req.body);
      const {country , birthdate  , salary } = req.body;
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



module.exports = {handlePrivateBackendApi};
