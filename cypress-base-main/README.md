
# Cypress API Test Suite: Book Management

## Introduction
This project contains an API test suite for a book management system. The tests are written using Cypress and validate various functionalities of the system, including fetching book lists, filtering books, retrieving specific book details, and submitting orders.

## Features
The test suite covers the following scenarios:
1. Fetching a list of books.
2. Filtering books by type (fiction and non-fiction).
3. Retrieving details of a single book using valid and invalid IDs.
4. Submitting a book order with valid details.

## Setup
To set up and run the tests locally, follow the steps below:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 12 or above)
- [Cypress](https://docs.cypress.io/)
- Project dependencies installed via `npm`.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests
To execute the tests, you can use the following commands:

#### Run All Tests
```bash
npx cypress run
```

#### Open Cypress Test Runner
```bash
npx cypress open
```

#### Run Specific Tests
```bash
npx cypress run --spec cypress/integration/<test_file_name>.js
```

## Test Cases
### 1. Fetch All Books
- **Scenario**: Retrieve a complete list of books available in the system.
- **Functionality Tested**: `bookService.listOfBooks()`.

### 2. Fetch Limited Books
- **Scenario**: Retrieve a limited number of books using the `limit` parameter.
- **Functionality Tested**: `bookService.limitOfBooks()`.
- **Input**: A random number between 1 and 20.

### 3. Filter Books by Type
- **Scenario**: Fetch books based on their type (fiction or non-fiction).
- **Functionality Tested**: `bookService.filterByType()`.
- **Inputs**:
  - `"fiction"`
  - `"non-fiction"`

### 4. Retrieve a Single Book
- **Scenario**: Retrieve details of a book using:
  - **Valid Book ID** (e.g., `bookId = 3`).
  - **Invalid Book ID** (e.g., `bookId = 9999`).
- **Functionality Tested**: 
  - `bookService.getSingleBookValidId()`
  - `bookService.getSingleBookInvalidId()`

### 5. Submit a Book Order
- **Scenario**: Submit a valid order for a book.
- **Functionality Tested**: `bookService.submitOrder()`.
- **Inputs**:
  ```json
  {
    "bookId": 1,
    "customerName": "John"
  }
  ```

## Folder Structure
```
.
├── cypress
│   ├── e2e                # Contains test cases
│   ├── controler          # Contains controler extend base controller
│   ├── model              # Contains query and command models
│   ├── service            # Contains service layer implementations
│   ├── utils              # Contains utility functions
├── node_modules           # Project dependencies
├── package.json           # Project metadata and scripts
├── README.md              # Documentation (this file)
```

## Notes
- The project utilizes custom service and utility layers for test implementation.
- Tests are written to validate both success and failure scenarios.
- Input data is randomized where applicable for better test coverage.

## Contributing
Feel free to contribute by:
- Reporting issues.
- Adding new test cases.
- Enhancing existing functionality.

## License
This project is open-source and available under the MIT license.
