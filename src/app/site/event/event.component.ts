import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Subscription, Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/Models/event';
import { Contest } from 'src/app/Models/contest';
import { ContestService } from 'src/app/services/contest/contest.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [NgbModalConfig, NgbModal, ContestService]
})
export class EventComponent implements OnInit {

  private subscription: Subscription;
  private subscriptionContest: Subscription;

  private events: Event[];
  private contests: Contest[];
  private contestS: Contest;
  private eventUpdate: Event;

  private currentContest: Contest;

  label: FormControl;
  eventDate: FormControl;
  openDate: FormControl;
  closeDate: FormControl;
  coeff: FormControl;
  contest: FormControl;

  createEventForm: FormGroup;
  constructor(private contestService: ContestService, private eventService: EventService, private builder: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    this.subscription = this.eventService.getAllEvents()
      .subscribe(
        events => this.eventService.events.next(events),
        err => console.log("Erreur : " + err.error.message + "liste d'événements non trouvé")
      );

    this.subscriptionContest = this.contestService.getAllContests()
      .subscribe(
        contests => this.contestService.contests.next(contests),
        err => console.log("Erreur : " + err.error.message + "liste de concours non trouvé")
      )

    this.label = new FormControl('', Validators.required);
    this.eventDate = new FormControl('', Validators.required);
    this.openDate = new FormControl('', Validators.required);
    this.closeDate = new FormControl('', Validators.required);
    this.coeff = new FormControl('', Validators.required);
    this.contest = new FormControl('', Validators.required);

    this.createEventForm = this.builder.group({
      label: this.label,
      eventDate: this.eventDate,
      openDate: this.openDate,
      closeDate: this.closeDate,
      coeff: this.coeff,
      contest: this.contest
    });

    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.eventService.getAllEvents()
      .subscribe(
        events => {
          this.events = events
          console.log("Event list Init")
        },
        err => console.log("Erreur : " + err + "Liste d'événements non trouvé")
      );

    this.contestService.getAllContests()
      .subscribe(
        contests => this.contests = contests,
        err => console.log("Erreur : " + err + "Liste de concours non trouvé")
      );
  }

  public getEventById(id: number) {
    this.eventService.getEventById(id)
      .subscribe(
        event => {this.eventUpdate = event
          this.createEventForm.patchValue({
            "label": event.label,
            "openDate": event.openDate,
            "eventDate": event.eventDate,
            "closeDate": event.closeDate,
            "coeff": event.coeff
          })
          console.log(this.eventUpdate.contest.id)
        },
        err => console.log("Evenement inconnu")
      );
  }


  public getContestById(id: number) {
  console.log("get contest");
  console.log(id);
  this.contestService.getContestById(id)
    .subscribe(
      contest =>
        this.contestS = contest
    );
}

  public createEvent(): Event {
  console.log(this.contestS.id);
  console.log(this.contestS.label);

  let event = new Event(this.label.value, this.eventDate.value, this.openDate.value, this.closeDate.value, this.coeff.value);
  let contest = new Contest();
  contest.id = this.contestS.id;
  contest.label = this.contestS.label;
  event.contest = contest;

  console.log(event);
  this.eventService.createEvent(event)
    .subscribe(
      event => {
        console.log("Evénement créé")
        this.ngOnInit()
        this.modalService.dismissAll()
      },
      err => console.log(err.error.message)
    )
  return event;
}

  public updateEvent(): Event {

  let event2 = new Event(this.label.value, this.eventDate.value, this.openDate.value, this.closeDate.value, this.coeff.value);
  let contest2 = new Contest();
  contest2.id = this.contestS.id;
  contest2.label = this.contestS.label;
  event2.contest = contest2;
  event2.id = this.eventUpdate.id;
  console.log(event2);

  this.eventService.updateEvent(event2)
    .subscribe(
      event => {
        console.log("Joueur modifié")
        this.ngOnInit()
        this.modalService.dismissAll()
      },
      err => console.log(err.error.message)
    );
  return event2;
}

  public deleteEvent(id: number) {
  this.eventService.deleteEvent(id)
    .subscribe(
      event => {
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
  this.subscriptionContest.unsubscribe;
}

}
