import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Player } from 'src/app/Models/player';


@Injectable()
export class PlayerService {

    private baseURL = 'http://localhost:8086/pronos/player';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private _players = new Subject<Player[]>();
    private _player = new Subject<Player>();

    constructor(private http: HttpClient) { }

    public getAllPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.baseURL}`, this.httpOptions);
    }

    public getPlayerById(id: number): Observable<Player> {
        return this.http.get<Player>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public createPlayer(player: Player): Observable<Player> {
        let jsonPlayer = {
            "firstName": player.firstName,
            "lastName": player.lastName,
            "subscriptionDate": new Date(),
            "mail": player.mail
        }

        return this.http.post<Player>(`${this.baseURL}`, jsonPlayer, this.httpOptions);
    }

    public updatePlayer(player: Player): Observable<Player> {
        let jsonPlayer = {
            "id": player.id,
            "firstName": player.firstName,
            "lastName": player.lastName,
            "subscriptionDate": player.subscriptionDate,
            "mail": player.mail
        };
        return this.http.put<Player>(`${this.baseURL}`, jsonPlayer, this.httpOptions);
    }

    public deletePlayer(id: number): Observable<Player> {
        return this.http.delete<Player>(`${this.baseURL}/${id}`, this.httpOptions);
    }

    public get players() {
        return this._players;
    }
    public set players(value) {
        this._players = value;
    }

    public get player() {
        return this._player;
    }
    public set player(value) {
        this._player = value;
    }
}
