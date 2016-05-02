# Félévi beadandó feladat

Célunk egy szoftver készítése, melynek segítségével ki tudjuk választani a "legjobb" számokat zenei albumokról. Aggodalomra semmi ok, nem egy jó ízléssel megáldott mesterséges intelligenciát kell készíteni, ugyanis rendelkezésre áll számos kiváló ízlésű ember zenehallgatási statisztikája. Pontosabban, meg tudjuk mondani hogy mely számokat hányszor hallgatták meg, és ezen információ birtokában kellene kiválogatni a legjobbakat egy albumról.

A szoftvert egy NodeJS alapú webszerver készítésével kell megvalósítani, természetesen az órán tanultak felhasználásával, tesztvezérelt fejlesztéssel.

## A módszer

Először azt gondolnánk, hogy egy albumon a legtöbször meghallgatott számok a legjobbak. Kis gondolkodás után azonban beláthatjuk, hogy ennek a megközelítésnek van egy hibája. Ugyanis tegyük fel, hogy minden szám egyformán jó az albumon. Érdekes módon az album elején található számokat többször fogják meghallgatni az emberek, mint a közepén vagy a végén levőket. Ennek oka, hogy az emberek tipikusan az elején kezdik el hallgatni az albumot, meghallgatnak néhány számot, majd miután fülük kezd valami másra vágyni, leállítják az albumot. Ez azt eredményezi, hogy ha mindegyik szám egyformán jó egy albumon, akkor a számok meghallgatási gyakorisága a Zipf-törvényt követi.

A [Zipf-törvény](https://plus.maths.org/content/mystery-zipf) egy megfigyelésen alapuló tapasztalati törvény, melyet először az emberi nyelvekben található szavak előfordulási gyakoriságára mondtak ki. Később megfigyelték, hogy más jelenségek leírásánál is helytálló. Azt mondja ki, hogy az *n*. leggyakoribb elem előfordulási gyakorisága egy sokaságban fordítottan arányos *n*-nel.

Jelen helyzetben ez azt jelenti, hogy egy albumban, melyen a számok egyformán jók, az első szám meghallgatásának gyakorisága kétszerese a második száménak. Általánosan az első számot *n*-szer többet hallgatják meg, mint az *n*. számot.

Ha egy szám jobb, mint a többiek, akkor azt többször fogják meghallgatni, mint amennyit a Zipf-törvény jósolna. Ezeket kell az alkalmazásnak megtalálnia. Formalizálva, tegyük fel, hogy az *i*. számot az albumon *f<sub>i</sub>*-szer játszották le, a Zipf-törvény szerint pedig *z<sub>i</sub>*-szer kellett volna. Definiáljuk a zeneszám *q<sub>i</sub>* *minőségi indexét* <code>q<sub>i</sub> = f<sub>i</sub> / z<sub>i</sub></code> formában. Az alkalmazásnak a legmagasabb minőségi indexszel rendelkező számokat kell kiválasztania.

## Az elvárások

- Lehessen megadni az alkalmazásnak albumokat, a rajtuk található számok címével és azok hallgatási gyakoriságával.
- Le kell tudni kérdezni az alkalmazástól egy album *n* darab legjobb minőségi indexével rendelkező számának címét.
- Ha két szám azonos minőségi indexszel rendelkezik, akkor soroljuk előrébb az albumon is előbb található számot (feltehetőleg okkal tették a szerzők ebben a sorrendben az albumra őket)
- Az előbb definiált műveletekre biztosítson az alkalmazás egy HTTP alapú API-t, az alábbi endpointokkal:
  - POST `/albums` - egy új album adatainak feltöltésére
  - GET `/albums/:album_id/best?top=n` - egy album legjobb *n* számának lekérdezésére
- Minden HTTP API endpoint JSON adattípust várjon és azzal válaszoljon. A küldött és fogadott JSON objektumok szerkezete megtalálható a példáknál.
- Az API-n ellenőrizzük a bemenet helyességét, és válaszoljunk 400-as HTTP status code-dal ha hibát találunk a bemenetben (pl. a legjobb *n* szám lekérdésénél nincs megadva *n*).
- A GET-es endpoint legyen idempotens művelet, azaz egymás utáni többszöri végrehajtása járjon ugyanazzal az eredménnyel. Ne módosítson állapotot az alkalmazásban.
- Készüljenek end-to-end tesztek a HTTP API-hoz.

Feltehetjük, hogy egy albumon az első szám meghallgatásának gyakorisága nagyobb, mint nulla.

A feladathoz néhány lépésben segítséget adunk. Érdemes ezt a sorrendet követni (de nem kötelező), így kis lépésekben haladhatunk a megoldás felé. A lépéseknél nem hangsúlyozzuk ki a teszteket, azonban elvárás, hogy az egyes funkcionalitások le legyenek fedve teszttel - ha lehetséges ezek TDD-vel készüljenek el.

Az alkalmazás kódja legyen könnyen olvasható, magától értetődő, kövesse a clean code elveit. A kommenteket kerüljük.

## Példa

### Album feltöltése

```
POST /albums
[{ "frequency": 30, "title": "one" },
{ "frequency": 30, "title": "two" },
{ "frequency": 15, "title": "three" },
{ "frequency": 25, "title": "four" }]
// Válasz => { id: 1 }

POST /albums
[{ "frequency": 197812, "title": "re_hash" },
{ "frequency": 78906, "title": "5_4" },
{ "frequency": 189518, "title": "tomorrow_comes_today" },
{ "frequency": 39453, "title": "new_genious" },
{ "frequency": 210492, "title": "clint_eastwood" },
{ "frequency": 26302, "title": "man_research" },
{ "frequency": 22544, "title": "punk" },
{ "frequency": 19727, "title": "sound_check" },
{ "frequency": 17535, "title": "double_bass" },
{ "frequency": 18782, "title": "rock_the_house" },
{ "frequency": 198189, "title": "19_2000" },
{ "frequency": 13151, "title": "latin_simone" },
{ "frequency": 12139, "title": "starshine" },
{ "frequency": 11272, "title": "slow_country" },
{ "frequency": 10521, "title": "m1_a1" }]
// Válasz => { id: 2 }
```


### Legjobb számok kiválasztása

```
GET /albums/1/best?top=2
// Válasz => [{ "title": "four" }, { "title": "two" }]

GET /albums/2/best?top=3
// Válasz => [{ "title": "19_2000" }, { "title": "clint_eastwood" }, { "title": "tomorrow_comes_today" }]
```

## 1. lépés

Hozzunk létre egy egyszerű NodeJS alkalmazást és kezdjük az üzleti logikával. A webszerverrel a feladat végén foglalkozunk, nélküle is el tud készülni az alkalmazás nagy része.

Készítsük el a feladatot ellátó, BestSongsFinder osztályt melynek átadva az albumot és az *n* értéket, megkapjuk a követelményeknek megfelelő számok címét.

Példa:
```javascript
const album = [...];
const n = 3;
const bestSongsFinder = new BestSongsFinder(album, n);
const bestSongs = bestSongsFinder.find(); // -> ["title1", "title2", "title3"]
```

Nem szükséges minden funkcionalitást ebben az osztályban implementálni. Érdemes lehet elindulni ennél kisebb egységekkel, amikről tudjuk, hogy szükségesek az üzleti logikához (pl. Zipf-eloszlás generátor, minőségi index számító, listarendező) és könnyebb tesztvezérelten kifejleszteni őket.

## 2. lépés

Készítsünk egy egyszerű webszervert, melynek első endpointján POST kéréssel albumokat vihetünk fel. Adjunk hozzá egy GET endpointot, mellyel a felvitt albumok lekérdezhetők. Természetesen elég, ha az albumokat csak a memóriában tároljuk, a feladathoz nem várjuk el az adatbázis használatát.

```
POST /albums
[{ frequency: 1, title: 'title1' }]
// Válasz => { id: 1 }

POST /albums
[{ frequency: 2, title: 'title2' },
{ frequency: 3, title: 'title3' }]
// Válasz => { id: 2 }

GET /albums
// Válasz => [{
  id: 1,
  songs: [{ frequency: 1, title: 'title1' }]
}, {
  id: 2,
  songs: [{ frequency: 2, title: 'title2' }, { frequency: 3, title: 'title3' }]
}]
```


## 3. lépés

Bővítsük szerverünket egy endpoint-al, melyen kiválaszthatjuk a legjobb *n* számot egy albumról.

```
POST /albums
[{ "frequency": 30, "title": "one" },
{ "frequency": 30, "title": "two" },
{ "frequency": 15, "title": "three" },
{ "frequency": 25, "title": "four" }]
// Válasz => { id: 1 }

GET /albums/1/best?top=2
// Válasz => [{ "title": "four" }, { "title": "two" }]
```
