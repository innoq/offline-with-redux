# Offline with Redux

This project shows a sample implementation for an angular project that supports offline operations without
using a service worker. Instead it uses [redux]() to avoid splitting business logic into separate layers when handling no network connectivity. You can find the rationale and explanation in [this article]().


## Running it locally

- Install all dependencies by running `npm install`
- Start the dev server by running `nmp run start`
- Navigate to `http://localhost:4200/` to see the running application
- To simulate no network connectivity use the devtools of your browser to switch off connectivity
