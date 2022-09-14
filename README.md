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
  name: strin,
  pdfUrl: string,
  categoryId: number,
  teacherDisciplineId: number
}
```

<br>
