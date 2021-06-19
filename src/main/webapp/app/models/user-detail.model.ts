export class UserDetailModel {
  userId: string;
  email: string;
  displayName: string;
  passwordExpireDate: number;
  roles: any;
  constructor() {
    this.userId = '';
    this.email = '';
    this.displayName = '';
    this.passwordExpireDate = 0;
    this.roles = [];
  }
}
