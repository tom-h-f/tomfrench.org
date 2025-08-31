import { notFound } from "next/navigation";
import CauchySchwarzInequality from "@/components/math/proofs/cauchy-schwarz-inequality";

// TODO use actual ones
const mathEntries = {
  "cauchy-schwarz-inequality": {
    component: CauchySchwarzInequality,
    type: "proof"
  }
};
interface DynamicPageProps {
  params: {
    slug: string;
  }
}



export default function MathEntryPage({ params }: DynamicPageProps) {
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
