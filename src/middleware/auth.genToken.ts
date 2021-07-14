import jwt from "jsonwebtoken";

export const JWT = (payload: Object) => {
  const secretKey: string = `${process.env.ACCESS_TOKEN_SECRET}`;
  const token: string = jwt.sign(payload, secretKey);
  return token;
};

