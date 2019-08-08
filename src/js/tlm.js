'use strict';
import * as tf from '@tensorflow/tfjs';
import AutoSuggest from '@avcs/autosuggest/es/AutoSuggest';

export class Tlm {
    constructor(key) {
        this.maxSuggestions = 10;
        this.minProbability = 0.00001;
        var path = 'https://cdn.typelike.me/models/word-predict/' + key + '/';
        var tokenizer = '';
        let tlm = this;

        var request = new XMLHttpRequest();
        request.open('GET', path + 'tokenizer.json', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                tlm.tokenizer = JSON.parse(this.response);
            }
        };
        request.send();

        (async () => {
            this.model = await tf.loadLayersModel(path + 'model.json');
        })();
    }

    attach(input) {
        let tlm = this;
        let element = typeof input == 'string' ? document.getElementById(input) : input;
        new AutoSuggest({
            caseSensitive: false,
            suggestions: [
                {
                    trigger: ' ',
                    caseSensitive: true,
                    values: function (keyword, callback) {
                        keyword = keyword.toLowerCase();

                        var results = [];

                        if (!keyword) {
                            var inputElement = element;
                            var text = inputElement.tagName =='DIV' ? inputElement.textContent : inputElement.value;
                            var predictEnd = inputElement.selectionStart;
                            text = text.slice(0, predictEnd);
                            var predictStart = text.lastIndexOf('.') + 1;
                            text = text.substring(predictStart);
                            this.latestValues = tlm.predict(text);
                        }
                        if (!this.latestValues) {
                            this.latestValues = [];
                        }
                        this.latestValues.forEach(function (word) {
                            if (
                                word.length >= 1 &&
                                !word.indexOf(keyword) &&
                                word !== keyword &&
                                results.indexOf(word) === -1
                            ) {
                                results.push(' ' + word);
                            }
                        });
                        callback(results);
                    }
                }
            ]
        }, element);

        element.addEventListener('focus', (event) => {
            if (element.value.length == 0) {
                element.value = ' ';
            }
        });
    }

    predict(text) {
        let tlm = this;
        var words = text.trim().split(' ').slice(-2);
        words = words.map(function (value) {
            return value.toLowerCase();
        });

        console.log(words);
        var indexes = words.map(x => tlm.tokenizer.word_index[x] ? tlm.tokenizer.word_index[x] : 0);

        while (indexes.length <= 1) {
            indexes.unshift(0);
        }
        console.log(indexes);
        var tensor = tf.tensor([indexes]);
        var prediction = this.model.predict(tensor);
        var suggestions = 0;
        var filtered = prediction.dataSync().filter(function (element, index, array) {
            tlm.maxSuggestions ++;
            return element > tlm.minProbability && suggestions <= tlm.maxSuggestions;
        }).sort(function (a, b) { return b - a; });
        console.log(filtered);
        var suggestion_index = filtered.map(x => prediction.dataSync().indexOf(x));
        var suggestions = [];
        suggestion_index.forEach(function (element) {
            if(tlm.tokenizer.index_word[element]) {
                suggestions.push(tlm.tokenizer.index_word[element]);
            }
        });
        return suggestions;
    }
}
