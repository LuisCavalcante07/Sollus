import Dados from "./model/dataModel.js";
import connect from "./database.js"

async function dataSend() {
    await connect();

    await Dados.create({
        nitrogenio: "101",
        fosforo: "69",
        potassio: "101",
        umidade: "2424",
        temperatura: "99",
        condutividade: "101",
        pH: "24",
    })
 }

dataSend()