function Warning (message) {
    this.valueOf = function () {
        return "Warning: " + message
    }
    this.message = message
}

this.the = function (actual) {
    var the = {}

    var err = function (message) {
        throw new Error(message)
    }

    var wrn = function (message) {
        throw new Warning(message)
    }

    var createIs = function (msg) {
        var is = this

        is.exactly = function (expected) {
            actual === expected
            || msg("expected exactly " + expected + " but was " + actual)
        }

        is.equivalent = function (expected) {
            actual == expected
            || msg("expected " + expected + " but was " + actual)
        }

        is.about = function (expected) {
            var about = {}

            about.plusOrMinus = function (tolerance) {
                (actual <= expected + tolerance
                    && actual >= expected - tolerance)
                || msg("expected " + expected + " plus or minus " + tolerance
                    + " but was " + actual)
            }

            return about
        }

        is.empty = function () {
            (actual === "" || actual.length === 0
                || JSON.stringify(actual) === "{}")
            || msg("expected " + JSON.stringify(actual) + " to be empty")
        }

        is.undefined = function () {
            actual === undefined
            || msg("expected " + actual + " to be undefined")
        }

        is.null = function () {
            actual === null
            || msg("expected " + actual + " to be null")
        }

        is.type = function (type) {
            typeof (actual) === type
            || msg("expected " + actual + " to be of type " + type)
        }

        is.instance = function (constructor) {
            actual instanceof constructor
            || msg("expected " + actual
                + " to be an instance of " + constructor.name)
        }

        is.lessThan = function (threshold) {
            actual < threshold
            || msg("expected " + actual + " to be less than " + threshold)
        }

        is.greaterThan = function (threshold) {
            actual > threshold
            || msg("expected " + actual + " to be greater than " + threshold)
        }
    }

    the.is = new createIs(err)
    the.is.ideally = new createIs(wrn)

    var createWill = function (msg) {
        var will = this

        will.fail = function () {
            var failed = false
            try { actual() }
            catch (ex) { failed = true }
            failed
            || msg("expected " + actual.name + " to fail")
        }

        will.complete = function () {
            var completed = true
            try { actual() }
            catch (ex) { completed = false }
            completed
            || msg("expected " + actual.name + " to complete")
        }

        will.finishIn = function (milliseconds) {
            var start = new Date()
            actual()
            var duration = (new Date()) - start
            duration <= milliseconds
            || msg("expected " + actual.name
                + " to complete in " + milliseconds
                + " but it took " + duration)
        }
    }

    the.will = new createWill(err)
    the.will.ideally = new createWill(wrn)

    return the
}

this.TestSuite = function (suiteName) {
    var _ = this

    _.cases = {}

    var expecting = 1
    var finished = 0
    var total = 0
    var extra = 0
    var success = 0
    var warning = 0
    var fail = 0

    var verify = function (fn, name) {
        try {
            fn()
            console.log(name + " worked as expected.")
            success++
        } catch (ex) {
            if (ex instanceof Warning) {
                console.warn(name + " was not ideal. The test " + ex.message + ".")
                warning++
            } else {
                console.error(name + " failed. The test " + ex.message + ".")
                fail++
            }
            console.warn(ex.stack)
        }
    }

    var globalTime = 0
    var after = function (description, duration, callback) {
        setTimeout(function () {
            verify(callback, description)
            done()
        }, duration)
    }

    var done = function () {
        finished++
        if (finished >= expecting) {
            _.teardown()
            console.log("Completed verification of the " + suiteName + " tests.")
            console.info("Total test cases:", total + extra)
            if (success < total + extra) {
                console.info("Successful:", success)
                !warning || console.warn("Unstable:", warning)
                !fail || console.error("Failed:", fail)
            } else {
                console.info("All tests were successful!")
            }
        }
    }

    _.setup = function () { }
    _.teardown = function () { }

    _.the = function (description, fn) {

        var and = function (description, fn) {
            verify(fn, description)
            extra++
        }

        if (_.cases[description] !== undefined) {
            throw new Warning(
                "Duplicate test declared. Please enter a unique title.")
        } else if (fn !== undefined) {
            _.cases[description] = verify.curry(fn.curry(and), description)
            total++
            return new function () {
                this.after = function (duration, callback) {
                    globalTime += duration
                    _.cases[description] = {
                        main: fn.curry(and),
                        start: globalTime,
                        after: after.curry(description, duration, callback)
                    }
                    expecting++
                }
            }
        }
    }

    _.run = function () {
        extra = 0
        for (var test in _.cases) {
            if (_.cases.hasOwnProperty(test)) {
                if (_.cases[test].start !== undefined) {
                    setTimeout(_.cases[test].main, _.cases[test].start)
                    setTimeout(_.cases[test].after, _.cases[test].start)
                } else _.cases[test]()
            }
        }
    }

    _.all = function () {
        console.log("Beginning verification of the " + suiteName + " tests.")
        _.setup()
        _.run()
        done()
    }
}
