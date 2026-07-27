# Jetkarir Web

This project is the frontend application for JetKarir, built with [Angular](https://angular.dev/).

## Getting Started

Follow these steps to set up and run the project locally after cloning the repository.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation & Setup

1. Clone the repository (if you haven't already):

   ```bash
   git clone <repository-url>
   cd jetkarir-web
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

## Development Server

To start the local development server, run:

```bash
npm start
```

_(Alternatively, you can use `ng serve`)_

Once the server is running, open your browser and navigate to `http://localhost:4205/`. The application will automatically reload whenever you modify any of the source files.

## Building for Production

To build the project for production deployment, run:

```bash
npm run build
```

_(Alternatively, you can use `ng build`)_

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## Running Tests

To execute unit tests, use the following command:

```bash
npm run test:watch
```

_(Alternatively, you can use `ng test`)_
