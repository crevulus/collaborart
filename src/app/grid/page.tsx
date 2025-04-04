"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

import { ArtistList } from "~/components/artist-list";
import { Grid } from "~/components/grid";
import { ExportModal } from "~/components/export-modal";
import { AddArtistModal } from "~/components/add-artist-modal";
import { Progress } from "~/components/ui/progress";
import { AppHeader } from "~/components/app-header";
import type { INextPageProps } from "~/lib/types";
import { SearchParams } from "~/enums/general";
import { api } from "~/trpc/react";

// Mock data for the grid cells (5x5)
const initialGridData = ["1", "2"].map((emoji, index) => ({
  id: index.toString(),
  filled: emoji !== "❓",
  content: emoji,
  thumbnail: "hi",
}));

export default function GridPage({ searchParams }: INextPageProps) {
  const router = useRouter();
  const { [SearchParams.GridId]: gridId, [SearchParams.Artist]: artistId } =
    use(searchParams);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);
  const [gridData] = useState(initialGridData);

  // If we have an artist ID but no grid ID, fetch the grid by artist
  const { data: gridByArtist } = api.grids.getGridByArtist.useQuery(
    { artist_id: Number(artistId) ?? 0 },
    { enabled: !!artistId && !gridId },
  );

  // Use the grid ID from the URL or from the artist
  const effectiveGridId = gridId ?? gridByArtist?.id;

  // Use the cached data from tRPC
  const { data: artists } = api.grids.getArtists.useQuery(
    { grid_id: Number(effectiveGridId) ?? 0 },
    { enabled: !!effectiveGridId },
  );

  const handleAddArtist = () => {
    setShowAddArtistModal(true);
  };

  const handleCellClick = (id: string) => {
    router.push(`/canvas?${SearchParams.CellId}=${id}`);
  };

  const handleSave = () => {
    setShowExportModal(true);
  };

  return (
    <div className="flex w-full flex-col">
      <AppHeader showIcons onSave={handleSave} />

      <main className="container mx-auto max-w-3xl flex-1 space-y-6 px-4 py-4">
        <ArtistList
          artists={artists ?? []}
          onAddClick={handleAddArtist}
          avatarSize="sm"
          alignment="left"
        />

        <Grid cells={gridData} onCellClick={handleCellClick} />

        <div className="space-y-2">
          <Progress
            value={(gridData.filter((cell) => cell.filled).length / 25) * 100}
          />
          <p className="text-muted-foreground text-center text-sm font-medium">
            {gridData.filter((cell) => cell.filled).length}/25
          </p>
        </div>
      </main>

      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <AddArtistModal
        open={showAddArtistModal}
        onClose={() => setShowAddArtistModal(false)}
      />
    </div>
  );
}
