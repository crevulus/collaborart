import { HydrateClient } from "~/trpc/server";
import { CreateArtistButton } from "~/components/create-artist-button";
import { AppHeader } from "~/components/app-header";
import { ActiveArtists } from "~/components/active-artists";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="container mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-16 px-4">
          <ActiveArtists />
          <CreateArtistButton hasActiveGrid={true} />
        </main>
      </div>
    </HydrateClient>
  );
}
