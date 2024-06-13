const getWishlists = "SELECT * FROM Wishlists";
const getWishlistsByCustomerId = "SELECT * FROM Wishlists WHERE customerid = $1";
const addWishlists = "INSERT INTO Wishlists (CustomerID, BookID) VALUES ($1, $2)";
const removeWishlists = "DELETE FROM Wishlists WHERE wishlistid = $1";
const updateWishlists = "UPDATE Wishlists SET bookid = $1 WHERE customerid = $2";

module.exports = {
    getWishlists,
    getWishlistsByCustomerId,
    addWishlists,
    removeWishlists,
    updateWishlists,
};
