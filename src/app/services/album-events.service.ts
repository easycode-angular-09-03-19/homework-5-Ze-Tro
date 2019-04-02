import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumDeleteEventSource = new BehaviorSubject({});
  public albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();
  
  private albumDeleteFakeEventSource = new BehaviorSubject(0);
  public albumDeleteFakeEventObservableSubject = this.albumDeleteFakeEventSource.asObservable();

  private albumEditEventSource = new BehaviorSubject({});
  public albumEditEventObservableSubject = this.albumEditEventSource.asObservable();
  
  private albumCancelEditEventSource = new BehaviorSubject('');
  public albumCancelEditEventObservableSubject = this.albumCancelEditEventSource.asObservable();

  private albumUpdateEventSource = new BehaviorSubject({});
  public albumUpdateEventObservableSubject = this.albumUpdateEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(album: Album) {
    this.albumAddEventSource.next(album);
  }

  emitDeleteAlbum(album: Album) {
    this.albumDeleteEventSource.next(album);
  }
  
  emitDeleteAlbumFake(id: number) { //fake deleting
      this.albumDeleteFakeEventSource.next(id);
  }
    
  emitEditAlbum(album: Album) {
    this.albumEditEventSource.next(album);
  }
  
  emitCancelEditAlbum(value: string) {
    this.albumCancelEditEventSource.next(value);
  }

  emitUpdateAlbum(album: Album) {
    this.albumUpdateEventSource.next(album);
  }
}
