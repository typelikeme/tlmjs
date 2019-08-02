# tlmjs
Tensorflow based text prediction component, used to deploy ML models in the browser.

# Exammples

## Obtaining prediction list

```javascript
var predictor = tlm.predictor(
        "22d1186cd02b36967939bd2cc3c48c329aae45647513c4506a2abc0b"
      );
var predictions = predictor.predict("the quick");
//["brown", "is", "end", "dog", "the", "coherence", "and", "used", "in", "of", "owing", "all", "it", "alphabet", "lazy", "touch", "fonts", "letters"]
```

## Attaching the predictor to a html input

See an example [here](/typelikeme/tlmjs/blob/master/tests/index.html)