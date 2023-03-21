export class Record {
    id?: number;
    title: string;
    amount: string;
    date: string;
    constructor(title: string, amount: string, date: string, id?: number,) {
        this.title = title;
        this.amount = amount;
        this.date = date;
        this.id = id;
    }
}