# Félévi beadandó feladat

A feladat egy üzenetküldő alkalmazás készítése, melyben a regisztrált felhasználók Morze-kód formájában küldhetnek egymásnak üzenetet,
amit később a címzett már természetes szövegként olvashat vissza.

A szoftvert egy NodeJS alapú webszerver készítésével kell megvalósítani, természetesen az órán tanultak felhasználásával, tesztvezérelt fejlesztéssel.

## A Morze-kód

A Morze-kód az egyes karaktereket kódolja rövid (`.`) és hosszú (`-`) jelek sorozataként. Például az `A` betű kódja `.-`,
a `Q` betű kódja `--.-`, az `1`-es számjegyé pedig `.---`. A Morze-kód nem különbözteti meg a kis- és nagybetűket,
hagyományosan a nagybetűket használják.

Egy teljes üzenet Morze-kódolásához a karaktereket 1 szóközzel, a szavakat 3 szóközzel kell elválasztani.
Például a `HEY JUDE` üzenet Morze-kódja

    .... . -.--   .--- ..- -.. .
.

**Megjegyzés:** Az üzenet elején és végén található extra szóközöknek nincs szerepe, figyelmen kívül kell hagyni őket.

A betűkön és számjegyeken kívül léteznek még speciális szervíz-kódok is. Legismertebb példájuk a nemzetközi SOS jelzés,
aminek kódja `...---...`. A szervíz-kódok önálló, egyetlen karakterként tekintendők, és általában külön szóban utaznak
egy üzenet részeként. A feladatban csak az SOS kódra szükséges felkészülni a speciális kódok közül.

## Interfészek

Az alkalmazással regisztrált felhasználók szeretnének egymásnak üzenetet küldeni, és a sajátjaikat elolvasni. Ennek
megfelelően a megoldásnak 3 use-case-t kell támogatnia:
1. felhasználó regisztrációja
2. üzenet küldése regisztrált felhasználónak Morze-kód formájában
3. regisztrált felhasználó fogadott üzenetinek elolvasása

### Regisztráció

Az alkalmazás rendelkezzen egy `/users` API endpointtal, melyre `POST` kérést küldve elvégezhető egy felhasználó regisztrációja.

    POST /users
    request body: { "username": "alice", "name": "Alice Green" }

Paraméterek:
- username: kötelező, a felhasználónév
- name: opcionális, a felhasználó teljes neve

Lehetséges HTTP válaszok:
1. `400` - ha már létező felhasználónévvel akarnak regisztrálni
2. `200` - egyébként. Ilyenkor a válasz törzse tartalmaz egy egyedi 'tokent', ami a későbbi kérésekben a felhasználót
azonosítani fogja. Például `{ "token": "ABCDEFGH123456" }`.


### Üzenetküldés

Üzenetet küldeni a `/users/:username/messages` endpointra `POST`-olással lehetséges. A HTTP kérés `X-Auth` nevű fejléce
tartalmazza a feladó tokenjét, az URL `:username` része pedig a címzettet azonosítja. Az üzenet tartalma a kérés
törzsében utazik, egy JSON objektumban, Morze-kód formában: `{ "message": "...---..." }`.

Például ha az előző példában regisztrált Alice szeretne Bob Tannernek (felhasználóneve `bob`) egy üzenetet küldeni, akkor
azt így teheti meg:

    POST /users/bob/messages
    X-Auth: ABCDEFGH123456

    { "message": "...---..." }

Lehetséges HTTP válaszok:
1. `401` - ha az X-Auth fejléc hiányzik, vagy a token nem tartozik regisztrált felhasználóhoz
2. `404` - ha a címzett nem létezik
3. `202` - egyébként

### Üzenetek olvasása

Üzenetet olvasni a `/users/:username/messages` endpointra intézett GET kéréssel lehet. A HTTP kérés `X-Auth` nevű fejléce
tartalmazza az üzeneteit elolvasni kívánó felhasználó tokenjét, amelynek összhangban kell lennie az URL :username
részével.

Lehetséges válaszok:
1. `401` - ha az X-Auth fejléc hiányzik, vagy a token nem tartozik regisztrált felhasználóhoz
2. `403` - ha a token alapján nem a saját üzeneteit próbálná elolvasni a felhasználó
3. `200` - egyébként. Ilyenkor a válasz törzse tartalmazza a felhasználó üzeneteit egy JSON lista formájában. A lista
egyes elemei tartalmazzák az üzenet feladójának és címzettjének _teljes nevét_ (ha regisztrációkor nem adta meg, akkor
a felhasználónevét), és az üzenetet természetes szöveg formájában.

Az előző példát folytatva, ha Bob szeretné megnézni üzeneteit, akkor a következő módon teheti meg:

    Request:
    GET /users/bob/messages
    X-Auth: bobtoken

    Response:
    200 OK

    [
      { "from": "Alice Green", "to": "Bob Tanner", "message": "SOS" },
      [...other messages...]
    ]


## Megjegyzések

- Minden HTTP API endpoint JSON adattípust várjon és azzal válaszoljon. A küldött és fogadott JSON objektumok szerkezete megtalálható a példáknál.
- A GET-es endpoint legyen idempotens művelet, azaz egymás utáni többszöri végrehajtása járjon ugyanazzal az eredménnyel. Ne módosítson állapotot az alkalmazásban.
- Készüljenek end-to-end tesztek a HTTP API-hoz.
- A Morze-kódban megfogalmazott üzenet dekódolása része a feladatnak, ne használjunk kész könyvtárat hozzá.
Kiindulásként használható a jelen leíráshoz mellékelt `morse-code-table.js` fájl, mely a Morze-kódtáblát tartalmazza.
Nem kötelező a mellékelt kódtábla használata, bátorítunk mindenkit a kreativabb megoldásokra.
- Az alkalmazás kódja legyen könnyen olvasható, magától értetődő, kövesse a clean code elveit. Legyenek hozzá automatizált tesztek. A kommenteket kerüljük.
