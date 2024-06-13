const pool = require("../../db");
const queries = require("./queries");

const addBookAndWishlists = (req, res) => {
    const { bookid, title, publicationyear, pages, categoryid, customerid } = req.body;

    pool.query('BEGIN', (beginErr) => {
        if (beginErr) {
            console.error("Error starting transaction:", beginErr);
            return res.status(500).send("Transaction Start Failed");
        }

        const addBookQuery = `
            INSERT INTO Book (bookid, title, publicationyear, pages, categoryid)
            VALUES ($1, $2, $3, $4, $5)
        `;
        pool.query(addBookQuery, [bookid, title, publicationyear, pages, categoryid], (addBookErr) => {
            if (addBookErr) {
                console.error("Error executing addBookQuery:", addBookErr.message);

                pool.query('ROLLBACK', (rollbackErr) => {
                    if (rollbackErr) {
                        console.error("Error during rollback:", rollbackErr.message);
                        return res.status(500).send("Transaction Failed and Rollback Failed");
                    } else {
                        return res.status(500).send("Transaction Failed, Rolled Back");
                    }
                });
            } else {

                const addWishlistQuery = `
                    INSERT INTO Wishlists (customerid, bookid)
                    VALUES ($1, $2)
                `;
                pool.query(addWishlistQuery, [customerid, bookid], (addWishlistErr) => {
                    if (addWishlistErr) {
                        console.error("Error executing addWishlistQuery:", addWishlistErr.message);

                        pool.query('ROLLBACK', (rollbackErr) => {
                            if (rollbackErr) {
                                console.error("Error during rollback:", rollbackErr.message);
                                return res.status(500).send("Transaction Failed and Rollback Failed");
                            } else {
                                return res.status(500).send("Transaction Failed, Rolled Back");
                            }
                        });
                    } else {
                        pool.query('COMMIT', (commitErr) => {
                            if (commitErr) {
                                console.error("Error during commit:", commitErr);
                                return res.status(500).send("Transaction Commit Failed");
                            } else {
                                return res.status(201).send("Book and Wishlist Added Successfully!");
                            }
                        });
                    }
                });
            }
        });
    });
};

module.exports = {
    addBookAndWishlists,
};