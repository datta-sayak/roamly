import { Router  } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/tour', (req, res) => {
    res.render('tour.ejs');
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

export default router;