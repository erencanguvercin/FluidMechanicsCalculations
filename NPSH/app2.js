import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var pdfButton = document.getElementById("pdfButton");
async function createPdf() {
    const existingFontBytes = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const boldFontBytes = await fetch("Roboto-Bold.ttf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    const logoBytes = await fetch("logo.png").then(res => res.arrayBuffer());
    const footerBytes = await fetch("footer.png").then(res => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const footerImage = await pdfDoc.embedPng(footerBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const title = "Net Pozitif Emme Yüksekliği Hesap Raporu";
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
    var altitude = document.getElementById("altitude");
    var altitude_select = document.getElementById("altitude-select");
    var flowRate = document.getElementById("flow-rate");
    var flowRateSelect = document.getElementById("flow-rate-select");
    var liquid_fluidSelect = document.getElementById("liquid-fluid-select");
    var viscosity = document.getElementById("viscosity");
    var viscosityType = document.getElementById("viscosity-type");
    var specificGravity = document.getElementById("specific-gravity");
    var pipeLength = document.getElementById("pipe-length");
    var pipeLengthSelect = document.getElementById("pipe-length-select");
    var pipeId = document.getElementById("pipeId");
    var pipeIdSelect = document.getElementById("pipeId-select");
    var pipeMaterialSelect = document.getElementById("pipe-material-select");
    var hzFriction = document.getElementById("hzFriction");
    var roughnessHeight = document.getElementById("roughnessHeight");
    var roughnessHeightSelect = document.getElementById("roughnessHeight-select");
    var fittingType1_select1 = document.getElementById("fitting-type-select1");
    var fittingType1_select2 = document.getElementById("fitting-type-select2");
    var fittingType1_select3 = document.getElementById("fitting-type-select3");
    var fittingType1_select4 = document.getElementById("fitting-type-select4");
    var fittingType1_select5 = document.getElementById("fitting-type-select5");
    var quantity1 = document.getElementById("quantity1");
    var quantity2 = document.getElementById("quantity2");
    var quantity3 = document.getElementById("quantity3");
    var quantity4 = document.getElementById("quantity4");
    var quantity5 = document.getElementById("quantity5");
    if(altitude.value == '') { altitude.value = 0; }
    page.drawText("Rakım: " + altitude.value+" " + altitude_select.options[altitude_select.selectedIndex].textContent, {
        x: 75,
        y: height - 300,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    const selectedRadio = document.querySelector('input[name="pumpType"]:checked');
    if (selectedRadio.value == "Liquid") {
        var tankLevel = document.getElementById("tank-level");
        var tankLevel_select = document.getElementById("tank-level-select");
        if (tankLevel.value == '') { tankLevel.value = 0; }
        page.drawText("Tank İçerisindeki Sıvı Seviyesi: " + tankLevel.value +" "+ tankLevel_select.value, {
            x: 75,
            y: height - 310,
            size: 8,
            font: customFont,
            color: rgb(0, 0, 0),
        });
    }
    else if (selectedRadio.value == "Gas") {
        var gaugePressure = document.getElementById("gauge-pressure");
        var gaugePressure_select = document.getElementById("gauge-pressure-select");
        if(gaugePressure.value == '') { gaugePressure.value = 0; }
        page.drawText("Ölçüm Basıncı: " + gaugePressure.value +" "+ gaugePressure_select.value, {
            x: 75,
            y: height - 310,
            size: 8,
            font: customFont,
            color: rgb(0, 0, 0),
        });
    }
    page.drawText(`Akış Parametreleri`, {
        x: 100,
        y: height - 330,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if (flowRate.value == '') { flowRate.value = 0; }
    page.drawText(`Debi: ${flowRate.value} ${flowRateSelect.value}`, {
        x: 75,
        y: height - 340,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Sıvı/Akışkan: ${liquid_fluidSelect.options[liquid_fluidSelect.selectedIndex].textContent}`, {
        x: 75,
        y: height - 350,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Sıcaklık: ${document.getElementById("temperature-select").value}°C`, {
        x: 75,
        y: height - 360,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(viscosity.value == '') { viscosity.value = 0; }
    page.drawText(`Viskozite: ${viscosity.value} ${viscosityType.options[viscosityType.selectedIndex].textContent}`, {
        x: 75,
        y: height - 370,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(specificGravity.value == '') { specificGravity.value = 0; }
    page.drawText(`Özgül Ağırlık: ${specificGravity.value}`, {
        x: 75,
        y: height - 380,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Boru Sistemi`, {
        x: 100,
        y: height - 400,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if (pipeLength.value == '') { pipeLength.value = 0; }
    page.drawText(`Boru Uzunluğu: ${pipeLength.value} ${pipeLengthSelect.options[pipeLengthSelect.selectedIndex].textContent}`, {
        x: 75,
        y: height - 410,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (pipeId.value == '') { pipeId.value = 0; }
    page.drawText(`Boru Çapı: ${pipeId.value} ${pipeIdSelect.options[pipeIdSelect.selectedIndex].textContent}`, {
        x: 75,
        y: height - 420,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Boru Malzemesi: ${pipeMaterialSelect.options[pipeMaterialSelect.selectedIndex].textContent}`, {
        x: 75,
        y: height - 430,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if (hzFriction.value == '') { hzFriction.value = 0; }
    page.drawText(`Hazen Williams Sürtünme Katsayısı: ${hzFriction.value}`, {
        x: 75,
        y: height - 440,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    if (roughnessHeight.value == '') { roughnessHeight.value = 0; }
    page.drawText(`Pürüzlülük Yüksekliği: ${roughnessHeight.value} ${roughnessHeightSelect.options[roughnessHeightSelect.selectedIndex].textContent}`, {
        x: 75,
        y: height - 450,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Bağlantı Elemanları`, {
        x: 100,
        y: height - 470,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    if (quantity1.value == '') { quantity1.value = 0; }
    if (quantity2.value == '') { quantity2.value = 0; }
    if (quantity3.value == '') { quantity3.value = 0; }
    if (quantity4.value == '') { quantity4.value = 0; }
    if (quantity5.value == '') { quantity5.value = 0; }
    page.drawText(`${fittingType1_select1.options[fittingType1_select1.selectedIndex].textContent}: ${quantity1.value} adet`, {
        x: 75,
        y: height - 480,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select2.options[fittingType1_select2.selectedIndex].textContent}: ${quantity2.value} adet`, {
        x: 75,
        y: height - 490,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select3.options[fittingType1_select3.selectedIndex].textContent}: ${quantity3.value} adet`, {
        x: 75,
        y: height - 500,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select4.options[fittingType1_select4.selectedIndex].textContent}: ${quantity4.value} adet`, {
        x: 75,
        y: height - 510,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select5.options[fittingType1_select5.selectedIndex].textContent}: ${quantity5.value} adet`, {
        x: 75,
        y: height - 520,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Sonuç`, {
        x: 100,
        y: height - 540,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    if(document.getElementById("npsh-available").value == '') { document.getElementById("npsh-available").value = 0; }
    if(document.getElementById("hazenInput").value == '') { document.getElementById("hazenInput").value = 0; }
    page.drawText(`NPSH: ${document.getElementById("npsh-available").value}`, {
        x: 75,
        y: height - 550,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Toplam Sürtünme Kaybı: ${document.getElementById("hazenInput").value} ${document.getElementById("returnResultAs-select").value}`, {
        x: 75,
        y: height - 560,
        size: 8,
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
                        link.download = "net-pozitif-emme-yuksekligi-hesabi.pdf";
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