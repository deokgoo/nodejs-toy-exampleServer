import express from 'express';
import ejs from 'ejs';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import apiController from './controllers/apiController';
import pageController from './controllers/pageController';
import authController from './controllers/authController';

const PORT = 80;

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use('/', pageController);
app.use('/api', apiController);
app.use('/auth', authController);

app.listen(process.env.PORT || PORT, () => console.log(chalk.whiteBright.bgBlue(`Example app listening on port ${PORT}!`)));
