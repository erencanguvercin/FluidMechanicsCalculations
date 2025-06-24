var frequencyQ = document.getElementById("frequencyQ");
var HmSS = document.getElementById("HmSS");
var Hshutoff = document.getElementById("Hshutoff");
var frequencyMotorPower = document.getElementById("frequencyMotorPower");
var frequencyPumpSelect = document.getElementById("pump-select-frequency");
var frequencyPumpSelect2 = document.getElementById("pump-select-frequency2");
var frequencyButton = document.getElementById("frequencyButton");
var frequencyResult = document.getElementById("frequencyResult");
var cleanButton3 = document.getElementById("cleanButton3");
var pdfButton3 = document.getElementById("pdfButton3");
function calculateHmax(Hshutoff,HmSS){
    if(Hshutoff!=''){
        Hshutoff = parseFloat(Hshutoff);
        if(Hshutoff>120){
            alert("Üst basınç değeri 120'den büyük olamaz.");
            return null;
        }
        var Hmax = Hshutoff/10;
        return Hmax;
    }
    else if(HmSS!=''){
        HmSS = parseFloat(HmSS);
        if(HmSS>120){
            alert("Alt basınç değeri 120'den büyük olamaz.");
            return null;
        }
        var Hmax = HmSS/10;
        return Hmax;
    }
    else{
        alert("Lütfen üst veya alt basınç değerlerini giriniz.");
        return null;
    }
}
function calculateTableValue(HMax,MotorPower){
    var TableValue=0;
    if(1.5<=MotorPower && MotorPower<=22){
        if(HMax<=6){
            TableValue=4;
            return TableValue;
        }
        else if(HMax<=8.5){
            TableValue=6;
            return TableValue;
        }
        else if(HMax<=12){
            TableValue=8;
            return TableValue;
        }
    }
    else if(30<=MotorPower && MotorPower<=55){
        if(HMax<=6){
            TableValue=8;
            return TableValue;
        }
        else if(HMax<=8.5){
            TableValue=12;
            return TableValue;
        }
        else if(HMax<=12){
            TableValue=16;
            return TableValue;
        }
    }
    else if(75<=MotorPower && MotorPower<=110){
        if(HMax<=6){
            TableValue=12;
            return TableValue;
        }
        else if(HMax<=8.5){
            TableValue=18;
            return TableValue;
        }
        else if(HMax<=12){
            TableValue=24;
            return TableValue;
        }
    }
    else if(132<=MotorPower && MotorPower<=200){
        if(HMax<=6){
            TableValue=16;
            return TableValue;
        }
        else if(HMax<=8.5){
            TableValue=24;
            return TableValue;
        }
        else if(HMax<=12){
            TableValue=32;
            return TableValue;
        }
    }
    else{
        alert("Lütfen geçerli bir motor gücü belirtin.");
        return null;
    }
}
function calculateVn3(TableValue,Q,countPump){
    var Vn= TableValue * Q *countPump;
    return Vn;
}
frequencyButton.addEventListener("click",function(){
    var Hmax = calculateHmax(Hshutoff.value,HmSS.value);
    var TableValue = calculateTableValue(Hmax,parseFloat(frequencyMotorPower.value));
    var Vn = calculateVn3(TableValue,parseFloat(frequencyQ.value),parseFloat(frequencyPumpSelect.value));
    frequencyResult.value = Vn;
});
cleanButton3.addEventListener("click",function(){
    frequencyQ.value = "";
    HmSS.value = "";
    Hshutoff.value = "";
    frequencyMotorPower.value = "";
    frequencyPumpSelect.value = 0;
    frequencyPumpSelect2.value = 0;
    frequencyResult.value = "";
});




