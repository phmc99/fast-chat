import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "AFF QUE GAMBIARRA";

export const encode = (token) => {
  return jwt.sign(token, JWT_SECRET);
};

export const decode = (token) => {
  try {
    const replaced = token.replace("Bearer ", "");
    const verified = jwt.verify(replaced, JWT_SECRET);

    return verified;
  } catch (ex) {
    console.error(ex);
    return {};
  }
};
