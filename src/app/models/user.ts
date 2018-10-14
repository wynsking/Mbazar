export class User {
  uid: string;
  emailVerified: boolean;
  phoneNumber?: string;
  displayName: string;
  photoURL?: string;
  disabled?: boolean;
  constructor(public email: string, public password: string) { }
}
