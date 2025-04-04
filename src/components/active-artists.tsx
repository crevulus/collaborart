"use client";

import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { api } from "~/trpc/react";
import { ArtistList } from "~/components/artist-list";

export function ActiveArtists() {
  const { getValue: getDeviceId } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });

  const { data: activeGrid } = api.grids.getActiveGrid.useQuery(
    { device_id: getDeviceId() },
    { enabled: !!getDeviceId() },
  );

  const { data: artists } = api.grids.getArtists.useQuery(
    { grid_id: Number(activeGrid?.id) ?? 0 },
    { enabled: !!activeGrid?.id },
  );

  // Ensure we have valid data before rendering
  if (!activeGrid?.id || !artists?.length) {
    return null;
  }

  // Filter out any artists with missing data
  const validArtists = artists.filter(
    (artist) => artist?.id && artist?.username,
  );

  return <ArtistList artists={validArtists} />;
}
