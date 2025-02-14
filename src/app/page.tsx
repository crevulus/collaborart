import Link from "next/link";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { api, HydrateClient } from "~/trpc/server";

const mockActiveGrid = {
  id: "1",
  artists: [
    { id: "1", name: "Dad", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Mum", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Chris", avatar: "/placeholder.svg?height=100&width=100" },
  ],
};

export default async function Home() {
  const hello = await api.devices.hello({ text: "from Chris" });
  const devices = await api.devices.getAll();

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col">
        <main className="container mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-16 px-4">
          {mockActiveGrid ? (
            <div className="flex w-full items-center justify-around">
              {mockActiveGrid.artists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/pin-input?artistId=${artist.id}`}
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-border transition-transform group-hover:scale-105">
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                      <AvatarFallback>{artist.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-sm font-medium">{artist.name}</span>
                </Link>
              ))}
            </div>
          ) : null}

          <Link href="/grid" className="block">
            <Button
              variant="neutral"
              size="icon"
              className={`hover:border-primary hover:bg-primary/5 rounded-full border-2 border-dashed transition-all duration-200 ${mockActiveGrid ? "h-24 w-24" : "h-40 w-40"} `}
            >
              <Plus className={mockActiveGrid ? "h-8 w-8" : "h-12 w-12"} />
              <span className="sr-only">Create New Grid</span>
            </Button>
          </Link>
        </main>
      </div>
    </HydrateClient>
  );
}
