const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const productFile = "./products.json";
const productFilePath = path.resolve(__dirname, productFile);
// display json file on the frontend
router.get("/", (request, response) => {
  const productItems = fs.readFileSync(productFilePath);
  response.send(productItems);
});
// add items 
router.post("/", (request, response) => {
  const productsList = JSON.parse(fs.readFileSync(productFilePath));
  const newProduct = {
    id: request.body.id,
    category: request.body.category,
    image: request.body.image,
    item: request.body.item,
    price: request.body.price,
    qnty: 0,
  };
  const findItem = productsList.filter(
    (item) => item.item === request.body.item
  );
  const itemCheckId = findItem.map((w) => w.id);
  const itemListEdit2 = productsList.map((e) => e.item.toUpperCase());

  if (
    itemListEdit2.includes(request.body.item.toUpperCase()) &&
    !itemCheckId.includes(request.body.id)
  ) {
  } else if (!request.body.item || /^\s*$/.test(request.body.item)) {
  } else if (!request.body.price || /^\s*$/.test(request.body.price)) {
  } else if (!request.body.category || /^\s*$/.test(request.body.category)) {
  } else {
    productsList.push(newProduct);
    // console.log(request.body)
    fs.writeFileSync(productFilePath, JSON.stringify(productsList, null, 2));
    response.status(201).send();
  }
});
// update specific item
router.put("/:id", (request, response) => {
  const productsList = JSON.parse(fs.readFileSync(productFilePath));

  productsList.forEach((product) => {
    if (product.id == request.body.id) {
      const findItem = productsList.filter(
        (item) => item.item === request.body.item
      );
      const itemCheckId = findItem.map((w) => w.id);
      const itemListEdit2 = productsList.map((e) => e.item.toUpperCase());
      if (
        itemListEdit2.includes(request.body.item.toUpperCase()) &&
        !itemCheckId.includes(request.body.id)
      ) {
        console.log("no input");
      } else if (!request.body.item || /^\s*$/.test(request.body.item)) {
        console.log("no input");
      } else if (!request.body.price || /^\s*$/.test(request.body.price)) {
        console.log("no input");
      } else if (
        !request.body.category ||
        /^\s*$/.test(request.body.category)
      ) {
        console.log("no input");
      } else {
        product.item = request.body.item;
        product.category = request.body.category;
        product.image = request.body.image;
        product.price = request.body.price;
      }
    }
    // console.log(product.id)
  });
  // console.log(productsList);
  fs.writeFileSync(productFilePath, JSON.stringify(productsList, null, 2));
  response.status(200).send();
});
// increment and decrement function
router.put("/status/:id", (request, response) => {
  const productsList = JSON.parse(fs.readFileSync(productFilePath));

  productsList.forEach((product) => {
    console.log(request.params.id);
    console.log(product.id);
    if (product.id == request.params.id) {
      product.qnty = request.body.qnty;
    }
  });

  fs.writeFileSync(productFilePath, JSON.stringify(productsList, null, 2));
  response.status(200).send();
});
// clear cart list
router.put("/", (request, response) => {
  const productsList = JSON.parse(fs.readFileSync(productFilePath));
  productsList.forEach((product) => {
    product.qnty = 0;
    console.log(product);
  });

  fs.writeFileSync(productFilePath, JSON.stringify(productsList, null, 2));
  response.status(200).send();
});
// delete item
router.delete("/:id", (request, response) => {
  const productsList = JSON.parse(fs.readFileSync(productFilePath));

  const filteredProducts = productsList.filter(
    (product) => product.id != request.params.id
  );
  fs.writeFileSync(productFilePath, JSON.stringify(filteredProducts, null, 2));
  response.status(200).send();
});

module.exports = router;
