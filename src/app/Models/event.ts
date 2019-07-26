import { Contest } from './contest';

export class Event {
    private _id: number;
    private _contest: Contest;
    
    
    constructor(
        public label: string,
        public eventDate: Date,
        public openDate: Date,
        public closeDate: Date,
        public coeff: number
    ) { }


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get contest(): Contest {
        return this._contest;
    }
    public set contest(value: Contest) {
        this._contest = value;
    }
}