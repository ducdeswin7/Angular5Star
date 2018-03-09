import { Injectable } from '@angular/core';
import {Star} from './star';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StarService {

  private starsUrl = 'api/stars';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getStars(): Observable<Star[]> {

    this.messageService.add('StarService: fetched stars');
    return this.http.get<Star[]>(this.starsUrl)
      .pipe(
        tap(stars => this.log(`fetched stars`)),
        catchError(this.handleError('getStars', []))
    );
  }

  getStar(id: number): Observable<Star> {
    this.messageService.add(`Star Service: fetched star id=${id}`);
    const url = `${this.starsUrl}/${id}`;
    return this.http.get<Star>(url).pipe(
      tap(_ => this.log(`fetched star id=${id}`)),
      catchError(this.handleError<Star>(`getStar id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('StarService: ' + message);
  }

  updateStar(star: Star): Observable<any>{
    return this.http.put(this.starsUrl, star, httpOptions).pipe(
      tap(_ => this.log(`updated star id=${star.id}`)),
      catchError(this.handleError<any>('updateStar')));
  }

  addStar(star: Star): Observable<Star> {
    return this.http.post<Star>(this.starsUrl, star, httpOptions).pipe(
      tap((star: Star) => this.log(`added star w/ id=${star.id}`)),
      catchError(this.handleError<Star>('addHero'))
    );
  }

  deleteStar(star: Star | number): Observable<Star> {
    const id = typeof star === 'number' ? star : star.id;
    const url = `${this.starsUrl}/${id}`;

    return this.http.delete<Star>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Star>('deleteHero'))
    );
  }

  searchStars(term: string): Observable<Star[]> {
    if (!term.trim()) {return of([])}

    return this.http.get<Star[]>(`api/stars/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Star[]>('searchHeroes', []))
    );
  }
}
