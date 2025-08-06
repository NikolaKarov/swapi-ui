export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  access_token?: string;
  user?: object;
}
