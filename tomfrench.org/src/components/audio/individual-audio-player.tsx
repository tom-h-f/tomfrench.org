'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2 } from 'lucide-react';

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

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // No need to track time/duration for infinite streams
        // Remove the ended handler to allow infinite looping

        return () => {
            // Cleanup if needed
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0];
        }
    }, [volume]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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
                    src={track.src}
                    preload="metadata"
                    loop
                />
            </CardContent>
        </Card>
    );
}
