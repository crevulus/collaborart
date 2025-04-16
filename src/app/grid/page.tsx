"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

import { ActiveArtists } from "~/components/ActiveArtists";
import { Grid } from "~/components/Grid";
import { ExportModal } from "~/components/ExportModal";
import { AddArtistModal } from "~/components/AddArtistModal";
import { Progress } from "~/components/ui/progress";
import { AppHeader } from "~/components/AppHeader";
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

  const { data: gridByArtist } = api.grids.getGridByArtist.useQuery(
    { artist_id: Number(artistId) ?? 0 },
    { enabled: !!artistId && !gridId },
  );

  const effectiveGridId = gridId ?? gridByArtist?.id;

  const { data: squares } = api.squares.getSquaresByGrid.useQuery(
    { grid_id: Number(effectiveGridId) ?? 0 },
    { enabled: !!effectiveGridId },
  );

  const filledSquaresCount =
    squares?.filter((square) => square.drawing_data || square.image_url)
      .length ?? 0;
  const totalSquares = squares?.length ?? 25; // Default to 25 if squares are not loaded yet

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
        <ActiveArtists variant="compact" onAddClick={handleAddArtist} />

        <Grid cells={gridData} onCellClick={handleCellClick} />

        <div className="space-y-2">
          <Progress value={(filledSquaresCount / totalSquares) * 100} />
          <p className="text-muted-foreground text-center text-sm font-medium">
            {filledSquaresCount}/{totalSquares}
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
