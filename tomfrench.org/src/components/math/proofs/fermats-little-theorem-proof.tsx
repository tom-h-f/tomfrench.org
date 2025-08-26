"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FlaskConical, Clock, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

// Data for visualizing modular arithmetic
const modularData = [
  { base: 2, mod5: 2, mod7: 2, exponent: 1 },
  { base: 4, mod5: 4, mod7: 4, exponent: 2 },
  { base: 8, mod5: 3, mod7: 1, exponent: 3 },
  { base: 16, mod5: 1, mod7: 2, exponent: 4 },
  { base: 32, mod5: 2, mod7: 4, exponent: 5 },
  { base: 64, mod5: 4, mod7: 1, exponent: 6 },
];

// Fermat's Little Theorem verification data
const fermatVerification = [
  { p: 5, a: 2, result: 1, calculation: "2⁴ mod 5" },
  { p: 5, a: 3, result: 1, calculation: "3⁴ mod 5" },
  { p: 7, a: 2, result: 1, calculation: "2⁶ mod 7" },
  { p: 7, a: 3, result: 1, calculation: "3⁶ mod 7" },
  { p: 11, a: 2, result: 1, calculation: "2¹⁰ mod 11" },
  { p: 11, a: 5, result: 1, calculation: "5¹⁰ mod 11" },
];

const chartConfig = {
  mod5: {
    label: "mod 5",
    color: "hsl(var(--chart-1))",
  },
  mod7: {
    label: "mod 7", 
    color: "hsl(var(--chart-2))",
  },
  result: {
    label: "Result",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function FermatsLittleTheoremProof() {
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
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <FlaskConical size={14} className="mr-1" />
            Proof
          </Badge>
          <Badge variant="outline">intermediate</Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">
          Fermat's Little Theorem: Multiple Proof Approaches
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            January 18, 2025
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            8 min read
          </div>
        </div>
        
        <p className="text-lg text-foreground/80 leading-relaxed">
          A comprehensive exploration of Fermat's Little Theorem with three different proof techniques: 
          combinatorial, group theory, and induction. Each approach reveals different insights into this 
          fundamental result in number theory.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">number-theory</Badge>
          <Badge variant="secondary">modular-arithmetic</Badge>
          <Badge variant="secondary">proof-techniques</Badge>
        </div>
      </div>

      {/* Prerequisites */}
      <CardWithHover>
        <CardHeader>
          <CardTitle className="text-lg">Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">modular-arithmetic</Badge>
            <Badge variant="outline">basic-combinatorics</Badge>
          </div>
        </CardContent>
      </CardWithHover>

      {/* Theorem Statement */}
      <CardWithHover className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">Theorem Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-center p-6 bg-white rounded-lg border">
            <p className="mb-4"><strong>Fermat's Little Theorem:</strong></p>
            <p className="font-mono text-xl">
              If <em>p</em> is a prime number and <em>a</em> is any integer not divisible by <em>p</em>, then:
            </p>
            <p className="font-mono text-2xl mt-4 text-blue-700">
              a<sup>p-1</sup> ≡ 1 (mod p)
            </p>
          </div>
        </CardContent>
      </CardWithHover>

      {/* Visualization */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Visualizing the Theorem</h2>
        <p className="leading-relaxed mb-6">
          Let's see how powers of integers behave modulo different primes. Notice the periodic pattern 
          and how the theorem predicts when we return to 1.
        </p>

        <CardWithHover>
          <CardHeader>
            <CardTitle>Powers of 2 Modulo Different Primes</CardTitle>
            <CardDescription>
              Observing how 2^n mod p cycles back to patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={modularData}
                margin={{
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="exponent"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{ value: 'Exponent (n)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 7]}
                  label={{ value: 'Result', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-md">
                          <p className="font-medium">2^{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.dataKey}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  dataKey="mod5"
                  type="monotone"
                  stroke="var(--color-mod5)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  dataKey="mod7"
                  type="monotone"
                  stroke="var(--color-mod7)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
            <p className="text-sm text-foreground/70 mt-4">
              Notice that 2⁴ ≡ 1 (mod 5) and 2⁶ ≡ 1 (mod 7), confirming Fermat's Little Theorem 
              since 4 = 5-1 and 6 = 7-1.
            </p>
          </CardContent>
        </CardWithHover>
      </section>

      {/* Empirical Verification */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Empirical Verification</h2>
        <p className="leading-relaxed mb-6">
          Before diving into proofs, let's verify the theorem with several examples:
        </p>

        <CardWithHover>
          <CardHeader>
            <CardTitle>Fermat's Little Theorem Verification</CardTitle>
            <CardDescription>
              Testing a^(p-1) ≡ 1 (mod p) for various primes p and bases a
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={fermatVerification}
                margin={{
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="calculation"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 2]}
                />
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-md">
                          <p className="font-medium">{data.calculation}</p>
                          <p className="text-sm">Prime p = {data.p}</p>
                          <p className="text-sm">Base a = {data.a}</p>
                          <p className="text-sm text-green-600">Result = {data.result} ✓</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="result" fill="var(--color-result)" radius={4} />
              </BarChart>
            </ChartContainer>
            <p className="text-sm text-foreground/70 mt-4">
              Every calculation yields 1, confirming the theorem holds for these test cases.
            </p>
          </CardContent>
        </CardWithHover>
      </section>

      {/* Proofs */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Three Different Proofs</h2>

        {/* Proof 1: Group Theory */}
        <div className="space-y-6">
          <CardWithHover>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Proof 1: Group Theory Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Key Insight:</p>
                <p className="text-sm">
                  The non-zero integers modulo p form a multiplicative group of order p-1.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 1:</h4>
                  <p className="text-sm">
                    Consider the set G = {1, 2, 3, ..., p-1} with multiplication modulo p.
                    Since p is prime, every non-zero element has a multiplicative inverse, 
                    making G a group.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 2:</h4>
                  <p className="text-sm">
                    By Lagrange's theorem, for any element a ∈ G, the order of a divides |G| = p-1.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 3:</h4>
                  <p className="text-sm">
                    Therefore, a^(p-1) = (a^ord(a))^k = 1^k = 1 for some integer k.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-green-700 mb-1">Conclusion:</h4>
                  <p className="text-sm font-medium">
                    Hence a^(p-1) ≡ 1 (mod p). □
                  </p>
                </div>
              </div>
            </CardContent>
          </CardWithHover>

          {/* Proof 2: Combinatorial */}
          <CardWithHover>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Proof 2: Combinatorial Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Key Insight:</p>
                <p className="text-sm">
                  Count necklaces with p beads using a colors, then apply Burnside's lemma.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 1:</h4>
                  <p className="text-sm">
                    Consider necklaces with p beads, each colored with one of a colors.
                    There are a^p total colorings without considering rotations.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 2:</h4>
                  <p className="text-sm">
                    Under rotation by k positions (k ≠ 0), a coloring is fixed only if it has 
                    period dividing gcd(p, k). Since p is prime, gcd(p, k) = 1 for k ∈ {1, ..., p-1}.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 3:</h4>
                  <p className="text-sm">
                    So only monochromatic necklaces (a of them) are fixed by non-trivial rotations.
                    All a^p colorings are fixed by the identity rotation.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 4:</h4>
                  <p className="text-sm">
                    By Burnside's lemma: # distinct necklaces = (1/p)[a^p + (p-1)a] = (a^p - a)/p + a.
                    Since this must be an integer, p divides (a^p - a).
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-green-700 mb-1">Conclusion:</h4>
                  <p className="text-sm font-medium">
                    Therefore a^p ≡ a (mod p), which gives a^(p-1) ≡ 1 (mod p) when gcd(a,p) = 1. □
                  </p>
                </div>
              </div>
            </CardContent>
          </CardWithHover>

          {/* Proof 3: Induction */}
          <CardWithHover>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Proof 3: Induction on the Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Key Insight:</p>
                <p className="text-sm">
                  Use strong induction on a, combined with the binomial theorem.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Base Case:</h4>
                  <p className="text-sm">
                    For a = 1: 1^p = 1 ≡ 1 (mod p). ✓
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Inductive Step:</h4>
                  <p className="text-sm">
                    Assume the theorem holds for all integers less than a. We prove it for a.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 1:</h4>
                  <p className="text-sm">
                    By the binomial theorem: a^p = (1 + (a-1))^p = Σ(k=0 to p) C(p,k)(a-1)^k
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 2:</h4>
                  <p className="text-sm">
                    For 1 ≤ k ≤ p-1, C(p,k) = p!/(k!(p-k)!) is divisible by p since p is prime 
                    and appears in the numerator but not the denominator.
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-blue-700 mb-1">Step 3:</h4>
                  <p className="text-sm">
                    So a^p ≡ 1 + (a-1)^p (mod p). By induction hypothesis, (a-1)^p ≡ (a-1) (mod p).
                  </p>
                </div>
                
                <div className="step">
                  <h4 className="font-semibold text-green-700 mb-1">Conclusion:</h4>
                  <p className="text-sm font-medium">
                    Therefore a^p ≡ 1 + (a-1) = a (mod p), completing the induction. □
                  </p>
                </div>
              </div>
            </CardContent>
          </CardWithHover>
        </div>
      </section>

      {/* Applications */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Applications</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <CardWithHover>
            <CardHeader>
              <CardTitle className="text-lg">RSA Cryptography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                RSA encryption relies on Fermat's Little Theorem for key generation and 
                the decryption process. The theorem ensures that (m^e)^d ≡ m (mod n) 
                under the right conditions.
              </p>
            </CardContent>
          </CardWithHover>

          <CardWithHover>
            <CardHeader>
              <CardTitle className="text-lg">Primality Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Fermat's test checks if a^(n-1) ≡ 1 (mod n) for various bases a. 
                While not foolproof (due to Carmichael numbers), it's a useful 
                probabilistic primality test.
              </p>
            </CardContent>
          </CardWithHover>
        </div>
      </section>

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
