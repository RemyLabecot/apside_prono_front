import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContestService } from 'src/app/services/contest/contest.service';
import { Contest } from 'src/app/Models/contest';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
  providers: [NgbModalConfig, NgbModal, ContestService, EventService]
})
export class ContestComponent implements OnInit {

  private subscription: Subscription;
  private contests: Contest[];
  private contest: Contest;
  private contestUpdate: Contest;

  private events: Event[];

  label: FormControl;
  createContestForm: FormGroup;

  constructor(private eventService: EventService, private contestService: ContestService, private builder: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {

    this.subscription = this.contestService.getAllContests()
      .subscribe(
        contests => this.contestService.contests.next(contests),
        err => console.log("Erreur : " + err.error.message + "liste de concours non trouvé")
      );

    this.label = new FormControl('', Validators.required);

    this.createContestForm = this.builder.group({
      label: this.label,
    });

    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.contestService.getAllContests()
      .subscribe(
        contests => this.contests = contests,
        err => console.log("Erreur : " + err + "Liste de concours non trouvé")
      );

  }

  public getContestById(id: number) {
    console.log("get contest");
    console.log(id);
    this.contestService.getContestById(id)
      .subscribe(
        contest => {
          this.contest = contest
          this.createContestForm.patchValue(
            {
              "label": contest.label
            }
          )
        }
      );
  }

  public createContest(): Contest {

    let contest = new Contest();
    contest.label = this.label.value;

    console.log(contest);
    this.contestService.createContest(contest)
      .subscribe(
        contest => {
          console.log("Evénement créé")
          this.ngOnInit()
          this.modalService.dismissAll()
        },
        err => console.log(err.error.message)
      )
    return contest;
  }

  public updateContest(): Contest {

    let contest2 = new Contest();
    contest2.id = this.contest.id;
    contest2.label = this.label.value;
    console.log(contest2);

    this.contestService.updateContest(contest2)
      .subscribe(
        contest => {
          console.log("Concours modifié")
          this.ngOnInit()
          this.modalService.dismissAll()
        },
        err => console.log(err.error.message)
      );
    return contest2;
  }

  public deleteContest(id: number) {

    this.contestService.deleteContest(id)
      .subscribe(
        contest => {
          console.log("Le joueur a été supprimé")
          this.ngOnInit()
        },
        err => console.log(err.error.message)
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
