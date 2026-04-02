"use client";

import React, { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
    url: string;
    onThresholdReached: () => void;
    threshold?: number; // 0 to 1
}

export default function VideoPlayer({
    url,
    onThresholdReached,
    threshold = 0.8,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasReachedThreshold, setHasReachedThreshold] = useState(false);

    const handleTimeUpdate = () => {
        if (!videoRef.current || hasReachedThreshold) return;

        const progress = videoRef.current.currentTime / videoRef.current.duration;
        if (progress >= threshold) {
            setHasReachedThreshold(true);
            onThresholdReached();
        }
    };

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black group">
            <video
                ref={videoRef}
                src={url}
                className="w-full h-full object-contain"
                controls
                onTimeUpdate={handleTimeUpdate}
                controlsList="nodownload noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
                disablePictureInPicture
            />

            {/* Premium Overlay (Optional) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}
