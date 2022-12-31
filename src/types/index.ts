export interface user {
    login: string;
    name: string;
    password: string;
    avatarUrl?: string;
  }
  
export type userView = Omit<user, "passowrd">;