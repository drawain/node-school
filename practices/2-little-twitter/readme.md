# Little Twitter
E feladat során a cél, hogy egy a Twitterhez hasonló rövid, szöveges üzeneteket tároló és megjelenítő alkalmazást írjunk. Ehhez egy webszervert kell készítenünk, amely kiszolgálja a *Little Twitter* felületét, és lekezeli az erről az oldalról beküldött üzeneteket. Egy másik felhasználónak az oldalra lépve látnia kell a már beküldött üzeneteket.
 
## Lépések

### 1. Webszerver
Hozz létre egy webszervert, ami ki fogja szolgálni az alkalmazást. Erre ajánlott az [Express](http://expressjs.com) vagy a [Koa](http://koajs.com) nevű framework-ök valamelyikét használni. A webszerver gyökér-útvonalán (`/`) jelenjen meg az üzenetküldő űrlap, mely tartalmazzon egy név és egy üzenet mezőt.

### 2. Üzenetek fel-POST-olása
Kösd fel a webszerverre a `/message` útvonalat, melyre `POST` requestet küldve elmentjük az üzenetet. Ezt nem kell adatbázisba, elég a memóriába megtenni. Minden üzenethez mentsük el a nevet, a tartalmat és a beküldés dátumát.

Sikeres küldés után a webszerver irányítson át a gyökér-útvonalra.

**Haladóknak:** az űrlap AJAX-al működjön, vagyis oldal-újratöltés nélkül legyünk képesek üzenetet küldeni.

### 3. Üzenetek megjelenítése
A `/` útvonal betöltődésekor jelenjenek meg a már beküldött üzenetek, névvel, tartalommal és a beküldés dátumával egyetemben.

**Haladóknak:** az üzenetek AJAX-al, periodikusan töltődjenek le - vagyis pl. 5mp-enként pollozva a szerver egy megfelelő útvonalát (itt ideális lehet a `GET /message` útvonal, a POST párjaként) kapjuk meg és rendereljük ki az üzeneteket. 
