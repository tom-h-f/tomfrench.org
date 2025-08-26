"use client";

import { Badge } from "@/components/ui/badge";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { BookOpen, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CalculusFundamentalsLimits() {
  return (
    <article className="space-y-8">
      <div className="space-y-4">
        <Link href="/math">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Math
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <BookOpen size={14} className="mr-1" />
            Post
          </Badge>
          <Badge variant="outline">beginner</Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">
          The Beauty of Limits: Foundation of Calculus
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            January 15, 2025
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            15 min read
          </div>
        </div>
      </div>

      <CardWithHover>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-foreground/70">
            This comprehensive post on limits and their role in calculus is currently being written. 
            It will include interactive visualizations of limit behavior, epsilon-delta proofs, 
            and connections to continuous functions.
          </p>
        </div>
      </CardWithHover>

      <div className="flex justify-between items-center pt-8 border-t">
        <Link href="/math">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Math
          </Button>
        </Link>
      </div>
    </article>
  );
}
