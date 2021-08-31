import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent {

  @Input()
  centered: boolean = true;

  @Input()
  width: string = "6rem";

  @Input()
  height: string = "6rem";
}
