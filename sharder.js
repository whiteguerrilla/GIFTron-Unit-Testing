      "use strict";

      const shards = {};
      const base = getBase();
      const samples = base.length ** 2;

      for (let i = 0; i < samples; i += 1) {
        // establish our deterministic, distributed hash
        const hash = sha1();

        // obtain the shard
        const shard = hash2shard(sha1());

        // register the shard
        shards[shard] = (shards[shard] || 0) + 1;
      }

      // reveal the distribution
      console.log(Object.keys(shards).length, shards);

      function hash2shard(hash) {
        // select four characters to ensure an even distribution in 26^2 - 26 space
        const fragment = hash.substr(0, 4);

        // convert our fragment to an integer which we can transform to suit our needs
        const integer = parseInt(fragment, 16) * 131;

        // constrain our integer to 26^2 - 26
        const remainder = ((integer / 127) | 0) % 650;

        // return our base 26^2 - 26 representative
        return base[remainder];
      }

      function sha1() {
        const hash = [];
        while (hash.length < 40) {
          hash.push(((Math.random() * 16) | 0).toString(16));
        }
        return hash.join("");
      }

      function getBase() {
        // establish our legal alphabet
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const limit = alphabet.length;
        const others = limit - 1;
        const pairs = [];

        // establish our base representatives
        for (let i = 0; i < limit; i += 1) {
          for (let j = 0; j < others; j += 1) {
            pairs.push(alphabet[i] + alphabet[(i + j + 1) % limit]);
          }
        }

        return pairs;
      }
