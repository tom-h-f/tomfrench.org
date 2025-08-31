import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { MathFeed, type MathEntry } from "@/components/math/math-feed";
import { BookOpen, FlaskConical, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MathPage() {
  const mathEntries: MathEntry[] = [
    /*     {
          slug: "understanding-group-theory",
          title: "Understanding Group Theory: From Basics to Applications",
          type: "post",
          excerpt: "An intuitive introduction to group theory, exploring how this fundamental algebraic structure appears throughout mathematics and its practical applications in cryptography and physics.",
          date: "2025-01-20",
          readTime: "12 min read",
          tags: ["algebra", "group-theory", "applications"],
          difficulty: "intermediate",
          prerequisites: ["basic-algebra", "set-theory"]
        }, */
  ];

  const stats = {
    totalPosts: mathEntries.filter(e => e.type === 'post').length,
    totalProofs: mathEntries.filter(e => e.type === 'proof').length,
    topics: Array.from(new Set(mathEntries.flatMap(e => e.tags))).length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Mathematics</h1>
            <p className="text-xl text-foreground/80">
              Documenting my exploration of mathematical concepts,
              proofs, and their applications in computation and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats */}
              <CardWithHover>
                <CardHeader>
                  <CardTitle className="text-lg">Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-blue-600" />
                      <span className="text-sm">Posts</span>
                    </div>
                    <Badge variant="neutral">{stats.totalPosts}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FlaskConical size={16} className="text-green-600" />
                      <span className="text-sm">Proofs</span>
                    </div>
                    <Badge variant="neutral">{stats.totalProofs}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Topics Covered</span>
                    </div>
                    <Badge variant="neutral">{stats.topics}</Badge>
                  </div>
                </CardContent>
              </CardWithHover>

              {/* Filter Options */}
              <CardWithHover>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Content Type</h4>
                    <div className="space-y-2">
                      <Button variant="neutral" size="sm" className="w-full justify-start">
                        <BookOpen size={14} className="mr-2" />
                        Posts
                      </Button>
                      <Button variant="neutral" size="sm" className="w-full justify-start">
                        <FlaskConical size={14} className="mr-2" />
                        Proofs
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                    <div className="space-y-2">
                      <Button variant="neutral" size="sm" className="w-full justify-start">
                        Beginner
                      </Button>
                      <Button variant="neutral" size="sm" className="w-full justify-start">
                        Intermediate
                      </Button>
                      <Button variant="neutral" size="sm" className="w-full justify-start">
                        Advanced
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CardWithHover>

              {/* Popular Topics */}
              <CardWithHover>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(mathEntries.flatMap(e => e.tags)))
                      .slice(0, 10)
                      .map((tag) => (
                        <Badge key={tag} variant="neutral" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </CardWithHover>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Latest Entries</h2>
                  <p className="text-sm text-foreground/60">
                    {mathEntries.length} total entries
                  </p>
                </div>

                <MathFeed entries={mathEntries} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
