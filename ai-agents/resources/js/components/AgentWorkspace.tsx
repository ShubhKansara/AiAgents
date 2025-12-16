import { motion } from 'framer-motion';
import { Loader2, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AgentWorkspaceProps {
    agent: any;
    onRun: (inputs: any) => Promise<any>;
}

export function AgentWorkspace({ agent, onRun }: AgentWorkspaceProps) {
    const [inputs, setInputs] = useState<Record<string, any>>({});
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [usage, setUsage] = useState<any>(null);

    const handleInputChange = (key: string, value: any) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    const handleRun = async () => {
        setLoading(true);
        setOutput('');
        setUsage(null);
        try {
            const res = await onRun(inputs);
            // Ensure we handle both structure from Python directly or via our wrapper
            const out = res.output || JSON.stringify(res);
            setOutput(out);
            if (res.usage) {
                setUsage(res.usage);
            }
        } catch (err: any) {
            setOutput(`Error: ${err.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    // Improved schema renderer with heuristic for Textarea
    const renderInput = (key: string, schema: any) => {
        const label = schema.description || key;
        const isLongText =
            key.toLowerCase().includes('code') ||
            key.toLowerCase().includes('content') ||
            key.toLowerCase().includes('prompt') ||
            key.toLowerCase().includes('description') ||
            key.toLowerCase().includes('text');

        if (schema.enum) {
            return (
                <div key={key} className="space-y-2">
                    <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                    <div className="relative">
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={(e) =>
                                handleInputChange(key, e.target.value)
                            }
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select {label}
                            </option>
                            {schema.enum.map((opt: string) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            );
        }

        if (schema.type === 'number' || schema.type === 'integer') {
            return (
                <div key={key} className="space-y-2">
                    <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                    <Input
                        type="number"
                        onChange={(e) =>
                            handleInputChange(key, Number(e.target.value))
                        }
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                </div>
            );
        }

        // Default to text (Input or Textarea based on heuristic)
        return (
            <div key={key} className="space-y-2">
                <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
                {isLongText ||
                key === 'expenses' ||
                schema.type === 'object' ? (
                    <Textarea
                        className="min-h-[120px] font-mono"
                        onChange={(e) => {
                            if (
                                key === 'expenses' ||
                                schema.type === 'object'
                            ) {
                                try {
                                    handleInputChange(
                                        key,
                                        JSON.parse(e.target.value),
                                    );
                                } catch {
                                    // ignore parse errors while typing
                                    handleInputChange(key, e.target.value); // still update state
                                }
                            } else {
                                handleInputChange(key, e.target.value);
                            }
                        }}
                        placeholder={
                            key === 'expenses'
                                ? '{"housing": 1000, ...}'
                                : `Enter ${label.toLowerCase()}...`
                        }
                    />
                ) : (
                    <Input
                        type="text"
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="relative flex h-[calc(100vh-65px)] flex-1 flex-col overflow-hidden bg-background">
            {/* Main Content: Responsive Grid */}
            <div className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[400px_1fr]">
                {/* Input Panel (Scrollable) */}
                <div className="overflow-y-auto border-b bg-muted/10 p-8 lg:border-r lg:border-b-0">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xs font-bold tracking-widest text-muted-foreground/70 uppercase">
                            Configuration
                        </h3>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-blue-700 uppercase dark:bg-blue-950 dark:text-blue-300">
                            Input Required
                        </span>
                    </div>

                    <p className="mb-6 text-sm text-muted-foreground">
                        {agent.description}
                    </p>

                    <div className="space-y-6">
                        {agent.input_schema?.properties &&
                            Object.entries(agent.input_schema.properties).map(
                                ([key, schema]) => renderInput(key, schema),
                            )}
                        {!agent.input_schema?.properties && (
                            <div className="text-sm text-muted-foreground italic">
                                No input schema defined. You can still try
                                running it.
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleRun}
                        disabled={loading}
                        className="mt-8 w-full bg-blue-600 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                        size="lg"
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Play className="mr-2 h-5 w-5 fill-white" />
                        )}
                        Run Agent
                    </Button>
                </div>

                {/* Output Panel (Scrollable) */}
                <div className="flex-1 overflow-y-auto bg-background p-6 lg:p-10">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Output
                                </h3>
                                {usage && (
                                    <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                                        <span className="font-medium">
                                            Tokens:
                                        </span>
                                        <span>
                                            {usage.total_tokens ||
                                                usage.tokens_total}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {output ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="prose prose-slate dark:prose-invert max-w-none rounded-xl border bg-muted/30 p-8 shadow-sm"
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {output}
                                </ReactMarkdown>
                            </motion.div>
                        ) : (
                            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/10 p-8 text-center text-muted-foreground">
                                <div className="mb-4 rounded-full bg-background p-4 shadow-sm ring-1 ring-border">
                                    <Sparkles className="h-6 w-6 text-muted-foreground/50" />
                                </div>
                                <p className="text-lg font-medium">
                                    Ready to generate
                                </p>
                                <p className="mt-1 max-w-xs text-sm">
                                    Fill in the configuration on the left and
                                    click Run Agent to see the magic happen.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
