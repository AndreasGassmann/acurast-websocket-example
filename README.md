# Acurast WebSocket Example

A simple web interface for interacting with Acurast WebSocket endpoints.

## Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

This will open the application in your default browser with hot reloading enabled.

## Building

To build the application:

```bash
npm run build
```

This will create a `dist` directory with the bundled JavaScript.

## Deployment

To deploy to GitHub Pages:

1. First build the project:

```bash
npm run build
```

2. Then deploy to GitHub Pages:

```bash
npm run deploy
```

This will deploy the contents of the current directory to the `gh-pages` branch of your repository.

## Usage

1. Enter WebSocket URLs (one per line)
2. Enter the recipients as a JSON array
3. Enter the request payload as JSON
4. Click "Connect and Send Request" to initiate the connection and send the request
5. View the results in the Results section below the form
