import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'plans',
        pathMatch: 'full',
    },
    {
        path: 'plans',
        loadComponent: () => import('../app/modules/pages/plans/plans.component').then((c) => c.PlansComponent)
    },
    {
        path: 'clients',
        loadComponent: () => import('../app/modules/pages/clients/clients.component').then((c) => c.ClientsComponent)
    },
    {
        path: '**',
        redirectTo: 'plans',
        pathMatch: 'full',
    },
];
