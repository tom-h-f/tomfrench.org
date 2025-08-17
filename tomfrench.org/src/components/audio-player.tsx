'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioTrack {
    id: string;
    title: string;
    src: string;
    duration?: number;
}

interface AudioPlayerProps {
    tracks: AudioTrack[];
    category: string;
}

export function AudioPlayer({ tracks, category }: AudioPlayerProps) {
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([0.7]);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;

        // Enhanced seamless looping
        const handleTimeUpdate = () => {
            // When very close to the end, immediately restart
            if (audio.duration && audio.currentTime >= audio.duration - 0.05) {
                audio.currentTime = 0;
            }
        };

        const handleEnded = () => {
            // Fallback in case timeupdate doesn't catch it
            audio.currentTime = 0;
            if (isPlaying) {
                audio.play().catch(console.error);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0];
        }
    }, [volume]);

    const playTrack = (track: AudioTrack) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="space-y-4 h-full w-full">
            {/* Track List */}
            <div className="space-y-2">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="flex items-center justify-between p-3 border-2 border-border rounded-base hover:bg-secondary-background cursor-pointer"
                        onClick={() => playTrack(track)}
                    >
                        <div className="flex items-center gap-3">
                            <Button
                                size="sm"
                                variant={currentTrack?.id === track.id && isPlaying ? "default" : "neutral"}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (currentTrack?.id === track.id) {
                                        togglePlayPause();
                                    } else {
                                        playTrack(track);
                                    }
                                }}
                            >
                                {currentTrack?.id === track.id && isPlaying ? (
                                    <Pause size={14} />
                                ) : (
                                    <Play size={14} />
                                )}
                            </Button>
                            <span className="text-sm font-medium">{track.title}</span>
                        </div>
                        {currentTrack?.id === track.id && (
                            <Badge variant="default">Playing</Badge>
                        )}
                    </div>
                ))}
            </div>

            {/* Player Controls */}
            {currentTrack && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Now Playing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-medium mb-2">{currentTrack.title}</p>
                            <p className="text-xs text-foreground/60">{category}</p>
                        </div>

                        {/* Progress Bar - Show as infinite stream */}
                        <div className="space-y-2">
                            <div className="text-center text-xs text-foreground/60 py-2">
                                🔄 Infinite Loop • Seamless Audio Stream
                            </div>
                            <div className="flex justify-center text-xs text-foreground/60">
                                <span>Playing continuously</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <Button onClick={togglePlayPause} size="sm" className="cursor-pointer flex items-center gap-2">
                                {isPlaying ? (
                                    <>
                                        <Pause size={14} />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play size={14} />
                                        Play
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Volume Control - Moved to bottom */}
                        <div className="mt-8">
                            <div className="flex items-center gap-2 w-32">
                                <Volume2 size={14} />
                                <Slider
                                    value={volume}
                                    max={1}
                                    step={0.1}
                                    onValueChange={setVolume}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Hidden Audio Element with Enhanced Looping */}
            {currentTrack && (
                <audio
                    ref={audioRef}
                    src={currentTrack.src}
                    preload="auto"
                    onLoadedData={() => {
                        if (isPlaying && audioRef.current) {
                            audioRef.current.play().catch(console.error);
                        }
                    }}
                />
            )}
        </div>
    );
}
