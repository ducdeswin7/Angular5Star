import { Component, OnInit } from '@angular/core';
import {Star} from '../star';
import {StarService} from '../star.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnInit {

  stars: Star[];

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.getStars();
  }

  getStars(): void {
    this.starService.getStars()
      .subscribe(stars => this.stars = stars);
  }

  delete(star: Star): void {
    this.stars = this.stars.filter(s => s !== star);
    this.starService.deleteStar(star).subscribe();
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.starService.addStar({name} as Star)
      .subscribe(star => {
        this.stars.push(star);
      });
  }
}
