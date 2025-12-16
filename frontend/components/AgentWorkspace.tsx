"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { runAgent } from "@/lib/api";
import { Loader2, Play, Sparkles, Settings } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AgentWorkspaceProps {
  onOpenSettings?: () => void;
}

export function AgentWorkspace({ onOpenSettings }: AgentWorkspaceProps) {
  const { selectedAgent, llmSettings } = useAppStore();
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<any>(null);

  if (!selectedAgent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50 p-4 text-center">
        <Sparkles className="h-16 w-16 mb-4 opacity-20" />
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <p className="text-lg">Select an agent from the sidebar to begin</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    setUsage(null);
    try {
      const res = await runAgent(selectedAgent.id, inputs, llmSettings);
      console.log("RunAgent Response:", res);
      setOutput(res.output);
      if (res.usage) {
        setUsage(res.usage);
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Improved schema renderer with heuristic for Textarea
  const renderInput = (key: string, schema: any) => {
    const label = schema.description || key;
    const isLongText =
      key.toLowerCase().includes("code") ||
      key.toLowerCase().includes("content") ||
      key.toLowerCase().includes("prompt") ||
      key.toLowerCase().includes("description") ||
      key.toLowerCase().includes("text");

    if (schema.enum) {
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
          <div className="relative">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleInputChange(key, e.target.value)}
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

    if (schema.type === "number" || schema.type === "integer") {
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
          <Input
            type="number"
            onChange={(e) => handleInputChange(key, Number(e.target.value))}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        </div>
      );
    }

    // Default to text (Input or Textarea based on heuristic)
    return (
      <div key={key} className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        {isLongText || key === "expenses" || schema.type === "object" ? (
          <Textarea
            className="font-mono min-h-[120px]"
            onChange={(e) => {
              if (key === "expenses" || schema.type === "object") {
                try {
                  handleInputChange(key, JSON.parse(e.target.value));
                } catch {
                  // ignore parse errors while typing
                  handleInputChange(key, e.target.value); // still update state
                }
              } else {
                handleInputChange(key, e.target.value);
              }
            }}
            placeholder={
              key === "expenses"
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
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Unified Header */}
      <div className="flex items-center h-16 shrink-0 gap-2 border-b bg-background px-4 z-10 sticky top-0">
        <SidebarTrigger className="-ml-1" />
        <div className="h-4 w-px bg-border mx-2" />

        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-sm font-semibold tracking-tight text-foreground truncate">
              {selectedAgent.name}
            </h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="text-muted-foreground hover:text-foreground"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content: Responsive Grid */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[400px_1fr] overflow-hidden">
        {/* Input Panel (Scrollable) */}
        <div className="border-b lg:border-b-0 lg:border-r p-8 overflow-y-auto bg-muted/10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs font-bold text-muted-foreground/70 uppercase tracking-widest">
              Configuration
            </h3>
            <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-full font-bold uppercase tracking-wide">
              Input Required
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {selectedAgent.description}
          </p>

          <div className="space-y-6">
            {selectedAgent.inputs_schema?.properties &&
              Object.entries(selectedAgent.inputs_schema.properties).map(
                ([key, schema]) => renderInput(key, schema)
              )}
          </div>

          <Button
            onClick={handleRun}
            disabled={loading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] font-semibold"
            size="lg"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <Play className="h-5 w-5 mr-2 fill-white" />
            )}
            Run Agent
          </Button>
        </div>

        {/* Output Panel (Scrollable) */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  Output
                </h3>
                {usage && (
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border">
                    <span className="font-medium">Tokens:</span>
                    <span>{usage.total_tokens}</span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>In: {usage.prompt_tokens}</span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>Out: {usage.completion_tokens}</span>
                  </div>
                )}
              </div>
            </div>

            {output ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="prose prose-slate dark:prose-invert max-w-none bg-muted/30 p-8 rounded-xl border shadow-sm"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {output}
                </ReactMarkdown>
              </motion.div>
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl bg-muted/10 p-8 text-center">
                <div className="p-4 bg-background rounded-full mb-4 shadow-sm ring-1 ring-border">
                  <Sparkles className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="text-lg font-medium">Ready to generate</p>
                <p className="text-sm mt-1 max-w-xs">
                  Fill in the configuration on the left and click Run Agent to
                  see the magic happen.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
