export interface Transaction {
  id: number;
  accountId: number;
  type: string;
  amount: number;
  date: number;
  description: string;
}