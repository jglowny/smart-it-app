const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  const data = await fetch(API_URL);
  const response = await data.json();
  return response;
};
