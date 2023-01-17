import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from './main/components/movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { FilterMoviesPipe } from './pipes/filter-movies.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { FiltersPopoverComponent } from './main/components/filters-popover/filters-popover.component';
import { DetailedMovieViewComponent } from './main/components/detailed-movie-view/detailed-movie-view.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    MovieCardComponent,
    FilterMoviesPipe,
    FiltersPopoverComponent,
    DetailedMovieViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
  ],
  exports: [MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
