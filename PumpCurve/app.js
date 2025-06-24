document.addEventListener('DOMContentLoaded', function () {
    var calculateButton = document.getElementById('calculateButton');
    var clearButton = document.getElementById('clearButton');
    var pressureSelect = document.getElementById('pressure-select');
    var flowSelect = document.getElementById('flow-select');
    var speedSelect = document.getElementById('speed-select');
    var pressureSelect2 = document.getElementById('pressure-select2');
    var flowSelect2 = document.getElementById('flow-select2');
    var speedSelect2 = document.getElementById('speed-select2');
    var pressure2 = document.getElementById('pressure2');
    var flow2 = document.getElementById('flow2');
    var speed2 = document.getElementById('speed2');
    var inputs = [pressure2, flow2, speed2];
    pressureSelect.addEventListener('change', function () {
        var pressureSelectValue = this.value;
        pressureSelect2.value = pressureSelectValue;
    });
    flowSelect.addEventListener('change', function () {
        var flowSelectValue = this.value;
        flowSelect2.value = flowSelectValue;
    });
    speedSelect.addEventListener('change', function () {
        var speedSelectValue = this.value;
        speedSelect2.value = speedSelectValue;
    });
    inputs.forEach((input, pressure, flow, speed) => {
        pressure = document.getElementById('pressure');
        flow = document.getElementById('flow');
        speed = document.getElementById('speed');
        input.addEventListener("input", () => {
            if (input.value === "") {
                inputs.forEach(inp => inp.value = "");
                return;
            }
            if (!isNaN(input.value)) {
                switch (input.id) {
                    case "pressure2":
                        speed2.value = speed.value / (Math.sqrt((pressure.value / input.value)));
                        flow2.value = flow.value / (speed.value / speed2.value);
                        break;
                    case "flow2":
                        speed2.value = speed.value / (flow.value / input.value);
                        pressure2.value = pressure.value / Math.pow((speed.value / speed2.value), 2);
                        break;
                    case "speed2":
                        flow2.value = flow.value / (speed.value / input.value);
                        pressure2.value = pressure.value / Math.pow((speed.value / input.value), 2);
                        break;
                }
            }
        });
    });
    var liquid_fluid = document.getElementById('liquid-select');
    var liquid_fluid_specific_gravity = document.getElementById('specific-gravity');
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
            liquid_fluid_specific_gravity.value = 1;
            disableInput(liquid_fluid_specific_gravity);
        }
        else if (liquid_fluid.value === "SaltWater") {
            liquid_fluid_specific_gravity.value = 1.022;
            disableInput(liquid_fluid_specific_gravity);
        }
        else {
            liquid_fluid_specific_gravity.value = "";
            nondisableInput(liquid_fluid_specific_gravity);
        }
    }
    function convertToBHP(value) {
        return value * 1.341022;
    }
    dropdownCheck();
    liquid_fluid.addEventListener("change", dropdownCheck);



    var image_power1 = document.createElement('div');
    image_power1.style.position = 'absolute';
    image_power1.style.top = '90px';
    image_power1.style.left = '260px';

    var image_power2 = document.createElement('div');
    image_power2.style.position = 'absolute';
    image_power2.style.top = '90px';
    image_power2.style.left = '100px';

    var knownPoint = document.createElement('div');
    knownPoint.style.position = 'absolute';
    knownPoint.style.top = '65px';
    knownPoint.style.left = '420px';

    var adjustedPoint = document.createElement('div');
    adjustedPoint.style.position = 'absolute';
    adjustedPoint.style.top = '405px';
    adjustedPoint.style.left = '375px';

    var imageSpeed= document.createElement('div');
    imageSpeed.style.position = 'absolute';
    imageSpeed.style.top = '160px';
    imageSpeed.style.left = '70px';

    var imageSpeed2= document.createElement('div');
    imageSpeed2.style.position = 'absolute';
    imageSpeed2.style.top = '235px';
    imageSpeed2.style.left = '70px';

    var imageEfficiency = document.createElement('div');
    imageEfficiency.style.position = 'absolute';
    imageEfficiency.style.top = '130px';
    imageEfficiency.style.left = '600px';
    calculateButton.addEventListener('click', function () {
        var flow = document.getElementById('flow');
        var speed = document.getElementById('speed');
        var flowSelect = document.getElementById('flow-select');
        var speedSelect = document.getElementById('speed-select');
        var pressureSelect = document.getElementById('pressure-select');
        var pressure = document.getElementById('pressure');
        var flow2 = document.getElementById('flow2');
        var pressure2 = document.getElementById('pressure2');
        var speed2 = document.getElementById('speed2');
        var flowSelect2 = document.getElementById('flow-select2');
        var speedSelect2 = document.getElementById('speed-select2');
        var pressureSelect2 = document.getElementById('pressure-select2');
        var specific_gravity = document.getElementById('specific-gravity');
        var efficiency = document.getElementById('efficiency');

        var power1 = (flow.value * pressure.value * specific_gravity.value) / (367 * (efficiency.value / 100));
        var power2 = (flow2.value * pressure2.value * specific_gravity.value) / (367 * (efficiency.value / 100));
        var power1BHP = convertToBHP(power1);
        var power2BHP = convertToBHP(power2);
        var imageContainer = document.getElementById('image-container');


        image_power1.textContent = power1.toFixed(2) + " kW (" + power1BHP.toFixed(2) + " BHP)";
        image_power2.textContent = power2.toFixed(2) + " kW (" + power2BHP.toFixed(2) + " BHP)";
        knownPoint.textContent = parseFloat(pressure.value).toFixed(2) + " " + pressureSelect.value + " / " + parseFloat(flow.value).toFixed(2) + " " + flowSelect.value;
        adjustedPoint.textContent = parseFloat(pressure2.value).toFixed(2) + " " + pressureSelect2.value + " / " + parseFloat(flow2.value).toFixed(2) + " " + flowSelect2.value;
        imageSpeed.textContent = parseFloat(speed.value).toFixed(2) + " " + speedSelect.value;
        imageSpeed2.textContent = parseFloat(speed2.value).toFixed(2) + " " + speedSelect2.value;
        imageEfficiency.textContent = parseFloat(efficiency.value).toFixed(2) + " %";

        if (!imageContainer.contains(image_power1)) {
            imageContainer.appendChild(image_power1);
        }
        if (!imageContainer.contains(image_power2)) {
            imageContainer.appendChild(image_power2);
        }
        if (!imageContainer.contains(knownPoint)) {
            imageContainer.appendChild(knownPoint);
        }
        if (!imageContainer.contains(adjustedPoint)) {
            imageContainer.appendChild(adjustedPoint);
        }
        if (!imageContainer.contains(imageSpeed)) {
            imageContainer.appendChild(imageSpeed);
        }
        if (!imageContainer.contains(imageSpeed2)) {
            imageContainer.appendChild(imageSpeed2);
        }
        if (!imageContainer.contains(imageEfficiency)) {
            imageContainer.appendChild(imageEfficiency);
        }
    });
    clearButton.addEventListener('click', function () {
        var flow = document.getElementById('flow');
        var speed = document.getElementById('speed');
        var pressure = document.getElementById('pressure');
        var flow2 = document.getElementById('flow2');
        var speed2 = document.getElementById('speed2');
        var pressure2 = document.getElementById('pressure2');
        var specific_gravity = document.getElementById('specific-gravity');
        var efficiency = document.getElementById('efficiency');
        var imageContainer = document.getElementById('image-container');
        var fluid = document.getElementById('liquid-select');

        flow.value = "";
        speed.value = "";
        pressure.value = "";
        flow2.value = "";
        speed2.value = "";
        pressure2.value = "";
        specific_gravity.value = "";
        efficiency.value = "";
        fluid.value = "Custom";
        imageContainer.removeChild(image_power1);
        imageContainer.removeChild(image_power2);
        imageContainer.removeChild(knownPoint);
        imageContainer.removeChild(adjustedPoint);
        imageContainer.removeChild(imageSpeed);
        imageContainer.removeChild(imageSpeed2);
        imageContainer.removeChild(imageEfficiency);
        inputs.forEach(input => {
            input.value = "";
        });
    });
});