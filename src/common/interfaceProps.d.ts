export interface ITask {
  title?: string;
  complete?: boolean;
  desc?: string;
  isImportant?: boolean;
  user: string;
}

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  name: string;
  roles: string;
  dateOfBirth?: Date | undefined;
  address?: string | undefined;
}

export interface IAccount {
  username: string;
  password: string;
}

export interface IAccountUpdate {
  username?: string;
  password?: string;
  name?: string;
  roles?: string;
  dateOfBirth?: Date | undefined;
  address?: string | undefined;
}

export interface ITokenVerify {
  userId: string;
  role: string;
  iat?: number;
}
