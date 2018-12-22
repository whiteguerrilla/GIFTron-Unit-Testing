      "use strict";

      const shards = {};
      const samples = 26 ** 5;

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
        // establish our legal alphabet
        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        // select three characters to ensure an even distribution in 26^2 space (cuz 16^3 ~ 26^2 / 6)
        const fragment = hash.substr(0, 6);

        // convert our fragment to an integer which we can transform to suit our needs
        const integer = parseInt(fragment, 16) * 439;

        // constrain our integer to 26^2
        const remainder = ((integer / 311) | 0) % 676;

        // convert to base 26 and pad if necessary
        const shard = ("0" + remainder.toString(26)).substr(-2);

        // shift characters to legal set
        return shard
          .split("")
          .map(v => alphabet[parseInt(v, 26)])
          .join("");
      }

      function sha1() {
        const hash = [];
        while (hash.length < 40) {
          hash.push(((Math.random() * 16) | 0).toString(16));
        }
        return hash.join("");
      }
