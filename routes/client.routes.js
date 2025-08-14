import { Router  } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/tour', (req, res) => {
    res.render('tour.ejs');
})

router.get('/signin', (req, res) => {
    res.render('sign_in.ejs');
});

export default router;