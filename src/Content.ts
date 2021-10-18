import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./megoldas";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;


        // Weboldal inicializálása + head rész:
        const megoldas:Megoldas = new Megoldas("src/fogado.txt")




        //4. feladat:

        const bekertIdoPont:string= params.get("idoPontinput") //TODO: Felhasználótól bekérés
        res.write(megoldas.IdopontKiirasaFajlba(bekertIdoPont))
        res.write(' <input id="idoPontinput" type="text" name="idoPontinput" value="Időpont">'
        
        
        
        
        )

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
