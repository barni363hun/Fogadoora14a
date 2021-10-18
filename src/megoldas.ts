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
    IdopontKiirasaFajlba(idopont:string): any {
        try {
            const fajlNev=`fajlok/${idopont.replace(":","")}.txt`;

            var nevek:string[]=this.foglalasok.sort().reduce((elozo, jelenlegi)=>{
                const nev:(string|null)=jelenlegi.IdoponthozTartozoNev(idopont)
                if(nev!=null)
                    elozo.push(nev);
                return elozo;
            }, Array());            
           writeFileSync(fajlNev,nevek.sort().join("\r\n"));

           return readFileSync(fajlNev).toString().split("\r\n").reduce((elozo, jelenlegi)=>{elozo+=jelenlegi+"<br>"; return elozo},"");
            
        } catch (error) {
            return "A fájlbaírás sikertelen volt";
        }
    }
    public get foglalasokszama():number
    {
        return this.foglalasok.length;
    }

}