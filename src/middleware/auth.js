import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const crediantials = req.headers.authorization;

  if (!crediantials) {
    return res.status(403).json({ error: "No credentials sent!" });
  } else {
    const split = crediantials.split(" ");

    const token = split[split.length - 1];
    try {
      var decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(403).send({ message: err.message });
    }
  }

  next();
}
