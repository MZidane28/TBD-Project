const pool = require("../../db");
const queries = require("./queries");

const getWishlists = (req, res) => {
    pool.query(queries.getWishlists, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getWishlistsByCustomerId = (req, res) => {
    const customerid = parseInt(req.params.customerid);
    pool.query(queries.getWishlistsByCustomerId, [customerid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addWishlists = (req, res) => {
    const { customerid, bookid } = req.body;
    pool.query(queries.addWishlists, [customerid, bookid], (error, results) => {
        if (error) throw error;
        res.status(201).send("Wishlist Added Successfully!");
    });
};

const removeWishlists = (req, res) => {
    const wishlistid = parseInt(req.params.wishlistid);

    pool.query(queries.getWishlistsByCustomerId, [wishlistid], (error, results) => {
        const noWishlistFound = !results.rows.length;
        if (noWishlistFound) {
            res.send("Wishlist doesn't exist in the database");
        }

        pool.query(queries.removeWishlists, [wishlistid], (error, results) => {
            if (error) throw error;
            res.status(200).send("Wishlist Removed Successfully!");
        })
    });
};


const updateWishlists = (req, res) => {
    const customerid = parseInt(req.params.customerid);
    const { bookid } = req.body;

    pool.query(queries.getWishlistsByCustomerId, [customerid], (error, results) => {
        const noWishlistFound = !results.rows.length;
        if (noWishlistFound) {
            res.send("Wishlist doesn't exist in the database");
        }

        pool.query(queries.updateWishlists, [bookid, customerid], (error, results) => {
            if (error) throw error;
            res.status(200).send("Wishlists Updated Successfully!");
        });
    });
};

module.exports = {
    getWishlists,
    getWishlistsByCustomerId,
    addWishlists,
    removeWishlists,
    updateWishlists,
};
