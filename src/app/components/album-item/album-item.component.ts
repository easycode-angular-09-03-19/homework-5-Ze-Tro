import { Component, OnInit, Input } from '@angular/core';
import { Album } from "../../interfaces/album";
import { AlbumsService } from 'src/app/services/albums.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { AlbumEventsService } from 'src/app/services/album-events.service';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  editMode = false;

  @Input() item: Album;
  constructor(
    public albumService: AlbumsService,
    public alertMessageService: AlertMessageService,
    public albumEventService: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumEventService.albumEditEventObservableSubject.subscribe((album: Album) => {
      if (this.item.id !== album.id) {
        this.editMode = false;
      }
    });

    this.albumEventService.albumUpdateEventObservableSubject.subscribe((album: Album) => {
      if (this.item.id === album.id) {
        this.updateAlbumItem(album);
      }
    })
  }

  deleteAlbumItem() {
    let deletItem = confirm('Are you sure?');

    if (deletItem) {
        this.albumService.deleteAlbum(this.item).subscribe((data: Album) => {
        this.albumEventService.emitDeleteAlbum(data);
        this.alertMessageService.emitSubmitMessage('deleteTrue');
      }, (err) => {
        this.alertMessageService.emitSubmitMessage('deleteFalse');
      }, () => {
        this.albumEventService.emitDeleteAlbumFake(this.item.id); // fake deleting
      });
    }
  }
    
  editAlbumItem() {
    this.editMode = true;
    this.albumEventService.emitEditAlbum(this.item);

  }

  cancelEditAlbumItem() {
    this.editMode = false;
    this.albumEventService.emitCancelEditAlbum('cancel');
    this.alertMessageService.emitSubmitMessage('cancel');
  }

  updateAlbumItem(album: Album) {
    this.editMode = false;
    this.item.title = album.title;
  }
}