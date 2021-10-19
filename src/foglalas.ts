export default class Foglalas {
    #vezeteknev: string;
    #keresztNev: string;
    #lefoglaltIdopont: string;
    #foglalasIdeje: Date;

    
    constructor(sor: string) {
        let adatok: string[] = sor.split(" ");
        this.#vezeteknev = adatok[0];
        this.#keresztNev = adatok[1];
        this.#lefoglaltIdopont = adatok[2];
        this.#foglalasIdeje = new Date(Date.parse(adatok[3])+60*60*1000 );
    }
  
    IdoponthozTartozoNev(keresettIdopont:string):(string|null){
        return keresettIdopont==this.#lefoglaltIdopont?(this.#vezeteknev+" "+this.#keresztNev):null
    }
  
    public get teljesNev(): string {
        return this.#vezeteknev + " " + this.#keresztNev;
    }

    public get foglalasDate():Date{
        return this.#foglalasIdeje;
    }
}