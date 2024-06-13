const addBookQuery = `
    INSERT INTO Book (bookid, title, publicatoinyear, pages, categoryid)
    VALUES ($1, $2, $3, $4, $5)
`;

const addWishlistQuery = `
    INSERT INTO Wishlists (customerid, bookid)
    VALUES ($1, $2)
`;

module.exports = {
    addBookQuery,
    addWishlistQuery,
};
