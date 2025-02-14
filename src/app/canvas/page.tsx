"use client";

import { useRouter } from "next/navigation";
import { useRef, use } from "react";
import { AppHeader } from "~/components/app-header";
import Draw from "~/components/draw";
import type { INextPageProps } from "~/lib/types";

export default function CanvasPage({ searchParams }: INextPageProps) {
  const router = useRouter();
  const { cell } = use(searchParams);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSave = () => {
    if (!canvasRef.current) return;

    router.push(`/grid${cell ? `?cell=${cell}` : ""}`);
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
