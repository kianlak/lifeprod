interface EntryRequest {
  userId: string | null;
  title: string;
  date: Date;
  time: number;
  category: string;
  description: string;
}