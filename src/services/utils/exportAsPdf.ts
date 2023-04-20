// function to save result as PDF
import type { htmlObject } from "components/Editor";

export function saveAsPDF(allCss: string, allHtml: string) {
  console.log(allCss, allHtml)
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
        <script src="https://codenanshu.in/html2canvas.min.js"></script>
        <script src="https://codenanshu.in/jspdf.umd.min.js"></script>
        <title>Document</title>
        <style>${allCss}</style>
    </head>
    ${allHtml}
    <script>var jsPDF = jspdf.jsPDF;var doc = new jsPDF({orientation: 'p',unit: 'pt',format: [2232, 3672],putOnlyUsedFonts:true}); doc.html(document.body, {callback: function (doc) {window.open(doc.output('bloburl'), '_blank');
    window.close();},margin:0}); </script>
    </html>`); 
}
