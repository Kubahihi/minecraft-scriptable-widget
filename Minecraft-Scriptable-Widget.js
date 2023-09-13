// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: red;
// icon-glyph: gamepad;
// Nutné vyplnit IP serveru a font
var serverIP = ""
var serverPlatform = "" // Only java or bedrock - geyser servers are java!
var widgetFont = "" // Seznam zde: iosfonts.com
var listOfOnlinePlayersFont = "" // Font může být stejný jako u celého widgetu - bez vyplnění = zakladní font
var titleSize = 35 // Velikost nadpisu
var textSize = 20 // Velikost textu
var playerListSize = 15 // Velikost jmen hráčů
var widgetTextOpacity = 0.8 // Průhlednost textu

// Ikona serveru
if(serverPlatform == "java"){
var iconRequest = new Request(`https://api.mcstatus.io/v2/icon/${serverIP}`)
var iconResult = await iconRequest.loadImage()
} else {
var iconRequest = new Request(`https://api.mcsrvstat.us/icon/${serverIP}`)
var iconResult = await iconRequest.loadImage()
}

// Informace o serveru
var dataRequest = new Request(`https://api.mcstatus.io/v2/status/${serverPlatform}/${serverIP}`)
var dataResult = await dataRequest.loadJSON()

// Proměnné
var onlinePlayers = dataResult.players.online
var maxPlayers = dataResult.players.max
var isOnline = dataResult.online
var trueListOfPlayers = dataResult.players.list ? "\n" + dataResult.players.list.map(p => ` ${p.name_clean} `).join('\r\n') : "";

// Přepis z true/false na online/offline
if (isOnline = "true") {
  var isServerOnline = "online"
  } else {
    var isServerOnline = "offline"
  }

// Zpráva o počtu hráčů
var PlayersOnServer = onlinePlayers + " z " + maxPlayers

// Vytvoření widgetu
let widget = new ListWidget()
let Title = widget.addText(serverIP)
let titleStack = widget.addStack()
titleStack.layoutVertically()
titleStack.addSpacer()

// Nastavení nadpisu
Title.centerAlignText()
titleFont = new Font(widgetFont, titleSize)
Title.font = titleFont
Title.height = 3
Title.textOpacity = widgetTextOpacity

// Nastavení zprávy o aktivitě serveru 
let isOnlineText = widget.addText("Server je " + isServerOnline)
isOnlineText.centerAlignText()
isOnlineTextFont = new Font(widgetFont, textSize)
isOnlineText.font = isOnlineTextFont
isOnlineText.textOpacity = widgetTextOpacity

// Nastavení zprávy o počtu hráčů
let PlayersText = widget.addText("Je připojeno " + PlayersOnServer + " hráčů")
PlayersText.centerAlignText()
infoFont = new Font(widgetFont, textSize)
PlayersText.font = infoFont
PlayersText.textOpacity = widgetTextOpacity

// Nastavení listu se jmény hráčů
let PlayerList = widget.addText(trueListOfPlayers)
PlayerList.centerAlignText()
PlayerListFont = new Font(listOfOnlinePlayersFont, playerListSize)
PlayerList.font = PlayerListFont
PlayerList.textOpacity = widgetTextOpacity


// Nastavení ikony serveru jako pozadí
widget.backgroundImage = iconResult

// Spuštení widgetu
Script.setWidget(widget)
Script.complete()
widget.presentLarge()
