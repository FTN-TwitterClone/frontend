export const environment = {
  production: true,
  api: 'https://localhost:8000/api',
  validators: {
    username: {
      minLength: 5
    },
    password: {
      minLength: 5
    },
    age: {
      min: 18
    }
  }
};
