"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { runAgent } from "@/lib/api";
import { Loader2, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AgentWorkspace() {
  const { selectedAgent, llmSettings } = useAppStore();
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedAgent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
        <Sparkles className="h-16 w-16 mb-4 opacity-50" />
        <p className="text-lg">Select an agent to begin</p>
      </div>
    );
  }

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await runAgent(selectedAgent.id, inputs, llmSettings);
      setOutput(res.output);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Simple schema renderer
  const renderInput = (key: string, schema: any) => {
    const label = schema.description || key;

    if (schema.enum) {
      return (
        <div key={key} className="space-y-1.5 animation-fade-in">
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
          <div className="relative">
            <select
              className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-all shadow-sm"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    if (schema.type === "number" || schema.type === "integer") {
      return (
        <div key={key} className="space-y-1.5 animation-fade-in">
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
          <input
            type="number"
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            onChange={(e) => handleInputChange(key, Number(e.target.value))}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        </div>
      );
    }

    // Default to text
    return (
      <div key={key} className="space-y-1.5 animation-fade-in">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
        {key === "expenses" || schema.type === "object" ? (
          <textarea
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono transition-all shadow-sm"
            rows={4}
            placeholder='{"housing": 1000, ...}'
            onChange={(e) => {
              try {
                handleInputChange(key, JSON.parse(e.target.value));
              } catch {
                // ignore parse errors while typing
              }
            }}
          />
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100/50 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {selectedAgent.name}
          </h1>
        </div>
        <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
          {selectedAgent.description}
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Input Panel */}
        <div className="w-[400px] border-r border-slate-100 p-8 overflow-y-auto bg-slate-50/50">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Configuration
            </h3>
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
              Input Required
            </span>
          </div>

          <div className="space-y-6">
            {selectedAgent.inputs_schema?.properties &&
              Object.entries(selectedAgent.inputs_schema.properties).map(
                ([key, schema]) => renderInput(key, schema)
              )}
          </div>
          <button
            onClick={handleRun}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 fill-current" />
            )}
            Run Agent
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex-1 p-8 overflow-y-auto bg-white relative">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
              Output
            </h3>
            {output ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="prose prose-slate max-w-none bg-slate-50/80 p-8 rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-200/50"
              >
                <pre className="whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed">
                  {output}
                </pre>
              </motion.div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                <div className="p-4 bg-slate-50 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-slate-200" />
                </div>
                <p className="text-lg font-medium text-slate-400">
                  Ready to generate
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Configure the inputs and run the agent
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
