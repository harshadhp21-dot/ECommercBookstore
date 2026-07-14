const pool = require('../config/database');

class Book {
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM books WHERE stock_quantity > 0');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByGenre(genre) {
        const [rows] = await pool.execute('SELECT * FROM books WHERE genre = ? AND stock_quantity > 0', [genre]);
        return rows;
    }

    static async searchBooks(query) {
        const [rows] = await pool.execute(
            'SELECT * FROM books WHERE (title LIKE ? OR author LIKE ?) AND stock_quantity > 0',
            [`%${query}%`, `%${query}%`]
        );
        return rows;
    }

    static async create(bookData) {
        const { title, author, description, price, genre, isbn, stock_quantity, image_url } = bookData;
        const [result] = await pool.execute(
            'INSERT INTO books (title, author, description, price, genre, isbn, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, author, description, price, genre, isbn, stock_quantity, image_url]
        );
        return result.insertId;
    }

    static async update(id, bookData) {
        const { title, author, description, price, genre, isbn, stock_quantity, image_url } = bookData;
        await pool.execute(
            'UPDATE books SET title = ?, author = ?, description = ?, price = ?, genre = ?, isbn = ?, stock_quantity = ?, image_url = ? WHERE id = ?',
            [title, author, description, price, genre, isbn, stock_quantity, image_url, id]
        );
    }

    static async delete(id) {
        await pool.execute('DELETE FROM books WHERE id = ?', [id]);
    }

    static async updateStock(bookId, quantity) {
        await pool.execute('UPDATE books SET stock_quantity = stock_quantity - ? WHERE id = ?', [quantity, bookId]);
    }
}

module.exports = Book;