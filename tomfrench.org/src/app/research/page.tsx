import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

export default function ResearchPage() {
    const researchTopics = [
        {
            title: "Immigration in the UK",
            description: "Economic impacts, policy analysis, and social integration patterns of immigration in the United Kingdom.",
            slug: "immigration-uk",
            icon: Globe,
            status: "active",
            color: "bg-blue-50 text-blue-700 border-blue-200"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-6xl mx-auto px-6 py-8">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-heading mb-4">Research</h1>
                        <p className="text-foreground/80 text-lg">
                            Exploring topics that spark curiosity and drive deeper understanding.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {researchTopics.map((topic) => {
                            const IconComponent = topic.icon;
                            return (
                                <Link key={topic.slug} href={`/research/${topic.slug}`}>
                                    <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer h-full">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${topic.color}`}>
                                                        <IconComponent size={20} />
                                                    </div>
                                                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                                                </div>
                                                <Badge variant="neutral" className="text-xs">
                                                    {topic.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-foreground/70">{topic.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <Card className="border-dashed">
                            <CardContent className="text-center py-12">
                                <p className="text-foreground/60 mb-2">More research topics coming soon</p>
                                <p className="text-sm text-foreground/40">
                                    Topics will cover areas like technology, policy, economics, and social sciences.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}