import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../../service/data.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnChanges {
  @Input() itemObj: any;

  comments = [];
  comment: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllComments();
  }

  ngOnChanges() {
    if (this.itemObj) {
      this.comments = this.itemObj.item.comments;
    }
    this.dataService.item$.pipe(first()).subscribe(
      data =>  {
        this.comments = data.deleteItem ? [] : null;
        console.log(this.comments);
      }
    );
  }

  getAllComments() {
    this.dataService.getAllItems().pipe(first()).subscribe(item => {
      this.comments = item.comment;
    });
  }

  setCommentByItemId(comment) {
    this.dataService.setCommentByItemId(comment, this.itemObj.item).pipe(first()).subscribe( (data: any) => {
      console.log('DATA: ', data.comments);
      this.comments = data.comments;
    });

    this.comment = '';
  }

}
