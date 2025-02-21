# Next.js App with PostgreSQL - Development Setup

This project is a Next.js app integrated with a PostgreSQL database, all managed via Docker Compose. Follow the instructions below to get the app up and running in development mode.

## Prerequisites

Make sure you have the following tools installed:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup

1. **Create a `.env` file** in the root directory with the following environment variables (you can customize the values as needed):

   ```env
   # Next.js environment variables
   NODE_ENV=development
   DB_HOST=db
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=example
   DB_NAME=mydatabase
   ```

2. **Build and start the services** using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Docker images for the Next.js app and PostgreSQL database.
   - Start the Next.js app (`http://localhost:3000`) and PostgreSQL database (`localhost:5432`).
   - Set up pgAdmin for PostgreSQL management (`http://localhost:8080`).

3. **Access the services**:
   - **Next.js app**: Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.
   - **pgAdmin (PostgreSQL admin interface)**: Open [http://localhost:8080](http://localhost:8080) in your browser.
     - Log in with the following credentials:
       - **Email**: `admin@admin.com`
       - **Password**: `admin`
     - Add a new server in pgAdmin with the following details:
       - **Name**: Any name (e.g., `My Database`).
       - **Host**: `db` (the service name of the PostgreSQL container).
       - **Port**: `5432`.
       - **Username**: `postgres`.
       - **Password**: `example`.

## Development Workflow

Once your environment is up and running, you can start developing your app:

1. **Modify your code**: Any changes you make to the Next.js app in the `/app` directory will be reflected live on the app running at [http://localhost:3000](http://localhost:3000) because the project directory is mounted as a volume inside the container.
   
2. **Access the database**:
   - Use pgAdmin to manage your PostgreSQL database, run queries, and inspect the data.

## Restarting the App

If you need to restart the app or make changes to the Docker configuration, run:

```bash
docker-compose down
docker-compose up --build
```

This will stop the containers, rebuild them (if needed), and bring them back up with the latest configuration.

## Important Notes

- **Data Persistence**: The PostgreSQL data is stored in a Docker volume (`postgres_data`) and will persist even if you restart the containers.
- **Adminer**: If you prefer a simpler PostgreSQL admin interface, you can access **Adminer** at [http://localhost:8081](http://localhost:8081). Just use the same credentials as for pgAdmin.

## Troubleshooting

- If you encounter issues with the containers not starting, check the logs with:

  ```bash
  docker-compose logs
  ```

- If you need to remove all containers and volumes, you can run:

  ```bash
  docker-compose down -v
  ```

  This will remove the containers and the associated volumes (including your database data), so use it carefully.

---

Happy coding!