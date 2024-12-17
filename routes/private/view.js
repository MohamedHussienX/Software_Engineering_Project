const db = require('../../connectors/db');
const { getSessionToken , getUser } = require('../../utils/session');


function handlePrivateFrontEndView(app) {

    app.get('/dashboard' , async (req , res) => {
        
        const user = await getUser(req);
        console.log('user info' , user)
        if(user.role == "admin" ){
            return res.render('profile');
        }
        // role of customer
        return res.render('customerHomepage' , {name : user.name});
    });

    app.get('/home' , (req , res) => {    
            return res.render('index' , 
            {title : "Tutorial 9" , 
            desc : "Tutorial is mainly about UI connection with server.",
            });
        });


    app.get('/Cart' , async (req , res) => {
        let result;
        const u=await getUser(req)
        try{
            result = await db.raw(`select 
               "project"."carts".*,
               "project"."equipments".equipmentname
               from "project"."carts"
               inner join "project"."equipments"
               on "project"."carts".equipmentid="project"."equipments".equipmentid
               where "project"."carts".userid=${u.userId} `);
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        console.log("Cart" , result);
        return res.render('Cart' , {emp : result.rows});
    });

    // create new Employee page
    app.get('/AddRating' , (req , res) => {

        return res.render('AddRating');
    });
    app.get('/AddRating/:equipmentid' , async (req , res) => {
        const r=await db.raw(`select equipmentname from "project"."equipments" where equipmentid='${req.params.equipmentid}'`)
        const name=r.rows[0].equipmentname
        return res.render('AddRating',{name});
    });

     // view equipments page
     app.get('/Equipments' ,async (req , res) => {    
        let result;
        try{
            result = await db.raw(`SELECT 
                e.*, 
                c.categoryname, 
                s.suppliername
            FROM 
                project.equipments e
            INNER JOIN 
                project.categories c
            ON 
                e.categoryid = c.categoryid
            INNER JOIN 
                project.suppliers s
            ON 
                e.supplierid = s.supplierid
            ORDER BY 
                e.equipmentid
 `);
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        console.log("Equipments" , result);
        return res.render('Equipments' , {emp : result.rows});
    });
    app.get('/searchequipmentsname' ,async (req , res) => {    
        let result;
        try{
            result = await db.raw(`SELECT 
                e.*, 
                c.categoryname, 
                s.suppliername
            FROM 
                project.equipments e
            INNER JOIN 
                project.categories c
            ON 
                e.categoryid = c.categoryid
            INNER JOIN 
                project.suppliers s
            ON 
                e.supplierid = s.supplierid
            ORDER BY 
                e.equipmentid
 `);
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        console.log("Equipments" , result);
        return res.render('Equipments' , {emp : result.rows});
    });

    // profile page
    app.get('/profile' , (req , res) => {    
        return res.render('profile');
    });

    app.get('/order' ,async (req , res) => {    
        let result;
        try{
            result = await db.raw(`WITH LatestOrder AS (
    SELECT 
        o.orderID, 
        o.userID, 
        o.date 
    FROM 
        Project.Orders o
    WHERE 
        o.userID = ${userId}
    ORDER BY 
        o.date DESC
    LIMIT 1
)
SELECT 
    e.equipmentID, 
    e.equipmentName, 
    e.equipmentImgPath, 
    e.rating, 
    e.modelNumber, 
    e.purchaseDate, 
    e.quantity AS totalQuantity, 
    eo.quantity AS orderedQuantity, 
    e.status, 
    e.location, 
    e.categoryID, 
    e.supplierID
FROM 
    Project.Equipments e
INNER JOIN 
    Project.EquipmentOrders eo 
    ON e.equipmentID = eo.equipmentID
INNER JOIN 
    LatestOrder lo 
    ON eo.orderID = lo.orderID;

 `);
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        console.log("Order" , result);
        return res.render('Order', {emp : result.rows});
    });
  
}  
  
module.exports = {handlePrivateFrontEndView};
  