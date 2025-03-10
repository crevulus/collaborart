"use client"; // TODO: Remove this line?

import { PinInput } from "~/components/pin-input";
import type { INextPageProps } from "~/lib/types";
import { use } from "react";
// import { AppHeader } from '@/components/header'

const mockArtists = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Guitarist",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Vocalist",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Drummer",
  },
  {
    id: "4",
    name: "Alice Brown",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Bassist",
  },
];

export default function PinInputPage({ searchParams }: INextPageProps) {
  const { artistId } = use(searchParams);

  const artist = mockArtists.find((a) => a.id === artistId) ?? mockArtists[0];

  if (!artist) {
    return null;
  }

  return (
    <>
      {/* <AppHeader /> */}
      <div className="flex flex-1 items-center justify-center">
        <PinInput
          username={artist.name}
          avatarUrl={artist.avatar}
          role={artist.role}
          artistId={artist.id}
        />
      </div>
    </>
  );
}
