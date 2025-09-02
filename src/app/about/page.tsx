import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { Github, Instagram, Newspaper, Youtube, Globe, Mail, MapPin, Briefcase } from "lucide-react";

export default function About() {
  const skills = [
    "TypeScript", "React", "Next.js", "Python", "Machine Learning",
    "Data Science", "Mathematics", "Statistics", "Algorithm Design"
  ];

  const interests = [
    "Pure Mathematics", "Applied Statistics", "Computational Theory",
    "Mathematical Modeling", "Data Visualization", "Research Methods"
  ];

  const frequentSites = [
    { name: "Hacker News", url: "https://news.ycombinator.com", icon: Newspaper },
    { name: "YouTube", url: "https://youtube.com", icon: Youtube },
    { name: "AllSides", url: "https://allsides.com", icon: Globe },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/tom-h-f", icon: Github },
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Tom French</h1>
                <p className="text-xl text-foreground/80 leading-relaxed">
                  Mathematics enthusiast, software developer, and lifelong learner exploring the intersection
                  of pure mathematics, computational theory, and practical applications.
                </p>
              </div>

              {/* Key Info */}
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Software Engineer & Researcher of miscellaneous things</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <CardWithHover>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed">
                  I&apos;m passionate about understanding complex systems through mathematical reasoning and
                  computational approaches. My work focuses on bridging theoretical mathematics with
                  practical software development, particularly in areas involving data analysis,
                  algorithm design, and mathematical modeling.
                </p>
                <p className="leading-relaxed">
                  Currently, I&apos;m documenting my learning journey through mathematics, creating detailed
                  explanations of concepts, proofs, and their applications. I believe in making mathematics
                  more accessible and demonstrating its beauty through clear exposition and interactive examples.
                </p>
              </CardContent>
            </CardWithHover>

            {/* Skills & Interests */}
            <div className="grid md:grid-cols-2 gap-6">
              <CardWithHover>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="neutral" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </CardWithHover>

              <CardWithHover>
                <CardHeader>
                  <CardTitle>Research Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="neutral" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </CardWithHover>
            </div>

            {/* Current Focus */}
            <CardWithHover>
              <CardHeader>
                <CardTitle>Current Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Mathematical Learning Journey</h4>
                    <p className="text-sm text-foreground/70">
                      Building a comprehensive wiki of mathematical concepts, proofs, and applications.
                      Each entry includes detailed explanations, interactive examples, and connections to related topics.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Applied Research</h4>
                    <p className="text-sm text-foreground/70">
                      Exploring practical applications of mathematical theory in software development,
                      particularly in areas of optimization, statistical modeling, and algorithm analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </CardWithHover>
          </div>

          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-6">
            {/* Quick Links */}
            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Explore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/math">
                  <Button variant="neutral" className="w-full justify-start">
                    📚 Mathematics Wiki
                  </Button>
                </Link>
                <Link href="/posts">
                  <Button variant="neutral" className="w-full justify-start">
                    ✍️ Blog Posts
                  </Button>
                </Link>
                <Link href="/cv">
                  <Button variant="neutral" className="w-full justify-start">
                    💼 Professional CV
                  </Button>
                </Link>
                <Link href="/noise">
                  <Button variant="neutral" className="w-full justify-start">
                    🔊 Focus Sounds
                  </Button>
                </Link>
              </CardContent>
            </CardWithHover>

            {/* Social Links */}
            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                      >
                        <IconComponent size={18} />
                        <span className="text-sm font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </CardWithHover>

            {/* Frequent Sites */}
            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Daily Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {frequentSites.map((site) => {
                    const IconComponent = site.icon;
                    return (
                      <a
                        key={site.name}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors"
                      >
                        <IconComponent size={16} />
                        <span className="text-sm">{site.name}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </CardWithHover>
          </div>
        </div>
      </div>
    </div>
  );
}
