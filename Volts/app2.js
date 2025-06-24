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


    const title = "Volt, Amper, Güç Hesabı Raporu";
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
    const selectedRadio = document.querySelector('input[name="currentType"]:checked');
    if (selectedRadio.value == 'AC') {
        if (document.getElementById("powerFactor") == null) {
            var voltage = document.getElementById("voltage");
            var current = document.getElementById("current");
            var power = document.getElementById("power");
            page.drawText("Güç Faktörü: 0", {
                x: 50,
                y: height - 300,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (voltage.value == '') { voltage.value = 0; }
            page.drawText("Gerilim Farkı (Voltaj): " + voltage.value, {
                x: 50,
                y: height - 320,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (current.value == '') { current.value = 0; }
            page.drawText("Akım/Amper: " + current.value, {
                x: 50,
                y: height - 340,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (power.value == '') { power.value = 0; }
            page.drawText("Güç/Watt: " + power.value, {
                x: 50,
                y: height - 360,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
        }
        else {
            var voltage = document.getElementById("voltage");
            var current = document.getElementById("current");
            var power = document.getElementById("power");
            var powerFactor = document.getElementById("powerFactor");
            if (powerFactor.value == '') { powerFactor.value = 0; }
            page.drawText("Güç Faktörü: " + powerFactor.value, {
                x: 50,
                y: height - 300,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (voltage.value == '') { voltage.value = 0; }
            page.drawText("Gerilim Farkı (Voltaj): " + voltage.value, {
                x: 50,
                y: height - 320,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (current.value == '') { current.value = 0; }
            page.drawText("Akım/Amper: " + current.value, {
                x: 50,
                y: height - 340,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
            if (power.value == '') { power.value = 0; }
            page.drawText("Güç/Watt: " + power.value, {
                x: 50,
                y: height - 360,
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
        }
    }
    else if (selectedRadio.value == 'DC') {
        var voltage = document.getElementById("voltage");
        var current = document.getElementById("current");
        var power = document.getElementById("power");
        if (voltage.value == '') { voltage.value = 0; }
        page.drawText("Gerilim Farkı (Voltaj): " + voltage.value, {
            x: 50,
            y: height - 300,
            size: 10,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if (current.value == '') { current.value = 0; }
        page.drawText("Akım/Amper: " + current.value, {
            x: 50,
            y: height - 320,
            size: 10,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if (power.value == '') { power.value = 0; }
        page.drawText("Güç/Watt: " + power.value, {
            x: 50,
            y: height - 340,
            size: 10,
            font: customFont,
            color: rgb(0, 0, 0),
        });
    }

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
                    link.download = "volt-amper-guc-hesabi.pdf";
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