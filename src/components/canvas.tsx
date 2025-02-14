interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => void;
  draw: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => void;
  stopDrawing: () => void;
}

export default function Canvas({
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
}: CanvasProps) {
  if (!canvasRef?.current) return null;

  return (
    <div className="bg-card relative aspect-square rounded-xl border">
      <canvas
        // @ts-expect-error - cannot be null, already checked
        ref={canvasRef}
        className="h-full w-full rounded-xl bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}
