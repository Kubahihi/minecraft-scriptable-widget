// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: red;
// icon-glyph: gamepad;
//Jediné co je nutné vyplnit je IP serveru
var serverIP = ""

//Ikona serveru
var iconRequest = new Request("https://api.mcstatus.io/v2/icon/" + serverIP)
var iconResult = await iconRequest.loadImage()

//Informace o serveru
var dataRequest = new Request("https://api.mcstatus.io/v2/status/java/" + serverIP)
var dataResult = await dataRequest.loadJSON()

//Proměnné
var onlinePlayers = dataResult.players.online
var maxPlayers = dataResult.players.max
var isOnline = dataResult.online

//Přepis z true/false na online/offline
if (isOnline = "true") {
  var isServerOnline = "online"
  } else {
    var isServerOnline = "offline"
  }

//Zpráva o počtu hráčů
var PlayersOnServer = onlinePlayers + " z " + maxPlayers

//Vytvoření widgetu
let widget = new ListWidget()
let Title = widget.addText(serverIP)
let titleStack = widget.addStack()
titleStack.layoutVertically()
titleStack.addSpacer()

//Nastavení nadpisu
Title.centerAlignText()
titleFont = new Font("Chalkduster", 35)
Title.font = titleFont
Title.height = 3
Title.textOpacity = 2.5

//Nastavení zprávy o aktivitě serveru 
let isOnlineText = widget.addText("Server je " + isServerOnline)
isOnlineText.centerAlignText()
isOnlineTextFont = new Font("Chalkduster", 20)
isOnlineText.font = isOnlineTextFont
isOnlineText.textOpacity = 2.5

//Nastavení zprávy o počtu hráčů
let PlayersText = widget.addText("Je připojeno " + PlayersOnServer + " hráčů")
PlayersText.centerAlignText()
infoFont = new Font("Chalkduster", 20)
PlayersText.font = infoFont
PlayersText.textOpacity = 2.5

//Nastavení ikony serveru jako pozadí
widget.backgroundImage = iconResult

//Spuštení widgetu
Script.setWidget(widget)
Script.complete()
widget.presentLarge()