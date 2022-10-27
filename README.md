# Travella

Travella is a mobile-first web app to plan group trips, by searching various hotels, restaurants and attractions to visit during a trip and adding them to the group's travel itinerary, where everyone can vote and comment on the experiences they prefer.

## Features

-   Explore experiences in a selected destination
-   Create a group itinerary and invite friends
-   Add experiences to group itinerary
-   React to experiences and comment in group itinerary

## Technologies

Travella uses a number of technologies to work properly, including:

-   React
-   Redux Toolkit
-   Styled Components
-   NodeJS
-   Express
-   GraphQL
-   TypeGraphQL
-   Apollo
-   TypeORM
-   Jest
-   React Testing Library _(pending)_

## Project Status

Travella is still in progress.

## Prerequisites

-   Get a Google Maps API [key](https://developers.google.com/maps/documentation/javascript/get-api-key)
-   Get a RapidAPI [key](https://rapidapi.com/blog/api-glossary/api-key/)
-   Add client environment variables in a .env file (reference the example file)
-   Set up a PostgreSQL database locally and add server environment variables in a .env file (reference the example file)

## Installation

Travella requires [Node.js](https://nodejs.org/) v16+ to run. You can replace the yarn commands below, with the npm equivalent.

Install the dependencies, devDependencies and start the client.

```sh
cd client
yarn
yarn start
```

Install the dependencies, devDependencies and start the server.

```sh
cd server
yarn
yarn run dev
```

Run tests for the server.

```sh
cd server
yarn
yarn test
```

## License

MIT
