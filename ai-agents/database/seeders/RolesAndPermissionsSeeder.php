<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Define Permissions
        $permissions = [
            // Agent Management (Admin)
            'agent.create',
            'agent.edit',
            'agent.delete',
            'agent.view_any', // View listing in admin panel

            // Agent Execution (User)
            'agent.run',
            'agent.view', // View details/workspace

            // Usage & Billing
            'usage.view_own',
            'usage.view_all', // Admin
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 2. Define Roles and Assign Permissions

        // ROLE: User (Default)
        $userRole = Role::firstOrCreate(['name' => 'User']);
        $userRole->givePermissionTo([
            'agent.run',
            'agent.view',
            'usage.view_own',
        ]);

        // ROLE: Subscriber (Verified/Paid)
        $subscriberRole = Role::firstOrCreate(['name' => 'Subscriber']);
        $subscriberRole->givePermissionTo([
            'agent.run',
            'agent.view',
            'usage.view_own',
            // Add premium agent access here later if needed
        ]);

        // ROLE: Admin (Superuser)
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        // 3. Create Demo Users (Optional, helps with testing)
        // You can move this to UserSeeder if preferred
    }
}
