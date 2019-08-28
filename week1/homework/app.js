'use strict';

const Express = require('express');

const app = new Express();

// Otomatik JSON.parse icin middleware
app.use(Express.json());

// GET fonksiyonlarini asagida yazin.
app.get('');

app.listen(5454, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:5454`);
});
