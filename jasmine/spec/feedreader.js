/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls', function () {
            for (var i = 0; i < allFeeds.length; ++i) {
                field = allFeeds[i];
                expect(field["url"]).toBeDefined();
                expect(field["url"].length).toBeGreaterThan(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function () {
            for (var i = 0; i < allFeeds.length; ++i) {
                field = allFeeds[i];
                expect(field["name"]).toBeDefined();
                expect(field["name"].length).toBeGreaterThan(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The Menu", function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("should be hidden by default", function () {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("should be visible after clicking", function () {
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $(".menu-icon-link").trigger("click"); // click again to reset
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });


    })

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial entries", function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("contains at least a single entry", function (done) {
            loadFeed(1, function () {
                expect($(".feed .entry").length).toBeGreaterThan(0);
                done();
            });
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        var previous_content;
        var new_content;
        beforeEach(function (done) {
            loadFeed(0, function () {
                previous_content = $(".feed .entry").text();
                loadFeed(1, function () {
                    new_content = $(".feed .entry").text();
                    done();
                })
            })
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("changes the content", function () {
            expect(new_content).not.toEqual(previous_content);
        });
    });
}());
