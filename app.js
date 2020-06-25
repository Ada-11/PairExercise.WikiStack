const express = require("express");
const morgan = require("morgan");
const app = express();
//used fancy destructuring ;)
const {db} = require('./models');
//const routes = require('./routes/posts');

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parses json bodies
app.use(express.json())

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const init = async function() {
  await db.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
  });
}

init();
