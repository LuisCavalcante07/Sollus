import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header recebido:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente ou mal formatado" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extraído:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error.message);
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
};