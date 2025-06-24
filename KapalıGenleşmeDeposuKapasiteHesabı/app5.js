import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var switchq = document.getElementById("switchQ");
var hUst = document.getElementById("hUst");
var hAlt = document.getElementById("hAlt");
var pumpSelect = document.getElementById("pump-select");
var pumpSelect2 = document.getElementById("pump-select2");
var motorPowerInput = document.getElementById("motorPowerInput");
var switchResult = document.getElementById("switchResult");
var pdfButton2 = document.getElementById("pdfButton2");

async function createPdf() {
    const existingFontBytes = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const boldFontBytes = await fetch("Roboto-Bold.ttf").then(res => res.arrayBuffer());
    const logoBytes = await fetch("logo.png").then(res => res.arrayBuffer());
    const footerBytes = await fetch("footer.png").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const footerImage = await pdfDoc.embedPng(footerBytes);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();


    const title = "Genleşme Tankı Hacim Hesabı (Basınç Şalterli Hidroforlar için)";
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
    if(switchq.value == '') {switchq.value = 0;}
    page.drawText(`Alt Basınçta Her Bir Pompanın Debisi: ${switchq.value} m3/h`,{
        x: 50,
        y: height - 315,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(hAlt.value == '') {hAlt.value = 0;}
    page.drawText(`Hidrofor alt basıncı: ${hAlt.value} bar`,{
        x: 50,
        y: height - 340,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(hUst.value == '') {hUst.value = 0;}
    page.drawText(`Hidrofor üst basıncı: ${hUst.value} bar`,{
        x: 50,
        y: height - 365,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Ana Pompa Sayısı: ${pumpSelect.value} adet`,{
        x: 50,
        y: height - 390,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Yedek Pompa Sayısı: ${pumpSelect2.value} adet`,{
        x: 50,
        y: height - 415,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(motorPowerInput.value == '') {motorPowerInput.value = 0;}
    page.drawText(`Motor Gücü: ${motorPowerInput.value} kW`,{
        x: 50,
        y: height - 440,
        size: 16,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    if(switchResult.value == '') {switchResult.value = 0;}
    page.drawText(`Sonuç: ${switchResult.value}`,{
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
                    link.download = "genlesme-tanki-hacim-hesabi-basinc-salterli.pdf";
                    link.click();
                });
            </script>
        </body>
        </html>
    `);
}

pdfButton2.addEventListener("click", async function () {
    createPdf()
.then(() => {
    console.log("PDF oluşturuldu ve önizleme açıldı.");
})
.catch((error) => {
    console.error("PDF oluşturulurken hata oluştu:", error);
});
});