# MERN Stack Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application with Redux for state management and Docker support.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies for root, server and client:

```bash
docker-compose up -d
npm install
cd server && npm install
cd ../client && npm install
```

## Usage

### Running Locally

To run the server locally:

```bash
cd server && npm start
```

To run the client locally:

```bash
cd client && npm start
```

To run both server and client concurrently (development mode):

```bash
npm run dev
```

The client application will be accessible at `http://localhost:3000`, and the server will be accessible at `http://localhost:5000`.

### Dockerization

Build the Docker image for the backend:

```bash
docker build -t backend-image ./server
```

Run the Docker container based on the image:

```bash
docker run -p 5000:5000 backend-image
```

The backend application will be accessible at `http://localhost:5000`.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[Confluence](https://team-wpmcbjnpvsdl.atlassian.net/l/cp/rFH9f1KU)
