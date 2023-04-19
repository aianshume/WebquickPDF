// function to save result as PDF
import type { htmlObject } from "components/Editor";
import {html2canvasAsString} from "./scripts/html2canvas"
import {jsPdfAsString} from "./scripts/jspdf"

function addScript(window : Window, url: string) {
  var script = window.document.createElement('script');
  script.type = 'application/javascript';
  script.src = url;
  window.document.head.appendChild(script);
}

export function saveAsPDF(htmlStrings: htmlObject[]) {
  let pdfBufferStrings = htmlStrings.map((htmlPage) => {
    let pdfRenderingWindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=100,left=150"
    );
    pdfRenderingWindow?.document.write(`<!DOCTYPE html>
    <html lang="hi">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script type="text/javascript">${html2canvasAsString}</script>
        <script type "text/javascript">${jsPdfAsString}</script>
        <style>${htmlPage.css}</style>
    </head>
    ${htmlPage.htmlBody}
    </script>
    </html>`); 
  });
}
