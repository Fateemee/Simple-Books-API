/// <reference types = "cypress"/>
import {BooksController} from "../controller/books.controller";
import {BookDto} from "../model/dtos/book/BookDto";
import exp = require("constants");
import {SingleBookDto} from "../model/dtos/book/SingleBookDto";
import {OrderBookCommand} from "../model/commands/book/OrderBookCommand";
import {OrderBookDto} from "../model/dtos/book/OrderBookDto";
import {SingleBookInvalidIdDto} from "../model/dtos/book/SingleBookInvalidIdDto";

const specificBooks: SingleBookDto = require("../fixtures/book/singleBook.json") as SingleBookDto;

export class BookService {
    booksController = new BooksController();

    listOfBooks() {
        this.booksController.getAllBooks((bookList: BookDto[]) => {
            expect(bookList).is.not.null;
            expect(bookList.length).eq(6);
            bookList.forEach((book: BookDto) => {
                expect(book.id).is.not.undefined;
                expect(book.id).greaterThan(0).lessThan(21);
                expect(book.name).is.not.undefined;
                expect(book.type).is.not.undefined;
                expect(book.available).is.not.undefined;
            });
        })
    }

    limitOfBooks(bookListQuery) {
        this.booksController.getLimitBooks(bookListQuery, (bookListLimit: BookDto[]) => {
            expect(bookListLimit).is.not.null;
            expect(bookListLimit.length).within(0, 20);
            bookListLimit.forEach((item: BookDto) => {
                expect(item.name).is.not.undefined;
                expect(item.id).greaterThan(0).lessThan(21);
                expect(item.name).is.not.undefined;
                expect(item.type).is.not.undefined;
                expect(item.available).is.not.undefined;
            });
        })
    }

    filterByType(bookListQuery) {
        this.booksController.getLimitBooks(bookListQuery, (bookList: BookDto[]) => {
            expect(bookList).is.not.null;
            let bookListTypes = bookList.filter(el => el.type === bookListQuery.type);
            bookListTypes.forEach((item: BookDto) => {
                expect(item.name).is.not.undefined;
                expect(item.id).greaterThan(0).lessThan(21);
                expect(item.name).is.not.undefined;
                expect(item.type).is.not.undefined;
                expect(item.available).is.not.undefined;
            });
            bookListTypes.map(el => {
                expect(el.type).equal(bookListQuery.type);
            });
        })
    }

    getSingleBookValidId(bookListQuery, compareWithMock?) {
        this.booksController.getBooksByValidId(bookListQuery, (singleBook: SingleBookDto) => {
            expect(singleBook).is.not.null;
            expect(singleBook.author).is.not.undefined;
            expect(singleBook.price).is.not.undefined;
            expect(singleBook["current-stock"]).is.not.undefined;
            if (compareWithMock) {
                expect(singleBook.id).eq(specificBooks.id);
                expect(singleBook.name).eq(specificBooks.name);
                expect(singleBook.author).eq(specificBooks.author);
                expect(singleBook.type).eq(specificBooks.type);
                expect(singleBook.price).eq(specificBooks.price);
                expect(singleBook["current-stock"]).eq(specificBooks["current-stock"]);
                expect(singleBook.available).eq(specificBooks.available);
            }
        })
    }

    getSingleBookInvalidId(bookListQuery) {
        this.booksController.getBooksByInValidId(bookListQuery, (singleBookInvalidIdDto: SingleBookInvalidIdDto) => {
            console.log('singleBookInvalidId', singleBookInvalidIdDto);
            expect(singleBookInvalidIdDto.error).eq("No book with id " + bookListQuery.bookId)

        })
    }

    submitOrder(orderBookCommand) {
        this.booksController.order(orderBookCommand, false, (orderBookDto: OrderBookDto) => {
            expect(orderBookDto).is.not.undefined;
            expect(orderBookDto.created).true;
            expect(orderBookDto.orderId).length.greaterThan(0)
        })
    }
}
