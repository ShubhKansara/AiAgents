const API_BASE_URL = "http://127.0.0.1:8000";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  inputs_schema: any;
}

export interface LLMSettings {
  provider: string;
  model_name: string;
  temperature: number;
  api_key?: string;
}

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE_URL}/agents`);
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

export async function runAgent(
  agentId: string,
  inputs: any,
  llmSettings: LLMSettings
): Promise<{ output: string }> {
  const res = await fetch(`${API_BASE_URL}/agents/${agentId}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputs,
      llm_settings: llmSettings,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to run agent");
  }

  return res.json();
}

export async function fetchModels(): Promise<Record<string, string[]>> {
  const res = await fetch(`${API_BASE_URL}/config/models`);
  if (!res.ok) throw new Error("Failed to fetch models");
  return res.json();
}
