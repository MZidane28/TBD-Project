const getBook = "SELECT * FROM Book";
const getBookByBookId = "SELECT * FROM Book WHERE bookid = $1";
const addBook = "INSERT INTO Book (bookid, title, publicationyear, pages, categoryid) VALUES ($1, $2, $3, $4, $5)";
const removeBook = "DELETE FROM Book WHERE bookid = $1";
const updateBook = "UPDATE Book SET title = $1 WHERE bookid = $2";

module.exports = {
    getBook,
    getBookByBookId,
    addBook,
    removeBook,
    updateBook,
};