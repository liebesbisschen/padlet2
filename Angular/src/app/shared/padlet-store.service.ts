import { Injectable } from '@angular/core';
import {Entry, Padlet, User, Comment, Rating} from "./padlet";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})

export class PadletStoreService {
  private api = 'http://padlet2.s1910456011.student.kwmhgb.at/api';


  constructor(private http: HttpClient) {
  }

//asynchron, ui startet request, komponente wird angeklickt, ruft service auf, ruft endpoint auf

  getAll(): Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Padlet> {
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  //Entries
  getEntries(): Observable<Array<Entry>> {
    return this.http.get<Array<Entry>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  findEntryByPadletId(id: number, entry_id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.api}/padlets/${id}/entries/${entry_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createEntry(id: number, entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/padlets/${id}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateEntry(id: number, entry_id: number, entry: Entry): Observable<any> {
    return this.http.put(`${this.api}/padlets/${id}/entries/${entry_id}`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeEntry(id: number): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // Ratings und Comments
  getRatingsByEntry(id: number): Observable<Array<Rating>> {
    return this.http.get<Array<Rating>>(`${this.api}/entries/${id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getCommentsByEntry(id: number): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.api}/entries/${id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

}
