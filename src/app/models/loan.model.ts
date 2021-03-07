export interface LoanModel {
  uid?: string;
  uidOwner?: string;
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  status?: string;
  email?: string;
  interestRate?: number;
  principalAmount?: number;
  total: number;
  nrc?: string;
  dateCreated?: any;
  approvedByFirstname?: string;
  approvedByLastname?: string;
  approvedByUID?: string;
}
