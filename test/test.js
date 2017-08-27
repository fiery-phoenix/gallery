var phantomcss = require('phantomcss');

function screenshot(file) {
    casper.wait(2000);
    phantomcss.screenshot({
        top: 0,
        left: 0,
        width: 1024,
        height: 768
    }, file);
}

function clickNext(file) {
    casper.click('simple-gallery img');
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
        screenshot('first');
    });

    casper.then(function() {
        clickNext('second');
    });

    casper.then(function() {
        phantomcss.compareAll();
    });

    casper.run();
});
