import { cn } from "~/lib/utils";

interface GridCell {
  id: string;
  filled: boolean;
  content?: string;
  thumbnail?: string;
}

interface GridProps {
  cells: GridCell[];
  onCellClick: (id: string) => void;
}

export function Grid({ cells, onCellClick }: GridProps) {
  return (
    <div className="bg-card grid aspect-square grid-cols-5 rounded-xl p-1 sm:p-2">
      {new Array(25).fill("a").map((cell: GridCell, index) => (
        <button
          key={index} // have to use index; cells may be undefined
          onClick={() => onCellClick(cell.id)}
          className={cn(
            "relative aspect-square bg-white transition-all",
            "hover:scale-[0.98] active:scale-[0.97]",
            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
            cell.filled && "bg-background shadow-xs",
            "border-gray-300",
            index % 5 !== 4 && "border-r-2",
            index < 20 && "border-b-2",
          )}
        >
          {cell.filled && cell.content && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              {cell.content}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
