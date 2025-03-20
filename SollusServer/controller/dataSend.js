import Dados from "./model/dataModel.js";
import connect from "./database.js"

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

dataSend()