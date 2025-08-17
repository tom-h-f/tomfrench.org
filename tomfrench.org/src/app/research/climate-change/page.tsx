import { ResearchPage, ResearchQuestion, ResearchDataSource } from '@/components/research/research-page';

export default function ClimateChangeResearchPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <ResearchPage
                title="Climate Change & Policy"
                description={
                    <span>Research on climate policy impacts, carbon reduction strategies, and environmental economics</span>
                }
            >
                <ResearchQuestion
                    id="carbon-pricing"
                    title="How effective are carbon pricing mechanisms in reducing greenhouse gas emissions?"
                    tags={["carbon-tax", "cap-and-trade", "emissions", "policy"]}
                    relatedQuestions={["renewable-transition"]}
                >
                    <div className="space-y-4">
                        <p>Analysis of different carbon pricing approaches and their measurable impact on emission reductions across various sectors and regions.</p>

                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">Carbon Pricing Mechanisms:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <strong className="text-green-800 dark:text-green-300">Carbon Tax</strong>
                                    <p className="text-green-700 dark:text-green-400">Direct price on carbon emissions</p>
                                </div>
                                <div>
                                    <strong className="text-green-800 dark:text-green-300">Cap-and-Trade</strong>
                                    <p className="text-green-700 dark:text-green-400">Market-based emission allowances</p>
                                </div>
                            </div>
                        </div>

                        <p>Including comparative analysis of implementation success across different jurisdictions and economic contexts.</p>
                    </div>
                </ResearchQuestion>

                <ResearchQuestion
                    id="renewable-transition"
                    title="What are the economic and social impacts of transitioning to renewable energy?"
                    tags={["renewable-energy", "economics", "social-impact", "transition"]}
                    relatedQuestions={["carbon-pricing"]}
                >
                    <div className="space-y-4">
                        <p>Comprehensive analysis of the costs, benefits, and societal changes associated with large-scale renewable energy adoption.</p>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Impact Areas:</h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                <li>• Job creation and displacement in energy sectors</li>
                                <li>• Grid stability and energy storage challenges</li>
                                <li>• Regional economic effects and just transition policies</li>
                                <li>• Consumer cost implications and energy access</li>
                            </ul>
                        </div>
                    </div>
                </ResearchQuestion>

                <ResearchDataSource
                    id="ipcc-reports"
                    title="IPCC Assessment Reports"
                    type="Report"
                    source="Intergovernmental Panel on Climate Change"
                    url="https://www.ipcc.ch/"
                >
                    <div className="space-y-4">
                        <p>Comprehensive scientific assessment of climate change, its impacts, and response options from the world&apos;s leading climate scientists.</p>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Recent Reports:</h4>
                            <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                                <li>• Working Group I: Physical Science Basis (2021)</li>
                                <li>• Working Group II: Impacts, Adaptation & Vulnerability (2022)</li>
                                <li>• Working Group III: Mitigation of Climate Change (2022)</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Key Methodologies:</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Multi-model ensemble projections, economic impact assessments, and comprehensive literature reviews
                                across climate science, economics, and policy domains.
                            </p>
                        </div>
                    </div>
                </ResearchDataSource>

                <ResearchDataSource
                    id="iea-energy-data"
                    title="World Energy Outlook"
                    type="Dataset"
                    source="International Energy Agency"
                    url="https://www.iea.org/reports/world-energy-outlook-2024"
                >
                    <div className="space-y-4">
                        <p>Annual analysis of global energy trends, including renewable energy deployment, energy security, and climate policy impacts on energy systems.</p>

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">Coverage Areas:</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="inline-block bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">Energy Demand</span>
                                <span className="inline-block bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">Supply Projections</span>
                                <span className="inline-block bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">Investment Flows</span>
                                <span className="inline-block bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">Policy Scenarios</span>
                            </div>
                        </div>
                    </div>
                </ResearchDataSource>
            </ResearchPage>
        </div>
    );
}
