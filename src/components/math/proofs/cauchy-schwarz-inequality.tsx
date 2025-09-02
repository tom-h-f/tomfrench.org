"use client";

import { Badge } from "@/components/ui/badge";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { FlaskConical, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CauchySchwarzInequality() {
  return (
    <article className="space-y-8">
      <div className="space-y-4">
        <Link href="/math">
          <Button variant="neutral" size="sm" className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Math
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="bg-green-100 text-green-700">
            <FlaskConical size={14} className="mr-1" />
            Proof
          </Badge>
          <Badge variant="neutral">advanced</Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          The Cauchy-Schwarz Inequality: Proof and Applications
        </h1>

        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            January 12, 2025
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            10 min read
          </div>
        </div>
      </div>

      <CardWithHover>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-foreground/70">
            This detailed proof of the Cauchy-Schwarz inequality is in development.
            It will feature multiple proof approaches, geometric interpretations,
            and practical applications in optimization and probability theory.
          </p>
        </div>
      </CardWithHover>

      <div className="flex justify-between items-center pt-8 border-t">
        <Link href="/math">
          <Button variant="neutral">
            <ArrowLeft size={16} className="mr-2" />
            Back to Math
          </Button>
        </Link>
      </div>
    </article>
  );
}
