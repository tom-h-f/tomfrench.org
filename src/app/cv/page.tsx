import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Award, ChevronsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SocialLinks from "@/components/social-links";

export default function CV() {
  const SHOW_PROJECTS = false;
  const experience = [
    {
      company: "SBS Insurance Services",
      role: "Lead DevOps Engineer & Project Coordinator",
      period: "Aug 2025 – Present",
      location: "United Kingdom",
      description:
        "Leading platform engineering and delivery. Coordinating multi-team initiatives and aligning product, engineering, and operations to deliver business-critical outcomes.",
      achievements: [
        "Led migration of on‑premises applications to Azure, establishing observability, security, and deployment strategies from the ground up; improved release stability and significantly reduced rollbacks",
        "Overhauled SDLC practices by introducing a comprehensive test strategy, disciplined code reviews, and building out CI/CD pipelines from scratch",
        "Drove adoption of AI tooling, enabling AI‑assisted code review and agentic task handling for various development tasks",
        "Partnered with operations leadership and directors to shape strategy and delivery for key company initiatives"
      ],
      technologies: [
        "Azure",
        "Bicep",
        "GitHub Actions",
        "Docker",
        "Microsoft SQL Server"
      ]
    },
    {
      company: "SBS Insurance Services",
      role: "Software Developer",
      period: "2021 – Aug 2025",
      location: "United Kingdom",
      description:
        "Full‑stack development with a focus on commercial APIs, software process improvements, and delivery of high‑impact business applications.",
      achievements: [
        "Designed and deployed commercial APIs that automated insurance claims processing between carriers and SBS, removing manual data entry completely and rapidly accelerating processing times",
        "Led complete redesign of mission-critical customer portal, resulting in 40% faster insurance claim resolution and 25% increase in customer satisfaction scores",
        "Pioneered implementation of comprehensive testing frameworks and documentation standards across legacy systems, reducing defects by 60% and improving onboarding efficiency",
        "Leveraged expertise in .NET Core, C#, SQL Server, and modern JavaScript frameworks to deliver high-performance, scalable solutions in a fast-paced insurance technology environment"
      ],
      technologies: [
        ".NET (C#, VB)",
        "ASP.NET",
        "Microsoft SQL Server",
        "JavaScript",
        "TypeScript"
      ]
    }
    ,
    {
      company: "Harrap IT",
      role: "Infrastructure Technician",
      period: "2017 – 2021",
      location: "United Kingdom",
      description:
        "Infrastructure support across Windows and Linux environments with a focus on uptime, productivity, and efficient operations.",
      achievements: [
        "Diagnosed and resolved complex technical issues across Windows and Linux workstations, reducing employee downtime by 30% and increasing productivity",
        "Led critical network troubleshooting initiatives for core infrastructure components, achieving 99.9% uptime",
        "Served as primary technical support liaison handling 50+ daily customer inquiries via phone, email, and in-person, maintaining 97% customer satisfaction rating",
        "Created custom system administration tools that automated routine tasks, reducing IT operational overhead by 25% and enabling the team to focus on strategic initiatives"
      ],
      technologies: [
        "Windows",
        "Linux",
        "Networking",
        "Active Directory",
        "PowerShell"
      ]
    }
  ];

  const education = [
    {
      institution: "The Open University",
      degree: "BSc in Cybersecurity",
      period: "2020 - 2023"
    }
  ];

  const projects = [
    {
      name: "Mathematical Visualization Platform",
      description: "Interactive web application for visualizing complex mathematical concepts including calculus, linear algebra, and topology.",
      technologies: ["React", "TypeScript", "D3.js", "WebGL"],
      link: "https://github.com/tom-h-f/math-viz"
    },
    {
      name: "Algorithm Analysis Tools",
      description: "Suite of tools for analyzing and comparing algorithm performance with visual representations of complexity.",
      technologies: ["Python", "Matplotlib", "NumPy", "Jupyter"],
      link: "https://github.com/tom-h-f/algo-analysis"
    }
  ];

  const skills = {
    "Programming Languages": ["C#", "VB", "TypeScript", "JavaScript", "Python", "Bash", "PowerShell"],
    "Frameworks & Libraries": [".NET", "ASP.NET", "React", "Next.js", "Tailwind CSS"],
    "Databases": ["Microsoft SQL Server"],
    "Tools & Technologies": ["Azure", "Bicep", "GitHub Actions", "Git", "Docker"],
    "Coordination & Delivery": [
      "Project Scoping",
      "Ops Liaison",
      "Client Engagement",
      "Technical Clarification",
      "Stakeholder Visibility",
      "Cross-functional Coordination"
    ],
  };

  const certifications = [
    {
      name: "CompTIA A+",
      issuer: "CompTIA",
      date: "2018",
      description: "CompTIA A+ Certification"
    }
  ];

  return (
    <div className="min-h-svh bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Curriculum Vitae</h1>
            <p className="text-xl text-foreground/80">
              Software & DevOps Engineer
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>United Kingdom</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
                <div className="space-y-6">
                  <Card key={0}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{experience[0].role}</CardTitle>
                          <p className="text-foreground/70 font-medium">{experience[0].company}</p>
                        </div>
                        <div className="text-right text-sm text-foreground/60">
                          <p>{experience[0].period}</p>
                          <p className="flex items-center gap-1">
                            <MapPin size={12} />
                            {experience[0].location}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{experience[0].description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="text-sm space-y-1 text-foreground/80">
                          {experience[0].achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-main mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience[0].technologies.map((tech) => (
                          <Badge key={tech} variant="neutral" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center w-full my-2">
                      <ChevronsUp size={20} />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{experience[1].role}</CardTitle>
                          <p className="text-foreground/70 font-medium">{experience[1].company}</p>
                        </div>
                        <div className="text-right text-sm text-foreground/60">
                          <p>{experience[1].period}</p>
                          <p className="flex items-center gap-1">
                            <MapPin size={12} />
                            {experience[1].location}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{experience[1].description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="text-sm space-y-1 text-foreground/80">
                          {experience[1].achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-main mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience[1].technologies.map((tech) => (
                          <Badge key={tech} variant="neutral" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card key={1}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{experience[2].role}</CardTitle>
                          <p className="text-foreground/70 font-medium">{experience[2].company}</p>
                        </div>
                        <div className="text-right text-sm text-foreground/60">
                          <p>{experience[2].period}</p>
                          <p className="flex items-center gap-1">
                            <MapPin size={12} />
                            {experience[2].location}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{experience[2].description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="text-sm space-y-1 text-foreground/80">
                          {experience[2].achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-main mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience[2].technologies.map((tech) => (
                          <Badge key={tech} variant="neutral" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p className="text-foreground/70">{edu.institution}</p>
                          </div>
                          <div className="text-right text-sm text-foreground/60">
                            <p>{edu.period}</p>
                          </div>
                        </div>
                        {/* Additional academic details available on request */}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Projects (hidden for now) */}
              {SHOW_PROJECTS && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Key Projects</h2>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold">{project.name}</h3>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-main hover:underline"
                            >
                              <ExternalLink size={16} />
                              <span className="text-sm">View</span>
                            </a>
                          </div>
                          <p className="text-sm leading-relaxed mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="neutral" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="neutral" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award size={18} />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium text-sm">{cert.name}</h4>
                      <p className="text-xs text-foreground/70">{cert.issuer} • {cert.date}</p>
                      <p className="text-xs text-foreground/60">{cert.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <SocialLinks />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
