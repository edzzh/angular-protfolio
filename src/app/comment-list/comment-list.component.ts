import {Component, OnInit} from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments;

  constructor() { }

  ngOnInit(): void {
  }

}
