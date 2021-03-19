export interface AccountItem {
  _id: string;
  createdAt: Date;
  amount: number;
  date: Date;
  desc: string;
  status: string;
}

export interface AccountParams {
  status?: string;
  desc?: string;
  createStart?: string;
  createEnd?: string;
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
