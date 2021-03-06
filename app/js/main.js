// const txParams = {
//     nonce: '0x00',
//     gasPrice: '0x09184e72a000',
//     gasLimit: '0x2710',
//     to: '0xae7Ce10Bd7fd8Eb786064B888013faCCC451632E',
//     value: '0x2710',
//     data: '0x',
//     // EIP 155 chainId - mainnet: 1, ropsten: 3
//     chainId: 1
// }
//
// const tx = new EthereumTx(txParams)
//
//
// console.log(tx.serialize().toString('hex'))
if(os.platform() == "win32") {
    $(".windows_close").removeClass("d-none");
    $(".windows_minimize").removeClass("d-none");
}
$(".main-container").css("opacity", "1");
setInterval(function() {
    $(".main-container").css("transition-duration", "");
}, 1000);
ipcRenderer.on('newUpdateAvailable', function(event, text) {
    ShowNotification("Update Available for CoinApp", 60000)
});
ipcRenderer.on('updateProgressCheck', function(event, percent) {
    var loading = "<div class='update_progress'></div>";
    ShowNotification("Update is " + parseFloat(percent).toFixed(2) + "% Complete"+loading, 60000);
    $(".update_process").css("width", parseFloat(percent).toFixed(2)+"%");
});
ipcRenderer.on('completedDownload', function(event, info) {
    ShowNotification("<button onclick=\"RestartApp()\" id=\"restart_app\" type=\"button\" class=\"btn btn-sm btn-primary\">Update Complete Restart CoinApp</button>", 60000);
});

// https://raw.githubusercontent.com/coinapp-io/desktop/master/
$("#updates").load("https://raw.githubusercontent.com/coinapp-io/desktop/master/UPDATES.txt");


function CloseApp() {
    ipcRenderer.send('closeApplication');
}

function MinimizeApp() {
    ipcRenderer.send('minimizeApp');
}

function RestartApp() {
    ipcRenderer.send('quitAndInstall');
}

function EtherPrice() {
    var api = "https://api.coinmarketcap.com/v1/ticker/ethereum/";
    $.get(api, function(data, status) {
        var etherUSD = parseFloat(data[0]['price_usd']);
    });
}
UpdatePricing();

function UpdatePricing() {
    EtherPrice();
}
setInterval(function() {
    if(configs.wallet) UpdateBalance();
}, 5000);


function isEthAddress(address) {
    if(!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
    } else if(/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    } else {
        return true;
    }
}

function bad(number) {
    if(isNaN(number) || number <= 0 || number == '') return true;
    return false;
}

function UpdateTokenFeeETH() {
    var fee = $("#tokentxfee").val();
    var available = ethBalance - fee;
    $(".ethavailable").each(function() {
        $(this).html(available.toFixed(6));
    });
}

function CryptoName() {
    if(usingBtc) {
        return "BTC"
    } else if(usingLtc) {
        return "LTC"
    } else {
        return "ETH"
    }
}
//var myvalues = [10,8,5,7,4,4,3,10,8,5,7,4,4,1];
//$('.dynamicbar').sparkline(myvalues, {disableInteraction: true, type: 'bar', barColor: '#ffd6b5', barWidth: 78, height: 500} );