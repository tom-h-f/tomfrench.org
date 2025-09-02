"use client";
import SocialLinks from "@/components/social-links";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Mail, MapPin, Briefcase } from "lucide-react";

export default function About() {
  const ObfuscatedEmail = dynamic(() => import("@/components/obfuscated-email"), { ssr: false });

  return (
    <div className="min-h-full bg-background">
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
                  <ObfuscatedEmail />
                </div>
              </div>
            </div>


          </div>

          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image
                src="/face.jpeg"
                alt="Image of the site owner's (Tom French) face, with hand shown in front of face making a heart symobol with his fingers"
                width={175}
                height={175}
                unoptimized
                className="aspect-square rounded-full border-2 border-border shadow-[4px_4px_0px_0px_var(--border)] object-cover"
                priority
              />
            </div>
            <SocialLinks />

          </div>
        </div>
      </div>
    </div>
  );
}
