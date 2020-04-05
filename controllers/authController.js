import { Router } from 'express';
import { createUser, findUser } from '../models/UserModel';
import crypto from 'crypto';
import { generate } from '../service/jwtGenerator';

let router = Router();

router.post('/login', async (req, res) => {
  const base64_token = req.headers.authorization.split(" ")[1];
  let buff = new Buffer(base64_token, 'base64');
  let law_token = buff.toString('ascii');
  let law_id = law_token.split(":")[0];
  let law_password = law_token.split(":")[1];
  let userData = await findUser(law_id);
  let hashPW = cryptoPW(userData.salt, law_password);

  if (userData.pw === hashPW) {
    let jwt = await generate(law_id, userData.name, userData.email);
    res.send(jwt);
  } else {
    res.send("Auth Fail")
  }
});

router.post('/create', async (req, res) => {
  const {id, pw, name, email} = req.body;
  const salt = "custom_salt";
  let hashPW = cryptoPW(salt, pw);

  await createUser({
    id,
    pw: hashPW,
    name,
    email,
    salt
  });

  res.send(`create User : ${id}`);
});

function cryptoPW(salt, pw) {
  let hash = crypto.createHmac('sha256', salt);

  hash.update(pw);

  return hash.digest("base64");
}

export default router;