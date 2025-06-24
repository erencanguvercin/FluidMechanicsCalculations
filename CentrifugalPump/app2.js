import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var pressure = document.getElementById('pressure');
var pressure_select = document.getElementById('pressure-select');
var flow = document.getElementById('flow');
var flow_select = document.getElementById('flow-select');
var efficiency = document.getElementById('efficiency');
var power = document.getElementById('power');
var power_select = document.getElementById('power-select');
var liquid_select = document.getElementById('liquid-fluid-select');
var specific_gravity = document.getElementById('specific-gravity');
var pdfButton = document.getElementById('pdfButton');
async function createPdf() {
    const existingFontBytes = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const boldFontBytes = await fetch("Roboto-Bold.ttf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    const logoBytes = await fetch("logo.png").then(res => res.arrayBuffer());
    const footerBytes = await fetch("footer.png").then(res => res.arrayBuffer());
    const centrifugalBytes = await fetch("centrifugal-pump-power-calculation.png").then(res => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const footerImage = await pdfDoc.embedPng(footerBytes);
    const centrifugalImage = await pdfDoc.embedPng(centrifugalBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const title = "Santrifüj Pompası Güç Hesabı Raporu";
    const titleWidth = customFont.widthOfTextAtSize(title, 12);
    const titleX = (width - titleWidth) / 2; // Ortalamak için X koordinatı
    page.drawImage(logoImage, {
        x: 50,
        y: height - 220,
        width: 475,
        height: 200,
    });
    page.drawText(title, {
        x: titleX,
        y: height - 240,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),

    });
    if (pressure.value == '') { pressure.value = 0; }
    page.drawText(`Basınç: ${pressure.value} ${pressure_select.value}`, {
        x: 75,
        y: height - 280,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (flow.value == '') { flow.value = 0; }
    page.drawText(`Debi: ${flow.value} ${flow_select.value}`, {
        x: 75,
        y: height - 300,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (efficiency.value == '') { efficiency.value = 0; }
    page.drawText(`Verimlilik: ${efficiency.value} %`, {
        x: 75,
        y: height - 320,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (power.value == '') { power.value = 0; }
    page.drawText(`Güç: ${power.value} ${power_select.value}`, {
        x: 75,
        y: height - 340,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Sıvı/Akışkan: ${liquid_select.options[liquid_select.selectedIndex].textContent}`, {
        x: 75,
        y: height - 360,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (specific_gravity.value == '') { specific_gravity.value = 0; }
    page.drawText(`Özgül Ağırlık: ${specific_gravity.value}`, {
        x: 75,
        y: height - 380,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawImage(centrifugalImage, {
        x: 50,
        y: height - 700,
        width: 400,
        height: 300,
    });
    page.drawText("Güç", {
        x: 200,
        y: 405,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${power.value} ${power_select.value}`, {
        x: 200,
        y: 385,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Ayar Noktası", {
        x: 310,
        y: 390,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(parseFloat(pressure.value).toFixed(2) + " " + pressure_select.options[pressure_select.selectedIndex].textContent + " / " + parseFloat(flow.value).toFixed(2) + " " + flow_select.options[flow_select.selectedIndex].textContent, {
        x: 310,
        y: 380,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Verimlilik", {
        x: 370,
        y: 370,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(parseFloat(efficiency.value).toFixed(2) + " %", {
        x: 375,
        y: 360,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawImage(footerImage, {
        x: 50,
        y: 65,
        width: 475,
        height: 20,
    });
    page.drawText(`
        Atatürk Mahallesi, Mustafa Kemal Cad. Işık Plaza, No: 8/2, 34758 Ataşehir/İstanbul Türkiye
                            
`, {
        x: width / 2 - 180,
        y: 40,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
        lineHeight: 1.2,
    });
    page.drawText(`
        +90 216 580 9350	info@isikteknoloji.com
                            
`, {
        x: width / 2 - 105,
        y: 20,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
        lineHeight: 1.2,
    });
    const pageCount = pdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
        const currentPage = pdfDoc.getPage(i);
        currentPage.drawText(`${i + 1} / ${pageCount}`, {
            x: width - 50,
            y: height - 20,
            size: 8,
            font: customFont,
            color: rgb(0, 0, 0),
        });
    }

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
                    link.download = "santrifuj-pompa-guc-hesabi.pdf";
                    link.click();
                });
            </script>
        </body>
        </html>
    `);
}
pdfButton.addEventListener("click", async () => {
    createPdf()
        .then(() => {
            console.log("PDF oluşturuldu ve önizleme açıldı.");
        })
        .catch((error) => {
            console.error("PDF oluşturulurken hata oluştu:", error);
        });
});