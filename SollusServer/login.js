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

    const totalData = await Dados.countDocuments();  // Conta o total de usuários na base de dados
    const newDataId = totalData + 1;  // Gera um ID único incrementando o total de usuários

    await Dados.create({
        id: newDataId,
        nitrogenio: "02",
        fosforo: "23",
        potassio: "88",
        umidade: "12",
        temperatura: "36.2",
        condutividade: "20",
        pH: "6",
    })
 }

// cadastrar()
dataSend()