import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Player } from 'src/app/Models/player';
import { identifierModuleUrl } from '@angular/compiler';


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
        return this.http.get<Player[]>(`${this.baseURL}/allPlayers`, this.httpOptions);
    }

    public createPlayer(player: Player): Observable<Player> {
        let jsonPlayer = {
            "firstName": player.firstName,
            "lastName": player.lastName,
            "subscriptionDate": new Date(),
            "mail": player.mail
        }

        return this.http.post<Player>(`${this.baseURL}/create`, jsonPlayer, this.httpOptions);
    }

    public deletePlayer(id: number): Observable<Player> {
        return this.http.delete<Player>(`${this.baseURL}/delete/${id}`, this.httpOptions);
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
