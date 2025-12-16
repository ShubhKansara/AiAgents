"use client";

import { useEffect, useState } from "react";
import { fetchAgents, Agent } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function AgentSelector() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedAgent, selectedAgent } = useAppStore();

  useEffect(() => {
    fetchAgents().then(setAgents).catch(console.error);
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-[320px]">
      <div className="p-5 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          100 AI Agents
        </h2>
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedAgent(agent)}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedAgent?.id === agent.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 border-blue-500"
                : "bg-white hover:bg-white hover:shadow-md text-slate-600 border-transparent hover:border-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="font-semibold text-sm">{agent.name}</div>
            <div
              className={`text-xs mt-1 font-medium ${
                selectedAgent?.id === agent.id
                  ? "text-blue-100"
                  : "text-slate-400"
              }`}
            >
              {agent.category}
            </div>
          </motion.div>
        ))}

        {filteredAgents.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">
            No agents found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
