import { readFileSync, writeFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];
    constructor(fajlNev: string) {
        readFileSync(fajlNev)
        .toString()
        .split("\r\n")
        .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }
    IdopontKiirasaFajlba(idoPont:string): any {
        try {
            var nevek:string="";
            writeFileSync(`${idoPont.replace(":","")}.txt`,nevek)
            
        } catch (error) {
            return "A fájlbaírás sikertelen volt"
        }
    }
}