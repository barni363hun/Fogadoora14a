import Megoldas from "../megoldas";
import Foglalas from "../foglalas"
import { readFileSync } from "fs";

const megoldas1: Megoldas = new Megoldas("src/__tests__/tesztFajl.txt")
test("konstruktor tesztelése fájlból", () => {
    expect(megoldas1).toBeInstanceOf(Megoldas);
    expect(megoldas1.foglalasok).toBeInstanceOf(Array)
    expect(megoldas1.foglalasok[2]).toBeInstanceOf(Foglalas)
    expect(megoldas1.foglalasok.length).toBe(20);
    expect(() => new Megoldas("nemLetezoFajl.txt")).toThrow()


})
