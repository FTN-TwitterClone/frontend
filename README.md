# Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Api
## Regular user registration request - data sent to server
{
  username: "Username", *required
  password: "Password", *required
  email: "Email", *required
  firstname: "Firstname" | null ,
  lastname: "Lastname" | null ,
  age: 18, *min(18)
  town: "Town",
  gender: "Male/Female/Other",
  role: "Regular user",
  enabled: false
}
## Business user registration request - data sent to server
{
  username: "Username", *required
  password: "Password", *required
  email: "Email", *required
  website: "Website" | null,
  companyName: "Company name" | null,
  role: "Business user",
  enabled: false
}
## Login
{
  username: "Username", *required*,
  password: "Password", *required
}
