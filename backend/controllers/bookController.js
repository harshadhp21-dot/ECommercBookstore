const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        const books = await Book.searchBooks(q);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const books = await Book.findByGenre(genre);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const bookId = await Book.create(req.body);
        res.status(201).json({ message: 'Book created successfully', bookId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        await Book.update(req.params.id, req.body);
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.delete(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};