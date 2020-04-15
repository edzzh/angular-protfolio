import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {
  private galleryPhotos: GalleryService;
  private route: ActivatedRoute;
  private photoId;
  public loading = true;
  public photo;

  constructor( galleryPhotos: GalleryService, route: ActivatedRoute) {
    this.galleryPhotos = galleryPhotos;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
    });

    this.galleryPhotos.fetchPhoto(this.photoId).then(photo => {
      this.loading = false;
      this.photo = photo.data;
    });
  }

}
