import { useEffect, useState, type RefObject } from "react";
import { Eraser, Paintbrush2, Trash2, Undo2 } from "lucide-react";
import { COLOURS } from "~/lib/constants";
import Canvas from "../Canvas/canvas";
import { Button } from "../ui/button";

interface IDrawProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function Draw({ canvasRef }: IDrawProps) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLOURS[0]);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true }); // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently

      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;

      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        setContext(ctx);

        const initialState = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        setUndoStack([initialState]);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e?.touches[0]?.clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e?.touches[0]?.clientY : e.clientY) - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = tool === "brush" ? color : "#FFFFFF";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !context || !canvasRef.current) return;

    setIsDrawing(false);
    context.closePath();

    const canvas = canvasRef.current;
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, newState]);
  };

  const handleUndo = () => {
    if (!context || !canvasRef.current || undoStack.length <= 1) return;

    const newStack = [...undoStack];
    newStack.pop();
    const previousState = newStack[newStack.length - 1];

    context.putImageData(previousState, 0, 0);
    setUndoStack(newStack);
  };

  const handleClear = () => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([newState]);
  };

  return (
    <main className="container mx-auto max-w-3xl flex-1 touch-none space-y-4 overscroll-none p-4">
      <Canvas
        canvasRef={canvasRef}
        startDrawing={startDrawing}
        draw={draw}
        stopDrawing={stopDrawing}
      />

      <div className="grid grid-cols-8 gap-2">
        {COLOURS.map((c) => (
          <button
            key={c}
            className="aspect-square rounded-full border-2 transition-transform hover:scale-110 active:scale-95"
            style={{
              backgroundColor: c,
              borderColor: color === c ? "var(--primary)" : "transparent",
            }}
            onClick={() => {
              setColor(c);
              setTool("brush");
            }}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant={tool === "brush" ? "noShadow" : "neutral"}
          className="aspect-square"
          onClick={() => setTool("brush")}
        >
          <Paintbrush2 className="h-6 w-6" />
        </Button>
        <Button
          variant={tool === "eraser" ? "noShadow" : "neutral"}
          className="aspect-square"
          onClick={() => setTool("eraser")}
        >
          <Eraser className="h-6 w-6" />
        </Button>
        <Button
          variant="neutral"
          className="aspect-square"
          onClick={handleUndo}
          disabled={undoStack.length <= 1}
        >
          <Undo2 className="h-6 w-6" />
        </Button>
        <Button
          variant="neutral"
          className="aspect-square"
          onClick={handleClear}
        >
          <Trash2 className="h-6 w-6" />
        </Button>
      </div>
    </main>
  );
}
