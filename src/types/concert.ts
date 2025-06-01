export interface Concert {
  id: string;
  name: string;
  description: string;
  seat: number;
}

export interface ConcertCardProps {
  permission: "admin" | "user";
  isReservedByCurrentUser?: boolean;
  isProcessing?: boolean;
  concert: Concert;
  onDelete?: () => void;
  onReserve?: () => void;
  onCancel?: () => void;
}

export interface ConcertList {
  list: Concert[];
  totalSeats: number;
}
