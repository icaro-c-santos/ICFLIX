export interface user {
    login: string;
    name: string;
    passowrd: string;
    avatarUrl: string;
  }
  
export type userView = Omit<user, "passowrd">;