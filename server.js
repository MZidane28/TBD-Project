const express = require ('express')
const BookRoutes = require("./src/Book/routes");
const WishlistsRoutes = require("./src/Wishlists/routes");
const TransactionRoutes = require("./src/Transaction/routes");

const app = express();
const port = 3000;

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/v1/Book", BookRoutes);
app.use("/api/v1/Wishlists", WishlistsRoutes);
app.use("/api/v1/Transaction", TransactionRoutes);

app.listen(port, () => console.log('app listening on port 3000'));
