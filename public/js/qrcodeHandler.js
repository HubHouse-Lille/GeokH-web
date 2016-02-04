
$(document).ready(function() {

    jQuery('#qrcodeCanvas').qrcode({
        text: "codeBalise:" + globalBaliseId
    });

    /*document.getElementById("qrcodedl").onclick = function () {
        alert('downloadCanvas');
        link.href = document.getElementById('qrcodeCanvas').children[0].toDataURL();
        link.download = 'qrcode.png';
    }*/


    function downloadCanvas(link) {
        link.href = document.getElementById('qrcodeCanvas').children[0].toDataURL();
        link.download = "qrcode_balise_"+link.getAttribute('data-value')+".png";
    }

    document.getElementById('qrcodedl').addEventListener('click', function() {
        downloadCanvas(this);
    }, false);


});