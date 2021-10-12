import { readFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];
    constructor(fajlNev: string) {
        readFileSync(fajlNev)
            .toString()
            .split("\n\r")
            .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }
}
