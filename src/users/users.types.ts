import { IRole } from "../roles/roles.types";

export interface IUser {
  id: number;
  role_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  apple_id: string;
  facebook_id: string;
  google_id: string;
}

export interface IUserUpdate {
  role?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  password?: string;
}

export interface ISeriealizedUser {
  id: number;
  role: IRole;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}

export type IFindBy = { username: string } | { email: string } | { apple_id: string } | { facebook_id: string } | { google_id: string };
