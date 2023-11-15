import { app } from "./app.js";


    app.listen(6700);
    console.log('🚀server up in http://localhost:6700/')

try{
		console.log('conected to database')
	}catch(error){
        console.log('error: ${error}')
	}

