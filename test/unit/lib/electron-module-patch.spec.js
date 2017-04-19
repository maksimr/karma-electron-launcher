/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

var expect = require('chai').expect
var patch = require('../../../lib/electron-module-patch')
var findContextFrame = patch.findContextFrame
var extractPath = patch.extractPath

describe('getModuleFilename', function () {
  it('should find context line', function () {
    var errorStackTrace = [
      ' at currentScriptUrl (http://localhost:9876/absolute/Users/foo/bar/lib/electron-module-patch.js:39:17)',
      '    at Function._module._resolveFilename (http://localhost:9876/absolute/Users/foo/bar/lib/electron-module-patch.js:31:28)',
      '    at Function.Module._load (module.js:418:25)',
      '    at Module.require (module.js:498:17)',
      '    at require (internal/module.js:20:19)',
      '    at Context.<anonymous> (http://localhost:9876/base/bar/bar.spec.js:9:12)',
      '    at callFn (http://localhost:9876/absolute/Users/foo/bar/node_modules/mocha/mocha.js:4447:21)',
      '    at Test.Runnable.run (http://localhost:9876/absolute/Users/foo/bar/node_modules/mocha/mocha.js:4439:7)',
      '    at Runner.runTest (http://localhost:9876/absolute/Users/foo/bar/node_modules/mocha/mocha.js:4936:10)',
      '    at http://localhost:9876/absolute/Users/foo/bar/node_modules/mocha/mocha.js:5042:12'
    ].join('\n')

    var result = findContextFrame(errorStackTrace)

    expect(result.trim()).to.eql('at Context.<anonymous> (http://localhost:9876/base/bar/bar.spec.js:9:12)')
  })

  it('should get path for relative url', function () {
    var result = extractPath('at Context.<anonymous> (http://localhost:9876/base/bar/bar.spec.js:9:12)')

    expect(result).to.eql('bar/bar.spec.js')
  })

  it('should get path for absolute url', function () {
    var result = extractPath('at Context.<anonymous> (http://localhost:9876/absolute/bar/bar.spec.js:9:12)')

    expect(result).to.eql('/bar/bar.spec.js')
  })
})
