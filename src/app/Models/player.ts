export class Player {
    private _id: number;
    
    constructor(
        public firstName: string,
        public lastName: string,
        public mail: string,
        public subscriptionDate: Date
    ) { }


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}