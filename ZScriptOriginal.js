// ==UserScript==
// @name ZScript on Libertex
// @description Автоматизація на libertex.fxclub.org
// @author Лиходій
// @email libertex-zscript@nimber.xyz
// @license non-free
// @version 0.53
// @include https://libertex.fxclub.org/investments/*
// @include http://libertex.fxclub.org/investments/*
// @match https://libertex.fxclub.org/investments/*
// @match http://libertex.fxclub.org/investments/*
// @namespace Z
// @noframes
// ==/UserScript==

(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    //do not work in frames! - additional to "@noframes"
    if (w.self != w.top) {return;}
    w.zs = {"version": "0.53"};

    // акаунти з підписками
    // синхронна робота

    // всі налаштування скрипта на якусь існуючу сторінку
    // Що робити з залипанням WebSocket - бо при перезавантаженні може не запуститися скрипт
    // користувацькі налаштування? наприклад час до спрацювання сирени по зв'язку
    // кнопка швидкого відвязування правила від заявки
    // Якщо розраби додадуть sl та tp, то додати їх у дані для скрипта
    // Якщо розраби додадуть auto-add, то додати їх у дані для скрипта
    // Після цього замутити перевірку СЛ та ТП після виконання усіх дій по заявці
    // підсвітка працюючої заявки та правила по заявці
    // time-lock ..... що там вертається в data? звірити його з zv.data! дивимося ам, мультиплір, закрита/відкрита
    // параметр price (а що, якщо немає прайсу!? мабуть треба в помилку його ...)
    // l, sl, tp може має працювати у відсотках
    // що там з item.ok? що робити і робить, якщо не ок? і item.tradeoff
    // Firefox tests
    // Robot
    // підсвітка працюючої заявки в даний момент
    // додати функції різних мелодій-біпів
    // win-10
    // why beep x3 sometimes gives only 2 beeps?

    // відловити splash. контролювати і зберігати по якій ціні виставляються ордери у порівнянні зі сплешем
    // виходячи з цього зробити відкриття угод з малим сплешем
    // favicon
    // wait on tradeoff
    // повтор команди при залипанні сервера - складно

    //chrome - знижує таймер до 1 секунди
    //неідеальне вирішення проблеми вимкнення вкладки - аддон Disable automatic tab discarding
    //можливість встановлення тп і сл під час створення угоди
    //та й опції додатково - теж - воно там теж є насправді
    //та й взагалі там цікаві штучки є ... треба буде покрутити

    // інтерфейс швидкого керування
    // автопоповнення при створенні - в інтерфейс

    //TEST переделать на круглосуточный инструмент, где тикер не сопадает с названием
    //TEST=правила+робот

    //засилать на сервер инфу, если order.ticker != order.ticker2

    //TP SL повноцінні
    //TP_abs TP_pct TP_price
    //  spa/investing/set-limit
    //  takeProfitPrice: 60000
    //  stopLossPrice: 59500

    //Стартові і тестові правила перезаписують старі. Це не дуже добре - обдумать.
    //Доступна змінна у правилах - ітерація спрацювання (1-...)
//setting / consts
w.zs.debug_mode = (window.location.search == "?debug");
w.zs.timer_garbage_collector = 10*60*1000; //every 10 minutes

w.zs.timer = 500;   //idle w.zs.timer mss between executions on orders

w.zs.wdt_divisor = 1000/w.zs.timer; //для відображення в секундах wdt_divisor*timer <=1000//TODO
w.zs.init_cnt = 40;  //do not alert first x ticks after script start
w.zs.wdt_cnt = 60*1000/w.zs.timer;  //WDT: after 60 seconds start to beep

w.zs.pct_digits = 2;//count of digits in percents
w.zs.epsilon_abs = 1/10000;
w.zs.epsilon_pct = 1/100;

w.zs.audio_silence_url = "https://upload.wikimedia.org/wikipedia/commons/0/07/Silence.ogg";
w.zs.audio_alarm_url = "https://upload.wikimedia.org/wikipedia/commons/4/45/Wiki_vandal_alert.ogg";
//w.zs.audio_info_url = "https://upload.wikimedia.org/wikipedia/commons/0/05/Beep-09.ogg";
w.zs.audio_info_url = "https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg";
w.zs.tickers = {
  "Vodafone Group": "VOD",
  "Oasis Network": "ROSEUSD",
  "Walt Disney": "DIS",
  "UMA": "UMAUSD",
  "Aeroflot": "Aeroflot",
  "Netflix": "Netflix",
  "AMC Entertainment Holdings, Inc.": "AMC",
  "Dropbox": "Dropbox",
  "Canopy Growth Corp": "WEED",
  "Cronos Group Inc.": "CRON",
  "Electricite de France (EDF)": "EDF",
  "Juventus Football Club SPA": "JUVE",
  "Pinterest": "PINS",
  "TUI AG": "TUI",
  "GameStop Corp.": "GME",
  "Wynn Resorts, Limited": "WYNN",
  "Tilray Inc.": "TLRY",
  "Aurora Cannabis Inc.": "ACB",
  "CORN": "CORN",
  "Uber Technologies": "UBER",
  "LYFT Inc.": "LYFT",
  "US SPX 500": "ES",
  "TOTAL SA": "FP",
  "Tesla Motors": "TSLA",
  "Yandex": "YNDX",
  "Michael Kors Holdings": "KORS",
  "Amazon.com": "AMZN",
  "Baidu": "BIDU",
  "Salesforce.com": "CRM",
  "Twitter": "TWTR",
  "Adobe Systems": "ADBE",
  "Bayerische Motoren Werke AG": "BMW",
  "Deutsche Bank AG": "DBK",
  "Snap": "SNAP",
  "Banco Santander Chile": "BSAC",
  "EOS": "EOSUSD",
  "IOTA/Ethereum": "IOTETH",
  "Litecoin/Ethereum": "LTCETH",
  "NEO/Bitcoin": "NEOBTC",
  "Ralph Lauren": "RL",
  "Vale": "VALE",
  "Activision Blizzard": "ATVI",
  "FTSE 100": "Z",
  "Virgin Galactic Holdings Inc": "SPCE",
  "ENEL SPA": "ENEL",
  "Ethan Allen Interiors": "ETH",
  "SUGAR": "SUGAR",
  "Nordstrom": "JWN",
  "Sberbank": "Sberbank",
  "US NDAQ 100": "NQ",
  "US 2000": "TF",
  "General Electrics": "GE",
  "Nikkei 225": "NKD",
  "iShares MSCI United Kingdom ETF": "EWU",
  "US DJ 30": "YM",
  "EURO STOXX 50": "FESX",
  "CAC 40": "FCE",
  "Norilsk Nickel": "Nornickel",
  "Industrial & Commercial Bank of China": "IDCB",
  "PetroChina": "PTR",
  "WTI Crude Oil": "WT",
  "AEX": "FTI",
  "Monero/Bitcoin": "XMRBTC",
  "iShares China Large-Cap ETF": "FXI",
  "Monero": "XMRUSD",
  "GitLab Inc.": "GTLB",
  "SOYBEAN": "SOYBEAN",
  "Zcash/Bitcoin": "ZECBTC",
  "Zcash": "ZECUSD",
  "iShares MSCI Mexico ETF": "EWW",
  "Gazprom": "Gazprom",
  "Bitcoin Cash/Bitcoin": "BCHBTC",
  "Brent Crude Oil": "BRN",
  "Bitcoin Cash": "BCHUSD",
  "BTCUSD": "Bitcoin",
  "Spotify": "Spotify",
  "Bitcoin/EUR": "BTCEUR",
  "Ethereum/Bitcoin": "ETHBTC",
  "Ethereum": "ETHUSD",
  "Maker": "MKRUSD",
  "Ontology": "ONTUSD",
  "Tezos": "XTZUSD",
  "TripAdvisor": "TRIP",
  "China A50": "XU",
  "Renault SA": "RNO",
  "Platinum": "PL",
  "Moderna": "MRNA",
  "iShares Latin America 40 ETF": "ILF",
  "Compound": "COMPUSD",
  "Synthetix Network Token": "SNXUSD",
  "Polkadot": "DOTUSD",
  "VeChain": "VETUSD",
  "Uniswap": "UNIUSD",
  "0x": "ZRXUSD",
  "VINCI SA": "DG",
  "Siemens AG": "SIE",
  "Lukoil": "Lukoil",
  "Daimler AG": "DAI",
  "Airbus SE": "AIR",
  "Ferrari": "RACE",
  "Repsol SA": "REP",
  "Henry Hub Natural Gas": "NG",
  "Southwest Airlines Co": "LUV",
  "Spirit Airlines Incorporated": "SAVE",
  "Royal Caribbean Cruises Ltd": "RCL",
  "Norwegian Cruise Line Holdings Ltd": "NCLH",
  "Air France KLM SA": "AF",
  "Ryanair Holdings plc": "RYAAY",
  "Carnival Corp": "CCL",
  "Mobile TeleSystems": "MTS",
  "US DJ 30 Cash": "YMCash",
  "Axie Infinity": "AXSUSD",
  "DAX": "FDAX",
  "AUD/NZD": "AUDNZD",
  "EUR/MXN": "EURMXN",
  "EUR/NOK": "EURNOK",
  "EUR/NZD": "EURNZD",
  "Israel 35": "TA35",
  "Cardano": "ADAUSD",
  "OmiseGO": "OMGUSD",
  "QTUM": "QTMUSD",
  "EUR/CHF": "EURCHF",
  "AUD/CAD": "AUDCAD",
  "AUD/CHF": "AUDCHF",
  "AUD/JPY": "AUDJPY",
  "Boeing": "BA",
  "PVH": "PVH",
  "iShares Core S&P Mid-Cap ETF": "IJH",
  "Robinhood Markets Inc": "HOOD",
  "Lenovo Group": "LNVG",
  "SGD/JPY": "SGDJPY",
  "USD/CAD": "USDCAD",
  "Bitcoin Gold": "BTGUSD",
  "Ethereum Classic": "ETCUSD",
  "IOTA": "IOTUSD",
  "NEO": "NEOUSD",
  "USD/CLP": "USDCLP",
  "Silver": "XAGUSD",
  "CHF/SGD": "CHFSGD",
  "EUR/RUB": "EURRUB",
  "Gold": "XAUUSD",
  "AUD/USD": "AUDUSD",
  "CAD/CHF": "CADCHF",
  "CAD/JPY": "CADJPY",
  "CHF/JPY": "CHFJPY",
  "EUR/AUD": "EURAUD",
  "EUR/CAD": "EURCAD",
  "EUR/GBP": "EURGBP",
  "EUR/JPY": "EURJPY",
  "EUR/SEK": "EURSEK",
  "EUR/SGD": "EURSGD",
  "EUR/USD": "EURUSD",
  "GBP/AUD": "GBPAUD",
  "GBP/CAD": "GBPCAD",
  "GBP/CHF": "GBPCHF",
  "GBP/JPY": "GBPJPY",
  "GBP/NZD": "GBPNZD",
  "GBP/SEK": "GBPSEK",
  "GBP/USD": "GBPUSD",
  "NOK/JPY": "NOKJPY",
  "NZD/CAD": "NZDCAD",
  "NZD/CHF": "NZDCHF",
  "NZD/JPY": "NZDJPY",
  "NZD/USD": "NZDUSD",
  "USD/CHF": "USDCHF",
  "USD/DKK": "USDDKK",
  "USD/JPY": "USDJPY",
  "USD/MXN": "USDMXN",
  "MEX BOLSA Index": "IS",
  "USD/NOK": "USDNOK",
  "USD/RUB": "USDRUB",
  "USD/SEK": "USDSEK",
  "USD/SGD": "USDSGD",
  "Litecoin": "Litecoin",
  "USD/ZAR": "USDZAR",
  "Dash": "DASHUSD",
  "Litecoin/Bitcoin": "LTCBTC",
  "XRP": "XRPUSD",
  "EUR/CNH": "EURCNH",
  "USD/CNH": "USDCNH",
  "Bitcoin Gold/Ethereum": "BTGETH",
  "Dash/Ethereum": "DASHETH",
  "Ethereum Classic/Ethereum": "ETCETH",
  "Bitcoin Gold/Bitcoin": "BTGBTC",
  "Dash/Bitcoin": "DASHBTC",
  "EOS/Ethereum": "EOSETH",
  "FTSE 100 Cash": "ZCash",
  "NEO/Ethereum": "NEOETH",
  "OmiseGO/Ethereum": "OMGETH",
  "QTUM/Ethereum": "QTMETH",
  "Tron": "TRXUSD",
  "Nem": "XEMUSD",
  "Stellar": "XLMUSD",
  "Monero/Ethereum": "XMRETH",
  "Zcash/Ethereum": "ZECETH",
  "Cosmos": "ATMUSD",
  "Bitcoin SV": "BSVUSD",
  "Chainlink": "LNKUSD",
  "Google": "GOOGL",
  "Facebook": "FB",
  "Hang Seng Index": "HSI",
  "DAX Cash": "FDAXCash",
  "Palladium": "PA",
  "Crypto10.0": "Crypto10.0",
  "Crypto3.0": "Crypto3.0",
  "iShares MSCI Germany ETF": "EWG",
  "Crypto5.0": "Crypto5.0",
  "Brent Crude Oil Cash": "BRNCash",
  "Nikkei 225 Cash": "NKDCash",
  "U.S. Dollar Index Future": "USDX",
  "WHEAT": "WHEAT",
  "Russia50 Index": "Russia50",
  "Italy 40": "MIB",
  "COCOA": "COCOA",
  "COFFEE": "COFFEE",
  "Copper": "HG",
  "iShares Core U.S. Aggregate Bond ETF": "AGG",
  "Petrobras": "PBR",
  "The Coca-Cola": "KO",
  "Gilead Sciences": "GILD",
  "Alibaba Group Holding": "BABA",
  "US NDAQ 100 Cash": "NQCash",
  "Grayscale Bitcoin Trust BTC": "GBTC",
  "Marathon Patent Group INC": "MARA",
  "MasterCard": "MA",
  "Toyota Motor": "TM",
  "US SPX 500 Cash": "ESCash",
  "AT&T": "T",
  "JPMorgan Chase & Co.": "JPM",
  "SPDR S&P 500 ETF Trust": "SPY",
  "Nintendo (US)": "NINTENDO_US",
  "McDonald's": "MCD",
  "Internet Computer": "ICPUSD",
  "SHIB*1000/USD": "SHIBUSD",
  "Philip Morris International": "PM",
  "Home Depot": "HD",
  "IndiTex SA": "ITX",
  "Verizon Communications": "VZ",
  "Bank of America": "BAC",
  "The Travelers Companies": "TRV",
  "American Express": "AXP",
  "Hewlett-Packard": "HPQ",
  "VF": "VFC",
  "nVidia": "NVDA",
  "Harley-Davidson": "HOG",
  "UnitedHealth Group": "UNH",
  "Caterpillar": "CAT",
  "Williams-Sonoma": "WSM",
  "Dogecoin": "DOGEUSD",
  "BAYER AG": "BAYN",
  "Procter & Gamble": "PG",
  "BASF SE": "BAS",
  "Novatek": "Novatek",
  "iShares MSCI Brazil ETF": "EWZ",
  "Sociedad Quimica y Minera de Chile": "SQM",
  "Rosneft": "Rosneft",
  "Wells Fargo & Co.": "WFC",
  "Volkswagen AG": "VOW",
  "Citigroup": "C",
  "ALCOA": "AA",
  "Intel": "INTC",
  "Pfizer": "PFE",
  "eBay": "EBAY",
  "Vanguard FTSE Europe ETF": "VGK",
  "Aave": "AAVEUSD",
  "Algorand": "ALGOUSD",
  "Avalanche": "AVAXUSD",
  "Binance Coin": "BNBUSD",
  "PancakeSwap": "CAKEUSD",
  "Chiliz": "CHZUSD",
  "Elrond": "EGLDUSD",
  "Enjin Coin": "ENJUSD",
  "Filecoin": "FILUSD",
  "Coinbase Global Inc.": "COIN",
  "Terra": "LUNAUSD",
  "Polygon": "MATICUSD",
  "THORChain": "RUNEUSD",
  "Solana": "SOLUSD",
  "SushiSwap": "SUSHIUSD",
  "THETA": "THETAUSD",
  "Cisco Systems": "CSCO",
  "Apple": "AAPL",
  "SAP SE": "SAP",
  "Adidas AG": "ADS",
  "Volatility index": "VIX",
  "BNP Paribas SA": "BNP",
  "Heating Oil": "HO",
  "Enel Chile S.A.": "ENIC",
  "Tencent Holdings": "TCTZ",
  "Johnson&Johnson": "JNJ",
  "ENI SPA": "ENI",
  "Spain 35": "IBX",
  "Estée Lauder": "EL",
  "Exxon Mobil": "XOM",
  "Light Sweet Crude Oil": "CL",
  "SHIB*1000/DOGE": "SHIBDOGE",
  "Ford Motor": "F",
  "Goldman Sachs Group": "GS",
  "IBM": "IBM",
  "Starbucks": "SBUX",
  "Microsoft": "MSFT",
  "Visa": "V",
  "Nike": "NKE"
};

//  Не зправився з тікером SK
//  Не зправився з тікером LRCCash
//  Не зправився з тікером SVMK
//  Не зправився з тікером APHA
//  Не зправився з тікером BTCUSDFut
//  Не зправився з тікером EURTRY
//  Не зправився з тікером USDTRY
//  Не зправився з тікером ORCL
//  Не зправився з тікером NINTENDO_JP
    w.zv = {}
    w.zv.inited = false
    w.zv.init_cnt = 0;
    w.zv.wdt_cnt = 0;
    w.zv.wdt_data = {};
    w.zv.audio_silence = new Audio(zs.audio_silence_url);
    w.zv.audio_alarm = new Audio(zs.audio_alarm_url);
    w.zv.audio_alarm.loop = true;
    w.zv.audio_info = new Audio(zs.audio_info_url);
    w.zv.audio_inited = false;
    w.zv.errrules = {}; //list of failed rules
    w.zv.queue = {};
    w.zv.paused = false;
    w.zv.alarm_wdt = false;
    w.zv.orders = [];
    w.zv.orders_indexes = {};
    w.zls = {};   //local storage

    w.zv.kostil = {};
w.zf={}
    // ------------------ SOUNDS ---------------------
    w.zf.audio_info = function () {
      return zv.audio_info.play();
    }

    // ---------------- TECHNICAL --------------------
    w.zf.calcAge = function(t) {
        const mask = {"груд":12,"гру":12,"лист":11, "жовт":10, "вер":9, "серп": 8, "лип": 7, "черв": 6, "трав":5, "квіт":4, "бер":3, "лют":2, "січ":1};
        const x = t.replaceAll(String.fromCharCode(160)," ").split(" ");
        var year = new Date().getFullYear()
        var ret = "";
        ret += year.toString()+"/";
        ret += mask[x[1]]+"/";
        ret += x[0] + " ";
        ret += x[2] + " ";
        ret += "+0";
        var ddate = Date.parse(ret);
        ret = (Date.now()-ddate)/1000;
        if (ret<-60*60) {//minus 1 hour or more
            ret += 60*60*24*365//+year
        }
        return ret
   }
    w.zf.parseInt = function(val) {
      if (typeof(val) == 'number') {return val;}
      var re = new RegExp(String.fromCharCode(160), "g");
      var ret = val.replace(/ /g,'').replace(re,'').replace('&nbsp;','');
      if (ret.substring(0,1) == "x") { ret = ret.substring(1); }
      if (ret.substring(0,1) == "×") { ret = ret.substring(1); }
      ret = ret.replace(/ /g,'').replace(re,'');
      return parseInt(ret)
    }
    w.zf.parseFloat = function(val) {
      if (typeof(val) == 'number') {return val;}
      var re = new RegExp(String.fromCharCode(160), "g");
      var ret = val.replace(/ /g,'').replace(re,'').replace('&nbsp;','');
      if (ret.substring(0,1) == "$") { ret = ret.substring(1); }
      if (ret.substring(0,1) == "+" || ret.substring(0,1) == "-") {
        if (ret.substring(1,2) == "$") {
          ret = ret.substring(0,1) + ret.substring(2);
        }
      }
      if (ret.substring(0,1) == "+") { ret = ret.substring(1); }
      if (ret.substring(ret.length) == "%") { ret=ret.substring(0,ret.length-1); }
      ret = ret.replace(/ /g,'').replace(re,'');
      return parseFloat(ret)
    }
    w.zf.parseString = function(val) {
        var ret = val.replaceAll("<br>","").replaceAll("\n","").trim().replace("  "," ");
        return ret;
    }
    w.zf.time_for_log = function() {
      return new Date().toUTCString().substr(5) + ": ";
    }
    w.zf.log = function(...txt) {
        if (zs.debug_mode) {
          console.log(zf.time_for_log(), ...txt);
        }
        //TODO save to log
    }
    w.zf.loge = function(...txt) {
        console.error(zf.time_for_log(), ...txt);
        //TODO save to log if error not a same. otherwise add xN
    }
    w.zf.debug = function(...txt) {
        if (zs.debug_mode) {
          console.log(zf.time_for_log(), ...txt);
        }
    }
    w.zf.debuge = function(...txt) {
      if (zs.debug_mode) {
        console.error(zf.time_for_log(), ...txt);
      }
    }
    w.zf.debug2 = function(data) {
      if (zs.debug_mode) {
        $("#Z_footer").html(data);
      }
    }
    w.zf.dbg = w.zf.debug;
    w.zf.dbge = w.zf.debuge;
    w.zf.generateFile = function(filename, text) {
      text = text.replaceAll("\n","\r\n");
      //str.replace(new RegExp(find, 'g'), replace);
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
// ---------------- LOCAL STORAGE ----------------------
w.zf.ls_read = function(key) {
    const prefixed = (key == "arules" || key == "blahblah");
    const prefix = (prefixed == true) ? zs.account+"_" : "";
    zls[key] = JSON.parse(localStorage["Z_"+prefix+key]);
}
w.zf.ls_write = function(key) {
    const prefixed = (key == "arules" || key == "blahblah");
    const prefix = (prefixed == true) ? zs.account+"_" : "";
    localStorage["Z_"+prefix+key] = JSON.stringify(zls[key]);
}

w.zf.audio_alarm = function () {
  var alarm = false;
  var err_txt = "";
  //ці помилки знімаються автоматично
  if (zv.alarm_code) {
      alarm = true;
      err_txt += "Помилка скрипта\r\n";
  }
  if (zv.alarm_wdt) {//тривога по wdt
      alarm = true;
      err_txt += "Помилка: відсутній зв'язок\r\n";
  }
  if (zv.alarm_on_other_page) {
      err_txt += "Скрипт знаходиться не на сторінці \"Активні заявки\"\r\n";
  }
  //а ці помилки потипу "одноразові" та знімаються вручну
  if (zv.alarm_code_2) {
      alarm = true;
      err_txt += "Помилка скрипта при опрацюванні відповіді сервера на дію\r\n";
  }
  if (zv.alarm_rules) {
      alarm = true;
      err_txt += "Помилка при виконанні дій по правилу\r\n";
  }
  if (zv.paused) {
      err_txt += "Скрипт знаходиться на паузі\r\n";
  }
  //-------------------------------------------------------
  if (err_txt=="") { err_txt = "OK";}
  if ($("#Z_Status").attr("title") != err_txt) {
      $("#Z_Status").attr("title",err_txt);
  }
  if (alarm) {
      zv.audio_alarm.play();
      $("#Z_Status").css('color', 'red');
  } else {
      zv.audio_alarm.pause();
      zv.audio_alarm.currentTime = 0;
  }
}
﻿// INITS
w.zf.init_all = function () {
  return  (w.zf.init_right() //user, account, account type
        && w.zf.init_top_left() //remove deposit buttons
        && w.zf.init_top_center()   //add status bar
        && w.zf.init_top_right()  //add version to user's status
        && w.zf.init_bottom()     //remove footer
        && w.zf.init_center()     //none
        && w.zf.init_config()     //requierjs configs
        && w.zf.init_css()        //own css init
        && w.zf.init_local_storage()
        && w.zf.init_close_all_btn()   //"CLOSE ALL" button
        && ((!zs.debug_mode) || w.zf.init_developer())
      );
}
w.zf.init_right = function() {
    if ($("#region-active-investments .user-investments-header .switcher-btns").length == 0) {return true;}
    zf.debug("init: right");
    const name = zf.parseString($("#region-header div.col-right span.user-name").html());
    zs.user = name;

    let account = $("#region-balance div.balance-view div.account-wrap div.user-account").html();
    account = zf.parseString(account);
    account = account.split(' ')[2];
    zs.account = account;

    let account_type = zf.parseString($("#region-balance div.balance-view div.account-wrap span.selected").html())
    if ((account_type.indexOf("Демо") != -1) || (account_type.indexOf("Demo") != -1)) {
      account_type = "demo";
    } else if ((account_type.indexOf("Ger") != -1) || (account_type.indexOf("Реал") != -1) || (account_type.indexOf("Real") != -1)) {
      account_type = "real";
    } else {
      account_type = "other";
    }
    zs.account_type = account_type;
    zv.demo = false;//TODO remove
    try{$("#region-header div.col-right div.sidebar-nav span.a-event").click();}catch{;};//бокопори
    $("#region-active-investments .user-investments-header .switcher-btns")[0].remove();
    return false
}
w.zf.init_top_left = function (){
    var elBar = "#region-header div.header-view div.col-left";
    if ($(elBar + " #Z_Status").length >= 1) {return true;}
    zf.debug("init: top left")
    $("<div/>")
    .addClass("nav-collapse")
    .append(
        $("<div/>")
        .append(
            $("<b/>").append(
                $("<span/>").attr("id","Z_Status").html("Статус").css("color","red")
            .attr("onclick", "zv.alarm_rules=false; zv.alarm_code_2=false;")))
        .append($("<span/>").attr("style","padding-left:5px")
            .append(
            $("<input/>").attr("type","button").attr("value","||")
                //("<a/>").html("<b>||</b>").attr("style","color:white")
                .attr("onclick", "zv.paused=!zv.paused;this.style=zv.paused?'color:red':'color:white';this.title=zv.paused?'на паузі':'НЕ на паузі';")
            )
        )
    )
    .append(
        $("<b/>")
        .append($("<div/>").attr("id","Z_Audio").html("Звук").css("color","red"))
    )
    .append(
        $("<b/>").attr("id","Z_Connection_1").css("color","white")
        .append($("<div/>")
            .append($("<span/>").html("Зв'язок:    "))
            .append($("<span/>").attr("id","Z_Connection_2"))
        )
    )
    .appendTo(elBar)

    $("<div/>")
    .addClass("nav-collapse")
    .append(
        $("<div/>")
        .append(
            $("<a/>")
            .attr("onclick", "zf.start_test()")
            .html("Тест")
        )
    )

    .append(
    $("<div/>")
    .addClass("nav-collapse")
    .append(
        $("<div/>")
        .append(
            $("<span/>")
            .attr("id", "Z_developer_tickers")
            .attr("onclick", "zf.developer_tickers()")
            .css("color", "red")
            .css("display", "none")
            .html("Тікери")
        )
    )
    )
    .appendTo(elBar)

    return false;
}
w.zf.init_top_center = function () {
    //var elButton = "#region-header div.header-view div.col-right [href='#modal_deposit']";
    var elButton2 = "#region-header div.header-view div.col-right span.btn-deposit";
    if ($(elButton2).length == 0) {return true;}
    zf.debug("init: top center")
    $(elButton2)[0].remove();
    return false;
}
w.zf.init_top_right = function() {
    var elGold = "#region-header div.header-view div.col-right div.user-status div.status";
    if ($(elGold).html().indexOf("ZScript") != -1) { return true;}
    zf.debug("init: top right")
    var txt = " +ZScript v" + zs.version;
    if (zs.debug_mode) {txt += " [DBG]";}
    //TODO data from server for paided till...
    $(elGold)[0].innerHTML += txt;
    return false
}
w.zf.init_bottom = function() {
       return true;
       if ($("#region-main div.investments-footer").css("display") == "none") {return true;}
       $("#region-main div.investments-footer").css("display","none");
       if (zs.debug_mode) {
         $("body>div.main-wrap>div.footer").html("");
         $("body>div.main-wrap>div.footer").attr("id","Z_footer");
       } else {
         $("body>div.main-wrap>div.footer").css("display", "none");
       }
       return false;
   }
w.zf.init_center = function() {
  return true;
}
w.zf.init_config = function () {
       if (requirejs.config("app-config").testOptions.hideCommission.featureEnable == false) {
           return true;
       } else {
           requirejs.config("app-config").testOptions.hideCommission.featureEnable = false;
           //requirejs.config("app-config").enableDebugMode=true
           requirejs.config("app-config").disconnectTimeout=365*24*60*60*1000//1 year
           return false;
       }
   }
w.zf.init_css = function () {
       $("div.main-container").width("1028px");
       $("#region-main div.report-header").width("1028px");//does not work
       const prefix_header = "#region-main div.active-investments-view div.report-header ";
       const prefix_list = "#region-main div.active-investments-view div.investments-list ";

       $('html>head').append($('<style>'+prefix_header+'div.col-alias {width:145px;}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-alias input[type=text] {width:148px;}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-alias input[type=submit] {left:117px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-alias {width:74px;}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-startTime {width:97px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-startTime {width:91px; line-height:22px;}</style>'));
       //$('html>head').append($('<style>'+ prefix_list +'div.col-startTime-1 {дулька з маком}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'select.col-select {width:97px; color:black; background:gray; font-size:12px;}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-startRate {width: 89px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-startRate {width: 89px; }</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-curRate {width:89px;text-align: right}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-curRate {width:89px;text-align: right}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-sumInv {width:85px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-sumInv {width:85px;}</style>'));
       $('html>head').append($('<style>'+prefix_header+'div.col-equityInv {width:102px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-equityInv {width:68px;}</style>'));

       $('html>head').append($('<style>'+prefix_header+'div.col-fee {width:85px; text-align: right}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-fee {width:85px; text-align: right}</style>'));

       $('html>head').append($('<style>'+prefix_header+'div.col-profit {width:141px;}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-profit {width:80px;}</style>'));

       $('html>head').append($('<style>'+prefix_list+'div.col-tail {width:174px; line-height:16px; padding-top: 0px; position:relative}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-tail span.tail-1 {float:left; padding-right: 5px; width:40px; text-align: right}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-tail span.tail-2 {width:119px; text-align: left; float:left}</style>'));
       $('html>head').append($('<style>'+ prefix_list +'div.col-tail span.tail-3 {float:right; width:10px; text-align: right}</style>'));
       return true;
   }
w.zf.init_local_storage = function() {
       if (zls.test_rules_version != undefined) {return true;}
       zf.debug("init: local storage");
       try {zf.ls_read("rules");}
       catch {zls.rules = {}; zf.ls_write("rules")};
       try {zf.ls_read("arules");}
       catch {zls.arules = {}; zf.ls_write("arules")};


       try {zf.ls_read("test_rules_version");}
       catch {zls.test_rules_version = 0; zf.ls_write("test_rules_version");}

       try {zf.ls_read("start_rules_version");}
       catch {zls.start_rules_version = 0; zf.ls_write("start_rules_version")}

       trv = 3;
       let tr = [
                 ["OK №1",   "am==20 && mu==5", "A(am*1.04);",1],
                 ["OK №2",   "am==60 && mu==5", "M(mu*1.39);S();U();M(mu+2);",1],
                 ["OK №3",   "pp!=0&&pa!=0&&am==60&&mu==7", "A(am/2.99);SL(41);TP(42);L(43,44);",1],
                 ["FAIL №1", "am==20 && mu==5","A(20); A(9); A(21);",0],
                 ["FAIL №2", "am==60 && mu==5 && dou","A(20); M(4); A(21);",0],
                 ["FAIL №3", "pp!=0&&pa!=0&&am==60&&mu==7", "A(20); dou(); A(21);", 0],
                 ["SKIP №0", "(age<-10 || age>180) && am%20==0", "A(21);" ,1],
                 ["SKIP №1", "am>20 && am<60", "A(21)",1],
                 ["SKIP №2", "mu==6", "A(21)", 1],
                 ["SKIP №3", "am>60 && am<100", "A(21);", 1],
                 ["FIN", "am==100 && mu==7 && age>60", "C()",1]
                 ];
       zv.rules_test_list = [];
       for (i in tr) {
         zv.rules_test_list.push(tr[i][0]);
       }
       if (trv != zls.test_rules_version) {
           //test rules
           zf.log("Прописуємо тестові правила версії " + trv);
           for (let rule_ind in tr) {
               let rule = tr[rule_ind];
               zls.rules[rule[0]] = {name: rule[0], condition: rule[1], command: rule[2], count: rule[3], hidden: true};
           }
           zf.ls_write("rules");
           zls.test_rules_version = trv;
           zf.ls_write("test_rules_version");
       }

       srv = 11;
       let sr = [
              ["111","true", "TP(am/10)",1],
              ["112", "pp>1", "C()",1],
	      ["113", "mu>100 && pa>2", "C()",1],
              ["121", "pa>1", "C()",1],
              ["122", "am>20 && pp>1", "C()",1],
              ["131", "pa>11", "R(); SL(3); TP(am/10)",1],
              ["132", "pa>12", "R(); SL(2); TP(am/10)",0],
              ["211", "pp<-70", "A(am)", 0],
              ["212", "pp<-65", "A(am*2)",1],
              ["221", "pp<-45", "A(am)",1],
              ["222", "pp<-50", "A(am/2)",0],
              ["311", "pp<-45", "M(mu*3)", 1],
              ["312", "am>99 && pp<-40", "M(1)", 1],
              ["313", "am>150 && pp<-40", "M(mu/2)", 1],
              ["314", "am>250 && pp<-40", "M(mu/2)", 1],
              ["321", "am>50 && pp<-40", "M(mu/10)", 1],
              ["322", "am>50 && pp<-40", "M(5)", 1],
              ["323", "am>100 && pp<-40", "M(5)", 1],
              ["333", "am>200 || pp<-90", "M(10)",1],
	      ["341", "pp<-10-15*cnt", "M(mu*2)", 1],
	      ["342", "pp>5+5*cnt", "M(mu/2)", 5],
              ["511", "pp<-20", "M(mu*2)", 1],
              ["512", "pp<-30", "M(mu*2)", 1],
              ["711", "am>50 && pp>2", "C()", 1],
              ["777", "am>150 && pp>1", "C()", 1],
              ["911", "pp<-95", "M(5)", 1],
              ["998", "pp<-99.8", "A(100)", 5],
              ["000", "true", "S(); TP(mu/10)", 1],
              ["001", "true", "U()", 1],
              ["002", "am>250", "U()", 1],
              ["911true", "true", "M(5)", 1],
              ["+B", "am>100 && pp>2+0.5*cnt",   "SLPR(pr-50)", 0],
              ["-B", "am>100 && pp>2+0.5*cnt",   "SLPR(pr+50)", 0],
              ["++B", "am>20 && pp>2+0.5*cnt",   "SLPR(pr-50)", 0],
              ["--B", "am>20 && pp>2+0.5*cnt",   "SLPR(pr+50)", 0],
              ["+J", "pp>4+0.5*cnt",   "SLPR(pr-0.006)", 0],
              ["-J", "pp>4+0.5*cnt",   "SLPR(pr+0.006)", 0],
              ["++J", "am>20 && pp>1+0.5*cnt",   "SLPR(pr-0.007)", 0],
              ["--J", "am>20 && pp>1+0.5*cnt",   "SLPR(pr+0.007)", 0],
              ["+E", "pp>4+0.5*cnt",   "SLPR(pr-0.0001)", 0],
              ["-E", "pp>4+0.5*cnt",   "SLPR(pr+0.0001)", 0],
              ["++E", "am>20 && pp>1+0.5*cnt",   "SLPR(pr-0.0001)", 0],
              ["--E", "am>20 && pp>1+0.5*cnt",   "SLPR(pr+0.0001)", 0],
	      ["UBB", "am>100 && pa>3+cnt", "SLPR(pr*(1+0.04/mu*(dir?-1:1)))", 0],
              ["UB", "pp>5+0.5*cnt", "SLPR(pr*(1+0.04/mu*(dir?-1:1)))", 0]
              ];
       //"if (zrv[id]==undefined) {zrv[id]={};} if (zrv[id].MP==undefined) {zrv[id].MP=pa}"
       if (srv != zls.start_rules_version) {
           //start rules
           zf.log("Прописуємо базові правила версії " + srv);
           for (let rule_ind in sr) {
               let rule = sr[rule_ind];
               zls.rules[rule[0]] = {name: rule[0], condition: rule[1], command: rule[2], count: rule[3], hidden: false};
           }
           zf.ls_write("rules");
           zls.start_rules_version = srv;
           zf.ls_write("start_rules_version");
       }
   }

w.zf.init_close_all_btn = function () {
       var btn = $("div.closing ul.closing-list");
       if (btn.hasClass("z_edited")) {return true;}
       btn.addClass("z_edited");
       return false;
   }



w.zf.init_menu = function() {
       let menu = $("#region-main nav.sub-menu ul");
       if (menu.hasClass("z_edited")) {return true;}
           $("<li/>")
           .append(
               $("<a/>")
               .attr("href","/Z_Rules")
               .html("Правила")
           )
           .insertAfter($("li:last",menu));
           $("<li/>")
           .append(
               $("<a/>")
               .attr("href","/Z_Info")
               .html("Інформація")
           )
           .insertAfter($("li:last",menu));
           $("<li/>")
           .append(
               $("<a/>")
               .attr("href","/Z_Settings")
               .html("Налаштування")
           )
           .insertAfter($("li:last",menu));
           $("<li/>")
           .append(
               $("<a/>")
               .attr("href","/Z_Log")
               .html("Лог")
           )
           .insertAfter($("li:last",menu));
           menu.addClass("z_edited");
   }

w.zf.init_audio = function() {
          var playPromise = zv.audio_silence.play();
          // In browsers that don’t yet support this functionality,
          // playPromise won’t be defined.
          if (playPromise !== undefined) {
              playPromise.then(function() {
                  // Automatic playback started!
                  $("#Z_Audio").css('color','white');
                  zv.audio_inited = true;
              }).catch(function(error) {
                  // Automatic playback failed.
                  // Show a UI element to let the user manually start playback.
                  //console.log("audio err", error)
              })
          } else {
              zf.loge("audio-promise not supported");
              $("#Z_Audio").css('color','green');
              zv.audio_inited = true;
          }
      }
w.zf.init_developer = function () {
  zf.init_developer_params();
  zf.init_developer_check_tickers();
  return true;
}
w.zf.init_developer_params = function() {
  //zs.timer *= 10;
}
w.zf.init_developer_check_tickers = function() {
  tickers = zs.tickers;
  let anti_tickers = {};
  for (var instrument in tickers) {
    anti_tickers[tickers[instrument]] = instrument;
  }
  let founded = false;
  for (var ticker of requirejs.config("app-config").instrumentSymbols) {
    if (anti_tickers[ticker] == undefined) {
      txt = "Знайдено новий тікер: " + ticker;
      zf.debuge(txt);

      elem = $("#Z_developer_tickers");
      elem.attr("title", txt);
      elem.css("display", "");

      founded = true;
      break;
    }
  }
  if (founded == true) {
    //? hmtl
  }
}
w.zf.developer_tickers = async function(limit = 10000) {
  if (!zs.debug_mode) {return;}
  if (zs.account_type != "demo") {
    zf.debug("Тільки на демо же ж");
    return;
  }

  tickers = zs.tickers;
  let site_tickers = requirejs.config("app-config").instrumentSymbols;
  let anti_tickers = {};
  for (var instrument in tickers) {
    anti_tickers[tickers[instrument]] = instrument;
  }

  let new_orders = {};
  let cnt = 0;
  for (var ticker of site_tickers) {
    let instrument = anti_tickers[ticker];
    if (instrument == undefined) {
      //let's create new order
      zf.debug("Створюємо ордер по ... " + ticker);
      try {
        order_id = await zf.new_order(ticker,20,10);
        new_orders[order_id] = true;
      } catch(e) {
        console.error(e);
      }
      instrument = "unknown";
    }
    cnt += 1;
    if (cnt >= limit) {break;}
  }
  zf.debug("Ждемо");
  await new Promise(resolve => setTimeout(resolve, 10000));//ну поки що так
  //------------------------------------------------------------------
  cnt = 0;
  let txt = "w.zs.tickers = {\n";
  let txt2 = "";
  //check ol orders
  let new_tickers = {};
  for (order of zv.orders) {
    new_tickers[order.ticker2] = order.instrument;
  }
  let new_tickets_cnt = 0;
  let failed_new_tickets_cnt = 0;
  for (var ticker of site_tickers) {
    let instrument = anti_tickers[ticker];
    if (instrument == undefined) {
      //ну шо - нашлі?
      instrument = new_tickers[ticker];
      if (instrument == undefined) {
        txt2 += "//  Не зправився з тікером " + ticker + "\n";
        failed_new_tickets_cnt += 1;
      } else {
        txt2 += "//  ++ " + ticker + " " + instrument + "\n";
        new_tickets_cnt += 1;
      }
    }
    if (instrument != undefined) {
      txt += "  \"" + instrument + "\": \"" + ticker + "\",\n";
    }
    cnt += 1;
    if (cnt >= limit) {break;}
  }
  txt = txt.slice(0,-2);
  txt += "\n};\n";
  if (new_tickets_cnt > 0) {
    zf.generateFile("auto_tickers.js.txt", txt + "\n" + txt2);
  }
  //------------------------------------------------------------------
  for (order of zv.orders) {
    if (new_orders[order.id] == true && order.opened && (!order.tradeoff)) {
      await order.action_C();
    }
  }
  //find old tickers
  old_tickets_cnt = 0;
  for (const [ticker, instrument] of Object.entries(anti_tickers)) {
    //Да в пизду - снесутся при добавлении какого-то нового
  }
  //-----final message
  if (new_tickets_cnt > 0 || old_tickets_cnt > 0) {
    msg = "Тікери - є нові.";
  } else {
    msg = "Тікери - на жаль, нічого нового.";
  }
  msg += " +" + new_tickets_cnt +
        " -" + old_tickets_cnt +
        " x" + failed_new_tickets_cnt;
  zf.debuge(msg);
  elem = $("#Z_developer_tickers");
  elem.attr("title", msg);
}
// ------------------ ADD RULE ----------------------
  w.zf.add_rule = function() {
    var name = prompt("Введіть ім'я правила", "-97% +0.5am");
    if (name == null) {return};
    var condition = prompt("Введіть умову спрацювання правила", "profit_pct<-97");
    if (condition == null) {return};
    var command = prompt("Введіть дію по правилу", "i(am*0.5)");
    if (command == null) {return};
    var count = prompt("Введіть кількість спрацювань по правилу (0-безкінечно)", 0);
    if (count == null) {return};
    count = parseInt(count);
    if (isNaN(count) || count==undefined || count == null) {return;}
    zls.rules[name] = {name: name, condition: condition, command: command, count:count, hidden:false};
    zf.ls_write("rules");
    $("#region-main>div.not-found-view").removeClass("z_edited");
  }
  // ------------------ REMOVE RULE ----------------------
  w.zf.remove_rule = function(name) {
    delete zls.rules[name];
    zf.ls_write("rules");
    $("#region-main>div.not-found-view").removeClass("z_edited");
  }
  // -------------------- EDIT RULE ----------------------
  w.zf.edit_rule_condition = function(rule_name) {
      var rule = zls.rules[rule_name];
      var ans=prompt('Введіть умову спрацювання правила',rule.condition);
      if (ans==null) {return};
      rule.condition = ans;
      zf.ls_write("rules");
      $("#region-main>div.not-found-view").removeClass("z_edited");
  }
  w.zf.edit_rule_command = function(rule_name) {
      var rule = zls.rules[rule_name];
      var ans=prompt('Введіть дію по правилу',rule.command);
      if (ans==null) {return};
      rule.command = ans;
      zf.ls_write("rules");
      $("#region-main>div.not-found-view").removeClass("z_edited");
  }
   w.zf.edit_rule_count = function(rule_name) {
      var rule = zls.rules[rule_name];
      var ans=prompt('Введіть кількість спрацювань по правилу',rule.count);
      if (isNaN(ans) || ans==undefined || ans == null) {return;}
      rule.count = ans;
      zf.ls_write("rules");
      $("#region-main>div.not-found-view").removeClass("z_edited");
  }
  w.zf.item_rule = function(item_id, rule_id) {
        //append rule to item or remove from item
        if (!(item_id in zls.arules)) {
            zls.arules[item_id] = {};
        }
        if (rule_id in zls.arules[item_id]) {
            if (confirm("Відв'язати правило \"" + rule_id +"\" від заявки " + item_id + "?") == true) {
                delete zls.arules[item_id][rule_id];
                if (item_id in zv.errrules && rule_id in zv.errrules[item_id]) {
                    delete zv.errrules[item_id][rule_id];
                }
                zf.log(item_id + ": " + rule_id + ": відв'язано правило.");
                zf.ls_write("arules");
            }
        } else {
            if (confirm("Прив'язати правило \"" + rule_id +"\" до заявки " + item_id + "?") == true) {
                zls.arules[item_id][rule_id] = 0;
                zf.log(item_id + ": " + rule_id + ": прив'язано правило");
                zf.ls_write("arules");
            }
        }
        zf.update_row_view(item_id);
        //remove classes and item_id from menu to rebuild options list
        /*var menu = $("div.investment-menu div.drop-down ul."+item_id);
        if (menu.length != 0) {
            menu.removeClass(item_id.toString());
        }*/
    }

w.zf.find_id_in_row_data = function(t) {
  var id = $("div.col-alias span.col-ticket", t)[0].innerHTML;
  id = id.split("-");
  return id[1];
}

    // ---------------- PAGE RULES DO -------------------
  w.zf.page_rules_do = function() {
      const el = $("#region-main>div.not-found-view");
      if (!el.hasClass("z_edited")) {
          zf.garbage_collector();
          //html modify
          el.html("").css("text-align","left");
          // --------------------------------------- active rules
          $("<b/>")
          .css("color","coral")
          .append($("<font/>")
                  .html("Активні правила:")
          )
          .appendTo(el);
          //table header
          $('<table/>')
          .attr("width","100%")
          .attr("class","arules")
          .append($('<tr/>')
              .append($('<td/>')
                  .append($('<div/>').html("Угода")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Правило")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Зпрацювань")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Видалити")
                  )
              )
          )
          .appendTo(el);
          var rules_are_using = {};
          var elTable = $("table.arules",el);
          $.each(zv.data, function(item_id, item) {
              $.each(zls.arules[item_id], function(rule_id, cnt) {
                  var rule = zls.rules[rule_id];
                  var arule = zls.arules[item_id][rule_id];
                  var item = zv.data[item_id];
                  if (rule.hidden && zs.debug_mode == false) {
                      return;
                  }
                  var ccnt;
                  if (rule.count == 0) {
                      ccnt = arule.toString();
                  } else {
                      ccnt = arule.toString() + "/" + rule.count.toString();
                  }
                  rules_are_using[rule_id]=true;
                  //add to table
                  $("<tr/>")
                  .mouseover(function(){this.style.backgroundColor="gray";})
                  .mouseout(function(){this.style.backgroundColor="#242526";})

                  .append($('<td/>')
                          .html(item.id + " " + item.name + "-"+
                               (item.dir_up?"u ":"d ")+
                                item.amount.toString()+"x"+item.multiplier.toString()
                               )
                         )
                  .append($('<td/>')
                          .text(rule.name)
                         )
                  .append($('<td/>')
                          .text(ccnt)
                         )
                  .append($('<td/>')
                          .append($('<a/>')
                                  .attr("onclick","zf.item_rule(" + item_id + ",'"+rule_id+"');$('#region-main>div.not-found-view').removeClass('z_edited');")
                                  .html("X")
                                  )
                          )
                  .appendTo(elTable);

              })
          })
          //------------- ----------------- user rules
          $("<b/>")
          .css("color","coral")
          .append($("<font/>")
                  .html("Правила:")
          )
          .append($("<a/>")
                  .attr("onclick","zf.add_rule()")
                  .html("+")
          )
          .appendTo(el);

          //table header
          $('<table/>')
          .attr("width","100%")
          .attr("class", "urules")
          .append($('<tr/>')
              .append($('<td/>')
                  .append($('<div/>').html("Назва")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Умова")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Команда")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Кількість")
                  )
              )
              .append($('<td/>')
                  .append($('<div/>').html("Видалити")
                  )
              )
          )
          .appendTo(el);

          //table data
          elTable = $("table.urules",el);
          $.each(zls.rules,function(name,rule){
              const non_deleting = (rule.hidden || rules_are_using[name] == true);
              if (rule.hidden && zs.debug_mode == false) {
                  return;
              }
              $("<tr/>")
                  .mouseover(function(){this.style.backgroundColor="gray";})
                  .mouseout(function(){this.style.backgroundColor="#242526";})
                  .append($('<td/>')
                          .html(rule.name)
                         )
                  .append($('<td/>')
                          .append($("<a/>")
                                  .attr("onclick","zf.edit_rule_condition('"+name+"');")
                                  .html(rule.condition))
                         )
                  .append($('<td/>')
                         .append($("<a/>")
                                  .attr("onclick","zf.edit_rule_command('"+name+"');")
                                  .html(rule.command))
                         )
                  .append($('<td/>')
                         .append($("<a/>")
                                  .attr("onclick","zf.edit_rule_count('"+name+"');")
                                  .html(rule.count))
                         )
                  .append($('<td/>')
                          .append($('<a/>')
                                  .attr("onclick","zf.remove_rule('"+rule.name+"');")
                                  .html((non_deleting?"":"X"))
                                  )
                          )
                  .appendTo(elTable);
          })
          el.addClass("z_edited");
      }
  }
  // ------------ MODIFY HTML TABLE HEADER ---------------
  w.zf.modify_HTML_table_header = function(row) {
      $("<div/>")
      .addClass("col")
      .addClass("col-curRate")
      .append(
          $("<span/>")
          .attr("data-sort","curRate")
          .html("Поточна ціна")
      )
      .insertBefore($(".col-sumInv", row))
      $("<div/>")
      .addClass("col")
      .addClass("col-fee")
      .append(
          $("<span/>")
          .attr("data-sort","fee")
          .html("Комісія")
      )
      .insertBefore($(".col-profit", row))
      row.addClass("z_edited");

  }
  // ------------ MODIFY HTML TABLE ROW ---------------
  w.zf.modify_HTML_table_row = function(row) {
      const id = zf.find_id_in_row_data(row);
      $("<div/>")
      .addClass("col")
      .addClass("col-curRate")
      .insertBefore($(".col-sumInv", row))
      $("<div/>")
      .addClass("col")
      .addClass("col-alias")
      .addClass("col-fee")
      .append(
          $("<span/>")
          .addClass("alias")
      )
      .append($("<br>"))
      .append(
          $("<span/>")
          .addClass("col-ticket")
      )
      .insertBefore($(".col-profit", row))
      $("<div/>")
      .addClass("col")
      .addClass("col-tail")
      .insertAfter($("a.invest-close", row))
      var ddd = $("div.col-startTime",row).html()
      $("div.col-startTime",row)
      .html(" ")
      .append(
          $("<div/>")
          .addClass("col-startTime-1")
          .html(ddd)
      ).append(
          $("<select/>")
          .addClass("col-select")
          .attr("onchange", "zf.item_rule(" + id + ", value);")
          .attr("onclick", "event.stopPropagation();")
          .append(
              $("<option/>")
              .attr("value",0)
              .html("правила")
           )
      )

      row.attr("z_id", id);
      row.addClass("z_edited");

  }
  // -------------- ACTIVE PREPARE-------------------------
   w.zf.active_prepare = function () {
       const h = "#region-main div.investments-header";
       if ($(h).not('.z_edited').length) {
         zf.modify_HTML_table_header($(h));
       }
       const r = "#region-main div.investments-list div.row";
       $(r).each(function (index) {
           if ($(this).not('.z_edited').length) {
               zf.modify_HTML_table_row($(this));
           }
       })
   }

   // -------------- ACTIVE UPDATE-------------------------
w.zf.active_update = function () {
    $("#region-main div.investments-list div.row").each(function (index) {
        const order_id = this.getAttribute("z_id");
        const order = zv.orders[zv.orders_indexes[order_id]];
        const div = $("div.col-tail", this);
        //--------info edit-------------
        //current price
        const elCurPrice = $("div.col-curRate", this);
        const txtCurPrice = (order.price_cur==undefined) ? "N/A" : order.price_cur
        if (elCurPrice.html() != txtCurPrice) {elCurPrice.html(txtCurPrice);}
        if (order.price_cur == undefined) {
            if (elCurPrice.hasClass("neg")) { elCurPrice.removeClass("neg")}
            if (elCurPrice.hasClass("pos")) { elCurPrice.removeClass("pos")}
        } else {
            if ((order.direction == "up" && order.price_cur > order.price_start) ||
                (order.direction == "down" && order.price_cur < order.price_start)) {
                if (elCurPrice.hasClass("neg")) { elCurPrice.removeClass("neg")}
                if (!elCurPrice.hasClass("pos")) { elCurPrice.addClass("pos")}
            } else {
                if (elCurPrice.hasClass("pos")) { elCurPrice.removeClass("pos")}
                if (!elCurPrice.hasClass("neg")) { elCurPrice.addClass("neg")}
            }
        }
        //fee
        const txtFee1 = (order.fee == undefined) ? "N/A":
              (100*order.fee_small).toPrecision(zs.pct_digits)+"%";
        const elFee1 = $("div.col-fee span.alias", this);
        if (elFee1.html() != txtFee1) {elFee1.html(txtFee1);}

        let txtFee2 = (order.fee == undefined) ? "":
                 "×" + order.multiplier + "="+ (100*order.fee).toPrecision(zs.pct_digits)+"%";
        //if (zs.debug_mode) {
        //  txtFee2 = "" + order.is_auto;
        //  txtFee2 = "" + order_id + " " + zrv[parseInt(order_id)].MPA + " " + zrv[""+order_id].MPA;
        //}
        //const elFee2 = $("div.col-fee span.col-ticket", this);
        //if (elFee2.html() != txtFee2) {elFee2.html(txtFee2);}
        //order.ok - correctness
        const elName = $("div.col-alias a", this);
        if (order.ok && elName.hasClass("neg")) {elName.removeClass("neg");}
        if ((!order.ok) && (!elName.hasClass("neg"))) {elName.addClass("neg");}

        //-------------rules edit----------
        if (div.hasClass("Z_edited")) {return true;}
        var rules_cnt = 0;
        div.html("");
        if (zls.arules[order_id] == undefined) {zls.arules[order_id] = {};}
        //draw
        for (var rule_id in zls.arules[order_id]) {
            rules_cnt += 1;
            const rule = zls.rules[rule_id];
            const cnt = zls.arules[order_id][rule_id];
            const txt = ((rule.count == 0) ? "" + cnt : "" + cnt + "/" + rule.count);
            var color = (rule.count !=0 && cnt >= rule.count) ? "gray" : "cyan";
            if (order_id in zv.errrules && zv.errrules[order_id][rule_id] == true) {color = "red";}
            $("<div/>")
            .css('color', color)
            .append(
                $("<span/>")
                .addClass("tail-1")
                .html(txt)
            ).append(
                $("<span/>")
                .addClass("tail-2")
                .html(" " + rule_id)
                .attr("title",""+rule.condition+"\r\n"+rule.command)
            ).append(
                $("<span/>").append($("<a/>")
                .html("X")
                .attr("href","javascript:zf.item_rule("+order_id+",'"+rule_id+"')")
            )).appendTo(div);
         }
        const height = ((rules_cnt)>3? rules_cnt*16:16*3);
        this.style.height = height + "px";
        //select-box
        const selectbox = $("select.col-select", this);
        selectbox.empty();
        selectbox.append($("<option/>").attr("value", 0).html("правила"));
        Object.entries(zls.rules).forEach(([rule_id, rule]) => {
            if (rule.hidden == true) {return;}
            const rule_on = (order_id in zls.arules && rule_id in zls.arules[order_id]);
            const prefix_rule = rule_on? "===":"......";
            selectbox.append(
                $("<option/>")
                .html(prefix_rule + " " + rule_id)
                .attr("value", rule_id)
            )
        });
        div.addClass("Z_edited");
    })

}
w.zf.update_row_view = function(order_id) {
    $("#region-main div.investments-list div.row[z_id='"+order_id+"'] div.col-tail").removeClass("Z_edited");
}
// ---------------- PAGE INFO DO -------------------
    w.zf.page_info_do = function() {
        const el = $("#region-main>div.not-found-view");
        if (!el.hasClass("z_edited")) {
            el.html("").css("text-align","left");
            //////////////////////
            $("<div/>").css("color","coral").html("Дисклеймер:").appendTo(el);
            $("<div/>")
            //.css("color","coral")
            .html("\tСкрипт працює з веб-сторінкою, зміст якої керується розробниками сайту.\
                  Тому будь-які зміни веб-сайту, внесені розробниками, можуть призвести як \
                  до непрацездатності скрипту, так і до його невірної (катастрофічної) роботи. \
                  Те ж саме може статися через помилки у скрипті.")
            .appendTo(el);
            $("<div/>")
            .html("\tТакож адміністратори Веб-сайту можуть відслідкувати модифікацію сайту.")
            .appendTo(el);
            $("<div/>")
            .html("\tВиходячи з вищенаведеного, розробник скрипту не несе жодної відповідальності \
за будь-які наслідки, пов'язані з використанням скрипта.")
            .appendTo(el);
            ///////////////////
            $("<div/>").css("color","coral").html("Статус:").appendTo(el);
            $("<div/>")
            .html("Червоний колір напису \"Статус\" означає помилку. Можливі помилки:")
            .appendTo(el);
            $("<div/>")
            .html("Помилка виконання дій по правилу - помилка в правилі, введеного користувачем, \
або помилка сервера при виконанні команди цього правила.")
            .appendTo(el);
            $("<div/>")
            .html("Помилка скрипта - помилка в коді скрипта. Необхідно звернутися до розробника з логами.")
            .appendTo(el);
            $("<div/>")
            .html("Помилка скрипта при опрацюванні відповіді сервера на дію - також помилка скрипта. Див вище по помилці скрипта.")
            .appendTo(el);

            $("<div/>")
            .html("Також червоним може бути напис \"Зв'язок\" - необхідно відновити доступ до інтернету. \
Після цього бажано ще й перезавантажити сторінку.")
            .appendTo(el);
            el.addClass("z_edited");
            ///////////////////
            $("<div/>").css("color","coral").html("Програмування:").appendTo(el);
            $("<div/>")
            .html("Обмежено здійснюється на мові програмування javascript.")
            .appendTo(el);
            ///////////////////
            $("<div/>").css("color","coral").html("Доступні дані:").appendTo(el);
            $("<div/>")
            .append($("<b/>").html("pp"))
            .append(" - прибуток у відсотках. Синонім - ")
            .append($("<b/>").html("profit_pct"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("pa"))
            .append(" - прибуток в абсолютних грошових одиницях. Синонім - ")
            .append($("<b/>").html("profit_abs"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("mu"))
            .append(" - мультиплікатор. Синоніми - ")
            .append($("<b/>").html("mult, multiplier"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("am"))
            .append(" - сума угоди. Синонім - ")
            .append($("<b/>").html("amount"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("pr"))
            .append(" - ціна інструменту. Синонім - ")
            .append($("<b/>").html("price"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("ag"))
            .append(" - час життя угоди у секундах. Синонім - ")
            .append($("<b/>").html("age"))
            .appendTo(el);

            $("<div/>").css("color","coral").html("Доступні команди:").appendTo(el);
            $("<div/>")
            .append($("<b/>").html("A(value)"))
            .append(" - збільшити суму угоди на абсолютну суму <value>. Синонім - ")
            .append($("<b/>").html("increase_investment(value)"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("M(value)"))
            .append(" - змінити мультиплікатор на value. Синонім - ")
            .append($("<b/>").html("edit_multiplier(value)"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("L(sl, tp)"))
            .append(" - встановити ліміти stop loss та take profit. Синонім - ")
            .append($("<b/>").html("limit(sl, tp)"))
            .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("SL(val)"))
            .append(" - встановити ліміт stop loss в абсолютних одиницях та видалити ліміт take_profit. Синонім - ")
            .append($("<b/>").html("stop_loss(val)"))
            .appendTo(el);
            el.addClass("z_edited");
            $("<div/>")
            .append($("<b/>").html("TP(val)"))
            .append(" - встановити ліміт take profit в абсолютних одиницях та видалити ліміт stop loss. Синонім - ")
            .append($("<b/>").html("take_profit(val)"))
            .appendTo(el);
             $("<div/>")
            .append($("<b/>").html("S()"))
            .append(" - ввімкнути опцію автопоповнення угоди при margin call. Синонім - ")
            .append($("<b/>").html("set_auto()"))
            .appendTo(el);
            $("<div/>")
           .append($("<b/>").html("U()"))
           .append(" - вимкнути опцію автопоповнення угоди при margin call. Синонім - ")
           .append($("<b/>").html("unset_auto()"))
           .appendTo(el);
            $("<div/>")
            .append($("<b/>").html("R()"))
            .append(" - реінвестувати прибуток. Синонім - ")
            .append($("<b/>").html("reinvest_profit()"))
            .appendTo(el);
            el.addClass("z_edited");
            $("<div/>")
            .append($("<b/>").html("C()"))
            .append(" - закрити заявку. Синонім - ")
            .append($("<b/>").html("close()"))
            .appendTo(el);
            el.addClass("z_edited");

        }
    }
w.zf.action_N = function(symbol, sumInv, mult, direction_up, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/open-position", {symbol: symbol,
                                            sumInv: sumInv,
                                            mult: mult,
                                            direction: (direction_up==true?"growth":"reduction")
                                           })
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
    .fail(function(data) {f_fail(data, extra_data);})
}

w.zf.action_C = function(item_id, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/close-position", {investId:item_id})
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}

w.zf.action_M = function(item_id, val, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/change-mult", {positionId:item_id, mult: val})
     .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}

w.zf.action_A = function(item_id, val, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/increase-position", {positionId:item_id, addInv: val})
     .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_R = function(item_id, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/reinvest-profit", {positionId:item_id})
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_L = function(item_id, sl, tp, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/set-limit", {investId:item_id, limitTP: tp, limitSL: sl})
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_SL = function(item_id, sl, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/set-limit", {investId:item_id, limitSL: sl})
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_SLPR = function(item_id, sl_price, f_ok, f_fail, extra_data = undefined) {
  $.post("/spa/investing/set-limit", {investId:item_id, stopLossPrice: sl_price})
  .done(function(data) {
      if (data.status == "ok") {
          f_ok(data, extra_data);
      } else {
          f_fail(data, extra_data);
      }
  })
   .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_TP = function(item_id, tp, f_ok, f_fail, extra_data=undefined) {
    $.post("/spa/investing/set-limit", {investId:item_id, limitTP: tp})
    .done(function(data) {
        if (data.status == "ok") {
            f_ok(data, extra_data);
        } else {
            f_fail(data, extra_data);
        }
    })
     .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_TPPR = function(item_id, tp_price, f_ok, f_fail, extra_data = undefined) {
  $.post("/spa/investing/set-limit", {investId:item_id, takeProfitPrice: tp_price})
  .done(function(data) {
      if (data.status == "ok") {
          f_ok(data, extra_data);
      } else {
          f_fail(data, extra_data);
      }
  })
   .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_S = function(item_id, f_ok, f_fail, extra_data=undefined) {
  $.post("/spa/investing/auto-increase", {positionId:item_id, flag: 1})
  .done(function(data) {
      if (data.status == "ok") {
          f_ok(data, extra_data);
      } else {
          f_fail(data, extra_data);
      }
  })
   .fail(function(data) {f_fail(data, extra_data);})
}
w.zf.action_U = function(item_id, f_ok, f_fail, extra_data=undefined) {
  $.post("/spa/investing/auto-increase", {positionId:item_id, flag: 0})
  .done(function(data) {
      if (data.status == "ok") {
          f_ok(data, extra_data);
      } else {
          f_fail(data, extra_data);
      }
  })
   .fail(function(data) {f_fail(data, extra_data);})
}

w.zf.active_proc_actions = function () {
    for (var item_id in zv.queue) {
        if (zv.queue[item_id].length > 0) {
            if (zv.queue[item_id][0].in_process == false) {
                var act = zv.queue[item_id][0];
                const extra = {"rule": act.rule, "item": item_id};
                if (act.action=="A") {
                    zf.log(item_id + ": " + act.rule + ": збільшення інвестиції на " + act.param1);
                    zf.action_A(item_id, act.param1,zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="M") {
                    zf.log(item_id + ": " +act.rule + ": зміна мультиплікатору на " + act.param1);
                    zf.action_M(item_id, act.param1, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="C") {
                    zf.log(item_id + ": " + act.rule + ": закриття заявки");
                    zf.action_C(item_id, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="L") {
                    zf.log(item_id + ": " + act.rule + ": встановлення лімітів на " + act.param1 + "/"+act.param2);
                    zf.action_L(item_id, act.param1, act.param2, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="SL") {
                    zf.log(item_id + ": " + act.rule + ": встановлення SL " + act.param1);
                    zf.action_SL(item_id, act.param1, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="SLPR") {
                    zf.log(item_id + ": " + act.rule + ": встановлення SL по ціні " + act.param1);
                    zf.action_SLPR(item_id, act.param1, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="TP") {
                    zf.log(item_id + ": " + act.rule + ": встановлення TP " + act.param1);
                    zf.action_TP(item_id, act.param1, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="TPPR") {
                      zf.log(item_id + ": " + act.rule + ": встановлення TP по ціні " + act.param1);
                      zf.action_TPPR(item_id, act.param1, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="R") {
                    zf.log(item_id + ": " + act.rule + ": реінвестування прибутку");
                    zf.action_R(item_id, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="S") {
                      zf.log(item_id + ": " + act.rule + ": ввімкнення опції автопоповнення");
                      zf.action_S(item_id, zf.loopback_ok,zf.loopback_fail, extra);
                } else if (act.action=="U") {
                      zf.log(item_id + ": " + act.rule + ": вимкнення опції автопоповнення");
                      zf.action_U(item_id, zf.loopback_ok,zf.loopback_fail, extra);
                } else {
                    zf.loge("Якась фігня!!! Зверніться до розробника з логами");
                }
                zv.queue[item_id][0].in_process = true;
            }
        }
    }
}

w.zf.loopback_ok = function (data, extra_data) {
    try {
        const item_id = extra_data.item;
        const rule_id = extra_data.rule;
        zf.log(item_id + ": " + rule_id + ": дія виконана успішно.");
        zv.queue[item_id].shift();
        if (zv.queue[item_id].length == 0) {
            console.log("post check required");
            console.log(data);
            console.log(extra_data);
            zv.kostil[item_id] = Date.now();
            w.zf.active_proc_actions();
        } else {
            w.zf.active_proc_actions();
        }
    } catch {
        zv.alarm_code_2 = true;
    }
}
w.zf.loopback_fail = function(data, extra_data) {
    try {
        const item_id = extra_data.item;
        const rule_id = extra_data.rule;
        zf.loge(item_id + ": " + rule_id + ": дія не виконана (помилка СЕРВЕРа).");
        zf.loge(JSON.stringify(data));
        zv.queue[item_id].shift();
        zv.alarm_rules = true;
        //mark arule errored
        if (item_id in zv.errrules){} else {zv.errrules[item_id] = {};}
        zv.errrules[item_id][rule_id] = true;
        //remove all actions for this rule!!!
        while (zv.queue[item_id].length>0 && zv.queue[item_id][0].rule == rule_id) {
            zf.log(item_id + ": " + rule_id + ": наступна дія по правилу відмінена");
            zv.queue[item_id].shift();
        }
        if (zv.queue[item_id].length == 0) {
            console.log("post check required");
            console.log(data);
            console.log(extra_data);
            zv.kostil[item_id] = Date.now();
        } else {
            w.zf.active_proc_actions();
        }

        w.zf.active_proc_actions();
        try {
            $("#region-main div.investments-list div.row[z_id='" + item_id+ "'] div.col-tail").removeClass("Z_edited");
        } catch {;}
    } catch(err) {
        zv.alarm_code_2 = true;
    }
}
w.zf.new_order = async function (instrument, amount, multiplier) {
    var ret = await $.post("/spa/investing/open-position",
       {symbol: instrument, sumInv: amount, mult: multiplier, direction: (true?"growth":"reduction")}
      )
    if (ret.status == "error") {
        throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    return ret.result.investId
}
w.zf.start_test = function() {
    if (zs.account_type != "demo") {alert("Тільки на демо"); return;}
    zf.action_N("Bitcoin", 20, 5, true,
                function(d, ed) {
                  setTimeout(zf.rules_test, 5000, d["result"]["investId"]);
                },
                function(d, ed) {
                  zf.loge("Невдача запуску тестів під час створення угоди.");
                  zf.loge(d);//TODO saying Object [object]
                }
            );
}
w.zf.rules_test = function(item_id) {
    for (const rule_i in zv.rules_test_list) {
        const rule_id = zv.rules_test_list[rule_i]
        zls.arules[item_id][rule_id] = 0;
    }
    //zf.ls_write("arules");
    $("#region-main div.investments-list div.row[z_id='"+item_id+"'] div.col-tail").removeClass("Z_edited");
}

// ------------ GARBAGE COLLECTOR ----------------------
w.zf.garbage_collector = function () {
    //clear arules for dead items
    //TODO ping to server with real username
    if (Object.keys(zv.data).length != 0) {
        var cnt = 0;
        const ks = Object.keys(zv.data);
        $.each(zls.arules, function(item_id, arules) {
            if (!(item_id in zv.data)) {
                delete zls.arules[item_id];
                cnt += 1;
            }
        })
        if (cnt>0) {
            zf.log("Видалено активні правила по " + cnt + " відпрацьованих заявках.");
            w.zf.ls_write("arules");
        } else {
            //console.log("nothing");
        }
    }
}
// ------------------ WATCHDOG -----------------------
w.zf.wdt = function() {
  var rates_are_same = true;
  $("#region-favorites-instruments .favorites-list-view .favorites-instrument-view").each(
    function(index) {
      var name=$(".col-title",this).text();
      var value=zf.parseFloat($(".col-rate",this).text());
      if (zv.wdt_data[name] != undefined && zv.wdt_data[name] != value) {
        rates_are_same = false;
      }
      zv.wdt_data[name] = value
    }
  )
  if (rates_are_same) {
    zv.wdt_cnt += 1;
  } else {
    if (zv.debug_mode) {
      $("#Z_Connection_1").attr("title", JSON.stringify(zv.wdt_data).replaceAll(',"',',\r\n"'));
    }
    zv.wdt_cnt = 0;
  }
  $("#Z_Connection_2").html(parseInt(zv.wdt_cnt/zs.wdt_divisor));
  if ((zv.alarm_wdt == false) && (zv.wdt_cnt >= zs.wdt_cnt)) {
    $("#Z_Connection_1").css('color', 'red');
    zv.alarm_wdt = true;
  } else if ((zv.alarm_wdt == true) && (zv.wdt_cnt < zs.wdt_cnt)) {
    $("#Z_Connection_1").css('color', 'white');
    zv.alarm_wdt = false;
  }
}
// --------------- CLOSE ADS ------------------------
w.zf.close_ads = function() {
    var gopa = $("#modal div.push-promote-modal-view");
    if (gopa.length>0) {
      zf.log("Закриваємо нав'язливу блокуючу рекламу");
      $("div.close", gopa).click();
    }
}
w.zf.close_block = function() {
    if ($("#modal div.modal-disconnect").length > 0) {
        zf.log("Видаляємо всю цю фігню про призупинення через неактивність. Це повідомлення більше не має з'являтися взагалі");
        $("#modal div.modal-disconnect").remove();
        $("div.main-wrap>div.modal-wrap").remove();
    }
}
w.initiator = "eppala";
w.set_status = function (x) {$("#Z_Audio").html(x);}

w.orders_update = async function() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
}
w.zv.info_used = {};
w.zv.info_result = {};
w.zv.info_profitA = {};
w.zv.info_profitC = {};
w.zv.info_count = {};

w.info = {};//profitA profitC used result
w.info.result = function(ticker = "") {
  if (ticker == "") {
    return zv.info_result[""];
  } else if (ticker in zv.info_result) {
    return zv.info_result[ticker];
  } else {
    return 0;
  }
}
w.info.used = function(ticker = "") {
  if (ticker == "") {
    return zv.info_used[""];
  } else if (ticker in zv.info_used) {
    return zv.info_used[ticker];
  } else {
    return 0;
  }
}
w.info.profitA = function(ticker = "") {
  if (ticker == "") {
    return zv.info_profitA[""];
  } else if (ticker in zv.info_profitA) {
    return zv.info_profitA[ticker];
  } else {
    return 0;
  }
}
w.info.profitC = function(ticker = "") {
  if (ticker == "") {
    return zv.info_profitC[""];
  } else if (ticker in zv.info_profitC) {
    return zv.info_profitC[ticker];
  } else {
    return 0;
  }
}
w.info.count = function(ticker = "") {
  if (ticker == "") {
    return zv.info_count[""];
  } else if (ticker in zv.info_count) {
    return zv.info_count[ticker];
  } else {
    return 0;
  }
}

w.zf.pizdec = function () {
  let EOa = 0;
  Object.keys(zv.data).forEach(item => {
    EOa += zv.data[item].profit_abs;
  });
  Object.keys(zv.data).forEach(item => {
    zv.data[item].EOa = EOa;
  });
  //var INFO
  zv.info_result = {"":0};
  zv.info_used = {"":0};
  zv.info_profitA = {"":0};
  zv.info_profitC = {"":0};
  zv.info_count = {"":0};
  Object.keys(zv.data).forEach(item => {
    if (!(zv.data[item].ticker in zv.info_result)) {
      zv.info_result[zv.data[item].ticker] = 0;
      zv.info_used[zv.data[item].ticker] = 0;
      zv.info_count[zv.data[item].ticker] = 0;
      //zv.info_profitA[zv.data[item].ticker] = 0;
      //zv.info_profitC[zv.data[item].ticker] = 0;
    }
    zv.info_result[""] += zv.data[item].res;
    zv.info_result[zv.data[item].ticker] += zv.data[item].res;
    zv.info_used[""] += zv.data[item].amount;
    zv.info_used[zv.data[item].ticker] += zv.data[item].amount;
    zv.info_count[""] += 1;
    zv.info_count[zv.data[item].ticker] += 1;
  });
  Object.keys(zv.info_result).forEach(ticker => {
    zv.info_profitA[ticker] = zv.info_result[ticker] - zv.info_used[ticker];
    zv.info_profitC[ticker] = (zv.info_result[ticker] - zv.info_used[ticker])/zv.info_used[ticker]*100;
  });
}
w.zf.active_parse = function () {
   zv.data = {};
   //for (let order_index = 0; order_index < zv.orders.length; ++order_index) {
   //   zv.orders_indexes[zv.orders[order_index].id]=order_index;
   //}
   active_orders_list = {};
   $("#region-main div.investments-list div.row").each(function (index) {
       //requirejs.config("app-config").userData.investments[0] -> в жопу
       const id = this.getAttribute("z_id");//PIZDEC
       active_orders_list[id] = true;
       var item = {id: id, ok: true};
       item.name = $("div.col-alias a.alias", this).text();
       item.ticker = $("div.col-alias span.col-ticket", this).text().split("-")[0];
       var dir_up = $("div.col-direction span.invest-growth", this).length;
       var dir_down = $("div.col-direction span.invest-reduction", this).length;
       if (dir_up==1 && dir_down==0) {
           item.direction = "up";
           item.dir_up = true;
       } else if (dir_up==0 && dir_down==1) {
           item.direction = "down";
           item.dir_up = false;
       } else {
           item.direction = "unknown";
           item.dir_up = undefined;
           item.ok = false;
       }
       item.date = $("div.col-startTime-1", this).text();
       item.price_start = zf.parseFloat($("div.col-startRate", this).text());
       item.amount = zf.parseFloat($("div.col-sumInv", this).text());
       item.multiplier =  zf.parseInt($("div.col-multiplier span.col-mult", this).text());
       item.res = zf.parseFloat($("div.col-equityInv", this).text());
       item.price_cur = zv.wdt_data[item.name];
       //item.tradeoff = ($("div.icon-product span.trade-off",this).length == 1);
       item.tradeoff = ($("div.icon-product span.trade-flag-off",this).length == 1);

       //fee
       if (item.price_cur == undefined || (item.direction != "up" && item.direction != "down")) {
           item.fee = undefined;
       } else {
           var delta = item.price_cur/item.price_start;
           if (item.direction == "down") {
               //delta = 1/delta; nooooooooooooooooo
               delta = 2-delta;
           }
           delta -= 1;
           delta *= item.multiplier;
           var exp_res = item.amount * (1+delta);
           item.fee = (exp_res - item.res) / item.amount;
           item.fee_small = item.fee/item.multiplier
       }

       //age
       item.age = zf.calcAge(item.date);
       //elCurPrice.html(item.age)
       //check ok
       if (isNaN(item.amount) || item.amount===undefined) {
           item.ok = false
       }
       if (isNaN(item.price_start) || item.price_start===undefined) {
           item.ok = false
       }
       if (isNaN(item.res) || item.res===undefined) {
           item.ok = false
       }
       if (isNaN(item.multiplier) || item.multiplier===undefined) {
           item.ok = false
       }
       if (isNaN(item.price_cur)) {
           item.ok = false
       }
       //check correctness of profit_pct or profit_abs
       item.profit_abs = item.res-item.amount;
       item.profit_pct = (item.profit_abs/item.amount)*100;
       var site_profit = zf.parseFloat($("div.col-profit>span", this).text());
       var test_1, test_2;
       if ($("div.col-profit", this)[0].classList.contains("pct")) {
           test_1 = item.profit_pct + 100;
           test_2 = site_profit + 100;
           if (Math.abs((test_2-test_1)/test_1) > zs.epsilon_pct) {
               item.ok = false;
           }
       } else {
           test_1 = item.profit_abs + item.amount;
           test_2 = site_profit + item.amount;
           if (Math.abs((test_2-test_1)/test_1) > zs.epsilon_abs) {
               item.ok = false;
           }
       }
       zv.data[item.id] = item;
       //new code here ....
       let order = undefined;
       if (zv.orders_indexes[item.id]!=undefined) {
         order = zv.orders[zv.orders_indexes[item.id]];
         if (order.amount != item.amount || order.multiplier != item.multiplier) {
           zf.audio_info();
         }
         order.price_start = item.price_start;
         order.amount = item.amount;
         order.multiplier = item.multiplier;
         order.result = item.res;
         order.tradeoff = item.tradeoff;
         order.instrument = item.name; //budlo-coding
         order.ticker = zs.tickers[order.instrument];//mega-budlo-coding
         order.ticker2 = item.ticker;

         order.update();
       } else {
         order = new zv.Order(id, item.name, item.direction,
                                       item.date, item.price_start,
                                       item.amount, item.multiplier,
                                       item.res, item.tradeoff);
         zv.orders_indexes[id]=zv.orders.push(order)-1;
         zf.audio_info();
       }
       //if (zs.debug_mode) {
       //   order.action_info();
       //}

   })
   //mark closed orders
   for (let order_index = 0; order_index < zv.orders.length; ++order_index) {
     order = zv.orders[order_index];
     if (order.opened) {
       if (!(order.id in active_orders_list)) {
         if (order.price_start != 42) {
           order.opened = false;
           zf.audio_info();
           order.update();
         }
       }
     }
   }
   //debugging
   if (true && zs.debug_mode) {
     let txt = "";
     for (let order_index = 0; order_index < zv.orders.length; ++order_index) {
       order = zv.orders[order_index];
       if (order == undefined) {
         txt += "UnDeFiNeD";
       } else {
         txt += order.instrument + "-";
         txt += order.id;
         if (order.opened) {
           txt += "+ ";
         } else {
           txt += "- ";
         }
         txt += order.amount + " " + "x" + order.multiplier + " ";
         txt += "\"" + order.status + "\"";
       }
       txt += "<br>";
     };
     zf.debug2(txt);
   }
}
// --------------    ACTIONS  --------------------------
   w.zf.active_calc_actions = function () {
       $("#region-main div.investments-list div.row").each(function (index) {
           const item_id = this.getAttribute("z_id");
           const item = zv.data[item_id];
           if (zv.queue[item_id] == undefined) {
               zv.queue[item_id] = [];
           }
           //item failed or stock closed
           if (item.tradeoff == true || item.ok == false) {return true;}
           //item processing in queue
           if (zv.queue[item_id].length > 0) {return true;}
           //eval
           for (const rule_id in zls.arules[item_id]) {
               //console.log("eval", item.id, rule_id);
               const rule = zls.rules[rule_id];
               const arule = zls.arules[item_id][rule_id];
               //rule in error
               if (zv.errrules[item_id] != undefined && zv.errrules[item_id][rule_id]==true) { continue;}
               //rule actioned enought times
               if (arule >= rule.count && (rule.count!=0)) {continue;}
               //kostil
               if (zv.kostil[item_id] != undefined && zv.kostil[item_id]+5000>Date.now()) {continue;}
               //Consts
               const pp = item.profit_pct; const profit_pct = pp;
               const pa = item.profit_abs; const profit_abs = pa;
               const mu = item.multiplier; const mult = mu; const multiplier = mu;
               const am = item.amount; const amount = am;
               const pr = item.price_cur; const price = pr;
               const ag = item.age; const age = ag;
               const EOa = item.EOa;
               const id = ""+item_id;
               const cnt = arule;
               const dir_up = item.dir_up; const dir = dir_up;
               //actions
               const A = function(amount) {
                   const add_am = parseInt(amount);
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"A",param1:add_am, param2:undefined, rule: rule_id}
                   );
               }
               const increase_investment = A;
               const M = function(param) {
                   const new_mult = parseInt(param);
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"M",param1:new_mult, param2:undefined, rule: rule_id}
                   );
               }
               const edit_multiplier = M;
               const L = function(sl, tp) {
                   const _sl = parseInt(sl);
                   const _tp = parseInt(tp);
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"L",param1:_sl, param2:_tp, rule: rule_id}
                   );
               }
               const limit = L;
               const SL = function(param) {
                   const new_sl = parseInt(param);
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"SL",param1:new_sl, param2: undefined, rule: rule_id}
                   );
               }
               const stop_loss = SL;
               const TP = function(param) {
                   const new_tp = parseInt(param);
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"TP",param1:new_tp, param2: undefined, rule: rule_id}
                   );
               }
               const SLPR = function(param) {
                 const new_sl = parseFloat(param);
                 zv.queue[item_id].push(
                     {"rule": rule_id,"in_process": false,"action":"SLPR",param1:new_sl, param2: undefined, rule: rule_id}
                 );
               }
               const TPPR = function(param) {
                 const new_tp = parseFloat(param);
                 zv.queue[item_id].push(
                     {"rule": rule_id,"in_process": false,"action":"TPPR",param1:new_tp, param2: undefined, rule: rule_id}
                 );
               }
               const S = function() {
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"S",param1:undefined, param2: undefined, rule: rule_id}
                   );
               }
               const set_auto = S;
               const U = function() {
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"U",param1:undefined, param2: undefined, rule: rule_id}
                   );
               }
               const unset_auto = S;
               const C = function() {
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"C",param1:undefined, param2: undefined, rule: rule_id}
                   );
               }
               const close = C;
               const R = function() {
                   zv.queue[item_id].push(
                       {"rule": rule_id,"in_process": false,"action":"R",param1:undefined, param2: undefined, rule: rule_id}
                   );
               }
               const reinvest_profit = R;
               var condition_ret = false;
               try {
                   condition_ret = eval(rule.condition);
                   //console.log(rule.condition, condition_ret, pr, price, pa, pp);
               } catch (err) {
                   zf.loge(item_id + ": " + rule_id + ": помилка при перевірці умови правила (JS)");
                   zf.loge(err);
                   zv.alarm_rules = true;
                   if (item_id in zv.errrules){} else {zv.errrules[item_id] = {};}
                   zv.errrules[item_id][rule_id] = true;
                   zf.update_row_view(item_id);
                   zv.kostil[item_id] = Date.now();
               }
               if (condition_ret == true) {
                   zf.audio_info();
                   zf.update_row_view(item_id);
                   //zv.errrules[item_id][rule_id] = true; //WTF
                   zls.arules[item_id][rule_id] += 1;
                   zf.ls_write("arules");
                   zf.log(item_id + ": " + rule_id + ": зпрацювання правила");
                   try {
                       eval(rule.command);
                   } catch (err){
                       zf.loge(item_id + ": "+rule_id + ": помилка при виконанні умови правила (JS)");
                       zf.loge(err);
                       zv.alarm_rules = true;
                       if (item_id in zv.errrules){} else {zv.errrules[item_id] = {};}
                       zv.errrules[item_id][rule_id] = true;
                   }
               }
           }
       })
   }
// -------------- MAIN CYCLE -------------------------
w.zf.tt2 = function () {
    var page = window.location.pathname;

    //$("#Z_Status").css('color', 'red');
    if (page.substring(page.length-1) == "/") {
        page = page.substring(0, page.length-1);
    }
    zf.close_ads();
    zf.close_block();
    if (!zv.audio_inited) {zf.init_audio();}
    zf.wdt();
    //add links
    if (page == "/investments/active" ||
        page == "/investments/orders" ||
        page == "/investments/closed" ||
        page == "/flow-funds"
       ) {
         zf.init_menu();
    }
    zv.alarm_on_other_page = true;
    if (page == "/investments/active") {
        zv.alarm_on_other_page = false;
        if (zv.data == undefined) {
            zv.data = {};
        }
        zf.active_prepare();  //hmtl
        zf.active_parse();    //parse data
        zf.pizdec();          //EOp EOa
        zf.active_update();   //edit HTML
        if (zv.paused != true) {
            zf.active_calc_actions();
            zf.active_proc_actions();
            $("#Z_Status").css('color', 'white');
        }
    } else if (page == "/investments/closed") {
        //zf.closed_prepare();
        //zf.closed_edit();
    } else if (page == "/Z_Rules") {
        zf.page_rules_do();
    } else if (page == "/Z_Active_Rules") {

    } else if (page == "/Z_Info") {
        zf.page_info_do();
    } else {

    }
}
// -------------- TIMER WITH INIT -------------------------
w.zf.tt = function () {
    try {
        $("#Z_Status").css('color', 'red');
        w.zv.init_cnt += 1;
        if (!w.zv.inited) {
            w.zv.inited = w.zf.init_all();
            if (w.zv.inited) {
                if (!zs.debug_mode) {console.clear();}
                zf.log("ZScript v" + w.zs.version + " запустивсі");
            }
        } else {
            w.zf.tt2();
            w.zv.init_cnt = 0;
        }
        setTimeout(zf.tt, zs.timer);
        zv.alarm_code = false;
    } catch (err) {
        //ERRORRRRRRRRRRRRRR
        setTimeout(zf.tt, zs.timer);
        zf.loge(err)
        if (w.zv.inited || (!zv.inited && zv.init_cnt >= zs.init_cnt)) {
            zv.alarm_code = true;
        }
    }
    zf.audio_alarm();
}
//order = new Order("123")
w.zv.Order = function(id, instrument, direction, date, price_start,
                      amount, multiplier, result, tradeoff) {
  this.update = function () {
    this.updatePrice();
    this.checkOk();
    this.calcFees();
    this.calcProfits();
    this.closed = !this.opened;
  }
  this.updatePrice = function() {this.price_cur = zv.wdt_data[this.instrument]}
  this.checkOk = function() {
    this.ok = false;
    //check 1
    if (this.dir_up == undefined) {
      return false;
    }
    //check 2
    if (this.price_cur == undefined) {
      return false;
    }
    //check 3
    if (this.ticker == undefined) {
      return false;
    }
    //nice! this is ok.
    this.ok = true;
    return true;
  }
  this.calcFees = function() {
    if (!this.ok) {
      this.fee = undefined;
      this.fee_small = undefined;
    } else {
      let delta = this.price_cur/this.price_start;
      if (!this.dir_up) {delta = 2 - delta;}
      delta -= 1;
      delta *= this.multiplier;
      let exp_res = this.amount * (1+delta);
      this.fee = (exp_res - this.result) / this.amount;
      this.fee_small = this.fee/this.multiplier;
      //zf.debug(delta, exp_res, this.fee, this.fee_small);
    }
    return this.fee;
  }
  this.calcProfits = function() {
    this.profitA = this.result-this.amount;
    this.profitC = (this.profitA/this.amount)*100;
  }
  //CONSTRUCTOR
  this.id = id;
  this.instrument = instrument;
  this.direction = direction;
  if (this.direction == "up") {
    this.dir_up = true;
    this.dir_down = false;
  } else if (this.direction == "down") {
    this.dir_up = false;
    this.dir_down = true;
  } else {
    this.dir_up = undefined;
    this.dir_down = undefined;
  }
  this.age = zf.calcAge(date);
  this.price_start = zf.parseFloat(price_start);
  this.amount = zf.parseFloat(amount);
  this.multiplier = zf.parseInt(multiplier);
  this.result = zf.parseFloat(result);
  this.tradeoff = tradeoff;
  this.opened = true;
  this.status = "";
  this.ticker = zs.tickers[this.instrument];
  this.update();
  //SOME FUNCTIONS
  this.set_status = function(text) {
    this.status = text;
  }
  //ACTIONS wrappers
  this.increase_investment = async function(amount) {
    am = parseInt(amount);
    try {
      zf.log(this.id, initiator, "збільшення інвестиції на " + am + " ...");
      await this.action_A(am);
      zf.log(this.id, initiator, "збільшення інвестиції виконано успішно.");
      //TODO postcheck
    } catch(e) {
      zf.loge(this.id, initiator, "збільшення інвестиції не виконано (помилка від СЕРВЕРа).", e);
    }
  }
  this.increase_profit = async function() {
    try {
      zf.log(this.id, initiator, "намагаємося збільшити профіт ...");
      await this.action_X();
      zf.log(this.id, initiator, "профіт збільшено!!!");
      //TODO postcheck
    } catch(e) {
      zf.loge(this.id, initiator, "профіт не збільшено (помилка від СЕРВЕРа).", e);
    }
  }
  this.edit_multiplier = async function(multiplier) {
    mu = parseInt(multiplier);
    try {
      zf.log(this.id, initiator, "зміна мультиплікатору на " + mu + " ...");
      await this.action_M(am);
      zf.log(this.id, initiator, "зміна мультиплікатору виконана успішно.");
      //TODO postcheck
    } catch(e) {
      zf.loge(this.id, initiator, "зміна мультиплікатору не виконана (помилка від СЕРВЕРа).", e);
    }
  }
  this.close = async function() {
    try {
      zf.log(this.id, initiator, "закриття оредру ...");
      await this.action_C();
      zf.log(this.id, initiator, "закрито успішно.");
      //TODO postcheck
    } catch(e) {
      zf.loge(this.id, initiator, "закриття не виконано (помилка від СЕРВЕРа).", e);
    }
  }
  //ACTIONS internal
  this.action_info = async function() {
    var ret = await $.get(
              "/spa/report/position/" + this.id
            );
    this.is_auto = ret.investments[0].isAutoIncreaseEnabled;
    if (ret.status == "error") {
      throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    return ret;
  }
  this.action_A = async function(am) {
    var ret = await $.post(
            "/spa/investing/increase-position",
             {positionId:this.id, addInv: am}
             );
    if (ret.status == "error") {
      throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    return true;
  }
  this.action_X = async function() {
    var ret = await $.post(
            "/spa/investing/increase-position-or-do-anything",
            {positionId:this.id, profitInc: 300}
            );
    if (ret.status == "error") {
      throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    return true;
  }
  this.action_M = async function(mu) {
    var ret = await $.post(
              "/spa/investing/change-mult",
              {positionId:this.id, mult: mu}
              );
    if (ret.status == "error") {
      throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    return true;
  }
  this.action_C = function() {
      $.post("/spa/investing/close-position", {investId:this.id});
  }

  //ACTIONS SYNONIMS
  this.A = this.increase_investment;
  this.X = this.increase_profit;
  this.M = this.edit_multiplier;
}
w.zf.new_order = async function (instrument, amount, multiplier, dir_up) {
    let ret = await $.post("/spa/investing/open-position",
       {symbol: instrument, sumInv: amount, mult: multiplier, direction: (dir_up?"growth":"reduction")}
      )
    if (ret.status == "error") {
        throw new Error("Помилка СЕРВЕРа: " + JSON.stringify(ret.messages));
    }
    let order = new zv.Order(
                ret.result.investId,
                "unknown",
                (dir_up?"up":"down"),
                "",42,
                amount, multiplier,
                amount, false
              );
    let i =zv.orders.push(order)-1;
    zv.orders_indexes[order.id] = i;
    //console.log("NO->order?", zv.orders[i].id);
    return zv.orders[i];
}
w.new_order = w.zf.new_order;
//https://libertex.fxclub.org/spa/report/position/80831240
//Start commands
zf.log("ZScript v" + w.zs.version + " запускається...");
//zs.debug_mode = (localStorage["Z_GM"]!=undefined);
setTimeout(w.zf.tt, w.zs.timer); // do not use interval
setInterval(w.zf.garbage_collector, w.zs.timer_garbage_collector);
//setInterval(w.zf.fake_activity, 1*60*1000);
}) (window);
