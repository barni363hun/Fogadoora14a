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
            
            var nevek:string=this.foglalasok.reduce((elozo, jelenlegi)=>{
                const nev:(string|null)=jelenlegi.IdoponthozTartozoNev(idopont)
                if(nev!=null)
                    elozo+=nev+"\r\n"
                return elozo;
            }, "");
            
           writeFileSync("",nevek)
            
        } catch (error) {
            return "A fájlbaírás sikertelen volt"
        }
    }

    public get foglalasokszama():number
    {
        return this.foglalasok.length;
    }

}