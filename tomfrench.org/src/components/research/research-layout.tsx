'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ResearchTopic, ViewMode } from './types';
import { DataQuestionView } from './views/data-question-view';
import { QuestionTreeView } from './views/question-tree-view';
import { DataView } from './views/data-view';

interface ResearchLayoutProps {
    topics: ResearchTopic[];
    defaultTopic?: string;
}

export function ResearchLayout({ topics, defaultTopic }: ResearchLayoutProps) {
    const [selectedTopic, setSelectedTopic] = useState(defaultTopic || topics[0]?.id);
    const [selectedView, setSelectedView] = useState<ViewMode>('data-question');
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);

    const currentTopic = topics.find(t => t.id === selectedTopic);

    if (!currentTopic) {
        return <div>No research topics available</div>;
    }

    const handleTopicChange = (topicId: string) => {
        setSelectedTopic(topicId);
        setSelectedQuestion(null);
        setSelectedDataSource(null);
    };

    const handleViewChange = (view: ViewMode) => {
        setSelectedView(view);
        // Reset selections when changing views
        setSelectedQuestion(null);
        setSelectedDataSource(null);
    };

    return (
        <div className="space-y-6">
            {/* Topic Selector */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Research</h1>
                    <div className="flex items-center gap-4">
                        <Select value={selectedTopic} onValueChange={handleTopicChange}>
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="Select a research topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {topics.map((topic) => (
                                    <SelectItem key={topic.id} value={topic.id}>
                                        <div className="flex items-center gap-2">
                                            <span>{topic.title}</span>
                                            <Badge variant="neutral" className="text-xs">
                                                {topic.questions.length} questions
                                            </Badge>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Topic Info */}
                <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                        <Badge variant="neutral">{currentTopic.questions.length} Questions</Badge>
                        <Badge variant="neutral">{currentTopic.dataSources.length} Data Sources</Badge>
                    </div>
                    <p className="text-sm text-foreground/70 max-w-md">{currentTopic.description}</p>
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
                        questions={currentTopic.questions}
                        dataSources={currentTopic.dataSources}
                        selectedQuestion={selectedQuestion}
                        selectedDataSource={selectedDataSource}
                        onQuestionSelect={setSelectedQuestion}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>

                <TabsContent value="question-tree" className="space-y-4">
                    <QuestionTreeView
                        questions={currentTopic.questions}
                        selectedQuestion={selectedQuestion}
                        onQuestionSelect={setSelectedQuestion}
                    />
                </TabsContent>

                <TabsContent value="data-view" className="space-y-4">
                    <DataView
                        dataSources={currentTopic.dataSources}
                        selectedDataSource={selectedDataSource}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
