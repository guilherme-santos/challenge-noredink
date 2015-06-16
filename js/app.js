(function() {
    var app = angular.module('punctuationApp', ['ngSanitize']);

    app.controller('PunctuationController', ['$sce', function(sce) {
        this.sentence     = '';
        this.words        = [];
        this.wordSelected = 0;

        this.emptySentence = function () {
            return this.sentence.length === 0;
        };

        this.getSentence = function () {
            if (this.emptySentence()) {
                return;
            }

            // Array.reduce doesn't work as expected
            this.words = this.sentence.split(' ')

            var message = '';

            for (var i = 0; i < this.words.length; i++) {
                message += '<span id="word' + i + '" class="' + (i === this.wordSelected ? 'selected' : '') + '">' + this.words[i] + '</span> '
            }

            return sce.trustAsHtml(message.trim());
        };
        
        this.hasComma = function () {
            if (this.emptySentence()) {
                return false;
            }
            
            var word = this.words[this.wordSelected];
            return word.slice(-1) === ',';
        };
        
        this.toggleComma = function () {
            var word = this.words[this.wordSelected];
            if (this.hasComma()) {
                this.words[this.wordSelected] = word.slice(0, -1);
            } else {
                this.words[this.wordSelected] += ',';
            }
            this.sentence = this.words.join(' ');
        };
        
        this.resetWordSelected = function () {
            this.wordSelected = 0;
            this.repaintWordSelected();
        };
        this.nextWordSelected = function () {
            if (this.emptySentence() || (this.wordSelected+1) > (this.words.length-1)) {
                return;
            }
            this.wordSelected++;
            this.repaintWordSelected();
        };
        this.prevWordSelected = function () {
            if (this.emptySentence() || (this.wordSelected-1) < 0) {
                return;
            }
            
            this.wordSelected--;
            this.repaintWordSelected();
        };
        
        this.repaintWordSelected = function () {
            if (this.emptySentence()) {
                return;
            }
            
            console.log('Painting word: ' + (this.wordSelected + 1));
        }
        
        this.resetWordSelected();
    }]);
})();