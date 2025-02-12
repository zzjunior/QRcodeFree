// validar URL
function isValidURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domínio e nome de host
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou endereço IP (v4)
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // string de consulta
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragmento de URL
    return !!pattern.test(url);
}

function generateQRCode() {
    var text = document.getElementById('text').value.trim();
    var alertDiv = document.getElementById('alertDiv');
    var buttonDownload = document.getElementById('download');
    var buttonGenerate = document.getElementById('gerarQR');
    var resetQRcode = document.getElementById('reset');
    
    if (text === "") {
        alertDiv.innerHTML = `
            <div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
                Por favor, digite uma URL antes de gerar o QR code.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Esconder o alerta após 2 segundos
        setTimeout(function() {
            alertDiv.innerHTML = "";
        }, 2000);

        return;
    }

    // Verificar se a URL é válida
    if (!isValidURL(text)) {
        alertDiv.innerHTML = `
            <div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
                Por favor, digite uma URL válida.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Esconder o alerta após 2 segundos
        setTimeout(function() {
            alertDiv.innerHTML = "";
        }, 2000);

        return;
    }

    // Verificar se o QR code já foi gerado para o mesmo link
    var qrcodeElement = document.getElementById('qrcode');
    if (qrcodeElement.innerHTML.trim() !== "") {
        alertDiv.innerHTML = `
            <div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
                O QR code já foi gerado. Clique em "Novo QRcode" para gerar um novo.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Esconder o alerta após 2 segundos
        setTimeout(function() {
            alertDiv.innerHTML = "";
        }, 2000);

        return;
    }

    alertDiv.innerHTML = ""; // Limpa o alerta caso haja um texto válido

    var qrcode = new QRCode(qrcodeElement, {
        text: text,
        width: 128,
        height: 128,
    });

    // Exibir aviso de que o QR code foi gerado
    alertDiv.innerHTML = `
        <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
            QR code gerado com sucesso!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    buttonDownload.style.display = 'inline-block';
    buttonGenerate.style.display = 'none';
    resetQRcode.style.display = 'inline-block';

    // Esconder o alerta após 2 segundos
    setTimeout(function() {
        alertDiv.innerHTML = "";
    }, 2000);

    // Esconder o QR code após um minuto
    setTimeout(function() {
        qrcodeElement.innerHTML = "";
        buttonDownload.style.display = 'none';
        buttonGenerate.style.display = 'inline-block';
    }, 60000);
}

function downloadQRCode() {
    var canvas = document.querySelector('canvas');
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.href = image;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fechar o alerta ao clicar no "X"
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-close')) {
        document.getElementById('alertDiv').innerHTML = "";
    }
});

