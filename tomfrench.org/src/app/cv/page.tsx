import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardWithHover } from "@/components/ui/card-with-hover";
import { Calendar, MapPin, ExternalLink, Award, GraduationCap } from "lucide-react";

export default function CV() {
  const experience = [
    {
      company: "Example Tech Company",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      location: "London, UK",
      description: "Leading development of large-scale web applications using React, TypeScript, and Node.js. Mentoring junior developers and contributing to architectural decisions.",
      achievements: [
        "Improved application performance by 40% through optimization",
        "Led migration to microservices architecture",
        "Implemented comprehensive testing strategy increasing coverage to 95%"
      ],
      technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
      company: "Previous Company",
      role: "Software Engineer",
      period: "2020 - 2022",
      location: "Manchester, UK",
      description: "Full-stack development focusing on data visualization and mathematical modeling applications.",
      achievements: [
        "Developed interactive mathematical visualization tools",
        "Collaborated with research teams on algorithmic implementations",
        "Created automated testing frameworks for numerical computations"
      ],
      technologies: ["Python", "JavaScript", "D3.js", "NumPy", "SciPy"]
    }
  ];

  const education = [
    {
      institution: "University Name",
      degree: "Master of Science in Mathematics",
      period: "2018 - 2020",
      grade: "First Class Honours",
      focus: "Pure Mathematics with focus on Abstract Algebra and Real Analysis",
      thesis: "Applications of Group Theory in Computational Algorithms"
    },
    {
      institution: "University Name",
      degree: "Bachelor of Science in Mathematics",
      period: "2015 - 2018",
      grade: "First Class Honours",
      focus: "Mathematics and Computer Science",
      thesis: "Statistical Methods in Machine Learning"
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
    "Programming Languages": ["TypeScript", "Python", "JavaScript", "R", "MATLAB"],
    "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express", "NumPy", "SciPy"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis"],
    "Tools & Technologies": ["Git", "Docker", "AWS", "Jupyter", "LaTeX"],
    "Mathematical": ["Statistical Analysis", "Linear Algebra", "Calculus", "Abstract Algebra", "Real Analysis"]
  };

  const certifications = [
    {
      name: "Advanced Mathematics Certification",
      issuer: "Mathematical Society",
      date: "2023",
      description: "Advanced certification in pure mathematics and research methods"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Curriculum Vitae</h1>
            <p className="text-xl text-foreground/80">
              Software Engineer specializing in mathematical computing and web applications
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Available for new opportunities</span>
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
                  {experience.map((job, index) => (
                    <CardWithHover key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{job.role}</CardTitle>
                            <p className="text-foreground/70 font-medium">{job.company}</p>
                          </div>
                          <div className="text-right text-sm text-foreground/60">
                            <p>{job.period}</p>
                            <p className="flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed">{job.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">Key Achievements:</h4>
                          <ul className="text-sm space-y-1 text-foreground/80">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-main mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </CardWithHover>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <CardWithHover key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p className="text-foreground/70">{edu.institution}</p>
                          </div>
                          <div className="text-right text-sm text-foreground/60">
                            <p>{edu.period}</p>
                            <p className="font-medium text-main">{edu.grade}</p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 mb-2">{edu.focus}</p>
                        <p className="text-sm text-foreground/70">
                          <span className="font-medium">Dissertation:</span> {edu.thesis}
                        </p>
                      </CardContent>
                    </CardWithHover>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <CardWithHover key={index}>
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
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </CardWithHover>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <CardWithHover>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CardWithHover>

              {/* Certifications */}
              <CardWithHover>
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
              </CardWithHover>

              {/* Download CV */}
              <CardWithHover>
                <CardContent className="pt-6 text-center">
                  <button className="w-full bg-main text-main-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Download PDF CV
                  </button>
                </CardContent>
              </CardWithHover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
