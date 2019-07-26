export class Contest {
    
    private _id: number;
    private _label: string;
    constructor(
    
    ) { }

    public get id(): number {
    return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }
}