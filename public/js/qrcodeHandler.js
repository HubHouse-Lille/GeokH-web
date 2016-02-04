
$(document).ready(function() {

    if (globalBaliseId > -1) {
        jQuery('#qrcodeCanvas').qrcode({
            text: "codeBalise:" + globalBaliseId
        });

        document.getElementById('qrcodedl').addEventListener('click', function() {
            downloadCanvas(this);
        }, false);

    }

    function downloadCanvas(link) {
        link.href = document.getElementById('qrcodeCanvas').children[0].toDataURL();
        link.download = "qrcode_balise_"+link.getAttribute('data-value')+".png";
    }




});