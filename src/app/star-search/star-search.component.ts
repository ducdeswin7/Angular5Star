import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Star} from '../star';
import {Subject} from 'rxjs/Subject';
import {StarService} from '../star.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-star-search',
  templateUrl: './star-search.component.html',
  styleUrls: ['./star-search.component.css']
})

export class StarSearchComponent implements OnInit {
  stars$: Observable<Star[]>;
  private searchTerms = new Subject<string>();

  constructor(private starService: StarService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.stars$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.starService.searchStars(term))
    );
  }

}
