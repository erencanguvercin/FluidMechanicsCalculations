var switchq = document.getElementById("switchQ");
var hUst = document.getElementById("hUst");
var hAlt = document.getElementById("hAlt");
var pumpSelect = document.getElementById("pump-select");
var pumpSelect2 = document.getElementById("pump-select2");
var motorPowerInput = document.getElementById("motorPowerInput");
var calculateSwitch = document.getElementById("calculateSwitch");
var cleanButton2 = document.getElementById("cleanButton2");
var pdfButton2 = document.getElementById("pdfButton2");
function calculateS(n){
    var S=0;
    if(n<=1.5){
        S=80;
        return S;
    }
    else if(n<=3.7){
        S=60;
        return S;
    }
    else if(n<=7.5){
        S=30;
        return S;
    }
    else if(n<=15){
        S=20;
        return S;
    }
    else{
        S=15;
        return S;
    }
}
function calculateVn2(Q,hUst,hAlt,S){
    hUst = parseFloat(hUst);
    var Vn = 330 * Q * ((hUst+1)/((hUst-hAlt)*S));
    if(Vn == Infinity || Vn == -Infinity){
        alert("Hesaplanan hacim sonsuz. Lütfen değerleri kontrol edin.");
        return null;
    }
    return Vn;
}

calculateSwitch.addEventListener("click",function(){
    var switchResult = document.getElementById("switchResult");
    var S = calculateS(motorPowerInput.value);
    var Vn = calculateVn2(parseFloat(switchq.value)*parseFloat(pumpSelect.value),hUst.value,hAlt.value,S);
    switchResult.value=Vn;
});

cleanButton2.addEventListener("click",function(){
    switchq.value = "";
    hUst.value = "";
    hAlt.value = "";
    pumpSelect.value = 0;
    pumpSelect2.value = 0;
    motorPowerInput.value = "";
    document.getElementById("switchResult").value = "";
});
