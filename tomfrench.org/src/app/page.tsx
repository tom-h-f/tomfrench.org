import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Instagram, Newspaper, Youtube, Globe, Mail, MapPin, Briefcase } from "lucide-react";

export default function About() {
  const frequentSites = [
    { name: "Hacker News", url: "https://news.ycombinator.com", icon: Newspaper },
    { name: "YouTube", url: "https://youtube.com", icon: Youtube },
    { name: "AllSides", url: "https://allsides.com", icon: Globe },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/tom-h-f", icon: Github },
    { name: "Instagram", url: "https://instagram.com/0rseti", icon: Instagram },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">

              {/* Key Info */}
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Developer & Researcher</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>Available for collaboration</span>
                </div>
              </div>
            </div>


          </div>

          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-6">
            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect w/ Me!</CardTitle>
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
            </Card>

            {/* Frequent Sites */}
            <Card>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
