var mongoose = require('mongoose');

const mlabURI = 'mongodb://cptrung:password123@ds131313.mlab.com:31313/challenge'
const dbName = 'challenge';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;