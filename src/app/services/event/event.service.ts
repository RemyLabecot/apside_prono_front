import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Event } from 'src/app/Models/event';


@Injectable()
export class EventService {

    private baseURL = 'http://localhost:8086/pronos/event';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private _events = new Subject<Event[]>();
    private _event = new Subject<Event>();

    constructor(private http: HttpClient) { }

    public getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseURL}`, this.httpOptions);
    }

    public getEventById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public createEvent(event: Event): Observable<Event> {
        let jsonEvent = {
            "label": event.label,
            "eventDate": event.eventDate,
            "openDate": event.openDate,
            "closeDate": event.closeDate,
            "coeff": event.coeff,
            "contest": {
                "id": event.contest.id,
                "label": event.contest.label
            }
        }

        return this.http.post<Event>(`${this.baseURL}`, jsonEvent, this.httpOptions);
    }

    public updateEvent(event: Event): Observable<Event> {
        let jsonEvent = {
            "id": event.id,
            "label": event.label,
            "eventDate": event.eventDate,
            "openDate": event.openDate,
            "closeDate": event.closeDate,
            "coeff": event.coeff,
            "contest": {
                "id": event.contest.id,
                "label": event.contest.label
            }
        };
        return this.http.put<Event>(`${this.baseURL}`, jsonEvent, this.httpOptions);
    }

    public deleteEvent(id: number): Observable<Event> {
        return this.http.delete<Event>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public get events() {
        return this._events;
    }
    public set events(value) {
        this._events = value;
    }

    public get event() {
        return this._event;
    }
    public set event(value) {
        this._event = value;
    }
}