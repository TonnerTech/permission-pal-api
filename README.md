# permission-pal-api

Api for permission pal

## Base Url:

---

## Endpoint Summary

---

|  Type  |           Endpoint            |                Description                 | Protection Type |
| :----: | :---------------------------: | :----------------------------------------: | :-------------: |
|  POST  |      /api/auth/register       |            Register a new User             |      none       |
|  POST  |        /api/auth/login        |            Login a current User            |      none       |
|  GET   |          /api/users           |               Get all Users                |   Super Admin   |
|  GET   |        /api/users/:id         |           Get a User by User id            |   Base Token    |
|  PUT   |        /api/users/:id         |          Update an existing User           |   Base Token    |
|  GET   |     /api/users/parent/:id     |          Get parent with students          |     Parent      |
|  POST  | /api/users/parent/:id/student |           Add student to parent            |     Teacher     |
|  GET   |         /api/schools          |              Get all schools               |   Base Token    |
|  GET   |     /api/schools?name=''      |           Search schools by name           |   Base Token    |
|  GET   |       /api/schools/:id        |              Get school by id              |   Base Token    |
|  POST  |         /api/schools          |              Add a new school              |   Base Token    |
|  PUT   |       /api/schools/:id        |              Update a school               |  School Admin   |
| DELETE |       /api/schools/:id        |              Remove a school               |  School Admin   |
|  GET   |         /api/classes          |              Get all Classes               |   Super Admin   |
|  GET   |       /api/classes/:id        |              Get Class by id               |   Base Token    |
|  GET   |    /api/classes/school/:id    |        Get all Classes by School id        |   Base Token    |
|  GET   |   /api/classes/teacher/:id    |       Get all Classes by Teacher id        |   Base Token    |
|  GET   |   /api/classes/student/:id    |       Get all Classes by Student id        |   Base Token    |
|  POST  |         /api/classes          |              Add a new class               |  School Admin   |
|  POST  |   /api/classes/:id/students   |           Add students to class            |     Teacher     |
|  PUT   |       /api/classes/:id        |               Update a Class               |     Teacher     |
| DELETE |       /api/classes/:id        |               Remove a Class               |     Teacher     |
|  GET   |          /api/forms           |               Get all forms                |   Super Admin   |
|  GET   |        /api/forms/:id         |               Get form by id               |   Basic Token   |
|  GET   |     /api/forms/master/:id     | Get all forms created off of a master form |     Teacher     |
|  GET   |     /api/forms/school/:id     |         Get all forms for a school         |  School Admin   |
|  GET   |     /api/forms/class/:id      |         Get all forms for a class          |     Teacher     |
|  GET   |     /api/forms/parent/:id     |     Get all student forms by parent id     |     Parent      |
|  GET   |    /api/forms/student/:id     |    Get all student forms by student id     |   Base Token    |
|  POST  |          /api/forms           |               Add a new Form               |     Parent      |
|  PUT   |        /api/forms/:id         |       Update an existing form record       |     Parent      |
| DELETE |        /api/forms/:id         |            Remove a form record            |  School Admin   |

## Role Description

---

- super-admin = Corporate admin permissions. (Permission Pal Employee)
- school_admin = Principal user in charge of school Permission Pal access
- teacher = User with Classroom permissions (No School Permissions)
- parent = User with parent permissions (Sign forms etc..)

## Endpoint Details

---

### Auth

#### POST /api/auth/register

Accepts:

```json
{
  role: string,           -- example: "teacher"
  username: string,       -- must be unique -- required
  email: string,          -- must be unique -- required
  password: string,       -- required
  first_name: string,
  last_name: string,
  address: string,
}
```

Returns:

```json
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  token: string         -- Auth token to be stored in headers for protected requests.
}
```

#### POST /api/auth/login

Accepts:

```
{
  username: string,     -- required
  password: string      -- required
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  token: string         -- Auth token to be stored in headers for protected requests.
}
```

### Users

#### GET /api/users

Returns:

```
[
  {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  }
]
```

#### GET /api/users/:id

Returns:
id param represents user id

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string
}
```

#### GET /api/users/parent/:id

id param represents user id (parent)
Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  students: [
    {
      "id": number,
      "school_id": number,
      "student_user_id": number,
      "name": string,
      "date_of_birth": string,
      "student_school_id": string
    },
  ]
}
```

#### POST /api/users/parent/:id/student

Add student to parent, id in param represents user id (parent)
Accepts:

```
{
  student_id: number            -- required
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  students: [
    {
      "id": number,
      "school_id": number,
      "student_user_id": number,
      "name": string,
      "date_of_birth": string,
      "student_school_id": string
    },
  ]
}
```

#### PUT api/users/:id

Update existing user record, id in param represents user id
Accepts any of these keys:

```
{
  username: string,             -- optional
  first_name: string,           -- optional
  last_name: string,            -- optional
  address: string,              -- optional
  email: string,                -- optional
  role: string,                 -- optional
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string
}
```
