export type UserInfo = {
  id: string;
  email: string;
  userId: string;
  displayName?: string;
  profileUrl?: string;
  isVerified?: boolean;
  lastedLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CredentialOTP = {
  createdAt: Date;
  id: string;
  ttl: number;
};

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
  expiration?: number;
};
