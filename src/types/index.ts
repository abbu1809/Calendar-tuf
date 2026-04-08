export interface Note {
  id: string;
  date: string;
  text: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}
