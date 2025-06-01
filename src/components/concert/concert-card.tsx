import { ConcertCardProps } from "@/types/concert";
import { User, Trash2, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { role } from "@/constants/role";

function ConcertCard({
  permission,
  concert,
  onDelete,
  onReserve,
  isReservedByCurrentUser,
  isProcessing,
}: ConcertCardProps) {
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
        <div>
          {permission === role.admin && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
          {permission === role.user && (
            <>
              {isReservedByCurrentUser ? (
                <Button
                  disabled={isProcessing}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out disabled:opacity-50" // Cancel button
                >
                  <X className="w-4 h-4" />
                  {isProcessing ? "Cancelling..." : "Cancel Reserve"}
                </Button>
              ) : concert.seat > 0 ? (
                <Button
                  onClick={onReserve}
                  disabled={isProcessing}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out disabled:opacity-50" // Reserve button
                >
                  <Ticket className="w-4 h-4" />
                  {isProcessing ? "Reserving..." : "Reserve Seat"}
                </Button>
              ) : (
                <p className="text-center text-gray-500 font-semibold py-2 px-4 rounded bg-gray-100">
                  Sold Out
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { ConcertCard };
