import Dados from "../model/data.model.js";

const Medias  = async () =>{
    try {
        const result = await Dados.aggregate([
        {
            $group: {
                _id: null,
                MediaNitrogenio: { $avg: "$nitrogenio"},
                MediaFosfoto: { $avg: "$fosforo"},
                MediaPotassio: { $avg: "$potassio"},
                MediaUmidade: { $avg: "$umidade"},
                MediaTemperatura: { $avg: "$temperatura"},
                MediaCondutividade: { $avg: "$condutividade"},
                MediaPH: { $avg: "$pH"},
            },
        },
    ]);

        if(result && result.length > 0){
        return result[0];
        }
        return {};
    } catch (error) {
        console.error("Erro ao calcular as médias:", error);
        throw new Error("Erro ao calcular as médias");
    }
}

export default Medias;