import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var pdfButton3 = document.getElementById("pdfButton3");
var frequencyQ = document.getElementById("frequencyQ");
var HmSS = document.getElementById("HmSS");
var Hshutoff = document.getElementById("Hshutoff");
var frequencyMotorPower = document.getElementById("frequencyMotorPower");
var frequencyPumpSelect = document.getElementById("pump-select-frequency");
var frequencyPumpSelect2 = document.getElementById("pump-select-frequency2");
var frequencyResult = document.getElementById("frequencyResult");

async function createPdf() {
    const existingFontBytes = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const boldFontBytes = await fetch("Roboto-Bold.ttf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);
    const logoBytes = await fetch("logo.png").then(res => res.arrayBuffer());
    const footerBytes = await fetch("footer.png").then(res => res.arrayBuffer());
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const footerImage = await pdfDoc.embedPng(footerBytes);

    const title = "Genleşme Tankı Hacim Hesabı (Frekans Konvertörlü Hidroforlar için)";
    const titleWidth = customFont.widthOfTextAtSize(title, 18);
    const titleX = (width - titleWidth) / 2; // Ortalamak için X koordinatı
    page.drawImage(logoImage, {
        x: 50,
        y: height-250,
        width: 475,
        height: 200,
    });
    page.drawText(title, {
        x: titleX,
        y: height - 280,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
        
    });
    if(frequencyQ.value == '') {frequencyQ.value = 0;}
    page.drawText(`Debi: ${frequencyQ.value} m3/h`,{
        x: 50,
        y: height - 315,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(HmSS.value == '') {HmSS.value = 0;}
    page.drawText(`Alt Basınç: ${HmSS.value} bar`,{
        x: 50,
        y: height - 340,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(Hshutoff.value == ''){
        Hshutoff.value = 0;
    }
    page.drawText(`Üst Basınç: ${Hshutoff.value} bar`,{
        x: 50,
        y: height - 365,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(frequencyMotorPower.value == '') {frequencyMotorPower.value = 0;}
    page.drawText(`Motor Gücü: ${frequencyMotorPower.value} kW`,{
        x: 50,
        y: height - 390,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Ana Pompa Sayısı: ${frequencyPumpSelect.value} adet`,{
        x: 50,
        y: height - 415,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Yedek Pompa Sayısı: ${frequencyPumpSelect2.value} adet`,{
        x: 50,
        y: height - 440,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(frequencyResult.value == '') {frequencyResult.value = 0;}
    page.drawText(`Sonuç: ${frequencyResult.value} L`,{
        x: 50,
        y: height - 465,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawImage(footerImage, {
        x: 50,
        y: 65,
        width: 475,
        height: 20,
    });
    page.drawText(`
        Atatürk Mahallesi, Mustafa Kemal Cad. Işık Plaza, No: 8/2, 34758 Ataşehir/İstanbul Türkiye
                            
`,{
        x: width/2-180,
        y: 40,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
        lineHeight: 1.2,
    });
    page.drawText(`
        +90 216 580 9350	info@isikteknoloji.com
                            
`,{
        x: width/2-105,
        y: 20,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
        lineHeight: 1.2,
    });
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Yeni pencere oluştur
    const previewWindow = window.open("", "_blank");
    if (!previewWindow) {
        alert("Açılır pencere engellendi. Lütfen tarayıcıdan izin verin.");
        return;
    }

    // Yeni pencereye HTML yaz
    previewWindow.document.write(`
        <html>
        <head>
            <title>PDF Önizleme</title>
            <style>
                body { margin: 0; font-family: sans-serif; display: flex; flex-direction: column; height: 100vh; }
                iframe { flex: 1; border: none; }
                .buttons {
                    padding: 10px;
                    text-align: center;
                    background-color: #f0f0f0;
                    border-top: 1px solid #ccc;
                }
                button {
                    margin: 0 10px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <iframe src="${pdfUrl}"></iframe>
            <div class="buttons">
                <button id="downloadPdf">PDF’yi İndir</button>
                <button onclick="window.close()">Kapat</button>
            </div>
            <script>
                document.getElementById("downloadPdf").addEventListener("click", function () {
                    const link = document.createElement("a");
                    link.href = "${pdfUrl}";
                    link.download = "genlesme-tanki-hacim-hesabi-frekans-konventorlu.pdf";
                    link.click();
                });
            </script>
        </body>
        </html>
    `);
}

pdfButton3.addEventListener("click", async function () {
    createPdf()
.then(() => {
    console.log("PDF oluşturuldu ve önizleme açıldı.");
})
.catch((error) => {
    console.error("PDF oluşturulurken hata oluştu:", error);
});
});