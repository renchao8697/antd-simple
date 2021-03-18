export type ICarryOutCalendar = Record<string, CarryOutItem[]>;

export interface ICarryOutItem {
  value: number;
  checked: boolean;
}
