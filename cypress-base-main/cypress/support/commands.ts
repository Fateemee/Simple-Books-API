/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.add('interceptRequest', (method) => {
//     cy.intercept({ method, path: '/api/employees' }, (req) => {
//         req.alias = method;
//     })
// });
// import * as UserController from "../controller/alphacore/v1/userController";
//
// Cypress.Commands.add('login', () => {
//     // create the user first in the DB
//     let username = Cypress.env('username');
//     let password = Cypress.env('password');
//     return UserController.login(username, password)
//         .then((response) => {
//             return response.data.User.GUID;
//         });
// });
// export { };
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')