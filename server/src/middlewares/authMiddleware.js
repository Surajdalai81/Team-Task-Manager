import jwt from "jsonwebtoken";

const protect = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    // CHECK HEADER
    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // GET TOKEN
    const token =
      authHeader.split(" ")[1];

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE USER
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default protect;