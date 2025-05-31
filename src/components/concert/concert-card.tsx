import { ConcertCardProps } from "@/types/concert-list";
import { User, Trash2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/store/user";
import { useAtomValue } from "jotai";
import { role } from "@/constants/role";

function ConcertCard({ concert, onDelete }: ConcertCardProps) {
  const user = useAtomValue(userAtom);
  console.log(user);

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
          {user.role === role.admin && (
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
          {user.role === role.user && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onDelete}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Reserve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { ConcertCard };
