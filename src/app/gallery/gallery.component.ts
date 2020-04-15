import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private galleryPhotos: GalleryService;
  public loading = true;
  public photos;

  constructor( galleryPhotos: GalleryService ) {
    this.galleryPhotos = galleryPhotos;
  }

  ngOnInit(): void {
    this.galleryPhotos.fetchPhotos().then(photos => {
      this.loading = false;
      this.photos = photos.data.results;
    });
  }
}
