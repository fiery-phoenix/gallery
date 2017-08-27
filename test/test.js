var phantomcss = require('phantomcss');

function screenshot(file) {
    phantomcss.screenshot({
        top: 0,
        left: 0,
        width: 1024,
        height: 768
    }, file);
}

function checkClickNext(file) {
    casper.click('.nav-button-right');
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
        checkClickNext('second');
    });

    casper.then(function() {
        checkClickNext('third');
    });

    casper.then(function() {
        checkClickNext('first-again');
    });

    casper.then(function() {
        phantomcss.compareAll();
    });

    casper.run();
});
