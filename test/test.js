var phantomcss = require('phantomcss');

function screenshot(file) {
    phantomcss.screenshot({
        top: 0,
        left: 0,
        width: 1024,
        height: 768
    }, file);
}

function toRight(file) {
    casper.click('.nav-button-right');
    casper.wait(500);
    screenshot(file);
}

function toLeft(file) {
    casper.click('.nav-button-left');
    casper.wait(500);
    screenshot(file);
}

phantomcss.init({
    captureWaitEnabled: true,
    screenshotRoot: './test/screenshots',
    failedComparisonsRoot: './test/failures',
    rebase: casper.cli.get("rebase")
});

casper.test.begin('Testing image screenshot', function(test) {

    casper.start('http://localhost:3000/');
    casper.viewport(1024, 768);

    casper.then(function() {
        test.assertTitle('Gallery');
    });

    casper.then(function() {
        test.assertExists('gallery-item img');
    });

    casper.then(function() {
        casper.wait(2000);
        screenshot('first');
    });

    casper.then(function() {
        toRight('second');
    });

    casper.then(function() {
        toRight('third');
    });

    casper.then(function() {
        toRight('first-again');
    });

    casper.then(function() {
        toLeft('thrird-again');
    });

    casper.then(function() {
        toLeft('second-again');
    });

    casper.then(function() {
        phantomcss.compareAll();
    });

    casper.run();
});
