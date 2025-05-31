import { ConcertCardProps } from "@/types/concert-list";
import { User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConcertCard({ concert, onDelete }: ConcertCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <h3 className="text-lg font-medium text-blue-600 mb-4">
        {concert?.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {concert?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">
            {concert?.seat?.toLocaleString()}
          </span>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export { ConcertCard };
