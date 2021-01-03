function add(n, type, typebtn, ringkas) {
    var total, totalmkn, totalmnm, totalHarga;
    total = $("#" + type + n).html();
    totalmkn = $("#jmlmkn").html();
    totalmnm = $("#jmlmnm").html();
    total++;
    $("#" + type + n).html(total);
    $("#" + type + n + "-ringkas").html(total);
    if (total == 1) {
        document.getElementById(typebtn).style.display = "inline";
        document.getElementById(ringkas).style.display = "block";
    }
    
    if (type == "makanan") {
        totalmkn++;
        $("#jmlmkn").html(totalmkn);
    } else {
        totalmnm++;
        $("#jmlmnm").html(totalmnm);
    }

    if (typebtn == 'min-mkn1') {
        var totalmkn1 = total*15000;
        $("#hargaTotalMkn1").html(totalmkn1);             
    } else if (typebtn == 'min-mkn2') {
        var totalmkn2 = total*15000;
        $("#hargaTotalMkn2").html(totalmkn2);        
    } else if (typebtn == 'min-mkn3') {
        var totalmkn3 = total*15000;
        $("#hargaTotalMkn3").html(totalmkn3);        
    } else if (typebtn == 'min-mnm1') {
        var totalmnm1 = total*10000;
        $("#hargaTotalMnm1").html(totalmnm1);             
    } else if (typebtn == 'min-mnm2') {
        var totalmnm2 = total*10000;
        $("#hargaTotalMnm2").html(totalmnm2);
    } else if (typebtn == 'min-mnm3') {
        var totalmnm3 = total*10000;
        $("#hargaTotalMnm3").html(totalmnm3);        
    }

    totalHarga = (totalmkn*15000) + (totalmnm*10000);
    $("#hargaTotal").html(totalHarga);
    event.preventDefault();
}

function minus(n, type, typebtn, ringkas) {
    var total, totalmkn, totalmnm, totalHarga;
    total = $("#" + type + n).html();
    totalmkn = $("#jmlmkn").html();
    totalmnm = $("#jmlmnm").html();
    total--;
    $("#" + type + n).html(total);
    $("#" + type + n + "-ringkas").html(total);
    if (total == 0) {
        document.getElementById(typebtn).style.display = "none";
        total = $("#" + type + n).html("");
        document.getElementById(ringkas).style.display = "none";
    }

    if (type == "makanan") {
        totalmkn--;
        $("#jmlmkn").html(totalmkn);
    } else {
        totalmnm--;
        $("#jmlmnm").html(totalmnm);
    }

    if (typebtn == 'min-mkn1') {
        var totalmkn1 = total*15000;
        $("#hargaTotalMkn1").html(totalmkn1);
    } else if (typebtn == 'min-mkn2') {
        var totalmkn2 = total*15000;
        $("#hargaTotalMkn2").html(totalmkn2);
    } else if (typebtn == 'min-mkn3') {
        var totalmkn3 = total*15000;
        $("#hargaTotalMkn3").html(totalmkn3);
    } else if (typebtn == 'min-mnm1') {
        var totalmnm1 = total*10000;
        $("#hargaTotalMnm1").html(totalmnm1);             
    } else if (typebtn == 'min-mnm2') {
        var totalmnm2 = total*10000;
        $("#hargaTotalMnm2").html(totalmnm2);
    } else if (typebtn == 'min-mnm3') {
        var totalmnm3 = total*10000;
        $("#hargaTotalMnm3").html(totalmnm3);        
    }

    totalHarga = (totalmkn*15000) + (totalmnm*10000);
    $("#hargaTotal").html(totalHarga);
    event.preventDefault();
}