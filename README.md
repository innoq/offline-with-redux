# Offline with Redux

This project shows a sample implementation for an Angular project that supports offline operations without
using a service worker. Instead it uses [Redux](https://redux.js.org/) to avoid splitting business logic into separate layers when handling no network connectivity. You can find the rationale and explanation in [this article](https://www.innoq.com/en/blog/offline-with-redux/).


## Running it locally

- Install dependencies by running `npm install`
- Start the dev server by running `npm start`
- Navigate to `http://localhost:4200/` to see the running application
- To simulate no network connectivity use the dev tools of your browser to switch off connectivity


### Back End

By default this implementation uses [typicode's JSON API for tasks](https://jsonplaceholder.typicode.com/) as a dependency. Therefore any changes you make are non-permanent and can't really be refetched. You can of course provide your own back-end implementation that provides a simple REST CRUD interface for tasks.
