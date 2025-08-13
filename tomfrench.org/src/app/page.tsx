import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Instagram, Newspaper, Youtube, Globe } from "lucide-react";
// import { getPosts } from "@/lib/posts";

export default function Home() {
  // Mock recent posts for now to avoid build issues
  const recentPosts = [
    {
      title: "Building Modern Web Applications",
      slug: "building-modern-web-apps",
      date: "2025-01-15",
    },
    {
      title: "The Art of Clean Code",
      slug: "art-of-clean-code",
      date: "2025-01-10",
    },
    {
      title: "TypeScript Tips and Tricks",
      slug: "typescript-tips-tricks",
      date: "2025-01-05",
    }
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/tom-h-f", icon: Github },
    { name: "X (Twitter)", url: "https://x.com/tomfrench", icon: Twitter },
    { name: "Instagram", url: "https://instagram.com/tomfrench", icon: Instagram },
  ];

  const frequentSites = [
    { name: "Hacker News", url: "https://news.ycombinator.com", icon: Newspaper },
    { name: "YouTube", url: "https://youtube.com", icon: Youtube },
    { name: "AllSides", url: "https://allsides.com", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Section - Site Navigation */}
          <div className="space-y-6">
            <Link href="/posts">
              <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer my-4 bg-main text-main-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Posts
                    <Badge variant="neutral">{recentPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Thoughts on development, technology, and random musings.
                  </p>

                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <div key={post.slug} className="border-l-2 border-border pl-4 rounded">
                        <h3 className="font-medium text-sm hover:text-main-foreground/40 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-foreground/60 mt-1">
                          {post.date}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-main font-medium">
                    View All Posts →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/notes">
              <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer my-4 bg-main text-main-foreground">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Quick thoughts, references, and knowledge fragments.
                  </p>
                  <div className="text-sm text-main font-medium">
                    Browse Notes →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/noise">
              <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer my-4 bg-main text-main-foreground">
                <CardHeader>
                  <CardTitle>Noise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Ambient sounds for focus and relaxation.
                  </p>
                  <div className="text-sm text-main font-medium">
                    Open Player →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/kanban">
              <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer my-4 bg-main text-main-foreground">
                <CardHeader>
                  <CardTitle>Task Board</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Kanban-style task management for personal projects.
                  </p>
                  <div className="text-sm text-main font-medium">
                    Open Board →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>          {/* Right Section - Profile & Links */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="my-4 bg-main/20 text-main-foreground">
              <CardContent className="text-center space-y-6 pt-6">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-border overflow-hidden">
                  <Image
                    src="/face.jpeg"
                    alt="Tom French"
                    width={2056}
                    height={2056}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-3xl font-heading mb-2">Tom French</h1>
                  <p className="text-foreground/80">Curious Man</p>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <h3 className="font-heading text-sm">Connect</h3>
                  <div className="flex justify-center gap-2">
                    {socialLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Button key={link.name} asChild variant="neutral" size="sm">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <IconComponent size={16} />
                            {link.name}
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frequent Sites */}
            <Card className="mt-16">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {frequentSites.map((site) => {
                  const IconComponent = site.icon;
                  return (
                    <Button
                      key={site.name}
                      asChild
                      variant="neutral"
                      className="w-full justify-start"
                    >
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <IconComponent size={16} />
                        {site.name}
                      </a>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div >
  );
}