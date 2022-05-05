const express = require("express");

const PORT = process.env.PORT || 8680;

const app = express();
const info = require('../src/compannyInfo/info.json')
const products = require('../src/products/products.json')

// config do APP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.json({ message: "Cardapio Online - By Renato Lopes" });
});

app.get("/renato-lanches", (req, res) => {
    res.json(info);
});

app.get("/renato-lanches/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

