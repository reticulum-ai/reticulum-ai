"use strict";
var ReticulumCryptoBundle = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@noble/hashes/crypto.js
  var require_crypto = __commonJS({
    "node_modules/@noble/hashes/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/hashes/utils.js
  var require_utils = __commonJS({
    "node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
      exports.isBytes = isBytes;
      exports.anumber = anumber;
      exports.abytes = abytes;
      exports.ahash = ahash;
      exports.aexists = aexists;
      exports.aoutput = aoutput;
      exports.u8 = u8;
      exports.u32 = u32;
      exports.clean = clean;
      exports.createView = createView;
      exports.rotr = rotr;
      exports.rotl = rotl;
      exports.byteSwap = byteSwap;
      exports.byteSwap32 = byteSwap32;
      exports.bytesToHex = bytesToHex;
      exports.hexToBytes = hexToBytes;
      exports.asyncLoop = asyncLoop;
      exports.utf8ToBytes = utf8ToBytes;
      exports.bytesToUtf8 = bytesToUtf8;
      exports.toBytes = toBytes;
      exports.kdfInputToBytes = kdfInputToBytes;
      exports.concatBytes = concatBytes;
      exports.checkOpts = checkOpts;
      exports.createHasher = createHasher;
      exports.createOptHasher = createOptHasher;
      exports.createXOFer = createXOFer;
      exports.randomBytes = randomBytes;
      var crypto_1 = require_crypto();
      function isBytes(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function anumber(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function abytes(b, ...lengths) {
        if (!isBytes(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.createHasher");
        anumber(h.outputLen);
        anumber(h.blockLen);
      }
      function aexists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput(out, instance) {
        abytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u32(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function clean(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      function createView(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap(n);
      exports.byteSwapIfBE = exports.swap8IfBE;
      function byteSwap32(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap(arr[i]);
        }
        return arr;
      }
      exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap32;
      var hasHexBuiltin = /* @__PURE__ */ (() => (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      ))();
      var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex(bytes) {
        abytes(bytes);
        if (hasHexBuiltin)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase16(ch) {
        if (ch >= asciis._0 && ch <= asciis._9)
          return ch - asciis._0;
        if (ch >= asciis.A && ch <= asciis.F)
          return ch - (asciis.A - 10);
        if (ch >= asciis.a && ch <= asciis.f)
          return ch - (asciis.a - 10);
        return;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function kdfInputToBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function concatBytes(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      var Hash = class {
      };
      exports.Hash = Hash;
      function createHasher(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function createOptHasher(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function createXOFer(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructor = createHasher;
      exports.wrapConstructorWithOpts = createOptHasher;
      exports.wrapXOFConstructorWithOpts = createXOFer;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // node_modules/@noble/hashes/_md.js
  var require_md = __commonJS({
    "node_modules/@noble/hashes/_md.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SHA512_IV = exports.SHA384_IV = exports.SHA224_IV = exports.SHA256_IV = exports.HashMD = void 0;
      exports.setBigUint64 = setBigUint64;
      exports.Chi = Chi;
      exports.Maj = Maj;
      var utils_ts_1 = require_utils();
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      function Chi(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, utils_ts_1.aexists)(this);
          data = (0, utils_ts_1.toBytes)(data);
          (0, utils_ts_1.abytes)(data);
          const { view, buffer, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          (0, utils_ts_1.clean)(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      exports.HashMD = HashMD;
      exports.SHA256_IV = Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      exports.SHA224_IV = Uint32Array.from([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
      exports.SHA384_IV = Uint32Array.from([
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ]);
      exports.SHA512_IV = Uint32Array.from([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
    }
  });

  // node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toBig = exports.shrSL = exports.shrSH = exports.rotrSL = exports.rotrSH = exports.rotrBL = exports.rotrBH = exports.rotr32L = exports.rotr32H = exports.rotlSL = exports.rotlSH = exports.rotlBL = exports.rotlBH = exports.add5L = exports.add5H = exports.add4L = exports.add4H = exports.add3L = exports.add3H = void 0;
      exports.add = add;
      exports.fromBig = fromBig;
      exports.split = split;
      var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n = /* @__PURE__ */ BigInt(32);
      function fromBig(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
        return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
      }
      function split(lst, le = false) {
        const len = lst.length;
        let Ah = new Uint32Array(len);
        let Al = new Uint32Array(len);
        for (let i = 0; i < len; i++) {
          const { h, l } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      var shrSH = (h, _l, s) => h >>> s;
      exports.shrSH = shrSH;
      var shrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.shrSL = shrSL;
      var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      exports.rotrSH = rotrSH;
      var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.rotrSL = rotrSL;
      var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports.rotrBH = rotrBH;
      var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports.rotrBL = rotrBL;
      var rotr32H = (_h, l) => l;
      exports.rotr32H = rotr32H;
      var rotr32L = (h, _l) => h;
      exports.rotr32L = rotr32L;
      var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      exports.rotlSH = rotlSH;
      var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      exports.rotlSL = rotlSL;
      var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports.rotlBH = rotlBH;
      var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports.rotlBL = rotlBL;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports.add3L = add3L;
      var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports.add3H = add3H;
      var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports.add4L = add4L;
      var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports.add4H = add4H;
      var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports.add5L = add5L;
      var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports.add5H = add5H;
      var u64 = {
        fromBig,
        split,
        toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }
  });

  // node_modules/@noble/hashes/sha2.js
  var require_sha2 = __commonJS({
    "node_modules/@noble/hashes/sha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_224 = exports.sha512_256 = exports.sha384 = exports.sha512 = exports.sha224 = exports.sha256 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA384 = exports.SHA512 = exports.SHA224 = exports.SHA256 = void 0;
      var _md_ts_1 = require_md();
      var u64 = require_u64();
      var utils_ts_1 = require_utils();
      var SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      var SHA256 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = _md_ts_1.SHA256_IV[0] | 0;
          this.B = _md_ts_1.SHA256_IV[1] | 0;
          this.C = _md_ts_1.SHA256_IV[2] | 0;
          this.D = _md_ts_1.SHA256_IV[3] | 0;
          this.E = _md_ts_1.SHA256_IV[4] | 0;
          this.F = _md_ts_1.SHA256_IV[5] | 0;
          this.G = _md_ts_1.SHA256_IV[6] | 0;
          this.H = _md_ts_1.SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.SHA256 = SHA256;
      var SHA224 = class extends SHA256 {
        constructor() {
          super(28);
          this.A = _md_ts_1.SHA224_IV[0] | 0;
          this.B = _md_ts_1.SHA224_IV[1] | 0;
          this.C = _md_ts_1.SHA224_IV[2] | 0;
          this.D = _md_ts_1.SHA224_IV[3] | 0;
          this.E = _md_ts_1.SHA224_IV[4] | 0;
          this.F = _md_ts_1.SHA224_IV[5] | 0;
          this.G = _md_ts_1.SHA224_IV[6] | 0;
          this.H = _md_ts_1.SHA224_IV[7] | 0;
        }
      };
      exports.SHA224 = SHA224;
      var K512 = /* @__PURE__ */ (() => u64.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n) => BigInt(n))))();
      var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
      var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
      var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
      var SHA512 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = _md_ts_1.SHA512_IV[0] | 0;
          this.Al = _md_ts_1.SHA512_IV[1] | 0;
          this.Bh = _md_ts_1.SHA512_IV[2] | 0;
          this.Bl = _md_ts_1.SHA512_IV[3] | 0;
          this.Ch = _md_ts_1.SHA512_IV[4] | 0;
          this.Cl = _md_ts_1.SHA512_IV[5] | 0;
          this.Dh = _md_ts_1.SHA512_IV[6] | 0;
          this.Dl = _md_ts_1.SHA512_IV[7] | 0;
          this.Eh = _md_ts_1.SHA512_IV[8] | 0;
          this.El = _md_ts_1.SHA512_IV[9] | 0;
          this.Fh = _md_ts_1.SHA512_IV[10] | 0;
          this.Fl = _md_ts_1.SHA512_IV[11] | 0;
          this.Gh = _md_ts_1.SHA512_IV[12] | 0;
          this.Gl = _md_ts_1.SHA512_IV[13] | 0;
          this.Hh = _md_ts_1.SHA512_IV[14] | 0;
          this.Hl = _md_ts_1.SHA512_IV[15] | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64.add3L(T1l, sigma0l, MAJl);
            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
        }
        destroy() {
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports.SHA512 = SHA512;
      var SHA384 = class extends SHA512 {
        constructor() {
          super(48);
          this.Ah = _md_ts_1.SHA384_IV[0] | 0;
          this.Al = _md_ts_1.SHA384_IV[1] | 0;
          this.Bh = _md_ts_1.SHA384_IV[2] | 0;
          this.Bl = _md_ts_1.SHA384_IV[3] | 0;
          this.Ch = _md_ts_1.SHA384_IV[4] | 0;
          this.Cl = _md_ts_1.SHA384_IV[5] | 0;
          this.Dh = _md_ts_1.SHA384_IV[6] | 0;
          this.Dl = _md_ts_1.SHA384_IV[7] | 0;
          this.Eh = _md_ts_1.SHA384_IV[8] | 0;
          this.El = _md_ts_1.SHA384_IV[9] | 0;
          this.Fh = _md_ts_1.SHA384_IV[10] | 0;
          this.Fl = _md_ts_1.SHA384_IV[11] | 0;
          this.Gh = _md_ts_1.SHA384_IV[12] | 0;
          this.Gl = _md_ts_1.SHA384_IV[13] | 0;
          this.Hh = _md_ts_1.SHA384_IV[14] | 0;
          this.Hl = _md_ts_1.SHA384_IV[15] | 0;
        }
      };
      exports.SHA384 = SHA384;
      var T224_IV = /* @__PURE__ */ Uint32Array.from([
        2352822216,
        424955298,
        1944164710,
        2312950998,
        502970286,
        855612546,
        1738396948,
        1479516111,
        258812777,
        2077511080,
        2011393907,
        79989058,
        1067287976,
        1780299464,
        286451373,
        2446758561
      ]);
      var T256_IV = /* @__PURE__ */ Uint32Array.from([
        573645204,
        4230739756,
        2673172387,
        3360449730,
        596883563,
        1867755857,
        2520282905,
        1497426621,
        2519219938,
        2827943907,
        3193839141,
        1401305490,
        721525244,
        746961066,
        246885852,
        2177182882
      ]);
      var SHA512_224 = class extends SHA512 {
        constructor() {
          super(28);
          this.Ah = T224_IV[0] | 0;
          this.Al = T224_IV[1] | 0;
          this.Bh = T224_IV[2] | 0;
          this.Bl = T224_IV[3] | 0;
          this.Ch = T224_IV[4] | 0;
          this.Cl = T224_IV[5] | 0;
          this.Dh = T224_IV[6] | 0;
          this.Dl = T224_IV[7] | 0;
          this.Eh = T224_IV[8] | 0;
          this.El = T224_IV[9] | 0;
          this.Fh = T224_IV[10] | 0;
          this.Fl = T224_IV[11] | 0;
          this.Gh = T224_IV[12] | 0;
          this.Gl = T224_IV[13] | 0;
          this.Hh = T224_IV[14] | 0;
          this.Hl = T224_IV[15] | 0;
        }
      };
      exports.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA512 {
        constructor() {
          super(32);
          this.Ah = T256_IV[0] | 0;
          this.Al = T256_IV[1] | 0;
          this.Bh = T256_IV[2] | 0;
          this.Bl = T256_IV[3] | 0;
          this.Ch = T256_IV[4] | 0;
          this.Cl = T256_IV[5] | 0;
          this.Dh = T256_IV[6] | 0;
          this.Dl = T256_IV[7] | 0;
          this.Eh = T256_IV[8] | 0;
          this.El = T256_IV[9] | 0;
          this.Fh = T256_IV[10] | 0;
          this.Fl = T256_IV[11] | 0;
          this.Gh = T256_IV[12] | 0;
          this.Gl = T256_IV[13] | 0;
          this.Hh = T256_IV[14] | 0;
          this.Hl = T256_IV[15] | 0;
        }
      };
      exports.SHA512_256 = SHA512_256;
      exports.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
      exports.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
      exports.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
      exports.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
      exports.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
      exports.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
    }
  });

  // node_modules/@noble/hashes/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/@noble/hashes/sha256.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha224 = exports.SHA224 = exports.sha256 = exports.SHA256 = void 0;
      var sha2_ts_1 = require_sha2();
      exports.SHA256 = sha2_ts_1.SHA256;
      exports.sha256 = sha2_ts_1.sha256;
      exports.SHA224 = sha2_ts_1.SHA224;
      exports.sha224 = sha2_ts_1.sha224;
    }
  });

  // node_modules/@noble/hashes/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/@noble/hashes/sha512.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_256 = exports.SHA512_256 = exports.sha512_224 = exports.SHA512_224 = exports.sha384 = exports.SHA384 = exports.sha512 = exports.SHA512 = void 0;
      var sha2_ts_1 = require_sha2();
      exports.SHA512 = sha2_ts_1.SHA512;
      exports.sha512 = sha2_ts_1.sha512;
      exports.SHA384 = sha2_ts_1.SHA384;
      exports.sha384 = sha2_ts_1.sha384;
      exports.SHA512_224 = sha2_ts_1.SHA512_224;
      exports.sha512_224 = sha2_ts_1.sha512_224;
      exports.SHA512_256 = sha2_ts_1.SHA512_256;
      exports.sha512_256 = sha2_ts_1.sha512_256;
    }
  });

  // node_modules/@noble/hashes/hmac.js
  var require_hmac = __commonJS({
    "node_modules/@noble/hashes/hmac.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hmac = exports.HMAC = void 0;
      var utils_ts_1 = require_utils();
      var HMAC = class extends utils_ts_1.Hash {
        constructor(hash2, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          (0, utils_ts_1.ahash)(hash2);
          const key = (0, utils_ts_1.toBytes)(_key);
          this.iHash = hash2.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54;
          this.iHash.update(pad);
          this.oHash = hash2.create();
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54 ^ 92;
          this.oHash.update(pad);
          (0, utils_ts_1.clean)(pad);
        }
        update(buf) {
          (0, utils_ts_1.aexists)(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.abytes)(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      exports.HMAC = HMAC;
      var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
      exports.hmac = hmac;
      exports.hmac.create = (hash2, key) => new HMAC(hash2, key);
    }
  });

  // node_modules/@noble/hashes/pbkdf2.js
  var require_pbkdf2 = __commonJS({
    "node_modules/@noble/hashes/pbkdf2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pbkdf2 = pbkdf2;
      exports.pbkdf2Async = pbkdf2Async;
      var hmac_ts_1 = require_hmac();
      var utils_ts_1 = require_utils();
      function pbkdf2Init(hash2, _password, _salt, _opts) {
        (0, utils_ts_1.ahash)(hash2);
        const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
        const { c, dkLen, asyncTick } = opts;
        (0, utils_ts_1.anumber)(c);
        (0, utils_ts_1.anumber)(dkLen);
        (0, utils_ts_1.anumber)(asyncTick);
        if (c < 1)
          throw new Error("iterations (c) should be >= 1");
        const password = (0, utils_ts_1.kdfInputToBytes)(_password);
        const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
        const DK = new Uint8Array(dkLen);
        const PRF = hmac_ts_1.hmac.create(hash2, password);
        const PRFSalt = PRF._cloneInto().update(salt);
        return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
      }
      function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
        PRF.destroy();
        PRFSalt.destroy();
        if (prfW)
          prfW.destroy();
        (0, utils_ts_1.clean)(u);
        return DK;
      }
      function pbkdf2(hash2, password, salt, opts) {
        const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash2, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_ts_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          for (let ui = 1; ui < c; ui++) {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++)
              Ti[i] ^= u[i];
          }
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
      async function pbkdf2Async(hash2, password, salt, opts) {
        const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash2, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_ts_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++)
              Ti[i] ^= u[i];
          });
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
    }
  });

  // node_modules/bip39/src/wordlists/czech.json
  var require_czech = __commonJS({
    "node_modules/bip39/src/wordlists/czech.json"(exports, module) {
      module.exports = [
        "abdikace",
        "abeceda",
        "adresa",
        "agrese",
        "akce",
        "aktovka",
        "alej",
        "alkohol",
        "amputace",
        "ananas",
        "andulka",
        "anekdota",
        "anketa",
        "antika",
        "anulovat",
        "archa",
        "arogance",
        "asfalt",
        "asistent",
        "aspirace",
        "astma",
        "astronom",
        "atlas",
        "atletika",
        "atol",
        "autobus",
        "azyl",
        "babka",
        "bachor",
        "bacil",
        "baculka",
        "badatel",
        "bageta",
        "bagr",
        "bahno",
        "bakterie",
        "balada",
        "baletka",
        "balkon",
        "balonek",
        "balvan",
        "balza",
        "bambus",
        "bankomat",
        "barbar",
        "baret",
        "barman",
        "baroko",
        "barva",
        "baterka",
        "batoh",
        "bavlna",
        "bazalka",
        "bazilika",
        "bazuka",
        "bedna",
        "beran",
        "beseda",
        "bestie",
        "beton",
        "bezinka",
        "bezmoc",
        "beztak",
        "bicykl",
        "bidlo",
        "biftek",
        "bikiny",
        "bilance",
        "biograf",
        "biolog",
        "bitva",
        "bizon",
        "blahobyt",
        "blatouch",
        "blecha",
        "bledule",
        "blesk",
        "blikat",
        "blizna",
        "blokovat",
        "bloudit",
        "blud",
        "bobek",
        "bobr",
        "bodlina",
        "bodnout",
        "bohatost",
        "bojkot",
        "bojovat",
        "bokorys",
        "bolest",
        "borec",
        "borovice",
        "bota",
        "boubel",
        "bouchat",
        "bouda",
        "boule",
        "bourat",
        "boxer",
        "bradavka",
        "brambora",
        "branka",
        "bratr",
        "brepta",
        "briketa",
        "brko",
        "brloh",
        "bronz",
        "broskev",
        "brunetka",
        "brusinka",
        "brzda",
        "brzy",
        "bublina",
        "bubnovat",
        "buchta",
        "buditel",
        "budka",
        "budova",
        "bufet",
        "bujarost",
        "bukvice",
        "buldok",
        "bulva",
        "bunda",
        "bunkr",
        "burza",
        "butik",
        "buvol",
        "buzola",
        "bydlet",
        "bylina",
        "bytovka",
        "bzukot",
        "capart",
        "carevna",
        "cedr",
        "cedule",
        "cejch",
        "cejn",
        "cela",
        "celer",
        "celkem",
        "celnice",
        "cenina",
        "cennost",
        "cenovka",
        "centrum",
        "cenzor",
        "cestopis",
        "cetka",
        "chalupa",
        "chapadlo",
        "charita",
        "chata",
        "chechtat",
        "chemie",
        "chichot",
        "chirurg",
        "chlad",
        "chleba",
        "chlubit",
        "chmel",
        "chmura",
        "chobot",
        "chochol",
        "chodba",
        "cholera",
        "chomout",
        "chopit",
        "choroba",
        "chov",
        "chrapot",
        "chrlit",
        "chrt",
        "chrup",
        "chtivost",
        "chudina",
        "chutnat",
        "chvat",
        "chvilka",
        "chvost",
        "chyba",
        "chystat",
        "chytit",
        "cibule",
        "cigareta",
        "cihelna",
        "cihla",
        "cinkot",
        "cirkus",
        "cisterna",
        "citace",
        "citrus",
        "cizinec",
        "cizost",
        "clona",
        "cokoliv",
        "couvat",
        "ctitel",
        "ctnost",
        "cudnost",
        "cuketa",
        "cukr",
        "cupot",
        "cvaknout",
        "cval",
        "cvik",
        "cvrkot",
        "cyklista",
        "daleko",
        "dareba",
        "datel",
        "datum",
        "dcera",
        "debata",
        "dechovka",
        "decibel",
        "deficit",
        "deflace",
        "dekl",
        "dekret",
        "demokrat",
        "deprese",
        "derby",
        "deska",
        "detektiv",
        "dikobraz",
        "diktovat",
        "dioda",
        "diplom",
        "disk",
        "displej",
        "divadlo",
        "divoch",
        "dlaha",
        "dlouho",
        "dluhopis",
        "dnes",
        "dobro",
        "dobytek",
        "docent",
        "dochutit",
        "dodnes",
        "dohled",
        "dohoda",
        "dohra",
        "dojem",
        "dojnice",
        "doklad",
        "dokola",
        "doktor",
        "dokument",
        "dolar",
        "doleva",
        "dolina",
        "doma",
        "dominant",
        "domluvit",
        "domov",
        "donutit",
        "dopad",
        "dopis",
        "doplnit",
        "doposud",
        "doprovod",
        "dopustit",
        "dorazit",
        "dorost",
        "dort",
        "dosah",
        "doslov",
        "dostatek",
        "dosud",
        "dosyta",
        "dotaz",
        "dotek",
        "dotknout",
        "doufat",
        "doutnat",
        "dovozce",
        "dozadu",
        "doznat",
        "dozorce",
        "drahota",
        "drak",
        "dramatik",
        "dravec",
        "draze",
        "drdol",
        "drobnost",
        "drogerie",
        "drozd",
        "drsnost",
        "drtit",
        "drzost",
        "duben",
        "duchovno",
        "dudek",
        "duha",
        "duhovka",
        "dusit",
        "dusno",
        "dutost",
        "dvojice",
        "dvorec",
        "dynamit",
        "ekolog",
        "ekonomie",
        "elektron",
        "elipsa",
        "email",
        "emise",
        "emoce",
        "empatie",
        "epizoda",
        "epocha",
        "epopej",
        "epos",
        "esej",
        "esence",
        "eskorta",
        "eskymo",
        "etiketa",
        "euforie",
        "evoluce",
        "exekuce",
        "exkurze",
        "expedice",
        "exploze",
        "export",
        "extrakt",
        "facka",
        "fajfka",
        "fakulta",
        "fanatik",
        "fantazie",
        "farmacie",
        "favorit",
        "fazole",
        "federace",
        "fejeton",
        "fenka",
        "fialka",
        "figurant",
        "filozof",
        "filtr",
        "finance",
        "finta",
        "fixace",
        "fjord",
        "flanel",
        "flirt",
        "flotila",
        "fond",
        "fosfor",
        "fotbal",
        "fotka",
        "foton",
        "frakce",
        "freska",
        "fronta",
        "fukar",
        "funkce",
        "fyzika",
        "galeje",
        "garant",
        "genetika",
        "geolog",
        "gilotina",
        "glazura",
        "glejt",
        "golem",
        "golfista",
        "gotika",
        "graf",
        "gramofon",
        "granule",
        "grep",
        "gril",
        "grog",
        "groteska",
        "guma",
        "hadice",
        "hadr",
        "hala",
        "halenka",
        "hanba",
        "hanopis",
        "harfa",
        "harpuna",
        "havran",
        "hebkost",
        "hejkal",
        "hejno",
        "hejtman",
        "hektar",
        "helma",
        "hematom",
        "herec",
        "herna",
        "heslo",
        "hezky",
        "historik",
        "hladovka",
        "hlasivky",
        "hlava",
        "hledat",
        "hlen",
        "hlodavec",
        "hloh",
        "hloupost",
        "hltat",
        "hlubina",
        "hluchota",
        "hmat",
        "hmota",
        "hmyz",
        "hnis",
        "hnojivo",
        "hnout",
        "hoblina",
        "hoboj",
        "hoch",
        "hodiny",
        "hodlat",
        "hodnota",
        "hodovat",
        "hojnost",
        "hokej",
        "holinka",
        "holka",
        "holub",
        "homole",
        "honitba",
        "honorace",
        "horal",
        "horda",
        "horizont",
        "horko",
        "horlivec",
        "hormon",
        "hornina",
        "horoskop",
        "horstvo",
        "hospoda",
        "hostina",
        "hotovost",
        "houba",
        "houf",
        "houpat",
        "houska",
        "hovor",
        "hradba",
        "hranice",
        "hravost",
        "hrazda",
        "hrbolek",
        "hrdina",
        "hrdlo",
        "hrdost",
        "hrnek",
        "hrobka",
        "hromada",
        "hrot",
        "hrouda",
        "hrozen",
        "hrstka",
        "hrubost",
        "hryzat",
        "hubenost",
        "hubnout",
        "hudba",
        "hukot",
        "humr",
        "husita",
        "hustota",
        "hvozd",
        "hybnost",
        "hydrant",
        "hygiena",
        "hymna",
        "hysterik",
        "idylka",
        "ihned",
        "ikona",
        "iluze",
        "imunita",
        "infekce",
        "inflace",
        "inkaso",
        "inovace",
        "inspekce",
        "internet",
        "invalida",
        "investor",
        "inzerce",
        "ironie",
        "jablko",
        "jachta",
        "jahoda",
        "jakmile",
        "jakost",
        "jalovec",
        "jantar",
        "jarmark",
        "jaro",
        "jasan",
        "jasno",
        "jatka",
        "javor",
        "jazyk",
        "jedinec",
        "jedle",
        "jednatel",
        "jehlan",
        "jekot",
        "jelen",
        "jelito",
        "jemnost",
        "jenom",
        "jepice",
        "jeseter",
        "jevit",
        "jezdec",
        "jezero",
        "jinak",
        "jindy",
        "jinoch",
        "jiskra",
        "jistota",
        "jitrnice",
        "jizva",
        "jmenovat",
        "jogurt",
        "jurta",
        "kabaret",
        "kabel",
        "kabinet",
        "kachna",
        "kadet",
        "kadidlo",
        "kahan",
        "kajak",
        "kajuta",
        "kakao",
        "kaktus",
        "kalamita",
        "kalhoty",
        "kalibr",
        "kalnost",
        "kamera",
        "kamkoliv",
        "kamna",
        "kanibal",
        "kanoe",
        "kantor",
        "kapalina",
        "kapela",
        "kapitola",
        "kapka",
        "kaple",
        "kapota",
        "kapr",
        "kapusta",
        "kapybara",
        "karamel",
        "karotka",
        "karton",
        "kasa",
        "katalog",
        "katedra",
        "kauce",
        "kauza",
        "kavalec",
        "kazajka",
        "kazeta",
        "kazivost",
        "kdekoliv",
        "kdesi",
        "kedluben",
        "kemp",
        "keramika",
        "kino",
        "klacek",
        "kladivo",
        "klam",
        "klapot",
        "klasika",
        "klaun",
        "klec",
        "klenba",
        "klepat",
        "klesnout",
        "klid",
        "klima",
        "klisna",
        "klobouk",
        "klokan",
        "klopa",
        "kloub",
        "klubovna",
        "klusat",
        "kluzkost",
        "kmen",
        "kmitat",
        "kmotr",
        "kniha",
        "knot",
        "koalice",
        "koberec",
        "kobka",
        "kobliha",
        "kobyla",
        "kocour",
        "kohout",
        "kojenec",
        "kokos",
        "koktejl",
        "kolaps",
        "koleda",
        "kolize",
        "kolo",
        "komando",
        "kometa",
        "komik",
        "komnata",
        "komora",
        "kompas",
        "komunita",
        "konat",
        "koncept",
        "kondice",
        "konec",
        "konfese",
        "kongres",
        "konina",
        "konkurs",
        "kontakt",
        "konzerva",
        "kopanec",
        "kopie",
        "kopnout",
        "koprovka",
        "korbel",
        "korektor",
        "kormidlo",
        "koroptev",
        "korpus",
        "koruna",
        "koryto",
        "korzet",
        "kosatec",
        "kostka",
        "kotel",
        "kotleta",
        "kotoul",
        "koukat",
        "koupelna",
        "kousek",
        "kouzlo",
        "kovboj",
        "koza",
        "kozoroh",
        "krabice",
        "krach",
        "krajina",
        "kralovat",
        "krasopis",
        "kravata",
        "kredit",
        "krejcar",
        "kresba",
        "kreveta",
        "kriket",
        "kritik",
        "krize",
        "krkavec",
        "krmelec",
        "krmivo",
        "krocan",
        "krok",
        "kronika",
        "kropit",
        "kroupa",
        "krovka",
        "krtek",
        "kruhadlo",
        "krupice",
        "krutost",
        "krvinka",
        "krychle",
        "krypta",
        "krystal",
        "kryt",
        "kudlanka",
        "kufr",
        "kujnost",
        "kukla",
        "kulajda",
        "kulich",
        "kulka",
        "kulomet",
        "kultura",
        "kuna",
        "kupodivu",
        "kurt",
        "kurzor",
        "kutil",
        "kvalita",
        "kvasinka",
        "kvestor",
        "kynolog",
        "kyselina",
        "kytara",
        "kytice",
        "kytka",
        "kytovec",
        "kyvadlo",
        "labrador",
        "lachtan",
        "ladnost",
        "laik",
        "lakomec",
        "lamela",
        "lampa",
        "lanovka",
        "lasice",
        "laso",
        "lastura",
        "latinka",
        "lavina",
        "lebka",
        "leckdy",
        "leden",
        "lednice",
        "ledovka",
        "ledvina",
        "legenda",
        "legie",
        "legrace",
        "lehce",
        "lehkost",
        "lehnout",
        "lektvar",
        "lenochod",
        "lentilka",
        "lepenka",
        "lepidlo",
        "letadlo",
        "letec",
        "letmo",
        "letokruh",
        "levhart",
        "levitace",
        "levobok",
        "libra",
        "lichotka",
        "lidojed",
        "lidskost",
        "lihovina",
        "lijavec",
        "lilek",
        "limetka",
        "linie",
        "linka",
        "linoleum",
        "listopad",
        "litina",
        "litovat",
        "lobista",
        "lodivod",
        "logika",
        "logoped",
        "lokalita",
        "loket",
        "lomcovat",
        "lopata",
        "lopuch",
        "lord",
        "losos",
        "lotr",
        "loudal",
        "louh",
        "louka",
        "louskat",
        "lovec",
        "lstivost",
        "lucerna",
        "lucifer",
        "lump",
        "lusk",
        "lustrace",
        "lvice",
        "lyra",
        "lyrika",
        "lysina",
        "madam",
        "madlo",
        "magistr",
        "mahagon",
        "majetek",
        "majitel",
        "majorita",
        "makak",
        "makovice",
        "makrela",
        "malba",
        "malina",
        "malovat",
        "malvice",
        "maminka",
        "mandle",
        "manko",
        "marnost",
        "masakr",
        "maskot",
        "masopust",
        "matice",
        "matrika",
        "maturita",
        "mazanec",
        "mazivo",
        "mazlit",
        "mazurka",
        "mdloba",
        "mechanik",
        "meditace",
        "medovina",
        "melasa",
        "meloun",
        "mentolka",
        "metla",
        "metoda",
        "metr",
        "mezera",
        "migrace",
        "mihnout",
        "mihule",
        "mikina",
        "mikrofon",
        "milenec",
        "milimetr",
        "milost",
        "mimika",
        "mincovna",
        "minibar",
        "minomet",
        "minulost",
        "miska",
        "mistr",
        "mixovat",
        "mladost",
        "mlha",
        "mlhovina",
        "mlok",
        "mlsat",
        "mluvit",
        "mnich",
        "mnohem",
        "mobil",
        "mocnost",
        "modelka",
        "modlitba",
        "mohyla",
        "mokro",
        "molekula",
        "momentka",
        "monarcha",
        "monokl",
        "monstrum",
        "montovat",
        "monzun",
        "mosaz",
        "moskyt",
        "most",
        "motivace",
        "motorka",
        "motyka",
        "moucha",
        "moudrost",
        "mozaika",
        "mozek",
        "mozol",
        "mramor",
        "mravenec",
        "mrkev",
        "mrtvola",
        "mrzet",
        "mrzutost",
        "mstitel",
        "mudrc",
        "muflon",
        "mulat",
        "mumie",
        "munice",
        "muset",
        "mutace",
        "muzeum",
        "muzikant",
        "myslivec",
        "mzda",
        "nabourat",
        "nachytat",
        "nadace",
        "nadbytek",
        "nadhoz",
        "nadobro",
        "nadpis",
        "nahlas",
        "nahnat",
        "nahodile",
        "nahradit",
        "naivita",
        "najednou",
        "najisto",
        "najmout",
        "naklonit",
        "nakonec",
        "nakrmit",
        "nalevo",
        "namazat",
        "namluvit",
        "nanometr",
        "naoko",
        "naopak",
        "naostro",
        "napadat",
        "napevno",
        "naplnit",
        "napnout",
        "naposled",
        "naprosto",
        "narodit",
        "naruby",
        "narychlo",
        "nasadit",
        "nasekat",
        "naslepo",
        "nastat",
        "natolik",
        "navenek",
        "navrch",
        "navzdory",
        "nazvat",
        "nebe",
        "nechat",
        "necky",
        "nedaleko",
        "nedbat",
        "neduh",
        "negace",
        "nehet",
        "nehoda",
        "nejen",
        "nejprve",
        "neklid",
        "nelibost",
        "nemilost",
        "nemoc",
        "neochota",
        "neonka",
        "nepokoj",
        "nerost",
        "nerv",
        "nesmysl",
        "nesoulad",
        "netvor",
        "neuron",
        "nevina",
        "nezvykle",
        "nicota",
        "nijak",
        "nikam",
        "nikdy",
        "nikl",
        "nikterak",
        "nitro",
        "nocleh",
        "nohavice",
        "nominace",
        "nora",
        "norek",
        "nositel",
        "nosnost",
        "nouze",
        "noviny",
        "novota",
        "nozdra",
        "nuda",
        "nudle",
        "nuget",
        "nutit",
        "nutnost",
        "nutrie",
        "nymfa",
        "obal",
        "obarvit",
        "obava",
        "obdiv",
        "obec",
        "obehnat",
        "obejmout",
        "obezita",
        "obhajoba",
        "obilnice",
        "objasnit",
        "objekt",
        "obklopit",
        "oblast",
        "oblek",
        "obliba",
        "obloha",
        "obluda",
        "obnos",
        "obohatit",
        "obojek",
        "obout",
        "obrazec",
        "obrna",
        "obruba",
        "obrys",
        "obsah",
        "obsluha",
        "obstarat",
        "obuv",
        "obvaz",
        "obvinit",
        "obvod",
        "obvykle",
        "obyvatel",
        "obzor",
        "ocas",
        "ocel",
        "ocenit",
        "ochladit",
        "ochota",
        "ochrana",
        "ocitnout",
        "odboj",
        "odbyt",
        "odchod",
        "odcizit",
        "odebrat",
        "odeslat",
        "odevzdat",
        "odezva",
        "odhadce",
        "odhodit",
        "odjet",
        "odjinud",
        "odkaz",
        "odkoupit",
        "odliv",
        "odluka",
        "odmlka",
        "odolnost",
        "odpad",
        "odpis",
        "odplout",
        "odpor",
        "odpustit",
        "odpykat",
        "odrazka",
        "odsoudit",
        "odstup",
        "odsun",
        "odtok",
        "odtud",
        "odvaha",
        "odveta",
        "odvolat",
        "odvracet",
        "odznak",
        "ofina",
        "ofsajd",
        "ohlas",
        "ohnisko",
        "ohrada",
        "ohrozit",
        "ohryzek",
        "okap",
        "okenice",
        "oklika",
        "okno",
        "okouzlit",
        "okovy",
        "okrasa",
        "okres",
        "okrsek",
        "okruh",
        "okupant",
        "okurka",
        "okusit",
        "olejnina",
        "olizovat",
        "omak",
        "omeleta",
        "omezit",
        "omladina",
        "omlouvat",
        "omluva",
        "omyl",
        "onehdy",
        "opakovat",
        "opasek",
        "operace",
        "opice",
        "opilost",
        "opisovat",
        "opora",
        "opozice",
        "opravdu",
        "oproti",
        "orbital",
        "orchestr",
        "orgie",
        "orlice",
        "orloj",
        "ortel",
        "osada",
        "oschnout",
        "osika",
        "osivo",
        "oslava",
        "oslepit",
        "oslnit",
        "oslovit",
        "osnova",
        "osoba",
        "osolit",
        "ospalec",
        "osten",
        "ostraha",
        "ostuda",
        "ostych",
        "osvojit",
        "oteplit",
        "otisk",
        "otop",
        "otrhat",
        "otrlost",
        "otrok",
        "otruby",
        "otvor",
        "ovanout",
        "ovar",
        "oves",
        "ovlivnit",
        "ovoce",
        "oxid",
        "ozdoba",
        "pachatel",
        "pacient",
        "padouch",
        "pahorek",
        "pakt",
        "palanda",
        "palec",
        "palivo",
        "paluba",
        "pamflet",
        "pamlsek",
        "panenka",
        "panika",
        "panna",
        "panovat",
        "panstvo",
        "pantofle",
        "paprika",
        "parketa",
        "parodie",
        "parta",
        "paruka",
        "paryba",
        "paseka",
        "pasivita",
        "pastelka",
        "patent",
        "patrona",
        "pavouk",
        "pazneht",
        "pazourek",
        "pecka",
        "pedagog",
        "pejsek",
        "peklo",
        "peloton",
        "penalta",
        "pendrek",
        "penze",
        "periskop",
        "pero",
        "pestrost",
        "petarda",
        "petice",
        "petrolej",
        "pevnina",
        "pexeso",
        "pianista",
        "piha",
        "pijavice",
        "pikle",
        "piknik",
        "pilina",
        "pilnost",
        "pilulka",
        "pinzeta",
        "pipeta",
        "pisatel",
        "pistole",
        "pitevna",
        "pivnice",
        "pivovar",
        "placenta",
        "plakat",
        "plamen",
        "planeta",
        "plastika",
        "platit",
        "plavidlo",
        "plaz",
        "plech",
        "plemeno",
        "plenta",
        "ples",
        "pletivo",
        "plevel",
        "plivat",
        "plnit",
        "plno",
        "plocha",
        "plodina",
        "plomba",
        "plout",
        "pluk",
        "plyn",
        "pobavit",
        "pobyt",
        "pochod",
        "pocit",
        "poctivec",
        "podat",
        "podcenit",
        "podepsat",
        "podhled",
        "podivit",
        "podklad",
        "podmanit",
        "podnik",
        "podoba",
        "podpora",
        "podraz",
        "podstata",
        "podvod",
        "podzim",
        "poezie",
        "pohanka",
        "pohnutka",
        "pohovor",
        "pohroma",
        "pohyb",
        "pointa",
        "pojistka",
        "pojmout",
        "pokazit",
        "pokles",
        "pokoj",
        "pokrok",
        "pokuta",
        "pokyn",
        "poledne",
        "polibek",
        "polknout",
        "poloha",
        "polynom",
        "pomalu",
        "pominout",
        "pomlka",
        "pomoc",
        "pomsta",
        "pomyslet",
        "ponechat",
        "ponorka",
        "ponurost",
        "popadat",
        "popel",
        "popisek",
        "poplach",
        "poprosit",
        "popsat",
        "popud",
        "poradce",
        "porce",
        "porod",
        "porucha",
        "poryv",
        "posadit",
        "posed",
        "posila",
        "poskok",
        "poslanec",
        "posoudit",
        "pospolu",
        "postava",
        "posudek",
        "posyp",
        "potah",
        "potkan",
        "potlesk",
        "potomek",
        "potrava",
        "potupa",
        "potvora",
        "poukaz",
        "pouto",
        "pouzdro",
        "povaha",
        "povidla",
        "povlak",
        "povoz",
        "povrch",
        "povstat",
        "povyk",
        "povzdech",
        "pozdrav",
        "pozemek",
        "poznatek",
        "pozor",
        "pozvat",
        "pracovat",
        "prahory",
        "praktika",
        "prales",
        "praotec",
        "praporek",
        "prase",
        "pravda",
        "princip",
        "prkno",
        "probudit",
        "procento",
        "prodej",
        "profese",
        "prohra",
        "projekt",
        "prolomit",
        "promile",
        "pronikat",
        "propad",
        "prorok",
        "prosba",
        "proton",
        "proutek",
        "provaz",
        "prskavka",
        "prsten",
        "prudkost",
        "prut",
        "prvek",
        "prvohory",
        "psanec",
        "psovod",
        "pstruh",
        "ptactvo",
        "puberta",
        "puch",
        "pudl",
        "pukavec",
        "puklina",
        "pukrle",
        "pult",
        "pumpa",
        "punc",
        "pupen",
        "pusa",
        "pusinka",
        "pustina",
        "putovat",
        "putyka",
        "pyramida",
        "pysk",
        "pytel",
        "racek",
        "rachot",
        "radiace",
        "radnice",
        "radon",
        "raft",
        "ragby",
        "raketa",
        "rakovina",
        "rameno",
        "rampouch",
        "rande",
        "rarach",
        "rarita",
        "rasovna",
        "rastr",
        "ratolest",
        "razance",
        "razidlo",
        "reagovat",
        "reakce",
        "recept",
        "redaktor",
        "referent",
        "reflex",
        "rejnok",
        "reklama",
        "rekord",
        "rekrut",
        "rektor",
        "reputace",
        "revize",
        "revma",
        "revolver",
        "rezerva",
        "riskovat",
        "riziko",
        "robotika",
        "rodokmen",
        "rohovka",
        "rokle",
        "rokoko",
        "romaneto",
        "ropovod",
        "ropucha",
        "rorejs",
        "rosol",
        "rostlina",
        "rotmistr",
        "rotoped",
        "rotunda",
        "roubenka",
        "roucho",
        "roup",
        "roura",
        "rovina",
        "rovnice",
        "rozbor",
        "rozchod",
        "rozdat",
        "rozeznat",
        "rozhodce",
        "rozinka",
        "rozjezd",
        "rozkaz",
        "rozloha",
        "rozmar",
        "rozpad",
        "rozruch",
        "rozsah",
        "roztok",
        "rozum",
        "rozvod",
        "rubrika",
        "ruchadlo",
        "rukavice",
        "rukopis",
        "ryba",
        "rybolov",
        "rychlost",
        "rydlo",
        "rypadlo",
        "rytina",
        "ryzost",
        "sadista",
        "sahat",
        "sako",
        "samec",
        "samizdat",
        "samota",
        "sanitka",
        "sardinka",
        "sasanka",
        "satelit",
        "sazba",
        "sazenice",
        "sbor",
        "schovat",
        "sebranka",
        "secese",
        "sedadlo",
        "sediment",
        "sedlo",
        "sehnat",
        "sejmout",
        "sekera",
        "sekta",
        "sekunda",
        "sekvoje",
        "semeno",
        "seno",
        "servis",
        "sesadit",
        "seshora",
        "seskok",
        "seslat",
        "sestra",
        "sesuv",
        "sesypat",
        "setba",
        "setina",
        "setkat",
        "setnout",
        "setrvat",
        "sever",
        "seznam",
        "shoda",
        "shrnout",
        "sifon",
        "silnice",
        "sirka",
        "sirotek",
        "sirup",
        "situace",
        "skafandr",
        "skalisko",
        "skanzen",
        "skaut",
        "skeptik",
        "skica",
        "skladba",
        "sklenice",
        "sklo",
        "skluz",
        "skoba",
        "skokan",
        "skoro",
        "skripta",
        "skrz",
        "skupina",
        "skvost",
        "skvrna",
        "slabika",
        "sladidlo",
        "slanina",
        "slast",
        "slavnost",
        "sledovat",
        "slepec",
        "sleva",
        "slezina",
        "slib",
        "slina",
        "sliznice",
        "slon",
        "sloupek",
        "slovo",
        "sluch",
        "sluha",
        "slunce",
        "slupka",
        "slza",
        "smaragd",
        "smetana",
        "smilstvo",
        "smlouva",
        "smog",
        "smrad",
        "smrk",
        "smrtka",
        "smutek",
        "smysl",
        "snad",
        "snaha",
        "snob",
        "sobota",
        "socha",
        "sodovka",
        "sokol",
        "sopka",
        "sotva",
        "souboj",
        "soucit",
        "soudce",
        "souhlas",
        "soulad",
        "soumrak",
        "souprava",
        "soused",
        "soutok",
        "souviset",
        "spalovna",
        "spasitel",
        "spis",
        "splav",
        "spodek",
        "spojenec",
        "spolu",
        "sponzor",
        "spornost",
        "spousta",
        "sprcha",
        "spustit",
        "sranda",
        "sraz",
        "srdce",
        "srna",
        "srnec",
        "srovnat",
        "srpen",
        "srst",
        "srub",
        "stanice",
        "starosta",
        "statika",
        "stavba",
        "stehno",
        "stezka",
        "stodola",
        "stolek",
        "stopa",
        "storno",
        "stoupat",
        "strach",
        "stres",
        "strhnout",
        "strom",
        "struna",
        "studna",
        "stupnice",
        "stvol",
        "styk",
        "subjekt",
        "subtropy",
        "suchar",
        "sudost",
        "sukno",
        "sundat",
        "sunout",
        "surikata",
        "surovina",
        "svah",
        "svalstvo",
        "svetr",
        "svatba",
        "svazek",
        "svisle",
        "svitek",
        "svoboda",
        "svodidlo",
        "svorka",
        "svrab",
        "sykavka",
        "sykot",
        "synek",
        "synovec",
        "sypat",
        "sypkost",
        "syrovost",
        "sysel",
        "sytost",
        "tabletka",
        "tabule",
        "tahoun",
        "tajemno",
        "tajfun",
        "tajga",
        "tajit",
        "tajnost",
        "taktika",
        "tamhle",
        "tampon",
        "tancovat",
        "tanec",
        "tanker",
        "tapeta",
        "tavenina",
        "tazatel",
        "technika",
        "tehdy",
        "tekutina",
        "telefon",
        "temnota",
        "tendence",
        "tenista",
        "tenor",
        "teplota",
        "tepna",
        "teprve",
        "terapie",
        "termoska",
        "textil",
        "ticho",
        "tiskopis",
        "titulek",
        "tkadlec",
        "tkanina",
        "tlapka",
        "tleskat",
        "tlukot",
        "tlupa",
        "tmel",
        "toaleta",
        "topinka",
        "topol",
        "torzo",
        "touha",
        "toulec",
        "tradice",
        "traktor",
        "tramp",
        "trasa",
        "traverza",
        "trefit",
        "trest",
        "trezor",
        "trhavina",
        "trhlina",
        "trochu",
        "trojice",
        "troska",
        "trouba",
        "trpce",
        "trpitel",
        "trpkost",
        "trubec",
        "truchlit",
        "truhlice",
        "trus",
        "trvat",
        "tudy",
        "tuhnout",
        "tuhost",
        "tundra",
        "turista",
        "turnaj",
        "tuzemsko",
        "tvaroh",
        "tvorba",
        "tvrdost",
        "tvrz",
        "tygr",
        "tykev",
        "ubohost",
        "uboze",
        "ubrat",
        "ubrousek",
        "ubrus",
        "ubytovna",
        "ucho",
        "uctivost",
        "udivit",
        "uhradit",
        "ujednat",
        "ujistit",
        "ujmout",
        "ukazatel",
        "uklidnit",
        "uklonit",
        "ukotvit",
        "ukrojit",
        "ulice",
        "ulita",
        "ulovit",
        "umyvadlo",
        "unavit",
        "uniforma",
        "uniknout",
        "upadnout",
        "uplatnit",
        "uplynout",
        "upoutat",
        "upravit",
        "uran",
        "urazit",
        "usednout",
        "usilovat",
        "usmrtit",
        "usnadnit",
        "usnout",
        "usoudit",
        "ustlat",
        "ustrnout",
        "utahovat",
        "utkat",
        "utlumit",
        "utonout",
        "utopenec",
        "utrousit",
        "uvalit",
        "uvolnit",
        "uvozovka",
        "uzdravit",
        "uzel",
        "uzenina",
        "uzlina",
        "uznat",
        "vagon",
        "valcha",
        "valoun",
        "vana",
        "vandal",
        "vanilka",
        "varan",
        "varhany",
        "varovat",
        "vcelku",
        "vchod",
        "vdova",
        "vedro",
        "vegetace",
        "vejce",
        "velbloud",
        "veletrh",
        "velitel",
        "velmoc",
        "velryba",
        "venkov",
        "veranda",
        "verze",
        "veselka",
        "veskrze",
        "vesnice",
        "vespodu",
        "vesta",
        "veterina",
        "veverka",
        "vibrace",
        "vichr",
        "videohra",
        "vidina",
        "vidle",
        "vila",
        "vinice",
        "viset",
        "vitalita",
        "vize",
        "vizitka",
        "vjezd",
        "vklad",
        "vkus",
        "vlajka",
        "vlak",
        "vlasec",
        "vlevo",
        "vlhkost",
        "vliv",
        "vlnovka",
        "vloupat",
        "vnucovat",
        "vnuk",
        "voda",
        "vodivost",
        "vodoznak",
        "vodstvo",
        "vojensky",
        "vojna",
        "vojsko",
        "volant",
        "volba",
        "volit",
        "volno",
        "voskovka",
        "vozidlo",
        "vozovna",
        "vpravo",
        "vrabec",
        "vracet",
        "vrah",
        "vrata",
        "vrba",
        "vrcholek",
        "vrhat",
        "vrstva",
        "vrtule",
        "vsadit",
        "vstoupit",
        "vstup",
        "vtip",
        "vybavit",
        "vybrat",
        "vychovat",
        "vydat",
        "vydra",
        "vyfotit",
        "vyhledat",
        "vyhnout",
        "vyhodit",
        "vyhradit",
        "vyhubit",
        "vyjasnit",
        "vyjet",
        "vyjmout",
        "vyklopit",
        "vykonat",
        "vylekat",
        "vymazat",
        "vymezit",
        "vymizet",
        "vymyslet",
        "vynechat",
        "vynikat",
        "vynutit",
        "vypadat",
        "vyplatit",
        "vypravit",
        "vypustit",
        "vyrazit",
        "vyrovnat",
        "vyrvat",
        "vyslovit",
        "vysoko",
        "vystavit",
        "vysunout",
        "vysypat",
        "vytasit",
        "vytesat",
        "vytratit",
        "vyvinout",
        "vyvolat",
        "vyvrhel",
        "vyzdobit",
        "vyznat",
        "vzadu",
        "vzbudit",
        "vzchopit",
        "vzdor",
        "vzduch",
        "vzdychat",
        "vzestup",
        "vzhledem",
        "vzkaz",
        "vzlykat",
        "vznik",
        "vzorek",
        "vzpoura",
        "vztah",
        "vztek",
        "xylofon",
        "zabrat",
        "zabydlet",
        "zachovat",
        "zadarmo",
        "zadusit",
        "zafoukat",
        "zahltit",
        "zahodit",
        "zahrada",
        "zahynout",
        "zajatec",
        "zajet",
        "zajistit",
        "zaklepat",
        "zakoupit",
        "zalepit",
        "zamezit",
        "zamotat",
        "zamyslet",
        "zanechat",
        "zanikat",
        "zaplatit",
        "zapojit",
        "zapsat",
        "zarazit",
        "zastavit",
        "zasunout",
        "zatajit",
        "zatemnit",
        "zatknout",
        "zaujmout",
        "zavalit",
        "zavelet",
        "zavinit",
        "zavolat",
        "zavrtat",
        "zazvonit",
        "zbavit",
        "zbrusu",
        "zbudovat",
        "zbytek",
        "zdaleka",
        "zdarma",
        "zdatnost",
        "zdivo",
        "zdobit",
        "zdroj",
        "zdvih",
        "zdymadlo",
        "zelenina",
        "zeman",
        "zemina",
        "zeptat",
        "zezadu",
        "zezdola",
        "zhatit",
        "zhltnout",
        "zhluboka",
        "zhotovit",
        "zhruba",
        "zima",
        "zimnice",
        "zjemnit",
        "zklamat",
        "zkoumat",
        "zkratka",
        "zkumavka",
        "zlato",
        "zlehka",
        "zloba",
        "zlom",
        "zlost",
        "zlozvyk",
        "zmapovat",
        "zmar",
        "zmatek",
        "zmije",
        "zmizet",
        "zmocnit",
        "zmodrat",
        "zmrzlina",
        "zmutovat",
        "znak",
        "znalost",
        "znamenat",
        "znovu",
        "zobrazit",
        "zotavit",
        "zoubek",
        "zoufale",
        "zplodit",
        "zpomalit",
        "zprava",
        "zprostit",
        "zprudka",
        "zprvu",
        "zrada",
        "zranit",
        "zrcadlo",
        "zrnitost",
        "zrno",
        "zrovna",
        "zrychlit",
        "zrzavost",
        "zticha",
        "ztratit",
        "zubovina",
        "zubr",
        "zvednout",
        "zvenku",
        "zvesela",
        "zvon",
        "zvrat",
        "zvukovod",
        "zvyk"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/chinese_simplified.json
  var require_chinese_simplified = __commonJS({
    "node_modules/bip39/src/wordlists/chinese_simplified.json"(exports, module) {
      module.exports = [
        "\u7684",
        "\u4E00",
        "\u662F",
        "\u5728",
        "\u4E0D",
        "\u4E86",
        "\u6709",
        "\u548C",
        "\u4EBA",
        "\u8FD9",
        "\u4E2D",
        "\u5927",
        "\u4E3A",
        "\u4E0A",
        "\u4E2A",
        "\u56FD",
        "\u6211",
        "\u4EE5",
        "\u8981",
        "\u4ED6",
        "\u65F6",
        "\u6765",
        "\u7528",
        "\u4EEC",
        "\u751F",
        "\u5230",
        "\u4F5C",
        "\u5730",
        "\u4E8E",
        "\u51FA",
        "\u5C31",
        "\u5206",
        "\u5BF9",
        "\u6210",
        "\u4F1A",
        "\u53EF",
        "\u4E3B",
        "\u53D1",
        "\u5E74",
        "\u52A8",
        "\u540C",
        "\u5DE5",
        "\u4E5F",
        "\u80FD",
        "\u4E0B",
        "\u8FC7",
        "\u5B50",
        "\u8BF4",
        "\u4EA7",
        "\u79CD",
        "\u9762",
        "\u800C",
        "\u65B9",
        "\u540E",
        "\u591A",
        "\u5B9A",
        "\u884C",
        "\u5B66",
        "\u6CD5",
        "\u6240",
        "\u6C11",
        "\u5F97",
        "\u7ECF",
        "\u5341",
        "\u4E09",
        "\u4E4B",
        "\u8FDB",
        "\u7740",
        "\u7B49",
        "\u90E8",
        "\u5EA6",
        "\u5BB6",
        "\u7535",
        "\u529B",
        "\u91CC",
        "\u5982",
        "\u6C34",
        "\u5316",
        "\u9AD8",
        "\u81EA",
        "\u4E8C",
        "\u7406",
        "\u8D77",
        "\u5C0F",
        "\u7269",
        "\u73B0",
        "\u5B9E",
        "\u52A0",
        "\u91CF",
        "\u90FD",
        "\u4E24",
        "\u4F53",
        "\u5236",
        "\u673A",
        "\u5F53",
        "\u4F7F",
        "\u70B9",
        "\u4ECE",
        "\u4E1A",
        "\u672C",
        "\u53BB",
        "\u628A",
        "\u6027",
        "\u597D",
        "\u5E94",
        "\u5F00",
        "\u5B83",
        "\u5408",
        "\u8FD8",
        "\u56E0",
        "\u7531",
        "\u5176",
        "\u4E9B",
        "\u7136",
        "\u524D",
        "\u5916",
        "\u5929",
        "\u653F",
        "\u56DB",
        "\u65E5",
        "\u90A3",
        "\u793E",
        "\u4E49",
        "\u4E8B",
        "\u5E73",
        "\u5F62",
        "\u76F8",
        "\u5168",
        "\u8868",
        "\u95F4",
        "\u6837",
        "\u4E0E",
        "\u5173",
        "\u5404",
        "\u91CD",
        "\u65B0",
        "\u7EBF",
        "\u5185",
        "\u6570",
        "\u6B63",
        "\u5FC3",
        "\u53CD",
        "\u4F60",
        "\u660E",
        "\u770B",
        "\u539F",
        "\u53C8",
        "\u4E48",
        "\u5229",
        "\u6BD4",
        "\u6216",
        "\u4F46",
        "\u8D28",
        "\u6C14",
        "\u7B2C",
        "\u5411",
        "\u9053",
        "\u547D",
        "\u6B64",
        "\u53D8",
        "\u6761",
        "\u53EA",
        "\u6CA1",
        "\u7ED3",
        "\u89E3",
        "\u95EE",
        "\u610F",
        "\u5EFA",
        "\u6708",
        "\u516C",
        "\u65E0",
        "\u7CFB",
        "\u519B",
        "\u5F88",
        "\u60C5",
        "\u8005",
        "\u6700",
        "\u7ACB",
        "\u4EE3",
        "\u60F3",
        "\u5DF2",
        "\u901A",
        "\u5E76",
        "\u63D0",
        "\u76F4",
        "\u9898",
        "\u515A",
        "\u7A0B",
        "\u5C55",
        "\u4E94",
        "\u679C",
        "\u6599",
        "\u8C61",
        "\u5458",
        "\u9769",
        "\u4F4D",
        "\u5165",
        "\u5E38",
        "\u6587",
        "\u603B",
        "\u6B21",
        "\u54C1",
        "\u5F0F",
        "\u6D3B",
        "\u8BBE",
        "\u53CA",
        "\u7BA1",
        "\u7279",
        "\u4EF6",
        "\u957F",
        "\u6C42",
        "\u8001",
        "\u5934",
        "\u57FA",
        "\u8D44",
        "\u8FB9",
        "\u6D41",
        "\u8DEF",
        "\u7EA7",
        "\u5C11",
        "\u56FE",
        "\u5C71",
        "\u7EDF",
        "\u63A5",
        "\u77E5",
        "\u8F83",
        "\u5C06",
        "\u7EC4",
        "\u89C1",
        "\u8BA1",
        "\u522B",
        "\u5979",
        "\u624B",
        "\u89D2",
        "\u671F",
        "\u6839",
        "\u8BBA",
        "\u8FD0",
        "\u519C",
        "\u6307",
        "\u51E0",
        "\u4E5D",
        "\u533A",
        "\u5F3A",
        "\u653E",
        "\u51B3",
        "\u897F",
        "\u88AB",
        "\u5E72",
        "\u505A",
        "\u5FC5",
        "\u6218",
        "\u5148",
        "\u56DE",
        "\u5219",
        "\u4EFB",
        "\u53D6",
        "\u636E",
        "\u5904",
        "\u961F",
        "\u5357",
        "\u7ED9",
        "\u8272",
        "\u5149",
        "\u95E8",
        "\u5373",
        "\u4FDD",
        "\u6CBB",
        "\u5317",
        "\u9020",
        "\u767E",
        "\u89C4",
        "\u70ED",
        "\u9886",
        "\u4E03",
        "\u6D77",
        "\u53E3",
        "\u4E1C",
        "\u5BFC",
        "\u5668",
        "\u538B",
        "\u5FD7",
        "\u4E16",
        "\u91D1",
        "\u589E",
        "\u4E89",
        "\u6D4E",
        "\u9636",
        "\u6CB9",
        "\u601D",
        "\u672F",
        "\u6781",
        "\u4EA4",
        "\u53D7",
        "\u8054",
        "\u4EC0",
        "\u8BA4",
        "\u516D",
        "\u5171",
        "\u6743",
        "\u6536",
        "\u8BC1",
        "\u6539",
        "\u6E05",
        "\u7F8E",
        "\u518D",
        "\u91C7",
        "\u8F6C",
        "\u66F4",
        "\u5355",
        "\u98CE",
        "\u5207",
        "\u6253",
        "\u767D",
        "\u6559",
        "\u901F",
        "\u82B1",
        "\u5E26",
        "\u5B89",
        "\u573A",
        "\u8EAB",
        "\u8F66",
        "\u4F8B",
        "\u771F",
        "\u52A1",
        "\u5177",
        "\u4E07",
        "\u6BCF",
        "\u76EE",
        "\u81F3",
        "\u8FBE",
        "\u8D70",
        "\u79EF",
        "\u793A",
        "\u8BAE",
        "\u58F0",
        "\u62A5",
        "\u6597",
        "\u5B8C",
        "\u7C7B",
        "\u516B",
        "\u79BB",
        "\u534E",
        "\u540D",
        "\u786E",
        "\u624D",
        "\u79D1",
        "\u5F20",
        "\u4FE1",
        "\u9A6C",
        "\u8282",
        "\u8BDD",
        "\u7C73",
        "\u6574",
        "\u7A7A",
        "\u5143",
        "\u51B5",
        "\u4ECA",
        "\u96C6",
        "\u6E29",
        "\u4F20",
        "\u571F",
        "\u8BB8",
        "\u6B65",
        "\u7FA4",
        "\u5E7F",
        "\u77F3",
        "\u8BB0",
        "\u9700",
        "\u6BB5",
        "\u7814",
        "\u754C",
        "\u62C9",
        "\u6797",
        "\u5F8B",
        "\u53EB",
        "\u4E14",
        "\u7A76",
        "\u89C2",
        "\u8D8A",
        "\u7EC7",
        "\u88C5",
        "\u5F71",
        "\u7B97",
        "\u4F4E",
        "\u6301",
        "\u97F3",
        "\u4F17",
        "\u4E66",
        "\u5E03",
        "\u590D",
        "\u5BB9",
        "\u513F",
        "\u987B",
        "\u9645",
        "\u5546",
        "\u975E",
        "\u9A8C",
        "\u8FDE",
        "\u65AD",
        "\u6DF1",
        "\u96BE",
        "\u8FD1",
        "\u77FF",
        "\u5343",
        "\u5468",
        "\u59D4",
        "\u7D20",
        "\u6280",
        "\u5907",
        "\u534A",
        "\u529E",
        "\u9752",
        "\u7701",
        "\u5217",
        "\u4E60",
        "\u54CD",
        "\u7EA6",
        "\u652F",
        "\u822C",
        "\u53F2",
        "\u611F",
        "\u52B3",
        "\u4FBF",
        "\u56E2",
        "\u5F80",
        "\u9178",
        "\u5386",
        "\u5E02",
        "\u514B",
        "\u4F55",
        "\u9664",
        "\u6D88",
        "\u6784",
        "\u5E9C",
        "\u79F0",
        "\u592A",
        "\u51C6",
        "\u7CBE",
        "\u503C",
        "\u53F7",
        "\u7387",
        "\u65CF",
        "\u7EF4",
        "\u5212",
        "\u9009",
        "\u6807",
        "\u5199",
        "\u5B58",
        "\u5019",
        "\u6BDB",
        "\u4EB2",
        "\u5FEB",
        "\u6548",
        "\u65AF",
        "\u9662",
        "\u67E5",
        "\u6C5F",
        "\u578B",
        "\u773C",
        "\u738B",
        "\u6309",
        "\u683C",
        "\u517B",
        "\u6613",
        "\u7F6E",
        "\u6D3E",
        "\u5C42",
        "\u7247",
        "\u59CB",
        "\u5374",
        "\u4E13",
        "\u72B6",
        "\u80B2",
        "\u5382",
        "\u4EAC",
        "\u8BC6",
        "\u9002",
        "\u5C5E",
        "\u5706",
        "\u5305",
        "\u706B",
        "\u4F4F",
        "\u8C03",
        "\u6EE1",
        "\u53BF",
        "\u5C40",
        "\u7167",
        "\u53C2",
        "\u7EA2",
        "\u7EC6",
        "\u5F15",
        "\u542C",
        "\u8BE5",
        "\u94C1",
        "\u4EF7",
        "\u4E25",
        "\u9996",
        "\u5E95",
        "\u6DB2",
        "\u5B98",
        "\u5FB7",
        "\u968F",
        "\u75C5",
        "\u82CF",
        "\u5931",
        "\u5C14",
        "\u6B7B",
        "\u8BB2",
        "\u914D",
        "\u5973",
        "\u9EC4",
        "\u63A8",
        "\u663E",
        "\u8C08",
        "\u7F6A",
        "\u795E",
        "\u827A",
        "\u5462",
        "\u5E2D",
        "\u542B",
        "\u4F01",
        "\u671B",
        "\u5BC6",
        "\u6279",
        "\u8425",
        "\u9879",
        "\u9632",
        "\u4E3E",
        "\u7403",
        "\u82F1",
        "\u6C27",
        "\u52BF",
        "\u544A",
        "\u674E",
        "\u53F0",
        "\u843D",
        "\u6728",
        "\u5E2E",
        "\u8F6E",
        "\u7834",
        "\u4E9A",
        "\u5E08",
        "\u56F4",
        "\u6CE8",
        "\u8FDC",
        "\u5B57",
        "\u6750",
        "\u6392",
        "\u4F9B",
        "\u6CB3",
        "\u6001",
        "\u5C01",
        "\u53E6",
        "\u65BD",
        "\u51CF",
        "\u6811",
        "\u6EB6",
        "\u600E",
        "\u6B62",
        "\u6848",
        "\u8A00",
        "\u58EB",
        "\u5747",
        "\u6B66",
        "\u56FA",
        "\u53F6",
        "\u9C7C",
        "\u6CE2",
        "\u89C6",
        "\u4EC5",
        "\u8D39",
        "\u7D27",
        "\u7231",
        "\u5DE6",
        "\u7AE0",
        "\u65E9",
        "\u671D",
        "\u5BB3",
        "\u7EED",
        "\u8F7B",
        "\u670D",
        "\u8BD5",
        "\u98DF",
        "\u5145",
        "\u5175",
        "\u6E90",
        "\u5224",
        "\u62A4",
        "\u53F8",
        "\u8DB3",
        "\u67D0",
        "\u7EC3",
        "\u5DEE",
        "\u81F4",
        "\u677F",
        "\u7530",
        "\u964D",
        "\u9ED1",
        "\u72AF",
        "\u8D1F",
        "\u51FB",
        "\u8303",
        "\u7EE7",
        "\u5174",
        "\u4F3C",
        "\u4F59",
        "\u575A",
        "\u66F2",
        "\u8F93",
        "\u4FEE",
        "\u6545",
        "\u57CE",
        "\u592B",
        "\u591F",
        "\u9001",
        "\u7B14",
        "\u8239",
        "\u5360",
        "\u53F3",
        "\u8D22",
        "\u5403",
        "\u5BCC",
        "\u6625",
        "\u804C",
        "\u89C9",
        "\u6C49",
        "\u753B",
        "\u529F",
        "\u5DF4",
        "\u8DDF",
        "\u867D",
        "\u6742",
        "\u98DE",
        "\u68C0",
        "\u5438",
        "\u52A9",
        "\u5347",
        "\u9633",
        "\u4E92",
        "\u521D",
        "\u521B",
        "\u6297",
        "\u8003",
        "\u6295",
        "\u574F",
        "\u7B56",
        "\u53E4",
        "\u5F84",
        "\u6362",
        "\u672A",
        "\u8DD1",
        "\u7559",
        "\u94A2",
        "\u66FE",
        "\u7AEF",
        "\u8D23",
        "\u7AD9",
        "\u7B80",
        "\u8FF0",
        "\u94B1",
        "\u526F",
        "\u5C3D",
        "\u5E1D",
        "\u5C04",
        "\u8349",
        "\u51B2",
        "\u627F",
        "\u72EC",
        "\u4EE4",
        "\u9650",
        "\u963F",
        "\u5BA3",
        "\u73AF",
        "\u53CC",
        "\u8BF7",
        "\u8D85",
        "\u5FAE",
        "\u8BA9",
        "\u63A7",
        "\u5DDE",
        "\u826F",
        "\u8F74",
        "\u627E",
        "\u5426",
        "\u7EAA",
        "\u76CA",
        "\u4F9D",
        "\u4F18",
        "\u9876",
        "\u7840",
        "\u8F7D",
        "\u5012",
        "\u623F",
        "\u7A81",
        "\u5750",
        "\u7C89",
        "\u654C",
        "\u7565",
        "\u5BA2",
        "\u8881",
        "\u51B7",
        "\u80DC",
        "\u7EDD",
        "\u6790",
        "\u5757",
        "\u5242",
        "\u6D4B",
        "\u4E1D",
        "\u534F",
        "\u8BC9",
        "\u5FF5",
        "\u9648",
        "\u4ECD",
        "\u7F57",
        "\u76D0",
        "\u53CB",
        "\u6D0B",
        "\u9519",
        "\u82E6",
        "\u591C",
        "\u5211",
        "\u79FB",
        "\u9891",
        "\u9010",
        "\u9760",
        "\u6DF7",
        "\u6BCD",
        "\u77ED",
        "\u76AE",
        "\u7EC8",
        "\u805A",
        "\u6C7D",
        "\u6751",
        "\u4E91",
        "\u54EA",
        "\u65E2",
        "\u8DDD",
        "\u536B",
        "\u505C",
        "\u70C8",
        "\u592E",
        "\u5BDF",
        "\u70E7",
        "\u8FC5",
        "\u5883",
        "\u82E5",
        "\u5370",
        "\u6D32",
        "\u523B",
        "\u62EC",
        "\u6FC0",
        "\u5B54",
        "\u641E",
        "\u751A",
        "\u5BA4",
        "\u5F85",
        "\u6838",
        "\u6821",
        "\u6563",
        "\u4FB5",
        "\u5427",
        "\u7532",
        "\u6E38",
        "\u4E45",
        "\u83DC",
        "\u5473",
        "\u65E7",
        "\u6A21",
        "\u6E56",
        "\u8D27",
        "\u635F",
        "\u9884",
        "\u963B",
        "\u6BEB",
        "\u666E",
        "\u7A33",
        "\u4E59",
        "\u5988",
        "\u690D",
        "\u606F",
        "\u6269",
        "\u94F6",
        "\u8BED",
        "\u6325",
        "\u9152",
        "\u5B88",
        "\u62FF",
        "\u5E8F",
        "\u7EB8",
        "\u533B",
        "\u7F3A",
        "\u96E8",
        "\u5417",
        "\u9488",
        "\u5218",
        "\u554A",
        "\u6025",
        "\u5531",
        "\u8BEF",
        "\u8BAD",
        "\u613F",
        "\u5BA1",
        "\u9644",
        "\u83B7",
        "\u8336",
        "\u9C9C",
        "\u7CAE",
        "\u65A4",
        "\u5B69",
        "\u8131",
        "\u786B",
        "\u80A5",
        "\u5584",
        "\u9F99",
        "\u6F14",
        "\u7236",
        "\u6E10",
        "\u8840",
        "\u6B22",
        "\u68B0",
        "\u638C",
        "\u6B4C",
        "\u6C99",
        "\u521A",
        "\u653B",
        "\u8C13",
        "\u76FE",
        "\u8BA8",
        "\u665A",
        "\u7C92",
        "\u4E71",
        "\u71C3",
        "\u77DB",
        "\u4E4E",
        "\u6740",
        "\u836F",
        "\u5B81",
        "\u9C81",
        "\u8D35",
        "\u949F",
        "\u7164",
        "\u8BFB",
        "\u73ED",
        "\u4F2F",
        "\u9999",
        "\u4ECB",
        "\u8FEB",
        "\u53E5",
        "\u4E30",
        "\u57F9",
        "\u63E1",
        "\u5170",
        "\u62C5",
        "\u5F26",
        "\u86CB",
        "\u6C89",
        "\u5047",
        "\u7A7F",
        "\u6267",
        "\u7B54",
        "\u4E50",
        "\u8C01",
        "\u987A",
        "\u70DF",
        "\u7F29",
        "\u5F81",
        "\u8138",
        "\u559C",
        "\u677E",
        "\u811A",
        "\u56F0",
        "\u5F02",
        "\u514D",
        "\u80CC",
        "\u661F",
        "\u798F",
        "\u4E70",
        "\u67D3",
        "\u4E95",
        "\u6982",
        "\u6162",
        "\u6015",
        "\u78C1",
        "\u500D",
        "\u7956",
        "\u7687",
        "\u4FC3",
        "\u9759",
        "\u8865",
        "\u8BC4",
        "\u7FFB",
        "\u8089",
        "\u8DF5",
        "\u5C3C",
        "\u8863",
        "\u5BBD",
        "\u626C",
        "\u68C9",
        "\u5E0C",
        "\u4F24",
        "\u64CD",
        "\u5782",
        "\u79CB",
        "\u5B9C",
        "\u6C22",
        "\u5957",
        "\u7763",
        "\u632F",
        "\u67B6",
        "\u4EAE",
        "\u672B",
        "\u5BAA",
        "\u5E86",
        "\u7F16",
        "\u725B",
        "\u89E6",
        "\u6620",
        "\u96F7",
        "\u9500",
        "\u8BD7",
        "\u5EA7",
        "\u5C45",
        "\u6293",
        "\u88C2",
        "\u80DE",
        "\u547C",
        "\u5A18",
        "\u666F",
        "\u5A01",
        "\u7EFF",
        "\u6676",
        "\u539A",
        "\u76DF",
        "\u8861",
        "\u9E21",
        "\u5B59",
        "\u5EF6",
        "\u5371",
        "\u80F6",
        "\u5C4B",
        "\u4E61",
        "\u4E34",
        "\u9646",
        "\u987E",
        "\u6389",
        "\u5440",
        "\u706F",
        "\u5C81",
        "\u63AA",
        "\u675F",
        "\u8010",
        "\u5267",
        "\u7389",
        "\u8D75",
        "\u8DF3",
        "\u54E5",
        "\u5B63",
        "\u8BFE",
        "\u51EF",
        "\u80E1",
        "\u989D",
        "\u6B3E",
        "\u7ECD",
        "\u5377",
        "\u9F50",
        "\u4F1F",
        "\u84B8",
        "\u6B96",
        "\u6C38",
        "\u5B97",
        "\u82D7",
        "\u5DDD",
        "\u7089",
        "\u5CA9",
        "\u5F31",
        "\u96F6",
        "\u6768",
        "\u594F",
        "\u6CBF",
        "\u9732",
        "\u6746",
        "\u63A2",
        "\u6ED1",
        "\u9547",
        "\u996D",
        "\u6D53",
        "\u822A",
        "\u6000",
        "\u8D76",
        "\u5E93",
        "\u593A",
        "\u4F0A",
        "\u7075",
        "\u7A0E",
        "\u9014",
        "\u706D",
        "\u8D5B",
        "\u5F52",
        "\u53EC",
        "\u9F13",
        "\u64AD",
        "\u76D8",
        "\u88C1",
        "\u9669",
        "\u5EB7",
        "\u552F",
        "\u5F55",
        "\u83CC",
        "\u7EAF",
        "\u501F",
        "\u7CD6",
        "\u76D6",
        "\u6A2A",
        "\u7B26",
        "\u79C1",
        "\u52AA",
        "\u5802",
        "\u57DF",
        "\u67AA",
        "\u6DA6",
        "\u5E45",
        "\u54C8",
        "\u7ADF",
        "\u719F",
        "\u866B",
        "\u6CFD",
        "\u8111",
        "\u58E4",
        "\u78B3",
        "\u6B27",
        "\u904D",
        "\u4FA7",
        "\u5BE8",
        "\u6562",
        "\u5F7B",
        "\u8651",
        "\u659C",
        "\u8584",
        "\u5EAD",
        "\u7EB3",
        "\u5F39",
        "\u9972",
        "\u4F38",
        "\u6298",
        "\u9EA6",
        "\u6E7F",
        "\u6697",
        "\u8377",
        "\u74E6",
        "\u585E",
        "\u5E8A",
        "\u7B51",
        "\u6076",
        "\u6237",
        "\u8BBF",
        "\u5854",
        "\u5947",
        "\u900F",
        "\u6881",
        "\u5200",
        "\u65CB",
        "\u8FF9",
        "\u5361",
        "\u6C2F",
        "\u9047",
        "\u4EFD",
        "\u6BD2",
        "\u6CE5",
        "\u9000",
        "\u6D17",
        "\u6446",
        "\u7070",
        "\u5F69",
        "\u5356",
        "\u8017",
        "\u590F",
        "\u62E9",
        "\u5FD9",
        "\u94DC",
        "\u732E",
        "\u786C",
        "\u4E88",
        "\u7E41",
        "\u5708",
        "\u96EA",
        "\u51FD",
        "\u4EA6",
        "\u62BD",
        "\u7BC7",
        "\u9635",
        "\u9634",
        "\u4E01",
        "\u5C3A",
        "\u8FFD",
        "\u5806",
        "\u96C4",
        "\u8FCE",
        "\u6CDB",
        "\u7238",
        "\u697C",
        "\u907F",
        "\u8C0B",
        "\u5428",
        "\u91CE",
        "\u732A",
        "\u65D7",
        "\u7D2F",
        "\u504F",
        "\u5178",
        "\u9986",
        "\u7D22",
        "\u79E6",
        "\u8102",
        "\u6F6E",
        "\u7237",
        "\u8C46",
        "\u5FFD",
        "\u6258",
        "\u60CA",
        "\u5851",
        "\u9057",
        "\u6108",
        "\u6731",
        "\u66FF",
        "\u7EA4",
        "\u7C97",
        "\u503E",
        "\u5C1A",
        "\u75DB",
        "\u695A",
        "\u8C22",
        "\u594B",
        "\u8D2D",
        "\u78E8",
        "\u541B",
        "\u6C60",
        "\u65C1",
        "\u788E",
        "\u9AA8",
        "\u76D1",
        "\u6355",
        "\u5F1F",
        "\u66B4",
        "\u5272",
        "\u8D2F",
        "\u6B8A",
        "\u91CA",
        "\u8BCD",
        "\u4EA1",
        "\u58C1",
        "\u987F",
        "\u5B9D",
        "\u5348",
        "\u5C18",
        "\u95FB",
        "\u63ED",
        "\u70AE",
        "\u6B8B",
        "\u51AC",
        "\u6865",
        "\u5987",
        "\u8B66",
        "\u7EFC",
        "\u62DB",
        "\u5434",
        "\u4ED8",
        "\u6D6E",
        "\u906D",
        "\u5F90",
        "\u60A8",
        "\u6447",
        "\u8C37",
        "\u8D5E",
        "\u7BB1",
        "\u9694",
        "\u8BA2",
        "\u7537",
        "\u5439",
        "\u56ED",
        "\u7EB7",
        "\u5510",
        "\u8D25",
        "\u5B8B",
        "\u73BB",
        "\u5DE8",
        "\u8015",
        "\u5766",
        "\u8363",
        "\u95ED",
        "\u6E7E",
        "\u952E",
        "\u51E1",
        "\u9A7B",
        "\u9505",
        "\u6551",
        "\u6069",
        "\u5265",
        "\u51DD",
        "\u78B1",
        "\u9F7F",
        "\u622A",
        "\u70BC",
        "\u9EBB",
        "\u7EBA",
        "\u7981",
        "\u5E9F",
        "\u76DB",
        "\u7248",
        "\u7F13",
        "\u51C0",
        "\u775B",
        "\u660C",
        "\u5A5A",
        "\u6D89",
        "\u7B52",
        "\u5634",
        "\u63D2",
        "\u5CB8",
        "\u6717",
        "\u5E84",
        "\u8857",
        "\u85CF",
        "\u59D1",
        "\u8D38",
        "\u8150",
        "\u5974",
        "\u5566",
        "\u60EF",
        "\u4E58",
        "\u4F19",
        "\u6062",
        "\u5300",
        "\u7EB1",
        "\u624E",
        "\u8FA9",
        "\u8033",
        "\u5F6A",
        "\u81E3",
        "\u4EBF",
        "\u7483",
        "\u62B5",
        "\u8109",
        "\u79C0",
        "\u8428",
        "\u4FC4",
        "\u7F51",
        "\u821E",
        "\u5E97",
        "\u55B7",
        "\u7EB5",
        "\u5BF8",
        "\u6C57",
        "\u6302",
        "\u6D2A",
        "\u8D3A",
        "\u95EA",
        "\u67EC",
        "\u7206",
        "\u70EF",
        "\u6D25",
        "\u7A3B",
        "\u5899",
        "\u8F6F",
        "\u52C7",
        "\u50CF",
        "\u6EDA",
        "\u5398",
        "\u8499",
        "\u82B3",
        "\u80AF",
        "\u5761",
        "\u67F1",
        "\u8361",
        "\u817F",
        "\u4EEA",
        "\u65C5",
        "\u5C3E",
        "\u8F67",
        "\u51B0",
        "\u8D21",
        "\u767B",
        "\u9ECE",
        "\u524A",
        "\u94BB",
        "\u52D2",
        "\u9003",
        "\u969C",
        "\u6C28",
        "\u90ED",
        "\u5CF0",
        "\u5E01",
        "\u6E2F",
        "\u4F0F",
        "\u8F68",
        "\u4EA9",
        "\u6BD5",
        "\u64E6",
        "\u83AB",
        "\u523A",
        "\u6D6A",
        "\u79D8",
        "\u63F4",
        "\u682A",
        "\u5065",
        "\u552E",
        "\u80A1",
        "\u5C9B",
        "\u7518",
        "\u6CE1",
        "\u7761",
        "\u7AE5",
        "\u94F8",
        "\u6C64",
        "\u9600",
        "\u4F11",
        "\u6C47",
        "\u820D",
        "\u7267",
        "\u7ED5",
        "\u70B8",
        "\u54F2",
        "\u78F7",
        "\u7EE9",
        "\u670B",
        "\u6DE1",
        "\u5C16",
        "\u542F",
        "\u9677",
        "\u67F4",
        "\u5448",
        "\u5F92",
        "\u989C",
        "\u6CEA",
        "\u7A0D",
        "\u5FD8",
        "\u6CF5",
        "\u84DD",
        "\u62D6",
        "\u6D1E",
        "\u6388",
        "\u955C",
        "\u8F9B",
        "\u58EE",
        "\u950B",
        "\u8D2B",
        "\u865A",
        "\u5F2F",
        "\u6469",
        "\u6CF0",
        "\u5E7C",
        "\u5EF7",
        "\u5C0A",
        "\u7A97",
        "\u7EB2",
        "\u5F04",
        "\u96B6",
        "\u7591",
        "\u6C0F",
        "\u5BAB",
        "\u59D0",
        "\u9707",
        "\u745E",
        "\u602A",
        "\u5C24",
        "\u7434",
        "\u5FAA",
        "\u63CF",
        "\u819C",
        "\u8FDD",
        "\u5939",
        "\u8170",
        "\u7F18",
        "\u73E0",
        "\u7A77",
        "\u68EE",
        "\u679D",
        "\u7AF9",
        "\u6C9F",
        "\u50AC",
        "\u7EF3",
        "\u5FC6",
        "\u90A6",
        "\u5269",
        "\u5E78",
        "\u6D46",
        "\u680F",
        "\u62E5",
        "\u7259",
        "\u8D2E",
        "\u793C",
        "\u6EE4",
        "\u94A0",
        "\u7EB9",
        "\u7F62",
        "\u62CD",
        "\u54B1",
        "\u558A",
        "\u8896",
        "\u57C3",
        "\u52E4",
        "\u7F5A",
        "\u7126",
        "\u6F5C",
        "\u4F0D",
        "\u58A8",
        "\u6B32",
        "\u7F1D",
        "\u59D3",
        "\u520A",
        "\u9971",
        "\u4EFF",
        "\u5956",
        "\u94DD",
        "\u9B3C",
        "\u4E3D",
        "\u8DE8",
        "\u9ED8",
        "\u6316",
        "\u94FE",
        "\u626B",
        "\u559D",
        "\u888B",
        "\u70AD",
        "\u6C61",
        "\u5E55",
        "\u8BF8",
        "\u5F27",
        "\u52B1",
        "\u6885",
        "\u5976",
        "\u6D01",
        "\u707E",
        "\u821F",
        "\u9274",
        "\u82EF",
        "\u8BBC",
        "\u62B1",
        "\u6BC1",
        "\u61C2",
        "\u5BD2",
        "\u667A",
        "\u57D4",
        "\u5BC4",
        "\u5C4A",
        "\u8DC3",
        "\u6E21",
        "\u6311",
        "\u4E39",
        "\u8270",
        "\u8D1D",
        "\u78B0",
        "\u62D4",
        "\u7239",
        "\u6234",
        "\u7801",
        "\u68A6",
        "\u82BD",
        "\u7194",
        "\u8D64",
        "\u6E14",
        "\u54ED",
        "\u656C",
        "\u9897",
        "\u5954",
        "\u94C5",
        "\u4EF2",
        "\u864E",
        "\u7A00",
        "\u59B9",
        "\u4E4F",
        "\u73CD",
        "\u7533",
        "\u684C",
        "\u9075",
        "\u5141",
        "\u9686",
        "\u87BA",
        "\u4ED3",
        "\u9B4F",
        "\u9510",
        "\u6653",
        "\u6C2E",
        "\u517C",
        "\u9690",
        "\u788D",
        "\u8D6B",
        "\u62E8",
        "\u5FE0",
        "\u8083",
        "\u7F38",
        "\u7275",
        "\u62A2",
        "\u535A",
        "\u5DE7",
        "\u58F3",
        "\u5144",
        "\u675C",
        "\u8BAF",
        "\u8BDA",
        "\u78A7",
        "\u7965",
        "\u67EF",
        "\u9875",
        "\u5DE1",
        "\u77E9",
        "\u60B2",
        "\u704C",
        "\u9F84",
        "\u4F26",
        "\u7968",
        "\u5BFB",
        "\u6842",
        "\u94FA",
        "\u5723",
        "\u6050",
        "\u6070",
        "\u90D1",
        "\u8DA3",
        "\u62AC",
        "\u8352",
        "\u817E",
        "\u8D34",
        "\u67D4",
        "\u6EF4",
        "\u731B",
        "\u9614",
        "\u8F86",
        "\u59BB",
        "\u586B",
        "\u64A4",
        "\u50A8",
        "\u7B7E",
        "\u95F9",
        "\u6270",
        "\u7D2B",
        "\u7802",
        "\u9012",
        "\u620F",
        "\u540A",
        "\u9676",
        "\u4F10",
        "\u5582",
        "\u7597",
        "\u74F6",
        "\u5A46",
        "\u629A",
        "\u81C2",
        "\u6478",
        "\u5FCD",
        "\u867E",
        "\u8721",
        "\u90BB",
        "\u80F8",
        "\u5DE9",
        "\u6324",
        "\u5076",
        "\u5F03",
        "\u69FD",
        "\u52B2",
        "\u4E73",
        "\u9093",
        "\u5409",
        "\u4EC1",
        "\u70C2",
        "\u7816",
        "\u79DF",
        "\u4E4C",
        "\u8230",
        "\u4F34",
        "\u74DC",
        "\u6D45",
        "\u4E19",
        "\u6682",
        "\u71E5",
        "\u6A61",
        "\u67F3",
        "\u8FF7",
        "\u6696",
        "\u724C",
        "\u79E7",
        "\u80C6",
        "\u8BE6",
        "\u7C27",
        "\u8E0F",
        "\u74F7",
        "\u8C31",
        "\u5446",
        "\u5BBE",
        "\u7CCA",
        "\u6D1B",
        "\u8F89",
        "\u6124",
        "\u7ADE",
        "\u9699",
        "\u6012",
        "\u7C98",
        "\u4E43",
        "\u7EEA",
        "\u80A9",
        "\u7C4D",
        "\u654F",
        "\u6D82",
        "\u7199",
        "\u7686",
        "\u4FA6",
        "\u60AC",
        "\u6398",
        "\u4EAB",
        "\u7EA0",
        "\u9192",
        "\u72C2",
        "\u9501",
        "\u6DC0",
        "\u6068",
        "\u7272",
        "\u9738",
        "\u722C",
        "\u8D4F",
        "\u9006",
        "\u73A9",
        "\u9675",
        "\u795D",
        "\u79D2",
        "\u6D59",
        "\u8C8C",
        "\u5F79",
        "\u5F7C",
        "\u6089",
        "\u9E2D",
        "\u8D8B",
        "\u51E4",
        "\u6668",
        "\u755C",
        "\u8F88",
        "\u79E9",
        "\u5375",
        "\u7F72",
        "\u68AF",
        "\u708E",
        "\u6EE9",
        "\u68CB",
        "\u9A71",
        "\u7B5B",
        "\u5CE1",
        "\u5192",
        "\u5565",
        "\u5BFF",
        "\u8BD1",
        "\u6D78",
        "\u6CC9",
        "\u5E3D",
        "\u8FDF",
        "\u7845",
        "\u7586",
        "\u8D37",
        "\u6F0F",
        "\u7A3F",
        "\u51A0",
        "\u5AE9",
        "\u80C1",
        "\u82AF",
        "\u7262",
        "\u53DB",
        "\u8680",
        "\u5965",
        "\u9E23",
        "\u5CAD",
        "\u7F8A",
        "\u51ED",
        "\u4E32",
        "\u5858",
        "\u7ED8",
        "\u9175",
        "\u878D",
        "\u76C6",
        "\u9521",
        "\u5E99",
        "\u7B79",
        "\u51BB",
        "\u8F85",
        "\u6444",
        "\u88AD",
        "\u7B4B",
        "\u62D2",
        "\u50DA",
        "\u65F1",
        "\u94BE",
        "\u9E1F",
        "\u6F06",
        "\u6C88",
        "\u7709",
        "\u758F",
        "\u6DFB",
        "\u68D2",
        "\u7A57",
        "\u785D",
        "\u97E9",
        "\u903C",
        "\u626D",
        "\u4FA8",
        "\u51C9",
        "\u633A",
        "\u7897",
        "\u683D",
        "\u7092",
        "\u676F",
        "\u60A3",
        "\u998F",
        "\u529D",
        "\u8C6A",
        "\u8FBD",
        "\u52C3",
        "\u9E3F",
        "\u65E6",
        "\u540F",
        "\u62DC",
        "\u72D7",
        "\u57CB",
        "\u8F8A",
        "\u63A9",
        "\u996E",
        "\u642C",
        "\u9A82",
        "\u8F9E",
        "\u52FE",
        "\u6263",
        "\u4F30",
        "\u848B",
        "\u7ED2",
        "\u96FE",
        "\u4E08",
        "\u6735",
        "\u59C6",
        "\u62DF",
        "\u5B87",
        "\u8F91",
        "\u9655",
        "\u96D5",
        "\u507F",
        "\u84C4",
        "\u5D07",
        "\u526A",
        "\u5021",
        "\u5385",
        "\u54AC",
        "\u9A76",
        "\u85AF",
        "\u5237",
        "\u65A5",
        "\u756A",
        "\u8D4B",
        "\u5949",
        "\u4F5B",
        "\u6D47",
        "\u6F2B",
        "\u66FC",
        "\u6247",
        "\u9499",
        "\u6843",
        "\u6276",
        "\u4ED4",
        "\u8FD4",
        "\u4FD7",
        "\u4E8F",
        "\u8154",
        "\u978B",
        "\u68F1",
        "\u8986",
        "\u6846",
        "\u6084",
        "\u53D4",
        "\u649E",
        "\u9A97",
        "\u52D8",
        "\u65FA",
        "\u6CB8",
        "\u5B64",
        "\u5410",
        "\u5B5F",
        "\u6E20",
        "\u5C48",
        "\u75BE",
        "\u5999",
        "\u60DC",
        "\u4EF0",
        "\u72E0",
        "\u80C0",
        "\u8C10",
        "\u629B",
        "\u9709",
        "\u6851",
        "\u5C97",
        "\u561B",
        "\u8870",
        "\u76D7",
        "\u6E17",
        "\u810F",
        "\u8D56",
        "\u6D8C",
        "\u751C",
        "\u66F9",
        "\u9605",
        "\u808C",
        "\u54E9",
        "\u5389",
        "\u70C3",
        "\u7EAC",
        "\u6BC5",
        "\u6628",
        "\u4F2A",
        "\u75C7",
        "\u716E",
        "\u53F9",
        "\u9489",
        "\u642D",
        "\u830E",
        "\u7B3C",
        "\u9177",
        "\u5077",
        "\u5F13",
        "\u9525",
        "\u6052",
        "\u6770",
        "\u5751",
        "\u9F3B",
        "\u7FFC",
        "\u7EB6",
        "\u53D9",
        "\u72F1",
        "\u902E",
        "\u7F50",
        "\u7EDC",
        "\u68DA",
        "\u6291",
        "\u81A8",
        "\u852C",
        "\u5BFA",
        "\u9AA4",
        "\u7A46",
        "\u51B6",
        "\u67AF",
        "\u518C",
        "\u5C38",
        "\u51F8",
        "\u7EC5",
        "\u576F",
        "\u727A",
        "\u7130",
        "\u8F70",
        "\u6B23",
        "\u664B",
        "\u7626",
        "\u5FA1",
        "\u952D",
        "\u9526",
        "\u4E27",
        "\u65EC",
        "\u953B",
        "\u5784",
        "\u641C",
        "\u6251",
        "\u9080",
        "\u4EAD",
        "\u916F",
        "\u8FC8",
        "\u8212",
        "\u8106",
        "\u9176",
        "\u95F2",
        "\u5FE7",
        "\u915A",
        "\u987D",
        "\u7FBD",
        "\u6DA8",
        "\u5378",
        "\u4ED7",
        "\u966A",
        "\u8F9F",
        "\u60E9",
        "\u676D",
        "\u59DA",
        "\u809A",
        "\u6349",
        "\u98D8",
        "\u6F02",
        "\u6606",
        "\u6B3A",
        "\u543E",
        "\u90CE",
        "\u70F7",
        "\u6C41",
        "\u5475",
        "\u9970",
        "\u8427",
        "\u96C5",
        "\u90AE",
        "\u8FC1",
        "\u71D5",
        "\u6492",
        "\u59FB",
        "\u8D74",
        "\u5BB4",
        "\u70E6",
        "\u503A",
        "\u5E10",
        "\u6591",
        "\u94C3",
        "\u65E8",
        "\u9187",
        "\u8463",
        "\u997C",
        "\u96CF",
        "\u59FF",
        "\u62CC",
        "\u5085",
        "\u8179",
        "\u59A5",
        "\u63C9",
        "\u8D24",
        "\u62C6",
        "\u6B6A",
        "\u8461",
        "\u80FA",
        "\u4E22",
        "\u6D69",
        "\u5FBD",
        "\u6602",
        "\u57AB",
        "\u6321",
        "\u89C8",
        "\u8D2A",
        "\u6170",
        "\u7F34",
        "\u6C6A",
        "\u614C",
        "\u51AF",
        "\u8BFA",
        "\u59DC",
        "\u8C0A",
        "\u51F6",
        "\u52A3",
        "\u8BEC",
        "\u8000",
        "\u660F",
        "\u8EBA",
        "\u76C8",
        "\u9A91",
        "\u4E54",
        "\u6EAA",
        "\u4E1B",
        "\u5362",
        "\u62B9",
        "\u95F7",
        "\u54A8",
        "\u522E",
        "\u9A7E",
        "\u7F06",
        "\u609F",
        "\u6458",
        "\u94D2",
        "\u63B7",
        "\u9887",
        "\u5E7B",
        "\u67C4",
        "\u60E0",
        "\u60E8",
        "\u4F73",
        "\u4EC7",
        "\u814A",
        "\u7A9D",
        "\u6DA4",
        "\u5251",
        "\u77A7",
        "\u5821",
        "\u6CFC",
        "\u8471",
        "\u7F69",
        "\u970D",
        "\u635E",
        "\u80CE",
        "\u82CD",
        "\u6EE8",
        "\u4FE9",
        "\u6345",
        "\u6E58",
        "\u780D",
        "\u971E",
        "\u90B5",
        "\u8404",
        "\u75AF",
        "\u6DEE",
        "\u9042",
        "\u718A",
        "\u7CAA",
        "\u70D8",
        "\u5BBF",
        "\u6863",
        "\u6208",
        "\u9A73",
        "\u5AC2",
        "\u88D5",
        "\u5F99",
        "\u7BAD",
        "\u6350",
        "\u80A0",
        "\u6491",
        "\u6652",
        "\u8FA8",
        "\u6BBF",
        "\u83B2",
        "\u644A",
        "\u6405",
        "\u9171",
        "\u5C4F",
        "\u75AB",
        "\u54C0",
        "\u8521",
        "\u5835",
        "\u6CAB",
        "\u76B1",
        "\u7545",
        "\u53E0",
        "\u9601",
        "\u83B1",
        "\u6572",
        "\u8F96",
        "\u94A9",
        "\u75D5",
        "\u575D",
        "\u5DF7",
        "\u997F",
        "\u7978",
        "\u4E18",
        "\u7384",
        "\u6E9C",
        "\u66F0",
        "\u903B",
        "\u5F6D",
        "\u5C1D",
        "\u537F",
        "\u59A8",
        "\u8247",
        "\u541E",
        "\u97E6",
        "\u6028",
        "\u77EE",
        "\u6B47"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/chinese_traditional.json
  var require_chinese_traditional = __commonJS({
    "node_modules/bip39/src/wordlists/chinese_traditional.json"(exports, module) {
      module.exports = [
        "\u7684",
        "\u4E00",
        "\u662F",
        "\u5728",
        "\u4E0D",
        "\u4E86",
        "\u6709",
        "\u548C",
        "\u4EBA",
        "\u9019",
        "\u4E2D",
        "\u5927",
        "\u70BA",
        "\u4E0A",
        "\u500B",
        "\u570B",
        "\u6211",
        "\u4EE5",
        "\u8981",
        "\u4ED6",
        "\u6642",
        "\u4F86",
        "\u7528",
        "\u5011",
        "\u751F",
        "\u5230",
        "\u4F5C",
        "\u5730",
        "\u65BC",
        "\u51FA",
        "\u5C31",
        "\u5206",
        "\u5C0D",
        "\u6210",
        "\u6703",
        "\u53EF",
        "\u4E3B",
        "\u767C",
        "\u5E74",
        "\u52D5",
        "\u540C",
        "\u5DE5",
        "\u4E5F",
        "\u80FD",
        "\u4E0B",
        "\u904E",
        "\u5B50",
        "\u8AAA",
        "\u7522",
        "\u7A2E",
        "\u9762",
        "\u800C",
        "\u65B9",
        "\u5F8C",
        "\u591A",
        "\u5B9A",
        "\u884C",
        "\u5B78",
        "\u6CD5",
        "\u6240",
        "\u6C11",
        "\u5F97",
        "\u7D93",
        "\u5341",
        "\u4E09",
        "\u4E4B",
        "\u9032",
        "\u8457",
        "\u7B49",
        "\u90E8",
        "\u5EA6",
        "\u5BB6",
        "\u96FB",
        "\u529B",
        "\u88E1",
        "\u5982",
        "\u6C34",
        "\u5316",
        "\u9AD8",
        "\u81EA",
        "\u4E8C",
        "\u7406",
        "\u8D77",
        "\u5C0F",
        "\u7269",
        "\u73FE",
        "\u5BE6",
        "\u52A0",
        "\u91CF",
        "\u90FD",
        "\u5169",
        "\u9AD4",
        "\u5236",
        "\u6A5F",
        "\u7576",
        "\u4F7F",
        "\u9EDE",
        "\u5F9E",
        "\u696D",
        "\u672C",
        "\u53BB",
        "\u628A",
        "\u6027",
        "\u597D",
        "\u61C9",
        "\u958B",
        "\u5B83",
        "\u5408",
        "\u9084",
        "\u56E0",
        "\u7531",
        "\u5176",
        "\u4E9B",
        "\u7136",
        "\u524D",
        "\u5916",
        "\u5929",
        "\u653F",
        "\u56DB",
        "\u65E5",
        "\u90A3",
        "\u793E",
        "\u7FA9",
        "\u4E8B",
        "\u5E73",
        "\u5F62",
        "\u76F8",
        "\u5168",
        "\u8868",
        "\u9593",
        "\u6A23",
        "\u8207",
        "\u95DC",
        "\u5404",
        "\u91CD",
        "\u65B0",
        "\u7DDA",
        "\u5167",
        "\u6578",
        "\u6B63",
        "\u5FC3",
        "\u53CD",
        "\u4F60",
        "\u660E",
        "\u770B",
        "\u539F",
        "\u53C8",
        "\u9EBC",
        "\u5229",
        "\u6BD4",
        "\u6216",
        "\u4F46",
        "\u8CEA",
        "\u6C23",
        "\u7B2C",
        "\u5411",
        "\u9053",
        "\u547D",
        "\u6B64",
        "\u8B8A",
        "\u689D",
        "\u53EA",
        "\u6C92",
        "\u7D50",
        "\u89E3",
        "\u554F",
        "\u610F",
        "\u5EFA",
        "\u6708",
        "\u516C",
        "\u7121",
        "\u7CFB",
        "\u8ECD",
        "\u5F88",
        "\u60C5",
        "\u8005",
        "\u6700",
        "\u7ACB",
        "\u4EE3",
        "\u60F3",
        "\u5DF2",
        "\u901A",
        "\u4E26",
        "\u63D0",
        "\u76F4",
        "\u984C",
        "\u9EE8",
        "\u7A0B",
        "\u5C55",
        "\u4E94",
        "\u679C",
        "\u6599",
        "\u8C61",
        "\u54E1",
        "\u9769",
        "\u4F4D",
        "\u5165",
        "\u5E38",
        "\u6587",
        "\u7E3D",
        "\u6B21",
        "\u54C1",
        "\u5F0F",
        "\u6D3B",
        "\u8A2D",
        "\u53CA",
        "\u7BA1",
        "\u7279",
        "\u4EF6",
        "\u9577",
        "\u6C42",
        "\u8001",
        "\u982D",
        "\u57FA",
        "\u8CC7",
        "\u908A",
        "\u6D41",
        "\u8DEF",
        "\u7D1A",
        "\u5C11",
        "\u5716",
        "\u5C71",
        "\u7D71",
        "\u63A5",
        "\u77E5",
        "\u8F03",
        "\u5C07",
        "\u7D44",
        "\u898B",
        "\u8A08",
        "\u5225",
        "\u5979",
        "\u624B",
        "\u89D2",
        "\u671F",
        "\u6839",
        "\u8AD6",
        "\u904B",
        "\u8FB2",
        "\u6307",
        "\u5E7E",
        "\u4E5D",
        "\u5340",
        "\u5F37",
        "\u653E",
        "\u6C7A",
        "\u897F",
        "\u88AB",
        "\u5E79",
        "\u505A",
        "\u5FC5",
        "\u6230",
        "\u5148",
        "\u56DE",
        "\u5247",
        "\u4EFB",
        "\u53D6",
        "\u64DA",
        "\u8655",
        "\u968A",
        "\u5357",
        "\u7D66",
        "\u8272",
        "\u5149",
        "\u9580",
        "\u5373",
        "\u4FDD",
        "\u6CBB",
        "\u5317",
        "\u9020",
        "\u767E",
        "\u898F",
        "\u71B1",
        "\u9818",
        "\u4E03",
        "\u6D77",
        "\u53E3",
        "\u6771",
        "\u5C0E",
        "\u5668",
        "\u58D3",
        "\u5FD7",
        "\u4E16",
        "\u91D1",
        "\u589E",
        "\u722D",
        "\u6FDF",
        "\u968E",
        "\u6CB9",
        "\u601D",
        "\u8853",
        "\u6975",
        "\u4EA4",
        "\u53D7",
        "\u806F",
        "\u4EC0",
        "\u8A8D",
        "\u516D",
        "\u5171",
        "\u6B0A",
        "\u6536",
        "\u8B49",
        "\u6539",
        "\u6E05",
        "\u7F8E",
        "\u518D",
        "\u63A1",
        "\u8F49",
        "\u66F4",
        "\u55AE",
        "\u98A8",
        "\u5207",
        "\u6253",
        "\u767D",
        "\u6559",
        "\u901F",
        "\u82B1",
        "\u5E36",
        "\u5B89",
        "\u5834",
        "\u8EAB",
        "\u8ECA",
        "\u4F8B",
        "\u771F",
        "\u52D9",
        "\u5177",
        "\u842C",
        "\u6BCF",
        "\u76EE",
        "\u81F3",
        "\u9054",
        "\u8D70",
        "\u7A4D",
        "\u793A",
        "\u8B70",
        "\u8072",
        "\u5831",
        "\u9B25",
        "\u5B8C",
        "\u985E",
        "\u516B",
        "\u96E2",
        "\u83EF",
        "\u540D",
        "\u78BA",
        "\u624D",
        "\u79D1",
        "\u5F35",
        "\u4FE1",
        "\u99AC",
        "\u7BC0",
        "\u8A71",
        "\u7C73",
        "\u6574",
        "\u7A7A",
        "\u5143",
        "\u6CC1",
        "\u4ECA",
        "\u96C6",
        "\u6EAB",
        "\u50B3",
        "\u571F",
        "\u8A31",
        "\u6B65",
        "\u7FA4",
        "\u5EE3",
        "\u77F3",
        "\u8A18",
        "\u9700",
        "\u6BB5",
        "\u7814",
        "\u754C",
        "\u62C9",
        "\u6797",
        "\u5F8B",
        "\u53EB",
        "\u4E14",
        "\u7A76",
        "\u89C0",
        "\u8D8A",
        "\u7E54",
        "\u88DD",
        "\u5F71",
        "\u7B97",
        "\u4F4E",
        "\u6301",
        "\u97F3",
        "\u773E",
        "\u66F8",
        "\u5E03",
        "\u590D",
        "\u5BB9",
        "\u5152",
        "\u9808",
        "\u969B",
        "\u5546",
        "\u975E",
        "\u9A57",
        "\u9023",
        "\u65B7",
        "\u6DF1",
        "\u96E3",
        "\u8FD1",
        "\u7926",
        "\u5343",
        "\u9031",
        "\u59D4",
        "\u7D20",
        "\u6280",
        "\u5099",
        "\u534A",
        "\u8FA6",
        "\u9752",
        "\u7701",
        "\u5217",
        "\u7FD2",
        "\u97FF",
        "\u7D04",
        "\u652F",
        "\u822C",
        "\u53F2",
        "\u611F",
        "\u52DE",
        "\u4FBF",
        "\u5718",
        "\u5F80",
        "\u9178",
        "\u6B77",
        "\u5E02",
        "\u514B",
        "\u4F55",
        "\u9664",
        "\u6D88",
        "\u69CB",
        "\u5E9C",
        "\u7A31",
        "\u592A",
        "\u6E96",
        "\u7CBE",
        "\u503C",
        "\u865F",
        "\u7387",
        "\u65CF",
        "\u7DAD",
        "\u5283",
        "\u9078",
        "\u6A19",
        "\u5BEB",
        "\u5B58",
        "\u5019",
        "\u6BDB",
        "\u89AA",
        "\u5FEB",
        "\u6548",
        "\u65AF",
        "\u9662",
        "\u67E5",
        "\u6C5F",
        "\u578B",
        "\u773C",
        "\u738B",
        "\u6309",
        "\u683C",
        "\u990A",
        "\u6613",
        "\u7F6E",
        "\u6D3E",
        "\u5C64",
        "\u7247",
        "\u59CB",
        "\u537B",
        "\u5C08",
        "\u72C0",
        "\u80B2",
        "\u5EE0",
        "\u4EAC",
        "\u8B58",
        "\u9069",
        "\u5C6C",
        "\u5713",
        "\u5305",
        "\u706B",
        "\u4F4F",
        "\u8ABF",
        "\u6EFF",
        "\u7E23",
        "\u5C40",
        "\u7167",
        "\u53C3",
        "\u7D05",
        "\u7D30",
        "\u5F15",
        "\u807D",
        "\u8A72",
        "\u9435",
        "\u50F9",
        "\u56B4",
        "\u9996",
        "\u5E95",
        "\u6DB2",
        "\u5B98",
        "\u5FB7",
        "\u96A8",
        "\u75C5",
        "\u8607",
        "\u5931",
        "\u723E",
        "\u6B7B",
        "\u8B1B",
        "\u914D",
        "\u5973",
        "\u9EC3",
        "\u63A8",
        "\u986F",
        "\u8AC7",
        "\u7F6A",
        "\u795E",
        "\u85DD",
        "\u5462",
        "\u5E2D",
        "\u542B",
        "\u4F01",
        "\u671B",
        "\u5BC6",
        "\u6279",
        "\u71DF",
        "\u9805",
        "\u9632",
        "\u8209",
        "\u7403",
        "\u82F1",
        "\u6C27",
        "\u52E2",
        "\u544A",
        "\u674E",
        "\u53F0",
        "\u843D",
        "\u6728",
        "\u5E6B",
        "\u8F2A",
        "\u7834",
        "\u4E9E",
        "\u5E2B",
        "\u570D",
        "\u6CE8",
        "\u9060",
        "\u5B57",
        "\u6750",
        "\u6392",
        "\u4F9B",
        "\u6CB3",
        "\u614B",
        "\u5C01",
        "\u53E6",
        "\u65BD",
        "\u6E1B",
        "\u6A39",
        "\u6EB6",
        "\u600E",
        "\u6B62",
        "\u6848",
        "\u8A00",
        "\u58EB",
        "\u5747",
        "\u6B66",
        "\u56FA",
        "\u8449",
        "\u9B5A",
        "\u6CE2",
        "\u8996",
        "\u50C5",
        "\u8CBB",
        "\u7DCA",
        "\u611B",
        "\u5DE6",
        "\u7AE0",
        "\u65E9",
        "\u671D",
        "\u5BB3",
        "\u7E8C",
        "\u8F15",
        "\u670D",
        "\u8A66",
        "\u98DF",
        "\u5145",
        "\u5175",
        "\u6E90",
        "\u5224",
        "\u8B77",
        "\u53F8",
        "\u8DB3",
        "\u67D0",
        "\u7DF4",
        "\u5DEE",
        "\u81F4",
        "\u677F",
        "\u7530",
        "\u964D",
        "\u9ED1",
        "\u72AF",
        "\u8CA0",
        "\u64CA",
        "\u8303",
        "\u7E7C",
        "\u8208",
        "\u4F3C",
        "\u9918",
        "\u5805",
        "\u66F2",
        "\u8F38",
        "\u4FEE",
        "\u6545",
        "\u57CE",
        "\u592B",
        "\u5920",
        "\u9001",
        "\u7B46",
        "\u8239",
        "\u4F54",
        "\u53F3",
        "\u8CA1",
        "\u5403",
        "\u5BCC",
        "\u6625",
        "\u8077",
        "\u89BA",
        "\u6F22",
        "\u756B",
        "\u529F",
        "\u5DF4",
        "\u8DDF",
        "\u96D6",
        "\u96DC",
        "\u98DB",
        "\u6AA2",
        "\u5438",
        "\u52A9",
        "\u6607",
        "\u967D",
        "\u4E92",
        "\u521D",
        "\u5275",
        "\u6297",
        "\u8003",
        "\u6295",
        "\u58DE",
        "\u7B56",
        "\u53E4",
        "\u5F91",
        "\u63DB",
        "\u672A",
        "\u8DD1",
        "\u7559",
        "\u92FC",
        "\u66FE",
        "\u7AEF",
        "\u8CAC",
        "\u7AD9",
        "\u7C21",
        "\u8FF0",
        "\u9322",
        "\u526F",
        "\u76E1",
        "\u5E1D",
        "\u5C04",
        "\u8349",
        "\u885D",
        "\u627F",
        "\u7368",
        "\u4EE4",
        "\u9650",
        "\u963F",
        "\u5BA3",
        "\u74B0",
        "\u96D9",
        "\u8ACB",
        "\u8D85",
        "\u5FAE",
        "\u8B93",
        "\u63A7",
        "\u5DDE",
        "\u826F",
        "\u8EF8",
        "\u627E",
        "\u5426",
        "\u7D00",
        "\u76CA",
        "\u4F9D",
        "\u512A",
        "\u9802",
        "\u790E",
        "\u8F09",
        "\u5012",
        "\u623F",
        "\u7A81",
        "\u5750",
        "\u7C89",
        "\u6575",
        "\u7565",
        "\u5BA2",
        "\u8881",
        "\u51B7",
        "\u52DD",
        "\u7D55",
        "\u6790",
        "\u584A",
        "\u5291",
        "\u6E2C",
        "\u7D72",
        "\u5354",
        "\u8A34",
        "\u5FF5",
        "\u9673",
        "\u4ECD",
        "\u7F85",
        "\u9E7D",
        "\u53CB",
        "\u6D0B",
        "\u932F",
        "\u82E6",
        "\u591C",
        "\u5211",
        "\u79FB",
        "\u983B",
        "\u9010",
        "\u9760",
        "\u6DF7",
        "\u6BCD",
        "\u77ED",
        "\u76AE",
        "\u7D42",
        "\u805A",
        "\u6C7D",
        "\u6751",
        "\u96F2",
        "\u54EA",
        "\u65E2",
        "\u8DDD",
        "\u885B",
        "\u505C",
        "\u70C8",
        "\u592E",
        "\u5BDF",
        "\u71D2",
        "\u8FC5",
        "\u5883",
        "\u82E5",
        "\u5370",
        "\u6D32",
        "\u523B",
        "\u62EC",
        "\u6FC0",
        "\u5B54",
        "\u641E",
        "\u751A",
        "\u5BA4",
        "\u5F85",
        "\u6838",
        "\u6821",
        "\u6563",
        "\u4FB5",
        "\u5427",
        "\u7532",
        "\u904A",
        "\u4E45",
        "\u83DC",
        "\u5473",
        "\u820A",
        "\u6A21",
        "\u6E56",
        "\u8CA8",
        "\u640D",
        "\u9810",
        "\u963B",
        "\u6BEB",
        "\u666E",
        "\u7A69",
        "\u4E59",
        "\u5ABD",
        "\u690D",
        "\u606F",
        "\u64F4",
        "\u9280",
        "\u8A9E",
        "\u63EE",
        "\u9152",
        "\u5B88",
        "\u62FF",
        "\u5E8F",
        "\u7D19",
        "\u91AB",
        "\u7F3A",
        "\u96E8",
        "\u55CE",
        "\u91DD",
        "\u5289",
        "\u554A",
        "\u6025",
        "\u5531",
        "\u8AA4",
        "\u8A13",
        "\u9858",
        "\u5BE9",
        "\u9644",
        "\u7372",
        "\u8336",
        "\u9BAE",
        "\u7CE7",
        "\u65A4",
        "\u5B69",
        "\u812B",
        "\u786B",
        "\u80A5",
        "\u5584",
        "\u9F8D",
        "\u6F14",
        "\u7236",
        "\u6F38",
        "\u8840",
        "\u6B61",
        "\u68B0",
        "\u638C",
        "\u6B4C",
        "\u6C99",
        "\u525B",
        "\u653B",
        "\u8B02",
        "\u76FE",
        "\u8A0E",
        "\u665A",
        "\u7C92",
        "\u4E82",
        "\u71C3",
        "\u77DB",
        "\u4E4E",
        "\u6BBA",
        "\u85E5",
        "\u5BE7",
        "\u9B6F",
        "\u8CB4",
        "\u9418",
        "\u7164",
        "\u8B80",
        "\u73ED",
        "\u4F2F",
        "\u9999",
        "\u4ECB",
        "\u8FEB",
        "\u53E5",
        "\u8C50",
        "\u57F9",
        "\u63E1",
        "\u862D",
        "\u64D4",
        "\u5F26",
        "\u86CB",
        "\u6C89",
        "\u5047",
        "\u7A7F",
        "\u57F7",
        "\u7B54",
        "\u6A02",
        "\u8AB0",
        "\u9806",
        "\u7159",
        "\u7E2E",
        "\u5FB5",
        "\u81C9",
        "\u559C",
        "\u677E",
        "\u8173",
        "\u56F0",
        "\u7570",
        "\u514D",
        "\u80CC",
        "\u661F",
        "\u798F",
        "\u8CB7",
        "\u67D3",
        "\u4E95",
        "\u6982",
        "\u6162",
        "\u6015",
        "\u78C1",
        "\u500D",
        "\u7956",
        "\u7687",
        "\u4FC3",
        "\u975C",
        "\u88DC",
        "\u8A55",
        "\u7FFB",
        "\u8089",
        "\u8E10",
        "\u5C3C",
        "\u8863",
        "\u5BEC",
        "\u63DA",
        "\u68C9",
        "\u5E0C",
        "\u50B7",
        "\u64CD",
        "\u5782",
        "\u79CB",
        "\u5B9C",
        "\u6C2B",
        "\u5957",
        "\u7763",
        "\u632F",
        "\u67B6",
        "\u4EAE",
        "\u672B",
        "\u61B2",
        "\u6176",
        "\u7DE8",
        "\u725B",
        "\u89F8",
        "\u6620",
        "\u96F7",
        "\u92B7",
        "\u8A69",
        "\u5EA7",
        "\u5C45",
        "\u6293",
        "\u88C2",
        "\u80DE",
        "\u547C",
        "\u5A18",
        "\u666F",
        "\u5A01",
        "\u7DA0",
        "\u6676",
        "\u539A",
        "\u76DF",
        "\u8861",
        "\u96DE",
        "\u5B6B",
        "\u5EF6",
        "\u5371",
        "\u81A0",
        "\u5C4B",
        "\u9109",
        "\u81E8",
        "\u9678",
        "\u9867",
        "\u6389",
        "\u5440",
        "\u71C8",
        "\u6B72",
        "\u63AA",
        "\u675F",
        "\u8010",
        "\u5287",
        "\u7389",
        "\u8D99",
        "\u8DF3",
        "\u54E5",
        "\u5B63",
        "\u8AB2",
        "\u51F1",
        "\u80E1",
        "\u984D",
        "\u6B3E",
        "\u7D39",
        "\u5377",
        "\u9F4A",
        "\u5049",
        "\u84B8",
        "\u6B96",
        "\u6C38",
        "\u5B97",
        "\u82D7",
        "\u5DDD",
        "\u7210",
        "\u5CA9",
        "\u5F31",
        "\u96F6",
        "\u694A",
        "\u594F",
        "\u6CBF",
        "\u9732",
        "\u687F",
        "\u63A2",
        "\u6ED1",
        "\u93AE",
        "\u98EF",
        "\u6FC3",
        "\u822A",
        "\u61F7",
        "\u8D95",
        "\u5EAB",
        "\u596A",
        "\u4F0A",
        "\u9748",
        "\u7A05",
        "\u9014",
        "\u6EC5",
        "\u8CFD",
        "\u6B78",
        "\u53EC",
        "\u9F13",
        "\u64AD",
        "\u76E4",
        "\u88C1",
        "\u96AA",
        "\u5EB7",
        "\u552F",
        "\u9304",
        "\u83CC",
        "\u7D14",
        "\u501F",
        "\u7CD6",
        "\u84CB",
        "\u6A6B",
        "\u7B26",
        "\u79C1",
        "\u52AA",
        "\u5802",
        "\u57DF",
        "\u69CD",
        "\u6F64",
        "\u5E45",
        "\u54C8",
        "\u7ADF",
        "\u719F",
        "\u87F2",
        "\u6FA4",
        "\u8166",
        "\u58E4",
        "\u78B3",
        "\u6B50",
        "\u904D",
        "\u5074",
        "\u5BE8",
        "\u6562",
        "\u5FB9",
        "\u616E",
        "\u659C",
        "\u8584",
        "\u5EAD",
        "\u7D0D",
        "\u5F48",
        "\u98FC",
        "\u4F38",
        "\u6298",
        "\u9EA5",
        "\u6FD5",
        "\u6697",
        "\u8377",
        "\u74E6",
        "\u585E",
        "\u5E8A",
        "\u7BC9",
        "\u60E1",
        "\u6236",
        "\u8A2A",
        "\u5854",
        "\u5947",
        "\u900F",
        "\u6881",
        "\u5200",
        "\u65CB",
        "\u8DE1",
        "\u5361",
        "\u6C2F",
        "\u9047",
        "\u4EFD",
        "\u6BD2",
        "\u6CE5",
        "\u9000",
        "\u6D17",
        "\u64FA",
        "\u7070",
        "\u5F69",
        "\u8CE3",
        "\u8017",
        "\u590F",
        "\u64C7",
        "\u5FD9",
        "\u9285",
        "\u737B",
        "\u786C",
        "\u4E88",
        "\u7E41",
        "\u5708",
        "\u96EA",
        "\u51FD",
        "\u4EA6",
        "\u62BD",
        "\u7BC7",
        "\u9663",
        "\u9670",
        "\u4E01",
        "\u5C3A",
        "\u8FFD",
        "\u5806",
        "\u96C4",
        "\u8FCE",
        "\u6CDB",
        "\u7238",
        "\u6A13",
        "\u907F",
        "\u8B00",
        "\u5678",
        "\u91CE",
        "\u8C6C",
        "\u65D7",
        "\u7D2F",
        "\u504F",
        "\u5178",
        "\u9928",
        "\u7D22",
        "\u79E6",
        "\u8102",
        "\u6F6E",
        "\u723A",
        "\u8C46",
        "\u5FFD",
        "\u6258",
        "\u9A5A",
        "\u5851",
        "\u907A",
        "\u6108",
        "\u6731",
        "\u66FF",
        "\u7E96",
        "\u7C97",
        "\u50BE",
        "\u5C1A",
        "\u75DB",
        "\u695A",
        "\u8B1D",
        "\u596E",
        "\u8CFC",
        "\u78E8",
        "\u541B",
        "\u6C60",
        "\u65C1",
        "\u788E",
        "\u9AA8",
        "\u76E3",
        "\u6355",
        "\u5F1F",
        "\u66B4",
        "\u5272",
        "\u8CAB",
        "\u6B8A",
        "\u91CB",
        "\u8A5E",
        "\u4EA1",
        "\u58C1",
        "\u9813",
        "\u5BF6",
        "\u5348",
        "\u5875",
        "\u805E",
        "\u63ED",
        "\u70AE",
        "\u6B98",
        "\u51AC",
        "\u6A4B",
        "\u5A66",
        "\u8B66",
        "\u7D9C",
        "\u62DB",
        "\u5433",
        "\u4ED8",
        "\u6D6E",
        "\u906D",
        "\u5F90",
        "\u60A8",
        "\u6416",
        "\u8C37",
        "\u8D0A",
        "\u7BB1",
        "\u9694",
        "\u8A02",
        "\u7537",
        "\u5439",
        "\u5712",
        "\u7D1B",
        "\u5510",
        "\u6557",
        "\u5B8B",
        "\u73BB",
        "\u5DE8",
        "\u8015",
        "\u5766",
        "\u69AE",
        "\u9589",
        "\u7063",
        "\u9375",
        "\u51E1",
        "\u99D0",
        "\u934B",
        "\u6551",
        "\u6069",
        "\u525D",
        "\u51DD",
        "\u9E7C",
        "\u9F52",
        "\u622A",
        "\u7149",
        "\u9EBB",
        "\u7D21",
        "\u7981",
        "\u5EE2",
        "\u76DB",
        "\u7248",
        "\u7DE9",
        "\u6DE8",
        "\u775B",
        "\u660C",
        "\u5A5A",
        "\u6D89",
        "\u7B52",
        "\u5634",
        "\u63D2",
        "\u5CB8",
        "\u6717",
        "\u838A",
        "\u8857",
        "\u85CF",
        "\u59D1",
        "\u8CBF",
        "\u8150",
        "\u5974",
        "\u5566",
        "\u6163",
        "\u4E58",
        "\u5925",
        "\u6062",
        "\u52FB",
        "\u7D17",
        "\u624E",
        "\u8FAF",
        "\u8033",
        "\u5F6A",
        "\u81E3",
        "\u5104",
        "\u7483",
        "\u62B5",
        "\u8108",
        "\u79C0",
        "\u85A9",
        "\u4FC4",
        "\u7DB2",
        "\u821E",
        "\u5E97",
        "\u5674",
        "\u7E31",
        "\u5BF8",
        "\u6C57",
        "\u639B",
        "\u6D2A",
        "\u8CC0",
        "\u9583",
        "\u67EC",
        "\u7206",
        "\u70EF",
        "\u6D25",
        "\u7A3B",
        "\u7246",
        "\u8EDF",
        "\u52C7",
        "\u50CF",
        "\u6EFE",
        "\u5398",
        "\u8499",
        "\u82B3",
        "\u80AF",
        "\u5761",
        "\u67F1",
        "\u76EA",
        "\u817F",
        "\u5100",
        "\u65C5",
        "\u5C3E",
        "\u8ECB",
        "\u51B0",
        "\u8CA2",
        "\u767B",
        "\u9ECE",
        "\u524A",
        "\u947D",
        "\u52D2",
        "\u9003",
        "\u969C",
        "\u6C28",
        "\u90ED",
        "\u5CF0",
        "\u5E63",
        "\u6E2F",
        "\u4F0F",
        "\u8ECC",
        "\u755D",
        "\u7562",
        "\u64E6",
        "\u83AB",
        "\u523A",
        "\u6D6A",
        "\u79D8",
        "\u63F4",
        "\u682A",
        "\u5065",
        "\u552E",
        "\u80A1",
        "\u5CF6",
        "\u7518",
        "\u6CE1",
        "\u7761",
        "\u7AE5",
        "\u9444",
        "\u6E6F",
        "\u95A5",
        "\u4F11",
        "\u532F",
        "\u820D",
        "\u7267",
        "\u7E5E",
        "\u70B8",
        "\u54F2",
        "\u78F7",
        "\u7E3E",
        "\u670B",
        "\u6DE1",
        "\u5C16",
        "\u555F",
        "\u9677",
        "\u67F4",
        "\u5448",
        "\u5F92",
        "\u984F",
        "\u6DDA",
        "\u7A0D",
        "\u5FD8",
        "\u6CF5",
        "\u85CD",
        "\u62D6",
        "\u6D1E",
        "\u6388",
        "\u93E1",
        "\u8F9B",
        "\u58EF",
        "\u92D2",
        "\u8CA7",
        "\u865B",
        "\u5F4E",
        "\u6469",
        "\u6CF0",
        "\u5E7C",
        "\u5EF7",
        "\u5C0A",
        "\u7A97",
        "\u7DB1",
        "\u5F04",
        "\u96B8",
        "\u7591",
        "\u6C0F",
        "\u5BAE",
        "\u59D0",
        "\u9707",
        "\u745E",
        "\u602A",
        "\u5C24",
        "\u7434",
        "\u5FAA",
        "\u63CF",
        "\u819C",
        "\u9055",
        "\u593E",
        "\u8170",
        "\u7DE3",
        "\u73E0",
        "\u7AAE",
        "\u68EE",
        "\u679D",
        "\u7AF9",
        "\u6E9D",
        "\u50AC",
        "\u7E69",
        "\u61B6",
        "\u90A6",
        "\u5269",
        "\u5E78",
        "\u6F3F",
        "\u6B04",
        "\u64C1",
        "\u7259",
        "\u8CAF",
        "\u79AE",
        "\u6FFE",
        "\u9209",
        "\u7D0B",
        "\u7F77",
        "\u62CD",
        "\u54B1",
        "\u558A",
        "\u8896",
        "\u57C3",
        "\u52E4",
        "\u7F70",
        "\u7126",
        "\u6F5B",
        "\u4F0D",
        "\u58A8",
        "\u6B32",
        "\u7E2B",
        "\u59D3",
        "\u520A",
        "\u98FD",
        "\u4EFF",
        "\u734E",
        "\u92C1",
        "\u9B3C",
        "\u9E97",
        "\u8DE8",
        "\u9ED8",
        "\u6316",
        "\u93C8",
        "\u6383",
        "\u559D",
        "\u888B",
        "\u70AD",
        "\u6C61",
        "\u5E55",
        "\u8AF8",
        "\u5F27",
        "\u52F5",
        "\u6885",
        "\u5976",
        "\u6F54",
        "\u707D",
        "\u821F",
        "\u9451",
        "\u82EF",
        "\u8A1F",
        "\u62B1",
        "\u6BC0",
        "\u61C2",
        "\u5BD2",
        "\u667A",
        "\u57D4",
        "\u5BC4",
        "\u5C46",
        "\u8E8D",
        "\u6E21",
        "\u6311",
        "\u4E39",
        "\u8271",
        "\u8C9D",
        "\u78B0",
        "\u62D4",
        "\u7239",
        "\u6234",
        "\u78BC",
        "\u5922",
        "\u82BD",
        "\u7194",
        "\u8D64",
        "\u6F01",
        "\u54ED",
        "\u656C",
        "\u9846",
        "\u5954",
        "\u925B",
        "\u4EF2",
        "\u864E",
        "\u7A00",
        "\u59B9",
        "\u4E4F",
        "\u73CD",
        "\u7533",
        "\u684C",
        "\u9075",
        "\u5141",
        "\u9686",
        "\u87BA",
        "\u5009",
        "\u9B4F",
        "\u92B3",
        "\u66C9",
        "\u6C2E",
        "\u517C",
        "\u96B1",
        "\u7919",
        "\u8D6B",
        "\u64A5",
        "\u5FE0",
        "\u8085",
        "\u7F38",
        "\u727D",
        "\u6436",
        "\u535A",
        "\u5DE7",
        "\u6BBC",
        "\u5144",
        "\u675C",
        "\u8A0A",
        "\u8AA0",
        "\u78A7",
        "\u7965",
        "\u67EF",
        "\u9801",
        "\u5DE1",
        "\u77E9",
        "\u60B2",
        "\u704C",
        "\u9F61",
        "\u502B",
        "\u7968",
        "\u5C0B",
        "\u6842",
        "\u92EA",
        "\u8056",
        "\u6050",
        "\u6070",
        "\u912D",
        "\u8DA3",
        "\u62AC",
        "\u8352",
        "\u9A30",
        "\u8CBC",
        "\u67D4",
        "\u6EF4",
        "\u731B",
        "\u95CA",
        "\u8F1B",
        "\u59BB",
        "\u586B",
        "\u64A4",
        "\u5132",
        "\u7C3D",
        "\u9B27",
        "\u64FE",
        "\u7D2B",
        "\u7802",
        "\u905E",
        "\u6232",
        "\u540A",
        "\u9676",
        "\u4F10",
        "\u9935",
        "\u7642",
        "\u74F6",
        "\u5A46",
        "\u64AB",
        "\u81C2",
        "\u6478",
        "\u5FCD",
        "\u8766",
        "\u881F",
        "\u9130",
        "\u80F8",
        "\u978F",
        "\u64E0",
        "\u5076",
        "\u68C4",
        "\u69FD",
        "\u52C1",
        "\u4E73",
        "\u9127",
        "\u5409",
        "\u4EC1",
        "\u721B",
        "\u78DA",
        "\u79DF",
        "\u70CF",
        "\u8266",
        "\u4F34",
        "\u74DC",
        "\u6DFA",
        "\u4E19",
        "\u66AB",
        "\u71E5",
        "\u6A61",
        "\u67F3",
        "\u8FF7",
        "\u6696",
        "\u724C",
        "\u79E7",
        "\u81BD",
        "\u8A73",
        "\u7C27",
        "\u8E0F",
        "\u74F7",
        "\u8B5C",
        "\u5446",
        "\u8CD3",
        "\u7CCA",
        "\u6D1B",
        "\u8F1D",
        "\u61A4",
        "\u7AF6",
        "\u9699",
        "\u6012",
        "\u7C98",
        "\u4E43",
        "\u7DD2",
        "\u80A9",
        "\u7C4D",
        "\u654F",
        "\u5857",
        "\u7199",
        "\u7686",
        "\u5075",
        "\u61F8",
        "\u6398",
        "\u4EAB",
        "\u7CFE",
        "\u9192",
        "\u72C2",
        "\u9396",
        "\u6DC0",
        "\u6068",
        "\u7272",
        "\u9738",
        "\u722C",
        "\u8CDE",
        "\u9006",
        "\u73A9",
        "\u9675",
        "\u795D",
        "\u79D2",
        "\u6D59",
        "\u8C8C",
        "\u5F79",
        "\u5F7C",
        "\u6089",
        "\u9D28",
        "\u8DA8",
        "\u9CF3",
        "\u6668",
        "\u755C",
        "\u8F29",
        "\u79E9",
        "\u5375",
        "\u7F72",
        "\u68AF",
        "\u708E",
        "\u7058",
        "\u68CB",
        "\u9A45",
        "\u7BE9",
        "\u5CFD",
        "\u5192",
        "\u5565",
        "\u58FD",
        "\u8B6F",
        "\u6D78",
        "\u6CC9",
        "\u5E3D",
        "\u9072",
        "\u77FD",
        "\u7586",
        "\u8CB8",
        "\u6F0F",
        "\u7A3F",
        "\u51A0",
        "\u5AE9",
        "\u8105",
        "\u82AF",
        "\u7262",
        "\u53DB",
        "\u8755",
        "\u5967",
        "\u9CF4",
        "\u5DBA",
        "\u7F8A",
        "\u6191",
        "\u4E32",
        "\u5858",
        "\u7E6A",
        "\u9175",
        "\u878D",
        "\u76C6",
        "\u932B",
        "\u5EDF",
        "\u7C4C",
        "\u51CD",
        "\u8F14",
        "\u651D",
        "\u8972",
        "\u7B4B",
        "\u62D2",
        "\u50DA",
        "\u65F1",
        "\u9240",
        "\u9CE5",
        "\u6F06",
        "\u6C88",
        "\u7709",
        "\u758F",
        "\u6DFB",
        "\u68D2",
        "\u7A57",
        "\u785D",
        "\u97D3",
        "\u903C",
        "\u626D",
        "\u50D1",
        "\u6DBC",
        "\u633A",
        "\u7897",
        "\u683D",
        "\u7092",
        "\u676F",
        "\u60A3",
        "\u993E",
        "\u52F8",
        "\u8C6A",
        "\u907C",
        "\u52C3",
        "\u9D3B",
        "\u65E6",
        "\u540F",
        "\u62DC",
        "\u72D7",
        "\u57CB",
        "\u8F25",
        "\u63A9",
        "\u98F2",
        "\u642C",
        "\u7F75",
        "\u8FAD",
        "\u52FE",
        "\u6263",
        "\u4F30",
        "\u8523",
        "\u7D68",
        "\u9727",
        "\u4E08",
        "\u6735",
        "\u59C6",
        "\u64EC",
        "\u5B87",
        "\u8F2F",
        "\u965D",
        "\u96D5",
        "\u511F",
        "\u84C4",
        "\u5D07",
        "\u526A",
        "\u5021",
        "\u5EF3",
        "\u54AC",
        "\u99DB",
        "\u85AF",
        "\u5237",
        "\u65A5",
        "\u756A",
        "\u8CE6",
        "\u5949",
        "\u4F5B",
        "\u6F86",
        "\u6F2B",
        "\u66FC",
        "\u6247",
        "\u9223",
        "\u6843",
        "\u6276",
        "\u4ED4",
        "\u8FD4",
        "\u4FD7",
        "\u8667",
        "\u8154",
        "\u978B",
        "\u68F1",
        "\u8986",
        "\u6846",
        "\u6084",
        "\u53D4",
        "\u649E",
        "\u9A19",
        "\u52D8",
        "\u65FA",
        "\u6CB8",
        "\u5B64",
        "\u5410",
        "\u5B5F",
        "\u6E20",
        "\u5C48",
        "\u75BE",
        "\u5999",
        "\u60DC",
        "\u4EF0",
        "\u72E0",
        "\u8139",
        "\u8AE7",
        "\u62CB",
        "\u9EF4",
        "\u6851",
        "\u5D17",
        "\u561B",
        "\u8870",
        "\u76DC",
        "\u6EF2",
        "\u81DF",
        "\u8CF4",
        "\u6E67",
        "\u751C",
        "\u66F9",
        "\u95B1",
        "\u808C",
        "\u54E9",
        "\u53B2",
        "\u70F4",
        "\u7DEF",
        "\u6BC5",
        "\u6628",
        "\u507D",
        "\u75C7",
        "\u716E",
        "\u5606",
        "\u91D8",
        "\u642D",
        "\u8396",
        "\u7C60",
        "\u9177",
        "\u5077",
        "\u5F13",
        "\u9310",
        "\u6046",
        "\u5091",
        "\u5751",
        "\u9F3B",
        "\u7FFC",
        "\u7DB8",
        "\u6558",
        "\u7344",
        "\u902E",
        "\u7F50",
        "\u7D61",
        "\u68DA",
        "\u6291",
        "\u81A8",
        "\u852C",
        "\u5BFA",
        "\u9A5F",
        "\u7A46",
        "\u51B6",
        "\u67AF",
        "\u518A",
        "\u5C4D",
        "\u51F8",
        "\u7D33",
        "\u576F",
        "\u72A7",
        "\u7130",
        "\u8F5F",
        "\u6B23",
        "\u6649",
        "\u7626",
        "\u79A6",
        "\u9320",
        "\u9326",
        "\u55AA",
        "\u65EC",
        "\u935B",
        "\u58DF",
        "\u641C",
        "\u64B2",
        "\u9080",
        "\u4EAD",
        "\u916F",
        "\u9081",
        "\u8212",
        "\u8106",
        "\u9176",
        "\u9592",
        "\u6182",
        "\u915A",
        "\u9811",
        "\u7FBD",
        "\u6F32",
        "\u5378",
        "\u4ED7",
        "\u966A",
        "\u95E2",
        "\u61F2",
        "\u676D",
        "\u59DA",
        "\u809A",
        "\u6349",
        "\u98C4",
        "\u6F02",
        "\u6606",
        "\u6B3A",
        "\u543E",
        "\u90CE",
        "\u70F7",
        "\u6C41",
        "\u5475",
        "\u98FE",
        "\u856D",
        "\u96C5",
        "\u90F5",
        "\u9077",
        "\u71D5",
        "\u6492",
        "\u59FB",
        "\u8D74",
        "\u5BB4",
        "\u7169",
        "\u50B5",
        "\u5E33",
        "\u6591",
        "\u9234",
        "\u65E8",
        "\u9187",
        "\u8463",
        "\u9905",
        "\u96DB",
        "\u59FF",
        "\u62CC",
        "\u5085",
        "\u8179",
        "\u59A5",
        "\u63C9",
        "\u8CE2",
        "\u62C6",
        "\u6B6A",
        "\u8461",
        "\u80FA",
        "\u4E1F",
        "\u6D69",
        "\u5FBD",
        "\u6602",
        "\u588A",
        "\u64CB",
        "\u89BD",
        "\u8CAA",
        "\u6170",
        "\u7E73",
        "\u6C6A",
        "\u614C",
        "\u99AE",
        "\u8AFE",
        "\u59DC",
        "\u8ABC",
        "\u5147",
        "\u52A3",
        "\u8AA3",
        "\u8000",
        "\u660F",
        "\u8EBA",
        "\u76C8",
        "\u9A0E",
        "\u55AC",
        "\u6EAA",
        "\u53E2",
        "\u76E7",
        "\u62B9",
        "\u60B6",
        "\u8AEE",
        "\u522E",
        "\u99D5",
        "\u7E9C",
        "\u609F",
        "\u6458",
        "\u927A",
        "\u64F2",
        "\u9817",
        "\u5E7B",
        "\u67C4",
        "\u60E0",
        "\u6158",
        "\u4F73",
        "\u4EC7",
        "\u81D8",
        "\u7AA9",
        "\u6ECC",
        "\u528D",
        "\u77A7",
        "\u5821",
        "\u6F51",
        "\u8525",
        "\u7F69",
        "\u970D",
        "\u6488",
        "\u80CE",
        "\u84BC",
        "\u6FF1",
        "\u5006",
        "\u6345",
        "\u6E58",
        "\u780D",
        "\u971E",
        "\u90B5",
        "\u8404",
        "\u760B",
        "\u6DEE",
        "\u9042",
        "\u718A",
        "\u7CDE",
        "\u70D8",
        "\u5BBF",
        "\u6A94",
        "\u6208",
        "\u99C1",
        "\u5AC2",
        "\u88D5",
        "\u5F99",
        "\u7BAD",
        "\u6350",
        "\u8178",
        "\u6490",
        "\u66EC",
        "\u8FA8",
        "\u6BBF",
        "\u84EE",
        "\u6524",
        "\u652A",
        "\u91AC",
        "\u5C4F",
        "\u75AB",
        "\u54C0",
        "\u8521",
        "\u5835",
        "\u6CAB",
        "\u76BA",
        "\u66A2",
        "\u758A",
        "\u95A3",
        "\u840A",
        "\u6572",
        "\u8F44",
        "\u9264",
        "\u75D5",
        "\u58E9",
        "\u5DF7",
        "\u9913",
        "\u798D",
        "\u4E18",
        "\u7384",
        "\u6E9C",
        "\u66F0",
        "\u908F",
        "\u5F6D",
        "\u5617",
        "\u537F",
        "\u59A8",
        "\u8247",
        "\u541E",
        "\u97CB",
        "\u6028",
        "\u77EE",
        "\u6B47"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/korean.json
  var require_korean = __commonJS({
    "node_modules/bip39/src/wordlists/korean.json"(exports, module) {
      module.exports = [
        "\u1100\u1161\u1100\u1167\u11A8",
        "\u1100\u1161\u1101\u1173\u11B7",
        "\u1100\u1161\u1102\u1161\u11AB",
        "\u1100\u1161\u1102\u1173\u11BC",
        "\u1100\u1161\u1103\u1173\u11A8",
        "\u1100\u1161\u1105\u1173\u110E\u1175\u11B7",
        "\u1100\u1161\u1106\u116E\u11B7",
        "\u1100\u1161\u1107\u1161\u11BC",
        "\u1100\u1161\u1109\u1161\u11BC",
        "\u1100\u1161\u1109\u1173\u11B7",
        "\u1100\u1161\u110B\u116E\u11AB\u1103\u1166",
        "\u1100\u1161\u110B\u1173\u11AF",
        "\u1100\u1161\u110B\u1175\u1103\u1173",
        "\u1100\u1161\u110B\u1175\u11B8",
        "\u1100\u1161\u110C\u1161\u11BC",
        "\u1100\u1161\u110C\u1165\u11BC",
        "\u1100\u1161\u110C\u1169\u11A8",
        "\u1100\u1161\u110C\u116E\u11A8",
        "\u1100\u1161\u11A8\u110B\u1169",
        "\u1100\u1161\u11A8\u110C\u1161",
        "\u1100\u1161\u11AB\u1100\u1167\u11A8",
        "\u1100\u1161\u11AB\u1107\u116E",
        "\u1100\u1161\u11AB\u1109\u1165\u11B8",
        "\u1100\u1161\u11AB\u110C\u1161\u11BC",
        "\u1100\u1161\u11AB\u110C\u1165\u11B8",
        "\u1100\u1161\u11AB\u1111\u1161\u11AB",
        "\u1100\u1161\u11AF\u1103\u1173\u11BC",
        "\u1100\u1161\u11AF\u1107\u1175",
        "\u1100\u1161\u11AF\u1109\u1162\u11A8",
        "\u1100\u1161\u11AF\u110C\u1173\u11BC",
        "\u1100\u1161\u11B7\u1100\u1161\u11A8",
        "\u1100\u1161\u11B7\u1100\u1175",
        "\u1100\u1161\u11B7\u1109\u1169",
        "\u1100\u1161\u11B7\u1109\u116E\u1109\u1165\u11BC",
        "\u1100\u1161\u11B7\u110C\u1161",
        "\u1100\u1161\u11B7\u110C\u1165\u11BC",
        "\u1100\u1161\u11B8\u110C\u1161\u1100\u1175",
        "\u1100\u1161\u11BC\u1102\u1161\u11B7",
        "\u1100\u1161\u11BC\u1103\u1161\u11BC",
        "\u1100\u1161\u11BC\u1103\u1169",
        "\u1100\u1161\u11BC\u1105\u1167\u11A8\u1112\u1175",
        "\u1100\u1161\u11BC\u1107\u1167\u11AB",
        "\u1100\u1161\u11BC\u1107\u116E\u11A8",
        "\u1100\u1161\u11BC\u1109\u1161",
        "\u1100\u1161\u11BC\u1109\u116E\u1105\u1163\u11BC",
        "\u1100\u1161\u11BC\u110B\u1161\u110C\u1175",
        "\u1100\u1161\u11BC\u110B\u116F\u11AB\u1103\u1169",
        "\u1100\u1161\u11BC\u110B\u1174",
        "\u1100\u1161\u11BC\u110C\u1166",
        "\u1100\u1161\u11BC\u110C\u1169",
        "\u1100\u1161\u11C0\u110B\u1175",
        "\u1100\u1162\u1100\u116E\u1105\u1175",
        "\u1100\u1162\u1102\u1161\u1105\u1175",
        "\u1100\u1162\u1107\u1161\u11BC",
        "\u1100\u1162\u1107\u1167\u11AF",
        "\u1100\u1162\u1109\u1165\u11AB",
        "\u1100\u1162\u1109\u1165\u11BC",
        "\u1100\u1162\u110B\u1175\u11AB",
        "\u1100\u1162\u11A8\u1100\u116A\u11AB\u110C\u1165\u11A8",
        "\u1100\u1165\u1109\u1175\u11AF",
        "\u1100\u1165\u110B\u1162\u11A8",
        "\u1100\u1165\u110B\u116E\u11AF",
        "\u1100\u1165\u110C\u1175\u11BA",
        "\u1100\u1165\u1111\u116E\u11B7",
        "\u1100\u1165\u11A8\u110C\u1165\u11BC",
        "\u1100\u1165\u11AB\u1100\u1161\u11BC",
        "\u1100\u1165\u11AB\u1106\u116E\u11AF",
        "\u1100\u1165\u11AB\u1109\u1165\u11AF",
        "\u1100\u1165\u11AB\u110C\u1169",
        "\u1100\u1165\u11AB\u110E\u116E\u11A8",
        "\u1100\u1165\u11AF\u110B\u1173\u11B7",
        "\u1100\u1165\u11B7\u1109\u1161",
        "\u1100\u1165\u11B7\u1110\u1169",
        "\u1100\u1166\u1109\u1175\u1111\u1161\u11AB",
        "\u1100\u1166\u110B\u1175\u11B7",
        "\u1100\u1167\u110B\u116E\u11AF",
        "\u1100\u1167\u11AB\u1112\u1162",
        "\u1100\u1167\u11AF\u1100\u116A",
        "\u1100\u1167\u11AF\u1100\u116E\u11A8",
        "\u1100\u1167\u11AF\u1105\u1169\u11AB",
        "\u1100\u1167\u11AF\u1109\u1165\u11A8",
        "\u1100\u1167\u11AF\u1109\u1173\u11BC",
        "\u1100\u1167\u11AF\u1109\u1175\u11B7",
        "\u1100\u1167\u11AF\u110C\u1165\u11BC",
        "\u1100\u1167\u11AF\u1112\u1169\u11AB",
        "\u1100\u1167\u11BC\u1100\u1168",
        "\u1100\u1167\u11BC\u1100\u1169",
        "\u1100\u1167\u11BC\u1100\u1175",
        "\u1100\u1167\u11BC\u1105\u1167\u11A8",
        "\u1100\u1167\u11BC\u1107\u1169\u11A8\u1100\u116E\u11BC",
        "\u1100\u1167\u11BC\u1107\u1175",
        "\u1100\u1167\u11BC\u1109\u1161\u11BC\u1103\u1169",
        "\u1100\u1167\u11BC\u110B\u1167\u11BC",
        "\u1100\u1167\u11BC\u110B\u116E",
        "\u1100\u1167\u11BC\u110C\u1162\u11BC",
        "\u1100\u1167\u11BC\u110C\u1166",
        "\u1100\u1167\u11BC\u110C\u116E",
        "\u1100\u1167\u11BC\u110E\u1161\u11AF",
        "\u1100\u1167\u11BC\u110E\u1175",
        "\u1100\u1167\u11BC\u1112\u1163\u11BC",
        "\u1100\u1167\u11BC\u1112\u1165\u11B7",
        "\u1100\u1168\u1100\u1169\u11A8",
        "\u1100\u1168\u1103\u1161\u11AB",
        "\u1100\u1168\u1105\u1161\u11AB",
        "\u1100\u1168\u1109\u1161\u11AB",
        "\u1100\u1168\u1109\u1169\u11A8",
        "\u1100\u1168\u110B\u1163\u11A8",
        "\u1100\u1168\u110C\u1165\u11AF",
        "\u1100\u1168\u110E\u1173\u11BC",
        "\u1100\u1168\u1112\u116C\u11A8",
        "\u1100\u1169\u1100\u1162\u11A8",
        "\u1100\u1169\u1100\u116E\u1105\u1167",
        "\u1100\u1169\u1100\u116E\u11BC",
        "\u1100\u1169\u1100\u1173\u11B8",
        "\u1100\u1169\u1103\u1173\u11BC\u1112\u1161\u11A8\u1109\u1162\u11BC",
        "\u1100\u1169\u1106\u116E\u1109\u1175\u11AB",
        "\u1100\u1169\u1106\u1175\u11AB",
        "\u1100\u1169\u110B\u1163\u11BC\u110B\u1175",
        "\u1100\u1169\u110C\u1161\u11BC",
        "\u1100\u1169\u110C\u1165\u11AB",
        "\u1100\u1169\u110C\u1175\u11B8",
        "\u1100\u1169\u110E\u116E\u11BA\u1100\u1161\u1105\u116E",
        "\u1100\u1169\u1110\u1169\u11BC",
        "\u1100\u1169\u1112\u1163\u11BC",
        "\u1100\u1169\u11A8\u1109\u1175\u11A8",
        "\u1100\u1169\u11AF\u1106\u1169\u11A8",
        "\u1100\u1169\u11AF\u110D\u1161\u1100\u1175",
        "\u1100\u1169\u11AF\u1111\u1173",
        "\u1100\u1169\u11BC\u1100\u1161\u11AB",
        "\u1100\u1169\u11BC\u1100\u1162",
        "\u1100\u1169\u11BC\u1100\u1167\u11A8",
        "\u1100\u1169\u11BC\u1100\u116E\u11AB",
        "\u1100\u1169\u11BC\u1100\u1173\u11B8",
        "\u1100\u1169\u11BC\u1100\u1175",
        "\u1100\u1169\u11BC\u1103\u1169\u11BC",
        "\u1100\u1169\u11BC\u1106\u116E\u110B\u116F\u11AB",
        "\u1100\u1169\u11BC\u1107\u116E",
        "\u1100\u1169\u11BC\u1109\u1161",
        "\u1100\u1169\u11BC\u1109\u1175\u11A8",
        "\u1100\u1169\u11BC\u110B\u1165\u11B8",
        "\u1100\u1169\u11BC\u110B\u1167\u11AB",
        "\u1100\u1169\u11BC\u110B\u116F\u11AB",
        "\u1100\u1169\u11BC\u110C\u1161\u11BC",
        "\u1100\u1169\u11BC\u110D\u1161",
        "\u1100\u1169\u11BC\u110E\u1162\u11A8",
        "\u1100\u1169\u11BC\u1110\u1169\u11BC",
        "\u1100\u1169\u11BC\u1111\u1169",
        "\u1100\u1169\u11BC\u1112\u1161\u11BC",
        "\u1100\u1169\u11BC\u1112\u1172\u110B\u1175\u11AF",
        "\u1100\u116A\u1106\u1169\u11A8",
        "\u1100\u116A\u110B\u1175\u11AF",
        "\u1100\u116A\u110C\u1161\u11BC",
        "\u1100\u116A\u110C\u1165\u11BC",
        "\u1100\u116A\u1112\u1161\u11A8",
        "\u1100\u116A\u11AB\u1100\u1162\u11A8",
        "\u1100\u116A\u11AB\u1100\u1168",
        "\u1100\u116A\u11AB\u1100\u116A\u11BC",
        "\u1100\u116A\u11AB\u1102\u1167\u11B7",
        "\u1100\u116A\u11AB\u1105\u1161\u11B7",
        "\u1100\u116A\u11AB\u1105\u1167\u11AB",
        "\u1100\u116A\u11AB\u1105\u1175",
        "\u1100\u116A\u11AB\u1109\u1173\u11B8",
        "\u1100\u116A\u11AB\u1109\u1175\u11B7",
        "\u1100\u116A\u11AB\u110C\u1165\u11B7",
        "\u1100\u116A\u11AB\u110E\u1161\u11AF",
        "\u1100\u116A\u11BC\u1100\u1167\u11BC",
        "\u1100\u116A\u11BC\u1100\u1169",
        "\u1100\u116A\u11BC\u110C\u1161\u11BC",
        "\u1100\u116A\u11BC\u110C\u116E",
        "\u1100\u116C\u1105\u1169\u110B\u116E\u11B7",
        "\u1100\u116C\u11BC\u110C\u1161\u11BC\u1112\u1175",
        "\u1100\u116D\u1100\u116A\u1109\u1165",
        "\u1100\u116D\u1106\u116E\u11AB",
        "\u1100\u116D\u1107\u1169\u11A8",
        "\u1100\u116D\u1109\u1175\u11AF",
        "\u1100\u116D\u110B\u1163\u11BC",
        "\u1100\u116D\u110B\u1172\u11A8",
        "\u1100\u116D\u110C\u1161\u11BC",
        "\u1100\u116D\u110C\u1175\u11A8",
        "\u1100\u116D\u1110\u1169\u11BC",
        "\u1100\u116D\u1112\u116A\u11AB",
        "\u1100\u116D\u1112\u116E\u11AB",
        "\u1100\u116E\u1100\u1167\u11BC",
        "\u1100\u116E\u1105\u1173\u11B7",
        "\u1100\u116E\u1106\u1165\u11BC",
        "\u1100\u116E\u1107\u1167\u11AF",
        "\u1100\u116E\u1107\u116E\u11AB",
        "\u1100\u116E\u1109\u1165\u11A8",
        "\u1100\u116E\u1109\u1165\u11BC",
        "\u1100\u116E\u1109\u1169\u11A8",
        "\u1100\u116E\u110B\u1167\u11A8",
        "\u1100\u116E\u110B\u1175\u11B8",
        "\u1100\u116E\u110E\u1165\u11BC",
        "\u1100\u116E\u110E\u1166\u110C\u1165\u11A8",
        "\u1100\u116E\u11A8\u1100\u1161",
        "\u1100\u116E\u11A8\u1100\u1175",
        "\u1100\u116E\u11A8\u1102\u1162",
        "\u1100\u116E\u11A8\u1105\u1175\u11B8",
        "\u1100\u116E\u11A8\u1106\u116E\u11AF",
        "\u1100\u116E\u11A8\u1106\u1175\u11AB",
        "\u1100\u116E\u11A8\u1109\u116E",
        "\u1100\u116E\u11A8\u110B\u1165",
        "\u1100\u116E\u11A8\u110B\u116A\u11BC",
        "\u1100\u116E\u11A8\u110C\u1165\u11A8",
        "\u1100\u116E\u11A8\u110C\u1166",
        "\u1100\u116E\u11A8\u1112\u116C",
        "\u1100\u116E\u11AB\u1103\u1162",
        "\u1100\u116E\u11AB\u1109\u1161",
        "\u1100\u116E\u11AB\u110B\u1175\u11AB",
        "\u1100\u116E\u11BC\u1100\u1173\u11A8\u110C\u1165\u11A8",
        "\u1100\u116F\u11AB\u1105\u1175",
        "\u1100\u116F\u11AB\u110B\u1171",
        "\u1100\u116F\u11AB\u1110\u116E",
        "\u1100\u1171\u1100\u116E\u11A8",
        "\u1100\u1171\u1109\u1175\u11AB",
        "\u1100\u1172\u110C\u1165\u11BC",
        "\u1100\u1172\u110E\u1175\u11A8",
        "\u1100\u1172\u11AB\u1112\u1167\u11BC",
        "\u1100\u1173\u1102\u1161\u11AF",
        "\u1100\u1173\u1102\u1163\u11BC",
        "\u1100\u1173\u1102\u1173\u11AF",
        "\u1100\u1173\u1105\u1165\u1102\u1161",
        "\u1100\u1173\u1105\u116E\u11B8",
        "\u1100\u1173\u1105\u1173\u11BA",
        "\u1100\u1173\u1105\u1175\u11B7",
        "\u1100\u1173\u110C\u1166\u1109\u1165\u110B\u1163",
        "\u1100\u1173\u1110\u1169\u1105\u1169\u11A8",
        "\u1100\u1173\u11A8\u1107\u1169\u11A8",
        "\u1100\u1173\u11A8\u1112\u1175",
        "\u1100\u1173\u11AB\u1100\u1165",
        "\u1100\u1173\u11AB\u1100\u116D",
        "\u1100\u1173\u11AB\u1105\u1162",
        "\u1100\u1173\u11AB\u1105\u1169",
        "\u1100\u1173\u11AB\u1106\u116E",
        "\u1100\u1173\u11AB\u1107\u1169\u11AB",
        "\u1100\u1173\u11AB\u110B\u116F\u11AB",
        "\u1100\u1173\u11AB\u110B\u1172\u11A8",
        "\u1100\u1173\u11AB\u110E\u1165",
        "\u1100\u1173\u11AF\u110A\u1175",
        "\u1100\u1173\u11AF\u110C\u1161",
        "\u1100\u1173\u11B7\u1100\u1161\u11BC\u1109\u1161\u11AB",
        "\u1100\u1173\u11B7\u1100\u1169",
        "\u1100\u1173\u11B7\u1102\u1167\u11AB",
        "\u1100\u1173\u11B7\u1106\u1166\u1103\u1161\u11AF",
        "\u1100\u1173\u11B7\u110B\u1162\u11A8",
        "\u1100\u1173\u11B7\u110B\u1167\u11AB",
        "\u1100\u1173\u11B7\u110B\u116D\u110B\u1175\u11AF",
        "\u1100\u1173\u11B7\u110C\u1175",
        "\u1100\u1173\u11BC\u110C\u1165\u11BC\u110C\u1165\u11A8",
        "\u1100\u1175\u1100\u1161\u11AB",
        "\u1100\u1175\u1100\u116A\u11AB",
        "\u1100\u1175\u1102\u1167\u11B7",
        "\u1100\u1175\u1102\u1173\u11BC",
        "\u1100\u1175\u1103\u1169\u11A8\u1100\u116D",
        "\u1100\u1175\u1103\u116E\u11BC",
        "\u1100\u1175\u1105\u1169\u11A8",
        "\u1100\u1175\u1105\u1173\u11B7",
        "\u1100\u1175\u1107\u1165\u11B8",
        "\u1100\u1175\u1107\u1169\u11AB",
        "\u1100\u1175\u1107\u116E\u11AB",
        "\u1100\u1175\u1108\u1173\u11B7",
        "\u1100\u1175\u1109\u116E\u11A8\u1109\u1161",
        "\u1100\u1175\u1109\u116E\u11AF",
        "\u1100\u1175\u110B\u1165\u11A8",
        "\u1100\u1175\u110B\u1165\u11B8",
        "\u1100\u1175\u110B\u1169\u11AB",
        "\u1100\u1175\u110B\u116E\u11AB",
        "\u1100\u1175\u110B\u116F\u11AB",
        "\u1100\u1175\u110C\u1165\u11A8",
        "\u1100\u1175\u110C\u116E\u11AB",
        "\u1100\u1175\u110E\u1175\u11B7",
        "\u1100\u1175\u1112\u1169\u11AB",
        "\u1100\u1175\u1112\u116C\u11A8",
        "\u1100\u1175\u11AB\u1100\u1173\u11B8",
        "\u1100\u1175\u11AB\u110C\u1161\u11BC",
        "\u1100\u1175\u11AF\u110B\u1175",
        "\u1100\u1175\u11B7\u1107\u1161\u11B8",
        "\u1100\u1175\u11B7\u110E\u1175",
        "\u1100\u1175\u11B7\u1111\u1169\u1100\u1169\u11BC\u1112\u1161\u11BC",
        "\u1101\u1161\u11A8\u1103\u116E\u1100\u1175",
        "\u1101\u1161\u11B7\u1108\u1161\u11A8",
        "\u1101\u1162\u1103\u1161\u11AF\u110B\u1173\u11B7",
        "\u1101\u1162\u1109\u1169\u1100\u1173\u11B7",
        "\u1101\u1165\u11B8\u110C\u1175\u11AF",
        "\u1101\u1169\u11A8\u1103\u1162\u1100\u1175",
        "\u1101\u1169\u11BE\u110B\u1175\u11C1",
        "\u1102\u1161\u1103\u1173\u11AF\u110B\u1175",
        "\u1102\u1161\u1105\u1161\u11AB\u1112\u1175",
        "\u1102\u1161\u1106\u1165\u110C\u1175",
        "\u1102\u1161\u1106\u116E\u11AF",
        "\u1102\u1161\u110E\u1175\u11B7\u1107\u1161\u11AB",
        "\u1102\u1161\u1112\u1173\u11AF",
        "\u1102\u1161\u11A8\u110B\u1167\u11B8",
        "\u1102\u1161\u11AB\u1107\u1161\u11BC",
        "\u1102\u1161\u11AF\u1100\u1162",
        "\u1102\u1161\u11AF\u110A\u1175",
        "\u1102\u1161\u11AF\u110D\u1161",
        "\u1102\u1161\u11B7\u1102\u1167",
        "\u1102\u1161\u11B7\u1103\u1162\u1106\u116E\u11AB",
        "\u1102\u1161\u11B7\u1106\u1162",
        "\u1102\u1161\u11B7\u1109\u1161\u11AB",
        "\u1102\u1161\u11B7\u110C\u1161",
        "\u1102\u1161\u11B7\u1111\u1167\u11AB",
        "\u1102\u1161\u11B7\u1112\u1161\u11A8\u1109\u1162\u11BC",
        "\u1102\u1161\u11BC\u1107\u1175",
        "\u1102\u1161\u11C0\u1106\u1161\u11AF",
        "\u1102\u1162\u1102\u1167\u11AB",
        "\u1102\u1162\u110B\u116D\u11BC",
        "\u1102\u1162\u110B\u1175\u11AF",
        "\u1102\u1162\u11B7\u1107\u1175",
        "\u1102\u1162\u11B7\u1109\u1162",
        "\u1102\u1162\u11BA\u1106\u116E\u11AF",
        "\u1102\u1162\u11BC\u1103\u1169\u11BC",
        "\u1102\u1162\u11BC\u1106\u1167\u11AB",
        "\u1102\u1162\u11BC\u1107\u1161\u11BC",
        "\u1102\u1162\u11BC\u110C\u1161\u11BC\u1100\u1169",
        "\u1102\u1166\u11A8\u1110\u1161\u110B\u1175",
        "\u1102\u1166\u11BA\u110D\u1162",
        "\u1102\u1169\u1103\u1169\u11BC",
        "\u1102\u1169\u1105\u1161\u11AB\u1109\u1162\u11A8",
        "\u1102\u1169\u1105\u1167\u11A8",
        "\u1102\u1169\u110B\u1175\u11AB",
        "\u1102\u1169\u11A8\u110B\u1173\u11B7",
        "\u1102\u1169\u11A8\u110E\u1161",
        "\u1102\u1169\u11A8\u1112\u116A",
        "\u1102\u1169\u11AB\u1105\u1175",
        "\u1102\u1169\u11AB\u1106\u116E\u11AB",
        "\u1102\u1169\u11AB\u110C\u1162\u11BC",
        "\u1102\u1169\u11AF\u110B\u1175",
        "\u1102\u1169\u11BC\u1100\u116E",
        "\u1102\u1169\u11BC\u1103\u1161\u11B7",
        "\u1102\u1169\u11BC\u1106\u1175\u11AB",
        "\u1102\u1169\u11BC\u1107\u116E",
        "\u1102\u1169\u11BC\u110B\u1165\u11B8",
        "\u1102\u1169\u11BC\u110C\u1161\u11BC",
        "\u1102\u1169\u11BC\u110E\u1169\u11AB",
        "\u1102\u1169\u11C1\u110B\u1175",
        "\u1102\u116E\u11AB\u1103\u1169\u11BC\u110C\u1161",
        "\u1102\u116E\u11AB\u1106\u116E\u11AF",
        "\u1102\u116E\u11AB\u110A\u1165\u11B8",
        "\u1102\u1172\u110B\u116D\u11A8",
        "\u1102\u1173\u1101\u1175\u11B7",
        "\u1102\u1173\u11A8\u1103\u1162",
        "\u1102\u1173\u11BC\u1103\u1169\u11BC\u110C\u1165\u11A8",
        "\u1102\u1173\u11BC\u1105\u1167\u11A8",
        "\u1103\u1161\u1107\u1161\u11BC",
        "\u1103\u1161\u110B\u1163\u11BC\u1109\u1165\u11BC",
        "\u1103\u1161\u110B\u1173\u11B7",
        "\u1103\u1161\u110B\u1175\u110B\u1165\u1110\u1173",
        "\u1103\u1161\u1112\u1162\u11BC",
        "\u1103\u1161\u11AB\u1100\u1168",
        "\u1103\u1161\u11AB\u1100\u1169\u11AF",
        "\u1103\u1161\u11AB\u1103\u1169\u11A8",
        "\u1103\u1161\u11AB\u1106\u1161\u11BA",
        "\u1103\u1161\u11AB\u1109\u116E\u11AB",
        "\u1103\u1161\u11AB\u110B\u1165",
        "\u1103\u1161\u11AB\u110B\u1171",
        "\u1103\u1161\u11AB\u110C\u1165\u11B7",
        "\u1103\u1161\u11AB\u110E\u1166",
        "\u1103\u1161\u11AB\u110E\u116E",
        "\u1103\u1161\u11AB\u1111\u1167\u11AB",
        "\u1103\u1161\u11AB\u1111\u116E\u11BC",
        "\u1103\u1161\u11AF\u1100\u1163\u11AF",
        "\u1103\u1161\u11AF\u1105\u1165",
        "\u1103\u1161\u11AF\u1105\u1167\u11A8",
        "\u1103\u1161\u11AF\u1105\u1175",
        "\u1103\u1161\u11B0\u1100\u1169\u1100\u1175",
        "\u1103\u1161\u11B7\u1103\u1161\u11BC",
        "\u1103\u1161\u11B7\u1107\u1162",
        "\u1103\u1161\u11B7\u110B\u116D",
        "\u1103\u1161\u11B7\u110B\u1175\u11B7",
        "\u1103\u1161\u11B8\u1107\u1167\u11AB",
        "\u1103\u1161\u11B8\u110C\u1161\u11BC",
        "\u1103\u1161\u11BC\u1100\u1173\u11AB",
        "\u1103\u1161\u11BC\u1107\u116E\u11AB\u1100\u1161\u11AB",
        "\u1103\u1161\u11BC\u110B\u1167\u11AB\u1112\u1175",
        "\u1103\u1161\u11BC\u110C\u1161\u11BC",
        "\u1103\u1162\u1100\u1172\u1106\u1169",
        "\u1103\u1162\u1102\u1161\u11BD",
        "\u1103\u1162\u1103\u1161\u11AB\u1112\u1175",
        "\u1103\u1162\u1103\u1161\u11B8",
        "\u1103\u1162\u1103\u1169\u1109\u1175",
        "\u1103\u1162\u1105\u1163\u11A8",
        "\u1103\u1162\u1105\u1163\u11BC",
        "\u1103\u1162\u1105\u1172\u11A8",
        "\u1103\u1162\u1106\u116E\u11AB",
        "\u1103\u1162\u1107\u116E\u1107\u116E\u11AB",
        "\u1103\u1162\u1109\u1175\u11AB",
        "\u1103\u1162\u110B\u1173\u11BC",
        "\u1103\u1162\u110C\u1161\u11BC",
        "\u1103\u1162\u110C\u1165\u11AB",
        "\u1103\u1162\u110C\u1165\u11B8",
        "\u1103\u1162\u110C\u116E\u11BC",
        "\u1103\u1162\u110E\u1162\u11A8",
        "\u1103\u1162\u110E\u116E\u11AF",
        "\u1103\u1162\u110E\u116E\u11BC",
        "\u1103\u1162\u1110\u1169\u11BC\u1105\u1167\u11BC",
        "\u1103\u1162\u1112\u1161\u11A8",
        "\u1103\u1162\u1112\u1161\u11AB\u1106\u1175\u11AB\u1100\u116E\u11A8",
        "\u1103\u1162\u1112\u1161\u11B8\u1109\u1175\u11AF",
        "\u1103\u1162\u1112\u1167\u11BC",
        "\u1103\u1165\u11BC\u110B\u1165\u1105\u1175",
        "\u1103\u1166\u110B\u1175\u1110\u1173",
        "\u1103\u1169\u1103\u1162\u110E\u1166",
        "\u1103\u1169\u1103\u1165\u11A8",
        "\u1103\u1169\u1103\u116E\u11A8",
        "\u1103\u1169\u1106\u1161\u11BC",
        "\u1103\u1169\u1109\u1165\u1100\u116A\u11AB",
        "\u1103\u1169\u1109\u1175\u11B7",
        "\u1103\u1169\u110B\u116E\u11B7",
        "\u1103\u1169\u110B\u1175\u11B8",
        "\u1103\u1169\u110C\u1161\u1100\u1175",
        "\u1103\u1169\u110C\u1165\u1112\u1175",
        "\u1103\u1169\u110C\u1165\u11AB",
        "\u1103\u1169\u110C\u116E\u11BC",
        "\u1103\u1169\u110E\u1161\u11A8",
        "\u1103\u1169\u11A8\u1100\u1161\u11B7",
        "\u1103\u1169\u11A8\u1105\u1175\u11B8",
        "\u1103\u1169\u11A8\u1109\u1165",
        "\u1103\u1169\u11A8\u110B\u1175\u11AF",
        "\u1103\u1169\u11A8\u110E\u1161\u11BC\u110C\u1165\u11A8",
        "\u1103\u1169\u11BC\u1112\u116A\u110E\u1162\u11A8",
        "\u1103\u1171\u11BA\u1106\u1169\u1109\u1173\u11B8",
        "\u1103\u1171\u11BA\u1109\u1161\u11AB",
        "\u1104\u1161\u11AF\u110B\u1161\u110B\u1175",
        "\u1106\u1161\u1102\u116E\u1105\u1161",
        "\u1106\u1161\u1102\u1173\u11AF",
        "\u1106\u1161\u1103\u1161\u11BC",
        "\u1106\u1161\u1105\u1161\u1110\u1169\u11AB",
        "\u1106\u1161\u1105\u1167\u11AB",
        "\u1106\u1161\u1106\u116E\u1105\u1175",
        "\u1106\u1161\u1109\u1161\u110C\u1175",
        "\u1106\u1161\u110B\u1163\u11A8",
        "\u1106\u1161\u110B\u116D\u1102\u1166\u110C\u1173",
        "\u1106\u1161\u110B\u1173\u11AF",
        "\u1106\u1161\u110B\u1173\u11B7",
        "\u1106\u1161\u110B\u1175\u110F\u1173",
        "\u1106\u1161\u110C\u116E\u11BC",
        "\u1106\u1161\u110C\u1175\u1106\u1161\u11A8",
        "\u1106\u1161\u110E\u1161\u11AB\u1100\u1161\u110C\u1175",
        "\u1106\u1161\u110E\u1161\u11AF",
        "\u1106\u1161\u1112\u1173\u11AB",
        "\u1106\u1161\u11A8\u1100\u1165\u11AF\u1105\u1175",
        "\u1106\u1161\u11A8\u1102\u1162",
        "\u1106\u1161\u11A8\u1109\u1161\u11BC",
        "\u1106\u1161\u11AB\u1102\u1161\u11B7",
        "\u1106\u1161\u11AB\u1103\u116E",
        "\u1106\u1161\u11AB\u1109\u1166",
        "\u1106\u1161\u11AB\u110B\u1163\u11A8",
        "\u1106\u1161\u11AB\u110B\u1175\u11AF",
        "\u1106\u1161\u11AB\u110C\u1165\u11B7",
        "\u1106\u1161\u11AB\u110C\u1169\u11A8",
        "\u1106\u1161\u11AB\u1112\u116A",
        "\u1106\u1161\u11AD\u110B\u1175",
        "\u1106\u1161\u11AF\u1100\u1175",
        "\u1106\u1161\u11AF\u110A\u1173\u11B7",
        "\u1106\u1161\u11AF\u1110\u116E",
        "\u1106\u1161\u11B7\u1103\u1162\u1105\u1169",
        "\u1106\u1161\u11BC\u110B\u116F\u11AB\u1100\u1167\u11BC",
        "\u1106\u1162\u1102\u1167\u11AB",
        "\u1106\u1162\u1103\u1161\u11AF",
        "\u1106\u1162\u1105\u1167\u11A8",
        "\u1106\u1162\u1107\u1165\u11AB",
        "\u1106\u1162\u1109\u1173\u110F\u1165\u11B7",
        "\u1106\u1162\u110B\u1175\u11AF",
        "\u1106\u1162\u110C\u1161\u11BC",
        "\u1106\u1162\u11A8\u110C\u116E",
        "\u1106\u1165\u11A8\u110B\u1175",
        "\u1106\u1165\u11AB\u110C\u1165",
        "\u1106\u1165\u11AB\u110C\u1175",
        "\u1106\u1165\u11AF\u1105\u1175",
        "\u1106\u1166\u110B\u1175\u11AF",
        "\u1106\u1167\u1102\u1173\u1105\u1175",
        "\u1106\u1167\u110E\u1175\u11AF",
        "\u1106\u1167\u11AB\u1103\u1161\u11B7",
        "\u1106\u1167\u11AF\u110E\u1175",
        "\u1106\u1167\u11BC\u1103\u1161\u11AB",
        "\u1106\u1167\u11BC\u1105\u1167\u11BC",
        "\u1106\u1167\u11BC\u110B\u1168",
        "\u1106\u1167\u11BC\u110B\u1174",
        "\u1106\u1167\u11BC\u110C\u1165\u11AF",
        "\u1106\u1167\u11BC\u110E\u1175\u11BC",
        "\u1106\u1167\u11BC\u1112\u1161\u11B7",
        "\u1106\u1169\u1100\u1173\u11B7",
        "\u1106\u1169\u1102\u1175\u1110\u1165",
        "\u1106\u1169\u1103\u1166\u11AF",
        "\u1106\u1169\u1103\u1173\u11AB",
        "\u1106\u1169\u1107\u1165\u11B7",
        "\u1106\u1169\u1109\u1173\u11B8",
        "\u1106\u1169\u110B\u1163\u11BC",
        "\u1106\u1169\u110B\u1175\u11B7",
        "\u1106\u1169\u110C\u1169\u1105\u1175",
        "\u1106\u1169\u110C\u1175\u11B8",
        "\u1106\u1169\u1110\u116E\u11BC\u110B\u1175",
        "\u1106\u1169\u11A8\u1100\u1165\u11AF\u110B\u1175",
        "\u1106\u1169\u11A8\u1105\u1169\u11A8",
        "\u1106\u1169\u11A8\u1109\u1161",
        "\u1106\u1169\u11A8\u1109\u1169\u1105\u1175",
        "\u1106\u1169\u11A8\u1109\u116E\u11B7",
        "\u1106\u1169\u11A8\u110C\u1165\u11A8",
        "\u1106\u1169\u11A8\u1111\u116D",
        "\u1106\u1169\u11AF\u1105\u1162",
        "\u1106\u1169\u11B7\u1106\u1162",
        "\u1106\u1169\u11B7\u1106\u116E\u1100\u1166",
        "\u1106\u1169\u11B7\u1109\u1161\u11AF",
        "\u1106\u1169\u11B7\u1109\u1169\u11A8",
        "\u1106\u1169\u11B7\u110C\u1175\u11BA",
        "\u1106\u1169\u11B7\u1110\u1169\u11BC",
        "\u1106\u1169\u11B8\u1109\u1175",
        "\u1106\u116E\u1100\u116A\u11AB\u1109\u1175\u11B7",
        "\u1106\u116E\u1100\u116E\u11BC\u1112\u116A",
        "\u1106\u116E\u1103\u1165\u110B\u1171",
        "\u1106\u116E\u1103\u1165\u11B7",
        "\u1106\u116E\u1105\u1173\u11C1",
        "\u1106\u116E\u1109\u1173\u11AB",
        "\u1106\u116E\u110B\u1165\u11BA",
        "\u1106\u116E\u110B\u1167\u11A8",
        "\u1106\u116E\u110B\u116D\u11BC",
        "\u1106\u116E\u110C\u1169\u1100\u1165\u11AB",
        "\u1106\u116E\u110C\u1175\u1100\u1162",
        "\u1106\u116E\u110E\u1165\u11A8",
        "\u1106\u116E\u11AB\u1100\u116E",
        "\u1106\u116E\u11AB\u1103\u1173\u11A8",
        "\u1106\u116E\u11AB\u1107\u1165\u11B8",
        "\u1106\u116E\u11AB\u1109\u1165",
        "\u1106\u116E\u11AB\u110C\u1166",
        "\u1106\u116E\u11AB\u1112\u1161\u11A8",
        "\u1106\u116E\u11AB\u1112\u116A",
        "\u1106\u116E\u11AF\u1100\u1161",
        "\u1106\u116E\u11AF\u1100\u1165\u11AB",
        "\u1106\u116E\u11AF\u1100\u1167\u11AF",
        "\u1106\u116E\u11AF\u1100\u1169\u1100\u1175",
        "\u1106\u116E\u11AF\u1105\u1169\u11AB",
        "\u1106\u116E\u11AF\u1105\u1175\u1112\u1161\u11A8",
        "\u1106\u116E\u11AF\u110B\u1173\u11B7",
        "\u1106\u116E\u11AF\u110C\u1175\u11AF",
        "\u1106\u116E\u11AF\u110E\u1166",
        "\u1106\u1175\u1100\u116E\u11A8",
        "\u1106\u1175\u1103\u1175\u110B\u1165",
        "\u1106\u1175\u1109\u1161\u110B\u1175\u11AF",
        "\u1106\u1175\u1109\u116E\u11AF",
        "\u1106\u1175\u110B\u1167\u11A8",
        "\u1106\u1175\u110B\u116D\u11BC\u1109\u1175\u11AF",
        "\u1106\u1175\u110B\u116E\u11B7",
        "\u1106\u1175\u110B\u1175\u11AB",
        "\u1106\u1175\u1110\u1175\u11BC",
        "\u1106\u1175\u1112\u1169\u11AB",
        "\u1106\u1175\u11AB\u1100\u1161\u11AB",
        "\u1106\u1175\u11AB\u110C\u1169\u11A8",
        "\u1106\u1175\u11AB\u110C\u116E",
        "\u1106\u1175\u11AE\u110B\u1173\u11B7",
        "\u1106\u1175\u11AF\u1100\u1161\u1105\u116E",
        "\u1106\u1175\u11AF\u1105\u1175\u1106\u1175\u1110\u1165",
        "\u1106\u1175\u11C0\u1107\u1161\u1103\u1161\u11A8",
        "\u1107\u1161\u1100\u1161\u110C\u1175",
        "\u1107\u1161\u1100\u116E\u1102\u1175",
        "\u1107\u1161\u1102\u1161\u1102\u1161",
        "\u1107\u1161\u1102\u1173\u11AF",
        "\u1107\u1161\u1103\u1161\u11A8",
        "\u1107\u1161\u1103\u1161\u11BA\u1100\u1161",
        "\u1107\u1161\u1105\u1161\u11B7",
        "\u1107\u1161\u110B\u1175\u1105\u1165\u1109\u1173",
        "\u1107\u1161\u1110\u1161\u11BC",
        "\u1107\u1161\u11A8\u1106\u116E\u11AF\u1100\u116A\u11AB",
        "\u1107\u1161\u11A8\u1109\u1161",
        "\u1107\u1161\u11A8\u1109\u116E",
        "\u1107\u1161\u11AB\u1103\u1162",
        "\u1107\u1161\u11AB\u1103\u1173\u1109\u1175",
        "\u1107\u1161\u11AB\u1106\u1161\u11AF",
        "\u1107\u1161\u11AB\u1107\u1161\u11AF",
        "\u1107\u1161\u11AB\u1109\u1165\u11BC",
        "\u1107\u1161\u11AB\u110B\u1173\u11BC",
        "\u1107\u1161\u11AB\u110C\u1161\u11BC",
        "\u1107\u1161\u11AB\u110C\u116E\u11A8",
        "\u1107\u1161\u11AB\u110C\u1175",
        "\u1107\u1161\u11AB\u110E\u1161\u11AB",
        "\u1107\u1161\u11AE\u110E\u1175\u11B7",
        "\u1107\u1161\u11AF\u1100\u1161\u1105\u1161\u11A8",
        "\u1107\u1161\u11AF\u1100\u1165\u11AF\u110B\u1173\u11B7",
        "\u1107\u1161\u11AF\u1100\u1167\u11AB",
        "\u1107\u1161\u11AF\u1103\u1161\u11AF",
        "\u1107\u1161\u11AF\u1105\u1166",
        "\u1107\u1161\u11AF\u1106\u1169\u11A8",
        "\u1107\u1161\u11AF\u1107\u1161\u1103\u1161\u11A8",
        "\u1107\u1161\u11AF\u1109\u1162\u11BC",
        "\u1107\u1161\u11AF\u110B\u1173\u11B7",
        "\u1107\u1161\u11AF\u110C\u1161\u1100\u116E\u11A8",
        "\u1107\u1161\u11AF\u110C\u1165\u11AB",
        "\u1107\u1161\u11AF\u1110\u1169\u11B8",
        "\u1107\u1161\u11AF\u1111\u116D",
        "\u1107\u1161\u11B7\u1112\u1161\u1102\u1173\u11AF",
        "\u1107\u1161\u11B8\u1100\u1173\u1105\u1173\u11BA",
        "\u1107\u1161\u11B8\u1106\u1161\u11BA",
        "\u1107\u1161\u11B8\u1109\u1161\u11BC",
        "\u1107\u1161\u11B8\u1109\u1169\u11C0",
        "\u1107\u1161\u11BC\u1100\u1173\u11B7",
        "\u1107\u1161\u11BC\u1106\u1167\u11AB",
        "\u1107\u1161\u11BC\u1106\u116E\u11AB",
        "\u1107\u1161\u11BC\u1107\u1161\u1103\u1161\u11A8",
        "\u1107\u1161\u11BC\u1107\u1165\u11B8",
        "\u1107\u1161\u11BC\u1109\u1169\u11BC",
        "\u1107\u1161\u11BC\u1109\u1175\u11A8",
        "\u1107\u1161\u11BC\u110B\u1161\u11AB",
        "\u1107\u1161\u11BC\u110B\u116E\u11AF",
        "\u1107\u1161\u11BC\u110C\u1175",
        "\u1107\u1161\u11BC\u1112\u1161\u11A8",
        "\u1107\u1161\u11BC\u1112\u1162",
        "\u1107\u1161\u11BC\u1112\u1163\u11BC",
        "\u1107\u1162\u1100\u1167\u11BC",
        "\u1107\u1162\u1101\u1169\u11B8",
        "\u1107\u1162\u1103\u1161\u11AF",
        "\u1107\u1162\u1103\u1173\u1106\u1175\u11AB\u1110\u1165\u11AB",
        "\u1107\u1162\u11A8\u1103\u116E\u1109\u1161\u11AB",
        "\u1107\u1162\u11A8\u1109\u1162\u11A8",
        "\u1107\u1162\u11A8\u1109\u1165\u11BC",
        "\u1107\u1162\u11A8\u110B\u1175\u11AB",
        "\u1107\u1162\u11A8\u110C\u1166",
        "\u1107\u1162\u11A8\u1112\u116A\u110C\u1165\u11B7",
        "\u1107\u1165\u1105\u1173\u11BA",
        "\u1107\u1165\u1109\u1165\u11BA",
        "\u1107\u1165\u1110\u1173\u11AB",
        "\u1107\u1165\u11AB\u1100\u1162",
        "\u1107\u1165\u11AB\u110B\u1167\u11A8",
        "\u1107\u1165\u11AB\u110C\u1175",
        "\u1107\u1165\u11AB\u1112\u1169",
        "\u1107\u1165\u11AF\u1100\u1173\u11B7",
        "\u1107\u1165\u11AF\u1105\u1166",
        "\u1107\u1165\u11AF\u110A\u1165",
        "\u1107\u1165\u11B7\u110B\u1171",
        "\u1107\u1165\u11B7\u110B\u1175\u11AB",
        "\u1107\u1165\u11B7\u110C\u116C",
        "\u1107\u1165\u11B8\u1105\u1172\u11AF",
        "\u1107\u1165\u11B8\u110B\u116F\u11AB",
        "\u1107\u1165\u11B8\u110C\u1165\u11A8",
        "\u1107\u1165\u11B8\u110E\u1175\u11A8",
        "\u1107\u1166\u110B\u1175\u110C\u1175\u11BC",
        "\u1107\u1166\u11AF\u1110\u1173",
        "\u1107\u1167\u11AB\u1100\u1167\u11BC",
        "\u1107\u1167\u11AB\u1103\u1169\u11BC",
        "\u1107\u1167\u11AB\u1106\u1167\u11BC",
        "\u1107\u1167\u11AB\u1109\u1175\u11AB",
        "\u1107\u1167\u11AB\u1112\u1169\u1109\u1161",
        "\u1107\u1167\u11AB\u1112\u116A",
        "\u1107\u1167\u11AF\u1103\u1169",
        "\u1107\u1167\u11AF\u1106\u1167\u11BC",
        "\u1107\u1167\u11AF\u110B\u1175\u11AF",
        "\u1107\u1167\u11BC\u1109\u1175\u11AF",
        "\u1107\u1167\u11BC\u110B\u1161\u1105\u1175",
        "\u1107\u1167\u11BC\u110B\u116F\u11AB",
        "\u1107\u1169\u1100\u116A\u11AB",
        "\u1107\u1169\u1102\u1165\u1109\u1173",
        "\u1107\u1169\u1105\u1161\u1109\u1162\u11A8",
        "\u1107\u1169\u1105\u1161\u11B7",
        "\u1107\u1169\u1105\u1173\u11B7",
        "\u1107\u1169\u1109\u1161\u11BC",
        "\u1107\u1169\u110B\u1161\u11AB",
        "\u1107\u1169\u110C\u1161\u1100\u1175",
        "\u1107\u1169\u110C\u1161\u11BC",
        "\u1107\u1169\u110C\u1165\u11AB",
        "\u1107\u1169\u110C\u1169\u11AB",
        "\u1107\u1169\u1110\u1169\u11BC",
        "\u1107\u1169\u1111\u1167\u11AB\u110C\u1165\u11A8",
        "\u1107\u1169\u1112\u1165\u11B7",
        "\u1107\u1169\u11A8\u1103\u1169",
        "\u1107\u1169\u11A8\u1109\u1161",
        "\u1107\u1169\u11A8\u1109\u116E\u11BC\u110B\u1161",
        "\u1107\u1169\u11A8\u1109\u1173\u11B8",
        "\u1107\u1169\u11A9\u110B\u1173\u11B7",
        "\u1107\u1169\u11AB\u1100\u1167\u11A8\u110C\u1165\u11A8",
        "\u1107\u1169\u11AB\u1105\u1162",
        "\u1107\u1169\u11AB\u1107\u116E",
        "\u1107\u1169\u11AB\u1109\u1161",
        "\u1107\u1169\u11AB\u1109\u1165\u11BC",
        "\u1107\u1169\u11AB\u110B\u1175\u11AB",
        "\u1107\u1169\u11AB\u110C\u1175\u11AF",
        "\u1107\u1169\u11AF\u1111\u1166\u11AB",
        "\u1107\u1169\u11BC\u1109\u1161",
        "\u1107\u1169\u11BC\u110C\u1175",
        "\u1107\u1169\u11BC\u1110\u116E",
        "\u1107\u116E\u1100\u1173\u11AB",
        "\u1107\u116E\u1101\u1173\u1105\u1165\u110B\u116E\u11B7",
        "\u1107\u116E\u1103\u1161\u11B7",
        "\u1107\u116E\u1103\u1169\u11BC\u1109\u1161\u11AB",
        "\u1107\u116E\u1106\u116E\u11AB",
        "\u1107\u116E\u1107\u116E\u11AB",
        "\u1107\u116E\u1109\u1161\u11AB",
        "\u1107\u116E\u1109\u1161\u11BC",
        "\u1107\u116E\u110B\u1165\u11BF",
        "\u1107\u116E\u110B\u1175\u11AB",
        "\u1107\u116E\u110C\u1161\u11A8\u110B\u116D\u11BC",
        "\u1107\u116E\u110C\u1161\u11BC",
        "\u1107\u116E\u110C\u1165\u11BC",
        "\u1107\u116E\u110C\u1169\u11A8",
        "\u1107\u116E\u110C\u1175\u1105\u1165\u11AB\u1112\u1175",
        "\u1107\u116E\u110E\u1175\u11AB",
        "\u1107\u116E\u1110\u1161\u11A8",
        "\u1107\u116E\u1111\u116E\u11B7",
        "\u1107\u116E\u1112\u116C\u110C\u1161\u11BC",
        "\u1107\u116E\u11A8\u1107\u116E",
        "\u1107\u116E\u11A8\u1112\u1161\u11AB",
        "\u1107\u116E\u11AB\u1102\u1169",
        "\u1107\u116E\u11AB\u1105\u1163\u11BC",
        "\u1107\u116E\u11AB\u1105\u1175",
        "\u1107\u116E\u11AB\u1106\u1167\u11BC",
        "\u1107\u116E\u11AB\u1109\u1165\u11A8",
        "\u1107\u116E\u11AB\u110B\u1163",
        "\u1107\u116E\u11AB\u110B\u1171\u1100\u1175",
        "\u1107\u116E\u11AB\u1111\u1175\u11AF",
        "\u1107\u116E\u11AB\u1112\u1169\u11BC\u1109\u1162\u11A8",
        "\u1107\u116E\u11AF\u1100\u1169\u1100\u1175",
        "\u1107\u116E\u11AF\u1100\u116A",
        "\u1107\u116E\u11AF\u1100\u116D",
        "\u1107\u116E\u11AF\u1101\u1169\u11BE",
        "\u1107\u116E\u11AF\u1106\u1161\u11AB",
        "\u1107\u116E\u11AF\u1107\u1165\u11B8",
        "\u1107\u116E\u11AF\u1107\u1175\u11BE",
        "\u1107\u116E\u11AF\u110B\u1161\u11AB",
        "\u1107\u116E\u11AF\u110B\u1175\u110B\u1175\u11A8",
        "\u1107\u116E\u11AF\u1112\u1162\u11BC",
        "\u1107\u1173\u1105\u1162\u11AB\u1103\u1173",
        "\u1107\u1175\u1100\u1173\u11A8",
        "\u1107\u1175\u1102\u1161\u11AB",
        "\u1107\u1175\u1102\u1175\u11AF",
        "\u1107\u1175\u1103\u116E\u11AF\u1100\u1175",
        "\u1107\u1175\u1103\u1175\u110B\u1169",
        "\u1107\u1175\u1105\u1169\u1109\u1169",
        "\u1107\u1175\u1106\u1161\u11AB",
        "\u1107\u1175\u1106\u1167\u11BC",
        "\u1107\u1175\u1106\u1175\u11AF",
        "\u1107\u1175\u1107\u1161\u1105\u1161\u11B7",
        "\u1107\u1175\u1107\u1175\u11B7\u1107\u1161\u11B8",
        "\u1107\u1175\u1109\u1161\u11BC",
        "\u1107\u1175\u110B\u116D\u11BC",
        "\u1107\u1175\u110B\u1172\u11AF",
        "\u1107\u1175\u110C\u116E\u11BC",
        "\u1107\u1175\u1110\u1161\u1106\u1175\u11AB",
        "\u1107\u1175\u1111\u1161\u11AB",
        "\u1107\u1175\u11AF\u1103\u1175\u11BC",
        "\u1107\u1175\u11BA\u1106\u116E\u11AF",
        "\u1107\u1175\u11BA\u1107\u1161\u11BC\u110B\u116E\u11AF",
        "\u1107\u1175\u11BA\u110C\u116E\u11AF\u1100\u1175",
        "\u1107\u1175\u11BE\u1101\u1161\u11AF",
        "\u1108\u1161\u11AF\u1100\u1161\u11AB\u1109\u1162\u11A8",
        "\u1108\u1161\u11AF\u1105\u1162",
        "\u1108\u1161\u11AF\u1105\u1175",
        "\u1109\u1161\u1100\u1165\u11AB",
        "\u1109\u1161\u1100\u1168\u110C\u1165\u11AF",
        "\u1109\u1161\u1102\u1161\u110B\u1175",
        "\u1109\u1161\u1102\u1163\u11BC",
        "\u1109\u1161\u1105\u1161\u11B7",
        "\u1109\u1161\u1105\u1161\u11BC",
        "\u1109\u1161\u1105\u1175\u11B8",
        "\u1109\u1161\u1106\u1169\u1102\u1175\u11B7",
        "\u1109\u1161\u1106\u116E\u11AF",
        "\u1109\u1161\u1107\u1161\u11BC",
        "\u1109\u1161\u1109\u1161\u11BC",
        "\u1109\u1161\u1109\u1162\u11BC\u1112\u116A\u11AF",
        "\u1109\u1161\u1109\u1165\u11AF",
        "\u1109\u1161\u1109\u1173\u11B7",
        "\u1109\u1161\u1109\u1175\u11AF",
        "\u1109\u1161\u110B\u1165\u11B8",
        "\u1109\u1161\u110B\u116D\u11BC",
        "\u1109\u1161\u110B\u116F\u11AF",
        "\u1109\u1161\u110C\u1161\u11BC",
        "\u1109\u1161\u110C\u1165\u11AB",
        "\u1109\u1161\u110C\u1175\u11AB",
        "\u1109\u1161\u110E\u1169\u11AB",
        "\u1109\u1161\u110E\u116E\u11AB\u1100\u1175",
        "\u1109\u1161\u1110\u1161\u11BC",
        "\u1109\u1161\u1110\u116E\u1105\u1175",
        "\u1109\u1161\u1112\u1173\u11AF",
        "\u1109\u1161\u11AB\u1100\u1175\u11AF",
        "\u1109\u1161\u11AB\u1107\u116E\u110B\u1175\u11AB\u1100\u116A",
        "\u1109\u1161\u11AB\u110B\u1165\u11B8",
        "\u1109\u1161\u11AB\u110E\u1162\u11A8",
        "\u1109\u1161\u11AF\u1105\u1175\u11B7",
        "\u1109\u1161\u11AF\u110B\u1175\u11AB",
        "\u1109\u1161\u11AF\u110D\u1161\u11A8",
        "\u1109\u1161\u11B7\u1100\u1168\u1110\u1161\u11BC",
        "\u1109\u1161\u11B7\u1100\u116E\u11A8",
        "\u1109\u1161\u11B7\u1109\u1175\u11B8",
        "\u1109\u1161\u11B7\u110B\u116F\u11AF",
        "\u1109\u1161\u11B7\u110E\u1169\u11AB",
        "\u1109\u1161\u11BC\u1100\u116A\u11AB",
        "\u1109\u1161\u11BC\u1100\u1173\u11B7",
        "\u1109\u1161\u11BC\u1103\u1162",
        "\u1109\u1161\u11BC\u1105\u1172",
        "\u1109\u1161\u11BC\u1107\u1161\u11AB\u1100\u1175",
        "\u1109\u1161\u11BC\u1109\u1161\u11BC",
        "\u1109\u1161\u11BC\u1109\u1175\u11A8",
        "\u1109\u1161\u11BC\u110B\u1165\u11B8",
        "\u1109\u1161\u11BC\u110B\u1175\u11AB",
        "\u1109\u1161\u11BC\u110C\u1161",
        "\u1109\u1161\u11BC\u110C\u1165\u11B7",
        "\u1109\u1161\u11BC\u110E\u1165",
        "\u1109\u1161\u11BC\u110E\u116E",
        "\u1109\u1161\u11BC\u1110\u1162",
        "\u1109\u1161\u11BC\u1111\u116D",
        "\u1109\u1161\u11BC\u1111\u116E\u11B7",
        "\u1109\u1161\u11BC\u1112\u116A\u11BC",
        "\u1109\u1162\u1107\u1167\u11A8",
        "\u1109\u1162\u11A8\u1101\u1161\u11AF",
        "\u1109\u1162\u11A8\u110B\u1167\u11AB\u1111\u1175\u11AF",
        "\u1109\u1162\u11BC\u1100\u1161\u11A8",
        "\u1109\u1162\u11BC\u1106\u1167\u11BC",
        "\u1109\u1162\u11BC\u1106\u116E\u11AF",
        "\u1109\u1162\u11BC\u1107\u1161\u11BC\u1109\u1169\u11BC",
        "\u1109\u1162\u11BC\u1109\u1161\u11AB",
        "\u1109\u1162\u11BC\u1109\u1165\u11AB",
        "\u1109\u1162\u11BC\u1109\u1175\u11AB",
        "\u1109\u1162\u11BC\u110B\u1175\u11AF",
        "\u1109\u1162\u11BC\u1112\u116A\u11AF",
        "\u1109\u1165\u1105\u1161\u11B8",
        "\u1109\u1165\u1105\u1173\u11AB",
        "\u1109\u1165\u1106\u1167\u11BC",
        "\u1109\u1165\u1106\u1175\u11AB",
        "\u1109\u1165\u1107\u1175\u1109\u1173",
        "\u1109\u1165\u110B\u1163\u11BC",
        "\u1109\u1165\u110B\u116E\u11AF",
        "\u1109\u1165\u110C\u1165\u11A8",
        "\u1109\u1165\u110C\u1165\u11B7",
        "\u1109\u1165\u110D\u1169\u11A8",
        "\u1109\u1165\u110F\u1173\u11AF",
        "\u1109\u1165\u11A8\u1109\u1161",
        "\u1109\u1165\u11A8\u110B\u1172",
        "\u1109\u1165\u11AB\u1100\u1165",
        "\u1109\u1165\u11AB\u1106\u116E\u11AF",
        "\u1109\u1165\u11AB\u1107\u1162",
        "\u1109\u1165\u11AB\u1109\u1162\u11BC",
        "\u1109\u1165\u11AB\u1109\u116E",
        "\u1109\u1165\u11AB\u110B\u116F\u11AB",
        "\u1109\u1165\u11AB\u110C\u1161\u11BC",
        "\u1109\u1165\u11AB\u110C\u1165\u11AB",
        "\u1109\u1165\u11AB\u1110\u1162\u11A8",
        "\u1109\u1165\u11AB\u1111\u116E\u11BC\u1100\u1175",
        "\u1109\u1165\u11AF\u1100\u1165\u110C\u1175",
        "\u1109\u1165\u11AF\u1102\u1161\u11AF",
        "\u1109\u1165\u11AF\u1105\u1165\u11BC\u1110\u1161\u11BC",
        "\u1109\u1165\u11AF\u1106\u1167\u11BC",
        "\u1109\u1165\u11AF\u1106\u116E\u11AB",
        "\u1109\u1165\u11AF\u1109\u1161",
        "\u1109\u1165\u11AF\u110B\u1161\u11A8\u1109\u1161\u11AB",
        "\u1109\u1165\u11AF\u110E\u1175",
        "\u1109\u1165\u11AF\u1110\u1161\u11BC",
        "\u1109\u1165\u11B8\u110A\u1175",
        "\u1109\u1165\u11BC\u1100\u1169\u11BC",
        "\u1109\u1165\u11BC\u1103\u1161\u11BC",
        "\u1109\u1165\u11BC\u1106\u1167\u11BC",
        "\u1109\u1165\u11BC\u1107\u1167\u11AF",
        "\u1109\u1165\u11BC\u110B\u1175\u11AB",
        "\u1109\u1165\u11BC\u110C\u1161\u11BC",
        "\u1109\u1165\u11BC\u110C\u1165\u11A8",
        "\u1109\u1165\u11BC\u110C\u1175\u11AF",
        "\u1109\u1165\u11BC\u1112\u1161\u11B7",
        "\u1109\u1166\u1100\u1173\u11B7",
        "\u1109\u1166\u1106\u1175\u1102\u1161",
        "\u1109\u1166\u1109\u1161\u11BC",
        "\u1109\u1166\u110B\u116F\u11AF",
        "\u1109\u1166\u110C\u1169\u11BC\u1103\u1162\u110B\u116A\u11BC",
        "\u1109\u1166\u1110\u1161\u11A8",
        "\u1109\u1166\u11AB\u1110\u1165",
        "\u1109\u1166\u11AB\u1110\u1175\u1106\u1175\u1110\u1165",
        "\u1109\u1166\u11BA\u110D\u1162",
        "\u1109\u1169\u1100\u1172\u1106\u1169",
        "\u1109\u1169\u1100\u1173\u11A8\u110C\u1165\u11A8",
        "\u1109\u1169\u1100\u1173\u11B7",
        "\u1109\u1169\u1102\u1161\u1100\u1175",
        "\u1109\u1169\u1102\u1167\u11AB",
        "\u1109\u1169\u1103\u1173\u11A8",
        "\u1109\u1169\u1106\u1161\u11BC",
        "\u1109\u1169\u1106\u116E\u11AB",
        "\u1109\u1169\u1109\u1165\u11AF",
        "\u1109\u1169\u1109\u1169\u11A8",
        "\u1109\u1169\u110B\u1161\u1100\u116A",
        "\u1109\u1169\u110B\u116D\u11BC",
        "\u1109\u1169\u110B\u116F\u11AB",
        "\u1109\u1169\u110B\u1173\u11B7",
        "\u1109\u1169\u110C\u116E\u11BC\u1112\u1175",
        "\u1109\u1169\u110C\u1175\u1111\u116E\u11B7",
        "\u1109\u1169\u110C\u1175\u11AF",
        "\u1109\u1169\u1111\u116E\u11BC",
        "\u1109\u1169\u1112\u1167\u11BC",
        "\u1109\u1169\u11A8\u1103\u1161\u11B7",
        "\u1109\u1169\u11A8\u1103\u1169",
        "\u1109\u1169\u11A8\u110B\u1169\u11BA",
        "\u1109\u1169\u11AB\u1100\u1161\u1105\u1161\u11A8",
        "\u1109\u1169\u11AB\u1100\u1175\u11AF",
        "\u1109\u1169\u11AB\u1102\u1167",
        "\u1109\u1169\u11AB\u1102\u1175\u11B7",
        "\u1109\u1169\u11AB\u1103\u1173\u11BC",
        "\u1109\u1169\u11AB\u1106\u1169\u11A8",
        "\u1109\u1169\u11AB\u1108\u1167\u11A8",
        "\u1109\u1169\u11AB\u1109\u1175\u11AF",
        "\u1109\u1169\u11AB\u110C\u1175\u11AF",
        "\u1109\u1169\u11AB\u1110\u1169\u11B8",
        "\u1109\u1169\u11AB\u1112\u1162",
        "\u1109\u1169\u11AF\u110C\u1175\u11A8\u1112\u1175",
        "\u1109\u1169\u11B7\u110A\u1175",
        "\u1109\u1169\u11BC\u110B\u1161\u110C\u1175",
        "\u1109\u1169\u11BC\u110B\u1175",
        "\u1109\u1169\u11BC\u1111\u1167\u11AB",
        "\u1109\u116C\u1100\u1169\u1100\u1175",
        "\u1109\u116D\u1111\u1175\u11BC",
        "\u1109\u116E\u1100\u1165\u11AB",
        "\u1109\u116E\u1102\u1167\u11AB",
        "\u1109\u116E\u1103\u1161\u11AB",
        "\u1109\u116E\u1103\u1169\u11BA\u1106\u116E\u11AF",
        "\u1109\u116E\u1103\u1169\u11BC\u110C\u1165\u11A8",
        "\u1109\u116E\u1106\u1167\u11AB",
        "\u1109\u116E\u1106\u1167\u11BC",
        "\u1109\u116E\u1107\u1161\u11A8",
        "\u1109\u116E\u1109\u1161\u11BC",
        "\u1109\u116E\u1109\u1165\u11A8",
        "\u1109\u116E\u1109\u116E\u11AF",
        "\u1109\u116E\u1109\u1175\u1105\u1169",
        "\u1109\u116E\u110B\u1165\u11B8",
        "\u1109\u116E\u110B\u1167\u11B7",
        "\u1109\u116E\u110B\u1167\u11BC",
        "\u1109\u116E\u110B\u1175\u11B8",
        "\u1109\u116E\u110C\u116E\u11AB",
        "\u1109\u116E\u110C\u1175\u11B8",
        "\u1109\u116E\u110E\u116E\u11AF",
        "\u1109\u116E\u110F\u1165\u11BA",
        "\u1109\u116E\u1111\u1175\u11AF",
        "\u1109\u116E\u1112\u1161\u11A8",
        "\u1109\u116E\u1112\u1165\u11B7\u1109\u1162\u11BC",
        "\u1109\u116E\u1112\u116A\u1100\u1175",
        "\u1109\u116E\u11A8\u1102\u1167",
        "\u1109\u116E\u11A8\u1109\u1169",
        "\u1109\u116E\u11A8\u110C\u1166",
        "\u1109\u116E\u11AB\u1100\u1161\u11AB",
        "\u1109\u116E\u11AB\u1109\u1165",
        "\u1109\u116E\u11AB\u1109\u116E",
        "\u1109\u116E\u11AB\u1109\u1175\u11A8\u1100\u1161\u11AB",
        "\u1109\u116E\u11AB\u110B\u1171",
        "\u1109\u116E\u11AE\u1100\u1161\u1105\u1161\u11A8",
        "\u1109\u116E\u11AF\u1107\u1167\u11BC",
        "\u1109\u116E\u11AF\u110C\u1175\u11B8",
        "\u1109\u116E\u11BA\u110C\u1161",
        "\u1109\u1173\u1102\u1175\u11B7",
        "\u1109\u1173\u1106\u116E\u11AF",
        "\u1109\u1173\u1109\u1173\u1105\u1169",
        "\u1109\u1173\u1109\u1173\u11BC",
        "\u1109\u1173\u110B\u1170\u1110\u1165",
        "\u1109\u1173\u110B\u1171\u110E\u1175",
        "\u1109\u1173\u110F\u1166\u110B\u1175\u1110\u1173",
        "\u1109\u1173\u1110\u1172\u1103\u1175\u110B\u1169",
        "\u1109\u1173\u1110\u1173\u1105\u1166\u1109\u1173",
        "\u1109\u1173\u1111\u1169\u110E\u1173",
        "\u1109\u1173\u11AF\u110D\u1165\u11A8",
        "\u1109\u1173\u11AF\u1111\u1173\u11B7",
        "\u1109\u1173\u11B8\u1100\u116A\u11AB",
        "\u1109\u1173\u11B8\u1100\u1175",
        "\u1109\u1173\u11BC\u1100\u1162\u11A8",
        "\u1109\u1173\u11BC\u1105\u1175",
        "\u1109\u1173\u11BC\u1107\u116E",
        "\u1109\u1173\u11BC\u110B\u116D\u11BC\u110E\u1161",
        "\u1109\u1173\u11BC\u110C\u1175\u11AB",
        "\u1109\u1175\u1100\u1161\u11A8",
        "\u1109\u1175\u1100\u1161\u11AB",
        "\u1109\u1175\u1100\u1169\u11AF",
        "\u1109\u1175\u1100\u1173\u11B7\u110E\u1175",
        "\u1109\u1175\u1102\u1161\u1105\u1175\u110B\u1169",
        "\u1109\u1175\u1103\u1162\u11A8",
        "\u1109\u1175\u1105\u1175\u110C\u1173",
        "\u1109\u1175\u1106\u1166\u11AB\u1110\u1173",
        "\u1109\u1175\u1106\u1175\u11AB",
        "\u1109\u1175\u1107\u116E\u1106\u1169",
        "\u1109\u1175\u1109\u1165\u11AB",
        "\u1109\u1175\u1109\u1165\u11AF",
        "\u1109\u1175\u1109\u1173\u1110\u1166\u11B7",
        "\u1109\u1175\u110B\u1161\u1107\u1165\u110C\u1175",
        "\u1109\u1175\u110B\u1165\u1106\u1165\u1102\u1175",
        "\u1109\u1175\u110B\u116F\u11AF",
        "\u1109\u1175\u110B\u1175\u11AB",
        "\u1109\u1175\u110B\u1175\u11AF",
        "\u1109\u1175\u110C\u1161\u11A8",
        "\u1109\u1175\u110C\u1161\u11BC",
        "\u1109\u1175\u110C\u1165\u11AF",
        "\u1109\u1175\u110C\u1165\u11B7",
        "\u1109\u1175\u110C\u116E\u11BC",
        "\u1109\u1175\u110C\u1173\u11AB",
        "\u1109\u1175\u110C\u1175\u11B8",
        "\u1109\u1175\u110E\u1165\u11BC",
        "\u1109\u1175\u1112\u1161\u11B8",
        "\u1109\u1175\u1112\u1165\u11B7",
        "\u1109\u1175\u11A8\u1100\u116E",
        "\u1109\u1175\u11A8\u1100\u1175",
        "\u1109\u1175\u11A8\u1103\u1161\u11BC",
        "\u1109\u1175\u11A8\u1105\u1163\u11BC",
        "\u1109\u1175\u11A8\u1105\u116D\u1111\u116E\u11B7",
        "\u1109\u1175\u11A8\u1106\u116E\u11AF",
        "\u1109\u1175\u11A8\u1108\u1161\u11BC",
        "\u1109\u1175\u11A8\u1109\u1161",
        "\u1109\u1175\u11A8\u1109\u1162\u11BC\u1112\u116A\u11AF",
        "\u1109\u1175\u11A8\u110E\u1169",
        "\u1109\u1175\u11A8\u1110\u1161\u11A8",
        "\u1109\u1175\u11A8\u1111\u116E\u11B7",
        "\u1109\u1175\u11AB\u1100\u1169",
        "\u1109\u1175\u11AB\u1100\u1172",
        "\u1109\u1175\u11AB\u1102\u1167\u11B7",
        "\u1109\u1175\u11AB\u1106\u116E\u11AB",
        "\u1109\u1175\u11AB\u1107\u1161\u11AF",
        "\u1109\u1175\u11AB\u1107\u1175",
        "\u1109\u1175\u11AB\u1109\u1161",
        "\u1109\u1175\u11AB\u1109\u1166",
        "\u1109\u1175\u11AB\u110B\u116D\u11BC",
        "\u1109\u1175\u11AB\u110C\u1166\u1111\u116E\u11B7",
        "\u1109\u1175\u11AB\u110E\u1165\u11BC",
        "\u1109\u1175\u11AB\u110E\u1166",
        "\u1109\u1175\u11AB\u1112\u116A",
        "\u1109\u1175\u11AF\u1100\u1161\u11B7",
        "\u1109\u1175\u11AF\u1102\u1162",
        "\u1109\u1175\u11AF\u1105\u1167\u11A8",
        "\u1109\u1175\u11AF\u1105\u1168",
        "\u1109\u1175\u11AF\u1106\u1161\u11BC",
        "\u1109\u1175\u11AF\u1109\u116E",
        "\u1109\u1175\u11AF\u1109\u1173\u11B8",
        "\u1109\u1175\u11AF\u1109\u1175",
        "\u1109\u1175\u11AF\u110C\u1161\u11BC",
        "\u1109\u1175\u11AF\u110C\u1165\u11BC",
        "\u1109\u1175\u11AF\u110C\u1175\u11AF\u110C\u1165\u11A8",
        "\u1109\u1175\u11AF\u110E\u1165\u11AB",
        "\u1109\u1175\u11AF\u110E\u1166",
        "\u1109\u1175\u11AF\u110F\u1165\u11BA",
        "\u1109\u1175\u11AF\u1110\u1162",
        "\u1109\u1175\u11AF\u1111\u1162",
        "\u1109\u1175\u11AF\u1112\u1165\u11B7",
        "\u1109\u1175\u11AF\u1112\u1167\u11AB",
        "\u1109\u1175\u11B7\u1105\u1175",
        "\u1109\u1175\u11B7\u1107\u116E\u1105\u1173\u11B7",
        "\u1109\u1175\u11B7\u1109\u1161",
        "\u1109\u1175\u11B7\u110C\u1161\u11BC",
        "\u1109\u1175\u11B7\u110C\u1165\u11BC",
        "\u1109\u1175\u11B7\u1111\u1161\u11AB",
        "\u110A\u1161\u11BC\u1103\u116E\u11BC\u110B\u1175",
        "\u110A\u1175\u1105\u1173\u11B7",
        "\u110A\u1175\u110B\u1161\u11BA",
        "\u110B\u1161\u1100\u1161\u110A\u1175",
        "\u110B\u1161\u1102\u1161\u110B\u116E\u11AB\u1109\u1165",
        "\u110B\u1161\u1103\u1173\u1102\u1175\u11B7",
        "\u110B\u1161\u1103\u1173\u11AF",
        "\u110B\u1161\u1109\u1171\u110B\u116E\u11B7",
        "\u110B\u1161\u1109\u1173\u1111\u1161\u11AF\u1110\u1173",
        "\u110B\u1161\u1109\u1175\u110B\u1161",
        "\u110B\u1161\u110B\u116E\u11AF\u1105\u1165",
        "\u110B\u1161\u110C\u1165\u110A\u1175",
        "\u110B\u1161\u110C\u116E\u11B7\u1106\u1161",
        "\u110B\u1161\u110C\u1175\u11A8",
        "\u110B\u1161\u110E\u1175\u11B7",
        "\u110B\u1161\u1111\u1161\u1110\u1173",
        "\u110B\u1161\u1111\u1173\u1105\u1175\u110F\u1161",
        "\u110B\u1161\u1111\u1173\u11B7",
        "\u110B\u1161\u1112\u1169\u11B8",
        "\u110B\u1161\u1112\u1173\u11AB",
        "\u110B\u1161\u11A8\u1100\u1175",
        "\u110B\u1161\u11A8\u1106\u1169\u11BC",
        "\u110B\u1161\u11A8\u1109\u116E",
        "\u110B\u1161\u11AB\u1100\u1162",
        "\u110B\u1161\u11AB\u1100\u1167\u11BC",
        "\u110B\u1161\u11AB\u1100\u116A",
        "\u110B\u1161\u11AB\u1102\u1162",
        "\u110B\u1161\u11AB\u1102\u1167\u11BC",
        "\u110B\u1161\u11AB\u1103\u1169\u11BC",
        "\u110B\u1161\u11AB\u1107\u1161\u11BC",
        "\u110B\u1161\u11AB\u1107\u116E",
        "\u110B\u1161\u11AB\u110C\u116E",
        "\u110B\u1161\u11AF\u1105\u116E\u1106\u1175\u1102\u1172\u11B7",
        "\u110B\u1161\u11AF\u110F\u1169\u110B\u1169\u11AF",
        "\u110B\u1161\u11B7\u1109\u1175",
        "\u110B\u1161\u11B7\u110F\u1165\u11BA",
        "\u110B\u1161\u11B8\u1105\u1167\u11A8",
        "\u110B\u1161\u11C1\u1102\u1161\u11AF",
        "\u110B\u1161\u11C1\u1106\u116E\u11AB",
        "\u110B\u1162\u110B\u1175\u11AB",
        "\u110B\u1162\u110C\u1165\u11BC",
        "\u110B\u1162\u11A8\u1109\u116E",
        "\u110B\u1162\u11AF\u1107\u1165\u11B7",
        "\u110B\u1163\u1100\u1161\u11AB",
        "\u110B\u1163\u1103\u1161\u11AB",
        "\u110B\u1163\u110B\u1169\u11BC",
        "\u110B\u1163\u11A8\u1100\u1161\u11AB",
        "\u110B\u1163\u11A8\u1100\u116E\u11A8",
        "\u110B\u1163\u11A8\u1109\u1169\u11A8",
        "\u110B\u1163\u11A8\u1109\u116E",
        "\u110B\u1163\u11A8\u110C\u1165\u11B7",
        "\u110B\u1163\u11A8\u1111\u116E\u11B7",
        "\u110B\u1163\u11A8\u1112\u1169\u11AB\u1102\u1167",
        "\u110B\u1163\u11BC\u1102\u1167\u11B7",
        "\u110B\u1163\u11BC\u1105\u1167\u11A8",
        "\u110B\u1163\u11BC\u1106\u1161\u11AF",
        "\u110B\u1163\u11BC\u1107\u1162\u110E\u116E",
        "\u110B\u1163\u11BC\u110C\u116E",
        "\u110B\u1163\u11BC\u1111\u1161",
        "\u110B\u1165\u1103\u116E\u11B7",
        "\u110B\u1165\u1105\u1167\u110B\u116E\u11B7",
        "\u110B\u1165\u1105\u1173\u11AB",
        "\u110B\u1165\u110C\u1166\u11BA\u1107\u1161\u11B7",
        "\u110B\u1165\u110D\u1162\u11BB\u1103\u1173\u11AB",
        "\u110B\u1165\u110D\u1165\u1103\u1161\u1100\u1161",
        "\u110B\u1165\u110D\u1165\u11AB\u110C\u1175",
        "\u110B\u1165\u11AB\u1102\u1175",
        "\u110B\u1165\u11AB\u1103\u1165\u11A8",
        "\u110B\u1165\u11AB\u1105\u1169\u11AB",
        "\u110B\u1165\u11AB\u110B\u1165",
        "\u110B\u1165\u11AF\u1100\u116E\u11AF",
        "\u110B\u1165\u11AF\u1105\u1173\u11AB",
        "\u110B\u1165\u11AF\u110B\u1173\u11B7",
        "\u110B\u1165\u11AF\u1111\u1175\u11BA",
        "\u110B\u1165\u11B7\u1106\u1161",
        "\u110B\u1165\u11B8\u1106\u116E",
        "\u110B\u1165\u11B8\u110C\u1169\u11BC",
        "\u110B\u1165\u11B8\u110E\u1166",
        "\u110B\u1165\u11BC\u1103\u1165\u11BC\u110B\u1175",
        "\u110B\u1165\u11BC\u1106\u1161\u11BC",
        "\u110B\u1165\u11BC\u1110\u1165\u1105\u1175",
        "\u110B\u1165\u11BD\u1100\u1173\u110C\u1166",
        "\u110B\u1166\u1102\u1165\u110C\u1175",
        "\u110B\u1166\u110B\u1165\u110F\u1165\u11AB",
        "\u110B\u1166\u11AB\u110C\u1175\u11AB",
        "\u110B\u1167\u1100\u1165\u11AB",
        "\u110B\u1167\u1100\u1169\u1109\u1162\u11BC",
        "\u110B\u1167\u1100\u116A\u11AB",
        "\u110B\u1167\u1100\u116E\u11AB",
        "\u110B\u1167\u1100\u116F\u11AB",
        "\u110B\u1167\u1103\u1162\u1109\u1162\u11BC",
        "\u110B\u1167\u1103\u1165\u11B2",
        "\u110B\u1167\u1103\u1169\u11BC\u1109\u1162\u11BC",
        "\u110B\u1167\u1103\u1173\u11AB",
        "\u110B\u1167\u1105\u1169\u11AB",
        "\u110B\u1167\u1105\u1173\u11B7",
        "\u110B\u1167\u1109\u1165\u11BA",
        "\u110B\u1167\u1109\u1165\u11BC",
        "\u110B\u1167\u110B\u116A\u11BC",
        "\u110B\u1167\u110B\u1175\u11AB",
        "\u110B\u1167\u110C\u1165\u11AB\u1112\u1175",
        "\u110B\u1167\u110C\u1175\u11A8\u110B\u116F\u11AB",
        "\u110B\u1167\u1112\u1161\u11A8\u1109\u1162\u11BC",
        "\u110B\u1167\u1112\u1162\u11BC",
        "\u110B\u1167\u11A8\u1109\u1161",
        "\u110B\u1167\u11A8\u1109\u1175",
        "\u110B\u1167\u11A8\u1112\u1161\u11AF",
        "\u110B\u1167\u11AB\u1100\u1167\u11AF",
        "\u110B\u1167\u11AB\u1100\u116E",
        "\u110B\u1167\u11AB\u1100\u1173\u11A8",
        "\u110B\u1167\u11AB\u1100\u1175",
        "\u110B\u1167\u11AB\u1105\u1161\u11A8",
        "\u110B\u1167\u11AB\u1109\u1165\u11AF",
        "\u110B\u1167\u11AB\u1109\u1166",
        "\u110B\u1167\u11AB\u1109\u1169\u11A8",
        "\u110B\u1167\u11AB\u1109\u1173\u11B8",
        "\u110B\u1167\u11AB\u110B\u1162",
        "\u110B\u1167\u11AB\u110B\u1168\u110B\u1175\u11AB",
        "\u110B\u1167\u11AB\u110B\u1175\u11AB",
        "\u110B\u1167\u11AB\u110C\u1161\u11BC",
        "\u110B\u1167\u11AB\u110C\u116E",
        "\u110B\u1167\u11AB\u110E\u116E\u11AF",
        "\u110B\u1167\u11AB\u1111\u1175\u11AF",
        "\u110B\u1167\u11AB\u1112\u1161\u11B8",
        "\u110B\u1167\u11AB\u1112\u1172",
        "\u110B\u1167\u11AF\u1100\u1175",
        "\u110B\u1167\u11AF\u1106\u1162",
        "\u110B\u1167\u11AF\u1109\u116C",
        "\u110B\u1167\u11AF\u1109\u1175\u11B7\u1112\u1175",
        "\u110B\u1167\u11AF\u110C\u1165\u11BC",
        "\u110B\u1167\u11AF\u110E\u1161",
        "\u110B\u1167\u11AF\u1112\u1173\u11AF",
        "\u110B\u1167\u11B7\u1105\u1167",
        "\u110B\u1167\u11B8\u1109\u1165",
        "\u110B\u1167\u11BC\u1100\u116E\u11A8",
        "\u110B\u1167\u11BC\u1102\u1161\u11B7",
        "\u110B\u1167\u11BC\u1109\u1161\u11BC",
        "\u110B\u1167\u11BC\u110B\u1163\u11BC",
        "\u110B\u1167\u11BC\u110B\u1167\u11A8",
        "\u110B\u1167\u11BC\u110B\u116E\u11BC",
        "\u110B\u1167\u11BC\u110B\u116F\u11AB\u1112\u1175",
        "\u110B\u1167\u11BC\u1112\u1161",
        "\u110B\u1167\u11BC\u1112\u1163\u11BC",
        "\u110B\u1167\u11BC\u1112\u1169\u11AB",
        "\u110B\u1167\u11BC\u1112\u116A",
        "\u110B\u1167\u11C1\u1100\u116E\u1105\u1175",
        "\u110B\u1167\u11C1\u1107\u1161\u11BC",
        "\u110B\u1167\u11C1\u110C\u1175\u11B8",
        "\u110B\u1168\u1100\u1161\u11B7",
        "\u110B\u1168\u1100\u1173\u11B7",
        "\u110B\u1168\u1107\u1161\u11BC",
        "\u110B\u1168\u1109\u1161\u11AB",
        "\u110B\u1168\u1109\u1161\u11BC",
        "\u110B\u1168\u1109\u1165\u11AB",
        "\u110B\u1168\u1109\u116E\u11AF",
        "\u110B\u1168\u1109\u1173\u11B8",
        "\u110B\u1168\u1109\u1175\u11A8\u110C\u1161\u11BC",
        "\u110B\u1168\u110B\u1163\u11A8",
        "\u110B\u1168\u110C\u1165\u11AB",
        "\u110B\u1168\u110C\u1165\u11AF",
        "\u110B\u1168\u110C\u1165\u11BC",
        "\u110B\u1168\u110F\u1165\u11AB\u1103\u1162",
        "\u110B\u1168\u11BA\u1102\u1161\u11AF",
        "\u110B\u1169\u1102\u1173\u11AF",
        "\u110B\u1169\u1105\u1161\u11A8",
        "\u110B\u1169\u1105\u1162\u11BA\u1103\u1169\u11BC\u110B\u1161\u11AB",
        "\u110B\u1169\u1105\u1166\u11AB\u110C\u1175",
        "\u110B\u1169\u1105\u1169\u110C\u1175",
        "\u110B\u1169\u1105\u1173\u11AB\u1107\u1161\u11AF",
        "\u110B\u1169\u1107\u1173\u11AB",
        "\u110B\u1169\u1109\u1175\u11B8",
        "\u110B\u1169\u110B\u1167\u11B7",
        "\u110B\u1169\u110B\u116F\u11AF",
        "\u110B\u1169\u110C\u1165\u11AB",
        "\u110B\u1169\u110C\u1175\u11A8",
        "\u110B\u1169\u110C\u1175\u11BC\u110B\u1165",
        "\u110B\u1169\u1111\u1166\u1105\u1161",
        "\u110B\u1169\u1111\u1175\u1109\u1173\u1110\u1166\u11AF",
        "\u110B\u1169\u1112\u1175\u1105\u1167",
        "\u110B\u1169\u11A8\u1109\u1161\u11BC",
        "\u110B\u1169\u11A8\u1109\u116E\u1109\u116E",
        "\u110B\u1169\u11AB\u1100\u1161\u11BD",
        "\u110B\u1169\u11AB\u1105\u1161\u110B\u1175\u11AB",
        "\u110B\u1169\u11AB\u1106\u1169\u11B7",
        "\u110B\u1169\u11AB\u110C\u1169\u11BC\u110B\u1175\u11AF",
        "\u110B\u1169\u11AB\u1110\u1169\u11BC",
        "\u110B\u1169\u11AF\u1100\u1161\u110B\u1173\u11AF",
        "\u110B\u1169\u11AF\u1105\u1175\u11B7\u1111\u1175\u11A8",
        "\u110B\u1169\u11AF\u1112\u1162",
        "\u110B\u1169\u11BA\u110E\u1161\u1105\u1175\u11B7",
        "\u110B\u116A\u110B\u1175\u1109\u1167\u110E\u1173",
        "\u110B\u116A\u110B\u1175\u11AB",
        "\u110B\u116A\u11AB\u1109\u1165\u11BC",
        "\u110B\u116A\u11AB\u110C\u1165\u11AB",
        "\u110B\u116A\u11BC\u1107\u1175",
        "\u110B\u116A\u11BC\u110C\u1161",
        "\u110B\u116B\u1102\u1163\u1112\u1161\u1106\u1167\u11AB",
        "\u110B\u116B\u11AB\u110C\u1175",
        "\u110B\u116C\u1100\u1161\u11BA\u110C\u1175\u11B8",
        "\u110B\u116C\u1100\u116E\u11A8",
        "\u110B\u116C\u1105\u1169\u110B\u116E\u11B7",
        "\u110B\u116C\u1109\u1161\u11B7\u110E\u1169\u11AB",
        "\u110B\u116C\u110E\u116E\u11AF",
        "\u110B\u116C\u110E\u1175\u11B7",
        "\u110B\u116C\u1112\u1161\u11AF\u1106\u1165\u1102\u1175",
        "\u110B\u116C\u11AB\u1107\u1161\u11AF",
        "\u110B\u116C\u11AB\u1109\u1169\u11AB",
        "\u110B\u116C\u11AB\u110D\u1169\u11A8",
        "\u110B\u116D\u1100\u1173\u11B7",
        "\u110B\u116D\u110B\u1175\u11AF",
        "\u110B\u116D\u110C\u1173\u11B7",
        "\u110B\u116D\u110E\u1165\u11BC",
        "\u110B\u116D\u11BC\u1100\u1175",
        "\u110B\u116D\u11BC\u1109\u1165",
        "\u110B\u116D\u11BC\u110B\u1165",
        "\u110B\u116E\u1109\u1161\u11AB",
        "\u110B\u116E\u1109\u1165\u11AB",
        "\u110B\u116E\u1109\u1173\u11BC",
        "\u110B\u116E\u110B\u1167\u11AB\u1112\u1175",
        "\u110B\u116E\u110C\u1165\u11BC",
        "\u110B\u116E\u110E\u1166\u1100\u116E\u11A8",
        "\u110B\u116E\u1111\u1167\u11AB",
        "\u110B\u116E\u11AB\u1103\u1169\u11BC",
        "\u110B\u116E\u11AB\u1106\u1167\u11BC",
        "\u110B\u116E\u11AB\u1107\u1161\u11AB",
        "\u110B\u116E\u11AB\u110C\u1165\u11AB",
        "\u110B\u116E\u11AB\u1112\u1162\u11BC",
        "\u110B\u116E\u11AF\u1109\u1161\u11AB",
        "\u110B\u116E\u11AF\u110B\u1173\u11B7",
        "\u110B\u116E\u11B7\u110C\u1175\u11A8\u110B\u1175\u11B7",
        "\u110B\u116E\u11BA\u110B\u1165\u1105\u1173\u11AB",
        "\u110B\u116E\u11BA\u110B\u1173\u11B7",
        "\u110B\u116F\u1102\u1161\u11A8",
        "\u110B\u116F\u11AB\u1100\u1169",
        "\u110B\u116F\u11AB\u1105\u1162",
        "\u110B\u116F\u11AB\u1109\u1165",
        "\u110B\u116F\u11AB\u1109\u116E\u11BC\u110B\u1175",
        "\u110B\u116F\u11AB\u110B\u1175\u11AB",
        "\u110B\u116F\u11AB\u110C\u1161\u11BC",
        "\u110B\u116F\u11AB\u1111\u1175\u1109\u1173",
        "\u110B\u116F\u11AF\u1100\u1173\u11B8",
        "\u110B\u116F\u11AF\u1103\u1173\u110F\u1165\u11B8",
        "\u110B\u116F\u11AF\u1109\u1166",
        "\u110B\u116F\u11AF\u110B\u116D\u110B\u1175\u11AF",
        "\u110B\u1170\u110B\u1175\u1110\u1165",
        "\u110B\u1171\u1107\u1161\u11AB",
        "\u110B\u1171\u1107\u1165\u11B8",
        "\u110B\u1171\u1109\u1165\u11BC",
        "\u110B\u1171\u110B\u116F\u11AB",
        "\u110B\u1171\u1112\u1165\u11B7",
        "\u110B\u1171\u1112\u1167\u11B8",
        "\u110B\u1171\u11BA\u1109\u1161\u1105\u1161\u11B7",
        "\u110B\u1172\u1102\u1161\u11AB\u1112\u1175",
        "\u110B\u1172\u1105\u1165\u11B8",
        "\u110B\u1172\u1106\u1167\u11BC",
        "\u110B\u1172\u1106\u116E\u11AF",
        "\u110B\u1172\u1109\u1161\u11AB",
        "\u110B\u1172\u110C\u1165\u11A8",
        "\u110B\u1172\u110E\u1175\u110B\u116F\u11AB",
        "\u110B\u1172\u1112\u1161\u11A8",
        "\u110B\u1172\u1112\u1162\u11BC",
        "\u110B\u1172\u1112\u1167\u11BC",
        "\u110B\u1172\u11A8\u1100\u116E\u11AB",
        "\u110B\u1172\u11A8\u1109\u1161\u11BC",
        "\u110B\u1172\u11A8\u1109\u1175\u11B8",
        "\u110B\u1172\u11A8\u110E\u1166",
        "\u110B\u1173\u11AB\u1112\u1162\u11BC",
        "\u110B\u1173\u11B7\u1105\u1167\u11A8",
        "\u110B\u1173\u11B7\u1105\u116D",
        "\u110B\u1173\u11B7\u1107\u1161\u11AB",
        "\u110B\u1173\u11B7\u1109\u1165\u11BC",
        "\u110B\u1173\u11B7\u1109\u1175\u11A8",
        "\u110B\u1173\u11B7\u110B\u1161\u11A8",
        "\u110B\u1173\u11B7\u110C\u116E",
        "\u110B\u1174\u1100\u1167\u11AB",
        "\u110B\u1174\u1102\u1169\u11AB",
        "\u110B\u1174\u1106\u116E\u11AB",
        "\u110B\u1174\u1107\u1169\u11A8",
        "\u110B\u1174\u1109\u1175\u11A8",
        "\u110B\u1174\u1109\u1175\u11B7",
        "\u110B\u1174\u110B\u116C\u1105\u1169",
        "\u110B\u1174\u110B\u116D\u11A8",
        "\u110B\u1174\u110B\u116F\u11AB",
        "\u110B\u1174\u1112\u1161\u11A8",
        "\u110B\u1175\u1100\u1165\u11BA",
        "\u110B\u1175\u1100\u1169\u11BA",
        "\u110B\u1175\u1102\u1167\u11B7",
        "\u110B\u1175\u1102\u1169\u11B7",
        "\u110B\u1175\u1103\u1161\u11AF",
        "\u110B\u1175\u1103\u1162\u1105\u1169",
        "\u110B\u1175\u1103\u1169\u11BC",
        "\u110B\u1175\u1105\u1165\u11C2\u1100\u1166",
        "\u110B\u1175\u1105\u1167\u11A8\u1109\u1165",
        "\u110B\u1175\u1105\u1169\u11AB\u110C\u1165\u11A8",
        "\u110B\u1175\u1105\u1173\u11B7",
        "\u110B\u1175\u1106\u1175\u11AB",
        "\u110B\u1175\u1107\u1161\u11AF\u1109\u1169",
        "\u110B\u1175\u1107\u1167\u11AF",
        "\u110B\u1175\u1107\u116E\u11AF",
        "\u110B\u1175\u1108\u1161\u11AF",
        "\u110B\u1175\u1109\u1161\u11BC",
        "\u110B\u1175\u1109\u1165\u11BC",
        "\u110B\u1175\u1109\u1173\u11AF",
        "\u110B\u1175\u110B\u1163\u1100\u1175",
        "\u110B\u1175\u110B\u116D\u11BC",
        "\u110B\u1175\u110B\u116E\u11BA",
        "\u110B\u1175\u110B\u116F\u11AF",
        "\u110B\u1175\u110B\u1173\u11A8\u1100\u1169",
        "\u110B\u1175\u110B\u1175\u11A8",
        "\u110B\u1175\u110C\u1165\u11AB",
        "\u110B\u1175\u110C\u116E\u11BC",
        "\u110B\u1175\u1110\u1173\u11AE\u1102\u1161\u11AF",
        "\u110B\u1175\u1110\u1173\u11AF",
        "\u110B\u1175\u1112\u1169\u11AB",
        "\u110B\u1175\u11AB\u1100\u1161\u11AB",
        "\u110B\u1175\u11AB\u1100\u1167\u11A8",
        "\u110B\u1175\u11AB\u1100\u1169\u11BC",
        "\u110B\u1175\u11AB\u1100\u116E",
        "\u110B\u1175\u11AB\u1100\u1173\u11AB",
        "\u110B\u1175\u11AB\u1100\u1175",
        "\u110B\u1175\u11AB\u1103\u1169",
        "\u110B\u1175\u11AB\u1105\u1172",
        "\u110B\u1175\u11AB\u1106\u116E\u11AF",
        "\u110B\u1175\u11AB\u1109\u1162\u11BC",
        "\u110B\u1175\u11AB\u1109\u116B",
        "\u110B\u1175\u11AB\u110B\u1167\u11AB",
        "\u110B\u1175\u11AB\u110B\u116F\u11AB",
        "\u110B\u1175\u11AB\u110C\u1162",
        "\u110B\u1175\u11AB\u110C\u1169\u11BC",
        "\u110B\u1175\u11AB\u110E\u1165\u11AB",
        "\u110B\u1175\u11AB\u110E\u1166",
        "\u110B\u1175\u11AB\u1110\u1165\u1102\u1166\u11BA",
        "\u110B\u1175\u11AB\u1112\u1161",
        "\u110B\u1175\u11AB\u1112\u1167\u11BC",
        "\u110B\u1175\u11AF\u1100\u1169\u11B8",
        "\u110B\u1175\u11AF\u1100\u1175",
        "\u110B\u1175\u11AF\u1103\u1161\u11AB",
        "\u110B\u1175\u11AF\u1103\u1162",
        "\u110B\u1175\u11AF\u1103\u1173\u11BC",
        "\u110B\u1175\u11AF\u1107\u1161\u11AB",
        "\u110B\u1175\u11AF\u1107\u1169\u11AB",
        "\u110B\u1175\u11AF\u1107\u116E",
        "\u110B\u1175\u11AF\u1109\u1161\u11BC",
        "\u110B\u1175\u11AF\u1109\u1162\u11BC",
        "\u110B\u1175\u11AF\u1109\u1169\u11AB",
        "\u110B\u1175\u11AF\u110B\u116D\u110B\u1175\u11AF",
        "\u110B\u1175\u11AF\u110B\u116F\u11AF",
        "\u110B\u1175\u11AF\u110C\u1165\u11BC",
        "\u110B\u1175\u11AF\u110C\u1169\u11BC",
        "\u110B\u1175\u11AF\u110C\u116E\u110B\u1175\u11AF",
        "\u110B\u1175\u11AF\u110D\u1175\u11A8",
        "\u110B\u1175\u11AF\u110E\u1166",
        "\u110B\u1175\u11AF\u110E\u1175",
        "\u110B\u1175\u11AF\u1112\u1162\u11BC",
        "\u110B\u1175\u11AF\u1112\u116C\u110B\u116D\u11BC",
        "\u110B\u1175\u11B7\u1100\u1173\u11B7",
        "\u110B\u1175\u11B7\u1106\u116E",
        "\u110B\u1175\u11B8\u1103\u1162",
        "\u110B\u1175\u11B8\u1105\u1167\u11A8",
        "\u110B\u1175\u11B8\u1106\u1161\u11BA",
        "\u110B\u1175\u11B8\u1109\u1161",
        "\u110B\u1175\u11B8\u1109\u116E\u11AF",
        "\u110B\u1175\u11B8\u1109\u1175",
        "\u110B\u1175\u11B8\u110B\u116F\u11AB",
        "\u110B\u1175\u11B8\u110C\u1161\u11BC",
        "\u110B\u1175\u11B8\u1112\u1161\u11A8",
        "\u110C\u1161\u1100\u1161\u110B\u116D\u11BC",
        "\u110C\u1161\u1100\u1167\u11A8",
        "\u110C\u1161\u1100\u1173\u11A8",
        "\u110C\u1161\u1103\u1169\u11BC",
        "\u110C\u1161\u1105\u1161\u11BC",
        "\u110C\u1161\u1107\u116E\u1109\u1175\u11B7",
        "\u110C\u1161\u1109\u1175\u11A8",
        "\u110C\u1161\u1109\u1175\u11AB",
        "\u110C\u1161\u110B\u1167\u11AB",
        "\u110C\u1161\u110B\u116F\u11AB",
        "\u110C\u1161\u110B\u1172\u11AF",
        "\u110C\u1161\u110C\u1165\u11AB\u1100\u1165",
        "\u110C\u1161\u110C\u1165\u11BC",
        "\u110C\u1161\u110C\u1169\u11AB\u1109\u1175\u11B7",
        "\u110C\u1161\u1111\u1161\u11AB",
        "\u110C\u1161\u11A8\u1100\u1161",
        "\u110C\u1161\u11A8\u1102\u1167\u11AB",
        "\u110C\u1161\u11A8\u1109\u1165\u11BC",
        "\u110C\u1161\u11A8\u110B\u1165\u11B8",
        "\u110C\u1161\u11A8\u110B\u116D\u11BC",
        "\u110C\u1161\u11A8\u110B\u1173\u11AB\u1104\u1161\u11AF",
        "\u110C\u1161\u11A8\u1111\u116E\u11B7",
        "\u110C\u1161\u11AB\u1103\u1175",
        "\u110C\u1161\u11AB\u1104\u1173\u11A8",
        "\u110C\u1161\u11AB\u110E\u1175",
        "\u110C\u1161\u11AF\u1106\u1169\u11BA",
        "\u110C\u1161\u11B7\u1101\u1161\u11AB",
        "\u110C\u1161\u11B7\u1109\u116E\u1112\u1161\u11B7",
        "\u110C\u1161\u11B7\u1109\u1175",
        "\u110C\u1161\u11B7\u110B\u1169\u11BA",
        "\u110C\u1161\u11B7\u110C\u1161\u1105\u1175",
        "\u110C\u1161\u11B8\u110C\u1175",
        "\u110C\u1161\u11BC\u1100\u116A\u11AB",
        "\u110C\u1161\u11BC\u1100\u116E\u11AB",
        "\u110C\u1161\u11BC\u1100\u1175\u1100\u1161\u11AB",
        "\u110C\u1161\u11BC\u1105\u1162",
        "\u110C\u1161\u11BC\u1105\u1168",
        "\u110C\u1161\u11BC\u1105\u1173",
        "\u110C\u1161\u11BC\u1106\u1161",
        "\u110C\u1161\u11BC\u1106\u1167\u11AB",
        "\u110C\u1161\u11BC\u1106\u1169",
        "\u110C\u1161\u11BC\u1106\u1175",
        "\u110C\u1161\u11BC\u1107\u1175",
        "\u110C\u1161\u11BC\u1109\u1161",
        "\u110C\u1161\u11BC\u1109\u1169",
        "\u110C\u1161\u11BC\u1109\u1175\u11A8",
        "\u110C\u1161\u11BC\u110B\u1162\u110B\u1175\u11AB",
        "\u110C\u1161\u11BC\u110B\u1175\u11AB",
        "\u110C\u1161\u11BC\u110C\u1165\u11B7",
        "\u110C\u1161\u11BC\u110E\u1161",
        "\u110C\u1161\u11BC\u1112\u1161\u11A8\u1100\u1173\u11B7",
        "\u110C\u1162\u1102\u1173\u11BC",
        "\u110C\u1162\u1108\u1161\u11AF\u1105\u1175",
        "\u110C\u1162\u1109\u1161\u11AB",
        "\u110C\u1162\u1109\u1162\u11BC",
        "\u110C\u1162\u110C\u1161\u11A8\u1102\u1167\u11AB",
        "\u110C\u1162\u110C\u1165\u11BC",
        "\u110C\u1162\u110E\u1162\u1100\u1175",
        "\u110C\u1162\u1111\u1161\u11AB",
        "\u110C\u1162\u1112\u1161\u11A8",
        "\u110C\u1162\u1112\u116A\u11AF\u110B\u116D\u11BC",
        "\u110C\u1165\u1100\u1165\u11BA",
        "\u110C\u1165\u1100\u1169\u1105\u1175",
        "\u110C\u1165\u1100\u1169\u11BA",
        "\u110C\u1165\u1102\u1167\u11A8",
        "\u110C\u1165\u1105\u1165\u11AB",
        "\u110C\u1165\u1105\u1165\u11C2\u1100\u1166",
        "\u110C\u1165\u1107\u1165\u11AB",
        "\u110C\u1165\u110B\u116E\u11AF",
        "\u110C\u1165\u110C\u1165\u11AF\u1105\u1169",
        "\u110C\u1165\u110E\u116E\u11A8",
        "\u110C\u1165\u11A8\u1100\u1173\u11A8",
        "\u110C\u1165\u11A8\u1103\u1161\u11BC\u1112\u1175",
        "\u110C\u1165\u11A8\u1109\u1165\u11BC",
        "\u110C\u1165\u11A8\u110B\u116D\u11BC",
        "\u110C\u1165\u11A8\u110B\u1173\u11BC",
        "\u110C\u1165\u11AB\u1100\u1162",
        "\u110C\u1165\u11AB\u1100\u1169\u11BC",
        "\u110C\u1165\u11AB\u1100\u1175",
        "\u110C\u1165\u11AB\u1103\u1161\u11AF",
        "\u110C\u1165\u11AB\u1105\u1161\u1103\u1169",
        "\u110C\u1165\u11AB\u1106\u1161\u11BC",
        "\u110C\u1165\u11AB\u1106\u116E\u11AB",
        "\u110C\u1165\u11AB\u1107\u1161\u11AB",
        "\u110C\u1165\u11AB\u1107\u116E",
        "\u110C\u1165\u11AB\u1109\u1166",
        "\u110C\u1165\u11AB\u1109\u1175",
        "\u110C\u1165\u11AB\u110B\u116D\u11BC",
        "\u110C\u1165\u11AB\u110C\u1161",
        "\u110C\u1165\u11AB\u110C\u1162\u11BC",
        "\u110C\u1165\u11AB\u110C\u116E",
        "\u110C\u1165\u11AB\u110E\u1165\u11AF",
        "\u110C\u1165\u11AB\u110E\u1166",
        "\u110C\u1165\u11AB\u1110\u1169\u11BC",
        "\u110C\u1165\u11AB\u1112\u1167",
        "\u110C\u1165\u11AB\u1112\u116E",
        "\u110C\u1165\u11AF\u1103\u1162",
        "\u110C\u1165\u11AF\u1106\u1161\u11BC",
        "\u110C\u1165\u11AF\u1107\u1161\u11AB",
        "\u110C\u1165\u11AF\u110B\u1163\u11A8",
        "\u110C\u1165\u11AF\u110E\u1161",
        "\u110C\u1165\u11B7\u1100\u1165\u11B7",
        "\u110C\u1165\u11B7\u1109\u116E",
        "\u110C\u1165\u11B7\u1109\u1175\u11B7",
        "\u110C\u1165\u11B7\u110B\u116F\u11AB",
        "\u110C\u1165\u11B7\u110C\u1165\u11B7",
        "\u110C\u1165\u11B7\u110E\u1161",
        "\u110C\u1165\u11B8\u1100\u1173\u11AB",
        "\u110C\u1165\u11B8\u1109\u1175",
        "\u110C\u1165\u11B8\u110E\u1169\u11A8",
        "\u110C\u1165\u11BA\u1100\u1161\u1105\u1161\u11A8",
        "\u110C\u1165\u11BC\u1100\u1165\u110C\u1161\u11BC",
        "\u110C\u1165\u11BC\u1103\u1169",
        "\u110C\u1165\u11BC\u1105\u1172\u110C\u1161\u11BC",
        "\u110C\u1165\u11BC\u1105\u1175",
        "\u110C\u1165\u11BC\u1106\u1161\u11AF",
        "\u110C\u1165\u11BC\u1106\u1167\u11AB",
        "\u110C\u1165\u11BC\u1106\u116E\u11AB",
        "\u110C\u1165\u11BC\u1107\u1161\u11AB\u1103\u1162",
        "\u110C\u1165\u11BC\u1107\u1169",
        "\u110C\u1165\u11BC\u1107\u116E",
        "\u110C\u1165\u11BC\u1107\u1175",
        "\u110C\u1165\u11BC\u1109\u1161\u11BC",
        "\u110C\u1165\u11BC\u1109\u1165\u11BC",
        "\u110C\u1165\u11BC\u110B\u1169",
        "\u110C\u1165\u11BC\u110B\u116F\u11AB",
        "\u110C\u1165\u11BC\u110C\u1161\u11BC",
        "\u110C\u1165\u11BC\u110C\u1175",
        "\u110C\u1165\u11BC\u110E\u1175",
        "\u110C\u1165\u11BC\u1112\u116A\u11A8\u1112\u1175",
        "\u110C\u1166\u1100\u1169\u11BC",
        "\u110C\u1166\u1100\u116A\u110C\u1165\u11B7",
        "\u110C\u1166\u1103\u1162\u1105\u1169",
        "\u110C\u1166\u1106\u1169\u11A8",
        "\u110C\u1166\u1107\u1161\u11AF",
        "\u110C\u1166\u1107\u1165\u11B8",
        "\u110C\u1166\u1109\u1161\u11BA\u1102\u1161\u11AF",
        "\u110C\u1166\u110B\u1161\u11AB",
        "\u110C\u1166\u110B\u1175\u11AF",
        "\u110C\u1166\u110C\u1161\u11A8",
        "\u110C\u1166\u110C\u116E\u1103\u1169",
        "\u110C\u1166\u110E\u116E\u11AF",
        "\u110C\u1166\u1111\u116E\u11B7",
        "\u110C\u1166\u1112\u1161\u11AB",
        "\u110C\u1169\u1100\u1161\u11A8",
        "\u110C\u1169\u1100\u1165\u11AB",
        "\u110C\u1169\u1100\u1173\u11B7",
        "\u110C\u1169\u1100\u1175\u11BC",
        "\u110C\u1169\u1106\u1167\u11BC",
        "\u110C\u1169\u1106\u1175\u1105\u116D",
        "\u110C\u1169\u1109\u1161\u11BC",
        "\u110C\u1169\u1109\u1165\u11AB",
        "\u110C\u1169\u110B\u116D\u11BC\u1112\u1175",
        "\u110C\u1169\u110C\u1165\u11AF",
        "\u110C\u1169\u110C\u1165\u11BC",
        "\u110C\u1169\u110C\u1175\u11A8",
        "\u110C\u1169\u11AB\u1103\u1162\u11BA\u1106\u1161\u11AF",
        "\u110C\u1169\u11AB\u110C\u1162",
        "\u110C\u1169\u11AF\u110B\u1165\u11B8",
        "\u110C\u1169\u11AF\u110B\u1173\u11B7",
        "\u110C\u1169\u11BC\u1100\u116D",
        "\u110C\u1169\u11BC\u1105\u1169",
        "\u110C\u1169\u11BC\u1105\u1172",
        "\u110C\u1169\u11BC\u1109\u1169\u1105\u1175",
        "\u110C\u1169\u11BC\u110B\u1165\u11B8\u110B\u116F\u11AB",
        "\u110C\u1169\u11BC\u110C\u1169\u11BC",
        "\u110C\u1169\u11BC\u1112\u1161\u11B8",
        "\u110C\u116A\u1109\u1165\u11A8",
        "\u110C\u116C\u110B\u1175\u11AB",
        "\u110C\u116E\u1100\u116A\u11AB\u110C\u1165\u11A8",
        "\u110C\u116E\u1105\u1173\u11B7",
        "\u110C\u116E\u1106\u1161\u11AF",
        "\u110C\u116E\u1106\u1165\u1102\u1175",
        "\u110C\u116E\u1106\u1165\u11A8",
        "\u110C\u116E\u1106\u116E\u11AB",
        "\u110C\u116E\u1106\u1175\u11AB",
        "\u110C\u116E\u1107\u1161\u11BC",
        "\u110C\u116E\u1107\u1167\u11AB",
        "\u110C\u116E\u1109\u1175\u11A8",
        "\u110C\u116E\u110B\u1175\u11AB",
        "\u110C\u116E\u110B\u1175\u11AF",
        "\u110C\u116E\u110C\u1161\u11BC",
        "\u110C\u116E\u110C\u1165\u11AB\u110C\u1161",
        "\u110C\u116E\u1110\u1162\u11A8",
        "\u110C\u116E\u11AB\u1107\u1175",
        "\u110C\u116E\u11AF\u1100\u1165\u1105\u1175",
        "\u110C\u116E\u11AF\u1100\u1175",
        "\u110C\u116E\u11AF\u1106\u116E\u1102\u1174",
        "\u110C\u116E\u11BC\u1100\u1161\u11AB",
        "\u110C\u116E\u11BC\u1100\u1168\u1107\u1161\u11BC\u1109\u1169\u11BC",
        "\u110C\u116E\u11BC\u1100\u116E\u11A8",
        "\u110C\u116E\u11BC\u1102\u1167\u11AB",
        "\u110C\u116E\u11BC\u1103\u1161\u11AB",
        "\u110C\u116E\u11BC\u1103\u1169\u11A8",
        "\u110C\u116E\u11BC\u1107\u1161\u11AB",
        "\u110C\u116E\u11BC\u1107\u116E",
        "\u110C\u116E\u11BC\u1109\u1166",
        "\u110C\u116E\u11BC\u1109\u1169\u1100\u1175\u110B\u1165\u11B8",
        "\u110C\u116E\u11BC\u1109\u116E\u11AB",
        "\u110C\u116E\u11BC\u110B\u1161\u11BC",
        "\u110C\u116E\u11BC\u110B\u116D",
        "\u110C\u116E\u11BC\u1112\u1161\u11A8\u1100\u116D",
        "\u110C\u1173\u11A8\u1109\u1165\u11A8",
        "\u110C\u1173\u11A8\u1109\u1175",
        "\u110C\u1173\u11AF\u1100\u1165\u110B\u116E\u11B7",
        "\u110C\u1173\u11BC\u1100\u1161",
        "\u110C\u1173\u11BC\u1100\u1165",
        "\u110C\u1173\u11BC\u1100\u116F\u11AB",
        "\u110C\u1173\u11BC\u1109\u1161\u11BC",
        "\u110C\u1173\u11BC\u1109\u1166",
        "\u110C\u1175\u1100\u1161\u11A8",
        "\u110C\u1175\u1100\u1161\u11B8",
        "\u110C\u1175\u1100\u1167\u11BC",
        "\u110C\u1175\u1100\u1173\u11A8\u1112\u1175",
        "\u110C\u1175\u1100\u1173\u11B7",
        "\u110C\u1175\u1100\u1173\u11B8",
        "\u110C\u1175\u1102\u1173\u11BC",
        "\u110C\u1175\u1105\u1173\u11B7\u1100\u1175\u11AF",
        "\u110C\u1175\u1105\u1175\u1109\u1161\u11AB",
        "\u110C\u1175\u1107\u1161\u11BC",
        "\u110C\u1175\u1107\u116E\u11BC",
        "\u110C\u1175\u1109\u1175\u11A8",
        "\u110C\u1175\u110B\u1167\u11A8",
        "\u110C\u1175\u110B\u116E\u1100\u1162",
        "\u110C\u1175\u110B\u116F\u11AB",
        "\u110C\u1175\u110C\u1165\u11A8",
        "\u110C\u1175\u110C\u1165\u11B7",
        "\u110C\u1175\u110C\u1175\u11AB",
        "\u110C\u1175\u110E\u116E\u11AF",
        "\u110C\u1175\u11A8\u1109\u1165\u11AB",
        "\u110C\u1175\u11A8\u110B\u1165\u11B8",
        "\u110C\u1175\u11A8\u110B\u116F\u11AB",
        "\u110C\u1175\u11A8\u110C\u1161\u11BC",
        "\u110C\u1175\u11AB\u1100\u1173\u11B8",
        "\u110C\u1175\u11AB\u1103\u1169\u11BC",
        "\u110C\u1175\u11AB\u1105\u1169",
        "\u110C\u1175\u11AB\u1105\u116D",
        "\u110C\u1175\u11AB\u1105\u1175",
        "\u110C\u1175\u11AB\u110D\u1161",
        "\u110C\u1175\u11AB\u110E\u1161\u11AF",
        "\u110C\u1175\u11AB\u110E\u116E\u11AF",
        "\u110C\u1175\u11AB\u1110\u1169\u11BC",
        "\u110C\u1175\u11AB\u1112\u1162\u11BC",
        "\u110C\u1175\u11AF\u1106\u116E\u11AB",
        "\u110C\u1175\u11AF\u1107\u1167\u11BC",
        "\u110C\u1175\u11AF\u1109\u1165",
        "\u110C\u1175\u11B7\u110C\u1161\u11A8",
        "\u110C\u1175\u11B8\u1103\u1161\u11AB",
        "\u110C\u1175\u11B8\u110B\u1161\u11AB",
        "\u110C\u1175\u11B8\u110C\u116E\u11BC",
        "\u110D\u1161\u110C\u1173\u11BC",
        "\u110D\u1175\u1101\u1165\u1100\u1175",
        "\u110E\u1161\u1102\u1161\u11B7",
        "\u110E\u1161\u1105\u1161\u1105\u1175",
        "\u110E\u1161\u1105\u1163\u11BC",
        "\u110E\u1161\u1105\u1175\u11B7",
        "\u110E\u1161\u1107\u1167\u11AF",
        "\u110E\u1161\u1109\u1165\u11AB",
        "\u110E\u1161\u110E\u1173\u11B7",
        "\u110E\u1161\u11A8\u1100\u1161\u11A8",
        "\u110E\u1161\u11AB\u1106\u116E\u11AF",
        "\u110E\u1161\u11AB\u1109\u1165\u11BC",
        "\u110E\u1161\u11B7\u1100\u1161",
        "\u110E\u1161\u11B7\u1100\u1175\u1105\u1173\u11B7",
        "\u110E\u1161\u11B7\u1109\u1162",
        "\u110E\u1161\u11B7\u1109\u1165\u11A8",
        "\u110E\u1161\u11B7\u110B\u1167",
        "\u110E\u1161\u11B7\u110B\u116C",
        "\u110E\u1161\u11B7\u110C\u1169",
        "\u110E\u1161\u11BA\u110C\u1161\u11AB",
        "\u110E\u1161\u11BC\u1100\u1161",
        "\u110E\u1161\u11BC\u1100\u1169",
        "\u110E\u1161\u11BC\u1100\u116E",
        "\u110E\u1161\u11BC\u1106\u116E\u11AB",
        "\u110E\u1161\u11BC\u1107\u1161\u11A9",
        "\u110E\u1161\u11BC\u110C\u1161\u11A8",
        "\u110E\u1161\u11BC\u110C\u1169",
        "\u110E\u1162\u1102\u1165\u11AF",
        "\u110E\u1162\u110C\u1165\u11B7",
        "\u110E\u1162\u11A8\u1100\u1161\u1107\u1161\u11BC",
        "\u110E\u1162\u11A8\u1107\u1161\u11BC",
        "\u110E\u1162\u11A8\u1109\u1161\u11BC",
        "\u110E\u1162\u11A8\u110B\u1175\u11B7",
        "\u110E\u1162\u11B7\u1111\u1175\u110B\u1165\u11AB",
        "\u110E\u1165\u1107\u1165\u11AF",
        "\u110E\u1165\u110B\u1173\u11B7",
        "\u110E\u1165\u11AB\u1100\u116E\u11A8",
        "\u110E\u1165\u11AB\u1103\u116E\u11BC",
        "\u110E\u1165\u11AB\u110C\u1161\u11BC",
        "\u110E\u1165\u11AB\u110C\u1162",
        "\u110E\u1165\u11AB\u110E\u1165\u11AB\u1112\u1175",
        "\u110E\u1165\u11AF\u1103\u1169",
        "\u110E\u1165\u11AF\u110C\u1165\u1112\u1175",
        "\u110E\u1165\u11AF\u1112\u1161\u11A8",
        "\u110E\u1165\u11BA\u1102\u1161\u11AF",
        "\u110E\u1165\u11BA\u110D\u1162",
        "\u110E\u1165\u11BC\u1102\u1167\u11AB",
        "\u110E\u1165\u11BC\u1107\u1161\u110C\u1175",
        "\u110E\u1165\u11BC\u1109\u1169",
        "\u110E\u1165\u11BC\u110E\u116E\u11AB",
        "\u110E\u1166\u1100\u1168",
        "\u110E\u1166\u1105\u1167\u11A8",
        "\u110E\u1166\u110B\u1169\u11AB",
        "\u110E\u1166\u110B\u1172\u11A8",
        "\u110E\u1166\u110C\u116E\u11BC",
        "\u110E\u1166\u1112\u1165\u11B7",
        "\u110E\u1169\u1103\u1173\u11BC\u1112\u1161\u11A8\u1109\u1162\u11BC",
        "\u110E\u1169\u1107\u1161\u11AB",
        "\u110E\u1169\u1107\u1161\u11B8",
        "\u110E\u1169\u1109\u1161\u11BC\u1112\u116A",
        "\u110E\u1169\u1109\u116E\u11AB",
        "\u110E\u1169\u110B\u1167\u1105\u1173\u11B7",
        "\u110E\u1169\u110B\u116F\u11AB",
        "\u110E\u1169\u110C\u1165\u1102\u1167\u11A8",
        "\u110E\u1169\u110C\u1165\u11B7",
        "\u110E\u1169\u110E\u1165\u11BC",
        "\u110E\u1169\u110F\u1169\u11AF\u1105\u1175\u11BA",
        "\u110E\u1169\u11BA\u1107\u116E\u11AF",
        "\u110E\u1169\u11BC\u1100\u1161\u11A8",
        "\u110E\u1169\u11BC\u1105\u1175",
        "\u110E\u1169\u11BC\u110C\u1161\u11BC",
        "\u110E\u116A\u11AF\u110B\u1167\u11BC",
        "\u110E\u116C\u1100\u1173\u11AB",
        "\u110E\u116C\u1109\u1161\u11BC",
        "\u110E\u116C\u1109\u1165\u11AB",
        "\u110E\u116C\u1109\u1175\u11AB",
        "\u110E\u116C\u110B\u1161\u11A8",
        "\u110E\u116C\u110C\u1169\u11BC",
        "\u110E\u116E\u1109\u1165\u11A8",
        "\u110E\u116E\u110B\u1165\u11A8",
        "\u110E\u116E\u110C\u1175\u11AB",
        "\u110E\u116E\u110E\u1165\u11AB",
        "\u110E\u116E\u110E\u1173\u11A8",
        "\u110E\u116E\u11A8\u1100\u116E",
        "\u110E\u116E\u11A8\u1109\u1169",
        "\u110E\u116E\u11A8\u110C\u1166",
        "\u110E\u116E\u11A8\u1112\u1161",
        "\u110E\u116E\u11AF\u1100\u1173\u11AB",
        "\u110E\u116E\u11AF\u1107\u1161\u11AF",
        "\u110E\u116E\u11AF\u1109\u1161\u11AB",
        "\u110E\u116E\u11AF\u1109\u1175\u11AB",
        "\u110E\u116E\u11AF\u110B\u1167\u11AB",
        "\u110E\u116E\u11AF\u110B\u1175\u11B8",
        "\u110E\u116E\u11AF\u110C\u1161\u11BC",
        "\u110E\u116E\u11AF\u1111\u1161\u11AB",
        "\u110E\u116E\u11BC\u1100\u1167\u11A8",
        "\u110E\u116E\u11BC\u1100\u1169",
        "\u110E\u116E\u11BC\u1103\u1169\u11AF",
        "\u110E\u116E\u11BC\u1107\u116E\u11AB\u1112\u1175",
        "\u110E\u116E\u11BC\u110E\u1165\u11BC\u1103\u1169",
        "\u110E\u1171\u110B\u1165\u11B8",
        "\u110E\u1171\u110C\u1175\u11A8",
        "\u110E\u1171\u1112\u1163\u11BC",
        "\u110E\u1175\u110B\u1163\u11A8",
        "\u110E\u1175\u11AB\u1100\u116E",
        "\u110E\u1175\u11AB\u110E\u1165\u11A8",
        "\u110E\u1175\u11AF\u1109\u1175\u11B8",
        "\u110E\u1175\u11AF\u110B\u116F\u11AF",
        "\u110E\u1175\u11AF\u1111\u1161\u11AB",
        "\u110E\u1175\u11B7\u1103\u1162",
        "\u110E\u1175\u11B7\u1106\u116E\u11A8",
        "\u110E\u1175\u11B7\u1109\u1175\u11AF",
        "\u110E\u1175\u11BA\u1109\u1169\u11AF",
        "\u110E\u1175\u11BC\u110E\u1161\u11AB",
        "\u110F\u1161\u1106\u1166\u1105\u1161",
        "\u110F\u1161\u110B\u116E\u11AB\u1110\u1165",
        "\u110F\u1161\u11AF\u1100\u116E\u11A8\u1109\u116E",
        "\u110F\u1162\u1105\u1175\u11A8\u1110\u1165",
        "\u110F\u1162\u11B7\u1111\u1165\u1109\u1173",
        "\u110F\u1162\u11B7\u1111\u1166\u110B\u1175\u11AB",
        "\u110F\u1165\u1110\u1173\u11AB",
        "\u110F\u1165\u11AB\u1103\u1175\u1109\u1167\u11AB",
        "\u110F\u1165\u11AF\u1105\u1165",
        "\u110F\u1165\u11B7\u1111\u1172\u1110\u1165",
        "\u110F\u1169\u1101\u1175\u1105\u1175",
        "\u110F\u1169\u1106\u1175\u1103\u1175",
        "\u110F\u1169\u11AB\u1109\u1165\u1110\u1173",
        "\u110F\u1169\u11AF\u1105\u1161",
        "\u110F\u1169\u11B7\u1111\u1173\u11AF\u1105\u1166\u11A8\u1109\u1173",
        "\u110F\u1169\u11BC\u1102\u1161\u1106\u116E\u11AF",
        "\u110F\u116B\u1100\u1161\u11B7",
        "\u110F\u116E\u1103\u1166\u1110\u1161",
        "\u110F\u1173\u1105\u1175\u11B7",
        "\u110F\u1173\u11AB\u1100\u1175\u11AF",
        "\u110F\u1173\u11AB\u1104\u1161\u11AF",
        "\u110F\u1173\u11AB\u1109\u1169\u1105\u1175",
        "\u110F\u1173\u11AB\u110B\u1161\u1103\u1173\u11AF",
        "\u110F\u1173\u11AB\u110B\u1165\u1106\u1165\u1102\u1175",
        "\u110F\u1173\u11AB\u110B\u1175\u11AF",
        "\u110F\u1173\u11AB\u110C\u1165\u11AF",
        "\u110F\u1173\u11AF\u1105\u1162\u1109\u1175\u11A8",
        "\u110F\u1173\u11AF\u1105\u1165\u11B8",
        "\u110F\u1175\u11AF\u1105\u1169",
        "\u1110\u1161\u110B\u1175\u11B8",
        "\u1110\u1161\u110C\u1161\u1100\u1175",
        "\u1110\u1161\u11A8\u1100\u116E",
        "\u1110\u1161\u11A8\u110C\u1161",
        "\u1110\u1161\u11AB\u1109\u1162\u11BC",
        "\u1110\u1162\u1100\u116F\u11AB\u1103\u1169",
        "\u1110\u1162\u110B\u1163\u11BC",
        "\u1110\u1162\u1111\u116E\u11BC",
        "\u1110\u1162\u11A8\u1109\u1175",
        "\u1110\u1162\u11AF\u1105\u1165\u11AB\u1110\u1173",
        "\u1110\u1165\u1102\u1165\u11AF",
        "\u1110\u1165\u1106\u1175\u1102\u1165\u11AF",
        "\u1110\u1166\u1102\u1175\u1109\u1173",
        "\u1110\u1166\u1109\u1173\u1110\u1173",
        "\u1110\u1166\u110B\u1175\u1107\u1173\u11AF",
        "\u1110\u1166\u11AF\u1105\u1166\u1107\u1175\u110C\u1165\u11AB",
        "\u1110\u1169\u1105\u1169\u11AB",
        "\u1110\u1169\u1106\u1161\u1110\u1169",
        "\u1110\u1169\u110B\u116D\u110B\u1175\u11AF",
        "\u1110\u1169\u11BC\u1100\u1168",
        "\u1110\u1169\u11BC\u1100\u116A",
        "\u1110\u1169\u11BC\u1105\u1169",
        "\u1110\u1169\u11BC\u1109\u1175\u11AB",
        "\u1110\u1169\u11BC\u110B\u1167\u11A8",
        "\u1110\u1169\u11BC\u110B\u1175\u11AF",
        "\u1110\u1169\u11BC\u110C\u1161\u11BC",
        "\u1110\u1169\u11BC\u110C\u1166",
        "\u1110\u1169\u11BC\u110C\u1173\u11BC",
        "\u1110\u1169\u11BC\u1112\u1161\u11B8",
        "\u1110\u1169\u11BC\u1112\u116A",
        "\u1110\u116C\u1100\u1173\u11AB",
        "\u1110\u116C\u110B\u116F\u11AB",
        "\u1110\u116C\u110C\u1175\u11A8\u1100\u1173\u11B7",
        "\u1110\u1171\u1100\u1175\u11B7",
        "\u1110\u1173\u1105\u1165\u11A8",
        "\u1110\u1173\u11A8\u1100\u1173\u11B8",
        "\u1110\u1173\u11A8\u1107\u1167\u11AF",
        "\u1110\u1173\u11A8\u1109\u1165\u11BC",
        "\u1110\u1173\u11A8\u1109\u116E",
        "\u1110\u1173\u11A8\u110C\u1175\u11BC",
        "\u1110\u1173\u11A8\u1112\u1175",
        "\u1110\u1173\u11AB\u1110\u1173\u11AB\u1112\u1175",
        "\u1110\u1175\u1109\u1167\u110E\u1173",
        "\u1111\u1161\u1105\u1161\u11AB\u1109\u1162\u11A8",
        "\u1111\u1161\u110B\u1175\u11AF",
        "\u1111\u1161\u110E\u116E\u11AF\u1109\u1169",
        "\u1111\u1161\u11AB\u1100\u1167\u11AF",
        "\u1111\u1161\u11AB\u1103\u1161\u11AB",
        "\u1111\u1161\u11AB\u1106\u1162",
        "\u1111\u1161\u11AB\u1109\u1161",
        "\u1111\u1161\u11AF\u1109\u1175\u11B8",
        "\u1111\u1161\u11AF\u110B\u116F\u11AF",
        "\u1111\u1161\u11B8\u1109\u1169\u11BC",
        "\u1111\u1162\u1109\u1167\u11AB",
        "\u1111\u1162\u11A8\u1109\u1173",
        "\u1111\u1162\u11A8\u1109\u1175\u1106\u1175\u11AF\u1105\u1175",
        "\u1111\u1162\u11AB\u1110\u1175",
        "\u1111\u1165\u1109\u1166\u11AB\u1110\u1173",
        "\u1111\u1166\u110B\u1175\u11AB\u1110\u1173",
        "\u1111\u1167\u11AB\u1100\u1167\u11AB",
        "\u1111\u1167\u11AB\u110B\u1174",
        "\u1111\u1167\u11AB\u110C\u1175",
        "\u1111\u1167\u11AB\u1112\u1175",
        "\u1111\u1167\u11BC\u1100\u1161",
        "\u1111\u1167\u11BC\u1100\u1172\u11AB",
        "\u1111\u1167\u11BC\u1109\u1162\u11BC",
        "\u1111\u1167\u11BC\u1109\u1169",
        "\u1111\u1167\u11BC\u110B\u1163\u11BC",
        "\u1111\u1167\u11BC\u110B\u1175\u11AF",
        "\u1111\u1167\u11BC\u1112\u116A",
        "\u1111\u1169\u1109\u1173\u1110\u1165",
        "\u1111\u1169\u110B\u1175\u11AB\u1110\u1173",
        "\u1111\u1169\u110C\u1161\u11BC",
        "\u1111\u1169\u1112\u1161\u11B7",
        "\u1111\u116D\u1106\u1167\u11AB",
        "\u1111\u116D\u110C\u1165\u11BC",
        "\u1111\u116D\u110C\u116E\u11AB",
        "\u1111\u116D\u1112\u1167\u11AB",
        "\u1111\u116E\u11B7\u1106\u1169\u11A8",
        "\u1111\u116E\u11B7\u110C\u1175\u11AF",
        "\u1111\u116E\u11BC\u1100\u1167\u11BC",
        "\u1111\u116E\u11BC\u1109\u1169\u11A8",
        "\u1111\u116E\u11BC\u1109\u1173\u11B8",
        "\u1111\u1173\u1105\u1161\u11BC\u1109\u1173",
        "\u1111\u1173\u1105\u1175\u11AB\u1110\u1165",
        "\u1111\u1173\u11AF\u1105\u1161\u1109\u1173\u1110\u1175\u11A8",
        "\u1111\u1175\u1100\u1169\u11AB",
        "\u1111\u1175\u1106\u1161\u11BC",
        "\u1111\u1175\u110B\u1161\u1102\u1169",
        "\u1111\u1175\u11AF\u1105\u1173\u11B7",
        "\u1111\u1175\u11AF\u1109\u116E",
        "\u1111\u1175\u11AF\u110B\u116D",
        "\u1111\u1175\u11AF\u110C\u1161",
        "\u1111\u1175\u11AF\u1110\u1169\u11BC",
        "\u1111\u1175\u11BC\u1100\u1168",
        "\u1112\u1161\u1102\u1173\u1102\u1175\u11B7",
        "\u1112\u1161\u1102\u1173\u11AF",
        "\u1112\u1161\u1103\u1173\u110B\u1170\u110B\u1165",
        "\u1112\u1161\u1105\u116E\u11BA\u1107\u1161\u11B7",
        "\u1112\u1161\u1107\u1161\u11AB\u1100\u1175",
        "\u1112\u1161\u1109\u116E\u11A8\u110C\u1175\u11B8",
        "\u1112\u1161\u1109\u116E\u11AB",
        "\u1112\u1161\u110B\u1167\u1110\u1173\u11AB",
        "\u1112\u1161\u110C\u1175\u1106\u1161\u11AB",
        "\u1112\u1161\u110E\u1165\u11AB",
        "\u1112\u1161\u1111\u116E\u11B7",
        "\u1112\u1161\u1111\u1175\u11AF",
        "\u1112\u1161\u11A8\u1100\u116A",
        "\u1112\u1161\u11A8\u1100\u116D",
        "\u1112\u1161\u11A8\u1100\u1173\u11B8",
        "\u1112\u1161\u11A8\u1100\u1175",
        "\u1112\u1161\u11A8\u1102\u1167\u11AB",
        "\u1112\u1161\u11A8\u1105\u1167\u11A8",
        "\u1112\u1161\u11A8\u1107\u1165\u11AB",
        "\u1112\u1161\u11A8\u1107\u116E\u1106\u1169",
        "\u1112\u1161\u11A8\u1107\u1175",
        "\u1112\u1161\u11A8\u1109\u1162\u11BC",
        "\u1112\u1161\u11A8\u1109\u116E\u11AF",
        "\u1112\u1161\u11A8\u1109\u1173\u11B8",
        "\u1112\u1161\u11A8\u110B\u116D\u11BC\u1111\u116E\u11B7",
        "\u1112\u1161\u11A8\u110B\u116F\u11AB",
        "\u1112\u1161\u11A8\u110B\u1171",
        "\u1112\u1161\u11A8\u110C\u1161",
        "\u1112\u1161\u11A8\u110C\u1165\u11B7",
        "\u1112\u1161\u11AB\u1100\u1168",
        "\u1112\u1161\u11AB\u1100\u1173\u11AF",
        "\u1112\u1161\u11AB\u1101\u1165\u1107\u1165\u11AB\u110B\u1166",
        "\u1112\u1161\u11AB\u1102\u1161\u11BD",
        "\u1112\u1161\u11AB\u1102\u116E\u11AB",
        "\u1112\u1161\u11AB\u1103\u1169\u11BC\u110B\u1161\u11AB",
        "\u1112\u1161\u11AB\u1104\u1162",
        "\u1112\u1161\u11AB\u1105\u1161\u1109\u1161\u11AB",
        "\u1112\u1161\u11AB\u1106\u1161\u1103\u1175",
        "\u1112\u1161\u11AB\u1106\u116E\u11AB",
        "\u1112\u1161\u11AB\u1107\u1165\u11AB",
        "\u1112\u1161\u11AB\u1107\u1169\u11A8",
        "\u1112\u1161\u11AB\u1109\u1175\u11A8",
        "\u1112\u1161\u11AB\u110B\u1167\u1105\u1173\u11B7",
        "\u1112\u1161\u11AB\u110D\u1169\u11A8",
        "\u1112\u1161\u11AF\u1106\u1165\u1102\u1175",
        "\u1112\u1161\u11AF\u110B\u1161\u1107\u1165\u110C\u1175",
        "\u1112\u1161\u11AF\u110B\u1175\u11AB",
        "\u1112\u1161\u11B7\u1101\u1166",
        "\u1112\u1161\u11B7\u1107\u116E\u1105\u1169",
        "\u1112\u1161\u11B8\u1100\u1167\u11A8",
        "\u1112\u1161\u11B8\u1105\u1175\u110C\u1165\u11A8",
        "\u1112\u1161\u11BC\u1100\u1169\u11BC",
        "\u1112\u1161\u11BC\u1100\u116E",
        "\u1112\u1161\u11BC\u1109\u1161\u11BC",
        "\u1112\u1161\u11BC\u110B\u1174",
        "\u1112\u1162\u1100\u1167\u11AF",
        "\u1112\u1162\u1100\u116E\u11AB",
        "\u1112\u1162\u1103\u1161\u11B8",
        "\u1112\u1162\u1103\u1161\u11BC",
        "\u1112\u1162\u1106\u116E\u11AF",
        "\u1112\u1162\u1109\u1165\u11A8",
        "\u1112\u1162\u1109\u1165\u11AF",
        "\u1112\u1162\u1109\u116E\u110B\u116D\u11A8\u110C\u1161\u11BC",
        "\u1112\u1162\u110B\u1161\u11AB",
        "\u1112\u1162\u11A8\u1109\u1175\u11B7",
        "\u1112\u1162\u11AB\u1103\u1173\u1107\u1162\u11A8",
        "\u1112\u1162\u11B7\u1107\u1165\u1100\u1165",
        "\u1112\u1162\u11BA\u1107\u1167\u11C0",
        "\u1112\u1162\u11BA\u1109\u1161\u11AF",
        "\u1112\u1162\u11BC\u1103\u1169\u11BC",
        "\u1112\u1162\u11BC\u1107\u1169\u11A8",
        "\u1112\u1162\u11BC\u1109\u1161",
        "\u1112\u1162\u11BC\u110B\u116E\u11AB",
        "\u1112\u1162\u11BC\u110B\u1171",
        "\u1112\u1163\u11BC\u1100\u1175",
        "\u1112\u1163\u11BC\u1109\u1161\u11BC",
        "\u1112\u1163\u11BC\u1109\u116E",
        "\u1112\u1165\u1105\u1161\u11A8",
        "\u1112\u1165\u110B\u116D\u11BC",
        "\u1112\u1166\u11AF\u1100\u1175",
        "\u1112\u1167\u11AB\u1100\u116A\u11AB",
        "\u1112\u1167\u11AB\u1100\u1173\u11B7",
        "\u1112\u1167\u11AB\u1103\u1162",
        "\u1112\u1167\u11AB\u1109\u1161\u11BC",
        "\u1112\u1167\u11AB\u1109\u1175\u11AF",
        "\u1112\u1167\u11AB\u110C\u1161\u11BC",
        "\u1112\u1167\u11AB\u110C\u1162",
        "\u1112\u1167\u11AB\u110C\u1175",
        "\u1112\u1167\u11AF\u110B\u1162\u11A8",
        "\u1112\u1167\u11B8\u1105\u1167\u11A8",
        "\u1112\u1167\u11BC\u1107\u116E",
        "\u1112\u1167\u11BC\u1109\u1161",
        "\u1112\u1167\u11BC\u1109\u116E",
        "\u1112\u1167\u11BC\u1109\u1175\u11A8",
        "\u1112\u1167\u11BC\u110C\u1166",
        "\u1112\u1167\u11BC\u1110\u1162",
        "\u1112\u1167\u11BC\u1111\u1167\u11AB",
        "\u1112\u1168\u1110\u1162\u11A8",
        "\u1112\u1169\u1100\u1175\u1109\u1175\u11B7",
        "\u1112\u1169\u1102\u1161\u11B7",
        "\u1112\u1169\u1105\u1161\u11BC\u110B\u1175",
        "\u1112\u1169\u1107\u1161\u11A8",
        "\u1112\u1169\u1110\u1166\u11AF",
        "\u1112\u1169\u1112\u1173\u11B8",
        "\u1112\u1169\u11A8\u1109\u1175",
        "\u1112\u1169\u11AF\u1105\u1169",
        "\u1112\u1169\u11B7\u1111\u1166\u110B\u1175\u110C\u1175",
        "\u1112\u1169\u11BC\u1107\u1169",
        "\u1112\u1169\u11BC\u1109\u116E",
        "\u1112\u1169\u11BC\u110E\u1161",
        "\u1112\u116A\u1106\u1167\u11AB",
        "\u1112\u116A\u1107\u116E\u11AB",
        "\u1112\u116A\u1109\u1161\u11AF",
        "\u1112\u116A\u110B\u116D\u110B\u1175\u11AF",
        "\u1112\u116A\u110C\u1161\u11BC",
        "\u1112\u116A\u1112\u1161\u11A8",
        "\u1112\u116A\u11A8\u1107\u1169",
        "\u1112\u116A\u11A8\u110B\u1175\u11AB",
        "\u1112\u116A\u11A8\u110C\u1161\u11BC",
        "\u1112\u116A\u11A8\u110C\u1165\u11BC",
        "\u1112\u116A\u11AB\u1100\u1161\u11B8",
        "\u1112\u116A\u11AB\u1100\u1167\u11BC",
        "\u1112\u116A\u11AB\u110B\u1167\u11BC",
        "\u1112\u116A\u11AB\u110B\u1172\u11AF",
        "\u1112\u116A\u11AB\u110C\u1161",
        "\u1112\u116A\u11AF\u1100\u1175",
        "\u1112\u116A\u11AF\u1103\u1169\u11BC",
        "\u1112\u116A\u11AF\u1107\u1161\u11AF\u1112\u1175",
        "\u1112\u116A\u11AF\u110B\u116D\u11BC",
        "\u1112\u116A\u11AF\u110D\u1161\u11A8",
        "\u1112\u116C\u1100\u1167\u11AB",
        "\u1112\u116C\u1100\u116A\u11AB",
        "\u1112\u116C\u1107\u1169\u11A8",
        "\u1112\u116C\u1109\u1162\u11A8",
        "\u1112\u116C\u110B\u116F\u11AB",
        "\u1112\u116C\u110C\u1161\u11BC",
        "\u1112\u116C\u110C\u1165\u11AB",
        "\u1112\u116C\u11BA\u1109\u116E",
        "\u1112\u116C\u11BC\u1103\u1161\u11AB\u1107\u1169\u1103\u1169",
        "\u1112\u116D\u110B\u1172\u11AF\u110C\u1165\u11A8",
        "\u1112\u116E\u1107\u1161\u11AB",
        "\u1112\u116E\u110E\u116E\u11BA\u1100\u1161\u1105\u116E",
        "\u1112\u116E\u11AB\u1105\u1167\u11AB",
        "\u1112\u116F\u11AF\u110A\u1175\u11AB",
        "\u1112\u1172\u1109\u1175\u11A8",
        "\u1112\u1172\u110B\u1175\u11AF",
        "\u1112\u1172\u11BC\u1102\u1162",
        "\u1112\u1173\u1105\u1173\u11B7",
        "\u1112\u1173\u11A8\u1107\u1162\u11A8",
        "\u1112\u1173\u11A8\u110B\u1175\u11AB",
        "\u1112\u1173\u11AB\u110C\u1165\u11A8",
        "\u1112\u1173\u11AB\u1112\u1175",
        "\u1112\u1173\u11BC\u1106\u1175",
        "\u1112\u1173\u11BC\u1107\u116E\u11AB",
        "\u1112\u1174\u1100\u1169\u11A8",
        "\u1112\u1174\u1106\u1161\u11BC",
        "\u1112\u1174\u1109\u1162\u11BC",
        "\u1112\u1174\u11AB\u1109\u1162\u11A8",
        "\u1112\u1175\u11B7\u1101\u1165\u11BA"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/french.json
  var require_french = __commonJS({
    "node_modules/bip39/src/wordlists/french.json"(exports, module) {
      module.exports = [
        "abaisser",
        "abandon",
        "abdiquer",
        "abeille",
        "abolir",
        "aborder",
        "aboutir",
        "aboyer",
        "abrasif",
        "abreuver",
        "abriter",
        "abroger",
        "abrupt",
        "absence",
        "absolu",
        "absurde",
        "abusif",
        "abyssal",
        "acade\u0301mie",
        "acajou",
        "acarien",
        "accabler",
        "accepter",
        "acclamer",
        "accolade",
        "accroche",
        "accuser",
        "acerbe",
        "achat",
        "acheter",
        "aciduler",
        "acier",
        "acompte",
        "acque\u0301rir",
        "acronyme",
        "acteur",
        "actif",
        "actuel",
        "adepte",
        "ade\u0301quat",
        "adhe\u0301sif",
        "adjectif",
        "adjuger",
        "admettre",
        "admirer",
        "adopter",
        "adorer",
        "adoucir",
        "adresse",
        "adroit",
        "adulte",
        "adverbe",
        "ae\u0301rer",
        "ae\u0301ronef",
        "affaire",
        "affecter",
        "affiche",
        "affreux",
        "affubler",
        "agacer",
        "agencer",
        "agile",
        "agiter",
        "agrafer",
        "agre\u0301able",
        "agrume",
        "aider",
        "aiguille",
        "ailier",
        "aimable",
        "aisance",
        "ajouter",
        "ajuster",
        "alarmer",
        "alchimie",
        "alerte",
        "alge\u0300bre",
        "algue",
        "alie\u0301ner",
        "aliment",
        "alle\u0301ger",
        "alliage",
        "allouer",
        "allumer",
        "alourdir",
        "alpaga",
        "altesse",
        "alve\u0301ole",
        "amateur",
        "ambigu",
        "ambre",
        "ame\u0301nager",
        "amertume",
        "amidon",
        "amiral",
        "amorcer",
        "amour",
        "amovible",
        "amphibie",
        "ampleur",
        "amusant",
        "analyse",
        "anaphore",
        "anarchie",
        "anatomie",
        "ancien",
        "ane\u0301antir",
        "angle",
        "angoisse",
        "anguleux",
        "animal",
        "annexer",
        "annonce",
        "annuel",
        "anodin",
        "anomalie",
        "anonyme",
        "anormal",
        "antenne",
        "antidote",
        "anxieux",
        "apaiser",
        "ape\u0301ritif",
        "aplanir",
        "apologie",
        "appareil",
        "appeler",
        "apporter",
        "appuyer",
        "aquarium",
        "aqueduc",
        "arbitre",
        "arbuste",
        "ardeur",
        "ardoise",
        "argent",
        "arlequin",
        "armature",
        "armement",
        "armoire",
        "armure",
        "arpenter",
        "arracher",
        "arriver",
        "arroser",
        "arsenic",
        "arte\u0301riel",
        "article",
        "aspect",
        "asphalte",
        "aspirer",
        "assaut",
        "asservir",
        "assiette",
        "associer",
        "assurer",
        "asticot",
        "astre",
        "astuce",
        "atelier",
        "atome",
        "atrium",
        "atroce",
        "attaque",
        "attentif",
        "attirer",
        "attraper",
        "aubaine",
        "auberge",
        "audace",
        "audible",
        "augurer",
        "aurore",
        "automne",
        "autruche",
        "avaler",
        "avancer",
        "avarice",
        "avenir",
        "averse",
        "aveugle",
        "aviateur",
        "avide",
        "avion",
        "aviser",
        "avoine",
        "avouer",
        "avril",
        "axial",
        "axiome",
        "badge",
        "bafouer",
        "bagage",
        "baguette",
        "baignade",
        "balancer",
        "balcon",
        "baleine",
        "balisage",
        "bambin",
        "bancaire",
        "bandage",
        "banlieue",
        "bannie\u0300re",
        "banquier",
        "barbier",
        "baril",
        "baron",
        "barque",
        "barrage",
        "bassin",
        "bastion",
        "bataille",
        "bateau",
        "batterie",
        "baudrier",
        "bavarder",
        "belette",
        "be\u0301lier",
        "belote",
        "be\u0301ne\u0301fice",
        "berceau",
        "berger",
        "berline",
        "bermuda",
        "besace",
        "besogne",
        "be\u0301tail",
        "beurre",
        "biberon",
        "bicycle",
        "bidule",
        "bijou",
        "bilan",
        "bilingue",
        "billard",
        "binaire",
        "biologie",
        "biopsie",
        "biotype",
        "biscuit",
        "bison",
        "bistouri",
        "bitume",
        "bizarre",
        "blafard",
        "blague",
        "blanchir",
        "blessant",
        "blinder",
        "blond",
        "bloquer",
        "blouson",
        "bobard",
        "bobine",
        "boire",
        "boiser",
        "bolide",
        "bonbon",
        "bondir",
        "bonheur",
        "bonifier",
        "bonus",
        "bordure",
        "borne",
        "botte",
        "boucle",
        "boueux",
        "bougie",
        "boulon",
        "bouquin",
        "bourse",
        "boussole",
        "boutique",
        "boxeur",
        "branche",
        "brasier",
        "brave",
        "brebis",
        "bre\u0300che",
        "breuvage",
        "bricoler",
        "brigade",
        "brillant",
        "brioche",
        "brique",
        "brochure",
        "broder",
        "bronzer",
        "brousse",
        "broyeur",
        "brume",
        "brusque",
        "brutal",
        "bruyant",
        "buffle",
        "buisson",
        "bulletin",
        "bureau",
        "burin",
        "bustier",
        "butiner",
        "butoir",
        "buvable",
        "buvette",
        "cabanon",
        "cabine",
        "cachette",
        "cadeau",
        "cadre",
        "cafe\u0301ine",
        "caillou",
        "caisson",
        "calculer",
        "calepin",
        "calibre",
        "calmer",
        "calomnie",
        "calvaire",
        "camarade",
        "came\u0301ra",
        "camion",
        "campagne",
        "canal",
        "caneton",
        "canon",
        "cantine",
        "canular",
        "capable",
        "caporal",
        "caprice",
        "capsule",
        "capter",
        "capuche",
        "carabine",
        "carbone",
        "caresser",
        "caribou",
        "carnage",
        "carotte",
        "carreau",
        "carton",
        "cascade",
        "casier",
        "casque",
        "cassure",
        "causer",
        "caution",
        "cavalier",
        "caverne",
        "caviar",
        "ce\u0301dille",
        "ceinture",
        "ce\u0301leste",
        "cellule",
        "cendrier",
        "censurer",
        "central",
        "cercle",
        "ce\u0301re\u0301bral",
        "cerise",
        "cerner",
        "cerveau",
        "cesser",
        "chagrin",
        "chaise",
        "chaleur",
        "chambre",
        "chance",
        "chapitre",
        "charbon",
        "chasseur",
        "chaton",
        "chausson",
        "chavirer",
        "chemise",
        "chenille",
        "che\u0301quier",
        "chercher",
        "cheval",
        "chien",
        "chiffre",
        "chignon",
        "chime\u0300re",
        "chiot",
        "chlorure",
        "chocolat",
        "choisir",
        "chose",
        "chouette",
        "chrome",
        "chute",
        "cigare",
        "cigogne",
        "cimenter",
        "cine\u0301ma",
        "cintrer",
        "circuler",
        "cirer",
        "cirque",
        "citerne",
        "citoyen",
        "citron",
        "civil",
        "clairon",
        "clameur",
        "claquer",
        "classe",
        "clavier",
        "client",
        "cligner",
        "climat",
        "clivage",
        "cloche",
        "clonage",
        "cloporte",
        "cobalt",
        "cobra",
        "cocasse",
        "cocotier",
        "coder",
        "codifier",
        "coffre",
        "cogner",
        "cohe\u0301sion",
        "coiffer",
        "coincer",
        "cole\u0300re",
        "colibri",
        "colline",
        "colmater",
        "colonel",
        "combat",
        "come\u0301die",
        "commande",
        "compact",
        "concert",
        "conduire",
        "confier",
        "congeler",
        "connoter",
        "consonne",
        "contact",
        "convexe",
        "copain",
        "copie",
        "corail",
        "corbeau",
        "cordage",
        "corniche",
        "corpus",
        "correct",
        "corte\u0300ge",
        "cosmique",
        "costume",
        "coton",
        "coude",
        "coupure",
        "courage",
        "couteau",
        "couvrir",
        "coyote",
        "crabe",
        "crainte",
        "cravate",
        "crayon",
        "cre\u0301ature",
        "cre\u0301diter",
        "cre\u0301meux",
        "creuser",
        "crevette",
        "cribler",
        "crier",
        "cristal",
        "crite\u0300re",
        "croire",
        "croquer",
        "crotale",
        "crucial",
        "cruel",
        "crypter",
        "cubique",
        "cueillir",
        "cuille\u0300re",
        "cuisine",
        "cuivre",
        "culminer",
        "cultiver",
        "cumuler",
        "cupide",
        "curatif",
        "curseur",
        "cyanure",
        "cycle",
        "cylindre",
        "cynique",
        "daigner",
        "damier",
        "danger",
        "danseur",
        "dauphin",
        "de\u0301battre",
        "de\u0301biter",
        "de\u0301border",
        "de\u0301brider",
        "de\u0301butant",
        "de\u0301caler",
        "de\u0301cembre",
        "de\u0301chirer",
        "de\u0301cider",
        "de\u0301clarer",
        "de\u0301corer",
        "de\u0301crire",
        "de\u0301cupler",
        "de\u0301dale",
        "de\u0301ductif",
        "de\u0301esse",
        "de\u0301fensif",
        "de\u0301filer",
        "de\u0301frayer",
        "de\u0301gager",
        "de\u0301givrer",
        "de\u0301glutir",
        "de\u0301grafer",
        "de\u0301jeuner",
        "de\u0301lice",
        "de\u0301loger",
        "demander",
        "demeurer",
        "de\u0301molir",
        "de\u0301nicher",
        "de\u0301nouer",
        "dentelle",
        "de\u0301nuder",
        "de\u0301part",
        "de\u0301penser",
        "de\u0301phaser",
        "de\u0301placer",
        "de\u0301poser",
        "de\u0301ranger",
        "de\u0301rober",
        "de\u0301sastre",
        "descente",
        "de\u0301sert",
        "de\u0301signer",
        "de\u0301sobe\u0301ir",
        "dessiner",
        "destrier",
        "de\u0301tacher",
        "de\u0301tester",
        "de\u0301tourer",
        "de\u0301tresse",
        "devancer",
        "devenir",
        "deviner",
        "devoir",
        "diable",
        "dialogue",
        "diamant",
        "dicter",
        "diffe\u0301rer",
        "dige\u0301rer",
        "digital",
        "digne",
        "diluer",
        "dimanche",
        "diminuer",
        "dioxyde",
        "directif",
        "diriger",
        "discuter",
        "disposer",
        "dissiper",
        "distance",
        "divertir",
        "diviser",
        "docile",
        "docteur",
        "dogme",
        "doigt",
        "domaine",
        "domicile",
        "dompter",
        "donateur",
        "donjon",
        "donner",
        "dopamine",
        "dortoir",
        "dorure",
        "dosage",
        "doseur",
        "dossier",
        "dotation",
        "douanier",
        "double",
        "douceur",
        "douter",
        "doyen",
        "dragon",
        "draper",
        "dresser",
        "dribbler",
        "droiture",
        "duperie",
        "duplexe",
        "durable",
        "durcir",
        "dynastie",
        "e\u0301blouir",
        "e\u0301carter",
        "e\u0301charpe",
        "e\u0301chelle",
        "e\u0301clairer",
        "e\u0301clipse",
        "e\u0301clore",
        "e\u0301cluse",
        "e\u0301cole",
        "e\u0301conomie",
        "e\u0301corce",
        "e\u0301couter",
        "e\u0301craser",
        "e\u0301cre\u0301mer",
        "e\u0301crivain",
        "e\u0301crou",
        "e\u0301cume",
        "e\u0301cureuil",
        "e\u0301difier",
        "e\u0301duquer",
        "effacer",
        "effectif",
        "effigie",
        "effort",
        "effrayer",
        "effusion",
        "e\u0301galiser",
        "e\u0301garer",
        "e\u0301jecter",
        "e\u0301laborer",
        "e\u0301largir",
        "e\u0301lectron",
        "e\u0301le\u0301gant",
        "e\u0301le\u0301phant",
        "e\u0301le\u0300ve",
        "e\u0301ligible",
        "e\u0301litisme",
        "e\u0301loge",
        "e\u0301lucider",
        "e\u0301luder",
        "emballer",
        "embellir",
        "embryon",
        "e\u0301meraude",
        "e\u0301mission",
        "emmener",
        "e\u0301motion",
        "e\u0301mouvoir",
        "empereur",
        "employer",
        "emporter",
        "emprise",
        "e\u0301mulsion",
        "encadrer",
        "enche\u0300re",
        "enclave",
        "encoche",
        "endiguer",
        "endosser",
        "endroit",
        "enduire",
        "e\u0301nergie",
        "enfance",
        "enfermer",
        "enfouir",
        "engager",
        "engin",
        "englober",
        "e\u0301nigme",
        "enjamber",
        "enjeu",
        "enlever",
        "ennemi",
        "ennuyeux",
        "enrichir",
        "enrobage",
        "enseigne",
        "entasser",
        "entendre",
        "entier",
        "entourer",
        "entraver",
        "e\u0301nume\u0301rer",
        "envahir",
        "enviable",
        "envoyer",
        "enzyme",
        "e\u0301olien",
        "e\u0301paissir",
        "e\u0301pargne",
        "e\u0301patant",
        "e\u0301paule",
        "e\u0301picerie",
        "e\u0301pide\u0301mie",
        "e\u0301pier",
        "e\u0301pilogue",
        "e\u0301pine",
        "e\u0301pisode",
        "e\u0301pitaphe",
        "e\u0301poque",
        "e\u0301preuve",
        "e\u0301prouver",
        "e\u0301puisant",
        "e\u0301querre",
        "e\u0301quipe",
        "e\u0301riger",
        "e\u0301rosion",
        "erreur",
        "e\u0301ruption",
        "escalier",
        "espadon",
        "espe\u0300ce",
        "espie\u0300gle",
        "espoir",
        "esprit",
        "esquiver",
        "essayer",
        "essence",
        "essieu",
        "essorer",
        "estime",
        "estomac",
        "estrade",
        "e\u0301tage\u0300re",
        "e\u0301taler",
        "e\u0301tanche",
        "e\u0301tatique",
        "e\u0301teindre",
        "e\u0301tendoir",
        "e\u0301ternel",
        "e\u0301thanol",
        "e\u0301thique",
        "ethnie",
        "e\u0301tirer",
        "e\u0301toffer",
        "e\u0301toile",
        "e\u0301tonnant",
        "e\u0301tourdir",
        "e\u0301trange",
        "e\u0301troit",
        "e\u0301tude",
        "euphorie",
        "e\u0301valuer",
        "e\u0301vasion",
        "e\u0301ventail",
        "e\u0301vidence",
        "e\u0301viter",
        "e\u0301volutif",
        "e\u0301voquer",
        "exact",
        "exage\u0301rer",
        "exaucer",
        "exceller",
        "excitant",
        "exclusif",
        "excuse",
        "exe\u0301cuter",
        "exemple",
        "exercer",
        "exhaler",
        "exhorter",
        "exigence",
        "exiler",
        "exister",
        "exotique",
        "expe\u0301dier",
        "explorer",
        "exposer",
        "exprimer",
        "exquis",
        "extensif",
        "extraire",
        "exulter",
        "fable",
        "fabuleux",
        "facette",
        "facile",
        "facture",
        "faiblir",
        "falaise",
        "fameux",
        "famille",
        "farceur",
        "farfelu",
        "farine",
        "farouche",
        "fasciner",
        "fatal",
        "fatigue",
        "faucon",
        "fautif",
        "faveur",
        "favori",
        "fe\u0301brile",
        "fe\u0301conder",
        "fe\u0301de\u0301rer",
        "fe\u0301lin",
        "femme",
        "fe\u0301mur",
        "fendoir",
        "fe\u0301odal",
        "fermer",
        "fe\u0301roce",
        "ferveur",
        "festival",
        "feuille",
        "feutre",
        "fe\u0301vrier",
        "fiasco",
        "ficeler",
        "fictif",
        "fide\u0300le",
        "figure",
        "filature",
        "filetage",
        "filie\u0300re",
        "filleul",
        "filmer",
        "filou",
        "filtrer",
        "financer",
        "finir",
        "fiole",
        "firme",
        "fissure",
        "fixer",
        "flairer",
        "flamme",
        "flasque",
        "flatteur",
        "fle\u0301au",
        "fle\u0300che",
        "fleur",
        "flexion",
        "flocon",
        "flore",
        "fluctuer",
        "fluide",
        "fluvial",
        "folie",
        "fonderie",
        "fongible",
        "fontaine",
        "forcer",
        "forgeron",
        "formuler",
        "fortune",
        "fossile",
        "foudre",
        "fouge\u0300re",
        "fouiller",
        "foulure",
        "fourmi",
        "fragile",
        "fraise",
        "franchir",
        "frapper",
        "frayeur",
        "fre\u0301gate",
        "freiner",
        "frelon",
        "fre\u0301mir",
        "fre\u0301ne\u0301sie",
        "fre\u0300re",
        "friable",
        "friction",
        "frisson",
        "frivole",
        "froid",
        "fromage",
        "frontal",
        "frotter",
        "fruit",
        "fugitif",
        "fuite",
        "fureur",
        "furieux",
        "furtif",
        "fusion",
        "futur",
        "gagner",
        "galaxie",
        "galerie",
        "gambader",
        "garantir",
        "gardien",
        "garnir",
        "garrigue",
        "gazelle",
        "gazon",
        "ge\u0301ant",
        "ge\u0301latine",
        "ge\u0301lule",
        "gendarme",
        "ge\u0301ne\u0301ral",
        "ge\u0301nie",
        "genou",
        "gentil",
        "ge\u0301ologie",
        "ge\u0301ome\u0300tre",
        "ge\u0301ranium",
        "germe",
        "gestuel",
        "geyser",
        "gibier",
        "gicler",
        "girafe",
        "givre",
        "glace",
        "glaive",
        "glisser",
        "globe",
        "gloire",
        "glorieux",
        "golfeur",
        "gomme",
        "gonfler",
        "gorge",
        "gorille",
        "goudron",
        "gouffre",
        "goulot",
        "goupille",
        "gourmand",
        "goutte",
        "graduel",
        "graffiti",
        "graine",
        "grand",
        "grappin",
        "gratuit",
        "gravir",
        "grenat",
        "griffure",
        "griller",
        "grimper",
        "grogner",
        "gronder",
        "grotte",
        "groupe",
        "gruger",
        "grutier",
        "gruye\u0300re",
        "gue\u0301pard",
        "guerrier",
        "guide",
        "guimauve",
        "guitare",
        "gustatif",
        "gymnaste",
        "gyrostat",
        "habitude",
        "hachoir",
        "halte",
        "hameau",
        "hangar",
        "hanneton",
        "haricot",
        "harmonie",
        "harpon",
        "hasard",
        "he\u0301lium",
        "he\u0301matome",
        "herbe",
        "he\u0301risson",
        "hermine",
        "he\u0301ron",
        "he\u0301siter",
        "heureux",
        "hiberner",
        "hibou",
        "hilarant",
        "histoire",
        "hiver",
        "homard",
        "hommage",
        "homoge\u0300ne",
        "honneur",
        "honorer",
        "honteux",
        "horde",
        "horizon",
        "horloge",
        "hormone",
        "horrible",
        "houleux",
        "housse",
        "hublot",
        "huileux",
        "humain",
        "humble",
        "humide",
        "humour",
        "hurler",
        "hydromel",
        "hygie\u0300ne",
        "hymne",
        "hypnose",
        "idylle",
        "ignorer",
        "iguane",
        "illicite",
        "illusion",
        "image",
        "imbiber",
        "imiter",
        "immense",
        "immobile",
        "immuable",
        "impact",
        "impe\u0301rial",
        "implorer",
        "imposer",
        "imprimer",
        "imputer",
        "incarner",
        "incendie",
        "incident",
        "incliner",
        "incolore",
        "indexer",
        "indice",
        "inductif",
        "ine\u0301dit",
        "ineptie",
        "inexact",
        "infini",
        "infliger",
        "informer",
        "infusion",
        "inge\u0301rer",
        "inhaler",
        "inhiber",
        "injecter",
        "injure",
        "innocent",
        "inoculer",
        "inonder",
        "inscrire",
        "insecte",
        "insigne",
        "insolite",
        "inspirer",
        "instinct",
        "insulter",
        "intact",
        "intense",
        "intime",
        "intrigue",
        "intuitif",
        "inutile",
        "invasion",
        "inventer",
        "inviter",
        "invoquer",
        "ironique",
        "irradier",
        "irre\u0301el",
        "irriter",
        "isoler",
        "ivoire",
        "ivresse",
        "jaguar",
        "jaillir",
        "jambe",
        "janvier",
        "jardin",
        "jauger",
        "jaune",
        "javelot",
        "jetable",
        "jeton",
        "jeudi",
        "jeunesse",
        "joindre",
        "joncher",
        "jongler",
        "joueur",
        "jouissif",
        "journal",
        "jovial",
        "joyau",
        "joyeux",
        "jubiler",
        "jugement",
        "junior",
        "jupon",
        "juriste",
        "justice",
        "juteux",
        "juve\u0301nile",
        "kayak",
        "kimono",
        "kiosque",
        "label",
        "labial",
        "labourer",
        "lace\u0301rer",
        "lactose",
        "lagune",
        "laine",
        "laisser",
        "laitier",
        "lambeau",
        "lamelle",
        "lampe",
        "lanceur",
        "langage",
        "lanterne",
        "lapin",
        "largeur",
        "larme",
        "laurier",
        "lavabo",
        "lavoir",
        "lecture",
        "le\u0301gal",
        "le\u0301ger",
        "le\u0301gume",
        "lessive",
        "lettre",
        "levier",
        "lexique",
        "le\u0301zard",
        "liasse",
        "libe\u0301rer",
        "libre",
        "licence",
        "licorne",
        "lie\u0300ge",
        "lie\u0300vre",
        "ligature",
        "ligoter",
        "ligue",
        "limer",
        "limite",
        "limonade",
        "limpide",
        "line\u0301aire",
        "lingot",
        "lionceau",
        "liquide",
        "lisie\u0300re",
        "lister",
        "lithium",
        "litige",
        "littoral",
        "livreur",
        "logique",
        "lointain",
        "loisir",
        "lombric",
        "loterie",
        "louer",
        "lourd",
        "loutre",
        "louve",
        "loyal",
        "lubie",
        "lucide",
        "lucratif",
        "lueur",
        "lugubre",
        "luisant",
        "lumie\u0300re",
        "lunaire",
        "lundi",
        "luron",
        "lutter",
        "luxueux",
        "machine",
        "magasin",
        "magenta",
        "magique",
        "maigre",
        "maillon",
        "maintien",
        "mairie",
        "maison",
        "majorer",
        "malaxer",
        "male\u0301fice",
        "malheur",
        "malice",
        "mallette",
        "mammouth",
        "mandater",
        "maniable",
        "manquant",
        "manteau",
        "manuel",
        "marathon",
        "marbre",
        "marchand",
        "mardi",
        "maritime",
        "marqueur",
        "marron",
        "marteler",
        "mascotte",
        "massif",
        "mate\u0301riel",
        "matie\u0300re",
        "matraque",
        "maudire",
        "maussade",
        "mauve",
        "maximal",
        "me\u0301chant",
        "me\u0301connu",
        "me\u0301daille",
        "me\u0301decin",
        "me\u0301diter",
        "me\u0301duse",
        "meilleur",
        "me\u0301lange",
        "me\u0301lodie",
        "membre",
        "me\u0301moire",
        "menacer",
        "mener",
        "menhir",
        "mensonge",
        "mentor",
        "mercredi",
        "me\u0301rite",
        "merle",
        "messager",
        "mesure",
        "me\u0301tal",
        "me\u0301te\u0301ore",
        "me\u0301thode",
        "me\u0301tier",
        "meuble",
        "miauler",
        "microbe",
        "miette",
        "mignon",
        "migrer",
        "milieu",
        "million",
        "mimique",
        "mince",
        "mine\u0301ral",
        "minimal",
        "minorer",
        "minute",
        "miracle",
        "miroiter",
        "missile",
        "mixte",
        "mobile",
        "moderne",
        "moelleux",
        "mondial",
        "moniteur",
        "monnaie",
        "monotone",
        "monstre",
        "montagne",
        "monument",
        "moqueur",
        "morceau",
        "morsure",
        "mortier",
        "moteur",
        "motif",
        "mouche",
        "moufle",
        "moulin",
        "mousson",
        "mouton",
        "mouvant",
        "multiple",
        "munition",
        "muraille",
        "mure\u0300ne",
        "murmure",
        "muscle",
        "muse\u0301um",
        "musicien",
        "mutation",
        "muter",
        "mutuel",
        "myriade",
        "myrtille",
        "myste\u0300re",
        "mythique",
        "nageur",
        "nappe",
        "narquois",
        "narrer",
        "natation",
        "nation",
        "nature",
        "naufrage",
        "nautique",
        "navire",
        "ne\u0301buleux",
        "nectar",
        "ne\u0301faste",
        "ne\u0301gation",
        "ne\u0301gliger",
        "ne\u0301gocier",
        "neige",
        "nerveux",
        "nettoyer",
        "neurone",
        "neutron",
        "neveu",
        "niche",
        "nickel",
        "nitrate",
        "niveau",
        "noble",
        "nocif",
        "nocturne",
        "noirceur",
        "noisette",
        "nomade",
        "nombreux",
        "nommer",
        "normatif",
        "notable",
        "notifier",
        "notoire",
        "nourrir",
        "nouveau",
        "novateur",
        "novembre",
        "novice",
        "nuage",
        "nuancer",
        "nuire",
        "nuisible",
        "nume\u0301ro",
        "nuptial",
        "nuque",
        "nutritif",
        "obe\u0301ir",
        "objectif",
        "obliger",
        "obscur",
        "observer",
        "obstacle",
        "obtenir",
        "obturer",
        "occasion",
        "occuper",
        "oce\u0301an",
        "octobre",
        "octroyer",
        "octupler",
        "oculaire",
        "odeur",
        "odorant",
        "offenser",
        "officier",
        "offrir",
        "ogive",
        "oiseau",
        "oisillon",
        "olfactif",
        "olivier",
        "ombrage",
        "omettre",
        "onctueux",
        "onduler",
        "one\u0301reux",
        "onirique",
        "opale",
        "opaque",
        "ope\u0301rer",
        "opinion",
        "opportun",
        "opprimer",
        "opter",
        "optique",
        "orageux",
        "orange",
        "orbite",
        "ordonner",
        "oreille",
        "organe",
        "orgueil",
        "orifice",
        "ornement",
        "orque",
        "ortie",
        "osciller",
        "osmose",
        "ossature",
        "otarie",
        "ouragan",
        "ourson",
        "outil",
        "outrager",
        "ouvrage",
        "ovation",
        "oxyde",
        "oxyge\u0300ne",
        "ozone",
        "paisible",
        "palace",
        "palmare\u0300s",
        "palourde",
        "palper",
        "panache",
        "panda",
        "pangolin",
        "paniquer",
        "panneau",
        "panorama",
        "pantalon",
        "papaye",
        "papier",
        "papoter",
        "papyrus",
        "paradoxe",
        "parcelle",
        "paresse",
        "parfumer",
        "parler",
        "parole",
        "parrain",
        "parsemer",
        "partager",
        "parure",
        "parvenir",
        "passion",
        "paste\u0300que",
        "paternel",
        "patience",
        "patron",
        "pavillon",
        "pavoiser",
        "payer",
        "paysage",
        "peigne",
        "peintre",
        "pelage",
        "pe\u0301lican",
        "pelle",
        "pelouse",
        "peluche",
        "pendule",
        "pe\u0301ne\u0301trer",
        "pe\u0301nible",
        "pensif",
        "pe\u0301nurie",
        "pe\u0301pite",
        "pe\u0301plum",
        "perdrix",
        "perforer",
        "pe\u0301riode",
        "permuter",
        "perplexe",
        "persil",
        "perte",
        "peser",
        "pe\u0301tale",
        "petit",
        "pe\u0301trir",
        "peuple",
        "pharaon",
        "phobie",
        "phoque",
        "photon",
        "phrase",
        "physique",
        "piano",
        "pictural",
        "pie\u0300ce",
        "pierre",
        "pieuvre",
        "pilote",
        "pinceau",
        "pipette",
        "piquer",
        "pirogue",
        "piscine",
        "piston",
        "pivoter",
        "pixel",
        "pizza",
        "placard",
        "plafond",
        "plaisir",
        "planer",
        "plaque",
        "plastron",
        "plateau",
        "pleurer",
        "plexus",
        "pliage",
        "plomb",
        "plonger",
        "pluie",
        "plumage",
        "pochette",
        "poe\u0301sie",
        "poe\u0300te",
        "pointe",
        "poirier",
        "poisson",
        "poivre",
        "polaire",
        "policier",
        "pollen",
        "polygone",
        "pommade",
        "pompier",
        "ponctuel",
        "ponde\u0301rer",
        "poney",
        "portique",
        "position",
        "posse\u0301der",
        "posture",
        "potager",
        "poteau",
        "potion",
        "pouce",
        "poulain",
        "poumon",
        "pourpre",
        "poussin",
        "pouvoir",
        "prairie",
        "pratique",
        "pre\u0301cieux",
        "pre\u0301dire",
        "pre\u0301fixe",
        "pre\u0301lude",
        "pre\u0301nom",
        "pre\u0301sence",
        "pre\u0301texte",
        "pre\u0301voir",
        "primitif",
        "prince",
        "prison",
        "priver",
        "proble\u0300me",
        "proce\u0301der",
        "prodige",
        "profond",
        "progre\u0300s",
        "proie",
        "projeter",
        "prologue",
        "promener",
        "propre",
        "prospe\u0300re",
        "prote\u0301ger",
        "prouesse",
        "proverbe",
        "prudence",
        "pruneau",
        "psychose",
        "public",
        "puceron",
        "puiser",
        "pulpe",
        "pulsar",
        "punaise",
        "punitif",
        "pupitre",
        "purifier",
        "puzzle",
        "pyramide",
        "quasar",
        "querelle",
        "question",
        "quie\u0301tude",
        "quitter",
        "quotient",
        "racine",
        "raconter",
        "radieux",
        "ragondin",
        "raideur",
        "raisin",
        "ralentir",
        "rallonge",
        "ramasser",
        "rapide",
        "rasage",
        "ratisser",
        "ravager",
        "ravin",
        "rayonner",
        "re\u0301actif",
        "re\u0301agir",
        "re\u0301aliser",
        "re\u0301animer",
        "recevoir",
        "re\u0301citer",
        "re\u0301clamer",
        "re\u0301colter",
        "recruter",
        "reculer",
        "recycler",
        "re\u0301diger",
        "redouter",
        "refaire",
        "re\u0301flexe",
        "re\u0301former",
        "refrain",
        "refuge",
        "re\u0301galien",
        "re\u0301gion",
        "re\u0301glage",
        "re\u0301gulier",
        "re\u0301ite\u0301rer",
        "rejeter",
        "rejouer",
        "relatif",
        "relever",
        "relief",
        "remarque",
        "reme\u0300de",
        "remise",
        "remonter",
        "remplir",
        "remuer",
        "renard",
        "renfort",
        "renifler",
        "renoncer",
        "rentrer",
        "renvoi",
        "replier",
        "reporter",
        "reprise",
        "reptile",
        "requin",
        "re\u0301serve",
        "re\u0301sineux",
        "re\u0301soudre",
        "respect",
        "rester",
        "re\u0301sultat",
        "re\u0301tablir",
        "retenir",
        "re\u0301ticule",
        "retomber",
        "retracer",
        "re\u0301union",
        "re\u0301ussir",
        "revanche",
        "revivre",
        "re\u0301volte",
        "re\u0301vulsif",
        "richesse",
        "rideau",
        "rieur",
        "rigide",
        "rigoler",
        "rincer",
        "riposter",
        "risible",
        "risque",
        "rituel",
        "rival",
        "rivie\u0300re",
        "rocheux",
        "romance",
        "rompre",
        "ronce",
        "rondin",
        "roseau",
        "rosier",
        "rotatif",
        "rotor",
        "rotule",
        "rouge",
        "rouille",
        "rouleau",
        "routine",
        "royaume",
        "ruban",
        "rubis",
        "ruche",
        "ruelle",
        "rugueux",
        "ruiner",
        "ruisseau",
        "ruser",
        "rustique",
        "rythme",
        "sabler",
        "saboter",
        "sabre",
        "sacoche",
        "safari",
        "sagesse",
        "saisir",
        "salade",
        "salive",
        "salon",
        "saluer",
        "samedi",
        "sanction",
        "sanglier",
        "sarcasme",
        "sardine",
        "saturer",
        "saugrenu",
        "saumon",
        "sauter",
        "sauvage",
        "savant",
        "savonner",
        "scalpel",
        "scandale",
        "sce\u0301le\u0301rat",
        "sce\u0301nario",
        "sceptre",
        "sche\u0301ma",
        "science",
        "scinder",
        "score",
        "scrutin",
        "sculpter",
        "se\u0301ance",
        "se\u0301cable",
        "se\u0301cher",
        "secouer",
        "se\u0301cre\u0301ter",
        "se\u0301datif",
        "se\u0301duire",
        "seigneur",
        "se\u0301jour",
        "se\u0301lectif",
        "semaine",
        "sembler",
        "semence",
        "se\u0301minal",
        "se\u0301nateur",
        "sensible",
        "sentence",
        "se\u0301parer",
        "se\u0301quence",
        "serein",
        "sergent",
        "se\u0301rieux",
        "serrure",
        "se\u0301rum",
        "service",
        "se\u0301same",
        "se\u0301vir",
        "sevrage",
        "sextuple",
        "side\u0301ral",
        "sie\u0300cle",
        "sie\u0301ger",
        "siffler",
        "sigle",
        "signal",
        "silence",
        "silicium",
        "simple",
        "since\u0300re",
        "sinistre",
        "siphon",
        "sirop",
        "sismique",
        "situer",
        "skier",
        "social",
        "socle",
        "sodium",
        "soigneux",
        "soldat",
        "soleil",
        "solitude",
        "soluble",
        "sombre",
        "sommeil",
        "somnoler",
        "sonde",
        "songeur",
        "sonnette",
        "sonore",
        "sorcier",
        "sortir",
        "sosie",
        "sottise",
        "soucieux",
        "soudure",
        "souffle",
        "soulever",
        "soupape",
        "source",
        "soutirer",
        "souvenir",
        "spacieux",
        "spatial",
        "spe\u0301cial",
        "sphe\u0300re",
        "spiral",
        "stable",
        "station",
        "sternum",
        "stimulus",
        "stipuler",
        "strict",
        "studieux",
        "stupeur",
        "styliste",
        "sublime",
        "substrat",
        "subtil",
        "subvenir",
        "succe\u0300s",
        "sucre",
        "suffixe",
        "sugge\u0301rer",
        "suiveur",
        "sulfate",
        "superbe",
        "supplier",
        "surface",
        "suricate",
        "surmener",
        "surprise",
        "sursaut",
        "survie",
        "suspect",
        "syllabe",
        "symbole",
        "syme\u0301trie",
        "synapse",
        "syntaxe",
        "syste\u0300me",
        "tabac",
        "tablier",
        "tactile",
        "tailler",
        "talent",
        "talisman",
        "talonner",
        "tambour",
        "tamiser",
        "tangible",
        "tapis",
        "taquiner",
        "tarder",
        "tarif",
        "tartine",
        "tasse",
        "tatami",
        "tatouage",
        "taupe",
        "taureau",
        "taxer",
        "te\u0301moin",
        "temporel",
        "tenaille",
        "tendre",
        "teneur",
        "tenir",
        "tension",
        "terminer",
        "terne",
        "terrible",
        "te\u0301tine",
        "texte",
        "the\u0300me",
        "the\u0301orie",
        "the\u0301rapie",
        "thorax",
        "tibia",
        "tie\u0300de",
        "timide",
        "tirelire",
        "tiroir",
        "tissu",
        "titane",
        "titre",
        "tituber",
        "toboggan",
        "tole\u0301rant",
        "tomate",
        "tonique",
        "tonneau",
        "toponyme",
        "torche",
        "tordre",
        "tornade",
        "torpille",
        "torrent",
        "torse",
        "tortue",
        "totem",
        "toucher",
        "tournage",
        "tousser",
        "toxine",
        "traction",
        "trafic",
        "tragique",
        "trahir",
        "train",
        "trancher",
        "travail",
        "tre\u0300fle",
        "tremper",
        "tre\u0301sor",
        "treuil",
        "triage",
        "tribunal",
        "tricoter",
        "trilogie",
        "triomphe",
        "tripler",
        "triturer",
        "trivial",
        "trombone",
        "tronc",
        "tropical",
        "troupeau",
        "tuile",
        "tulipe",
        "tumulte",
        "tunnel",
        "turbine",
        "tuteur",
        "tutoyer",
        "tuyau",
        "tympan",
        "typhon",
        "typique",
        "tyran",
        "ubuesque",
        "ultime",
        "ultrason",
        "unanime",
        "unifier",
        "union",
        "unique",
        "unitaire",
        "univers",
        "uranium",
        "urbain",
        "urticant",
        "usage",
        "usine",
        "usuel",
        "usure",
        "utile",
        "utopie",
        "vacarme",
        "vaccin",
        "vagabond",
        "vague",
        "vaillant",
        "vaincre",
        "vaisseau",
        "valable",
        "valise",
        "vallon",
        "valve",
        "vampire",
        "vanille",
        "vapeur",
        "varier",
        "vaseux",
        "vassal",
        "vaste",
        "vecteur",
        "vedette",
        "ve\u0301ge\u0301tal",
        "ve\u0301hicule",
        "veinard",
        "ve\u0301loce",
        "vendredi",
        "ve\u0301ne\u0301rer",
        "venger",
        "venimeux",
        "ventouse",
        "verdure",
        "ve\u0301rin",
        "vernir",
        "verrou",
        "verser",
        "vertu",
        "veston",
        "ve\u0301te\u0301ran",
        "ve\u0301tuste",
        "vexant",
        "vexer",
        "viaduc",
        "viande",
        "victoire",
        "vidange",
        "vide\u0301o",
        "vignette",
        "vigueur",
        "vilain",
        "village",
        "vinaigre",
        "violon",
        "vipe\u0300re",
        "virement",
        "virtuose",
        "virus",
        "visage",
        "viseur",
        "vision",
        "visqueux",
        "visuel",
        "vital",
        "vitesse",
        "viticole",
        "vitrine",
        "vivace",
        "vivipare",
        "vocation",
        "voguer",
        "voile",
        "voisin",
        "voiture",
        "volaille",
        "volcan",
        "voltiger",
        "volume",
        "vorace",
        "vortex",
        "voter",
        "vouloir",
        "voyage",
        "voyelle",
        "wagon",
        "xe\u0301non",
        "yacht",
        "ze\u0300bre",
        "ze\u0301nith",
        "zeste",
        "zoologie"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/italian.json
  var require_italian = __commonJS({
    "node_modules/bip39/src/wordlists/italian.json"(exports, module) {
      module.exports = [
        "abaco",
        "abbaglio",
        "abbinato",
        "abete",
        "abisso",
        "abolire",
        "abrasivo",
        "abrogato",
        "accadere",
        "accenno",
        "accusato",
        "acetone",
        "achille",
        "acido",
        "acqua",
        "acre",
        "acrilico",
        "acrobata",
        "acuto",
        "adagio",
        "addebito",
        "addome",
        "adeguato",
        "aderire",
        "adipe",
        "adottare",
        "adulare",
        "affabile",
        "affetto",
        "affisso",
        "affranto",
        "aforisma",
        "afoso",
        "africano",
        "agave",
        "agente",
        "agevole",
        "aggancio",
        "agire",
        "agitare",
        "agonismo",
        "agricolo",
        "agrumeto",
        "aguzzo",
        "alabarda",
        "alato",
        "albatro",
        "alberato",
        "albo",
        "albume",
        "alce",
        "alcolico",
        "alettone",
        "alfa",
        "algebra",
        "aliante",
        "alibi",
        "alimento",
        "allagato",
        "allegro",
        "allievo",
        "allodola",
        "allusivo",
        "almeno",
        "alogeno",
        "alpaca",
        "alpestre",
        "altalena",
        "alterno",
        "alticcio",
        "altrove",
        "alunno",
        "alveolo",
        "alzare",
        "amalgama",
        "amanita",
        "amarena",
        "ambito",
        "ambrato",
        "ameba",
        "america",
        "ametista",
        "amico",
        "ammasso",
        "ammenda",
        "ammirare",
        "ammonito",
        "amore",
        "ampio",
        "ampliare",
        "amuleto",
        "anacardo",
        "anagrafe",
        "analista",
        "anarchia",
        "anatra",
        "anca",
        "ancella",
        "ancora",
        "andare",
        "andrea",
        "anello",
        "angelo",
        "angolare",
        "angusto",
        "anima",
        "annegare",
        "annidato",
        "anno",
        "annuncio",
        "anonimo",
        "anticipo",
        "anzi",
        "apatico",
        "apertura",
        "apode",
        "apparire",
        "appetito",
        "appoggio",
        "approdo",
        "appunto",
        "aprile",
        "arabica",
        "arachide",
        "aragosta",
        "araldica",
        "arancio",
        "aratura",
        "arazzo",
        "arbitro",
        "archivio",
        "ardito",
        "arenile",
        "argento",
        "argine",
        "arguto",
        "aria",
        "armonia",
        "arnese",
        "arredato",
        "arringa",
        "arrosto",
        "arsenico",
        "arso",
        "artefice",
        "arzillo",
        "asciutto",
        "ascolto",
        "asepsi",
        "asettico",
        "asfalto",
        "asino",
        "asola",
        "aspirato",
        "aspro",
        "assaggio",
        "asse",
        "assoluto",
        "assurdo",
        "asta",
        "astenuto",
        "astice",
        "astratto",
        "atavico",
        "ateismo",
        "atomico",
        "atono",
        "attesa",
        "attivare",
        "attorno",
        "attrito",
        "attuale",
        "ausilio",
        "austria",
        "autista",
        "autonomo",
        "autunno",
        "avanzato",
        "avere",
        "avvenire",
        "avviso",
        "avvolgere",
        "azione",
        "azoto",
        "azzimo",
        "azzurro",
        "babele",
        "baccano",
        "bacino",
        "baco",
        "badessa",
        "badilata",
        "bagnato",
        "baita",
        "balcone",
        "baldo",
        "balena",
        "ballata",
        "balzano",
        "bambino",
        "bandire",
        "baraonda",
        "barbaro",
        "barca",
        "baritono",
        "barlume",
        "barocco",
        "basilico",
        "basso",
        "batosta",
        "battuto",
        "baule",
        "bava",
        "bavosa",
        "becco",
        "beffa",
        "belgio",
        "belva",
        "benda",
        "benevole",
        "benigno",
        "benzina",
        "bere",
        "berlina",
        "beta",
        "bibita",
        "bici",
        "bidone",
        "bifido",
        "biga",
        "bilancia",
        "bimbo",
        "binocolo",
        "biologo",
        "bipede",
        "bipolare",
        "birbante",
        "birra",
        "biscotto",
        "bisesto",
        "bisnonno",
        "bisonte",
        "bisturi",
        "bizzarro",
        "blando",
        "blatta",
        "bollito",
        "bonifico",
        "bordo",
        "bosco",
        "botanico",
        "bottino",
        "bozzolo",
        "braccio",
        "bradipo",
        "brama",
        "branca",
        "bravura",
        "bretella",
        "brevetto",
        "brezza",
        "briglia",
        "brillante",
        "brindare",
        "broccolo",
        "brodo",
        "bronzina",
        "brullo",
        "bruno",
        "bubbone",
        "buca",
        "budino",
        "buffone",
        "buio",
        "bulbo",
        "buono",
        "burlone",
        "burrasca",
        "bussola",
        "busta",
        "cadetto",
        "caduco",
        "calamaro",
        "calcolo",
        "calesse",
        "calibro",
        "calmo",
        "caloria",
        "cambusa",
        "camerata",
        "camicia",
        "cammino",
        "camola",
        "campale",
        "canapa",
        "candela",
        "cane",
        "canino",
        "canotto",
        "cantina",
        "capace",
        "capello",
        "capitolo",
        "capogiro",
        "cappero",
        "capra",
        "capsula",
        "carapace",
        "carcassa",
        "cardo",
        "carisma",
        "carovana",
        "carretto",
        "cartolina",
        "casaccio",
        "cascata",
        "caserma",
        "caso",
        "cassone",
        "castello",
        "casuale",
        "catasta",
        "catena",
        "catrame",
        "cauto",
        "cavillo",
        "cedibile",
        "cedrata",
        "cefalo",
        "celebre",
        "cellulare",
        "cena",
        "cenone",
        "centesimo",
        "ceramica",
        "cercare",
        "certo",
        "cerume",
        "cervello",
        "cesoia",
        "cespo",
        "ceto",
        "chela",
        "chiaro",
        "chicca",
        "chiedere",
        "chimera",
        "china",
        "chirurgo",
        "chitarra",
        "ciao",
        "ciclismo",
        "cifrare",
        "cigno",
        "cilindro",
        "ciottolo",
        "circa",
        "cirrosi",
        "citrico",
        "cittadino",
        "ciuffo",
        "civetta",
        "civile",
        "classico",
        "clinica",
        "cloro",
        "cocco",
        "codardo",
        "codice",
        "coerente",
        "cognome",
        "collare",
        "colmato",
        "colore",
        "colposo",
        "coltivato",
        "colza",
        "coma",
        "cometa",
        "commando",
        "comodo",
        "computer",
        "comune",
        "conciso",
        "condurre",
        "conferma",
        "congelare",
        "coniuge",
        "connesso",
        "conoscere",
        "consumo",
        "continuo",
        "convegno",
        "coperto",
        "copione",
        "coppia",
        "copricapo",
        "corazza",
        "cordata",
        "coricato",
        "cornice",
        "corolla",
        "corpo",
        "corredo",
        "corsia",
        "cortese",
        "cosmico",
        "costante",
        "cottura",
        "covato",
        "cratere",
        "cravatta",
        "creato",
        "credere",
        "cremoso",
        "crescita",
        "creta",
        "criceto",
        "crinale",
        "crisi",
        "critico",
        "croce",
        "cronaca",
        "crostata",
        "cruciale",
        "crusca",
        "cucire",
        "cuculo",
        "cugino",
        "cullato",
        "cupola",
        "curatore",
        "cursore",
        "curvo",
        "cuscino",
        "custode",
        "dado",
        "daino",
        "dalmata",
        "damerino",
        "daniela",
        "dannoso",
        "danzare",
        "datato",
        "davanti",
        "davvero",
        "debutto",
        "decennio",
        "deciso",
        "declino",
        "decollo",
        "decreto",
        "dedicato",
        "definito",
        "deforme",
        "degno",
        "delegare",
        "delfino",
        "delirio",
        "delta",
        "demenza",
        "denotato",
        "dentro",
        "deposito",
        "derapata",
        "derivare",
        "deroga",
        "descritto",
        "deserto",
        "desiderio",
        "desumere",
        "detersivo",
        "devoto",
        "diametro",
        "dicembre",
        "diedro",
        "difeso",
        "diffuso",
        "digerire",
        "digitale",
        "diluvio",
        "dinamico",
        "dinnanzi",
        "dipinto",
        "diploma",
        "dipolo",
        "diradare",
        "dire",
        "dirotto",
        "dirupo",
        "disagio",
        "discreto",
        "disfare",
        "disgelo",
        "disposto",
        "distanza",
        "disumano",
        "dito",
        "divano",
        "divelto",
        "dividere",
        "divorato",
        "doblone",
        "docente",
        "doganale",
        "dogma",
        "dolce",
        "domato",
        "domenica",
        "dominare",
        "dondolo",
        "dono",
        "dormire",
        "dote",
        "dottore",
        "dovuto",
        "dozzina",
        "drago",
        "druido",
        "dubbio",
        "dubitare",
        "ducale",
        "duna",
        "duomo",
        "duplice",
        "duraturo",
        "ebano",
        "eccesso",
        "ecco",
        "eclissi",
        "economia",
        "edera",
        "edicola",
        "edile",
        "editoria",
        "educare",
        "egemonia",
        "egli",
        "egoismo",
        "egregio",
        "elaborato",
        "elargire",
        "elegante",
        "elencato",
        "eletto",
        "elevare",
        "elfico",
        "elica",
        "elmo",
        "elsa",
        "eluso",
        "emanato",
        "emblema",
        "emesso",
        "emiro",
        "emotivo",
        "emozione",
        "empirico",
        "emulo",
        "endemico",
        "enduro",
        "energia",
        "enfasi",
        "enoteca",
        "entrare",
        "enzima",
        "epatite",
        "epilogo",
        "episodio",
        "epocale",
        "eppure",
        "equatore",
        "erario",
        "erba",
        "erboso",
        "erede",
        "eremita",
        "erigere",
        "ermetico",
        "eroe",
        "erosivo",
        "errante",
        "esagono",
        "esame",
        "esanime",
        "esaudire",
        "esca",
        "esempio",
        "esercito",
        "esibito",
        "esigente",
        "esistere",
        "esito",
        "esofago",
        "esortato",
        "esoso",
        "espanso",
        "espresso",
        "essenza",
        "esso",
        "esteso",
        "estimare",
        "estonia",
        "estroso",
        "esultare",
        "etilico",
        "etnico",
        "etrusco",
        "etto",
        "euclideo",
        "europa",
        "evaso",
        "evidenza",
        "evitato",
        "evoluto",
        "evviva",
        "fabbrica",
        "faccenda",
        "fachiro",
        "falco",
        "famiglia",
        "fanale",
        "fanfara",
        "fango",
        "fantasma",
        "fare",
        "farfalla",
        "farinoso",
        "farmaco",
        "fascia",
        "fastoso",
        "fasullo",
        "faticare",
        "fato",
        "favoloso",
        "febbre",
        "fecola",
        "fede",
        "fegato",
        "felpa",
        "feltro",
        "femmina",
        "fendere",
        "fenomeno",
        "fermento",
        "ferro",
        "fertile",
        "fessura",
        "festivo",
        "fetta",
        "feudo",
        "fiaba",
        "fiducia",
        "fifa",
        "figurato",
        "filo",
        "finanza",
        "finestra",
        "finire",
        "fiore",
        "fiscale",
        "fisico",
        "fiume",
        "flacone",
        "flamenco",
        "flebo",
        "flemma",
        "florido",
        "fluente",
        "fluoro",
        "fobico",
        "focaccia",
        "focoso",
        "foderato",
        "foglio",
        "folata",
        "folclore",
        "folgore",
        "fondente",
        "fonetico",
        "fonia",
        "fontana",
        "forbito",
        "forchetta",
        "foresta",
        "formica",
        "fornaio",
        "foro",
        "fortezza",
        "forzare",
        "fosfato",
        "fosso",
        "fracasso",
        "frana",
        "frassino",
        "fratello",
        "freccetta",
        "frenata",
        "fresco",
        "frigo",
        "frollino",
        "fronde",
        "frugale",
        "frutta",
        "fucilata",
        "fucsia",
        "fuggente",
        "fulmine",
        "fulvo",
        "fumante",
        "fumetto",
        "fumoso",
        "fune",
        "funzione",
        "fuoco",
        "furbo",
        "furgone",
        "furore",
        "fuso",
        "futile",
        "gabbiano",
        "gaffe",
        "galateo",
        "gallina",
        "galoppo",
        "gambero",
        "gamma",
        "garanzia",
        "garbo",
        "garofano",
        "garzone",
        "gasdotto",
        "gasolio",
        "gastrico",
        "gatto",
        "gaudio",
        "gazebo",
        "gazzella",
        "geco",
        "gelatina",
        "gelso",
        "gemello",
        "gemmato",
        "gene",
        "genitore",
        "gennaio",
        "genotipo",
        "gergo",
        "ghepardo",
        "ghiaccio",
        "ghisa",
        "giallo",
        "gilda",
        "ginepro",
        "giocare",
        "gioiello",
        "giorno",
        "giove",
        "girato",
        "girone",
        "gittata",
        "giudizio",
        "giurato",
        "giusto",
        "globulo",
        "glutine",
        "gnomo",
        "gobba",
        "golf",
        "gomito",
        "gommone",
        "gonfio",
        "gonna",
        "governo",
        "gracile",
        "grado",
        "grafico",
        "grammo",
        "grande",
        "grattare",
        "gravoso",
        "grazia",
        "greca",
        "gregge",
        "grifone",
        "grigio",
        "grinza",
        "grotta",
        "gruppo",
        "guadagno",
        "guaio",
        "guanto",
        "guardare",
        "gufo",
        "guidare",
        "ibernato",
        "icona",
        "identico",
        "idillio",
        "idolo",
        "idra",
        "idrico",
        "idrogeno",
        "igiene",
        "ignaro",
        "ignorato",
        "ilare",
        "illeso",
        "illogico",
        "illudere",
        "imballo",
        "imbevuto",
        "imbocco",
        "imbuto",
        "immane",
        "immerso",
        "immolato",
        "impacco",
        "impeto",
        "impiego",
        "importo",
        "impronta",
        "inalare",
        "inarcare",
        "inattivo",
        "incanto",
        "incendio",
        "inchino",
        "incisivo",
        "incluso",
        "incontro",
        "incrocio",
        "incubo",
        "indagine",
        "india",
        "indole",
        "inedito",
        "infatti",
        "infilare",
        "inflitto",
        "ingaggio",
        "ingegno",
        "inglese",
        "ingordo",
        "ingrosso",
        "innesco",
        "inodore",
        "inoltrare",
        "inondato",
        "insano",
        "insetto",
        "insieme",
        "insonnia",
        "insulina",
        "intasato",
        "intero",
        "intonaco",
        "intuito",
        "inumidire",
        "invalido",
        "invece",
        "invito",
        "iperbole",
        "ipnotico",
        "ipotesi",
        "ippica",
        "iride",
        "irlanda",
        "ironico",
        "irrigato",
        "irrorare",
        "isolato",
        "isotopo",
        "isterico",
        "istituto",
        "istrice",
        "italia",
        "iterare",
        "labbro",
        "labirinto",
        "lacca",
        "lacerato",
        "lacrima",
        "lacuna",
        "laddove",
        "lago",
        "lampo",
        "lancetta",
        "lanterna",
        "lardoso",
        "larga",
        "laringe",
        "lastra",
        "latenza",
        "latino",
        "lattuga",
        "lavagna",
        "lavoro",
        "legale",
        "leggero",
        "lembo",
        "lentezza",
        "lenza",
        "leone",
        "lepre",
        "lesivo",
        "lessato",
        "lesto",
        "letterale",
        "leva",
        "levigato",
        "libero",
        "lido",
        "lievito",
        "lilla",
        "limatura",
        "limitare",
        "limpido",
        "lineare",
        "lingua",
        "liquido",
        "lira",
        "lirica",
        "lisca",
        "lite",
        "litigio",
        "livrea",
        "locanda",
        "lode",
        "logica",
        "lombare",
        "londra",
        "longevo",
        "loquace",
        "lorenzo",
        "loto",
        "lotteria",
        "luce",
        "lucidato",
        "lumaca",
        "luminoso",
        "lungo",
        "lupo",
        "luppolo",
        "lusinga",
        "lusso",
        "lutto",
        "macabro",
        "macchina",
        "macero",
        "macinato",
        "madama",
        "magico",
        "maglia",
        "magnete",
        "magro",
        "maiolica",
        "malafede",
        "malgrado",
        "malinteso",
        "malsano",
        "malto",
        "malumore",
        "mana",
        "mancia",
        "mandorla",
        "mangiare",
        "manifesto",
        "mannaro",
        "manovra",
        "mansarda",
        "mantide",
        "manubrio",
        "mappa",
        "maratona",
        "marcire",
        "maretta",
        "marmo",
        "marsupio",
        "maschera",
        "massaia",
        "mastino",
        "materasso",
        "matricola",
        "mattone",
        "maturo",
        "mazurca",
        "meandro",
        "meccanico",
        "mecenate",
        "medesimo",
        "meditare",
        "mega",
        "melassa",
        "melis",
        "melodia",
        "meninge",
        "meno",
        "mensola",
        "mercurio",
        "merenda",
        "merlo",
        "meschino",
        "mese",
        "messere",
        "mestolo",
        "metallo",
        "metodo",
        "mettere",
        "miagolare",
        "mica",
        "micelio",
        "michele",
        "microbo",
        "midollo",
        "miele",
        "migliore",
        "milano",
        "milite",
        "mimosa",
        "minerale",
        "mini",
        "minore",
        "mirino",
        "mirtillo",
        "miscela",
        "missiva",
        "misto",
        "misurare",
        "mitezza",
        "mitigare",
        "mitra",
        "mittente",
        "mnemonico",
        "modello",
        "modifica",
        "modulo",
        "mogano",
        "mogio",
        "mole",
        "molosso",
        "monastero",
        "monco",
        "mondina",
        "monetario",
        "monile",
        "monotono",
        "monsone",
        "montato",
        "monviso",
        "mora",
        "mordere",
        "morsicato",
        "mostro",
        "motivato",
        "motosega",
        "motto",
        "movenza",
        "movimento",
        "mozzo",
        "mucca",
        "mucosa",
        "muffa",
        "mughetto",
        "mugnaio",
        "mulatto",
        "mulinello",
        "multiplo",
        "mummia",
        "munto",
        "muovere",
        "murale",
        "musa",
        "muscolo",
        "musica",
        "mutevole",
        "muto",
        "nababbo",
        "nafta",
        "nanometro",
        "narciso",
        "narice",
        "narrato",
        "nascere",
        "nastrare",
        "naturale",
        "nautica",
        "naviglio",
        "nebulosa",
        "necrosi",
        "negativo",
        "negozio",
        "nemmeno",
        "neofita",
        "neretto",
        "nervo",
        "nessuno",
        "nettuno",
        "neutrale",
        "neve",
        "nevrotico",
        "nicchia",
        "ninfa",
        "nitido",
        "nobile",
        "nocivo",
        "nodo",
        "nome",
        "nomina",
        "nordico",
        "normale",
        "norvegese",
        "nostrano",
        "notare",
        "notizia",
        "notturno",
        "novella",
        "nucleo",
        "nulla",
        "numero",
        "nuovo",
        "nutrire",
        "nuvola",
        "nuziale",
        "oasi",
        "obbedire",
        "obbligo",
        "obelisco",
        "oblio",
        "obolo",
        "obsoleto",
        "occasione",
        "occhio",
        "occidente",
        "occorrere",
        "occultare",
        "ocra",
        "oculato",
        "odierno",
        "odorare",
        "offerta",
        "offrire",
        "offuscato",
        "oggetto",
        "oggi",
        "ognuno",
        "olandese",
        "olfatto",
        "oliato",
        "oliva",
        "ologramma",
        "oltre",
        "omaggio",
        "ombelico",
        "ombra",
        "omega",
        "omissione",
        "ondoso",
        "onere",
        "onice",
        "onnivoro",
        "onorevole",
        "onta",
        "operato",
        "opinione",
        "opposto",
        "oracolo",
        "orafo",
        "ordine",
        "orecchino",
        "orefice",
        "orfano",
        "organico",
        "origine",
        "orizzonte",
        "orma",
        "ormeggio",
        "ornativo",
        "orologio",
        "orrendo",
        "orribile",
        "ortensia",
        "ortica",
        "orzata",
        "orzo",
        "osare",
        "oscurare",
        "osmosi",
        "ospedale",
        "ospite",
        "ossa",
        "ossidare",
        "ostacolo",
        "oste",
        "otite",
        "otre",
        "ottagono",
        "ottimo",
        "ottobre",
        "ovale",
        "ovest",
        "ovino",
        "oviparo",
        "ovocito",
        "ovunque",
        "ovviare",
        "ozio",
        "pacchetto",
        "pace",
        "pacifico",
        "padella",
        "padrone",
        "paese",
        "paga",
        "pagina",
        "palazzina",
        "palesare",
        "pallido",
        "palo",
        "palude",
        "pandoro",
        "pannello",
        "paolo",
        "paonazzo",
        "paprica",
        "parabola",
        "parcella",
        "parere",
        "pargolo",
        "pari",
        "parlato",
        "parola",
        "partire",
        "parvenza",
        "parziale",
        "passivo",
        "pasticca",
        "patacca",
        "patologia",
        "pattume",
        "pavone",
        "peccato",
        "pedalare",
        "pedonale",
        "peggio",
        "peloso",
        "penare",
        "pendice",
        "penisola",
        "pennuto",
        "penombra",
        "pensare",
        "pentola",
        "pepe",
        "pepita",
        "perbene",
        "percorso",
        "perdonato",
        "perforare",
        "pergamena",
        "periodo",
        "permesso",
        "perno",
        "perplesso",
        "persuaso",
        "pertugio",
        "pervaso",
        "pesatore",
        "pesista",
        "peso",
        "pestifero",
        "petalo",
        "pettine",
        "petulante",
        "pezzo",
        "piacere",
        "pianta",
        "piattino",
        "piccino",
        "picozza",
        "piega",
        "pietra",
        "piffero",
        "pigiama",
        "pigolio",
        "pigro",
        "pila",
        "pilifero",
        "pillola",
        "pilota",
        "pimpante",
        "pineta",
        "pinna",
        "pinolo",
        "pioggia",
        "piombo",
        "piramide",
        "piretico",
        "pirite",
        "pirolisi",
        "pitone",
        "pizzico",
        "placebo",
        "planare",
        "plasma",
        "platano",
        "plenario",
        "pochezza",
        "poderoso",
        "podismo",
        "poesia",
        "poggiare",
        "polenta",
        "poligono",
        "pollice",
        "polmonite",
        "polpetta",
        "polso",
        "poltrona",
        "polvere",
        "pomice",
        "pomodoro",
        "ponte",
        "popoloso",
        "porfido",
        "poroso",
        "porpora",
        "porre",
        "portata",
        "posa",
        "positivo",
        "possesso",
        "postulato",
        "potassio",
        "potere",
        "pranzo",
        "prassi",
        "pratica",
        "precluso",
        "predica",
        "prefisso",
        "pregiato",
        "prelievo",
        "premere",
        "prenotare",
        "preparato",
        "presenza",
        "pretesto",
        "prevalso",
        "prima",
        "principe",
        "privato",
        "problema",
        "procura",
        "produrre",
        "profumo",
        "progetto",
        "prolunga",
        "promessa",
        "pronome",
        "proposta",
        "proroga",
        "proteso",
        "prova",
        "prudente",
        "prugna",
        "prurito",
        "psiche",
        "pubblico",
        "pudica",
        "pugilato",
        "pugno",
        "pulce",
        "pulito",
        "pulsante",
        "puntare",
        "pupazzo",
        "pupilla",
        "puro",
        "quadro",
        "qualcosa",
        "quasi",
        "querela",
        "quota",
        "raccolto",
        "raddoppio",
        "radicale",
        "radunato",
        "raffica",
        "ragazzo",
        "ragione",
        "ragno",
        "ramarro",
        "ramingo",
        "ramo",
        "randagio",
        "rantolare",
        "rapato",
        "rapina",
        "rappreso",
        "rasatura",
        "raschiato",
        "rasente",
        "rassegna",
        "rastrello",
        "rata",
        "ravveduto",
        "reale",
        "recepire",
        "recinto",
        "recluta",
        "recondito",
        "recupero",
        "reddito",
        "redimere",
        "regalato",
        "registro",
        "regola",
        "regresso",
        "relazione",
        "remare",
        "remoto",
        "renna",
        "replica",
        "reprimere",
        "reputare",
        "resa",
        "residente",
        "responso",
        "restauro",
        "rete",
        "retina",
        "retorica",
        "rettifica",
        "revocato",
        "riassunto",
        "ribadire",
        "ribelle",
        "ribrezzo",
        "ricarica",
        "ricco",
        "ricevere",
        "riciclato",
        "ricordo",
        "ricreduto",
        "ridicolo",
        "ridurre",
        "rifasare",
        "riflesso",
        "riforma",
        "rifugio",
        "rigare",
        "rigettato",
        "righello",
        "rilassato",
        "rilevato",
        "rimanere",
        "rimbalzo",
        "rimedio",
        "rimorchio",
        "rinascita",
        "rincaro",
        "rinforzo",
        "rinnovo",
        "rinomato",
        "rinsavito",
        "rintocco",
        "rinuncia",
        "rinvenire",
        "riparato",
        "ripetuto",
        "ripieno",
        "riportare",
        "ripresa",
        "ripulire",
        "risata",
        "rischio",
        "riserva",
        "risibile",
        "riso",
        "rispetto",
        "ristoro",
        "risultato",
        "risvolto",
        "ritardo",
        "ritegno",
        "ritmico",
        "ritrovo",
        "riunione",
        "riva",
        "riverso",
        "rivincita",
        "rivolto",
        "rizoma",
        "roba",
        "robotico",
        "robusto",
        "roccia",
        "roco",
        "rodaggio",
        "rodere",
        "roditore",
        "rogito",
        "rollio",
        "romantico",
        "rompere",
        "ronzio",
        "rosolare",
        "rospo",
        "rotante",
        "rotondo",
        "rotula",
        "rovescio",
        "rubizzo",
        "rubrica",
        "ruga",
        "rullino",
        "rumine",
        "rumoroso",
        "ruolo",
        "rupe",
        "russare",
        "rustico",
        "sabato",
        "sabbiare",
        "sabotato",
        "sagoma",
        "salasso",
        "saldatura",
        "salgemma",
        "salivare",
        "salmone",
        "salone",
        "saltare",
        "saluto",
        "salvo",
        "sapere",
        "sapido",
        "saporito",
        "saraceno",
        "sarcasmo",
        "sarto",
        "sassoso",
        "satellite",
        "satira",
        "satollo",
        "saturno",
        "savana",
        "savio",
        "saziato",
        "sbadiglio",
        "sbalzo",
        "sbancato",
        "sbarra",
        "sbattere",
        "sbavare",
        "sbendare",
        "sbirciare",
        "sbloccato",
        "sbocciato",
        "sbrinare",
        "sbruffone",
        "sbuffare",
        "scabroso",
        "scadenza",
        "scala",
        "scambiare",
        "scandalo",
        "scapola",
        "scarso",
        "scatenare",
        "scavato",
        "scelto",
        "scenico",
        "scettro",
        "scheda",
        "schiena",
        "sciarpa",
        "scienza",
        "scindere",
        "scippo",
        "sciroppo",
        "scivolo",
        "sclerare",
        "scodella",
        "scolpito",
        "scomparto",
        "sconforto",
        "scoprire",
        "scorta",
        "scossone",
        "scozzese",
        "scriba",
        "scrollare",
        "scrutinio",
        "scuderia",
        "scultore",
        "scuola",
        "scuro",
        "scusare",
        "sdebitare",
        "sdoganare",
        "seccatura",
        "secondo",
        "sedano",
        "seggiola",
        "segnalato",
        "segregato",
        "seguito",
        "selciato",
        "selettivo",
        "sella",
        "selvaggio",
        "semaforo",
        "sembrare",
        "seme",
        "seminato",
        "sempre",
        "senso",
        "sentire",
        "sepolto",
        "sequenza",
        "serata",
        "serbato",
        "sereno",
        "serio",
        "serpente",
        "serraglio",
        "servire",
        "sestina",
        "setola",
        "settimana",
        "sfacelo",
        "sfaldare",
        "sfamato",
        "sfarzoso",
        "sfaticato",
        "sfera",
        "sfida",
        "sfilato",
        "sfinge",
        "sfocato",
        "sfoderare",
        "sfogo",
        "sfoltire",
        "sforzato",
        "sfratto",
        "sfruttato",
        "sfuggito",
        "sfumare",
        "sfuso",
        "sgabello",
        "sgarbato",
        "sgonfiare",
        "sgorbio",
        "sgrassato",
        "sguardo",
        "sibilo",
        "siccome",
        "sierra",
        "sigla",
        "signore",
        "silenzio",
        "sillaba",
        "simbolo",
        "simpatico",
        "simulato",
        "sinfonia",
        "singolo",
        "sinistro",
        "sino",
        "sintesi",
        "sinusoide",
        "sipario",
        "sisma",
        "sistole",
        "situato",
        "slitta",
        "slogatura",
        "sloveno",
        "smarrito",
        "smemorato",
        "smentito",
        "smeraldo",
        "smilzo",
        "smontare",
        "smottato",
        "smussato",
        "snellire",
        "snervato",
        "snodo",
        "sobbalzo",
        "sobrio",
        "soccorso",
        "sociale",
        "sodale",
        "soffitto",
        "sogno",
        "soldato",
        "solenne",
        "solido",
        "sollazzo",
        "solo",
        "solubile",
        "solvente",
        "somatico",
        "somma",
        "sonda",
        "sonetto",
        "sonnifero",
        "sopire",
        "soppeso",
        "sopra",
        "sorgere",
        "sorpasso",
        "sorriso",
        "sorso",
        "sorteggio",
        "sorvolato",
        "sospiro",
        "sosta",
        "sottile",
        "spada",
        "spalla",
        "spargere",
        "spatola",
        "spavento",
        "spazzola",
        "specie",
        "spedire",
        "spegnere",
        "spelatura",
        "speranza",
        "spessore",
        "spettrale",
        "spezzato",
        "spia",
        "spigoloso",
        "spillato",
        "spinoso",
        "spirale",
        "splendido",
        "sportivo",
        "sposo",
        "spranga",
        "sprecare",
        "spronato",
        "spruzzo",
        "spuntino",
        "squillo",
        "sradicare",
        "srotolato",
        "stabile",
        "stacco",
        "staffa",
        "stagnare",
        "stampato",
        "stantio",
        "starnuto",
        "stasera",
        "statuto",
        "stelo",
        "steppa",
        "sterzo",
        "stiletto",
        "stima",
        "stirpe",
        "stivale",
        "stizzoso",
        "stonato",
        "storico",
        "strappo",
        "stregato",
        "stridulo",
        "strozzare",
        "strutto",
        "stuccare",
        "stufo",
        "stupendo",
        "subentro",
        "succoso",
        "sudore",
        "suggerito",
        "sugo",
        "sultano",
        "suonare",
        "superbo",
        "supporto",
        "surgelato",
        "surrogato",
        "sussurro",
        "sutura",
        "svagare",
        "svedese",
        "sveglio",
        "svelare",
        "svenuto",
        "svezia",
        "sviluppo",
        "svista",
        "svizzera",
        "svolta",
        "svuotare",
        "tabacco",
        "tabulato",
        "tacciare",
        "taciturno",
        "tale",
        "talismano",
        "tampone",
        "tannino",
        "tara",
        "tardivo",
        "targato",
        "tariffa",
        "tarpare",
        "tartaruga",
        "tasto",
        "tattico",
        "taverna",
        "tavolata",
        "tazza",
        "teca",
        "tecnico",
        "telefono",
        "temerario",
        "tempo",
        "temuto",
        "tendone",
        "tenero",
        "tensione",
        "tentacolo",
        "teorema",
        "terme",
        "terrazzo",
        "terzetto",
        "tesi",
        "tesserato",
        "testato",
        "tetro",
        "tettoia",
        "tifare",
        "tigella",
        "timbro",
        "tinto",
        "tipico",
        "tipografo",
        "tiraggio",
        "tiro",
        "titanio",
        "titolo",
        "titubante",
        "tizio",
        "tizzone",
        "toccare",
        "tollerare",
        "tolto",
        "tombola",
        "tomo",
        "tonfo",
        "tonsilla",
        "topazio",
        "topologia",
        "toppa",
        "torba",
        "tornare",
        "torrone",
        "tortora",
        "toscano",
        "tossire",
        "tostatura",
        "totano",
        "trabocco",
        "trachea",
        "trafila",
        "tragedia",
        "tralcio",
        "tramonto",
        "transito",
        "trapano",
        "trarre",
        "trasloco",
        "trattato",
        "trave",
        "treccia",
        "tremolio",
        "trespolo",
        "tributo",
        "tricheco",
        "trifoglio",
        "trillo",
        "trincea",
        "trio",
        "tristezza",
        "triturato",
        "trivella",
        "tromba",
        "trono",
        "troppo",
        "trottola",
        "trovare",
        "truccato",
        "tubatura",
        "tuffato",
        "tulipano",
        "tumulto",
        "tunisia",
        "turbare",
        "turchino",
        "tuta",
        "tutela",
        "ubicato",
        "uccello",
        "uccisore",
        "udire",
        "uditivo",
        "uffa",
        "ufficio",
        "uguale",
        "ulisse",
        "ultimato",
        "umano",
        "umile",
        "umorismo",
        "uncinetto",
        "ungere",
        "ungherese",
        "unicorno",
        "unificato",
        "unisono",
        "unitario",
        "unte",
        "uovo",
        "upupa",
        "uragano",
        "urgenza",
        "urlo",
        "usanza",
        "usato",
        "uscito",
        "usignolo",
        "usuraio",
        "utensile",
        "utilizzo",
        "utopia",
        "vacante",
        "vaccinato",
        "vagabondo",
        "vagliato",
        "valanga",
        "valgo",
        "valico",
        "valletta",
        "valoroso",
        "valutare",
        "valvola",
        "vampata",
        "vangare",
        "vanitoso",
        "vano",
        "vantaggio",
        "vanvera",
        "vapore",
        "varano",
        "varcato",
        "variante",
        "vasca",
        "vedetta",
        "vedova",
        "veduto",
        "vegetale",
        "veicolo",
        "velcro",
        "velina",
        "velluto",
        "veloce",
        "venato",
        "vendemmia",
        "vento",
        "verace",
        "verbale",
        "vergogna",
        "verifica",
        "vero",
        "verruca",
        "verticale",
        "vescica",
        "vessillo",
        "vestale",
        "veterano",
        "vetrina",
        "vetusto",
        "viandante",
        "vibrante",
        "vicenda",
        "vichingo",
        "vicinanza",
        "vidimare",
        "vigilia",
        "vigneto",
        "vigore",
        "vile",
        "villano",
        "vimini",
        "vincitore",
        "viola",
        "vipera",
        "virgola",
        "virologo",
        "virulento",
        "viscoso",
        "visione",
        "vispo",
        "vissuto",
        "visura",
        "vita",
        "vitello",
        "vittima",
        "vivanda",
        "vivido",
        "viziare",
        "voce",
        "voga",
        "volatile",
        "volere",
        "volpe",
        "voragine",
        "vulcano",
        "zampogna",
        "zanna",
        "zappato",
        "zattera",
        "zavorra",
        "zefiro",
        "zelante",
        "zelo",
        "zenzero",
        "zerbino",
        "zibetto",
        "zinco",
        "zircone",
        "zitto",
        "zolla",
        "zotico",
        "zucchero",
        "zufolo",
        "zulu",
        "zuppa"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/spanish.json
  var require_spanish = __commonJS({
    "node_modules/bip39/src/wordlists/spanish.json"(exports, module) {
      module.exports = [
        "a\u0301baco",
        "abdomen",
        "abeja",
        "abierto",
        "abogado",
        "abono",
        "aborto",
        "abrazo",
        "abrir",
        "abuelo",
        "abuso",
        "acabar",
        "academia",
        "acceso",
        "accio\u0301n",
        "aceite",
        "acelga",
        "acento",
        "aceptar",
        "a\u0301cido",
        "aclarar",
        "acne\u0301",
        "acoger",
        "acoso",
        "activo",
        "acto",
        "actriz",
        "actuar",
        "acudir",
        "acuerdo",
        "acusar",
        "adicto",
        "admitir",
        "adoptar",
        "adorno",
        "aduana",
        "adulto",
        "ae\u0301reo",
        "afectar",
        "aficio\u0301n",
        "afinar",
        "afirmar",
        "a\u0301gil",
        "agitar",
        "agoni\u0301a",
        "agosto",
        "agotar",
        "agregar",
        "agrio",
        "agua",
        "agudo",
        "a\u0301guila",
        "aguja",
        "ahogo",
        "ahorro",
        "aire",
        "aislar",
        "ajedrez",
        "ajeno",
        "ajuste",
        "alacra\u0301n",
        "alambre",
        "alarma",
        "alba",
        "a\u0301lbum",
        "alcalde",
        "aldea",
        "alegre",
        "alejar",
        "alerta",
        "aleta",
        "alfiler",
        "alga",
        "algodo\u0301n",
        "aliado",
        "aliento",
        "alivio",
        "alma",
        "almeja",
        "almi\u0301bar",
        "altar",
        "alteza",
        "altivo",
        "alto",
        "altura",
        "alumno",
        "alzar",
        "amable",
        "amante",
        "amapola",
        "amargo",
        "amasar",
        "a\u0301mbar",
        "a\u0301mbito",
        "ameno",
        "amigo",
        "amistad",
        "amor",
        "amparo",
        "amplio",
        "ancho",
        "anciano",
        "ancla",
        "andar",
        "ande\u0301n",
        "anemia",
        "a\u0301ngulo",
        "anillo",
        "a\u0301nimo",
        "ani\u0301s",
        "anotar",
        "antena",
        "antiguo",
        "antojo",
        "anual",
        "anular",
        "anuncio",
        "an\u0303adir",
        "an\u0303ejo",
        "an\u0303o",
        "apagar",
        "aparato",
        "apetito",
        "apio",
        "aplicar",
        "apodo",
        "aporte",
        "apoyo",
        "aprender",
        "aprobar",
        "apuesta",
        "apuro",
        "arado",
        "aran\u0303a",
        "arar",
        "a\u0301rbitro",
        "a\u0301rbol",
        "arbusto",
        "archivo",
        "arco",
        "arder",
        "ardilla",
        "arduo",
        "a\u0301rea",
        "a\u0301rido",
        "aries",
        "armoni\u0301a",
        "arne\u0301s",
        "aroma",
        "arpa",
        "arpo\u0301n",
        "arreglo",
        "arroz",
        "arruga",
        "arte",
        "artista",
        "asa",
        "asado",
        "asalto",
        "ascenso",
        "asegurar",
        "aseo",
        "asesor",
        "asiento",
        "asilo",
        "asistir",
        "asno",
        "asombro",
        "a\u0301spero",
        "astilla",
        "astro",
        "astuto",
        "asumir",
        "asunto",
        "atajo",
        "ataque",
        "atar",
        "atento",
        "ateo",
        "a\u0301tico",
        "atleta",
        "a\u0301tomo",
        "atraer",
        "atroz",
        "atu\u0301n",
        "audaz",
        "audio",
        "auge",
        "aula",
        "aumento",
        "ausente",
        "autor",
        "aval",
        "avance",
        "avaro",
        "ave",
        "avellana",
        "avena",
        "avestruz",
        "avio\u0301n",
        "aviso",
        "ayer",
        "ayuda",
        "ayuno",
        "azafra\u0301n",
        "azar",
        "azote",
        "azu\u0301car",
        "azufre",
        "azul",
        "baba",
        "babor",
        "bache",
        "bahi\u0301a",
        "baile",
        "bajar",
        "balanza",
        "balco\u0301n",
        "balde",
        "bambu\u0301",
        "banco",
        "banda",
        "ban\u0303o",
        "barba",
        "barco",
        "barniz",
        "barro",
        "ba\u0301scula",
        "basto\u0301n",
        "basura",
        "batalla",
        "bateri\u0301a",
        "batir",
        "batuta",
        "bau\u0301l",
        "bazar",
        "bebe\u0301",
        "bebida",
        "bello",
        "besar",
        "beso",
        "bestia",
        "bicho",
        "bien",
        "bingo",
        "blanco",
        "bloque",
        "blusa",
        "boa",
        "bobina",
        "bobo",
        "boca",
        "bocina",
        "boda",
        "bodega",
        "boina",
        "bola",
        "bolero",
        "bolsa",
        "bomba",
        "bondad",
        "bonito",
        "bono",
        "bonsa\u0301i",
        "borde",
        "borrar",
        "bosque",
        "bote",
        "boti\u0301n",
        "bo\u0301veda",
        "bozal",
        "bravo",
        "brazo",
        "brecha",
        "breve",
        "brillo",
        "brinco",
        "brisa",
        "broca",
        "broma",
        "bronce",
        "brote",
        "bruja",
        "brusco",
        "bruto",
        "buceo",
        "bucle",
        "bueno",
        "buey",
        "bufanda",
        "bufo\u0301n",
        "bu\u0301ho",
        "buitre",
        "bulto",
        "burbuja",
        "burla",
        "burro",
        "buscar",
        "butaca",
        "buzo\u0301n",
        "caballo",
        "cabeza",
        "cabina",
        "cabra",
        "cacao",
        "cada\u0301ver",
        "cadena",
        "caer",
        "cafe\u0301",
        "cai\u0301da",
        "caima\u0301n",
        "caja",
        "cajo\u0301n",
        "cal",
        "calamar",
        "calcio",
        "caldo",
        "calidad",
        "calle",
        "calma",
        "calor",
        "calvo",
        "cama",
        "cambio",
        "camello",
        "camino",
        "campo",
        "ca\u0301ncer",
        "candil",
        "canela",
        "canguro",
        "canica",
        "canto",
        "can\u0303a",
        "can\u0303o\u0301n",
        "caoba",
        "caos",
        "capaz",
        "capita\u0301n",
        "capote",
        "captar",
        "capucha",
        "cara",
        "carbo\u0301n",
        "ca\u0301rcel",
        "careta",
        "carga",
        "carin\u0303o",
        "carne",
        "carpeta",
        "carro",
        "carta",
        "casa",
        "casco",
        "casero",
        "caspa",
        "castor",
        "catorce",
        "catre",
        "caudal",
        "causa",
        "cazo",
        "cebolla",
        "ceder",
        "cedro",
        "celda",
        "ce\u0301lebre",
        "celoso",
        "ce\u0301lula",
        "cemento",
        "ceniza",
        "centro",
        "cerca",
        "cerdo",
        "cereza",
        "cero",
        "cerrar",
        "certeza",
        "ce\u0301sped",
        "cetro",
        "chacal",
        "chaleco",
        "champu\u0301",
        "chancla",
        "chapa",
        "charla",
        "chico",
        "chiste",
        "chivo",
        "choque",
        "choza",
        "chuleta",
        "chupar",
        "ciclo\u0301n",
        "ciego",
        "cielo",
        "cien",
        "cierto",
        "cifra",
        "cigarro",
        "cima",
        "cinco",
        "cine",
        "cinta",
        "cipre\u0301s",
        "circo",
        "ciruela",
        "cisne",
        "cita",
        "ciudad",
        "clamor",
        "clan",
        "claro",
        "clase",
        "clave",
        "cliente",
        "clima",
        "cli\u0301nica",
        "cobre",
        "coccio\u0301n",
        "cochino",
        "cocina",
        "coco",
        "co\u0301digo",
        "codo",
        "cofre",
        "coger",
        "cohete",
        "coji\u0301n",
        "cojo",
        "cola",
        "colcha",
        "colegio",
        "colgar",
        "colina",
        "collar",
        "colmo",
        "columna",
        "combate",
        "comer",
        "comida",
        "co\u0301modo",
        "compra",
        "conde",
        "conejo",
        "conga",
        "conocer",
        "consejo",
        "contar",
        "copa",
        "copia",
        "corazo\u0301n",
        "corbata",
        "corcho",
        "cordo\u0301n",
        "corona",
        "correr",
        "coser",
        "cosmos",
        "costa",
        "cra\u0301neo",
        "cra\u0301ter",
        "crear",
        "crecer",
        "crei\u0301do",
        "crema",
        "cri\u0301a",
        "crimen",
        "cripta",
        "crisis",
        "cromo",
        "cro\u0301nica",
        "croqueta",
        "crudo",
        "cruz",
        "cuadro",
        "cuarto",
        "cuatro",
        "cubo",
        "cubrir",
        "cuchara",
        "cuello",
        "cuento",
        "cuerda",
        "cuesta",
        "cueva",
        "cuidar",
        "culebra",
        "culpa",
        "culto",
        "cumbre",
        "cumplir",
        "cuna",
        "cuneta",
        "cuota",
        "cupo\u0301n",
        "cu\u0301pula",
        "curar",
        "curioso",
        "curso",
        "curva",
        "cutis",
        "dama",
        "danza",
        "dar",
        "dardo",
        "da\u0301til",
        "deber",
        "de\u0301bil",
        "de\u0301cada",
        "decir",
        "dedo",
        "defensa",
        "definir",
        "dejar",
        "delfi\u0301n",
        "delgado",
        "delito",
        "demora",
        "denso",
        "dental",
        "deporte",
        "derecho",
        "derrota",
        "desayuno",
        "deseo",
        "desfile",
        "desnudo",
        "destino",
        "desvi\u0301o",
        "detalle",
        "detener",
        "deuda",
        "di\u0301a",
        "diablo",
        "diadema",
        "diamante",
        "diana",
        "diario",
        "dibujo",
        "dictar",
        "diente",
        "dieta",
        "diez",
        "difi\u0301cil",
        "digno",
        "dilema",
        "diluir",
        "dinero",
        "directo",
        "dirigir",
        "disco",
        "disen\u0303o",
        "disfraz",
        "diva",
        "divino",
        "doble",
        "doce",
        "dolor",
        "domingo",
        "don",
        "donar",
        "dorado",
        "dormir",
        "dorso",
        "dos",
        "dosis",
        "drago\u0301n",
        "droga",
        "ducha",
        "duda",
        "duelo",
        "duen\u0303o",
        "dulce",
        "du\u0301o",
        "duque",
        "durar",
        "dureza",
        "duro",
        "e\u0301bano",
        "ebrio",
        "echar",
        "eco",
        "ecuador",
        "edad",
        "edicio\u0301n",
        "edificio",
        "editor",
        "educar",
        "efecto",
        "eficaz",
        "eje",
        "ejemplo",
        "elefante",
        "elegir",
        "elemento",
        "elevar",
        "elipse",
        "e\u0301lite",
        "elixir",
        "elogio",
        "eludir",
        "embudo",
        "emitir",
        "emocio\u0301n",
        "empate",
        "empen\u0303o",
        "empleo",
        "empresa",
        "enano",
        "encargo",
        "enchufe",
        "enci\u0301a",
        "enemigo",
        "enero",
        "enfado",
        "enfermo",
        "engan\u0303o",
        "enigma",
        "enlace",
        "enorme",
        "enredo",
        "ensayo",
        "ensen\u0303ar",
        "entero",
        "entrar",
        "envase",
        "envi\u0301o",
        "e\u0301poca",
        "equipo",
        "erizo",
        "escala",
        "escena",
        "escolar",
        "escribir",
        "escudo",
        "esencia",
        "esfera",
        "esfuerzo",
        "espada",
        "espejo",
        "espi\u0301a",
        "esposa",
        "espuma",
        "esqui\u0301",
        "estar",
        "este",
        "estilo",
        "estufa",
        "etapa",
        "eterno",
        "e\u0301tica",
        "etnia",
        "evadir",
        "evaluar",
        "evento",
        "evitar",
        "exacto",
        "examen",
        "exceso",
        "excusa",
        "exento",
        "exigir",
        "exilio",
        "existir",
        "e\u0301xito",
        "experto",
        "explicar",
        "exponer",
        "extremo",
        "fa\u0301brica",
        "fa\u0301bula",
        "fachada",
        "fa\u0301cil",
        "factor",
        "faena",
        "faja",
        "falda",
        "fallo",
        "falso",
        "faltar",
        "fama",
        "familia",
        "famoso",
        "farao\u0301n",
        "farmacia",
        "farol",
        "farsa",
        "fase",
        "fatiga",
        "fauna",
        "favor",
        "fax",
        "febrero",
        "fecha",
        "feliz",
        "feo",
        "feria",
        "feroz",
        "fe\u0301rtil",
        "fervor",
        "festi\u0301n",
        "fiable",
        "fianza",
        "fiar",
        "fibra",
        "ficcio\u0301n",
        "ficha",
        "fideo",
        "fiebre",
        "fiel",
        "fiera",
        "fiesta",
        "figura",
        "fijar",
        "fijo",
        "fila",
        "filete",
        "filial",
        "filtro",
        "fin",
        "finca",
        "fingir",
        "finito",
        "firma",
        "flaco",
        "flauta",
        "flecha",
        "flor",
        "flota",
        "fluir",
        "flujo",
        "flu\u0301or",
        "fobia",
        "foca",
        "fogata",
        "fogo\u0301n",
        "folio",
        "folleto",
        "fondo",
        "forma",
        "forro",
        "fortuna",
        "forzar",
        "fosa",
        "foto",
        "fracaso",
        "fra\u0301gil",
        "franja",
        "frase",
        "fraude",
        "frei\u0301r",
        "freno",
        "fresa",
        "fri\u0301o",
        "frito",
        "fruta",
        "fuego",
        "fuente",
        "fuerza",
        "fuga",
        "fumar",
        "funcio\u0301n",
        "funda",
        "furgo\u0301n",
        "furia",
        "fusil",
        "fu\u0301tbol",
        "futuro",
        "gacela",
        "gafas",
        "gaita",
        "gajo",
        "gala",
        "galeri\u0301a",
        "gallo",
        "gamba",
        "ganar",
        "gancho",
        "ganga",
        "ganso",
        "garaje",
        "garza",
        "gasolina",
        "gastar",
        "gato",
        "gavila\u0301n",
        "gemelo",
        "gemir",
        "gen",
        "ge\u0301nero",
        "genio",
        "gente",
        "geranio",
        "gerente",
        "germen",
        "gesto",
        "gigante",
        "gimnasio",
        "girar",
        "giro",
        "glaciar",
        "globo",
        "gloria",
        "gol",
        "golfo",
        "goloso",
        "golpe",
        "goma",
        "gordo",
        "gorila",
        "gorra",
        "gota",
        "goteo",
        "gozar",
        "grada",
        "gra\u0301fico",
        "grano",
        "grasa",
        "gratis",
        "grave",
        "grieta",
        "grillo",
        "gripe",
        "gris",
        "grito",
        "grosor",
        "gru\u0301a",
        "grueso",
        "grumo",
        "grupo",
        "guante",
        "guapo",
        "guardia",
        "guerra",
        "gui\u0301a",
        "guin\u0303o",
        "guion",
        "guiso",
        "guitarra",
        "gusano",
        "gustar",
        "haber",
        "ha\u0301bil",
        "hablar",
        "hacer",
        "hacha",
        "hada",
        "hallar",
        "hamaca",
        "harina",
        "haz",
        "hazan\u0303a",
        "hebilla",
        "hebra",
        "hecho",
        "helado",
        "helio",
        "hembra",
        "herir",
        "hermano",
        "he\u0301roe",
        "hervir",
        "hielo",
        "hierro",
        "hi\u0301gado",
        "higiene",
        "hijo",
        "himno",
        "historia",
        "hocico",
        "hogar",
        "hoguera",
        "hoja",
        "hombre",
        "hongo",
        "honor",
        "honra",
        "hora",
        "hormiga",
        "horno",
        "hostil",
        "hoyo",
        "hueco",
        "huelga",
        "huerta",
        "hueso",
        "huevo",
        "huida",
        "huir",
        "humano",
        "hu\u0301medo",
        "humilde",
        "humo",
        "hundir",
        "huraca\u0301n",
        "hurto",
        "icono",
        "ideal",
        "idioma",
        "i\u0301dolo",
        "iglesia",
        "iglu\u0301",
        "igual",
        "ilegal",
        "ilusio\u0301n",
        "imagen",
        "ima\u0301n",
        "imitar",
        "impar",
        "imperio",
        "imponer",
        "impulso",
        "incapaz",
        "i\u0301ndice",
        "inerte",
        "infiel",
        "informe",
        "ingenio",
        "inicio",
        "inmenso",
        "inmune",
        "innato",
        "insecto",
        "instante",
        "intere\u0301s",
        "i\u0301ntimo",
        "intuir",
        "inu\u0301til",
        "invierno",
        "ira",
        "iris",
        "ironi\u0301a",
        "isla",
        "islote",
        "jabali\u0301",
        "jabo\u0301n",
        "jamo\u0301n",
        "jarabe",
        "jardi\u0301n",
        "jarra",
        "jaula",
        "jazmi\u0301n",
        "jefe",
        "jeringa",
        "jinete",
        "jornada",
        "joroba",
        "joven",
        "joya",
        "juerga",
        "jueves",
        "juez",
        "jugador",
        "jugo",
        "juguete",
        "juicio",
        "junco",
        "jungla",
        "junio",
        "juntar",
        "ju\u0301piter",
        "jurar",
        "justo",
        "juvenil",
        "juzgar",
        "kilo",
        "koala",
        "labio",
        "lacio",
        "lacra",
        "lado",
        "ladro\u0301n",
        "lagarto",
        "la\u0301grima",
        "laguna",
        "laico",
        "lamer",
        "la\u0301mina",
        "la\u0301mpara",
        "lana",
        "lancha",
        "langosta",
        "lanza",
        "la\u0301piz",
        "largo",
        "larva",
        "la\u0301stima",
        "lata",
        "la\u0301tex",
        "latir",
        "laurel",
        "lavar",
        "lazo",
        "leal",
        "leccio\u0301n",
        "leche",
        "lector",
        "leer",
        "legio\u0301n",
        "legumbre",
        "lejano",
        "lengua",
        "lento",
        "len\u0303a",
        "leo\u0301n",
        "leopardo",
        "lesio\u0301n",
        "letal",
        "letra",
        "leve",
        "leyenda",
        "libertad",
        "libro",
        "licor",
        "li\u0301der",
        "lidiar",
        "lienzo",
        "liga",
        "ligero",
        "lima",
        "li\u0301mite",
        "limo\u0301n",
        "limpio",
        "lince",
        "lindo",
        "li\u0301nea",
        "lingote",
        "lino",
        "linterna",
        "li\u0301quido",
        "liso",
        "lista",
        "litera",
        "litio",
        "litro",
        "llaga",
        "llama",
        "llanto",
        "llave",
        "llegar",
        "llenar",
        "llevar",
        "llorar",
        "llover",
        "lluvia",
        "lobo",
        "locio\u0301n",
        "loco",
        "locura",
        "lo\u0301gica",
        "logro",
        "lombriz",
        "lomo",
        "lonja",
        "lote",
        "lucha",
        "lucir",
        "lugar",
        "lujo",
        "luna",
        "lunes",
        "lupa",
        "lustro",
        "luto",
        "luz",
        "maceta",
        "macho",
        "madera",
        "madre",
        "maduro",
        "maestro",
        "mafia",
        "magia",
        "mago",
        "mai\u0301z",
        "maldad",
        "maleta",
        "malla",
        "malo",
        "mama\u0301",
        "mambo",
        "mamut",
        "manco",
        "mando",
        "manejar",
        "manga",
        "maniqui\u0301",
        "manjar",
        "mano",
        "manso",
        "manta",
        "man\u0303ana",
        "mapa",
        "ma\u0301quina",
        "mar",
        "marco",
        "marea",
        "marfil",
        "margen",
        "marido",
        "ma\u0301rmol",
        "marro\u0301n",
        "martes",
        "marzo",
        "masa",
        "ma\u0301scara",
        "masivo",
        "matar",
        "materia",
        "matiz",
        "matriz",
        "ma\u0301ximo",
        "mayor",
        "mazorca",
        "mecha",
        "medalla",
        "medio",
        "me\u0301dula",
        "mejilla",
        "mejor",
        "melena",
        "melo\u0301n",
        "memoria",
        "menor",
        "mensaje",
        "mente",
        "menu\u0301",
        "mercado",
        "merengue",
        "me\u0301rito",
        "mes",
        "meso\u0301n",
        "meta",
        "meter",
        "me\u0301todo",
        "metro",
        "mezcla",
        "miedo",
        "miel",
        "miembro",
        "miga",
        "mil",
        "milagro",
        "militar",
        "millo\u0301n",
        "mimo",
        "mina",
        "minero",
        "mi\u0301nimo",
        "minuto",
        "miope",
        "mirar",
        "misa",
        "miseria",
        "misil",
        "mismo",
        "mitad",
        "mito",
        "mochila",
        "mocio\u0301n",
        "moda",
        "modelo",
        "moho",
        "mojar",
        "molde",
        "moler",
        "molino",
        "momento",
        "momia",
        "monarca",
        "moneda",
        "monja",
        "monto",
        "mon\u0303o",
        "morada",
        "morder",
        "moreno",
        "morir",
        "morro",
        "morsa",
        "mortal",
        "mosca",
        "mostrar",
        "motivo",
        "mover",
        "mo\u0301vil",
        "mozo",
        "mucho",
        "mudar",
        "mueble",
        "muela",
        "muerte",
        "muestra",
        "mugre",
        "mujer",
        "mula",
        "muleta",
        "multa",
        "mundo",
        "mun\u0303eca",
        "mural",
        "muro",
        "mu\u0301sculo",
        "museo",
        "musgo",
        "mu\u0301sica",
        "muslo",
        "na\u0301car",
        "nacio\u0301n",
        "nadar",
        "naipe",
        "naranja",
        "nariz",
        "narrar",
        "nasal",
        "natal",
        "nativo",
        "natural",
        "na\u0301usea",
        "naval",
        "nave",
        "navidad",
        "necio",
        "ne\u0301ctar",
        "negar",
        "negocio",
        "negro",
        "neo\u0301n",
        "nervio",
        "neto",
        "neutro",
        "nevar",
        "nevera",
        "nicho",
        "nido",
        "niebla",
        "nieto",
        "nin\u0303ez",
        "nin\u0303o",
        "ni\u0301tido",
        "nivel",
        "nobleza",
        "noche",
        "no\u0301mina",
        "noria",
        "norma",
        "norte",
        "nota",
        "noticia",
        "novato",
        "novela",
        "novio",
        "nube",
        "nuca",
        "nu\u0301cleo",
        "nudillo",
        "nudo",
        "nuera",
        "nueve",
        "nuez",
        "nulo",
        "nu\u0301mero",
        "nutria",
        "oasis",
        "obeso",
        "obispo",
        "objeto",
        "obra",
        "obrero",
        "observar",
        "obtener",
        "obvio",
        "oca",
        "ocaso",
        "oce\u0301ano",
        "ochenta",
        "ocho",
        "ocio",
        "ocre",
        "octavo",
        "octubre",
        "oculto",
        "ocupar",
        "ocurrir",
        "odiar",
        "odio",
        "odisea",
        "oeste",
        "ofensa",
        "oferta",
        "oficio",
        "ofrecer",
        "ogro",
        "oi\u0301do",
        "oi\u0301r",
        "ojo",
        "ola",
        "oleada",
        "olfato",
        "olivo",
        "olla",
        "olmo",
        "olor",
        "olvido",
        "ombligo",
        "onda",
        "onza",
        "opaco",
        "opcio\u0301n",
        "o\u0301pera",
        "opinar",
        "oponer",
        "optar",
        "o\u0301ptica",
        "opuesto",
        "oracio\u0301n",
        "orador",
        "oral",
        "o\u0301rbita",
        "orca",
        "orden",
        "oreja",
        "o\u0301rgano",
        "orgi\u0301a",
        "orgullo",
        "oriente",
        "origen",
        "orilla",
        "oro",
        "orquesta",
        "oruga",
        "osadi\u0301a",
        "oscuro",
        "osezno",
        "oso",
        "ostra",
        "oton\u0303o",
        "otro",
        "oveja",
        "o\u0301vulo",
        "o\u0301xido",
        "oxi\u0301geno",
        "oyente",
        "ozono",
        "pacto",
        "padre",
        "paella",
        "pa\u0301gina",
        "pago",
        "pai\u0301s",
        "pa\u0301jaro",
        "palabra",
        "palco",
        "paleta",
        "pa\u0301lido",
        "palma",
        "paloma",
        "palpar",
        "pan",
        "panal",
        "pa\u0301nico",
        "pantera",
        "pan\u0303uelo",
        "papa\u0301",
        "papel",
        "papilla",
        "paquete",
        "parar",
        "parcela",
        "pared",
        "parir",
        "paro",
        "pa\u0301rpado",
        "parque",
        "pa\u0301rrafo",
        "parte",
        "pasar",
        "paseo",
        "pasio\u0301n",
        "paso",
        "pasta",
        "pata",
        "patio",
        "patria",
        "pausa",
        "pauta",
        "pavo",
        "payaso",
        "peato\u0301n",
        "pecado",
        "pecera",
        "pecho",
        "pedal",
        "pedir",
        "pegar",
        "peine",
        "pelar",
        "peldan\u0303o",
        "pelea",
        "peligro",
        "pellejo",
        "pelo",
        "peluca",
        "pena",
        "pensar",
        "pen\u0303o\u0301n",
        "peo\u0301n",
        "peor",
        "pepino",
        "pequen\u0303o",
        "pera",
        "percha",
        "perder",
        "pereza",
        "perfil",
        "perico",
        "perla",
        "permiso",
        "perro",
        "persona",
        "pesa",
        "pesca",
        "pe\u0301simo",
        "pestan\u0303a",
        "pe\u0301talo",
        "petro\u0301leo",
        "pez",
        "pezun\u0303a",
        "picar",
        "picho\u0301n",
        "pie",
        "piedra",
        "pierna",
        "pieza",
        "pijama",
        "pilar",
        "piloto",
        "pimienta",
        "pino",
        "pintor",
        "pinza",
        "pin\u0303a",
        "piojo",
        "pipa",
        "pirata",
        "pisar",
        "piscina",
        "piso",
        "pista",
        "pito\u0301n",
        "pizca",
        "placa",
        "plan",
        "plata",
        "playa",
        "plaza",
        "pleito",
        "pleno",
        "plomo",
        "pluma",
        "plural",
        "pobre",
        "poco",
        "poder",
        "podio",
        "poema",
        "poesi\u0301a",
        "poeta",
        "polen",
        "polici\u0301a",
        "pollo",
        "polvo",
        "pomada",
        "pomelo",
        "pomo",
        "pompa",
        "poner",
        "porcio\u0301n",
        "portal",
        "posada",
        "poseer",
        "posible",
        "poste",
        "potencia",
        "potro",
        "pozo",
        "prado",
        "precoz",
        "pregunta",
        "premio",
        "prensa",
        "preso",
        "previo",
        "primo",
        "pri\u0301ncipe",
        "prisio\u0301n",
        "privar",
        "proa",
        "probar",
        "proceso",
        "producto",
        "proeza",
        "profesor",
        "programa",
        "prole",
        "promesa",
        "pronto",
        "propio",
        "pro\u0301ximo",
        "prueba",
        "pu\u0301blico",
        "puchero",
        "pudor",
        "pueblo",
        "puerta",
        "puesto",
        "pulga",
        "pulir",
        "pulmo\u0301n",
        "pulpo",
        "pulso",
        "puma",
        "punto",
        "pun\u0303al",
        "pun\u0303o",
        "pupa",
        "pupila",
        "pure\u0301",
        "quedar",
        "queja",
        "quemar",
        "querer",
        "queso",
        "quieto",
        "qui\u0301mica",
        "quince",
        "quitar",
        "ra\u0301bano",
        "rabia",
        "rabo",
        "racio\u0301n",
        "radical",
        "rai\u0301z",
        "rama",
        "rampa",
        "rancho",
        "rango",
        "rapaz",
        "ra\u0301pido",
        "rapto",
        "rasgo",
        "raspa",
        "rato",
        "rayo",
        "raza",
        "razo\u0301n",
        "reaccio\u0301n",
        "realidad",
        "reban\u0303o",
        "rebote",
        "recaer",
        "receta",
        "rechazo",
        "recoger",
        "recreo",
        "recto",
        "recurso",
        "red",
        "redondo",
        "reducir",
        "reflejo",
        "reforma",
        "refra\u0301n",
        "refugio",
        "regalo",
        "regir",
        "regla",
        "regreso",
        "rehe\u0301n",
        "reino",
        "rei\u0301r",
        "reja",
        "relato",
        "relevo",
        "relieve",
        "relleno",
        "reloj",
        "remar",
        "remedio",
        "remo",
        "rencor",
        "rendir",
        "renta",
        "reparto",
        "repetir",
        "reposo",
        "reptil",
        "res",
        "rescate",
        "resina",
        "respeto",
        "resto",
        "resumen",
        "retiro",
        "retorno",
        "retrato",
        "reunir",
        "reve\u0301s",
        "revista",
        "rey",
        "rezar",
        "rico",
        "riego",
        "rienda",
        "riesgo",
        "rifa",
        "ri\u0301gido",
        "rigor",
        "rinco\u0301n",
        "rin\u0303o\u0301n",
        "ri\u0301o",
        "riqueza",
        "risa",
        "ritmo",
        "rito",
        "rizo",
        "roble",
        "roce",
        "rociar",
        "rodar",
        "rodeo",
        "rodilla",
        "roer",
        "rojizo",
        "rojo",
        "romero",
        "romper",
        "ron",
        "ronco",
        "ronda",
        "ropa",
        "ropero",
        "rosa",
        "rosca",
        "rostro",
        "rotar",
        "rubi\u0301",
        "rubor",
        "rudo",
        "rueda",
        "rugir",
        "ruido",
        "ruina",
        "ruleta",
        "rulo",
        "rumbo",
        "rumor",
        "ruptura",
        "ruta",
        "rutina",
        "sa\u0301bado",
        "saber",
        "sabio",
        "sable",
        "sacar",
        "sagaz",
        "sagrado",
        "sala",
        "saldo",
        "salero",
        "salir",
        "salmo\u0301n",
        "salo\u0301n",
        "salsa",
        "salto",
        "salud",
        "salvar",
        "samba",
        "sancio\u0301n",
        "sandi\u0301a",
        "sanear",
        "sangre",
        "sanidad",
        "sano",
        "santo",
        "sapo",
        "saque",
        "sardina",
        "sarte\u0301n",
        "sastre",
        "sata\u0301n",
        "sauna",
        "saxofo\u0301n",
        "seccio\u0301n",
        "seco",
        "secreto",
        "secta",
        "sed",
        "seguir",
        "seis",
        "sello",
        "selva",
        "semana",
        "semilla",
        "senda",
        "sensor",
        "sen\u0303al",
        "sen\u0303or",
        "separar",
        "sepia",
        "sequi\u0301a",
        "ser",
        "serie",
        "sermo\u0301n",
        "servir",
        "sesenta",
        "sesio\u0301n",
        "seta",
        "setenta",
        "severo",
        "sexo",
        "sexto",
        "sidra",
        "siesta",
        "siete",
        "siglo",
        "signo",
        "si\u0301laba",
        "silbar",
        "silencio",
        "silla",
        "si\u0301mbolo",
        "simio",
        "sirena",
        "sistema",
        "sitio",
        "situar",
        "sobre",
        "socio",
        "sodio",
        "sol",
        "solapa",
        "soldado",
        "soledad",
        "so\u0301lido",
        "soltar",
        "solucio\u0301n",
        "sombra",
        "sondeo",
        "sonido",
        "sonoro",
        "sonrisa",
        "sopa",
        "soplar",
        "soporte",
        "sordo",
        "sorpresa",
        "sorteo",
        "soste\u0301n",
        "so\u0301tano",
        "suave",
        "subir",
        "suceso",
        "sudor",
        "suegra",
        "suelo",
        "suen\u0303o",
        "suerte",
        "sufrir",
        "sujeto",
        "sulta\u0301n",
        "sumar",
        "superar",
        "suplir",
        "suponer",
        "supremo",
        "sur",
        "surco",
        "suren\u0303o",
        "surgir",
        "susto",
        "sutil",
        "tabaco",
        "tabique",
        "tabla",
        "tabu\u0301",
        "taco",
        "tacto",
        "tajo",
        "talar",
        "talco",
        "talento",
        "talla",
        "talo\u0301n",
        "taman\u0303o",
        "tambor",
        "tango",
        "tanque",
        "tapa",
        "tapete",
        "tapia",
        "tapo\u0301n",
        "taquilla",
        "tarde",
        "tarea",
        "tarifa",
        "tarjeta",
        "tarot",
        "tarro",
        "tarta",
        "tatuaje",
        "tauro",
        "taza",
        "tazo\u0301n",
        "teatro",
        "techo",
        "tecla",
        "te\u0301cnica",
        "tejado",
        "tejer",
        "tejido",
        "tela",
        "tele\u0301fono",
        "tema",
        "temor",
        "templo",
        "tenaz",
        "tender",
        "tener",
        "tenis",
        "tenso",
        "teori\u0301a",
        "terapia",
        "terco",
        "te\u0301rmino",
        "ternura",
        "terror",
        "tesis",
        "tesoro",
        "testigo",
        "tetera",
        "texto",
        "tez",
        "tibio",
        "tiburo\u0301n",
        "tiempo",
        "tienda",
        "tierra",
        "tieso",
        "tigre",
        "tijera",
        "tilde",
        "timbre",
        "ti\u0301mido",
        "timo",
        "tinta",
        "ti\u0301o",
        "ti\u0301pico",
        "tipo",
        "tira",
        "tiro\u0301n",
        "tita\u0301n",
        "ti\u0301tere",
        "ti\u0301tulo",
        "tiza",
        "toalla",
        "tobillo",
        "tocar",
        "tocino",
        "todo",
        "toga",
        "toldo",
        "tomar",
        "tono",
        "tonto",
        "topar",
        "tope",
        "toque",
        "to\u0301rax",
        "torero",
        "tormenta",
        "torneo",
        "toro",
        "torpedo",
        "torre",
        "torso",
        "tortuga",
        "tos",
        "tosco",
        "toser",
        "to\u0301xico",
        "trabajo",
        "tractor",
        "traer",
        "tra\u0301fico",
        "trago",
        "traje",
        "tramo",
        "trance",
        "trato",
        "trauma",
        "trazar",
        "tre\u0301bol",
        "tregua",
        "treinta",
        "tren",
        "trepar",
        "tres",
        "tribu",
        "trigo",
        "tripa",
        "triste",
        "triunfo",
        "trofeo",
        "trompa",
        "tronco",
        "tropa",
        "trote",
        "trozo",
        "truco",
        "trueno",
        "trufa",
        "tuberi\u0301a",
        "tubo",
        "tuerto",
        "tumba",
        "tumor",
        "tu\u0301nel",
        "tu\u0301nica",
        "turbina",
        "turismo",
        "turno",
        "tutor",
        "ubicar",
        "u\u0301lcera",
        "umbral",
        "unidad",
        "unir",
        "universo",
        "uno",
        "untar",
        "un\u0303a",
        "urbano",
        "urbe",
        "urgente",
        "urna",
        "usar",
        "usuario",
        "u\u0301til",
        "utopi\u0301a",
        "uva",
        "vaca",
        "vaci\u0301o",
        "vacuna",
        "vagar",
        "vago",
        "vaina",
        "vajilla",
        "vale",
        "va\u0301lido",
        "valle",
        "valor",
        "va\u0301lvula",
        "vampiro",
        "vara",
        "variar",
        "varo\u0301n",
        "vaso",
        "vecino",
        "vector",
        "vehi\u0301culo",
        "veinte",
        "vejez",
        "vela",
        "velero",
        "veloz",
        "vena",
        "vencer",
        "venda",
        "veneno",
        "vengar",
        "venir",
        "venta",
        "venus",
        "ver",
        "verano",
        "verbo",
        "verde",
        "vereda",
        "verja",
        "verso",
        "verter",
        "vi\u0301a",
        "viaje",
        "vibrar",
        "vicio",
        "vi\u0301ctima",
        "vida",
        "vi\u0301deo",
        "vidrio",
        "viejo",
        "viernes",
        "vigor",
        "vil",
        "villa",
        "vinagre",
        "vino",
        "vin\u0303edo",
        "violi\u0301n",
        "viral",
        "virgo",
        "virtud",
        "visor",
        "vi\u0301spera",
        "vista",
        "vitamina",
        "viudo",
        "vivaz",
        "vivero",
        "vivir",
        "vivo",
        "volca\u0301n",
        "volumen",
        "volver",
        "voraz",
        "votar",
        "voto",
        "voz",
        "vuelo",
        "vulgar",
        "yacer",
        "yate",
        "yegua",
        "yema",
        "yerno",
        "yeso",
        "yodo",
        "yoga",
        "yogur",
        "zafiro",
        "zanja",
        "zapato",
        "zarza",
        "zona",
        "zorro",
        "zumo",
        "zurdo"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/japanese.json
  var require_japanese = __commonJS({
    "node_modules/bip39/src/wordlists/japanese.json"(exports, module) {
      module.exports = [
        "\u3042\u3044\u3053\u304F\u3057\u3093",
        "\u3042\u3044\u3055\u3064",
        "\u3042\u3044\u305F\u3099",
        "\u3042\u304A\u305D\u3099\u3089",
        "\u3042\u304B\u3061\u3083\u3093",
        "\u3042\u304D\u308B",
        "\u3042\u3051\u304B\u3099\u305F",
        "\u3042\u3051\u308B",
        "\u3042\u3053\u304B\u3099\u308C\u308B",
        "\u3042\u3055\u3044",
        "\u3042\u3055\u3072",
        "\u3042\u3057\u3042\u3068",
        "\u3042\u3057\u3099\u308F\u3046",
        "\u3042\u3059\u3099\u304B\u308B",
        "\u3042\u3059\u3099\u304D",
        "\u3042\u305D\u3075\u3099",
        "\u3042\u305F\u3048\u308B",
        "\u3042\u305F\u305F\u3081\u308B",
        "\u3042\u305F\u308A\u307E\u3048",
        "\u3042\u305F\u308B",
        "\u3042\u3064\u3044",
        "\u3042\u3064\u304B\u3046",
        "\u3042\u3063\u3057\u3085\u304F",
        "\u3042\u3064\u307E\u308A",
        "\u3042\u3064\u3081\u308B",
        "\u3042\u3066\u306A",
        "\u3042\u3066\u306F\u307E\u308B",
        "\u3042\u3072\u308B",
        "\u3042\u3075\u3099\u3089",
        "\u3042\u3075\u3099\u308B",
        "\u3042\u3075\u308C\u308B",
        "\u3042\u307E\u3044",
        "\u3042\u307E\u3068\u3099",
        "\u3042\u307E\u3084\u304B\u3059",
        "\u3042\u307E\u308A",
        "\u3042\u307F\u3082\u306E",
        "\u3042\u3081\u308A\u304B",
        "\u3042\u3084\u307E\u308B",
        "\u3042\u3086\u3080",
        "\u3042\u3089\u3044\u304F\u3099\u307E",
        "\u3042\u3089\u3057",
        "\u3042\u3089\u3059\u3057\u3099",
        "\u3042\u3089\u305F\u3081\u308B",
        "\u3042\u3089\u3086\u308B",
        "\u3042\u3089\u308F\u3059",
        "\u3042\u308A\u304B\u3099\u3068\u3046",
        "\u3042\u308F\u305B\u308B",
        "\u3042\u308F\u3066\u308B",
        "\u3042\u3093\u3044",
        "\u3042\u3093\u304B\u3099\u3044",
        "\u3042\u3093\u3053",
        "\u3042\u3093\u305B\u3099\u3093",
        "\u3042\u3093\u3066\u3044",
        "\u3042\u3093\u306A\u3044",
        "\u3042\u3093\u307E\u308A",
        "\u3044\u3044\u305F\u3099\u3059",
        "\u3044\u304A\u3093",
        "\u3044\u304B\u3099\u3044",
        "\u3044\u304B\u3099\u304F",
        "\u3044\u304D\u304A\u3044",
        "\u3044\u304D\u306A\u308A",
        "\u3044\u304D\u3082\u306E",
        "\u3044\u304D\u308B",
        "\u3044\u304F\u3057\u3099",
        "\u3044\u304F\u3075\u3099\u3093",
        "\u3044\u3051\u306F\u3099\u306A",
        "\u3044\u3051\u3093",
        "\u3044\u3053\u3046",
        "\u3044\u3053\u304F",
        "\u3044\u3053\u3064",
        "\u3044\u3055\u307E\u3057\u3044",
        "\u3044\u3055\u3093",
        "\u3044\u3057\u304D",
        "\u3044\u3057\u3099\u3085\u3046",
        "\u3044\u3057\u3099\u3087\u3046",
        "\u3044\u3057\u3099\u308F\u308B",
        "\u3044\u3059\u3099\u307F",
        "\u3044\u3059\u3099\u308C",
        "\u3044\u305B\u3044",
        "\u3044\u305B\u3048\u3072\u3099",
        "\u3044\u305B\u304B\u3044",
        "\u3044\u305B\u304D",
        "\u3044\u305B\u3099\u3093",
        "\u3044\u305D\u3046\u308D\u3046",
        "\u3044\u305D\u304B\u3099\u3057\u3044",
        "\u3044\u305F\u3099\u3044",
        "\u3044\u305F\u3099\u304F",
        "\u3044\u305F\u3059\u3099\u3089",
        "\u3044\u305F\u307F",
        "\u3044\u305F\u308A\u3042",
        "\u3044\u3061\u304A\u3046",
        "\u3044\u3061\u3057\u3099",
        "\u3044\u3061\u3068\u3099",
        "\u3044\u3061\u306F\u3099",
        "\u3044\u3061\u3075\u3099",
        "\u3044\u3061\u308A\u3085\u3046",
        "\u3044\u3064\u304B",
        "\u3044\u3063\u3057\u3085\u3093",
        "\u3044\u3063\u305B\u3044",
        "\u3044\u3063\u305D\u3046",
        "\u3044\u3063\u305F\u3093",
        "\u3044\u3063\u3061",
        "\u3044\u3063\u3066\u3044",
        "\u3044\u3063\u307B\u309A\u3046",
        "\u3044\u3066\u3055\u3099",
        "\u3044\u3066\u3093",
        "\u3044\u3068\u3099\u3046",
        "\u3044\u3068\u3053",
        "\u3044\u306A\u3044",
        "\u3044\u306A\u304B",
        "\u3044\u306D\u3080\u308A",
        "\u3044\u306E\u3061",
        "\u3044\u306E\u308B",
        "\u3044\u306F\u3064",
        "\u3044\u306F\u3099\u308B",
        "\u3044\u306F\u3093",
        "\u3044\u3072\u3099\u304D",
        "\u3044\u3072\u3093",
        "\u3044\u3075\u304F",
        "\u3044\u3078\u3093",
        "\u3044\u307B\u3046",
        "\u3044\u307F\u3093",
        "\u3044\u3082\u3046\u3068",
        "\u3044\u3082\u305F\u308C",
        "\u3044\u3082\u308A",
        "\u3044\u3084\u304B\u3099\u308B",
        "\u3044\u3084\u3059",
        "\u3044\u3088\u304B\u3093",
        "\u3044\u3088\u304F",
        "\u3044\u3089\u3044",
        "\u3044\u3089\u3059\u3068",
        "\u3044\u308A\u304F\u3099\u3061",
        "\u3044\u308A\u3087\u3046",
        "\u3044\u308C\u3044",
        "\u3044\u308C\u3082\u306E",
        "\u3044\u308C\u308B",
        "\u3044\u308D\u3048\u3093\u3072\u309A\u3064",
        "\u3044\u308F\u3044",
        "\u3044\u308F\u3046",
        "\u3044\u308F\u304B\u3093",
        "\u3044\u308F\u306F\u3099",
        "\u3044\u308F\u3086\u308B",
        "\u3044\u3093\u3051\u3099\u3093\u307E\u3081",
        "\u3044\u3093\u3055\u3064",
        "\u3044\u3093\u3057\u3087\u3046",
        "\u3044\u3093\u3088\u3046",
        "\u3046\u3048\u304D",
        "\u3046\u3048\u308B",
        "\u3046\u304A\u3055\u3099",
        "\u3046\u304B\u3099\u3044",
        "\u3046\u304B\u3075\u3099",
        "\u3046\u304B\u3078\u3099\u308B",
        "\u3046\u304D\u308F",
        "\u3046\u304F\u3089\u3044\u306A",
        "\u3046\u304F\u308C\u308C",
        "\u3046\u3051\u305F\u307E\u308F\u308B",
        "\u3046\u3051\u3064\u3051",
        "\u3046\u3051\u3068\u308B",
        "\u3046\u3051\u3082\u3064",
        "\u3046\u3051\u308B",
        "\u3046\u3053\u3099\u304B\u3059",
        "\u3046\u3053\u3099\u304F",
        "\u3046\u3053\u3093",
        "\u3046\u3055\u304D\u3099",
        "\u3046\u3057\u306A\u3046",
        "\u3046\u3057\u308D\u304B\u3099\u307F",
        "\u3046\u3059\u3044",
        "\u3046\u3059\u304D\u3099",
        "\u3046\u3059\u304F\u3099\u3089\u3044",
        "\u3046\u3059\u3081\u308B",
        "\u3046\u305B\u3064",
        "\u3046\u3061\u3042\u308F\u305B",
        "\u3046\u3061\u304B\u3099\u308F",
        "\u3046\u3061\u304D",
        "\u3046\u3061\u3085\u3046",
        "\u3046\u3063\u304B\u308A",
        "\u3046\u3064\u304F\u3057\u3044",
        "\u3046\u3063\u305F\u3048\u308B",
        "\u3046\u3064\u308B",
        "\u3046\u3068\u3099\u3093",
        "\u3046\u306A\u304D\u3099",
        "\u3046\u306A\u3057\u3099",
        "\u3046\u306A\u3059\u3099\u304F",
        "\u3046\u306A\u308B",
        "\u3046\u306D\u308B",
        "\u3046\u306E\u3046",
        "\u3046\u3075\u3099\u3051\u3099",
        "\u3046\u3075\u3099\u3053\u3099\u3048",
        "\u3046\u307E\u308C\u308B",
        "\u3046\u3081\u308B",
        "\u3046\u3082\u3046",
        "\u3046\u3084\u307E\u3046",
        "\u3046\u3088\u304F",
        "\u3046\u3089\u304B\u3099\u3048\u3059",
        "\u3046\u3089\u304F\u3099\u3061",
        "\u3046\u3089\u306A\u3044",
        "\u3046\u308A\u3042\u3051\u3099",
        "\u3046\u308A\u304D\u308C",
        "\u3046\u308B\u3055\u3044",
        "\u3046\u308C\u3057\u3044",
        "\u3046\u308C\u3086\u304D",
        "\u3046\u308C\u308B",
        "\u3046\u308D\u3053",
        "\u3046\u308F\u304D",
        "\u3046\u308F\u3055",
        "\u3046\u3093\u3053\u3046",
        "\u3046\u3093\u3061\u3093",
        "\u3046\u3093\u3066\u3093",
        "\u3046\u3093\u3068\u3099\u3046",
        "\u3048\u3044\u3048\u3093",
        "\u3048\u3044\u304B\u3099",
        "\u3048\u3044\u304D\u3087\u3046",
        "\u3048\u3044\u3053\u3099",
        "\u3048\u3044\u305B\u3044",
        "\u3048\u3044\u3075\u3099\u3093",
        "\u3048\u3044\u3088\u3046",
        "\u3048\u3044\u308F",
        "\u3048\u304A\u308A",
        "\u3048\u304B\u3099\u304A",
        "\u3048\u304B\u3099\u304F",
        "\u3048\u304D\u305F\u3044",
        "\u3048\u304F\u305B\u308B",
        "\u3048\u3057\u3083\u304F",
        "\u3048\u3059\u3066",
        "\u3048\u3064\u3089\u3093",
        "\u3048\u306E\u304F\u3099",
        "\u3048\u307B\u3046\u307E\u304D",
        "\u3048\u307B\u3093",
        "\u3048\u307E\u304D",
        "\u3048\u3082\u3057\u3099",
        "\u3048\u3082\u306E",
        "\u3048\u3089\u3044",
        "\u3048\u3089\u3075\u3099",
        "\u3048\u308A\u3042",
        "\u3048\u3093\u3048\u3093",
        "\u3048\u3093\u304B\u3044",
        "\u3048\u3093\u304D\u3099",
        "\u3048\u3093\u3051\u3099\u304D",
        "\u3048\u3093\u3057\u3085\u3046",
        "\u3048\u3093\u305B\u3099\u3064",
        "\u3048\u3093\u305D\u304F",
        "\u3048\u3093\u3061\u3087\u3046",
        "\u3048\u3093\u3068\u3064",
        "\u304A\u3044\u304B\u3051\u308B",
        "\u304A\u3044\u3053\u3059",
        "\u304A\u3044\u3057\u3044",
        "\u304A\u3044\u3064\u304F",
        "\u304A\u3046\u3048\u3093",
        "\u304A\u3046\u3055\u307E",
        "\u304A\u3046\u3057\u3099",
        "\u304A\u3046\u305B\u3064",
        "\u304A\u3046\u305F\u3044",
        "\u304A\u3046\u3075\u304F",
        "\u304A\u3046\u3078\u3099\u3044",
        "\u304A\u3046\u3088\u3046",
        "\u304A\u3048\u308B",
        "\u304A\u304A\u3044",
        "\u304A\u304A\u3046",
        "\u304A\u304A\u3068\u3099\u304A\u308A",
        "\u304A\u304A\u3084",
        "\u304A\u304A\u3088\u305D",
        "\u304A\u304B\u3048\u308A",
        "\u304A\u304B\u3059\u3099",
        "\u304A\u304B\u3099\u3080",
        "\u304A\u304B\u308F\u308A",
        "\u304A\u304D\u3099\u306A\u3046",
        "\u304A\u304D\u308B",
        "\u304A\u304F\u3055\u307E",
        "\u304A\u304F\u3057\u3099\u3087\u3046",
        "\u304A\u304F\u308A\u304B\u3099\u306A",
        "\u304A\u304F\u308B",
        "\u304A\u304F\u308C\u308B",
        "\u304A\u3053\u3059",
        "\u304A\u3053\u306A\u3046",
        "\u304A\u3053\u308B",
        "\u304A\u3055\u3048\u308B",
        "\u304A\u3055\u306A\u3044",
        "\u304A\u3055\u3081\u308B",
        "\u304A\u3057\u3044\u308C",
        "\u304A\u3057\u3048\u308B",
        "\u304A\u3057\u3099\u304D\u3099",
        "\u304A\u3057\u3099\u3055\u3093",
        "\u304A\u3057\u3083\u308C",
        "\u304A\u305D\u3089\u304F",
        "\u304A\u305D\u308F\u308B",
        "\u304A\u305F\u304B\u3099\u3044",
        "\u304A\u305F\u304F",
        "\u304A\u305F\u3099\u3084\u304B",
        "\u304A\u3061\u3064\u304F",
        "\u304A\u3063\u3068",
        "\u304A\u3064\u308A",
        "\u304A\u3066\u3099\u304B\u3051",
        "\u304A\u3068\u3057\u3082\u306E",
        "\u304A\u3068\u306A\u3057\u3044",
        "\u304A\u3068\u3099\u308A",
        "\u304A\u3068\u3099\u308D\u304B\u3059",
        "\u304A\u306F\u3099\u3055\u3093",
        "\u304A\u307E\u3044\u308A",
        "\u304A\u3081\u3066\u3099\u3068\u3046",
        "\u304A\u3082\u3044\u3066\u3099",
        "\u304A\u3082\u3046",
        "\u304A\u3082\u305F\u3044",
        "\u304A\u3082\u3061\u3083",
        "\u304A\u3084\u3064",
        "\u304A\u3084\u3086\u3072\u3099",
        "\u304A\u3088\u307B\u3099\u3059",
        "\u304A\u3089\u3093\u305F\u3099",
        "\u304A\u308D\u3059",
        "\u304A\u3093\u304B\u3099\u304F",
        "\u304A\u3093\u3051\u3044",
        "\u304A\u3093\u3057\u3083",
        "\u304A\u3093\u305B\u3093",
        "\u304A\u3093\u305F\u3099\u3093",
        "\u304A\u3093\u3061\u3085\u3046",
        "\u304A\u3093\u3068\u3099\u3051\u3044",
        "\u304B\u3042\u3064",
        "\u304B\u3044\u304B\u3099",
        "\u304B\u3099\u3044\u304D",
        "\u304B\u3099\u3044\u3051\u3093",
        "\u304B\u3099\u3044\u3053\u3046",
        "\u304B\u3044\u3055\u3064",
        "\u304B\u3044\u3057\u3083",
        "\u304B\u3044\u3059\u3044\u3088\u304F",
        "\u304B\u3044\u305B\u3099\u3093",
        "\u304B\u3044\u305D\u3099\u3046\u3068\u3099",
        "\u304B\u3044\u3064\u3046",
        "\u304B\u3044\u3066\u3093",
        "\u304B\u3044\u3068\u3046",
        "\u304B\u3044\u3075\u304F",
        "\u304B\u3099\u3044\u3078\u304D",
        "\u304B\u3044\u307B\u3046",
        "\u304B\u3044\u3088\u3046",
        "\u304B\u3099\u3044\u3089\u3044",
        "\u304B\u3044\u308F",
        "\u304B\u3048\u308B",
        "\u304B\u304A\u308A",
        "\u304B\u304B\u3048\u308B",
        "\u304B\u304B\u3099\u304F",
        "\u304B\u304B\u3099\u3057",
        "\u304B\u304B\u3099\u307F",
        "\u304B\u304F\u3053\u3099",
        "\u304B\u304F\u3068\u304F",
        "\u304B\u3055\u3099\u308B",
        "\u304B\u3099\u305D\u3099\u3046",
        "\u304B\u305F\u3044",
        "\u304B\u305F\u3061",
        "\u304B\u3099\u3061\u3087\u3046",
        "\u304B\u3099\u3063\u304D\u3085\u3046",
        "\u304B\u3099\u3063\u3053\u3046",
        "\u304B\u3099\u3063\u3055\u3093",
        "\u304B\u3099\u3063\u3057\u3087\u3046",
        "\u304B\u306A\u3055\u3099\u308F\u3057",
        "\u304B\u306E\u3046",
        "\u304B\u3099\u306F\u304F",
        "\u304B\u3075\u3099\u304B",
        "\u304B\u307B\u3046",
        "\u304B\u307B\u3053\u3099",
        "\u304B\u307E\u3046",
        "\u304B\u307E\u307B\u3099\u3053",
        "\u304B\u3081\u308C\u304A\u3093",
        "\u304B\u3086\u3044",
        "\u304B\u3088\u3046\u3072\u3099",
        "\u304B\u3089\u3044",
        "\u304B\u308B\u3044",
        "\u304B\u308D\u3046",
        "\u304B\u308F\u304F",
        "\u304B\u308F\u3089",
        "\u304B\u3099\u3093\u304B",
        "\u304B\u3093\u3051\u3044",
        "\u304B\u3093\u3053\u3046",
        "\u304B\u3093\u3057\u3083",
        "\u304B\u3093\u305D\u3046",
        "\u304B\u3093\u305F\u3093",
        "\u304B\u3093\u3061",
        "\u304B\u3099\u3093\u306F\u3099\u308B",
        "\u304D\u3042\u3044",
        "\u304D\u3042\u3064",
        "\u304D\u3044\u308D",
        "\u304D\u3099\u3044\u3093",
        "\u304D\u3046\u3044",
        "\u304D\u3046\u3093",
        "\u304D\u3048\u308B",
        "\u304D\u304A\u3046",
        "\u304D\u304A\u304F",
        "\u304D\u304A\u3061",
        "\u304D\u304A\u3093",
        "\u304D\u304B\u3044",
        "\u304D\u304B\u304F",
        "\u304D\u304B\u3093\u3057\u3083",
        "\u304D\u304D\u3066",
        "\u304D\u304F\u306F\u3099\u308A",
        "\u304D\u304F\u3089\u3051\u3099",
        "\u304D\u3051\u3093\u305B\u3044",
        "\u304D\u3053\u3046",
        "\u304D\u3053\u3048\u308B",
        "\u304D\u3053\u304F",
        "\u304D\u3055\u3044",
        "\u304D\u3055\u304F",
        "\u304D\u3055\u307E",
        "\u304D\u3055\u3089\u304D\u3099",
        "\u304D\u3099\u3057\u3099\u304B\u304B\u3099\u304F",
        "\u304D\u3099\u3057\u304D",
        "\u304D\u3099\u3057\u3099\u305F\u3044\u3051\u3093",
        "\u304D\u3099\u3057\u3099\u306B\u3063\u3066\u3044",
        "\u304D\u3099\u3057\u3099\u3085\u3064\u3057\u3083",
        "\u304D\u3059\u3046",
        "\u304D\u305B\u3044",
        "\u304D\u305B\u304D",
        "\u304D\u305B\u3064",
        "\u304D\u305D\u3046",
        "\u304D\u305D\u3099\u304F",
        "\u304D\u305D\u3099\u3093",
        "\u304D\u305F\u3048\u308B",
        "\u304D\u3061\u3087\u3046",
        "\u304D\u3064\u3048\u3093",
        "\u304D\u3099\u3063\u3061\u308A",
        "\u304D\u3064\u3064\u304D",
        "\u304D\u3064\u306D",
        "\u304D\u3066\u3044",
        "\u304D\u3068\u3099\u3046",
        "\u304D\u3068\u3099\u304F",
        "\u304D\u306A\u3044",
        "\u304D\u306A\u304B\u3099",
        "\u304D\u306A\u3053",
        "\u304D\u306C\u3053\u3099\u3057",
        "\u304D\u306D\u3093",
        "\u304D\u306E\u3046",
        "\u304D\u306E\u3057\u305F",
        "\u304D\u306F\u304F",
        "\u304D\u3072\u3099\u3057\u3044",
        "\u304D\u3072\u3093",
        "\u304D\u3075\u304F",
        "\u304D\u3075\u3099\u3093",
        "\u304D\u307B\u3099\u3046",
        "\u304D\u307B\u3093",
        "\u304D\u307E\u308B",
        "\u304D\u307F\u3064",
        "\u304D\u3080\u3059\u3099\u304B\u3057\u3044",
        "\u304D\u3081\u308B",
        "\u304D\u3082\u305F\u3099\u3081\u3057",
        "\u304D\u3082\u3061",
        "\u304D\u3082\u306E",
        "\u304D\u3083\u304F",
        "\u304D\u3084\u304F",
        "\u304D\u3099\u3085\u3046\u306B\u304F",
        "\u304D\u3088\u3046",
        "\u304D\u3087\u3046\u308A\u3085\u3046",
        "\u304D\u3089\u3044",
        "\u304D\u3089\u304F",
        "\u304D\u308A\u3093",
        "\u304D\u308C\u3044",
        "\u304D\u308C\u3064",
        "\u304D\u308D\u304F",
        "\u304D\u3099\u308D\u3093",
        "\u304D\u308F\u3081\u308B",
        "\u304D\u3099\u3093\u3044\u308D",
        "\u304D\u3093\u304B\u304F\u3057\u3099",
        "\u304D\u3093\u3057\u3099\u3087",
        "\u304D\u3093\u3088\u3046\u3072\u3099",
        "\u304F\u3099\u3042\u3044",
        "\u304F\u3044\u3059\u3099",
        "\u304F\u3046\u304B\u3093",
        "\u304F\u3046\u304D",
        "\u304F\u3046\u304F\u3099\u3093",
        "\u304F\u3046\u3053\u3046",
        "\u304F\u3099\u3046\u305B\u3044",
        "\u304F\u3046\u305D\u3046",
        "\u304F\u3099\u3046\u305F\u3089",
        "\u304F\u3046\u3075\u304F",
        "\u304F\u3046\u307B\u3099",
        "\u304F\u304B\u3093",
        "\u304F\u304D\u3087\u3046",
        "\u304F\u3051\u3099\u3093",
        "\u304F\u3099\u3053\u3046",
        "\u304F\u3055\u3044",
        "\u304F\u3055\u304D",
        "\u304F\u3055\u306F\u3099\u306A",
        "\u304F\u3055\u308B",
        "\u304F\u3057\u3083\u307F",
        "\u304F\u3057\u3087\u3046",
        "\u304F\u3059\u306E\u304D",
        "\u304F\u3059\u308A\u3086\u3072\u3099",
        "\u304F\u305B\u3051\u3099",
        "\u304F\u305B\u3093",
        "\u304F\u3099\u305F\u3044\u3066\u304D",
        "\u304F\u305F\u3099\u3055\u308B",
        "\u304F\u305F\u3072\u3099\u308C\u308B",
        "\u304F\u3061\u3053\u307F",
        "\u304F\u3061\u3055\u304D",
        "\u304F\u3064\u3057\u305F",
        "\u304F\u3099\u3063\u3059\u308A",
        "\u304F\u3064\u308D\u304F\u3099",
        "\u304F\u3068\u3046\u3066\u3093",
        "\u304F\u3068\u3099\u304F",
        "\u304F\u306A\u3093",
        "\u304F\u306D\u304F\u306D",
        "\u304F\u306E\u3046",
        "\u304F\u3075\u3046",
        "\u304F\u307F\u3042\u308F\u305B",
        "\u304F\u307F\u305F\u3066\u308B",
        "\u304F\u3081\u308B",
        "\u304F\u3084\u304F\u3057\u3087",
        "\u304F\u3089\u3059",
        "\u304F\u3089\u3078\u3099\u308B",
        "\u304F\u308B\u307E",
        "\u304F\u308C\u308B",
        "\u304F\u308D\u3046",
        "\u304F\u308F\u3057\u3044",
        "\u304F\u3099\u3093\u304B\u3093",
        "\u304F\u3099\u3093\u3057\u3087\u304F",
        "\u304F\u3099\u3093\u305F\u3044",
        "\u304F\u3099\u3093\u3066",
        "\u3051\u3042\u306A",
        "\u3051\u3044\u304B\u304F",
        "\u3051\u3044\u3051\u3093",
        "\u3051\u3044\u3053",
        "\u3051\u3044\u3055\u3064",
        "\u3051\u3099\u3044\u3057\u3099\u3085\u3064",
        "\u3051\u3044\u305F\u3044",
        "\u3051\u3099\u3044\u306E\u3046\u3057\u3099\u3093",
        "\u3051\u3044\u308C\u304D",
        "\u3051\u3044\u308D",
        "\u3051\u304A\u3068\u3059",
        "\u3051\u304A\u308A\u3082\u306E",
        "\u3051\u3099\u304D\u304B",
        "\u3051\u3099\u304D\u3051\u3099\u3093",
        "\u3051\u3099\u304D\u305F\u3099\u3093",
        "\u3051\u3099\u304D\u3061\u3093",
        "\u3051\u3099\u304D\u3068\u3064",
        "\u3051\u3099\u304D\u306F",
        "\u3051\u3099\u304D\u3084\u304F",
        "\u3051\u3099\u3053\u3046",
        "\u3051\u3099\u3053\u304F\u3057\u3099\u3087\u3046",
        "\u3051\u3099\u3055\u3099\u3044",
        "\u3051\u3055\u304D",
        "\u3051\u3099\u3055\u3099\u3093",
        "\u3051\u3057\u304D",
        "\u3051\u3057\u3053\u3099\u3080",
        "\u3051\u3057\u3087\u3046",
        "\u3051\u3099\u3059\u3068",
        "\u3051\u305F\u306F\u3099",
        "\u3051\u3061\u3083\u3063\u3075\u309A",
        "\u3051\u3061\u3089\u3059",
        "\u3051\u3064\u3042\u3064",
        "\u3051\u3064\u3044",
        "\u3051\u3064\u3048\u304D",
        "\u3051\u3063\u3053\u3093",
        "\u3051\u3064\u3057\u3099\u3087",
        "\u3051\u3063\u305B\u304D",
        "\u3051\u3063\u3066\u3044",
        "\u3051\u3064\u307E\u3064",
        "\u3051\u3099\u3064\u3088\u3046\u3072\u3099",
        "\u3051\u3099\u3064\u308C\u3044",
        "\u3051\u3064\u308D\u3093",
        "\u3051\u3099\u3068\u3099\u304F",
        "\u3051\u3068\u306F\u3099\u3059",
        "\u3051\u3068\u308B",
        "\u3051\u306A\u3051\u3099",
        "\u3051\u306A\u3059",
        "\u3051\u306A\u307F",
        "\u3051\u306C\u304D",
        "\u3051\u3099\u306D\u3064",
        "\u3051\u306D\u3093",
        "\u3051\u306F\u3044",
        "\u3051\u3099\u3072\u3093",
        "\u3051\u3075\u3099\u304B\u3044",
        "\u3051\u3099\u307B\u3099\u304F",
        "\u3051\u307E\u308A",
        "\u3051\u307F\u304B\u308B",
        "\u3051\u3080\u3057",
        "\u3051\u3080\u308A",
        "\u3051\u3082\u306E",
        "\u3051\u3089\u3044",
        "\u3051\u308D\u3051\u308D",
        "\u3051\u308F\u3057\u3044",
        "\u3051\u3093\u3044",
        "\u3051\u3093\u3048\u3064",
        "\u3051\u3093\u304A",
        "\u3051\u3093\u304B",
        "\u3051\u3099\u3093\u304D",
        "\u3051\u3093\u3051\u3099\u3093",
        "\u3051\u3093\u3053\u3046",
        "\u3051\u3093\u3055\u304F",
        "\u3051\u3093\u3057\u3085\u3046",
        "\u3051\u3093\u3059\u3046",
        "\u3051\u3099\u3093\u305D\u3046",
        "\u3051\u3093\u3061\u304F",
        "\u3051\u3093\u3066\u3044",
        "\u3051\u3093\u3068\u3046",
        "\u3051\u3093\u306A\u3044",
        "\u3051\u3093\u306B\u3093",
        "\u3051\u3099\u3093\u3075\u3099\u3064",
        "\u3051\u3093\u307E",
        "\u3051\u3093\u307F\u3093",
        "\u3051\u3093\u3081\u3044",
        "\u3051\u3093\u3089\u3093",
        "\u3051\u3093\u308A",
        "\u3053\u3042\u304F\u307E",
        "\u3053\u3044\u306C",
        "\u3053\u3044\u3072\u3099\u3068",
        "\u3053\u3099\u3046\u3044",
        "\u3053\u3046\u3048\u3093",
        "\u3053\u3046\u304A\u3093",
        "\u3053\u3046\u304B\u3093",
        "\u3053\u3099\u3046\u304D\u3085\u3046",
        "\u3053\u3099\u3046\u3051\u3044",
        "\u3053\u3046\u3053\u3046",
        "\u3053\u3046\u3055\u3044",
        "\u3053\u3046\u3057\u3099",
        "\u3053\u3046\u3059\u3044",
        "\u3053\u3099\u3046\u305B\u3044",
        "\u3053\u3046\u305D\u304F",
        "\u3053\u3046\u305F\u3044",
        "\u3053\u3046\u3061\u3083",
        "\u3053\u3046\u3064\u3046",
        "\u3053\u3046\u3066\u3044",
        "\u3053\u3046\u3068\u3099\u3046",
        "\u3053\u3046\u306A\u3044",
        "\u3053\u3046\u306F\u3044",
        "\u3053\u3099\u3046\u307B\u3046",
        "\u3053\u3099\u3046\u307E\u3093",
        "\u3053\u3046\u3082\u304F",
        "\u3053\u3046\u308A\u3064",
        "\u3053\u3048\u308B",
        "\u3053\u304A\u308A",
        "\u3053\u3099\u304B\u3044",
        "\u3053\u3099\u304B\u3099\u3064",
        "\u3053\u3099\u304B\u3093",
        "\u3053\u304F\u3053\u3099",
        "\u3053\u304F\u3055\u3044",
        "\u3053\u304F\u3068\u3046",
        "\u3053\u304F\u306A\u3044",
        "\u3053\u304F\u306F\u304F",
        "\u3053\u304F\u3099\u307E",
        "\u3053\u3051\u3044",
        "\u3053\u3051\u308B",
        "\u3053\u3053\u306E\u304B",
        "\u3053\u3053\u308D",
        "\u3053\u3055\u3081",
        "\u3053\u3057\u3064",
        "\u3053\u3059\u3046",
        "\u3053\u305B\u3044",
        "\u3053\u305B\u304D",
        "\u3053\u305B\u3099\u3093",
        "\u3053\u305D\u305F\u3099\u3066",
        "\u3053\u305F\u3044",
        "\u3053\u305F\u3048\u308B",
        "\u3053\u305F\u3064",
        "\u3053\u3061\u3087\u3046",
        "\u3053\u3063\u304B",
        "\u3053\u3064\u3053\u3064",
        "\u3053\u3064\u306F\u3099\u3093",
        "\u3053\u3064\u3075\u3099",
        "\u3053\u3066\u3044",
        "\u3053\u3066\u3093",
        "\u3053\u3068\u304B\u3099\u3089",
        "\u3053\u3068\u3057",
        "\u3053\u3068\u306F\u3099",
        "\u3053\u3068\u308A",
        "\u3053\u306A\u3053\u3099\u306A",
        "\u3053\u306D\u3053\u306D",
        "\u3053\u306E\u307E\u307E",
        "\u3053\u306E\u307F",
        "\u3053\u306E\u3088",
        "\u3053\u3099\u306F\u3093",
        "\u3053\u3072\u3064\u3057\u3099",
        "\u3053\u3075\u3046",
        "\u3053\u3075\u3093",
        "\u3053\u307B\u3099\u308C\u308B",
        "\u3053\u3099\u307E\u3042\u3075\u3099\u3089",
        "\u3053\u307E\u304B\u3044",
        "\u3053\u3099\u307E\u3059\u308A",
        "\u3053\u307E\u3064\u306A",
        "\u3053\u307E\u308B",
        "\u3053\u3080\u304D\u3099\u3053",
        "\u3053\u3082\u3057\u3099",
        "\u3053\u3082\u3061",
        "\u3053\u3082\u306E",
        "\u3053\u3082\u3093",
        "\u3053\u3084\u304F",
        "\u3053\u3084\u307E",
        "\u3053\u3086\u3046",
        "\u3053\u3086\u3072\u3099",
        "\u3053\u3088\u3044",
        "\u3053\u3088\u3046",
        "\u3053\u308A\u308B",
        "\u3053\u308C\u304F\u3057\u3087\u3093",
        "\u3053\u308D\u3063\u3051",
        "\u3053\u308F\u3082\u3066",
        "\u3053\u308F\u308C\u308B",
        "\u3053\u3093\u3044\u3093",
        "\u3053\u3093\u304B\u3044",
        "\u3053\u3093\u304D",
        "\u3053\u3093\u3057\u3085\u3046",
        "\u3053\u3093\u3059\u3044",
        "\u3053\u3093\u305F\u3099\u3066",
        "\u3053\u3093\u3068\u3093",
        "\u3053\u3093\u306A\u3093",
        "\u3053\u3093\u3072\u3099\u306B",
        "\u3053\u3093\u307B\u309A\u3093",
        "\u3053\u3093\u307E\u3051",
        "\u3053\u3093\u3084",
        "\u3053\u3093\u308C\u3044",
        "\u3053\u3093\u308F\u304F",
        "\u3055\u3099\u3044\u3048\u304D",
        "\u3055\u3044\u304B\u3044",
        "\u3055\u3044\u304D\u3093",
        "\u3055\u3099\u3044\u3051\u3099\u3093",
        "\u3055\u3099\u3044\u3053",
        "\u3055\u3044\u3057\u3087",
        "\u3055\u3044\u305B\u3044",
        "\u3055\u3099\u3044\u305F\u304F",
        "\u3055\u3099\u3044\u3061\u3085\u3046",
        "\u3055\u3044\u3066\u304D",
        "\u3055\u3099\u3044\u308A\u3087\u3046",
        "\u3055\u3046\u306A",
        "\u3055\u304B\u3044\u3057",
        "\u3055\u304B\u3099\u3059",
        "\u3055\u304B\u306A",
        "\u3055\u304B\u307F\u3061",
        "\u3055\u304B\u3099\u308B",
        "\u3055\u304D\u3099\u3087\u3046",
        "\u3055\u304F\u3057",
        "\u3055\u304F\u3072\u3093",
        "\u3055\u304F\u3089",
        "\u3055\u3053\u304F",
        "\u3055\u3053\u3064",
        "\u3055\u3059\u3099\u304B\u308B",
        "\u3055\u3099\u305B\u304D",
        "\u3055\u305F\u3093",
        "\u3055\u3064\u3048\u3044",
        "\u3055\u3099\u3064\u304A\u3093",
        "\u3055\u3099\u3063\u304B",
        "\u3055\u3099\u3064\u304B\u3099\u304F",
        "\u3055\u3063\u304D\u3087\u304F",
        "\u3055\u3099\u3063\u3057",
        "\u3055\u3064\u3057\u3099\u3093",
        "\u3055\u3099\u3063\u305D\u3046",
        "\u3055\u3064\u305F\u306F\u3099",
        "\u3055\u3064\u307E\u3044\u3082",
        "\u3055\u3066\u3044",
        "\u3055\u3068\u3044\u3082",
        "\u3055\u3068\u3046",
        "\u3055\u3068\u304A\u3084",
        "\u3055\u3068\u3057",
        "\u3055\u3068\u308B",
        "\u3055\u306E\u3046",
        "\u3055\u306F\u3099\u304F",
        "\u3055\u3072\u3099\u3057\u3044",
        "\u3055\u3078\u3099\u3064",
        "\u3055\u307B\u3046",
        "\u3055\u307B\u3068\u3099",
        "\u3055\u307E\u3059",
        "\u3055\u307F\u3057\u3044",
        "\u3055\u307F\u305F\u3099\u308C",
        "\u3055\u3080\u3051",
        "\u3055\u3081\u308B",
        "\u3055\u3084\u3048\u3093\u3068\u3099\u3046",
        "\u3055\u3086\u3046",
        "\u3055\u3088\u3046",
        "\u3055\u3088\u304F",
        "\u3055\u3089\u305F\u3099",
        "\u3055\u3099\u308B\u305D\u306F\u3099",
        "\u3055\u308F\u3084\u304B",
        "\u3055\u308F\u308B",
        "\u3055\u3093\u3044\u3093",
        "\u3055\u3093\u304B",
        "\u3055\u3093\u304D\u3083\u304F",
        "\u3055\u3093\u3053\u3046",
        "\u3055\u3093\u3055\u3044",
        "\u3055\u3099\u3093\u3057\u3087",
        "\u3055\u3093\u3059\u3046",
        "\u3055\u3093\u305B\u3044",
        "\u3055\u3093\u305D",
        "\u3055\u3093\u3061",
        "\u3055\u3093\u307E",
        "\u3055\u3093\u307F",
        "\u3055\u3093\u3089\u3093",
        "\u3057\u3042\u3044",
        "\u3057\u3042\u3051\u3099",
        "\u3057\u3042\u3055\u3063\u3066",
        "\u3057\u3042\u308F\u305B",
        "\u3057\u3044\u304F",
        "\u3057\u3044\u3093",
        "\u3057\u3046\u3061",
        "\u3057\u3048\u3044",
        "\u3057\u304A\u3051",
        "\u3057\u304B\u3044",
        "\u3057\u304B\u304F",
        "\u3057\u3099\u304B\u3093",
        "\u3057\u3053\u3099\u3068",
        "\u3057\u3059\u3046",
        "\u3057\u3099\u305F\u3099\u3044",
        "\u3057\u305F\u3046\u3051",
        "\u3057\u305F\u304D\u3099",
        "\u3057\u305F\u3066",
        "\u3057\u305F\u307F",
        "\u3057\u3061\u3087\u3046",
        "\u3057\u3061\u308A\u3093",
        "\u3057\u3063\u304B\u308A",
        "\u3057\u3064\u3057\u3099",
        "\u3057\u3064\u3082\u3093",
        "\u3057\u3066\u3044",
        "\u3057\u3066\u304D",
        "\u3057\u3066\u3064",
        "\u3057\u3099\u3066\u3093",
        "\u3057\u3099\u3068\u3099\u3046",
        "\u3057\u306A\u304D\u3099\u308C",
        "\u3057\u306A\u3082\u306E",
        "\u3057\u306A\u3093",
        "\u3057\u306D\u307E",
        "\u3057\u306D\u3093",
        "\u3057\u306E\u304F\u3099",
        "\u3057\u306E\u3075\u3099",
        "\u3057\u306F\u3044",
        "\u3057\u306F\u3099\u304B\u308A",
        "\u3057\u306F\u3064",
        "\u3057\u306F\u3089\u3044",
        "\u3057\u306F\u3093",
        "\u3057\u3072\u3087\u3046",
        "\u3057\u3075\u304F",
        "\u3057\u3099\u3075\u3099\u3093",
        "\u3057\u3078\u3044",
        "\u3057\u307B\u3046",
        "\u3057\u307B\u3093",
        "\u3057\u307E\u3046",
        "\u3057\u307E\u308B",
        "\u3057\u307F\u3093",
        "\u3057\u3080\u3051\u308B",
        "\u3057\u3099\u3080\u3057\u3087",
        "\u3057\u3081\u3044",
        "\u3057\u3081\u308B",
        "\u3057\u3082\u3093",
        "\u3057\u3083\u3044\u3093",
        "\u3057\u3083\u3046\u3093",
        "\u3057\u3083\u304A\u3093",
        "\u3057\u3099\u3083\u304B\u3099\u3044\u3082",
        "\u3057\u3084\u304F\u3057\u3087",
        "\u3057\u3083\u304F\u307B\u3046",
        "\u3057\u3083\u3051\u3093",
        "\u3057\u3083\u3053",
        "\u3057\u3083\u3055\u3099\u3044",
        "\u3057\u3083\u3057\u3093",
        "\u3057\u3083\u305B\u3093",
        "\u3057\u3083\u305D\u3046",
        "\u3057\u3083\u305F\u3044",
        "\u3057\u3083\u3061\u3087\u3046",
        "\u3057\u3083\u3063\u304D\u3093",
        "\u3057\u3099\u3083\u307E",
        "\u3057\u3083\u308A\u3093",
        "\u3057\u3083\u308C\u3044",
        "\u3057\u3099\u3086\u3046",
        "\u3057\u3099\u3085\u3046\u3057\u3087",
        "\u3057\u3085\u304F\u306F\u304F",
        "\u3057\u3099\u3085\u3057\u3093",
        "\u3057\u3085\u3063\u305B\u304D",
        "\u3057\u3085\u307F",
        "\u3057\u3085\u3089\u306F\u3099",
        "\u3057\u3099\u3085\u3093\u306F\u3099\u3093",
        "\u3057\u3087\u3046\u304B\u3044",
        "\u3057\u3087\u304F\u305F\u304F",
        "\u3057\u3087\u3063\u3051\u3093",
        "\u3057\u3087\u3068\u3099\u3046",
        "\u3057\u3087\u3082\u3064",
        "\u3057\u3089\u305B\u308B",
        "\u3057\u3089\u3078\u3099\u308B",
        "\u3057\u3093\u304B",
        "\u3057\u3093\u3053\u3046",
        "\u3057\u3099\u3093\u3057\u3099\u3083",
        "\u3057\u3093\u305B\u3044\u3057\u3099",
        "\u3057\u3093\u3061\u304F",
        "\u3057\u3093\u308A\u3093",
        "\u3059\u3042\u3051\u3099",
        "\u3059\u3042\u3057",
        "\u3059\u3042\u306A",
        "\u3059\u3099\u3042\u3093",
        "\u3059\u3044\u3048\u3044",
        "\u3059\u3044\u304B",
        "\u3059\u3044\u3068\u3046",
        "\u3059\u3099\u3044\u3075\u3099\u3093",
        "\u3059\u3044\u3088\u3046\u3072\u3099",
        "\u3059\u3046\u304B\u3099\u304F",
        "\u3059\u3046\u3057\u3099\u3064",
        "\u3059\u3046\u305B\u3093",
        "\u3059\u304A\u3068\u3099\u308A",
        "\u3059\u304D\u307E",
        "\u3059\u304F\u3046",
        "\u3059\u304F\u306A\u3044",
        "\u3059\u3051\u308B",
        "\u3059\u3053\u3099\u3044",
        "\u3059\u3053\u3057",
        "\u3059\u3099\u3055\u3093",
        "\u3059\u3059\u3099\u3057\u3044",
        "\u3059\u3059\u3080",
        "\u3059\u3059\u3081\u308B",
        "\u3059\u3063\u304B\u308A",
        "\u3059\u3099\u3063\u3057\u308A",
        "\u3059\u3099\u3063\u3068",
        "\u3059\u3066\u304D",
        "\u3059\u3066\u308B",
        "\u3059\u306D\u308B",
        "\u3059\u306E\u3053",
        "\u3059\u306F\u305F\u3099",
        "\u3059\u306F\u3099\u3089\u3057\u3044",
        "\u3059\u3099\u3072\u3087\u3046",
        "\u3059\u3099\u3075\u3099\u306C\u308C",
        "\u3059\u3075\u3099\u308A",
        "\u3059\u3075\u308C",
        "\u3059\u3078\u3099\u3066",
        "\u3059\u3078\u3099\u308B",
        "\u3059\u3099\u307B\u3046",
        "\u3059\u307B\u3099\u3093",
        "\u3059\u307E\u3044",
        "\u3059\u3081\u3057",
        "\u3059\u3082\u3046",
        "\u3059\u3084\u304D",
        "\u3059\u3089\u3059\u3089",
        "\u3059\u308B\u3081",
        "\u3059\u308C\u3061\u304B\u3099\u3046",
        "\u3059\u308D\u3063\u3068",
        "\u3059\u308F\u308B",
        "\u3059\u3093\u305B\u3099\u3093",
        "\u3059\u3093\u307B\u309A\u3046",
        "\u305B\u3042\u3075\u3099\u3089",
        "\u305B\u3044\u304B\u3064",
        "\u305B\u3044\u3051\u3099\u3093",
        "\u305B\u3044\u3057\u3099",
        "\u305B\u3044\u3088\u3046",
        "\u305B\u304A\u3046",
        "\u305B\u304B\u3044\u304B\u3093",
        "\u305B\u304D\u306B\u3093",
        "\u305B\u304D\u3080",
        "\u305B\u304D\u3086",
        "\u305B\u304D\u3089\u3093\u3046\u3093",
        "\u305B\u3051\u3093",
        "\u305B\u3053\u3046",
        "\u305B\u3059\u3057\u3099",
        "\u305B\u305F\u3044",
        "\u305B\u305F\u3051",
        "\u305B\u3063\u304B\u304F",
        "\u305B\u3063\u304D\u3083\u304F",
        "\u305B\u3099\u3063\u304F",
        "\u305B\u3063\u3051\u3093",
        "\u305B\u3063\u3053\u3064",
        "\u305B\u3063\u3055\u305F\u304F\u307E",
        "\u305B\u3064\u305D\u3099\u304F",
        "\u305B\u3064\u305F\u3099\u3093",
        "\u305B\u3064\u3066\u3099\u3093",
        "\u305B\u3063\u306F\u309A\u3093",
        "\u305B\u3064\u3072\u3099",
        "\u305B\u3064\u3075\u3099\u3093",
        "\u305B\u3064\u3081\u3044",
        "\u305B\u3064\u308A\u3064",
        "\u305B\u306A\u304B",
        "\u305B\u306E\u3072\u3099",
        "\u305B\u306F\u306F\u3099",
        "\u305B\u3072\u3099\u308D",
        "\u305B\u307B\u3099\u306D",
        "\u305B\u307E\u3044",
        "\u305B\u307E\u308B",
        "\u305B\u3081\u308B",
        "\u305B\u3082\u305F\u308C",
        "\u305B\u308A\u3075",
        "\u305B\u3099\u3093\u3042\u304F",
        "\u305B\u3093\u3044",
        "\u305B\u3093\u3048\u3044",
        "\u305B\u3093\u304B",
        "\u305B\u3093\u304D\u3087",
        "\u305B\u3093\u304F",
        "\u305B\u3093\u3051\u3099\u3093",
        "\u305B\u3099\u3093\u3053\u3099",
        "\u305B\u3093\u3055\u3044",
        "\u305B\u3093\u3057\u3085",
        "\u305B\u3093\u3059\u3044",
        "\u305B\u3093\u305B\u3044",
        "\u305B\u3093\u305D\u3099",
        "\u305B\u3093\u305F\u304F",
        "\u305B\u3093\u3061\u3087\u3046",
        "\u305B\u3093\u3066\u3044",
        "\u305B\u3093\u3068\u3046",
        "\u305B\u3093\u306C\u304D",
        "\u305B\u3093\u306D\u3093",
        "\u305B\u3093\u306F\u309A\u3044",
        "\u305B\u3099\u3093\u3075\u3099",
        "\u305B\u3099\u3093\u307B\u309A\u3046",
        "\u305B\u3093\u3080",
        "\u305B\u3093\u3081\u3093\u3057\u3099\u3087",
        "\u305B\u3093\u3082\u3093",
        "\u305B\u3093\u3084\u304F",
        "\u305B\u3093\u3086\u3046",
        "\u305B\u3093\u3088\u3046",
        "\u305B\u3099\u3093\u3089",
        "\u305B\u3099\u3093\u308A\u3083\u304F",
        "\u305B\u3093\u308C\u3044",
        "\u305B\u3093\u308D",
        "\u305D\u3042\u304F",
        "\u305D\u3044\u3068\u3051\u3099\u308B",
        "\u305D\u3044\u306D",
        "\u305D\u3046\u304B\u3099\u3093\u304D\u3087\u3046",
        "\u305D\u3046\u304D",
        "\u305D\u3046\u3053\u3099",
        "\u305D\u3046\u3057\u3093",
        "\u305D\u3046\u305F\u3099\u3093",
        "\u305D\u3046\u306A\u3093",
        "\u305D\u3046\u3072\u3099",
        "\u305D\u3046\u3081\u3093",
        "\u305D\u3046\u308A",
        "\u305D\u3048\u3082\u306E",
        "\u305D\u3048\u3093",
        "\u305D\u304B\u3099\u3044",
        "\u305D\u3051\u3099\u304D",
        "\u305D\u3053\u3046",
        "\u305D\u3053\u305D\u3053",
        "\u305D\u3055\u3099\u3044",
        "\u305D\u3057\u306A",
        "\u305D\u305B\u3044",
        "\u305D\u305B\u3093",
        "\u305D\u305D\u304F\u3099",
        "\u305D\u305F\u3099\u3066\u308B",
        "\u305D\u3064\u3046",
        "\u305D\u3064\u3048\u3093",
        "\u305D\u3063\u304B\u3093",
        "\u305D\u3064\u304D\u3099\u3087\u3046",
        "\u305D\u3063\u3051\u3064",
        "\u305D\u3063\u3053\u3046",
        "\u305D\u3063\u305B\u3093",
        "\u305D\u3063\u3068",
        "\u305D\u3068\u304B\u3099\u308F",
        "\u305D\u3068\u3064\u3099\u3089",
        "\u305D\u306A\u3048\u308B",
        "\u305D\u306A\u305F",
        "\u305D\u3075\u307B\u3099",
        "\u305D\u307B\u3099\u304F",
        "\u305D\u307B\u3099\u308D",
        "\u305D\u307E\u3064",
        "\u305D\u307E\u308B",
        "\u305D\u3080\u304F",
        "\u305D\u3080\u308A\u3048",
        "\u305D\u3081\u308B",
        "\u305D\u3082\u305D\u3082",
        "\u305D\u3088\u304B\u305B\u3099",
        "\u305D\u3089\u307E\u3081",
        "\u305D\u308D\u3046",
        "\u305D\u3093\u304B\u3044",
        "\u305D\u3093\u3051\u3044",
        "\u305D\u3093\u3055\u3099\u3044",
        "\u305D\u3093\u3057\u3064",
        "\u305D\u3093\u305D\u3099\u304F",
        "\u305D\u3093\u3061\u3087\u3046",
        "\u305D\u3099\u3093\u3072\u3099",
        "\u305D\u3099\u3093\u3075\u3099\u3093",
        "\u305D\u3093\u307F\u3093",
        "\u305F\u3042\u3044",
        "\u305F\u3044\u3044\u3093",
        "\u305F\u3044\u3046\u3093",
        "\u305F\u3044\u3048\u304D",
        "\u305F\u3044\u304A\u3046",
        "\u305F\u3099\u3044\u304B\u3099\u304F",
        "\u305F\u3044\u304D",
        "\u305F\u3044\u304F\u3099\u3046",
        "\u305F\u3044\u3051\u3093",
        "\u305F\u3044\u3053",
        "\u305F\u3044\u3055\u3099\u3044",
        "\u305F\u3099\u3044\u3057\u3099\u3087\u3046\u3075\u3099",
        "\u305F\u3099\u3044\u3059\u304D",
        "\u305F\u3044\u305B\u3064",
        "\u305F\u3044\u305D\u3046",
        "\u305F\u3099\u3044\u305F\u3044",
        "\u305F\u3044\u3061\u3087\u3046",
        "\u305F\u3044\u3066\u3044",
        "\u305F\u3099\u3044\u3068\u3099\u3053\u308D",
        "\u305F\u3044\u306A\u3044",
        "\u305F\u3044\u306D\u3064",
        "\u305F\u3044\u306E\u3046",
        "\u305F\u3044\u306F\u3093",
        "\u305F\u3099\u3044\u3072\u3087\u3046",
        "\u305F\u3044\u3075\u3046",
        "\u305F\u3044\u3078\u3093",
        "\u305F\u3044\u307B",
        "\u305F\u3044\u307E\u3064\u306F\u3099\u306A",
        "\u305F\u3044\u307F\u3093\u304F\u3099",
        "\u305F\u3044\u3080",
        "\u305F\u3044\u3081\u3093",
        "\u305F\u3044\u3084\u304D",
        "\u305F\u3044\u3088\u3046",
        "\u305F\u3044\u3089",
        "\u305F\u3044\u308A\u3087\u304F",
        "\u305F\u3044\u308B",
        "\u305F\u3044\u308F\u3093",
        "\u305F\u3046\u3048",
        "\u305F\u3048\u308B",
        "\u305F\u304A\u3059",
        "\u305F\u304A\u308B",
        "\u305F\u304A\u308C\u308B",
        "\u305F\u304B\u3044",
        "\u305F\u304B\u306D",
        "\u305F\u304D\u3072\u3099",
        "\u305F\u304F\u3055\u3093",
        "\u305F\u3053\u304F",
        "\u305F\u3053\u3084\u304D",
        "\u305F\u3055\u3044",
        "\u305F\u3057\u3055\u3099\u3093",
        "\u305F\u3099\u3057\u3099\u3083\u308C",
        "\u305F\u3059\u3051\u308B",
        "\u305F\u3059\u3099\u3055\u308F\u308B",
        "\u305F\u305D\u304B\u3099\u308C",
        "\u305F\u305F\u304B\u3046",
        "\u305F\u305F\u304F",
        "\u305F\u305F\u3099\u3057\u3044",
        "\u305F\u305F\u307F",
        "\u305F\u3061\u306F\u3099\u306A",
        "\u305F\u3099\u3063\u304B\u3044",
        "\u305F\u3099\u3063\u304D\u3083\u304F",
        "\u305F\u3099\u3063\u3053",
        "\u305F\u3099\u3063\u3057\u3085\u3064",
        "\u305F\u3099\u3063\u305F\u3044",
        "\u305F\u3066\u308B",
        "\u305F\u3068\u3048\u308B",
        "\u305F\u306A\u306F\u3099\u305F",
        "\u305F\u306B\u3093",
        "\u305F\u306C\u304D",
        "\u305F\u306E\u3057\u307F",
        "\u305F\u306F\u3064",
        "\u305F\u3075\u3099\u3093",
        "\u305F\u3078\u3099\u308B",
        "\u305F\u307B\u3099\u3046",
        "\u305F\u307E\u3053\u3099",
        "\u305F\u307E\u308B",
        "\u305F\u3099\u3080\u308B",
        "\u305F\u3081\u3044\u304D",
        "\u305F\u3081\u3059",
        "\u305F\u3081\u308B",
        "\u305F\u3082\u3064",
        "\u305F\u3084\u3059\u3044",
        "\u305F\u3088\u308B",
        "\u305F\u3089\u3059",
        "\u305F\u308A\u304D\u307B\u3093\u304B\u3099\u3093",
        "\u305F\u308A\u3087\u3046",
        "\u305F\u308A\u308B",
        "\u305F\u308B\u3068",
        "\u305F\u308C\u308B",
        "\u305F\u308C\u3093\u3068",
        "\u305F\u308D\u3063\u3068",
        "\u305F\u308F\u3080\u308C\u308B",
        "\u305F\u3099\u3093\u3042\u3064",
        "\u305F\u3093\u3044",
        "\u305F\u3093\u304A\u3093",
        "\u305F\u3093\u304B",
        "\u305F\u3093\u304D",
        "\u305F\u3093\u3051\u3093",
        "\u305F\u3093\u3053\u3099",
        "\u305F\u3093\u3055\u3093",
        "\u305F\u3093\u3057\u3099\u3087\u3046\u3072\u3099",
        "\u305F\u3099\u3093\u305B\u3044",
        "\u305F\u3093\u305D\u304F",
        "\u305F\u3093\u305F\u3044",
        "\u305F\u3099\u3093\u3061",
        "\u305F\u3093\u3066\u3044",
        "\u305F\u3093\u3068\u3046",
        "\u305F\u3099\u3093\u306A",
        "\u305F\u3093\u306B\u3093",
        "\u305F\u3099\u3093\u306D\u3064",
        "\u305F\u3093\u306E\u3046",
        "\u305F\u3093\u3072\u309A\u3093",
        "\u305F\u3099\u3093\u307B\u3099\u3046",
        "\u305F\u3093\u307E\u3064",
        "\u305F\u3093\u3081\u3044",
        "\u305F\u3099\u3093\u308C\u3064",
        "\u305F\u3099\u3093\u308D",
        "\u305F\u3099\u3093\u308F",
        "\u3061\u3042\u3044",
        "\u3061\u3042\u3093",
        "\u3061\u3044\u304D",
        "\u3061\u3044\u3055\u3044",
        "\u3061\u3048\u3093",
        "\u3061\u304B\u3044",
        "\u3061\u304B\u3089",
        "\u3061\u304D\u3085\u3046",
        "\u3061\u304D\u3093",
        "\u3061\u3051\u3044\u3059\u3099",
        "\u3061\u3051\u3093",
        "\u3061\u3053\u304F",
        "\u3061\u3055\u3044",
        "\u3061\u3057\u304D",
        "\u3061\u3057\u308A\u3087\u3046",
        "\u3061\u305B\u3044",
        "\u3061\u305D\u3046",
        "\u3061\u305F\u3044",
        "\u3061\u305F\u3093",
        "\u3061\u3061\u304A\u3084",
        "\u3061\u3064\u3057\u3099\u3087",
        "\u3061\u3066\u304D",
        "\u3061\u3066\u3093",
        "\u3061\u306C\u304D",
        "\u3061\u306C\u308A",
        "\u3061\u306E\u3046",
        "\u3061\u3072\u3087\u3046",
        "\u3061\u3078\u3044\u305B\u3093",
        "\u3061\u307B\u3046",
        "\u3061\u307E\u305F",
        "\u3061\u307F\u3064",
        "\u3061\u307F\u3068\u3099\u308D",
        "\u3061\u3081\u3044\u3068\u3099",
        "\u3061\u3083\u3093\u3053\u306A\u3078\u3099",
        "\u3061\u3085\u3046\u3044",
        "\u3061\u3086\u308A\u3087\u304F",
        "\u3061\u3087\u3046\u3057",
        "\u3061\u3087\u3055\u304F\u3051\u3093",
        "\u3061\u3089\u3057",
        "\u3061\u3089\u307F",
        "\u3061\u308A\u304B\u3099\u307F",
        "\u3061\u308A\u3087\u3046",
        "\u3061\u308B\u3068\u3099",
        "\u3061\u308F\u308F",
        "\u3061\u3093\u305F\u3044",
        "\u3061\u3093\u3082\u304F",
        "\u3064\u3044\u304B",
        "\u3064\u3044\u305F\u3061",
        "\u3064\u3046\u304B",
        "\u3064\u3046\u3057\u3099\u3087\u3046",
        "\u3064\u3046\u306F\u3093",
        "\u3064\u3046\u308F",
        "\u3064\u304B\u3046",
        "\u3064\u304B\u308C\u308B",
        "\u3064\u304F\u306D",
        "\u3064\u304F\u308B",
        "\u3064\u3051\u306D",
        "\u3064\u3051\u308B",
        "\u3064\u3053\u3099\u3046",
        "\u3064\u305F\u3048\u308B",
        "\u3064\u3064\u3099\u304F",
        "\u3064\u3064\u3057\u3099",
        "\u3064\u3064\u3080",
        "\u3064\u3068\u3081\u308B",
        "\u3064\u306A\u304B\u3099\u308B",
        "\u3064\u306A\u307F",
        "\u3064\u306D\u3064\u3099\u306D",
        "\u3064\u306E\u308B",
        "\u3064\u3075\u3099\u3059",
        "\u3064\u307E\u3089\u306A\u3044",
        "\u3064\u307E\u308B",
        "\u3064\u307F\u304D",
        "\u3064\u3081\u305F\u3044",
        "\u3064\u3082\u308A",
        "\u3064\u3082\u308B",
        "\u3064\u3088\u3044",
        "\u3064\u308B\u307B\u3099",
        "\u3064\u308B\u307F\u304F",
        "\u3064\u308F\u3082\u306E",
        "\u3064\u308F\u308A",
        "\u3066\u3042\u3057",
        "\u3066\u3042\u3066",
        "\u3066\u3042\u307F",
        "\u3066\u3044\u304A\u3093",
        "\u3066\u3044\u304B",
        "\u3066\u3044\u304D",
        "\u3066\u3044\u3051\u3044",
        "\u3066\u3044\u3053\u304F",
        "\u3066\u3044\u3055\u3064",
        "\u3066\u3044\u3057",
        "\u3066\u3044\u305B\u3044",
        "\u3066\u3044\u305F\u3044",
        "\u3066\u3044\u3068\u3099",
        "\u3066\u3044\u306D\u3044",
        "\u3066\u3044\u3072\u3087\u3046",
        "\u3066\u3044\u3078\u3093",
        "\u3066\u3044\u307B\u3099\u3046",
        "\u3066\u3046\u3061",
        "\u3066\u304A\u304F\u308C",
        "\u3066\u304D\u3068\u3046",
        "\u3066\u304F\u3072\u3099",
        "\u3066\u3099\u3053\u307B\u3099\u3053",
        "\u3066\u3055\u304D\u3099\u3087\u3046",
        "\u3066\u3055\u3051\u3099",
        "\u3066\u3059\u308A",
        "\u3066\u305D\u3046",
        "\u3066\u3061\u304B\u3099\u3044",
        "\u3066\u3061\u3087\u3046",
        "\u3066\u3064\u304B\u3099\u304F",
        "\u3066\u3064\u3064\u3099\u304D",
        "\u3066\u3099\u3063\u306F\u309A",
        "\u3066\u3064\u307B\u3099\u3046",
        "\u3066\u3064\u3084",
        "\u3066\u3099\u306C\u304B\u3048",
        "\u3066\u306C\u304D",
        "\u3066\u306C\u304F\u3099\u3044",
        "\u3066\u306E\u3072\u3089",
        "\u3066\u306F\u3044",
        "\u3066\u3075\u3099\u304F\u308D",
        "\u3066\u3075\u305F\u3099",
        "\u3066\u307B\u3068\u3099\u304D",
        "\u3066\u307B\u3093",
        "\u3066\u307E\u3048",
        "\u3066\u307E\u304D\u3059\u3099\u3057",
        "\u3066\u307F\u3057\u3099\u304B",
        "\u3066\u307F\u3084\u3051\u3099",
        "\u3066\u3089\u3059",
        "\u3066\u308C\u3072\u3099",
        "\u3066\u308F\u3051",
        "\u3066\u308F\u305F\u3057",
        "\u3066\u3099\u3093\u3042\u3064",
        "\u3066\u3093\u3044\u3093",
        "\u3066\u3093\u304B\u3044",
        "\u3066\u3093\u304D",
        "\u3066\u3093\u304F\u3099",
        "\u3066\u3093\u3051\u3093",
        "\u3066\u3093\u3053\u3099\u304F",
        "\u3066\u3093\u3055\u3044",
        "\u3066\u3093\u3057",
        "\u3066\u3093\u3059\u3046",
        "\u3066\u3099\u3093\u3061",
        "\u3066\u3093\u3066\u304D",
        "\u3066\u3093\u3068\u3046",
        "\u3066\u3093\u306A\u3044",
        "\u3066\u3093\u3075\u309A\u3089",
        "\u3066\u3093\u307B\u3099\u3046\u305F\u3099\u3044",
        "\u3066\u3093\u3081\u3064",
        "\u3066\u3093\u3089\u3093\u304B\u3044",
        "\u3066\u3099\u3093\u308A\u3087\u304F",
        "\u3066\u3099\u3093\u308F",
        "\u3068\u3099\u3042\u3044",
        "\u3068\u3044\u308C",
        "\u3068\u3099\u3046\u304B\u3093",
        "\u3068\u3046\u304D\u3085\u3046",
        "\u3068\u3099\u3046\u304F\u3099",
        "\u3068\u3046\u3057",
        "\u3068\u3046\u3080\u304D\u3099",
        "\u3068\u304A\u3044",
        "\u3068\u304A\u304B",
        "\u3068\u304A\u304F",
        "\u3068\u304A\u3059",
        "\u3068\u304A\u308B",
        "\u3068\u304B\u3044",
        "\u3068\u304B\u3059",
        "\u3068\u304D\u304A\u308A",
        "\u3068\u304D\u3068\u3099\u304D",
        "\u3068\u304F\u3044",
        "\u3068\u304F\u3057\u3085\u3046",
        "\u3068\u304F\u3066\u3093",
        "\u3068\u304F\u306B",
        "\u3068\u304F\u3078\u3099\u3064",
        "\u3068\u3051\u3044",
        "\u3068\u3051\u308B",
        "\u3068\u3053\u3084",
        "\u3068\u3055\u304B",
        "\u3068\u3057\u3087\u304B\u3093",
        "\u3068\u305D\u3046",
        "\u3068\u305F\u3093",
        "\u3068\u3061\u3085\u3046",
        "\u3068\u3063\u304D\u3085\u3046",
        "\u3068\u3063\u304F\u3093",
        "\u3068\u3064\u305B\u3099\u3093",
        "\u3068\u3064\u306B\u3085\u3046",
        "\u3068\u3068\u3099\u3051\u308B",
        "\u3068\u3068\u306E\u3048\u308B",
        "\u3068\u306A\u3044",
        "\u3068\u306A\u3048\u308B",
        "\u3068\u306A\u308A",
        "\u3068\u306E\u3055\u307E",
        "\u3068\u306F\u3099\u3059",
        "\u3068\u3099\u3075\u3099\u304B\u3099\u308F",
        "\u3068\u307B\u3046",
        "\u3068\u307E\u308B",
        "\u3068\u3081\u308B",
        "\u3068\u3082\u305F\u3099\u3061",
        "\u3068\u3082\u308B",
        "\u3068\u3099\u3088\u3046\u3072\u3099",
        "\u3068\u3089\u3048\u308B",
        "\u3068\u3093\u304B\u3064",
        "\u3068\u3099\u3093\u3075\u3099\u308A",
        "\u306A\u3044\u304B\u304F",
        "\u306A\u3044\u3053\u3046",
        "\u306A\u3044\u3057\u3087",
        "\u306A\u3044\u3059",
        "\u306A\u3044\u305B\u3093",
        "\u306A\u3044\u305D\u3046",
        "\u306A\u304A\u3059",
        "\u306A\u304B\u3099\u3044",
        "\u306A\u304F\u3059",
        "\u306A\u3051\u3099\u308B",
        "\u306A\u3053\u3046\u3068\u3099",
        "\u306A\u3055\u3051",
        "\u306A\u305F\u3066\u3099\u3053\u3053",
        "\u306A\u3063\u3068\u3046",
        "\u306A\u3064\u3084\u3059\u307F",
        "\u306A\u306A\u304A\u3057",
        "\u306A\u306B\u3053\u3099\u3068",
        "\u306A\u306B\u3082\u306E",
        "\u306A\u306B\u308F",
        "\u306A\u306E\u304B",
        "\u306A\u3075\u305F\u3099",
        "\u306A\u307E\u3044\u304D",
        "\u306A\u307E\u3048",
        "\u306A\u307E\u307F",
        "\u306A\u307F\u305F\u3099",
        "\u306A\u3081\u3089\u304B",
        "\u306A\u3081\u308B",
        "\u306A\u3084\u3080",
        "\u306A\u3089\u3046",
        "\u306A\u3089\u3072\u3099",
        "\u306A\u3089\u3075\u3099",
        "\u306A\u308C\u308B",
        "\u306A\u308F\u3068\u3072\u3099",
        "\u306A\u308F\u306F\u3099\u308A",
        "\u306B\u3042\u3046",
        "\u306B\u3044\u304B\u3099\u305F",
        "\u306B\u3046\u3051",
        "\u306B\u304A\u3044",
        "\u306B\u304B\u3044",
        "\u306B\u304B\u3099\u3066",
        "\u306B\u304D\u3072\u3099",
        "\u306B\u304F\u3057\u307F",
        "\u306B\u304F\u307E\u3093",
        "\u306B\u3051\u3099\u308B",
        "\u306B\u3055\u3093\u304B\u305F\u3093\u305D",
        "\u306B\u3057\u304D",
        "\u306B\u305B\u3082\u306E",
        "\u306B\u3061\u3057\u3099\u3087\u3046",
        "\u306B\u3061\u3088\u3046\u3072\u3099",
        "\u306B\u3063\u304B",
        "\u306B\u3063\u304D",
        "\u306B\u3063\u3051\u3044",
        "\u306B\u3063\u3053\u3046",
        "\u306B\u3063\u3055\u3093",
        "\u306B\u3063\u3057\u3087\u304F",
        "\u306B\u3063\u3059\u3046",
        "\u306B\u3063\u305B\u304D",
        "\u306B\u3063\u3066\u3044",
        "\u306B\u306A\u3046",
        "\u306B\u307B\u3093",
        "\u306B\u307E\u3081",
        "\u306B\u3082\u3064",
        "\u306B\u3084\u308A",
        "\u306B\u3085\u3046\u3044\u3093",
        "\u306B\u308A\u3093\u3057\u3083",
        "\u306B\u308F\u3068\u308A",
        "\u306B\u3093\u3044",
        "\u306B\u3093\u304B",
        "\u306B\u3093\u304D",
        "\u306B\u3093\u3051\u3099\u3093",
        "\u306B\u3093\u3057\u304D",
        "\u306B\u3093\u3059\u3099\u3046",
        "\u306B\u3093\u305D\u3046",
        "\u306B\u3093\u305F\u3044",
        "\u306B\u3093\u3061",
        "\u306B\u3093\u3066\u3044",
        "\u306B\u3093\u306B\u304F",
        "\u306B\u3093\u3075\u309A",
        "\u306B\u3093\u307E\u308A",
        "\u306B\u3093\u3080",
        "\u306B\u3093\u3081\u3044",
        "\u306B\u3093\u3088\u3046",
        "\u306C\u3044\u304F\u304D\u3099",
        "\u306C\u304B\u3059",
        "\u306C\u304F\u3099\u3044\u3068\u308B",
        "\u306C\u304F\u3099\u3046",
        "\u306C\u304F\u3082\u308A",
        "\u306C\u3059\u3080",
        "\u306C\u307E\u3048\u3072\u3099",
        "\u306C\u3081\u308A",
        "\u306C\u3089\u3059",
        "\u306C\u3093\u3061\u3083\u304F",
        "\u306D\u3042\u3051\u3099",
        "\u306D\u3044\u304D",
        "\u306D\u3044\u308B",
        "\u306D\u3044\u308D",
        "\u306D\u304F\u3099\u305B",
        "\u306D\u304F\u305F\u3044",
        "\u306D\u304F\u3089",
        "\u306D\u3053\u305B\u3099",
        "\u306D\u3053\u3080",
        "\u306D\u3055\u3051\u3099",
        "\u306D\u3059\u3053\u3099\u3059",
        "\u306D\u305D\u3078\u3099\u308B",
        "\u306D\u305F\u3099\u3093",
        "\u306D\u3064\u3044",
        "\u306D\u3063\u3057\u3093",
        "\u306D\u3064\u305D\u3099\u3046",
        "\u306D\u3063\u305F\u3044\u304D\u3099\u3087",
        "\u306D\u3075\u3099\u305D\u304F",
        "\u306D\u3075\u305F\u3099",
        "\u306D\u307B\u3099\u3046",
        "\u306D\u307B\u308A\u306F\u307B\u308A",
        "\u306D\u307E\u304D",
        "\u306D\u307E\u308F\u3057",
        "\u306D\u307F\u307F",
        "\u306D\u3080\u3044",
        "\u306D\u3080\u305F\u3044",
        "\u306D\u3082\u3068",
        "\u306D\u3089\u3046",
        "\u306D\u308F\u3055\u3099",
        "\u306D\u3093\u3044\u308A",
        "\u306D\u3093\u304A\u3057",
        "\u306D\u3093\u304B\u3093",
        "\u306D\u3093\u304D\u3093",
        "\u306D\u3093\u304F\u3099",
        "\u306D\u3093\u3055\u3099",
        "\u306D\u3093\u3057",
        "\u306D\u3093\u3061\u3083\u304F",
        "\u306D\u3093\u3068\u3099",
        "\u306D\u3093\u3072\u309A",
        "\u306D\u3093\u3075\u3099\u3064",
        "\u306D\u3093\u307E\u3064",
        "\u306D\u3093\u308A\u3087\u3046",
        "\u306D\u3093\u308C\u3044",
        "\u306E\u3044\u3059\u3099",
        "\u306E\u304A\u3064\u3099\u307E",
        "\u306E\u304B\u3099\u3059",
        "\u306E\u304D\u306A\u307F",
        "\u306E\u3053\u304D\u3099\u308A",
        "\u306E\u3053\u3059",
        "\u306E\u3053\u308B",
        "\u306E\u305B\u308B",
        "\u306E\u305D\u3099\u304F",
        "\u306E\u305D\u3099\u3080",
        "\u306E\u305F\u307E\u3046",
        "\u306E\u3061\u307B\u3068\u3099",
        "\u306E\u3063\u304F",
        "\u306E\u306F\u3099\u3059",
        "\u306E\u306F\u3089",
        "\u306E\u3078\u3099\u308B",
        "\u306E\u307B\u3099\u308B",
        "\u306E\u307F\u3082\u306E",
        "\u306E\u3084\u307E",
        "\u306E\u3089\u3044\u306C",
        "\u306E\u3089\u306D\u3053",
        "\u306E\u308A\u3082\u306E",
        "\u306E\u308A\u3086\u304D",
        "\u306E\u308C\u3093",
        "\u306E\u3093\u304D",
        "\u306F\u3099\u3042\u3044",
        "\u306F\u3042\u304F",
        "\u306F\u3099\u3042\u3055\u3093",
        "\u306F\u3099\u3044\u304B",
        "\u306F\u3099\u3044\u304F",
        "\u306F\u3044\u3051\u3093",
        "\u306F\u3044\u3053\u3099",
        "\u306F\u3044\u3057\u3093",
        "\u306F\u3044\u3059\u3044",
        "\u306F\u3044\u305B\u3093",
        "\u306F\u3044\u305D\u3046",
        "\u306F\u3044\u3061",
        "\u306F\u3099\u3044\u306F\u3099\u3044",
        "\u306F\u3044\u308C\u3064",
        "\u306F\u3048\u308B",
        "\u306F\u304A\u308B",
        "\u306F\u304B\u3044",
        "\u306F\u3099\u304B\u308A",
        "\u306F\u304B\u308B",
        "\u306F\u304F\u3057\u3085",
        "\u306F\u3051\u3093",
        "\u306F\u3053\u3075\u3099",
        "\u306F\u3055\u307F",
        "\u306F\u3055\u3093",
        "\u306F\u3057\u3053\u3099",
        "\u306F\u3099\u3057\u3087",
        "\u306F\u3057\u308B",
        "\u306F\u305B\u308B",
        "\u306F\u309A\u305D\u3053\u3093",
        "\u306F\u305D\u3093",
        "\u306F\u305F\u3093",
        "\u306F\u3061\u307F\u3064",
        "\u306F\u3064\u304A\u3093",
        "\u306F\u3063\u304B\u304F",
        "\u306F\u3064\u3099\u304D",
        "\u306F\u3063\u304D\u308A",
        "\u306F\u3063\u304F\u3064",
        "\u306F\u3063\u3051\u3093",
        "\u306F\u3063\u3053\u3046",
        "\u306F\u3063\u3055\u3093",
        "\u306F\u3063\u3057\u3093",
        "\u306F\u3063\u305F\u3064",
        "\u306F\u3063\u3061\u3085\u3046",
        "\u306F\u3063\u3066\u3093",
        "\u306F\u3063\u3072\u309A\u3087\u3046",
        "\u306F\u3063\u307B\u309A\u3046",
        "\u306F\u306A\u3059",
        "\u306F\u306A\u3072\u3099",
        "\u306F\u306B\u304B\u3080",
        "\u306F\u3075\u3099\u3089\u3057",
        "\u306F\u307F\u304B\u3099\u304D",
        "\u306F\u3080\u304B\u3046",
        "\u306F\u3081\u3064",
        "\u306F\u3084\u3044",
        "\u306F\u3084\u3057",
        "\u306F\u3089\u3046",
        "\u306F\u308D\u3046\u3043\u3093",
        "\u306F\u308F\u3044",
        "\u306F\u3093\u3044",
        "\u306F\u3093\u3048\u3044",
        "\u306F\u3093\u304A\u3093",
        "\u306F\u3093\u304B\u304F",
        "\u306F\u3093\u304D\u3087\u3046",
        "\u306F\u3099\u3093\u304F\u3099\u307F",
        "\u306F\u3093\u3053",
        "\u306F\u3093\u3057\u3083",
        "\u306F\u3093\u3059\u3046",
        "\u306F\u3093\u305F\u3099\u3093",
        "\u306F\u309A\u3093\u3061",
        "\u306F\u309A\u3093\u3064",
        "\u306F\u3093\u3066\u3044",
        "\u306F\u3093\u3068\u3057",
        "\u306F\u3093\u306E\u3046",
        "\u306F\u3093\u306F\u309A",
        "\u306F\u3093\u3075\u3099\u3093",
        "\u306F\u3093\u3078\u309A\u3093",
        "\u306F\u3093\u307B\u3099\u3046\u304D",
        "\u306F\u3093\u3081\u3044",
        "\u306F\u3093\u3089\u3093",
        "\u306F\u3093\u308D\u3093",
        "\u3072\u3044\u304D",
        "\u3072\u3046\u3093",
        "\u3072\u3048\u308B",
        "\u3072\u304B\u304F",
        "\u3072\u304B\u308A",
        "\u3072\u304B\u308B",
        "\u3072\u304B\u3093",
        "\u3072\u304F\u3044",
        "\u3072\u3051\u3064",
        "\u3072\u3053\u3046\u304D",
        "\u3072\u3053\u304F",
        "\u3072\u3055\u3044",
        "\u3072\u3055\u3057\u3075\u3099\u308A",
        "\u3072\u3055\u3093",
        "\u3072\u3099\u3057\u3099\u3085\u3064\u304B\u3093",
        "\u3072\u3057\u3087",
        "\u3072\u305D\u304B",
        "\u3072\u305D\u3080",
        "\u3072\u305F\u3080\u304D",
        "\u3072\u305F\u3099\u308A",
        "\u3072\u305F\u308B",
        "\u3072\u3064\u304D\u3099",
        "\u3072\u3063\u3053\u3057",
        "\u3072\u3063\u3057",
        "\u3072\u3064\u3057\u3099\u3085\u3072\u3093",
        "\u3072\u3063\u3059",
        "\u3072\u3064\u305B\u3099\u3093",
        "\u3072\u309A\u3063\u305F\u308A",
        "\u3072\u309A\u3063\u3061\u308A",
        "\u3072\u3064\u3088\u3046",
        "\u3072\u3066\u3044",
        "\u3072\u3068\u3053\u3099\u307F",
        "\u3072\u306A\u307E\u3064\u308A",
        "\u3072\u306A\u3093",
        "\u3072\u306D\u308B",
        "\u3072\u306F\u3093",
        "\u3072\u3072\u3099\u304F",
        "\u3072\u3072\u3087\u3046",
        "\u3072\u307B\u3046",
        "\u3072\u307E\u308F\u308A",
        "\u3072\u307E\u3093",
        "\u3072\u307F\u3064",
        "\u3072\u3081\u3044",
        "\u3072\u3081\u3057\u3099\u3057",
        "\u3072\u3084\u3051",
        "\u3072\u3084\u3059",
        "\u3072\u3088\u3046",
        "\u3072\u3099\u3087\u3046\u304D",
        "\u3072\u3089\u304B\u3099\u306A",
        "\u3072\u3089\u304F",
        "\u3072\u308A\u3064",
        "\u3072\u308A\u3087\u3046",
        "\u3072\u308B\u307E",
        "\u3072\u308B\u3084\u3059\u307F",
        "\u3072\u308C\u3044",
        "\u3072\u308D\u3044",
        "\u3072\u308D\u3046",
        "\u3072\u308D\u304D",
        "\u3072\u308D\u3086\u304D",
        "\u3072\u3093\u304B\u304F",
        "\u3072\u3093\u3051\u3064",
        "\u3072\u3093\u3053\u3093",
        "\u3072\u3093\u3057\u3085",
        "\u3072\u3093\u305D\u3046",
        "\u3072\u309A\u3093\u3061",
        "\u3072\u3093\u306F\u309A\u3093",
        "\u3072\u3099\u3093\u307B\u3099\u3046",
        "\u3075\u3042\u3093",
        "\u3075\u3044\u3046\u3061",
        "\u3075\u3046\u3051\u3044",
        "\u3075\u3046\u305B\u3093",
        "\u3075\u309A\u3046\u305F\u308D\u3046",
        "\u3075\u3046\u3068\u3046",
        "\u3075\u3046\u3075",
        "\u3075\u3048\u308B",
        "\u3075\u304A\u3093",
        "\u3075\u304B\u3044",
        "\u3075\u304D\u3093",
        "\u3075\u304F\u3055\u3099\u3064",
        "\u3075\u304F\u3075\u3099\u304F\u308D",
        "\u3075\u3053\u3046",
        "\u3075\u3055\u3044",
        "\u3075\u3057\u304D\u3099",
        "\u3075\u3057\u3099\u307F",
        "\u3075\u3059\u307E",
        "\u3075\u305B\u3044",
        "\u3075\u305B\u304F\u3099",
        "\u3075\u305D\u304F",
        "\u3075\u3099\u305F\u306B\u304F",
        "\u3075\u305F\u3093",
        "\u3075\u3061\u3087\u3046",
        "\u3075\u3064\u3046",
        "\u3075\u3064\u304B",
        "\u3075\u3063\u304B\u3064",
        "\u3075\u3063\u304D",
        "\u3075\u3063\u3053\u304F",
        "\u3075\u3099\u3068\u3099\u3046",
        "\u3075\u3068\u308B",
        "\u3075\u3068\u3093",
        "\u3075\u306E\u3046",
        "\u3075\u306F\u3044",
        "\u3075\u3072\u3087\u3046",
        "\u3075\u3078\u3093",
        "\u3075\u307E\u3093",
        "\u3075\u307F\u3093",
        "\u3075\u3081\u3064",
        "\u3075\u3081\u3093",
        "\u3075\u3088\u3046",
        "\u3075\u308A\u3053",
        "\u3075\u308A\u308B",
        "\u3075\u308B\u3044",
        "\u3075\u3093\u3044\u304D",
        "\u3075\u3099\u3093\u304B\u3099\u304F",
        "\u3075\u3099\u3093\u304F\u3099",
        "\u3075\u3093\u3057\u3064",
        "\u3075\u3099\u3093\u305B\u304D",
        "\u3075\u3093\u305D\u3046",
        "\u3075\u3099\u3093\u307B\u309A\u3046",
        "\u3078\u3044\u3042\u3093",
        "\u3078\u3044\u304A\u3093",
        "\u3078\u3044\u304B\u3099\u3044",
        "\u3078\u3044\u304D",
        "\u3078\u3044\u3051\u3099\u3093",
        "\u3078\u3044\u3053\u3046",
        "\u3078\u3044\u3055",
        "\u3078\u3044\u3057\u3083",
        "\u3078\u3044\u305B\u3064",
        "\u3078\u3044\u305D",
        "\u3078\u3044\u305F\u304F",
        "\u3078\u3044\u3066\u3093",
        "\u3078\u3044\u306D\u3064",
        "\u3078\u3044\u308F",
        "\u3078\u304D\u304B\u3099",
        "\u3078\u3053\u3080",
        "\u3078\u3099\u306B\u3044\u308D",
        "\u3078\u3099\u306B\u3057\u3087\u3046\u304B\u3099",
        "\u3078\u3089\u3059",
        "\u3078\u3093\u304B\u3093",
        "\u3078\u3099\u3093\u304D\u3087\u3046",
        "\u3078\u3099\u3093\u3053\u3099\u3057",
        "\u3078\u3093\u3055\u3044",
        "\u3078\u3093\u305F\u3044",
        "\u3078\u3099\u3093\u308A",
        "\u307B\u3042\u3093",
        "\u307B\u3044\u304F",
        "\u307B\u3099\u3046\u304D\u3099\u3087",
        "\u307B\u3046\u3053\u304F",
        "\u307B\u3046\u305D\u3046",
        "\u307B\u3046\u307B\u3046",
        "\u307B\u3046\u3082\u3093",
        "\u307B\u3046\u308A\u3064",
        "\u307B\u3048\u308B",
        "\u307B\u304A\u3093",
        "\u307B\u304B\u3093",
        "\u307B\u304D\u3087\u3046",
        "\u307B\u3099\u304D\u3093",
        "\u307B\u304F\u308D",
        "\u307B\u3051\u3064",
        "\u307B\u3051\u3093",
        "\u307B\u3053\u3046",
        "\u307B\u3053\u308B",
        "\u307B\u3057\u3044",
        "\u307B\u3057\u3064",
        "\u307B\u3057\u3085",
        "\u307B\u3057\u3087\u3046",
        "\u307B\u305B\u3044",
        "\u307B\u305D\u3044",
        "\u307B\u305D\u304F",
        "\u307B\u305F\u3066",
        "\u307B\u305F\u308B",
        "\u307B\u309A\u3061\u3075\u3099\u304F\u308D",
        "\u307B\u3063\u304D\u3087\u304F",
        "\u307B\u3063\u3055",
        "\u307B\u3063\u305F\u3093",
        "\u307B\u3068\u3093\u3068\u3099",
        "\u307B\u3081\u308B",
        "\u307B\u3093\u3044",
        "\u307B\u3093\u304D",
        "\u307B\u3093\u3051",
        "\u307B\u3093\u3057\u3064",
        "\u307B\u3093\u3084\u304F",
        "\u307E\u3044\u306B\u3061",
        "\u307E\u304B\u3044",
        "\u307E\u304B\u305B\u308B",
        "\u307E\u304B\u3099\u308B",
        "\u307E\u3051\u308B",
        "\u307E\u3053\u3068",
        "\u307E\u3055\u3064",
        "\u307E\u3057\u3099\u3081",
        "\u307E\u3059\u304F",
        "\u307E\u305B\u3099\u308B",
        "\u307E\u3064\u308A",
        "\u307E\u3068\u3081",
        "\u307E\u306A\u3075\u3099",
        "\u307E\u306C\u3051",
        "\u307E\u306D\u304F",
        "\u307E\u307B\u3046",
        "\u307E\u3082\u308B",
        "\u307E\u3086\u3051\u3099",
        "\u307E\u3088\u3046",
        "\u307E\u308D\u3084\u304B",
        "\u307E\u308F\u3059",
        "\u307E\u308F\u308A",
        "\u307E\u308F\u308B",
        "\u307E\u3093\u304B\u3099",
        "\u307E\u3093\u304D\u3064",
        "\u307E\u3093\u305D\u3099\u304F",
        "\u307E\u3093\u306A\u304B",
        "\u307F\u3044\u3089",
        "\u307F\u3046\u3061",
        "\u307F\u3048\u308B",
        "\u307F\u304B\u3099\u304F",
        "\u307F\u304B\u305F",
        "\u307F\u304B\u3093",
        "\u307F\u3051\u3093",
        "\u307F\u3053\u3093",
        "\u307F\u3057\u3099\u304B\u3044",
        "\u307F\u3059\u3044",
        "\u307F\u3059\u3048\u308B",
        "\u307F\u305B\u308B",
        "\u307F\u3063\u304B",
        "\u307F\u3064\u304B\u308B",
        "\u307F\u3064\u3051\u308B",
        "\u307F\u3066\u3044",
        "\u307F\u3068\u3081\u308B",
        "\u307F\u306A\u3068",
        "\u307F\u306A\u307F\u304B\u3055\u3044",
        "\u307F\u306D\u3089\u308B",
        "\u307F\u306E\u3046",
        "\u307F\u306E\u304B\u3099\u3059",
        "\u307F\u307B\u3093",
        "\u307F\u3082\u3068",
        "\u307F\u3084\u3051\u3099",
        "\u307F\u3089\u3044",
        "\u307F\u308A\u3087\u304F",
        "\u307F\u308F\u304F",
        "\u307F\u3093\u304B",
        "\u307F\u3093\u305D\u3099\u304F",
        "\u3080\u3044\u304B",
        "\u3080\u3048\u304D",
        "\u3080\u3048\u3093",
        "\u3080\u304B\u3044",
        "\u3080\u304B\u3046",
        "\u3080\u304B\u3048",
        "\u3080\u304B\u3057",
        "\u3080\u304D\u3099\u3061\u3083",
        "\u3080\u3051\u308B",
        "\u3080\u3051\u3099\u3093",
        "\u3080\u3055\u307B\u3099\u308B",
        "\u3080\u3057\u3042\u3064\u3044",
        "\u3080\u3057\u306F\u3099",
        "\u3080\u3057\u3099\u3085\u3093",
        "\u3080\u3057\u308D",
        "\u3080\u3059\u3046",
        "\u3080\u3059\u3053",
        "\u3080\u3059\u3075\u3099",
        "\u3080\u3059\u3081",
        "\u3080\u305B\u308B",
        "\u3080\u305B\u3093",
        "\u3080\u3061\u3085\u3046",
        "\u3080\u306A\u3057\u3044",
        "\u3080\u306E\u3046",
        "\u3080\u3084\u307F",
        "\u3080\u3088\u3046",
        "\u3080\u3089\u3055\u304D",
        "\u3080\u308A\u3087\u3046",
        "\u3080\u308D\u3093",
        "\u3081\u3044\u3042\u3093",
        "\u3081\u3044\u3046\u3093",
        "\u3081\u3044\u3048\u3093",
        "\u3081\u3044\u304B\u304F",
        "\u3081\u3044\u304D\u3087\u304F",
        "\u3081\u3044\u3055\u3044",
        "\u3081\u3044\u3057",
        "\u3081\u3044\u305D\u3046",
        "\u3081\u3044\u3075\u3099\u3064",
        "\u3081\u3044\u308C\u3044",
        "\u3081\u3044\u308F\u304F",
        "\u3081\u304F\u3099\u307E\u308C\u308B",
        "\u3081\u3055\u3099\u3059",
        "\u3081\u3057\u305F",
        "\u3081\u3059\u3099\u3089\u3057\u3044",
        "\u3081\u305F\u3099\u3064",
        "\u3081\u307E\u3044",
        "\u3081\u3084\u3059",
        "\u3081\u3093\u304D\u3087",
        "\u3081\u3093\u305B\u304D",
        "\u3081\u3093\u3068\u3099\u3046",
        "\u3082\u3046\u3057\u3042\u3051\u3099\u308B",
        "\u3082\u3046\u3068\u3099\u3046\u3051\u3093",
        "\u3082\u3048\u308B",
        "\u3082\u304F\u3057",
        "\u3082\u304F\u3066\u304D",
        "\u3082\u304F\u3088\u3046\u3072\u3099",
        "\u3082\u3061\u308D\u3093",
        "\u3082\u3068\u3099\u308B",
        "\u3082\u3089\u3046",
        "\u3082\u3093\u304F",
        "\u3082\u3093\u305F\u3099\u3044",
        "\u3084\u304A\u3084",
        "\u3084\u3051\u308B",
        "\u3084\u3055\u3044",
        "\u3084\u3055\u3057\u3044",
        "\u3084\u3059\u3044",
        "\u3084\u3059\u305F\u308D\u3046",
        "\u3084\u3059\u307F",
        "\u3084\u305B\u308B",
        "\u3084\u305D\u3046",
        "\u3084\u305F\u3044",
        "\u3084\u3061\u3093",
        "\u3084\u3063\u3068",
        "\u3084\u3063\u306F\u309A\u308A",
        "\u3084\u3075\u3099\u308B",
        "\u3084\u3081\u308B",
        "\u3084\u3084\u3053\u3057\u3044",
        "\u3084\u3088\u3044",
        "\u3084\u308F\u3089\u304B\u3044",
        "\u3086\u3046\u304D",
        "\u3086\u3046\u3072\u3099\u3093\u304D\u3087\u304F",
        "\u3086\u3046\u3078\u3099",
        "\u3086\u3046\u3081\u3044",
        "\u3086\u3051\u3064",
        "\u3086\u3057\u3085\u3064",
        "\u3086\u305B\u3093",
        "\u3086\u305D\u3046",
        "\u3086\u305F\u304B",
        "\u3086\u3061\u3083\u304F",
        "\u3086\u3066\u3099\u308B",
        "\u3086\u306B\u3085\u3046",
        "\u3086\u3072\u3099\u308F",
        "\u3086\u3089\u3044",
        "\u3086\u308C\u308B",
        "\u3088\u3046\u3044",
        "\u3088\u3046\u304B",
        "\u3088\u3046\u304D\u3085\u3046",
        "\u3088\u3046\u3057\u3099",
        "\u3088\u3046\u3059",
        "\u3088\u3046\u3061\u3048\u3093",
        "\u3088\u304B\u305B\u3099",
        "\u3088\u304B\u3093",
        "\u3088\u304D\u3093",
        "\u3088\u304F\u305B\u3044",
        "\u3088\u304F\u307B\u3099\u3046",
        "\u3088\u3051\u3044",
        "\u3088\u3053\u3099\u308C\u308B",
        "\u3088\u3055\u3093",
        "\u3088\u3057\u3085\u3046",
        "\u3088\u305D\u3046",
        "\u3088\u305D\u304F",
        "\u3088\u3063\u304B",
        "\u3088\u3066\u3044",
        "\u3088\u3068\u3099\u304B\u3099\u308F\u304F",
        "\u3088\u306D\u3064",
        "\u3088\u3084\u304F",
        "\u3088\u3086\u3046",
        "\u3088\u308D\u3053\u3075\u3099",
        "\u3088\u308D\u3057\u3044",
        "\u3089\u3044\u3046",
        "\u3089\u304F\u304B\u3099\u304D",
        "\u3089\u304F\u3053\u3099",
        "\u3089\u304F\u3055\u3064",
        "\u3089\u304F\u305F\u3099",
        "\u3089\u3057\u3093\u306F\u3099\u3093",
        "\u3089\u305B\u3093",
        "\u3089\u305D\u3099\u304F",
        "\u3089\u305F\u3044",
        "\u3089\u3063\u304B",
        "\u3089\u308C\u3064",
        "\u308A\u3048\u304D",
        "\u308A\u304B\u3044",
        "\u308A\u304D\u3055\u304F",
        "\u308A\u304D\u305B\u3064",
        "\u308A\u304F\u304F\u3099\u3093",
        "\u308A\u304F\u3064",
        "\u308A\u3051\u3093",
        "\u308A\u3053\u3046",
        "\u308A\u305B\u3044",
        "\u308A\u305D\u3046",
        "\u308A\u305D\u304F",
        "\u308A\u3066\u3093",
        "\u308A\u306D\u3093",
        "\u308A\u3086\u3046",
        "\u308A\u3085\u3046\u304B\u3099\u304F",
        "\u308A\u3088\u3046",
        "\u308A\u3087\u3046\u308A",
        "\u308A\u3087\u304B\u3093",
        "\u308A\u3087\u304F\u3061\u3083",
        "\u308A\u3087\u3053\u3046",
        "\u308A\u308A\u304F",
        "\u308A\u308C\u304D",
        "\u308A\u308D\u3093",
        "\u308A\u3093\u3053\u3099",
        "\u308B\u3044\u3051\u3044",
        "\u308B\u3044\u3055\u3044",
        "\u308B\u3044\u3057\u3099",
        "\u308B\u3044\u305B\u304D",
        "\u308B\u3059\u306F\u3099\u3093",
        "\u308B\u308A\u304B\u3099\u308F\u3089",
        "\u308C\u3044\u304B\u3093",
        "\u308C\u3044\u304D\u3099",
        "\u308C\u3044\u305B\u3044",
        "\u308C\u3044\u305D\u3099\u3046\u3053",
        "\u308C\u3044\u3068\u3046",
        "\u308C\u3044\u307B\u3099\u3046",
        "\u308C\u304D\u3057",
        "\u308C\u304D\u305F\u3099\u3044",
        "\u308C\u3093\u3042\u3044",
        "\u308C\u3093\u3051\u3044",
        "\u308C\u3093\u3053\u3093",
        "\u308C\u3093\u3055\u3044",
        "\u308C\u3093\u3057\u3085\u3046",
        "\u308C\u3093\u305D\u3099\u304F",
        "\u308C\u3093\u3089\u304F",
        "\u308D\u3046\u304B",
        "\u308D\u3046\u3053\u3099",
        "\u308D\u3046\u3057\u3099\u3093",
        "\u308D\u3046\u305D\u304F",
        "\u308D\u304F\u304B\u3099",
        "\u308D\u3053\u3064",
        "\u308D\u3057\u3099\u3046\u3089",
        "\u308D\u3057\u3085\u3064",
        "\u308D\u305B\u3093",
        "\u308D\u3066\u3093",
        "\u308D\u3081\u3093",
        "\u308D\u308C\u3064",
        "\u308D\u3093\u304D\u3099",
        "\u308D\u3093\u306F\u309A",
        "\u308D\u3093\u3075\u3099\u3093",
        "\u308D\u3093\u308A",
        "\u308F\u304B\u3059",
        "\u308F\u304B\u3081",
        "\u308F\u304B\u3084\u307E",
        "\u308F\u304B\u308C\u308B",
        "\u308F\u3057\u3064",
        "\u308F\u3057\u3099\u307E\u3057",
        "\u308F\u3059\u308C\u3082\u306E",
        "\u308F\u3089\u3046",
        "\u308F\u308C\u308B"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/portuguese.json
  var require_portuguese = __commonJS({
    "node_modules/bip39/src/wordlists/portuguese.json"(exports, module) {
      module.exports = [
        "abacate",
        "abaixo",
        "abalar",
        "abater",
        "abduzir",
        "abelha",
        "aberto",
        "abismo",
        "abotoar",
        "abranger",
        "abreviar",
        "abrigar",
        "abrupto",
        "absinto",
        "absoluto",
        "absurdo",
        "abutre",
        "acabado",
        "acalmar",
        "acampar",
        "acanhar",
        "acaso",
        "aceitar",
        "acelerar",
        "acenar",
        "acervo",
        "acessar",
        "acetona",
        "achatar",
        "acidez",
        "acima",
        "acionado",
        "acirrar",
        "aclamar",
        "aclive",
        "acolhida",
        "acomodar",
        "acoplar",
        "acordar",
        "acumular",
        "acusador",
        "adaptar",
        "adega",
        "adentro",
        "adepto",
        "adequar",
        "aderente",
        "adesivo",
        "adeus",
        "adiante",
        "aditivo",
        "adjetivo",
        "adjunto",
        "admirar",
        "adorar",
        "adquirir",
        "adubo",
        "adverso",
        "advogado",
        "aeronave",
        "afastar",
        "aferir",
        "afetivo",
        "afinador",
        "afivelar",
        "aflito",
        "afluente",
        "afrontar",
        "agachar",
        "agarrar",
        "agasalho",
        "agenciar",
        "agilizar",
        "agiota",
        "agitado",
        "agora",
        "agradar",
        "agreste",
        "agrupar",
        "aguardar",
        "agulha",
        "ajoelhar",
        "ajudar",
        "ajustar",
        "alameda",
        "alarme",
        "alastrar",
        "alavanca",
        "albergue",
        "albino",
        "alcatra",
        "aldeia",
        "alecrim",
        "alegria",
        "alertar",
        "alface",
        "alfinete",
        "algum",
        "alheio",
        "aliar",
        "alicate",
        "alienar",
        "alinhar",
        "aliviar",
        "almofada",
        "alocar",
        "alpiste",
        "alterar",
        "altitude",
        "alucinar",
        "alugar",
        "aluno",
        "alusivo",
        "alvo",
        "amaciar",
        "amador",
        "amarelo",
        "amassar",
        "ambas",
        "ambiente",
        "ameixa",
        "amenizar",
        "amido",
        "amistoso",
        "amizade",
        "amolador",
        "amontoar",
        "amoroso",
        "amostra",
        "amparar",
        "ampliar",
        "ampola",
        "anagrama",
        "analisar",
        "anarquia",
        "anatomia",
        "andaime",
        "anel",
        "anexo",
        "angular",
        "animar",
        "anjo",
        "anomalia",
        "anotado",
        "ansioso",
        "anterior",
        "anuidade",
        "anunciar",
        "anzol",
        "apagador",
        "apalpar",
        "apanhado",
        "apego",
        "apelido",
        "apertada",
        "apesar",
        "apetite",
        "apito",
        "aplauso",
        "aplicada",
        "apoio",
        "apontar",
        "aposta",
        "aprendiz",
        "aprovar",
        "aquecer",
        "arame",
        "aranha",
        "arara",
        "arcada",
        "ardente",
        "areia",
        "arejar",
        "arenito",
        "aresta",
        "argiloso",
        "argola",
        "arma",
        "arquivo",
        "arraial",
        "arrebate",
        "arriscar",
        "arroba",
        "arrumar",
        "arsenal",
        "arterial",
        "artigo",
        "arvoredo",
        "asfaltar",
        "asilado",
        "aspirar",
        "assador",
        "assinar",
        "assoalho",
        "assunto",
        "astral",
        "atacado",
        "atadura",
        "atalho",
        "atarefar",
        "atear",
        "atender",
        "aterro",
        "ateu",
        "atingir",
        "atirador",
        "ativo",
        "atoleiro",
        "atracar",
        "atrevido",
        "atriz",
        "atual",
        "atum",
        "auditor",
        "aumentar",
        "aura",
        "aurora",
        "autismo",
        "autoria",
        "autuar",
        "avaliar",
        "avante",
        "avaria",
        "avental",
        "avesso",
        "aviador",
        "avisar",
        "avulso",
        "axila",
        "azarar",
        "azedo",
        "azeite",
        "azulejo",
        "babar",
        "babosa",
        "bacalhau",
        "bacharel",
        "bacia",
        "bagagem",
        "baiano",
        "bailar",
        "baioneta",
        "bairro",
        "baixista",
        "bajular",
        "baleia",
        "baliza",
        "balsa",
        "banal",
        "bandeira",
        "banho",
        "banir",
        "banquete",
        "barato",
        "barbado",
        "baronesa",
        "barraca",
        "barulho",
        "baseado",
        "bastante",
        "batata",
        "batedor",
        "batida",
        "batom",
        "batucar",
        "baunilha",
        "beber",
        "beijo",
        "beirada",
        "beisebol",
        "beldade",
        "beleza",
        "belga",
        "beliscar",
        "bendito",
        "bengala",
        "benzer",
        "berimbau",
        "berlinda",
        "berro",
        "besouro",
        "bexiga",
        "bezerro",
        "bico",
        "bicudo",
        "bienal",
        "bifocal",
        "bifurcar",
        "bigorna",
        "bilhete",
        "bimestre",
        "bimotor",
        "biologia",
        "biombo",
        "biosfera",
        "bipolar",
        "birrento",
        "biscoito",
        "bisneto",
        "bispo",
        "bissexto",
        "bitola",
        "bizarro",
        "blindado",
        "bloco",
        "bloquear",
        "boato",
        "bobagem",
        "bocado",
        "bocejo",
        "bochecha",
        "boicotar",
        "bolada",
        "boletim",
        "bolha",
        "bolo",
        "bombeiro",
        "bonde",
        "boneco",
        "bonita",
        "borbulha",
        "borda",
        "boreal",
        "borracha",
        "bovino",
        "boxeador",
        "branco",
        "brasa",
        "braveza",
        "breu",
        "briga",
        "brilho",
        "brincar",
        "broa",
        "brochura",
        "bronzear",
        "broto",
        "bruxo",
        "bucha",
        "budismo",
        "bufar",
        "bule",
        "buraco",
        "busca",
        "busto",
        "buzina",
        "cabana",
        "cabelo",
        "cabide",
        "cabo",
        "cabrito",
        "cacau",
        "cacetada",
        "cachorro",
        "cacique",
        "cadastro",
        "cadeado",
        "cafezal",
        "caiaque",
        "caipira",
        "caixote",
        "cajado",
        "caju",
        "calafrio",
        "calcular",
        "caldeira",
        "calibrar",
        "calmante",
        "calota",
        "camada",
        "cambista",
        "camisa",
        "camomila",
        "campanha",
        "camuflar",
        "canavial",
        "cancelar",
        "caneta",
        "canguru",
        "canhoto",
        "canivete",
        "canoa",
        "cansado",
        "cantar",
        "canudo",
        "capacho",
        "capela",
        "capinar",
        "capotar",
        "capricho",
        "captador",
        "capuz",
        "caracol",
        "carbono",
        "cardeal",
        "careca",
        "carimbar",
        "carneiro",
        "carpete",
        "carreira",
        "cartaz",
        "carvalho",
        "casaco",
        "casca",
        "casebre",
        "castelo",
        "casulo",
        "catarata",
        "cativar",
        "caule",
        "causador",
        "cautelar",
        "cavalo",
        "caverna",
        "cebola",
        "cedilha",
        "cegonha",
        "celebrar",
        "celular",
        "cenoura",
        "censo",
        "centeio",
        "cercar",
        "cerrado",
        "certeiro",
        "cerveja",
        "cetim",
        "cevada",
        "chacota",
        "chaleira",
        "chamado",
        "chapada",
        "charme",
        "chatice",
        "chave",
        "chefe",
        "chegada",
        "cheiro",
        "cheque",
        "chicote",
        "chifre",
        "chinelo",
        "chocalho",
        "chover",
        "chumbo",
        "chutar",
        "chuva",
        "cicatriz",
        "ciclone",
        "cidade",
        "cidreira",
        "ciente",
        "cigana",
        "cimento",
        "cinto",
        "cinza",
        "ciranda",
        "circuito",
        "cirurgia",
        "citar",
        "clareza",
        "clero",
        "clicar",
        "clone",
        "clube",
        "coado",
        "coagir",
        "cobaia",
        "cobertor",
        "cobrar",
        "cocada",
        "coelho",
        "coentro",
        "coeso",
        "cogumelo",
        "coibir",
        "coifa",
        "coiote",
        "colar",
        "coleira",
        "colher",
        "colidir",
        "colmeia",
        "colono",
        "coluna",
        "comando",
        "combinar",
        "comentar",
        "comitiva",
        "comover",
        "complexo",
        "comum",
        "concha",
        "condor",
        "conectar",
        "confuso",
        "congelar",
        "conhecer",
        "conjugar",
        "consumir",
        "contrato",
        "convite",
        "cooperar",
        "copeiro",
        "copiador",
        "copo",
        "coquetel",
        "coragem",
        "cordial",
        "corneta",
        "coronha",
        "corporal",
        "correio",
        "cortejo",
        "coruja",
        "corvo",
        "cosseno",
        "costela",
        "cotonete",
        "couro",
        "couve",
        "covil",
        "cozinha",
        "cratera",
        "cravo",
        "creche",
        "credor",
        "creme",
        "crer",
        "crespo",
        "criada",
        "criminal",
        "crioulo",
        "crise",
        "criticar",
        "crosta",
        "crua",
        "cruzeiro",
        "cubano",
        "cueca",
        "cuidado",
        "cujo",
        "culatra",
        "culminar",
        "culpar",
        "cultura",
        "cumprir",
        "cunhado",
        "cupido",
        "curativo",
        "curral",
        "cursar",
        "curto",
        "cuspir",
        "custear",
        "cutelo",
        "damasco",
        "datar",
        "debater",
        "debitar",
        "deboche",
        "debulhar",
        "decalque",
        "decimal",
        "declive",
        "decote",
        "decretar",
        "dedal",
        "dedicado",
        "deduzir",
        "defesa",
        "defumar",
        "degelo",
        "degrau",
        "degustar",
        "deitado",
        "deixar",
        "delator",
        "delegado",
        "delinear",
        "delonga",
        "demanda",
        "demitir",
        "demolido",
        "dentista",
        "depenado",
        "depilar",
        "depois",
        "depressa",
        "depurar",
        "deriva",
        "derramar",
        "desafio",
        "desbotar",
        "descanso",
        "desenho",
        "desfiado",
        "desgaste",
        "desigual",
        "deslize",
        "desmamar",
        "desova",
        "despesa",
        "destaque",
        "desviar",
        "detalhar",
        "detentor",
        "detonar",
        "detrito",
        "deusa",
        "dever",
        "devido",
        "devotado",
        "dezena",
        "diagrama",
        "dialeto",
        "didata",
        "difuso",
        "digitar",
        "dilatado",
        "diluente",
        "diminuir",
        "dinastia",
        "dinheiro",
        "diocese",
        "direto",
        "discreta",
        "disfarce",
        "disparo",
        "disquete",
        "dissipar",
        "distante",
        "ditador",
        "diurno",
        "diverso",
        "divisor",
        "divulgar",
        "dizer",
        "dobrador",
        "dolorido",
        "domador",
        "dominado",
        "donativo",
        "donzela",
        "dormente",
        "dorsal",
        "dosagem",
        "dourado",
        "doutor",
        "drenagem",
        "drible",
        "drogaria",
        "duelar",
        "duende",
        "dueto",
        "duplo",
        "duquesa",
        "durante",
        "duvidoso",
        "eclodir",
        "ecoar",
        "ecologia",
        "edificar",
        "edital",
        "educado",
        "efeito",
        "efetivar",
        "ejetar",
        "elaborar",
        "eleger",
        "eleitor",
        "elenco",
        "elevador",
        "eliminar",
        "elogiar",
        "embargo",
        "embolado",
        "embrulho",
        "embutido",
        "emenda",
        "emergir",
        "emissor",
        "empatia",
        "empenho",
        "empinado",
        "empolgar",
        "emprego",
        "empurrar",
        "emulador",
        "encaixe",
        "encenado",
        "enchente",
        "encontro",
        "endeusar",
        "endossar",
        "enfaixar",
        "enfeite",
        "enfim",
        "engajado",
        "engenho",
        "englobar",
        "engomado",
        "engraxar",
        "enguia",
        "enjoar",
        "enlatar",
        "enquanto",
        "enraizar",
        "enrolado",
        "enrugar",
        "ensaio",
        "enseada",
        "ensino",
        "ensopado",
        "entanto",
        "enteado",
        "entidade",
        "entortar",
        "entrada",
        "entulho",
        "envergar",
        "enviado",
        "envolver",
        "enxame",
        "enxerto",
        "enxofre",
        "enxuto",
        "epiderme",
        "equipar",
        "ereto",
        "erguido",
        "errata",
        "erva",
        "ervilha",
        "esbanjar",
        "esbelto",
        "escama",
        "escola",
        "escrita",
        "escuta",
        "esfinge",
        "esfolar",
        "esfregar",
        "esfumado",
        "esgrima",
        "esmalte",
        "espanto",
        "espelho",
        "espiga",
        "esponja",
        "espreita",
        "espumar",
        "esquerda",
        "estaca",
        "esteira",
        "esticar",
        "estofado",
        "estrela",
        "estudo",
        "esvaziar",
        "etanol",
        "etiqueta",
        "euforia",
        "europeu",
        "evacuar",
        "evaporar",
        "evasivo",
        "eventual",
        "evidente",
        "evoluir",
        "exagero",
        "exalar",
        "examinar",
        "exato",
        "exausto",
        "excesso",
        "excitar",
        "exclamar",
        "executar",
        "exemplo",
        "exibir",
        "exigente",
        "exonerar",
        "expandir",
        "expelir",
        "expirar",
        "explanar",
        "exposto",
        "expresso",
        "expulsar",
        "externo",
        "extinto",
        "extrato",
        "fabricar",
        "fabuloso",
        "faceta",
        "facial",
        "fada",
        "fadiga",
        "faixa",
        "falar",
        "falta",
        "familiar",
        "fandango",
        "fanfarra",
        "fantoche",
        "fardado",
        "farelo",
        "farinha",
        "farofa",
        "farpa",
        "fartura",
        "fatia",
        "fator",
        "favorita",
        "faxina",
        "fazenda",
        "fechado",
        "feijoada",
        "feirante",
        "felino",
        "feminino",
        "fenda",
        "feno",
        "fera",
        "feriado",
        "ferrugem",
        "ferver",
        "festejar",
        "fetal",
        "feudal",
        "fiapo",
        "fibrose",
        "ficar",
        "ficheiro",
        "figurado",
        "fileira",
        "filho",
        "filme",
        "filtrar",
        "firmeza",
        "fisgada",
        "fissura",
        "fita",
        "fivela",
        "fixador",
        "fixo",
        "flacidez",
        "flamingo",
        "flanela",
        "flechada",
        "flora",
        "flutuar",
        "fluxo",
        "focal",
        "focinho",
        "fofocar",
        "fogo",
        "foguete",
        "foice",
        "folgado",
        "folheto",
        "forjar",
        "formiga",
        "forno",
        "forte",
        "fosco",
        "fossa",
        "fragata",
        "fralda",
        "frango",
        "frasco",
        "fraterno",
        "freira",
        "frente",
        "fretar",
        "frieza",
        "friso",
        "fritura",
        "fronha",
        "frustrar",
        "fruteira",
        "fugir",
        "fulano",
        "fuligem",
        "fundar",
        "fungo",
        "funil",
        "furador",
        "furioso",
        "futebol",
        "gabarito",
        "gabinete",
        "gado",
        "gaiato",
        "gaiola",
        "gaivota",
        "galega",
        "galho",
        "galinha",
        "galocha",
        "ganhar",
        "garagem",
        "garfo",
        "gargalo",
        "garimpo",
        "garoupa",
        "garrafa",
        "gasoduto",
        "gasto",
        "gata",
        "gatilho",
        "gaveta",
        "gazela",
        "gelado",
        "geleia",
        "gelo",
        "gemada",
        "gemer",
        "gemido",
        "generoso",
        "gengiva",
        "genial",
        "genoma",
        "genro",
        "geologia",
        "gerador",
        "germinar",
        "gesso",
        "gestor",
        "ginasta",
        "gincana",
        "gingado",
        "girafa",
        "girino",
        "glacial",
        "glicose",
        "global",
        "glorioso",
        "goela",
        "goiaba",
        "golfe",
        "golpear",
        "gordura",
        "gorjeta",
        "gorro",
        "gostoso",
        "goteira",
        "governar",
        "gracejo",
        "gradual",
        "grafite",
        "gralha",
        "grampo",
        "granada",
        "gratuito",
        "graveto",
        "graxa",
        "grego",
        "grelhar",
        "greve",
        "grilo",
        "grisalho",
        "gritaria",
        "grosso",
        "grotesco",
        "grudado",
        "grunhido",
        "gruta",
        "guache",
        "guarani",
        "guaxinim",
        "guerrear",
        "guiar",
        "guincho",
        "guisado",
        "gula",
        "guloso",
        "guru",
        "habitar",
        "harmonia",
        "haste",
        "haver",
        "hectare",
        "herdar",
        "heresia",
        "hesitar",
        "hiato",
        "hibernar",
        "hidratar",
        "hiena",
        "hino",
        "hipismo",
        "hipnose",
        "hipoteca",
        "hoje",
        "holofote",
        "homem",
        "honesto",
        "honrado",
        "hormonal",
        "hospedar",
        "humorado",
        "iate",
        "ideia",
        "idoso",
        "ignorado",
        "igreja",
        "iguana",
        "ileso",
        "ilha",
        "iludido",
        "iluminar",
        "ilustrar",
        "imagem",
        "imediato",
        "imenso",
        "imersivo",
        "iminente",
        "imitador",
        "imortal",
        "impacto",
        "impedir",
        "implante",
        "impor",
        "imprensa",
        "impune",
        "imunizar",
        "inalador",
        "inapto",
        "inativo",
        "incenso",
        "inchar",
        "incidir",
        "incluir",
        "incolor",
        "indeciso",
        "indireto",
        "indutor",
        "ineficaz",
        "inerente",
        "infantil",
        "infestar",
        "infinito",
        "inflamar",
        "informal",
        "infrator",
        "ingerir",
        "inibido",
        "inicial",
        "inimigo",
        "injetar",
        "inocente",
        "inodoro",
        "inovador",
        "inox",
        "inquieto",
        "inscrito",
        "inseto",
        "insistir",
        "inspetor",
        "instalar",
        "insulto",
        "intacto",
        "integral",
        "intimar",
        "intocado",
        "intriga",
        "invasor",
        "inverno",
        "invicto",
        "invocar",
        "iogurte",
        "iraniano",
        "ironizar",
        "irreal",
        "irritado",
        "isca",
        "isento",
        "isolado",
        "isqueiro",
        "italiano",
        "janeiro",
        "jangada",
        "janta",
        "jararaca",
        "jardim",
        "jarro",
        "jasmim",
        "jato",
        "javali",
        "jazida",
        "jejum",
        "joaninha",
        "joelhada",
        "jogador",
        "joia",
        "jornal",
        "jorrar",
        "jovem",
        "juba",
        "judeu",
        "judoca",
        "juiz",
        "julgador",
        "julho",
        "jurado",
        "jurista",
        "juro",
        "justa",
        "labareda",
        "laboral",
        "lacre",
        "lactante",
        "ladrilho",
        "lagarta",
        "lagoa",
        "laje",
        "lamber",
        "lamentar",
        "laminar",
        "lampejo",
        "lanche",
        "lapidar",
        "lapso",
        "laranja",
        "lareira",
        "largura",
        "lasanha",
        "lastro",
        "lateral",
        "latido",
        "lavanda",
        "lavoura",
        "lavrador",
        "laxante",
        "lazer",
        "lealdade",
        "lebre",
        "legado",
        "legendar",
        "legista",
        "leigo",
        "leiloar",
        "leitura",
        "lembrete",
        "leme",
        "lenhador",
        "lentilha",
        "leoa",
        "lesma",
        "leste",
        "letivo",
        "letreiro",
        "levar",
        "leveza",
        "levitar",
        "liberal",
        "libido",
        "liderar",
        "ligar",
        "ligeiro",
        "limitar",
        "limoeiro",
        "limpador",
        "linda",
        "linear",
        "linhagem",
        "liquidez",
        "listagem",
        "lisura",
        "litoral",
        "livro",
        "lixa",
        "lixeira",
        "locador",
        "locutor",
        "lojista",
        "lombo",
        "lona",
        "longe",
        "lontra",
        "lorde",
        "lotado",
        "loteria",
        "loucura",
        "lousa",
        "louvar",
        "luar",
        "lucidez",
        "lucro",
        "luneta",
        "lustre",
        "lutador",
        "luva",
        "macaco",
        "macete",
        "machado",
        "macio",
        "madeira",
        "madrinha",
        "magnata",
        "magreza",
        "maior",
        "mais",
        "malandro",
        "malha",
        "malote",
        "maluco",
        "mamilo",
        "mamoeiro",
        "mamute",
        "manada",
        "mancha",
        "mandato",
        "manequim",
        "manhoso",
        "manivela",
        "manobrar",
        "mansa",
        "manter",
        "manusear",
        "mapeado",
        "maquinar",
        "marcador",
        "maresia",
        "marfim",
        "margem",
        "marinho",
        "marmita",
        "maroto",
        "marquise",
        "marreco",
        "martelo",
        "marujo",
        "mascote",
        "masmorra",
        "massagem",
        "mastigar",
        "matagal",
        "materno",
        "matinal",
        "matutar",
        "maxilar",
        "medalha",
        "medida",
        "medusa",
        "megafone",
        "meiga",
        "melancia",
        "melhor",
        "membro",
        "memorial",
        "menino",
        "menos",
        "mensagem",
        "mental",
        "merecer",
        "mergulho",
        "mesada",
        "mesclar",
        "mesmo",
        "mesquita",
        "mestre",
        "metade",
        "meteoro",
        "metragem",
        "mexer",
        "mexicano",
        "micro",
        "migalha",
        "migrar",
        "milagre",
        "milenar",
        "milhar",
        "mimado",
        "minerar",
        "minhoca",
        "ministro",
        "minoria",
        "miolo",
        "mirante",
        "mirtilo",
        "misturar",
        "mocidade",
        "moderno",
        "modular",
        "moeda",
        "moer",
        "moinho",
        "moita",
        "moldura",
        "moleza",
        "molho",
        "molinete",
        "molusco",
        "montanha",
        "moqueca",
        "morango",
        "morcego",
        "mordomo",
        "morena",
        "mosaico",
        "mosquete",
        "mostarda",
        "motel",
        "motim",
        "moto",
        "motriz",
        "muda",
        "muito",
        "mulata",
        "mulher",
        "multar",
        "mundial",
        "munido",
        "muralha",
        "murcho",
        "muscular",
        "museu",
        "musical",
        "nacional",
        "nadador",
        "naja",
        "namoro",
        "narina",
        "narrado",
        "nascer",
        "nativa",
        "natureza",
        "navalha",
        "navegar",
        "navio",
        "neblina",
        "nebuloso",
        "negativa",
        "negociar",
        "negrito",
        "nervoso",
        "neta",
        "neural",
        "nevasca",
        "nevoeiro",
        "ninar",
        "ninho",
        "nitidez",
        "nivelar",
        "nobreza",
        "noite",
        "noiva",
        "nomear",
        "nominal",
        "nordeste",
        "nortear",
        "notar",
        "noticiar",
        "noturno",
        "novelo",
        "novilho",
        "novo",
        "nublado",
        "nudez",
        "numeral",
        "nupcial",
        "nutrir",
        "nuvem",
        "obcecado",
        "obedecer",
        "objetivo",
        "obrigado",
        "obscuro",
        "obstetra",
        "obter",
        "obturar",
        "ocidente",
        "ocioso",
        "ocorrer",
        "oculista",
        "ocupado",
        "ofegante",
        "ofensiva",
        "oferenda",
        "oficina",
        "ofuscado",
        "ogiva",
        "olaria",
        "oleoso",
        "olhar",
        "oliveira",
        "ombro",
        "omelete",
        "omisso",
        "omitir",
        "ondulado",
        "oneroso",
        "ontem",
        "opcional",
        "operador",
        "oponente",
        "oportuno",
        "oposto",
        "orar",
        "orbitar",
        "ordem",
        "ordinal",
        "orfanato",
        "orgasmo",
        "orgulho",
        "oriental",
        "origem",
        "oriundo",
        "orla",
        "ortodoxo",
        "orvalho",
        "oscilar",
        "ossada",
        "osso",
        "ostentar",
        "otimismo",
        "ousadia",
        "outono",
        "outubro",
        "ouvido",
        "ovelha",
        "ovular",
        "oxidar",
        "oxigenar",
        "pacato",
        "paciente",
        "pacote",
        "pactuar",
        "padaria",
        "padrinho",
        "pagar",
        "pagode",
        "painel",
        "pairar",
        "paisagem",
        "palavra",
        "palestra",
        "palheta",
        "palito",
        "palmada",
        "palpitar",
        "pancada",
        "panela",
        "panfleto",
        "panqueca",
        "pantanal",
        "papagaio",
        "papelada",
        "papiro",
        "parafina",
        "parcial",
        "pardal",
        "parede",
        "partida",
        "pasmo",
        "passado",
        "pastel",
        "patamar",
        "patente",
        "patinar",
        "patrono",
        "paulada",
        "pausar",
        "peculiar",
        "pedalar",
        "pedestre",
        "pediatra",
        "pedra",
        "pegada",
        "peitoral",
        "peixe",
        "pele",
        "pelicano",
        "penca",
        "pendurar",
        "peneira",
        "penhasco",
        "pensador",
        "pente",
        "perceber",
        "perfeito",
        "pergunta",
        "perito",
        "permitir",
        "perna",
        "perplexo",
        "persiana",
        "pertence",
        "peruca",
        "pescado",
        "pesquisa",
        "pessoa",
        "petiscar",
        "piada",
        "picado",
        "piedade",
        "pigmento",
        "pilastra",
        "pilhado",
        "pilotar",
        "pimenta",
        "pincel",
        "pinguim",
        "pinha",
        "pinote",
        "pintar",
        "pioneiro",
        "pipoca",
        "piquete",
        "piranha",
        "pires",
        "pirueta",
        "piscar",
        "pistola",
        "pitanga",
        "pivete",
        "planta",
        "plaqueta",
        "platina",
        "plebeu",
        "plumagem",
        "pluvial",
        "pneu",
        "poda",
        "poeira",
        "poetisa",
        "polegada",
        "policiar",
        "poluente",
        "polvilho",
        "pomar",
        "pomba",
        "ponderar",
        "pontaria",
        "populoso",
        "porta",
        "possuir",
        "postal",
        "pote",
        "poupar",
        "pouso",
        "povoar",
        "praia",
        "prancha",
        "prato",
        "praxe",
        "prece",
        "predador",
        "prefeito",
        "premiar",
        "prensar",
        "preparar",
        "presilha",
        "pretexto",
        "prevenir",
        "prezar",
        "primata",
        "princesa",
        "prisma",
        "privado",
        "processo",
        "produto",
        "profeta",
        "proibido",
        "projeto",
        "prometer",
        "propagar",
        "prosa",
        "protetor",
        "provador",
        "publicar",
        "pudim",
        "pular",
        "pulmonar",
        "pulseira",
        "punhal",
        "punir",
        "pupilo",
        "pureza",
        "puxador",
        "quadra",
        "quantia",
        "quarto",
        "quase",
        "quebrar",
        "queda",
        "queijo",
        "quente",
        "querido",
        "quimono",
        "quina",
        "quiosque",
        "rabanada",
        "rabisco",
        "rachar",
        "racionar",
        "radial",
        "raiar",
        "rainha",
        "raio",
        "raiva",
        "rajada",
        "ralado",
        "ramal",
        "ranger",
        "ranhura",
        "rapadura",
        "rapel",
        "rapidez",
        "raposa",
        "raquete",
        "raridade",
        "rasante",
        "rascunho",
        "rasgar",
        "raspador",
        "rasteira",
        "rasurar",
        "ratazana",
        "ratoeira",
        "realeza",
        "reanimar",
        "reaver",
        "rebaixar",
        "rebelde",
        "rebolar",
        "recado",
        "recente",
        "recheio",
        "recibo",
        "recordar",
        "recrutar",
        "recuar",
        "rede",
        "redimir",
        "redonda",
        "reduzida",
        "reenvio",
        "refinar",
        "refletir",
        "refogar",
        "refresco",
        "refugiar",
        "regalia",
        "regime",
        "regra",
        "reinado",
        "reitor",
        "rejeitar",
        "relativo",
        "remador",
        "remendo",
        "remorso",
        "renovado",
        "reparo",
        "repelir",
        "repleto",
        "repolho",
        "represa",
        "repudiar",
        "requerer",
        "resenha",
        "resfriar",
        "resgatar",
        "residir",
        "resolver",
        "respeito",
        "ressaca",
        "restante",
        "resumir",
        "retalho",
        "reter",
        "retirar",
        "retomada",
        "retratar",
        "revelar",
        "revisor",
        "revolta",
        "riacho",
        "rica",
        "rigidez",
        "rigoroso",
        "rimar",
        "ringue",
        "risada",
        "risco",
        "risonho",
        "robalo",
        "rochedo",
        "rodada",
        "rodeio",
        "rodovia",
        "roedor",
        "roleta",
        "romano",
        "roncar",
        "rosado",
        "roseira",
        "rosto",
        "rota",
        "roteiro",
        "rotina",
        "rotular",
        "rouco",
        "roupa",
        "roxo",
        "rubro",
        "rugido",
        "rugoso",
        "ruivo",
        "rumo",
        "rupestre",
        "russo",
        "sabor",
        "saciar",
        "sacola",
        "sacudir",
        "sadio",
        "safira",
        "saga",
        "sagrada",
        "saibro",
        "salada",
        "saleiro",
        "salgado",
        "saliva",
        "salpicar",
        "salsicha",
        "saltar",
        "salvador",
        "sambar",
        "samurai",
        "sanar",
        "sanfona",
        "sangue",
        "sanidade",
        "sapato",
        "sarda",
        "sargento",
        "sarjeta",
        "saturar",
        "saudade",
        "saxofone",
        "sazonal",
        "secar",
        "secular",
        "seda",
        "sedento",
        "sediado",
        "sedoso",
        "sedutor",
        "segmento",
        "segredo",
        "segundo",
        "seiva",
        "seleto",
        "selvagem",
        "semanal",
        "semente",
        "senador",
        "senhor",
        "sensual",
        "sentado",
        "separado",
        "sereia",
        "seringa",
        "serra",
        "servo",
        "setembro",
        "setor",
        "sigilo",
        "silhueta",
        "silicone",
        "simetria",
        "simpatia",
        "simular",
        "sinal",
        "sincero",
        "singular",
        "sinopse",
        "sintonia",
        "sirene",
        "siri",
        "situado",
        "soberano",
        "sobra",
        "socorro",
        "sogro",
        "soja",
        "solda",
        "soletrar",
        "solteiro",
        "sombrio",
        "sonata",
        "sondar",
        "sonegar",
        "sonhador",
        "sono",
        "soprano",
        "soquete",
        "sorrir",
        "sorteio",
        "sossego",
        "sotaque",
        "soterrar",
        "sovado",
        "sozinho",
        "suavizar",
        "subida",
        "submerso",
        "subsolo",
        "subtrair",
        "sucata",
        "sucesso",
        "suco",
        "sudeste",
        "sufixo",
        "sugador",
        "sugerir",
        "sujeito",
        "sulfato",
        "sumir",
        "suor",
        "superior",
        "suplicar",
        "suposto",
        "suprimir",
        "surdina",
        "surfista",
        "surpresa",
        "surreal",
        "surtir",
        "suspiro",
        "sustento",
        "tabela",
        "tablete",
        "tabuada",
        "tacho",
        "tagarela",
        "talher",
        "talo",
        "talvez",
        "tamanho",
        "tamborim",
        "tampa",
        "tangente",
        "tanto",
        "tapar",
        "tapioca",
        "tardio",
        "tarefa",
        "tarja",
        "tarraxa",
        "tatuagem",
        "taurino",
        "taxativo",
        "taxista",
        "teatral",
        "tecer",
        "tecido",
        "teclado",
        "tedioso",
        "teia",
        "teimar",
        "telefone",
        "telhado",
        "tempero",
        "tenente",
        "tensor",
        "tentar",
        "termal",
        "terno",
        "terreno",
        "tese",
        "tesoura",
        "testado",
        "teto",
        "textura",
        "texugo",
        "tiara",
        "tigela",
        "tijolo",
        "timbrar",
        "timidez",
        "tingido",
        "tinteiro",
        "tiragem",
        "titular",
        "toalha",
        "tocha",
        "tolerar",
        "tolice",
        "tomada",
        "tomilho",
        "tonel",
        "tontura",
        "topete",
        "tora",
        "torcido",
        "torneio",
        "torque",
        "torrada",
        "torto",
        "tostar",
        "touca",
        "toupeira",
        "toxina",
        "trabalho",
        "tracejar",
        "tradutor",
        "trafegar",
        "trajeto",
        "trama",
        "trancar",
        "trapo",
        "traseiro",
        "tratador",
        "travar",
        "treino",
        "tremer",
        "trepidar",
        "trevo",
        "triagem",
        "tribo",
        "triciclo",
        "tridente",
        "trilogia",
        "trindade",
        "triplo",
        "triturar",
        "triunfal",
        "trocar",
        "trombeta",
        "trova",
        "trunfo",
        "truque",
        "tubular",
        "tucano",
        "tudo",
        "tulipa",
        "tupi",
        "turbo",
        "turma",
        "turquesa",
        "tutelar",
        "tutorial",
        "uivar",
        "umbigo",
        "unha",
        "unidade",
        "uniforme",
        "urologia",
        "urso",
        "urtiga",
        "urubu",
        "usado",
        "usina",
        "usufruir",
        "vacina",
        "vadiar",
        "vagaroso",
        "vaidoso",
        "vala",
        "valente",
        "validade",
        "valores",
        "vantagem",
        "vaqueiro",
        "varanda",
        "vareta",
        "varrer",
        "vascular",
        "vasilha",
        "vassoura",
        "vazar",
        "vazio",
        "veado",
        "vedar",
        "vegetar",
        "veicular",
        "veleiro",
        "velhice",
        "veludo",
        "vencedor",
        "vendaval",
        "venerar",
        "ventre",
        "verbal",
        "verdade",
        "vereador",
        "vergonha",
        "vermelho",
        "verniz",
        "versar",
        "vertente",
        "vespa",
        "vestido",
        "vetorial",
        "viaduto",
        "viagem",
        "viajar",
        "viatura",
        "vibrador",
        "videira",
        "vidraria",
        "viela",
        "viga",
        "vigente",
        "vigiar",
        "vigorar",
        "vilarejo",
        "vinco",
        "vinheta",
        "vinil",
        "violeta",
        "virada",
        "virtude",
        "visitar",
        "visto",
        "vitral",
        "viveiro",
        "vizinho",
        "voador",
        "voar",
        "vogal",
        "volante",
        "voleibol",
        "voltagem",
        "volumoso",
        "vontade",
        "vulto",
        "vuvuzela",
        "xadrez",
        "xarope",
        "xeque",
        "xeretar",
        "xerife",
        "xingar",
        "zangado",
        "zarpar",
        "zebu",
        "zelador",
        "zombar",
        "zoologia",
        "zumbido"
      ];
    }
  });

  // node_modules/bip39/src/wordlists/english.json
  var require_english = __commonJS({
    "node_modules/bip39/src/wordlists/english.json"(exports, module) {
      module.exports = [
        "abandon",
        "ability",
        "able",
        "about",
        "above",
        "absent",
        "absorb",
        "abstract",
        "absurd",
        "abuse",
        "access",
        "accident",
        "account",
        "accuse",
        "achieve",
        "acid",
        "acoustic",
        "acquire",
        "across",
        "act",
        "action",
        "actor",
        "actress",
        "actual",
        "adapt",
        "add",
        "addict",
        "address",
        "adjust",
        "admit",
        "adult",
        "advance",
        "advice",
        "aerobic",
        "affair",
        "afford",
        "afraid",
        "again",
        "age",
        "agent",
        "agree",
        "ahead",
        "aim",
        "air",
        "airport",
        "aisle",
        "alarm",
        "album",
        "alcohol",
        "alert",
        "alien",
        "all",
        "alley",
        "allow",
        "almost",
        "alone",
        "alpha",
        "already",
        "also",
        "alter",
        "always",
        "amateur",
        "amazing",
        "among",
        "amount",
        "amused",
        "analyst",
        "anchor",
        "ancient",
        "anger",
        "angle",
        "angry",
        "animal",
        "ankle",
        "announce",
        "annual",
        "another",
        "answer",
        "antenna",
        "antique",
        "anxiety",
        "any",
        "apart",
        "apology",
        "appear",
        "apple",
        "approve",
        "april",
        "arch",
        "arctic",
        "area",
        "arena",
        "argue",
        "arm",
        "armed",
        "armor",
        "army",
        "around",
        "arrange",
        "arrest",
        "arrive",
        "arrow",
        "art",
        "artefact",
        "artist",
        "artwork",
        "ask",
        "aspect",
        "assault",
        "asset",
        "assist",
        "assume",
        "asthma",
        "athlete",
        "atom",
        "attack",
        "attend",
        "attitude",
        "attract",
        "auction",
        "audit",
        "august",
        "aunt",
        "author",
        "auto",
        "autumn",
        "average",
        "avocado",
        "avoid",
        "awake",
        "aware",
        "away",
        "awesome",
        "awful",
        "awkward",
        "axis",
        "baby",
        "bachelor",
        "bacon",
        "badge",
        "bag",
        "balance",
        "balcony",
        "ball",
        "bamboo",
        "banana",
        "banner",
        "bar",
        "barely",
        "bargain",
        "barrel",
        "base",
        "basic",
        "basket",
        "battle",
        "beach",
        "bean",
        "beauty",
        "because",
        "become",
        "beef",
        "before",
        "begin",
        "behave",
        "behind",
        "believe",
        "below",
        "belt",
        "bench",
        "benefit",
        "best",
        "betray",
        "better",
        "between",
        "beyond",
        "bicycle",
        "bid",
        "bike",
        "bind",
        "biology",
        "bird",
        "birth",
        "bitter",
        "black",
        "blade",
        "blame",
        "blanket",
        "blast",
        "bleak",
        "bless",
        "blind",
        "blood",
        "blossom",
        "blouse",
        "blue",
        "blur",
        "blush",
        "board",
        "boat",
        "body",
        "boil",
        "bomb",
        "bone",
        "bonus",
        "book",
        "boost",
        "border",
        "boring",
        "borrow",
        "boss",
        "bottom",
        "bounce",
        "box",
        "boy",
        "bracket",
        "brain",
        "brand",
        "brass",
        "brave",
        "bread",
        "breeze",
        "brick",
        "bridge",
        "brief",
        "bright",
        "bring",
        "brisk",
        "broccoli",
        "broken",
        "bronze",
        "broom",
        "brother",
        "brown",
        "brush",
        "bubble",
        "buddy",
        "budget",
        "buffalo",
        "build",
        "bulb",
        "bulk",
        "bullet",
        "bundle",
        "bunker",
        "burden",
        "burger",
        "burst",
        "bus",
        "business",
        "busy",
        "butter",
        "buyer",
        "buzz",
        "cabbage",
        "cabin",
        "cable",
        "cactus",
        "cage",
        "cake",
        "call",
        "calm",
        "camera",
        "camp",
        "can",
        "canal",
        "cancel",
        "candy",
        "cannon",
        "canoe",
        "canvas",
        "canyon",
        "capable",
        "capital",
        "captain",
        "car",
        "carbon",
        "card",
        "cargo",
        "carpet",
        "carry",
        "cart",
        "case",
        "cash",
        "casino",
        "castle",
        "casual",
        "cat",
        "catalog",
        "catch",
        "category",
        "cattle",
        "caught",
        "cause",
        "caution",
        "cave",
        "ceiling",
        "celery",
        "cement",
        "census",
        "century",
        "cereal",
        "certain",
        "chair",
        "chalk",
        "champion",
        "change",
        "chaos",
        "chapter",
        "charge",
        "chase",
        "chat",
        "cheap",
        "check",
        "cheese",
        "chef",
        "cherry",
        "chest",
        "chicken",
        "chief",
        "child",
        "chimney",
        "choice",
        "choose",
        "chronic",
        "chuckle",
        "chunk",
        "churn",
        "cigar",
        "cinnamon",
        "circle",
        "citizen",
        "city",
        "civil",
        "claim",
        "clap",
        "clarify",
        "claw",
        "clay",
        "clean",
        "clerk",
        "clever",
        "click",
        "client",
        "cliff",
        "climb",
        "clinic",
        "clip",
        "clock",
        "clog",
        "close",
        "cloth",
        "cloud",
        "clown",
        "club",
        "clump",
        "cluster",
        "clutch",
        "coach",
        "coast",
        "coconut",
        "code",
        "coffee",
        "coil",
        "coin",
        "collect",
        "color",
        "column",
        "combine",
        "come",
        "comfort",
        "comic",
        "common",
        "company",
        "concert",
        "conduct",
        "confirm",
        "congress",
        "connect",
        "consider",
        "control",
        "convince",
        "cook",
        "cool",
        "copper",
        "copy",
        "coral",
        "core",
        "corn",
        "correct",
        "cost",
        "cotton",
        "couch",
        "country",
        "couple",
        "course",
        "cousin",
        "cover",
        "coyote",
        "crack",
        "cradle",
        "craft",
        "cram",
        "crane",
        "crash",
        "crater",
        "crawl",
        "crazy",
        "cream",
        "credit",
        "creek",
        "crew",
        "cricket",
        "crime",
        "crisp",
        "critic",
        "crop",
        "cross",
        "crouch",
        "crowd",
        "crucial",
        "cruel",
        "cruise",
        "crumble",
        "crunch",
        "crush",
        "cry",
        "crystal",
        "cube",
        "culture",
        "cup",
        "cupboard",
        "curious",
        "current",
        "curtain",
        "curve",
        "cushion",
        "custom",
        "cute",
        "cycle",
        "dad",
        "damage",
        "damp",
        "dance",
        "danger",
        "daring",
        "dash",
        "daughter",
        "dawn",
        "day",
        "deal",
        "debate",
        "debris",
        "decade",
        "december",
        "decide",
        "decline",
        "decorate",
        "decrease",
        "deer",
        "defense",
        "define",
        "defy",
        "degree",
        "delay",
        "deliver",
        "demand",
        "demise",
        "denial",
        "dentist",
        "deny",
        "depart",
        "depend",
        "deposit",
        "depth",
        "deputy",
        "derive",
        "describe",
        "desert",
        "design",
        "desk",
        "despair",
        "destroy",
        "detail",
        "detect",
        "develop",
        "device",
        "devote",
        "diagram",
        "dial",
        "diamond",
        "diary",
        "dice",
        "diesel",
        "diet",
        "differ",
        "digital",
        "dignity",
        "dilemma",
        "dinner",
        "dinosaur",
        "direct",
        "dirt",
        "disagree",
        "discover",
        "disease",
        "dish",
        "dismiss",
        "disorder",
        "display",
        "distance",
        "divert",
        "divide",
        "divorce",
        "dizzy",
        "doctor",
        "document",
        "dog",
        "doll",
        "dolphin",
        "domain",
        "donate",
        "donkey",
        "donor",
        "door",
        "dose",
        "double",
        "dove",
        "draft",
        "dragon",
        "drama",
        "drastic",
        "draw",
        "dream",
        "dress",
        "drift",
        "drill",
        "drink",
        "drip",
        "drive",
        "drop",
        "drum",
        "dry",
        "duck",
        "dumb",
        "dune",
        "during",
        "dust",
        "dutch",
        "duty",
        "dwarf",
        "dynamic",
        "eager",
        "eagle",
        "early",
        "earn",
        "earth",
        "easily",
        "east",
        "easy",
        "echo",
        "ecology",
        "economy",
        "edge",
        "edit",
        "educate",
        "effort",
        "egg",
        "eight",
        "either",
        "elbow",
        "elder",
        "electric",
        "elegant",
        "element",
        "elephant",
        "elevator",
        "elite",
        "else",
        "embark",
        "embody",
        "embrace",
        "emerge",
        "emotion",
        "employ",
        "empower",
        "empty",
        "enable",
        "enact",
        "end",
        "endless",
        "endorse",
        "enemy",
        "energy",
        "enforce",
        "engage",
        "engine",
        "enhance",
        "enjoy",
        "enlist",
        "enough",
        "enrich",
        "enroll",
        "ensure",
        "enter",
        "entire",
        "entry",
        "envelope",
        "episode",
        "equal",
        "equip",
        "era",
        "erase",
        "erode",
        "erosion",
        "error",
        "erupt",
        "escape",
        "essay",
        "essence",
        "estate",
        "eternal",
        "ethics",
        "evidence",
        "evil",
        "evoke",
        "evolve",
        "exact",
        "example",
        "excess",
        "exchange",
        "excite",
        "exclude",
        "excuse",
        "execute",
        "exercise",
        "exhaust",
        "exhibit",
        "exile",
        "exist",
        "exit",
        "exotic",
        "expand",
        "expect",
        "expire",
        "explain",
        "expose",
        "express",
        "extend",
        "extra",
        "eye",
        "eyebrow",
        "fabric",
        "face",
        "faculty",
        "fade",
        "faint",
        "faith",
        "fall",
        "false",
        "fame",
        "family",
        "famous",
        "fan",
        "fancy",
        "fantasy",
        "farm",
        "fashion",
        "fat",
        "fatal",
        "father",
        "fatigue",
        "fault",
        "favorite",
        "feature",
        "february",
        "federal",
        "fee",
        "feed",
        "feel",
        "female",
        "fence",
        "festival",
        "fetch",
        "fever",
        "few",
        "fiber",
        "fiction",
        "field",
        "figure",
        "file",
        "film",
        "filter",
        "final",
        "find",
        "fine",
        "finger",
        "finish",
        "fire",
        "firm",
        "first",
        "fiscal",
        "fish",
        "fit",
        "fitness",
        "fix",
        "flag",
        "flame",
        "flash",
        "flat",
        "flavor",
        "flee",
        "flight",
        "flip",
        "float",
        "flock",
        "floor",
        "flower",
        "fluid",
        "flush",
        "fly",
        "foam",
        "focus",
        "fog",
        "foil",
        "fold",
        "follow",
        "food",
        "foot",
        "force",
        "forest",
        "forget",
        "fork",
        "fortune",
        "forum",
        "forward",
        "fossil",
        "foster",
        "found",
        "fox",
        "fragile",
        "frame",
        "frequent",
        "fresh",
        "friend",
        "fringe",
        "frog",
        "front",
        "frost",
        "frown",
        "frozen",
        "fruit",
        "fuel",
        "fun",
        "funny",
        "furnace",
        "fury",
        "future",
        "gadget",
        "gain",
        "galaxy",
        "gallery",
        "game",
        "gap",
        "garage",
        "garbage",
        "garden",
        "garlic",
        "garment",
        "gas",
        "gasp",
        "gate",
        "gather",
        "gauge",
        "gaze",
        "general",
        "genius",
        "genre",
        "gentle",
        "genuine",
        "gesture",
        "ghost",
        "giant",
        "gift",
        "giggle",
        "ginger",
        "giraffe",
        "girl",
        "give",
        "glad",
        "glance",
        "glare",
        "glass",
        "glide",
        "glimpse",
        "globe",
        "gloom",
        "glory",
        "glove",
        "glow",
        "glue",
        "goat",
        "goddess",
        "gold",
        "good",
        "goose",
        "gorilla",
        "gospel",
        "gossip",
        "govern",
        "gown",
        "grab",
        "grace",
        "grain",
        "grant",
        "grape",
        "grass",
        "gravity",
        "great",
        "green",
        "grid",
        "grief",
        "grit",
        "grocery",
        "group",
        "grow",
        "grunt",
        "guard",
        "guess",
        "guide",
        "guilt",
        "guitar",
        "gun",
        "gym",
        "habit",
        "hair",
        "half",
        "hammer",
        "hamster",
        "hand",
        "happy",
        "harbor",
        "hard",
        "harsh",
        "harvest",
        "hat",
        "have",
        "hawk",
        "hazard",
        "head",
        "health",
        "heart",
        "heavy",
        "hedgehog",
        "height",
        "hello",
        "helmet",
        "help",
        "hen",
        "hero",
        "hidden",
        "high",
        "hill",
        "hint",
        "hip",
        "hire",
        "history",
        "hobby",
        "hockey",
        "hold",
        "hole",
        "holiday",
        "hollow",
        "home",
        "honey",
        "hood",
        "hope",
        "horn",
        "horror",
        "horse",
        "hospital",
        "host",
        "hotel",
        "hour",
        "hover",
        "hub",
        "huge",
        "human",
        "humble",
        "humor",
        "hundred",
        "hungry",
        "hunt",
        "hurdle",
        "hurry",
        "hurt",
        "husband",
        "hybrid",
        "ice",
        "icon",
        "idea",
        "identify",
        "idle",
        "ignore",
        "ill",
        "illegal",
        "illness",
        "image",
        "imitate",
        "immense",
        "immune",
        "impact",
        "impose",
        "improve",
        "impulse",
        "inch",
        "include",
        "income",
        "increase",
        "index",
        "indicate",
        "indoor",
        "industry",
        "infant",
        "inflict",
        "inform",
        "inhale",
        "inherit",
        "initial",
        "inject",
        "injury",
        "inmate",
        "inner",
        "innocent",
        "input",
        "inquiry",
        "insane",
        "insect",
        "inside",
        "inspire",
        "install",
        "intact",
        "interest",
        "into",
        "invest",
        "invite",
        "involve",
        "iron",
        "island",
        "isolate",
        "issue",
        "item",
        "ivory",
        "jacket",
        "jaguar",
        "jar",
        "jazz",
        "jealous",
        "jeans",
        "jelly",
        "jewel",
        "job",
        "join",
        "joke",
        "journey",
        "joy",
        "judge",
        "juice",
        "jump",
        "jungle",
        "junior",
        "junk",
        "just",
        "kangaroo",
        "keen",
        "keep",
        "ketchup",
        "key",
        "kick",
        "kid",
        "kidney",
        "kind",
        "kingdom",
        "kiss",
        "kit",
        "kitchen",
        "kite",
        "kitten",
        "kiwi",
        "knee",
        "knife",
        "knock",
        "know",
        "lab",
        "label",
        "labor",
        "ladder",
        "lady",
        "lake",
        "lamp",
        "language",
        "laptop",
        "large",
        "later",
        "latin",
        "laugh",
        "laundry",
        "lava",
        "law",
        "lawn",
        "lawsuit",
        "layer",
        "lazy",
        "leader",
        "leaf",
        "learn",
        "leave",
        "lecture",
        "left",
        "leg",
        "legal",
        "legend",
        "leisure",
        "lemon",
        "lend",
        "length",
        "lens",
        "leopard",
        "lesson",
        "letter",
        "level",
        "liar",
        "liberty",
        "library",
        "license",
        "life",
        "lift",
        "light",
        "like",
        "limb",
        "limit",
        "link",
        "lion",
        "liquid",
        "list",
        "little",
        "live",
        "lizard",
        "load",
        "loan",
        "lobster",
        "local",
        "lock",
        "logic",
        "lonely",
        "long",
        "loop",
        "lottery",
        "loud",
        "lounge",
        "love",
        "loyal",
        "lucky",
        "luggage",
        "lumber",
        "lunar",
        "lunch",
        "luxury",
        "lyrics",
        "machine",
        "mad",
        "magic",
        "magnet",
        "maid",
        "mail",
        "main",
        "major",
        "make",
        "mammal",
        "man",
        "manage",
        "mandate",
        "mango",
        "mansion",
        "manual",
        "maple",
        "marble",
        "march",
        "margin",
        "marine",
        "market",
        "marriage",
        "mask",
        "mass",
        "master",
        "match",
        "material",
        "math",
        "matrix",
        "matter",
        "maximum",
        "maze",
        "meadow",
        "mean",
        "measure",
        "meat",
        "mechanic",
        "medal",
        "media",
        "melody",
        "melt",
        "member",
        "memory",
        "mention",
        "menu",
        "mercy",
        "merge",
        "merit",
        "merry",
        "mesh",
        "message",
        "metal",
        "method",
        "middle",
        "midnight",
        "milk",
        "million",
        "mimic",
        "mind",
        "minimum",
        "minor",
        "minute",
        "miracle",
        "mirror",
        "misery",
        "miss",
        "mistake",
        "mix",
        "mixed",
        "mixture",
        "mobile",
        "model",
        "modify",
        "mom",
        "moment",
        "monitor",
        "monkey",
        "monster",
        "month",
        "moon",
        "moral",
        "more",
        "morning",
        "mosquito",
        "mother",
        "motion",
        "motor",
        "mountain",
        "mouse",
        "move",
        "movie",
        "much",
        "muffin",
        "mule",
        "multiply",
        "muscle",
        "museum",
        "mushroom",
        "music",
        "must",
        "mutual",
        "myself",
        "mystery",
        "myth",
        "naive",
        "name",
        "napkin",
        "narrow",
        "nasty",
        "nation",
        "nature",
        "near",
        "neck",
        "need",
        "negative",
        "neglect",
        "neither",
        "nephew",
        "nerve",
        "nest",
        "net",
        "network",
        "neutral",
        "never",
        "news",
        "next",
        "nice",
        "night",
        "noble",
        "noise",
        "nominee",
        "noodle",
        "normal",
        "north",
        "nose",
        "notable",
        "note",
        "nothing",
        "notice",
        "novel",
        "now",
        "nuclear",
        "number",
        "nurse",
        "nut",
        "oak",
        "obey",
        "object",
        "oblige",
        "obscure",
        "observe",
        "obtain",
        "obvious",
        "occur",
        "ocean",
        "october",
        "odor",
        "off",
        "offer",
        "office",
        "often",
        "oil",
        "okay",
        "old",
        "olive",
        "olympic",
        "omit",
        "once",
        "one",
        "onion",
        "online",
        "only",
        "open",
        "opera",
        "opinion",
        "oppose",
        "option",
        "orange",
        "orbit",
        "orchard",
        "order",
        "ordinary",
        "organ",
        "orient",
        "original",
        "orphan",
        "ostrich",
        "other",
        "outdoor",
        "outer",
        "output",
        "outside",
        "oval",
        "oven",
        "over",
        "own",
        "owner",
        "oxygen",
        "oyster",
        "ozone",
        "pact",
        "paddle",
        "page",
        "pair",
        "palace",
        "palm",
        "panda",
        "panel",
        "panic",
        "panther",
        "paper",
        "parade",
        "parent",
        "park",
        "parrot",
        "party",
        "pass",
        "patch",
        "path",
        "patient",
        "patrol",
        "pattern",
        "pause",
        "pave",
        "payment",
        "peace",
        "peanut",
        "pear",
        "peasant",
        "pelican",
        "pen",
        "penalty",
        "pencil",
        "people",
        "pepper",
        "perfect",
        "permit",
        "person",
        "pet",
        "phone",
        "photo",
        "phrase",
        "physical",
        "piano",
        "picnic",
        "picture",
        "piece",
        "pig",
        "pigeon",
        "pill",
        "pilot",
        "pink",
        "pioneer",
        "pipe",
        "pistol",
        "pitch",
        "pizza",
        "place",
        "planet",
        "plastic",
        "plate",
        "play",
        "please",
        "pledge",
        "pluck",
        "plug",
        "plunge",
        "poem",
        "poet",
        "point",
        "polar",
        "pole",
        "police",
        "pond",
        "pony",
        "pool",
        "popular",
        "portion",
        "position",
        "possible",
        "post",
        "potato",
        "pottery",
        "poverty",
        "powder",
        "power",
        "practice",
        "praise",
        "predict",
        "prefer",
        "prepare",
        "present",
        "pretty",
        "prevent",
        "price",
        "pride",
        "primary",
        "print",
        "priority",
        "prison",
        "private",
        "prize",
        "problem",
        "process",
        "produce",
        "profit",
        "program",
        "project",
        "promote",
        "proof",
        "property",
        "prosper",
        "protect",
        "proud",
        "provide",
        "public",
        "pudding",
        "pull",
        "pulp",
        "pulse",
        "pumpkin",
        "punch",
        "pupil",
        "puppy",
        "purchase",
        "purity",
        "purpose",
        "purse",
        "push",
        "put",
        "puzzle",
        "pyramid",
        "quality",
        "quantum",
        "quarter",
        "question",
        "quick",
        "quit",
        "quiz",
        "quote",
        "rabbit",
        "raccoon",
        "race",
        "rack",
        "radar",
        "radio",
        "rail",
        "rain",
        "raise",
        "rally",
        "ramp",
        "ranch",
        "random",
        "range",
        "rapid",
        "rare",
        "rate",
        "rather",
        "raven",
        "raw",
        "razor",
        "ready",
        "real",
        "reason",
        "rebel",
        "rebuild",
        "recall",
        "receive",
        "recipe",
        "record",
        "recycle",
        "reduce",
        "reflect",
        "reform",
        "refuse",
        "region",
        "regret",
        "regular",
        "reject",
        "relax",
        "release",
        "relief",
        "rely",
        "remain",
        "remember",
        "remind",
        "remove",
        "render",
        "renew",
        "rent",
        "reopen",
        "repair",
        "repeat",
        "replace",
        "report",
        "require",
        "rescue",
        "resemble",
        "resist",
        "resource",
        "response",
        "result",
        "retire",
        "retreat",
        "return",
        "reunion",
        "reveal",
        "review",
        "reward",
        "rhythm",
        "rib",
        "ribbon",
        "rice",
        "rich",
        "ride",
        "ridge",
        "rifle",
        "right",
        "rigid",
        "ring",
        "riot",
        "ripple",
        "risk",
        "ritual",
        "rival",
        "river",
        "road",
        "roast",
        "robot",
        "robust",
        "rocket",
        "romance",
        "roof",
        "rookie",
        "room",
        "rose",
        "rotate",
        "rough",
        "round",
        "route",
        "royal",
        "rubber",
        "rude",
        "rug",
        "rule",
        "run",
        "runway",
        "rural",
        "sad",
        "saddle",
        "sadness",
        "safe",
        "sail",
        "salad",
        "salmon",
        "salon",
        "salt",
        "salute",
        "same",
        "sample",
        "sand",
        "satisfy",
        "satoshi",
        "sauce",
        "sausage",
        "save",
        "say",
        "scale",
        "scan",
        "scare",
        "scatter",
        "scene",
        "scheme",
        "school",
        "science",
        "scissors",
        "scorpion",
        "scout",
        "scrap",
        "screen",
        "script",
        "scrub",
        "sea",
        "search",
        "season",
        "seat",
        "second",
        "secret",
        "section",
        "security",
        "seed",
        "seek",
        "segment",
        "select",
        "sell",
        "seminar",
        "senior",
        "sense",
        "sentence",
        "series",
        "service",
        "session",
        "settle",
        "setup",
        "seven",
        "shadow",
        "shaft",
        "shallow",
        "share",
        "shed",
        "shell",
        "sheriff",
        "shield",
        "shift",
        "shine",
        "ship",
        "shiver",
        "shock",
        "shoe",
        "shoot",
        "shop",
        "short",
        "shoulder",
        "shove",
        "shrimp",
        "shrug",
        "shuffle",
        "shy",
        "sibling",
        "sick",
        "side",
        "siege",
        "sight",
        "sign",
        "silent",
        "silk",
        "silly",
        "silver",
        "similar",
        "simple",
        "since",
        "sing",
        "siren",
        "sister",
        "situate",
        "six",
        "size",
        "skate",
        "sketch",
        "ski",
        "skill",
        "skin",
        "skirt",
        "skull",
        "slab",
        "slam",
        "sleep",
        "slender",
        "slice",
        "slide",
        "slight",
        "slim",
        "slogan",
        "slot",
        "slow",
        "slush",
        "small",
        "smart",
        "smile",
        "smoke",
        "smooth",
        "snack",
        "snake",
        "snap",
        "sniff",
        "snow",
        "soap",
        "soccer",
        "social",
        "sock",
        "soda",
        "soft",
        "solar",
        "soldier",
        "solid",
        "solution",
        "solve",
        "someone",
        "song",
        "soon",
        "sorry",
        "sort",
        "soul",
        "sound",
        "soup",
        "source",
        "south",
        "space",
        "spare",
        "spatial",
        "spawn",
        "speak",
        "special",
        "speed",
        "spell",
        "spend",
        "sphere",
        "spice",
        "spider",
        "spike",
        "spin",
        "spirit",
        "split",
        "spoil",
        "sponsor",
        "spoon",
        "sport",
        "spot",
        "spray",
        "spread",
        "spring",
        "spy",
        "square",
        "squeeze",
        "squirrel",
        "stable",
        "stadium",
        "staff",
        "stage",
        "stairs",
        "stamp",
        "stand",
        "start",
        "state",
        "stay",
        "steak",
        "steel",
        "stem",
        "step",
        "stereo",
        "stick",
        "still",
        "sting",
        "stock",
        "stomach",
        "stone",
        "stool",
        "story",
        "stove",
        "strategy",
        "street",
        "strike",
        "strong",
        "struggle",
        "student",
        "stuff",
        "stumble",
        "style",
        "subject",
        "submit",
        "subway",
        "success",
        "such",
        "sudden",
        "suffer",
        "sugar",
        "suggest",
        "suit",
        "summer",
        "sun",
        "sunny",
        "sunset",
        "super",
        "supply",
        "supreme",
        "sure",
        "surface",
        "surge",
        "surprise",
        "surround",
        "survey",
        "suspect",
        "sustain",
        "swallow",
        "swamp",
        "swap",
        "swarm",
        "swear",
        "sweet",
        "swift",
        "swim",
        "swing",
        "switch",
        "sword",
        "symbol",
        "symptom",
        "syrup",
        "system",
        "table",
        "tackle",
        "tag",
        "tail",
        "talent",
        "talk",
        "tank",
        "tape",
        "target",
        "task",
        "taste",
        "tattoo",
        "taxi",
        "teach",
        "team",
        "tell",
        "ten",
        "tenant",
        "tennis",
        "tent",
        "term",
        "test",
        "text",
        "thank",
        "that",
        "theme",
        "then",
        "theory",
        "there",
        "they",
        "thing",
        "this",
        "thought",
        "three",
        "thrive",
        "throw",
        "thumb",
        "thunder",
        "ticket",
        "tide",
        "tiger",
        "tilt",
        "timber",
        "time",
        "tiny",
        "tip",
        "tired",
        "tissue",
        "title",
        "toast",
        "tobacco",
        "today",
        "toddler",
        "toe",
        "together",
        "toilet",
        "token",
        "tomato",
        "tomorrow",
        "tone",
        "tongue",
        "tonight",
        "tool",
        "tooth",
        "top",
        "topic",
        "topple",
        "torch",
        "tornado",
        "tortoise",
        "toss",
        "total",
        "tourist",
        "toward",
        "tower",
        "town",
        "toy",
        "track",
        "trade",
        "traffic",
        "tragic",
        "train",
        "transfer",
        "trap",
        "trash",
        "travel",
        "tray",
        "treat",
        "tree",
        "trend",
        "trial",
        "tribe",
        "trick",
        "trigger",
        "trim",
        "trip",
        "trophy",
        "trouble",
        "truck",
        "true",
        "truly",
        "trumpet",
        "trust",
        "truth",
        "try",
        "tube",
        "tuition",
        "tumble",
        "tuna",
        "tunnel",
        "turkey",
        "turn",
        "turtle",
        "twelve",
        "twenty",
        "twice",
        "twin",
        "twist",
        "two",
        "type",
        "typical",
        "ugly",
        "umbrella",
        "unable",
        "unaware",
        "uncle",
        "uncover",
        "under",
        "undo",
        "unfair",
        "unfold",
        "unhappy",
        "uniform",
        "unique",
        "unit",
        "universe",
        "unknown",
        "unlock",
        "until",
        "unusual",
        "unveil",
        "update",
        "upgrade",
        "uphold",
        "upon",
        "upper",
        "upset",
        "urban",
        "urge",
        "usage",
        "use",
        "used",
        "useful",
        "useless",
        "usual",
        "utility",
        "vacant",
        "vacuum",
        "vague",
        "valid",
        "valley",
        "valve",
        "van",
        "vanish",
        "vapor",
        "various",
        "vast",
        "vault",
        "vehicle",
        "velvet",
        "vendor",
        "venture",
        "venue",
        "verb",
        "verify",
        "version",
        "very",
        "vessel",
        "veteran",
        "viable",
        "vibrant",
        "vicious",
        "victory",
        "video",
        "view",
        "village",
        "vintage",
        "violin",
        "virtual",
        "virus",
        "visa",
        "visit",
        "visual",
        "vital",
        "vivid",
        "vocal",
        "voice",
        "void",
        "volcano",
        "volume",
        "vote",
        "voyage",
        "wage",
        "wagon",
        "wait",
        "walk",
        "wall",
        "walnut",
        "want",
        "warfare",
        "warm",
        "warrior",
        "wash",
        "wasp",
        "waste",
        "water",
        "wave",
        "way",
        "wealth",
        "weapon",
        "wear",
        "weasel",
        "weather",
        "web",
        "wedding",
        "weekend",
        "weird",
        "welcome",
        "west",
        "wet",
        "whale",
        "what",
        "wheat",
        "wheel",
        "when",
        "where",
        "whip",
        "whisper",
        "wide",
        "width",
        "wife",
        "wild",
        "will",
        "win",
        "window",
        "wine",
        "wing",
        "wink",
        "winner",
        "winter",
        "wire",
        "wisdom",
        "wise",
        "wish",
        "witness",
        "wolf",
        "woman",
        "wonder",
        "wood",
        "wool",
        "word",
        "work",
        "world",
        "worry",
        "worth",
        "wrap",
        "wreck",
        "wrestle",
        "wrist",
        "write",
        "wrong",
        "yard",
        "year",
        "yellow",
        "you",
        "young",
        "youth",
        "zebra",
        "zero",
        "zone",
        "zoo"
      ];
    }
  });

  // node_modules/bip39/src/_wordlists.js
  var require_wordlists = __commonJS({
    "node_modules/bip39/src/_wordlists.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var wordlists = {};
      exports.wordlists = wordlists;
      var _default;
      exports._default = _default;
      try {
        exports._default = _default = require_czech();
        wordlists.czech = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_chinese_simplified();
        wordlists.chinese_simplified = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_chinese_traditional();
        wordlists.chinese_traditional = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_korean();
        wordlists.korean = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_french();
        wordlists.french = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_italian();
        wordlists.italian = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_spanish();
        wordlists.spanish = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_japanese();
        wordlists.japanese = _default;
        wordlists.JA = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_portuguese();
        wordlists.portuguese = _default;
      } catch (err) {
      }
      try {
        exports._default = _default = require_english();
        wordlists.english = _default;
        wordlists.EN = _default;
      } catch (err) {
      }
    }
  });

  // node_modules/bip39/src/index.js
  var require_src = __commonJS({
    "node_modules/bip39/src/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var sha256_1 = require_sha256();
      var sha512_1 = require_sha512();
      var pbkdf2_1 = require_pbkdf2();
      var utils_1 = require_utils();
      var _wordlists_1 = require_wordlists();
      var DEFAULT_WORDLIST = _wordlists_1._default;
      var INVALID_MNEMONIC = "Invalid mnemonic";
      var INVALID_ENTROPY = "Invalid entropy";
      var INVALID_CHECKSUM = "Invalid mnemonic checksum";
      var WORDLIST_REQUIRED = "A wordlist is required but a default could not be found.\nPlease pass a 2048 word array explicitly.";
      function normalize(str) {
        return (str || "").normalize("NFKD");
      }
      function lpad(str, padString, length) {
        while (str.length < length) {
          str = padString + str;
        }
        return str;
      }
      function binaryToByte(bin) {
        return parseInt(bin, 2);
      }
      function bytesToBinary(bytes) {
        return bytes.map((x) => lpad(x.toString(2), "0", 8)).join("");
      }
      function deriveChecksumBits(entropyBuffer) {
        const ENT = entropyBuffer.length * 8;
        const CS = ENT / 32;
        const hash2 = sha256_1.sha256(Uint8Array.from(entropyBuffer));
        return bytesToBinary(Array.from(hash2)).slice(0, CS);
      }
      function salt(password) {
        return "mnemonic" + (password || "");
      }
      function mnemonicToSeedSync2(mnemonic, password) {
        const mnemonicBuffer = Uint8Array.from(Buffer.from(normalize(mnemonic), "utf8"));
        const saltBuffer = Uint8Array.from(Buffer.from(salt(normalize(password)), "utf8"));
        const res = pbkdf2_1.pbkdf2(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
          c: 2048,
          dkLen: 64
        });
        return Buffer.from(res);
      }
      exports.mnemonicToSeedSync = mnemonicToSeedSync2;
      function mnemonicToSeed(mnemonic, password) {
        const mnemonicBuffer = Uint8Array.from(Buffer.from(normalize(mnemonic), "utf8"));
        const saltBuffer = Uint8Array.from(Buffer.from(salt(normalize(password)), "utf8"));
        return pbkdf2_1.pbkdf2Async(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
          c: 2048,
          dkLen: 64
        }).then((res) => Buffer.from(res));
      }
      exports.mnemonicToSeed = mnemonicToSeed;
      function mnemonicToEntropy(mnemonic, wordlist) {
        wordlist = wordlist || DEFAULT_WORDLIST;
        if (!wordlist) {
          throw new Error(WORDLIST_REQUIRED);
        }
        const words = normalize(mnemonic).split(" ");
        if (words.length % 3 !== 0) {
          throw new Error(INVALID_MNEMONIC);
        }
        const bits = words.map((word) => {
          const index = wordlist.indexOf(word);
          if (index === -1) {
            throw new Error(INVALID_MNEMONIC);
          }
          return lpad(index.toString(2), "0", 11);
        }).join("");
        const dividerIndex = Math.floor(bits.length / 33) * 32;
        const entropyBits = bits.slice(0, dividerIndex);
        const checksumBits = bits.slice(dividerIndex);
        const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte);
        if (entropyBytes.length < 16) {
          throw new Error(INVALID_ENTROPY);
        }
        if (entropyBytes.length > 32) {
          throw new Error(INVALID_ENTROPY);
        }
        if (entropyBytes.length % 4 !== 0) {
          throw new Error(INVALID_ENTROPY);
        }
        const entropy = Buffer.from(entropyBytes);
        const newChecksum = deriveChecksumBits(entropy);
        if (newChecksum !== checksumBits) {
          throw new Error(INVALID_CHECKSUM);
        }
        return entropy.toString("hex");
      }
      exports.mnemonicToEntropy = mnemonicToEntropy;
      function entropyToMnemonic(entropy, wordlist) {
        if (!Buffer.isBuffer(entropy)) {
          entropy = Buffer.from(entropy, "hex");
        }
        wordlist = wordlist || DEFAULT_WORDLIST;
        if (!wordlist) {
          throw new Error(WORDLIST_REQUIRED);
        }
        if (entropy.length < 16) {
          throw new TypeError(INVALID_ENTROPY);
        }
        if (entropy.length > 32) {
          throw new TypeError(INVALID_ENTROPY);
        }
        if (entropy.length % 4 !== 0) {
          throw new TypeError(INVALID_ENTROPY);
        }
        const entropyBits = bytesToBinary(Array.from(entropy));
        const checksumBits = deriveChecksumBits(entropy);
        const bits = entropyBits + checksumBits;
        const chunks = bits.match(/(.{1,11})/g);
        const words = chunks.map((binary) => {
          const index = binaryToByte(binary);
          return wordlist[index];
        });
        return wordlist[0] === "\u3042\u3044\u3053\u304F\u3057\u3093" ? words.join("\u3000") : words.join(" ");
      }
      exports.entropyToMnemonic = entropyToMnemonic;
      function generateMnemonic2(strength, rng, wordlist) {
        strength = strength || 128;
        if (strength % 32 !== 0) {
          throw new TypeError(INVALID_ENTROPY);
        }
        rng = rng || ((size) => Buffer.from(utils_1.randomBytes(size)));
        return entropyToMnemonic(rng(strength / 8), wordlist);
      }
      exports.generateMnemonic = generateMnemonic2;
      function validateMnemonic2(mnemonic, wordlist) {
        try {
          mnemonicToEntropy(mnemonic, wordlist);
        } catch (e) {
          return false;
        }
        return true;
      }
      exports.validateMnemonic = validateMnemonic2;
      function setDefaultWordlist(language) {
        const result = _wordlists_1.wordlists[language];
        if (result) {
          DEFAULT_WORDLIST = result;
        } else {
          throw new Error('Could not find wordlist for language "' + language + '"');
        }
      }
      exports.setDefaultWordlist = setDefaultWordlist;
      function getDefaultWordlist() {
        if (!DEFAULT_WORDLIST) {
          throw new Error("No Default Wordlist set");
        }
        return Object.keys(_wordlists_1.wordlists).filter((lang) => {
          if (lang === "JA" || lang === "EN") {
            return false;
          }
          return _wordlists_1.wordlists[lang].every((word, index) => word === DEFAULT_WORDLIST[index]);
        })[0];
      }
      exports.getDefaultWordlist = getDefaultWordlist;
      var _wordlists_2 = require_wordlists();
      exports.wordlists = _wordlists_2.wordlists;
    }
  });

  // node_modules/elliptic/package.json
  var require_package = __commonJS({
    "node_modules/elliptic/package.json"(exports, module) {
      module.exports = {
        name: "elliptic",
        version: "6.6.1",
        description: "EC cryptography",
        main: "lib/elliptic.js",
        files: [
          "lib"
        ],
        scripts: {
          lint: "eslint lib test",
          "lint:fix": "npm run lint -- --fix",
          unit: "istanbul test _mocha --reporter=spec test/index.js",
          test: "npm run lint && npm run unit",
          version: "grunt dist && git add dist/"
        },
        repository: {
          type: "git",
          url: "git@github.com:indutny/elliptic"
        },
        keywords: [
          "EC",
          "Elliptic",
          "curve",
          "Cryptography"
        ],
        author: "Fedor Indutny <fedor@indutny.com>",
        license: "MIT",
        bugs: {
          url: "https://github.com/indutny/elliptic/issues"
        },
        homepage: "https://github.com/indutny/elliptic",
        devDependencies: {
          brfs: "^2.0.2",
          coveralls: "^3.1.0",
          eslint: "^7.6.0",
          grunt: "^1.2.1",
          "grunt-browserify": "^5.3.0",
          "grunt-cli": "^1.3.2",
          "grunt-contrib-connect": "^3.0.0",
          "grunt-contrib-copy": "^1.0.0",
          "grunt-contrib-uglify": "^5.0.0",
          "grunt-mocha-istanbul": "^5.0.2",
          "grunt-saucelabs": "^9.0.1",
          istanbul: "^0.4.5",
          mocha: "^8.0.1"
        },
        dependencies: {
          "bn.js": "^4.11.9",
          brorand: "^1.1.0",
          "hash.js": "^1.0.0",
          "hmac-drbg": "^1.0.1",
          inherits: "^2.0.4",
          "minimalistic-assert": "^1.0.1",
          "minimalistic-crypto-utils": "^1.0.1"
        }
      };
    }
  });

  // (disabled):buffer
  var require_buffer = __commonJS({
    "(disabled):buffer"() {
    }
  });

  // node_modules/bn.js/lib/bn.js
  var require_bn = __commonJS({
    "node_modules/bn.js/lib/bn.js"(exports, module) {
      (function(module2, exports2) {
        "use strict";
        function assert(val, msg) {
          if (!val) throw new Error(msg || "Assertion failed");
        }
        function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
        function BN(number, base, endian) {
          if (BN.isBN(number)) {
            return number;
          }
          this.negative = 0;
          this.words = null;
          this.length = 0;
          this.red = null;
          if (number !== null) {
            if (base === "le" || base === "be") {
              endian = base;
              base = 10;
            }
            this._init(number || 0, base || 10, endian || "be");
          }
        }
        if (typeof module2 === "object") {
          module2.exports = BN;
        } else {
          exports2.BN = BN;
        }
        BN.BN = BN;
        BN.wordSize = 26;
        var Buffer2;
        try {
          if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
            Buffer2 = window.Buffer;
          } else {
            Buffer2 = require_buffer().Buffer;
          }
        } catch (e) {
        }
        BN.isBN = function isBN(num) {
          if (num instanceof BN) {
            return true;
          }
          return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
        };
        BN.max = function max(left, right) {
          if (left.cmp(right) > 0) return left;
          return right;
        };
        BN.min = function min(left, right) {
          if (left.cmp(right) < 0) return left;
          return right;
        };
        BN.prototype._init = function init(number, base, endian) {
          if (typeof number === "number") {
            return this._initNumber(number, base, endian);
          }
          if (typeof number === "object") {
            return this._initArray(number, base, endian);
          }
          if (base === "hex") {
            base = 16;
          }
          assert(base === (base | 0) && base >= 2 && base <= 36);
          number = number.toString().replace(/\s+/g, "");
          var start = 0;
          if (number[0] === "-") {
            start++;
            this.negative = 1;
          }
          if (start < number.length) {
            if (base === 16) {
              this._parseHex(number, start, endian);
            } else {
              this._parseBase(number, base, start);
              if (endian === "le") {
                this._initArray(this.toArray(), base, endian);
              }
            }
          }
        };
        BN.prototype._initNumber = function _initNumber(number, base, endian) {
          if (number < 0) {
            this.negative = 1;
            number = -number;
          }
          if (number < 67108864) {
            this.words = [number & 67108863];
            this.length = 1;
          } else if (number < 4503599627370496) {
            this.words = [
              number & 67108863,
              number / 67108864 & 67108863
            ];
            this.length = 2;
          } else {
            assert(number < 9007199254740992);
            this.words = [
              number & 67108863,
              number / 67108864 & 67108863,
              1
            ];
            this.length = 3;
          }
          if (endian !== "le") return;
          this._initArray(this.toArray(), base, endian);
        };
        BN.prototype._initArray = function _initArray(number, base, endian) {
          assert(typeof number.length === "number");
          if (number.length <= 0) {
            this.words = [0];
            this.length = 1;
            return this;
          }
          this.length = Math.ceil(number.length / 3);
          this.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            this.words[i] = 0;
          }
          var j, w;
          var off = 0;
          if (endian === "be") {
            for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
              w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
              this.words[j] |= w << off & 67108863;
              this.words[j + 1] = w >>> 26 - off & 67108863;
              off += 24;
              if (off >= 26) {
                off -= 26;
                j++;
              }
            }
          } else if (endian === "le") {
            for (i = 0, j = 0; i < number.length; i += 3) {
              w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
              this.words[j] |= w << off & 67108863;
              this.words[j + 1] = w >>> 26 - off & 67108863;
              off += 24;
              if (off >= 26) {
                off -= 26;
                j++;
              }
            }
          }
          return this.strip();
        };
        function parseHex4Bits(string, index) {
          var c = string.charCodeAt(index);
          if (c >= 65 && c <= 70) {
            return c - 55;
          } else if (c >= 97 && c <= 102) {
            return c - 87;
          } else {
            return c - 48 & 15;
          }
        }
        function parseHexByte(string, lowerBound, index) {
          var r = parseHex4Bits(string, index);
          if (index - 1 >= lowerBound) {
            r |= parseHex4Bits(string, index - 1) << 4;
          }
          return r;
        }
        BN.prototype._parseHex = function _parseHex(number, start, endian) {
          this.length = Math.ceil((number.length - start) / 6);
          this.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            this.words[i] = 0;
          }
          var off = 0;
          var j = 0;
          var w;
          if (endian === "be") {
            for (i = number.length - 1; i >= start; i -= 2) {
              w = parseHexByte(number, start, i) << off;
              this.words[j] |= w & 67108863;
              if (off >= 18) {
                off -= 18;
                j += 1;
                this.words[j] |= w >>> 26;
              } else {
                off += 8;
              }
            }
          } else {
            var parseLength = number.length - start;
            for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
              w = parseHexByte(number, start, i) << off;
              this.words[j] |= w & 67108863;
              if (off >= 18) {
                off -= 18;
                j += 1;
                this.words[j] |= w >>> 26;
              } else {
                off += 8;
              }
            }
          }
          this.strip();
        };
        function parseBase(str, start, end, mul) {
          var r = 0;
          var len = Math.min(str.length, end);
          for (var i = start; i < len; i++) {
            var c = str.charCodeAt(i) - 48;
            r *= mul;
            if (c >= 49) {
              r += c - 49 + 10;
            } else if (c >= 17) {
              r += c - 17 + 10;
            } else {
              r += c;
            }
          }
          return r;
        }
        BN.prototype._parseBase = function _parseBase(number, base, start) {
          this.words = [0];
          this.length = 1;
          for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
            limbLen++;
          }
          limbLen--;
          limbPow = limbPow / base | 0;
          var total = number.length - start;
          var mod = total % limbLen;
          var end = Math.min(total, total - mod) + start;
          var word = 0;
          for (var i = start; i < end; i += limbLen) {
            word = parseBase(number, i, i + limbLen, base);
            this.imuln(limbPow);
            if (this.words[0] + word < 67108864) {
              this.words[0] += word;
            } else {
              this._iaddn(word);
            }
          }
          if (mod !== 0) {
            var pow = 1;
            word = parseBase(number, i, number.length, base);
            for (i = 0; i < mod; i++) {
              pow *= base;
            }
            this.imuln(pow);
            if (this.words[0] + word < 67108864) {
              this.words[0] += word;
            } else {
              this._iaddn(word);
            }
          }
          this.strip();
        };
        BN.prototype.copy = function copy(dest) {
          dest.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            dest.words[i] = this.words[i];
          }
          dest.length = this.length;
          dest.negative = this.negative;
          dest.red = this.red;
        };
        BN.prototype.clone = function clone() {
          var r = new BN(null);
          this.copy(r);
          return r;
        };
        BN.prototype._expand = function _expand(size) {
          while (this.length < size) {
            this.words[this.length++] = 0;
          }
          return this;
        };
        BN.prototype.strip = function strip() {
          while (this.length > 1 && this.words[this.length - 1] === 0) {
            this.length--;
          }
          return this._normSign();
        };
        BN.prototype._normSign = function _normSign() {
          if (this.length === 1 && this.words[0] === 0) {
            this.negative = 0;
          }
          return this;
        };
        BN.prototype.inspect = function inspect() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        };
        var zeros = [
          "",
          "0",
          "00",
          "000",
          "0000",
          "00000",
          "000000",
          "0000000",
          "00000000",
          "000000000",
          "0000000000",
          "00000000000",
          "000000000000",
          "0000000000000",
          "00000000000000",
          "000000000000000",
          "0000000000000000",
          "00000000000000000",
          "000000000000000000",
          "0000000000000000000",
          "00000000000000000000",
          "000000000000000000000",
          "0000000000000000000000",
          "00000000000000000000000",
          "000000000000000000000000",
          "0000000000000000000000000"
        ];
        var groupSizes = [
          0,
          0,
          25,
          16,
          12,
          11,
          10,
          9,
          8,
          8,
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6,
          6,
          6,
          6,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ];
        var groupBases = [
          0,
          0,
          33554432,
          43046721,
          16777216,
          48828125,
          60466176,
          40353607,
          16777216,
          43046721,
          1e7,
          19487171,
          35831808,
          62748517,
          7529536,
          11390625,
          16777216,
          24137569,
          34012224,
          47045881,
          64e6,
          4084101,
          5153632,
          6436343,
          7962624,
          9765625,
          11881376,
          14348907,
          17210368,
          20511149,
          243e5,
          28629151,
          33554432,
          39135393,
          45435424,
          52521875,
          60466176
        ];
        BN.prototype.toString = function toString(base, padding) {
          base = base || 10;
          padding = padding | 0 || 1;
          var out;
          if (base === 16 || base === "hex") {
            out = "";
            var off = 0;
            var carry = 0;
            for (var i = 0; i < this.length; i++) {
              var w = this.words[i];
              var word = ((w << off | carry) & 16777215).toString(16);
              carry = w >>> 24 - off & 16777215;
              off += 2;
              if (off >= 26) {
                off -= 26;
                i--;
              }
              if (carry !== 0 || i !== this.length - 1) {
                out = zeros[6 - word.length] + word + out;
              } else {
                out = word + out;
              }
            }
            if (carry !== 0) {
              out = carry.toString(16) + out;
            }
            while (out.length % padding !== 0) {
              out = "0" + out;
            }
            if (this.negative !== 0) {
              out = "-" + out;
            }
            return out;
          }
          if (base === (base | 0) && base >= 2 && base <= 36) {
            var groupSize = groupSizes[base];
            var groupBase = groupBases[base];
            out = "";
            var c = this.clone();
            c.negative = 0;
            while (!c.isZero()) {
              var r = c.modn(groupBase).toString(base);
              c = c.idivn(groupBase);
              if (!c.isZero()) {
                out = zeros[groupSize - r.length] + r + out;
              } else {
                out = r + out;
              }
            }
            if (this.isZero()) {
              out = "0" + out;
            }
            while (out.length % padding !== 0) {
              out = "0" + out;
            }
            if (this.negative !== 0) {
              out = "-" + out;
            }
            return out;
          }
          assert(false, "Base should be between 2 and 36");
        };
        BN.prototype.toNumber = function toNumber() {
          var ret = this.words[0];
          if (this.length === 2) {
            ret += this.words[1] * 67108864;
          } else if (this.length === 3 && this.words[2] === 1) {
            ret += 4503599627370496 + this.words[1] * 67108864;
          } else if (this.length > 2) {
            assert(false, "Number can only safely store up to 53 bits");
          }
          return this.negative !== 0 ? -ret : ret;
        };
        BN.prototype.toJSON = function toJSON() {
          return this.toString(16);
        };
        BN.prototype.toBuffer = function toBuffer(endian, length) {
          assert(typeof Buffer2 !== "undefined");
          return this.toArrayLike(Buffer2, endian, length);
        };
        BN.prototype.toArray = function toArray(endian, length) {
          return this.toArrayLike(Array, endian, length);
        };
        BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
          var byteLength = this.byteLength();
          var reqLength = length || Math.max(1, byteLength);
          assert(byteLength <= reqLength, "byte array longer than desired length");
          assert(reqLength > 0, "Requested array length <= 0");
          this.strip();
          var littleEndian = endian === "le";
          var res = new ArrayType(reqLength);
          var b, i;
          var q = this.clone();
          if (!littleEndian) {
            for (i = 0; i < reqLength - byteLength; i++) {
              res[i] = 0;
            }
            for (i = 0; !q.isZero(); i++) {
              b = q.andln(255);
              q.iushrn(8);
              res[reqLength - i - 1] = b;
            }
          } else {
            for (i = 0; !q.isZero(); i++) {
              b = q.andln(255);
              q.iushrn(8);
              res[i] = b;
            }
            for (; i < reqLength; i++) {
              res[i] = 0;
            }
          }
          return res;
        };
        if (Math.clz32) {
          BN.prototype._countBits = function _countBits(w) {
            return 32 - Math.clz32(w);
          };
        } else {
          BN.prototype._countBits = function _countBits(w) {
            var t = w;
            var r = 0;
            if (t >= 4096) {
              r += 13;
              t >>>= 13;
            }
            if (t >= 64) {
              r += 7;
              t >>>= 7;
            }
            if (t >= 8) {
              r += 4;
              t >>>= 4;
            }
            if (t >= 2) {
              r += 2;
              t >>>= 2;
            }
            return r + t;
          };
        }
        BN.prototype._zeroBits = function _zeroBits(w) {
          if (w === 0) return 26;
          var t = w;
          var r = 0;
          if ((t & 8191) === 0) {
            r += 13;
            t >>>= 13;
          }
          if ((t & 127) === 0) {
            r += 7;
            t >>>= 7;
          }
          if ((t & 15) === 0) {
            r += 4;
            t >>>= 4;
          }
          if ((t & 3) === 0) {
            r += 2;
            t >>>= 2;
          }
          if ((t & 1) === 0) {
            r++;
          }
          return r;
        };
        BN.prototype.bitLength = function bitLength() {
          var w = this.words[this.length - 1];
          var hi = this._countBits(w);
          return (this.length - 1) * 26 + hi;
        };
        function toBitArray(num) {
          var w = new Array(num.bitLength());
          for (var bit = 0; bit < w.length; bit++) {
            var off = bit / 26 | 0;
            var wbit = bit % 26;
            w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
          }
          return w;
        }
        BN.prototype.zeroBits = function zeroBits() {
          if (this.isZero()) return 0;
          var r = 0;
          for (var i = 0; i < this.length; i++) {
            var b = this._zeroBits(this.words[i]);
            r += b;
            if (b !== 26) break;
          }
          return r;
        };
        BN.prototype.byteLength = function byteLength() {
          return Math.ceil(this.bitLength() / 8);
        };
        BN.prototype.toTwos = function toTwos(width) {
          if (this.negative !== 0) {
            return this.abs().inotn(width).iaddn(1);
          }
          return this.clone();
        };
        BN.prototype.fromTwos = function fromTwos(width) {
          if (this.testn(width - 1)) {
            return this.notn(width).iaddn(1).ineg();
          }
          return this.clone();
        };
        BN.prototype.isNeg = function isNeg() {
          return this.negative !== 0;
        };
        BN.prototype.neg = function neg() {
          return this.clone().ineg();
        };
        BN.prototype.ineg = function ineg() {
          if (!this.isZero()) {
            this.negative ^= 1;
          }
          return this;
        };
        BN.prototype.iuor = function iuor(num) {
          while (this.length < num.length) {
            this.words[this.length++] = 0;
          }
          for (var i = 0; i < num.length; i++) {
            this.words[i] = this.words[i] | num.words[i];
          }
          return this.strip();
        };
        BN.prototype.ior = function ior(num) {
          assert((this.negative | num.negative) === 0);
          return this.iuor(num);
        };
        BN.prototype.or = function or(num) {
          if (this.length > num.length) return this.clone().ior(num);
          return num.clone().ior(this);
        };
        BN.prototype.uor = function uor(num) {
          if (this.length > num.length) return this.clone().iuor(num);
          return num.clone().iuor(this);
        };
        BN.prototype.iuand = function iuand(num) {
          var b;
          if (this.length > num.length) {
            b = num;
          } else {
            b = this;
          }
          for (var i = 0; i < b.length; i++) {
            this.words[i] = this.words[i] & num.words[i];
          }
          this.length = b.length;
          return this.strip();
        };
        BN.prototype.iand = function iand(num) {
          assert((this.negative | num.negative) === 0);
          return this.iuand(num);
        };
        BN.prototype.and = function and(num) {
          if (this.length > num.length) return this.clone().iand(num);
          return num.clone().iand(this);
        };
        BN.prototype.uand = function uand(num) {
          if (this.length > num.length) return this.clone().iuand(num);
          return num.clone().iuand(this);
        };
        BN.prototype.iuxor = function iuxor(num) {
          var a;
          var b;
          if (this.length > num.length) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          for (var i = 0; i < b.length; i++) {
            this.words[i] = a.words[i] ^ b.words[i];
          }
          if (this !== a) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          this.length = a.length;
          return this.strip();
        };
        BN.prototype.ixor = function ixor(num) {
          assert((this.negative | num.negative) === 0);
          return this.iuxor(num);
        };
        BN.prototype.xor = function xor(num) {
          if (this.length > num.length) return this.clone().ixor(num);
          return num.clone().ixor(this);
        };
        BN.prototype.uxor = function uxor(num) {
          if (this.length > num.length) return this.clone().iuxor(num);
          return num.clone().iuxor(this);
        };
        BN.prototype.inotn = function inotn(width) {
          assert(typeof width === "number" && width >= 0);
          var bytesNeeded = Math.ceil(width / 26) | 0;
          var bitsLeft = width % 26;
          this._expand(bytesNeeded);
          if (bitsLeft > 0) {
            bytesNeeded--;
          }
          for (var i = 0; i < bytesNeeded; i++) {
            this.words[i] = ~this.words[i] & 67108863;
          }
          if (bitsLeft > 0) {
            this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
            i++;
          }
          for (; i < this.length; i++) {
            this.words[i] = 0;
          }
          return this.strip();
        };
        BN.prototype.notn = function notn(width) {
          return this.clone().inotn(width);
        };
        BN.prototype.setn = function setn(bit, val) {
          assert(typeof bit === "number" && bit >= 0);
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          this._expand(off + 1);
          if (val) {
            this.words[off] = this.words[off] | 1 << wbit;
          } else {
            this.words[off] = this.words[off] & ~(1 << wbit);
          }
          return this.strip();
        };
        BN.prototype.iadd = function iadd(num) {
          var r;
          if (this.negative !== 0 && num.negative === 0) {
            this.negative = 0;
            r = this.isub(num);
            this.negative ^= 1;
            return this._normSign();
          } else if (this.negative === 0 && num.negative !== 0) {
            num.negative = 0;
            r = this.isub(num);
            num.negative = 1;
            return r._normSign();
          }
          var a, b;
          if (this.length > num.length) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          var carry = 0;
          for (var i = 0; i < b.length; i++) {
            r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
            this.words[i] = r & 67108863;
            carry = r >>> 26;
          }
          for (; carry !== 0 && i < a.length; i++) {
            r = (a.words[i] | 0) + carry;
            this.words[i] = r & 67108863;
            carry = r >>> 26;
          }
          this.length = a.length;
          if (carry !== 0) {
            this.words[this.length] = carry;
            this.length++;
          } else if (a !== this) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          return this;
        };
        BN.prototype.add = function add(num) {
          var res;
          if (num.negative !== 0 && this.negative === 0) {
            num.negative = 0;
            res = this.sub(num);
            num.negative ^= 1;
            return res;
          } else if (num.negative === 0 && this.negative !== 0) {
            this.negative = 0;
            res = num.sub(this);
            this.negative = 1;
            return res;
          }
          if (this.length > num.length) return this.clone().iadd(num);
          return num.clone().iadd(this);
        };
        BN.prototype.isub = function isub(num) {
          if (num.negative !== 0) {
            num.negative = 0;
            var r = this.iadd(num);
            num.negative = 1;
            return r._normSign();
          } else if (this.negative !== 0) {
            this.negative = 0;
            this.iadd(num);
            this.negative = 1;
            return this._normSign();
          }
          var cmp = this.cmp(num);
          if (cmp === 0) {
            this.negative = 0;
            this.length = 1;
            this.words[0] = 0;
            return this;
          }
          var a, b;
          if (cmp > 0) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          var carry = 0;
          for (var i = 0; i < b.length; i++) {
            r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
            carry = r >> 26;
            this.words[i] = r & 67108863;
          }
          for (; carry !== 0 && i < a.length; i++) {
            r = (a.words[i] | 0) + carry;
            carry = r >> 26;
            this.words[i] = r & 67108863;
          }
          if (carry === 0 && i < a.length && a !== this) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          this.length = Math.max(this.length, i);
          if (a !== this) {
            this.negative = 1;
          }
          return this.strip();
        };
        BN.prototype.sub = function sub(num) {
          return this.clone().isub(num);
        };
        function smallMulTo(self2, num, out) {
          out.negative = num.negative ^ self2.negative;
          var len = self2.length + num.length | 0;
          out.length = len;
          len = len - 1 | 0;
          var a = self2.words[0] | 0;
          var b = num.words[0] | 0;
          var r = a * b;
          var lo = r & 67108863;
          var carry = r / 67108864 | 0;
          out.words[0] = lo;
          for (var k = 1; k < len; k++) {
            var ncarry = carry >>> 26;
            var rword = carry & 67108863;
            var maxJ = Math.min(k, num.length - 1);
            for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
              var i = k - j | 0;
              a = self2.words[i] | 0;
              b = num.words[j] | 0;
              r = a * b + rword;
              ncarry += r / 67108864 | 0;
              rword = r & 67108863;
            }
            out.words[k] = rword | 0;
            carry = ncarry | 0;
          }
          if (carry !== 0) {
            out.words[k] = carry | 0;
          } else {
            out.length--;
          }
          return out.strip();
        }
        var comb10MulTo = function comb10MulTo2(self2, num, out) {
          var a = self2.words;
          var b = num.words;
          var o = out.words;
          var c = 0;
          var lo;
          var mid;
          var hi;
          var a0 = a[0] | 0;
          var al0 = a0 & 8191;
          var ah0 = a0 >>> 13;
          var a1 = a[1] | 0;
          var al1 = a1 & 8191;
          var ah1 = a1 >>> 13;
          var a2 = a[2] | 0;
          var al2 = a2 & 8191;
          var ah2 = a2 >>> 13;
          var a3 = a[3] | 0;
          var al3 = a3 & 8191;
          var ah3 = a3 >>> 13;
          var a4 = a[4] | 0;
          var al4 = a4 & 8191;
          var ah4 = a4 >>> 13;
          var a5 = a[5] | 0;
          var al5 = a5 & 8191;
          var ah5 = a5 >>> 13;
          var a6 = a[6] | 0;
          var al6 = a6 & 8191;
          var ah6 = a6 >>> 13;
          var a7 = a[7] | 0;
          var al7 = a7 & 8191;
          var ah7 = a7 >>> 13;
          var a8 = a[8] | 0;
          var al8 = a8 & 8191;
          var ah8 = a8 >>> 13;
          var a9 = a[9] | 0;
          var al9 = a9 & 8191;
          var ah9 = a9 >>> 13;
          var b0 = b[0] | 0;
          var bl0 = b0 & 8191;
          var bh0 = b0 >>> 13;
          var b1 = b[1] | 0;
          var bl1 = b1 & 8191;
          var bh1 = b1 >>> 13;
          var b2 = b[2] | 0;
          var bl2 = b2 & 8191;
          var bh2 = b2 >>> 13;
          var b3 = b[3] | 0;
          var bl3 = b3 & 8191;
          var bh3 = b3 >>> 13;
          var b4 = b[4] | 0;
          var bl4 = b4 & 8191;
          var bh4 = b4 >>> 13;
          var b5 = b[5] | 0;
          var bl5 = b5 & 8191;
          var bh5 = b5 >>> 13;
          var b6 = b[6] | 0;
          var bl6 = b6 & 8191;
          var bh6 = b6 >>> 13;
          var b7 = b[7] | 0;
          var bl7 = b7 & 8191;
          var bh7 = b7 >>> 13;
          var b8 = b[8] | 0;
          var bl8 = b8 & 8191;
          var bh8 = b8 >>> 13;
          var b9 = b[9] | 0;
          var bl9 = b9 & 8191;
          var bh9 = b9 >>> 13;
          out.negative = self2.negative ^ num.negative;
          out.length = 19;
          lo = Math.imul(al0, bl0);
          mid = Math.imul(al0, bh0);
          mid = mid + Math.imul(ah0, bl0) | 0;
          hi = Math.imul(ah0, bh0);
          var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
          w0 &= 67108863;
          lo = Math.imul(al1, bl0);
          mid = Math.imul(al1, bh0);
          mid = mid + Math.imul(ah1, bl0) | 0;
          hi = Math.imul(ah1, bh0);
          lo = lo + Math.imul(al0, bl1) | 0;
          mid = mid + Math.imul(al0, bh1) | 0;
          mid = mid + Math.imul(ah0, bl1) | 0;
          hi = hi + Math.imul(ah0, bh1) | 0;
          var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
          w1 &= 67108863;
          lo = Math.imul(al2, bl0);
          mid = Math.imul(al2, bh0);
          mid = mid + Math.imul(ah2, bl0) | 0;
          hi = Math.imul(ah2, bh0);
          lo = lo + Math.imul(al1, bl1) | 0;
          mid = mid + Math.imul(al1, bh1) | 0;
          mid = mid + Math.imul(ah1, bl1) | 0;
          hi = hi + Math.imul(ah1, bh1) | 0;
          lo = lo + Math.imul(al0, bl2) | 0;
          mid = mid + Math.imul(al0, bh2) | 0;
          mid = mid + Math.imul(ah0, bl2) | 0;
          hi = hi + Math.imul(ah0, bh2) | 0;
          var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
          w2 &= 67108863;
          lo = Math.imul(al3, bl0);
          mid = Math.imul(al3, bh0);
          mid = mid + Math.imul(ah3, bl0) | 0;
          hi = Math.imul(ah3, bh0);
          lo = lo + Math.imul(al2, bl1) | 0;
          mid = mid + Math.imul(al2, bh1) | 0;
          mid = mid + Math.imul(ah2, bl1) | 0;
          hi = hi + Math.imul(ah2, bh1) | 0;
          lo = lo + Math.imul(al1, bl2) | 0;
          mid = mid + Math.imul(al1, bh2) | 0;
          mid = mid + Math.imul(ah1, bl2) | 0;
          hi = hi + Math.imul(ah1, bh2) | 0;
          lo = lo + Math.imul(al0, bl3) | 0;
          mid = mid + Math.imul(al0, bh3) | 0;
          mid = mid + Math.imul(ah0, bl3) | 0;
          hi = hi + Math.imul(ah0, bh3) | 0;
          var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
          w3 &= 67108863;
          lo = Math.imul(al4, bl0);
          mid = Math.imul(al4, bh0);
          mid = mid + Math.imul(ah4, bl0) | 0;
          hi = Math.imul(ah4, bh0);
          lo = lo + Math.imul(al3, bl1) | 0;
          mid = mid + Math.imul(al3, bh1) | 0;
          mid = mid + Math.imul(ah3, bl1) | 0;
          hi = hi + Math.imul(ah3, bh1) | 0;
          lo = lo + Math.imul(al2, bl2) | 0;
          mid = mid + Math.imul(al2, bh2) | 0;
          mid = mid + Math.imul(ah2, bl2) | 0;
          hi = hi + Math.imul(ah2, bh2) | 0;
          lo = lo + Math.imul(al1, bl3) | 0;
          mid = mid + Math.imul(al1, bh3) | 0;
          mid = mid + Math.imul(ah1, bl3) | 0;
          hi = hi + Math.imul(ah1, bh3) | 0;
          lo = lo + Math.imul(al0, bl4) | 0;
          mid = mid + Math.imul(al0, bh4) | 0;
          mid = mid + Math.imul(ah0, bl4) | 0;
          hi = hi + Math.imul(ah0, bh4) | 0;
          var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
          w4 &= 67108863;
          lo = Math.imul(al5, bl0);
          mid = Math.imul(al5, bh0);
          mid = mid + Math.imul(ah5, bl0) | 0;
          hi = Math.imul(ah5, bh0);
          lo = lo + Math.imul(al4, bl1) | 0;
          mid = mid + Math.imul(al4, bh1) | 0;
          mid = mid + Math.imul(ah4, bl1) | 0;
          hi = hi + Math.imul(ah4, bh1) | 0;
          lo = lo + Math.imul(al3, bl2) | 0;
          mid = mid + Math.imul(al3, bh2) | 0;
          mid = mid + Math.imul(ah3, bl2) | 0;
          hi = hi + Math.imul(ah3, bh2) | 0;
          lo = lo + Math.imul(al2, bl3) | 0;
          mid = mid + Math.imul(al2, bh3) | 0;
          mid = mid + Math.imul(ah2, bl3) | 0;
          hi = hi + Math.imul(ah2, bh3) | 0;
          lo = lo + Math.imul(al1, bl4) | 0;
          mid = mid + Math.imul(al1, bh4) | 0;
          mid = mid + Math.imul(ah1, bl4) | 0;
          hi = hi + Math.imul(ah1, bh4) | 0;
          lo = lo + Math.imul(al0, bl5) | 0;
          mid = mid + Math.imul(al0, bh5) | 0;
          mid = mid + Math.imul(ah0, bl5) | 0;
          hi = hi + Math.imul(ah0, bh5) | 0;
          var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
          w5 &= 67108863;
          lo = Math.imul(al6, bl0);
          mid = Math.imul(al6, bh0);
          mid = mid + Math.imul(ah6, bl0) | 0;
          hi = Math.imul(ah6, bh0);
          lo = lo + Math.imul(al5, bl1) | 0;
          mid = mid + Math.imul(al5, bh1) | 0;
          mid = mid + Math.imul(ah5, bl1) | 0;
          hi = hi + Math.imul(ah5, bh1) | 0;
          lo = lo + Math.imul(al4, bl2) | 0;
          mid = mid + Math.imul(al4, bh2) | 0;
          mid = mid + Math.imul(ah4, bl2) | 0;
          hi = hi + Math.imul(ah4, bh2) | 0;
          lo = lo + Math.imul(al3, bl3) | 0;
          mid = mid + Math.imul(al3, bh3) | 0;
          mid = mid + Math.imul(ah3, bl3) | 0;
          hi = hi + Math.imul(ah3, bh3) | 0;
          lo = lo + Math.imul(al2, bl4) | 0;
          mid = mid + Math.imul(al2, bh4) | 0;
          mid = mid + Math.imul(ah2, bl4) | 0;
          hi = hi + Math.imul(ah2, bh4) | 0;
          lo = lo + Math.imul(al1, bl5) | 0;
          mid = mid + Math.imul(al1, bh5) | 0;
          mid = mid + Math.imul(ah1, bl5) | 0;
          hi = hi + Math.imul(ah1, bh5) | 0;
          lo = lo + Math.imul(al0, bl6) | 0;
          mid = mid + Math.imul(al0, bh6) | 0;
          mid = mid + Math.imul(ah0, bl6) | 0;
          hi = hi + Math.imul(ah0, bh6) | 0;
          var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
          w6 &= 67108863;
          lo = Math.imul(al7, bl0);
          mid = Math.imul(al7, bh0);
          mid = mid + Math.imul(ah7, bl0) | 0;
          hi = Math.imul(ah7, bh0);
          lo = lo + Math.imul(al6, bl1) | 0;
          mid = mid + Math.imul(al6, bh1) | 0;
          mid = mid + Math.imul(ah6, bl1) | 0;
          hi = hi + Math.imul(ah6, bh1) | 0;
          lo = lo + Math.imul(al5, bl2) | 0;
          mid = mid + Math.imul(al5, bh2) | 0;
          mid = mid + Math.imul(ah5, bl2) | 0;
          hi = hi + Math.imul(ah5, bh2) | 0;
          lo = lo + Math.imul(al4, bl3) | 0;
          mid = mid + Math.imul(al4, bh3) | 0;
          mid = mid + Math.imul(ah4, bl3) | 0;
          hi = hi + Math.imul(ah4, bh3) | 0;
          lo = lo + Math.imul(al3, bl4) | 0;
          mid = mid + Math.imul(al3, bh4) | 0;
          mid = mid + Math.imul(ah3, bl4) | 0;
          hi = hi + Math.imul(ah3, bh4) | 0;
          lo = lo + Math.imul(al2, bl5) | 0;
          mid = mid + Math.imul(al2, bh5) | 0;
          mid = mid + Math.imul(ah2, bl5) | 0;
          hi = hi + Math.imul(ah2, bh5) | 0;
          lo = lo + Math.imul(al1, bl6) | 0;
          mid = mid + Math.imul(al1, bh6) | 0;
          mid = mid + Math.imul(ah1, bl6) | 0;
          hi = hi + Math.imul(ah1, bh6) | 0;
          lo = lo + Math.imul(al0, bl7) | 0;
          mid = mid + Math.imul(al0, bh7) | 0;
          mid = mid + Math.imul(ah0, bl7) | 0;
          hi = hi + Math.imul(ah0, bh7) | 0;
          var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
          w7 &= 67108863;
          lo = Math.imul(al8, bl0);
          mid = Math.imul(al8, bh0);
          mid = mid + Math.imul(ah8, bl0) | 0;
          hi = Math.imul(ah8, bh0);
          lo = lo + Math.imul(al7, bl1) | 0;
          mid = mid + Math.imul(al7, bh1) | 0;
          mid = mid + Math.imul(ah7, bl1) | 0;
          hi = hi + Math.imul(ah7, bh1) | 0;
          lo = lo + Math.imul(al6, bl2) | 0;
          mid = mid + Math.imul(al6, bh2) | 0;
          mid = mid + Math.imul(ah6, bl2) | 0;
          hi = hi + Math.imul(ah6, bh2) | 0;
          lo = lo + Math.imul(al5, bl3) | 0;
          mid = mid + Math.imul(al5, bh3) | 0;
          mid = mid + Math.imul(ah5, bl3) | 0;
          hi = hi + Math.imul(ah5, bh3) | 0;
          lo = lo + Math.imul(al4, bl4) | 0;
          mid = mid + Math.imul(al4, bh4) | 0;
          mid = mid + Math.imul(ah4, bl4) | 0;
          hi = hi + Math.imul(ah4, bh4) | 0;
          lo = lo + Math.imul(al3, bl5) | 0;
          mid = mid + Math.imul(al3, bh5) | 0;
          mid = mid + Math.imul(ah3, bl5) | 0;
          hi = hi + Math.imul(ah3, bh5) | 0;
          lo = lo + Math.imul(al2, bl6) | 0;
          mid = mid + Math.imul(al2, bh6) | 0;
          mid = mid + Math.imul(ah2, bl6) | 0;
          hi = hi + Math.imul(ah2, bh6) | 0;
          lo = lo + Math.imul(al1, bl7) | 0;
          mid = mid + Math.imul(al1, bh7) | 0;
          mid = mid + Math.imul(ah1, bl7) | 0;
          hi = hi + Math.imul(ah1, bh7) | 0;
          lo = lo + Math.imul(al0, bl8) | 0;
          mid = mid + Math.imul(al0, bh8) | 0;
          mid = mid + Math.imul(ah0, bl8) | 0;
          hi = hi + Math.imul(ah0, bh8) | 0;
          var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
          w8 &= 67108863;
          lo = Math.imul(al9, bl0);
          mid = Math.imul(al9, bh0);
          mid = mid + Math.imul(ah9, bl0) | 0;
          hi = Math.imul(ah9, bh0);
          lo = lo + Math.imul(al8, bl1) | 0;
          mid = mid + Math.imul(al8, bh1) | 0;
          mid = mid + Math.imul(ah8, bl1) | 0;
          hi = hi + Math.imul(ah8, bh1) | 0;
          lo = lo + Math.imul(al7, bl2) | 0;
          mid = mid + Math.imul(al7, bh2) | 0;
          mid = mid + Math.imul(ah7, bl2) | 0;
          hi = hi + Math.imul(ah7, bh2) | 0;
          lo = lo + Math.imul(al6, bl3) | 0;
          mid = mid + Math.imul(al6, bh3) | 0;
          mid = mid + Math.imul(ah6, bl3) | 0;
          hi = hi + Math.imul(ah6, bh3) | 0;
          lo = lo + Math.imul(al5, bl4) | 0;
          mid = mid + Math.imul(al5, bh4) | 0;
          mid = mid + Math.imul(ah5, bl4) | 0;
          hi = hi + Math.imul(ah5, bh4) | 0;
          lo = lo + Math.imul(al4, bl5) | 0;
          mid = mid + Math.imul(al4, bh5) | 0;
          mid = mid + Math.imul(ah4, bl5) | 0;
          hi = hi + Math.imul(ah4, bh5) | 0;
          lo = lo + Math.imul(al3, bl6) | 0;
          mid = mid + Math.imul(al3, bh6) | 0;
          mid = mid + Math.imul(ah3, bl6) | 0;
          hi = hi + Math.imul(ah3, bh6) | 0;
          lo = lo + Math.imul(al2, bl7) | 0;
          mid = mid + Math.imul(al2, bh7) | 0;
          mid = mid + Math.imul(ah2, bl7) | 0;
          hi = hi + Math.imul(ah2, bh7) | 0;
          lo = lo + Math.imul(al1, bl8) | 0;
          mid = mid + Math.imul(al1, bh8) | 0;
          mid = mid + Math.imul(ah1, bl8) | 0;
          hi = hi + Math.imul(ah1, bh8) | 0;
          lo = lo + Math.imul(al0, bl9) | 0;
          mid = mid + Math.imul(al0, bh9) | 0;
          mid = mid + Math.imul(ah0, bl9) | 0;
          hi = hi + Math.imul(ah0, bh9) | 0;
          var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
          w9 &= 67108863;
          lo = Math.imul(al9, bl1);
          mid = Math.imul(al9, bh1);
          mid = mid + Math.imul(ah9, bl1) | 0;
          hi = Math.imul(ah9, bh1);
          lo = lo + Math.imul(al8, bl2) | 0;
          mid = mid + Math.imul(al8, bh2) | 0;
          mid = mid + Math.imul(ah8, bl2) | 0;
          hi = hi + Math.imul(ah8, bh2) | 0;
          lo = lo + Math.imul(al7, bl3) | 0;
          mid = mid + Math.imul(al7, bh3) | 0;
          mid = mid + Math.imul(ah7, bl3) | 0;
          hi = hi + Math.imul(ah7, bh3) | 0;
          lo = lo + Math.imul(al6, bl4) | 0;
          mid = mid + Math.imul(al6, bh4) | 0;
          mid = mid + Math.imul(ah6, bl4) | 0;
          hi = hi + Math.imul(ah6, bh4) | 0;
          lo = lo + Math.imul(al5, bl5) | 0;
          mid = mid + Math.imul(al5, bh5) | 0;
          mid = mid + Math.imul(ah5, bl5) | 0;
          hi = hi + Math.imul(ah5, bh5) | 0;
          lo = lo + Math.imul(al4, bl6) | 0;
          mid = mid + Math.imul(al4, bh6) | 0;
          mid = mid + Math.imul(ah4, bl6) | 0;
          hi = hi + Math.imul(ah4, bh6) | 0;
          lo = lo + Math.imul(al3, bl7) | 0;
          mid = mid + Math.imul(al3, bh7) | 0;
          mid = mid + Math.imul(ah3, bl7) | 0;
          hi = hi + Math.imul(ah3, bh7) | 0;
          lo = lo + Math.imul(al2, bl8) | 0;
          mid = mid + Math.imul(al2, bh8) | 0;
          mid = mid + Math.imul(ah2, bl8) | 0;
          hi = hi + Math.imul(ah2, bh8) | 0;
          lo = lo + Math.imul(al1, bl9) | 0;
          mid = mid + Math.imul(al1, bh9) | 0;
          mid = mid + Math.imul(ah1, bl9) | 0;
          hi = hi + Math.imul(ah1, bh9) | 0;
          var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
          w10 &= 67108863;
          lo = Math.imul(al9, bl2);
          mid = Math.imul(al9, bh2);
          mid = mid + Math.imul(ah9, bl2) | 0;
          hi = Math.imul(ah9, bh2);
          lo = lo + Math.imul(al8, bl3) | 0;
          mid = mid + Math.imul(al8, bh3) | 0;
          mid = mid + Math.imul(ah8, bl3) | 0;
          hi = hi + Math.imul(ah8, bh3) | 0;
          lo = lo + Math.imul(al7, bl4) | 0;
          mid = mid + Math.imul(al7, bh4) | 0;
          mid = mid + Math.imul(ah7, bl4) | 0;
          hi = hi + Math.imul(ah7, bh4) | 0;
          lo = lo + Math.imul(al6, bl5) | 0;
          mid = mid + Math.imul(al6, bh5) | 0;
          mid = mid + Math.imul(ah6, bl5) | 0;
          hi = hi + Math.imul(ah6, bh5) | 0;
          lo = lo + Math.imul(al5, bl6) | 0;
          mid = mid + Math.imul(al5, bh6) | 0;
          mid = mid + Math.imul(ah5, bl6) | 0;
          hi = hi + Math.imul(ah5, bh6) | 0;
          lo = lo + Math.imul(al4, bl7) | 0;
          mid = mid + Math.imul(al4, bh7) | 0;
          mid = mid + Math.imul(ah4, bl7) | 0;
          hi = hi + Math.imul(ah4, bh7) | 0;
          lo = lo + Math.imul(al3, bl8) | 0;
          mid = mid + Math.imul(al3, bh8) | 0;
          mid = mid + Math.imul(ah3, bl8) | 0;
          hi = hi + Math.imul(ah3, bh8) | 0;
          lo = lo + Math.imul(al2, bl9) | 0;
          mid = mid + Math.imul(al2, bh9) | 0;
          mid = mid + Math.imul(ah2, bl9) | 0;
          hi = hi + Math.imul(ah2, bh9) | 0;
          var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
          w11 &= 67108863;
          lo = Math.imul(al9, bl3);
          mid = Math.imul(al9, bh3);
          mid = mid + Math.imul(ah9, bl3) | 0;
          hi = Math.imul(ah9, bh3);
          lo = lo + Math.imul(al8, bl4) | 0;
          mid = mid + Math.imul(al8, bh4) | 0;
          mid = mid + Math.imul(ah8, bl4) | 0;
          hi = hi + Math.imul(ah8, bh4) | 0;
          lo = lo + Math.imul(al7, bl5) | 0;
          mid = mid + Math.imul(al7, bh5) | 0;
          mid = mid + Math.imul(ah7, bl5) | 0;
          hi = hi + Math.imul(ah7, bh5) | 0;
          lo = lo + Math.imul(al6, bl6) | 0;
          mid = mid + Math.imul(al6, bh6) | 0;
          mid = mid + Math.imul(ah6, bl6) | 0;
          hi = hi + Math.imul(ah6, bh6) | 0;
          lo = lo + Math.imul(al5, bl7) | 0;
          mid = mid + Math.imul(al5, bh7) | 0;
          mid = mid + Math.imul(ah5, bl7) | 0;
          hi = hi + Math.imul(ah5, bh7) | 0;
          lo = lo + Math.imul(al4, bl8) | 0;
          mid = mid + Math.imul(al4, bh8) | 0;
          mid = mid + Math.imul(ah4, bl8) | 0;
          hi = hi + Math.imul(ah4, bh8) | 0;
          lo = lo + Math.imul(al3, bl9) | 0;
          mid = mid + Math.imul(al3, bh9) | 0;
          mid = mid + Math.imul(ah3, bl9) | 0;
          hi = hi + Math.imul(ah3, bh9) | 0;
          var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
          w12 &= 67108863;
          lo = Math.imul(al9, bl4);
          mid = Math.imul(al9, bh4);
          mid = mid + Math.imul(ah9, bl4) | 0;
          hi = Math.imul(ah9, bh4);
          lo = lo + Math.imul(al8, bl5) | 0;
          mid = mid + Math.imul(al8, bh5) | 0;
          mid = mid + Math.imul(ah8, bl5) | 0;
          hi = hi + Math.imul(ah8, bh5) | 0;
          lo = lo + Math.imul(al7, bl6) | 0;
          mid = mid + Math.imul(al7, bh6) | 0;
          mid = mid + Math.imul(ah7, bl6) | 0;
          hi = hi + Math.imul(ah7, bh6) | 0;
          lo = lo + Math.imul(al6, bl7) | 0;
          mid = mid + Math.imul(al6, bh7) | 0;
          mid = mid + Math.imul(ah6, bl7) | 0;
          hi = hi + Math.imul(ah6, bh7) | 0;
          lo = lo + Math.imul(al5, bl8) | 0;
          mid = mid + Math.imul(al5, bh8) | 0;
          mid = mid + Math.imul(ah5, bl8) | 0;
          hi = hi + Math.imul(ah5, bh8) | 0;
          lo = lo + Math.imul(al4, bl9) | 0;
          mid = mid + Math.imul(al4, bh9) | 0;
          mid = mid + Math.imul(ah4, bl9) | 0;
          hi = hi + Math.imul(ah4, bh9) | 0;
          var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
          w13 &= 67108863;
          lo = Math.imul(al9, bl5);
          mid = Math.imul(al9, bh5);
          mid = mid + Math.imul(ah9, bl5) | 0;
          hi = Math.imul(ah9, bh5);
          lo = lo + Math.imul(al8, bl6) | 0;
          mid = mid + Math.imul(al8, bh6) | 0;
          mid = mid + Math.imul(ah8, bl6) | 0;
          hi = hi + Math.imul(ah8, bh6) | 0;
          lo = lo + Math.imul(al7, bl7) | 0;
          mid = mid + Math.imul(al7, bh7) | 0;
          mid = mid + Math.imul(ah7, bl7) | 0;
          hi = hi + Math.imul(ah7, bh7) | 0;
          lo = lo + Math.imul(al6, bl8) | 0;
          mid = mid + Math.imul(al6, bh8) | 0;
          mid = mid + Math.imul(ah6, bl8) | 0;
          hi = hi + Math.imul(ah6, bh8) | 0;
          lo = lo + Math.imul(al5, bl9) | 0;
          mid = mid + Math.imul(al5, bh9) | 0;
          mid = mid + Math.imul(ah5, bl9) | 0;
          hi = hi + Math.imul(ah5, bh9) | 0;
          var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
          w14 &= 67108863;
          lo = Math.imul(al9, bl6);
          mid = Math.imul(al9, bh6);
          mid = mid + Math.imul(ah9, bl6) | 0;
          hi = Math.imul(ah9, bh6);
          lo = lo + Math.imul(al8, bl7) | 0;
          mid = mid + Math.imul(al8, bh7) | 0;
          mid = mid + Math.imul(ah8, bl7) | 0;
          hi = hi + Math.imul(ah8, bh7) | 0;
          lo = lo + Math.imul(al7, bl8) | 0;
          mid = mid + Math.imul(al7, bh8) | 0;
          mid = mid + Math.imul(ah7, bl8) | 0;
          hi = hi + Math.imul(ah7, bh8) | 0;
          lo = lo + Math.imul(al6, bl9) | 0;
          mid = mid + Math.imul(al6, bh9) | 0;
          mid = mid + Math.imul(ah6, bl9) | 0;
          hi = hi + Math.imul(ah6, bh9) | 0;
          var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
          w15 &= 67108863;
          lo = Math.imul(al9, bl7);
          mid = Math.imul(al9, bh7);
          mid = mid + Math.imul(ah9, bl7) | 0;
          hi = Math.imul(ah9, bh7);
          lo = lo + Math.imul(al8, bl8) | 0;
          mid = mid + Math.imul(al8, bh8) | 0;
          mid = mid + Math.imul(ah8, bl8) | 0;
          hi = hi + Math.imul(ah8, bh8) | 0;
          lo = lo + Math.imul(al7, bl9) | 0;
          mid = mid + Math.imul(al7, bh9) | 0;
          mid = mid + Math.imul(ah7, bl9) | 0;
          hi = hi + Math.imul(ah7, bh9) | 0;
          var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
          w16 &= 67108863;
          lo = Math.imul(al9, bl8);
          mid = Math.imul(al9, bh8);
          mid = mid + Math.imul(ah9, bl8) | 0;
          hi = Math.imul(ah9, bh8);
          lo = lo + Math.imul(al8, bl9) | 0;
          mid = mid + Math.imul(al8, bh9) | 0;
          mid = mid + Math.imul(ah8, bl9) | 0;
          hi = hi + Math.imul(ah8, bh9) | 0;
          var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
          w17 &= 67108863;
          lo = Math.imul(al9, bl9);
          mid = Math.imul(al9, bh9);
          mid = mid + Math.imul(ah9, bl9) | 0;
          hi = Math.imul(ah9, bh9);
          var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
          w18 &= 67108863;
          o[0] = w0;
          o[1] = w1;
          o[2] = w2;
          o[3] = w3;
          o[4] = w4;
          o[5] = w5;
          o[6] = w6;
          o[7] = w7;
          o[8] = w8;
          o[9] = w9;
          o[10] = w10;
          o[11] = w11;
          o[12] = w12;
          o[13] = w13;
          o[14] = w14;
          o[15] = w15;
          o[16] = w16;
          o[17] = w17;
          o[18] = w18;
          if (c !== 0) {
            o[19] = c;
            out.length++;
          }
          return out;
        };
        if (!Math.imul) {
          comb10MulTo = smallMulTo;
        }
        function bigMulTo(self2, num, out) {
          out.negative = num.negative ^ self2.negative;
          out.length = self2.length + num.length;
          var carry = 0;
          var hncarry = 0;
          for (var k = 0; k < out.length - 1; k++) {
            var ncarry = hncarry;
            hncarry = 0;
            var rword = carry & 67108863;
            var maxJ = Math.min(k, num.length - 1);
            for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
              var i = k - j;
              var a = self2.words[i] | 0;
              var b = num.words[j] | 0;
              var r = a * b;
              var lo = r & 67108863;
              ncarry = ncarry + (r / 67108864 | 0) | 0;
              lo = lo + rword | 0;
              rword = lo & 67108863;
              ncarry = ncarry + (lo >>> 26) | 0;
              hncarry += ncarry >>> 26;
              ncarry &= 67108863;
            }
            out.words[k] = rword;
            carry = ncarry;
            ncarry = hncarry;
          }
          if (carry !== 0) {
            out.words[k] = carry;
          } else {
            out.length--;
          }
          return out.strip();
        }
        function jumboMulTo(self2, num, out) {
          var fftm = new FFTM();
          return fftm.mulp(self2, num, out);
        }
        BN.prototype.mulTo = function mulTo(num, out) {
          var res;
          var len = this.length + num.length;
          if (this.length === 10 && num.length === 10) {
            res = comb10MulTo(this, num, out);
          } else if (len < 63) {
            res = smallMulTo(this, num, out);
          } else if (len < 1024) {
            res = bigMulTo(this, num, out);
          } else {
            res = jumboMulTo(this, num, out);
          }
          return res;
        };
        function FFTM(x, y) {
          this.x = x;
          this.y = y;
        }
        FFTM.prototype.makeRBT = function makeRBT(N) {
          var t = new Array(N);
          var l = BN.prototype._countBits(N) - 1;
          for (var i = 0; i < N; i++) {
            t[i] = this.revBin(i, l, N);
          }
          return t;
        };
        FFTM.prototype.revBin = function revBin(x, l, N) {
          if (x === 0 || x === N - 1) return x;
          var rb = 0;
          for (var i = 0; i < l; i++) {
            rb |= (x & 1) << l - i - 1;
            x >>= 1;
          }
          return rb;
        };
        FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
          for (var i = 0; i < N; i++) {
            rtws[i] = rws[rbt[i]];
            itws[i] = iws[rbt[i]];
          }
        };
        FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
          this.permute(rbt, rws, iws, rtws, itws, N);
          for (var s = 1; s < N; s <<= 1) {
            var l = s << 1;
            var rtwdf = Math.cos(2 * Math.PI / l);
            var itwdf = Math.sin(2 * Math.PI / l);
            for (var p = 0; p < N; p += l) {
              var rtwdf_ = rtwdf;
              var itwdf_ = itwdf;
              for (var j = 0; j < s; j++) {
                var re = rtws[p + j];
                var ie = itws[p + j];
                var ro = rtws[p + j + s];
                var io = itws[p + j + s];
                var rx = rtwdf_ * ro - itwdf_ * io;
                io = rtwdf_ * io + itwdf_ * ro;
                ro = rx;
                rtws[p + j] = re + ro;
                itws[p + j] = ie + io;
                rtws[p + j + s] = re - ro;
                itws[p + j + s] = ie - io;
                if (j !== l) {
                  rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                  itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                  rtwdf_ = rx;
                }
              }
            }
          }
        };
        FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
          var N = Math.max(m, n) | 1;
          var odd = N & 1;
          var i = 0;
          for (N = N / 2 | 0; N; N = N >>> 1) {
            i++;
          }
          return 1 << i + 1 + odd;
        };
        FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
          if (N <= 1) return;
          for (var i = 0; i < N / 2; i++) {
            var t = rws[i];
            rws[i] = rws[N - i - 1];
            rws[N - i - 1] = t;
            t = iws[i];
            iws[i] = -iws[N - i - 1];
            iws[N - i - 1] = -t;
          }
        };
        FFTM.prototype.normalize13b = function normalize13b(ws, N) {
          var carry = 0;
          for (var i = 0; i < N / 2; i++) {
            var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
            ws[i] = w & 67108863;
            if (w < 67108864) {
              carry = 0;
            } else {
              carry = w / 67108864 | 0;
            }
          }
          return ws;
        };
        FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
          var carry = 0;
          for (var i = 0; i < len; i++) {
            carry = carry + (ws[i] | 0);
            rws[2 * i] = carry & 8191;
            carry = carry >>> 13;
            rws[2 * i + 1] = carry & 8191;
            carry = carry >>> 13;
          }
          for (i = 2 * len; i < N; ++i) {
            rws[i] = 0;
          }
          assert(carry === 0);
          assert((carry & ~8191) === 0);
        };
        FFTM.prototype.stub = function stub(N) {
          var ph = new Array(N);
          for (var i = 0; i < N; i++) {
            ph[i] = 0;
          }
          return ph;
        };
        FFTM.prototype.mulp = function mulp(x, y, out) {
          var N = 2 * this.guessLen13b(x.length, y.length);
          var rbt = this.makeRBT(N);
          var _ = this.stub(N);
          var rws = new Array(N);
          var rwst = new Array(N);
          var iwst = new Array(N);
          var nrws = new Array(N);
          var nrwst = new Array(N);
          var niwst = new Array(N);
          var rmws = out.words;
          rmws.length = N;
          this.convert13b(x.words, x.length, rws, N);
          this.convert13b(y.words, y.length, nrws, N);
          this.transform(rws, _, rwst, iwst, N, rbt);
          this.transform(nrws, _, nrwst, niwst, N, rbt);
          for (var i = 0; i < N; i++) {
            var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
            iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
            rwst[i] = rx;
          }
          this.conjugate(rwst, iwst, N);
          this.transform(rwst, iwst, rmws, _, N, rbt);
          this.conjugate(rmws, _, N);
          this.normalize13b(rmws, N);
          out.negative = x.negative ^ y.negative;
          out.length = x.length + y.length;
          return out.strip();
        };
        BN.prototype.mul = function mul(num) {
          var out = new BN(null);
          out.words = new Array(this.length + num.length);
          return this.mulTo(num, out);
        };
        BN.prototype.mulf = function mulf(num) {
          var out = new BN(null);
          out.words = new Array(this.length + num.length);
          return jumboMulTo(this, num, out);
        };
        BN.prototype.imul = function imul(num) {
          return this.clone().mulTo(num, this);
        };
        BN.prototype.imuln = function imuln(num) {
          assert(typeof num === "number");
          assert(num < 67108864);
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = (this.words[i] | 0) * num;
            var lo = (w & 67108863) + (carry & 67108863);
            carry >>= 26;
            carry += w / 67108864 | 0;
            carry += lo >>> 26;
            this.words[i] = lo & 67108863;
          }
          if (carry !== 0) {
            this.words[i] = carry;
            this.length++;
          }
          if (num === 0) {
            this.length = 1;
            this._normSign();
          }
          return this;
        };
        BN.prototype.muln = function muln(num) {
          return this.clone().imuln(num);
        };
        BN.prototype.sqr = function sqr() {
          return this.mul(this);
        };
        BN.prototype.isqr = function isqr() {
          return this.imul(this.clone());
        };
        BN.prototype.pow = function pow(num) {
          var w = toBitArray(num);
          if (w.length === 0) return new BN(1);
          var res = this;
          for (var i = 0; i < w.length; i++, res = res.sqr()) {
            if (w[i] !== 0) break;
          }
          if (++i < w.length) {
            for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
              if (w[i] === 0) continue;
              res = res.mul(q);
            }
          }
          return res;
        };
        BN.prototype.iushln = function iushln(bits) {
          assert(typeof bits === "number" && bits >= 0);
          var r = bits % 26;
          var s = (bits - r) / 26;
          var carryMask = 67108863 >>> 26 - r << 26 - r;
          var i;
          if (r !== 0) {
            var carry = 0;
            for (i = 0; i < this.length; i++) {
              var newCarry = this.words[i] & carryMask;
              var c = (this.words[i] | 0) - newCarry << r;
              this.words[i] = c | carry;
              carry = newCarry >>> 26 - r;
            }
            if (carry) {
              this.words[i] = carry;
              this.length++;
            }
          }
          if (s !== 0) {
            for (i = this.length - 1; i >= 0; i--) {
              this.words[i + s] = this.words[i];
            }
            for (i = 0; i < s; i++) {
              this.words[i] = 0;
            }
            this.length += s;
          }
          return this.strip();
        };
        BN.prototype.ishln = function ishln(bits) {
          assert(this.negative === 0);
          return this.iushln(bits);
        };
        BN.prototype.iushrn = function iushrn(bits, hint, extended) {
          assert(typeof bits === "number" && bits >= 0);
          var h;
          if (hint) {
            h = (hint - hint % 26) / 26;
          } else {
            h = 0;
          }
          var r = bits % 26;
          var s = Math.min((bits - r) / 26, this.length);
          var mask = 67108863 ^ 67108863 >>> r << r;
          var maskedWords = extended;
          h -= s;
          h = Math.max(0, h);
          if (maskedWords) {
            for (var i = 0; i < s; i++) {
              maskedWords.words[i] = this.words[i];
            }
            maskedWords.length = s;
          }
          if (s === 0) {
          } else if (this.length > s) {
            this.length -= s;
            for (i = 0; i < this.length; i++) {
              this.words[i] = this.words[i + s];
            }
          } else {
            this.words[0] = 0;
            this.length = 1;
          }
          var carry = 0;
          for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
            var word = this.words[i] | 0;
            this.words[i] = carry << 26 - r | word >>> r;
            carry = word & mask;
          }
          if (maskedWords && carry !== 0) {
            maskedWords.words[maskedWords.length++] = carry;
          }
          if (this.length === 0) {
            this.words[0] = 0;
            this.length = 1;
          }
          return this.strip();
        };
        BN.prototype.ishrn = function ishrn(bits, hint, extended) {
          assert(this.negative === 0);
          return this.iushrn(bits, hint, extended);
        };
        BN.prototype.shln = function shln(bits) {
          return this.clone().ishln(bits);
        };
        BN.prototype.ushln = function ushln(bits) {
          return this.clone().iushln(bits);
        };
        BN.prototype.shrn = function shrn(bits) {
          return this.clone().ishrn(bits);
        };
        BN.prototype.ushrn = function ushrn(bits) {
          return this.clone().iushrn(bits);
        };
        BN.prototype.testn = function testn(bit) {
          assert(typeof bit === "number" && bit >= 0);
          var r = bit % 26;
          var s = (bit - r) / 26;
          var q = 1 << r;
          if (this.length <= s) return false;
          var w = this.words[s];
          return !!(w & q);
        };
        BN.prototype.imaskn = function imaskn(bits) {
          assert(typeof bits === "number" && bits >= 0);
          var r = bits % 26;
          var s = (bits - r) / 26;
          assert(this.negative === 0, "imaskn works only with positive numbers");
          if (this.length <= s) {
            return this;
          }
          if (r !== 0) {
            s++;
          }
          this.length = Math.min(s, this.length);
          if (r !== 0) {
            var mask = 67108863 ^ 67108863 >>> r << r;
            this.words[this.length - 1] &= mask;
          }
          if (this.length === 0) {
            this.words[0] = 0;
            this.length = 1;
          }
          return this.strip();
        };
        BN.prototype.maskn = function maskn(bits) {
          return this.clone().imaskn(bits);
        };
        BN.prototype.iaddn = function iaddn(num) {
          assert(typeof num === "number");
          assert(num < 67108864);
          if (num < 0) return this.isubn(-num);
          if (this.negative !== 0) {
            if (this.length === 1 && (this.words[0] | 0) < num) {
              this.words[0] = num - (this.words[0] | 0);
              this.negative = 0;
              return this;
            }
            this.negative = 0;
            this.isubn(num);
            this.negative = 1;
            return this;
          }
          return this._iaddn(num);
        };
        BN.prototype._iaddn = function _iaddn(num) {
          this.words[0] += num;
          for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
            this.words[i] -= 67108864;
            if (i === this.length - 1) {
              this.words[i + 1] = 1;
            } else {
              this.words[i + 1]++;
            }
          }
          this.length = Math.max(this.length, i + 1);
          return this;
        };
        BN.prototype.isubn = function isubn(num) {
          assert(typeof num === "number");
          assert(num < 67108864);
          if (num < 0) return this.iaddn(-num);
          if (this.negative !== 0) {
            this.negative = 0;
            this.iaddn(num);
            this.negative = 1;
            return this;
          }
          this.words[0] -= num;
          if (this.length === 1 && this.words[0] < 0) {
            this.words[0] = -this.words[0];
            this.negative = 1;
          } else {
            for (var i = 0; i < this.length && this.words[i] < 0; i++) {
              this.words[i] += 67108864;
              this.words[i + 1] -= 1;
            }
          }
          return this.strip();
        };
        BN.prototype.addn = function addn(num) {
          return this.clone().iaddn(num);
        };
        BN.prototype.subn = function subn(num) {
          return this.clone().isubn(num);
        };
        BN.prototype.iabs = function iabs() {
          this.negative = 0;
          return this;
        };
        BN.prototype.abs = function abs() {
          return this.clone().iabs();
        };
        BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
          var len = num.length + shift;
          var i;
          this._expand(len);
          var w;
          var carry = 0;
          for (i = 0; i < num.length; i++) {
            w = (this.words[i + shift] | 0) + carry;
            var right = (num.words[i] | 0) * mul;
            w -= right & 67108863;
            carry = (w >> 26) - (right / 67108864 | 0);
            this.words[i + shift] = w & 67108863;
          }
          for (; i < this.length - shift; i++) {
            w = (this.words[i + shift] | 0) + carry;
            carry = w >> 26;
            this.words[i + shift] = w & 67108863;
          }
          if (carry === 0) return this.strip();
          assert(carry === -1);
          carry = 0;
          for (i = 0; i < this.length; i++) {
            w = -(this.words[i] | 0) + carry;
            carry = w >> 26;
            this.words[i] = w & 67108863;
          }
          this.negative = 1;
          return this.strip();
        };
        BN.prototype._wordDiv = function _wordDiv(num, mode) {
          var shift = this.length - num.length;
          var a = this.clone();
          var b = num;
          var bhi = b.words[b.length - 1] | 0;
          var bhiBits = this._countBits(bhi);
          shift = 26 - bhiBits;
          if (shift !== 0) {
            b = b.ushln(shift);
            a.iushln(shift);
            bhi = b.words[b.length - 1] | 0;
          }
          var m = a.length - b.length;
          var q;
          if (mode !== "mod") {
            q = new BN(null);
            q.length = m + 1;
            q.words = new Array(q.length);
            for (var i = 0; i < q.length; i++) {
              q.words[i] = 0;
            }
          }
          var diff = a.clone()._ishlnsubmul(b, 1, m);
          if (diff.negative === 0) {
            a = diff;
            if (q) {
              q.words[m] = 1;
            }
          }
          for (var j = m - 1; j >= 0; j--) {
            var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
            qj = Math.min(qj / bhi | 0, 67108863);
            a._ishlnsubmul(b, qj, j);
            while (a.negative !== 0) {
              qj--;
              a.negative = 0;
              a._ishlnsubmul(b, 1, j);
              if (!a.isZero()) {
                a.negative ^= 1;
              }
            }
            if (q) {
              q.words[j] = qj;
            }
          }
          if (q) {
            q.strip();
          }
          a.strip();
          if (mode !== "div" && shift !== 0) {
            a.iushrn(shift);
          }
          return {
            div: q || null,
            mod: a
          };
        };
        BN.prototype.divmod = function divmod(num, mode, positive) {
          assert(!num.isZero());
          if (this.isZero()) {
            return {
              div: new BN(0),
              mod: new BN(0)
            };
          }
          var div, mod, res;
          if (this.negative !== 0 && num.negative === 0) {
            res = this.neg().divmod(num, mode);
            if (mode !== "mod") {
              div = res.div.neg();
            }
            if (mode !== "div") {
              mod = res.mod.neg();
              if (positive && mod.negative !== 0) {
                mod.iadd(num);
              }
            }
            return {
              div,
              mod
            };
          }
          if (this.negative === 0 && num.negative !== 0) {
            res = this.divmod(num.neg(), mode);
            if (mode !== "mod") {
              div = res.div.neg();
            }
            return {
              div,
              mod: res.mod
            };
          }
          if ((this.negative & num.negative) !== 0) {
            res = this.neg().divmod(num.neg(), mode);
            if (mode !== "div") {
              mod = res.mod.neg();
              if (positive && mod.negative !== 0) {
                mod.isub(num);
              }
            }
            return {
              div: res.div,
              mod
            };
          }
          if (num.length > this.length || this.cmp(num) < 0) {
            return {
              div: new BN(0),
              mod: this
            };
          }
          if (num.length === 1) {
            if (mode === "div") {
              return {
                div: this.divn(num.words[0]),
                mod: null
              };
            }
            if (mode === "mod") {
              return {
                div: null,
                mod: new BN(this.modn(num.words[0]))
              };
            }
            return {
              div: this.divn(num.words[0]),
              mod: new BN(this.modn(num.words[0]))
            };
          }
          return this._wordDiv(num, mode);
        };
        BN.prototype.div = function div(num) {
          return this.divmod(num, "div", false).div;
        };
        BN.prototype.mod = function mod(num) {
          return this.divmod(num, "mod", false).mod;
        };
        BN.prototype.umod = function umod(num) {
          return this.divmod(num, "mod", true).mod;
        };
        BN.prototype.divRound = function divRound(num) {
          var dm = this.divmod(num);
          if (dm.mod.isZero()) return dm.div;
          var mod = dm.mod.abs();
          var half = num.abs().iushrn(1);
          var r2 = num.words[0] & 1;
          var cmp = mod.cmp(half);
          if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
          var up = new BN(1);
          up.negative = this.negative ^ num.negative;
          return dm.div.iadd(up);
        };
        BN.prototype.modn = function modn(num) {
          assert(num <= 67108863);
          var p = (1 << 26) % num;
          var acc = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            acc = (p * acc + (this.words[i] | 0)) % num;
          }
          return acc;
        };
        BN.prototype.idivn = function idivn(num) {
          assert(num <= 67108863);
          var carry = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            var w = (this.words[i] | 0) + carry * 67108864;
            this.words[i] = w / num | 0;
            carry = w % num;
          }
          return this.strip();
        };
        BN.prototype.divn = function divn(num) {
          return this.clone().idivn(num);
        };
        BN.prototype.egcd = function egcd(p) {
          assert(p.negative === 0);
          assert(!p.isZero());
          var x = this;
          var y = p.clone();
          if (x.negative !== 0) {
            x = x.umod(p);
          } else {
            x = x.clone();
          }
          var A = new BN(1);
          var B = new BN(0);
          var C = new BN(0);
          var D = new BN(1);
          var g = 0;
          while (x.isEven() && y.isEven()) {
            x.iushrn(1);
            y.iushrn(1);
            ++g;
          }
          var yp = y.clone();
          var xp = x.clone();
          while (!x.isZero()) {
            for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
            if (i > 0) {
              x.iushrn(i);
              while (i-- > 0) {
                if (A.isOdd() || B.isOdd()) {
                  A.iadd(yp);
                  B.isub(xp);
                }
                A.iushrn(1);
                B.iushrn(1);
              }
            }
            for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
            if (j > 0) {
              y.iushrn(j);
              while (j-- > 0) {
                if (C.isOdd() || D.isOdd()) {
                  C.iadd(yp);
                  D.isub(xp);
                }
                C.iushrn(1);
                D.iushrn(1);
              }
            }
            if (x.cmp(y) >= 0) {
              x.isub(y);
              A.isub(C);
              B.isub(D);
            } else {
              y.isub(x);
              C.isub(A);
              D.isub(B);
            }
          }
          return {
            a: C,
            b: D,
            gcd: y.iushln(g)
          };
        };
        BN.prototype._invmp = function _invmp(p) {
          assert(p.negative === 0);
          assert(!p.isZero());
          var a = this;
          var b = p.clone();
          if (a.negative !== 0) {
            a = a.umod(p);
          } else {
            a = a.clone();
          }
          var x1 = new BN(1);
          var x2 = new BN(0);
          var delta = b.clone();
          while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
            for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
            if (i > 0) {
              a.iushrn(i);
              while (i-- > 0) {
                if (x1.isOdd()) {
                  x1.iadd(delta);
                }
                x1.iushrn(1);
              }
            }
            for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
            if (j > 0) {
              b.iushrn(j);
              while (j-- > 0) {
                if (x2.isOdd()) {
                  x2.iadd(delta);
                }
                x2.iushrn(1);
              }
            }
            if (a.cmp(b) >= 0) {
              a.isub(b);
              x1.isub(x2);
            } else {
              b.isub(a);
              x2.isub(x1);
            }
          }
          var res;
          if (a.cmpn(1) === 0) {
            res = x1;
          } else {
            res = x2;
          }
          if (res.cmpn(0) < 0) {
            res.iadd(p);
          }
          return res;
        };
        BN.prototype.gcd = function gcd(num) {
          if (this.isZero()) return num.abs();
          if (num.isZero()) return this.abs();
          var a = this.clone();
          var b = num.clone();
          a.negative = 0;
          b.negative = 0;
          for (var shift = 0; a.isEven() && b.isEven(); shift++) {
            a.iushrn(1);
            b.iushrn(1);
          }
          do {
            while (a.isEven()) {
              a.iushrn(1);
            }
            while (b.isEven()) {
              b.iushrn(1);
            }
            var r = a.cmp(b);
            if (r < 0) {
              var t = a;
              a = b;
              b = t;
            } else if (r === 0 || b.cmpn(1) === 0) {
              break;
            }
            a.isub(b);
          } while (true);
          return b.iushln(shift);
        };
        BN.prototype.invm = function invm(num) {
          return this.egcd(num).a.umod(num);
        };
        BN.prototype.isEven = function isEven() {
          return (this.words[0] & 1) === 0;
        };
        BN.prototype.isOdd = function isOdd() {
          return (this.words[0] & 1) === 1;
        };
        BN.prototype.andln = function andln(num) {
          return this.words[0] & num;
        };
        BN.prototype.bincn = function bincn(bit) {
          assert(typeof bit === "number");
          var r = bit % 26;
          var s = (bit - r) / 26;
          var q = 1 << r;
          if (this.length <= s) {
            this._expand(s + 1);
            this.words[s] |= q;
            return this;
          }
          var carry = q;
          for (var i = s; carry !== 0 && i < this.length; i++) {
            var w = this.words[i] | 0;
            w += carry;
            carry = w >>> 26;
            w &= 67108863;
            this.words[i] = w;
          }
          if (carry !== 0) {
            this.words[i] = carry;
            this.length++;
          }
          return this;
        };
        BN.prototype.isZero = function isZero() {
          return this.length === 1 && this.words[0] === 0;
        };
        BN.prototype.cmpn = function cmpn(num) {
          var negative = num < 0;
          if (this.negative !== 0 && !negative) return -1;
          if (this.negative === 0 && negative) return 1;
          this.strip();
          var res;
          if (this.length > 1) {
            res = 1;
          } else {
            if (negative) {
              num = -num;
            }
            assert(num <= 67108863, "Number is too big");
            var w = this.words[0] | 0;
            res = w === num ? 0 : w < num ? -1 : 1;
          }
          if (this.negative !== 0) return -res | 0;
          return res;
        };
        BN.prototype.cmp = function cmp(num) {
          if (this.negative !== 0 && num.negative === 0) return -1;
          if (this.negative === 0 && num.negative !== 0) return 1;
          var res = this.ucmp(num);
          if (this.negative !== 0) return -res | 0;
          return res;
        };
        BN.prototype.ucmp = function ucmp(num) {
          if (this.length > num.length) return 1;
          if (this.length < num.length) return -1;
          var res = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            var a = this.words[i] | 0;
            var b = num.words[i] | 0;
            if (a === b) continue;
            if (a < b) {
              res = -1;
            } else if (a > b) {
              res = 1;
            }
            break;
          }
          return res;
        };
        BN.prototype.gtn = function gtn(num) {
          return this.cmpn(num) === 1;
        };
        BN.prototype.gt = function gt(num) {
          return this.cmp(num) === 1;
        };
        BN.prototype.gten = function gten(num) {
          return this.cmpn(num) >= 0;
        };
        BN.prototype.gte = function gte(num) {
          return this.cmp(num) >= 0;
        };
        BN.prototype.ltn = function ltn(num) {
          return this.cmpn(num) === -1;
        };
        BN.prototype.lt = function lt(num) {
          return this.cmp(num) === -1;
        };
        BN.prototype.lten = function lten(num) {
          return this.cmpn(num) <= 0;
        };
        BN.prototype.lte = function lte(num) {
          return this.cmp(num) <= 0;
        };
        BN.prototype.eqn = function eqn(num) {
          return this.cmpn(num) === 0;
        };
        BN.prototype.eq = function eq(num) {
          return this.cmp(num) === 0;
        };
        BN.red = function red(num) {
          return new Red(num);
        };
        BN.prototype.toRed = function toRed(ctx) {
          assert(!this.red, "Already a number in reduction context");
          assert(this.negative === 0, "red works only with positives");
          return ctx.convertTo(this)._forceRed(ctx);
        };
        BN.prototype.fromRed = function fromRed() {
          assert(this.red, "fromRed works only with numbers in reduction context");
          return this.red.convertFrom(this);
        };
        BN.prototype._forceRed = function _forceRed(ctx) {
          this.red = ctx;
          return this;
        };
        BN.prototype.forceRed = function forceRed(ctx) {
          assert(!this.red, "Already a number in reduction context");
          return this._forceRed(ctx);
        };
        BN.prototype.redAdd = function redAdd(num) {
          assert(this.red, "redAdd works only with red numbers");
          return this.red.add(this, num);
        };
        BN.prototype.redIAdd = function redIAdd(num) {
          assert(this.red, "redIAdd works only with red numbers");
          return this.red.iadd(this, num);
        };
        BN.prototype.redSub = function redSub(num) {
          assert(this.red, "redSub works only with red numbers");
          return this.red.sub(this, num);
        };
        BN.prototype.redISub = function redISub(num) {
          assert(this.red, "redISub works only with red numbers");
          return this.red.isub(this, num);
        };
        BN.prototype.redShl = function redShl(num) {
          assert(this.red, "redShl works only with red numbers");
          return this.red.shl(this, num);
        };
        BN.prototype.redMul = function redMul(num) {
          assert(this.red, "redMul works only with red numbers");
          this.red._verify2(this, num);
          return this.red.mul(this, num);
        };
        BN.prototype.redIMul = function redIMul(num) {
          assert(this.red, "redMul works only with red numbers");
          this.red._verify2(this, num);
          return this.red.imul(this, num);
        };
        BN.prototype.redSqr = function redSqr() {
          assert(this.red, "redSqr works only with red numbers");
          this.red._verify1(this);
          return this.red.sqr(this);
        };
        BN.prototype.redISqr = function redISqr() {
          assert(this.red, "redISqr works only with red numbers");
          this.red._verify1(this);
          return this.red.isqr(this);
        };
        BN.prototype.redSqrt = function redSqrt() {
          assert(this.red, "redSqrt works only with red numbers");
          this.red._verify1(this);
          return this.red.sqrt(this);
        };
        BN.prototype.redInvm = function redInvm() {
          assert(this.red, "redInvm works only with red numbers");
          this.red._verify1(this);
          return this.red.invm(this);
        };
        BN.prototype.redNeg = function redNeg() {
          assert(this.red, "redNeg works only with red numbers");
          this.red._verify1(this);
          return this.red.neg(this);
        };
        BN.prototype.redPow = function redPow(num) {
          assert(this.red && !num.red, "redPow(normalNum)");
          this.red._verify1(this);
          return this.red.pow(this, num);
        };
        var primes = {
          k256: null,
          p224: null,
          p192: null,
          p25519: null
        };
        function MPrime(name, p) {
          this.name = name;
          this.p = new BN(p, 16);
          this.n = this.p.bitLength();
          this.k = new BN(1).iushln(this.n).isub(this.p);
          this.tmp = this._tmp();
        }
        MPrime.prototype._tmp = function _tmp() {
          var tmp = new BN(null);
          tmp.words = new Array(Math.ceil(this.n / 13));
          return tmp;
        };
        MPrime.prototype.ireduce = function ireduce(num) {
          var r = num;
          var rlen;
          do {
            this.split(r, this.tmp);
            r = this.imulK(r);
            r = r.iadd(this.tmp);
            rlen = r.bitLength();
          } while (rlen > this.n);
          var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
          if (cmp === 0) {
            r.words[0] = 0;
            r.length = 1;
          } else if (cmp > 0) {
            r.isub(this.p);
          } else {
            if (r.strip !== void 0) {
              r.strip();
            } else {
              r._strip();
            }
          }
          return r;
        };
        MPrime.prototype.split = function split(input, out) {
          input.iushrn(this.n, 0, out);
        };
        MPrime.prototype.imulK = function imulK(num) {
          return num.imul(this.k);
        };
        function K256() {
          MPrime.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        inherits(K256, MPrime);
        K256.prototype.split = function split(input, output) {
          var mask = 4194303;
          var outLen = Math.min(input.length, 9);
          for (var i = 0; i < outLen; i++) {
            output.words[i] = input.words[i];
          }
          output.length = outLen;
          if (input.length <= 9) {
            input.words[0] = 0;
            input.length = 1;
            return;
          }
          var prev = input.words[9];
          output.words[output.length++] = prev & mask;
          for (i = 10; i < input.length; i++) {
            var next = input.words[i] | 0;
            input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
            prev = next;
          }
          prev >>>= 22;
          input.words[i - 10] = prev;
          if (prev === 0 && input.length > 10) {
            input.length -= 10;
          } else {
            input.length -= 9;
          }
        };
        K256.prototype.imulK = function imulK(num) {
          num.words[num.length] = 0;
          num.words[num.length + 1] = 0;
          num.length += 2;
          var lo = 0;
          for (var i = 0; i < num.length; i++) {
            var w = num.words[i] | 0;
            lo += w * 977;
            num.words[i] = lo & 67108863;
            lo = w * 64 + (lo / 67108864 | 0);
          }
          if (num.words[num.length - 1] === 0) {
            num.length--;
            if (num.words[num.length - 1] === 0) {
              num.length--;
            }
          }
          return num;
        };
        function P224() {
          MPrime.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        inherits(P224, MPrime);
        function P192() {
          MPrime.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        inherits(P192, MPrime);
        function P25519() {
          MPrime.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        inherits(P25519, MPrime);
        P25519.prototype.imulK = function imulK(num) {
          var carry = 0;
          for (var i = 0; i < num.length; i++) {
            var hi = (num.words[i] | 0) * 19 + carry;
            var lo = hi & 67108863;
            hi >>>= 26;
            num.words[i] = lo;
            carry = hi;
          }
          if (carry !== 0) {
            num.words[num.length++] = carry;
          }
          return num;
        };
        BN._prime = function prime(name) {
          if (primes[name]) return primes[name];
          var prime2;
          if (name === "k256") {
            prime2 = new K256();
          } else if (name === "p224") {
            prime2 = new P224();
          } else if (name === "p192") {
            prime2 = new P192();
          } else if (name === "p25519") {
            prime2 = new P25519();
          } else {
            throw new Error("Unknown prime " + name);
          }
          primes[name] = prime2;
          return prime2;
        };
        function Red(m) {
          if (typeof m === "string") {
            var prime = BN._prime(m);
            this.m = prime.p;
            this.prime = prime;
          } else {
            assert(m.gtn(1), "modulus must be greater than 1");
            this.m = m;
            this.prime = null;
          }
        }
        Red.prototype._verify1 = function _verify1(a) {
          assert(a.negative === 0, "red works only with positives");
          assert(a.red, "red works only with red numbers");
        };
        Red.prototype._verify2 = function _verify2(a, b) {
          assert((a.negative | b.negative) === 0, "red works only with positives");
          assert(
            a.red && a.red === b.red,
            "red works only with red numbers"
          );
        };
        Red.prototype.imod = function imod(a) {
          if (this.prime) return this.prime.ireduce(a)._forceRed(this);
          return a.umod(this.m)._forceRed(this);
        };
        Red.prototype.neg = function neg(a) {
          if (a.isZero()) {
            return a.clone();
          }
          return this.m.sub(a)._forceRed(this);
        };
        Red.prototype.add = function add(a, b) {
          this._verify2(a, b);
          var res = a.add(b);
          if (res.cmp(this.m) >= 0) {
            res.isub(this.m);
          }
          return res._forceRed(this);
        };
        Red.prototype.iadd = function iadd(a, b) {
          this._verify2(a, b);
          var res = a.iadd(b);
          if (res.cmp(this.m) >= 0) {
            res.isub(this.m);
          }
          return res;
        };
        Red.prototype.sub = function sub(a, b) {
          this._verify2(a, b);
          var res = a.sub(b);
          if (res.cmpn(0) < 0) {
            res.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Red.prototype.isub = function isub(a, b) {
          this._verify2(a, b);
          var res = a.isub(b);
          if (res.cmpn(0) < 0) {
            res.iadd(this.m);
          }
          return res;
        };
        Red.prototype.shl = function shl(a, num) {
          this._verify1(a);
          return this.imod(a.ushln(num));
        };
        Red.prototype.imul = function imul(a, b) {
          this._verify2(a, b);
          return this.imod(a.imul(b));
        };
        Red.prototype.mul = function mul(a, b) {
          this._verify2(a, b);
          return this.imod(a.mul(b));
        };
        Red.prototype.isqr = function isqr(a) {
          return this.imul(a, a.clone());
        };
        Red.prototype.sqr = function sqr(a) {
          return this.mul(a, a);
        };
        Red.prototype.sqrt = function sqrt(a) {
          if (a.isZero()) return a.clone();
          var mod3 = this.m.andln(3);
          assert(mod3 % 2 === 1);
          if (mod3 === 3) {
            var pow = this.m.add(new BN(1)).iushrn(2);
            return this.pow(a, pow);
          }
          var q = this.m.subn(1);
          var s = 0;
          while (!q.isZero() && q.andln(1) === 0) {
            s++;
            q.iushrn(1);
          }
          assert(!q.isZero());
          var one = new BN(1).toRed(this);
          var nOne = one.redNeg();
          var lpow = this.m.subn(1).iushrn(1);
          var z = this.m.bitLength();
          z = new BN(2 * z * z).toRed(this);
          while (this.pow(z, lpow).cmp(nOne) !== 0) {
            z.redIAdd(nOne);
          }
          var c = this.pow(z, q);
          var r = this.pow(a, q.addn(1).iushrn(1));
          var t = this.pow(a, q);
          var m = s;
          while (t.cmp(one) !== 0) {
            var tmp = t;
            for (var i = 0; tmp.cmp(one) !== 0; i++) {
              tmp = tmp.redSqr();
            }
            assert(i < m);
            var b = this.pow(c, new BN(1).iushln(m - i - 1));
            r = r.redMul(b);
            c = b.redSqr();
            t = t.redMul(c);
            m = i;
          }
          return r;
        };
        Red.prototype.invm = function invm(a) {
          var inv = a._invmp(this.m);
          if (inv.negative !== 0) {
            inv.negative = 0;
            return this.imod(inv).redNeg();
          } else {
            return this.imod(inv);
          }
        };
        Red.prototype.pow = function pow(a, num) {
          if (num.isZero()) return new BN(1).toRed(this);
          if (num.cmpn(1) === 0) return a.clone();
          var windowSize = 4;
          var wnd = new Array(1 << windowSize);
          wnd[0] = new BN(1).toRed(this);
          wnd[1] = a;
          for (var i = 2; i < wnd.length; i++) {
            wnd[i] = this.mul(wnd[i - 1], a);
          }
          var res = wnd[0];
          var current = 0;
          var currentLen = 0;
          var start = num.bitLength() % 26;
          if (start === 0) {
            start = 26;
          }
          for (i = num.length - 1; i >= 0; i--) {
            var word = num.words[i];
            for (var j = start - 1; j >= 0; j--) {
              var bit = word >> j & 1;
              if (res !== wnd[0]) {
                res = this.sqr(res);
              }
              if (bit === 0 && current === 0) {
                currentLen = 0;
                continue;
              }
              current <<= 1;
              current |= bit;
              currentLen++;
              if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
              res = this.mul(res, wnd[current]);
              currentLen = 0;
              current = 0;
            }
            start = 26;
          }
          return res;
        };
        Red.prototype.convertTo = function convertTo(num) {
          var r = num.umod(this.m);
          return r === num ? r.clone() : r;
        };
        Red.prototype.convertFrom = function convertFrom(num) {
          var res = num.clone();
          res.red = null;
          return res;
        };
        BN.mont = function mont(num) {
          return new Mont(num);
        };
        function Mont(m) {
          Red.call(this, m);
          this.shift = this.m.bitLength();
          if (this.shift % 26 !== 0) {
            this.shift += 26 - this.shift % 26;
          }
          this.r = new BN(1).iushln(this.shift);
          this.r2 = this.imod(this.r.sqr());
          this.rinv = this.r._invmp(this.m);
          this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
          this.minv = this.minv.umod(this.r);
          this.minv = this.r.sub(this.minv);
        }
        inherits(Mont, Red);
        Mont.prototype.convertTo = function convertTo(num) {
          return this.imod(num.ushln(this.shift));
        };
        Mont.prototype.convertFrom = function convertFrom(num) {
          var r = this.imod(num.mul(this.rinv));
          r.red = null;
          return r;
        };
        Mont.prototype.imul = function imul(a, b) {
          if (a.isZero() || b.isZero()) {
            a.words[0] = 0;
            a.length = 1;
            return a;
          }
          var t = a.imul(b);
          var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var u = t.isub(c).iushrn(this.shift);
          var res = u;
          if (u.cmp(this.m) >= 0) {
            res = u.isub(this.m);
          } else if (u.cmpn(0) < 0) {
            res = u.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Mont.prototype.mul = function mul(a, b) {
          if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
          var t = a.mul(b);
          var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var u = t.isub(c).iushrn(this.shift);
          var res = u;
          if (u.cmp(this.m) >= 0) {
            res = u.isub(this.m);
          } else if (u.cmpn(0) < 0) {
            res = u.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Mont.prototype.invm = function invm(a) {
          var res = this.imod(a._invmp(this.m).mul(this.r2));
          return res._forceRed(this);
        };
      })(typeof module === "undefined" || module, exports);
    }
  });

  // node_modules/minimalistic-assert/index.js
  var require_minimalistic_assert = __commonJS({
    "node_modules/minimalistic-assert/index.js"(exports, module) {
      module.exports = assert;
      function assert(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      assert.equal = function assertEqual(l, r, msg) {
        if (l != r)
          throw new Error(msg || "Assertion failed: " + l + " != " + r);
      };
    }
  });

  // node_modules/minimalistic-crypto-utils/lib/utils.js
  var require_utils2 = __commonJS({
    "node_modules/minimalistic-crypto-utils/lib/utils.js"(exports) {
      "use strict";
      var utils = exports;
      function toArray(msg, enc) {
        if (Array.isArray(msg))
          return msg.slice();
        if (!msg)
          return [];
        var res = [];
        if (typeof msg !== "string") {
          for (var i = 0; i < msg.length; i++)
            res[i] = msg[i] | 0;
          return res;
        }
        if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (var i = 0; i < msg.length; i += 2)
            res.push(parseInt(msg[i] + msg[i + 1], 16));
        } else {
          for (var i = 0; i < msg.length; i++) {
            var c = msg.charCodeAt(i);
            var hi = c >> 8;
            var lo = c & 255;
            if (hi)
              res.push(hi, lo);
            else
              res.push(lo);
          }
        }
        return res;
      }
      utils.toArray = toArray;
      function zero2(word) {
        if (word.length === 1)
          return "0" + word;
        else
          return word;
      }
      utils.zero2 = zero2;
      function toHex(msg) {
        var res = "";
        for (var i = 0; i < msg.length; i++)
          res += zero2(msg[i].toString(16));
        return res;
      }
      utils.toHex = toHex;
      utils.encode = function encode(arr, enc) {
        if (enc === "hex")
          return toHex(arr);
        else
          return arr;
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/utils.js
  var require_utils3 = __commonJS({
    "node_modules/elliptic/lib/elliptic/utils.js"(exports) {
      "use strict";
      var utils = exports;
      var BN = require_bn();
      var minAssert = require_minimalistic_assert();
      var minUtils = require_utils2();
      utils.assert = minAssert;
      utils.toArray = minUtils.toArray;
      utils.zero2 = minUtils.zero2;
      utils.toHex = minUtils.toHex;
      utils.encode = minUtils.encode;
      function getNAF(num, w, bits) {
        var naf = new Array(Math.max(num.bitLength(), bits) + 1);
        var i;
        for (i = 0; i < naf.length; i += 1) {
          naf[i] = 0;
        }
        var ws = 1 << w + 1;
        var k = num.clone();
        for (i = 0; i < naf.length; i++) {
          var z;
          var mod = k.andln(ws - 1);
          if (k.isOdd()) {
            if (mod > (ws >> 1) - 1)
              z = (ws >> 1) - mod;
            else
              z = mod;
            k.isubn(z);
          } else {
            z = 0;
          }
          naf[i] = z;
          k.iushrn(1);
        }
        return naf;
      }
      utils.getNAF = getNAF;
      function getJSF(k1, k2) {
        var jsf = [
          [],
          []
        ];
        k1 = k1.clone();
        k2 = k2.clone();
        var d1 = 0;
        var d2 = 0;
        var m8;
        while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
          var m14 = k1.andln(3) + d1 & 3;
          var m24 = k2.andln(3) + d2 & 3;
          if (m14 === 3)
            m14 = -1;
          if (m24 === 3)
            m24 = -1;
          var u1;
          if ((m14 & 1) === 0) {
            u1 = 0;
          } else {
            m8 = k1.andln(7) + d1 & 7;
            if ((m8 === 3 || m8 === 5) && m24 === 2)
              u1 = -m14;
            else
              u1 = m14;
          }
          jsf[0].push(u1);
          var u2;
          if ((m24 & 1) === 0) {
            u2 = 0;
          } else {
            m8 = k2.andln(7) + d2 & 7;
            if ((m8 === 3 || m8 === 5) && m14 === 2)
              u2 = -m24;
            else
              u2 = m24;
          }
          jsf[1].push(u2);
          if (2 * d1 === u1 + 1)
            d1 = 1 - d1;
          if (2 * d2 === u2 + 1)
            d2 = 1 - d2;
          k1.iushrn(1);
          k2.iushrn(1);
        }
        return jsf;
      }
      utils.getJSF = getJSF;
      function cachedProperty(obj, name, computer) {
        var key = "_" + name;
        obj.prototype[name] = function cachedProperty2() {
          return this[key] !== void 0 ? this[key] : this[key] = computer.call(this);
        };
      }
      utils.cachedProperty = cachedProperty;
      function parseBytes(bytes) {
        return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
      }
      utils.parseBytes = parseBytes;
      function intFromLE(bytes) {
        return new BN(bytes, "hex", "le");
      }
      utils.intFromLE = intFromLE;
    }
  });

  // (disabled):crypto
  var require_crypto2 = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/brorand/index.js
  var require_brorand = __commonJS({
    "node_modules/brorand/index.js"(exports, module) {
      var r;
      module.exports = function rand(len) {
        if (!r)
          r = new Rand(null);
        return r.generate(len);
      };
      function Rand(rand) {
        this.rand = rand;
      }
      module.exports.Rand = Rand;
      Rand.prototype.generate = function generate(len) {
        return this._rand(len);
      };
      Rand.prototype._rand = function _rand(n) {
        if (this.rand.getBytes)
          return this.rand.getBytes(n);
        var res = new Uint8Array(n);
        for (var i = 0; i < res.length; i++)
          res[i] = this.rand.getByte();
        return res;
      };
      if (typeof self === "object") {
        if (self.crypto && self.crypto.getRandomValues) {
          Rand.prototype._rand = function _rand(n) {
            var arr = new Uint8Array(n);
            self.crypto.getRandomValues(arr);
            return arr;
          };
        } else if (self.msCrypto && self.msCrypto.getRandomValues) {
          Rand.prototype._rand = function _rand(n) {
            var arr = new Uint8Array(n);
            self.msCrypto.getRandomValues(arr);
            return arr;
          };
        } else if (typeof window === "object") {
          Rand.prototype._rand = function() {
            throw new Error("Not implemented yet");
          };
        }
      } else {
        try {
          crypto2 = require_crypto2();
          if (typeof crypto2.randomBytes !== "function")
            throw new Error("Not supported");
          Rand.prototype._rand = function _rand(n) {
            return crypto2.randomBytes(n);
          };
        } catch (e) {
        }
      }
      var crypto2;
    }
  });

  // node_modules/elliptic/lib/elliptic/curve/base.js
  var require_base = __commonJS({
    "node_modules/elliptic/lib/elliptic/curve/base.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var utils = require_utils3();
      var getNAF = utils.getNAF;
      var getJSF = utils.getJSF;
      var assert = utils.assert;
      function BaseCurve(type, conf) {
        this.type = type;
        this.p = new BN(conf.p, 16);
        this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);
        this.zero = new BN(0).toRed(this.red);
        this.one = new BN(1).toRed(this.red);
        this.two = new BN(2).toRed(this.red);
        this.n = conf.n && new BN(conf.n, 16);
        this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
        this._wnafT1 = new Array(4);
        this._wnafT2 = new Array(4);
        this._wnafT3 = new Array(4);
        this._wnafT4 = new Array(4);
        this._bitLength = this.n ? this.n.bitLength() : 0;
        var adjustCount = this.n && this.p.div(this.n);
        if (!adjustCount || adjustCount.cmpn(100) > 0) {
          this.redN = null;
        } else {
          this._maxwellTrick = true;
          this.redN = this.n.toRed(this.red);
        }
      }
      module.exports = BaseCurve;
      BaseCurve.prototype.point = function point() {
        throw new Error("Not implemented");
      };
      BaseCurve.prototype.validate = function validate() {
        throw new Error("Not implemented");
      };
      BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
        assert(p.precomputed);
        var doubles = p._getDoubles();
        var naf = getNAF(k, 1, this._bitLength);
        var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
        I /= 3;
        var repr = [];
        var j;
        var nafW;
        for (j = 0; j < naf.length; j += doubles.step) {
          nafW = 0;
          for (var l = j + doubles.step - 1; l >= j; l--)
            nafW = (nafW << 1) + naf[l];
          repr.push(nafW);
        }
        var a = this.jpoint(null, null, null);
        var b = this.jpoint(null, null, null);
        for (var i = I; i > 0; i--) {
          for (j = 0; j < repr.length; j++) {
            nafW = repr[j];
            if (nafW === i)
              b = b.mixedAdd(doubles.points[j]);
            else if (nafW === -i)
              b = b.mixedAdd(doubles.points[j].neg());
          }
          a = a.add(b);
        }
        return a.toP();
      };
      BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
        var w = 4;
        var nafPoints = p._getNAFPoints(w);
        w = nafPoints.wnd;
        var wnd = nafPoints.points;
        var naf = getNAF(k, w, this._bitLength);
        var acc = this.jpoint(null, null, null);
        for (var i = naf.length - 1; i >= 0; i--) {
          for (var l = 0; i >= 0 && naf[i] === 0; i--)
            l++;
          if (i >= 0)
            l++;
          acc = acc.dblp(l);
          if (i < 0)
            break;
          var z = naf[i];
          assert(z !== 0);
          if (p.type === "affine") {
            if (z > 0)
              acc = acc.mixedAdd(wnd[z - 1 >> 1]);
            else
              acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
          } else {
            if (z > 0)
              acc = acc.add(wnd[z - 1 >> 1]);
            else
              acc = acc.add(wnd[-z - 1 >> 1].neg());
          }
        }
        return p.type === "affine" ? acc.toP() : acc;
      };
      BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
        var wndWidth = this._wnafT1;
        var wnd = this._wnafT2;
        var naf = this._wnafT3;
        var max = 0;
        var i;
        var j;
        var p;
        for (i = 0; i < len; i++) {
          p = points[i];
          var nafPoints = p._getNAFPoints(defW);
          wndWidth[i] = nafPoints.wnd;
          wnd[i] = nafPoints.points;
        }
        for (i = len - 1; i >= 1; i -= 2) {
          var a = i - 1;
          var b = i;
          if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
            naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
            naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
            max = Math.max(naf[a].length, max);
            max = Math.max(naf[b].length, max);
            continue;
          }
          var comb = [
            points[a],
            /* 1 */
            null,
            /* 3 */
            null,
            /* 5 */
            points[b]
            /* 7 */
          ];
          if (points[a].y.cmp(points[b].y) === 0) {
            comb[1] = points[a].add(points[b]);
            comb[2] = points[a].toJ().mixedAdd(points[b].neg());
          } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
            comb[1] = points[a].toJ().mixedAdd(points[b]);
            comb[2] = points[a].add(points[b].neg());
          } else {
            comb[1] = points[a].toJ().mixedAdd(points[b]);
            comb[2] = points[a].toJ().mixedAdd(points[b].neg());
          }
          var index = [
            -3,
            /* -1 -1 */
            -1,
            /* -1 0 */
            -5,
            /* -1 1 */
            -7,
            /* 0 -1 */
            0,
            /* 0 0 */
            7,
            /* 0 1 */
            5,
            /* 1 -1 */
            1,
            /* 1 0 */
            3
            /* 1 1 */
          ];
          var jsf = getJSF(coeffs[a], coeffs[b]);
          max = Math.max(jsf[0].length, max);
          naf[a] = new Array(max);
          naf[b] = new Array(max);
          for (j = 0; j < max; j++) {
            var ja = jsf[0][j] | 0;
            var jb = jsf[1][j] | 0;
            naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
            naf[b][j] = 0;
            wnd[a] = comb;
          }
        }
        var acc = this.jpoint(null, null, null);
        var tmp = this._wnafT4;
        for (i = max; i >= 0; i--) {
          var k = 0;
          while (i >= 0) {
            var zero = true;
            for (j = 0; j < len; j++) {
              tmp[j] = naf[j][i] | 0;
              if (tmp[j] !== 0)
                zero = false;
            }
            if (!zero)
              break;
            k++;
            i--;
          }
          if (i >= 0)
            k++;
          acc = acc.dblp(k);
          if (i < 0)
            break;
          for (j = 0; j < len; j++) {
            var z = tmp[j];
            p;
            if (z === 0)
              continue;
            else if (z > 0)
              p = wnd[j][z - 1 >> 1];
            else if (z < 0)
              p = wnd[j][-z - 1 >> 1].neg();
            if (p.type === "affine")
              acc = acc.mixedAdd(p);
            else
              acc = acc.add(p);
          }
        }
        for (i = 0; i < len; i++)
          wnd[i] = null;
        if (jacobianResult)
          return acc;
        else
          return acc.toP();
      };
      function BasePoint(curve, type) {
        this.curve = curve;
        this.type = type;
        this.precomputed = null;
      }
      BaseCurve.BasePoint = BasePoint;
      BasePoint.prototype.eq = function eq() {
        throw new Error("Not implemented");
      };
      BasePoint.prototype.validate = function validate() {
        return this.curve.validate(this);
      };
      BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
        bytes = utils.toArray(bytes, enc);
        var len = this.p.byteLength();
        if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
          if (bytes[0] === 6)
            assert(bytes[bytes.length - 1] % 2 === 0);
          else if (bytes[0] === 7)
            assert(bytes[bytes.length - 1] % 2 === 1);
          var res = this.point(
            bytes.slice(1, 1 + len),
            bytes.slice(1 + len, 1 + 2 * len)
          );
          return res;
        } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
          return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
        }
        throw new Error("Unknown point format");
      };
      BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
        return this.encode(enc, true);
      };
      BasePoint.prototype._encode = function _encode(compact) {
        var len = this.curve.p.byteLength();
        var x = this.getX().toArray("be", len);
        if (compact)
          return [this.getY().isEven() ? 2 : 3].concat(x);
        return [4].concat(x, this.getY().toArray("be", len));
      };
      BasePoint.prototype.encode = function encode(enc, compact) {
        return utils.encode(this._encode(compact), enc);
      };
      BasePoint.prototype.precompute = function precompute(power) {
        if (this.precomputed)
          return this;
        var precomputed = {
          doubles: null,
          naf: null,
          beta: null
        };
        precomputed.naf = this._getNAFPoints(8);
        precomputed.doubles = this._getDoubles(4, power);
        precomputed.beta = this._getBeta();
        this.precomputed = precomputed;
        return this;
      };
      BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
        if (!this.precomputed)
          return false;
        var doubles = this.precomputed.doubles;
        if (!doubles)
          return false;
        return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
      };
      BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
        if (this.precomputed && this.precomputed.doubles)
          return this.precomputed.doubles;
        var doubles = [this];
        var acc = this;
        for (var i = 0; i < power; i += step) {
          for (var j = 0; j < step; j++)
            acc = acc.dbl();
          doubles.push(acc);
        }
        return {
          step,
          points: doubles
        };
      };
      BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
        if (this.precomputed && this.precomputed.naf)
          return this.precomputed.naf;
        var res = [this];
        var max = (1 << wnd) - 1;
        var dbl = max === 1 ? null : this.dbl();
        for (var i = 1; i < max; i++)
          res[i] = res[i - 1].add(dbl);
        return {
          wnd,
          points: res
        };
      };
      BasePoint.prototype._getBeta = function _getBeta() {
        return null;
      };
      BasePoint.prototype.dblp = function dblp(k) {
        var r = this;
        for (var i = 0; i < k; i++)
          r = r.dbl();
        return r;
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/elliptic/lib/elliptic/curve/short.js
  var require_short = __commonJS({
    "node_modules/elliptic/lib/elliptic/curve/short.js"(exports, module) {
      "use strict";
      var utils = require_utils3();
      var BN = require_bn();
      var inherits = require_inherits_browser();
      var Base = require_base();
      var assert = utils.assert;
      function ShortCurve(conf) {
        Base.call(this, "short", conf);
        this.a = new BN(conf.a, 16).toRed(this.red);
        this.b = new BN(conf.b, 16).toRed(this.red);
        this.tinv = this.two.redInvm();
        this.zeroA = this.a.fromRed().cmpn(0) === 0;
        this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
        this.endo = this._getEndomorphism(conf);
        this._endoWnafT1 = new Array(4);
        this._endoWnafT2 = new Array(4);
      }
      inherits(ShortCurve, Base);
      module.exports = ShortCurve;
      ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
        if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
          return;
        var beta;
        var lambda;
        if (conf.beta) {
          beta = new BN(conf.beta, 16).toRed(this.red);
        } else {
          var betas = this._getEndoRoots(this.p);
          beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
          beta = beta.toRed(this.red);
        }
        if (conf.lambda) {
          lambda = new BN(conf.lambda, 16);
        } else {
          var lambdas = this._getEndoRoots(this.n);
          if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
            lambda = lambdas[0];
          } else {
            lambda = lambdas[1];
            assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
          }
        }
        var basis;
        if (conf.basis) {
          basis = conf.basis.map(function(vec) {
            return {
              a: new BN(vec.a, 16),
              b: new BN(vec.b, 16)
            };
          });
        } else {
          basis = this._getEndoBasis(lambda);
        }
        return {
          beta,
          lambda,
          basis
        };
      };
      ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
        var red = num === this.p ? this.red : BN.mont(num);
        var tinv = new BN(2).toRed(red).redInvm();
        var ntinv = tinv.redNeg();
        var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);
        var l1 = ntinv.redAdd(s).fromRed();
        var l2 = ntinv.redSub(s).fromRed();
        return [l1, l2];
      };
      ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
        var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
        var u = lambda;
        var v = this.n.clone();
        var x1 = new BN(1);
        var y1 = new BN(0);
        var x2 = new BN(0);
        var y2 = new BN(1);
        var a0;
        var b0;
        var a1;
        var b1;
        var a2;
        var b2;
        var prevR;
        var i = 0;
        var r;
        var x;
        while (u.cmpn(0) !== 0) {
          var q = v.div(u);
          r = v.sub(q.mul(u));
          x = x2.sub(q.mul(x1));
          var y = y2.sub(q.mul(y1));
          if (!a1 && r.cmp(aprxSqrt) < 0) {
            a0 = prevR.neg();
            b0 = x1;
            a1 = r.neg();
            b1 = x;
          } else if (a1 && ++i === 2) {
            break;
          }
          prevR = r;
          v = u;
          u = r;
          x2 = x1;
          x1 = x;
          y2 = y1;
          y1 = y;
        }
        a2 = r.neg();
        b2 = x;
        var len1 = a1.sqr().add(b1.sqr());
        var len2 = a2.sqr().add(b2.sqr());
        if (len2.cmp(len1) >= 0) {
          a2 = a0;
          b2 = b0;
        }
        if (a1.negative) {
          a1 = a1.neg();
          b1 = b1.neg();
        }
        if (a2.negative) {
          a2 = a2.neg();
          b2 = b2.neg();
        }
        return [
          { a: a1, b: b1 },
          { a: a2, b: b2 }
        ];
      };
      ShortCurve.prototype._endoSplit = function _endoSplit(k) {
        var basis = this.endo.basis;
        var v1 = basis[0];
        var v2 = basis[1];
        var c1 = v2.b.mul(k).divRound(this.n);
        var c2 = v1.b.neg().mul(k).divRound(this.n);
        var p1 = c1.mul(v1.a);
        var p2 = c2.mul(v2.a);
        var q1 = c1.mul(v1.b);
        var q2 = c2.mul(v2.b);
        var k1 = k.sub(p1).sub(p2);
        var k2 = q1.add(q2).neg();
        return { k1, k2 };
      };
      ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
        x = new BN(x, 16);
        if (!x.red)
          x = x.toRed(this.red);
        var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
        var y = y2.redSqrt();
        if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
          throw new Error("invalid point");
        var isOdd = y.fromRed().isOdd();
        if (odd && !isOdd || !odd && isOdd)
          y = y.redNeg();
        return this.point(x, y);
      };
      ShortCurve.prototype.validate = function validate(point) {
        if (point.inf)
          return true;
        var x = point.x;
        var y = point.y;
        var ax = this.a.redMul(x);
        var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
        return y.redSqr().redISub(rhs).cmpn(0) === 0;
      };
      ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
        var npoints = this._endoWnafT1;
        var ncoeffs = this._endoWnafT2;
        for (var i = 0; i < points.length; i++) {
          var split = this._endoSplit(coeffs[i]);
          var p = points[i];
          var beta = p._getBeta();
          if (split.k1.negative) {
            split.k1.ineg();
            p = p.neg(true);
          }
          if (split.k2.negative) {
            split.k2.ineg();
            beta = beta.neg(true);
          }
          npoints[i * 2] = p;
          npoints[i * 2 + 1] = beta;
          ncoeffs[i * 2] = split.k1;
          ncoeffs[i * 2 + 1] = split.k2;
        }
        var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
        for (var j = 0; j < i * 2; j++) {
          npoints[j] = null;
          ncoeffs[j] = null;
        }
        return res;
      };
      function Point(curve, x, y, isRed) {
        Base.BasePoint.call(this, curve, "affine");
        if (x === null && y === null) {
          this.x = null;
          this.y = null;
          this.inf = true;
        } else {
          this.x = new BN(x, 16);
          this.y = new BN(y, 16);
          if (isRed) {
            this.x.forceRed(this.curve.red);
            this.y.forceRed(this.curve.red);
          }
          if (!this.x.red)
            this.x = this.x.toRed(this.curve.red);
          if (!this.y.red)
            this.y = this.y.toRed(this.curve.red);
          this.inf = false;
        }
      }
      inherits(Point, Base.BasePoint);
      ShortCurve.prototype.point = function point(x, y, isRed) {
        return new Point(this, x, y, isRed);
      };
      ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
        return Point.fromJSON(this, obj, red);
      };
      Point.prototype._getBeta = function _getBeta() {
        if (!this.curve.endo)
          return;
        var pre = this.precomputed;
        if (pre && pre.beta)
          return pre.beta;
        var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
        if (pre) {
          var curve = this.curve;
          var endoMul = function(p) {
            return curve.point(p.x.redMul(curve.endo.beta), p.y);
          };
          pre.beta = beta;
          beta.precomputed = {
            beta: null,
            naf: pre.naf && {
              wnd: pre.naf.wnd,
              points: pre.naf.points.map(endoMul)
            },
            doubles: pre.doubles && {
              step: pre.doubles.step,
              points: pre.doubles.points.map(endoMul)
            }
          };
        }
        return beta;
      };
      Point.prototype.toJSON = function toJSON() {
        if (!this.precomputed)
          return [this.x, this.y];
        return [this.x, this.y, this.precomputed && {
          doubles: this.precomputed.doubles && {
            step: this.precomputed.doubles.step,
            points: this.precomputed.doubles.points.slice(1)
          },
          naf: this.precomputed.naf && {
            wnd: this.precomputed.naf.wnd,
            points: this.precomputed.naf.points.slice(1)
          }
        }];
      };
      Point.fromJSON = function fromJSON(curve, obj, red) {
        if (typeof obj === "string")
          obj = JSON.parse(obj);
        var res = curve.point(obj[0], obj[1], red);
        if (!obj[2])
          return res;
        function obj2point(obj2) {
          return curve.point(obj2[0], obj2[1], red);
        }
        var pre = obj[2];
        res.precomputed = {
          beta: null,
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: [res].concat(pre.doubles.points.map(obj2point))
          },
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: [res].concat(pre.naf.points.map(obj2point))
          }
        };
        return res;
      };
      Point.prototype.inspect = function inspect() {
        if (this.isInfinity())
          return "<EC Point Infinity>";
        return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
      };
      Point.prototype.isInfinity = function isInfinity() {
        return this.inf;
      };
      Point.prototype.add = function add(p) {
        if (this.inf)
          return p;
        if (p.inf)
          return this;
        if (this.eq(p))
          return this.dbl();
        if (this.neg().eq(p))
          return this.curve.point(null, null);
        if (this.x.cmp(p.x) === 0)
          return this.curve.point(null, null);
        var c = this.y.redSub(p.y);
        if (c.cmpn(0) !== 0)
          c = c.redMul(this.x.redSub(p.x).redInvm());
        var nx = c.redSqr().redISub(this.x).redISub(p.x);
        var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
        return this.curve.point(nx, ny);
      };
      Point.prototype.dbl = function dbl() {
        if (this.inf)
          return this;
        var ys1 = this.y.redAdd(this.y);
        if (ys1.cmpn(0) === 0)
          return this.curve.point(null, null);
        var a = this.curve.a;
        var x2 = this.x.redSqr();
        var dyinv = ys1.redInvm();
        var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
        var nx = c.redSqr().redISub(this.x.redAdd(this.x));
        var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
        return this.curve.point(nx, ny);
      };
      Point.prototype.getX = function getX() {
        return this.x.fromRed();
      };
      Point.prototype.getY = function getY() {
        return this.y.fromRed();
      };
      Point.prototype.mul = function mul(k) {
        k = new BN(k, 16);
        if (this.isInfinity())
          return this;
        else if (this._hasDoubles(k))
          return this.curve._fixedNafMul(this, k);
        else if (this.curve.endo)
          return this.curve._endoWnafMulAdd([this], [k]);
        else
          return this.curve._wnafMul(this, k);
      };
      Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
        var points = [this, p2];
        var coeffs = [k1, k2];
        if (this.curve.endo)
          return this.curve._endoWnafMulAdd(points, coeffs);
        else
          return this.curve._wnafMulAdd(1, points, coeffs, 2);
      };
      Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
        var points = [this, p2];
        var coeffs = [k1, k2];
        if (this.curve.endo)
          return this.curve._endoWnafMulAdd(points, coeffs, true);
        else
          return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
      };
      Point.prototype.eq = function eq(p) {
        return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
      };
      Point.prototype.neg = function neg(_precompute) {
        if (this.inf)
          return this;
        var res = this.curve.point(this.x, this.y.redNeg());
        if (_precompute && this.precomputed) {
          var pre = this.precomputed;
          var negate = function(p) {
            return p.neg();
          };
          res.precomputed = {
            naf: pre.naf && {
              wnd: pre.naf.wnd,
              points: pre.naf.points.map(negate)
            },
            doubles: pre.doubles && {
              step: pre.doubles.step,
              points: pre.doubles.points.map(negate)
            }
          };
        }
        return res;
      };
      Point.prototype.toJ = function toJ() {
        if (this.inf)
          return this.curve.jpoint(null, null, null);
        var res = this.curve.jpoint(this.x, this.y, this.curve.one);
        return res;
      };
      function JPoint(curve, x, y, z) {
        Base.BasePoint.call(this, curve, "jacobian");
        if (x === null && y === null && z === null) {
          this.x = this.curve.one;
          this.y = this.curve.one;
          this.z = new BN(0);
        } else {
          this.x = new BN(x, 16);
          this.y = new BN(y, 16);
          this.z = new BN(z, 16);
        }
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
        this.zOne = this.z === this.curve.one;
      }
      inherits(JPoint, Base.BasePoint);
      ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
        return new JPoint(this, x, y, z);
      };
      JPoint.prototype.toP = function toP() {
        if (this.isInfinity())
          return this.curve.point(null, null);
        var zinv = this.z.redInvm();
        var zinv2 = zinv.redSqr();
        var ax = this.x.redMul(zinv2);
        var ay = this.y.redMul(zinv2).redMul(zinv);
        return this.curve.point(ax, ay);
      };
      JPoint.prototype.neg = function neg() {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
      };
      JPoint.prototype.add = function add(p) {
        if (this.isInfinity())
          return p;
        if (p.isInfinity())
          return this;
        var pz2 = p.z.redSqr();
        var z2 = this.z.redSqr();
        var u1 = this.x.redMul(pz2);
        var u2 = p.x.redMul(z2);
        var s1 = this.y.redMul(pz2.redMul(p.z));
        var s2 = p.y.redMul(z2.redMul(this.z));
        var h = u1.redSub(u2);
        var r = s1.redSub(s2);
        if (h.cmpn(0) === 0) {
          if (r.cmpn(0) !== 0)
            return this.curve.jpoint(null, null, null);
          else
            return this.dbl();
        }
        var h2 = h.redSqr();
        var h3 = h2.redMul(h);
        var v = u1.redMul(h2);
        var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
        var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
        var nz = this.z.redMul(p.z).redMul(h);
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype.mixedAdd = function mixedAdd(p) {
        if (this.isInfinity())
          return p.toJ();
        if (p.isInfinity())
          return this;
        var z2 = this.z.redSqr();
        var u1 = this.x;
        var u2 = p.x.redMul(z2);
        var s1 = this.y;
        var s2 = p.y.redMul(z2).redMul(this.z);
        var h = u1.redSub(u2);
        var r = s1.redSub(s2);
        if (h.cmpn(0) === 0) {
          if (r.cmpn(0) !== 0)
            return this.curve.jpoint(null, null, null);
          else
            return this.dbl();
        }
        var h2 = h.redSqr();
        var h3 = h2.redMul(h);
        var v = u1.redMul(h2);
        var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
        var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
        var nz = this.z.redMul(h);
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype.dblp = function dblp(pow) {
        if (pow === 0)
          return this;
        if (this.isInfinity())
          return this;
        if (!pow)
          return this.dbl();
        var i;
        if (this.curve.zeroA || this.curve.threeA) {
          var r = this;
          for (i = 0; i < pow; i++)
            r = r.dbl();
          return r;
        }
        var a = this.curve.a;
        var tinv = this.curve.tinv;
        var jx = this.x;
        var jy = this.y;
        var jz = this.z;
        var jz4 = jz.redSqr().redSqr();
        var jyd = jy.redAdd(jy);
        for (i = 0; i < pow; i++) {
          var jx2 = jx.redSqr();
          var jyd2 = jyd.redSqr();
          var jyd4 = jyd2.redSqr();
          var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
          var t1 = jx.redMul(jyd2);
          var nx = c.redSqr().redISub(t1.redAdd(t1));
          var t2 = t1.redISub(nx);
          var dny = c.redMul(t2);
          dny = dny.redIAdd(dny).redISub(jyd4);
          var nz = jyd.redMul(jz);
          if (i + 1 < pow)
            jz4 = jz4.redMul(jyd4);
          jx = nx;
          jz = nz;
          jyd = dny;
        }
        return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
      };
      JPoint.prototype.dbl = function dbl() {
        if (this.isInfinity())
          return this;
        if (this.curve.zeroA)
          return this._zeroDbl();
        else if (this.curve.threeA)
          return this._threeDbl();
        else
          return this._dbl();
      };
      JPoint.prototype._zeroDbl = function _zeroDbl() {
        var nx;
        var ny;
        var nz;
        if (this.zOne) {
          var xx = this.x.redSqr();
          var yy = this.y.redSqr();
          var yyyy = yy.redSqr();
          var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
          s = s.redIAdd(s);
          var m = xx.redAdd(xx).redIAdd(xx);
          var t = m.redSqr().redISub(s).redISub(s);
          var yyyy8 = yyyy.redIAdd(yyyy);
          yyyy8 = yyyy8.redIAdd(yyyy8);
          yyyy8 = yyyy8.redIAdd(yyyy8);
          nx = t;
          ny = m.redMul(s.redISub(t)).redISub(yyyy8);
          nz = this.y.redAdd(this.y);
        } else {
          var a = this.x.redSqr();
          var b = this.y.redSqr();
          var c = b.redSqr();
          var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
          d = d.redIAdd(d);
          var e = a.redAdd(a).redIAdd(a);
          var f = e.redSqr();
          var c8 = c.redIAdd(c);
          c8 = c8.redIAdd(c8);
          c8 = c8.redIAdd(c8);
          nx = f.redISub(d).redISub(d);
          ny = e.redMul(d.redISub(nx)).redISub(c8);
          nz = this.y.redMul(this.z);
          nz = nz.redIAdd(nz);
        }
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype._threeDbl = function _threeDbl() {
        var nx;
        var ny;
        var nz;
        if (this.zOne) {
          var xx = this.x.redSqr();
          var yy = this.y.redSqr();
          var yyyy = yy.redSqr();
          var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
          s = s.redIAdd(s);
          var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
          var t = m.redSqr().redISub(s).redISub(s);
          nx = t;
          var yyyy8 = yyyy.redIAdd(yyyy);
          yyyy8 = yyyy8.redIAdd(yyyy8);
          yyyy8 = yyyy8.redIAdd(yyyy8);
          ny = m.redMul(s.redISub(t)).redISub(yyyy8);
          nz = this.y.redAdd(this.y);
        } else {
          var delta = this.z.redSqr();
          var gamma = this.y.redSqr();
          var beta = this.x.redMul(gamma);
          var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
          alpha = alpha.redAdd(alpha).redIAdd(alpha);
          var beta4 = beta.redIAdd(beta);
          beta4 = beta4.redIAdd(beta4);
          var beta8 = beta4.redAdd(beta4);
          nx = alpha.redSqr().redISub(beta8);
          nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
          var ggamma8 = gamma.redSqr();
          ggamma8 = ggamma8.redIAdd(ggamma8);
          ggamma8 = ggamma8.redIAdd(ggamma8);
          ggamma8 = ggamma8.redIAdd(ggamma8);
          ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
        }
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype._dbl = function _dbl() {
        var a = this.curve.a;
        var jx = this.x;
        var jy = this.y;
        var jz = this.z;
        var jz4 = jz.redSqr().redSqr();
        var jx2 = jx.redSqr();
        var jy2 = jy.redSqr();
        var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
        var jxd4 = jx.redAdd(jx);
        jxd4 = jxd4.redIAdd(jxd4);
        var t1 = jxd4.redMul(jy2);
        var nx = c.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var jyd8 = jy2.redSqr();
        jyd8 = jyd8.redIAdd(jyd8);
        jyd8 = jyd8.redIAdd(jyd8);
        jyd8 = jyd8.redIAdd(jyd8);
        var ny = c.redMul(t2).redISub(jyd8);
        var nz = jy.redAdd(jy).redMul(jz);
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype.trpl = function trpl() {
        if (!this.curve.zeroA)
          return this.dbl().add(this);
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var zz = this.z.redSqr();
        var yyyy = yy.redSqr();
        var m = xx.redAdd(xx).redIAdd(xx);
        var mm = m.redSqr();
        var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        e = e.redIAdd(e);
        e = e.redAdd(e).redIAdd(e);
        e = e.redISub(mm);
        var ee = e.redSqr();
        var t = yyyy.redIAdd(yyyy);
        t = t.redIAdd(t);
        t = t.redIAdd(t);
        t = t.redIAdd(t);
        var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
        var yyu4 = yy.redMul(u);
        yyu4 = yyu4.redIAdd(yyu4);
        yyu4 = yyu4.redIAdd(yyu4);
        var nx = this.x.redMul(ee).redISub(yyu4);
        nx = nx.redIAdd(nx);
        nx = nx.redIAdd(nx);
        var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
        ny = ny.redIAdd(ny);
        ny = ny.redIAdd(ny);
        ny = ny.redIAdd(ny);
        var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
        return this.curve.jpoint(nx, ny, nz);
      };
      JPoint.prototype.mul = function mul(k, kbase) {
        k = new BN(k, kbase);
        return this.curve._wnafMul(this, k);
      };
      JPoint.prototype.eq = function eq(p) {
        if (p.type === "affine")
          return this.eq(p.toJ());
        if (this === p)
          return true;
        var z2 = this.z.redSqr();
        var pz2 = p.z.redSqr();
        if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
          return false;
        var z3 = z2.redMul(this.z);
        var pz3 = pz2.redMul(p.z);
        return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
      };
      JPoint.prototype.eqXToP = function eqXToP(x) {
        var zs = this.z.redSqr();
        var rx = x.toRed(this.curve.red).redMul(zs);
        if (this.x.cmp(rx) === 0)
          return true;
        var xc = x.clone();
        var t = this.curve.redN.redMul(zs);
        for (; ; ) {
          xc.iadd(this.curve.n);
          if (xc.cmp(this.curve.p) >= 0)
            return false;
          rx.redIAdd(t);
          if (this.x.cmp(rx) === 0)
            return true;
        }
      };
      JPoint.prototype.inspect = function inspect() {
        if (this.isInfinity())
          return "<EC JPoint Infinity>";
        return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
      };
      JPoint.prototype.isInfinity = function isInfinity() {
        return this.z.cmpn(0) === 0;
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/curve/mont.js
  var require_mont = __commonJS({
    "node_modules/elliptic/lib/elliptic/curve/mont.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var inherits = require_inherits_browser();
      var Base = require_base();
      var utils = require_utils3();
      function MontCurve(conf) {
        Base.call(this, "mont", conf);
        this.a = new BN(conf.a, 16).toRed(this.red);
        this.b = new BN(conf.b, 16).toRed(this.red);
        this.i4 = new BN(4).toRed(this.red).redInvm();
        this.two = new BN(2).toRed(this.red);
        this.a24 = this.i4.redMul(this.a.redAdd(this.two));
      }
      inherits(MontCurve, Base);
      module.exports = MontCurve;
      MontCurve.prototype.validate = function validate(point) {
        var x = point.normalize().x;
        var x2 = x.redSqr();
        var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
        var y = rhs.redSqrt();
        return y.redSqr().cmp(rhs) === 0;
      };
      function Point(curve, x, z) {
        Base.BasePoint.call(this, curve, "projective");
        if (x === null && z === null) {
          this.x = this.curve.one;
          this.z = this.curve.zero;
        } else {
          this.x = new BN(x, 16);
          this.z = new BN(z, 16);
          if (!this.x.red)
            this.x = this.x.toRed(this.curve.red);
          if (!this.z.red)
            this.z = this.z.toRed(this.curve.red);
        }
      }
      inherits(Point, Base.BasePoint);
      MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
        return this.point(utils.toArray(bytes, enc), 1);
      };
      MontCurve.prototype.point = function point(x, z) {
        return new Point(this, x, z);
      };
      MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
        return Point.fromJSON(this, obj);
      };
      Point.prototype.precompute = function precompute() {
      };
      Point.prototype._encode = function _encode() {
        return this.getX().toArray("be", this.curve.p.byteLength());
      };
      Point.fromJSON = function fromJSON(curve, obj) {
        return new Point(curve, obj[0], obj[1] || curve.one);
      };
      Point.prototype.inspect = function inspect() {
        if (this.isInfinity())
          return "<EC Point Infinity>";
        return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
      };
      Point.prototype.isInfinity = function isInfinity() {
        return this.z.cmpn(0) === 0;
      };
      Point.prototype.dbl = function dbl() {
        var a = this.x.redAdd(this.z);
        var aa = a.redSqr();
        var b = this.x.redSub(this.z);
        var bb = b.redSqr();
        var c = aa.redSub(bb);
        var nx = aa.redMul(bb);
        var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
        return this.curve.point(nx, nz);
      };
      Point.prototype.add = function add() {
        throw new Error("Not supported on Montgomery curve");
      };
      Point.prototype.diffAdd = function diffAdd(p, diff) {
        var a = this.x.redAdd(this.z);
        var b = this.x.redSub(this.z);
        var c = p.x.redAdd(p.z);
        var d = p.x.redSub(p.z);
        var da = d.redMul(a);
        var cb = c.redMul(b);
        var nx = diff.z.redMul(da.redAdd(cb).redSqr());
        var nz = diff.x.redMul(da.redISub(cb).redSqr());
        return this.curve.point(nx, nz);
      };
      Point.prototype.mul = function mul(k) {
        var t = k.clone();
        var a = this;
        var b = this.curve.point(null, null);
        var c = this;
        for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
          bits.push(t.andln(1));
        for (var i = bits.length - 1; i >= 0; i--) {
          if (bits[i] === 0) {
            a = a.diffAdd(b, c);
            b = b.dbl();
          } else {
            b = a.diffAdd(b, c);
            a = a.dbl();
          }
        }
        return b;
      };
      Point.prototype.mulAdd = function mulAdd() {
        throw new Error("Not supported on Montgomery curve");
      };
      Point.prototype.jumlAdd = function jumlAdd() {
        throw new Error("Not supported on Montgomery curve");
      };
      Point.prototype.eq = function eq(other) {
        return this.getX().cmp(other.getX()) === 0;
      };
      Point.prototype.normalize = function normalize() {
        this.x = this.x.redMul(this.z.redInvm());
        this.z = this.curve.one;
        return this;
      };
      Point.prototype.getX = function getX() {
        this.normalize();
        return this.x.fromRed();
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/curve/edwards.js
  var require_edwards = __commonJS({
    "node_modules/elliptic/lib/elliptic/curve/edwards.js"(exports, module) {
      "use strict";
      var utils = require_utils3();
      var BN = require_bn();
      var inherits = require_inherits_browser();
      var Base = require_base();
      var assert = utils.assert;
      function EdwardsCurve(conf) {
        this.twisted = (conf.a | 0) !== 1;
        this.mOneA = this.twisted && (conf.a | 0) === -1;
        this.extended = this.mOneA;
        Base.call(this, "edwards", conf);
        this.a = new BN(conf.a, 16).umod(this.red.m);
        this.a = this.a.toRed(this.red);
        this.c = new BN(conf.c, 16).toRed(this.red);
        this.c2 = this.c.redSqr();
        this.d = new BN(conf.d, 16).toRed(this.red);
        this.dd = this.d.redAdd(this.d);
        assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
        this.oneC = (conf.c | 0) === 1;
      }
      inherits(EdwardsCurve, Base);
      module.exports = EdwardsCurve;
      EdwardsCurve.prototype._mulA = function _mulA(num) {
        if (this.mOneA)
          return num.redNeg();
        else
          return this.a.redMul(num);
      };
      EdwardsCurve.prototype._mulC = function _mulC(num) {
        if (this.oneC)
          return num;
        else
          return this.c.redMul(num);
      };
      EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
        return this.point(x, y, z, t);
      };
      EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
        x = new BN(x, 16);
        if (!x.red)
          x = x.toRed(this.red);
        var x2 = x.redSqr();
        var rhs = this.c2.redSub(this.a.redMul(x2));
        var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));
        var y2 = rhs.redMul(lhs.redInvm());
        var y = y2.redSqrt();
        if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
          throw new Error("invalid point");
        var isOdd = y.fromRed().isOdd();
        if (odd && !isOdd || !odd && isOdd)
          y = y.redNeg();
        return this.point(x, y);
      };
      EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
        y = new BN(y, 16);
        if (!y.red)
          y = y.toRed(this.red);
        var y2 = y.redSqr();
        var lhs = y2.redSub(this.c2);
        var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
        var x2 = lhs.redMul(rhs.redInvm());
        if (x2.cmp(this.zero) === 0) {
          if (odd)
            throw new Error("invalid point");
          else
            return this.point(this.zero, y);
        }
        var x = x2.redSqrt();
        if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
          throw new Error("invalid point");
        if (x.fromRed().isOdd() !== odd)
          x = x.redNeg();
        return this.point(x, y);
      };
      EdwardsCurve.prototype.validate = function validate(point) {
        if (point.isInfinity())
          return true;
        point.normalize();
        var x2 = point.x.redSqr();
        var y2 = point.y.redSqr();
        var lhs = x2.redMul(this.a).redAdd(y2);
        var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));
        return lhs.cmp(rhs) === 0;
      };
      function Point(curve, x, y, z, t) {
        Base.BasePoint.call(this, curve, "projective");
        if (x === null && y === null && z === null) {
          this.x = this.curve.zero;
          this.y = this.curve.one;
          this.z = this.curve.one;
          this.t = this.curve.zero;
          this.zOne = true;
        } else {
          this.x = new BN(x, 16);
          this.y = new BN(y, 16);
          this.z = z ? new BN(z, 16) : this.curve.one;
          this.t = t && new BN(t, 16);
          if (!this.x.red)
            this.x = this.x.toRed(this.curve.red);
          if (!this.y.red)
            this.y = this.y.toRed(this.curve.red);
          if (!this.z.red)
            this.z = this.z.toRed(this.curve.red);
          if (this.t && !this.t.red)
            this.t = this.t.toRed(this.curve.red);
          this.zOne = this.z === this.curve.one;
          if (this.curve.extended && !this.t) {
            this.t = this.x.redMul(this.y);
            if (!this.zOne)
              this.t = this.t.redMul(this.z.redInvm());
          }
        }
      }
      inherits(Point, Base.BasePoint);
      EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
        return Point.fromJSON(this, obj);
      };
      EdwardsCurve.prototype.point = function point(x, y, z, t) {
        return new Point(this, x, y, z, t);
      };
      Point.fromJSON = function fromJSON(curve, obj) {
        return new Point(curve, obj[0], obj[1], obj[2]);
      };
      Point.prototype.inspect = function inspect() {
        if (this.isInfinity())
          return "<EC Point Infinity>";
        return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
      };
      Point.prototype.isInfinity = function isInfinity() {
        return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
      };
      Point.prototype._extDbl = function _extDbl() {
        var a = this.x.redSqr();
        var b = this.y.redSqr();
        var c = this.z.redSqr();
        c = c.redIAdd(c);
        var d = this.curve._mulA(a);
        var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
        var g = d.redAdd(b);
        var f = g.redSub(c);
        var h = d.redSub(b);
        var nx = e.redMul(f);
        var ny = g.redMul(h);
        var nt = e.redMul(h);
        var nz = f.redMul(g);
        return this.curve.point(nx, ny, nz, nt);
      };
      Point.prototype._projDbl = function _projDbl() {
        var b = this.x.redAdd(this.y).redSqr();
        var c = this.x.redSqr();
        var d = this.y.redSqr();
        var nx;
        var ny;
        var nz;
        var e;
        var h;
        var j;
        if (this.curve.twisted) {
          e = this.curve._mulA(c);
          var f = e.redAdd(d);
          if (this.zOne) {
            nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
            ny = f.redMul(e.redSub(d));
            nz = f.redSqr().redSub(f).redSub(f);
          } else {
            h = this.z.redSqr();
            j = f.redSub(h).redISub(h);
            nx = b.redSub(c).redISub(d).redMul(j);
            ny = f.redMul(e.redSub(d));
            nz = f.redMul(j);
          }
        } else {
          e = c.redAdd(d);
          h = this.curve._mulC(this.z).redSqr();
          j = e.redSub(h).redSub(h);
          nx = this.curve._mulC(b.redISub(e)).redMul(j);
          ny = this.curve._mulC(e).redMul(c.redISub(d));
          nz = e.redMul(j);
        }
        return this.curve.point(nx, ny, nz);
      };
      Point.prototype.dbl = function dbl() {
        if (this.isInfinity())
          return this;
        if (this.curve.extended)
          return this._extDbl();
        else
          return this._projDbl();
      };
      Point.prototype._extAdd = function _extAdd(p) {
        var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
        var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
        var c = this.t.redMul(this.curve.dd).redMul(p.t);
        var d = this.z.redMul(p.z.redAdd(p.z));
        var e = b.redSub(a);
        var f = d.redSub(c);
        var g = d.redAdd(c);
        var h = b.redAdd(a);
        var nx = e.redMul(f);
        var ny = g.redMul(h);
        var nt = e.redMul(h);
        var nz = f.redMul(g);
        return this.curve.point(nx, ny, nz, nt);
      };
      Point.prototype._projAdd = function _projAdd(p) {
        var a = this.z.redMul(p.z);
        var b = a.redSqr();
        var c = this.x.redMul(p.x);
        var d = this.y.redMul(p.y);
        var e = this.curve.d.redMul(c).redMul(d);
        var f = b.redSub(e);
        var g = b.redAdd(e);
        var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
        var nx = a.redMul(f).redMul(tmp);
        var ny;
        var nz;
        if (this.curve.twisted) {
          ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
          nz = f.redMul(g);
        } else {
          ny = a.redMul(g).redMul(d.redSub(c));
          nz = this.curve._mulC(f).redMul(g);
        }
        return this.curve.point(nx, ny, nz);
      };
      Point.prototype.add = function add(p) {
        if (this.isInfinity())
          return p;
        if (p.isInfinity())
          return this;
        if (this.curve.extended)
          return this._extAdd(p);
        else
          return this._projAdd(p);
      };
      Point.prototype.mul = function mul(k) {
        if (this._hasDoubles(k))
          return this.curve._fixedNafMul(this, k);
        else
          return this.curve._wnafMul(this, k);
      };
      Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
        return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, false);
      };
      Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
        return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, true);
      };
      Point.prototype.normalize = function normalize() {
        if (this.zOne)
          return this;
        var zi = this.z.redInvm();
        this.x = this.x.redMul(zi);
        this.y = this.y.redMul(zi);
        if (this.t)
          this.t = this.t.redMul(zi);
        this.z = this.curve.one;
        this.zOne = true;
        return this;
      };
      Point.prototype.neg = function neg() {
        return this.curve.point(
          this.x.redNeg(),
          this.y,
          this.z,
          this.t && this.t.redNeg()
        );
      };
      Point.prototype.getX = function getX() {
        this.normalize();
        return this.x.fromRed();
      };
      Point.prototype.getY = function getY() {
        this.normalize();
        return this.y.fromRed();
      };
      Point.prototype.eq = function eq(other) {
        return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
      };
      Point.prototype.eqXToP = function eqXToP(x) {
        var rx = x.toRed(this.curve.red).redMul(this.z);
        if (this.x.cmp(rx) === 0)
          return true;
        var xc = x.clone();
        var t = this.curve.redN.redMul(this.z);
        for (; ; ) {
          xc.iadd(this.curve.n);
          if (xc.cmp(this.curve.p) >= 0)
            return false;
          rx.redIAdd(t);
          if (this.x.cmp(rx) === 0)
            return true;
        }
      };
      Point.prototype.toP = Point.prototype.normalize;
      Point.prototype.mixedAdd = Point.prototype.add;
    }
  });

  // node_modules/elliptic/lib/elliptic/curve/index.js
  var require_curve = __commonJS({
    "node_modules/elliptic/lib/elliptic/curve/index.js"(exports) {
      "use strict";
      var curve = exports;
      curve.base = require_base();
      curve.short = require_short();
      curve.mont = require_mont();
      curve.edwards = require_edwards();
    }
  });

  // node_modules/hash.js/lib/hash/utils.js
  var require_utils4 = __commonJS({
    "node_modules/hash.js/lib/hash/utils.js"(exports) {
      "use strict";
      var assert = require_minimalistic_assert();
      var inherits = require_inherits_browser();
      exports.inherits = inherits;
      function isSurrogatePair(msg, i) {
        if ((msg.charCodeAt(i) & 64512) !== 55296) {
          return false;
        }
        if (i < 0 || i + 1 >= msg.length) {
          return false;
        }
        return (msg.charCodeAt(i + 1) & 64512) === 56320;
      }
      function toArray(msg, enc) {
        if (Array.isArray(msg))
          return msg.slice();
        if (!msg)
          return [];
        var res = [];
        if (typeof msg === "string") {
          if (!enc) {
            var p = 0;
            for (var i = 0; i < msg.length; i++) {
              var c = msg.charCodeAt(i);
              if (c < 128) {
                res[p++] = c;
              } else if (c < 2048) {
                res[p++] = c >> 6 | 192;
                res[p++] = c & 63 | 128;
              } else if (isSurrogatePair(msg, i)) {
                c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
                res[p++] = c >> 18 | 240;
                res[p++] = c >> 12 & 63 | 128;
                res[p++] = c >> 6 & 63 | 128;
                res[p++] = c & 63 | 128;
              } else {
                res[p++] = c >> 12 | 224;
                res[p++] = c >> 6 & 63 | 128;
                res[p++] = c & 63 | 128;
              }
            }
          } else if (enc === "hex") {
            msg = msg.replace(/[^a-z0-9]+/ig, "");
            if (msg.length % 2 !== 0)
              msg = "0" + msg;
            for (i = 0; i < msg.length; i += 2)
              res.push(parseInt(msg[i] + msg[i + 1], 16));
          }
        } else {
          for (i = 0; i < msg.length; i++)
            res[i] = msg[i] | 0;
        }
        return res;
      }
      exports.toArray = toArray;
      function toHex(msg) {
        var res = "";
        for (var i = 0; i < msg.length; i++)
          res += zero2(msg[i].toString(16));
        return res;
      }
      exports.toHex = toHex;
      function htonl(w) {
        var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
        return res >>> 0;
      }
      exports.htonl = htonl;
      function toHex32(msg, endian) {
        var res = "";
        for (var i = 0; i < msg.length; i++) {
          var w = msg[i];
          if (endian === "little")
            w = htonl(w);
          res += zero8(w.toString(16));
        }
        return res;
      }
      exports.toHex32 = toHex32;
      function zero2(word) {
        if (word.length === 1)
          return "0" + word;
        else
          return word;
      }
      exports.zero2 = zero2;
      function zero8(word) {
        if (word.length === 7)
          return "0" + word;
        else if (word.length === 6)
          return "00" + word;
        else if (word.length === 5)
          return "000" + word;
        else if (word.length === 4)
          return "0000" + word;
        else if (word.length === 3)
          return "00000" + word;
        else if (word.length === 2)
          return "000000" + word;
        else if (word.length === 1)
          return "0000000" + word;
        else
          return word;
      }
      exports.zero8 = zero8;
      function join32(msg, start, end, endian) {
        var len = end - start;
        assert(len % 4 === 0);
        var res = new Array(len / 4);
        for (var i = 0, k = start; i < res.length; i++, k += 4) {
          var w;
          if (endian === "big")
            w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
          else
            w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
          res[i] = w >>> 0;
        }
        return res;
      }
      exports.join32 = join32;
      function split32(msg, endian) {
        var res = new Array(msg.length * 4);
        for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
          var m = msg[i];
          if (endian === "big") {
            res[k] = m >>> 24;
            res[k + 1] = m >>> 16 & 255;
            res[k + 2] = m >>> 8 & 255;
            res[k + 3] = m & 255;
          } else {
            res[k + 3] = m >>> 24;
            res[k + 2] = m >>> 16 & 255;
            res[k + 1] = m >>> 8 & 255;
            res[k] = m & 255;
          }
        }
        return res;
      }
      exports.split32 = split32;
      function rotr32(w, b) {
        return w >>> b | w << 32 - b;
      }
      exports.rotr32 = rotr32;
      function rotl32(w, b) {
        return w << b | w >>> 32 - b;
      }
      exports.rotl32 = rotl32;
      function sum32(a, b) {
        return a + b >>> 0;
      }
      exports.sum32 = sum32;
      function sum32_3(a, b, c) {
        return a + b + c >>> 0;
      }
      exports.sum32_3 = sum32_3;
      function sum32_4(a, b, c, d) {
        return a + b + c + d >>> 0;
      }
      exports.sum32_4 = sum32_4;
      function sum32_5(a, b, c, d, e) {
        return a + b + c + d + e >>> 0;
      }
      exports.sum32_5 = sum32_5;
      function sum64(buf, pos, ah, al) {
        var bh = buf[pos];
        var bl = buf[pos + 1];
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        buf[pos] = hi >>> 0;
        buf[pos + 1] = lo;
      }
      exports.sum64 = sum64;
      function sum64_hi(ah, al, bh, bl) {
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        return hi >>> 0;
      }
      exports.sum64_hi = sum64_hi;
      function sum64_lo(ah, al, bh, bl) {
        var lo = al + bl;
        return lo >>> 0;
      }
      exports.sum64_lo = sum64_lo;
      function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        var hi = ah + bh + ch + dh + carry;
        return hi >>> 0;
      }
      exports.sum64_4_hi = sum64_4_hi;
      function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
        var lo = al + bl + cl + dl;
        return lo >>> 0;
      }
      exports.sum64_4_lo = sum64_4_lo;
      function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        lo = lo + el >>> 0;
        carry += lo < el ? 1 : 0;
        var hi = ah + bh + ch + dh + eh + carry;
        return hi >>> 0;
      }
      exports.sum64_5_hi = sum64_5_hi;
      function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var lo = al + bl + cl + dl + el;
        return lo >>> 0;
      }
      exports.sum64_5_lo = sum64_5_lo;
      function rotr64_hi(ah, al, num) {
        var r = al << 32 - num | ah >>> num;
        return r >>> 0;
      }
      exports.rotr64_hi = rotr64_hi;
      function rotr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.rotr64_lo = rotr64_lo;
      function shr64_hi(ah, al, num) {
        return ah >>> num;
      }
      exports.shr64_hi = shr64_hi;
      function shr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.shr64_lo = shr64_lo;
    }
  });

  // node_modules/hash.js/lib/hash/common.js
  var require_common = __commonJS({
    "node_modules/hash.js/lib/hash/common.js"(exports) {
      "use strict";
      var utils = require_utils4();
      var assert = require_minimalistic_assert();
      function BlockHash() {
        this.pending = null;
        this.pendingTotal = 0;
        this.blockSize = this.constructor.blockSize;
        this.outSize = this.constructor.outSize;
        this.hmacStrength = this.constructor.hmacStrength;
        this.padLength = this.constructor.padLength / 8;
        this.endian = "big";
        this._delta8 = this.blockSize / 8;
        this._delta32 = this.blockSize / 32;
      }
      exports.BlockHash = BlockHash;
      BlockHash.prototype.update = function update(msg, enc) {
        msg = utils.toArray(msg, enc);
        if (!this.pending)
          this.pending = msg;
        else
          this.pending = this.pending.concat(msg);
        this.pendingTotal += msg.length;
        if (this.pending.length >= this._delta8) {
          msg = this.pending;
          var r = msg.length % this._delta8;
          this.pending = msg.slice(msg.length - r, msg.length);
          if (this.pending.length === 0)
            this.pending = null;
          msg = utils.join32(msg, 0, msg.length - r, this.endian);
          for (var i = 0; i < msg.length; i += this._delta32)
            this._update(msg, i, i + this._delta32);
        }
        return this;
      };
      BlockHash.prototype.digest = function digest(enc) {
        this.update(this._pad());
        assert(this.pending === null);
        return this._digest(enc);
      };
      BlockHash.prototype._pad = function pad() {
        var len = this.pendingTotal;
        var bytes = this._delta8;
        var k = bytes - (len + this.padLength) % bytes;
        var res = new Array(k + this.padLength);
        res[0] = 128;
        for (var i = 1; i < k; i++)
          res[i] = 0;
        len <<= 3;
        if (this.endian === "big") {
          for (var t = 8; t < this.padLength; t++)
            res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = len >>> 24 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len & 255;
        } else {
          res[i++] = len & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 24 & 255;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          for (t = 8; t < this.padLength; t++)
            res[i++] = 0;
        }
        return res;
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/common.js
  var require_common2 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
      "use strict";
      var utils = require_utils4();
      var rotr32 = utils.rotr32;
      function ft_1(s, x, y, z) {
        if (s === 0)
          return ch32(x, y, z);
        if (s === 1 || s === 3)
          return p32(x, y, z);
        if (s === 2)
          return maj32(x, y, z);
      }
      exports.ft_1 = ft_1;
      function ch32(x, y, z) {
        return x & y ^ ~x & z;
      }
      exports.ch32 = ch32;
      function maj32(x, y, z) {
        return x & y ^ x & z ^ y & z;
      }
      exports.maj32 = maj32;
      function p32(x, y, z) {
        return x ^ y ^ z;
      }
      exports.p32 = p32;
      function s0_256(x) {
        return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
      }
      exports.s0_256 = s0_256;
      function s1_256(x) {
        return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
      }
      exports.s1_256 = s1_256;
      function g0_256(x) {
        return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
      }
      exports.g0_256 = g0_256;
      function g1_256(x) {
        return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
      }
      exports.g1_256 = g1_256;
    }
  });

  // node_modules/hash.js/lib/hash/sha/1.js
  var require__ = __commonJS({
    "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var common = require_common();
      var shaCommon = require_common2();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_5 = utils.sum32_5;
      var ft_1 = shaCommon.ft_1;
      var BlockHash = common.BlockHash;
      var sha1_K = [
        1518500249,
        1859775393,
        2400959708,
        3395469782
      ];
      function SHA1() {
        if (!(this instanceof SHA1))
          return new SHA1();
        BlockHash.call(this);
        this.h = [
          1732584193,
          4023233417,
          2562383102,
          271733878,
          3285377520
        ];
        this.W = new Array(80);
      }
      utils.inherits(SHA1, BlockHash);
      module.exports = SHA1;
      SHA1.blockSize = 512;
      SHA1.outSize = 160;
      SHA1.hmacStrength = 80;
      SHA1.padLength = 64;
      SHA1.prototype._update = function _update(msg, start) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start + i];
        for (; i < W.length; i++)
          W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        for (i = 0; i < W.length; i++) {
          var s = ~~(i / 20);
          var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
          e = d;
          d = c;
          c = rotl32(b, 30);
          b = a;
          a = t;
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
      };
      SHA1.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/256.js
  var require__2 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var common = require_common();
      var shaCommon = require_common2();
      var assert = require_minimalistic_assert();
      var sum32 = utils.sum32;
      var sum32_4 = utils.sum32_4;
      var sum32_5 = utils.sum32_5;
      var ch32 = shaCommon.ch32;
      var maj32 = shaCommon.maj32;
      var s0_256 = shaCommon.s0_256;
      var s1_256 = shaCommon.s1_256;
      var g0_256 = shaCommon.g0_256;
      var g1_256 = shaCommon.g1_256;
      var BlockHash = common.BlockHash;
      var sha256_K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      function SHA256() {
        if (!(this instanceof SHA256))
          return new SHA256();
        BlockHash.call(this);
        this.h = [
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ];
        this.k = sha256_K;
        this.W = new Array(64);
      }
      utils.inherits(SHA256, BlockHash);
      module.exports = SHA256;
      SHA256.blockSize = 512;
      SHA256.outSize = 256;
      SHA256.hmacStrength = 192;
      SHA256.padLength = 64;
      SHA256.prototype._update = function _update(msg, start) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start + i];
        for (; i < W.length; i++)
          W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        var f = this.h[5];
        var g = this.h[6];
        var h = this.h[7];
        assert(this.k.length === W.length);
        for (i = 0; i < W.length; i++) {
          var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
          var T2 = sum32(s0_256(a), maj32(a, b, c));
          h = g;
          g = f;
          f = e;
          e = sum32(d, T1);
          d = c;
          c = b;
          b = a;
          a = sum32(T1, T2);
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
        this.h[5] = sum32(this.h[5], f);
        this.h[6] = sum32(this.h[6], g);
        this.h[7] = sum32(this.h[7], h);
      };
      SHA256.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/224.js
  var require__3 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var SHA256 = require__2();
      function SHA224() {
        if (!(this instanceof SHA224))
          return new SHA224();
        SHA256.call(this);
        this.h = [
          3238371032,
          914150663,
          812702999,
          4144912697,
          4290775857,
          1750603025,
          1694076839,
          3204075428
        ];
      }
      utils.inherits(SHA224, SHA256);
      module.exports = SHA224;
      SHA224.blockSize = 512;
      SHA224.outSize = 224;
      SHA224.hmacStrength = 192;
      SHA224.padLength = 64;
      SHA224.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 7), "big");
        else
          return utils.split32(this.h.slice(0, 7), "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/512.js
  var require__4 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var common = require_common();
      var assert = require_minimalistic_assert();
      var rotr64_hi = utils.rotr64_hi;
      var rotr64_lo = utils.rotr64_lo;
      var shr64_hi = utils.shr64_hi;
      var shr64_lo = utils.shr64_lo;
      var sum64 = utils.sum64;
      var sum64_hi = utils.sum64_hi;
      var sum64_lo = utils.sum64_lo;
      var sum64_4_hi = utils.sum64_4_hi;
      var sum64_4_lo = utils.sum64_4_lo;
      var sum64_5_hi = utils.sum64_5_hi;
      var sum64_5_lo = utils.sum64_5_lo;
      var BlockHash = common.BlockHash;
      var sha512_K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function SHA512() {
        if (!(this instanceof SHA512))
          return new SHA512();
        BlockHash.call(this);
        this.h = [
          1779033703,
          4089235720,
          3144134277,
          2227873595,
          1013904242,
          4271175723,
          2773480762,
          1595750129,
          1359893119,
          2917565137,
          2600822924,
          725511199,
          528734635,
          4215389547,
          1541459225,
          327033209
        ];
        this.k = sha512_K;
        this.W = new Array(160);
      }
      utils.inherits(SHA512, BlockHash);
      module.exports = SHA512;
      SHA512.blockSize = 1024;
      SHA512.outSize = 512;
      SHA512.hmacStrength = 192;
      SHA512.padLength = 128;
      SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
        var W = this.W;
        for (var i = 0; i < 32; i++)
          W[i] = msg[start + i];
        for (; i < W.length; i += 2) {
          var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
          var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
          var c1_hi = W[i - 14];
          var c1_lo = W[i - 13];
          var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
          var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
          var c3_hi = W[i - 32];
          var c3_lo = W[i - 31];
          W[i] = sum64_4_hi(
            c0_hi,
            c0_lo,
            c1_hi,
            c1_lo,
            c2_hi,
            c2_lo,
            c3_hi,
            c3_lo
          );
          W[i + 1] = sum64_4_lo(
            c0_hi,
            c0_lo,
            c1_hi,
            c1_lo,
            c2_hi,
            c2_lo,
            c3_hi,
            c3_lo
          );
        }
      };
      SHA512.prototype._update = function _update(msg, start) {
        this._prepareBlock(msg, start);
        var W = this.W;
        var ah = this.h[0];
        var al = this.h[1];
        var bh = this.h[2];
        var bl = this.h[3];
        var ch = this.h[4];
        var cl = this.h[5];
        var dh = this.h[6];
        var dl = this.h[7];
        var eh = this.h[8];
        var el = this.h[9];
        var fh = this.h[10];
        var fl = this.h[11];
        var gh = this.h[12];
        var gl = this.h[13];
        var hh = this.h[14];
        var hl = this.h[15];
        assert(this.k.length === W.length);
        for (var i = 0; i < W.length; i += 2) {
          var c0_hi = hh;
          var c0_lo = hl;
          var c1_hi = s1_512_hi(eh, el);
          var c1_lo = s1_512_lo(eh, el);
          var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
          var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
          var c3_hi = this.k[i];
          var c3_lo = this.k[i + 1];
          var c4_hi = W[i];
          var c4_lo = W[i + 1];
          var T1_hi = sum64_5_hi(
            c0_hi,
            c0_lo,
            c1_hi,
            c1_lo,
            c2_hi,
            c2_lo,
            c3_hi,
            c3_lo,
            c4_hi,
            c4_lo
          );
          var T1_lo = sum64_5_lo(
            c0_hi,
            c0_lo,
            c1_hi,
            c1_lo,
            c2_hi,
            c2_lo,
            c3_hi,
            c3_lo,
            c4_hi,
            c4_lo
          );
          c0_hi = s0_512_hi(ah, al);
          c0_lo = s0_512_lo(ah, al);
          c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
          c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
          var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
          var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          eh = sum64_hi(dh, dl, T1_hi, T1_lo);
          el = sum64_lo(dl, dl, T1_hi, T1_lo);
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
          al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
        }
        sum64(this.h, 0, ah, al);
        sum64(this.h, 2, bh, bl);
        sum64(this.h, 4, ch, cl);
        sum64(this.h, 6, dh, dl);
        sum64(this.h, 8, eh, el);
        sum64(this.h, 10, fh, fl);
        sum64(this.h, 12, gh, gl);
        sum64(this.h, 14, hh, hl);
      };
      SHA512.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
      function ch64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ ~xh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function ch64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ ~xl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ xh & zh ^ yh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ xl & zl ^ yl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 28);
        var c1_hi = rotr64_hi(xl, xh, 2);
        var c2_hi = rotr64_hi(xl, xh, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 28);
        var c1_lo = rotr64_lo(xl, xh, 2);
        var c2_lo = rotr64_lo(xl, xh, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 14);
        var c1_hi = rotr64_hi(xh, xl, 18);
        var c2_hi = rotr64_hi(xl, xh, 9);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 14);
        var c1_lo = rotr64_lo(xh, xl, 18);
        var c2_lo = rotr64_lo(xl, xh, 9);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 1);
        var c1_hi = rotr64_hi(xh, xl, 8);
        var c2_hi = shr64_hi(xh, xl, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 1);
        var c1_lo = rotr64_lo(xh, xl, 8);
        var c2_lo = shr64_lo(xh, xl, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 19);
        var c1_hi = rotr64_hi(xl, xh, 29);
        var c2_hi = shr64_hi(xh, xl, 6);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 19);
        var c1_lo = rotr64_lo(xl, xh, 29);
        var c2_lo = shr64_lo(xh, xl, 6);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
    }
  });

  // node_modules/hash.js/lib/hash/sha/384.js
  var require__5 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var SHA512 = require__4();
      function SHA384() {
        if (!(this instanceof SHA384))
          return new SHA384();
        SHA512.call(this);
        this.h = [
          3418070365,
          3238371032,
          1654270250,
          914150663,
          2438529370,
          812702999,
          355462360,
          4144912697,
          1731405415,
          4290775857,
          2394180231,
          1750603025,
          3675008525,
          1694076839,
          1203062813,
          3204075428
        ];
      }
      utils.inherits(SHA384, SHA512);
      module.exports = SHA384;
      SHA384.blockSize = 1024;
      SHA384.outSize = 384;
      SHA384.hmacStrength = 192;
      SHA384.padLength = 128;
      SHA384.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 12), "big");
        else
          return utils.split32(this.h.slice(0, 12), "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha.js
  var require_sha = __commonJS({
    "node_modules/hash.js/lib/hash/sha.js"(exports) {
      "use strict";
      exports.sha1 = require__();
      exports.sha224 = require__3();
      exports.sha256 = require__2();
      exports.sha384 = require__5();
      exports.sha512 = require__4();
    }
  });

  // node_modules/hash.js/lib/hash/ripemd.js
  var require_ripemd = __commonJS({
    "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
      "use strict";
      var utils = require_utils4();
      var common = require_common();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_3 = utils.sum32_3;
      var sum32_4 = utils.sum32_4;
      var BlockHash = common.BlockHash;
      function RIPEMD160() {
        if (!(this instanceof RIPEMD160))
          return new RIPEMD160();
        BlockHash.call(this);
        this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        this.endian = "little";
      }
      utils.inherits(RIPEMD160, BlockHash);
      exports.ripemd160 = RIPEMD160;
      RIPEMD160.blockSize = 512;
      RIPEMD160.outSize = 160;
      RIPEMD160.hmacStrength = 192;
      RIPEMD160.padLength = 64;
      RIPEMD160.prototype._update = function update(msg, start) {
        var A = this.h[0];
        var B = this.h[1];
        var C = this.h[2];
        var D = this.h[3];
        var E = this.h[4];
        var Ah = A;
        var Bh = B;
        var Ch = C;
        var Dh = D;
        var Eh = E;
        for (var j = 0; j < 80; j++) {
          var T = sum32(
            rotl32(
              sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
              s[j]
            ),
            E
          );
          A = E;
          E = D;
          D = rotl32(C, 10);
          C = B;
          B = T;
          T = sum32(
            rotl32(
              sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
              sh[j]
            ),
            Eh
          );
          Ah = Eh;
          Eh = Dh;
          Dh = rotl32(Ch, 10);
          Ch = Bh;
          Bh = T;
        }
        T = sum32_3(this.h[1], C, Dh);
        this.h[1] = sum32_3(this.h[2], D, Eh);
        this.h[2] = sum32_3(this.h[3], E, Ah);
        this.h[3] = sum32_3(this.h[4], A, Bh);
        this.h[4] = sum32_3(this.h[0], B, Ch);
        this.h[0] = T;
      };
      RIPEMD160.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "little");
        else
          return utils.split32(this.h, "little");
      };
      function f(j, x, y, z) {
        if (j <= 15)
          return x ^ y ^ z;
        else if (j <= 31)
          return x & y | ~x & z;
        else if (j <= 47)
          return (x | ~y) ^ z;
        else if (j <= 63)
          return x & z | y & ~z;
        else
          return x ^ (y | ~z);
      }
      function K(j) {
        if (j <= 15)
          return 0;
        else if (j <= 31)
          return 1518500249;
        else if (j <= 47)
          return 1859775393;
        else if (j <= 63)
          return 2400959708;
        else
          return 2840853838;
      }
      function Kh(j) {
        if (j <= 15)
          return 1352829926;
        else if (j <= 31)
          return 1548603684;
        else if (j <= 47)
          return 1836072691;
        else if (j <= 63)
          return 2053994217;
        else
          return 0;
      }
      var r = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8,
        3,
        10,
        14,
        4,
        9,
        15,
        8,
        1,
        2,
        7,
        0,
        6,
        13,
        11,
        5,
        12,
        1,
        9,
        11,
        10,
        0,
        8,
        12,
        4,
        13,
        3,
        7,
        15,
        14,
        5,
        6,
        2,
        4,
        0,
        5,
        9,
        7,
        12,
        2,
        10,
        14,
        1,
        3,
        8,
        11,
        6,
        15,
        13
      ];
      var rh = [
        5,
        14,
        7,
        0,
        9,
        2,
        11,
        4,
        13,
        6,
        15,
        8,
        1,
        10,
        3,
        12,
        6,
        11,
        3,
        7,
        0,
        13,
        5,
        10,
        14,
        15,
        8,
        12,
        4,
        9,
        1,
        2,
        15,
        5,
        1,
        3,
        7,
        14,
        6,
        9,
        11,
        8,
        12,
        2,
        10,
        0,
        4,
        13,
        8,
        6,
        4,
        1,
        3,
        11,
        15,
        0,
        5,
        12,
        2,
        13,
        9,
        7,
        10,
        14,
        12,
        15,
        10,
        4,
        1,
        5,
        8,
        7,
        6,
        2,
        13,
        14,
        0,
        3,
        9,
        11
      ];
      var s = [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8,
        7,
        6,
        8,
        13,
        11,
        9,
        7,
        15,
        7,
        12,
        15,
        9,
        11,
        7,
        13,
        12,
        11,
        13,
        6,
        7,
        14,
        9,
        13,
        15,
        14,
        8,
        13,
        6,
        5,
        12,
        7,
        5,
        11,
        12,
        14,
        15,
        14,
        15,
        9,
        8,
        9,
        14,
        5,
        6,
        8,
        6,
        5,
        12,
        9,
        15,
        5,
        11,
        6,
        8,
        13,
        12,
        5,
        12,
        13,
        14,
        11,
        8,
        5,
        6
      ];
      var sh = [
        8,
        9,
        9,
        11,
        13,
        15,
        15,
        5,
        7,
        7,
        8,
        11,
        14,
        14,
        12,
        6,
        9,
        13,
        15,
        7,
        12,
        8,
        9,
        11,
        7,
        7,
        12,
        7,
        6,
        15,
        13,
        11,
        9,
        7,
        15,
        11,
        8,
        6,
        6,
        14,
        12,
        13,
        5,
        14,
        13,
        13,
        7,
        5,
        15,
        5,
        8,
        11,
        14,
        14,
        6,
        14,
        6,
        9,
        12,
        9,
        12,
        5,
        15,
        8,
        8,
        5,
        12,
        9,
        12,
        5,
        14,
        6,
        8,
        13,
        6,
        5,
        15,
        13,
        11,
        11
      ];
    }
  });

  // node_modules/hash.js/lib/hash/hmac.js
  var require_hmac2 = __commonJS({
    "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
      "use strict";
      var utils = require_utils4();
      var assert = require_minimalistic_assert();
      function Hmac(hash2, key, enc) {
        if (!(this instanceof Hmac))
          return new Hmac(hash2, key, enc);
        this.Hash = hash2;
        this.blockSize = hash2.blockSize / 8;
        this.outSize = hash2.outSize / 8;
        this.inner = null;
        this.outer = null;
        this._init(utils.toArray(key, enc));
      }
      module.exports = Hmac;
      Hmac.prototype._init = function init(key) {
        if (key.length > this.blockSize)
          key = new this.Hash().update(key).digest();
        assert(key.length <= this.blockSize);
        for (var i = key.length; i < this.blockSize; i++)
          key.push(0);
        for (i = 0; i < key.length; i++)
          key[i] ^= 54;
        this.inner = new this.Hash().update(key);
        for (i = 0; i < key.length; i++)
          key[i] ^= 106;
        this.outer = new this.Hash().update(key);
      };
      Hmac.prototype.update = function update(msg, enc) {
        this.inner.update(msg, enc);
        return this;
      };
      Hmac.prototype.digest = function digest(enc) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc);
      };
    }
  });

  // node_modules/hash.js/lib/hash.js
  var require_hash = __commonJS({
    "node_modules/hash.js/lib/hash.js"(exports) {
      var hash2 = exports;
      hash2.utils = require_utils4();
      hash2.common = require_common();
      hash2.sha = require_sha();
      hash2.ripemd = require_ripemd();
      hash2.hmac = require_hmac2();
      hash2.sha1 = hash2.sha.sha1;
      hash2.sha256 = hash2.sha.sha256;
      hash2.sha224 = hash2.sha.sha224;
      hash2.sha384 = hash2.sha.sha384;
      hash2.sha512 = hash2.sha.sha512;
      hash2.ripemd160 = hash2.ripemd.ripemd160;
    }
  });

  // node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js
  var require_secp256k1 = __commonJS({
    "node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"(exports, module) {
      module.exports = {
        doubles: {
          step: 4,
          points: [
            [
              "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
              "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
            ],
            [
              "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
              "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
            ],
            [
              "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
              "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
            ],
            [
              "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
              "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
            ],
            [
              "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
              "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
            ],
            [
              "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
              "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
            ],
            [
              "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
              "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
            ],
            [
              "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
              "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
            ],
            [
              "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
              "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
            ],
            [
              "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
              "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
            ],
            [
              "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
              "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
            ],
            [
              "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
              "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
            ],
            [
              "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
              "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
            ],
            [
              "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
              "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
            ],
            [
              "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
              "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
            ],
            [
              "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
              "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
            ],
            [
              "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
              "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
            ],
            [
              "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
              "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
            ],
            [
              "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
              "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
            ],
            [
              "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
              "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
            ],
            [
              "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
              "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
            ],
            [
              "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
              "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
            ],
            [
              "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
              "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
            ],
            [
              "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
              "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
            ],
            [
              "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
              "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
            ],
            [
              "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
              "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
            ],
            [
              "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
              "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
            ],
            [
              "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
              "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
            ],
            [
              "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
              "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
            ],
            [
              "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
              "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
            ],
            [
              "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
              "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
            ],
            [
              "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
              "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
            ],
            [
              "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
              "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
            ],
            [
              "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
              "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
            ],
            [
              "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
              "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
            ],
            [
              "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
              "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
            ],
            [
              "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
              "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
            ],
            [
              "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
              "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
            ],
            [
              "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
              "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
            ],
            [
              "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
              "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
            ],
            [
              "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
              "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
            ],
            [
              "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
              "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
            ],
            [
              "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
              "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
            ],
            [
              "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
              "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
            ],
            [
              "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
              "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
            ],
            [
              "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
              "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
            ],
            [
              "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
              "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
            ],
            [
              "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
              "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
            ],
            [
              "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
              "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
            ],
            [
              "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
              "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
            ],
            [
              "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
              "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
            ],
            [
              "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
              "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
            ],
            [
              "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
              "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
            ],
            [
              "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
              "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
            ],
            [
              "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
              "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
            ],
            [
              "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
              "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
            ],
            [
              "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
              "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
            ],
            [
              "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
              "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
            ],
            [
              "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
              "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
            ],
            [
              "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
              "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
            ],
            [
              "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
              "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
            ],
            [
              "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
              "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
            ],
            [
              "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
              "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
            ],
            [
              "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
              "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
            ],
            [
              "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
              "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
            ]
          ]
        },
        naf: {
          wnd: 7,
          points: [
            [
              "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
              "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
            ],
            [
              "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
              "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
            ],
            [
              "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
              "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
            ],
            [
              "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
              "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
            ],
            [
              "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
              "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
            ],
            [
              "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
              "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
            ],
            [
              "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
              "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
            ],
            [
              "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
              "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
            ],
            [
              "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
              "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
            ],
            [
              "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
              "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
            ],
            [
              "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
              "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
            ],
            [
              "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
              "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
            ],
            [
              "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
              "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
            ],
            [
              "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
              "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
            ],
            [
              "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
              "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
            ],
            [
              "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
              "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
            ],
            [
              "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
              "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
            ],
            [
              "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
              "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
            ],
            [
              "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
              "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
            ],
            [
              "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
              "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
            ],
            [
              "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
              "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
            ],
            [
              "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
              "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
            ],
            [
              "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
              "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
            ],
            [
              "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
              "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
            ],
            [
              "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
              "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
            ],
            [
              "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
              "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
            ],
            [
              "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
              "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
            ],
            [
              "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
              "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
            ],
            [
              "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
              "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
            ],
            [
              "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
              "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
            ],
            [
              "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
              "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
            ],
            [
              "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
              "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
            ],
            [
              "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
              "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
            ],
            [
              "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
              "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
            ],
            [
              "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
              "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
            ],
            [
              "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
              "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
            ],
            [
              "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
              "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
            ],
            [
              "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
              "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
            ],
            [
              "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
              "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
            ],
            [
              "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
              "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
            ],
            [
              "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
              "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
            ],
            [
              "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
              "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
            ],
            [
              "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
              "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
            ],
            [
              "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
              "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
            ],
            [
              "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
              "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
            ],
            [
              "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
              "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
            ],
            [
              "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
              "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
            ],
            [
              "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
              "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
            ],
            [
              "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
              "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
            ],
            [
              "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
              "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
            ],
            [
              "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
              "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
            ],
            [
              "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
              "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
            ],
            [
              "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
              "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
            ],
            [
              "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
              "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
            ],
            [
              "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
              "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
            ],
            [
              "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
              "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
            ],
            [
              "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
              "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
            ],
            [
              "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
              "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
            ],
            [
              "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
              "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
            ],
            [
              "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
              "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
            ],
            [
              "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
              "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
            ],
            [
              "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
              "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
            ],
            [
              "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
              "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
            ],
            [
              "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
              "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
            ],
            [
              "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
              "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
            ],
            [
              "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
              "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
            ],
            [
              "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
              "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
            ],
            [
              "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
              "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
            ],
            [
              "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
              "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
            ],
            [
              "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
              "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
            ],
            [
              "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
              "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
            ],
            [
              "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
              "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
            ],
            [
              "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
              "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
            ],
            [
              "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
              "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
            ],
            [
              "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
              "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
            ],
            [
              "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
              "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
            ],
            [
              "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
              "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
            ],
            [
              "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
              "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
            ],
            [
              "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
              "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
            ],
            [
              "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
              "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
            ],
            [
              "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
              "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
            ],
            [
              "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
              "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
            ],
            [
              "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
              "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
            ],
            [
              "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
              "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
            ],
            [
              "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
              "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
            ],
            [
              "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
              "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
            ],
            [
              "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
              "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
            ],
            [
              "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
              "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
            ],
            [
              "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
              "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
            ],
            [
              "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
              "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
            ],
            [
              "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
              "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
            ],
            [
              "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
              "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
            ],
            [
              "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
              "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
            ],
            [
              "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
              "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
            ],
            [
              "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
              "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
            ],
            [
              "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
              "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
            ],
            [
              "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
              "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
            ],
            [
              "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
              "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
            ],
            [
              "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
              "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
            ],
            [
              "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
              "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
            ],
            [
              "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
              "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
            ],
            [
              "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
              "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
            ],
            [
              "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
              "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
            ],
            [
              "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
              "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
            ],
            [
              "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
              "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
            ],
            [
              "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
              "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
            ],
            [
              "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
              "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
            ],
            [
              "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
              "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
            ],
            [
              "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
              "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
            ],
            [
              "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
              "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
            ],
            [
              "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
              "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
            ],
            [
              "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
              "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
            ],
            [
              "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
              "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
            ],
            [
              "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
              "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
            ],
            [
              "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
              "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
            ],
            [
              "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
              "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
            ],
            [
              "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
              "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
            ],
            [
              "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
              "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
            ],
            [
              "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
              "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
            ],
            [
              "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
              "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
            ],
            [
              "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
              "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
            ],
            [
              "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
              "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
            ],
            [
              "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
              "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
            ],
            [
              "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
              "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
            ],
            [
              "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
              "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
            ],
            [
              "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
              "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
            ],
            [
              "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
              "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
            ]
          ]
        }
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/curves.js
  var require_curves = __commonJS({
    "node_modules/elliptic/lib/elliptic/curves.js"(exports) {
      "use strict";
      var curves = exports;
      var hash2 = require_hash();
      var curve = require_curve();
      var utils = require_utils3();
      var assert = utils.assert;
      function PresetCurve(options) {
        if (options.type === "short")
          this.curve = new curve.short(options);
        else if (options.type === "edwards")
          this.curve = new curve.edwards(options);
        else
          this.curve = new curve.mont(options);
        this.g = this.curve.g;
        this.n = this.curve.n;
        this.hash = options.hash;
        assert(this.g.validate(), "Invalid curve");
        assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
      }
      curves.PresetCurve = PresetCurve;
      function defineCurve(name, options) {
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          get: function() {
            var curve2 = new PresetCurve(options);
            Object.defineProperty(curves, name, {
              configurable: true,
              enumerable: true,
              value: curve2
            });
            return curve2;
          }
        });
      }
      defineCurve("p192", {
        type: "short",
        prime: "p192",
        p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
        b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
        n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
        hash: hash2.sha256,
        gRed: false,
        g: [
          "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
          "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
        ]
      });
      defineCurve("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: hash2.sha256,
        gRed: false,
        g: [
          "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
          "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
        ]
      });
      defineCurve("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: hash2.sha256,
        gRed: false,
        g: [
          "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
          "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
        ]
      });
      defineCurve("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: hash2.sha384,
        gRed: false,
        g: [
          "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
          "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
        ]
      });
      defineCurve("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: hash2.sha512,
        gRed: false,
        g: [
          "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
          "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
        ]
      });
      defineCurve("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: hash2.sha256,
        gRed: false,
        g: [
          "9"
        ]
      });
      defineCurve("ed25519", {
        type: "edwards",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "-1",
        c: "1",
        // -121665 * (121666^(-1)) (mod P)
        d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: hash2.sha256,
        gRed: false,
        g: [
          "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
          // 4/5
          "6666666666666666666666666666666666666666666666666666666666666658"
        ]
      });
      var pre;
      try {
        pre = require_secp256k1();
      } catch (e) {
        pre = void 0;
      }
      defineCurve("secp256k1", {
        type: "short",
        prime: "k256",
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
        a: "0",
        b: "7",
        n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
        h: "1",
        hash: hash2.sha256,
        // Precomputed endomorphism
        beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
        lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
        basis: [
          {
            a: "3086d221a7d46bcde86c90e49284eb15",
            b: "-e4437ed6010e88286f547fa90abfe4c3"
          },
          {
            a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
            b: "3086d221a7d46bcde86c90e49284eb15"
          }
        ],
        gRed: false,
        g: [
          "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
          pre
        ]
      });
    }
  });

  // node_modules/hmac-drbg/lib/hmac-drbg.js
  var require_hmac_drbg = __commonJS({
    "node_modules/hmac-drbg/lib/hmac-drbg.js"(exports, module) {
      "use strict";
      var hash2 = require_hash();
      var utils = require_utils2();
      var assert = require_minimalistic_assert();
      function HmacDRBG(options) {
        if (!(this instanceof HmacDRBG))
          return new HmacDRBG(options);
        this.hash = options.hash;
        this.predResist = !!options.predResist;
        this.outLen = this.hash.outSize;
        this.minEntropy = options.minEntropy || this.hash.hmacStrength;
        this._reseed = null;
        this.reseedInterval = null;
        this.K = null;
        this.V = null;
        var entropy = utils.toArray(options.entropy, options.entropyEnc || "hex");
        var nonce = utils.toArray(options.nonce, options.nonceEnc || "hex");
        var pers = utils.toArray(options.pers, options.persEnc || "hex");
        assert(
          entropy.length >= this.minEntropy / 8,
          "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
        );
        this._init(entropy, nonce, pers);
      }
      module.exports = HmacDRBG;
      HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
        var seed = entropy.concat(nonce).concat(pers);
        this.K = new Array(this.outLen / 8);
        this.V = new Array(this.outLen / 8);
        for (var i = 0; i < this.V.length; i++) {
          this.K[i] = 0;
          this.V[i] = 1;
        }
        this._update(seed);
        this._reseed = 1;
        this.reseedInterval = 281474976710656;
      };
      HmacDRBG.prototype._hmac = function hmac() {
        return new hash2.hmac(this.hash, this.K);
      };
      HmacDRBG.prototype._update = function update(seed) {
        var kmac = this._hmac().update(this.V).update([0]);
        if (seed)
          kmac = kmac.update(seed);
        this.K = kmac.digest();
        this.V = this._hmac().update(this.V).digest();
        if (!seed)
          return;
        this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
        this.V = this._hmac().update(this.V).digest();
      };
      HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
        if (typeof entropyEnc !== "string") {
          addEnc = add;
          add = entropyEnc;
          entropyEnc = null;
        }
        entropy = utils.toArray(entropy, entropyEnc);
        add = utils.toArray(add, addEnc);
        assert(
          entropy.length >= this.minEntropy / 8,
          "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
        );
        this._update(entropy.concat(add || []));
        this._reseed = 1;
      };
      HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
        if (this._reseed > this.reseedInterval)
          throw new Error("Reseed is required");
        if (typeof enc !== "string") {
          addEnc = add;
          add = enc;
          enc = null;
        }
        if (add) {
          add = utils.toArray(add, addEnc || "hex");
          this._update(add);
        }
        var temp = [];
        while (temp.length < len) {
          this.V = this._hmac().update(this.V).digest();
          temp = temp.concat(this.V);
        }
        var res = temp.slice(0, len);
        this._update(add);
        this._reseed++;
        return utils.encode(res, enc);
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/ec/key.js
  var require_key = __commonJS({
    "node_modules/elliptic/lib/elliptic/ec/key.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var utils = require_utils3();
      var assert = utils.assert;
      function KeyPair(ec2, options) {
        this.ec = ec2;
        this.priv = null;
        this.pub = null;
        if (options.priv)
          this._importPrivate(options.priv, options.privEnc);
        if (options.pub)
          this._importPublic(options.pub, options.pubEnc);
      }
      module.exports = KeyPair;
      KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
        if (pub instanceof KeyPair)
          return pub;
        return new KeyPair(ec2, {
          pub,
          pubEnc: enc
        });
      };
      KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
        if (priv instanceof KeyPair)
          return priv;
        return new KeyPair(ec2, {
          priv,
          privEnc: enc
        });
      };
      KeyPair.prototype.validate = function validate() {
        var pub = this.getPublic();
        if (pub.isInfinity())
          return { result: false, reason: "Invalid public key" };
        if (!pub.validate())
          return { result: false, reason: "Public key is not a point" };
        if (!pub.mul(this.ec.curve.n).isInfinity())
          return { result: false, reason: "Public key * N != O" };
        return { result: true, reason: null };
      };
      KeyPair.prototype.getPublic = function getPublic(compact, enc) {
        if (typeof compact === "string") {
          enc = compact;
          compact = null;
        }
        if (!this.pub)
          this.pub = this.ec.g.mul(this.priv);
        if (!enc)
          return this.pub;
        return this.pub.encode(enc, compact);
      };
      KeyPair.prototype.getPrivate = function getPrivate(enc) {
        if (enc === "hex")
          return this.priv.toString(16, 2);
        else
          return this.priv;
      };
      KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
        this.priv = new BN(key, enc || 16);
        this.priv = this.priv.umod(this.ec.curve.n);
      };
      KeyPair.prototype._importPublic = function _importPublic(key, enc) {
        if (key.x || key.y) {
          if (this.ec.curve.type === "mont") {
            assert(key.x, "Need x coordinate");
          } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
            assert(key.x && key.y, "Need both x and y coordinate");
          }
          this.pub = this.ec.curve.point(key.x, key.y);
          return;
        }
        this.pub = this.ec.curve.decodePoint(key, enc);
      };
      KeyPair.prototype.derive = function derive(pub) {
        if (!pub.validate()) {
          assert(pub.validate(), "public point not validated");
        }
        return pub.mul(this.priv).getX();
      };
      KeyPair.prototype.sign = function sign(msg, enc, options) {
        return this.ec.sign(msg, this, enc, options);
      };
      KeyPair.prototype.verify = function verify(msg, signature, options) {
        return this.ec.verify(msg, signature, this, void 0, options);
      };
      KeyPair.prototype.inspect = function inspect() {
        return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/ec/signature.js
  var require_signature = __commonJS({
    "node_modules/elliptic/lib/elliptic/ec/signature.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var utils = require_utils3();
      var assert = utils.assert;
      function Signature(options, enc) {
        if (options instanceof Signature)
          return options;
        if (this._importDER(options, enc))
          return;
        assert(options.r && options.s, "Signature without r or s");
        this.r = new BN(options.r, 16);
        this.s = new BN(options.s, 16);
        if (options.recoveryParam === void 0)
          this.recoveryParam = null;
        else
          this.recoveryParam = options.recoveryParam;
      }
      module.exports = Signature;
      function Position() {
        this.place = 0;
      }
      function getLength(buf, p) {
        var initial = buf[p.place++];
        if (!(initial & 128)) {
          return initial;
        }
        var octetLen = initial & 15;
        if (octetLen === 0 || octetLen > 4) {
          return false;
        }
        if (buf[p.place] === 0) {
          return false;
        }
        var val = 0;
        for (var i = 0, off = p.place; i < octetLen; i++, off++) {
          val <<= 8;
          val |= buf[off];
          val >>>= 0;
        }
        if (val <= 127) {
          return false;
        }
        p.place = off;
        return val;
      }
      function rmPadding(buf) {
        var i = 0;
        var len = buf.length - 1;
        while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
          i++;
        }
        if (i === 0) {
          return buf;
        }
        return buf.slice(i);
      }
      Signature.prototype._importDER = function _importDER(data, enc) {
        data = utils.toArray(data, enc);
        var p = new Position();
        if (data[p.place++] !== 48) {
          return false;
        }
        var len = getLength(data, p);
        if (len === false) {
          return false;
        }
        if (len + p.place !== data.length) {
          return false;
        }
        if (data[p.place++] !== 2) {
          return false;
        }
        var rlen = getLength(data, p);
        if (rlen === false) {
          return false;
        }
        if ((data[p.place] & 128) !== 0) {
          return false;
        }
        var r = data.slice(p.place, rlen + p.place);
        p.place += rlen;
        if (data[p.place++] !== 2) {
          return false;
        }
        var slen = getLength(data, p);
        if (slen === false) {
          return false;
        }
        if (data.length !== slen + p.place) {
          return false;
        }
        if ((data[p.place] & 128) !== 0) {
          return false;
        }
        var s = data.slice(p.place, slen + p.place);
        if (r[0] === 0) {
          if (r[1] & 128) {
            r = r.slice(1);
          } else {
            return false;
          }
        }
        if (s[0] === 0) {
          if (s[1] & 128) {
            s = s.slice(1);
          } else {
            return false;
          }
        }
        this.r = new BN(r);
        this.s = new BN(s);
        this.recoveryParam = null;
        return true;
      };
      function constructLength(arr, len) {
        if (len < 128) {
          arr.push(len);
          return;
        }
        var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
        arr.push(octets | 128);
        while (--octets) {
          arr.push(len >>> (octets << 3) & 255);
        }
        arr.push(len);
      }
      Signature.prototype.toDER = function toDER(enc) {
        var r = this.r.toArray();
        var s = this.s.toArray();
        if (r[0] & 128)
          r = [0].concat(r);
        if (s[0] & 128)
          s = [0].concat(s);
        r = rmPadding(r);
        s = rmPadding(s);
        while (!s[0] && !(s[1] & 128)) {
          s = s.slice(1);
        }
        var arr = [2];
        constructLength(arr, r.length);
        arr = arr.concat(r);
        arr.push(2);
        constructLength(arr, s.length);
        var backHalf = arr.concat(s);
        var res = [48];
        constructLength(res, backHalf.length);
        res = res.concat(backHalf);
        return utils.encode(res, enc);
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/ec/index.js
  var require_ec = __commonJS({
    "node_modules/elliptic/lib/elliptic/ec/index.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var HmacDRBG = require_hmac_drbg();
      var utils = require_utils3();
      var curves = require_curves();
      var rand = require_brorand();
      var assert = utils.assert;
      var KeyPair = require_key();
      var Signature = require_signature();
      function EC2(options) {
        if (!(this instanceof EC2))
          return new EC2(options);
        if (typeof options === "string") {
          assert(
            Object.prototype.hasOwnProperty.call(curves, options),
            "Unknown curve " + options
          );
          options = curves[options];
        }
        if (options instanceof curves.PresetCurve)
          options = { curve: options };
        this.curve = options.curve.curve;
        this.n = this.curve.n;
        this.nh = this.n.ushrn(1);
        this.g = this.curve.g;
        this.g = options.curve.g;
        this.g.precompute(options.curve.n.bitLength() + 1);
        this.hash = options.hash || options.curve.hash;
      }
      module.exports = EC2;
      EC2.prototype.keyPair = function keyPair(options) {
        return new KeyPair(this, options);
      };
      EC2.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
        return KeyPair.fromPrivate(this, priv, enc);
      };
      EC2.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
        return KeyPair.fromPublic(this, pub, enc);
      };
      EC2.prototype.genKeyPair = function genKeyPair(options) {
        if (!options)
          options = {};
        var drbg = new HmacDRBG({
          hash: this.hash,
          pers: options.pers,
          persEnc: options.persEnc || "utf8",
          entropy: options.entropy || rand(this.hash.hmacStrength),
          entropyEnc: options.entropy && options.entropyEnc || "utf8",
          nonce: this.n.toArray()
        });
        var bytes = this.n.byteLength();
        var ns2 = this.n.sub(new BN(2));
        for (; ; ) {
          var priv = new BN(drbg.generate(bytes));
          if (priv.cmp(ns2) > 0)
            continue;
          priv.iaddn(1);
          return this.keyFromPrivate(priv);
        }
      };
      EC2.prototype._truncateToN = function _truncateToN(msg, truncOnly, bitLength) {
        var byteLength;
        if (BN.isBN(msg) || typeof msg === "number") {
          msg = new BN(msg, 16);
          byteLength = msg.byteLength();
        } else if (typeof msg === "object") {
          byteLength = msg.length;
          msg = new BN(msg, 16);
        } else {
          var str = msg.toString();
          byteLength = str.length + 1 >>> 1;
          msg = new BN(str, 16);
        }
        if (typeof bitLength !== "number") {
          bitLength = byteLength * 8;
        }
        var delta = bitLength - this.n.bitLength();
        if (delta > 0)
          msg = msg.ushrn(delta);
        if (!truncOnly && msg.cmp(this.n) >= 0)
          return msg.sub(this.n);
        else
          return msg;
      };
      EC2.prototype.sign = function sign(msg, key, enc, options) {
        if (typeof enc === "object") {
          options = enc;
          enc = null;
        }
        if (!options)
          options = {};
        if (typeof msg !== "string" && typeof msg !== "number" && !BN.isBN(msg)) {
          assert(
            typeof msg === "object" && msg && typeof msg.length === "number",
            "Expected message to be an array-like, a hex string, or a BN instance"
          );
          assert(msg.length >>> 0 === msg.length);
          for (var i = 0; i < msg.length; i++) assert((msg[i] & 255) === msg[i]);
        }
        key = this.keyFromPrivate(key, enc);
        msg = this._truncateToN(msg, false, options.msgBitLength);
        assert(!msg.isNeg(), "Can not sign a negative message");
        var bytes = this.n.byteLength();
        var bkey = key.getPrivate().toArray("be", bytes);
        var nonce = msg.toArray("be", bytes);
        assert(new BN(nonce).eq(msg), "Can not sign message");
        var drbg = new HmacDRBG({
          hash: this.hash,
          entropy: bkey,
          nonce,
          pers: options.pers,
          persEnc: options.persEnc || "utf8"
        });
        var ns1 = this.n.sub(new BN(1));
        for (var iter = 0; ; iter++) {
          var k = options.k ? options.k(iter) : new BN(drbg.generate(this.n.byteLength()));
          k = this._truncateToN(k, true);
          if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
            continue;
          var kp = this.g.mul(k);
          if (kp.isInfinity())
            continue;
          var kpX = kp.getX();
          var r = kpX.umod(this.n);
          if (r.cmpn(0) === 0)
            continue;
          var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
          s = s.umod(this.n);
          if (s.cmpn(0) === 0)
            continue;
          var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0);
          if (options.canonical && s.cmp(this.nh) > 0) {
            s = this.n.sub(s);
            recoveryParam ^= 1;
          }
          return new Signature({ r, s, recoveryParam });
        }
      };
      EC2.prototype.verify = function verify(msg, signature, key, enc, options) {
        if (!options)
          options = {};
        msg = this._truncateToN(msg, false, options.msgBitLength);
        key = this.keyFromPublic(key, enc);
        signature = new Signature(signature, "hex");
        var r = signature.r;
        var s = signature.s;
        if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
          return false;
        if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
          return false;
        var sinv = s.invm(this.n);
        var u1 = sinv.mul(msg).umod(this.n);
        var u2 = sinv.mul(r).umod(this.n);
        var p;
        if (!this.curve._maxwellTrick) {
          p = this.g.mulAdd(u1, key.getPublic(), u2);
          if (p.isInfinity())
            return false;
          return p.getX().umod(this.n).cmp(r) === 0;
        }
        p = this.g.jmulAdd(u1, key.getPublic(), u2);
        if (p.isInfinity())
          return false;
        return p.eqXToP(r);
      };
      EC2.prototype.recoverPubKey = function(msg, signature, j, enc) {
        assert((3 & j) === j, "The recovery param is more than two bits");
        signature = new Signature(signature, enc);
        var n = this.n;
        var e = new BN(msg);
        var r = signature.r;
        var s = signature.s;
        var isYOdd = j & 1;
        var isSecondKey = j >> 1;
        if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
          throw new Error("Unable to find sencond key candinate");
        if (isSecondKey)
          r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
        else
          r = this.curve.pointFromX(r, isYOdd);
        var rInv = signature.r.invm(n);
        var s1 = n.sub(e).mul(rInv).umod(n);
        var s2 = s.mul(rInv).umod(n);
        return this.g.mulAdd(s1, r, s2);
      };
      EC2.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
        signature = new Signature(signature, enc);
        if (signature.recoveryParam !== null)
          return signature.recoveryParam;
        for (var i = 0; i < 4; i++) {
          var Qprime;
          try {
            Qprime = this.recoverPubKey(e, signature, i);
          } catch (e2) {
            continue;
          }
          if (Qprime.eq(Q))
            return i;
        }
        throw new Error("Unable to find valid recovery factor");
      };
    }
  });

  // node_modules/elliptic/lib/elliptic/eddsa/key.js
  var require_key2 = __commonJS({
    "node_modules/elliptic/lib/elliptic/eddsa/key.js"(exports, module) {
      "use strict";
      var utils = require_utils3();
      var assert = utils.assert;
      var parseBytes = utils.parseBytes;
      var cachedProperty = utils.cachedProperty;
      function KeyPair(eddsa, params) {
        this.eddsa = eddsa;
        this._secret = parseBytes(params.secret);
        if (eddsa.isPoint(params.pub))
          this._pub = params.pub;
        else
          this._pubBytes = parseBytes(params.pub);
      }
      KeyPair.fromPublic = function fromPublic(eddsa, pub) {
        if (pub instanceof KeyPair)
          return pub;
        return new KeyPair(eddsa, { pub });
      };
      KeyPair.fromSecret = function fromSecret(eddsa, secret) {
        if (secret instanceof KeyPair)
          return secret;
        return new KeyPair(eddsa, { secret });
      };
      KeyPair.prototype.secret = function secret() {
        return this._secret;
      };
      cachedProperty(KeyPair, "pubBytes", function pubBytes() {
        return this.eddsa.encodePoint(this.pub());
      });
      cachedProperty(KeyPair, "pub", function pub() {
        if (this._pubBytes)
          return this.eddsa.decodePoint(this._pubBytes);
        return this.eddsa.g.mul(this.priv());
      });
      cachedProperty(KeyPair, "privBytes", function privBytes() {
        var eddsa = this.eddsa;
        var hash2 = this.hash();
        var lastIx = eddsa.encodingLength - 1;
        var a = hash2.slice(0, eddsa.encodingLength);
        a[0] &= 248;
        a[lastIx] &= 127;
        a[lastIx] |= 64;
        return a;
      });
      cachedProperty(KeyPair, "priv", function priv() {
        return this.eddsa.decodeInt(this.privBytes());
      });
      cachedProperty(KeyPair, "hash", function hash2() {
        return this.eddsa.hash().update(this.secret()).digest();
      });
      cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
        return this.hash().slice(this.eddsa.encodingLength);
      });
      KeyPair.prototype.sign = function sign(message) {
        assert(this._secret, "KeyPair can only verify");
        return this.eddsa.sign(message, this);
      };
      KeyPair.prototype.verify = function verify(message, sig) {
        return this.eddsa.verify(message, sig, this);
      };
      KeyPair.prototype.getSecret = function getSecret(enc) {
        assert(this._secret, "KeyPair is public only");
        return utils.encode(this.secret(), enc);
      };
      KeyPair.prototype.getPublic = function getPublic(enc) {
        return utils.encode(this.pubBytes(), enc);
      };
      module.exports = KeyPair;
    }
  });

  // node_modules/elliptic/lib/elliptic/eddsa/signature.js
  var require_signature2 = __commonJS({
    "node_modules/elliptic/lib/elliptic/eddsa/signature.js"(exports, module) {
      "use strict";
      var BN = require_bn();
      var utils = require_utils3();
      var assert = utils.assert;
      var cachedProperty = utils.cachedProperty;
      var parseBytes = utils.parseBytes;
      function Signature(eddsa, sig) {
        this.eddsa = eddsa;
        if (typeof sig !== "object")
          sig = parseBytes(sig);
        if (Array.isArray(sig)) {
          assert(sig.length === eddsa.encodingLength * 2, "Signature has invalid size");
          sig = {
            R: sig.slice(0, eddsa.encodingLength),
            S: sig.slice(eddsa.encodingLength)
          };
        }
        assert(sig.R && sig.S, "Signature without R or S");
        if (eddsa.isPoint(sig.R))
          this._R = sig.R;
        if (sig.S instanceof BN)
          this._S = sig.S;
        this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
        this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
      }
      cachedProperty(Signature, "S", function S() {
        return this.eddsa.decodeInt(this.Sencoded());
      });
      cachedProperty(Signature, "R", function R() {
        return this.eddsa.decodePoint(this.Rencoded());
      });
      cachedProperty(Signature, "Rencoded", function Rencoded() {
        return this.eddsa.encodePoint(this.R());
      });
      cachedProperty(Signature, "Sencoded", function Sencoded() {
        return this.eddsa.encodeInt(this.S());
      });
      Signature.prototype.toBytes = function toBytes() {
        return this.Rencoded().concat(this.Sencoded());
      };
      Signature.prototype.toHex = function toHex() {
        return utils.encode(this.toBytes(), "hex").toUpperCase();
      };
      module.exports = Signature;
    }
  });

  // node_modules/elliptic/lib/elliptic/eddsa/index.js
  var require_eddsa = __commonJS({
    "node_modules/elliptic/lib/elliptic/eddsa/index.js"(exports, module) {
      "use strict";
      var hash2 = require_hash();
      var curves = require_curves();
      var utils = require_utils3();
      var assert = utils.assert;
      var parseBytes = utils.parseBytes;
      var KeyPair = require_key2();
      var Signature = require_signature2();
      function EDDSA(curve) {
        assert(curve === "ed25519", "only tested with ed25519 so far");
        if (!(this instanceof EDDSA))
          return new EDDSA(curve);
        curve = curves[curve].curve;
        this.curve = curve;
        this.g = curve.g;
        this.g.precompute(curve.n.bitLength() + 1);
        this.pointClass = curve.point().constructor;
        this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
        this.hash = hash2.sha512;
      }
      module.exports = EDDSA;
      EDDSA.prototype.sign = function sign(message, secret) {
        message = parseBytes(message);
        var key = this.keyFromSecret(secret);
        var r = this.hashInt(key.messagePrefix(), message);
        var R = this.g.mul(r);
        var Rencoded = this.encodePoint(R);
        var s_ = this.hashInt(Rencoded, key.pubBytes(), message).mul(key.priv());
        var S = r.add(s_).umod(this.curve.n);
        return this.makeSignature({ R, S, Rencoded });
      };
      EDDSA.prototype.verify = function verify(message, sig, pub) {
        message = parseBytes(message);
        sig = this.makeSignature(sig);
        if (sig.S().gte(sig.eddsa.curve.n) || sig.S().isNeg()) {
          return false;
        }
        var key = this.keyFromPublic(pub);
        var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
        var SG = this.g.mul(sig.S());
        var RplusAh = sig.R().add(key.pub().mul(h));
        return RplusAh.eq(SG);
      };
      EDDSA.prototype.hashInt = function hashInt() {
        var hash3 = this.hash();
        for (var i = 0; i < arguments.length; i++)
          hash3.update(arguments[i]);
        return utils.intFromLE(hash3.digest()).umod(this.curve.n);
      };
      EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
        return KeyPair.fromPublic(this, pub);
      };
      EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
        return KeyPair.fromSecret(this, secret);
      };
      EDDSA.prototype.makeSignature = function makeSignature(sig) {
        if (sig instanceof Signature)
          return sig;
        return new Signature(this, sig);
      };
      EDDSA.prototype.encodePoint = function encodePoint(point) {
        var enc = point.getY().toArray("le", this.encodingLength);
        enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
        return enc;
      };
      EDDSA.prototype.decodePoint = function decodePoint(bytes) {
        bytes = utils.parseBytes(bytes);
        var lastIx = bytes.length - 1;
        var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
        var xIsOdd = (bytes[lastIx] & 128) !== 0;
        var y = utils.intFromLE(normed);
        return this.curve.pointFromY(y, xIsOdd);
      };
      EDDSA.prototype.encodeInt = function encodeInt(num) {
        return num.toArray("le", this.encodingLength);
      };
      EDDSA.prototype.decodeInt = function decodeInt(bytes) {
        return utils.intFromLE(bytes);
      };
      EDDSA.prototype.isPoint = function isPoint(val) {
        return val instanceof this.pointClass;
      };
    }
  });

  // node_modules/elliptic/lib/elliptic.js
  var require_elliptic = __commonJS({
    "node_modules/elliptic/lib/elliptic.js"(exports) {
      "use strict";
      var elliptic = exports;
      elliptic.version = require_package().version;
      elliptic.utils = require_utils3();
      elliptic.rand = require_brorand();
      elliptic.curve = require_curve();
      elliptic.curves = require_curves();
      elliptic.ec = require_ec();
      elliptic.eddsa = require_eddsa();
    }
  });

  // src/extension/wallet-crypto-src.js
  var wallet_crypto_src_exports = {};
  __export(wallet_crypto_src_exports, {
    ReticulumCrypto: () => ReticulumCrypto
  });
  var bip39 = __toESM(require_src());
  var import_elliptic = __toESM(require_elliptic());
  var import_hash = __toESM(require_hash());
  var ec = new import_elliptic.ec("secp256k1");
  var ReticulumCrypto = {
    /**
     * Generate a new 12-word BIP-39 mnemonic seed phrase
     */
    generateMnemonic(strength = 128) {
      return bip39.generateMnemonic(strength);
    },
    /**
     * Validate a 12 or 24 word mnemonic phrase
     */
    validateMnemonic(mnemonic) {
      return bip39.validateMnemonic(mnemonic.trim());
    },
    /**
     * Derive 32-byte private key hex from a BIP-39 mnemonic
     */
    mnemonicToPrivateKey(mnemonic, passphrase = "") {
      const seed = bip39.mnemonicToSeedSync(mnemonic.trim(), passphrase);
      return seed.subarray(0, 32).toString("hex");
    },
    /**
     * Derive public key and canonical ctx1... address from private key hex
     */
    fromPrivateKey(privateKeyHex) {
      const cleanPriv = privateKeyHex.trim().toLowerCase().replace(/^0x/, "");
      const key = ec.keyFromPrivate(cleanPriv, "hex");
      const privateKey = key.getPrivate("hex").padStart(64, "0");
      const publicKey = key.getPublic(true, "hex");
      const pubKeyHash = import_hash.default.sha256().update(Buffer.from(publicKey, "hex")).digest();
      const ripemd = import_hash.default.ripemd160().update(pubKeyHash).digest("hex");
      const check = import_hash.default.sha256().update(import_hash.default.sha256().update(ripemd).digest()).digest("hex").substring(0, 8);
      const address = `ctx1${ripemd}${check}`;
      return { privateKey, publicKey, address };
    },
    /**
     * Generate a brand new KeyPair with mnemonic
     */
    createWallet() {
      const mnemonic = this.generateMnemonic();
      const privateKey = this.mnemonicToPrivateKey(mnemonic);
      const keyPair = this.fromPrivateKey(privateKey);
      return {
        mnemonic,
        ...keyPair
      };
    },
    /**
     * Validate canonical address format
     */
    isValidAddress(address) {
      if (!address || typeof address !== "string") return false;
      const trimmed = address.trim();
      if (!trimmed.startsWith("ctx1") || trimmed.length !== 52) return false;
      const payload = trimmed.slice(4);
      if (!/^[0-9a-fA-F]{48}$/.test(payload)) return false;
      const ripemd = payload.slice(0, 40);
      const checksum = payload.slice(40);
      const expected = import_hash.default.sha256().update(import_hash.default.sha256().update(ripemd).digest()).digest("hex").substring(0, 8);
      return checksum.toLowerCase() === expected.toLowerCase();
    },
    /**
     * Compute transaction hash (SHA256)
     */
    calculateTxHash(data) {
      const raw = `${data.type}:${data.sender}:${data.recipient}:${data.amount}:${data.fee || 0}:${data.burnAmount || 0}:${data.nonce || 0}:${data.timestamp}:${data.memHash || ""}`;
      return import_hash.default.sha256().update(raw).digest("hex");
    },
    /**
     * Sign hash with private key (ECDSA DER format)
     */
    signHash(dataHashHex, privateKeyHex) {
      const key = ec.keyFromPrivate(privateKeyHex, "hex");
      const sig = key.sign(dataHashHex, "hex", { canonical: true });
      return sig.toDER("hex");
    },
    /**
     * Sign full transaction and return signed transaction object
     */
    signTransaction(txData, privateKeyHex) {
      const keyPair = this.fromPrivateKey(privateKeyHex);
      const txHash = this.calculateTxHash({
        type: txData.type || "TRANSFER",
        sender: keyPair.address,
        recipient: txData.recipient,
        amount: txData.amount,
        fee: txData.fee || 0.01,
        burnAmount: txData.burnAmount || 0,
        nonce: txData.nonce || 0,
        timestamp: txData.timestamp || Date.now(),
        memHash: txData.memHash || ""
      });
      const signature = this.signHash(txHash, keyPair.privateKey);
      return {
        id: txHash,
        type: txData.type || "TRANSFER",
        sender: keyPair.address,
        senderPublicKey: keyPair.publicKey,
        recipient: txData.recipient,
        amount: txData.amount,
        fee: txData.fee || 0.01,
        burnAmount: txData.burnAmount || 0,
        nonce: txData.nonce || 0,
        timestamp: txData.timestamp || Date.now(),
        signature
      };
    },
    /**
     * Encrypt vault using password with WebCrypto (PBKDF2 + AES-GCM-256)
     */
    async encryptVault(dataObj, password) {
      const enc = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 1e5,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
      );
      const plaintext = enc.encode(JSON.stringify(dataObj));
      const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        plaintext
      );
      return {
        ciphertext: Array.from(new Uint8Array(ciphertext)).map((b) => b.toString(16).padStart(2, "0")).join(""),
        iv: Array.from(iv).map((b) => b.toString(16).padStart(2, "0")).join(""),
        salt: Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("")
      };
    },
    /**
     * Decrypt vault using password with WebCrypto (PBKDF2 + AES-GCM-256)
     */
    async decryptVault(encryptedVault, password) {
      const enc = new TextEncoder();
      const fromHex = (hex) => new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
      const salt = fromHex(encryptedVault.salt);
      const iv = fromHex(encryptedVault.iv);
      const ciphertext = fromHex(encryptedVault.ciphertext);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 1e5,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    }
  };
  if (typeof window !== "undefined") {
    window.ReticulumCrypto = ReticulumCrypto;
    window.CortexCrypto = ReticulumCrypto;
  }
  return __toCommonJS(wallet_crypto_src_exports);
})();
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
