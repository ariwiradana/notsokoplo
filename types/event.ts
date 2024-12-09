export interface Event {
  event: string;
  date: string;
  address: string;
  link: string;
  category: "private" | "public";
}
