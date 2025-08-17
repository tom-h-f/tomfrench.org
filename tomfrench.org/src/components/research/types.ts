// Core types for the research system
import { ReactNode } from 'react';

export interface Question {
    id: string;
    title: string;
    content: ReactNode;
    tags: string[];
    relatedQuestions?: string[];
}

export interface DataSource {
    id: string;
    title: string;
    type: string;
    source: string;
    description: string; // Required short text summary for tooltip
    summary?: ReactNode;
    url?: string;
    year?: string;
    keyInsights?: ReactNode[];
    methodology?: ReactNode;
    limitations?: ReactNode;
    accessInfo?: string;
    content?: ReactNode; // Rich content for detailed view
}

export interface ResearchTopic {
    id: string;
    title: string;
    description: ReactNode;
    questions: Question[];
    dataSources: DataSource[];
}

export type ViewMode = 'data-question' | 'question-tree' | 'data-view';
