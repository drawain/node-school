## FizzBuzz

### Második lépés
Változnak a követelmények: 

- Mostantól minden olyan szám esetén is `Fizz`-t írjunk ki, amely számjegyei között szerepel a 3
- A programnak argumentumban átadható a fájl neve, amibe a számokat elmenti

Egy példa a program indítására:

```
node fizzbuzz.js output.txt
```

**Tipp:**
Sokkal szofisztikáltabb szkriptet írhatunk, ha a (yargs)[https://www.npmjs.com/package/yargs] modult használjuk az argumentumok feldolgozására. Segítségével például könnyedén fogadhatunk paramétereket a megszokott unix szintaxisban: ```node fizzbuzz.js --out output.txt```. Ha van időd, mindenképp próbáld ki!

Ha elkészültél a fentiekkel, akkor jöhet a következő lépés, melyet a `3-lepes.md` fájlban találsz.
