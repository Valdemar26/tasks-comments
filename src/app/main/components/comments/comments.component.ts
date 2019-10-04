import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnChanges {

  @Input() item: any;

  comments = [];
  comment: string;
  color: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllComments();
  }

  ngOnChanges() {
    if (this.item) {
      this.comments = this.item.comments;
    }
  }

  getAllComments() {
    this.dataService.getAllItems().subscribe(item => {
      this.comments = item.comment;
    });
  }

  setCommentByItemId(comment) {
    this.dataService.setCommentByItemId(comment, this.item).subscribe( (data: any) => {
      console.log('DATA: ', data.comments);
      this.comments = data.comments;
    });
    this.comment = '';
  }

  // getRandomColor() {
  //   const color = Math.floor(0x1000000 * Math.random()).toString(16);
  //   console.log('#' + ('000000' + color).slice(-6));
  //   return this.color = '#' + ('000000' + color).slice(-6);
  // }

  getRandomColor(max) {
    const color = '#' + ('000000' + Math.floor(0x1000000 * Math.random()).toString(16)).slice(-6);
    console.log(color, max);
    return this.color = color;
  }

}
