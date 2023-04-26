import { Component, OnInit, ViewChild } from '@angular/core';
import { PostStuffing } from '../post-stuffing';
import { UserService } from '../user.service';
import { StuffinglistComponent } from '../stuffinglist/stuffinglist.component';

@Component({
  selector: 'app-add-stuffing',
  templateUrl: './add-stuffing.component.html',
  styleUrls: ['./add-stuffing.component.css']
})
export class AddStuffingComponent implements OnInit {

  postStuffing: PostStuffing = {
    name: '',
    code: '',
    description: '',
    methodType: ''
  };
  submitted = false;
  selectedMethodValue : string = '';
  @ViewChild(StuffinglistComponent, { static: false }) childC: StuffinglistComponent | undefined;
  showChild: boolean = true;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onUpdateChild() {
    this.childC?.update();
  }
  saveStuffing(): void {
    const data = {
      name: this.postStuffing.name,
      code: this.postStuffing.code,
      description: this.postStuffing.description,
      methodType: this.selectedMethodValue
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.childC?.update();
        },
        error => {
          console.log(error);
        });
  }

 
}
