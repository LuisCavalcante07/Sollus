import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    nitrogenio:{type: Number, required: true, unique: false},
    fosforo:{type: Number, required: true, unique: false},
    potassio:{type: Number, required: true, unique: false},
    humidade:{type: Number, required: true, unique: false},
    temperatura:{type: Number, required: true, unique: false},
    condutividade:{type: Number, required: true, unique: false},
    pH:{type: Number, required: true, unique: false},
});

const Dados = mongoose.model("Dados", DataSchema);
export default Dados;
