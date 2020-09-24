import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // o day can chuyen huong cac component nen phai khai bao router
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  doSearch(value: string) {
    console.log(`value=${value}`);
    // chuyen huong sang search
    this.route.navigateByUrl(`/search/${value}`);
  }
}
