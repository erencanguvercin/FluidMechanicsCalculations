document.addEventListener("DOMContentLoaded", function () {
    var pressure = document.getElementById("pressure");
    var pressure_select = document.getElementById("pressure-select");
    var flow = document.getElementById("flow");
    var flow_select = document.getElementById("flow-select");
    var efficiency = document.getElementById("efficiency");
    var power = document.getElementById("power");
    var power_select = document.getElementById("power-select");
    var liquid_fluid = document.getElementById("liquid-fluid-select");
    var specific_gravity = document.getElementById("specific-gravity");
    var calculateButton = document.getElementById("calculateButton");
    var clearButton = document.getElementById("clearButton");
    function disableInput(id) {
        var element = id;
        if (element) {
            element.disabled = true;
        }
    }

    function nondisableInput(id) {
        var element = id;
        if (element) {
            element.disabled = false;
        }
    }
    function dropdownCheck() {
        if (liquid_fluid.value === "Water") {
            specific_gravity.value = 1;
            disableInput(specific_gravity);
        }
        else if (liquid_fluid.value === "SaltWater") {
            specific_gravity.value = 1.022;
            disableInput(specific_gravity);
        }
        else {
            specific_gravity.value = "";
            nondisableInput(specific_gravity);
        }
    }
    function calculatePressure(power, efficiency, flow) {
        return (power * efficiency * 1000) / flow;
    }
    function calculateFlow(power, efficiency, pressure) {
        return (power * efficiency * 1000) / pressure;
    }
    function calculateEfficiency(power, pressure, flow) {
        return ((pressure * flow) / 1000) / power;
    }
    function calculatePower(pressure, efficiency, flow) {
        return ((pressure * flow) / 1000) / (efficiency / 100);
    }
    function convertToM3Sec(value, unit) {
        switch (unit) {
            case 'GPM':
                return value / 15850.3231;
            case 'LSEC':
                return value / 1000;
            case 'LMIN':
                return value / 60000;
            case 'M3HR':
                return value / 3600;
            case 'M3SEC':
                return value;
            case 'M3DAY':
                return value / 86400;
        }
    }
    function convertToOtherFlow(value, unit) {
        switch (unit) {
            case 'GPM':
                return value / 0.00006309;
            case 'LSEC':
                return value / 0.001;
            case 'LMIN':
                return value / 0.00001667;
            case 'M3HR':
                return value / 0.00027778;
            case 'M3SEC':
                return value;
            case 'M3DAY':
                return value / 0.00001157;
        }
    }
    function convertToPascal(value, targetUnit) {
        switch (targetUnit) {
            case 'PSI':
                return value * 6894.76;
            case 'KPA':
                return value * 1000;
            case 'HEADFT':
                return value * 2989.07;
            case 'HEADM':
                return value * 9810;
            case 'BAR':
                return value * 100000;
            default:
                return value;
        }
    }
    function convertToOtherPressure(value, targetUnit) {
        switch (targetUnit) {
            case 'PSI':
                return value / 6894.76;
            case 'KPA':
                return value / 1000;
            case 'HEADFT':
                return value / 2989.07;
            case 'HEADM':
                return value / 9810;
            case 'BAR':
                return value / 100000;
            default:
                return value;
        }
    }
    function convertToKW(value, targetUnit) {
        switch (targetUnit) {
            case 'HP':
                return value * 0.7457;
            case 'KW':
                return value;
            case 'W':
                return value * 1000;
            case 'MW':
                return value * 100000;
            default:
                return value;
        }
    }
    function convertToOtherPower(value, targetUnit) {
        switch (targetUnit) {
            case 'HP':
                return value / 0.7457;
            case 'KW':
                return value;
            case 'W':
                return value / 1000;
            case 'MW':
                return value / 100000;
            default:
                return value;
        }
    }
    dropdownCheck();
    liquid_fluid.addEventListener("change", dropdownCheck);
     var image_power = document.createElement("div");
        image_power.style.position = 'absolute';
        image_power.style.top = '65px';
        image_power.style.left = '220px';
    var image_knownPoint = document.createElement("div");
        image_knownPoint.style.position = 'absolute';
        image_knownPoint.style.top = '60px';
        image_knownPoint.style.left = '350px';
    var imageEfficiency = document.createElement("div");
        imageEfficiency.style.position = 'absolute';
        imageEfficiency.style.top = '120px';
        imageEfficiency.style.left = '490px';
    calculateButton.addEventListener("click", function () {
        if (pressure.value == "") {
            pressure.value = ((convertToOtherPressure(calculatePressure(convertToKW(power.value, power_select.value), parseFloat(efficiency.value), convertToM3Sec(flow.value, flow_select.value)), pressure_select.value) / 100).toFixed(2)) / specific_gravity.value;
        }
        else if (flow.value == "") {
            flow.value = ((convertToOtherFlow(calculateFlow(convertToKW(power.value, power_select.value), parseFloat(efficiency.value), convertToPascal(pressure.value, pressure_select.value)), flow_select.value) / 100).toFixed(2)) / specific_gravity.value;
        }
        else if (efficiency.value == "") {
            efficiency.value = ((calculateEfficiency(convertToKW(power.value, power_select.value), convertToPascal(pressure.value, pressure_select.value), convertToM3Sec(flow.value, flow_select.value)) * 100).toFixed(2)) * specific_gravity.value;
        }
        else if (power.value == "") {
            power.value = (convertToOtherPower(calculatePower(convertToPascal(pressure.value, pressure_select.value), parseFloat(efficiency.value), convertToM3Sec(flow.value, flow_select.value)), power_select.value).toFixed(2)) * specific_gravity.value;
        }
        else {
            alert("Lütfen sadece bir alanı boş bırakın.");
        }
        var imageContainer = document.getElementById("image-container");

       
        image_power.textContent = parseFloat(power.value).toFixed(2) + " " + power_select.value;

        
        image_knownPoint.textContent = parseFloat(pressure.value).toFixed(2) + " " + pressure_select.options[pressure_select.selectedIndex].textContent + " / " + parseFloat(flow.value).toFixed(2) + " " + flow_select.options[flow_select.selectedIndex].textContent;


        
        imageEfficiency.textContent = parseFloat(efficiency.value).toFixed(2) + " %";
        if (!imageContainer.contains(image_power)) {
            imageContainer.appendChild(image_power);
        }
        if (!imageContainer.contains(image_knownPoint)) {
            imageContainer.appendChild(image_knownPoint);
        }
        if (!imageContainer.contains(imageEfficiency)) {
            imageContainer.appendChild(imageEfficiency);
        }

    });

    clearButton.addEventListener("click", function () {
        pressure.value = "";
        flow.value = "";
        efficiency.value = "";
        power.value = "";
        image_power.textContent = "";
        image_knownPoint.textContent = "";
        imageEfficiency.textContent = "";
    });
});