// src/data/mockUsers.ts
import { User } from '../types';

type MockUser = User & { password: string };

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user"
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    role: "user"
  }
];