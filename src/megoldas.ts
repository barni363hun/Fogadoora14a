import { accessSync, readFileSync, writeFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Megoldas {
    foglalasok: Foglalas[] = [];

    constructor(fajlNev: string) {
        readFileSync(fajlNev)
            .toString()
            .split("\r\n")
            .forEach(f => this.foglalasok.push(new Foglalas(f)));
    }
    private miliszekundumSzovegge(ms: number) {
        return `${~~(ms / (60 * 60 * 1000))}:${((ms % (60 * 60 * 1000)) / 60 / 1000).toString().padEnd(2, "0")}`
    }
    private lefoglaltIdopontokKeresese(nev: string) {
        return this.foglalasok.reduce((p, c) => {
            const temp = c.NevheztartozoIdopont(nev);
            if (temp != null)
                p.push(60 * 1000 * (60 * parseInt(temp[0] + temp[1]) + (parseInt(temp[3] + temp[4]))));
            return p;
        }, Array()).sort();
    }

    IdopontKiirasaFajlba(idopont: string): any {
        try {
            const fajlNev = `fajlok/${idopont.replace(":", "")}.txt`;
            var nevek: string[] = this.foglalasok.sort().reduce((elozo, jelenlegi) => {
                const nev: (string | null) = jelenlegi.IdoponthozTartozoNev(idopont)
                if (nev != null)
                    elozo.push(nev);
                return elozo;
            }, Array());
            writeFileSync(fajlNev, nevek.sort().join("\r\n"));

            return readFileSync(fajlNev).toString().split("\r\n").reduce((elozo, jelenlegi) => { elozo += jelenlegi + "<br>"; return elozo }, "");

        } catch (error) {
            return "A fájlbaírás sikertelen volt<br>";
        }
    }
    public get foglalasokszama(): number {
        return this.foglalasok.length;
    }

    public tanarFoglalasainakSzama(tanarNev: string): number {
        var osszesen: number = 0;
        this.foglalasok.forEach(item => {
            if (tanarNev == item.teljesNev) {
                osszesen++;
            }
        });
        return osszesen;
    }

    public szabadIdopontok(nev: string): string {

        var lefoglaltIdopontok: number[] = this.lefoglaltIdopontokKeresese(nev);

        var LehetsegesIdopontok: number[] = []
        for (let i = 16; i < 18; i++) {
            for (let j = 0; j <= 50; j += 10) {
                LehetsegesIdopontok.push(60 * 1000 * (60 * i + j))
            }
        }

        var szabadIdok: number[] = LehetsegesIdopontok.filter(f => !lefoglaltIdopontok.includes(f)).sort()
        return szabadIdok.reduce((p, c) => {
            p.push(this.miliszekundumSzovegge(c))
            return p;
        }, Array()).join("<br>");
    }
    public tavozasIdopont(nev: string): string {
        return this.miliszekundumSzovegge(this.lefoglaltIdopontokKeresese(nev).slice(-1)[0] + 1000 * 60 * 10)
    }


}
