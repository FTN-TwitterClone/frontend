export const environment = {
  production: true,
  api: 'http://localhost:8001',
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
