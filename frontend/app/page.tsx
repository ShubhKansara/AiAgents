"use client";

import { AgentSelector } from "@/components/AgentSelector";
import { AgentWorkspace } from "@/components/AgentWorkspace";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border">
        <div className="p-6 border-b flex justify-between items-center bg-muted/20">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Model Configuration
            </h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Provider
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-2.5 bg-background border rounded-xl text-sm focus:ring-2 focus:ring-ring focus:border-ring outline-none appearance-none transition-all"
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
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Model
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-2.5 bg-background border rounded-xl text-sm focus:ring-2 focus:ring-ring focus:border-ring outline-none appearance-none transition-all"
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
                </div>
              </div>
            </div>
          </div>

          <div className="border-t my-4"></div>

          {/* API Keys Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              API Keys
            </h3>
            <div className="space-y-3">
              {["openai", "gemini", "perplexity"].map((provider) => (
                <div key={provider}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">
                    {provider} API Key
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 bg-background border rounded-xl text-sm focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all placeholder:text-muted-foreground"
                    value={apiKeys[provider] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setApiKey(provider, val);
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

        <div className="p-6 border-t bg-muted/20 flex justify-end">
          <Button onClick={onClose}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SidebarProvider>
      {/* Sidebar Component */}
      <AgentSelector />

      {/* Main Content inset */}
      <SidebarInset>
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <AgentWorkspace onOpenSettings={() => setShowSettings(true)} />
        </div>
      </SidebarInset>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </SidebarProvider>
  );
}
