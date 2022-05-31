# goodsailors
Popis práce pro goodsailors. 

## Návod
Pro spuštění projektu je nutné stáhnout veškeré balíčky. V adresáři ./goodsailors/web a ./goodsailors/server použijte příkaz npm install.
Poté si nahrajte databázi, které je uložená ve složce ./goodsailors/goodsailorsDB.sql.

Pro připojení k databázi je nutné upravit soubor config.json, dle vašeho nastavení mysql. Na macos je nutné specifikovat socketPath, popřípadě upravit jméno a heslo k databází. Na Windows by mělo stačit pouze nahrát databázi.

Projekt lze spustit použitím příkazu npm start v obou adresářích /web a /server.

## Server
Ve složce server se nachází jednoduché API, které bere příspěvky a uživatele z databáze.
Server obsahuje tyto balíčky: 
- express = vytvoření serveru
- mysql = propojení s databází
- body-parser = parametry pro post požadavky
- cors = nastavení pravidel pro server
- nodemon (lze použít i node)

Pro přihlášení jsem nechal heslo v jeho původním tvaru bez šifrování. Server obsahuje následující požadavky:

- (GET)  http://localhost:3002/posts = vyberete všechny příspěvky z databáze
- (GET)  http://localhost:3002/post/id = vybere jeden příspěvek podle ID parametru
- (POST) http://localhost:3002/login = přes zaslaná data zkontroluje zdali uživatel existuje
- (POST) http://localhost:3002/createpost = vezme zaslaná data a vytvoří příspěvek do databáze
- (POST) http://localhost:3002/editpost = upraví příspěvek v databázi podle zaslaných dat
- (POST) http://localhost:3002/deletepost = odstraní příspěvek z databáze podle ID a ID uživatele

## Web
Projekt jsem napsal pomocí reactu, bootstrapu a node balíčků.
použité balíčky:
- axios = jednoduché odesílání požadavků (ajax)
- bootstrap 
- bootstrap-icons
- react-router-dom = směrování v reactu 
 
Pro lepší přehled jsem aplikaci strukturoval do složek:
components = react komponenty
css = složka s css soubory
screens = zde se nachází jednotlivé stránky react-router-dom

Adresy projektu:
- http://localhost:3000/ = domácí stránka se všemi příspěvky
- http://localhost:3000/create = stránka pro vytvoření příspěvku
- http://localhost:3000/login = formulář pro přihlášení uživatele
- http://localhost:3000/post/ID = vypíše jednotlivý příspěvek dle id parametru
- http://localhost:3000/edit/ID = formulář pro smazání či upravení příspěvku

Aplikace má ošetřenou chybu 404. 

