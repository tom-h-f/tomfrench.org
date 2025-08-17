import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Instagram, Newspaper, Youtube, Globe } from "lucide-react";
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
    { name: "Instagram", url: "https://instagram.com/0rseti", icon: Instagram },
  ];

  const frequentSites = [
    { name: "Hacker News", url: "https://news.ycombinator.com", icon: Newspaper },
    { name: "YouTube", url: "https://youtube.com", icon: Youtube },
    { name: "AllSides", url: "https://allsides.com", icon: Globe },
  ];

  const researchTopics = [
    {
      title: "Immigration in the UK",
      description: "Economic impacts, policy analysis, and social integration",
      slug: "immigration-uk",
      icon: Globe,
      color: "bg-blue-50 text-blue-700 border-blue-200"
    }
  ]; return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8 h-screen">
          {/* Left Section - Tabbed Content (3/4 width) */}
          <div className="col-span-3 space-y-6">
            <Tabs defaultValue="home" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>

              {/* Home Tab */}
              <TabsContent value="home" className="mt-6 space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Notes */}
                  <Link href="/notes">
                    <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer bg-main text-main-foreground">
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

                  {/* Tasks */}
                  <Link href="/kanban">
                    <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer bg-main text-main-foreground">
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
                </div>

                {/* Noise - Full Width */}
                <Link href="/noise">
                  <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer bg-main text-main-foreground">
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
              </TabsContent>

              {/* Research Tab */}
              <TabsContent value="research" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-heading mb-2">Research Topics</h2>
                    <p className="text-foreground/80">Explore areas of ongoing research and interest</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {researchTopics.map((topic) => {
                      const IconComponent = topic.icon;
                      return (
                        <Link key={topic.slug} href={`/research/${topic.slug}`}>
                          <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer h-full">
                            <CardHeader className="pb-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${topic.color}`}>
                                  <IconComponent size={20} />
                                </div>
                                <CardTitle className="text-lg">{topic.title}</CardTitle>
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
                </div>
              </TabsContent>

              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-heading mb-2">Posts</h2>
                      <p className="text-foreground/80">Thoughts on development, technology, and random musings</p>
                    </div>
                    <Badge variant="neutral">{recentPosts.length} posts</Badge>
                  </div>

                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <Card className="hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <h3 className="text-xl font-medium hover:text-main transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-sm text-foreground/60">
                                {post.date}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  <Link href="/posts">
                    <Button variant="neutral" className="w-full">
                      View All Posts
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Section - Profile & Links (1/4 width) */}
          <div className="col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-main/20 text-main-foreground">
              <CardContent className="text-center space-y-4 pt-6">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-border overflow-hidden">
                  <Image
                    src="/face.jpeg"
                    alt="Tom French"
                    width={2056}
                    height={2056}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-heading mb-1">Tom French</h1>
                  <p className="text-sm text-foreground/80">Curious Man</p>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <div className="flex justify-center gap-2">
                    {socialLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Button key={link.name} asChild variant="neutral" size="sm">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <IconComponent size={14} />
                            <span className="text-xs">{link.name}</span>
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {frequentSites.map((site) => {
                  const IconComponent = site.icon;
                  return (
                    <Button
                      key={site.name}
                      asChild
                      variant="neutral"
                      className="w-full justify-start text-sm h-8"
                    >
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <IconComponent size={14} />
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
    </div>
  );
}