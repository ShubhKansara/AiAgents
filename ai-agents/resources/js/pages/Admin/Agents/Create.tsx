import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/admin/agents';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        description: '',
        input_schema: JSON.stringify(
            {
                type: 'object',
                properties: {
                    query: { type: 'string', description: 'The user query' },
                },
            },
            null,
            2,
        ),
        endpoint: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const parsedSchema = JSON.parse(data.input_schema);
            post(store.url(), {
                ...data,
                input_schema: parsedSchema,
            } as any);
        } catch (e) {
            alert('Invalid JSON Schema');
            return;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Create Agent
                </h2>
            }
        >
            <Head title="Create Agent" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Agent Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-1"
                                    placeholder="e.g. Finance Advisor"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="mt-1"
                                    placeholder="e.g. Finance, Coding"
                                />
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-1"
                                    placeholder="Describe what this agent does..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="input_schema">
                                    Input Schema (JSON)
                                </Label>
                                <Textarea
                                    id="input_schema"
                                    value={data.input_schema}
                                    onChange={(e) =>
                                        setData('input_schema', e.target.value)
                                    }
                                    className="mt-1 h-48 font-mono"
                                    placeholder="{ ... }"
                                />
                                {errors.input_schema && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.input_schema}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Define the JSON Schema for the agent's
                                    input.
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="endpoint">
                                    Backend Endpoint (Optional)
                                </Label>
                                <Input
                                    id="endpoint"
                                    value={data.endpoint}
                                    onChange={(e) =>
                                        setData('endpoint', e.target.value)
                                    }
                                    className="mt-1 font-mono text-sm"
                                    placeholder="/agents/{id}/run"
                                />
                                {errors.endpoint && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.endpoint}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Override the default execution endpoint.
                                    Leave blank for default (
                                    <code>/agents/{'{id}'}/run</code>).
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={index.url()}
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    Cancel
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    Create Agent
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
