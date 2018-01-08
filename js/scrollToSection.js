"use strict";

var sections = document.querySelectorAll(".panel");

var lastKnownScrollPos = 0;

// const logoElement = document.querySelector("#logo a");
var topPosOffsetNav = 200;
var scrollTicking = false;

// Highlight function
var highlightThis = function (lastKnownScrollPos, event) {

    // Navigation (All sections one by one)

    var doLoop = function (index) {

        var blockTop = sections[index].getBoundingClientRect().y;
        var blockHeight = sections[index].offsetHeight;
        var blockMarginTop = window.getComputedStyle(sections[index], null).getPropertyValue("margin-top").replace(/px/g, '');

        var blockStart = blockTop - blockMarginTop / 2 - topPosOffsetNav + lastKnownScrollPos;
        var blockEnd = blockTop + blockHeight - blockMarginTop / 2 - topPosOffsetNav + lastKnownScrollPos;

        var mousewheelScrollTriggered = false;

        // https://jsfiddle.net/tovic/6nFTC/
        if (mousewheelScrollTriggered == false && lastKnownScrollPos < blockEnd && lastKnownScrollPos > blockStart) {

            // Scroll to section mousewheel
            var mousewheelScroll = function (scrollPos, blockEnd, blockStart) {

                // cross-browser wheel delta
                event = window.event || event;
                var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));

                var down = index - 1; // Previous section
                var up = index + 1; // Next section

                if (mousewheelScrollTriggered == false && delta == -1) {
                    // Mousewheel Up
                    // Om du är på #section 2 -> Kör #section 1
                    if (up >= down && up < sections.length) {
                        //// console.log(up);
                        location.href = "#" + sections[up].id;
                        mousewheelScrollTriggered = true;
                    }
                } else if (mousewheelScrollTriggered == false && delta == 1) {
                    // Mousewheel Down
                    // Om du är på #section 2 -> Kör #section 3
                    if (down <= up && down > -1) {
                        //// console.log(down);
                        location.href = "#" + sections[down].id;
                        mousewheelScrollTriggered = true;
                    }
                }
                event.preventDefault();
            };

            if (window.addEventListener) {
                window.addEventListener("mousewheel", mousewheelScroll, false);
                window.addEventListener("DOMMouseScroll", mousewheelScroll, false);
            } else {
                window.attachEvent("onmousewheel", mousewheelScroll);
            }
        }

    };

    for (var index = 0; index < sections.length; index++) {
        doLoop(index);
    }
}


// Function for scroll events
function scrollPos(event) {
    lastKnownScrollPos = window.scrollY;
    if (!scrollTicking) {

        var animationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (f) { return setTimeout(f, 1000 / 60) }; // simulate calling code 60

        animationFrame(function () {
            highlightThis(lastKnownScrollPos, event);
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

window.addEventListener("scroll", scrollPos, false);
window.addEventListener("load", scrollPos, false);

//window.addEventListener("mousewheel", highlightLastKnownScrollPos, false);
