// eslint formázási és típuseltérési hibákat jelez, biztosan nem futott az utolsó modosításnál (bemutató)
// PDF állományok nevei
// induláskor nincsenek alapértelmetett értékek
// nincs Heroku link
// teszt elhasal
// nem működik

export default class Foglalas {
    #vezetekNev: string;
    #keresztNev: string;
    #lefoglaltIdopont: string;
    #foglalasIdeje: Date;
    #foglalasStringben: string;

    constructor(sor: string) {
        const adatok: string[] = sor.split(" ");
        this.#vezetekNev = adatok[0];
        this.#keresztNev = adatok[1];
        this.#lefoglaltIdopont = adatok[2];
        this.#foglalasStringben = adatok[3];
        this.#foglalasIdeje = new Date(Date.parse(adatok[3]));
    }

    idoponthozTartozoNev(keresettIdopont: string): string | null {
        return keresettIdopont == this.#lefoglaltIdopont ? this.teljesNev : null;
    }

    nevheztartozoIdopont(nev: string): string | null {
        if (nev == this.teljesNev) return this.#lefoglaltIdopont;
        return null;
    }

    public get teljesNev(): string {
        return this.#vezetekNev + " " + this.#keresztNev;
    }

    public get foglalasDate(): Date {
        return this.#foglalasIdeje;
    }

    public get idopont(): string {
        return this.#lefoglaltIdopont;
    }

    public get foglalasString(): string {
        return this.#foglalasStringben;
    }
}
