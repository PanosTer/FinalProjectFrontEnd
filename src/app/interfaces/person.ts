export interface Person {
  _id?: string;
  username: string;
  password: string;
  givenName: string;
  surName: string;
  age: number;
  email: string;
  address: string;
  photoURL?: string;
}

export interface ChangePassword {
  Currentassword: string,
  Newassword: string,
  ConfirmPassword: string
}

