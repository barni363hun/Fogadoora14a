import { readFileSync, writeFileSync, mkdir, existsSync, mkdirSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];

    constructor(fajlNev: string) {
        readFileSync(fajlNev)
            .toString()
            .split("\r\n")
            .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }

    private miliszekundumSzovegge(ms: number): string {
        return `${~~(ms / (60 * 60 * 1000))}:${((ms % (60 * 60 * 1000)) / 60 / 1000).toString().padEnd(2, "0")}`;
    }

    private lefoglaltIdopontokKeresese(nev: string) {
        return this.foglalasok
            .reduce((p, c) => {
                const idopontstring = c.nevheztartozoIdopont(nev);
                if (idopontstring != null) p.push(60 * 1000 * (60 * parseInt(idopontstring[0] + idopontstring[1]) + parseInt(idopontstring[3] + idopontstring[4])));
                return p;
            }, Array())
            .sort();
    }

    idopontKiirasaFajlba(idopont: string): string {
        try {
            if (idopont.length != 5 || !idopont.includes(":")) throw "Nem jó a string";
            if (!existsSync("fajlok/")) mkdirSync("fajlok");
            const fajlNev = `fajlok/${idopont.replace(":", "")}.txt`;
            const nevek: string[] = this.foglalasok.sort().reduce((elozo, jelenlegi) => {
                const nev: string | null = jelenlegi.idoponthozTartozoNev(idopont);
                if (nev != null) elozo.push(nev);
                return elozo;
            }, Array());
            writeFileSync(fajlNev, nevek.sort().join("\r\n"));

            return readFileSync(fajlNev).toString().split("\r\n").join("<br>") + "<br>";
        } catch (error) {
            return "A fájlbaírás sikertelen volt<br>";
        }
    }

    public get foglalasokSzama(): number {
        return this.foglalasok.length;
    }

    public tanarFoglalasainakSzama(tanarNev: string): number {
        let osszesen = 0;
        this.foglalasok.forEach(item => {
            if (tanarNev == item.teljesNev) {
                osszesen++;
            }
        });
        return osszesen;
    }

    public legkorabbanLefoglaltFoglalas(): Foglalas | undefined {
        const datumok: string[] = this.foglalasok.map(i => i.foglalasString);
        let legkisebbDatum: string = datumok[0];
        datumok.forEach(date => {
            if (legkisebbDatum > date) {
                legkisebbDatum = date;
            }
        });
        return this.foglalasok.find(f => f.foglalasString == legkisebbDatum);
    }

    public szabadIdopontok(nev: string): string {
        const lefoglaltIdopontok: number[] = this.lefoglaltIdopontokKeresese(nev);
        const lehetsegesIdopontok: number[] = [];
        for (let i = 16; i < 18; i++) {
            for (let j = 0; j <= 50; j += 10) {
                lehetsegesIdopontok.push(60 * 1000 * (60 * i + j));
            }
        }
        const szabadIdok: number[] = lehetsegesIdopontok.filter(f => !lefoglaltIdopontok.includes(f)).sort();
        return szabadIdok
            .reduce((p, c) => {
                p.push(this.miliszekundumSzovegge(c));
                return p;
            }, Array())
            .join("<br>");
    }

    public tavozasIdopont(nev: string): string {
        return this.miliszekundumSzovegge(this.lefoglaltIdopontokKeresese(nev).slice(-1)[0] + 1000 * 60 * 10);
    }
}
