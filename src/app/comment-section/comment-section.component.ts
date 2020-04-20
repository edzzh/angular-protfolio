import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CommentsService } from '../comments.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  private commentsService: CommentsService;
  private formBuilder: FormBuilder;
  public commentForm;
  public comments = [];
  @Input() photo;

  constructor(commentsService: CommentsService, formBuilder: FormBuilder) {
    this.commentsService = commentsService;
    this.formBuilder = formBuilder;
    this.commentForm = this.formBuilder.group({
      username: '',
      comment: ''
    });
  }

  ngOnInit(): void {
    this.commentsService.fetchComments(this.photo.id).then(comments => {
      this.comments = this.sortCommentsByTime(comments);
    });
  }

  onSubmit(commentData) {
    const data = {
      username: commentData.username,
      comment: commentData.comment,
      photo_id: this.photo.id
    };

    this.commentsService.addCommentToDatabase(data).then(() => {
      this.commentForm.reset();
      this.commentsService.fetchComments(this.photo.id).then(comments => {
        this.comments = this.sortCommentsByTime(comments);
      });
    });
  }

  sortCommentsByTime(comments) {
    return comments.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      return dateB.getTime() - dateA.getTime();
    });
  }
}
