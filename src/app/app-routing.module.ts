import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { DetailedMovieViewComponent } from './main/components/detailed-movie-view/detailed-movie-view.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'movie-page',
    component: DetailedMovieViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
