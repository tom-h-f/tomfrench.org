'use client';

import React, { ReactNode, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ViewMode } from './types';
import { DataQuestionView } from './views/data-question-view';
import { QuestionTreeView } from './views/question-tree-view';
import { DataView } from './views/data-view';

interface ResearchTopicProviderProps {
    children: ReactNode;
}

interface ResearchTopicProps {
    id: string;
    title: string;
    description: ReactNode;
    children: ReactNode;
}

interface ResearchQuestionProps {
    id: string;
    title: string;
    tags: string[];
    relatedQuestions?: string[];
    children: ReactNode;
}

interface ResearchDataSourceProps {
    id: string;
    title: string;
    type: string;
    source: string;
    url?: string;
    year?: string;
    accessInfo?: string;
    children: ReactNode;
}

// Internal topic interface for the composable system
interface TopicData {
    id: string;
    title: string;
    description: ReactNode;
}

interface QuestionData {
    id: string;
    title: string;
    content: ReactNode;
    tags: string[];
    relatedQuestions?: string[];
}

interface DataSourceData {
    id: string;
    title: string;
    type: string;
    source: string;
    description: string;
    summary: ReactNode;
    url?: string;
    year?: string;
    accessInfo?: string;
    content: ReactNode;
}

// Context to collect research data
const ResearchContext = React.createContext<{
    topics: TopicData[];
    currentTopic: TopicData | null;
    questions: QuestionData[];
    dataSources: DataSourceData[];
    addTopic: (topic: TopicData) => void;
    addQuestion: (question: QuestionData) => void;
    addDataSource: (dataSource: DataSourceData) => void;
}>({
    topics: [],
    currentTopic: null,
    questions: [],
    dataSources: [],
    addTopic: () => { },
    addQuestion: () => { },
    addDataSource: () => { },
});

export function ResearchTopicProvider({ children }: ResearchTopicProviderProps) {
    const [topics, setTopics] = useState<TopicData[]>([]);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [dataSources, setDataSources] = useState<DataSourceData[]>([]);

    const addTopic = (topic: TopicData) => {
        setTopics(prev => [...prev, topic]);
    };

    const addQuestion = (question: QuestionData) => {
        setQuestions(prev => [...prev, question]);
    };

    const addDataSource = (dataSource: DataSourceData) => {
        setDataSources(prev => [...prev, dataSource]);
    };

    return (
        <ResearchContext.Provider value={{
            topics,
            currentTopic: topics[0],
            questions,
            dataSources,
            addTopic,
            addQuestion,
            addDataSource,
        }}>
            {children}
        </ResearchContext.Provider>
    );
}

export function ResearchTopic({ id, title, description, children }: ResearchTopicProps) {
    const context = React.useContext(ResearchContext);

    React.useEffect(() => {
        context.addTopic({ id, title, description });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, title, description]);

    return <>{children}</>;
}

export function ResearchQuestion({ id, title, tags, relatedQuestions, children }: ResearchQuestionProps) {
    const context = React.useContext(ResearchContext);

    React.useEffect(() => {
        context.addQuestion({ id, title, content: children, tags, relatedQuestions });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, title, children, tags, relatedQuestions]);

    return null;
}

export function ResearchDataSource({ id, title, type, source, url, year, accessInfo, children }: ResearchDataSourceProps) {
    const context = React.useContext(ResearchContext);

    React.useEffect(() => {
        // Use the first line of children as description if it's a string
        const description = typeof children === 'string' ? children.slice(0, 100) : `${type} from ${source}`;
        context.addDataSource({
            id,
            title,
            type,
            source,
            description,
            summary: children,
            url,
            year,
            accessInfo,
            content: children
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, title, type, source, url, year, accessInfo, children]);

    return null;
}

export function ResearchLayout({ defaultTopic }: { defaultTopic?: string }) {
    const context = React.useContext(ResearchContext);
    const [selectedTopic, setSelectedTopic] = useState(defaultTopic || context.topics[0]?.id);
    const [selectedView, setSelectedView] = useState<ViewMode>('data-question');
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);

    const currentTopic = context.topics.find(t => t.id === selectedTopic) || context.topics[0];

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
        setSelectedQuestion(null);
        setSelectedDataSource(null);
    };

    return (
        <div className="space-y-6">
            {/* Topic Selector */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Research</h1>
                    {context.topics.length > 1 && (
                        <div className="flex items-center gap-4">
                            <Select value={selectedTopic} onValueChange={handleTopicChange}>
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Select a research topic" />
                                </SelectTrigger>
                                <SelectContent>
                                    {context.topics.map((topic) => (
                                        <SelectItem key={topic.id} value={topic.id}>
                                            <div className="flex items-center gap-2">
                                                <span>{topic.title}</span>
                                                <Badge variant="neutral" className="text-xs">
                                                    {context.questions.length} questions
                                                </Badge>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {/* Topic Info */}
                <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                        <Badge variant="neutral">{context.questions.length} Questions</Badge>
                        <Badge variant="neutral">{context.dataSources.length} Data Sources</Badge>
                    </div>
                    <div className="text-sm text-foreground/70 max-w-md">{currentTopic.description}</div>
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
                        questions={context.questions}
                        dataSources={context.dataSources}
                        selectedQuestion={selectedQuestion}
                        onQuestionSelect={setSelectedQuestion}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>

                <TabsContent value="question-tree" className="space-y-4">
                    <QuestionTreeView
                        questions={context.questions}
                        selectedQuestion={selectedQuestion}
                        onQuestionSelect={setSelectedQuestion}
                    />
                </TabsContent>

                <TabsContent value="data-view" className="space-y-4">
                    <DataView
                        dataSources={context.dataSources}
                        selectedDataSource={selectedDataSource}
                        onDataSourceSelect={setSelectedDataSource}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
