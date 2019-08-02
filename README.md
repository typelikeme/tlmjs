# tlm.js
Tensorflow based text prediction component, used to deploy ML models in the browser.

# Examples

## Obtaining prediction list

```javascript
var predictor = tlm.predictor(
        "22d1186cd02b36967939bd2cc3c48c329aae45647513c4506a2abc0b"
      );
predictor.predict("the quick");
//["brown", "is", "end", "dog", "the", "coherence", "and", "used", "in", "of", "owing", "all", "it", "alphabet", "lazy", "touch", "fonts", "letters"]
predictor.predict("the quick brown");
//["fox", "computer", "that", "has", "text", "touch", "where", "typing", "examples", "sentence", "become", "displaying", "for", "typewriters", "it", "other", "testing"]
```

## Attaching the predictor to a html input

See an example [here](tests/index.html)