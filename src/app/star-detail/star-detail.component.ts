import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star';
import {ActivatedRoute} from '@angular/router';
import {StarService} from '../star.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-star-detail',
  templateUrl: './star-detail.component.html',
  styleUrls: ['./star-detail.component.css']
})


export class StarDetailComponent implements OnInit {
  @Input() star: Star;

  constructor(
    private route: ActivatedRoute,
    private starService: StarService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.getStar();
  }

  save(): void {
    this.starService.updateStar(this.star)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  getStar(): void {
    // + convert string to number
    const id = +this.route.snapshot.paramMap.get('id');

    this.starService.getStar(id).subscribe(star => this.star = star);
  }

}
