export interface Concert {
  id: number;
  title: string;
  description: string;
  seats: number;
}

export interface ConcertCardProps {
  concert: Concert;
  onDelete: () => void;
}
