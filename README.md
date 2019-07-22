# Adnat Challenge - React Implementation
This repo contains my code to the Adnat React challenge which tasks the creation of a front-end solution of a simplified version of Tanda's web app.

As this is a front-end solution, all the code in the ``` /backend ``` folder was pre-written. The backend code functions as a JSON REST API.

This project was created using React along with multiple popular node modules from the npm registry, such as react-bootstrap, lodash, and axios.


## Installation and Setup
To install the backend, navigate to the root of this repository and run

```
yarn backend:setup
```

To start the server:

```
yarn backend:start
```

Similar commands are performed for the front-end. To install:

```
yarn frontend:setup
```

To start running the solution on port 8080:

```
yarn frontend:start
```

Open up ```localhost:8080``` to begin using the program.

## Usage
The app is intended to be used how the specs determined it. Users can create accounts, log in, join and edit organisation details, and create shifts for themselves within their organisation. Shifts are rendered by date. An additional feature of editing users was created.

## Points of Improvement

### Code structure
As of submission, too much of the functionality lives in ```App.js```. The code in this file could be refactored mainly by creating a separate file to handle all of the API requests.

Less state variables could also have been used for cleaner state management.

### Smaller features
Some smaller features could have been added such as automatically rerendering the table upon creation of a shift, email input verification, password strength checker, etc. These may be added during later times to improve the project