import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  prerequisites?: string[];
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
      ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
      : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
  };

  const getDifficultyColor = (difficulty: MathEntry['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
      case 'intermediate':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-600';
      case 'advanced':
        return 'bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-600';
    }
  };

  return (
    <div className="space-y-6">
      {entries.map((entry) => {
        const TypeIcon = getTypeIcon(entry.type);
        return (
          <Link key={entry.slug} href={`/math/${entry.slug}`}>
            <CardWithHover>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${getTypeColor(entry.type)}`}>
                        <TypeIcon size={18} />
                      </div>
                      <div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${getTypeColor(entry.type)}`}
                        >
                          {entry.type}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{entry.title}</CardTitle>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{entry.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">{entry.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs capitalize ${getDifficultyColor(entry.difficulty)}`}
                  >
                    {entry.difficulty}
                  </Badge>
                  
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {entry.prerequisites && entry.prerequisites.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-foreground/60 mb-2">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.prerequisites.map((prereq) => (
                        <Badge key={prereq} variant="secondary" className="text-xs">
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
