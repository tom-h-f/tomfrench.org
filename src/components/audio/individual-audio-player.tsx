'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cacheBlob, fetchWithProgress, getCachedBlob } from '@/lib/media-cache';
import { toast } from 'sonner';

interface AudioTrack {
    id: string;
    title: string;
    src: string;
}

interface IndividualAudioPlayerProps {
    track: AudioTrack;
}

export function IndividualAudioPlayer({ track }: IndividualAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([0.7]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const fadeFactorRef = useRef<number>(1);
    const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const lastTimeRef = useRef<number>(0);
    const fadingRef = useRef<"in" | "out" | null>(null);

    useEffect(() => {
        // On mount, attempt to resolve a cached source for this track
        let cancelled = false;
        (async () => {
            try {
                const cached = await getCachedBlob(track.id);
                if (cancelled) return;
                if (cached) {
                    const url = URL.createObjectURL(cached);
                    setObjectUrl(url);
                }
            } catch { }
        })();
        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [track.id]);

    useEffect(() => {
        if (audioRef.current) {
            // Always apply fade factor so user volume is scaled smoothly
            const fade = fadeFactorRef.current;
            audioRef.current.volume = Math.max(0, Math.min(1, volume[0] * fade));
        }
    }, [volume]);

    // Helper to set effective volume when fade changes
    const applyEffectiveVolume = () => {
        if (!audioRef.current) return;
        const fade = fadeFactorRef.current;
        audioRef.current.volume = Math.max(0, Math.min(1, volume[0] * fade));
    };

    const clearFade = () => {
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
        }
        fadingRef.current = null;
    };

    const startFade = (target: number, durationMs: number) => {
        clearFade();
        const start = fadeFactorRef.current;
        const delta = target - start;
        if (durationMs <= 0 || Math.abs(delta) < 0.001) {
            fadeFactorRef.current = target;
            applyEffectiveVolume();
            return;
        }
        const stepMs = 100;
        const steps = Math.ceil(durationMs / stepMs);
        let i = 0;
        fadeIntervalRef.current = setInterval(() => {
            i++;
            const t = Math.min(1, i / steps);
            // Ease in/out with cosine for smoother audio envelope
            const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
            fadeFactorRef.current = start + delta * eased;
            applyEffectiveVolume();
            if (t >= 1) {
                clearFade();
            }
        }, stepMs);
    };

    const ensureSourceAndPlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        // If we already have an object URL (cached or previously fetched), just play
        if (objectUrl) {
            // Start from fade-in
            fadeFactorRef.current = 0;
            applyEffectiveVolume();
            startFade(1, 30000);
            await audio.play();
            setIsPlaying(true);
            return;
        }
        // Otherwise fetch with progress, cache, and then play
        const id = track.id;
        const tId = toast.loading(`Downloading ${track.title}…`, { duration: Infinity });
        try {
            const blob = await fetchWithProgress(track.src, (loaded, total) => {
                if (total) {
                    const pct = Math.min(100, Math.round((loaded / total) * 100));
                    toast.message(`${track.title}: ${pct}%`, { id: tId });
                } else {
                    toast.message(`${track.title}: ${Math.round(loaded / 1024)} KB`, { id: tId });
                }
            });
            await cacheBlob(id, blob);
            const url = URL.createObjectURL(blob);
            setObjectUrl(url);
            toast.success('Ready to play', { id: tId });
            // Fade in on initial play
            fadeFactorRef.current = 0;
            applyEffectiveVolume();
            startFade(1, 30000);
            audio.play();
            setIsPlaying(true);
        } catch {
            toast.error('Failed to download audio', { id: tId });
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            ensureSourceAndPlay();
        }
    };

    // Manage fade-out near loop end and fade-in on loop restart
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onTimeUpdate = () => {
            const t = audio.currentTime || 0;
            const d = audio.duration || 0;
            const prev = lastTimeRef.current;
            // Detect loop restart: time wraps from near end to small value
            if (d && prev > d - 1 && t < 1) {
                // Just looped, start fade-in
                fadingRef.current = "in";
                fadeFactorRef.current = 0;
                applyEffectiveVolume();
                startFade(1, 30000);
            }
            // Start fade-out in the last 30 seconds if not already fading out
            if (d && t >= d - 30 && fadingRef.current !== "out") {
                const remaining = Math.max(0, d - t);
                fadingRef.current = "out";
                startFade(0, Math.round(remaining * 1000));
            }
            lastTimeRef.current = t;
        };
        audio.addEventListener('timeupdate', onTimeUpdate);
        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectUrl, track.id]);

    return (
        <Card className="w-full bg-main/5 border-2 border-border relative">
            <CardContent className="p-4 flex flex-col justify-between  min-h-[280px]">
                <div className="space-y-4 pt-6">
                    {/* Track Title */}
                    <div className="text-center">
                        <h3 className="font-medium text-sm truncate">{track.title}</h3>
                    </div>

                    {/* Play Button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={togglePlayPause}
                            size="lg"
                            className="w-16 h-16 rounded-full cursor-pointer"
                            variant={isPlaying ? "default" : "neutral"}
                        >
                            {isPlaying ? (
                                <Pause size={20} />
                            ) : (
                                <Play size={20} />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Volume Control - Always at bottom */}
                <div className="flex items-center gap-2 mt-auto">
                    <Volume2 size={14} />
                    <Slider
                        value={volume}
                        max={1}
                        step={0.1}
                        onValueChange={setVolume}
                        className="flex-1"
                    />
                </div>

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={objectUrl ?? undefined}
                    data-fallback-src={track.src}
                    preload="metadata"
                    loop
                />
            </CardContent>
        </Card>
    );
}
