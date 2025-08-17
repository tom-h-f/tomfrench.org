'use client';

import { useEffect } from 'react';
import Graph from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import { Question } from '../types';

interface SigmaGraphViewProps {
    questions: Question[];
    onNodeClick: (questionId: string) => void;
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
            clickNode: (event: { node: string }) => {
                onNodeClick(event.node);
            },
        });
    }, [registerEvents, onNodeClick]);

    return null;
};

export default function SigmaGraphView({ questions, onNodeClick }: SigmaGraphViewProps) {
    const sigmaStyle = { height: "70vh", width: "100%" };

    return (
        <SigmaContainer style={sigmaStyle} className="border rounded-lg">
            <LoadGraph questions={questions} onNodeClick={onNodeClick} />
        </SigmaContainer>
    );
}

// Also export as named export for backward compatibility
export { SigmaGraphView };
