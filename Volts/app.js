document.addEventListener("DOMContentLoaded", function () {
    var radios = document.getElementsByName("currentType");
    var radioContainer = document.getElementById("radioContainer");
    var calculateButton = document.getElementById("calculateButton");
    var clearButton = document.getElementById("clearButton");
    radios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            if (radio.value == 'AC') {
                radioContainer.innerHTML = '';
                radioContainer.innerHTML = `<div style="margin-top: 10px;">
            <label>Güç Faktörü: </label>
            <input type="number" id="powerFactor" step="any">
        </div>
        <div style="margin-top: 10px;">
            <label>Gerilim Farkı (Voltaj)</label>
            <input type="number" id="voltage" step="any">
        </div>
        <div style="margin-top: 10px;">
            <label>Akım/Amper</label>
            <input type="number" id="current" step="any">
        </div>
        <div style="margin-top: 10px;">
            <label>Güç/Watt</label>
            <input type="number" id="power" step="any">
        </div>`
            }
            else if (radio.value == 'DC') {
                radioContainer.innerHTML = '';
                radioContainer.innerHTML = `<div style="margin-top: 10px;">
            <label>Gerilim Farkı (Voltaj)</label>
            <input type="number" id="voltage" step="any">
        </div>
        <div style="margin-top: 10px;">
            <label>Akım/Amper</label>
            <input type="number" id="current" step="any">
        </div>
        <div style="margin-top: 10px;">
            <label>Güç/Watt</label>
            <input type="number" id="power" step="any">
        </div>`;
            }
        });
    });
    calculateButton.addEventListener("click", function () {
        var selectedType = document.querySelector('input[name="currentType"]:checked').value;
        var voltage = document.getElementById("voltage");
        var current = document.getElementById("current");
        var power = document.getElementById("power");
        var powerFactor = selectedType === 'AC' ? parseFloat(document.getElementById("powerFactor").value) : 1; // Default to 1 for DC
        if (selectedType == 'AC') {
            var calculatedPower = parseFloat(voltage.value) * parseFloat(current.value) * powerFactor;
            var calculatedVoltage = parseFloat(power.value) / (parseFloat(current.value) * powerFactor);
            var calculatedCurrent = parseFloat(power.value) / (parseFloat(voltage.value) * powerFactor);
            var calculatedPowerFactor = parseFloat(power.value) / (parseFloat(voltage.value) * parseFloat(current.value));
            if (voltage.value == '') {
                voltage.value = calculatedVoltage.toFixed(2);
            }
            else if (isNaN(powerFactor)) {
                document.getElementById("powerFactor").value = calculatedPowerFactor.toFixed(2);
            }
            else if (current.value == '') {
                current.value = calculatedCurrent.toFixed(2);
            }
            else if (power.value == '') {
                power.value = calculatedPower.toFixed(2);
            }
            else {
                alert("Eksik veya fazla alan doldurdunuz. Lütfen kontrol ediniz. Sadece bir alan boş bırakılabilir.");
            }
        } else if (selectedType == 'DC') {
            var calculatedPower = parseFloat(voltage.value) * parseFloat(current.value) * powerFactor;
            var calculatedVoltage = parseFloat(power.value) / (parseFloat(current.value) * powerFactor);
            var calculatedCurrent = parseFloat(power.value) / (parseFloat(voltage.value) * powerFactor);
            if (voltage.value == '') {
                voltage.value = calculatedVoltage.toFixed(2);
            }
            else if (current.value == '') {
                current.value = calculatedCurrent.toFixed(2);
            }
            else if (power.value == '') {
                power.value = calculatedPower.toFixed(2);
            }
            else {
                alert("Eksik veya fazla alan doldurdunuz. Lütfen kontrol ediniz. Sadece bir alan boş bırakılabilir.");
            }
        }
    });
    clearButton.addEventListener("click", function () {
        if (document.getElementById("powerFactor") == null) {
            var voltage = document.getElementById("voltage");
            var current = document.getElementById("current");
            var power = document.getElementById("power");
            voltage.value = '';
            current.value = '';
            power.value = '';
        }
        else {
            var voltage = document.getElementById("voltage");
            var current = document.getElementById("current");
            var power = document.getElementById("power");
            var powerFactor = document.getElementById("powerFactor");
            powerFactor.value = '';
            voltage.value = '';
            current.value = '';
            power.value = '';
        }
       

    });

});