export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  status: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  user: AuthUser;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  status: string;
  emailVerifiedAt: string | null;
  createdAt: string;
}
