import { notFound } from "next/navigation";
import UnderstandingGroupTheory from "@/components/math/posts/understanding-group-theory";
import FermatsLittleTheoremProof from "@/components/math/proofs/fermats-little-theorem-proof";
import CalculusFundamentalsLimits from "@/components/math/posts/calculus-fundamentals-limits";
import CauchySchwarzInequality from "@/components/math/proofs/cauchy-schwarz-inequality";

// In a real app, this would come from a CMS or file system
const mathEntries = {
  "understanding-group-theory": {
    component: UnderstandingGroupTheory,
    type: "post"
  },
  "fermats-little-theorem-proof": {
    component: FermatsLittleTheoremProof,
    type: "proof"
  },
  "calculus-fundamentals-limits": {
    component: CalculusFundamentalsLimits,
    type: "post"
  },
  "cauchy-schwarz-inequality": {
    component: CauchySchwarzInequality,
    type: "proof"
  }
};

interface MathEntryPageProps {
  params: {
    slug: string;
  };
}

export default function MathEntryPage({ params }: MathEntryPageProps) {
  const entry = mathEntries[params.slug as keyof typeof mathEntries];

  if (!entry) {
    notFound();
  }

  const Component = entry.component;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-8">
        <Component />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(mathEntries).map((slug) => ({
    slug,
  }));
}
