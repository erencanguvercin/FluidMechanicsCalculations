import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var flowRate = document.getElementById("flow-rate");
var flowRateSelect = document.getElementById("flow-rate-select");
var liquid_fluidSelect = document.getElementById("liquid-fluid-select");
var viscosity = document.getElementById("viscosity");
var viscosityType=document.getElementById("viscosity-type");
var specificGravity = document.getElementById("specific-gravity");
var pipeLength = document.getElementById("pipe-length");
var pipeLengthSelect = document.getElementById("pipe-length-select");
var pipeId= document.getElementById("pipeId");
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
var hazenInput = document.getElementById("hazenInput");
var returnResultAs_select = document.getElementById("returnResultAs-select");
var fluidVelocity = document.getElementById("fluid-velocity");
var fluidVelocitySelect = document.getElementById("fluid-velocity-select");
var pdfButton = document.getElementById("pdfButton");
async function createPdf(){
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


    const title = "Sürtünme Kaybı Hesabı Raporu (Hazen-Williams)";
    const titleWidth = customFont.widthOfTextAtSize(title, 12);
    const titleX = (width - titleWidth) / 2; // Ortalamak için X koordinatı
    page.drawImage(logoImage, {
        x: 50,
        y: height-220,
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
    page.drawText(`Akış Parametreleri`,{
        x: 100,
        y: height - 260,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if(flowRate.value==''){flowRate.value=0;}
    page.drawText(`Debi: ${flowRate.value} ${flowRateSelect.value}`,{
        x: 75,
        y: height - 277,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Sıvı/Akışkan: ${liquid_fluidSelect.options[liquid_fluidSelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 294,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Viskozite: ${viscosity.value} ${viscosityType.options[viscosityType.selectedIndex].textContent}`,{
        x: 75,
        y: height - 311,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Özgül Ağırlık: ${specificGravity.value}`,{
        x: 75,
        y: height - 328,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Boru Sistemi`,{
        x: 100,
        y: height - 348,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    if(pipeLength.value==''){pipeLength.value=0;}
    page.drawText(`Boru Uzunluğu: ${pipeLength.value} ${pipeLengthSelect.options[pipeLengthSelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 365,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(pipeId.value==''){pipeId.value=0;}
    page.drawText(`Boru Çapı: ${pipeId.value} ${pipeIdSelect.options[pipeIdSelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 382,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Boru Malzemesi: ${pipeMaterialSelect.options[pipeMaterialSelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 399,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    if(hzFriction.value==''){hzFriction.value=0;}
    page.drawText(`Hazen Williams Sürtünme Katsayısı: ${hzFriction.value}`,{
        x: 75,
        y: height - 416,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    if(roughnessHeight.value==''){roughnessHeight.value=0;}
    page.drawText(`Pürüzlülük Yüksekliği: ${roughnessHeight.value} ${roughnessHeightSelect.options[roughnessHeightSelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 433,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Bağlantı Elemanları`,{
        x: 100,
        y: height - 453,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    if(quantity1.value==''){quantity1.value=0;}
    if(quantity2.value==''){quantity2.value=0;}
    if(quantity3.value==''){quantity3.value=0;}
    if(quantity4.value==''){quantity4.value=0;}
    if(quantity5.value==''){quantity5.value=0;}
    page.drawText(`${fittingType1_select1.options[fittingType1_select1.selectedIndex].textContent}: ${quantity1.value} adet`,{
        x: 75,
        y: height - 470,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select2.options[fittingType1_select2.selectedIndex].textContent}: ${quantity2.value} adet`,{
        x: 75,
        y: height - 487,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select3.options[fittingType1_select3.selectedIndex].textContent}: ${quantity3.value} adet`,{
        x: 75,
        y: height - 504,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select4.options[fittingType1_select4.selectedIndex].textContent}: ${quantity4.value} adet`,{
        x: 75,
        y: height - 521,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`${fittingType1_select5.options[fittingType1_select5.selectedIndex].textContent}: ${quantity5.value} adet`,{
        x: 75,
        y: height - 538,
        size: 8,
        font: customFont,
        color: rgb(0, 0, 0)
    });
    page.drawText(`Sonuç`,{
        x: 100,
        y: height - 578,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    if(hazenInput.value==''){hazenInput.value=0;}
    page.drawText(`Toplam Sürtünme Kaybı: ${parseFloat(hazenInput.value).toFixed(2)} ${returnResultAs_select.options[returnResultAs_select.selectedIndex].textContent} `,{
        x: 75,
        y: height - 598,
        size: 8,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    if(fluidVelocity.value==''){fluidVelocity.value=0;}
    page.drawText(`Akış Hızı: ${fluidVelocity.value} ${fluidVelocitySelect.options[fluidVelocitySelect.selectedIndex].textContent}`,{
        x: 75,
        y: height - 618,
        size: 8,
        font: boldFont,
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
                    link.download = "surtunme-kaybi-hesabi.pdf";
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