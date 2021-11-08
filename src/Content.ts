import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./megoldas";
import { readFileSync } from "fs";
import Foglalas from "./foglalas";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // kérés paramétereinek lekérdezése
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;
        // környezeti változók definiálása
        const env = {
            title: "Fogadóóra"
        };
        //html meta tagek, más tagek megnyitása
        res.write(readFileSync("src/html_components/start.html").toString());
        res.write((env.title).toString());
        res.write(readFileSync("src/html_components/start2.html").toString());
        // feladat megoldása

        // 1. feladat + inicializálás
        // Weboldal inicializálása + head rész:
        const megoldas: Megoldas = new Megoldas("src/fogado.txt");

        //2. feladat
        res.write("2. feladat:");
        res.write("<br>");
        res.write(megoldas.foglalasokSzama.toString() + " foglalás adatait tartalmazza a fájl.");

        //3. feladat
        res.write("<br>");
        res.write("<br>");
        res.write("3. feladat:");
        res.write("<br>");
        res.write("Adjon meg egy nevet: ");
        let tanarNev: string = params.get("tanarNev") as string;
        res.write('<input type="text" name="tanarNev" onChange="this.form.submit();" >');
        res.write("<br>");
        res.write(megoldas.tanarFoglalasainakSzama(tanarNev).toString());

        //4. feladat:
        res.write("<br>");
        res.write("<br>");
        res.write("4. feladat:");
        res.write("<br>");
        const bekertIdoPont: string = params.get("idoPontinput") as string;
        res.write('<input id="idoPontinput" type="text" name="idoPontinput" onChange="this.form.submit();"><br>');
        res.write("<br>");
        res.write(megoldas.idopontKiirasaFajlba(bekertIdoPont));

        //5. feladat:
        res.write("<br>");
        res.write("<br>");
        res.write("5. feladat:");
        res.write("<br>");
        const legkorabban: (Foglalas | undefined) = megoldas.legkorabbanLefoglaltFoglalas();
        res.write("Tanár neve: " + legkorabban?.teljesNev);
        res.write("<br>");
        res.write("Foglalt időpont: " + legkorabban?.idopont);
        res.write("<br>");
        res.write("Foglalás ideje: " + legkorabban?.foglalasString);

        //6.feladat:
        res.write("<br>");
        res.write("<br>");
        res.write("6. feladat:");
        res.write("<br>");
        res.write(megoldas.szabadIdopontok("Barna Eszter") + "<br>");
        res.write(`Barna Eszter legkorábban távozhat: ${megoldas.tavozasIdopont("Barna Eszter")}`);
        res.write("<br><br><br><br><br><br><br>");

        // fájlok kiírása 
        res.write('forrás fájl:<br>');
        res.write(readFileSync('src/fogado.txt'));

        // html tagek bezárása 
        res.write(readFileSync("src/html_components/start2.html").toString());
        res.end();
    }
}
