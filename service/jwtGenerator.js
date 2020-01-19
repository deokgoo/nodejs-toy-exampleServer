import jwt from 'jsonwebtoken';

const privateKey = 'secret';
const EXPIRED_SECOND = 60 * 60;

export const generate = async (user_id, name, email) => {
  const token = jwt.sign({
    user_id,
    name,
    email,
    exp: Math.floor(Date.now() / 1000) + EXPIRED_SECOND
  }, privateKey, {algorithm: 'HS256'});

  return token;
};

export const isVerified = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, {algorithms: ['HS256']}, (err, decoded) => {
      if (decoded !== undefined) {
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  })
};