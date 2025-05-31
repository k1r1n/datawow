export interface Concert {
  id: number;
  name: string;
  description: string;
  seat: number;
}

export interface ConcertCardProps {
  concert: Concert;
  onDelete: () => void;
}
