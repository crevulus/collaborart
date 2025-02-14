import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "~/lib/utils";

interface Artist {
  id: string;
  name: string;
  avatar: string;
}

interface ArtistListProps {
  artists: Artist[];
  lastContributorId: string;
  onAddArtist: () => void;
}

export function ArtistList({
  artists,
  lastContributorId,
  onAddArtist,
}: ArtistListProps) {
  const canContribute = (id: string) => id !== lastContributorId;

  return (
    <div className="-mx-4 flex items-center gap-6 overflow-x-auto px-4 py-2">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className={cn(
            "flex flex-col items-center gap-2",
            !canContribute(artist.id) && "opacity-50",
          )}
        >
          <Avatar
            className={cn(
              "h-16 w-16 border-2",
              canContribute(artist.id) ? "border-primary" : "border-muted",
            )}
          >
            <AvatarImage src={artist.avatar} alt={artist.name} />
            <AvatarFallback>
              {artist.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="whitespace-nowrap text-sm font-medium">
            {artist.name}
          </span>
        </div>
      ))}

      <div className="flex flex-col items-center gap-2">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full border-2 border-dashed"
          onClick={onAddArtist}
        >
          <Plus className="h-6 w-6" />
        </Button>
        <span className="text-muted-foreground whitespace-nowrap text-sm font-medium">
          Add Artist
        </span>
      </div>
    </div>
  );
}
