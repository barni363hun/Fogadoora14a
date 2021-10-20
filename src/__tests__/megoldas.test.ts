import Megoldas from "../megoldas";
import Foglalas from "../foglalas"
import { readFileSync } from "fs";

const megoldas1: Megoldas = new Megoldas("src/__tests__/tesztFajl.txt")
test("konstruktor és jellemzők tesztelése fájlból", async () => {
    expect(megoldas1).toBeInstanceOf(Megoldas);
    expect(megoldas1.foglalasok).toBeInstanceOf(Array)
    expect(megoldas1.foglalasok[2]).toBeInstanceOf(Foglalas)
    expect(megoldas1.foglalasok.length).toBe(20);
    expect(megoldas1.foglalasokszama).toBe(megoldas1.foglalasok.length)
    expect(() => new Megoldas("nemLetezoFajl.txt")).toThrow()

});
test("idopontKiirasaFajlba() tesztelése", async () => {
    expect(megoldas1.IdopontKiirasaFajlba("16:30")).toBe("Barna Eszter<br>Csorba Ede<br>Magos Magdolna<br>Neumann Nikolett<br>");
    expect(megoldas1.IdopontKiirasaFajlba("adasdasd")).toBe("A fájlbaírás sikertelen volt<br>")
    expect(readFileSync("fajlok/1630.txt").toString()).toBe("Barna Eszter\r\nCsorba Ede\r\nMagos Magdolna\r\nNeumann Nikolett");
});
test("szabadIdopontok() tesztelése", async () => {
    expect(megoldas1.szabadIdopontok("Csorba Ede")).toBe("16:00<br>16:10<br>16:20<br>16:50<br>17:00<br>17:10<br>17:20<br>17:40<br>17:50");
    expect(megoldas1.szabadIdopontok("Magos Magdolna")).toBe("16:00<br>16:10<br>16:20<br>16:40<br>16:50<br>17:00<br>17:10<br>17:20<br>17:30<br>17:40<br>17:50");
})
test("tanarFoglalasainakSzama() tesztelése", async () => {
    expect(megoldas1.tanarFoglalasainakSzama("Csorba Ede")).toBe(3);
    expect(megoldas1.tanarFoglalasainakSzama("Magos Magdolna")).toBe(1);
})
test("tanarFoglalasainakSzama() tesztelése", async () => {
    expect(megoldas1.tavozasIdopont("Csorba Ede")).toBe("17:40");
    expect(megoldas1.tavozasIdopont("Magos Magdolna")).toBe("16:40");
})
test("legkorabbanLefoglaltFoglalas() tesztelése", async () => {
    const legkorabbifoglalas = megoldas1.legkorabbanLefoglaltFoglalas()
    expect(legkorabbifoglalas).toBeInstanceOf(Foglalas);
    expect(legkorabbifoglalas?.teljesNev).toBe("Csorba Ede")
    expect(legkorabbifoglalas?.idopont).toBe("16:30")
    expect(legkorabbifoglalas?.foglalasString).toBe("2017.10.28-18:48")


})