import User from "./model/user.model.js"
import connect from "./database.js"
import Dados from "./model/data.model.js";

 async function cadastrar(){
    await connect();
    
    await User.create({
        name: "luisfelipe",
        lastname: "cavalcante",
        phone: "9299456883",
        email: "luisfelipe@gmail.com",
        password: "123445",
    })
 }

 async function dataSend() {
    await connect();

    await Dados.create({
        nitrogenio: "121",
        fosforo: "672",
        potassio: "40",
        humidade: "5748",
        temperatura: "2",
        condutividade: "12",
        pH: "090909",
    })
 }

// cadastrar()
dataSend()