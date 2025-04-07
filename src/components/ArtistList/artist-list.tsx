"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "~/lib/utils";
import { PinInputModal } from "~/components/PinInputModal";

interface Artist {
  id: bigint;
  username: string;
  pin: number;
}

interface ArtistListProps {
  artists: Artist[];
  onAddClick?: () => void;
  avatarSize?: "sm" | "md" | "lg";
  alignment?: "left" | "center" | "right";
}

export function ArtistList({
  artists,
  onAddClick,
  avatarSize = "lg",
  alignment = "center",
}: ArtistListProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const showAddButton = !!onAddClick;

  if (!artists?.length && !showAddButton) {
    return null;
  }

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handleCloseModal = () => {
    setSelectedArtist(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={cn(
          "flex w-full items-center justify-around gap-4",
          alignment === "left" && "justify-start",
          alignment === "right" && "justify-end",
        )}
      >
        {artists.map((artist) => {
          if (!artist?.username) return null;

          return (
            <button
              key={artist.id.toString()}
              onClick={() => handleArtistClick(artist)}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative">
                <Avatar avatarSize={avatarSize}>
                  <AvatarFallback>
                    {artist.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-medium">{artist.username}</span>
            </button>
          );
        })}
        {showAddButton && (
          <div className="flex flex-col items-center gap-3">
            <Button
              size="icon"
              className={
                "text-md h-16 w-16 rounded-full border-2 border-dashed"
              }
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
      {selectedArtist && (
        <PinInputModal
          open={!!selectedArtist}
          onClose={handleCloseModal}
          artist={{
            id: selectedArtist.id.toString(),
            username: selectedArtist.username,
            pin: selectedArtist.pin,
          }}
        />
      )}
    </div>
  );
}
