# API DOCS

You can also import the API in Insomnia or Postman using [API_INSOMNIA.har](./API_INSOMIA)

![](/docs/API.png)

---

## BASE URL - `http://localhost:5000`

- [/login](/docs/API_DOCS.md#login)
- [/register](/docs/API_DOCS.md#register)
- [/logout](/docs/API_DOCS.md#logout)
- [/user](/docs/API_DOCS.md#check-session)
- [/sketch/get/:sketch-name](/docs/API_DOCS.md#get-a-sketch)
- [/sktech/list](/docs/API_DOCS.md#get-list-of-sketches)
- [/sketch/create/:sketch-name](/docs/API_DOCS.md#create-a-new-sketch)
- [/sketch/update](/docs/API_DOCS.md#update-a-sketch-data)

---

### LOGIN

```http
POST /login
```

#### Header

```json
"Content-Type": "application/json"
```

#### Body

```json
{
    "email": email,
    "password": password,
}
```

#### Response

- Success

  - Status Code - `200`

- Error

  - Status Code - `701`

---

### REGISTER

```http
POST /register
```

#### Header

```json
"Content-Type": "application/json"
```

#### Body

```json
{
    "firstName": firstName,
    "lastName": lastName,
    "username": username,
    "password": password,
    "email": email,
}
```

#### Response

- Success

  - Status Code `201:w `

- Error
  - Status Code `701`
  - data
    ```json
    {
      "err": "SOMETHING WENT WRONG"
    }
    ```

---

---

#### Send the cookies set by express-session+passportjs after hitiing `/login` with every request that needs auth - this can be done by setting `credentials : "include"` in _fetch api_

---

---

### LOGOUT

```http
GET /logout
```

#### Options

- `credentails: "include"`

#### Response

- Success

  - Status Code `204`

- Error
  - Status Code `701`

---

### Check Session

```http
GET /user
```

#### Options

- `credentails: "include"`

#### Response

- data
  ```json
  {
    "user": {
      "username": "bar",
      "firstName": "foo",
      "lastName": "bar",
      "email": "foo@foo.com"
    }
  }
  ```
- Success

  - Status Code `201`

- Error
  - Status Code `701`

---

### Get list of Sketches

```http
GET /sketch/list
```

#### Options

- `credentails: "include"`

#### Response

- data
  ```json
  {
    "sketches": ["Sketch 1", "Sketch 2", "Sketch 3"]
  }
  ```
- Success

  - Status Code `201`

- Error
  - Status Code `510`

---

### Create a new Sketch

```http
GET /sketch/create/:name
```

#### Options

- `credentails: "include"`

#### Response

- Success

  - Status Code `201`

- Error
  - Status Code `510`

---

### Get a Sketch

```http
GET /sketch/get/:name
```

#### Options

- `credentails: "include"`

#### Response

- data
  ```json
  {
    "data": [
      {
        "points": [
          {
            "x1": 87.19999694824219,
            "y1": 83.20001220703125,
            "x2": 87.19999694824219,
            "y2": 84.80003356933594,
            "_id": "6354fb6fd1040bd8cbf2308f"
          },
          {
            "x1": 87.19999694824219,
            "y1": 84.80003356933594,
            "x2": 87.19999694824219,
            "y2": 85.60000610351562,
            "_id": "6354fb6fd1040bd8cbf23090"
          },
          {
            "x1": 87.19999694824219,
            "y1": 85.60000610351562,
            "x2": 87.19999694824219,
            "y2": 87.20001220703125,
            "_id": "6354fb6fd1040bd8cbf23091"
          },
          {
            "x1": 87.19999694824219,
            "y1": 87.20001220703125,
            "x2": 87.19999694824219,
            "y2": 89.60000610351562,
            "_id": "6354fb6fd1040bd8cbf23092"
          },
        ...
        ],
        "sketchedBy": "bar",
        "_id": "6354fb6fd1040bd8cbf2308e"
      },
      {
        "points": [
          {
            "x1": 153.60000610351562,
            "y1": 86.80000305175781,
            "x2": 153.60000610351562,
            "y2": 86.80000305175781,
            "_id": "6354fb74d1040bd8cbf230bc"
          },
          {
            "x1": 153.60000610351562,
            "y1": 86.80000305175781,
            "x2": 153.60000610351562,
            "y2": 86.00003051757812,
            "_id": "6354fb74d1040bd8cbf230bd"
          },
          {
            "x1": 153.60000610351562,
            "y1": 86.00003051757812,
            "x2": 153.60000610351562,
            "y2": 86.00003051757812,
            "_id": "6354fb74d1040bd8cbf230be"
          },
          {
            "x1": 153.60000610351562,
            "y1": 86.00003051757812,
            "x2": 156,
            "y2": 85.19999694824219,
            "_id": "6354fb74d1040bd8cbf230bf"
          },
          {
            "x1": 156,
            "y1": 85.19999694824219,
            "x2": 157.60000610351562,
            "y2": 84.39999389648438,
            "_id": "6354fb74d1040bd8cbf230c0"
          },
          {
            "x1": 157.60000610351562,
            "y1": 84.39999389648438,
            "x2": 160,
            "y2": 83.60000610351562,
            "_id": "6354fb74d1040bd8cbf230c1"
          },
          {
            "x1": 160,
            "y1": 83.60000610351562,
            "x2": 161.60000610351562,
            "y2": 82.80000305175781,
            "_id": "6354fb74d1040bd8cbf230c2"
          },
          {
            "x1": 161.60000610351562,
            "y1": 82.80000305175781,
            "x2": 164,
            "y2": 82,
            "_id": "6354fb74d1040bd8cbf230c3"
          },
          {
            "x1": 164,
            "y1": 82,
            "x2": 169.60000610351562,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c4"
          },
          {
            "x1": 169.60000610351562,
            "y1": 81.19999694824219,
            "x2": 170.39999389648438,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c5"
          },
          {
            "x1": 170.39999389648438,
            "y1": 81.19999694824219,
            "x2": 172.80001831054688,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c6"
          },
          {
            "x1": 172.80001831054688,
            "y1": 81.19999694824219,
            "x2": 176,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c7"
          },
          {
            "x1": 176,
            "y1": 81.19999694824219,
            "x2": 177.60000610351562,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c8"
          },
          {
            "x1": 177.60000610351562,
            "y1": 81.19999694824219,
            "x2": 180,
            "y2": 81.19999694824219,
            "_id": "6354fb74d1040bd8cbf230c9"
          },
        ...
        ],
        "sketchedBy": "anmol",
        "_id": "6354fb74d1040bd8cbf230bb"
      }
    ],
    "collaboraters": ["bar", "anmol"],
    "owner": "anmol"
  }
  ```
- Success

  - Status Code `201`

- Error
  - Status Code `510`

---

### Update a Sketch Data

```http
PUT  /sketch/update
```

#### Headers

```json
"Content-Type": "application/json"
```

#### Body

```json
{
  "data": {
    "points": `pointsToSend`,
    "sketchedBy": "username"
  },
  "name": "currentSketch"
}
```

### Example Body

```json
{
  "data": {
    "points": [
      {
        "x1": 0,
        "y1": 0,
        "x2": 200,
        "y2": 200
      }
    ],
    "sketchedBy": "anmol"
  },
  "name": "Sketch 3"
}
```

#### Options

- `credentails: "include"`

#### Response

- Success

  - Status Code `204`

- Error
  - Status Code `510`

---
