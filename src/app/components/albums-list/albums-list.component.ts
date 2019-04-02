import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from "../../interfaces/album";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEventsService: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    this.albumEventsService.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
      }
  });

    this.albumEventsService.albumDeleteFakeEventObservableSubject.subscribe((id: number) => {
      if (id > 0) {
        let newAlbum = this.albums.filter((album) => {
          return album.id !== id;
        });
        this.albums = newAlbum;
      }
    });
  }
}