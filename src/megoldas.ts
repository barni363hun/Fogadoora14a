import { readFileSync, writeFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];
    lefoglaltIdopontok:(string|null)[]=[];
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
     public szabadIdopontok():string{
        this.foglalasok.forEach(f=>this.lefoglaltIdopontok.push(f.NevheztartozoIdopont(f.teljesNev)))
        this.lefoglaltIdopontok= this.lefoglaltIdopontok.reduce((p,c)=>{
           if(c!=null)
                p.push(c)
           return p
        },Array())


        return "";
     }
}