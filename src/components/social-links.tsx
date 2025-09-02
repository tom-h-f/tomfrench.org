import { Github, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";


const socialLinks = [
    { name: "Email", url: "mailto:hi@tomfrench.org", icon: Mail },
    { name: "GitHub", url: "https://github.com/tom-h-f", icon: Github },
];
export default function SocialLinks() {

    return (

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Contact Me</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                            >
                                <IconComponent size={18} />
                                <span className="text-sm font-medium">{social.name}</span>
                            </a>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}