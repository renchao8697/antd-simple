export type ICarryOutCalendar = Record<string, ICarryOutItem[]>;

export interface ICarryOutItem {
  type: string;
  checked: boolean;
}

export interface ITagData {
  date: string;
  tagData: ICarryOutItem[];
}
