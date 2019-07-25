import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Subscription, Observable } from 'rxjs';
import { Player } from 'src/app/Models/player';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PlayerComponent implements OnInit {

  private subscription: Subscription;
  private players: Player[];

  id: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  subscriptionDate: FormControl;
  mail: FormControl;

  createPlayerForm: FormGroup;

  constructor(private playerService: PlayerService, private builder: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    this.subscription = this.playerService.getAllPlayers()
      .subscribe(
        players => this.playerService.players.next(players)
      );

    this.id = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.subscriptionDate = new FormControl('', Validators.required);
    this.mail = new FormControl('', Validators.required);

    this.createPlayerForm = this.builder.group({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      subscriptionDate: this.subscriptionDate,
      mail: this.mail
    });

    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.playerService.getAllPlayers()
      .subscribe(
        players => {
          this.players = players
          console.log("Player list Init")
        },
        err => console.log(err)
      );
  }

  public createPlayer(): Player {
    console.log("launch create player");
    let player = new Player(this.firstName.value, this.lastName.value, this.mail.value, new Date());
    this.playerService.createPlayer(player)
      .subscribe(
        player => {
          console.log("Joueur créé")
          this.ngOnInit()
          this.modalService.dismissAll()
        }
      )
    return player;
  }

  public deletePlayer(id: number) {
    this.playerService.deletePlayer(id)
      .subscribe(
        player => {
          console.log("Le joueur a été supprimé")
          this.ngOnInit()
        },
        err => console.log(err)
      );
  }

  public open(modal) {
    this.modalService.open(modal);
  }

  public close(modal) {
    this.modalService.dismissAll(modal);
  }

  ngDestroy() {
    this.subscription.unsubscribe;
  }
}
