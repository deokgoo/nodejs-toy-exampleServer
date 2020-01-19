import {Router} from 'express';
import chalk from 'chalk';
import {isVerified} from '../service/jwtGenerator';

let router = Router();

// Middle Ware
router.use(async (req, res, next) => {
  const {authorization} = req.headers;
  let token = authorization.split(" ")[1];
  isVerified(token).then((decoded) => {
    req.userInfo = decoded;
    next();
  }).catch(_ => {
    res.status(401).send({error: 'Bearer error'});
  })
});

router.get('/find/:title/:apikey', (req, res) => {
  const {title, apikey} = req.params;
  console.log(chalk.blue(`receive : ${title}, ${apikey}`));
  res.send("find");
});

router.get('/rank', async (req, res) => {
  const {userInfo} = req;
  res.send(`rank : ${userInfo.name}, ${userInfo.email}, ${userInfo.user_id}`);
});

export default router;