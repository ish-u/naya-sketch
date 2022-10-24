# SOCKET.IO DOCS

## BASE URL - `http://localhost:8000`

EVENTS:

- ["send-point"](./SOCKET_DOCS.md#send-point)
- ["get-point"](./SOCKET_DOCS.md#get-point)
- ["join-room"](./SOCKET_DOCS.md#join-room)
- ["leave-room"](./SOCKET_DOCS.md#leave-room)
- ["connect"](./SOCKET_DOCS.md#connect)
- ["add-sketch"](./SOCKET_DOCS.md#add-sketch)
- ["new-sketch"](./SOCKET_DOCS.md#new-sketch)
- ["add-user"](./SOCKET_DOCS.md#add-sketch)
- ["remove-user"](./SOCKET_DOCS.md#remove-user)
- ["update-user"](./SOCKET_DOCS.md#update-user)
- ["update-me"](./SOCKET_DOCS.md#update-me)

---

### "send-point"

- Sent by the Server to all the Connected Users in the room the event is emiited from.
- Server Listens Clien Emits
- Data
  ```json
  {
      "point" : {"x1":val,"y1":val, "x2":val, "y2":val},
      "room": "room name/id on which user draws"
      "username" : "username of the user that has drawn the points on the room canvas"
  }
  ```

---

### "get-point"

- All Clients connected to a room listens for this event and then draw on the Canavas
- Server Emits Clients Listen
- Data
  ```json
  {
      "collaboratorsPoint" : {"x1":val,"y1":val, "x2":val, "y2":val},
      "username" : "username of user who has drawn points on the room canvas"
  }
  ```

---

### "join-room"

- Sent By a Client requesting to join a room
- Client Emits Server Listen
- Data
  ```json
  {
    "room": "Room `username` wants to join",
    "username": "User who wants to join"
  }
  ```

---

### "leave-room"

- Sent By a Client requesting to leave a room
- Client Emits Server Listens
- Data
  ```json
  {
    "room": "Room `username` wants to leave",
    "username": "User who wants to join"
  }
  ```

---

### "connect"

- Sent by the Client on Initialization of the Socket.IO Client
- Client Emits Server Listens

---

### "new-sketch"

- Sent by the Client to Server to indicate a new sketch is being created
- Client Emits Server Listens
- Data
  ```json
  {
    "sketchName": "name of the newly created Sketch",
    "username": "username of the user that created the Sketch"
  }
  ```

---

### "add-sketch"

- Sent by the Server to all the Connected Clients which append the name of the newly created Sketch to their List
- Client Emits Server Listens
- Data

  ```json
  {
    "sketchName": "name of the newly created Sketch",
    "username": "username of the user that created the Sketch"
  }
  ```

---

### "add-user"

- Sent by the Server to all Connected Clients in a particular Room to indicate that a new user has joined the room
- Clients Listens Server Emits
- data
  ```json
  {
    "username": "username of the user which joined the room"
  }
  ```

---

### "remove-user"

- Sent by the Server to all Connected Clients in a particular Room to indicate that an existing user has left the room
- Clients Listens Server Emits
- data

  ```json
  {
    "username": "username of the user which left the room"
  }
  ```

---

### "update-user"

- Sent by the Server to all Connected Clients in a particular Room to indicate that a existing user has joined the room
- Flow
  ```
   'A' -> "join-room" -> server emit "add-user" -> all users in room add 'A' to their `currentOnline` -> all these users then emit "update-me" which Server Listens then emits "update-user" through which 'A' gets all users in room
  ```
- Clients Listens Server Emits
- data

  ```json
  {
    "username": "username of the user whose status needs to be updated by other clients of the room"
  }
  ```

---

### "update-me"

- Sent by the Client to the Server which then emits "update-user" to all Connected Clients of a room to add the Client to their `currentOnline`
- Used in conjunction wtih "update-user"
- Clients Emits Server Listens
- data

  ```json
  {
    "username": "username of the user wants their status needs to be updated by other clients of the room"
  }
  ```

---
