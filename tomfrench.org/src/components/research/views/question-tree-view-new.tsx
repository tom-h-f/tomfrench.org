'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Question } from '../types';
import { useState, useEffect } from 'react';
import Graph from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";

interface QuestionTreeViewProps {
    questions: Question[];
    selectedQuestion: string | null;
    onQuestionSelect: (id: string) => void;
}

// Component that loads the graph
const LoadGraph = ({ questions, onNodeClick }: { questions: Question[], onNodeClick: (questionId: string) => void }) => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();

    useEffect(() => {
        const graph = new Graph();

        // Add all questions as nodes
        questions.forEach((question, index) => {
            // Get unique color for each tag
            const primaryTag = question.tags[0] || 'default';
            const colors = {
                'immigration': '#FF6B6B',
                'policy': '#4ECDC4',
                'economics': '#45B7D1',
                'social': '#96CEB4',
                'legal': '#FFEAA7',
                'statistics': '#DDA0DD',
                'default': '#95A5A6'
            };

            graph.addNode(question.id, {
                x: Math.cos((index * 2 * Math.PI) / questions.length) * 300 + Math.random() * 100,
                y: Math.sin((index * 2 * Math.PI) / questions.length) * 300 + Math.random() * 100,
                size: 10 + (question.relatedQuestions?.length || 0) * 3,
                label: question.title,
                color: colors[primaryTag as keyof typeof colors] || colors.default,
                tags: question.tags,
            });
        });

        // Add edges for related questions
        questions.forEach((question) => {
            question.relatedQuestions?.forEach((relatedId) => {
                if (graph.hasNode(relatedId)) {
                    const edgeId = `${question.id}-${relatedId}`;
                    if (!graph.hasEdge(edgeId)) {
                        graph.addEdge(question.id, relatedId, {
                            color: '#E0E0E0',
                            size: 1
                        });
                    }
                }
            });
        });

        loadGraph(graph);
    }, [loadGraph, questions]);

    useEffect(() => {
        // Register click event
        registerEvents({
            clickNode: (event) => {
                onNodeClick(event.node);
            },
        });
    }, [registerEvents, onNodeClick]);

    return null;
};

export function QuestionTreeView({
    questions,
    selectedQuestion,
    onQuestionSelect,
}: QuestionTreeViewProps) {
    const [activeTab, setActiveTab] = useState<string>("graph");

    const getQuestionById = (id: string) => questions.find(q => q.id === id);

    const handleNodeClick = (questionId: string) => {
        onQuestionSelect(questionId);
        setActiveTab("question");
    };

    const sigmaStyle = { height: "70vh", width: "100%" };

    return (
        <div className="h-[80vh] space-y-4">
            <h3 className="text-lg font-semibold">Question Network</h3>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="graph">Graph View</TabsTrigger>
                    <TabsTrigger value="question">Question Details</TabsTrigger>
                </TabsList>

                <TabsContent value="graph" className="flex-1 space-y-4">
                    <div className="space-y-4">
                        <div className="text-sm text-foreground/70">
                            Click on any node to view question details. Node size indicates number of connections.
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="text-sm font-medium">Tags:</div>
                            {['immigration', 'policy', 'economics', 'social', 'legal', 'statistics'].map(tag => (
                                <div key={tag} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: {
                                                'immigration': '#FF6B6B',
                                                'policy': '#4ECDC4',
                                                'economics': '#45B7D1',
                                                'social': '#96CEB4',
                                                'legal': '#FFEAA7',
                                                'statistics': '#DDA0DD'
                                            }[tag] || '#95A5A6'
                                        }}
                                    />
                                    <span className="text-xs capitalize">{tag}</span>
                                </div>
                            ))}
                        </div>

                        <SigmaContainer style={sigmaStyle} className="border rounded-lg">
                            <LoadGraph questions={questions} onNodeClick={handleNodeClick} />
                        </SigmaContainer>
                    </div>
                </TabsContent>

                <TabsContent value="question" className="flex-1">
                    {selectedQuestion ? (
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    {getQuestionById(selectedQuestion)?.title}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    {getQuestionById(selectedQuestion)?.tags.map((tag) => (
                                        <Badge key={tag} variant="neutral" className="text-sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-lg mb-3">Question</h4>
                                    <div className="text-foreground/80 leading-relaxed">
                                        {getQuestionById(selectedQuestion)?.content}
                                    </div>
                                </div>

                                {getQuestionById(selectedQuestion)?.relatedQuestions &&
                                    getQuestionById(selectedQuestion)!.relatedQuestions!.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-lg mb-3">Related Questions</h4>
                                            <div className="space-y-2">
                                                {getQuestionById(selectedQuestion)?.relatedQuestions?.map((relatedId) => {
                                                    const relatedQuestion = getQuestionById(relatedId);
                                                    if (!relatedQuestion) return null;

                                                    return (
                                                        <Card
                                                            key={relatedId}
                                                            className="cursor-pointer hover:bg-accent/50 transition-colors"
                                                            onClick={() => {
                                                                onQuestionSelect(relatedId);
                                                                setActiveTab("graph");
                                                            }}
                                                        >
                                                            <CardContent className="p-3">
                                                                <p className="font-medium text-sm">{relatedQuestion.title}</p>
                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                    {relatedQuestion.tags.slice(0, 3).map((tag) => (
                                                                        <Badge key={tag} variant="neutral" className="text-xs">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                <div className="pt-4 border-t">
                                    <div className="text-sm text-foreground/60">
                                        <strong>Connections:</strong> {getQuestionById(selectedQuestion)?.relatedQuestions?.length || 0} related questions
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="h-full flex items-center justify-center">
                            <div className="text-center space-y-2">
                                <p className="text-foreground/60">No question selected</p>
                                <p className="text-sm text-foreground/40">
                                    Click on a node in the graph view to see question details
                                </p>
                            </div>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
