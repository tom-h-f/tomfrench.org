"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BookOpen, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Cell } from "recharts";

// Group operation visualization data
const groupOperationData = [
  { element: "e", result: 0, operation: "e * e" },
  { element: "a", result: 1, operation: "e * a" },
  { element: "a²", result: 2, operation: "a * a" },
  { element: "a³", result: 0, operation: "a² * a" }, // Back to identity for cyclic group of order 4
];

// Symmetry group visualization
const symmetryData = [
  { angle: 0, x: 1, y: 0, label: "Identity" },
  { angle: 90, x: 0, y: 1, label: "90° rotation" },
  { angle: 180, x: -1, y: 0, label: "180° rotation" },
  { angle: 270, x: 0, y: -1, label: "270° rotation" },
];

const chartConfig = {
  result: {
    label: "Result",
    color: "hsl(var(--chart-1))",
  },
  x: {
    label: "X Position",
    color: "hsl(var(--chart-2))",
  },
  y: {
    label: "Y Position", 
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function UnderstandingGroupTheory() {
  return (
    <article className="space-y-8">
      {/* Header */}
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
          <Badge variant="outline">intermediate</Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">
          Understanding Group Theory: From Basics to Applications
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            January 20, 2025
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            12 min read
          </div>
        </div>
        
        <p className="text-lg text-foreground/80 leading-relaxed">
          An intuitive introduction to group theory, exploring how this fundamental algebraic structure 
          appears throughout mathematics and its practical applications in cryptography and physics.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">algebra</Badge>
          <Badge variant="secondary">group-theory</Badge>
          <Badge variant="secondary">applications</Badge>
        </div>
      </div>

      {/* Prerequisites */}
      <CardWithHover>
        <CardHeader>
          <CardTitle className="text-lg">Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">basic-algebra</Badge>
            <Badge variant="outline">set-theory</Badge>
          </div>
        </CardContent>
      </CardWithHover>

      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a Group?</h2>
          <p className="leading-relaxed mb-6">
            A <strong>group</strong> is one of the most fundamental structures in abstract algebra. 
            At its core, a group is a set equipped with a single operation that combines any two 
            elements to form a third element, while satisfying four key properties.
          </p>
          
          <CardWithHover>
            <CardHeader>
              <CardTitle>The Four Group Axioms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">1. Closure</h4>
                  <p>For any elements a, b in the group, a ∘ b is also in the group.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">2. Associativity</h4>
                  <p>For any elements a, b, c: (a ∘ b) ∘ c = a ∘ (b ∘ c)</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">3. Identity Element</h4>
                  <p>There exists an element e such that for any element a: e ∘ a = a ∘ e = a</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-orange-700 mb-2">4. Inverse Elements</h4>
                  <p>For every element a, there exists an element a⁻¹ such that a ∘ a⁻¹ = a⁻¹ ∘ a = e</p>
                </div>
              </div>
            </CardContent>
          </CardWithHover>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Example: Cyclic Groups</h2>
          <p className="leading-relaxed mb-6">
            Let's examine a simple cyclic group of order 4, generated by a single element 'a'. 
            This group consists of {`{e, a, a², a³}`} where a⁴ = e (the identity).
          </p>

          <CardWithHover>
            <CardHeader>
              <CardTitle>Group Operation Visualization</CardTitle>
              <CardDescription>
                How elements combine in a cyclic group of order 4
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={groupOperationData}
                  margin={{
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="element"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 3]}
                    ticks={[0, 1, 2, 3]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="result"
                    type="monotone"
                    stroke="var(--color-result)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-result)",
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
              <p className="text-sm text-foreground/70 mt-4">
                Notice how multiplying by 'a' cycles through the group elements, 
                returning to the identity after 4 operations.
              </p>
            </CardContent>
          </CardWithHover>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Geometric Interpretation</h2>
          <p className="leading-relaxed mb-6">
            Groups naturally arise when studying symmetries. Consider the rotational symmetries 
            of a square - they form a group under composition of rotations.
          </p>

          <CardWithHover>
            <CardHeader>
              <CardTitle>Rotational Symmetries of a Square</CardTitle>
              <CardDescription>
                The four rotational symmetries and their positions on the unit circle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ScatterChart
                  accessibilityLayer
                  data={symmetryData}
                  margin={{
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[-1.5, 1.5]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[-1.5, 1.5]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-md">
                            <p className="font-medium">{data.label}</p>
                            <p className="text-sm text-foreground/70">
                              Position: ({data.x}, {data.y})
                            </p>
                            <p className="text-sm text-foreground/70">
                              Angle: {data.angle}°
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="y" fill="var(--color-x)">
                    {symmetryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${entry.angle}, 70%, 60%)`} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ChartContainer>
              <p className="text-sm text-foreground/70 mt-4">
                Each point represents a rotational symmetry. The colors correspond to 
                the rotation angles, showing how they're evenly distributed around the circle.
              </p>
            </CardContent>
          </CardWithHover>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Applications in Computer Science</h2>
          <p className="leading-relaxed mb-6">
            Group theory has numerous applications in computer science and cryptography:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Cryptography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Elliptic curve cryptography relies on the group structure of points on elliptic curves. 
                  The discrete logarithm problem in these groups provides the security foundation for 
                  many modern cryptographic systems.
                </p>
              </CardContent>
            </CardWithHover>

            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Error Correction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Linear codes used in error correction are based on the additive group structure 
                  of vector spaces over finite fields, enabling reliable data transmission and storage.
                </p>
              </CardContent>
            </CardWithHover>

            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Algorithm Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Group theory helps in designing efficient algorithms for problems involving 
                  symmetries, such as graph isomorphism and solving Rubik's cubes.
                </p>
              </CardContent>
            </CardWithHover>

            <CardWithHover>
              <CardHeader>
                <CardTitle className="text-lg">Quantum Computing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Quantum algorithms often exploit group structure, such as Shor's algorithm 
                  which uses the periodicity in multiplicative groups for integer factorization.
                </p>
              </CardContent>
            </CardWithHover>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
          <CardWithHover>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Groups provide a unifying framework for studying algebraic structures across mathematics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  The four group axioms (closure, associativity, identity, inverses) are surprisingly powerful
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Symmetries naturally form groups, connecting abstract algebra to geometry
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Group theory has practical applications in cryptography, coding theory, and algorithm design
                </li>
              </ul>
            </CardContent>
          </CardWithHover>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Link href="/math">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Math
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Share</Button>
          <Button variant="outline" size="sm">Print</Button>
        </div>
      </div>
    </article>
  );
}
