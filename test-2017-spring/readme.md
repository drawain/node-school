# Félévi beadandó feladat

Célunk egy egyszerű játék létrehozása, melyben egy Fantasy világ harcosai küzdhetnek egymással. E világban csak hősök, az ő felszerelésük és a küzdőtér létezik, mással nem kell foglalkoznunk. A játékot egy NodeJS alapú webszerver készítésével kell megvalósítani, természetesen az órán tanultak felhasználásával, tesztvezérelt fejlesztéssel.

## Az elvárások
- Hőseinket egy API endpointon keresztül vihetjük fel egy POST kéréssel (pl. `POST /heroes`), minden hősnek van egy azonosítója.
- A csatát egy másik API endpointon keresztül játszhatjuk le, ahol megadjuk a választott két harcosunk azonosítóját (pl. `GET /battle?hero1=1&hero2=5`) és válaszul megkapjuk a győztest.
- A hősök különböző típusúak lehetnek, így lehet közöttük Harcos és Pap.
- Minden hős rendelkezik egy bizonyos mennyiségű életerővel, melyet az ellenfele támadása csökkenthet.
- A hősöknek fegyvereket adhatunk, melyekkel támadhatnak és védekezhetnek is.
- Maga a csata nagyon egyszerűen történik, a megadott sorrendben lépnek a hősök és egy támadást visznek be az ellenfélnek. Sikeres támadás esetén az aktuális fegyver sebzésével csökkentik az ellenfél életerejét. Ha a hős egy pap, akkor a támadása előtt gyógyíthatja is magát. A csatának akkor van vége, ha az egyik harcos hősi halált hal.


A feladatot a többi kódolási kata-hoz hasonlóan pontról pontra adjuk meg. Érdemes ezt a sorrendet követni, így kis lépésekben haladhatunk a megoldás felé. A lépéseknél nem hangsúlyozzuk ki a teszteket, azonban elvárás, hogy az egyes funkcionalitások le legyenek fedve teszttel - ha lehetséges ezek TDD-vel készüljenek el.


## 1. lépés
Hozzunk létre egy egyszerű NodeJS alkalmazást és kezdjük az üzleti logikával. A webszerverrel a feladat végén foglalkozunk, nélküle is el tud készülni az alkalmazás nagy része.

Készítsünk egy harcos osztályt, amely három fontos dologgal rendelkezik:

- van életereje, mely kívülről megadható, de maximum 30
- képes támadni, egy másik hőst megtámadva 1 életerő

Példa egy implementációra: 

```javascript
var jon = new Warrior(30);
var theon = new Warrior(20);
jon.attack(theon);

theon.getHP(); // => 19
```


## 2. lépés
Adjunk lehetőséget a csatára, melynek során a csatába lépő két harcos addig támadja egymást, amíg az egyikük el nem esik.

Példa egy implementációra: 

```javascript
var jon = new Warrior(5);
var theon = new Warrior(5);

var battle = new Battle(jon, theon);
battle.getWinner(); // => jon
```


## 3. lépés
Hőseink fegyvereket szerezhetnek:
- A fegyver meghatározza a támadási képesség sebzését
- *Fegyverek:* *Kard (sebzés 7)*, *Tőr (sebzés 5)*, *Varázsbot (sebzés 8)*

Példa egy implementációra:

```javascript
var jon = new Warrior(30);
jon.addWeapon(new Sword());
var theon = new Warrior(20);
jon.attack(theon);

theon.getHP(); // => 13
```


## 4. lépés
Hőseink a fegyvereikkel nem csak támadnak, védekezhetnek is:
- Támadás esetén a fegyver védőértékét le kell vonni a viselőjére mért sebzésből
- *Védőértékek*: *Kard (védelem 2)*, *Tőr (védelem 4)*, *Varázsbot (védelem 1)*

Példa egy implementációra:

```javascript
var jon = new Warrior(30);
jon.addWeapon(new Sword());
var theon = new Warrior(20);
theon.addWeapon(new Dagger());
jon.attack(theon);

theon.getHP(); // => 17
```


## 5. lépés
A harcos mellett a csatában részt vehetnek *Papok*. A különleges képességük a gyógyító-varázslat, melyet egy csatában minden támadás előtt alkalmaznak, ezzel 1 életerőt gyógyítva magukon. Természetesen az eredeti életerejük fölé nem gyógyíthatják magukat.
 
Példa:

```javascript
var jon = new Warrior(10);
var thoros = new Priest(5);

var battle = new Battle(jon, thoros);
battle.getWinner(); // => thoros
```


## 6. lépés
Készítsünk egy egyszerű webszervert, melynek első endpointján POST kéréssel hősöket vihetünk fel, GET kéréssel a már felvitteket kérhetjük vissza. Természetesen elég, ha a hősöket csak a memóriában tároljuk, a feladathoz nem várjuk el az adatbázis használatát. 

Példa:

```
POST /heroes 
{ type: 'warrior', hp: 30, weapon: 'sword' }
// Válasz => { id: 1 }
 
POST /heroes 
{ type: 'priest', hp: 20 }
// Válasz => { id: 2 }

GET /heroes
// Válasz => [{ id:1, type: 'warrior', hp: 30, weapon: 'sword' }, { id: 2, type: 'priest', hp: 20 }]
```


## 7. lépés
Bővítsük szerverünket egy endpoint-al, melyen lejátszhatunk egy csatát két hős között.

Példa:

```
POST /heroes 
{ type: 'warrior', hp: 30, weapon: 'sword' }
// Válasz => { id: 1 }
 
POST /heroes 
{ type: 'warrior', hp: 10, weapon: 'dagger' }
// Válasz => { id: 2 }

GET battle?hero1=1&hero2=2
// Válasz => { winner_id: 1 }
```


## Bővítési lehetőségek
Ha valaki kedvet kapott, akkor a következő feladatokból is implementálhat - hasznos tapasztalatokra lehet szert tenni:

- vigyünk véletlenszerűséget a játékba, mind a támadás, a védekezés és a gyógyítás esetén az akció-pontokhoz (pl. sebzés) adjunk hozzá egy véletlen-számot. Kitűnő alkalom, hogy gyakoroljuk, hogyan is lehet tesztelni a "random"-ot.
- vezessük be a "Vámpír-tőr" fegyvert, amely hagyományos tőrként funkcionál, kivéve, hogy minden támadás esetén 2 HP-t ellop az ellenféltől - vagyis ennyivel csökken az ő életereje, míg a használói ennyivel nő.
- lehessen kettőnél több hőst is csatába küldeni

