export default function ArtOfCleanCode() {
    return (
        <div className="space-y-6">
            <p>
                Clean code is not just about following conventions—it&apos;s about writing code that
                tells a story, code that future developers (including yourself) can understand
                and modify with confidence.
            </p>

            <h2 className="text-2xl font-heading">What Makes Code Clean?</h2>
            <p>
                Clean code is simple, focused, and expressive. It does one thing well and makes
                its intent clear to anyone reading it. It&apos;s not about being clever; it&apos;s about
                being clear.
            </p>

            <h2 className="text-2xl font-heading">Core Principles</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Functions should do one thing and do it well</li>
                <li>Names should reveal intent - be descriptive, not clever</li>
                <li>Keep functions small and focused</li>
                <li>Minimize dependencies and coupling</li>
                <li>Write tests that document behavior</li>
            </ul>

            <h2 className="text-2xl font-heading">The Boy Scout Rule</h2>
            <p>
                Always leave the code cleaner than you found it. Small improvements add up over
                time and create a culture of continuous improvement in your codebase.
            </p>

            <h2 className="text-2xl font-heading">Refactoring as a Habit</h2>
            <p>
                Refactoring isn&apos;t something you do when you have time—it&apos;s something you do
                as part of your regular development process. Clean code is maintained code.
            </p>

            <p>
                Remember: code is read more often than it&apos;s written. Optimize for readability,
                and your future self will thank you.
            </p>
        </div>
    );
}
