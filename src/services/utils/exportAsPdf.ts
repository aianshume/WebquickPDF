// @ts-ignore
import html2pdf from "html2pdf"

export function saveAsPDF(allCss: string, allHtml: string) {
  console.log(allCss, allHtml);
  let pdfRenderingWindow = window.open(
    "",
    "PRINT",
    "height=650,width=900,top=100,left=150"
  );

  pdfRenderingWindow?.document.write(`<!DOCTYPE html>
    <html lang="Hi">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <title>Document</title>
        <style>${allCss}</style>
    </head>
    ${allHtml}
    </html>`);
    
}
