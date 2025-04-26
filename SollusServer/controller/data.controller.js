import Dados from "../model/data.model.js";

export const getAllData = async (req, res) => {
    try {
        const dados = await Dados.find().sort({ ReadDate: -1 });
        res.status(200).json({ success: true, data: dados});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const lastRead = async (req, res) =>{
    try {
        const data = await Dados.findOne().sort({id: -1});
        res.status(200).json({ success: true, data: data});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}