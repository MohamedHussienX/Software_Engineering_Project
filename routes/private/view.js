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
    app.get('/addEmployee' , (req , res) => {    
        return res.render('add');
    });

     // view equipments page
     app.get('/Equipments' ,async (req , res) => {    
        let result;
        try{
            result = await db.raw(`select * from project.equipments order by equipmentid `);
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        console.log("employee" , result);
        return res.render('Equipments' , {emp : result.rows});
    });

    // profile page
    app.get('/profile' , (req , res) => {    
        return res.render('profile');
    });


  
}  
  
module.exports = {handlePrivateFrontEndView};
  