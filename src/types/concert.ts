export interface Concert {
  id: string;
  name: string;
  description: string;
  seat: number;
}

export interface ConcertCardProps {
  concert: Concert;
  onDelete: () => void;
  onReserve: () => void;
}

export interface ConcertList {
  list: Concert[];
  totalSeats: number;
}
