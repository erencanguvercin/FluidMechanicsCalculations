import { PDFDocument, rgb, StandardFonts } from "https://cdn.skypack.dev/pdf-lib";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit";
var checkbox = document.getElementById("vACheckbox");
var buildingCheckbox = document.getElementById("buildingCheckbox");
var t1_select = document.getElementById("t1-select");
var t2_select = document.getElementById("t2-select");
var ventileInput = document.getElementById("ventileInput");
var resultInput = document.getElementById("resultInput");
var resultText = document.getElementById("resultText");
var pdfButton1 = document.getElementById("pdfButton1");
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


    const title = "Kapalı Genleşme Deposu Kapasite Hesabı";
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
    if(!checkbox.checked && !buildingCheckbox.checked){
        var qkInput = document.getElementById("qkInput");
        var qkSelect = document.getElementById("qK-select");
        var fElementsSelect = document.getElementById("fElements-select");
        var buildingHeight = document.getElementById("buildingHeight");
        var resultText = document.getElementById("resultText");
        if(qkInput.value == ""){qkInput.value = 0;}
        page.drawText(`Kazan Kapasitesi: ${qkInput.value} ${qkSelect.options[qkSelect.selectedIndex].textContent}`,{
            x: 50,
            y: height - 315,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Isıstıcı Elemanlar (lt / 1000 kcal /h): ${fElementsSelect.options[fElementsSelect.selectedIndex].textContent}`,{
            x: 50,
            y: height - 340,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMax: ${t1_select.value} °C`,{
            x: 50,
            y: height - 365,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMin: ${t2_select.value} °C`,{
            x: 50,
            y: height - 390,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(buildingHeight.value == ""){buildingHeight.value = 0;}
        page.drawText(`Kot Farkı: ${buildingHeight.value} metre`,{
            x: 50,
            y: height - 415,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(ventileInput.value == ""){ventileInput.value = 0;}
        page.drawText(`Emniyet Ventili Açma Basıncı: ${ventileInput.value} bar`,{
            x: 50,
            y: height - 440,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Sonuç: ${resultInput.value}`,{
            x: 50,
            y: height - 465,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Seçilen Tank: ${resultText.textContent}`,{
            x: 50,
            y: height - 490,
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
    }
    else if(checkbox.checked && !buildingCheckbox.checked){
        var vAInput = document.getElementById("vAInput");
        var buildingHeight = document.getElementById("buildingHeight");
        var resultText = document.getElementById("resultText");
        if(vAInput.value == ""){vAInput.value = 0;}
        page.drawText(`Sistemdeki su hacmi: ${vAInput.value} litre`,{
            x: 50,
            y: height - 175,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMax: ${t1_select.value} °C`,{
            x: 50,
            y: height - 200,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMin: ${t2_select.value} °C`,{
            x: 50,
            y: height - 225,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(buildingHeight.value == ""){buildingHeight.value = 0;}
        page.drawText(`Kot Farkı: ${buildingHeight.value} metre`,{
            x: 50,
            y: height - 250,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(ventileInput.value == ""){ventileInput.value = 0;}
        page.drawText(`Emniyet Ventili Açma Basıncı: ${ventileInput.value} bar`,{
            x: 50,
            y: height - 275,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Sonuç: ${resultInput.value}`,{
            x: 50,
            y: height - 300,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Seçilen Tank: ${resultText.textContent}`,{
            x: 50,
            y: height - 325,
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
    }
    else if(!checkbox.checked && buildingCheckbox.checked){
        var qkInput = document.getElementById("qkInput");
        var qkSelect = document.getElementById("qK-select");
        var fElementsSelect = document.getElementById("fElements-select");
        var floorInput = document.getElementById("floorInput");
        var floorHeightInput = document.getElementById("floorHeightInput");
        var tankInput = document.getElementById("tankInput");
        var resultText = document.getElementById("resultText");
        if(qkInput.value == ""){qkInput.value = 0;}
        page.drawText(`Kazan Kapasitesi: ${qkInput.value} ${qkSelect.options[qkSelect.selectedIndex].textContent}`,{
            x: 50,
            y: height - 175,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Isıstıcı Elemanlar (lt / 1000 kcal /h): ${fElementsSelect.options[fElementsSelect.selectedIndex].textContent}`,{
            x: 50,
            y: height - 200,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMax: ${t1_select.value} °C`,{
            x: 50,
            y: height - 225,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMin: ${t2_select.value} °C`,{
            x: 50,
            y: height - 250,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(floorInput.value == ""){floorInput.value = 0;}
        page.drawText(`Kat Sayısı: ${floorInput.value}`,{
            x: 50,
            y: height - 275,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(floorHeightInput.value == ""){floorHeightInput.value = 0;}
        page.drawText(`Kat Yüksekliği: ${floorHeightInput.value} metre`,{
            x: 50,
            y: height - 300,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(tankInput.value == ""){tankInput.value = 0;}
        page.drawText(`Kazan ile Zemin Arasındaki Yükseklik: ${tankInput.value} metre`,{
            x: 50,
            y: height - 325,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(ventileInput.value == ""){ventileInput.value = 0;}
        page.drawText(`Emniyet Ventili Açma Basıncı: ${ventileInput.value} bar`,{
            x: 50,
            y: height - 350,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Sonuç: ${resultInput.value}`,{
            x: 50,
            y: height - 375,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Seçilen Tank: ${resultText.textContent}`,{
            x: 50,
            y: height - 400,
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
    }
    else if(checkbox.checked && buildingCheckbox.checked){
        var vAInput = document.getElementById("vAInput");
        var floorInput = document.getElementById("floorInput");
        var floorHeightInput = document.getElementById("floorHeightInput");
        var tankInput = document.getElementById("tankInput");
        var resultText = document.getElementById("resultText");
        if(vAInput.value == ""){vAInput.value = 0;}
        page.drawText(`Sistemdeki su hacmi: ${vAInput.value} litre`,{
            x: 50,
            y: height - 175,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMax: ${t1_select.value} °C`,{
            x: 50,
            y: height - 200,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`TMin: ${t2_select.value} °C`,{
            x: 50,
            y: height - 225,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(floorInput.value == ""){floorInput.value = 0;}
        page.drawText(`Kat Sayısı: ${floorInput.value}`,{
            x: 50,
            y: height - 250,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(floorHeightInput.value == ""){floorHeightInput.value = 0;}
        page.drawText(`Kat Yüksekliği: ${floorHeightInput.value} metre`,{
            x: 50,
            y: height - 275,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(tankInput.value == ""){tankInput.value = 0;}
        page.drawText(`Kazan ile Zemin Arasındaki Yükseklik: ${tankInput.value} metre`,{
            x: 50,
            y: height - 300,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if(ventileInput.value == ""){ventileInput.value = 0;}
        page.drawText(`Emniyet Ventili Açma Basıncı: ${ventileInput.value} bar`,{
            x: 50,
            y: height - 325,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Sonuç: ${resultInput.value}`,{
            x: 50,
            y: height - 350,
            size: 16,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Seçilen Tank: ${resultText.textContent}`,{
            x: 50,
            y: height - 375,
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
                    link.download = "kapali-genlesme-deposu-kapasite-hesabi.pdf";
                    link.click();
                });
            </script>
        </body>
        </html>
    `);
}
pdfButton1.addEventListener("click", async function () {
    var resultText = document.getElementById("resultText");
    if(resultText == null){
        alert("Lütfen önce hesaplama yapın.");
    }
    createPdf()
.then(() => {
    console.log("PDF oluşturuldu ve önizleme açıldı.");
})
.catch((error) => {
    console.error("PDF oluşturulurken hata oluştu:", error);
});
});