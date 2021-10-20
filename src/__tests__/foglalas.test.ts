import Foglalas from "../foglalas"
import { readFileSync } from "fs";

const foglalas: Foglalas = new Foglalas("Fodor Zsuzsanna 16:50 2017.10.28-18:51")
test("konstruktor és jellemzők tesztelése fájlból", async () => {
    expect(foglalas).toBeInstanceOf(Foglalas);
});
test("IdoponthozTartozoNev() tesztelése", async () => {
    expect(foglalas.IdoponthozTartozoNev("16:50")).toBe("Fodor Zsuzsanna");
    expect(foglalas.IdoponthozTartozoNev("asdasd")).toBe(null);
});
test("NevheztartozoIdopont() tesztelése", async () => {
    expect(foglalas.NevheztartozoIdopont("Fodor Zsuzsanna")).toBe("16:50");
    expect(foglalas.NevheztartozoIdopont("asdasd")).toBe(null);
})
test("teljesNev() tesztelése", async () => {
    expect(foglalas.teljesNev).toBe("Fodor Zsuzsanna");
})
test("foglalasDate() tesztelése", async () => {
    expect(foglalas.foglalasDate).toStrictEqual(new Date(Date.parse("2017.10.28-18:51")));
})
test("idopont() tesztelése", async () => {
    expect(foglalas.idopont).toBe("16:50");
})
test("foglalasString() tesztelése", async () => {
    expect(foglalas.foglalasString).toBe("2017.10.28-18:51");
})