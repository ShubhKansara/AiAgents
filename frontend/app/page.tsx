"use client";

import { AgentSelector } from "@/components/AgentSelector";
import { AgentWorkspace } from "@/components/AgentWorkspace";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

import { fetchModels } from "@/lib/api";

function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { llmSettings, setLLMSettings, apiKeys, setApiKey } = useAppStore();
  const [modelOptions, setModelOptions] = useState<Record<string, string[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchModels()
        .then(setModelOptions)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open]);

  if (!open) return null;

  const currentModels = modelOptions[llmSettings.provider] || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Model Selection Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Model Configuration
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Provider
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-all"
                    value={llmSettings.provider}
                    onChange={(e) => {
                      const newProvider = e.target.value;
                      const models = modelOptions[newProvider] || [];
                      setLLMSettings({
                        provider: newProvider,
                        model_name: models[0] || "",
                      });
                    }}
                  >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Google Gemini</option>
                    <option value="perplexity">Perplexity</option>
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Model
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-all"
                    value={llmSettings.model_name}
                    onChange={(e) =>
                      setLLMSettings({ model_name: e.target.value })
                    }
                    disabled={loading || currentModels.length === 0}
                  >
                    {loading ? (
                      <option>Loading models...</option>
                    ) : currentModels.length > 0 ? (
                      currentModels.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))
                    ) : (
                      <option value="">No models available</option>
                    )}
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
            </div>
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          {/* API Keys Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              API Keys
            </h3>
            <div className="space-y-3">
              {["openai", "gemini", "perplexity"].map((provider) => (
                <div key={provider}>
                  <label className="block text-xs font-medium text-slate-500 mb-1 uppercase">
                    {provider} API Key
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    value={apiKeys[provider] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setApiKey(provider, val);
                      // Update active key if currently selected
                      if (provider === llmSettings.provider) {
                        setLLMSettings({ api_key: val });
                      }
                    }}
                    placeholder={`Enter your ${provider} key...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <AgentSelector />

      <div className="flex-1 flex flex-col relative h-full">
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow-md text-slate-600 hover:text-slate-900 transition-all duration-200 group"
            title="Settings"
          >
            <Settings className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>

        <AgentWorkspace />
      </div>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </main>
  );
}
