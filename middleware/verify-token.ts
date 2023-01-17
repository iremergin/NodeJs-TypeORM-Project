import * as jwt from "jsonwebtoken";
import { api_secret_key } from "../config";

// export const tokenControl = (request, response, next) => {
//   const token =
//     request.headers["x-access-token"] ||
//     request.body.token ||
//     request.query.token;
//   if (!token) {
//     response.send("Token bulunmamaktadir.");
//   } else {
//     jwt.verify(token, request.app.get("api_secret_key"), (error, decoded) => {
//       if (error) {
//         response.send("Beklenmeyen bir hatayla karşilaşildi.");
//       } else {
//         request.decode = decoded;
//         next();
//       }
//     });
//   }
// };

export const tokenLoginControl = (request, response, next) => {
  try {
    const { token } = request.headers;
    const verification = jwt.verify(token, api_secret_key);
    if (verification) {
      return next();
    } else {
      response.send({
        responseCode: -300,
        message: "token ile giris basarisiz",
      });
    }
    return next();
  } catch (error) {
    response.send({
      responseCode: -300,
      message: "token ile giris basarisiz",
    });
  }
};
