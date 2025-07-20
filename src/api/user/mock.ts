import { getItem, setItem } from '@/lib/storage';

import { type ResponseData } from '../types';
import type { User } from './types';

const KEY = 'mock_users';

const mockUsers: User[] = [
  {
    id: 'B1234561',
    name: 'Nguyen Van A',
    gender: 'male',
    email: 'a@example.com',
    phone: '0123456789',
    status: 'active',
  },
  {
    id: 'B1234562',
    name: 'Tran Thi B',
    gender: 'female',
    email: 'b@example.com',
    phone: '0987654321',
    status: 'graduated',
  },
  {
    id: 'B1234563',
    name: 'Le Van C',
    gender: 'male',
    email: 'c@example.com',
    phone: '0111222333',
    status: 'block',
  },
];

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getUsersMock(): Promise<ResponseData<User[]>> {
  let users = getItem<User[]>(KEY);

  if (!Array.isArray(users) || users.length === 0) {
    users = mockUsers;
    await setItem(KEY, users);
  }

  return {
    message: 'Mocked user list',
    success: true,
    data: users,
  };
}

export async function getUserMock(id: string): Promise<ResponseData<User>> {
  const users = getItem<User[]>(KEY) || [];

  const user = users.find((u) => u.id === id) || null;

  return {
    message: user ? 'Found user' : 'User not found',
    success: !!user,
    data: user,
  };
}

export async function createUserMock(user: User): Promise<ResponseData<User>> {
  let users = getItem<User[]>(KEY) || [];

  if (users.some((u) => u.id === user.id)) {
    return {
      message: 'User ID already exists',
      success: false,
      data: null,
    };
  }

  users.push(user);
  await setItem(KEY, users);

  return {
    message: 'User created successfully',
    success: true,
    data: user,
  };
}

export async function updateUserMock(
  update: Partial<User> & { id: string }
): Promise<ResponseData<User>> {
  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === update.id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  const updatedUser = { ...users[index], ...update };
  users[index] = updatedUser;

  await setItem(KEY, users);

  return {
    message: 'User updated successfully',
    success: true,
    data: updatedUser,
  };
}

export async function changeStatusUserMock(
  id: string,
  status: 'active' | 'block' | 'graduated'
): Promise<ResponseData<User>> {
  await delay(1000);

  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  const updatedUser = { ...users[index], status };
  users[index] = updatedUser;

  await setItem(KEY, users);

  return {
    message: 'User status changed',
    success: true,
    data: updatedUser,
  };
}

export async function deleteUserMock(id: string): Promise<ResponseData<null>> {
  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  users.splice(index, 1);
  await setItem(KEY, users);

  return {
    message: 'User deleted successfully',
    success: true,
    data: null,
  };
}
