export interface User {
  id: number;
  username: string;
  phone: string;
  avatar: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  password: string;
  avatar: string;
}

export interface RegisterResponse {
  access_token: string;
  user: User;
} 