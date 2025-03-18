import User from "./model/userModel.js"
import connect from "./database.js"
import Dados from "./model/dataModel.js";

 async function cadastrar(){
    await connect();
    
    await User.create({
        userid: "23",
        email:"JNDJNJNJNJ",
        password:"20",
    })
 }

 async function dataSend() {
    await connect();

    await Dados.create({
        nitrogenio: "31",
        fosforo: "672",
        potassio: "39",
        humidade: "497",
        temperatura: "542",
        condutividade: "632",
        pH: "4567897",
    })
 }

// cadastrar()
dataSend()