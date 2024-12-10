const { v4 } = require('uuid');
const db = require('../../connectors/db');
const crypto = require('crypto');

function handlePublicBackendApi(app) {
  app.post("/api/v1/users/new", async (req, res) => {
    
    try{
      console.log("req",req.body);
      const {userId, username, email, password, role='standard_user'} = req.body 
      const hashedpassword=crypto.createHash('sha256').update(password).digest('hex')
      const result = await db.raw(
        `insert into "project"."users"(username, email, password, role , createdAt)
          values('${username}','${email}','${hashedpassword}','${role}','${new Date().toISOString()}');`);
      return res.status(200).send('new user has successfully added')
    }catch(err){
      console.log("eror message", err.message);
      return res.status(400).send("failed to add new user")
    }
  
  });
  
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

    // Register HTTP endpoint to create new user
    /*app.get('/api/v1/users/view', async function(req, res) {
      // Check if user already exists in the system
      const userExists = await db.select('*').from('backendTutorial.User').where('email', req.body.email);
      console.log("UE",userExists)
      if (userExists.length > 0) {
        return res.status(400).send('user exists');
      }
      
      try {
        const newUser = req.body;
        const user = await db('backendTutorial.User').insert(newUser).returning('*');
        console.log("user new",user);
        return res.status(200).json(user);
      } catch (e) {
        console.log(e.message);
        return res.status(400).send('Could not register user');
      }
    });*/

    // Register HTTP endpoint to create new user
    app.post('/api/v1/users/login', async function(req, res) {
      // get users credentials from the JSON body
      const { email, password } = req.body
      if (!email) {
        // If the email is not present, return an HTTP unauthorized code
        return res.status(400).send('email is required');
      }
      if (!password) {
        // If the password is not present, return an HTTP unauthorized code
        return res.status(400).send('Password is required');
      }
      const hashedpassword=crypto.createHash('sha256').update(req.body.password).digest('hex')

      // validate the provided password against the password in the database
      // if invalid, send an unauthorized code
      let user = await db.select('*').from('project.users').where('email', email);
      console.log("user : : ",user)
      if (user.length == 0) {
        return res.status(400).send('user does not exist');
      }
      user = user[0];
      if (user.password !== hashedpassword) {
        return res.status(400).send('Password does not match');
      }

      // set the expiry time as 5 hours after the current time
      const token = v4();
      const currentDateTime = new Date();
      const expiresAt = new Date(+currentDateTime + 18000000); // expire in 5 hours

      // create a session containing information about the user and expiry time
      const session = {
        userId: user.userid,
        token,
        expiresAt,
      };
      try {
        await db('project.session').insert(session);
        // In the response, set a cookie on the client with the name "session_cookie"
        // and the value as the UUID we generated. We also set the expiration time.
        return res.cookie("session_token", token, { expires: expiresAt }).status(200).send('login successful');
      } catch (e) {
        console.log(e.message);
        return res.status(400).send('Could not register user');
      }
    });




};


module.exports = {handlePublicBackendApi};
