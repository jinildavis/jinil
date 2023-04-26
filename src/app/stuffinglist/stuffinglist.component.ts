import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stuffinglist',
  templateUrl: './stuffinglist.component.html',
  styleUrls: ['./stuffinglist.component.css']
})

export class StuffinglistComponent implements OnInit {

  stuffing = new Array<any>();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
        this.stuffing = response.results;
    });
  }

  update(): void {
    this.userService.getUsers().subscribe(response => {
      this.stuffing = response.results;
  });
  }

}
