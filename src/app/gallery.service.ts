import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() {}

  public async fetchPhotos() {
    return await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: 'ballons',
        per_page: 5
      },
      headers: {
        Authorization: 'Client-ID cad06ba4eca06b9ae2d390e09fcf35680c9b598fbe24e982a7c526c08f5d6052'
      }
    });
  }

  public async fetchPhoto(photoId) {
    return await axios.get(`https://api.unsplash.com/photos/${photoId}`, {
      headers: {
        Authorization: 'Client-ID cad06ba4eca06b9ae2d390e09fcf35680c9b598fbe24e982a7c526c08f5d6052'
      }
    });
  }
}
