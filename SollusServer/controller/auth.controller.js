import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name, lastname, phone, confirmPassword } = req.body;

    // if(password !== confirmPassword){
    //     return res.status(400).json({ success: false, message: "Passwords do not match" });
    // }
    try {
        // Verifica se todos os campos foram preenchidos
        if (!email || !password || !name || !lastname || !phone) {
            throw new Error("Fill all fields");
        }

        // Verifica se o email já está cadastrado
        const userAlreadyExists = await User.findOne({ email });
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "This user already exists" });
        }

        // Gera a senha criptografada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Gere um `userid` numérico baseado no número total de usuários
        const totalUsers = await User.countDocuments();  // Conta o total de usuários na base de dados
        const newUserId = totalUsers + 1;  // Gera um ID único incrementando o total de usuários

        // Cria um novo usuário com os dados recebidos
        const user = new User({
            userid: newUserId,  // Gera um ID único para o usuário
            email,
            password: hashedPassword,
            name,
            lastname,
            phone,
            verificationToken,
            verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000  // 24 horas
        });

        // Salva o usuário no banco de dados
        await user.save();

        // Gera o token JWT e configura o cookie
        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({
            success: true,
            message: "User created",
            user: {
                ...user._doc,
                password: undefined  // Não envia a senha no retorno
            }
        });
    } catch (error) {
        // Retorna erro caso algum problema aconteça
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email});
        if(!email){
            return res.status(400).json({success: false, message:"Invalid email"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message:"Invalid password"});
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastlogin = new Date();
        await user.save();      

        res.status(200).json({
            success: true,
            message: "logged",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logout successfully"});

};

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    
    try {
        const user = await User.findOne({email});
        
    } catch (error) {
        
    }
}