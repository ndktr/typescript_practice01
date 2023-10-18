import * as http from 'http';
import * as fs from 'fs';

const hostname: string = '127.0.0.1';
const port: number = 3000;

const returnAppropriateHtml = (url: undefined | string): string => {
  if (url === undefined) return '/index.html';
  const appropriateHtml: string = url === '/' ? '/index.html' : `${url}.html`;
  return appropriateHtml;
};

const returnPathToHtml = (htmlFileName: string): string => {
  const pathToHtml = `./dist/html${htmlFileName}`;
  return pathToHtml;
};

const isFaviconReq = (url: string | undefined): boolean => {
  if (url === '/favicon.ico') return true;
  return false;
};

const scribbleLog = (text: any): void => {
  // eslint-disable-next-line no-console
  console.log(text);
};

const server: http.Server = http.createServer((req, res): void => {
  const reqUrl: string | undefined = req.url;

  if (reqUrl === undefined) {
    res.writeHead(500);
    res.end('Something Error occured');
  }

  if (isFaviconReq(reqUrl)) {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  }

  if (!isFaviconReq(reqUrl)) {
    if (reqUrl?.includes('.js')) {
      const pathToJS: string = `./dist${reqUrl}`;
      fs.readFile(pathToJS, (error, content): void => {
        if (!error) {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          res.end(content, 'utf-8');
        }
      });
    } else {
      const htmlFileName: string = returnAppropriateHtml(reqUrl);
      const pathToHtml: string = returnPathToHtml(htmlFileName);
      fs.readFile(pathToHtml, (error, content): void => {
        if (!error) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
    }
  }
});

server.listen(port, hostname, (): void => {
  scribbleLog(`Server running at http://${hostname}:${port}/`);
});
