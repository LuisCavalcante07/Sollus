import User from "./model/userModel.js"
import connect from "./database.js"

async function cadastrar(){
    await connect();
    
    await User.create({
        userid: "73",
        email:"klhiohio",
        password:"2880",
    })
 }

cadastrar()