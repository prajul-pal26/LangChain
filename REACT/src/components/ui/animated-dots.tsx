"use client";

import { useEffect, useRef } from "react";

interface AnimatedDotsProps {
    className?: string;
    dotColor?: string;
    dotSize?: number;
    speed?: number;
}

export function AnimatedDots({
    className = "",
    dotColor = "rgba(255, 255, 255, 0.5)",
    dotSize = 2,
    speed = 0.5
}: AnimatedDotsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initDots();
        };

        const initDots = () => {
            const numDots = Math.floor((canvas.width * canvas.height) / 10000);
            dots = [];
            for (let i = 0; i < numDots; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    opacity: Math.random() * 0.6 + 0.4,
                });
            }
        };

        const drawDots = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dots.forEach((dot, i) => {
                dot.x += dot.vx;
                dot.y += dot.vy;

                if (dot.x < 0) dot.x = canvas.width;
                if (dot.x > canvas.width) dot.x = 0;
                if (dot.y < 0) dot.y = canvas.height;
                if (dot.y > canvas.height) dot.y = 0;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
                ctx.fill();

                dots.forEach((otherDot, j) => {
                    if (i === j) return;
                    const dx = dot.x - otherDot.x;
                    const dy = dot.y - otherDot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(otherDot.x, otherDot.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(drawDots);
        };

        resizeCanvas();
        drawDots();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotColor, dotSize, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
}
