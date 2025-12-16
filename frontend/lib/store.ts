import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Agent, LLMSettings } from "@/lib/api";

interface AppState {
  selectedAgent: Agent | null;
  llmSettings: LLMSettings;
  apiKeys: { [provider: string]: string };
  setSelectedAgent: (agent: Agent | null) => void;
  setLLMSettings: (settings: Partial<LLMSettings>) => void;
  setApiKey: (provider: string, key: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedAgent: null,
      llmSettings: {
        provider: "openai",
        model_name: "gpt-3.5-turbo",
        temperature: 0.7,
      },
      apiKeys: {},
      setSelectedAgent: (agent) => set({ selectedAgent: agent }),
      setLLMSettings: (settings) =>
        set((state) => ({
          llmSettings: { ...state.llmSettings, ...settings },
        })),
      setApiKey: (provider, key) =>
        set((state) => ({ apiKeys: { ...state.apiKeys, [provider]: key } })),
    }),
    {
      name: "agent-platform-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        llmSettings: state.llmSettings,
        apiKeys: state.apiKeys,
        // We generally don't persist selectedAgent as text inputs aren't persisted yet
      }),
    }
  )
);
