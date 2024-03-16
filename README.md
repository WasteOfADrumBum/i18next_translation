# MERN Stack Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/yourrepository.svg)](https://github.com/yourusername/yourrepository/issues)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/yourrepository.svg)](https://github.com/yourusername/yourrepository/network)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/yourrepository.svg)](https://github.com/yourusername/yourrepository/stargazers)

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application with Redux for state management and Docker support.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies for root, server, and client:

```bash
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

If PostgreSQL gives an error while connecting, run a PowerShell instance as an Admin, then use:

```bash
taskkill /F /IM postgres.exe
```

The client application will be accessible at `http://localhost:3000`, and the server will be accessible at `http://localhost:8081`.

### Dockerization

Build the Docker image:

```bash
docker-compose up -d
```

Stop Docker containers:

```bash
docker compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in docker-compose.yml file, use the command:

```bash
docker-compose down --rmi all
```

The backend application will be accessible at `http://localhost:5000`.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[Confluence](https://team-wpmcbjnpvsdl.atlassian.net/l/cp/rFH9f1KU)
