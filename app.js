const express = require("express");
const morgan = require("morgan");
const app = express();
//used fancy destructuring ;)
const { Page, User } = require('./models');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parses json bodies
app.use(express.json())

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use('/wiki', wikiRoutes);
app.use('/', (req, res, next) => {
  res.redirect('/wiki');
});

app.use('/user', userRoutes);


const init = async function() {
  await Page.sync({force: true});
  await User.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
  });
}

init();
