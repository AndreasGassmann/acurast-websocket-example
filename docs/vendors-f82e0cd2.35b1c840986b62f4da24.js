(self.webpackChunkAcurastExample=self.webpackChunkAcurastExample||[]).push([[145],{972:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(4512);function n(t,e,r){return void 0===e&&(e=new Uint8Array(2)),void 0===r&&(r=0),e[r+0]=t>>>8,e[r+1]=t>>>0,e}function o(t,e,r){return void 0===e&&(e=new Uint8Array(2)),void 0===r&&(r=0),e[r+0]=t>>>0,e[r+1]=t>>>8,e}function s(t,e){return void 0===e&&(e=0),t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}function a(t,e){return void 0===e&&(e=0),(t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3])>>>0}function f(t,e){return void 0===e&&(e=0),t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e]}function u(t,e){return void 0===e&&(e=0),(t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e])>>>0}function h(t,e,r){return void 0===e&&(e=new Uint8Array(4)),void 0===r&&(r=0),e[r+0]=t>>>24,e[r+1]=t>>>16,e[r+2]=t>>>8,e[r+3]=t>>>0,e}function d(t,e,r){return void 0===e&&(e=new Uint8Array(4)),void 0===r&&(r=0),e[r+0]=t>>>0,e[r+1]=t>>>8,e[r+2]=t>>>16,e[r+3]=t>>>24,e}function c(t,e,r){return void 0===e&&(e=new Uint8Array(8)),void 0===r&&(r=0),h(t/4294967296>>>0,e,r),h(t>>>0,e,r+4),e}function b(t,e,r){return void 0===e&&(e=new Uint8Array(8)),void 0===r&&(r=0),d(t>>>0,e,r),d(t/4294967296>>>0,e,r+4),e}e.readInt16BE=function(t,e){return void 0===e&&(e=0),(t[e+0]<<8|t[e+1])<<16>>16},e.readUint16BE=function(t,e){return void 0===e&&(e=0),(t[e+0]<<8|t[e+1])>>>0},e.readInt16LE=function(t,e){return void 0===e&&(e=0),(t[e+1]<<8|t[e])<<16>>16},e.readUint16LE=function(t,e){return void 0===e&&(e=0),(t[e+1]<<8|t[e])>>>0},e.writeUint16BE=n,e.writeInt16BE=n,e.writeUint16LE=o,e.writeInt16LE=o,e.readInt32BE=s,e.readUint32BE=a,e.readInt32LE=f,e.readUint32LE=u,e.writeUint32BE=h,e.writeInt32BE=h,e.writeUint32LE=d,e.writeInt32LE=d,e.readInt64BE=function(t,e){void 0===e&&(e=0);var r=s(t,e),i=s(t,e+4);return 4294967296*r+i-4294967296*(i>>31)},e.readUint64BE=function(t,e){return void 0===e&&(e=0),4294967296*a(t,e)+a(t,e+4)},e.readInt64LE=function(t,e){void 0===e&&(e=0);var r=f(t,e);return 4294967296*f(t,e+4)+r-4294967296*(r>>31)},e.readUint64LE=function(t,e){void 0===e&&(e=0);var r=u(t,e);return 4294967296*u(t,e+4)+r},e.writeUint64BE=c,e.writeInt64BE=c,e.writeUint64LE=b,e.writeInt64LE=b,e.readUintBE=function(t,e,r){if(void 0===r&&(r=0),t%8!=0)throw new Error("readUintBE supports only bitLengths divisible by 8");if(t/8>e.length-r)throw new Error("readUintBE: array is too short for the given bitLength");for(var i=0,n=1,o=t/8+r-1;o>=r;o--)i+=e[o]*n,n*=256;return i},e.readUintLE=function(t,e,r){if(void 0===r&&(r=0),t%8!=0)throw new Error("readUintLE supports only bitLengths divisible by 8");if(t/8>e.length-r)throw new Error("readUintLE: array is too short for the given bitLength");for(var i=0,n=1,o=r;o<r+t/8;o++)i+=e[o]*n,n*=256;return i},e.writeUintBE=function(t,e,r,n){if(void 0===r&&(r=new Uint8Array(t/8)),void 0===n&&(n=0),t%8!=0)throw new Error("writeUintBE supports only bitLengths divisible by 8");if(!i.isSafeInteger(e))throw new Error("writeUintBE value must be an integer");for(var o=1,s=t/8+n-1;s>=n;s--)r[s]=e/o&255,o*=256;return r},e.writeUintLE=function(t,e,r,n){if(void 0===r&&(r=new Uint8Array(t/8)),void 0===n&&(n=0),t%8!=0)throw new Error("writeUintLE supports only bitLengths divisible by 8");if(!i.isSafeInteger(e))throw new Error("writeUintLE value must be an integer");for(var o=1,s=n;s<n+t/8;s++)r[s]=e/o&255,o*=256;return r},e.readFloat32BE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat32(e)},e.readFloat32LE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat32(e,!0)},e.readFloat64BE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat64(e)},e.readFloat64LE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat64(e,!0)},e.writeFloat32BE=function(t,e,r){return void 0===e&&(e=new Uint8Array(4)),void 0===r&&(r=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat32(r,t),e},e.writeFloat32LE=function(t,e,r){return void 0===e&&(e=new Uint8Array(4)),void 0===r&&(r=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat32(r,t,!0),e},e.writeFloat64BE=function(t,e,r){return void 0===e&&(e=new Uint8Array(8)),void 0===r&&(r=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat64(r,t),e},e.writeFloat64LE=function(t,e,r){return void 0===e&&(e=new Uint8Array(8)),void 0===r&&(r=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat64(r,t,!0),e}},4512:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.mul=Math.imul||function(t,e){var r=65535&t,i=65535&e;return r*i+((t>>>16&65535)*i+r*(e>>>16&65535)<<16>>>0)|0},e.add=function(t,e){return t+e|0},e.sub=function(t,e){return t-e|0},e.rotl=function(t,e){return t<<e|t>>>32-e},e.rotr=function(t,e){return t<<32-e|t>>>e},e.isInteger=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},e.MAX_SAFE_INTEGER=9007199254740991,e.isSafeInteger=function(t){return e.isInteger(t)&&t>=-e.MAX_SAFE_INTEGER&&t<=e.MAX_SAFE_INTEGER}},7052:(t,e,r)=>{"use strict";e.po=e.yE=void 0;const i=r(5492);r(972),r(6228);function n(t,r=e.yE){return r.randomBytes(t)}e.yE=new i.SystemRandomSource,e.po=n},7029:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BrowserRandomSource=void 0,e.BrowserRandomSource=class{constructor(){this.isAvailable=!1,this.isInstantiated=!1;const t="undefined"!=typeof self?self.crypto||self.msCrypto:null;t&&void 0!==t.getRandomValues&&(this._crypto=t,this.isAvailable=!0,this.isInstantiated=!0)}randomBytes(t){if(!this.isAvailable||!this._crypto)throw new Error("Browser random byte generator is not available.");const e=new Uint8Array(t);for(let t=0;t<e.length;t+=65536)this._crypto.getRandomValues(e.subarray(t,t+Math.min(e.length-t,65536)));return e}}},5821:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NodeRandomSource=void 0;const i=r(6228);e.NodeRandomSource=class{constructor(){this.isAvailable=!1,this.isInstantiated=!1;{const t=r(9432);t&&t.randomBytes&&(this._crypto=t,this.isAvailable=!0,this.isInstantiated=!0)}}randomBytes(t){if(!this.isAvailable||!this._crypto)throw new Error("Node.js random byte generator is not available.");let e=this._crypto.randomBytes(t);if(e.length!==t)throw new Error("NodeRandomSource: got fewer bytes than requested");const r=new Uint8Array(t);for(let t=0;t<r.length;t++)r[t]=e[t];return(0,i.wipe)(e),r}}},5492:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SystemRandomSource=void 0;const i=r(7029),n=r(5821);e.SystemRandomSource=class{constructor(){return this.isAvailable=!1,this.name="",this._source=new i.BrowserRandomSource,this._source.isAvailable?(this.isAvailable=!0,void(this.name="Browser")):(this._source=new n.NodeRandomSource,this._source.isAvailable?(this.isAvailable=!0,void(this.name="Node")):void 0)}randomBytes(t){if(!this.isAvailable)throw new Error("System random byte generator is not available.");return this._source.randomBytes(t)}}},204:(t,e,r)=>{"use strict";var i=r(972),n=r(6228);e.On=32,e.cS=64;var o=function(){function t(){this.digestLength=e.On,this.blockSize=e.cS,this._state=new Int32Array(8),this._temp=new Int32Array(64),this._buffer=new Uint8Array(128),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this.reset()}return t.prototype._initState=function(){this._state[0]=1779033703,this._state[1]=3144134277,this._state[2]=1013904242,this._state[3]=2773480762,this._state[4]=1359893119,this._state[5]=2600822924,this._state[6]=528734635,this._state[7]=1541459225},t.prototype.reset=function(){return this._initState(),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this},t.prototype.clean=function(){n.wipe(this._buffer),n.wipe(this._temp),this.reset()},t.prototype.update=function(t,e){if(void 0===e&&(e=t.length),this._finished)throw new Error("SHA256: can't update because hash was finished.");var r=0;if(this._bytesHashed+=e,this._bufferLength>0){for(;this._bufferLength<this.blockSize&&e>0;)this._buffer[this._bufferLength++]=t[r++],e--;this._bufferLength===this.blockSize&&(a(this._temp,this._state,this._buffer,0,this.blockSize),this._bufferLength=0)}for(e>=this.blockSize&&(r=a(this._temp,this._state,t,r,e),e%=this.blockSize);e>0;)this._buffer[this._bufferLength++]=t[r++],e--;return this},t.prototype.finish=function(t){if(!this._finished){var e=this._bytesHashed,r=this._bufferLength,n=e/536870912|0,o=e<<3,s=e%64<56?64:128;this._buffer[r]=128;for(var f=r+1;f<s-8;f++)this._buffer[f]=0;i.writeUint32BE(n,this._buffer,s-8),i.writeUint32BE(o,this._buffer,s-4),a(this._temp,this._state,this._buffer,0,s),this._finished=!0}for(f=0;f<this.digestLength/4;f++)i.writeUint32BE(this._state[f],t,4*f);return this},t.prototype.digest=function(){var t=new Uint8Array(this.digestLength);return this.finish(t),t},t.prototype.saveState=function(){if(this._finished)throw new Error("SHA256: cannot save finished state");return{state:new Int32Array(this._state),buffer:this._bufferLength>0?new Uint8Array(this._buffer):void 0,bufferLength:this._bufferLength,bytesHashed:this._bytesHashed}},t.prototype.restoreState=function(t){return this._state.set(t.state),this._bufferLength=t.bufferLength,t.buffer&&this._buffer.set(t.buffer),this._bytesHashed=t.bytesHashed,this._finished=!1,this},t.prototype.cleanSavedState=function(t){n.wipe(t.state),t.buffer&&n.wipe(t.buffer),t.bufferLength=0,t.bytesHashed=0},t}();e.aD=o;var s=new Int32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function a(t,e,r,n,o){for(;o>=64;){for(var a=e[0],f=e[1],u=e[2],h=e[3],d=e[4],c=e[5],b=e[6],l=e[7],w=0;w<16;w++){var v=n+4*w;t[w]=i.readUint32BE(r,v)}for(w=16;w<64;w++){var y=t[w-2],_=(y>>>17|y<<15)^(y>>>19|y<<13)^y>>>10,p=((y=t[w-15])>>>7|y<<25)^(y>>>18|y<<14)^y>>>3;t[w]=(_+t[w-7]|0)+(p+t[w-16]|0)}for(w=0;w<64;w++)_=(((d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&c^~d&b)|0)+(l+(s[w]+t[w]|0)|0)|0,p=((a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10))+(a&f^a&u^f&u)|0,l=b,b=c,c=d,d=h+_|0,h=u,u=f,f=a,a=_+p|0;e[0]+=a,e[1]+=f,e[2]+=u,e[3]+=h,e[4]+=d,e[5]+=c,e[6]+=b,e[7]+=l,n+=64,o-=64}return n}},6228:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.wipe=function(t){for(var e=0;e<t.length;e++)t[e]=0;return t}},6698:t=>{"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){if(e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}}},3349:t=>{function e(t,e){if(!t)throw new Error(e||"Assertion failed")}t.exports=e,e.equal=function(t,e,r){if(t!=e)throw new Error(r||"Assertion failed: "+t+" != "+e)}},4367:(t,e)=>{"use strict";var r=e;function i(t){return 1===t.length?"0"+t:t}function n(t){for(var e="",r=0;r<t.length;r++)e+=i(t[r].toString(16));return e}r.toArray=function(t,e){if(Array.isArray(t))return t.slice();if(!t)return[];var r=[];if("string"!=typeof t){for(var i=0;i<t.length;i++)r[i]=0|t[i];return r}if("hex"===e)for((t=t.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(t="0"+t),i=0;i<t.length;i+=2)r.push(parseInt(t[i]+t[i+1],16));else for(i=0;i<t.length;i++){var n=t.charCodeAt(i),o=n>>8,s=255&n;o?r.push(o,s):r.push(s)}return r},r.zero2=i,r.toHex=n,r.encode=function(t,e){return"hex"===e?n(t):t}}}]);