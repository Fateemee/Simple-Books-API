/// <reference types = "cypress"/>

import {HttpMethod, IResponse} from "../model/IResponse";
import Response = Cypress.Response;
import {SLASH} from "../constant/constant";
import {BaseEnvKey} from "../model/enums/BaseEnvKey";

export class BaseController {
    private method: string = (<string>HttpMethod.GET);
    private baseUrl: string = '';
    private contextPath: string;
    private readonly version: string;
    private readonly entity: string;
    private path: string;
    private url: string;
    private token: string = null;
    private body: {} = null; // Json Object
    private headers: {} = {}; // Json Object
    private queries: {} = null; // Json Object

    private failOnStatusCode: boolean = true;

    constructor(version: string, entity: string) {
        this.version = version;
        this.entity = entity;
    };

    resetAll() {
        this.headers = {};
        this.queries = null;
        this.body = null;
    }

    setMethod(method: HttpMethod) {
        this.resetAll();
        this.method = (<string>method);
        return this;
    }

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
        return this;
    }

    setContextPath(contextPath: string) {
        this.contextPath = contextPath;
        return this;
    }

    setPath(path: string) {
        this.path = path;
        return this;
    }

    setBody(body: any) {
        this.body = body;
        return this;
    }

    setQuery(query: any) {
        this.queries = query;
        return this;
    }

    setFailOnStatusCode(failOnStatusCode: boolean) {
        this.failOnStatusCode = failOnStatusCode;
        return this;
    }

    private buildQueryParams() {
        let q = '';
        let and = '';
        if (this.queries) {
            q = '?';
            Object.keys(this.queries).forEach((key) => {
                q = q + and + key + '=' + this.queries[key];
                and = '&';
            })
        }
        this.queries = q;
    }

    private getToken() {
        this.token = Cypress.env(BaseEnvKey.TOKEN);
    }

    private buildHeaders() {
        if (this.token) {
            this.headers['Authorization'] = this.token
        }
        this.headers['content-type'] = 'application/json';
    }

    private buildUrl() {
        this.url = this.baseUrl + (this.contextPath ? SLASH + this.contextPath : '') + SLASH + this.version + (this.version ? SLASH : '') + this.entity + (this.entity ? SLASH : '') + this.path + this.queries;
    }

    build() {
        this.getToken();
        this.buildQueryParams();
        this.buildUrl();
        this.buildHeaders();
        return this;
    }

    requestApi(callback) {
        cy.request(
            {
                method: this.method,
                url: this.url,
                body: this.body,
                headers: this.headers,
            }
        ).then((response: Response<IResponse>) => {
            if (this.failOnStatusCode) {
                expect(response.status).to.equal(200);
            }
            callback(typeof response.body == 'string' ? JSON.parse(response.body) : response.body);
        })
    }

    requestApiCheckStatus(callback) {
        cy.request(
            {
                method: this.method,
                url: this.url,
                body: this.body,
                headers: this.headers,
                failOnStatusCode: this.failOnStatusCode
            }
        ).then((response: Response<IResponse>) => {
            if (this.failOnStatusCode) {
                expect(response.status).to.equal(200);
                callback(typeof response.body == 'string' ? JSON.parse(response.body) : response.body);
            } else {
                //let resDto: IResponse = {
                //data: response.body, status: response.status,
                expect(response.status).to.equal(404);
                callback(response.body);
            }
        })
    }
}