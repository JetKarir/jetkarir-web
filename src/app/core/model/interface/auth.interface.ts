export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface UserContext {
  hasCandidateProfile: boolean;
  companyMemberships: {
    companyId: string;
    companyName: string;
    role: string;
  }[];
  isPlatformAdmin: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  status: string;
  contexts: UserContext;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  status: string;
  emailVerifiedAt: string | null;
  createdAt: string;
}
