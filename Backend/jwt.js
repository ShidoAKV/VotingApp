import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach userData to req.user
    req.user = decoded.userData; // Access userData from the decoded token
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = function(userData){
  return jwt.sign({userData}, process.env.JWT_SECRET_KEY, { expiresIn: '5000hr' });
};

export { jwtAuthMiddleware, generateToken };
