import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nitrogenio:{type: Number, required: true, unique: false},
    fosforo:{type: Number, required: true, unique: false},
    potassio:{type: Number, required: true, unique: false},
    umidade:{type: Number, required: true, unique: false},
    temperatura:{type: Number, required: true, unique: false},
    condutividade:{type: Number, required: true, unique: false},
    pH:{type: Number, required: true, unique: false},
    ReadDate: { type: Date, default: Date.now },
});

const Dados = mongoose.model("Dados", DataSchema);
export default Dados;
