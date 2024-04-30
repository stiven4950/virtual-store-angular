import { Routes } from '@angular/router';

import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

// Cargar los componentes de forma dinámica para evitar archivos muy pesados de JS
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import("@products/pages/list/list.component"),
      },
      {
        path: 'about',
        // component: AboutComponent, forma normal de cargar sin LAZY LOADING
        loadComponent: () => import("@info/pages/about/about.component").then(c => c.AboutComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () => import("@products/pages/product-detail/product-detail.component"),
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  }
];
