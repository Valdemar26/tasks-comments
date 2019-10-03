import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnChanges {

  @Input() item: any;

  comments = [];
  comment: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllComments();
  }

  ngOnChanges() {
    console.log(this.item);
  }

  getAllComments() {
    this.dataService.getAllItems().subscribe(item => {
      this.comments = item.comment;
    });
  }

  setCommentByItemId(comment) {
    this.dataService.setCommentByItemId(comment, this.item).subscribe( (data) => {
      console.log('DATA: ', data);
    });
  }

}
