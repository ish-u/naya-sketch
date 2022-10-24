# naya-sketch

#### A Collaborative Sketch Tool made using PixiJS, React, Express, SocketIO and TailwindCSS

---

![](/docs/naya-sketch.gif)

### Live Demo - [https://naya-sketch.up.railway.app/](https://naya-sketch.up.railway.app/)

---

### Table Of Contents

- [Setup Local Development](#setup-local-development)
- [API Documentation](#api-docs)
- [Socket.IO Events Documentation](#socketio-events)
- [Front-End Docs](#front-end-docs)
- [References](#references)
- [Video Demo](#youtube-video-demo---link)

---

## Setup Local Development

### Clone the Repository and cd to to `naya-sketch`

```bash
git clone https://github.com/ish-u/naya-sketch.git
cd naya-sketch
```

### Install Dependencies for `server` and `client`

```bash
npm run init
```

### Set Up Environment Variables for `client` and `server`

- Server

  - Create a `.env` file in the `server` folder

  - Copy the variables from `.env.sample` to `.env` and fill the required variables

  - Setup MongoDB and obtain the Connection URI

    - Get the `MONGO DB URI` using Atlas - [Atlas UI](https://www.mongodb.com/docs/atlas/getting-started/)
    - Set up [docker](https://www.docker.com/) and use the `docker-compse.yml` file provided in `database` folder to run MongoDB in a docker container
      - Get the `MONGO DB URI` of the running docker container
      - Run `npm run db` in `naya-sketch` to start the container - DB credentials can be found in `database/docker-compose.yml`
    - Get the URI from loacally installed MongoDB

  - Generate `SESSION SECRET` using by running `require('crypto').randomBytes(64).toString('hex')` in node console

  - Set `DB_NAME` to `naya-sketch`

  - The Final `.env` will look like this

    ```
    DEV=TRUE
    PORT=5000
    SOCKET_PORT=8000
    DB_URI="MONGO DB URI"
    DB_NAME="DB_NAME"
    SESSION_SECRET="SECRET"
    FRONTEND=http://localhost:5173

    ```

- Client

  - Create a `.env` file in `client` folder and add the following to it

    ```
    VITE_APP_API=http://localhost:5000
    VITE_APP_SOCKET=http://localhost:8000
    ```

### Start Client and Server

- Server

  - Run the `npm run server` in `naya-sketch` folder to start the development server
  - The Express Server will be Live at [`http://localhost:5000`](http://localhost:5000)
  - The SocketIO Server will be live at [`http://localhost:8000`](http://localhost:8000)

- Client

  - Run the `npm run client` in `naya-sketch` folder to start the development server
  - The Client will be Live at [`http://localhost:5713`](http://localhost:5713)

## [API DOCS](/docs/API_DOCS.md)

- [/login](/docs/API_DOCS.md#login)
- [/register](/docs/API_DOCS.md#register)
- [/logout](/docs/API_DOCS.md#logout)
- [/user](/docs/API_DOCS.md#check-session)
- [/sketch/get/:sketch-name](/docs/API_DOCS.md#get-a-sketch)
- [/sktech/list](/docs/API_DOCS.md#get-list-of-sketches)
- [/sketch/create/:sketch-name](/docs/API_DOCS.md#create-a-new-sketch)
- [/sketch/update](/docs/API_DOCS.md#update-a-sketch-data)

## [SOCKET.IO EVENTS](/docs//SOCKET_DOCS.md)

- ["send-point"](/docs/SOCKET_DOCS.md#send-point)
- ["get-point"](/docs/SOCKET_DOCS.md#get-point)
- ["join-room"](/docs/SOCKET_DOCS.md#join-room)
- ["leave-room"](/docs/SOCKET_DOCS.md#leave-room)
- ["connect"](./docs/SOCKET_DOCS.md#connect)
- ["add-sketch"](/docs/SOCKET_DOCS.md#add-sketch)
- ["new-sketch"](/docs/SOCKET_DOCS.md#new-sketch)
- ["add-user"](/docs/SOCKET_DOCS.md#add-sketch)
- ["remove-user"](/docs/SOCKET_DOCS.md#remove-user)
- ["update-user"](/docs/SOCKET_DOCS.md#update-user)
- ["update-me"](/docs/SOCKET_DOCS.md#update-me)

## [FRONT-END DOCS](/docs//FRONT_END.md)

## References

1. PixiJS - [Link](https://pixijs.com/)
2. passportjs - [Link](https://www.passportjs.org/)
3. mongoose - [Link](https://mongoosejs.com/)
4. tailwindcss - [Link](https://tailwindcss.com/)
5. socket.io - [Link](https://socket.io/)
6. vite - [Link](https://vitejs.dev/)

## Youtube Video Demo - [Link](https://www.youtube.com/watch?v=om-w-4Ddh7g)
