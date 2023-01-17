import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogDataFilters } from 'src/app/interfaces/dialog-data-filters.interface';

@Component({
  selector: 'app-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss'],
})
export class FiltersPopoverComponent implements OnInit {
  filterSelectorRated: any[] = [];
  filterSelectorGenre: any[] = [];
  filterSelectorType: any[] = [];
  movieFilterForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FiltersPopoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataFilters
  ) {}

  ngOnInit() {
    const { rated, genre, type } = this.data;
    this.filterSelectorRated = rated;
    this.filterSelectorGenre = genre;
    this.filterSelectorType = type;
    this.initMovieFilterForm();
  }

  initMovieFilterForm() {
    this.movieFilterForm = new FormGroup({
      rated: new FormControl(null),
      genre: new FormControl(null),
      type: new FormControl(null),
    });
  }

  onFilterMoviesFormSubmit() {
    this.dialogRef.close(this.movieFilterForm.value);
  }
}
