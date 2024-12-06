const db = require('../../connectors/db');
const crypto = require('crypto');
const { v4 } = require('uuid');
const { getUser } = require('../../utils/session');

function handlePrivateBackendApi(app) {
  //M3ana
  app.post("/api/v1/equipment/new", async (req, res) => {
    const u= await getUser(req)
    if(u.role!='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try{
      console.log("req",req.body);
      const {equipmentName, equipmentImgPath, rating, modelNumber,purchaseDate,quantity,status,location} = req.body 
      const result = await db.raw(
        `insert into "project"."equipments"(equipmentname, equipmentimgpath, rating, modelnumber,purchasedate,quantity,status,location)
          values('${equipmentName}','${equipmentImgPath}','${rating}','${modelNumber}','${purchaseDate}','${quantity}','${status}','${location}');`);
      return res.status(200).send('new equipment has successfully added')
    }catch(err){
      console.log("eror message", err.message);
      return res.status(400).send("failed to add new equipment")
    }
  
  });
  //M3ana
  app.get('/api/v1/users/view' , async function(req , res) {
    const u= await getUser(req)
    if(u.role!='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try{
      const result = await db.raw(`select * from project.users order by userid`);
      //console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });   
  //M3ana
  app.get('/api/v1/equipment/view' , async function(req , res) {
    try{
      const result = await db.raw(`
            SELECT 
                e.equipmentname, 
                e.equipmentimgpath, 
                e.rating, 
                e.modelnumber, 
                e.purchasedate, 
                e.quantity, 
                e.status, 
                e.location, 
                c.categoryname, 
                s.suppliername 
            FROM 
                "project"."equipments" e
            JOIN 
                "project"."categories" c ON e.categoryid = c.categoryid
            JOIN 
                "project"."suppliers" s ON e.supplierid = s.supplierid
        `);
      //console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });   

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
  
  //M3ana
  app.delete('/api/v1/users/:id', async (req, res)=> {
    const u= await getUser(req)
    if(u.role!='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      const query = `delete from "project"."users" where userid=${req.params.id}`;
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
  //M3ana
  app.put('/api/v1/users/:id', async (req, res)=> {
    const u= await getUser(req)
    if(u.role!='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      //console.log(req.body);
      const {username , role } = req.body;
      console.log(req.body);
      const query = `update "project"."users"
                         set username = '${username}',
                         role = '${role}'
                         where userid = ${req.params.id}`
      const result = await db.raw(query);
      return res.status(200).send("updated succesfully");
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send("failed to update employee");
    }
  
  });

  
  




};



module.exports = {handlePrivateBackendApi};
