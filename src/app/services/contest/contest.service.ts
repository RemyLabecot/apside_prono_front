import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Contest } from 'src/app/Models/contest';


@Injectable()
export class ContestService {

    private baseURL = 'http://localhost:8086/pronos/contest';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private _contests = new Subject<Contest[]>();
    private _contest = new Subject<Contest>();

    constructor(private http: HttpClient) { }

    public getAllContests(): Observable<Contest[]> {
        return this.http.get<Contest[]>(`${this.baseURL}`, this.httpOptions);
    }

    public getContestById(id: number): Observable<Contest> {
        return this.http.get<Contest>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public createContest(contest: Contest): Observable<Contest> {
        let jsonContest = {
            "label": contest.label,
        }

        return this.http.post<Contest>(`${this.baseURL}`, jsonContest, this.httpOptions);
    }

    public updateContest(contest: Contest): Observable<Contest> {
        let jsonContest = {
            "id": contest.id,
            "label": contest.label
        };
        return this.http.put<Contest>(`${this.baseURL}`, jsonContest, this.httpOptions);
    }

    public deleteContest(id: number): Observable<Contest> {
        return this.http.delete<Contest>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public get contests() {
        return this._contests;
    }
    public set contests(value) {
        this._contests = value;
    }

    public get contest() {
        return this._contest;
    }
    public set contest(value) {
        this._contest = value;
    }
}