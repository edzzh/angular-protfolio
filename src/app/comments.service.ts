import { Injectable } from '@angular/core';
import firebase from './Firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private databaseRef;

  constructor() {
    this.databaseRef = firebase.firestore().collection('comments');
  }

  public async fetchComments(photoId) {
    const comments = [];
    const querySnapshot = await this.databaseRef.get();

    querySnapshot.forEach((doc) => {
      const { username, comment, timestamp, photo_id } = doc.data();

      if (photo_id === photoId) {
        comments.push({
          key: doc.id,
          username,
          comment,
          timestamp
        });
      }
    });

    return comments;
  }

  public async addCommentToDatabase(commentData) {
    const { username, comment, photo_id } = commentData;
    const timestamp = new Date().toLocaleString();

    return await this.databaseRef.add({
      username,
      comment,
      photo_id,
      timestamp
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }
}
