import { Router } from 'express';
import chalk from 'chalk';

let router = Router();

// Middle Ware
router.use((req, res, next)  => {
    // TODO : require Auth
    const authFail = true;
    if(authFail) throw "AuthFail";
    next();
});

router.get('/find/:title/:apikey', (req, res) => {
    const { title, apikey } = req.params;
    console.log(chalk.blue(`receive : ${title}, ${apikey}`));
    res.send("find");
});

router.get('/rank/:apikey', (req, res) => {
    res.send(`rank : ${req.params.apikey}`);
});

export default router;