import * as http from 'http';
import * as fs from 'fs';
class WebServer {
    static HOSTNAME = '127.0.0.1';
    static PORT = 3000;
    static HTML_DIR = './dist/html';
    static getHtmlFileName(url) {
        const defaultHtml = '/index.html';
        if (url === undefined)
            return defaultHtml;
        const htmlFileName = url === '/' ? defaultHtml : `${url}.html`;
        return htmlFileName;
    }
    static returnPathToHtml(htmlFileName) {
        const pathToHtml = `${WebServer.HTML_DIR}${htmlFileName}`;
        return pathToHtml;
    }
    static isFaviconReq(url) {
        if (url === '/favicon.ico')
            return true;
        return false;
    }
    static scribbleLog(text) {
        // eslint-disable-next-line no-console
        console.log(text);
    }
    static startServer() {
        const server = http.createServer((req, res) => {
            const reqUrl = req.url;
            if (reqUrl === undefined) {
                res.writeHead(500);
                res.end('Something Error occured');
            }
            if (WebServer.isFaviconReq(reqUrl)) {
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            }
            if (!WebServer.isFaviconReq(reqUrl)) {
                if (reqUrl?.includes('.js')) {
                    const pathToJS = `./dist${reqUrl}`;
                    fs.readFile(pathToJS, (error, content) => {
                        if (!error) {
                            res.writeHead(200, { 'Content-Type': 'text/javascript' });
                            res.end(content, 'utf-8');
                        }
                    });
                }
                else {
                    const htmlFileName = WebServer.getHtmlFileName(reqUrl);
                    const pathToHtml = WebServer.returnPathToHtml(htmlFileName);
                    fs.readFile(pathToHtml, (error, content) => {
                        if (!error) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                }
            }
        });
        server.listen(WebServer.PORT, WebServer.HOSTNAME, () => {
            WebServer.scribbleLog(`Server running at http://${WebServer.HOSTNAME}:${WebServer.PORT}/`);
        });
    }
}
export default WebServer;
