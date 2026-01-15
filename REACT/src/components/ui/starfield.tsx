"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
    className?: string;
    starCount?: number;
    speed?: number;
}

export function Starfield({ className = "", starCount = 100, speed = 0.5 }: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; size: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * 1000,
                    size: Math.random() * 2 + 0.5,
                });
            }
        };

        const drawStars = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            stars.forEach((star) => {
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                    star.z = 1000;
                }

                const sx = (star.x / star.z) * 300 + centerX;
                const sy = (star.y / star.z) * 300 + centerY;
                const size = (1 - star.z / 1000) * star.size * 3;
                const brightness = 1 - star.z / 1000;

                if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
                    ctx.fill();

                    if (brightness > 0.5) {
                        ctx.beginPath();
                        ctx.arc(sx, sy, size * 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.2})`;
                        ctx.fill();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(drawStars);
        };

        resizeCanvas();
        drawStars();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [starCount, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
}
