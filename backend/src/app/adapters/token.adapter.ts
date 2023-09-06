export interface IValidateToken {
  token: string;
}

export interface IRefreshToken { 
  type: 'access_token'; 
  sub: string; 
  email: string; 
  deviceId?: string; 
  iat: number; 
  exp: number; 
  userData: { 
    name: string; 
    description?: string | null;
    level: number;
    imageUrl?: string | null; 
    createdAt: string; 
    updatedAt: string; 
  } 
}

export abstract class TokenAdapter {
  abstract validate(input: IValidateToken): Promise<IRefreshToken>;
  abstract create(input: IRefreshToken): Promise<string>;
}
