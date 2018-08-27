export interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  key?: string;
  created_at?: string;
}

export interface Token {
  token: string;
}

export interface GeneratedToken {
  id: string;
  iat: string;
  exp: string;
}

export interface PasswordData {
  password: string;
  key: string;
}
