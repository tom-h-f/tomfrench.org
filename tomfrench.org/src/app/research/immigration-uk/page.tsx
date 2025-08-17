import { ResearchPage, ResearchQuestion, ResearchDataSource } from '@/components/research/research-page';

export default function ImmigrationUKPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ResearchPage 
        title="Immigration in the UK"
        description={
          <span>Research on UK immigration policy, economic impacts, and skilled worker pathways</span>
        }
      >
        <ResearchQuestion
          id="visa-pathways"
          title="What are the current visa pathways for skilled workers coming to the UK?"
          tags={["visa", "skilled-worker", "policy", "pathways"]}
          relatedQuestions={["salary-thresholds", "skill-shortage"]}
        >
          <div className="space-y-4">
            <p>Understanding the various visa routes available for skilled professionals, including the Skilled Worker visa, Global Talent visa, and other specialist categories.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Visa Categories:</h4>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>• <strong>Skilled Worker visa</strong> - Main route for skilled professionals with job offers</li>
                <li>• <strong>Global Talent visa</strong> - For exceptional talent in specific fields</li>
                <li>• <strong>Innovator Founder visa</strong> - For entrepreneurs with innovative business ideas</li>
                <li>• <strong>Scale-up visa</strong> - For skilled workers joining fast-growing companies</li>
              </ul>
            </div>

            <p>This includes eligibility criteria, application processes, and recent policy changes affecting each pathway.</p>
          </div>
        </ResearchQuestion>

        <ResearchQuestion
          id="salary-thresholds"
          title="How do salary thresholds impact immigration decisions and what are the current requirements?"
          tags={["salary", "thresholds", "requirements", "economics"]}
          relatedQuestions={["visa-pathways", "regional-variations"]}
        >
          <div className="space-y-4">
            <p>Examining the minimum salary requirements for different visa categories, how they vary by occupation and region, and their impact on immigration patterns.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">General Salary Threshold</h4>
                <p className="text-2xl font-bold text-green-800 dark:text-green-300">£38,700</p>
                <p className="text-sm text-green-700 dark:text-green-400">Standard minimum for Skilled Worker visa</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">Going Rate</h4>
                <p className="text-sm text-orange-800 dark:text-orange-300">Must also meet the &ldquo;going rate&rdquo; for the specific occupation</p>
              </div>
            </div>

            <p>These thresholds significantly impact employer recruitment strategies and immigration patterns across different sectors.</p>
          </div>
        </ResearchQuestion>

        <ResearchQuestion
          id="skill-shortage"
          title="Which sectors are experiencing the most acute skill shortages?"
          tags={["skills", "shortage", "labor-market", "sectors"]}
          relatedQuestions={["visa-pathways", "economic-impact"]}
        >
          <div className="space-y-4">
            <p>Analysis of the Shortage Occupation List, sector-specific skill gaps, and how immigration policy addresses labor market shortages.</p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-3">Critical Shortage Sectors:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="inline-block bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">Healthcare</span>
                <span className="inline-block bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">Engineering</span>
                <span className="inline-block bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">IT & Technology</span>
                <span className="inline-block bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">Education</span>
              </div>
            </div>
          </div>
        </ResearchQuestion>

        <ResearchDataSource
          id="home-office-stats"
          title="Immigration Statistics Quarterly Release"
          type="Statistics"
          source="UK Home Office"
          url="https://www.gov.uk/government/collections/immigration-statistics-quarterly-release"
        >
          <div className="space-y-4">
            <p>Official quarterly statistics on UK immigration including visa grants, applications, and demographic breakdowns by category, nationality, and region.</p>
            
            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What&apos;s Included:</h4>
              <ul className="text-sm space-y-1">
                <li>• Quarterly visa application and grant statistics</li>
                <li>• Breakdown by visa category and nationality</li>
                <li>• Regional distribution of new arrivals</li>
                <li>• Demographic characteristics of migrants</li>
                <li>• Time series data for trend analysis</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Insights:</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                The most recent data shows significant changes in skilled worker visa grants following the 2024 policy updates, 
                with particular increases in healthcare and technology sector applications.
              </p>
            </div>
          </div>
        </ResearchDataSource>

        <ResearchDataSource
          id="mac-reports"
          title="Migration Advisory Committee Reports"
          type="Report"
          source="Migration Advisory Committee"
          url="https://www.gov.uk/government/organisations/migration-advisory-committee"
        >
          <div className="space-y-4">
            <p>Independent evidence-based reports on immigration policy, salary thresholds, shortage occupations, and economic impacts.</p>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Recent Key Reports:</h4>
              <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                <li>• Review of the Shortage Occupation List (2024)</li>
                <li>• Impact of Salary Thresholds on Immigration (2023)</li>
                <li>• Regional Economic Effects of Migration (2023)</li>
              </ul>
            </div>
          </div>
        </ResearchDataSource>
      </ResearchPage>
    </div>
  );
}
