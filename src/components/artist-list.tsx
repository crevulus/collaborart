import Link from "next/link";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "~/lib/utils";

interface Artist {
  id: bigint;
  username: string;
}

interface ArtistListProps {
  artists: Artist[];
  onAddClick?: () => void;
  avatarSize?: "sm" | "md" | "lg";
  alignment?: "left" | "center" | "right";
}

const avatarClasses = {
  sm: "h-16 w-16 text-md",
  md: "h-20 w-20 text-lg",
  lg: "h-24 w-24 text-xl",
};

export function ArtistList({
  artists,
  onAddClick,
  avatarSize = "lg",
  alignment = "center",
}: ArtistListProps) {
  const showAddButton = !!onAddClick;

  if (!artists?.length && !showAddButton) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-around gap-4",
        alignment === "left" && "justify-start",
        alignment === "right" && "justify-end",
      )}
    >
      {artists.map((artist) => {
        if (!artist?.username) return null;

        const initials = artist.username.slice(0, 1).toUpperCase();

        return (
          <Link
            key={artist.id.toString()}
            href={`/pin-input?artistId=${artist.id}`}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative">
              <Avatar
                className={cn(
                  `border-border border-1 transition-transform group-hover:scale-105`,
                  avatarClasses[avatarSize],
                )}
              >
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm font-medium">{artist.username}</span>
          </Link>
        );
      })}

      {showAddButton && (
        <div className="flex flex-col items-center gap-3">
          <Button
            size="icon"
            className={cn(
              `rounded-full border-2 border-dashed`,
              avatarClasses[avatarSize],
            )}
            onClick={onAddClick}
          >
            <Plus
              className={`${avatarSize === "lg" ? "h-8 w-8" : "h-6 w-6"}`}
            />
          </Button>
          <span className="text-muted-foreground text-sm font-medium">
            Add Artist
          </span>
        </div>
      )}
    </div>
  );
}
