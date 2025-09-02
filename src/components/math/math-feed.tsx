import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithHover } from "@/components/ui/card-with-hover";
import Link from "next/link";
import { Calendar, Clock, BookOpen, FlaskConical } from "lucide-react";

export interface MathEntry {
  slug: string;
  title: string;
  type: 'post' | 'proof';
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

interface MathFeedProps {
  entries: MathEntry[];
}

export function MathFeed({ entries }: MathFeedProps) {
  const getTypeIcon = (type: MathEntry['type']) => {
    return type === 'post' ? BookOpen : FlaskConical;
  };

  const getTypeColor = (type: MathEntry['type']) => {
    return type === 'post'
      ? 'bg-blue-100 text-blue-700 border-blue-200'
      : 'bg-green-100 text-green-700 border-green-200';
  };

  const getDifficultyColor = (difficulty: MathEntry['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-700';
      case 'intermediate':
        return 'text-yellow-700';
      case 'advanced':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {entries.map((entry) => {
        const Icon = getTypeIcon(entry.type);
        return (
          <Link key={entry.slug} href={`/math/${entry.slug}`}>
            <CardWithHover className="transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs capitalize ${getTypeColor(entry.type)}`}>
                        <Icon size={12} className="mr-1" />
                        {entry.type}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl leading-tight hover:text-blue-600 transition-colors">
                      {entry.title}
                    </CardTitle>

                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {entry.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">{entry.excerpt}</p>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="neutral"
                    className={`text-xs capitalize ${getDifficultyColor(entry.difficulty)}`}
                  >
                    {entry.difficulty}
                  </Badge>

                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="neutral" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {entry.prerequisites.length > 0 && (
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-foreground/60 mb-2">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.prerequisites.map((prereq) => (
                        <Badge key={prereq} variant="neutral" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </CardWithHover>
          </Link>
        );
      })}
    </div>
  );
}
