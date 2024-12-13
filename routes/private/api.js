const db = require('../../connectors/db');
const crypto = require('crypto');
const { v4 } = require('uuid');
const { getUser } = require('../../utils/session');

function handlePrivateBackendApi(app) {
  //M3ana
  app.post('/api/v1/order/new', async (req, res)=> {
    const u= await getUser(req)
    if(u.role=='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      console.log("req",req.body); 
          const countuser=`SELECT COUNT(*) FROM "project"."carts" WHERE userid = '${u.id}';`
          const countusers=await db.raw(countuser)
          console.log(countusers) 
          const count_users=countusers.rows[0].count
          console.log(count_users)
          const o=`select equipmentid,quantity from "project"."carts" where userid='${u.id}' `
          for(let i=0;i<count_users;i++){
          const oi=await db.raw(o)
          const oi_equipmentid=oi.rows[i].equipmentid
          const oi_quantity=oi.rows[i].quantity
          const originalquantity=`select quantity from "project"."equipments" where equipmentid='${oi_equipmentid}'`
          const original_quantity=await db.raw(originalquantity)
          const quantity=original_quantity.rows[0].quantity
          if (!original_quantity.rows[0]) {
            return res.status(404).send("Equipment not found");}
          console.log(quantity)
          if(oi_quantity>quantity)
          {
            return res.status(404).send("Not Enough Quantity")
          }
          console.log(oi)
          const finalquantity=quantity-oi_quantity
      const re=await db.raw(`UPDATE "project"."equipments"
                 SET
                 quantity='${finalquantity}'
                 where equipmentid='${oi_equipmentid}'`)
      const r=await db.raw(
        `insert into "project"."equipmentorders"(equipmentid,quantity)
          values('${oi_equipmentid}','${oi_quantity}')`
      )    }
      const result = await db.raw(
        `insert into "project"."orders"(userid, date)
          values('${u.id}','${new Date().toISOString()}');`);
          const q=`delete from "project"."carts" where userid='${u.id}'`
          const query=await db.raw(q)
      return res.status(200).send('New Order Has Successfully Added')
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("Failed To Add New Order");
    }
  });
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
      console.log("error message", err.message);
      return res.status(400).send("failed to add new equipment")
    }
  
  });
  //M3ana
  app.post('/api/v1/rating/new', async (req, res)=> {
    const u= await getUser(req)
    if(u.role=='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      console.log("req",req.body);
      const {equipmentname,comment, score} = req.body 
      const query=`select equipmentid from "project"."equipments" where equipmentname='${equipmentname}'`
      const n=await db.raw(query)
      const id=n.row[0].equipmentid
      const result = await db.raw(
        `insert into "project"."ratings"(userid, equipmentid, comment,score)
          values('${u.id}','${id}','${comment}','${score}');`);
      return res.status(200).send('New rating has successfully added')
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("failed to add new rating");
    }
  });
  //M3ana
  app.post('/api/v1/cart/new', async (req, res)=> {
    const u= await getUser(req)
    if(u.role=='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      console.log("req",req.body);
      const {equipmentname,quantity} = req.body 
      const query=`select equipmentid from "project"."equipments" where equipmentname='${equipmentname}'`
      const n=await db.raw(query)
      const id=n.rows[0].equipmentid
      const result = await db.raw(
        `insert into "project"."carts"(userid, equipmentid, quantity)
          values('${u.id}','${id}','${quantity}');`);
      return res.status(200).send('Successfully added to the cart')
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("Failed to add to the cart");
    }
  });
  //M3ana
  app.delete('/api/v1/cart/delete/:cartid', async (req, res)=> {
    const u= await getUser(req)
    if(u.role=='admin')
    {
     return res.status(400).send("NOT AUTHORIZED");
    }
    try {
      console.log("req",req.body);
      const query=`delete from "project"."carts" where cartid='${req.params.cartid}'`
      const result = await db.raw(query);
      return res.status(200).send('Successfully deleted from the cart')
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("Failed to delete from the cart");
    }
  });
  //M3ana
  app.put('/api/v1/equipment/:id' , async (req , res) => {
    try{
      const u = await getUser(req);
      if(u.role=='standard_user'){
        return res.status(403).send("NOT AUTHORIZED");
      }
      const equipmentid = parseInt(req.params.id); // Explicitly convert to integer

      if (!equipmentid) {
          return res.status(400).send("Invalid equipmentid");
      }
      // const {equipmentid}=parseInt(req.params.id);
      const {equipmentname, equipmentimgpath, rating, modelNumber,purchasedate,quantity,categoryid,supplierid}=req.body;
      console.log(req.body);

      const query=`UPDATE "project"."equipments"
                 SET
                equipmentname = '${equipmentname}',
                equipmentimgpath = '${equipmentimgpath}',
                rating = '${rating}',
                modelNumber = '${modelNumber}',
                purchasedate = '${purchasedate}',
                quantity = '${quantity}',
                categoryid = '${categoryid}',
                supplierid = '${supplierid}'
            WHERE equipmentid = '${equipmentid}' 
            `;

       const result = await db.raw(query);

       if(res.rowcount===0){
        return res.status(404).send("Equipment not found");
       }
       return res.status(200).send("updated successfully;");
    }

    catch(err){
        console.log("error message",err.message);
        return res.status(500).send("Failed to update Equipment");
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
   //M3ana
  app.get('/api/v1/rating/:id', async function(req, res) {
    let equipExists = await db.select('*').from('project.ratings').where('equipmentid', req.params.id);
  let ratingarr = [];
    try {
      if (equipExists.length > 0) {
         for(let i=0;i<equipExists.length;i++) 
         {
        let {userid,comment, score} = equipExists[i];
        let ratingattributes =
        {
          userid: userid,
          comment: comment,
          score: score
        }
        ratingarr.push(ratingattributes);
      }
}
      //console.log("Equipments ratings objects",ratingarr);
      return res.status(200).json(ratingarr);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not get ratings');
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
      console.log("error message", err.message);
      return res.status(400).send("failed to delete employee");
    }
  
  })  
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
      console.log("error message", err.message);
      return res.status(400).send("failed to update employee");
    }
  });
//M3ana
    app.delete('/api/v1/equipment/:id', async (req, res)=> {
      const u= await getUser(req)
      if(u.role!='admin')
      {
       return res.status(403).send("NOT AUTHORIZED");
      }
      try {
        const x = req.params.id;
        const query = `delete from project.equipments where equipmentID=${x}`;
        const result = await db.raw(query);
        return res.status(200).send("deleted succesfully");
      } catch (err) {
        console.log("error message", err.message);
        return res.status(400).send("failed to delete employee");
      }
  });

  
  




};



module.exports = {handlePrivateBackendApi};
