const fs = require('fs')

fs.readFile("airConditionar.json", function(err, data) {
      
	// Check for errors
	if (err) throw err;
       
	// Converting to JSON
	const users = JSON.parse(data);
	  
	console.log(users.data[0].url); // Print users 
    });