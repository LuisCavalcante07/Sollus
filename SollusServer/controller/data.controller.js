import Dados from "../model/data.model.js";
import Medias from "../Service/OperationService.js";

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

export const randomData = async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        console.log('Dados recebidos:', dadosRecebidos);

        const novoDado = new Dados(dadosRecebidos);
        await novoDado.save();

        res.status(201).send({ success: true, message: 'Dados salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        res.status(500).send({ success: false, message: error.message });
    }
}

export const deleteData = async (req, res) => {
    try{
        await Dados.deleteMany({});
        res.status(200).json({message: 'Dados deletados com sucesso'});
    }catch{
        console.log('Erro ao deletar os dados', error);
        res.status(500).json({message: 'Erro ao deletar dados'});
    }
}

export const getMedia = async (req, res) => {
    try {
        const mediaDados = await Medias();
        res.status(200).json({ success: true, data: mediaDados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao calcular a média dos dados" });
    }
}