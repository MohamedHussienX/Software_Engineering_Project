// whenever browser or client send request to server 
// then server must respond back to avoid networking error
function handlePublicBackendApi(app) {
  app.get('/' , (req , res) => { 
    // the response of server to client    
    return res.send('Welcome Everyone at 3000');
});

app.get('/T13' , (req , res) => { 
  // the response of server to client    
  return res.send('Welcome to the greatest Tutorial 13');
  });

  app.get('/T11' , (req , res) => { 
    // the response of server to client    
    return res.send('Welcome to the lovely Tutorial 11');
    });

  app.get('/T14' , (req , res) => {    
      return res.send('Welcome to the greatest Tutorial 14 ');
  });

  app.get('/T01' , (req , res) => {    
    return res.send('Welcome to the greatest Tutorial 1 ');
});

  app.get('/T14_M' , (req , res) => {    
    return res.send('Welcome to the greatest Tutorial Manufacturing 14 ');
});

  app.get('/T10' , (req , res) => {    
    return res.send('Welcome to the greatest greatest Tutorial 10 ');
  });

  app.get('/T15' , (req , res) => {    
    return res.send('Welcome to the greatest Tutorial 15 ');
  });
};


module.exports = {handlePublicBackendApi};
