export interface HistoryEntry {
  id: number;
  timestamp: string;
  userName: string;
  concertName: string;
  action: "cancelled" | "reserved";
}
