# Capstone-Project
<p align="justify">
    Official GitHub repository for the access control application implemented in the IT laboratory at Adolfo Ibáñez University. The development of this project uses <a href="https://www.typescriptlang.org/">TypeScript</a> as the main programming language. The frontend is implemented with <a href="https://react.dev/">React</a>, while the backend of the application is built using <a href="https://expressjs.com/">Express.js</a>, all running in the <a href="https://nodejs.org/">Node.js</a> environment. Additionally, the database used for the application is built with <a href="https://www.postgresql.org/">PostgreSQL</a>.
</p>

# Configuration and Deployment
<p align="justify">
    The general configuration of the project is straightforward thanks to the use of <a href="https://www.docker.com/">Docker</a>. The <code>Dockerfile</code> files for both the frontend and backend configure the environments of each container, while Docker Compose uses these files to handle the application deployment.
</p>
Before running the application, <b>you need to configure two <code>.env</code> files:</b>

- A <code>.env</code> file in the <b>server</b> directory, which will be copied inside the container when the Docker build is created.
-   Another <code>.env</code> file in the <b>root directory</b> of the application, which will provide the necessary environment variables for Docker Compose.

<p align="justify">
The <code>.env</code> file in the server directory will contain backend-specific settings like database credentials and API keys. On the other hand, the <code>.env</code> file in the root directory will provide the environment variables that Docker Compose needs to manage the global deployment configuration.
</p>

```
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── public
│   └── src
│       ├── api
│       ├── App.tsx
│       ├── components
│       ├── index.css
│       ├── lib
│       ├── main.tsx
│       └── types
├── compose.yaml
├── README.md
├── .env        # .env file for Docker Compose
└── server
    ├── Dockerfile
    ├── .env    # .env file for the server
    └── src
        ├── config
        ├── controllers
        ├── index.ts
        ├── middleware
        ├── models
        ├── routes
        └── server.ts
```

#### 1. **Server `.env` file** (located in the `server` directory) 
This file contains the full database connection URL.

```dotenv
# Server .env
DATABASE_URL="postgresql://<your_username>:<your_password>@<your_host>:<your_port>/<your_database_name>"
```

You'll need to replace the placeholders with the actual values:
-   `<your_username>`: Your PostgreSQL username.
-   `<your_password>`: Your PostgreSQL password.
-   `<your_host>`: The host where the database is running (e.g., `localhost`, `database` for Docker).
-   `<your_port>`: The port number for PostgreSQL (default is `5432`).
-   `<your_database_name>`: The name of your database

### 2. **Root `.env` file** (located in the root directory of the project)

This file contains individual database environment variables used by Docker Compose to set up the database container.
```dotenv
# Root .env (for Docker Compose)
# Set your secret password for the database
DATABASE_PASSWORD=<your_password>

# Set your PostgreSQL username
DATABASE_USER=<your_username>

# Set the name of the database
DATABASE_NAME=<your_database_name>

# Set the host of the database, default is "database" to link with the Docker Compose network
# In case of using a different value, you should also change the Docker Compose configuration.
DATABASE_HOST=<your_host>
```
### Instructions for replacing placeholders:

-   <code><your_password></code>`: Replace with the password for the PostgreSQL user.
-   <code><your_username></code>: Replace with your PostgreSQL username (e.g., <code>postgres</code>).
-   <code><your_database_name></code>: The name of your PostgreSQL database (e.g., <code>lab-control</code>).
-   <code><your_host></code>: Set to <code>database</code> by default, which links to the Docker Compose service name, but can be changed if necessary. If you change this value, you should also update the Docker Compose configuration accordingly.

<p>
Once both <code>.env</code> files are configured, you can easily deploy the application by running the following command:
</p>

```
docker compose up
```
<p align="justify">
    By executing this command within the directory containing the <code>compose.yaml</code> file, the full application should be deployed. To avoid issues with Docker, we recommend following the <a href="https://docs.docker.com/engine/install/">installation guide</a> available in the official documentation.
</p>

# Project Structure
```
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── public
│   │   └── bolsa-de-plastico-en-caida-libre.jpeg
│   └── src
│       ├── api
│       │   └── AdminApi.ts
│       ├── App.tsx
│       ├── components
│       │   ├── Cards
│       │   ├── Navbar
│       │   └── pages
│       ├── index.css
│       ├── lib
│       │   └── AxiosAdmin.ts
│       ├── main.tsx
│       └── types
│           └── index.ts
├── compose.yaml
├── README.md
└── server
    ├── Dockerfile
    └── src
        ├── config
        │   └── db.ts
        ├── controllers
        │   ├── MaterialController.ts
        │   ├── SKUController.ts
        │   └── TypeController.ts
        ├── index.ts
        ├── middleware
        │   └── index.ts
        ├── models
        │   ├── Material.model.ts
        │   ├── Product.models.ts
        │   └── Type.models.ts
        ├── routes
        │   ├── Router.Material.ts
        │   ├── Router.SKU.ts
        │   └── Router.Type.ts
        └── server.ts
```
# Project Structure (Definition)
```
.
├── client                               # Frontend application directory
│   ├── Dockerfile                       # Instructions for building the client-side Docker image
│   ├── eslint.config.js                 # ESLint configuration for code quality and style enforcement
│   ├── index.html                       # Main HTML file where the React app is mounted
│   ├── postcss.config.js                # PostCSS configuration for processing CSS with plugins
│   ├── public                           # Directory for static assets
│   │   └── bolsa-de-plastico-en-caida-libre.jpeg  # Static image asset
│   ├── src                              # Source code directory for the frontend
│   │   ├── api                          # Directory for API-related code
│   │   │   └── AdminApi.ts              # Contains API calls related to admin functionalities
│   │   ├── App.tsx                      # Main React component that initializes the app
│   │   ├── components                   # Directory for reusable React components
│   │   │   ├── Cards                    # Components related to displaying card elements
│   │   │   │   ├── ProductCard.tsx      # Component for displaying individual product cards
│   │   │   │   ├── ProductGrid.tsx      # Component to render a grid layout of products
│   │   │   │   └── SampleCards.tsx      # Sample card components for demonstration or testing
│   │   │   ├── Navbar                   # Directory for navigation bar component
│   │   │   │   └── Navbar.tsx           # Navigation bar component at the top of the page
│   │   │   └── pages                    # Directory for page-level components
│   │   │       └── Home.tsx             # Main homepage component for the application
│   │   ├── index.css                    # Main CSS file for global styling
│   │   ├── lib                          # Directory for utility libraries
│   │   │   └── AxiosAdmin.ts            # Axios instance for API requests with admin configurations
│   │   ├── main.tsx                     # Main entry file rendering the React application
│   │   ├── types                        # Directory for TypeScript types
│   │   │   └── index.ts                 # TypeScript types for type-checking throughout the project
│   │   └── vite-env.d.ts                # TypeScript environment declarations for Vite
│   ├── tailwind.config.js               # Tailwind CSS configuration for customizing styles
│   └── vite.config.ts                   # Vite configuration for bundling the client application
├── compose.yaml                         # Docker Compose configuration for orchestrating services
├── README.md                            # Documentation and setup instructions for the project
└── server                               # Backend application directory
    ├── Dockerfile                       # Instructions for building the server-side Docker image
    └── src                              # Source code directory for the backend
        ├── config                       # Configuration directory
        │   └── db.ts                    # Database connection configuration
        ├── controllers                  # Directory for request handler functions
        │   ├── MaterialController.ts    # Logic for handling material-related API requests
        │   ├── SKUController.ts         # Logic for handling SKU-related API requests
        │   └── TypeController.ts        # Logic for handling type-related API requests
        ├── index.ts                     # Main file to initialize and configure the server
        ├── middleware                   # Directory for middleware functions
        │   └── index.ts                 # Middleware functions for request handling and processing
        ├── models                       # Directory for data models
        │   ├── Material.model.ts        # Data model for materials in the database
        │   ├── Product.models.ts        # Data model for products in the database
        │   └── Type.models.ts           # Data model for types in the database
        ├── routes                       # Directory for route definitions
        │   ├── Router.Material.ts       # Routes for handling material-related endpoints
        │   ├── Router.SKU.ts            # Routes for handling SKU-related endpoints
        │   └── Router.Type.ts           # Routes for handling type-related endpoints
        └── server.ts                    # Server setup and configuration, starts the application


```

