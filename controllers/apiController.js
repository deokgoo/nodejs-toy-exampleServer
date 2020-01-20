import { Router } from 'express';
import chalk from 'chalk';
import { isVerified } from '../service/jwtGenerator';
import { findMovieByTitle, findRanking } from '../service/movieService';

let router = Router();

router.use(async (req, res, next) => {
  const { authorization } = req.headers;
  let token = authorization.split(" ")[1];
  isVerified(token).then((decoded) => {
    req.userInfo = decoded;
    next();
  }).catch(err => {
    res.status(401).send({error: err.name});
  })
});

router.get('/search/:title', async (req, res) => {
  const { userInfo } = req;
  const { title } = req.params;
  let movieData = await findMovieByTitle(title);

  console.log(chalk.blue(`${userInfo.name} : search api access`));
  res.send(movieData.data);
});

router.get('/rank', async (req, res) => {
  const { userInfo } = req;
  let movieData = await findRanking();

  console.log(chalk.blue(`${userInfo.name} : rank api access`));
  res.send(movieData.data);
});

export default router;