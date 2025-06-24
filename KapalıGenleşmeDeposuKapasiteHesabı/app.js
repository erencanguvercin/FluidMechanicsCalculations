document.addEventListener("DOMContentLoaded", function () {

    var checkbox = document.getElementById("vACheckbox");
    var inputContainer = document.getElementById("inputvAContainer");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            // Mevcut inputları kaldır
            inputContainer.innerHTML = ``;

            // Yeni tek input oluştur
            var newLabel = document.createElement("label");
            newLabel.setAttribute("for", "vAInput");
            newLabel.textContent = "Sistemdeki su hacmi (lt)";

            var newInput = document.createElement("input");
            newInput.setAttribute("type", "number");
            newInput.setAttribute("step", "any");
            newInput.setAttribute("id", "vAInput");

            // Yeni inputu ekle
            inputContainer.appendChild(newLabel);
            inputContainer.appendChild(newInput);
        } else {
            // Orijinal inputları geri yükle
            inputContainer.innerHTML = `
                    <label for="qK">Kazan Kapasitesi:</label>
                    <input type="number" step="any" id="qkInput">
                    <select id="qK-select">
                        <option value="KCAL">(kcal/h)</option>
                        <option value="KW">kW</option>
                    </select>
                    <br>
                    <label for="f">Isıtıcı Elemanlar (lt / 1000 kcal /h)</label>
                    <select name="fElements" id="fElements-select">
                        <option value="Konyektor">Konyektör</option>
                        <option value="Fankoil">Fankoil</option>
                        <option value="PanelRadyator">Panel Radyatör</option>
                        <option value="CastIronRadyator">Döküm Radyator</option>
                        <option value="SteelRadyator">Çelik Radyator</option>
                        <option value="FloorHeat">Yerden Isıtma</option>
                    </select>
                `;
        }
    });
});
var checkbox = document.getElementById("vACheckbox");
var button = document.getElementById("calculateBtn");
var cleanButton1 = document.getElementById("cleanButton1");
var buildingCheckbox = document.getElementById("buildingCheckbox");
var buildingContainer = document.getElementById("buildingContainer");
var t1Input = document.getElementById("t1-select");
var t2Input = document.getElementById("t2-select");
var height = 0;
var ventile = document.getElementById("ventileInput");

function calculateVa() {
    if (checkbox.checked) {
        var vAInput = document.getElementById("vAInput").value;
        return vAInput;
    }
    else {
        var qK_select = document.getElementById("qK-select").value;
        var qkInput = document.getElementById("qkInput").value;
        if (qK_select == "KW") {
            qkInput = parseFloat(qkInput) * 860;
        }
        var fInput = document.getElementById("fElements-select").value;
        var f = 0;
        switch (fInput) {
            case "Konyektor":
                f = 6;
                break;
            case "Fankoil":
                f = 8;
                break;
            case "PanelRadyator":
                f = 10;
                break;
            case "CastIronRadyator":
                f = 12;
                break;
            case "SteelRadyator":
                f = 14;
                break;
            case "FloorHeat":
                f = 23;
                break;
        }
        var vAInput = qkInput * (f / 1000);
        return vAInput;
    }
}
function calculateN(t1, t2) {
    var n1 = 0;
    var n2 = 0;
    switch (parseInt(t1)) {
        case 0:
            n1 = 0.00013;
            break;
        case 10:
            n1 = 0.00027;
            break;
        case 20:
            n1 = 0.00177;
            break;
        case 30:
            n1 = 0.00435;
            break;
        case 40:
            n1 = 0.00782;
            break;
        case 50:
            n1 = 0.0121;
            break;
        case 55:
            n1 = 0.0145;
            break;
        case 60:
            n1 = 0.0171;
            break;
        case 65:
            n1 = 0.0198;
            break;
        case 70:
            n1 = 0.0227;
            break;
        case 75:
            n1 = 0.0258;
            break;
        case 80:
            n1 = 0.029;
            break;
        case 85:
            n1 = 0.0324;
            break;
        case 90:
            n1 = 0.0359;
            break;
        case 95:
            n1 = 0.0396;
            break;
        case 100:
            n1 = 0.0434;
            break;
        case 110:
            n1 = 0.0515;
            break;
        default:
            n1 = 0;
            break;
    }
    switch (parseInt(t2)) {
        case 0:
            n2 = 0.00013;
            break;
        case 10:
            n2 = 0.00027;
            break;
        case 20:
            n2 = 0.00177;
            break;
        case 30:
            n2 = 0.00435;
            break;
        case 40:
            n2 = 0.00782;
            break;
        case 50:
            n2 = 0.0121;
            break;
        case 55:
            n2 = 0.0145;
            break;
        case 60:
            n2 = 0.0171;
            break;
        case 65:
            n2 = 0.0198;
            break;
        case 70:
            n2 = 0.0227;
            break;
        case 75:
            n2 = 0.0258;
            break;
        case 80:
            n2 = 0.029;
            break;
        case 85:
            n2 = 0.0324;
            break;
        case 90:
            n2 = 0.0359;
            break;
        case 95:
            n2 = 0.0396;
            break;
        case 100:
            n2 = 0.0434;
            break;
        case 110:
            n2 = 0.0515;
            break;
        default:
            n2 = 0;
            break;
    }
    var n = n1 - n2;
    return n;
}
function calculateVe(Va, n) {
    var Ve = Va * n;
    return Ve;
}
function calculateHeight(floor, floorHeight, tank) {
    var calculated_height = (floor * floorHeight) + tank;
    return calculated_height;
}

function calculatePo(height) {
    var Po = height / 10;
    return Po;
}
function calculatePe(ventile) {
    if (ventile <= 5) {
        return parseFloat(ventile) - 0.5;
    }
    else if (ventile > 5) {
        return parseFloat(ventile) - 0.9;
    }
}
function calculateDf(Po, Pe) {
    var Df = ((Pe + 1) - (Po + 1)) / (Pe + 1);
    return Df;
}
function calculateVn(Ve, Df) {
    var Vn = Ve / Df;
    return Vn;
}

function printResult(resultText, Vn, ventile) {
    if (ventile < 10) {
        if (Vn < 100) {
            resultText.textContent = "LRS 100/10 V membranli tank seçildi.";
        }
        else if (Vn < 200) {
            resultText.textContent = "LRS 200/10 V membranli tank seçildi.";
        }
        else if (Vn < 300) {
            resultText.textContent = "LRS 300/10 V membranli tank seçildi.";
        }
        else if (Vn < 500) {
            resultText.textContent = "LRS 500/10 V membranli tank seçildi.";
        }
        else if (Vn < 750) {
            resultText.textContent = "LRS 750/10 V membranli tank seçildi.";
        }
        else if (Vn < 1000) {
            resultText.textContent = "LRS 1000/10 V membranli tank seçildi.";
        }
        else if (Vn < 1500) {
            resultText.textContent = "LRS 1500/10 V membranli tank seçildi.";
        }
        else if (Vn < 2000) {
            resultText.textContent = "LRS 2000/10 V membranli tank seçildi.";
        }
        else if (Vn < 2500) {
            resultText.textContent = "LRS 2500/10 V membranli tank seçildi.";
        }
        else if (Vn < 3000) {
            resultText.textContent = "LRS 3000/10 V membranli tank seçildi.";
        }
        else if (Vn < 4000) {
            resultText.textContent = "LRS 4000/10 V membranli tank seçildi.";
        }
        else if (Vn < 5000) {
            resultText.textContent = "LRS 5000/10 V membranli tank seçildi.";
        }
    }
    else if (ventile < 16) {
        if (Vn < 100) {
            resultText.textContent = "LRS 100/16 V membranli tank seçildi.";
        }
        else if (Vn < 200) {
            resultText.textContent = "LRS 200/16 V membranli tank seçildi.";
        }
        else if (Vn < 300) {
            resultText.textContent = "LRS 300/16 V membranli tank seçildi.";
        }
        else if (Vn < 500) {
            resultText.textContent = "LRS 500/16 V membranli tank seçildi.";
        }
        else if (Vn < 750) {
            resultText.textContent = "LRS 750/16 V membranli tank seçildi.";
        }
        else if (Vn < 1000) {
            resultText.textContent = "LRS 1000/16 V membranli tank seçildi.";
        }
        else if (Vn < 1500) {
            resultText.textContent = "LRS 1500/16 V membranli tank seçildi.";
        }
        else if (Vn < 2000) {
            resultText.textContent = "LRS 2000/16 V membranli tank seçildi.";
        }
        else if (Vn < 2500) {
            resultText.textContent = "LRS 2500/16 V membranli tank seçildi.";
        }
        else if (Vn < 3000) {
            resultText.textContent = "LRS 3000/16 V membranli tank seçildi.";
        }
        else if (Vn < 4000) {
            resultText.textContent = "LRS 4000/16 V membranli tank seçildi.";
        }
        else if (Vn < 5000) {
            resultText.textContent = "LRS 5000/16 V membranli tank seçildi.";
        }
    }
}

buildingCheckbox.addEventListener("change", function () {
    if (this.checked) {
        buildingContainer.innerHTML = "";

        var floorLabel = document.createElement("label");
        floorLabel.setAttribute("for", "floorLabel");
        floorLabel.textContent = "Kat sayısı";

        var floorInput = document.createElement("input");
        floorInput.setAttribute("type", "number");
        floorInput.setAttribute("step", "any");
        floorInput.setAttribute("id", "floorInput");

        var floorHeightLabel = document.createElement("label");
        floorHeightLabel.setAttribute("for", "floorHeightLabel");
        floorHeightLabel.textContent = "Katlar arası yükseklik (m)";

        var floorHeightInput = document.createElement("input");
        floorHeightInput.setAttribute("type", "number");
        floorHeightInput.setAttribute("step", "any");
        floorHeightInput.setAttribute("id", "floorHeightInput");

        var tankLabel = document.createElement("label");
        tankLabel.setAttribute("for", "tankLabel");
        tankLabel.textContent = "Kazan ile zemin arasındaki yükseklik (m)";

        var tankInput = document.createElement("input");
        tankInput.setAttribute("type", "number");
        tankInput.setAttribute("step", "any");
        tankInput.setAttribute("id", "tankInput");

        buildingContainer.appendChild(floorLabel);
        buildingContainer.appendChild(floorInput);
        buildingContainer.appendChild(document.createElement("hr"));
        buildingContainer.appendChild(floorHeightLabel);
        buildingContainer.appendChild(floorHeightInput);
        buildingContainer.appendChild(document.createElement("hr"));
        buildingContainer.appendChild(tankLabel);
        buildingContainer.appendChild(tankInput);
        buildingContainer.appendChild(document.createElement("hr"));

    }
    else {
        buildingContainer.innerHTML = `
    <label>Çatı ile kazan arasındaki kot farkını metre cinsinden giriniz.</label>
    <input type="number" step="any" id="buildingHeight">
    <hr>`
    }
});


button.addEventListener("click", function () {
    var resultBox = document.getElementById("resultInput");
    var n = calculateN(t1Input.value, t2Input.value);
    var Va = calculateVa();
    var Ve = calculateVe(Va, n);
    if (buildingCheckbox.checked) {
        var floorInput = document.getElementById("floorInput").value;
        var floorHeightInput = document.getElementById("floorHeightInput").value;
        var tankInput = document.getElementById("tankInput").value;
        height = calculateHeight(parseFloat(floorInput), parseFloat(floorHeightInput), parseFloat(tankInput));
    }
    else {
        height = document.getElementById("buildingHeight").value;
    }
    var Po = calculatePo(height);
    var Pe = calculatePe(Math.ceil(ventile.value));
    var Df = calculateDf(Po, Pe);
    var Vn = calculateVn(Ve, Df);
    resultBox.value = Vn;

    var oldResultText = document.getElementById("resultText");
    if (oldResultText) {
        oldResultText.previousSibling?.remove(); // <br> varsa onu da sil
        oldResultText.remove();
    }
    
    var br = document.createElement("br");
    var resultText = document.createElement("label");
    resultText.setAttribute("id", "resultText");
    resultText.style.color = "green";
    printResult(resultText, Vn, ventile.value);
    resultBox.insertAdjacentElement("afterend", br);
    br.insertAdjacentElement("afterend", resultText);
});

cleanButton1.addEventListener("click", function () {
    if (!checkbox.checked) {
        document.getElementById("qkInput").value = "";
        document.getElementById("qK-select").value = "KCAL";
        document.getElementById("fElements-select").value = "Konyektor";
    }
    else {
        document.getElementById("vAInput").value = "";
    }
    document.getElementById("t1-select").value = "0";
    document.getElementById("t2-select").value = "0";
    if (!buildingCheckbox.checked) {
        document.getElementById("buildingHeight").value = "";
    }
    else {
        document.getElementById("floorInput").value = "";
        document.getElementById("floorHeightInput").value = "";
        document.getElementById("tankInput").value = "";
    }
    document.getElementById("ventileInput").value = "";
    document.getElementById("resultText").value = "";
});

