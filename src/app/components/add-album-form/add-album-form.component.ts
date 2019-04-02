import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { Album } from "../../interfaces/Album";
import { NgForm } from "@angular/forms";
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})

export class AddAlbumFormComponent implements OnInit {
  album = {
    userId: 0,
    id: 0,
    title: ''
  };

  editMode: boolean;

  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEventsService: AlbumEventsService,
    public alertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    
    this.albumEventsService.albumEditEventObservableSubject.subscribe((album: Album) => {
      this.editAlbumItem(album);
    });

    this.albumEventsService.albumCancelEditEventObservableSubject.subscribe((data: string) => {
      this.cancelAlbumItem(data);
    });
  }

  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      this.albumEventsService.emitAddNewAlbum(data);
      this.form.resetForm();
      this.alertMessageService.emitSubmitMessage('submit');
    });
  }

  editAlbumItem(album: Album) {
    if(album) {
      this.editMode = true;
      this.album.title = album.title;
      this.album.id = album.id;
      this.album.userId = album.userId;
    }
  }
  
  cancelAlbumItem(data) {
    this.editMode = false;
    if (data === 'cancel') {
      this.album.title = '';
      this.alertMessageService.emitSubmitMessage('cancel');
    }
  }

  saveChanges() {
    const newAlbum: Album = {
      id: this.album.id,
      userId: this.album.userId,
      title: this.album.title
    };

    this.albumService.changeAlbum(newAlbum).subscribe((album: Album) => {
      this.albumEventsService.emitUpdateAlbum(album);
      this.editMode = false;
      this.form.resetForm();
    });

    this.alertMessageService.emitSubmitMessage('update');
  }
}