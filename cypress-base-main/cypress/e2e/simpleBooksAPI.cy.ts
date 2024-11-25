import {BookListQuery} from "../model/queries/book/BookListQuery";
import {BookService} from "../service/BookService";
import {randomNum} from "../utils/NumberUtils";
import {popResultSelector} from "rxjs/dist/types/internal/util/args";
import {OrderBookCommand} from "../model/commands/book/OrderBookCommand";


describe('GetBooks', () => {
    let bookService = new BookService();
    let bookList;
    it('List of books', () => {
        bookList = bookService.listOfBooks();
    });

    it('List of books via limit', () => {
        let random = randomNum(19) + 1;//limit: a number between 1 and 20.
        let bookListQuery: BookListQuery = {
            limit: random
        };
        bookList = bookService.limitOfBooks(bookListQuery);
    });

    it('Filter by Type of Books equal fiction', () => {
        let bookListQuery: BookListQuery = {
            type:"fiction"
        };
        bookList = bookService.filterByType(bookListQuery);
    });

    it('Filter by Type of Books equal non-fiction', () => {
        let bookListQuery: BookListQuery = {
            type:"non-fiction"
        };
        bookList = bookService.filterByType(bookListQuery);
    });


    it('Get a single book', () => {
        let random = randomNum(5) + 1;

        let bookListQuery: BookListQuery = {
            bookId: random
        };
        bookService.getSingleBookValidId(bookListQuery)
    });

    it('Get a Specific book with valid Id', () => {

        let bookListQuery: BookListQuery = {
            bookId: 3
        };
        let compareWithMock;
        bookService.getSingleBookValidId(bookListQuery, compareWithMock)
    });

    it('Get a Specific book with invalid Id ', () => {

        let bookListQuery: BookListQuery = {
            bookId: 9999
        };
        bookService.getSingleBookInvalidId(bookListQuery)
    });

    it('Submit an order', () => {
        let orderBookCommand: OrderBookCommand = {
            "bookId": 1,
            "customerName": "John"
        };
        bookService.submitOrder(orderBookCommand)
    })
});