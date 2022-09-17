## Authentication

#### **POST** - Sign up

In order to sign-up, make a post request to: https://repopr0vas.herokuapp.com/sign-up
sending a body in the format:

```
{
  email: string,
  password: string,
  confirmPassword: string
}
```

<br>

#### **POST** - Sign in

In order to sign-in, make a post request to: https://repopr0vas.herokuapp.com/sign-in
sending a body in the format:

```
{
  email: string,
  password: string
}
```

The server will respond with an object in the format:

```
{
  token: string
}
```

<br>

## Tests

#### **POST** - Add a new test

In order to add a new test, make a post request to: https://repopr0vas.herokuapp.com/tests
sending a body in the format:

```
{
  name: string,
  pdfUrl: string,
  categoryId: number,
  teacherDisciplineId: number
}
```

The server will respond with an object in the format:

```
{
  id: number
  name: string,
  pdfUrl: string,
  categoryId: number,
  teacherDisciplineId: number
}
```

<br>

#### **GET** - Get a list of tests grouped by term and disciplines

Make a get request to: https://repopr0vas.herokuapp.com/tests/disciplines
sending an **Authorization header** in the Bearer TOKEN format.<br><br>
The server will respond with an array in the format:

```
[
  {
    number: number,
    Disciplines: [
      {
        id: number,
        name: string,
        TeachersDisciplines: [
          {
            Tests: [
              {
                category: {
                  id: number,
                  name: string,
                  Tests: [
                    {
                      id: number,
                      name: string,
                      pdfUrl: string,
                      teacherDiscipline: {
                        teacher: {
                          name: string
                        }
                      }
                    },
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },
]
```

<br>

#### **GET** - Get a list of tests grouped teachers

Make a get request to: https://repopr0vas.herokuapp.com/tests/teachers
sending an **Authorization header** in the Bearer TOKEN format.<br><br>
The server will respond with an array in the format:

```
[
    {
    name: string,
    TeachersDisciplines: [
      {
        Tests: [
          {
            category: {
              id: number,
              name: string,
              Tests: [
                {
                  id: number,
                  name: string,
                  pdfUrl: string,
                  teacherDiscipline: {
                    discipline: {
                      name: string
                    }
                  }
                },
              ]
            }
          }
        ]
      },
    ]
  },
]
```
