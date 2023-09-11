
var Module = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(moduleArg = {}) {

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
Module['ready'] = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_main","_memory","___indirect_function_table","_releaseWasmBuffer","_djinni_init_wasm","_djinni_register_name_in_ns","__embind_initialize_bindings","_fflush","___start_em_js","___stop_em_js","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(Module['ready'], prop)) {
    Object.defineProperty(Module['ready'], prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = nodePath.dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js
read_ = (filename, binary) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror, binary = true) => {
  // See the comment in the `read_` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
    if (err) onerror(err);
    else onload(binary ? data.buffer : data);
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

  Module['inspect'] = () => '[Emscripten Module object]';

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = read;
  }

  readBinary = (f) => {
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    let data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = (f, onload, onerror) => {
    setTimeout(() => onload(readBinary(f)));
  };

  if (typeof clearTimeout == 'undefined') {
    globalThis.clearTimeout = (id) => {};
  }

  if (typeof setTimeout == 'undefined') {
    // spidermonkey lacks setTimeout but we use it above in readAsync.
    globalThis.setTimeout = (f) => (typeof f == 'function') ? f() : abort();
  }

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason, we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately.  To increase
      // consistency with node (and the web) we schedule the actual quit call
      // using a setTimeout to give the current stack and any exception handlers
      // a chance to run.  This enables features such as addOnPostRun (which
      // expected to be able to run code after main returns).
      setTimeout(() => {
        if (!(toThrow instanceof ExitStatus)) {
          let toLog = toThrow;
          if (toThrow && typeof toThrow == 'object' && toThrow.stack) {
            toLog = [toThrow, toThrow.stack];
          }
          err(`exiting due to exception: ${toLog}`);
        }
        quit(status);
      });
      throw toThrow;
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptDir) {
    scriptDirectory = _scriptDir;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = (title) => document.title = title;
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');
var noExitRuntime = Module['noExitRuntime'] || true;legacyModuleProp('noExitRuntime', 'noExitRuntime');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;
// end include: runtime_init_table.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}
// end include: URIUtils.js
function createExportWrapper(name) {
  return function() {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    return f.apply(null, arguments);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAABggIiYAF/AX9gAn9/AX9gAX8AYAABf2ACf38AYAN/f38Bf2ADf39/AGAAAGAEf39/fwBgBX9/f39/AGAGf39/f39/AGAEf39/fwF/YAN/fn8BfmACfHwBfGABfwF8YAV/f39/fwF/YAd/f39/f39/AGAEf35+fwBgBn98f39/fwF/YAJ+fwF/YA1/f39/f39/f39/f39/AGAMf39/f39/f39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAN/fHwBfGABfAF8YAJ8fwF8YAJ+fgF8YAd/f39/f39/AX9gA35/fwF/YAF8AX5gBH9/fn8BfmAFf39/fn4AYAR/fn9/AX8CuwciA2Vudg1fZW12YWxfZGVjcmVmAAIDZW52DV9lbXZhbF9pbmNyZWYAAgNlbnYWX2VtYmluZF9yZWdpc3Rlcl9jbGFzcwAUA2VudhpfZW1iaW5kX3JlZ2lzdGVyX3NtYXJ0X3B0cgAVA2VudiVfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NsYXNzX2Z1bmN0aW9uABYDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYRX2VtdmFsX3Rha2VfdmFsdWUAAQNlbnYLX2VtdmFsX2NhbGwACwNlbnYfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgAXA2VudhdfZW12YWxfY2FsbF92b2lkX21ldGhvZAAIA2VudhhfZW12YWxfZ2V0X21ldGhvZF9jYWxsZXIAAQNlbnYRX2VtdmFsX2dldF9nbG9iYWwAAANlbnYKX2VtdmFsX25ldwALA2VudhNfZW12YWxfZ2V0X3Byb3BlcnR5AAEDZW52C19fY3hhX3Rocm93AAYDZW52Gl9lbXZhbF9nZXRfbW9kdWxlX3Byb3BlcnR5AAADZW52El9lbXZhbF9uZXdfY3N0cmluZwAAA2VudhBkamlubmlfaW5pdF93YXNtAAcDZW52GV9lbWJpbmRfcmVnaXN0ZXJfZnVuY3Rpb24AEANlbnYVX2VtYmluZF9yZWdpc3Rlcl92b2lkAAQDZW52FV9lbWJpbmRfcmVnaXN0ZXJfYm9vbAAIA2VudhhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIACQNlbnYWX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAAGA2Vudhtf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AAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQAMAgsACwJAIANBBE8NACAAIQIMAQsCQCADQXxqIgQgAE8NACAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLAkAgAiADTw0AA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLIAALJAECfwJAIAAQ7wNBAWoiARD0AyICDQBBAA8LIAIgACABEO0DC4UBAQN/IAAhAQJAAkAgAEEDcUUNAAJAIAAtAAANACAAIABrDwsgACEBA0AgAUEBaiIBQQNxRQ0BIAEtAAANAAwCCwALA0AgASICQQRqIQEgAigCACIDQX9zIANB//37d2pxQYCBgoR4cUUNAAsDQCACIgFBAWohAiABLQAADQALCyABIABrCwcAPwBBEHQLBgBBhLYEC1QBAn9BACgC+KMEIgEgAEEHakF4cSICaiEAAkACQCACRQ0AIAAgAU0NAQsCQCAAEPADTQ0AIAAQHEUNAQtBACAANgL4owQgAQ8LEPEDQTA2AgBBfwvyAgIDfwF+AkAgAkUNACAAIAE6AAAgAiAAaiIDQX9qIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0F9aiABOgAAIANBfmogAToAACACQQdJDQAgACABOgADIANBfGogAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkF8aiABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBeGogATYCACACQXRqIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQXBqIAE2AgAgAkFsaiABNgIAIAJBaGogATYCACACQWRqIAE2AgAgBCADQQRxQRhyIgVrIgJBIEkNACABrUKBgICAEH4hBiADIAVqIQEDQCABIAY3AxggASAGNwMQIAEgBjcDCCABIAY3AwAgAUEgaiEBIAJBYGoiAkEfSw0ACwsgAAvYKgELfyMAQRBrIgEkAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQfQBSw0AAkBBACgCiLYE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BEKAgICAgIDAgLx/fFoNACAAQjyIIAFCBIaEIQQCQCAAQv//////////D4MiAEKBgICAgICAgAhUDQAgBEKBgICAgICAgMAAfCEFDAILIARCgICAgICAgIDAAHwhBSAAQoCAgICAgICACFINASAFIARCAYN8IQUMAQsCQCAAUCAEQoCAgICAgMD//wBUIARCgICAgICAwP//AFEbDQAgAEI8iCABQgSGhEL/////////A4NCgICAgICAgPz/AIQhBQwBC0KAgICAgICA+P8AIQUgBEL///////+//8MAVg0AQgAhBSAEQjCIpyIDQZH3AEkNACACQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBCADQf+If2oQpgQgAiAAIARBgfgAIANrEKcEIAIpAwAiBEI8iCACQQhqKQMAQgSGhCEFAkAgBEL//////////w+DIAIpAxAgAkEQakEIaikDAIRCAFKthCIEQoGAgICAgICACFQNACAFQgF8IQUMAQsgBEKAgICAgICAgAhSDQAgBUIBgyAFfCEFCyACQSBqJAAgBSABQoCAgICAgICAgH+DhL8LzgEBA38CQAJAIAIoAhAiAw0AQQAhBCACEJ8EDQEgAigCECEDCwJAIAMgAigCFCIFayABTw0AIAIgACABIAIoAiQRBQAPCwJAAkAgAigCUEEATg0AQQAhAwwBCyABIQQDQAJAIAQiAw0AQQAhAwwCCyAAIANBf2oiBGotAABBCkcNAAsgAiAAIAMgAigCJBEFACIEIANJDQEgACADaiEAIAEgA2shASACKAIUIQULIAUgACABEO0DGiACIAIoAhQgAWo2AhQgAyABaiEECyAEC1sBAn8gAiABbCEEAkACQCADKAJMQX9KDQAgACAEIAMQqQQhAAwBCyADEJsEIQUgACAEIAMQqQQhACAFRQ0AIAMQnAQLAkAgACAERw0AIAJBACABGw8LIAAgAW4L7AIBBH8jAEHQAWsiBSQAIAUgAjYCzAFBACEGIAVBoAFqQQBBKBDzAxogBSAFKALMATYCyAECQAJAQQAgASAFQcgBaiAFQdAAaiAFQaABaiADIAQQrARBAE4NAEF/IQQMAQsCQCAAKAJMQQBIDQAgABCbBCEGCyAAIAAoAgAiB0FfcTYCAAJAAkACQAJAIAAoAjANACAAQdAANgIwIABBADYC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AABBIHENACABIAIgABCpBBoLC3QBA39BACEBAkAgACgCACwAABCgBA0AQQAPCwNAIAAoAgAhAkF/IQMCQCABQcyZs+YASw0AQX8gAiwAAEFQaiIDIAFBCmwiAWogAyABQf////8Hc0obIQMLIAAgAkEBajYCACADIQEgAiwAARCgBA0ACyADC7YEAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAFBd2oOEgABAgUDBAYHCAkKCwwNDg8QERILIAIgAigCACIBQQRqNgIAIAAgASgCADYCAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASsDADkDAA8LIAAgAiADEQQACws+AQF/AkAgAFANAANAIAFBf2oiASAAp0EPcUGQmwRqLQAAIAJyOgAAIABCD1YhAyAAQgSIIQAgAw0ACwsgAQs2AQF/AkAgAFANAANAIAFBf2oiASAAp0EHcUEwcjoAACAAQgdWIQIgAEIDiCEAIAINAAsLIAELiAECAX4DfwJAAkAgAEKAgICAEFoNACAAIQIMAQsDQCABQX9qIgEgACAAQgqAIgJCCn59p0EwcjoAACAAQv////+fAVYhAyACIQAgAw0A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CxIBAn8jACAAa0FwcSIBJAAgAQsEACMACw0AIAEgAiADIAARDAALJQEBfiAAIAEgAq0gA61CIIaEIAQQiwUhBSAFQiCIpxCABSAFpwscACAAIAEgAiADpyADQiCIpyAEpyAEQiCIpxAgCxMAIAAgAacgAUIgiKcgAiADECELC4w1AwBBgIAEC/QjZGlyZWN0QnVmZmVyRmluYWxpemVyUmVnaXN0cnkAbmF0aXZlRGVzdHJveQBVaW50OEFycmF5AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAdW5zaWduZWQgc2hvcnQAdW5zaWduZWQgaW50AGZsb2F0AHVpbnQ2NF90AE1hdGhVdGlscwB2ZWN0b3IAcmVnaXN0ZXIAaW5pdENwcFJlc29sdmVIYW5kbGVyAGJ1ZmZlcgBhbGxvY2F0ZVdhc21CdWZmZXIAdW5zaWduZWQgY2hhcgAvVXNlcnMvc2FtL3NuYXAuZGppbm5pL3N1cHBvcnQtbGliL3dhc20vZGppbm5pX3dhc20uaHBwAHN0ZDo6ZXhjZXB0aW9uAG5hbgBib29sAGVtc2NyaXB0ZW46OnZhbABiYWRfYXJyYXlfbmV3X2xlbmd0aAB1bnNpZ25lZCBsb25nAHN0ZDo6d3N0cmluZwBzdGQ6OnN0cmluZwBzdGQ6OnUxNnN0cmluZwBzdGQ6OnUzMnN0cmluZwBpbmYAcmVqZWN0TmF0aXZlUHJvbWlzZQByZXNvbHZlTmF0aXZlUHJvbWlzZQBkb3VibGUAdm9pZABtdXRleCBsb2NrIGZhaWxlZABzdGQ6OmJhZF9hbGxvYwBOQU4ASU5GAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AHN0ZDo6YmFzaWNfc3RyaW5nPHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AGFkZEZmZjY0AEhFQVBVMzIALgAobnVsbCkAaSAhPSBjcHBQcm94eUNhY2hlLmVuZCgpAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQhAGxpYmMrK2FiaTogADlNYXRoVXRpbHMAAADsDwEA8wQBAFA5TWF0aFV0aWxzAMwQAQAIBQEAAAAAAAAFAQBQSzlNYXRoVXRpbHMAAAAAzBABACQFAQABAAAAAAUBAGlpAHYAdmkATjEwZW1zY3JpcHRlbjN2YWxFAADsDwEATAUBAAAAAAAIBgEADQAAAA4AAAAPAAAAEAAAABEAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQOU1hdGhVdGlsc04xMGVtc2NyaXB0ZW4xNXNtYXJ0X3B0cl90cmFpdElOU18xMHNoYXJlZF9wdHJJUzFfRUVFMTF2YWxfZGVsZXRlckVOU185YWxsb2NhdG9ySVMxX0VFRUUAAAAUEAEAhAUBAJwLAQBOMTBlbXNjcmlwdGVuMTVzbWFydF9wdHJfdHJhaXRJTlN0M19fMjEwc2hhcmVkX3B0ckk5TWF0aFV0aWxzRUVFMTF2YWxfZGVsZXRlckUAAOwPAQAUBgEATlN0M19fMjEwc2hhcmVkX3B0ckk5TWF0aFV0aWxzRUUAAAAA7A8BAGwGAQBpAGlpaQAAACgPAQCQBgEAdmlpANwPAQDcDwEA3A8BAGRpZGQATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUA7A8BAL0GAQBgBQEAlA8BAAAAAACEBwEAIwAAACQAAAAlAAAAJgAAAE42ZGppbm5pMTNHZW5lcmljQnVmZmVySU5TdDNfXzI2dmVjdG9ySWhOUzFfOWFsbG9jYXRvckloRUVFRUVFAE42ZGppbm5pMTBEYXRhT2JqZWN0RQAAAADsDwEAYwcBABQQAQAkBwEAfAcBAAAAAAB8BwEAJwAAACgAAAApAAAAKQAAAAAAAAAAAAAAKA8BAIgPAQBgBQEAYAUBAHZpaWlpAAAAAAAAAAAAAAAoDwEAiA8BAIgPAQBgBQEAYAUBAJQPAQCUDwEAKA8BAGAFAQCUDwEATlN0M19fMjEyYmFzaWNfc3RyaW5nSWhOU18xMWNoYXJfdHJhaXRzSWhFRU5TXzlhbGxvY2F0b3JJaEVFRUUAAOwPAQD4BwEATlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRUUAAOwPAQBACAEATlN0M19fMjEyYmFzaWNfc3RyaW5nSURzTlNfMTFjaGFyX3RyYWl0c0lEc0VFTlNfOWFsbG9jYXRvcklEc0VFRUUAAADsDwEAiAgBAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEaU5TXzExY2hhcl90cmFpdHNJRGlFRU5TXzlhbGxvY2F0b3JJRGlFRUVFAAAA7A8BANQIAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ljRUUAAOwPAQAgCQEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAADsDwEASAkBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWhFRQAA7A8BAHAJAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lzRUUAAOwPAQCYCQEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAADsDwEAwAkBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3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AAAsEQEAIgAAAEwAAABNAAAAU3Q5ZXhjZXB0aW9uAAAAAOwPAQAcEQEAU3Q5YmFkX2FsbG9jAAAAABQQAQA0EQEALBEBAFN0MjBiYWRfYXJyYXlfbmV3X2xlbmd0aAAAAAAUEAEAUBEBAEQRAQAAAAAAnBEBACEAAABOAAAATwAAAFN0MTFsb2dpY19lcnJvcgAUEAEAjBEBACwRAQAAAAAA0BEBACEAAABQAAAATwAAAFN0MTJsZW5ndGhfZXJyb3IAAAAAFBABALwRAQCcEQEAU3Q5dHlwZV9pbmZvAAAAAOwPAQDcEQEAAEH4owQLnAHQHQEAAAAAAAUAAAAAAAAAAAAAADEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIAAAAzAAAAyB0BAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQAAQZSlBAvjDygpPDo6PnsgTW9kdWxlLmNwcFByb3h5RmluYWxpemVyUmVnaXN0cnkgPSBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkobmF0aXZlUmVmID0+IHsgbmF0aXZlUmVmLm5hdGl2ZURlc3Ryb3koKTsgbmF0aXZlUmVmLmRlbGV0ZSgpOyB9KTsgTW9kdWxlLmRpcmVjdEJ1ZmZlckZpbmFsaXplclJlZ2lzdHJ5ID0gbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KGFkZHIgPT4geyBNb2R1bGUuX3JlbGVhc2VXYXNtQnVmZmVyKGFkZHIpOyB9KTsgY2xhc3MgRGppbm5pQ3BwUHJveHkgeyBjb25zdHJ1Y3RvcihuYXRpdmVSZWYsIG1ldGhvZHMpIHsgdGhpcy5fZGppbm5pX25hdGl2ZV9yZWYgPSBuYXRpdmVSZWY7IGxldCBzZWxmID0gdGhpczsgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkgeyBzZWxmW21ldGhvZF0gPSBmdW5jdGlvbiguLi5hcmdzKSB7IHJldHVybiBuYXRpdmVSZWZbbWV0aG9kXSguLi5hcmdzKTsgfSB9KTsgfSB9IE1vZHVsZS5EamlubmlDcHBQcm94eSA9IERqaW5uaUNwcFByb3h5OyBjbGFzcyBEamlubmlKc1Byb21pc2VCdWlsZGVyIHsgY29uc3RydWN0b3IoY3BwSGFuZGxlclB0cikgeyB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZUZ1bmMsIHJlamVjdEZ1bmMpID0+IHsgTW9kdWxlLmluaXRDcHBSZXNvbHZlSGFuZGxlcihjcHBIYW5kbGVyUHRyLCByZXNvbHZlRnVuYywgcmVqZWN0RnVuYyk7IH0pOyB9IH0gTW9kdWxlLkRqaW5uaUpzUHJvbWlzZUJ1aWxkZXIgPSBEamlubmlKc1Byb21pc2VCdWlsZGVyOyBNb2R1bGUubWFrZU5hdGl2ZVByb21pc2VSZXNvbHZlciA9IGZ1bmN0aW9uKGZ1bmMsIHBOYXRpdmVQcm9taXNlKSB7IHJldHVybiBmdW5jdGlvbihyZXMpIHsgTW9kdWxlLnJlc29sdmVOYXRpdmVQcm9taXNlKGZ1bmMsIHBOYXRpdmVQcm9taXNlLCByZXMpOyB9OyB9OyBNb2R1bGUubWFrZU5hdGl2ZVByb21pc2VSZWplY3RlciA9IGZ1bmN0aW9uKGZ1bmMsIHBOYXRpdmVQcm9taXNlKSB7IHJldHVybiBmdW5jdGlvbihlcnIpIHsgTW9kdWxlLnJlamVjdE5hdGl2ZVByb21pc2UoZnVuYywgcE5hdGl2ZVByb21pc2UsIGVycik7IH07IH07IE1vZHVsZS53cml0ZU5hdGl2ZU1lbW9yeSA9IGZ1bmN0aW9uKHNyYywgbmF0aXZlUHRyKSB7IHZhciBzcmNCeXRlVmlldyA9IG5ldyBVaW50OEFycmF5KHNyYy5idWZmZXIsIHNyYy5ieXRlT2Zmc2V0LCBzcmMuYnl0ZUxlbmd0aCk7IE1vZHVsZS5IRUFQVTguc2V0KHNyY0J5dGVWaWV3LCBuYXRpdmVQdHIpOyB9OyBNb2R1bGUucmVhZE5hdGl2ZU1lbW9yeSA9IGZ1bmN0aW9uKGNscywgbmF0aXZlUHRyLCBuYXRpdmVTaXplKSB7IHJldHVybiBuZXcgY2xzKE1vZHVsZS5IRUFQVTguYnVmZmVyLnNsaWNlKG5hdGl2ZVB0ciwgbmF0aXZlUHRyICsgbmF0aXZlU2l6ZSkpOyB9OyBNb2R1bGUucHJvdG9idWYgPSB7fTsgTW9kdWxlLnJlZ2lzdGVyUHJvdG9idWZMaWIgPSBmdW5jdGlvbihuYW1lLCBwcm90bykgeyBNb2R1bGUucHJvdG9idWZbbmFtZV0gPSBwcm90bzsgfTsgTW9kdWxlLmNhbGxKc1Byb3h5TWV0aG9kID0gZnVuY3Rpb24ob2JqLCBtZXRob2QsIC4uLmFyZ3MpIHsgdHJ5IHsgcmV0dXJuIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGU7IH0gfTsgfQAoY29uc3QgY2hhciogcHJlZml4ZWROYW1lLCBjb25zdCBjaGFyKiBuYW1lc3BhY2VkTmFtZSk8Ojo+eyBwcmVmaXhlZE5hbWUgPSByZWFkTGF0aW4xU3RyaW5nKHByZWZpeGVkTmFtZSk7IG5hbWVzcGFjZWROYW1lID0gcmVhZExhdGluMVN0cmluZyhuYW1lc3BhY2VkTmFtZSk7IGxldCBwYXJ0cyA9IG5hbWVzcGFjZWROYW1lLnNwbGl0KCcuJyk7IGxldCBuYW1lID0gcGFydHMucG9wKCk7IGxldCBucyA9IHBhcnRzLnJlZHVjZShmdW5jdGlvbihwYXRoLCBwYXJ0KSB7IGlmICghcGF0aC5oYXNPd25Qcm9wZXJ0eShwYXJ0KSkgeyBwYXRoW3BhcnRdID0ge319OyByZXR1cm4gcGF0aFtwYXJ0XSB9LCBNb2R1bGUpOyBuc1tuYW1lXSA9IE1vZHVsZVtwcmVmaXhlZE5hbWVdOyB9AA==';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(file);
  if (binary) {
    return binary;
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
}

function getBinaryPromise(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateSync(file, info) {
  var module;
  var binary = getBinarySync(file);
  module = new WebAssembly.Module(binary);
  var instance = new WebAssembly.Instance(module, info);
  return [instance, module];
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    wasmExports = exports;
    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return exports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  var result = instantiateSync(wasmBinaryFile, info);
  // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193,
  // the above line no longer optimizes out down to the following line.
  // When the regression is fixed, we can remove this if/else.
  return receiveInstance(result[0]);
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName, incomming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incomming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce('`' + sym + '` is not longer defined by emscripten. ' + msg);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  if (typeof globalThis !== 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = '`' + sym + '` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line';
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + librarySymbol + "')";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS libary is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(text) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn.apply(console, arguments);
}
// end include: runtime_debug.js
// === Body ===

function djinni_init_wasm() { Module.cppProxyFinalizerRegistry = new FinalizationRegistry(nativeRef => { nativeRef.nativeDestroy(); nativeRef.delete(); }); Module.directBufferFinalizerRegistry = new FinalizationRegistry(addr => { Module._releaseWasmBuffer(addr); }); class DjinniCppProxy { constructor(nativeRef, methods) { this._djinni_native_ref = nativeRef; let self = this; methods.forEach(function(method) { self[method] = function(...args) { return nativeRef[method](...args); } }); } } Module.DjinniCppProxy = DjinniCppProxy; class DjinniJsPromiseBuilder { constructor(cppHandlerPtr) { this.promise = new Promise((resolveFunc, rejectFunc) => { Module.initCppResolveHandler(cppHandlerPtr, resolveFunc, rejectFunc); }); } } Module.DjinniJsPromiseBuilder = DjinniJsPromiseBuilder; Module.makeNativePromiseResolver = function(func, pNativePromise) { return function(res) { Module.resolveNativePromise(func, pNativePromise, res); }; }; Module.makeNativePromiseRejecter = function(func, pNativePromise) { return function(err) { Module.rejectNativePromise(func, pNativePromise, err); }; }; Module.writeNativeMemory = function(src, nativePtr) { var srcByteView = new Uint8Array(src.buffer, src.byteOffset, src.byteLength); Module.HEAPU8.set(srcByteView, nativePtr); }; Module.readNativeMemory = function(cls, nativePtr, nativeSize) { return new cls(Module.HEAPU8.buffer.slice(nativePtr, nativePtr + nativeSize)); }; Module.protobuf = {}; Module.registerProtobufLib = function(name, proto) { Module.protobuf[name] = proto; }; Module.callJsProxyMethod = function(obj, method, ...args) { try { return obj[method].apply(obj, args); } catch (e) { return e; } }; }
function djinni_register_name_in_ns(prefixedName,namespacedName) { prefixedName = readLatin1String(prefixedName); namespacedName = readLatin1String(namespacedName); let parts = namespacedName.split('.'); let name = parts.pop(); let ns = parts.reduce(function(path, part) { if (!path.hasOwnProperty(part)) { path[part] = {}}; return path[part] }, Module); ns[name] = Module[prefixedName]; }


// end include: preamble.js

  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var warnOnce = (text) => {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number');
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  /** @constructor */
  function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
  
      this.set_type = function(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      };
  
      this.get_type = function() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      };
  
      this.set_destructor = function(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      };
  
      this.get_destructor = function() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      };
  
      this.set_caught = function(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(((this.ptr)+(12))>>0)] = caught;
      };
  
      this.get_caught = function() {
        return HEAP8[(((this.ptr)+(12))>>0)] != 0;
      };
  
      this.set_rethrown = function(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(((this.ptr)+(13))>>0)] = rethrown;
      };
  
      this.get_rethrown = function() {
        return HEAP8[(((this.ptr)+(13))>>0)] != 0;
      };
  
      // Initialize native structure fields. Should be called once after allocated.
      this.init = function(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      this.set_adjusted_ptr = function(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      };
  
      this.get_adjusted_ptr = function() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      };
  
      // Get pointer which is expected to be received by catch clause in C++ code. It may be adjusted
      // when the pointer is casted to some of the exception object base classes (e.g. when virtual
      // inheritance is used). When a pointer is thrown this method should return the thrown pointer
      // itself.
      this.get_exception_ptr = function() {
        // Work around a fastcomp bug, this code is still included for some reason in a build without
        // exceptions support.
        var isPointer = ___cxa_is_pointer_type(this.get_type());
        if (isPointer) {
          return HEAPU32[((this.excPtr)>>2)];
        }
        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.excPtr;
      };
    }
  
  var exceptionLast = 0;
  
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
    };

  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {};

  var embind_init_charCodes = () => {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    };
  var embind_charCodes = undefined;
  var readLatin1String = (ptr) => {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    };
  
  var awaitingDependencies = {
  };
  
  var registeredTypes = {
  };
  
  var typeDependencies = {
  };
  
  var BindingError = undefined;
  var throwBindingError = (message) => { throw new BindingError(message); };
  
  
  
  
  var InternalError = undefined;
  var throwInternalError = (message) => { throw new InternalError(message); };
  var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
      myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
      });
  
      function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
              throwInternalError('Mismatched type converter count');
          }
          for (var i = 0; i < myTypes.length; ++i) {
              registerType(myTypes[i], myTypeConverters[i]);
          }
      }
  
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    };
  /** @param {Object=} options */
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
  /** @param {Object=} options */
  function registerType(rawType, registeredInstance, options = {}) {
      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }
      return sharedRegisterType(rawType, registeredInstance, options);
    }
  
  var GenericWireTypeSize = 8;
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = readLatin1String(name);
      registerType(rawType, {
          name,
          'fromWireType': function(wt) {
              // ambiguous emscripten ABI: sometimes return values are
              // true or false, and sometimes integers (0 or 1)
              return !!wt;
          },
          'toWireType': function(destructors, o) {
              return o ? trueValue : falseValue;
          },
          'argPackAdvance': GenericWireTypeSize,
          'readValueFromPointer': function(pointer) {
              return this['fromWireType'](HEAPU8[pointer]);
          },
          destructorFunction: null, // This type does not need a destructor
      });
    };

  
  function ClassHandle_isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }
      if (!(other instanceof ClassHandle)) {
        return false;
      }
  
      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;
  
      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }
  
      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }
  
      return leftClass === rightClass && left === right;
    }
  
  var shallowCopyInternalPointer = (o) => {
      return {
        count: o.count,
        deleteScheduled: o.deleteScheduled,
        preservePointerOnDelete: o.preservePointerOnDelete,
        ptr: o.ptr,
        ptrType: o.ptrType,
        smartPtr: o.smartPtr,
        smartPtrType: o.smartPtrType,
      };
    };
  
  var throwInstanceAlreadyDeleted = (obj) => {
      function getInstanceTypeName(handle) {
        return handle.$$.ptrType.registeredClass.name;
      }
      throwBindingError(getInstanceTypeName(obj) + ' instance already deleted');
    };
  
  var finalizationRegistry = false;
  
  var detachFinalizer = (handle) => {};
  
  var runDestructor = ($$) => {
      if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr);
      } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr);
      }
    };
  var releaseClassHandle = ($$) => {
      $$.count.value -= 1;
      var toDelete = 0 === $$.count.value;
      if (toDelete) {
        runDestructor($$);
      }
    };
  
  var downcastPointer = (ptr, ptrClass, desiredClass) => {
      if (ptrClass === desiredClass) {
        return ptr;
      }
      if (undefined === desiredClass.baseClass) {
        return null; // no conversion
      }
  
      var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
      if (rv === null) {
        return null;
      }
      return desiredClass.downcast(rv);
    };
  
  var registeredPointers = {
  };
  
  var getInheritedInstanceCount = () => {
      return Object.keys(registeredInstances).length;
    };
  
  var getLiveInheritedInstances = () => {
      var rv = [];
      for (var k in registeredInstances) {
        if (registeredInstances.hasOwnProperty(k)) {
          rv.push(registeredInstances[k]);
        }
      }
      return rv;
    };
  
  var deletionQueue = [];
  var flushPendingDeletes = () => {
      while (deletionQueue.length) {
        var obj = deletionQueue.pop();
        obj.$$.deleteScheduled = false;
        obj['delete']();
      }
    };
  
  var delayFunction = undefined;
  
  
  var setDelayFunction = (fn) => {
      delayFunction = fn;
      if (deletionQueue.length && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
    };
  var init_embind = () => {
      Module['getInheritedInstanceCount'] = getInheritedInstanceCount;
      Module['getLiveInheritedInstances'] = getLiveInheritedInstances;
      Module['flushPendingDeletes'] = flushPendingDeletes;
      Module['setDelayFunction'] = setDelayFunction;
    };
  var registeredInstances = {
  };
  
  var getBasestPointer = (class_, ptr) => {
      if (ptr === undefined) {
          throwBindingError('ptr should not be undefined');
      }
      while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
      }
      return ptr;
    };
  var getInheritedInstance = (class_, ptr) => {
      ptr = getBasestPointer(class_, ptr);
      return registeredInstances[ptr];
    };
  
  
  var makeClassHandle = (prototype, record) => {
      if (!record.ptrType || !record.ptr) {
        throwInternalError('makeClassHandle requires ptr and ptrType');
      }
      var hasSmartPtrType = !!record.smartPtrType;
      var hasSmartPtr = !!record.smartPtr;
      if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError('Both smartPtrType and smartPtr must be specified');
      }
      record.count = { value: 1 };
      return attachFinalizer(Object.create(prototype, {
        $$: {
            value: record,
        },
      }));
    };
  function RegisteredPointer_fromWireType(ptr) {
      // ptr is a raw pointer (or a raw smartpointer)
  
      // rawPointer is a maybe-null raw pointer
      var rawPointer = this.getPointee(ptr);
      if (!rawPointer) {
        this.destructor(ptr);
        return null;
      }
  
      var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
      if (undefined !== registeredInstance) {
        // JS object has been neutered, time to repopulate it
        if (0 === registeredInstance.$$.count.value) {
          registeredInstance.$$.ptr = rawPointer;
          registeredInstance.$$.smartPtr = ptr;
          return registeredInstance['clone']();
        } else {
          // else, just increment reference count on existing object
          // it already has a reference to the smart pointer
          var rv = registeredInstance['clone']();
          this.destructor(ptr);
          return rv;
        }
      }
  
      function makeDefaultHandle() {
        if (this.isSmartPointer) {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this.pointeeType,
            ptr: rawPointer,
            smartPtrType: this,
            smartPtr: ptr,
          });
        } else {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this,
            ptr,
          });
        }
      }
  
      var actualType = this.registeredClass.getActualType(rawPointer);
      var registeredPointerRecord = registeredPointers[actualType];
      if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this);
      }
  
      var toType;
      if (this.isConst) {
        toType = registeredPointerRecord.constPointerType;
      } else {
        toType = registeredPointerRecord.pointerType;
      }
      var dp = downcastPointer(
          rawPointer,
          this.registeredClass,
          toType.registeredClass);
      if (dp === null) {
        return makeDefaultHandle.call(this);
      }
      if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
          smartPtrType: this,
          smartPtr: ptr,
        });
      } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
        });
      }
    }
  var attachFinalizer = (handle) => {
      if ('undefined' === typeof FinalizationRegistry) {
        attachFinalizer = (handle) => handle;
        return handle;
      }
      // If the running environment has a FinalizationRegistry (see
      // https://github.com/tc39/proposal-weakrefs), then attach finalizers
      // for class handles.  We check for the presence of FinalizationRegistry
      // at run-time, not build-time.
      finalizationRegistry = new FinalizationRegistry((info) => {
        console.warn(info.leakWarning.stack.replace(/^Error: /, ''));
        releaseClassHandle(info.$$);
      });
      attachFinalizer = (handle) => {
        var $$ = handle.$$;
        var hasSmartPtr = !!$$.smartPtr;
        if (hasSmartPtr) {
          // We should not call the destructor on raw pointers in case other code expects the pointee to live
          var info = { $$: $$ };
          // Create a warning as an Error instance in advance so that we can store
          // the current stacktrace and point to it when / if a leak is detected.
          // This is more useful than the empty stacktrace of `FinalizationRegistry`
          // callback.
          var cls = $$.ptrType.registeredClass;
          info.leakWarning = new Error(`Embind found a leaked C++ instance ${cls.name} <${ptrToString($$.ptr)}>.\n` +
          "We'll free it automatically in this case, but this functionality is not reliable across various environments.\n" +
          "Make sure to invoke .delete() manually once you're done with the instance instead.\n" +
          "Originally allocated"); // `.stack` will add "at ..." after this sentence
          if ('captureStackTrace' in Error) {
            Error.captureStackTrace(info.leakWarning, RegisteredPointer_fromWireType);
          }
          finalizationRegistry.register(handle, info, handle);
        }
        return handle;
      };
      detachFinalizer = (handle) => finalizationRegistry.unregister(handle);
      return attachFinalizer(handle);
    };
  function ClassHandle_clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
  
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
          $$: {
            value: shallowCopyInternalPointer(this.$$),
          }
        }));
  
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    }
  
  
  
  
  function ClassHandle_delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
  
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }
  
      detachFinalizer(this);
      releaseClassHandle(this.$$);
  
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined;
        this.$$.ptr = undefined;
      }
    }
  
  function ClassHandle_isDeleted() {
      return !this.$$.ptr;
    }
  
  
  
  function ClassHandle_deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }
      deletionQueue.push(this);
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
      this.$$.deleteScheduled = true;
      return this;
    }
  var init_ClassHandle = () => {
      ClassHandle.prototype['isAliasOf'] = ClassHandle_isAliasOf;
      ClassHandle.prototype['clone'] = ClassHandle_clone;
      ClassHandle.prototype['delete'] = ClassHandle_delete;
      ClassHandle.prototype['isDeleted'] = ClassHandle_isDeleted;
      ClassHandle.prototype['deleteLater'] = ClassHandle_deleteLater;
    };
  /** @constructor */
  function ClassHandle() {
    }
  
  var char_0 = 48;
  
  var char_9 = 57;
  var makeLegalFunctionName = (name) => {
      if (undefined === name) {
        return '_unknown';
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
        return `_${name}`;
      }
      return name;
    };
  function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      // Use an abject with a computed property name to create a new function with
      // a name specified at runtime, but without using `new Function` or `eval`.
      return {
        [name]: function() {
          return body.apply(this, arguments);
        }
      }[name];
    }
  
  
  var ensureOverloadTable = (proto, methodName, humanName) => {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.
        proto[methodName] = function() {
          // TODO This check can be removed in -O3 level "unsafe" optimizations.
          if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${arguments.length}) - expects one of (${proto[methodName].overloadTable})!`);
          }
          return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
        };
        // Move the previous function into the overload table.
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    };
  
  /** @param {number=} numArguments */
  var exposePublicSymbol = (name, value, numArguments) => {
      if (Module.hasOwnProperty(name)) {
        if (undefined === numArguments || (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])) {
          throwBindingError(`Cannot register public name '${name}' twice`);
        }
  
        // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
        // that routes between the two.
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
        }
        // Add the new function into the overload table.
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    };
  
  
  
  /** @constructor */
  function RegisteredClass(name,
                               constructor,
                               instancePrototype,
                               rawDestructor,
                               baseClass,
                               getActualType,
                               upcast,
                               downcast) {
      this.name = name;
      this.constructor = constructor;
      this.instancePrototype = instancePrototype;
      this.rawDestructor = rawDestructor;
      this.baseClass = baseClass;
      this.getActualType = getActualType;
      this.upcast = upcast;
      this.downcast = downcast;
      this.pureVirtualFunctions = [];
    }
  
  
  var upcastPointer = (ptr, ptrClass, desiredClass) => {
      while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
          throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
        }
        ptr = ptrClass.upcast(ptr);
        ptrClass = ptrClass.baseClass;
      }
      return ptr;
    };
  function constNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
        return 0;
      }
  
      if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
  
  
  function genericPointerToWireType(destructors, handle) {
      var ptr;
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
  
        if (this.isSmartPointer) {
          ptr = this.rawConstructor();
          if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr);
          }
          return ptr;
        } else {
          return 0;
        }
      }
  
      if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError(`Cannot convert argument of type ${(handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name)} to parameter type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
  
      if (this.isSmartPointer) {
        // TODO: this is not strictly true
        // We could support BY_EMVAL conversions from raw pointers to smart pointers
        // because the smart pointer can hold a reference to the handle
        if (undefined === handle.$$.smartPtr) {
          throwBindingError('Passing raw pointer to smart pointer is illegal');
        }
  
        switch (this.sharingPolicy) {
          case 0: // NONE
            // no upcasting
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              throwBindingError(`Cannot convert argument of type ${(handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name)} to parameter type ${this.name}`);
            }
            break;
  
          case 1: // INTRUSIVE
            ptr = handle.$$.smartPtr;
            break;
  
          case 2: // BY_EMVAL
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              var clonedHandle = handle['clone']();
              ptr = this.rawShare(
                ptr,
                Emval.toHandle(() => clonedHandle['delete']())
              );
              if (destructors !== null) {
                destructors.push(this.rawDestructor, ptr);
              }
            }
            break;
  
          default:
            throwBindingError('Unsupporting sharing policy');
        }
      }
      return ptr;
    }
  
  
  function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
        return 0;
      }
  
      if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      if (handle.$$.ptrType.isConst) {
          throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
  
  function readPointer(pointer) {
      return this['fromWireType'](HEAPU32[((pointer)>>2)]);
    }
  
  function RegisteredPointer_getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }
      return ptr;
    }
  
  function RegisteredPointer_destructor(ptr) {
      if (this.rawDestructor) {
        this.rawDestructor(ptr);
      }
    }
  
  var RegisteredPointer_deleteObject = (handle) => {
      if (handle !== null) {
        handle['delete']();
      }
    };
  
  var init_RegisteredPointer = () => {
      RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
      RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
      RegisteredPointer.prototype['argPackAdvance'] = GenericWireTypeSize;
      RegisteredPointer.prototype['readValueFromPointer'] = readPointer;
      RegisteredPointer.prototype['deleteObject'] = RegisteredPointer_deleteObject;
      RegisteredPointer.prototype['fromWireType'] = RegisteredPointer_fromWireType;
    };
  /** @constructor
      @param {*=} pointeeType,
      @param {*=} sharingPolicy,
      @param {*=} rawGetPointee,
      @param {*=} rawConstructor,
      @param {*=} rawShare,
      @param {*=} rawDestructor,
       */
  function RegisteredPointer(
      name,
      registeredClass,
      isReference,
      isConst,
  
      // smart pointer properties
      isSmartPointer,
      pointeeType,
      sharingPolicy,
      rawGetPointee,
      rawConstructor,
      rawShare,
      rawDestructor
    ) {
      this.name = name;
      this.registeredClass = registeredClass;
      this.isReference = isReference;
      this.isConst = isConst;
  
      // smart pointer properties
      this.isSmartPointer = isSmartPointer;
      this.pointeeType = pointeeType;
      this.sharingPolicy = sharingPolicy;
      this.rawGetPointee = rawGetPointee;
      this.rawConstructor = rawConstructor;
      this.rawShare = rawShare;
      this.rawDestructor = rawDestructor;
  
      if (!isSmartPointer && registeredClass.baseClass === undefined) {
        if (isConst) {
          this['toWireType'] = constNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        } else {
          this['toWireType'] = nonConstNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        }
      } else {
        this['toWireType'] = genericPointerToWireType;
        // Here we must leave this.destructorFunction undefined, since whether genericPointerToWireType returns
        // a pointer that needs to be freed up is runtime-dependent, and cannot be evaluated at registration time.
        // TODO: Create an alternative mechanism that allows removing the use of var destructors = []; array in
        //       craftInvokerFunction altogether.
      }
    }
  
  /** @param {number=} numArguments */
  var replacePublicSymbol = (name, value, numArguments) => {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistant public symbol');
      }
      // If there's an overload table for this symbol, replace the symbol in the overload table instead.
      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
  
  
  
  var dynCallLegacy = (sig, ptr, args) => {
      assert(('dynCall_' + sig) in Module, `bad function pointer type - dynCall function not found for sig '${sig}'`);
      if (args && args.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module['dynCall_' + sig];
      return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
    };
  
  var wasmTableMirror = [];
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
      return func;
    };
  
  /** @param {Object=} args */
  var dynCall = (sig, ptr, args) => {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of thier signature, so we rely the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
      var rtn = getWasmTableEntry(ptr).apply(null, args);
      return rtn;
    };
  var getDynCaller = (sig, ptr) => {
      assert(sig.includes('j') || sig.includes('p'), 'getDynCaller should only be called with i64 sigs')
      var argCache = [];
      return function() {
        argCache.length = 0;
        Object.assign(argCache, arguments);
        return dynCall(sig, ptr, argCache);
      };
    };
  
  
  var embind__requireFunction = (signature, rawFunction) => {
      signature = readLatin1String(signature);
  
      function makeDynCaller() {
        if (signature.includes('j')) {
          return getDynCaller(signature, rawFunction);
        }
        return getWasmTableEntry(rawFunction);
      }
  
      var fp = makeDynCaller();
      if (typeof fp != "function") {
          throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
      }
      return fp;
    };
  
  
  
  var extendError = (baseErrorType, errorName) => {
      var errorClass = createNamedFunction(errorName, function(message) {
        this.name = errorName;
        this.message = message;
  
        var stack = (new Error(message)).stack;
        if (stack !== undefined) {
          this.stack = this.toString() + '\n' +
              stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
        if (this.message === undefined) {
          return this.name;
        } else {
          return `${this.name}: ${this.message}`;
        }
      };
  
      return errorClass;
    };
  var UnboundTypeError = undefined;
  
  
  
  var getTypeName = (type) => {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    };
  var throwUnboundTypeError = (message, types) => {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
  
      throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([', ']));
    };
  
  var __embind_register_class = (rawType,
                             rawPointerType,
                             rawConstPointerType,
                             baseClassRawType,
                             getActualTypeSignature,
                             getActualType,
                             upcastSignature,
                             upcast,
                             downcastSignature,
                             downcast,
                             name,
                             destructorSignature,
                             rawDestructor) => {
      name = readLatin1String(name);
      getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
      if (upcast) {
        upcast = embind__requireFunction(upcastSignature, upcast);
      }
      if (downcast) {
        downcast = embind__requireFunction(downcastSignature, downcast);
      }
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
      var legalFunctionName = makeLegalFunctionName(name);
  
      exposePublicSymbol(legalFunctionName, function() {
        // this code cannot run if baseClassRawType is zero
        throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [baseClassRawType]);
      });
  
      whenDependentTypesAreResolved(
        [rawType, rawPointerType, rawConstPointerType],
        baseClassRawType ? [baseClassRawType] : [],
        function(base) {
          base = base[0];
  
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
  
          var constructor = createNamedFunction(legalFunctionName, function() {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name);
            }
            if (undefined === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor");
            }
            var body = registeredClass.constructor_body[arguments.length];
            if (undefined === body) {
              throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
            }
            return body.apply(this, arguments);
          });
  
          var instancePrototype = Object.create(basePrototype, {
            constructor: { value: constructor },
          });
  
          constructor.prototype = instancePrototype;
  
          var registeredClass = new RegisteredClass(name,
                                                    constructor,
                                                    instancePrototype,
                                                    rawDestructor,
                                                    baseClass,
                                                    getActualType,
                                                    upcast,
                                                    downcast);
  
          if (registeredClass.baseClass) {
            // Keep track of class hierarchy. Used to allow sub-classes to inherit class functions.
            if (registeredClass.baseClass.__derivedClasses === undefined) {
              registeredClass.baseClass.__derivedClasses = [];
            }
  
            registeredClass.baseClass.__derivedClasses.push(registeredClass);
          }
  
          var referenceConverter = new RegisteredPointer(name,
                                                         registeredClass,
                                                         true,
                                                         false,
                                                         false);
  
          var pointerConverter = new RegisteredPointer(name + '*',
                                                       registeredClass,
                                                       false,
                                                       false,
                                                       false);
  
          var constPointerConverter = new RegisteredPointer(name + ' const*',
                                                            registeredClass,
                                                            false,
                                                            true,
                                                            false);
  
          registeredPointers[rawType] = {
            pointerType: pointerConverter,
            constPointerType: constPointerConverter
          };
  
          replacePublicSymbol(legalFunctionName, constructor);
  
          return [referenceConverter, pointerConverter, constPointerConverter];
        }
      );
    };

  
  var runDestructors = (destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    };
  
  
  function newFunc(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
        throw new TypeError(`new_ called with constructor type ${typeof(constructor)} which is not a function`);
      }
      /*
       * Previously, the following line was just:
       *   function dummy() {};
       * Unfortunately, Chrome was preserving 'dummy' as the object's name, even
       * though at creation, the 'dummy' has the correct constructor name.  Thus,
       * objects created with IMVU.new would show up in the debugger as 'dummy',
       * which isn't very helpful.  Using IMVU.createNamedFunction addresses the
       * issue.  Doublely-unfortunately, there's no way to write a test for this
       * behavior.  -NRD 2013.02.22
       */
      var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function(){});
      dummy.prototype = constructor.prototype;
      var obj = new dummy;
  
      var r = constructor.apply(obj, argumentList);
      return (r instanceof Object) ? r : obj;
    }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, /** boolean= */ isAsync) {
      // humanName: a human-readable string name for the function to be generated.
      // argTypes: An array that contains the embind type objects for all types in the function signature.
      //    argTypes[0] is the type object for the function return value.
      //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
      //    argTypes[2...] are the actual function parameters.
      // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
      // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
      // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
      // isAsync: Optional. If true, returns an async function. Async bindings are only supported with JSPI.
      var argCount = argTypes.length;
  
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
  
      assert(!isAsync, 'Async bindings are only supported with JSPI.');
  
      var isClassMethodFunc = (argTypes[1] !== null && classType !== null);
  
      // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
  // TODO: This omits argument count check - enable only at -O3 or similar.
  //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
  //       return FUNCTION_TABLE[fn];
  //    }
  
      // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
      // TODO: Remove this completely once all function invokers are being dynamically generated.
      var needsDestructorStack = false;
  
      for (var i = 1; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here.
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) { // The type does not define a destructor function - must use dynamic stack
          needsDestructorStack = true;
          break;
        }
      }
  
      var returns = (argTypes[0].name !== "void");
  
      var argsList = "";
      var argsListWired = "";
      for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i!==0?", ":"")+"arg"+i;
        argsListWired += (i!==0?", ":"")+"arg"+i+"Wired";
      }
  
      var invokerFnBody = `
        return function ${makeLegalFunctionName(humanName)}(${argsList}) {
        if (arguments.length !== ${argCount - 2}) {
          throwBindingError('function ${humanName} called with ' + arguments.length + ' arguments, expected ${argCount - 2}');
        }`;
  
      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }
  
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
      var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
  
      if (isClassMethodFunc) {
        invokerFnBody += "var thisWired = classParam.toWireType("+dtorStack+", this);\n";
      }
  
      for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody += "var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";
        args1.push("argType"+i);
        args2.push(argTypes[i+2]);
      }
  
      if (isClassMethodFunc) {
        argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
      }
  
      invokerFnBody +=
          (returns || isAsync ? "var rv = ":"") + "invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";
  
      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i = isClassMethodFunc?1:2; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
          var paramName = (i === 1 ? "thisWired" : ("arg"+(i - 2)+"Wired"));
          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";
            args1.push(paramName+"_dtor");
            args2.push(argTypes[i].destructorFunction);
          }
        }
      }
  
      if (returns) {
        invokerFnBody += "var ret = retType.fromWireType(rv);\n" +
                         "return ret;\n";
      } else {
      }
  
      invokerFnBody += "}\n";
  
      args1.push(invokerFnBody);
  
      return newFunc(Function, args1).apply(null, args2);
    }
  
  
  var heap32VectorToArray = (count, firstElement) => {
      var array = [];
      for (var i = 0; i < count; i++) {
          // TODO(https://github.com/emscripten-core/emscripten/issues/17310):
          // Find a way to hoist the `>> 2` or `>> 3` out of this loop.
          array.push(HEAPU32[(((firstElement)+(i * 4))>>2)]);
      }
      return array;
    };
  
  
  
  
  var __embind_register_class_class_function = (rawClassType,
                                            methodName,
                                            argCount,
                                            rawArgTypesAddr,
                                            invokerSignature,
                                            rawInvoker,
                                            fn,
                                            isAsync) => {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = readLatin1String(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
      whenDependentTypesAreResolved([], [rawClassType], function(classType) {
        classType = classType[0];
        var humanName = `${classType.name}.${methodName}`;
  
        function unboundTypesHandler() {
          throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
        }
  
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
  
        var proto = classType.registeredClass.constructor;
        if (undefined === proto[methodName]) {
          // This is the first function to be registered with this name.
          unboundTypesHandler.argCount = argCount-1;
          proto[methodName] = unboundTypesHandler;
        } else {
          // There was an existing function with the same name registered. Set up
          // a function overload routing table.
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount-1] = unboundTypesHandler;
        }
  
        whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
          // Replace the initial unbound-types-handler stub with the proper
          // function. If multiple overloads are registered, the function handlers
          // go into an overload table.
          var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
          var func = craftInvokerFunction(humanName, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn, isAsync);
          if (undefined === proto[methodName].overloadTable) {
            func.argCount = argCount-1;
            proto[methodName] = func;
          } else {
            proto[methodName].overloadTable[argCount-1] = func;
          }
  
          if (classType.registeredClass.__derivedClasses) {
            for (const derivedClass of classType.registeredClass.__derivedClasses) {
              if (!derivedClass.constructor.hasOwnProperty(methodName)) {
                // TODO: Add support for overloads
                derivedClass.constructor[methodName] = func;
              }
            }
          }
  
          return [];
        });
        return [];
      });
    };

  
  
  
  
  
  var __embind_register_class_function = (rawClassType,
                                      methodName,
                                      argCount,
                                      rawArgTypesAddr, // [ReturnType, ThisType, Args...]
                                      invokerSignature,
                                      rawInvoker,
                                      context,
                                      isPureVirtual,
                                      isAsync) => {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = readLatin1String(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
  
      whenDependentTypesAreResolved([], [rawClassType], function(classType) {
        classType = classType[0];
        var humanName = `${classType.name}.${methodName}`;
  
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
  
        if (isPureVirtual) {
          classType.registeredClass.pureVirtualFunctions.push(methodName);
        }
  
        function unboundTypesHandler() {
          throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
        }
  
        var proto = classType.registeredClass.instancePrototype;
        var method = proto[methodName];
        if (undefined === method || (undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2)) {
          // This is the first overload to be registered, OR we are replacing a
          // function in the base class with a function in the derived class.
          unboundTypesHandler.argCount = argCount - 2;
          unboundTypesHandler.className = classType.name;
          proto[methodName] = unboundTypesHandler;
        } else {
          // There was an existing function with the same name registered. Set up
          // a function overload routing table.
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
        }
  
        whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
          var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
  
          // Replace the initial unbound-handler-stub function with the appropriate member function, now that all types
          // are resolved. If multiple overloads are registered for this function, the function goes into an overload table.
          if (undefined === proto[methodName].overloadTable) {
            // Set argCount in case an overload is registered later
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction;
          } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction;
          }
  
          return [];
        });
        return [];
      });
    };

  function handleAllocatorInit() {
      Object.assign(HandleAllocator.prototype, /** @lends {HandleAllocator.prototype} */ {
        get(id) {
          assert(this.allocated[id] !== undefined, `invalid handle: ${id}`);
          return this.allocated[id];
        },
        has(id) {
          return this.allocated[id] !== undefined;
        },
        allocate(handle) {
          var id = this.freelist.pop() || this.allocated.length;
          this.allocated[id] = handle;
          return id;
        },
        free(id) {
          assert(this.allocated[id] !== undefined);
          // Set the slot to `undefined` rather than using `delete` here since
          // apparently arrays with holes in them can be less efficient.
          this.allocated[id] = undefined;
          this.freelist.push(id);
        }
      });
    }
  /** @constructor */
  function HandleAllocator() {
      // Reserve slot 0 so that 0 is always an invalid handle
      this.allocated = [undefined];
      this.freelist = [];
    }
  var emval_handles = new HandleAllocator();;
  var __emval_decref = (handle) => {
      if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
        emval_handles.free(handle);
      }
    };
  
  
  
  var count_emval_handles = () => {
      var count = 0;
      for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
        if (emval_handles.allocated[i] !== undefined) {
          ++count;
        }
      }
      return count;
    };
  
  var init_emval = () => {
      // reserve some special values. These never get de-allocated.
      // The HandleAllocator takes care of reserving zero.
      emval_handles.allocated.push(
        {value: undefined},
        {value: null},
        {value: true},
        {value: false},
      );
      emval_handles.reserved = emval_handles.allocated.length
      Module['count_emval_handles'] = count_emval_handles;
    };
  var Emval = {
  toValue:(handle) => {
        if (!handle) {
            throwBindingError('Cannot use deleted val. handle = ' + handle);
        }
        return emval_handles.get(handle).value;
      },
  toHandle:(value) => {
        switch (value) {
          case undefined: return 1;
          case null: return 2;
          case true: return 3;
          case false: return 4;
          default:{
            return emval_handles.allocate({refcount: 1, value: value});
          }
        }
      },
  };
  
  
  
  function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAP32[((pointer)>>2)]);
    }
  var __embind_register_emval = (rawType, name) => {
      name = readLatin1String(name);
      registerType(rawType, {
        name,
        'fromWireType': (handle) => {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        },
        'toWireType': (destructors, value) => Emval.toHandle(value),
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: null, // This type does not need a destructor
  
        // TODO: do we need a deleteObject here?  write a test where
        // emval is passed into JS via an interface
      });
    };

  var embindRepr = (v) => {
      if (v === null) {
          return 'null';
      }
      var t = typeof v;
      if (t === 'object' || t === 'array' || t === 'function') {
          return v.toString();
      } else {
          return '' + v;
      }
    };
  
  var floatReadValueFromPointer = (name, width) => {
      switch (width) {
          case 4: return function(pointer) {
              return this['fromWireType'](HEAPF32[((pointer)>>2)]);
          };
          case 8: return function(pointer) {
              return this['fromWireType'](HEAPF64[((pointer)>>3)]);
          };
          default:
              throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
  
  
  var __embind_register_float = (rawType, name, size) => {
      name = readLatin1String(name);
      registerType(rawType, {
        name,
        'fromWireType': (value) => value,
        'toWireType': (destructors, value) => {
          if (typeof value != "number" && typeof value != "boolean") {
            throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`);
          }
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': floatReadValueFromPointer(name, size),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  
  
  
  
  
  
  var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) => {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
  
      rawInvoker = embind__requireFunction(signature, rawInvoker);
  
      exposePublicSymbol(name, function() {
        throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
      }, argCount - 1);
  
      whenDependentTypesAreResolved([], argTypes, function(argTypes) {
        var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn, isAsync), argCount - 1);
        return [];
      });
    };

  
  var integerReadValueFromPointer = (name, width, signed) => {
      // integers are quite common, so generate very specialized functions
      switch (width) {
          case 1: return signed ?
              (pointer) => HEAP8[((pointer)>>0)] :
              (pointer) => HEAPU8[((pointer)>>0)];
          case 2: return signed ?
              (pointer) => HEAP16[((pointer)>>1)] :
              (pointer) => HEAPU16[((pointer)>>1)]
          case 4: return signed ?
              (pointer) => HEAP32[((pointer)>>2)] :
              (pointer) => HEAPU32[((pointer)>>2)]
          default:
              throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
  
  
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
      name = readLatin1String(name);
      // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come
      // out as 'i32 -1'. Always treat those as max u32.
      if (maxRange === -1) {
        maxRange = 4294967295;
      }
  
      var fromWireType = (value) => value;
  
      if (minRange === 0) {
        var bitshift = 32 - 8*size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
      }
  
      var isUnsignedType = (name.includes('unsigned'));
      var checkAssertions = (value, toTypeName) => {
        if (typeof value != "number" && typeof value != "boolean") {
          throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`);
        }
        if (value < minRange || value > maxRange) {
          throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
        }
      }
      var toWireType;
      if (isUnsignedType) {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        }
      } else {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        }
      }
      registerType(primitiveType, {
        name,
        'fromWireType': fromWireType,
        'toWireType': toWireType,
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': integerReadValueFromPointer(name, size, minRange !== 0),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
        var size = HEAPU32[((handle)>>2)];
        var data = HEAPU32[(((handle)+(4))>>2)];
        return new TA(HEAP8.buffer, data, size);
      }
  
      name = readLatin1String(name);
      registerType(rawType, {
        name,
        'fromWireType': decodeMemoryView,
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': decodeMemoryView,
      }, {
        ignoreDuplicateRegistrations: true,
      });
    };

  
  
  var __embind_register_smart_ptr = (rawType,
                                 rawPointeeType,
                                 name,
                                 sharingPolicy,
                                 getPointeeSignature,
                                 rawGetPointee,
                                 constructorSignature,
                                 rawConstructor,
                                 shareSignature,
                                 rawShare,
                                 destructorSignature,
                                 rawDestructor) => {
      name = readLatin1String(name);
      rawGetPointee = embind__requireFunction(getPointeeSignature, rawGetPointee);
      rawConstructor = embind__requireFunction(constructorSignature, rawConstructor);
      rawShare = embind__requireFunction(shareSignature, rawShare);
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
  
      whenDependentTypesAreResolved([rawType], [rawPointeeType], function(pointeeType) {
        pointeeType = pointeeType[0];
  
        var registeredPointer = new RegisteredPointer(name,
                                                      pointeeType.registeredClass,
                                                      false,
                                                      false,
                                                      // smart pointer properties
                                                      true,
                                                      pointeeType,
                                                      sharingPolicy,
                                                      rawGetPointee,
                                                      rawConstructor,
                                                      rawShare,
                                                      rawDestructor);
        return [registeredPointer];
      });
    };

  
  
  
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string');
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  
  
  var __embind_register_std_string = (rawType, name) => {
      name = readLatin1String(name);
      var stdStringIsUTF8
      //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = (name === "std::string");
  
      registerType(rawType, {
        name,
        'fromWireType': (value) => {
          var length = HEAPU32[((value)>>2)];
          var payload = value + 4;
  
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            // Looping here to support possible embedded '0' bytes
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i]);
            }
            str = a.join('');
          }
  
          _free(value);
  
          return str;
        },
        'toWireType': (destructors, value) => {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
  
          var length;
          var valueIsOfTypeString = (typeof value == 'string');
  
          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError('Cannot pass non-string to std::string');
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
  
          // assumes 4-byte alignment
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[((base)>>2)] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }
                HEAPU8[ptr + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i];
              }
            }
          }
  
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': readPointer,
        destructorFunction: (ptr) => _free(ptr),
      });
    };

  
  
  
  var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined;;
  var UTF16ToString = (ptr, maxBytesToRead) => {
      assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
      var endPtr = ptr;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // Also, use the length info to avoid running tiny strings through
      // TextDecoder, since .subarray() allocates garbage.
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
  
      if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  
      // Fallback: decode without UTF16Decoder
      var str = '';
  
      // If maxBytesToRead is not passed explicitly, it will be undefined, and the
      // for-loop's condition will always evaluate to true. The loop is then
      // terminated on the first null char.
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
        if (codeUnit == 0) break;
        // fromCharCode constructs a character from a UTF-16 code unit, so we can
        // pass the UTF16 string right through.
        str += String.fromCharCode(codeUnit);
      }
  
      return str;
    };
  
  var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2; // Null terminator.
      var startPtr = outPtr;
      var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        HEAP16[((outPtr)>>1)] = codeUnit;
        outPtr += 2;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP16[((outPtr)>>1)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF16 = (str) => {
      return str.length*2;
    };
  
  var UTF32ToString = (ptr, maxBytesToRead) => {
      assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
      var i = 0;
  
      var str = '';
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
        if (utf32 == 0) break;
        ++i;
        // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        if (utf32 >= 0x10000) {
          var ch = utf32 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    };
  
  var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
        }
        HEAP32[((outPtr)>>2)] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP32[((outPtr)>>2)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
        len += 4;
      }
  
      return len;
    };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1;
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2;
      }
      registerType(rawType, {
        name,
        'fromWireType': (value) => {
          // Code mostly taken from _embind_register_std_string fromWireType
          var length = HEAPU32[((value)>>2)];
          var HEAP = getHeap();
          var str;
  
          var decodeStartPtr = value + 4;
          // Looping here to support possible embedded '0' bytes
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
  
          _free(value);
  
          return str;
        },
        'toWireType': (destructors, value) => {
          if (!(typeof value == 'string')) {
            throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
          }
  
          // assumes 4-byte alignment
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length >> shift;
  
          encodeString(value, ptr + 4, length + charSize);
  
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: (ptr) => _free(ptr),
      });
    };

  
  var __embind_register_void = (rawType, name) => {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true, // void return values can be optimized out sometimes
        name,
        'argPackAdvance': 0,
        'fromWireType': () => undefined,
        // TODO: assert if anything else is given?
        'toWireType': (destructors, o) => undefined,
      });
    };

  
  
  var requireRegisteredType = (rawType, humanName) => {
      var impl = registeredTypes[rawType];
      if (undefined === impl) {
          throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
      }
      return impl;
    };
  var emval_lookupTypes = (argCount, argTypes) => {
      var a = new Array(argCount);
      for (var i = 0; i < argCount; ++i) {
        a[i] = requireRegisteredType(HEAPU32[(((argTypes)+(i * 4))>>2)],
                                     "parameter " + i);
      }
      return a;
    };
  
  var __emval_call = (handle, argCount, argTypes, argv) => {
      handle = Emval.toValue(handle);
      var types = emval_lookupTypes(argCount, argTypes);
  
      var args = new Array(argCount);
      for (var i = 0; i < argCount; ++i) {
        var type = types[i];
        args[i] = type['readValueFromPointer'](argv);
        argv += type['argPackAdvance'];
      }
  
      var rv = handle.apply(undefined, args);
      return Emval.toHandle(rv);
    };

  var emval_allocateDestructors = (destructorsRef) => {
      var destructors = [];
      HEAPU32[((destructorsRef)>>2)] = Emval.toHandle(destructors);
      return destructors;
    };
  
  var emval_symbols = {
  };
  
  var getStringOrSymbol = (address) => {
      var symbol = emval_symbols[address];
      if (symbol === undefined) {
        return readLatin1String(address);
      }
      return symbol;
    };
  
  var emval_methodCallers = [];
  
  var __emval_call_void_method = (caller, handle, methodName, args) => {
      caller = emval_methodCallers[caller];
      handle = Emval.toValue(handle);
      methodName = getStringOrSymbol(methodName);
      caller(handle, methodName, null, args);
    };


  
  
  var emval_get_global = () => {
      if (typeof globalThis == 'object') {
        return globalThis;
      }
      return (function(){
        return Function;
      })()('return this')();
    };
  var __emval_get_global = (name) => {
      if (name===0) {
        return Emval.toHandle(emval_get_global());
      } else {
        name = getStringOrSymbol(name);
        return Emval.toHandle(emval_get_global()[name]);
      }
    };

  var emval_addMethodCaller = (caller) => {
      var id = emval_methodCallers.length;
      emval_methodCallers.push(caller);
      return id;
    };
  
  
  
  var emval_registeredMethods = [];
  
  var __emval_get_method_caller = (argCount, argTypes) => {
      var types = emval_lookupTypes(argCount, argTypes);
      var retType = types[0];
      var signatureName = retType.name + "_$" + types.slice(1).map(function (t) { return t.name; }).join("_") + "$";
      var returnId = emval_registeredMethods[signatureName];
      if (returnId !== undefined) {
        return returnId;
      }
  
      var params = ["retType"];
      var args = [retType];
  
      var argsList = ""; // 'arg0, arg1, arg2, ... , argN'
      for (var i = 0; i < argCount - 1; ++i) {
        argsList += (i !== 0 ? ", " : "") + "arg" + i;
        params.push("argType" + i);
        args.push(types[1 + i]);
      }
  
      var functionName = makeLegalFunctionName("methodCaller_" + signatureName);
      var functionBody =
          "return function " + functionName + "(handle, name, destructors, args) {\n";
  
      var offset = 0;
      for (var i = 0; i < argCount - 1; ++i) {
          functionBody +=
          "    var arg" + i + " = argType" + i + ".readValueFromPointer(args" + (offset ? ("+"+offset) : "") + ");\n";
          offset += types[i + 1]['argPackAdvance'];
      }
      functionBody +=
          "    var rv = handle[name](" + argsList + ");\n";
      for (var i = 0; i < argCount - 1; ++i) {
          if (types[i + 1]['deleteObject']) {
              functionBody +=
              "    argType" + i + ".deleteObject(arg" + i + ");\n";
          }
      }
      if (!retType.isVoid) {
          functionBody +=
          "    return retType.toWireType(destructors, rv);\n";
      }
      functionBody +=
          "};\n";
  
      params.push(functionBody);
      var invokerFunction = newFunc(Function, params).apply(null, args);
      returnId = emval_addMethodCaller(invokerFunction);
      emval_registeredMethods[signatureName] = returnId;
      return returnId;
    };

  
  var __emval_get_module_property = (name) => {
      name = getStringOrSymbol(name);
      return Emval.toHandle(Module[name]);
    };

  var __emval_get_property = (handle, key) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      return Emval.toHandle(handle[key]);
    };

  var __emval_incref = (handle) => {
      if (handle > 4) {
        emval_handles.get(handle).refcount += 1;
      }
    };

  
  var craftEmvalAllocator = (argCount) => {
      /*This function returns a new function that looks like this:
      function emval_allocator_3(constructor, argTypes, args) {
          var argType0 = requireRegisteredType(HEAP32[(argTypes >> 2)], "parameter 0");
          var arg0 = argType0['readValueFromPointer'](args);
          var argType1 = requireRegisteredType(HEAP32[(argTypes >> 2) + 1], "parameter 1");
          var arg1 = argType1['readValueFromPointer'](args + 8);
          var argType2 = requireRegisteredType(HEAP32[(argTypes >> 2) + 2], "parameter 2");
          var arg2 = argType2['readValueFromPointer'](args + 16);
          var obj = new constructor(arg0, arg1, arg2);
          return Emval.toHandle(obj);
      } */
      var argsList = "";
      for (var i = 0; i < argCount; ++i) {
        argsList += (i!==0?", ":"")+"arg"+i; // 'arg0, arg1, ..., argn'
      }
  
      // The body of the generated function does not have access to enclosing
      // scope where HEAPU64/HEAPU32/etc are defined, and we cannot pass them
      // directly as arguments (like we do the Module object) since memory
      // growth can cause them to be re-bound.
      var getMemory = () => HEAPU32;
  
      var functionBody =
          "return function emval_allocator_"+argCount+"(constructor, argTypes, args) {\n" +
          "  var HEAPU32 = getMemory();\n";
  
      for (var i = 0; i < argCount; ++i) {
          functionBody +=
              "var argType"+i+" = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter "+i+"');\n" +
              "var arg"+i+" = argType"+i+".readValueFromPointer(args);\n" +
              "args += argType"+i+"['argPackAdvance'];\n" +
              "argTypes += 4;\n";
      }
      functionBody +=
          "var obj = new constructor("+argsList+");\n" +
          "return valueToHandle(obj);\n" +
          "}\n";
  
      /*jshint evil:true*/
      return (new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory" , functionBody))(
          requireRegisteredType, Module, Emval.toHandle, getMemory);
    };
  
  var emval_newers = {
  };
  
  var __emval_new = (handle, argCount, argTypes, args) => {
      handle = Emval.toValue(handle);
  
      var newer = emval_newers[argCount];
      if (!newer) {
        newer = craftEmvalAllocator(argCount);
        emval_newers[argCount] = newer;
      }
  
      return newer(handle, argTypes, args);
    };

  
  var __emval_new_cstring = (v) => {
      return Emval.toHandle(getStringOrSymbol(v));
    };

  
  var __emval_take_value = (type, arg) => {
      type = requireRegisteredType(type, '_emval_take_value');
      var v = type['readValueFromPointer'](arg);
      return Emval.toHandle(v);
    };

  var _abort = () => {
      abort('native code called abort()');
    };

  var _emscripten_memcpy_big = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  var getHeapMax = () =>
      HEAPU8.length;
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  var SYSCALLS = {
  varargs:undefined,
  get() {
        assert(SYSCALLS.varargs != undefined);
        var ret = HEAP32[((SYSCALLS.varargs)>>2)];
        SYSCALLS.varargs += 4;
        return ret;
      },
  getp() { return SYSCALLS.get() },
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_close = (fd) => {
      abort('fd_close called without SYSCALLS_REQUIRE_FILESYSTEM');
    };

  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
      return 70;
    ;
  }

  var printCharBuffers = [null,[],[]];
  
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    };
embind_init_charCodes();
BindingError = Module['BindingError'] = class BindingError extends Error { constructor(message) { super(message); this.name = 'BindingError'; }};
InternalError = Module['InternalError'] = class InternalError extends Error { constructor(message) { super(message); this.name = 'InternalError'; }};
init_ClassHandle();
init_embind();;
init_RegisteredPointer();
UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError');;
handleAllocatorInit();
init_emval();;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  __assert_fail: ___assert_fail,
  __cxa_throw: ___cxa_throw,
  _embind_register_bigint: __embind_register_bigint,
  _embind_register_bool: __embind_register_bool,
  _embind_register_class: __embind_register_class,
  _embind_register_class_class_function: __embind_register_class_class_function,
  _embind_register_class_function: __embind_register_class_function,
  _embind_register_emval: __embind_register_emval,
  _embind_register_float: __embind_register_float,
  _embind_register_function: __embind_register_function,
  _embind_register_integer: __embind_register_integer,
  _embind_register_memory_view: __embind_register_memory_view,
  _embind_register_smart_ptr: __embind_register_smart_ptr,
  _embind_register_std_string: __embind_register_std_string,
  _embind_register_std_wstring: __embind_register_std_wstring,
  _embind_register_void: __embind_register_void,
  _emval_call: __emval_call,
  _emval_call_void_method: __emval_call_void_method,
  _emval_decref: __emval_decref,
  _emval_get_global: __emval_get_global,
  _emval_get_method_caller: __emval_get_method_caller,
  _emval_get_module_property: __emval_get_module_property,
  _emval_get_property: __emval_get_property,
  _emval_incref: __emval_incref,
  _emval_new: __emval_new,
  _emval_new_cstring: __emval_new_cstring,
  _emval_take_value: __emval_take_value,
  abort: _abort,
  djinni_init_wasm: djinni_init_wasm,
  emscripten_memcpy_big: _emscripten_memcpy_big,
  emscripten_resize_heap: _emscripten_resize_heap,
  fd_close: _fd_close,
  fd_seek: _fd_seek,
  fd_write: _fd_write
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors');
var _malloc = createExportWrapper('malloc');
var _releaseWasmBuffer = Module['_releaseWasmBuffer'] = createExportWrapper('releaseWasmBuffer');
var ___getTypeName = createExportWrapper('__getTypeName');
var __embind_initialize_bindings = Module['__embind_initialize_bindings'] = createExportWrapper('_embind_initialize_bindings');
var ___errno_location = createExportWrapper('__errno_location');
var _fflush = Module['_fflush'] = createExportWrapper('fflush');
var _free = createExportWrapper('free');
var setTempRet0 = createExportWrapper('setTempRet0');
var _emscripten_stack_init = wasmExports["emscripten_stack_init"]
var _emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"]
var _emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"]
var _emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"]
var stackSave = createExportWrapper('stackSave');
var stackRestore = createExportWrapper('stackRestore');
var stackAlloc = createExportWrapper('stackAlloc');
var _emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"]
var ___cxa_is_pointer_type = createExportWrapper('__cxa_is_pointer_type');
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji');
var ___start_em_js = Module['___start_em_js'] = 70292;
var ___stop_em_js = Module['___stop_em_js'] = 72311;

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

// include: base64Utils.js
// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  try {
    var decoded = atob(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'zeroMemory',
  'exitJS',
  'growMemory',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'setErrNo',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'getHostByName',
  'initRandomFill',
  'randomFill',
  'getCallstack',
  'emscriptenLog',
  'convertPCtoSourceLocation',
  'readEmAsmArgs',
  'jstoi_q',
  'jstoi_s',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'handleException',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'safeSetTimeout',
  'asmjsMangle',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'demangle',
  'demangleAll',
  'jsStackTrace',
  'stackTrace',
  'getEnvStrings',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'findMatchingCatch',
  'setMainLoop',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_createPreloadedFile',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'heapAccessShiftForWebGLHeap',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  '__glGenObject',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'SDL_unicode',
  'SDL_ttfContext',
  'SDL_audio',
  'GLFW_Window',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'registerInheritedInstance',
  'unregisterInheritedInstance',
  'enumReadValueFromPointer',
  'validateThis',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'FS_createFolder',
  'FS_createPath',
  'FS_createDataFile',
  'FS_createLazyFile',
  'FS_createLink',
  'FS_createDevice',
  'FS_readFile',
  'FS_unlink',
  'out',
  'err',
  'callMain',
  'abort',
  'keepRuntimeAlive',
  'wasmMemory',
  'wasmTable',
  'wasmExports',
  'stackAlloc',
  'stackSave',
  'stackRestore',
  'getTempRet0',
  'setTempRet0',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'convertI32PairToI53Checked',
  'ptrToString',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'ERRNO_CODES',
  'ERRNO_MESSAGES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'UNWIND_CACHE',
  'readEmAsmArgsArray',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'handleAllocatorInit',
  'HandleAllocator',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'JSEvents',
  'specialHTMLTargets',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'ExitStatus',
  'flush_NO_FILESYSTEM',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'Browser',
  'wget',
  'SYSCALLS',
  'preloadPlugins',
  'FS_stdin_getChar_buffer',
  'FS',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'emscripten_webgl_power_preferences',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'GLFW',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'InternalError',
  'BindingError',
  'throwInternalError',
  'throwBindingError',
  'registeredTypes',
  'awaitingDependencies',
  'typeDependencies',
  'tupleRegistrations',
  'structRegistrations',
  'sharedRegisterType',
  'whenDependentTypesAreResolved',
  'embind_charCodes',
  'embind_init_charCodes',
  'readLatin1String',
  'getTypeName',
  'heap32VectorToArray',
  'requireRegisteredType',
  'UnboundTypeError',
  'PureVirtualError',
  'GenericWireTypeSize',
  'init_embind',
  'throwUnboundTypeError',
  'ensureOverloadTable',
  'exposePublicSymbol',
  'replacePublicSymbol',
  'extendError',
  'createNamedFunction',
  'embindRepr',
  'registeredInstances',
  'getBasestPointer',
  'getInheritedInstance',
  'getInheritedInstanceCount',
  'getLiveInheritedInstances',
  'registeredPointers',
  'registerType',
  'integerReadValueFromPointer',
  'floatReadValueFromPointer',
  'simpleReadValueFromPointer',
  'readPointer',
  'runDestructors',
  'newFunc',
  'craftInvokerFunction',
  'embind__requireFunction',
  'genericPointerToWireType',
  'constNoSmartPtrRawPointerToWireType',
  'nonConstNoSmartPtrRawPointerToWireType',
  'init_RegisteredPointer',
  'RegisteredPointer',
  'RegisteredPointer_getPointee',
  'RegisteredPointer_destructor',
  'RegisteredPointer_deleteObject',
  'RegisteredPointer_fromWireType',
  'runDestructor',
  'releaseClassHandle',
  'finalizationRegistry',
  'detachFinalizer_deps',
  'detachFinalizer',
  'attachFinalizer',
  'makeClassHandle',
  'init_ClassHandle',
  'ClassHandle',
  'ClassHandle_isAliasOf',
  'throwInstanceAlreadyDeleted',
  'ClassHandle_clone',
  'ClassHandle_delete',
  'deletionQueue',
  'ClassHandle_isDeleted',
  'ClassHandle_deleteLater',
  'flushPendingDeletes',
  'delayFunction',
  'setDelayFunction',
  'RegisteredClass',
  'shallowCopyInternalPointer',
  'downcastPointer',
  'upcastPointer',
  'char_0',
  'char_9',
  'makeLegalFunctionName',
  'emval_handles',
  'emval_symbols',
  'init_emval',
  'count_emval_handles',
  'getStringOrSymbol',
  'Emval',
  'emval_newers',
  'craftEmvalAllocator',
  'emval_get_global',
  'emval_lookupTypes',
  'emval_allocateDestructors',
  'emval_methodCallers',
  'emval_addMethodCaller',
  'emval_registeredMethods',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve(Module);
    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    flush_NO_FILESYSTEM();
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();


// end include: postamble.js


  return moduleArg
}

);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], () => Module);
