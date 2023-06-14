const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');

const PORT = +process.env.PORT || 3000;

const app = express()
  .use('/', (req, res, next) => {
    const text = req.query.text || 'password';

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(text, salt, (err, hash) => {
        if (err) return next(err);

        console.log('hash', text, hash);
        res.send({ text, hash });
      });
    });
  }).use((req, res, next) => {
    res.status(404).end();
  }).use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('error');
  });


http.createServer(app)
  .listen(PORT)
  .on('error', (err) => console.error(err))
  .on('listening', () => console.log(`listen at ${PORT}`));


module.exports = app;
