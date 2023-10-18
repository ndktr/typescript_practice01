import * as http from 'http';
import * as fs from 'fs';
const hostname = '127.0.0.1';
const port = 3000;
const returnAppropriateHtml = (url) => {
    if (url === undefined)
        return '/index.html';
    const appropriateHtml = url === '/' ? '/index.html' : `${url}.html`;
    return appropriateHtml;
};
const returnPathToHtml = (htmlFileName) => {
    const pathToHtml = `./dist/html${htmlFileName}`;
    return pathToHtml;
};
const isFaviconReq = (url) => {
    if (url === '/favicon.ico')
        return true;
    return false;
};
const scribbleLog = (text) => {
    // eslint-disable-next-line no-console
    console.log(text);
};
const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    if (reqUrl == undefined) {
        res.writeHead(500);
        res.end('Something Error occured');
    }
    if (isFaviconReq(reqUrl)) {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    }
    if (!isFaviconReq(reqUrl)) {
        if (reqUrl?.includes('.js')) {
            const pathToJS = `./dist${reqUrl}`;
            scribbleLog(reqUrl);
            fs.readFile(pathToJS, (error, content) => {
                scribbleLog(error);
                if (!error) {
                    res.writeHead(200, { 'Content-Type': 'text/javascript' });
                    res.end(content, 'utf-8');
                }
            });
        }
        else {
            const htmlFileName = returnAppropriateHtml(reqUrl);
            const pathToHtml = returnPathToHtml(htmlFileName);
            fs.readFile(pathToHtml, (error, content) => {
                scribbleLog(error);
                if (!error) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                }
            });
        }
    }
});
server.listen(port, hostname, () => {
    scribbleLog(`Server running at http://${hostname}:${port}/`);
});
