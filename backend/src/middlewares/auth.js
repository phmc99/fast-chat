import { decode } from "../lib/jwt.js";

export default function (req, rep, next) {
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "'token' é uma propriedade obrigatoria" });
  }

  try {
    const decoded = decode(token);

    if (decoded?.user) {
      req.loggedUser = decoded?.user;
      return next();
    }
  } catch (ex) {
    console.error(ex);
  }

  return rep.status(403).json({ message: "não autorizado" });
}
