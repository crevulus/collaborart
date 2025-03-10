// import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HydrateClient } from "~/trpc/server";
import { CreateArtistButton } from "~/components/create-artist-button";
import { AppHeader } from "~/components/app-header";

const mockActiveGrid = {
  id: "1",
  artists: [
    { id: "1", name: "Dad", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Mum", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Chris", avatar: "/placeholder.svg?height=100&width=100" },
  ],
};

export default async function Home() {
  const createNewGrid = async () => {
    "use server";
  };

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="container mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-16 px-4">
          {/* {mockActiveGrid ? (
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
          ) : null} */}

          <CreateArtistButton hasActiveGrid={!!mockActiveGrid} />
        </main>
      </div>
    </HydrateClient>
  );
}
