import AuthenticatedLayout from '@/layouts/app-layout';
import { show } from '@/routes/agents';
import { Agent } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    auth,
    agents,
}: {
    auth: any;
    agents: Agent[];
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Agent Gallery
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {agents.map((agent) => (
                            <Link
                                key={agent.id}
                                href={show.url(agent.slug)}
                                className="block overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-lg dark:bg-gray-800"
                            >
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <h3 className="mb-2 text-xl font-bold">
                                        {agent.name}
                                    </h3>
                                    <span className="mb-4 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                        {agent.category}
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {agent.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        {agents.length === 0 && (
                            <div className="col-span-3 py-10 text-center text-gray-500">
                                No active agents found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
