import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./megoldas";
import { readFileSync } from "fs";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // környezeti változók definiálása
        const env = {
            title:"Fogadóóra"
        }
        //html head, meta tagek, body megnyitása
        res.write(readFileSync("src/html_components/start.html").toString());
        res.write((env.title).toString());
        res.write(readFileSync("src/html_components/start2.html").toString());
        // feladat megoldása
        // 1. feladat + inicializálás
        const megoldas:Megoldas = new Megoldas("src/fogado.txt")
        
        //2. feladat
        res.write("2. feladat:")
        res.write("</br>")
        res.write(megoldas.foglalasokszama.toString()+" foglalás adatait tartalmazza a fájl.");

        //4. feladat:

        const bekertIdoPont:string= "17:40"; //TODO: Felhasználótól bekérés
        res.write(megoldas.IdopontKiirasaFajlba(bekertIdoPont))

        // <---- Fejezd be a kódolást

        // body és html tagek bezárása 
        res.write(readFileSync("src/html_components/start2.html").toString());
        res.end();
    }
}
