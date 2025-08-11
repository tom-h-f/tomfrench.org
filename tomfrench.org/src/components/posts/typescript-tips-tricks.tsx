export default function TypeScriptTipsTricks() {
    return (
        <div className="space-y-6">
            <p>
                TypeScript has become an essential tool for JavaScript developers. Beyond basic
                type annotations, there are many advanced patterns that can make your code more
                robust and your development experience smoother.
            </p>

            <h2 className="text-2xl font-heading">Advanced Type Patterns</h2>
            <p>
                Utility types like <code className="bg-secondary-background px-1 rounded">Partial&lt;T&gt;</code>,{" "}
                <code className="bg-secondary-background px-1 rounded">Pick&lt;T, K&gt;</code>, and{" "}
                <code className="bg-secondary-background px-1 rounded">Omit&lt;T, K&gt;</code> can help you
                create precise types without duplication.
            </p>

            <h2 className="text-2xl font-heading">Conditional Types</h2>
            <p>
                Use conditional types to create types that adapt based on input. They&apos;re powerful
                for library development and creating flexible APIs.
            </p>

            <h2 className="text-2xl font-heading">Template Literal Types</h2>
            <p>
                Template literal types allow you to create string types with specific patterns,
                perfect for CSS-in-JS libraries or API route definitions.
            </p>

            <h2 className="text-2xl font-heading">Practical Tips</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Use <code className="bg-secondary-background px-1 rounded">const assertions</code> for better type inference</li>
                <li>Leverage <code className="bg-secondary-background px-1 rounded">satisfies</code> operator for type checking without widening</li>
                <li>Create branded types for better domain modeling</li>
                <li>Use mapped types to transform existing types</li>
                <li>Implement proper error handling with discriminated unions</li>
            </ul>

            <h2 className="text-2xl font-heading">Configuration Tips</h2>
            <p>
                Enable strict mode, use path mapping for cleaner imports, and configure your
                editor for the best TypeScript experience. The tooling is what makes TypeScript
                truly shine.
            </p>

            <p>
                TypeScript is more than just JavaScript with types—it&apos;s a powerful language
                that can help you build more reliable software when used effectively.
            </p>
        </div>
    );
}
