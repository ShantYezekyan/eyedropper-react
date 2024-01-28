import { useEffect, useRef, useState, useCallback } from "react";

type CanvasProps = {
  imageUrl: string;
};

const Canvas = ({ imageUrl }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const adjustCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const aspectRatio = imageSize.width / imageSize.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newCanvasWidth = viewportWidth;
    let newCanvasHeight = newCanvasWidth / aspectRatio;

    if (newCanvasHeight > viewportHeight) {
      newCanvasHeight = viewportHeight;
      newCanvasWidth = newCanvasHeight * aspectRatio;
    }

    canvas.style.width = `${newCanvasWidth}px`;
    canvas.style.height = `${newCanvasHeight}px`;
  }, [imageSize.width, imageSize.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        setImageSize({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        ctx?.drawImage(image, 0, 0);
        adjustCanvasSize();
      }
    };

    window.addEventListener("resize", adjustCanvasSize);
    return () => window.removeEventListener("resize", adjustCanvasSize);
  }, [imageUrl, adjustCanvasSize]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
