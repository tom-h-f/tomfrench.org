'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Question, DataSource } from '../types';
import { getTypeIconElement, getTypeColor } from '@/utils/research/data';
import { toast } from "sonner";

interface DataQuestionViewProps {
    questions: Question[];
    dataSources: DataSource[];
    selectedQuestion: string | null;
    selectedDataSource: string | null;
    onQuestionSelect: (id: string) => void;
    onDataSourceSelect: (id: string) => void;
}

export function DataQuestionView({
    questions,
    dataSources,
    selectedQuestion,
    selectedDataSource,
    onQuestionSelect,
    onDataSourceSelect,
}: DataQuestionViewProps) {
    const getQuestionById = (id: string) => questions.find(q => q.id === id);

    return (
        <div className="grid grid-cols-10 gap-6 h-[80vh]">
            {/* Data Sources (1/5) */}
            <div className="col-span-2 space-y-4">
                <h3 className="text-lg font-semibold">Data Sources</h3>
                <div className="space-y-3 max-h-full overflow-y-auto">
                    {dataSources.map((source) => (
                        <Card
                            key={source.id}
                            className={` p-3 cursor-pointer }`}
                            onClick={() => {
                                onDataSourceSelect(source.id);
                                toast.success(`Selected: ${source.title}`, {
                                    description: "TODO make this go to data view on this source"
                                });
                            }}
                        >
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className={`p-1 rounded ${getTypeColor(source.type)}`}>
                                        {getTypeIconElement(source.type, 16)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm leading-tight">{source.title}</p>
                                        <p className="text-xs text-foreground/60 mt-1">{source.source}</p>
                                    </div>
                                </div>
                                <Badge variant="neutral" className="text-xs">
                                    {source.type}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Current Question (3/5) */}
            <div className="col-span-6 space-y-4">
                <h3 className="text-lg font-semibold">Current Question</h3>
                {selectedQuestion ? (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-base">{getQuestionById(selectedQuestion)?.title}</CardTitle>
                            <div className="flex flex-wrap gap-1">
                                {getQuestionById(selectedQuestion)?.tags.map((tag) => (
                                    <Badge key={tag} variant="neutral" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-foreground/80">{getQuestionById(selectedQuestion)?.content}</div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="h-full flex items-center justify-center">
                        <p className="text-foreground/60">Select a question to view details</p>
                    </Card>
                )}
            </div>

            {/* Related Questions (1/5) */}
            <div className="col-span-2 space-y-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                <div className="space-y-2 max-h-full overflow-y-auto">
                    {questions.map((question) => (
                        <Card
                            key={question.id}
                            className={`cursor-pointer transition-all text-xs p-2 ${selectedQuestion === question.id ? 'ring-2 ring-main' : 'hover:shadow-md'
                                }`}
                            onClick={() => onQuestionSelect(question.id)}
                        >
                            <p className="font-medium text-xs leading-tight">{question.title}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {question.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="neutral" className="text-xs py-0 px-1 h-4">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
