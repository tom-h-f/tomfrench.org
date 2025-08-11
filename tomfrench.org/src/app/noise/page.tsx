import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndividualAudioPlayer } from "@/components/individual-audio-player";
import { ArrowLeft, Waves, Building2, Music } from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Audio track definitions with categories
const allTracks = [
    { id: "brown-noise", title: "Brown Noise", src: "/audio/brown_noise.mp3", category: "Ambient", iconType: "waves" },
    { id: "office-sounds", title: "Office Environment", src: "/audio/office.mp3", category: "Environment", iconType: "building" },
    { id: "coffee-shop", title: "Coffee Shop", src: "/audio/coffee_shop.mp3", category: "Environment", iconType: "building" },
    { id: "focus-playlist", title: "Focus Playlist", src: "/audio/focus_playlist.mp3", category: "Music", iconType: "music" },
] as const;

export default function NoisePage() {
    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            {/* Top Navigation */}
            <div className="absolute top-4 left-4 z-10">
                <Button asChild variant="neutral" size="sm">
                    <Link href="/" className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Home
                    </Link>
                </Button>
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 pt-16">
                {/* Compact Boombox Header */}
                <div className="w-full max-w-7xl mb-6">
                    <Card className="bg-gradient-to-b from-secondary-background to-background border-4 border-border shadow-[4px_4px_0px_0px_var(--border)]">
                        <div className="flex justify-between items-center p-4">
                            <div className="w-16 h-12 bg-main rounded-base border-2 border-border flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-1">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className="w-0.5 h-0.5 bg-border rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 mx-6 bg-border/20 rounded-base border-2 border-border flex items-center justify-center py-2">
                                <h1 className="text-xl font-heading tracking-wider">NOISE MACHINE</h1>
                            </div>
                            <div className="w-16 h-12 bg-main rounded-base border-2 border-border flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-1">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className="w-0.5 h-0.5 bg-border rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Scrollable Audio Grid */}
                <div className="flex-1 w-full max-w-7xl overflow-hidden">
                    <ScrollArea className="h-full w-full rounded-lg">
                        <div className="flex gap-4 h-full min-w-max px-2 py-2">
                            {allTracks.map((track) => (
                                <div key={track.id} className="flex-shrink-0 w-64 h-full">
                                    <EnhancedAudioCard track={track} />
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="mt-2" />
                    </ScrollArea>
                </div>

                {/* Bottom Decorative Strip */}
                <div className="w-full max-w-7xl mt-4">
                    <div className="flex justify-center items-center gap-4 py-2">
                        <div className="w-6 h-6 bg-main rounded-full border-2 border-border"></div>
                        <div className="w-8 h-3 bg-border/30 rounded-full"></div>
                        <div className="w-6 h-6 bg-main rounded-full border-2 border-border"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Audio Card Component with Category Badge
function EnhancedAudioCard({ track }: { track: typeof allTracks[number] }) {
    const getIcon = (iconType: string) => {
        switch (iconType) {
            case 'waves':
                return Waves;
            case 'building':
                return Building2;
            case 'music':
                return Music;
            default:
                return Waves;
        }
    };

    const IconComponent = getIcon(track.iconType);

    return (
        <div className="relative h-full">
            {/* Category Badge */}
            <div className="absolute top-2 right-2 z-10">
                <Badge variant="neutral" className="text-xs flex items-center gap-1">
                    <IconComponent size={12} />
                    {track.category}
                </Badge>
            </div>

            {/* Audio Player */}
            <IndividualAudioPlayer track={track} />
        </div>
    );
}
