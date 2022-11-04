const { response } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const productsRouter = require("./routes/products");
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (request, response) => {
  response.send("server side!");
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`running on port ${port}.`);
});
