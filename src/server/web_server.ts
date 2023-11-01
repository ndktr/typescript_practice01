import * as http from 'http';
import * as fs from 'fs';

class WebServer {
  static readonly HOSTNAME: string = '127.0.0.1';
  static readonly PORT: number = 3000;
  static readonly HTML_DIR: string = './dist/html';

  private static getHtmlFileName(url: undefined | string): string {
    const defaultHtml: string = '/index.html';
    if (url === undefined) return defaultHtml;
    const htmlFileName: string = url === '/' ? defaultHtml : `${url}.html`;
    return htmlFileName;
  }

  private static returnPathToHtml(htmlFileName: string): string {
    const pathToHtml = `${WebServer.HTML_DIR}${htmlFileName}`;
    return pathToHtml;
  }

  private static isFaviconReq(url: string | undefined): boolean {
    if (url === '/favicon.ico') return true;
    return false;
  }

  private static scribbleLog(text: any): void {
    // eslint-disable-next-line no-console
    console.log(text);
  }

  public static startServer(): void {
    const server: http.Server = http.createServer((req, res): void => {
      const reqUrl: string | undefined = req.url;

      if (reqUrl === undefined) {
        res.writeHead(500);
        res.end('Something Error occured');
      }

      if (WebServer.isFaviconReq(reqUrl)) {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      }

      if (!WebServer.isFaviconReq(reqUrl)) {
        if (reqUrl?.includes('.js')) {
          const pathToJS: string = `./dist${reqUrl}`;
          fs.readFile(pathToJS, (error, content): void => {
            if (!error) {
              res.writeHead(200, { 'Content-Type': 'text/javascript' });
              res.end(content, 'utf-8');
            }
          });
        } else {
          const htmlFileName: string = WebServer.getHtmlFileName(reqUrl);
          const pathToHtml: string = WebServer.returnPathToHtml(htmlFileName);
          fs.readFile(pathToHtml, (error, content): void => {
            if (!error) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content, 'utf-8');
            }
          });
        }
      }
    });

    server.listen(WebServer.PORT, WebServer.HOSTNAME, (): void => {
      WebServer.scribbleLog(
        `Server running at http://${WebServer.HOSTNAME}:${WebServer.PORT}/`);
    });
  }
}

export default WebServer;