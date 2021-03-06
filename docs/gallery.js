(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var indicator_1 = require("./indicator");
var navigator_1 = require("./navigator");
var Carousel = (function () {
    function Carousel(container) {
        this.index = 0;
        this.slidingCoordinates = new Coordinates();
        this.container = container;
    }
    Carousel.prototype.init = function () {
        this.n = this.container.children.length;
        var carousel = this;
        for (var i = 1; i < carousel.n; i++) {
            this.hideItem(i);
        }
        this.addNavigation();
    };
    Carousel.prototype.addNavigation = function () {
        var _this = this;
        if (this.n > 0) {
            this.indicator = new indicator_1.Indicator(this.n).attachTo(this.container);
            new navigator_1.RightNavigator().attachTo(this.container).onNavigation(function () { return _this.next(); });
            new navigator_1.LeftNavigator().attachTo(this.container).onNavigation(function () { return _this.previous(); });
            var carousel_1 = this;
            this.container.addEventListener('touchstart', function (e) {
                carousel_1.slidingCoordinates.update(e.touches[0].clientX, e.touches[0].clientY);
            }, false);
            this.container.addEventListener('touchmove', function (e) {
                var xDiff = carousel_1.slidingCoordinates.getDirection(e.touches[0].clientX, e.touches[0].clientY);
                if (xDiff !== 0) {
                    if (xDiff > 0) {
                        carousel_1.previous();
                    }
                    else {
                        carousel_1.next();
                    }
                }
                carousel_1.slidingCoordinates.unset();
            }, false);
        }
    };
    Carousel.prototype.next = function () {
        this.hideItem(this.index);
        this.showItem(this.incIndex());
        this.indicator.updateWith(this.index + 1);
    };
    Carousel.prototype.previous = function () {
        this.hideItem(this.index);
        this.showItem(this.decIndex());
        this.indicator.updateWith(this.index + 1);
    };
    Carousel.prototype.incIndex = function () {
        this.index = (this.index + 1) % this.n;
        return this.index;
    };
    Carousel.prototype.decIndex = function () {
        this.index = (this.index - 1);
        if (this.index < 0) {
            this.index = this.n - 1;
        }
        return this.index;
    };
    Carousel.prototype.hideItem = function (index) {
        this.container.children[index].className = 'hidden';
    };
    Carousel.prototype.showItem = function (index) {
        var child = this.container.children[index];
        child.className = 'shown';
        Carousel.resizeImage(child.firstChild);
    };
    Carousel.resizeImage = function (img) {
        if (img['width'] / window.innerWidth > img['height'] / window.innerHeight) {
            img['className'] = 'full-width';
        }
        else {
            img['className'] = 'full-height';
        }
    };
    return Carousel;
}());
exports.Carousel = Carousel;
var Coordinates = (function () {
    function Coordinates() {
    }
    Coordinates.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Coordinates.prototype.unset = function () {
        this.x = null;
        this.y = null;
    };
    Coordinates.prototype.getDirection = function (x, y) {
        if (!this.x || !this.y) {
            return 0;
        }
        var xDiff = this.x - x;
        var yDiff = this.y - y;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            return xDiff;
        }
        return 0;
    };
    return Coordinates;
}());

},{"./indicator":3,"./navigator":4}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var carousel_1 = require("./carousel");
var gallery = Object.create(HTMLElement.prototype);
gallery.createdCallback = function () {
    this.carousel = new carousel_1.Carousel(this);
    this.carousel.init();
};
var galleryItem = Object.create(HTMLElement.prototype);
galleryItem.createdCallback = function () {
    var _this = this;
    var img = new Image();
    img.onload = function () {
        _this.appendChild(img);
        carousel_1.Carousel.resizeImage(img);
    };
    img.src = this.getAttribute('src');
};
document['registerElement']('simple-gallery', { prototype: gallery });
document['registerElement']('gallery-item', { prototype: galleryItem });

},{"./carousel":1}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Indicator = (function () {
    function Indicator(n) {
        this.n = n;
        this.element = document.createElement('p');
        this.element.innerHTML = '1/' + n;
    }
    Indicator.prototype.attachTo = function (parent) {
        parent.appendChild(this.element);
        return this;
    };
    Indicator.prototype.updateWith = function (index) {
        this.element.innerHTML = "<p>" + index + "/" + this.n + "</p>";
    };
    return Indicator;
}());
exports.Indicator = Indicator;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Navigator = (function () {
    function Navigator(direction, representation) {
        var element = document.createElement('div');
        element.setAttribute('class', 'nav-button-' + direction);
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = representation;
        innerDiv.setAttribute('class', 'nav-button-inner');
        element.appendChild(innerDiv);
        this.element = element;
    }
    Navigator.prototype.attachTo = function (parent) {
        parent.appendChild(this.element);
        return this;
    };
    Navigator.prototype.onNavigation = function (f) {
        this.element.addEventListener('click', function () { return f(); });
    };
    return Navigator;
}());
var RightNavigator = (function (_super) {
    __extends(RightNavigator, _super);
    function RightNavigator() {
        return _super.call(this, 'right', '&gt;') || this;
    }
    return RightNavigator;
}(Navigator));
exports.RightNavigator = RightNavigator;
var LeftNavigator = (function (_super) {
    __extends(LeftNavigator, _super);
    function LeftNavigator() {
        return _super.call(this, 'left', '&lt;') || this;
    }
    return LeftNavigator;
}(Navigator));
exports.LeftNavigator = LeftNavigator;

},{}]},{},[2]);
