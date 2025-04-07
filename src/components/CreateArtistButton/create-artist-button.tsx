"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { CreateArtistFlow } from "~/components/CreateArtistFlow";
import Link from "next/link";

interface CreateArtistButtonProps {
  hasActiveGrid: boolean;
}

export function CreateArtistButton({ hasActiveGrid }: CreateArtistButtonProps) {
  const [showCreateArtist, setShowCreateArtist] = useState(false);

  return (
    <>
      <Button
        variant="neutral"
        size="icon"
        className={`hover:border-primary hover:bg-primary/5 rounded-full border-2 border-dashed transition-all duration-200 ${hasActiveGrid ? "h-24 w-24" : "h-40 w-40"} `}
        onClick={() => setShowCreateArtist(true)}
      >
        <Plus className={hasActiveGrid ? "h-8 w-8" : "h-12 w-12"} />
        <span className="sr-only">Create New Grid</span>
      </Button>

      <CreateArtistFlow
        open={showCreateArtist}
        onClose={() => setShowCreateArtist(false)}
      />
    </>
  );
}
