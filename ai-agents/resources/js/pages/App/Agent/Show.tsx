import { AgentWorkspace } from '@/Components/AgentWorkspace';
import AuthenticatedLayout from '@/layouts/app-layout';
import { run } from '@/routes/agents';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Show({ auth, agent }: PageProps<{ agent: any }>) {
    const handleRunAgent = async (inputs: any) => {
        const response = await fetch(run.url(agent.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':
                    (window as any).csrfToken ||
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content'),
            },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to execute agent');
        }

        return await response.json();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Hide default header to let workspace take over or keep it minimal
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    {agent.name} Workspace
                </h2>
            }
        >
            <Head title={agent.name} />

            {/* Render the workspace component */}
            <AgentWorkspace agent={agent} onRun={handleRunAgent} />
        </AuthenticatedLayout>
    );
}
