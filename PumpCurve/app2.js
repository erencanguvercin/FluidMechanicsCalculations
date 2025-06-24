import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var pressure = document.getElementById('pressure');
var pressure_select = document.getElementById('pressure-select');
var flow = document.getElementById('flow');
var flow_select = document.getElementById('flow-select');
var speed = document.getElementById('speed');
var speed_select = document.getElementById('speed-select');
var pressure2 = document.getElementById('pressure2');
var pressure2_select = document.getElementById('pressure-select2');
var flow2 = document.getElementById('flow2');
var flow2_select = document.getElementById('flow-select2');
var speed2 = document.getElementById('speed2');
var speed2_select = document.getElementById('speed-select2');
var efficiency = document.getElementById('efficiency');
var liquid_select = document.getElementById('liquid-select');
var specific_gravity = document.getElementById('specific-gravity');
var pdfButton = document.getElementById("pdfButton");
async function createPdf() {
    function convertToBHP(value) {
        return value * 1.341022;
    }
    var power1 = (flow.value * pressure.value * specific_gravity.value) / (367 * (efficiency.value / 100));
    var power2 = (flow2.value * pressure2.value * specific_gravity.value) / (367 * (efficiency.value / 100));
    var power1BHP = convertToBHP(power1);
    var power2BHP = convertToBHP(power2);
    const existingFontBytes = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const boldFontBytes = await fetch("Roboto-Bold.ttf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    const logoBytes = await fetch("logo.png").then(res => res.arrayBuffer());
    const footerBytes = await fetch("footer.png").then(res => res.arrayBuffer());
    const curveBytes = await fetch("curve2.png").then(res => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const footerImage = await pdfDoc.embedPng(footerBytes);
    const curveImage = await pdfDoc.embedPng(curveBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const title = "Pompa Eğrisi Hız Hesabı Raporu";
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
    page.drawText(`Bilinen Çalışma Koşulları`, {
        x: 100,
        y: height - 260,
        size: 10,
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
    if (speed.value == '') { speed.value = 0; }
    page.drawText(`Hız: ${speed.value} ${speed_select.value}`, {
        x: 75,
        y: height - 320,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Ayarlanmış Çalışma Koşulları`, {
        x: 100,
        y: height - 340,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if (pressure2.value == '') { pressure2.value = 0; }
    page.drawText(`Basınç: ${pressure2.value} ${pressure2_select.value}`, {
        x: 75,
        y: height - 360,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (flow2.value == '') { flow2.value = 0; }
    page.drawText(`Debi: ${flow2.value} ${flow2_select.value}`, {
        x: 75,
        y: height - 380,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (speed2.value == '') { speed2.value = 0; }
    page.drawText(`Hız: ${speed2.value} ${speed2_select.value}`, {
        x: 75,
        y: height - 400,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Ek Bilgi`, {
        x: 100,
        y: height - 420,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if (efficiency.value == '') { efficiency.value = 0; }
    page.drawText(`Verimlilik: ${efficiency.value}`, {
        x: 75,
        y: height - 440,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Sıvı/Akışkan: ${liquid_select.options[liquid_select.selectedIndex].textContent}`, {
        x: 75,
        y: height - 460,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (specific_gravity.value == '') { specific_gravity.value = 0; }
    page.drawText(`Özgül Ağırlık: ${specific_gravity.value}`, {
        x: 75,
        y: height - 480,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawImage(curveImage, {
        x: 50,
        y: height - 700,
        width: 400,
        height: 200,
    });
    page.drawText("Güç", {
        x: 210,
        y: 315,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Ayarlanmış Güç", {
        x: 120,
        y: 315,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Bilinen Nokta", {
        x: 300,
        y: 320,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Verimlilik", {
        x: 365,
        y: 305,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Ayarlanan Nokta", {
        x: 270,
        y: 195,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Hız", {
        x: 102,
        y: 283,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText("Ayarlanan Hız", {
        x: 90,
        y: 257,
        size: 5,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${power1.toFixed(2)} kW (${power1BHP.toFixed(2)} BHP)`, {
        x: 200,
        y: 300,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${power2.toFixed(2)} kW (${power2BHP.toFixed(2)} BHP)`, {
        x: 120,
        y: 300,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${parseFloat(efficiency.value).toFixed(2)} %`, {
        x: 370,
        y: 298,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(parseFloat(pressure.value).toFixed(2) + " " + pressure_select.value + " / " + parseFloat(flow.value).toFixed(2) + " " + flow_select.value,{
        x: 290,
        y: 313,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(parseFloat(pressure2.value).toFixed(2) + " " + pressure2_select.value + " / " + parseFloat(flow2.value).toFixed(2) + " " + flow2_select.value,{
        x: 270,
        y: 190,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(parseFloat(speed.value).toFixed(2) + " " + speed_select.value, {
        x: 100,
        y: 278,
        size: 5,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(parseFloat(speed2.value).toFixed(2) + " " + speed2_select.value, {
        x: 95,
        y: 250,
        size: 5,
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
                    link.download = "pompa-egrisi-hiz-hesabi.pdf";
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