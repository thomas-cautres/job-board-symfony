# Job Board

> **⚠️ Work in Progress**: This project is currently under active development. Features and APIs are subject to change.

A job board application built with **Symfony 7.3** (PHP 8.4) as the backend and **React** as the frontend.

## 🚀 Tech Stack

- **Backend**: Symfony 7.3
- **Language**: PHP 8.4
- **Frontend**: React
- **Database**: PostgreSQL
- **Server**: FrankenPHP

## 🛠️ Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

## 📦 Installation & Usage

This project uses a `Makefile` to simplify common commands.

### Start the project
Build and start the containers in detached mode:
```bash
make start
```

### Stop the project
Stop the containers:
```bash
make down
```

### Database Setup
To create the database, run migrations, and load fixtures:
```bash
make db
```

### Access the container
Open a shell inside the PHP container:
```bash
make sh
```

## 🧪 Testing & Quality

Run unit tests:
```bash
make unit
```

Run static analysis (PHPStan):
```bash
make phpstan
```

Run coding standards fix (PHP-CS-Fixer):
```bash
make phpcsfixer
```

## 📚 API Documentation

This project uses `nelmio/api-doc-bundle`. You can access the API documentation at:
- `https://localhost/api/doc` (or your configured `SERVER_NAME`)
