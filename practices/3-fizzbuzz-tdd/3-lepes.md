## FizzBuzz

### Harmadik lépés
A program írja ki a kapott sorozatot egy fájlba. Az adatbázis-műveletekhez hasonlóan az IO műveletek is igen költségesek, így a tesztünkben kerüljük el, hogy valóban fájlba írjunk. 

A fenti egyáltalán nem triviális, azonban egy kis kreativitással könnyedén meg tudjuk oldani! Segíthet az, ha az alkalmazásunkat (pl. üzleti logika <-> fájlbaírás) külön komponensekként képzeljük el - a konkrét fájlba írást nem teszteljük, csak az integrációját az üzleti logikával.
