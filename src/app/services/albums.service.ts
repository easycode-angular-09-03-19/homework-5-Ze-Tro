import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "../interfaces/album";
import { environment } from "../../environments/environment";
import { AlertMessageService } from './alert-message.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl: string = environment.apiUrl;
  constructor(
	private http: HttpClient,
	private alertMessageService: AlertMessageService
  ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }
  addNewAlbum(value: Album) {
    return this.http.post(`${this.apiUrl}/albums`, value);
  }
  deleteAlbum(value: Album) {
	return this.http.delete(`${this.apiUrl}/albums/${value.id}`);
  }

  changeAlbum(value: Album) {
    return this.http.put(`${this.apiUrl}/albums/${value.id}`, value);
  }
}