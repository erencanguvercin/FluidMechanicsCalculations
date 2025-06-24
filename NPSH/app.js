document.addEventListener("DOMContentLoaded", function () {
    var fluidSelect = document.getElementById("liquid-fluid-select");
    var temperatureSelect = document.getElementById("temperature-select");
    var radioContainer = document.getElementById("radio-container");
    var radios = document.getElementsByName("pumpType");
    var viscosity = document.getElementById("viscosity");
    var viscositySelect = document.getElementById("viscosity-type");
    var specificGravity = document.getElementById("specific-gravity");
    var vaporPressure = document.getElementById("vapor-pressure");
    var vaporPressureSelect = document.getElementById("vapor-pressure-select");
    var pipe_material = document.getElementById("pipe-material-select");
    var frictionCoeff = document.getElementById("hzFriction");
    var roughnessHeight = document.getElementById("roughnessHeight");
    var roughnessHeight_select = document.getElementById("roughnessHeight-select");
    var altitude_select = document.getElementById("altitude-select");
    var specificGravity = document.getElementById("specific-gravity");
    var temperatureSelect = document.getElementById("temperature-select");
    var calculateButton = document.getElementById("calculate_btn");
    var clearButton = document.getElementById("clearButton");
    var fittingType1_select = document.getElementById("fitting-type-select1");
    var fittingType2_select = document.getElementById("fitting-type-select2");
    var fittingType3_select = document.getElementById("fitting-type-select3");
    var fittingType4_select = document.getElementById("fitting-type-select4");
    var fittingType5_select = document.getElementById("fitting-type-select5");
    var quantity1 = document.getElementById("quantity1");
    var quantity2 = document.getElementById("quantity2");
    var quantity3 = document.getElementById("quantity3");
    var quantity4 = document.getElementById("quantity4");
    var quantity5 = document.getElementById("quantity5");
    var pipeLength = document.getElementById("pipe-length");
    var pipeLength_select = document.getElementById("pipe-length-select");
    radios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            if (radio.checked) {
                if (radio.value === "Liquid") {
                    // Liquid seçildiğinde yapılacaklar
                    radioContainer.innerHTML = "";
                    radioContainer.innerHTML = `<div>
            <label>Tank sıvı seviyesi pompanın merkez hattının üstünde veya altında</label>
        </div>
        <div>
            <input type="number" step="any" id="tank-level">
            <select id="tank-level-select">
                <option value="Feet">Feet</option>
                <option value="Inches">İnç</option>
                <option value="Meters">Metre</option>
                <option value="Millimeters">Milimetre</option>
                <option value="Centimeters">Santimetre</option>
            </select>
        </div>`;
                } else if (radio.value === "Gas") {
                    // Gas seçildiğinde yapılacaklar
                    radioContainer.innerHTML = "";
                    radioContainer.innerHTML = `<div>
           <div><label>Emiş besleme borularına girmeden önce sıvı kaynağındaki ölçüm basıncı.</label></div>
           <div><label style="color: red;">(Not: Bu, ölçüm basıncı olarak girilmelidir ve atmosfer basıncını içermemelidir.)</label></div>
        </div>
        <div>
            <input type="number" step="any" id="gauge-pressure">
            <select id="gauge-pressure-select">
                <option value="PSI">PSI</option>
                <option value="KPA">KPa</option>
                <option value="BAR">Bar</option>
            </select>
        </div>`;
                }
            }
        });
    });
    var fluidOptions = {
        "Water": ["0", "20", "50", "90"],
        "SaltWater": ["0", "20", "50", "90"],
        "EthyleneGlycol": ["20", "30"],
        "ProphyleneGlycol": ["20"]
    };
    fluidSelect.addEventListener("change", function () {
        var selected = fluidSelect.value;

        // 🔁 Sıcaklık seçeneklerini temizle ve yenilerini ekle
        temperatureSelect.innerHTML = "";
        var defaultOption = document.createElement("option");
        defaultOption.textContent = "Lütfen sıcaklığı seçiniz";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.value = "";
        temperatureSelect.appendChild(defaultOption);
        if (!fluidOptions[selected]) return;
        fluidOptions[selected].forEach(function (temp) {
            const option = document.createElement("option");
            option.value = temp;
            option.textContent = temp + "°C";
            temperatureSelect.appendChild(option);
        });

        // 🔁 Diğer değerleri sıfırla
        viscosity.value = "";
        specificGravity.value = "";
        vaporPressure.value = "";
    });
    fluidSelect.dispatchEvent(new Event("change"));
    temperatureSelect.addEventListener("change", function () {
        if (fluidSelect.value && temperatureSelect.value) {
            dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
        }
        viscositySelect.addEventListener("change", function () {
            if (!fluidSelect.value || !temperatureSelect.value) return;

            dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
        });

        vaporPressureSelect.addEventListener("change", function () {
            if (!fluidSelect.value || !temperatureSelect.value) return;

            dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
        });
    });
    viscositySelect.addEventListener("change", function () {
        if (!fluidSelect.value || !temperatureSelect.value) return;

        dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
    });

    vaporPressureSelect.addEventListener("change", function () {
        if (!fluidSelect.value || !temperatureSelect.value) return;

        dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
    });
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
    function dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect) {

        switch (fluidSelect.value) {
            case "Water":
                switch (temperatureSelect.value) {
                    case "0":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 1.788;
                                break;
                            case "KGM":
                                viscosity.value = 0.001788;
                                break;
                            case "GCM":
                                viscosity.value = 0.01788;
                                break;
                        }
                        specificGravity.value = 1;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.09;
                                break;
                            case "KPA":
                                vaporPressure.value = 0.6;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.2;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.06;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.01;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;

                        }
                        break;
                    case "20":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 0.999996;
                                break;
                            case "KGM":
                                viscosity.value = 0.000999996;
                                break;
                            case "GCM":
                                viscosity.value = 0.009999959999999999;
                                break;
                        }
                        specificGravity.value = 0.998;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.35;
                                break;
                            case "KPA":
                                vaporPressure.value = 2.4;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.8;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.25;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.02;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "50":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 0.54834;
                                break;
                            case "KGM":
                                viscosity.value = 0.00054834;
                                break;
                            case "GCM":
                                viscosity.value = 0.0054834;
                                break;
                        }
                        specificGravity.value = 0.988;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 1.78;
                                break;
                            case "KPA":
                                vaporPressure.value = 12.3;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 4.16;
                                break;
                            case "HEADM":
                                vaporPressure.value = 1.27;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.12;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "90":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 0.31555500000000003;
                                break;
                            case "KGM":
                                viscosity.value = 0.000315555;
                                break;
                            case "GCM":
                                viscosity.value = 0.00315555;
                                break;
                        }
                        specificGravity.value = 0.965;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 10.17;
                                break;
                            case "KPA":
                                vaporPressure.value = 70.1;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 24.3;
                                break;
                            case "HEADM":
                                vaporPressure.value = 7.41;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.7;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;

                }
                break;
            case "SaltWater":
                switch (temperatureSelect.value) {
                    case "0":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 1.823672;
                                break;
                            case "KGM":
                                viscosity.value = 0.001823672;
                                break;
                            case "GCM":
                                viscosity.value = 0.018236719999999998;
                                break;
                        }
                        specificGravity.value = 1.028;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.09;
                                break;
                            case "KPA":
                                vaporPressure.value = 0.6;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.2;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.06;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.01;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "20":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 1.0701;
                                break;
                            case "KGM":
                                viscosity.value = 0.0010701;
                                break;
                            case "GCM":
                                viscosity.value = 0.010701;
                                break;
                        }
                        specificGravity.value = 1.025;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.35;
                                break;
                            case "KPA":
                                vaporPressure.value = 2.4;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.78;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.24;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.02;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "50":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 0.54404;
                                break;
                            case "KGM":
                                viscosity.value = 0.00054404;
                                break;
                            case "GCM":
                                viscosity.value = 0.0054404;
                                break;
                        }
                        specificGravity.value = 1.015;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 1.78;
                                break;
                            case "KPA":
                                vaporPressure.value = 12.3;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 4.05;
                                break;
                            case "HEADM":
                                vaporPressure.value = 1.24;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.12;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "90":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 0.262615;
                                break;
                            case "KGM":
                                viscosity.value = 0.000262615;
                                break;
                            case "GCM":
                                viscosity.value = 0.00262615;
                                break;
                        }
                        specificGravity.value = 0.991;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 10.17;
                                break;
                            case "KPA":
                                vaporPressure.value = 70.1;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 23.67;
                                break;
                            case "HEADM":
                                vaporPressure.value = 7.21;
                                break;
                            case "BAR":
                                vaporPressure.value = 0.7;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;

                }
                break;
            case "EthyleneGlycol":
                switch (temperatureSelect.value) {
                    case "20":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 20.016;
                                break;
                            case "KGM":
                                viscosity.value = 0.020016;
                                break;
                            case "GCM":
                                viscosity.value = 0.20016;
                                break;
                        }
                        specificGravity.value = 1.112;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.07;
                                break;
                            case "KPA":
                                vaporPressure.value = 0.5;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.15;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.05;
                                break;
                            case "BAR":
                                vaporPressure.value = 0;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;
                    case "30":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 18.216;
                                break;
                            case "KGM":
                                viscosity.value = 0.018216;
                                break;
                            case "GCM":
                                viscosity.value = 0.18216;
                                break;
                        }
                        specificGravity.value = 1.104;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0.07;
                                break;
                            case "KPA":
                                vaporPressure.value = 0.5;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0.15;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0.05;
                                break;
                            case "BAR":
                                vaporPressure.value = 0;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;


                }
                break;
            case "ProphyleneGlycol":
                switch (temperatureSelect.value) {
                    case "20":
                        switch (viscositySelect.value) {
                            case "CENTIPOISE_CP":
                                viscosity.value = 56.052;
                                break;
                            case "KGM":
                                viscosity.value = 0.056052;
                                break;
                            case "GCM":
                                viscosity.value = 0.56052;
                                break;
                        }
                        specificGravity.value = 1.038;
                        switch (vaporPressureSelect.value) {
                            case "PSI":
                                vaporPressure.value = 0;
                                break;
                            case "KPA":
                                vaporPressure.value = 0;
                                break;
                            case "HEADFT":
                                vaporPressure.value = 0;
                                break;
                            case "HEADM":
                                vaporPressure.value = 0;
                                break;
                            case "BAR":
                                vaporPressure.value = 0;
                                break;
                            case "CMHG":
                                vaporPressure.value = 0;
                                break;
                            case "MMHG":
                                vaporPressure.value = 0;
                                break;
                        }
                        break;



                }
                break;
        }

    }
    function frictionDropdownCheck() {
        switch (pipe_material.value) {
            case "CustomPipeMaterial":
                nondisableInput(frictionCoeff);
                nondisableInput(roughnessHeight);
                frictionCoeff.value = "";
                roughnessHeight.value = "";
                break;
            case "ABS":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.000022965879265091865;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.000007000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.00027559055118110237;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.0007;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.007;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Aluminum":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.000006561679790026247;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.0000020000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00007874015748031497;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00020000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.0020000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "AsbestosCement":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.01968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.05;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "AsphaltLining":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0003937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00012;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.004724409448818898;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.012;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.12;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Brass":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00003280839895013123;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00039370078740157485;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "BrickSewer":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00984251968503937;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.11811023622047245;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.30000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 3.0000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CANew":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.000984251968503937;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.00030000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.011811023622047246;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.030000000000000006;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.30000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CA10":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 113;
                        roughnessHeight.value = 0.0016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 113;
                        roughnessHeight.value = 0.0005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 113;
                        roughnessHeight.value = 0.01968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 113;
                        roughnessHeight.value = 0.05;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 113;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CA20":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.004101049868766404;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00125;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.04921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.125;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 1.25;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CA30":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 90;
                        roughnessHeight.value = 0.004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 90;
                        roughnessHeight.value = 0.0015;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 90;
                        roughnessHeight.value = 0.05905511811023623;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 90;
                        roughnessHeight.value = 0.15000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 90;
                        roughnessHeight.value = 1.5000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CA40":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 83;
                        roughnessHeight.value = 0.005741469816272966;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 83;
                        roughnessHeight.value = 0.00175;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 83;
                        roughnessHeight.value = 0.0688976377952756;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 83;
                        roughnessHeight.value = 0.17500000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 83;
                        roughnessHeight.value = 1.7500000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CAAsphalt":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00015000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.005905511811023623;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.015000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.15000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CACement":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0032808398950131233;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.03937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CABituminous":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0032808398950131233;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.03937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CASea":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0024606299212598425;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.00075;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.029527559055118113;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.07500000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.7500000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CAWroughtPlain":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00014763779527559055;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.000045;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0017716535433070868;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0045000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.045000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CementLining":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0015;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.05905511811023623;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.15000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 1.5000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Concrete":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.01968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.05;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "ConSteel":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0006561679790026247;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.007874015748031496;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.02;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.2;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "ConWood":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.000984251968503937;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.00030000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.011811023622047246;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.030000000000000006;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.30000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "ConOld":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.0026246719160104987;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.0008;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.031496062992125984;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.08;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.8;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Copper":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0000015;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00005905511811023622;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00015000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0015;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "CorrugatedMetalPipe":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 0.14763779527559054;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 0.045;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 1.7716535433070866;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 4.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 45;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "DuctileIronPipe":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0003937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00012;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.004724409448818898;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.012;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.12;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "DucCement":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0015;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.05905511811023623;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.15000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 1.5000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Fiber":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0032808398950131233;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.03937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "FiberGlassPipe":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.0006561679790026247;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.0002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.007874015748031496;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.02;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.2;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "FireHose":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 135;
                        roughnessHeight.value = 0.0032808398950131233;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 135;
                        roughnessHeight.value = 0.001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 135;
                        roughnessHeight.value = 0.03937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 135;
                        roughnessHeight.value = 0.1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 135;
                        roughnessHeight.value = 1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "GalvanizedIron":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0004921259842519685;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.00015000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.005905511811023623;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.015000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.15000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Glass":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.00003280839895013123;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.00001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.00039370078740157485;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.0010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Lead":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000006561679790026247;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0000020000000000000003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00007874015748031497;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00020000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0020000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "MetalPipesSmooth":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0002952755905511811;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00009;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0035433070866141736;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.009000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.09000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Plastic":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00003280839895013123;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00039370078740157485;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.0010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.010000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Polyethylene":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000022965879265091865;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000007000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0002755905511811024;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0007000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.007000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "PVC":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000022965879265091865;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.000007000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0002755905511811024;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0007000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.007000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "RustedSteel":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.00984251968503937;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.003;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.11811023622047245;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.30000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 3.0000000000000004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelEmabel":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.013123359580052493;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.004;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.15748031496062992;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.4;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 4;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelForms":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0026246719160104987;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.0008;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.031496062992125984;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.08;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 140;
                        roughnessHeight.value = 0.8;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelNewUnlined":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.00005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.001968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 150;
                        roughnessHeight.value = 0.05;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelCorrugated":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 0.14763779527559054;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 0.045;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 1.7716535433070866;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 4.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 60;
                        roughnessHeight.value = 45;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelWelded":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.000013123359580052494;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.000004000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00015748031496062994;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0004000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.004000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelInterior":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.1968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelInteriorNoProjection":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.1968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelProjectingGirth":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.02952755905511811;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.009000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.35433070866141736;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.9000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 9.000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "SteelVitrified":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.016404199475065617;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.1968503937007874;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 5;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "Tin":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.0032808398950131233;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.03937007874015748;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 1;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "VitrifiedClay":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.006561679790026246;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.0019999999999999996;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.07874015748031495;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 0.19999999999999996;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 110;
                        roughnessHeight.value = 1.9999999999999996;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "WroughtIronPlain":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.00014763779527559055;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.000045;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0017716535433070868;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.0045000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 100;
                        roughnessHeight.value = 0.045000000000000005;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "WoodWellPlanned":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.002952755905511811;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.0009000000000000001;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.03543307086614174;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.09000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.9000000000000002;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
            case "WoodenMasonry":
                switch (roughnessHeight_select.value) {
                    case "Feet":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0026246719160104987;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Meters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.0008;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Inches":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.031496062992125984;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Centimeters":
                        frictionCoeff.value = 120;
                        roughnessHeight.value = 0.08;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                    case "Millimeters":
                        frictionCoeff.value = 130;
                        roughnessHeight.value = 0.8;
                        disableInput(frictionCoeff);
                        disableInput(roughnessHeight);
                        break;
                }
                break;
        }
    }
    frictionDropdownCheck();
    pipe_material.addEventListener("change", frictionDropdownCheck);
    roughnessHeight_select.addEventListener("change", frictionDropdownCheck);
    function calculatePatm(height, altitudeSelect) {
        if (altitudeSelect == "FeetAbove") {
            height = height * 0.3048; // Convert feet to meters
        }
        var patm = 1.01325 * Math.exp(-0.0001184 * height);
        return patm;
    }
    function calculateDensity(SG, temp) {
        if (temp == 0) {
            return SG * 999.84; // Density in kg/m^3
        }
        else if (temp == 20) {
            return SG * 998.21; // Density in kg/m^3
        }
        else if (temp == 30) {
            return SG * 995.65; // Density in kg/m^3
        }
        else if (temp == 50) {
            return SG * 988.05; // Density in kg/m^3
        }
        else if (temp == 90) {
            return SG * 965.35; // Density in kg/m^3
        }
    }
    function calculateLEQ(pipeIdInches) {
        var LEQ = 0;
        switch (fittingType1_select.value) {
            case "Elbow90SR":
                LEQ += 30 * pipeIdInches * quantity1.value;
                break;
            case "Elbow90LR":
                LEQ += 20 * pipeIdInches * quantity1.value;
                break;
            case "Elbow903R":
                LEQ += 8 * pipeIdInches * quantity1.value;
                break;
            case "Elbow45SR":
                LEQ += 16 * pipeIdInches * quantity1.value;
                break;
            case "Elbow45LR":
                LEQ += 9.4 * pipeIdInches * quantity1.value;
                break;
            case "Elbow453R":
                LEQ += 5 * pipeIdInches * quantity1.value;
                break;
            case "TeeLineFlow":
                LEQ += 20 * pipeIdInches * quantity1.value;
                break;
            case "TeeBranchFlow":
                LEQ += 60 * pipeIdInches * quantity1.value;
                break;
            case "ValveGlobeFullOpen":
                LEQ += 340 * pipeIdInches * quantity1.value;
                break;
            case "ValveGateFullOpen":
                LEQ += 13 * pipeIdInches * quantity1.value;
                break;
            case "ValveAngleFullOpen":
                LEQ += 145 * pipeIdInches * quantity1.value;
                break;
            case "ValveBallFullPort":
                LEQ += 2.6 * pipeIdInches * quantity1.value;
                break;
            case "ValveBallReducedPort":
                LEQ += 25 * pipeIdInches * quantity1.value;
                break;
            case "ValveCheckSwing":
                LEQ += 135 * pipeIdInches * quantity1.value;
                break;
            case "ValveCheckClearWaySwing":
                LEQ += 50 * pipeIdInches * quantity1.value;
                break;
            case "ValveWaferDiskCheck":
                LEQ += 420 * pipeIdInches * quantity1.value;
                break;
            case "ValveButterflyFullOpen":
                LEQ += 20 * pipeIdInches * quantity1.value;
                break;
            case "StrainerY":
                LEQ += 250 * pipeIdInches * quantity1.value;
                break;
            case "StrainerBasket":
                LEQ += 90 * pipeIdInches * quantity1.value;
                break;
            default:
                break;

        }
        switch (fittingType2_select.value) {
            case "Elbow90SR":
                LEQ += 30 * pipeIdInches * quantity2.value;
                break;
            case "Elbow90LR":
                LEQ += 20 * pipeIdInches * quantity2.value;
                break;
            case "Elbow903R":
                LEQ += 8 * pipeIdInches * quantity2.value;
                break;
            case "Elbow45SR":
                LEQ += 16 * pipeIdInches * quantity2.value;
                break;
            case "Elbow45LR":
                LEQ += 9.4 * pipeIdInches * quantity2.value;
                break;
            case "Elbow453R":
                LEQ += 5 * pipeIdInches * quantity2.value;
                break;
            case "TeeLineFlow":
                LEQ += 20 * pipeIdInches * quantity2.value;
                break;
            case "TeeBranchFlow":
                LEQ += 60 * pipeIdInches * quantity2.value;
                break;
            case "ValveGlobeFullOpen":
                LEQ += 340 * pipeIdInches * quantity2.value;
                break;
            case "ValveGateFullOpen":
                LEQ += 13 * pipeIdInches * quantity2.value;
                break;
            case "ValveAngleFullOpen":
                LEQ += 145 * pipeIdInches * quantity2.value;
                break;
            case "ValveBallFullPort":
                LEQ += 2.6 * pipeIdInches * quantity2.value;
                break;
            case "ValveBallReducedPort":
                LEQ += 25 * pipeIdInches * quantity2.value;
                break;
            case "ValveCheckSwing":
                LEQ += 135 * pipeIdInches * quantity2.value;
                break;
            case "ValveCheckClearWaySwing":
                LEQ += 50 * pipeIdInches * quantity2.value;
                break;
            case "ValveWaferDiskCheck":
                LEQ += 420 * pipeIdInches * quantity2.value;
                break;
            case "ValveButterflyFullOpen":
                LEQ += 20 * pipeIdInches * quantity2.value;
                break;
            case "StrainerY":
                LEQ += 250 * pipeIdInches * quantity2.value;
                break;
            case "StrainerBasket":
                LEQ += 90 * pipeIdInches * quantity2.value;
                break;
            default:
                break;

        }
        switch (fittingType3_select.value) {
            case "Elbow90SR":
                LEQ += 30 * pipeIdInches * quantity3.value;
                break;
            case "Elbow90LR":
                LEQ += 20 * pipeIdInches * quantity3.value;
                break;
            case "Elbow903R":
                LEQ += 8 * pipeIdInches * quantity3.value;
                break;
            case "Elbow45SR":
                LEQ += 16 * pipeIdInches * quantity3.value;
                break;
            case "Elbow45LR":
                LEQ += 9.4 * pipeIdInches * quantity3.value;
                break;
            case "Elbow453R":
                LEQ += 5 * pipeIdInches * quantity3.value;
                break;
            case "TeeLineFlow":
                LEQ += 20 * pipeIdInches * quantity3.value;
                break;
            case "TeeBranchFlow":
                LEQ += 60 * pipeIdInches * quantity3.value;
                break;
            case "ValveGlobeFullOpen":
                LEQ += 340 * pipeIdInches * quantity3.value;
                break;
            case "ValveGateFullOpen":
                LEQ += 13 * pipeIdInches * quantity3.value;
                break;
            case "ValveAngleFullOpen":
                LEQ += 145 * pipeIdInches * quantity3.value;
                break;
            case "ValveBallFullPort":
                LEQ += 2.6 * pipeIdInches * quantity3.value;
                break;
            case "ValveBallReducedPort":
                LEQ += 25 * pipeIdInches * quantity3.value;
                break;
            case "ValveCheckSwing":
                LEQ += 135 * pipeIdInches * quantity3.value;
                break;
            case "ValveCheckClearWaySwing":
                LEQ += 50 * pipeIdInches * quantity3.value;
                break;
            case "ValveWaferDiskCheck":
                LEQ += 420 * pipeIdInches * quantity3.value;
                break;
            case "ValveButterflyFullOpen":
                LEQ += 20 * pipeIdInches * quantity3.value;
                break;
            case "StrainerY":
                LEQ += 250 * pipeIdInches * quantity3.value;
                break;
            case "StrainerBasket":
                LEQ += 90 * pipeIdInches * quantity3.value;
                break;
            default:
                break;

        }
        switch (fittingType4_select.value) {
            case "Elbow90SR":
                LEQ += 30 * pipeIdInches * quantity4.value;
                break;
            case "Elbow90LR":
                LEQ += 20 * pipeIdInches * quantity4.value;
                break;
            case "Elbow903R":
                LEQ += 8 * pipeIdInches * quantity4.value;
                break;
            case "Elbow45SR":
                LEQ += 16 * pipeIdInches * quantity4.value;
                break;
            case "Elbow45LR":
                LEQ += 9.4 * pipeIdInches * quantity4.value;
                break;
            case "Elbow453R":
                LEQ += 5 * pipeIdInches * quantity4.value;
                break;
            case "TeeLineFlow":
                LEQ += 20 * pipeIdInches * quantity4.value;
                break;
            case "TeeBranchFlow":
                LEQ += 60 * pipeIdInches * quantity4.value;
                break;
            case "ValveGlobeFullOpen":
                LEQ += 340 * pipeIdInches * quantity4.value;
                break;
            case "ValveGateFullOpen":
                LEQ += 13 * pipeIdInches * quantity4.value;
                break;
            case "ValveAngleFullOpen":
                LEQ += 145 * pipeIdInches * quantity4.value;
                break;
            case "ValveBallFullPort":
                LEQ += 2.6 * pipeIdInches * quantity4.value;
                break;
            case "ValveBallReducedPort":
                LEQ += 25 * pipeIdInches * quantity4.value;
                break;
            case "ValveCheckSwing":
                LEQ += 135 * pipeIdInches * quantity4.value;
                break;
            case "ValveCheckClearWaySwing":
                LEQ += 50 * pipeIdInches * quantity4.value;
                break;
            case "ValveWaferDiskCheck":
                LEQ += 420 * pipeIdInches * quantity4.value;
                break;
            case "ValveButterflyFullOpen":
                LEQ += 20 * pipeIdInches * quantity4.value;
                break;
            case "StrainerY":
                LEQ += 250 * pipeIdInches * quantity4.value;
                break;
            case "StrainerBasket":
                LEQ += 90 * pipeIdInches * quantity4.value;
                break;
            default:
                break;

        }
        switch (fittingType5_select.value) {
            case "Elbow90SR":
                LEQ += 30 * pipeIdInches * quantity5.value;
                break;
            case "Elbow90LR":
                LEQ += 20 * pipeIdInches * quantity5.value;
                break;
            case "Elbow903R":
                LEQ += 8 * pipeIdInches * quantity5.value;
                break;
            case "Elbow45SR":
                LEQ += 16 * pipeIdInches * quantity5.value;
                break;
            case "Elbow45LR":
                LEQ += 9.4 * pipeIdInches * quantity5.value;
                break;
            case "Elbow453R":
                LEQ += 5 * pipeIdInches * quantity5.value;
                break;
            case "TeeLineFlow":
                LEQ += 20 * pipeIdInches * quantity5.value;
                break;
            case "TeeBranchFlow":
                LEQ += 60 * pipeIdInches * quantity5.value;
                break;
            case "ValveGlobeFullOpen":
                LEQ += 340 * pipeIdInches * quantity5.value;
                break;
            case "ValveGateFullOpen":
                LEQ += 13 * pipeIdInches * quantity5.value;
                break;
            case "ValveAngleFullOpen":
                LEQ += 145 * pipeIdInches * quantity5.value;
                break;
            case "ValveBallFullPort":
                LEQ += 2.6 * pipeIdInches * quantity5.value;
                break;
            case "ValveBallReducedPort":
                LEQ += 25 * pipeIdInches * quantity5.value;
                break;
            case "ValveCheckSwing":
                LEQ += 135 * pipeIdInches * quantity5.value;
                break;
            case "ValveCheckClearWaySwing":
                LEQ += 50 * pipeIdInches * quantity5.value;
                break;
            case "ValveWaferDiskCheck":
                LEQ += 420 * pipeIdInches * quantity5.value;
                break;
            case "ValveButterflyFullOpen":
                LEQ += 20 * pipeIdInches * quantity5.value;
                break;
            case "StrainerY":
                LEQ += 250 * pipeIdInches * quantity5.value;
                break;
            case "StrainerBasket":
                LEQ += 90 * pipeIdInches * quantity5.value;
                break;
            default:
                break;

        }
        return LEQ;
    }
    function calculateLTOT(LEQ) {
        var LTOT = parseFloat(convertToFeet(pipeLength.value, pipeLength_select.value)) + LEQ;
        return LTOT;
    }
    function calculateHW(LTOT, flowrateGPM, pipeIdInches) {
        var HW = (10.495 * LTOT * Math.pow(flowrateGPM, 1.852)) / (Math.pow(frictionCoeff.value, 1.852) * Math.pow(pipeIdInches, 4.871));
        if (frictionCoeff.value == 0 || pipeIdInches == 0) {
            HW = 0;
        }
        return HW;
    }
    function convertFeetOfWater(value, targetUnit) {
        switch (targetUnit) {
            case 'PSI':
                return value * 0.433527;
            case 'KPA':
                return value * 2.98907;
            case 'HEADFT':
                return value; // Already in feet
            case 'HEADM':
                return value * 0.30487805;
            case 'BAR':
                return value * 0.0298907;
            default:
                return value;
        }
    }
    function convertToPascal(value, unit) {
        switch (unit) {
            case 'PSI':
                return value * 6894.76;       // 1 PSI = 6894.76 Pa
            case 'KPA':
                return value * 1000;          // 1 kPa = 1000 Pa
            case 'HEADFT':
                return value * 2989.07;       // 1 ftH2O = 2989.07 Pa
            case 'HEADM':
                return value * 9806.65;       // 1 mH2O = 9806.65 Pa
            case 'BAR':
                return value * 100000;        // 1 bar = 100000 Pa
            case 'PA':
                return value;                 // Already in Pascal

        }
    }
    function calculateHf(P, p) {
        var hf = P / (p * 9.81);
        return hf;
    }
    function convertToFeet(value, unit) {
        switch (unit) {
            case 'inches':
                return value * 0.08333333;
            case 'millimeters':
                return value * 0.00328084;
            case 'meters':
                return value * 3.28084;
            case 'centimeters':
                return value * 0.0328084;
            default:
                return value; // Zaten feet ise
        }
    }
    function convertToGPM(value, unit) {
        switch (unit) {
            case 'L/SEC': // Liters per second to GPM
                return value * 15.8503;
            case 'L/MIN': // Liters per minute to GPM
                return value * 0.26417205;
            case 'M3/HR': // Cubic meters per hour to GPM
                return value * 4.402868;
            case 'M3/SEC': // Cubic meters per second to GPM
                return value * 15850.3231;
            case 'M3/DAY': // Cubic meters per day to GPM
                return value * 0.18345281;
            case 'GPM': // GPM to GPM (no conversion)
                return value;
            default:
                return value;
        }
    }
    function convertToInches(value, unit) {
        switch (unit) {
            case 'feet': // Feet to inches
                return value * 12;
            case 'millimeters': // Millimeters to inches
                return value * 0.0393701;
            case 'centimeters': // Centimeters to inches
                return value * 0.393701;
            case 'meters': // Meters to inches
                return value * 39.3701;
            case 'inches': // Inches to inches (no conversion)
            default:
                return value;
        }
    }
    function convertToMeters(value, unit) {
        switch (unit) {
            case 'Feet':
                return value * 0.3048;           // 1 foot = 0.3048 meters
            case 'Inches':
                return value * 0.0254;           // 1 inch = 0.0254 meters
            case 'Meters':
                return value;                    // Already in meters
            case 'Millimeters':
                return value / 1000;             // 1000 mm = 1 meter
            case 'Centimeters':
                return value / 100;              // 100 cm = 1 meter
        }
    }
    function NPSHOpen(hAtm, hS, hF, hV) {
        var result = hAtm + parseFloat(hS) - hF - hV;
        return result;
    }
    function NPSHBooster(hInlet, hF, hV) {
        var result = hInlet - hF - hV;
        return result;
    }
    calculateButton.addEventListener("click", function () {
        var tankLevel = document.getElementById("tank-level");
        var tankLevel_select = document.getElementById("tank-level-select");
        var pipeId = document.getElementById("pipeId");
        var pipeId_select = document.getElementById("pipeId-select");
        var pipeIdInches = convertToInches(pipeId.value, pipeId_select.value);
        var flowrate = document.getElementById("flow-rate");
        var flowrate_select = document.getElementById("flow-rate-select");
        var flowrateGPM = convertToGPM(flowrate.value, flowrate_select.value);
        var returnResult_select = document.getElementById("returnResultAs-select");
        var LEQ = calculateLEQ(pipeIdInches) * 0.08333333;
        var LTOT = calculateLTOT(LEQ);
        var resultHazen = convertFeetOfWater(calculateHW(LTOT, flowrateGPM, pipeIdInches), returnResult_select.value);
        if (isNaN(resultHazen)) {
            document.getElementById("hazenInput").value = 0;
        }
        else {
            document.getElementById("hazenInput").value = resultHazen;
            console.log(calculateHW(LTOT, flowrateGPM, pipeIdInches))
        }
        var P = convertToPascal(resultHazen, returnResult_select.value);
        var p = calculateDensity(parseFloat(specificGravity.value), temperatureSelect.value);
        var hF = calculateHf(P, p);

        var Pv = convertToPascal(vaporPressure.value, vaporPressureSelect.value);
        var hV = calculateHf(Pv, p);

        var Patm = calculatePatm(altitude.value, altitude_select.value);
        var hAtm = calculateHf(Patm, p) * 100000;
        var selectedRadio = document.querySelector('input[name="pumpType"]:checked');

        if (selectedRadio) {
            if (selectedRadio.value === "Liquid") {
                var hS = convertToMeters(tankLevel.value, tankLevel_select.value);
                var resultNPSH = NPSHOpen(hAtm, hS, hF, hV);
                document.getElementById("npsh-available").value = resultNPSH;
            } else if (selectedRadio.value === "Gas") {
                var gaugePressure = document.getElementById("gauge-pressure");
                var gaugePressureSelect = document.getElementById("gauge-pressure-select");
                var Pinlet = convertToPascal(gaugePressure.value, gaugePressureSelect.value) + convertToPascal(Patm, "BAR");
                var hInlet = calculateHf(Pinlet, p);
                var resultNPSH = hInlet - hV - hF;
                document.getElementById("npsh-available").value = resultNPSH;
            }
        }
    });
    clearButton.addEventListener("click", function () {
        const selectedRadio = document.querySelector('input[name="pumpType"]:checked');
        if (selectedRadio.value == "Liquid") {
            document.getElementById("altitude").value = "";
            document.getElementById("altitude-select").value = "FeetAbove";
            document.getElementById("tank-level").value = "";
            document.getElementById("tank-level-select").value = "Feet";
            document.getElementById("flow-rate").value = "";
            document.getElementById("flow-rate-select").value = "GPM";
            document.getElementById("liquid-fluid-select").value = "";
            document.getElementById("pipe-length").value = "";
            document.getElementById("pipe-length-select").value = "feet";
            document.getElementById("pipeId").value = "";
            document.getElementById("pipeId-select").value = "inches";
            document.getElementById("pipe-material-select").value = "CustomPipeMaterial";
            document.getElementById("hzFriction").value = "";
            document.getElementById("roughnessHeight").value = "";
            document.getElementById("roughnessHeight-select").value = "Feet";
            document.getElementById("fitting-type-select1").value = "Elbow90SR";
            document.getElementById("fitting-type-select2").value = "Elbow90SR";
            document.getElementById("fitting-type-select3").value = "Elbow90SR";
            document.getElementById("fitting-type-select4").value = "Elbow90SR";
            document.getElementById("fitting-type-select5").value = "Elbow90SR";
            document.getElementById("quantity1").value = "";
            document.getElementById("quantity2").value = "";
            document.getElementById("quantity3").value = "";
            document.getElementById("quantity4").value = "";
            document.getElementById("quantity5").value = "";
            document.getElementById("npsh-available").value="";
            document.getElementById("hazenInput").value = "";
            fluidSelect.addEventListener("change", function () {
                var selected = fluidSelect.value;
        
                // 🔁 Sıcaklık seçeneklerini temizle ve yenilerini ekle
                temperatureSelect.innerHTML = "";
                var defaultOption = document.createElement("option");
                defaultOption.textContent = "Lütfen sıcaklığı seçiniz";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.value = "";
                temperatureSelect.appendChild(defaultOption);
                if (!fluidOptions[selected]) return;
                fluidOptions[selected].forEach(function (temp) {
                    const option = document.createElement("option");
                    option.value = temp;
                    option.textContent = temp + "°C";
                    temperatureSelect.appendChild(option);
                });
        
                // 🔁 Diğer değerleri sıfırla
                viscosity.value = "";
                specificGravity.value = "";
                vaporPressure.value = "";
            });
            fluidSelect.dispatchEvent(new Event("change"));
            temperatureSelect.addEventListener("change", function () {
                if (fluidSelect.value && temperatureSelect.value) {
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                }
                viscositySelect.addEventListener("change", function () {
                    if (!fluidSelect.value || !temperatureSelect.value) return;
        
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                });
        
                vaporPressureSelect.addEventListener("change", function () {
                    if (!fluidSelect.value || !temperatureSelect.value) return;
        
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                });
            });
            viscositySelect.addEventListener("change", function () {
                if (!fluidSelect.value || !temperatureSelect.value) return;
        
                dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
            });
        
            vaporPressureSelect.addEventListener("change", function () {
                if (!fluidSelect.value || !temperatureSelect.value) return;
        
                dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
            });
            document.getElementById("viscosity").value="";
            document.getElementById("viscosity-type").value="CENTIPOISE_CP";
            document.getElementById("specific-gravity").value="";
            document.getElementById("vapor-pressure").value="";
            document.getElementById("vapor-pressure-select").value="PSI";
        }
        else if(selectedRadio.value="Gas"){
            document.getElementById("altitude").value = "";
            document.getElementById("altitude-select").value = "FeetAbove";
            document.getElementById("gauge-pressure").value="";
            document.getElementById("gauge-pressure-select").value="PSI";
            document.getElementById("flow-rate").value = "";
            document.getElementById("flow-rate-select").value = "GPM";
            document.getElementById("liquid-fluid-select").value = "";
            document.getElementById("pipe-length").value = "";
            document.getElementById("pipe-length-select").value = "feet";
            document.getElementById("pipeId").value = "";
            document.getElementById("pipeId-select").value = "inches";
            document.getElementById("pipe-material-select").value = "CustomPipeMaterial";
            document.getElementById("hzFriction").value = "";
            document.getElementById("roughnessHeight").value = "";
            document.getElementById("roughnessHeight-select").value = "Feet";
            document.getElementById("fitting-type-select1").value = "Elbow90SR";
            document.getElementById("fitting-type-select2").value = "Elbow90SR";
            document.getElementById("fitting-type-select3").value = "Elbow90SR";
            document.getElementById("fitting-type-select4").value = "Elbow90SR";
            document.getElementById("fitting-type-select5").value = "Elbow90SR";
            document.getElementById("quantity1").value = "";
            document.getElementById("quantity2").value = "";
            document.getElementById("quantity3").value = "";
            document.getElementById("quantity4").value = "";
            document.getElementById("quantity5").value = "";
            document.getElementById("npsh-available").value="";
            document.getElementById("hazenInput").value = "";
            fluidSelect.addEventListener("change", function () {
                var selected = fluidSelect.value;
        
                // 🔁 Sıcaklık seçeneklerini temizle ve yenilerini ekle
                temperatureSelect.innerHTML = "";
                var defaultOption = document.createElement("option");
                defaultOption.textContent = "Lütfen sıcaklığı seçiniz";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.value = "";
                temperatureSelect.appendChild(defaultOption);
                if (!fluidOptions[selected]) return;
                fluidOptions[selected].forEach(function (temp) {
                    const option = document.createElement("option");
                    option.value = temp;
                    option.textContent = temp + "°C";
                    temperatureSelect.appendChild(option);
                });
        
                // 🔁 Diğer değerleri sıfırla
                viscosity.value = "";
                specificGravity.value = "";
                vaporPressure.value = "";
            });
            fluidSelect.dispatchEvent(new Event("change"));
            temperatureSelect.addEventListener("change", function () {
                if (fluidSelect.value && temperatureSelect.value) {
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                }
                viscositySelect.addEventListener("change", function () {
                    if (!fluidSelect.value || !temperatureSelect.value) return;
        
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                });
        
                vaporPressureSelect.addEventListener("change", function () {
                    if (!fluidSelect.value || !temperatureSelect.value) return;
        
                    dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
                });
            });
            viscositySelect.addEventListener("change", function () {
                if (!fluidSelect.value || !temperatureSelect.value) return;
        
                dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
            });
        
            vaporPressureSelect.addEventListener("change", function () {
                if (!fluidSelect.value || !temperatureSelect.value) return;
        
                dropdownCheck(fluidSelect, temperatureSelect, viscositySelect, vaporPressureSelect);
            });
            document.getElementById("viscosity").value="";
            document.getElementById("viscosity-type").value="CENTIPOISE_CP";
            document.getElementById("specific-gravity").value="";
            document.getElementById("vapor-pressure").value="";
            document.getElementById("vapor-pressure-select").value="PSI";
        }
    });
});


