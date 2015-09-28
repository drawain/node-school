## FizzBuzz

### Ötödik lépés
Alakítsd át a programot úgy, hogy fájl helyett egy webszerver adja vissza az eredményt egy hagyományos, GET típusú request eredményeképp. A kiszámolandó számok mennyiségét request paraméterként lehet átadni, így pl. a ```http://localhost:3000/fizzBuzz?numbers=5``` kérésre a következő választ adja:
 
 ```
 1 2 Fizz 4 Buzz
 ```

**Tipp:**
A beépített webes kiszolgáló helyett próbáld ki az [Express](http://expressjs.com) és a [Koa](http://koajs.com) webszervereket!
