import { fetchUsers } from './UserServiceHandler';
import { AsyncStorage } from 'react-native';

export const loginUser = async userBody => {
  const users = await fetchUsers();

  const user = users.find(
    u => u.username === userBody.username && u.password === userBody.password
  );

  if (!user) {
    throw new Error('Invalid credentials!');
  }

  return user;
};
