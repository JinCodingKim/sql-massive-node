const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
const port = 3000;
require("dotenv").config();
const app = express();
app.use(cors());
app.use(json());
const products_controller = require("./products_controller");

massive(process.env.CONNECTION_STRING).then(db => {
  db.run("select * from products").then(products => {
    if (!products.length) {
      db.init_table();
    }
  });
  app.set("db", db);
});

app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.post("/api/product", products_controller.create);
app.delete("/api/product/:id", products_controller.delete);

app.listen(port, () => `listening on: ${port}`);
