const express = require('express');
const router = express.Router();
const { addPage } = require( '../views');
const { Page } = require('../models');


router.get('/', async (req, res, next) => {
 try {

res.send('GO TO GET/wiki');

 } catch (err){
  next(err);
 }
});

 router.post('/', async (req, res, next) => {

         function generateSlug (title) {
           return title.replace(/\s+/g, '_').replace(/\W/g, '');
         }

   try {
      const title = req.body.title;
      const content = req.body.content;
      const status = req.body.status;
      const slug = generateSlug(title);

     const page = await Page.create({
       title: title,
       content: content,
       slug: slug,
     status: status

     });
    console.log("PAGE INSTANCE", page);
    res.redirect('/');
    //res.json(req.body);

  } catch (err) {
    next(err);
  }

 });



router.get('/add', async (req, res, next) => {
  try {

   console.log( 'REQ.QUERY!!', req.body);
    res.send(addPage());

  } catch (err){
    next(err);
  }

 });









module.exports = router;
