export interface UserModel {
  uid?: string;
  fullname?: string;
  firstname?: string;
  lastname?: string;
  active?: boolean;
  sections?: any;
  paths?: any;
  roleName?: string;
  roleUID?: string;
  accountStatus?: string;
  role?: string;
  isNew?: boolean;
  phoneNumber?: string;
  lastSignInTime?: any;
  lastSeen?: any;
  status?: string;
  email?: string;
  loanCount?:number;
  interestRate?: number;
  loanAmount?: number;
  nrc?: string;
  gender?: string;
  title?: string;
  dateCreated?: any;
}
