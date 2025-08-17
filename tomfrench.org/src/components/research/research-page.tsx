'use client';

import React, { ReactNode, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ViewMode, Question as QuestionType, DataSource as DataSourceType } from './types';
import { DataQuestionView } from './views/data-question-view';
import { QuestionTreeView } from './views/question-tree-view';
import { DataView } from './views/data-view';

// Simple interfaces for the composable components
interface ResearchPageProps {
    title: string;
    description: ReactNode;
    children: ReactNode;
}

interface QuestionProps {
    id: string;
    title: string;
    tags: string[];
    relatedQuestions?: string[];
    children: ReactNode;
}

interface DataSourceProps {
    id: string;
    title: string;
    type: string;
    source: string;
    url?: string;
    year?: string;
    accessInfo?: string;
    children: ReactNode;
}

// Helper function to extract questions from children
function extractQuestionsFromChildren(children: ReactNode): QuestionType[] {
    const questions: QuestionType[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props) {
            const props = child.props as Record<string, unknown>;
            // Check if this is a ResearchQuestion by looking at the props structure
            if (props.id && props.title && props.tags && Array.isArray(props.tags) && !props.type && !props.source) {
                questions.push({
                    id: props.id as string,
                    title: props.title as string,
                    content: props.children as ReactNode,
                    tags: props.tags as string[],
                    relatedQuestions: props.relatedQuestions as string[] | undefined,
                });
            }
        }
    });

    return questions;
}

// Helper function to extract data sources from children
function extractDataSourcesFromChildren(children: ReactNode): DataSourceType[] {
    const dataSources: DataSourceType[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props) {
            const props = child.props as Record<string, unknown>;
            // Check if this is a ResearchDataSource by looking at the props structure
            if (props.id && props.title && props.type && props.source) {
                dataSources.push({
                    id: props.id as string,
                    title: props.title as string,
                    type: props.type as string,
                    source: props.source as string,
                    summary: props.children as ReactNode,
                    url: props.url as string | undefined,
                    year: props.year as string | undefined,
                    accessInfo: props.accessInfo as string | undefined,
                    content: props.children as ReactNode,
                });
            }
        }
    });

    return dataSources;
}

export function ResearchPage({ title, description, children }: ResearchPageProps) {
    const [selectedView, setSelectedView] = useState<ViewMode>('data-question');
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);

    const questions = extractQuestionsFromChildren(children);
    const dataSources = extractDataSourcesFromChildren(children);

    const handleViewChange = (view: ViewMode) => {
        setSelectedView(view);
        setSelectedQuestion(null);
        setSelectedDataSource(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>

                {/* Topic Info */}
                <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                        <Badge variant="neutral">{questions.length} Questions</Badge>
                        <Badge variant="neutral">{dataSources.length} Data Sources</Badge>
                    </div>
                    <div className="text-sm text-foreground/70 max-w-md">{description}</div>
                </div>
            </div>

            {/* View Tabs */}
            <Tabs value={selectedView} onValueChange={(value) => handleViewChange(value as ViewMode)}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="data-question" className="text-sm">
                        Data & Questions
                    </TabsTrigger>
                    <TabsTrigger value="question-tree" className="text-sm">
                        Question Tree
                    </TabsTrigger>
                    <TabsTrigger value="data-view" className="text-sm">
                        Data View
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="data-question" className="space-y-4">
                    <DataQuestionView
                        questions={questions}
                        dataSources={dataSources}
                        selectedQuestion={selectedQuestion}
                        selectedDataSource={selectedDataSource}
                        onQuestionSelect={setSelectedQuestion}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>

                <TabsContent value="question-tree" className="space-y-4">
                    <QuestionTreeView
                        questions={questions}
                        selectedQuestion={selectedQuestion}
                        onQuestionSelect={setSelectedQuestion}
                    />
                </TabsContent>

                <TabsContent value="data-view" className="space-y-4">
                    <DataView
                        dataSources={dataSources}
                        selectedDataSource={selectedDataSource}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>
            </Tabs>

            {/* Hidden children - they're just used for data extraction */}
            <div style={{ display: 'none' }}>{children}</div>
        </div>
    );
}

export function ResearchQuestion(props: QuestionProps) {
    // This component is just for data structure, content is handled by parent
    void props; // Suppress unused parameter warning
    return null;
}

export function ResearchDataSource(props: DataSourceProps) {
    // This component is just for data structure, content is handled by parent
    void props; // Suppress unused parameter warning  
    return null;
}
