"use client";

import { useRouter } from "next/navigation";
import { useRef, use } from "react";
import { AppHeader } from "~/components/AppHeader";
import { Draw } from "~/components/Draw";
import type { INextPageProps } from "~/lib/types";
import { SearchParams } from "~/enums/general";

export default function CanvasPage({ searchParams }: INextPageProps) {
  const router = useRouter();
  const { [SearchParams.CellId]: cellId } = use(searchParams);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSave = () => {
    if (!canvasRef.current) return;

    router.push(`/grid${cellId ? `?${SearchParams.CellId}=${cellId}` : ""}`);
  };

  return (
    <div className="bg-background flex flex-1 flex-col">
      <AppHeader
        showIcons={true}
        onBack={() => router.back()}
        onSave={handleSave}
        title="Canvas"
      />

      <Draw canvasRef={canvasRef} />
    </div>
  );
}
