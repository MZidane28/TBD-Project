const pool = require("../../db");
const queries = require("./queries");

const getBook = (req, res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

const getBookByBookId = (req, res) => {
    const bookid = parseInt(req.params.bookid);
    pool.query(queries.getBookByBookId, [bookid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addBook= (req, res) => {
    const { bookid, title, publicationyear, pages, categoryid } = req.body;
    pool.query(queries.addBook, [bookid, title, publicationyear, pages, categoryid], (error, results) => {
        if (error) throw error;
        res.status(201).send("Book Added Successfully!");
    })
};

const removeBook = (req, res) => {
    const bookid = parseInt(req.params.bookid);

    pool.query(queries.getBookByBookId, [bookid], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Book doesn't exist in the database");
        }

        pool.query(queries.removeBook, [bookid], (error, results) => {
            if (error) throw error;
            res.status(200).send("Book Removed Successfully!");
        })
    });
};

const updateBook = (req, res) => {
    const bookid = parseInt(req.params.bookid);
    const { title } = req.body;

    pool.query(queries.getBookByBookId, [bookid], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Book doesn't exist in the database");
        }

        pool.query(queries.updateBook, [title, bookid], (error, results) => {
            if (error) throw error;
            res.status(200).send("Book Updated Successfully!");
        });
    });
};

module.exports = {
    getBook,
    getBookByBookId,
    addBook,
    removeBook,
    updateBook,
};
