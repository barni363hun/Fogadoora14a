import { readFileSync, writeFileSync, writev } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];
    constructor(fajlNev: string) {
        readFileSync(fajlNev)
        .toString()
        .split("\r\n")
        .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }
    IdopontKiirasaFajlba(idopont:string): any {
        try {
            const fajlNev=`${idopont.replace(":","")}.txt`;
            var nevek:string[]=this.foglalasok.sort().reduce((elozo, jelenlegi)=>{
                const nev:(string|null)=jelenlegi.IdoponthozTartozoNev(idopont)
                if(nev!=null)
                    elozo.push(nev);
                return elozo;
            }, Array());
            
           writeFileSync(fajlNev,nevek.sort().join("\r\n"));
           return readFileSync(fajlNev);
            
        } catch (error) {
            return "A fájlbaírás sikertelen volt";
        }
    }
}