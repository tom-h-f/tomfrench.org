import { ResearchTopic } from '../types';

export const immigrationUKTopic: ResearchTopic = {
    id: 'immigration-uk',
    title: 'Immigration in the UK',
    description: 'Economic impacts, policy analysis, and social integration patterns of immigration in the United Kingdom.',
    slug: 'immigration-uk',
    questions: [
        {
            id: '1',
            title: 'What are the economic impacts of immigration on local communities?',
            content: 'This question explores how immigration affects local economies, including employment, wages, housing costs, and public services. Research has shown complex relationships between immigration flows and economic outcomes, with effects varying significantly by region, skill level of migrants, and time frame of analysis.',
            tags: ['economic-impact', 'local-communities', 'employment'],
            relatedQuestions: ['2', '3']
        },
        {
            id: '2',
            title: 'How does immigration affect public service capacity?',
            content: 'Examining the relationship between immigration levels and the capacity of public services like healthcare, education, and social services. This includes both the increased demand from new residents and the contribution of immigrant workers in public service delivery.',
            tags: ['public-services', 'capacity', 'healthcare', 'education'],
            relatedQuestions: ['1', '4']
        },
        {
            id: '3',
            title: 'What are the cultural integration patterns of recent immigrants?',
            content: 'Analysis of how recent immigrants integrate culturally, including language acquisition, community participation, and cultural preservation. This examines both assimilation trends and the maintenance of cultural diversity.',
            tags: ['cultural-integration', 'language', 'community'],
            relatedQuestions: ['1', '5']
        },
        {
            id: '4',
            title: 'How effective are current immigration policies?',
            content: 'Evaluation of current UK immigration policies and their effectiveness in achieving stated goals, including points-based systems, visa categories, and border controls. Analysis includes intended vs actual outcomes.',
            tags: ['policy-effectiveness', 'government-policy'],
            relatedQuestions: ['2']
        },
        {
            id: '5',
            title: 'What role does media coverage play in public perception?',
            content: 'Analysis of how media representation affects public attitudes towards immigration, including the framing of immigration stories, frequency of coverage, and correlation with polling data on public opinion.',
            tags: ['media-influence', 'public-perception'],
            relatedQuestions: ['3']
        }
    ],
    dataSources: [
        {
            id: '1',
            title: 'ONS Migration Statistics',
            source: 'Office for National Statistics',
            type: 'statistics',
            url: 'https://www.ons.gov.uk',
            summary: 'Official UK migration statistics including net migration, visa grants, and demographic breakdowns. Provides quarterly and annual data on international migration flows.'
        },
        {
            id: '2',
            title: 'Home Office Immigration Statistics',
            source: 'UK Home Office',
            type: 'dataset',
            summary: 'Comprehensive immigration data including asylum applications, deportations, and enforcement statistics. Includes detailed breakdowns by nationality, visa type, and outcome.'
        },
        {
            id: '3',
            title: 'Migration Observatory Reports',
            source: 'University of Oxford',
            type: 'report',
            summary: 'Independent research on migration trends, policy impacts, and public attitudes. Provides evidence-based analysis of immigration policy and outcomes.'
        },
        {
            id: '4',
            title: 'British Social Attitudes Survey',
            source: 'NatCen Social Research',
            type: 'survey',
            summary: 'Annual survey data on public attitudes towards immigration and related topics. Tracks changes in public opinion over time with robust methodology.'
        }
    ]
};
