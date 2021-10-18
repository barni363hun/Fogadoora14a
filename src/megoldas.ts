import { readFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];
    constructor(fajlNev: string) {
        readFileSync(fajlNev)
            .toString()
            .split("\r\n")
            .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }

    public get foglalasokszama():number
    {
        return this.foglalasok.length;
    }

    public tanarFoglalasainakSzama(tanarNev:string) :number
    {
        var osszesen:number = 0;
        this.foglalasok.forEach(item => {
            if (tanarNev == item.teljesNev) {
                osszesen++;   
            }
        });
        return osszesen;
    }

}