import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name, lastname, phone, confirmpassword } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Fill all fields" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "This user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const totalUsers = await User.countDocuments();
        const newUserId = totalUsers + 1;

        const user = new User({
            userid: newUserId,
            email,
            password: hashedPassword,
            name,
            lastname,
            phone,
            verificationToken: Math.floor(100000 + Math.random() * 900000).toString(),
            verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();

        const token = generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created",
            user: {
                ...user._doc,
                password: undefined,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta" });
        }

        const token = generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(500).json({ message: "Erro no servidor" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ success: true, message: "Logout successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "Password reset link sent" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const profileChange = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const viewProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { name, lastname, email, phone } = user;
        return res.status(200).json({ name, lastname, email, phone });
    } catch (error) {
        console.error("Erro ao buscar perfil", error.message);
        return res.status(500).json({ message: 'Erro ao buscar perfil do usuário', error: error.message });
    }
};

export const updateProfilePhoto = async (req, res) => {
  const userId = req.userId;
  const { photoUrl } = req.body;

  if (!photoUrl) {
    return res.status(400).json({ success: false, message: "URL da foto é obrigatória" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photoUrl },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado" });
    }

    return res.status(200).json({
      success: true,
      message: "Foto de perfil atualizada com sucesso",
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro ao atualizar foto de perfil", error: error.message });
  }
};