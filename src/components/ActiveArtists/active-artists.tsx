"use client";

import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { api } from "~/trpc/react";
import { ArtistList } from "~/components/ArtistList";

interface ActiveArtistsProps {
  variant?: "primary" | "compact";
  onAddClick?: () => void;
}

export function ActiveArtists({
  variant = "primary",
  onAddClick,
}: ActiveArtistsProps) {
  const { getValue: getDeviceId } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });

  const { data: activeGrid } = api.grids.getActiveGrid.useQuery(
    { device_id: getDeviceId() },
    { enabled: !!getDeviceId() },
  );

  const { data: artists } = api.artists.getArtists.useQuery(
    { grid_id: Number(activeGrid?.id) ?? 0 },
    { enabled: !!activeGrid?.id },
  );

  if (!activeGrid?.id || !artists?.length) {
    return null;
  }

  const validArtists = artists.filter(
    (artist) => artist?.id && artist?.username,
  );

  return (
    <ArtistList
      artists={validArtists}
      variant={variant}
      onAddClick={onAddClick}
    />
  );
}
