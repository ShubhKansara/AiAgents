import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { create, destroy, edit } from '@/routes/admin/agents';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash } from 'lucide-react';
export default function Index({ auth, agents }: PageProps<{ agents: any[] }>) {
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this agent?')) {
            router.delete(destroy.url(id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Agents
                    </h2>
                    <Link href={create.url()}>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> New Agent
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Agents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Active
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agents.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-4 text-center"
                                                >
                                                    No agents found.
                                                </td>
                                            </tr>
                                        ) : (
                                            agents.map((agent) => (
                                                <tr
                                                    key={agent.id}
                                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                                                    >
                                                        {agent.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {agent.category}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`rounded-full px-2 py-1 text-xs ${agent.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                        >
                                                            {agent.is_active
                                                                ? 'Active'
                                                                : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="flex gap-2 px-6 py-4">
                                                        <Link
                                                            href={edit.url(
                                                                agent.id,
                                                            )}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    agent.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
