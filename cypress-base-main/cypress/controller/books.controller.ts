import {BaseController} from "../base/controller/BaseController";
import {HttpMethod, IResponse} from "../base/model/IResponse";
import {BookListQuery} from "../model/queries/book/BookListQuery";
import {BookDto} from "../model/dtos/book/BookDto";
import {SingleBookDto} from "../model/dtos/book/SingleBookDto";
import {OrderBookCommand} from "../model/commands/book/OrderBookCommand";
import {OrderBookDto} from "../model/dtos/book/OrderBookDto";
import {SingleBookInvalidIdDto} from "../model/dtos/book/SingleBookInvalidIdDto";

export class BooksController {

    baseController = new BaseController('', '');

    getAllBooks(callback) {
        this.baseController
            .setMethod(HttpMethod.GET)
            .setPath('books')
            .build()
            .requestApi((bookListDto: IResponse<BookDto>) => {
                callback(bookListDto);
            })
    }

    getLimitBooks(bookListQuery, callback) {
        this.baseController
            .setMethod(HttpMethod.GET)
            .setPath('books')
            .setQuery(bookListQuery)
            .build()
            .requestApi((bookListDto: IResponse<BookDto>) => {
                callback(bookListDto);
            })
    }

    getBooksByValidId(bookListQuery: BookListQuery, callback) {
        this.baseController
            .setMethod(HttpMethod.GET)
            .setPath(`books/${bookListQuery.bookId}`)
            .build()
            .requestApi((singleBookDto: IResponse<SingleBookDto>) => {
                callback(singleBookDto);
            })
    }

    getBooksByInValidId(bookListQuery: BookListQuery, callback) {
        this.baseController
            .setMethod(HttpMethod.GET)
            .setPath(`books/${bookListQuery.bookId}`)
            .build()
            .setFailOnStatusCode(false)
            .requestApiCheckStatus((singleBookInvalidDto: IResponse<SingleBookInvalidIdDto>) => {
                callback(singleBookInvalidDto);
            })
    }

    order(orderBookCommand: OrderBookCommand, checked, callback) {
        this.baseController
            .setMethod(HttpMethod.POST)
            .setPath('orders')
            .setBody(orderBookCommand)
            .setFailOnStatusCode(checked)
            .build()
            .requestApi((orderBookDto: IResponse<OrderBookDto>) => {
                callback(orderBookDto);
            })
    }


}