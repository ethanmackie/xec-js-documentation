(() => {
  const ic = {
    8325: (w, y, a) => { const h = Symbol('SemVer ANY'); class r {static get ANY () { return h }constructor (m, d) { if (d = n(d), m instanceof r) { if (m.loose === !!d.loose) return m; m = m.value }s('comparator', m, d), this.options = d, this.loose = !!d.loose, this.parse(m), this.semver === h ? this.value = '' : this.value = this.operator + this.semver.version, s('comp', this) }parse (m) { const d = this.options.loose ? c[f.COMPARATORLOOSE] : c[f.COMPARATOR]; const p = m.match(d); if (!p) throw new TypeError(`Invalid comparator: ${m}`); this.operator = p[1] !== void 0 ? p[1] : '', this.operator === '=' && (this.operator = ''), p[2] ? this.semver = new u(p[2], this.options.loose) : this.semver = h }toString () { return this.value }test (m) { if (s('Comparator.test', m, this.options.loose), this.semver === h || m === h) return !0; if (typeof m === 'string') try { m = new u(m, this.options) } catch (d) { return !1 } return l(m, this.operator, this.semver, this.options) }intersects (m, d) { if (!(m instanceof r)) throw new TypeError('a Comparator is required'); if ((!d || typeof d !== 'object') && (d = { loose: !!d, includePrerelease: !1 }), this.operator === '') return this.value === '' ? !0 : new g(m.value, d).test(this.value); if (m.operator === '') return m.value === '' ? !0 : new g(this.value, d).test(m.semver); const p = (this.operator === '>=' || this.operator === '>') && (m.operator === '>=' || m.operator === '>'); const b = (this.operator === '<=' || this.operator === '<') && (m.operator === '<=' || m.operator === '<'); const v = this.semver.version === m.semver.version; const x = (this.operator === '>=' || this.operator === '<=') && (m.operator === '>=' || m.operator === '<='); const P = l(this.semver, '<', m.semver, d) && (this.operator === '>=' || this.operator === '>') && (m.operator === '<=' || m.operator === '<'); const S = l(this.semver, '>', m.semver, d) && (this.operator === '<=' || this.operator === '<') && (m.operator === '>=' || m.operator === '>'); return p || b || v && x || P || S }}w.exports = r; const n = a(349); const { re: c, t: f } = a(3259); const l = a(5609); const s = a(4903); const u = a(1630); const g = a(1459) },
    1459: (w, y, a) => { class h {constructor (q, _) { if (_ = c(_), q instanceof h) return q.loose === !!_.loose && q.includePrerelease === !!_.includePrerelease ? q : new h(q.raw, _); if (q instanceof f) return this.raw = q.value, this.set = [[q]], this.format(), this; if (this.options = _, this.loose = !!_.loose, this.includePrerelease = !!_.includePrerelease, this.raw = q, this.set = q.split(/\s*\|\|\s*/).map(W => this.parseRange(W.trim())).filter(W => W.length), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${q}`); if (this.set.length > 1) { const W = this.set[0]; if (this.set = this.set.filter(H => !p(H[0])), this.set.length === 0) this.set = [W]; else if (this.set.length > 1) { for (const H of this.set) if (H.length === 1 && b(H[0])) { this.set = [H]; break } } } this.format() }format () { return this.range = this.set.map(q => q.join(' ').trim()).join('||').trim(), this.range }toString () { return this.range }parseRange (q) { q = q.trim(); const W = `parseRange:${Object.keys(this.options).join(',')}:${q}`; const H = n.get(W); if (H) return H; const $ = this.options.loose; const K = $ ? u[g.HYPHENRANGELOOSE] : u[g.HYPHENRANGE]; q = q.replace(K, B(this.options.includePrerelease)), l('hyphen replace', q), q = q.replace(u[g.COMPARATORTRIM], i), l('comparator trim', q, u[g.COMPARATORTRIM]), q = q.replace(u[g.TILDETRIM], m), q = q.replace(u[g.CARETTRIM], d), q = q.split(/\s+/).join(' '); const te = $ ? u[g.COMPARATORLOOSE] : u[g.COMPARATOR]; const oe = q.split(' ').map(Ae => x(Ae, this.options)).join(' ').split(/\s+/).map(Ae => R(Ae, this.options)).filter(this.options.loose ? Ae => !!Ae.match(te) : () => !0).map(Ae => new f(Ae, this.options)); const he = oe.length; const Q = new Map(); for (const Ae of oe) { if (p(Ae)) return [Ae]; Q.set(Ae.value, Ae) }Q.size > 1 && Q.has('') && Q.delete(''); const ye = [...Q.values()]; return n.set(W, ye), ye }intersects (q, _) { if (!(q instanceof h)) throw new TypeError('a Range is required'); return this.set.some(W => v(W, _) && q.set.some(H => v(H, _) && W.every($ => H.every(K => $.intersects(K, _))))) }test (q) { if (!q) return !1; if (typeof q === 'string') try { q = new s(q, this.options) } catch (_) { return !1 } for (let _ = 0; _ < this.set.length; _++) if (O(this.set[_], q, this.options)) return !0; return !1 }}w.exports = h; const r = a(9593); const n = new r({ max: 1e3 }); const c = a(349); const f = a(8325); const l = a(4903); const s = a(1630); const { re: u, t: g, comparatorTrimReplace: i, tildeTrimReplace: m, caretTrimReplace: d } = a(3259); const p = F => F.value === '<0.0.0-0'; const b = F => F.value === ''; const v = (F, q) => { let _ = !0; const W = F.slice(); let H = W.pop(); for (;_ && W.length;)_ = W.every($ => H.intersects($, q)), H = W.pop(); return _ }; const x = (F, q) => (l('comp', F, q), F = A(F, q), l('caret', F), F = S(F, q), l('tildes', F), F = C(F, q), l('xrange', F), F = L(F, q), l('stars', F), F); const P = F => !F || F.toLowerCase() === 'x' || F === '*'; const S = (F, q) => F.trim().split(/\s+/).map(_ => D(_, q)).join(' '); const D = (F, q) => { const _ = q.loose ? u[g.TILDELOOSE] : u[g.TILDE]; return F.replace(_, (W, H, $, K, te) => { l('tilde', F, W, H, $, K, te); let oe; return P(H) ? oe = '' : P($) ? oe = `>=${H}.0.0 <${+H + 1}.0.0-0` : P(K) ? oe = `>=${H}.${$}.0 <${H}.${+$ + 1}.0-0` : te ? (l('replaceTilde pr', te), oe = `>=${H}.${$}.${K}-${te} <${H}.${+$ + 1}.0-0`) : oe = `>=${H}.${$}.${K} <${H}.${+$ + 1}.0-0`, l('tilde return', oe), oe }) }; const A = (F, q) => F.trim().split(/\s+/).map(_ => T(_, q)).join(' '); const T = (F, q) => { l('caret', F, q); const _ = q.loose ? u[g.CARETLOOSE] : u[g.CARET]; const W = q.includePrerelease ? '-0' : ''; return F.replace(_, (H, $, K, te, oe) => { l('caret', F, H, $, K, te, oe); let he; return P($) ? he = '' : P(K) ? he = `>=${$}.0.0${W} <${+$ + 1}.0.0-0` : P(te) ? $ === '0' ? he = `>=${$}.${K}.0${W} <${$}.${+K + 1}.0-0` : he = `>=${$}.${K}.0${W} <${+$ + 1}.0.0-0` : oe ? (l('replaceCaret pr', oe), $ === '0' ? K === '0' ? he = `>=${$}.${K}.${te}-${oe} <${$}.${K}.${+te + 1}-0` : he = `>=${$}.${K}.${te}-${oe} <${$}.${+K + 1}.0-0` : he = `>=${$}.${K}.${te}-${oe} <${+$ + 1}.0.0-0`) : (l('no pr'), $ === '0' ? K === '0' ? he = `>=${$}.${K}.${te}${W} <${$}.${K}.${+te + 1}-0` : he = `>=${$}.${K}.${te}${W} <${$}.${+K + 1}.0-0` : he = `>=${$}.${K}.${te} <${+$ + 1}.0.0-0`), l('caret return', he), he }) }; const C = (F, q) => (l('replaceXRanges', F, q), F.split(/\s+/).map(_ => N(_, q)).join(' ')); const N = (F, q) => { F = F.trim(); const _ = q.loose ? u[g.XRANGELOOSE] : u[g.XRANGE]; return F.replace(_, (W, H, $, K, te, oe) => { l('xRange', F, W, H, $, K, te, oe); const he = P($); const Q = he || P(K); const ye = Q || P(te); const Ae = ye; return H === '=' && Ae && (H = ''), oe = q.includePrerelease ? '-0' : '', he ? H === '>' || H === '<' ? W = '<0.0.0-0' : W = '*' : H && Ae ? (Q && (K = 0), te = 0, H === '>' ? (H = '>=', Q ? ($ = +$ + 1, K = 0, te = 0) : (K = +K + 1, te = 0)) : H === '<=' && (H = '<', Q ? $ = +$ + 1 : K = +K + 1), H === '<' && (oe = '-0'), W = `${H + $}.${K}.${te}${oe}`) : Q ? W = `>=${$}.0.0${oe} <${+$ + 1}.0.0-0` : ye && (W = `>=${$}.${K}.0${oe} <${$}.${+K + 1}.0-0`), l('xRange return', W), W }) }; const L = (F, q) => (l('replaceStars', F, q), F.trim().replace(u[g.STAR], '')); const R = (F, q) => (l('replaceGTE0', F, q), F.trim().replace(u[q.includePrerelease ? g.GTE0PRE : g.GTE0], '')); const B = F => (q, _, W, H, $, K, te, oe, he, Q, ye, Ae, Ke) => (P(W) ? _ = '' : P(H) ? _ = `>=${W}.0.0${F ? '-0' : ''}` : P($) ? _ = `>=${W}.${H}.0${F ? '-0' : ''}` : K ? _ = `>=${_}` : _ = `>=${_}${F ? '-0' : ''}`, P(he) ? oe = '' : P(Q) ? oe = `<${+he + 1}.0.0-0` : P(ye) ? oe = `<${he}.${+Q + 1}.0-0` : Ae ? oe = `<=${he}.${Q}.${ye}-${Ae}` : F ? oe = `<${he}.${Q}.${+ye + 1}-0` : oe = `<=${oe}`, `${_} ${oe}`.trim()); const O = (F, q, _) => { for (let W = 0; W < F.length; W++) if (!F[W].test(q)) return !1; if (q.prerelease.length && !_.includePrerelease) { for (let W = 0; W < F.length; W++) if (l(F[W].semver), F[W].semver !== f.ANY && F[W].semver.prerelease.length > 0) { const H = F[W].semver; if (H.major === q.major && H.minor === q.minor && H.patch === q.patch) return !0 } return !1 } return !0 } },
    1630: (w, y, a) => { const h = a(4903); const { MAX_LENGTH: r, MAX_SAFE_INTEGER: n } = a(3325); const { re: c, t: f } = a(3259); const l = a(349); const { compareIdentifiers: s } = a(7342); class u {constructor (i, m) { if (m = l(m), i instanceof u) { if (i.loose === !!m.loose && i.includePrerelease === !!m.includePrerelease) return i; i = i.version } else if (typeof i !== 'string') throw new TypeError(`Invalid Version: ${i}`); if (i.length > r) throw new TypeError(`version is longer than ${r} characters`); h('SemVer', i, m), this.options = m, this.loose = !!m.loose, this.includePrerelease = !!m.includePrerelease; const d = i.trim().match(m.loose ? c[f.LOOSE] : c[f.FULL]); if (!d) throw new TypeError(`Invalid Version: ${i}`); if (this.raw = i, this.major = +d[1], this.minor = +d[2], this.patch = +d[3], this.major > n || this.major < 0) throw new TypeError('Invalid major version'); if (this.minor > n || this.minor < 0) throw new TypeError('Invalid minor version'); if (this.patch > n || this.patch < 0) throw new TypeError('Invalid patch version'); d[4] ? this.prerelease = d[4].split('.').map(p => { if (/^[0-9]+$/.test(p)) { const b = +p; if (b >= 0 && b < n) return b } return p }) : this.prerelease = [], this.build = d[5] ? d[5].split('.') : [], this.format() }format () { return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join('.')}`), this.version }toString () { return this.version }compare (i) { if (h('SemVer.compare', this.version, this.options, i), !(i instanceof u)) { if (typeof i === 'string' && i === this.version) return 0; i = new u(i, this.options) } return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i) }compareMain (i) { return i instanceof u || (i = new u(i, this.options)), s(this.major, i.major) || s(this.minor, i.minor) || s(this.patch, i.patch) }comparePre (i) { if (i instanceof u || (i = new u(i, this.options)), this.prerelease.length && !i.prerelease.length) return -1; if (!this.prerelease.length && i.prerelease.length) return 1; if (!this.prerelease.length && !i.prerelease.length) return 0; let m = 0; do { const d = this.prerelease[m]; const p = i.prerelease[m]; if (h('prerelease compare', m, d, p), d === void 0 && p === void 0) return 0; if (p === void 0) return 1; if (d === void 0) return -1; if (d === p) continue; return s(d, p) } while (++m) }compareBuild (i) { i instanceof u || (i = new u(i, this.options)); let m = 0; do { const d = this.build[m]; const p = i.build[m]; if (h('prerelease compare', m, d, p), d === void 0 && p === void 0) return 0; if (p === void 0) return 1; if (d === void 0) return -1; if (d === p) continue; return s(d, p) } while (++m) }inc (i, m) { switch (i) { case 'premajor':this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc('pre', m); break; case 'preminor':this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc('pre', m); break; case 'prepatch':this.prerelease.length = 0, this.inc('patch', m), this.inc('pre', m); break; case 'prerelease':this.prerelease.length === 0 && this.inc('patch', m), this.inc('pre', m); break; case 'major':(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = []; break; case 'minor':(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = []; break; case 'patch':this.prerelease.length === 0 && this.patch++, this.prerelease = []; break; case 'pre':if (this.prerelease.length === 0) this.prerelease = [0]; else { let d = this.prerelease.length; for (;--d >= 0;) typeof this.prerelease[d] === 'number' && (this.prerelease[d]++, d = -2); d === -1 && this.prerelease.push(0) }m && (this.prerelease[0] === m ? isNaN(this.prerelease[1]) && (this.prerelease = [m, 0]) : this.prerelease = [m, 0]); break; default:throw new Error(`invalid increment argument: ${i}`) } return this.format(), this.raw = this.version, this }}w.exports = u },
    7200: (w, y, a) => { const h = a(8216); const r = (n, c) => { const f = h(n.trim().replace(/^[=v]+/, ''), c); return f ? f.version : null }; w.exports = r },
    5609: (w, y, a) => { const h = a(4594); const r = a(3228); const n = a(145); const c = a(9778); const f = a(5429); const l = a(7888); const s = (u, g, i, m) => { switch (g) { case '===':return typeof u === 'object' && (u = u.version), typeof i === 'object' && (i = i.version), u === i; case '!==':return typeof u === 'object' && (u = u.version), typeof i === 'object' && (i = i.version), u !== i; case '':case '=':case '==':return h(u, i, m); case '!=':return r(u, i, m); case '>':return n(u, i, m); case '>=':return c(u, i, m); case '<':return f(u, i, m); case '<=':return l(u, i, m); default:throw new TypeError(`Invalid operator: ${g}`) } }; w.exports = s },
    9485: (w, y, a) => { const h = a(1630); const r = a(8216); const { re: n, t: c } = a(3259); const f = (l, s) => { if (l instanceof h) return l; if (typeof l === 'number' && (l = String(l)), typeof l !== 'string') return null; s = s || {}; let u = null; if (!s.rtl)u = l.match(n[c.COERCE]); else { let g; for (;(g = n[c.COERCERTL].exec(l)) && (!u || u.index + u[0].length !== l.length);)(!u || g.index + g[0].length !== u.index + u[0].length) && (u = g), n[c.COERCERTL].lastIndex = g.index + g[1].length + g[2].length; n[c.COERCERTL].lastIndex = -1 } return u === null ? null : r(`${u[2]}.${u[3] || '0'}.${u[4] || '0'}`, s) }; w.exports = f },
    7548: (w, y, a) => { const h = a(1630); const r = (n, c, f) => { const l = new h(n, f); const s = new h(c, f); return l.compare(s) || l.compareBuild(s) }; w.exports = r },
    7317: (w, y, a) => { const h = a(9123); const r = (n, c) => h(n, c, !0); w.exports = r },
    9123: (w, y, a) => { const h = a(1630); const r = (n, c, f) => new h(n, f).compare(new h(c, f)); w.exports = r },
    3444: (w, y, a) => { const h = a(8216); const r = a(4594); const n = (c, f) => { if (r(c, f)) return null; { const l = h(c); const s = h(f); const u = l.prerelease.length || s.prerelease.length; const g = u ? 'pre' : ''; const i = u ? 'prerelease' : ''; for (const m in l) if ((m === 'major' || m === 'minor' || m === 'patch') && l[m] !== s[m]) return g + m; return i } }; w.exports = n },
    4594: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) === 0; w.exports = r },
    145: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) > 0; w.exports = r },
    9778: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) >= 0; w.exports = r },
    288: (w, y, a) => { const h = a(1630); const r = (n, c, f, l) => { typeof f === 'string' && (l = f, f = void 0); try { return new h(n, f).inc(c, l).version } catch (s) { return null } }; w.exports = r },
    5429: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) < 0; w.exports = r },
    7888: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) <= 0; w.exports = r },
    5254: (w, y, a) => { const h = a(1630); const r = (n, c) => new h(n, c).major; w.exports = r },
    9887: (w, y, a) => { const h = a(1630); const r = (n, c) => new h(n, c).minor; w.exports = r },
    3228: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(n, c, f) !== 0; w.exports = r },
    8216: (w, y, a) => { const { MAX_LENGTH: h } = a(3325); const { re: r, t: n } = a(3259); const c = a(1630); const f = a(349); const l = (s, u) => { if (u = f(u), s instanceof c) return s; if (typeof s !== 'string' || s.length > h || !(u.loose ? r[n.LOOSE] : r[n.FULL]).test(s)) return null; try { return new c(s, u) } catch (i) { return null } }; w.exports = l },
    8571: (w, y, a) => { const h = a(1630); const r = (n, c) => new h(n, c).patch; w.exports = r },
    2115: (w, y, a) => { const h = a(8216); const r = (n, c) => { const f = h(n, c); return f && f.prerelease.length ? f.prerelease : null }; w.exports = r },
    6822: (w, y, a) => { const h = a(9123); const r = (n, c, f) => h(c, n, f); w.exports = r },
    2490: (w, y, a) => { const h = a(7548); const r = (n, c) => n.sort((f, l) => h(l, f, c)); w.exports = r },
    5374: (w, y, a) => { const h = a(1459); const r = (n, c, f) => { try { c = new h(c, f) } catch (l) { return !1 } return c.test(n) }; w.exports = r },
    6401: (w, y, a) => { const h = a(7548); const r = (n, c) => n.sort((f, l) => h(f, l, c)); w.exports = r },
    5665: (w, y, a) => { const h = a(8216); const r = (n, c) => { const f = h(n, c); return f ? f.version : null }; w.exports = r },
    7154: (w, y, a) => { const h = a(3259); w.exports = { re: h.re, src: h.src, tokens: h.t, SEMVER_SPEC_VERSION: a(3325).SEMVER_SPEC_VERSION, SemVer: a(1630), compareIdentifiers: a(7342).compareIdentifiers, rcompareIdentifiers: a(7342).rcompareIdentifiers, parse: a(8216), valid: a(5665), clean: a(7200), inc: a(288), diff: a(3444), major: a(5254), minor: a(9887), patch: a(8571), prerelease: a(2115), compare: a(9123), rcompare: a(6822), compareLoose: a(7317), compareBuild: a(7548), sort: a(6401), rsort: a(2490), gt: a(145), lt: a(5429), eq: a(4594), neq: a(3228), gte: a(9778), lte: a(7888), cmp: a(5609), coerce: a(9485), Comparator: a(8325), Range: a(1459), satisfies: a(5374), toComparators: a(6607), maxSatisfying: a(7530), minSatisfying: a(7527), minVersion: a(1346), validRange: a(3478), outside: a(841), gtr: a(8951), ltr: a(4666), intersects: a(6024), simplifyRange: a(2277), subset: a(8784) } },
    3325: w => { const y = '2.0.0'; const h = Number.MAX_SAFE_INTEGER || 9007199254740991; const r = 16; w.exports = { SEMVER_SPEC_VERSION: y, MAX_LENGTH: 256, MAX_SAFE_INTEGER: h, MAX_SAFE_COMPONENT_LENGTH: r } },
    4903: w => { const y = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...a) => console.error('SEMVER', ...a) : () => {}; w.exports = y },
    7342: w => { const y = /^[0-9]+$/; const a = (r, n) => { const c = y.test(r); const f = y.test(n); return c && f && (r = +r, n = +n), r === n ? 0 : c && !f ? -1 : f && !c ? 1 : r < n ? -1 : 1 }; const h = (r, n) => a(n, r); w.exports = { compareIdentifiers: a, rcompareIdentifiers: h } },
    349: w => { const y = ['includePrerelease', 'loose', 'rtl']; const a = h => h ? typeof h !== 'object' ? { loose: !0 } : y.filter(r => h[r]).reduce((r, n) => (r[n] = !0, r), {}) : {}; w.exports = a },
    3259: (w, y, a) => { const { MAX_SAFE_COMPONENT_LENGTH: h } = a(3325); const r = a(4903); y = w.exports = {}; const n = y.re = []; const c = y.src = []; const f = y.t = {}; let l = 0; const s = (u, g, i) => { const m = l++; r(m, g), f[u] = m, c[m] = g, n[m] = new RegExp(g, i ? 'g' : void 0) }; s('NUMERICIDENTIFIER', '0|[1-9]\\d*'), s('NUMERICIDENTIFIERLOOSE', '[0-9]+'), s('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*'), s('MAINVERSION', `(${c[f.NUMERICIDENTIFIER]})\\.(${c[f.NUMERICIDENTIFIER]})\\.(${c[f.NUMERICIDENTIFIER]})`), s('MAINVERSIONLOOSE', `(${c[f.NUMERICIDENTIFIERLOOSE]})\\.(${c[f.NUMERICIDENTIFIERLOOSE]})\\.(${c[f.NUMERICIDENTIFIERLOOSE]})`), s('PRERELEASEIDENTIFIER', `(?:${c[f.NUMERICIDENTIFIER]}|${c[f.NONNUMERICIDENTIFIER]})`), s('PRERELEASEIDENTIFIERLOOSE', `(?:${c[f.NUMERICIDENTIFIERLOOSE]}|${c[f.NONNUMERICIDENTIFIER]})`), s('PRERELEASE', `(?:-(${c[f.PRERELEASEIDENTIFIER]}(?:\\.${c[f.PRERELEASEIDENTIFIER]})*))`), s('PRERELEASELOOSE', `(?:-?(${c[f.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[f.PRERELEASEIDENTIFIERLOOSE]})*))`), s('BUILDIDENTIFIER', '[0-9A-Za-z-]+'), s('BUILD', `(?:\\+(${c[f.BUILDIDENTIFIER]}(?:\\.${c[f.BUILDIDENTIFIER]})*))`), s('FULLPLAIN', `v?${c[f.MAINVERSION]}${c[f.PRERELEASE]}?${c[f.BUILD]}?`), s('FULL', `^${c[f.FULLPLAIN]}$`), s('LOOSEPLAIN', `[v=\\s]*${c[f.MAINVERSIONLOOSE]}${c[f.PRERELEASELOOSE]}?${c[f.BUILD]}?`), s('LOOSE', `^${c[f.LOOSEPLAIN]}$`), s('GTLT', '((?:<|>)?=?)'), s('XRANGEIDENTIFIERLOOSE', `${c[f.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), s('XRANGEIDENTIFIER', `${c[f.NUMERICIDENTIFIER]}|x|X|\\*`), s('XRANGEPLAIN', `[v=\\s]*(${c[f.XRANGEIDENTIFIER]})(?:\\.(${c[f.XRANGEIDENTIFIER]})(?:\\.(${c[f.XRANGEIDENTIFIER]})(?:${c[f.PRERELEASE]})?${c[f.BUILD]}?)?)?`), s('XRANGEPLAINLOOSE', `[v=\\s]*(${c[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[f.XRANGEIDENTIFIERLOOSE]})(?:${c[f.PRERELEASELOOSE]})?${c[f.BUILD]}?)?)?`), s('XRANGE', `^${c[f.GTLT]}\\s*${c[f.XRANGEPLAIN]}$`), s('XRANGELOOSE', `^${c[f.GTLT]}\\s*${c[f.XRANGEPLAINLOOSE]}$`), s('COERCE', `(^|[^\\d])(\\d{1,${h}})(?:\\.(\\d{1,${h}}))?(?:\\.(\\d{1,${h}}))?(?:$|[^\\d])`), s('COERCERTL', c[f.COERCE], !0), s('LONETILDE', '(?:~>?)'), s('TILDETRIM', `(\\s*)${c[f.LONETILDE]}\\s+`, !0), y.tildeTrimReplace = '$1~', s('TILDE', `^${c[f.LONETILDE]}${c[f.XRANGEPLAIN]}$`), s('TILDELOOSE', `^${c[f.LONETILDE]}${c[f.XRANGEPLAINLOOSE]}$`), s('LONECARET', '(?:\\^)'), s('CARETTRIM', `(\\s*)${c[f.LONECARET]}\\s+`, !0), y.caretTrimReplace = '$1^', s('CARET', `^${c[f.LONECARET]}${c[f.XRANGEPLAIN]}$`), s('CARETLOOSE', `^${c[f.LONECARET]}${c[f.XRANGEPLAINLOOSE]}$`), s('COMPARATORLOOSE', `^${c[f.GTLT]}\\s*(${c[f.LOOSEPLAIN]})$|^$`), s('COMPARATOR', `^${c[f.GTLT]}\\s*(${c[f.FULLPLAIN]})$|^$`), s('COMPARATORTRIM', `(\\s*)${c[f.GTLT]}\\s*(${c[f.LOOSEPLAIN]}|${c[f.XRANGEPLAIN]})`, !0), y.comparatorTrimReplace = '$1$2$3', s('HYPHENRANGE', `^\\s*(${c[f.XRANGEPLAIN]})\\s+-\\s+(${c[f.XRANGEPLAIN]})\\s*$`), s('HYPHENRANGELOOSE', `^\\s*(${c[f.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[f.XRANGEPLAINLOOSE]})\\s*$`), s('STAR', '(<|>)?=?\\s*\\*'), s('GTE0', '^\\s*>=\\s*0.0.0\\s*$'), s('GTE0PRE', '^\\s*>=\\s*0.0.0-0\\s*$') },
    8951: (w, y, a) => { const h = a(841); const r = (n, c, f) => h(n, c, '>', f); w.exports = r },
    6024: (w, y, a) => { const h = a(1459); const r = (n, c, f) => (n = new h(n, f), c = new h(c, f), n.intersects(c)); w.exports = r },
    4666: (w, y, a) => { const h = a(841); const r = (n, c, f) => h(n, c, '<', f); w.exports = r },
    7530: (w, y, a) => { const h = a(1630); const r = a(1459); const n = (c, f, l) => { let s = null; let u = null; let g = null; try { g = new r(f, l) } catch (i) { return null } return c.forEach(i => { g.test(i) && (!s || u.compare(i) === -1) && (s = i, u = new h(s, l)) }), s }; w.exports = n },
    7527: (w, y, a) => { const h = a(1630); const r = a(1459); const n = (c, f, l) => { let s = null; let u = null; let g = null; try { g = new r(f, l) } catch (i) { return null } return c.forEach(i => { g.test(i) && (!s || u.compare(i) === 1) && (s = i, u = new h(s, l)) }), s }; w.exports = n },
    1346: (w, y, a) => { const h = a(1630); const r = a(1459); const n = a(145); const c = (f, l) => { f = new r(f, l); let s = new h('0.0.0'); if (f.test(s) || (s = new h('0.0.0-0'), f.test(s))) return s; s = null; for (let u = 0; u < f.set.length; ++u) { const g = f.set[u]; let i = null; g.forEach(m => { const d = new h(m.semver.version); switch (m.operator) { case '>':d.prerelease.length === 0 ? d.patch++ : d.prerelease.push(0), d.raw = d.format(); case '':case '>=':(!i || n(d, i)) && (i = d); break; case '<':case '<=':break; default:throw new Error(`Unexpected operation: ${m.operator}`) } }), i && (!s || n(s, i)) && (s = i) } return s && f.test(s) ? s : null }; w.exports = c },
    841: (w, y, a) => { const h = a(1630); const r = a(8325); const { ANY: n } = r; const c = a(1459); const f = a(5374); const l = a(145); const s = a(5429); const u = a(7888); const g = a(9778); const i = (m, d, p, b) => { m = new h(m, b), d = new c(d, b); let v, x, P, S, D; switch (p) { case '>':v = l, x = u, P = s, S = '>', D = '>='; break; case '<':v = s, x = g, P = l, S = '<', D = '<='; break; default:throw new TypeError('Must provide a hilo val of "<" or ">"') } if (f(m, d, b)) return !1; for (let A = 0; A < d.set.length; ++A) { const T = d.set[A]; let C = null; let N = null; if (T.forEach(L => { L.semver === n && (L = new r('>=0.0.0')), C = C || L, N = N || L, v(L.semver, C.semver, b) ? C = L : P(L.semver, N.semver, b) && (N = L) }), C.operator === S || C.operator === D || (!N.operator || N.operator === S) && x(m, N.semver)) return !1; if (N.operator === D && P(m, N.semver)) return !1 } return !0 }; w.exports = i },
    2277: (w, y, a) => { const h = a(5374); const r = a(9123); w.exports = (n, c, f) => { const l = []; let s = null; let u = null; const g = n.sort((p, b) => r(p, b, f)); for (const p of g)h(p, c, f) ? (u = p, s || (s = p)) : (u && l.push([s, u]), u = null, s = null); s && l.push([s, null]); const i = []; for (const [p, b] of l)p === b ? i.push(p) : !b && p === g[0] ? i.push('*') : b ? p === g[0] ? i.push(`<=${b}`) : i.push(`${p} - ${b}`) : i.push(`>=${p}`); const m = i.join(' || '); const d = typeof c.raw === 'string' ? c.raw : String(c); return m.length < d.length ? m : c } },
    8784: (w, y, a) => { const h = a(1459); const r = a(8325); const { ANY: n } = r; const c = a(5374); const f = a(9123); const l = (i, m, d = {}) => { if (i === m) return !0; i = new h(i, d), m = new h(m, d); let p = !1; e:for (const b of i.set) { for (const v of m.set) { const x = s(b, v, d); if (p = p || x !== null, x) continue e } if (p) return !1 } return !0 }; const s = (i, m, d) => { if (i === m) return !0; if (i.length === 1 && i[0].semver === n) { if (m.length === 1 && m[0].semver === n) return !0; d.includePrerelease ? i = [new r('>=0.0.0-0')] : i = [new r('>=0.0.0')] } if (m.length === 1 && m[0].semver === n) { if (d.includePrerelease) return !0; m = [new r('>=0.0.0')] } const p = new Set(); let b, v; for (const N of i)N.operator === '>' || N.operator === '>=' ? b = u(b, N, d) : N.operator === '<' || N.operator === '<=' ? v = g(v, N, d) : p.add(N.semver); if (p.size > 1) return null; let x; if (b && v) { if (x = f(b.semver, v.semver, d), x > 0) return null; if (x === 0 && (b.operator !== '>=' || v.operator !== '<=')) return null } for (const N of p) { if (b && !c(N, String(b), d) || v && !c(N, String(v), d)) return null; for (const L of m) if (!c(N, String(L), d)) return !1; return !0 } let P; let S; let D; let A; let T = v && !d.includePrerelease && v.semver.prerelease.length ? v.semver : !1; let C = b && !d.includePrerelease && b.semver.prerelease.length ? b.semver : !1; T && T.prerelease.length === 1 && v.operator === '<' && T.prerelease[0] === 0 && (T = !1); for (const N of m) { if (A = A || N.operator === '>' || N.operator === '>=', D = D || N.operator === '<' || N.operator === '<=', b) { if (C && N.semver.prerelease && N.semver.prerelease.length && N.semver.major === C.major && N.semver.minor === C.minor && N.semver.patch === C.patch && (C = !1), N.operator === '>' || N.operator === '>=') { if (P = u(b, N, d), P === N && P !== b) return !1 } else if (b.operator === '>=' && !c(b.semver, String(N), d)) return !1 } if (v) { if (T && N.semver.prerelease && N.semver.prerelease.length && N.semver.major === T.major && N.semver.minor === T.minor && N.semver.patch === T.patch && (T = !1), N.operator === '<' || N.operator === '<=') { if (S = g(v, N, d), S === N && S !== v) return !1 } else if (v.operator === '<=' && !c(v.semver, String(N), d)) return !1 } if (!N.operator && (v || b) && x !== 0) return !1 } return !(b && D && !v && x !== 0 || v && A && !b && x !== 0 || C || T) }; const u = (i, m, d) => { if (!i) return m; const p = f(i.semver, m.semver, d); return p > 0 ? i : p < 0 || m.operator === '>' && i.operator === '>=' ? m : i }; const g = (i, m, d) => { if (!i) return m; const p = f(i.semver, m.semver, d); return p < 0 ? i : p > 0 || m.operator === '<' && i.operator === '<=' ? m : i }; w.exports = l },
    6607: (w, y, a) => { const h = a(1459); const r = (n, c) => new h(n, c).set.map(f => f.map(l => l.value).join(' ').trim().split(' ')); w.exports = r },
    3478: (w, y, a) => { const h = a(1459); const r = (n, c) => { try { return new h(n, c).range || '*' } catch (f) { return null } }; w.exports = r },
    9737: () => { +(function (w) { 'use strict'; const y = '.dropdown-backdrop'; const a = '[data-toggle="dropdown"]'; const h = function (l) { w(l).on('click.bs.dropdown', this.toggle) }; h.VERSION = '3.4.1'; function r (l) { let s = l.attr('data-target'); s || (s = l.attr('href'), s = s && /#[A-Za-z]/.test(s) && s.replace(/.*(?=#[^\s]*$)/, '')); const u = s !== '#' ? w(document).find(s) : null; return u && u.length ? u : l.parent() } function n (l) { l && l.which === 3 || (w(y).remove(), w(a).each(function () { const s = w(this); const u = r(s); const g = { relatedTarget: this }; !u.hasClass('open') || l && l.type == 'click' && /input|textarea/i.test(l.target.tagName) && w.contains(u[0], l.target) || (u.trigger(l = w.Event('hide.bs.dropdown', g)), !l.isDefaultPrevented() && (s.attr('aria-expanded', 'false'), u.removeClass('open').trigger(w.Event('hidden.bs.dropdown', g)))) })) }h.prototype.toggle = function (l) { const s = w(this); if (!s.is('.disabled, :disabled')) { const u = r(s); const g = u.hasClass('open'); if (n(), !g) { 'ontouchstart' in document.documentElement && !u.closest('.navbar-nav').length && w(document.createElement('div')).addClass('dropdown-backdrop').insertAfter(w(this)).on('click', n); const i = { relatedTarget: this }; if (u.trigger(l = w.Event('show.bs.dropdown', i)), l.isDefaultPrevented()) return; s.trigger('focus').attr('aria-expanded', 'true'), u.toggleClass('open').trigger(w.Event('shown.bs.dropdown', i)) } return !1 } }, h.prototype.keydown = function (l) { if (!(!/(38|40|27|32)/.test(l.which) || /input|textarea/i.test(l.target.tagName))) { const s = w(this); if (l.preventDefault(), l.stopPropagation(), !s.is('.disabled, :disabled')) { const u = r(s); const g = u.hasClass('open'); if (!g && l.which != 27 || g && l.which == 27) return l.which == 27 && u.find(a).trigger('focus'), s.trigger('click'); const i = ' li:not(.disabled):visible a'; const m = u.find('.dropdown-menu' + i); if (m.length) { let d = m.index(l.target); l.which == 38 && d > 0 && d--, l.which == 40 && d < m.length - 1 && d++, ~d || (d = 0), m.eq(d).trigger('focus') } } } }; function c (l) { return this.each(function () { const s = w(this); let u = s.data('bs.dropdown'); u || s.data('bs.dropdown', u = new h(this)), typeof l === 'string' && u[l].call(s) }) } const f = w.fn.dropdown; w.fn.dropdown = c, w.fn.dropdown.Constructor = h, w.fn.dropdown.noConflict = function () { return w.fn.dropdown = f, this }, w(document).on('click.bs.dropdown.data-api', n).on('click.bs.dropdown.data-api', '.dropdown form', function (l) { l.stopPropagation() }).on('click.bs.dropdown.data-api', a, h.prototype.toggle).on('keydown.bs.dropdown.data-api', a, h.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', h.prototype.keydown) }(jQuery)) },
    6927: () => { +(function (w) { 'use strict'; const y = function (r, n) { this.init('popover', r, n) }; if (!w.fn.tooltip) throw new Error('Popover requires tooltip.js'); y.VERSION = '3.4.1', y.DEFAULTS = w.extend({}, w.fn.tooltip.Constructor.DEFAULTS, { placement: 'right', trigger: 'click', content: '', template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), y.prototype = w.extend({}, w.fn.tooltip.Constructor.prototype), y.prototype.constructor = y, y.prototype.getDefaults = function () { return y.DEFAULTS }, y.prototype.setContent = function () { const r = this.tip(); let n = this.getTitle(); let c = this.getContent(); if (this.options.html) { const f = typeof c; this.options.sanitize && (n = this.sanitizeHtml(n), f === 'string' && (c = this.sanitizeHtml(c))), r.find('.popover-title').html(n), r.find('.popover-content').children().detach().end()[f === 'string' ? 'html' : 'append'](c) } else r.find('.popover-title').text(n), r.find('.popover-content').children().detach().end().text(c); r.removeClass('fade top bottom left right in'), r.find('.popover-title').html() || r.find('.popover-title').hide() }, y.prototype.hasContent = function () { return this.getTitle() || this.getContent() }, y.prototype.getContent = function () { const r = this.$element; const n = this.options; return r.attr('data-content') || (typeof n.content === 'function' ? n.content.call(r[0]) : n.content) }, y.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find('.arrow') }; function a (r) { return this.each(function () { const n = w(this); let c = n.data('bs.popover'); const f = typeof r === 'object' && r; !c && /destroy|hide/.test(r) || (c || n.data('bs.popover', c = new y(this, f)), typeof r === 'string' && c[r]()) }) } const h = w.fn.popover; w.fn.popover = a, w.fn.popover.Constructor = y, w.fn.popover.noConflict = function () { return w.fn.popover = h, this } }(jQuery)) },
    3497: () => { +(function (w) { 'use strict'; function y (r, n) { this.$body = w(document.body), this.$scrollElement = w(r).is(document.body) ? w(window) : w(r), this.options = w.extend({}, y.DEFAULTS, n), this.selector = (this.options.target || '') + ' .nav li > a', this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on('scroll.bs.scrollspy', w.proxy(this.process, this)), this.refresh(), this.process() }y.VERSION = '3.4.1', y.DEFAULTS = { offset: 10 }, y.prototype.getScrollHeight = function () { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, y.prototype.refresh = function () { const r = this; let n = 'offset'; let c = 0; this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), w.isWindow(this.$scrollElement[0]) || (n = 'position', c = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () { const f = w(this); const l = f.data('target') || f.attr('href'); const s = /^#./.test(l) && w(l); return s && s.length && s.is(':visible') && [[s[n]().top + c, l]] || null }).sort(function (f, l) { return f[0] - l[0] }).each(function () { r.offsets.push(this[0]), r.targets.push(this[1]) }) }, y.prototype.process = function () { const r = this.$scrollElement.scrollTop() + this.options.offset; const n = this.getScrollHeight(); const c = this.options.offset + n - this.$scrollElement.height(); const f = this.offsets; const l = this.targets; const s = this.activeTarget; let u; if (this.scrollHeight != n && this.refresh(), r >= c) return s != (u = l[l.length - 1]) && this.activate(u); if (s && r < f[0]) return this.activeTarget = null, this.clear(); for (u = f.length; u--;)s != l[u] && r >= f[u] && (f[u + 1] === void 0 || r < f[u + 1]) && this.activate(l[u]) }, y.prototype.activate = function (r) { this.activeTarget = r, this.clear(); const n = this.selector + '[data-target="' + r + '"],' + this.selector + '[href="' + r + '"]'; let c = w(n).parents('li').addClass('active'); c.parent('.dropdown-menu').length && (c = c.closest('li.dropdown').addClass('active')), c.trigger('activate.bs.scrollspy') }, y.prototype.clear = function () { w(this.selector).parentsUntil(this.options.target, '.active').removeClass('active') }; function a (r) { return this.each(function () { const n = w(this); let c = n.data('bs.scrollspy'); const f = typeof r === 'object' && r; c || n.data('bs.scrollspy', c = new y(this, f)), typeof r === 'string' && c[r]() }) } const h = w.fn.scrollspy; w.fn.scrollspy = a, w.fn.scrollspy.Constructor = y, w.fn.scrollspy.noConflict = function () { return w.fn.scrollspy = h, this }, w(window).on('load.bs.scrollspy.data-api', function () { w('[data-spy="scroll"]').each(function () { const r = w(this); a.call(r, r.data()) }) }) }(jQuery)) },
    7814: () => { +(function (w) { 'use strict'; const y = function (n) { this.element = w(n) }; y.VERSION = '3.4.1', y.TRANSITION_DURATION = 150, y.prototype.show = function () { const n = this.element; const c = n.closest('ul:not(.dropdown-menu)'); let f = n.data('target'); if (f || (f = n.attr('href'), f = f && f.replace(/.*(?=#[^\s]*$)/, '')), !n.parent('li').hasClass('active')) { const l = c.find('.active:last a'); const s = w.Event('hide.bs.tab', { relatedTarget: n[0] }); const u = w.Event('show.bs.tab', { relatedTarget: l[0] }); if (l.trigger(s), n.trigger(u), !(u.isDefaultPrevented() || s.isDefaultPrevented())) { const g = w(document).find(f); this.activate(n.closest('li'), c), this.activate(g, g.parent(), function () { l.trigger({ type: 'hidden.bs.tab', relatedTarget: n[0] }), n.trigger({ type: 'shown.bs.tab', relatedTarget: l[0] }) }) } } }, y.prototype.activate = function (n, c, f) { const l = c.find('> .active'); const s = f && w.support.transition && (l.length && l.hasClass('fade') || !!c.find('> .fade').length); function u () { l.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !1), n.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', !0), s ? (n[0].offsetWidth, n.addClass('in')) : n.removeClass('fade'), n.parent('.dropdown-menu').length && n.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !0), f && f() }l.length && s ? l.one('bsTransitionEnd', u).emulateTransitionEnd(y.TRANSITION_DURATION) : u(), l.removeClass('in') }; function a (n) { return this.each(function () { const c = w(this); let f = c.data('bs.tab'); f || c.data('bs.tab', f = new y(this)), typeof n === 'string' && f[n]() }) } const h = w.fn.tab; w.fn.tab = a, w.fn.tab.Constructor = y, w.fn.tab.noConflict = function () { return w.fn.tab = h, this }; const r = function (n) { n.preventDefault(), a.call(w(this), 'show') }; w(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', r).on('click.bs.tab.data-api', '[data-toggle="pill"]', r) }(jQuery)) },
    6278: () => { +(function (w) { 'use strict'; const y = ['sanitize', 'whiteList', 'sanitizeFn']; const a = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']; const h = /^aria-[\w-]*$/i; const r = { '*': ['class', 'dir', 'id', 'lang', 'role', h], a: ['target', 'href', 'title', 'rel'], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ['src', 'alt', 'title', 'width', 'height'], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }; const n = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi; const c = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i; function f (i, m) { const d = i.nodeName.toLowerCase(); if (w.inArray(d, m) !== -1) return w.inArray(d, a) !== -1 ? Boolean(i.nodeValue.match(n) || i.nodeValue.match(c)) : !0; for (let p = w(m).filter(function (x, P) { return P instanceof RegExp }), b = 0, v = p.length; b < v; b++) if (d.match(p[b])) return !0; return !1 } function l (i, m, d) { if (i.length === 0) return i; if (d && typeof d === 'function') return d(i); if (!document.implementation || !document.implementation.createHTMLDocument) return i; const p = document.implementation.createHTMLDocument('sanitization'); p.body.innerHTML = i; for (let b = w.map(m, function (L, R) { return R }), v = w(p.body).find('*'), x = 0, P = v.length; x < P; x++) { const S = v[x]; const D = S.nodeName.toLowerCase(); if (w.inArray(D, b) === -1) { S.parentNode.removeChild(S); continue } for (let A = w.map(S.attributes, function (L) { return L }), T = [].concat(m['*'] || [], m[D] || []), C = 0, N = A.length; C < N; C++)f(A[C], T) || S.removeAttribute(A[C].nodeName) } return p.body.innerHTML } const s = function (i, m) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init('tooltip', i, m) }; s.VERSION = '3.4.1', s.TRANSITION_DURATION = 150, s.DEFAULTS = { animation: !0, placement: 'top', selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: 'hover focus', title: '', delay: 0, html: !1, container: !1, viewport: { selector: 'body', padding: 0 }, sanitize: !0, sanitizeFn: null, whiteList: r }, s.prototype.init = function (i, m, d) { if (this.enabled = !0, this.type = i, this.$element = w(m), this.options = this.getOptions(d), this.$viewport = this.options.viewport && w(document).find(w.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!'); for (let p = this.options.trigger.split(' '), b = p.length; b--;) { const v = p[b]; if (v == 'click') this.$element.on('click.' + this.type, this.options.selector, w.proxy(this.toggle, this)); else if (v != 'manual') { const x = v == 'hover' ? 'mouseenter' : 'focusin'; const P = v == 'hover' ? 'mouseleave' : 'focusout'; this.$element.on(x + '.' + this.type, this.options.selector, w.proxy(this.enter, this)), this.$element.on(P + '.' + this.type, this.options.selector, w.proxy(this.leave, this)) } } this.options.selector ? this._options = w.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle() }, s.prototype.getDefaults = function () { return s.DEFAULTS }, s.prototype.getOptions = function (i) { const m = this.$element.data(); for (const d in m)m.hasOwnProperty(d) && w.inArray(d, y) !== -1 && delete m[d]; return i = w.extend({}, this.getDefaults(), m, i), i.delay && typeof i.delay === 'number' && (i.delay = { show: i.delay, hide: i.delay }), i.sanitize && (i.template = l(i.template, i.whiteList, i.sanitizeFn)), i }, s.prototype.getDelegateOptions = function () { const i = {}; const m = this.getDefaults(); return this._options && w.each(this._options, function (d, p) { m[d] != p && (i[d] = p) }), i }, s.prototype.enter = function (i) { let m = i instanceof this.constructor ? i : w(i.currentTarget).data('bs.' + this.type); if (m || (m = new this.constructor(i.currentTarget, this.getDelegateOptions()), w(i.currentTarget).data('bs.' + this.type, m)), i instanceof w.Event && (m.inState[i.type == 'focusin' ? 'focus' : 'hover'] = !0), m.tip().hasClass('in') || m.hoverState == 'in') { m.hoverState = 'in'; return } if (clearTimeout(m.timeout), m.hoverState = 'in', !m.options.delay || !m.options.delay.show) return m.show(); m.timeout = setTimeout(function () { m.hoverState == 'in' && m.show() }, m.options.delay.show) }, s.prototype.isInStateTrue = function () { for (const i in this.inState) if (this.inState[i]) return !0; return !1 }, s.prototype.leave = function (i) { let m = i instanceof this.constructor ? i : w(i.currentTarget).data('bs.' + this.type); if (m || (m = new this.constructor(i.currentTarget, this.getDelegateOptions()), w(i.currentTarget).data('bs.' + this.type, m)), i instanceof w.Event && (m.inState[i.type == 'focusout' ? 'focus' : 'hover'] = !1), !m.isInStateTrue()) { if (clearTimeout(m.timeout), m.hoverState = 'out', !m.options.delay || !m.options.delay.hide) return m.hide(); m.timeout = setTimeout(function () { m.hoverState == 'out' && m.hide() }, m.options.delay.hide) } }, s.prototype.show = function () { const i = w.Event('show.bs.' + this.type); if (this.hasContent() && this.enabled) { this.$element.trigger(i); const m = w.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]); if (i.isDefaultPrevented() || !m) return; const d = this; const p = this.tip(); const b = this.getUID(this.type); this.setContent(), p.attr('id', b), this.$element.attr('aria-describedby', b), this.options.animation && p.addClass('fade'); let v = typeof this.options.placement === 'function' ? this.options.placement.call(this, p[0], this.$element[0]) : this.options.placement; const x = /\s?auto?\s?/i; const P = x.test(v); P && (v = v.replace(x, '') || 'top'), p.detach().css({ top: 0, left: 0, display: 'block' }).addClass(v).data('bs.' + this.type, this), this.options.container ? p.appendTo(w(document).find(this.options.container)) : p.insertAfter(this.$element), this.$element.trigger('inserted.bs.' + this.type); const S = this.getPosition(); const D = p[0].offsetWidth; const A = p[0].offsetHeight; if (P) { const T = v; const C = this.getPosition(this.$viewport); v = v == 'bottom' && S.bottom + A > C.bottom ? 'top' : v == 'top' && S.top - A < C.top ? 'bottom' : v == 'right' && S.right + D > C.width ? 'left' : v == 'left' && S.left - D < C.left ? 'right' : v, p.removeClass(T).addClass(v) } const N = this.getCalculatedOffset(v, S, D, A); this.applyPlacement(N, v); const L = function () { const R = d.hoverState; d.$element.trigger('shown.bs.' + d.type), d.hoverState = null, R == 'out' && d.leave(d) }; w.support.transition && this.$tip.hasClass('fade') ? p.one('bsTransitionEnd', L).emulateTransitionEnd(s.TRANSITION_DURATION) : L() } }, s.prototype.applyPlacement = function (i, m) { const d = this.tip(); const p = d[0].offsetWidth; const b = d[0].offsetHeight; let v = parseInt(d.css('margin-top'), 10); let x = parseInt(d.css('margin-left'), 10); isNaN(v) && (v = 0), isNaN(x) && (x = 0), i.top += v, i.left += x, w.offset.setOffset(d[0], w.extend({ using: function (N) { d.css({ top: Math.round(N.top), left: Math.round(N.left) }) } }, i), 0), d.addClass('in'); const P = d[0].offsetWidth; const S = d[0].offsetHeight; m == 'top' && S != b && (i.top = i.top + b - S); const D = this.getViewportAdjustedDelta(m, i, P, S); D.left ? i.left += D.left : i.top += D.top; const A = /top|bottom/.test(m); const T = A ? D.left * 2 - p + P : D.top * 2 - b + S; const C = A ? 'offsetWidth' : 'offsetHeight'; d.offset(i), this.replaceArrow(T, d[0][C], A) }, s.prototype.replaceArrow = function (i, m, d) { this.arrow().css(d ? 'left' : 'top', 50 * (1 - i / m) + '%').css(d ? 'top' : 'left', '') }, s.prototype.setContent = function () { const i = this.tip(); let m = this.getTitle(); this.options.html ? (this.options.sanitize && (m = l(m, this.options.whiteList, this.options.sanitizeFn)), i.find('.tooltip-inner').html(m)) : i.find('.tooltip-inner').text(m), i.removeClass('fade in top bottom left right') }, s.prototype.hide = function (i) { const m = this; const d = w(this.$tip); const p = w.Event('hide.bs.' + this.type); function b () { m.hoverState != 'in' && d.detach(), m.$element && m.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + m.type), i && i() } if (this.$element.trigger(p), !p.isDefaultPrevented()) return d.removeClass('in'), w.support.transition && d.hasClass('fade') ? d.one('bsTransitionEnd', b).emulateTransitionEnd(s.TRANSITION_DURATION) : b(), this.hoverState = null, this }, s.prototype.fixTitle = function () { const i = this.$element; (i.attr('title') || typeof i.attr('data-original-title') !== 'string') && i.attr('data-original-title', i.attr('title') || '').attr('title', '') }, s.prototype.hasContent = function () { return this.getTitle() }, s.prototype.getPosition = function (i) { i = i || this.$element; const m = i[0]; const d = m.tagName == 'BODY'; let p = m.getBoundingClientRect(); p.width == null && (p = w.extend({}, p, { width: p.right - p.left, height: p.bottom - p.top })); const b = window.SVGElement && m instanceof window.SVGElement; const v = d ? { top: 0, left: 0 } : b ? null : i.offset(); const x = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop() }; const P = d ? { width: w(window).width(), height: w(window).height() } : null; return w.extend({}, p, x, P, v) }, s.prototype.getCalculatedOffset = function (i, m, d, p) { return i == 'bottom' ? { top: m.top + m.height, left: m.left + m.width / 2 - d / 2 } : i == 'top' ? { top: m.top - p, left: m.left + m.width / 2 - d / 2 } : i == 'left' ? { top: m.top + m.height / 2 - p / 2, left: m.left - d } : { top: m.top + m.height / 2 - p / 2, left: m.left + m.width } }, s.prototype.getViewportAdjustedDelta = function (i, m, d, p) { const b = { top: 0, left: 0 }; if (!this.$viewport) return b; const v = this.options.viewport && this.options.viewport.padding || 0; const x = this.getPosition(this.$viewport); if (/right|left/.test(i)) { const P = m.top - v - x.scroll; const S = m.top + v - x.scroll + p; P < x.top ? b.top = x.top - P : S > x.top + x.height && (b.top = x.top + x.height - S) } else { const D = m.left - v; const A = m.left + v + d; D < x.left ? b.left = x.left - D : A > x.right && (b.left = x.left + x.width - A) } return b }, s.prototype.getTitle = function () { let i; const m = this.$element; const d = this.options; return i = m.attr('data-original-title') || (typeof d.title === 'function' ? d.title.call(m[0]) : d.title), i }, s.prototype.getUID = function (i) { do i += ~~(Math.random() * 1e6); while (document.getElementById(i)); return i }, s.prototype.tip = function () { if (!this.$tip && (this.$tip = w(this.options.template), this.$tip.length != 1)) throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!'); return this.$tip }, s.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow') }, s.prototype.enable = function () { this.enabled = !0 }, s.prototype.disable = function () { this.enabled = !1 }, s.prototype.toggleEnabled = function () { this.enabled = !this.enabled }, s.prototype.toggle = function (i) { let m = this; i && (m = w(i.currentTarget).data('bs.' + this.type), m || (m = new this.constructor(i.currentTarget, this.getDelegateOptions()), w(i.currentTarget).data('bs.' + this.type, m))), i ? (m.inState.click = !m.inState.click, m.isInStateTrue() ? m.enter(m) : m.leave(m)) : m.tip().hasClass('in') ? m.leave(m) : m.enter(m) }, s.prototype.destroy = function () { const i = this; clearTimeout(this.timeout), this.hide(function () { i.$element.off('.' + i.type).removeData('bs.' + i.type), i.$tip && i.$tip.detach(), i.$tip = null, i.$arrow = null, i.$viewport = null, i.$element = null }) }, s.prototype.sanitizeHtml = function (i) { return l(i, this.options.whiteList, this.options.sanitizeFn) }; function u (i) { return this.each(function () { const m = w(this); let d = m.data('bs.tooltip'); const p = typeof i === 'object' && i; !d && /destroy|hide/.test(i) || (d || m.data('bs.tooltip', d = new s(this, p)), typeof i === 'string' && d[i]()) }) } const g = w.fn.tooltip; w.fn.tooltip = u, w.fn.tooltip.Constructor = s, w.fn.tooltip.noConflict = function () { return w.fn.tooltip = g, this } }(jQuery)) },
    2027: w => {
      const y = function () { this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32 }; const a = -1; const h = 1; const r = 0; y.Diff = function (n, c) { return [n, c] }, y.prototype.diff_main = function (n, c, f, l) { typeof l === 'undefined' && (this.Diff_Timeout <= 0 ? l = Number.MAX_VALUE : l = new Date().getTime() + this.Diff_Timeout * 1e3); const s = l; if (n == null || c == null) throw new Error('Null input. (diff_main)'); if (n == c) return n ? [new y.Diff(r, n)] : []; typeof f === 'undefined' && (f = !0); const u = f; let g = this.diff_commonPrefix(n, c); const i = n.substring(0, g); n = n.substring(g), c = c.substring(g), g = this.diff_commonSuffix(n, c); const m = n.substring(n.length - g); n = n.substring(0, n.length - g), c = c.substring(0, c.length - g); const d = this.diff_compute_(n, c, u, s); return i && d.unshift(new y.Diff(r, i)), m && d.push(new y.Diff(r, m)), this.diff_cleanupMerge(d), d }, y.prototype.diff_compute_ = function (n, c, f, l) { let s; if (!n) return [new y.Diff(h, c)]; if (!c) return [new y.Diff(a, n)]; const u = n.length > c.length ? n : c; const g = n.length > c.length ? c : n; const i = u.indexOf(g); if (i != -1) return s = [new y.Diff(h, u.substring(0, i)), new y.Diff(r, g), new y.Diff(h, u.substring(i + g.length))], n.length > c.length && (s[0][0] = s[2][0] = a), s; if (g.length == 1) return [new y.Diff(a, n), new y.Diff(h, c)]; const m = this.diff_halfMatch_(n, c); if (m) { const d = m[0]; const p = m[1]; const b = m[2]; const v = m[3]; const x = m[4]; const P = this.diff_main(d, b, f, l); const S = this.diff_main(p, v, f, l); return P.concat([new y.Diff(r, x)], S) } return f && n.length > 100 && c.length > 100 ? this.diff_lineMode_(n, c, l) : this.diff_bisect_(n, c, l) }, y.prototype.diff_lineMode_ = function (n, c, f) { const l = this.diff_linesToChars_(n, c); n = l.chars1, c = l.chars2; const s = l.lineArray; const u = this.diff_main(n, c, !1, f); this.diff_charsToLines_(u, s), this.diff_cleanupSemantic(u), u.push(new y.Diff(r, '')); for (let g = 0, i = 0, m = 0, d = '', p = ''; g < u.length;) { switch (u[g][0]) { case h:m++, p += u[g][1]; break; case a:i++, d += u[g][1]; break; case r:if (i >= 1 && m >= 1) { u.splice(g - i - m, i + m), g = g - i - m; for (var b = this.diff_main(d, p, !1, f), v = b.length - 1; v >= 0; v--)u.splice(g, 0, b[v]); g = g + b.length }m = 0, i = 0, d = '', p = ''; break }g++ } return u.pop(), u }, y.prototype.diff_bisect_ = function (n, c, f) { for (var l = n.length, s = c.length, u = Math.ceil((l + s) / 2), g = u, i = 2 * u, m = new Array(i), d = new Array(i), p = 0; p < i; p++)m[p] = -1, d[p] = -1; m[g + 1] = 0, d[g + 1] = 0; for (let b = l - s, v = b % 2 != 0, x = 0, P = 0, S = 0, D = 0, A = 0; A < u && !(new Date().getTime() > f); A++) { for (let T = -A + x; T <= A - P; T += 2) { var C = g + T; var N; T == -A || T != A && m[C - 1] < m[C + 1] ? N = m[C + 1] : N = m[C - 1] + 1; for (var L = N - T; N < l && L < s && n.charAt(N) == c.charAt(L);)N++, L++; if (m[C] = N, N > l)P += 2; else if (L > s)x += 2; else if (v) { var R = g + b - T; if (R >= 0 && R < i && d[R] != -1) { var B = l - d[R]; if (N >= B) return this.diff_bisectSplit_(n, c, N, L, f) } } } for (let O = -A + S; O <= A - D; O += 2) { var R = g + O; var B; O == -A || O != A && d[R - 1] < d[R + 1] ? B = d[R + 1] : B = d[R - 1] + 1; for (var F = B - O; B < l && F < s && n.charAt(l - B - 1) == c.charAt(s - F - 1);)B++, F++; if (d[R] = B, B > l)D += 2; else if (F > s)S += 2; else if (!v) { var C = g + b - O; if (C >= 0 && C < i && m[C] != -1) { var N = m[C]; var L = g + N - C; if (B = l - B, N >= B) return this.diff_bisectSplit_(n, c, N, L, f) } } } } return [new y.Diff(a, n), new y.Diff(h, c)] }, y.prototype.diff_bisectSplit_ = function (n, c, f, l, s) { const u = n.substring(0, f); const g = c.substring(0, l); const i = n.substring(f); const m = c.substring(l); const d = this.diff_main(u, g, !1, s); const p = this.diff_main(i, m, !1, s); return d.concat(p) }, y.prototype.diff_linesToChars_ = function (n, c) {
        const f = []; const l = {}; f[0] = ''; function s (m) {
          for (var d = '', p = 0, b = -1, v = f.length; b < m.length - 1;) {
            b = m.indexOf(`
`, p), b == -1 && (b = m.length - 1); let x = m.substring(p, b + 1); (l.hasOwnProperty ? l.hasOwnProperty(x) : l[x] !== void 0) ? d += String.fromCharCode(l[x]) : (v == u && (x = m.substring(p), b = m.length), d += String.fromCharCode(v), l[x] = v, f[v++] = x), p = b + 1
          } return d
        } var u = 4e4; const g = s(n); u = 65535; const i = s(c); return { chars1: g, chars2: i, lineArray: f }
      }, y.prototype.diff_charsToLines_ = function (n, c) { for (let f = 0; f < n.length; f++) { for (var l = n[f][1], s = [], u = 0; u < l.length; u++)s[u] = c[l.charCodeAt(u)]; n[f][1] = s.join('') } }, y.prototype.diff_commonPrefix = function (n, c) { if (!n || !c || n.charAt(0) != c.charAt(0)) return 0; for (var f = 0, l = Math.min(n.length, c.length), s = l, u = 0; f < s;)n.substring(u, s) == c.substring(u, s) ? (f = s, u = f) : l = s, s = Math.floor((l - f) / 2 + f); return s }, y.prototype.diff_commonSuffix = function (n, c) { if (!n || !c || n.charAt(n.length - 1) != c.charAt(c.length - 1)) return 0; for (var f = 0, l = Math.min(n.length, c.length), s = l, u = 0; f < s;)n.substring(n.length - s, n.length - u) == c.substring(c.length - s, c.length - u) ? (f = s, u = f) : l = s, s = Math.floor((l - f) / 2 + f); return s }, y.prototype.diff_commonOverlap_ = function (n, c) { const f = n.length; const l = c.length; if (f == 0 || l == 0) return 0; f > l ? n = n.substring(f - l) : f < l && (c = c.substring(0, f)); const s = Math.min(f, l); if (n == c) return s; for (let u = 0, g = 1; ;) { const i = n.substring(s - g); const m = c.indexOf(i); if (m == -1) return u; g += m, (m == 0 || n.substring(s - g) == c.substring(0, g)) && (u = g, g++) } }, y.prototype.diff_halfMatch_ = function (n, c) { if (this.Diff_Timeout <= 0) return null; const f = n.length > c.length ? n : c; const l = n.length > c.length ? c : n; if (f.length < 4 || l.length * 2 < f.length) return null; const s = this; function u (P, S, D) { for (var A = P.substring(D, D + Math.floor(P.length / 4)), T = -1, C = '', N, L, R, B; (T = S.indexOf(A, T + 1)) != -1;) { const O = s.diff_commonPrefix(P.substring(D), S.substring(T)); const F = s.diff_commonSuffix(P.substring(0, D), S.substring(0, T)); C.length < F + O && (C = S.substring(T - F, T) + S.substring(T, T + O), N = P.substring(0, D - F), L = P.substring(D + O), R = S.substring(0, T - F), B = S.substring(T + O)) } return C.length * 2 >= P.length ? [N, L, R, B, C] : null } const g = u(f, l, Math.ceil(f.length / 4)); const i = u(f, l, Math.ceil(f.length / 2)); let m; if (!g && !i) return null; i ? g ? m = g[4].length > i[4].length ? g : i : m = i : m = g; let d, p, b, v; n.length > c.length ? (d = m[0], p = m[1], b = m[2], v = m[3]) : (b = m[0], v = m[1], d = m[2], p = m[3]); const x = m[4]; return [d, p, b, v, x] }, y.prototype.diff_cleanupSemantic = function (n) { for (var c = !1, f = [], l = 0, s = null, u = 0, g = 0, i = 0, m = 0, d = 0; u < n.length;)n[u][0] == r ? (f[l++] = u, g = m, i = d, m = 0, d = 0, s = n[u][1]) : (n[u][0] == h ? m += n[u][1].length : d += n[u][1].length, s && s.length <= Math.max(g, i) && s.length <= Math.max(m, d) && (n.splice(f[l - 1], 0, new y.Diff(a, s)), n[f[l - 1] + 1][0] = h, l--, l--, u = l > 0 ? f[l - 1] : -1, g = 0, i = 0, m = 0, d = 0, s = null, c = !0)), u++; for (c && this.diff_cleanupMerge(n), this.diff_cleanupSemanticLossless(n), u = 1; u < n.length;) { if (n[u - 1][0] == a && n[u][0] == h) { const p = n[u - 1][1]; const b = n[u][1]; const v = this.diff_commonOverlap_(p, b); const x = this.diff_commonOverlap_(b, p); v >= x ? (v >= p.length / 2 || v >= b.length / 2) && (n.splice(u, 0, new y.Diff(r, b.substring(0, v))), n[u - 1][1] = p.substring(0, p.length - v), n[u + 1][1] = b.substring(v), u++) : (x >= p.length / 2 || x >= b.length / 2) && (n.splice(u, 0, new y.Diff(r, p.substring(0, x))), n[u - 1][0] = h, n[u - 1][1] = b.substring(0, b.length - x), n[u + 1][0] = a, n[u + 1][1] = p.substring(x), u++), u++ }u++ } }, y.prototype.diff_cleanupSemanticLossless = function (n) { function c (x, P) { if (!x || !P) return 6; const S = x.charAt(x.length - 1); const D = P.charAt(0); const A = S.match(y.nonAlphaNumericRegex_); const T = D.match(y.nonAlphaNumericRegex_); const C = A && S.match(y.whitespaceRegex_); const N = T && D.match(y.whitespaceRegex_); const L = C && S.match(y.linebreakRegex_); const R = N && D.match(y.linebreakRegex_); const B = L && x.match(y.blanklineEndRegex_); const O = R && P.match(y.blanklineStartRegex_); return B || O ? 5 : L || R ? 4 : A && !C && N ? 3 : C || N ? 2 : A || T ? 1 : 0 } for (let f = 1; f < n.length - 1;) { if (n[f - 1][0] == r && n[f + 1][0] == r) { let l = n[f - 1][1]; let s = n[f][1]; let u = n[f + 1][1]; const g = this.diff_commonSuffix(l, s); if (g) { const i = s.substring(s.length - g); l = l.substring(0, l.length - g), s = i + s.substring(0, s.length - g), u = i + u } for (var m = l, d = s, p = u, b = c(l, s) + c(s, u); s.charAt(0) === u.charAt(0);) { l += s.charAt(0), s = s.substring(1) + u.charAt(0), u = u.substring(1); const v = c(l, s) + c(s, u); v >= b && (b = v, m = l, d = s, p = u) }n[f - 1][1] != m && (m ? n[f - 1][1] = m : (n.splice(f - 1, 1), f--), n[f][1] = d, p ? n[f + 1][1] = p : (n.splice(f + 1, 1), f--)) }f++ } }, y.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, y.whitespaceRegex_ = /\s/, y.linebreakRegex_ = /[\r\n]/, y.blanklineEndRegex_ = /\n\r?\n$/, y.blanklineStartRegex_ = /^\r?\n\r?\n/, y.prototype.diff_cleanupEfficiency = function (n) { for (var c = !1, f = [], l = 0, s = null, u = 0, g = !1, i = !1, m = !1, d = !1; u < n.length;)n[u][0] == r ? (n[u][1].length < this.Diff_EditCost && (m || d) ? (f[l++] = u, g = m, i = d, s = n[u][1]) : (l = 0, s = null), m = d = !1) : (n[u][0] == a ? d = !0 : m = !0, s && (g && i && m && d || s.length < this.Diff_EditCost / 2 && g + i + m + d == 3) && (n.splice(f[l - 1], 0, new y.Diff(a, s)), n[f[l - 1] + 1][0] = h, l--, s = null, g && i ? (m = d = !0, l = 0) : (l--, u = l > 0 ? f[l - 1] : -1, m = d = !1), c = !0)), u++; c && this.diff_cleanupMerge(n) }, y.prototype.diff_cleanupMerge = function (n) { n.push(new y.Diff(r, '')); for (var c = 0, f = 0, l = 0, s = '', u = '', g; c < n.length;) switch (n[c][0]) { case h:l++, u += n[c][1], c++; break; case a:f++, s += n[c][1], c++; break; case r:f + l > 1 ? (f !== 0 && l !== 0 && (g = this.diff_commonPrefix(u, s), g !== 0 && (c - f - l > 0 && n[c - f - l - 1][0] == r ? n[c - f - l - 1][1] += u.substring(0, g) : (n.splice(0, 0, new y.Diff(r, u.substring(0, g))), c++), u = u.substring(g), s = s.substring(g)), g = this.diff_commonSuffix(u, s), g !== 0 && (n[c][1] = u.substring(u.length - g) + n[c][1], u = u.substring(0, u.length - g), s = s.substring(0, s.length - g))), c -= f + l, n.splice(c, f + l), s.length && (n.splice(c, 0, new y.Diff(a, s)), c++), u.length && (n.splice(c, 0, new y.Diff(h, u)), c++), c++) : c !== 0 && n[c - 1][0] == r ? (n[c - 1][1] += n[c][1], n.splice(c, 1)) : c++, l = 0, f = 0, s = '', u = ''; break }n[n.length - 1][1] === '' && n.pop(); let i = !1; for (c = 1; c < n.length - 1;)n[c - 1][0] == r && n[c + 1][0] == r && (n[c][1].substring(n[c][1].length - n[c - 1][1].length) == n[c - 1][1] ? (n[c][1] = n[c - 1][1] + n[c][1].substring(0, n[c][1].length - n[c - 1][1].length), n[c + 1][1] = n[c - 1][1] + n[c + 1][1], n.splice(c - 1, 1), i = !0) : n[c][1].substring(0, n[c + 1][1].length) == n[c + 1][1] && (n[c - 1][1] += n[c + 1][1], n[c][1] = n[c][1].substring(n[c + 1][1].length) + n[c + 1][1], n.splice(c + 1, 1), i = !0)), c++; i && this.diff_cleanupMerge(n) }, y.prototype.diff_xIndex = function (n, c) { let f = 0; let l = 0; let s = 0; let u = 0; let g; for (g = 0; g < n.length && (n[g][0] !== h && (f += n[g][1].length), n[g][0] !== a && (l += n[g][1].length), !(f > c)); g++)s = f, u = l; return n.length != g && n[g][0] === a ? u : u + (c - s) }, y.prototype.diff_prettyHtml = function (n) { for (var c = [], f = /&/g, l = /</g, s = />/g, u = /\n/g, g = 0; g < n.length; g++) { const i = n[g][0]; const m = n[g][1]; const d = m.replace(f, '&amp;').replace(l, '&lt;').replace(s, '&gt;').replace(u, '&para;<br>'); switch (i) { case h:c[g] = '<ins style="background:#e6ffe6;">' + d + '</ins>'; break; case a:c[g] = '<del style="background:#ffe6e6;">' + d + '</del>'; break; case r:c[g] = '<span>' + d + '</span>'; break } } return c.join('') }, y.prototype.diff_text1 = function (n) { for (var c = [], f = 0; f < n.length; f++)n[f][0] !== h && (c[f] = n[f][1]); return c.join('') }, y.prototype.diff_text2 = function (n) { for (var c = [], f = 0; f < n.length; f++)n[f][0] !== a && (c[f] = n[f][1]); return c.join('') }, y.prototype.diff_levenshtein = function (n) { for (var c = 0, f = 0, l = 0, s = 0; s < n.length; s++) { const u = n[s][0]; const g = n[s][1]; switch (u) { case h:f += g.length; break; case a:l += g.length; break; case r:c += Math.max(f, l), f = 0, l = 0; break } } return c += Math.max(f, l), c }, y.prototype.diff_toDelta = function (n) { for (var c = [], f = 0; f < n.length; f++) switch (n[f][0]) { case h:c[f] = '+' + encodeURI(n[f][1]); break; case a:c[f] = '-' + n[f][1].length; break; case r:c[f] = '=' + n[f][1].length; break } return c.join('	').replace(/%20/g, ' ') }, y.prototype.diff_fromDelta = function (n, c) { for (var f = [], l = 0, s = 0, u = c.split(/\t/g), g = 0; g < u.length; g++) { const i = u[g].substring(1); switch (u[g].charAt(0)) { case '+':try { f[l++] = new y.Diff(h, decodeURI(i)) } catch (p) { throw new Error('Illegal escape in diff_fromDelta: ' + i) } break; case '-':case '=':var m = parseInt(i, 10); if (isNaN(m) || m < 0) throw new Error('Invalid number in diff_fromDelta: ' + i); var d = n.substring(s, s += m); u[g].charAt(0) == '=' ? f[l++] = new y.Diff(r, d) : f[l++] = new y.Diff(a, d); break; default:if (u[g]) throw new Error('Invalid diff operation in diff_fromDelta: ' + u[g]) } } if (s != n.length) throw new Error('Delta length (' + s + ') does not equal source text length (' + n.length + ').'); return f }, y.prototype.match_main = function (n, c, f) { if (n == null || c == null || f == null) throw new Error('Null input. (match_main)'); return f = Math.max(0, Math.min(f, n.length)), n == c ? 0 : n.length ? n.substring(f, f + c.length) == c ? f : this.match_bitap_(n, c, f) : -1 }, y.prototype.match_bitap_ = function (n, c, f) { if (c.length > this.Match_MaxBits) throw new Error('Pattern too long for this browser.'); const l = this.match_alphabet_(c); const s = this; function u (N, L) { const R = N / c.length; const B = Math.abs(f - L); return s.Match_Distance ? R + B / s.Match_Distance : B ? 1 : R } let g = this.Match_Threshold; let i = n.indexOf(c, f); i != -1 && (g = Math.min(u(0, i), g), i = n.lastIndexOf(c, f + c.length), i != -1 && (g = Math.min(u(0, i), g))); const m = 1 << c.length - 1; i = -1; for (var d, p, b = c.length + n.length, v, x = 0; x < c.length; x++) { for (d = 0, p = b; d < p;)u(x, f + p) <= g ? d = p : b = p, p = Math.floor((b - d) / 2 + d); b = p; let P = Math.max(1, f - p + 1); const S = Math.min(f + p, n.length) + c.length; const D = Array(S + 2); D[S + 1] = (1 << x) - 1; for (let A = S; A >= P; A--) { const T = l[n.charAt(A - 1)]; if (x === 0 ? D[A] = (D[A + 1] << 1 | 1) & T : D[A] = (D[A + 1] << 1 | 1) & T | ((v[A + 1] | v[A]) << 1 | 1) | v[A + 1], D[A] & m) { const C = u(x, A - 1); if (C <= g) if (g = C, i = A - 1, i > f)P = Math.max(1, 2 * f - i); else break } } if (u(x + 1, f) > g) break; v = D } return i }, y.prototype.match_alphabet_ = function (n) { for (var c = {}, f = 0; f < n.length; f++)c[n.charAt(f)] = 0; for (var f = 0; f < n.length; f++)c[n.charAt(f)] |= 1 << n.length - f - 1; return c }, y.prototype.patch_addContext_ = function (n, c) { if (c.length != 0) { if (n.start2 === null) throw Error('patch not initialized'); for (var f = c.substring(n.start2, n.start2 + n.length1), l = 0; c.indexOf(f) != c.lastIndexOf(f) && f.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;)l += this.Patch_Margin, f = c.substring(n.start2 - l, n.start2 + n.length1 + l); l += this.Patch_Margin; const s = c.substring(n.start2 - l, n.start2); s && n.diffs.unshift(new y.Diff(r, s)); const u = c.substring(n.start2 + n.length1, n.start2 + n.length1 + l); u && n.diffs.push(new y.Diff(r, u)), n.start1 -= s.length, n.start2 -= s.length, n.length1 += s.length + u.length, n.length2 += s.length + u.length } }, y.prototype.patch_make = function (n, c, f) { let l, s; if (typeof n === 'string' && typeof c === 'string' && typeof f === 'undefined')l = n, s = this.diff_main(l, c, !0), s.length > 2 && (this.diff_cleanupSemantic(s), this.diff_cleanupEfficiency(s)); else if (n && typeof n === 'object' && typeof c === 'undefined' && typeof f === 'undefined')s = n, l = this.diff_text1(s); else if (typeof n === 'string' && c && typeof c === 'object' && typeof f === 'undefined')l = n, s = c; else if (typeof n === 'string' && typeof c === 'string' && f && typeof f === 'object')l = n, s = f; else throw new Error('Unknown call format to patch_make.'); if (s.length === 0) return []; for (var u = [], g = new y.patch_obj(), i = 0, m = 0, d = 0, p = l, b = l, v = 0; v < s.length; v++) { const x = s[v][0]; const P = s[v][1]; switch (!i && x !== r && (g.start1 = m, g.start2 = d), x) { case h:g.diffs[i++] = s[v], g.length2 += P.length, b = b.substring(0, d) + P + b.substring(d); break; case a:g.length1 += P.length, g.diffs[i++] = s[v], b = b.substring(0, d) + b.substring(d + P.length); break; case r:P.length <= 2 * this.Patch_Margin && i && s.length != v + 1 ? (g.diffs[i++] = s[v], g.length1 += P.length, g.length2 += P.length) : P.length >= 2 * this.Patch_Margin && i && (this.patch_addContext_(g, p), u.push(g), g = new y.patch_obj(), i = 0, p = b, m = d); break }x !== h && (m += P.length), x !== a && (d += P.length) } return i && (this.patch_addContext_(g, p), u.push(g)), u }, y.prototype.patch_deepCopy = function (n) { for (var c = [], f = 0; f < n.length; f++) { const l = n[f]; const s = new y.patch_obj(); s.diffs = []; for (let u = 0; u < l.diffs.length; u++)s.diffs[u] = new y.Diff(l.diffs[u][0], l.diffs[u][1]); s.start1 = l.start1, s.start2 = l.start2, s.length1 = l.length1, s.length2 = l.length2, c[f] = s } return c }, y.prototype.patch_apply = function (n, c) { if (n.length == 0) return [c, []]; n = this.patch_deepCopy(n); const f = this.patch_addPadding(n); c = f + c + f, this.patch_splitMax(n); for (var l = 0, s = [], u = 0; u < n.length; u++) { const g = n[u].start2 + l; const i = this.diff_text1(n[u].diffs); var m; let d = -1; if (i.length > this.Match_MaxBits ? (m = this.match_main(c, i.substring(0, this.Match_MaxBits), g), m != -1 && (d = this.match_main(c, i.substring(i.length - this.Match_MaxBits), g + i.length - this.Match_MaxBits), (d == -1 || m >= d) && (m = -1))) : m = this.match_main(c, i, g), m == -1)s[u] = !1, l -= n[u].length2 - n[u].length1; else { s[u] = !0, l = m - g; var p; if (d == -1 ? p = c.substring(m, m + i.length) : p = c.substring(m, d + this.Match_MaxBits), i == p)c = c.substring(0, m) + this.diff_text2(n[u].diffs) + c.substring(m + i.length); else { const b = this.diff_main(i, p, !1); if (i.length > this.Match_MaxBits && this.diff_levenshtein(b) / i.length > this.Patch_DeleteThreshold)s[u] = !1; else { this.diff_cleanupSemanticLossless(b); for (var v = 0, x, P = 0; P < n[u].diffs.length; P++) { const S = n[u].diffs[P]; S[0] !== r && (x = this.diff_xIndex(b, v)), S[0] === h ? c = c.substring(0, m + x) + S[1] + c.substring(m + x) : S[0] === a && (c = c.substring(0, m + x) + c.substring(m + this.diff_xIndex(b, v + S[1].length))), S[0] !== a && (v += S[1].length) } } } } } return c = c.substring(f.length, c.length - f.length), [c, s] }, y.prototype.patch_addPadding = function (n) { for (var c = this.Patch_Margin, f = '', l = 1; l <= c; l++)f += String.fromCharCode(l); for (var l = 0; l < n.length; l++)n[l].start1 += c, n[l].start2 += c; let s = n[0]; let u = s.diffs; if (u.length == 0 || u[0][0] != r)u.unshift(new y.Diff(r, f)), s.start1 -= c, s.start2 -= c, s.length1 += c, s.length2 += c; else if (c > u[0][1].length) { var g = c - u[0][1].length; u[0][1] = f.substring(u[0][1].length) + u[0][1], s.start1 -= g, s.start2 -= g, s.length1 += g, s.length2 += g } if (s = n[n.length - 1], u = s.diffs, u.length == 0 || u[u.length - 1][0] != r)u.push(new y.Diff(r, f)), s.length1 += c, s.length2 += c; else if (c > u[u.length - 1][1].length) { var g = c - u[u.length - 1][1].length; u[u.length - 1][1] += f.substring(0, g), s.length1 += g, s.length2 += g } return f }, y.prototype.patch_splitMax = function (n) { for (let c = this.Match_MaxBits, f = 0; f < n.length; f++) if (!(n[f].length1 <= c)) { const l = n[f]; n.splice(f--, 1); for (let s = l.start1, u = l.start2, g = ''; l.diffs.length !== 0;) { const i = new y.patch_obj(); let m = !0; for (i.start1 = s - g.length, i.start2 = u - g.length, g !== '' && (i.length1 = i.length2 = g.length, i.diffs.push(new y.Diff(r, g))); l.diffs.length !== 0 && i.length1 < c - this.Patch_Margin;) { const d = l.diffs[0][0]; let p = l.diffs[0][1]; d === h ? (i.length2 += p.length, u += p.length, i.diffs.push(l.diffs.shift()), m = !1) : d === a && i.diffs.length == 1 && i.diffs[0][0] == r && p.length > 2 * c ? (i.length1 += p.length, s += p.length, m = !1, i.diffs.push(new y.Diff(d, p)), l.diffs.shift()) : (p = p.substring(0, c - i.length1 - this.Patch_Margin), i.length1 += p.length, s += p.length, d === r ? (i.length2 += p.length, u += p.length) : m = !1, i.diffs.push(new y.Diff(d, p)), p == l.diffs[0][1] ? l.diffs.shift() : l.diffs[0][1] = l.diffs[0][1].substring(p.length)) }g = this.diff_text2(i.diffs), g = g.substring(g.length - this.Patch_Margin); const b = this.diff_text1(l.diffs).substring(0, this.Patch_Margin); b !== '' && (i.length1 += b.length, i.length2 += b.length, i.diffs.length !== 0 && i.diffs[i.diffs.length - 1][0] === r ? i.diffs[i.diffs.length - 1][1] += b : i.diffs.push(new y.Diff(r, b))), m || n.splice(++f, 0, i) } } }, y.prototype.patch_toText = function (n) { for (var c = [], f = 0; f < n.length; f++)c[f] = n[f]; return c.join('') }, y.prototype.patch_fromText = function (n) {
        const c = []; if (!n) return c; for (let f = n.split(`
`), l = 0, s = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; l < f.length;) { const u = f[l].match(s); if (!u) throw new Error('Invalid patch string: ' + f[l]); const g = new y.patch_obj(); for (c.push(g), g.start1 = parseInt(u[1], 10), u[2] === '' ? (g.start1--, g.length1 = 1) : u[2] == '0' ? g.length1 = 0 : (g.start1--, g.length1 = parseInt(u[2], 10)), g.start2 = parseInt(u[3], 10), u[4] === '' ? (g.start2--, g.length2 = 1) : u[4] == '0' ? g.length2 = 0 : (g.start2--, g.length2 = parseInt(u[4], 10)), l++; l < f.length;) { const i = f[l].charAt(0); try { var m = decodeURI(f[l].substring(1)) } catch (d) { throw new Error('Illegal escape in patch_fromText: ' + m) } if (i == '-')g.diffs.push(new y.Diff(a, m)); else if (i == '+')g.diffs.push(new y.Diff(h, m)); else if (i == ' ')g.diffs.push(new y.Diff(r, m)); else { if (i == '@') break; if (i !== '') throw new Error('Invalid patch mode "' + i + '" in: ' + m) }l++ } } return c
      }, y.patch_obj = function () { this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0 }, y.patch_obj.prototype.toString = function () {
        let n, c; this.length1 === 0 ? n = this.start1 + ',0' : this.length1 == 1 ? n = this.start1 + 1 : n = this.start1 + 1 + ',' + this.length1, this.length2 === 0 ? c = this.start2 + ',0' : this.length2 == 1 ? c = this.start2 + 1 : c = this.start2 + 1 + ',' + this.length2; for (var f = ['@@ -' + n + ' +' + c + ` @@
`], l, s = 0; s < this.diffs.length; s++) {
          switch (this.diffs[s][0]) { case h:l = '+'; break; case a:l = '-'; break; case r:l = ' '; break }f[s + 1] = l + encodeURI(this.diffs[s][1]) + `
`
        } return f.join('').replace(/%20/g, ' ')
      }, w.exports = y, w.exports.diff_match_patch = y, w.exports.DIFF_DELETE = a, w.exports.DIFF_INSERT = h, w.exports.DIFF_EQUAL = r
    },
    177: function (w) { /** !

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/(function (y, a) { w.exports = a() })(this, function () {
        return (function (y) { function a (r) { if (h[r]) return h[r].exports; const n = h[r] = { exports: {}, id: r, loaded: !1 }; return y[r].call(n.exports, n, n.exports, a), n.loaded = !0, n.exports } var h = {}; return a.m = y, a.c = h, a.p = '', a(0) }([function (y, a, h) { 'use strict'; function r () { const S = x(); return S.compile = function (D, A) { return g.compile(D, A, S) }, S.precompile = function (D, A) { return g.precompile(D, A, S) }, S.AST = s.default, S.Compiler = g.Compiler, S.JavaScriptCompiler = m.default, S.Parser = u.parser, S.parse = u.parse, S.parseWithoutProcessing = u.parseWithoutProcessing, S } const n = h(1).default; a.__esModule = !0; const c = h(2); const f = n(c); const l = h(45); var s = n(l); var u = h(46); var g = h(51); const i = h(52); var m = n(i); const d = h(49); const p = n(d); const b = h(44); const v = n(b); var x = f.default.create; const P = r(); P.create = r, v.default(P), P.Visitor = p.default, P.default = P, a.default = P, y.exports = a.default }, function (y, a) { 'use strict'; a.default = function (h) { return h && h.__esModule ? h : { default: h } }, a.__esModule = !0 }, function (y, a, h) { 'use strict'; function r () { const S = new l.HandlebarsEnvironment(); return d.extend(S, l), S.SafeString = u.default, S.Exception = i.default, S.Utils = d, S.escapeExpression = d.escapeExpression, S.VM = b, S.template = function (D) { return b.template(D, S) }, S } const n = h(3).default; const c = h(1).default; a.__esModule = !0; const f = h(4); var l = n(f); const s = h(37); var u = c(s); const g = h(6); var i = c(g); const m = h(5); var d = n(m); const p = h(38); var b = n(p); const v = h(44); const x = c(v); const P = r(); P.create = r, x.default(P), P.default = P, a.default = P, y.exports = a.default }, function (y, a) { 'use strict'; a.default = function (h) { if (h && h.__esModule) return h; const r = {}; if (h != null) for (const n in h)Object.prototype.hasOwnProperty.call(h, n) && (r[n] = h[n]); return r.default = h, r }, a.__esModule = !0 }, function (y, a, h) { 'use strict'; function r (S, D, A) { this.helpers = S || {}, this.partials = D || {}, this.decorators = A || {}, s.registerDefaultHelpers(this), u.registerDefaultDecorators(this) } const n = h(1).default; a.__esModule = !0, a.HandlebarsEnvironment = r; const c = h(5); const f = h(6); const l = n(f); var s = h(10); var u = h(30); const g = h(32); const i = n(g); const m = h(33); const d = '4.7.7'; a.VERSION = d; const p = 8; a.COMPILER_REVISION = p; const b = 7; a.LAST_COMPATIBLE_COMPILER_REVISION = b; const v = { 1: '<= 1.0.rc.2', 2: '== 1.0.0-rc.3', 3: '== 1.0.0-rc.4', 4: '== 1.x.x', 5: '== 2.0.0-alpha.x', 6: '>= 2.0.0-beta.1', 7: '>= 4.0.0 <4.3.0', 8: '>= 4.3.0' }; a.REVISION_CHANGES = v; const x = '[object Object]'; r.prototype = { constructor: r, logger: i.default, log: i.default.log, registerHelper: function (S, D) { if (c.toString.call(S) === x) { if (D) throw new l.default('Arg not supported with multiple helpers'); c.extend(this.helpers, S) } else this.helpers[S] = D }, unregisterHelper: function (S) { delete this.helpers[S] }, registerPartial: function (S, D) { if (c.toString.call(S) === x)c.extend(this.partials, S); else { if (typeof D === 'undefined') throw new l.default('Attempting to register a partial called "' + S + '" as undefined'); this.partials[S] = D } }, unregisterPartial: function (S) { delete this.partials[S] }, registerDecorator: function (S, D) { if (c.toString.call(S) === x) { if (D) throw new l.default('Arg not supported with multiple decorators'); c.extend(this.decorators, S) } else this.decorators[S] = D }, unregisterDecorator: function (S) { delete this.decorators[S] }, resetLoggedPropertyAccesses: function () { m.resetLoggedProperties() } }; const P = i.default.log; a.log = P, a.createFrame = c.createFrame, a.logger = i.default }, function (y, a) { 'use strict'; function h (v) { return g[v] } function r (v) { for (let x = 1; x < arguments.length; x++) for (const P in arguments[x])Object.prototype.hasOwnProperty.call(arguments[x], P) && (v[P] = arguments[x][P]); return v } function n (v, x) { for (let P = 0, S = v.length; P < S; P++) if (v[P] === x) return P; return -1 } function c (v) { if (typeof v !== 'string') { if (v && v.toHTML) return v.toHTML(); if (v == null) return ''; if (!v) return v + ''; v = '' + v } return m.test(v) ? v.replace(i, h) : v } function f (v) { return !v && v !== 0 || !(!b(v) || v.length !== 0) } function l (v) { const x = r({}, v); return x._parent = v, x } function s (v, x) { return v.path = x, v } function u (v, x) { return (v ? v + '.' : '') + x }a.__esModule = !0, a.extend = r, a.indexOf = n, a.escapeExpression = c, a.isEmpty = f, a.createFrame = l, a.blockParams = s, a.appendContextPath = u; var g = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;', '=': '&#x3D;' }; var i = /[&<>"'`=]/g; var m = /[&<>"'`=]/; const d = Object.prototype.toString; a.toString = d; let p = function (v) { return typeof v === 'function' }; p(/x/) && (a.isFunction = p = function (v) { return typeof v === 'function' && d.call(v) === '[object Function]' }), a.isFunction = p; var b = Array.isArray || function (v) { return !(!v || typeof v !== 'object') && d.call(v) === '[object Array]' }; a.isArray = b }, function (y, a, h) { 'use strict'; function r (f, l) { const s = l && l.loc; let u = void 0; let g = void 0; let i = void 0; let m = void 0; s && (u = s.start.line, g = s.end.line, i = s.start.column, m = s.end.column, f += ' - ' + u + ':' + i); for (let d = Error.prototype.constructor.call(this, f), p = 0; p < c.length; p++) this[c[p]] = d[c[p]]; Error.captureStackTrace && Error.captureStackTrace(this, r); try { s && (this.lineNumber = u, this.endLineNumber = g, n ? (Object.defineProperty(this, 'column', { value: i, enumerable: !0 }), Object.defineProperty(this, 'endColumn', { value: m, enumerable: !0 })) : (this.column = i, this.endColumn = m)) } catch (b) {} } var n = h(7).default; a.__esModule = !0; var c = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack']; r.prototype = new Error(), a.default = r, y.exports = a.default }, function (y, a, h) { y.exports = { default: h(8), __esModule: !0 } }, function (y, a, h) { const r = h(9); y.exports = function (n, c, f) { return r.setDesc(n, c, f) } }, function (y, a) { const h = Object; y.exports = { create: h.create, getProto: h.getPrototypeOf, isEnum: {}.propertyIsEnumerable, getDesc: h.getOwnPropertyDescriptor, setDesc: h.defineProperty, setDescs: h.defineProperties, getKeys: h.keys, getNames: h.getOwnPropertyNames, getSymbols: h.getOwnPropertySymbols, each: [].forEach } }, function (y, a, h) { 'use strict'; function r (D) { l.default(D), u.default(D), i.default(D), d.default(D), b.default(D), x.default(D), S.default(D) } function n (D, A, T) { D.helpers[A] && (D.hooks[A] = D.helpers[A], T || delete D.helpers[A]) } const c = h(1).default; a.__esModule = !0, a.registerDefaultHelpers = r, a.moveHelperToHooks = n; const f = h(11); var l = c(f); const s = h(12); var u = c(s); const g = h(25); var i = c(g); const m = h(26); var d = c(m); const p = h(27); var b = c(p); const v = h(28); var x = c(v); const P = h(29); var S = c(P) }, function (y, a, h) { 'use strict'; a.__esModule = !0; const r = h(5); a.default = function (n) { n.registerHelper('blockHelperMissing', function (c, f) { const l = f.inverse; const s = f.fn; if (c === !0) return s(this); if (c === !1 || c == null) return l(this); if (r.isArray(c)) return c.length > 0 ? (f.ids && (f.ids = [f.name]), n.helpers.each(c, f)) : l(this); if (f.data && f.ids) { const u = r.createFrame(f.data); u.contextPath = r.appendContextPath(f.data.contextPath, f.name), f = { data: u } } return s(c, f) }) }, y.exports = a.default }, function (y, a, h) { (function (r) { 'use strict'; const n = h(13).default; const c = h(1).default; a.__esModule = !0; const f = h(5); const l = h(6); const s = c(l); a.default = function (u) { u.registerHelper('each', function (g, i) { function m (C, N, L) { x && (x.key = C, x.index = N, x.first = N === 0, x.last = !!L, P && (x.contextPath = P + C)), v += d(g[C], { data: x, blockParams: f.blockParams([g[C], C], [P + C, null]) }) } if (!i) throw new s.default('Must pass iterator to #each'); var d = i.fn; const p = i.inverse; let b = 0; var v = ''; var x = void 0; var P = void 0; if (i.data && i.ids && (P = f.appendContextPath(i.data.contextPath, i.ids[0]) + '.'), f.isFunction(g) && (g = g.call(this)), i.data && (x = f.createFrame(i.data)), g && typeof g === 'object') if (f.isArray(g)) for (var S = g.length; b < S; b++)b in g && m(b, b, b === g.length - 1); else if (r.Symbol && g[r.Symbol.iterator]) { for (var D = [], A = g[r.Symbol.iterator](), T = A.next(); !T.done; T = A.next())D.push(T.value); g = D; for (var S = g.length; b < S; b++)m(b, b, b === g.length - 1) } else (function () { let C = void 0; n(g).forEach(function (N) { C !== void 0 && m(C, b - 1), C = N, b++ }), C !== void 0 && m(C, b - 1, !0) })(); return b === 0 && (v = p(this)), v }) }, y.exports = a.default }).call(a, (function () { return this }())) }, function (y, a, h) { y.exports = { default: h(14), __esModule: !0 } }, function (y, a, h) { h(15), y.exports = h(21).Object.keys }, function (y, a, h) { const r = h(16); h(18)('keys', function (n) { return function (c) { return n(r(c)) } }) }, function (y, a, h) { const r = h(17); y.exports = function (n) { return Object(r(n)) } }, function (y, a) { y.exports = function (h) { if (h == null) throw TypeError("Can't call method on  " + h); return h } }, function (y, a, h) { const r = h(19); const n = h(21); const c = h(24); y.exports = function (f, l) { const s = (n.Object || {})[f] || Object[f]; const u = {}; u[f] = l(s), r(r.S + r.F * c(function () { s(1) }), 'Object', u) } }, function (y, a, h) { const r = h(20); const n = h(21); const c = h(22); const f = 'prototype'; var l = function (s, u, g) { let i; let m; let d; const p = s & l.F; const b = s & l.G; const v = s & l.S; const x = s & l.P; const P = s & l.B; const S = s & l.W; const D = b ? n : n[u] || (n[u] = {}); const A = b ? r : v ? r[u] : (r[u] || {})[f]; b && (g = u); for (i in g)m = !p && A && i in A, m && i in D || (d = m ? A[i] : g[i], D[i] = b && typeof A[i] !== 'function' ? g[i] : P && m ? c(d, r) : S && A[i] == d ? (function (T) { const C = function (N) { return this instanceof T ? new T(N) : T(N) }; return C[f] = T[f], C }(d)) : x && typeof d === 'function' ? c(Function.call, d) : d, x && ((D[f] || (D[f] = {}))[i] = d)) }; l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, y.exports = l }, function (y, a) { const h = y.exports = typeof window !== 'undefined' && window.Math == Math ? window : typeof self !== 'undefined' && self.Math == Math ? self : Function('return this')(); typeof __g === 'number' && (__g = h) }, function (y, a) { const h = y.exports = { version: '1.2.6' }; typeof __e === 'number' && (__e = h) }, function (y, a, h) { const r = h(23); y.exports = function (n, c, f) { if (r(n), c === void 0) return n; switch (f) { case 1:return function (l) { return n.call(c, l) }; case 2:return function (l, s) { return n.call(c, l, s) }; case 3:return function (l, s, u) { return n.call(c, l, s, u) } } return function () { return n.apply(c, arguments) } } }, function (y, a) { y.exports = function (h) { if (typeof h !== 'function') throw TypeError(h + ' is not a function!'); return h } }, function (y, a) { y.exports = function (h) { try { return !!h() } catch (r) { return !0 } } }, function (y, a, h) { 'use strict'; const r = h(1).default; a.__esModule = !0; const n = h(6); const c = r(n); a.default = function (f) { f.registerHelper('helperMissing', function () { if (arguments.length !== 1) throw new c.default('Missing helper: "' + arguments[arguments.length - 1].name + '"') }) }, y.exports = a.default }, function (y, a, h) { 'use strict'; const r = h(1).default; a.__esModule = !0; const n = h(5); const c = h(6); const f = r(c); a.default = function (l) { l.registerHelper('if', function (s, u) { if (arguments.length != 2) throw new f.default('#if requires exactly one argument'); return n.isFunction(s) && (s = s.call(this)), !u.hash.includeZero && !s || n.isEmpty(s) ? u.inverse(this) : u.fn(this) }), l.registerHelper('unless', function (s, u) { if (arguments.length != 2) throw new f.default('#unless requires exactly one argument'); return l.helpers.if.call(this, s, { fn: u.inverse, inverse: u.fn, hash: u.hash }) }) }, y.exports = a.default }, function (y, a) { 'use strict'; a.__esModule = !0, a.default = function (h) { h.registerHelper('log', function () { for (var r = [void 0], n = arguments[arguments.length - 1], c = 0; c < arguments.length - 1; c++)r.push(arguments[c]); let f = 1; n.hash.level != null ? f = n.hash.level : n.data && n.data.level != null && (f = n.data.level), r[0] = f, h.log.apply(h, r) }) }, y.exports = a.default }, function (y, a) { 'use strict'; a.__esModule = !0, a.default = function (h) { h.registerHelper('lookup', function (r, n, c) { return r && c.lookupProperty(r, n) }) }, y.exports = a.default }, function (y, a, h) { 'use strict'; const r = h(1).default; a.__esModule = !0; const n = h(5); const c = h(6); const f = r(c); a.default = function (l) { l.registerHelper('with', function (s, u) { if (arguments.length != 2) throw new f.default('#with requires exactly one argument'); n.isFunction(s) && (s = s.call(this)); const g = u.fn; if (n.isEmpty(s)) return u.inverse(this); let i = u.data; return u.data && u.ids && (i = n.createFrame(u.data), i.contextPath = n.appendContextPath(u.data.contextPath, u.ids[0])), g(s, { data: i, blockParams: n.blockParams([s], [i && i.contextPath]) }) }) }, y.exports = a.default }, function (y, a, h) { 'use strict'; function r (l) { f.default(l) } const n = h(1).default; a.__esModule = !0, a.registerDefaultDecorators = r; const c = h(31); var f = n(c) }, function (y, a, h) { 'use strict'; a.__esModule = !0; const r = h(5); a.default = function (n) { n.registerDecorator('inline', function (c, f, l, s) { let u = c; return f.partials || (f.partials = {}, u = function (g, i) { const m = l.partials; l.partials = r.extend({}, m, f.partials); const d = c(g, i); return l.partials = m, d }), f.partials[s.args[0]] = s.fn, u }) }, y.exports = a.default }, function (y, a, h) { 'use strict'; a.__esModule = !0; const r = h(5); var n = { methodMap: ['debug', 'info', 'warn', 'error'], level: 'info', lookupLevel: function (c) { if (typeof c === 'string') { const f = r.indexOf(n.methodMap, c.toLowerCase()); c = f >= 0 ? f : parseInt(c, 10) } return c }, log: function (c) { if (c = n.lookupLevel(c), typeof console !== 'undefined' && n.lookupLevel(n.level) <= c) { let f = n.methodMap[c]; console[f] || (f = 'log'); for (var l = arguments.length, s = Array(l > 1 ? l - 1 : 0), u = 1; u < l; u++)s[u - 1] = arguments[u]; console[f].apply(console, s) } } }; a.default = n, y.exports = a.default }, function (y, a, h) {
          'use strict'; function r (b) { const v = s(null); v.constructor = !1, v.__defineGetter__ = !1, v.__defineSetter__ = !1, v.__lookupGetter__ = !1; const x = s(null); return x.__proto__ = !1, { properties: { whitelist: i.createNewLookupObject(x, b.allowedProtoProperties), defaultValue: b.allowProtoPropertiesByDefault }, methods: { whitelist: i.createNewLookupObject(v, b.allowedProtoMethods), defaultValue: b.allowProtoMethodsByDefault } } } function n (b, v, x) { return c(typeof b === 'function' ? v.methods : v.properties, x) } function c (b, v) { return b.whitelist[v] !== void 0 ? b.whitelist[v] === !0 : b.defaultValue !== void 0 ? b.defaultValue : (f(v), !1) } function f (b) {
            p[b] !== !0 && (p[b] = !0, d.log('error', 'Handlebars: Access has been denied to resolve the property "' + b + `" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`))
          } function l () { u(p).forEach(function (b) { delete p[b] }) } var s = h(34).default; var u = h(13).default; const g = h(3).default; a.__esModule = !0, a.createProtoAccessControl = r, a.resultIsAllowed = n, a.resetLoggedProperties = l; var i = h(36); const m = h(32); var d = g(m); var p = s(null)
        }, function (y, a, h) { y.exports = { default: h(35), __esModule: !0 } }, function (y, a, h) { const r = h(9); y.exports = function (n, c) { return r.create(n, c) } }, function (y, a, h) { 'use strict'; function r () { for (var f = arguments.length, l = Array(f), s = 0; s < f; s++)l[s] = arguments[s]; return c.extend.apply(void 0, [n(null)].concat(l)) } var n = h(34).default; a.__esModule = !0, a.createNewLookupObject = r; var c = h(5) }, function (y, a) { 'use strict'; function h (r) { this.string = r }a.__esModule = !0, h.prototype.toString = h.prototype.toHTML = function () { return '' + this.string }, a.default = h, y.exports = a.default }, function (y, a, h) {
          'use strict'; function r (L) { const R = L && L[0] || 1; const B = A.COMPILER_REVISION; if (!(R >= A.LAST_COMPATIBLE_COMPILER_REVISION && R <= A.COMPILER_REVISION)) { if (R < A.LAST_COMPATIBLE_COMPILER_REVISION) { const O = A.REVISION_CHANGES[B]; const F = A.REVISION_CHANGES[R]; throw new D.default('Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (' + O + ') or downgrade your runtime to an older version (' + F + ').') } throw new D.default('Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (' + L[1] + ').') } } function n (L, R) {
            function B (_, W, H) {
              H.hash && (W = P.extend({}, W, H.hash), H.ids && (H.ids[0] = !0)), _ = R.VM.resolvePartial.call(this, _, W, H); const $ = P.extend({}, H, { hooks: this.hooks, protoAccessControl: this.protoAccessControl }); let K = R.VM.invokePartial.call(this, _, W, $); if (K == null && R.compile && (H.partials[H.name] = R.compile(_, L.compilerOptions, R), K = H.partials[H.name](W, $)), K != null) {
                if (H.indent) {
                  for (var te = K.split(`
`), oe = 0, he = te.length; oe < he && (te[oe] || oe + 1 !== he); oe++)te[oe] = H.indent + te[oe]; K = te.join(`
`)
                } return K
              } throw new D.default('The partial ' + H.name + ' could not be compiled when running in runtime-only mode')
            } function O (_) { function W (oe) { return '' + L.main(q, oe, q.helpers, q.partials, $, te, K) } const H = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1]; var $ = H.data; O._setup(H), !H.partial && L.useData && ($ = u(_, $)); var K = void 0; var te = L.useBlockParams ? [] : void 0; return L.useDepths && (K = H.depths ? _ != H.depths[0] ? [_].concat(H.depths) : H.depths : [_]), (W = g(L.main, W, q, H.depths || [], $, te))(_, H) } if (!R) throw new D.default('No environment passed to template'); if (!L || !L.main) throw new D.default('Unknown template object: ' + typeof L); L.main.decorator = L.main_d, R.VM.checkRevision(L.compiler); const F = L.compiler && L.compiler[0] === 7; var q = { strict: function (_, W, H) { if (!(_ && W in _)) throw new D.default('"' + W + '" not defined in ' + _, { loc: H }); return q.lookupProperty(_, W) }, lookupProperty: function (_, W) { const H = _[W]; return H == null || Object.prototype.hasOwnProperty.call(_, W) || N.resultIsAllowed(H, q.protoAccessControl, W) ? H : void 0 }, lookup: function (_, W) { for (let H = _.length, $ = 0; $ < H; $++) { const K = _[$] && q.lookupProperty(_[$], W); if (K != null) return _[$][W] } }, lambda: function (_, W) { return typeof _ === 'function' ? _.call(W) : _ }, escapeExpression: P.escapeExpression, invokePartial: B, fn: function (_) { const W = L[_]; return W.decorator = L[_ + '_d'], W }, programs: [], program: function (_, W, H, $, K) { let te = this.programs[_]; const oe = this.fn(_); return W || K || $ || H ? te = c(this, _, oe, W, H, $, K) : te || (te = this.programs[_] = c(this, _, oe)), te }, data: function (_, W) { for (;_ && W--;)_ = _._parent; return _ }, mergeIfNeeded: function (_, W) { let H = _ || W; return _ && W && _ !== W && (H = P.extend({}, W, _)), H }, nullContext: d({}), noop: R.VM.noop, compilerInfo: L.compiler }; return O.isTop = !0, O._setup = function (_) { if (_.partial)q.protoAccessControl = _.protoAccessControl, q.helpers = _.helpers, q.partials = _.partials, q.decorators = _.decorators, q.hooks = _.hooks; else { const W = P.extend({}, R.helpers, _.helpers); i(W, q), q.helpers = W, L.usePartial && (q.partials = q.mergeIfNeeded(_.partials, R.partials)), (L.usePartial || L.useDecorators) && (q.decorators = P.extend({}, R.decorators, _.decorators)), q.hooks = {}, q.protoAccessControl = N.createProtoAccessControl(_); const H = _.allowCallsToHelperMissing || F; T.moveHelperToHooks(q, 'helperMissing', H), T.moveHelperToHooks(q, 'blockHelperMissing', H) } }, O._child = function (_, W, H, $) { if (L.useBlockParams && !H) throw new D.default('must pass block params'); if (L.useDepths && !$) throw new D.default('must pass parent depths'); return c(q, _, L[_], W, 0, H, $) }, O
          } function c (L, R, B, O, F, q, _) { function W (H) { const $ = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1]; let K = _; return !_ || H == _[0] || H === L.nullContext && _[0] === null || (K = [H].concat(_)), B(L, H, L.helpers, L.partials, $.data || O, q && [$.blockParams].concat(q), K) } return W = g(B, W, L, _, O, q), W.program = R, W.depth = _ ? _.length : 0, W.blockParams = F || 0, W } function f (L, R, B) { return L ? L.call || B.name || (B.name = L, L = B.partials[L]) : L = B.name === '@partial-block' ? B.data['partial-block'] : B.partials[B.name], L } function l (L, R, B) { const O = B.data && B.data['partial-block']; B.partial = !0, B.ids && (B.data.contextPath = B.ids[0] || B.data.contextPath); let F = void 0; if (B.fn && B.fn !== s && (function () { B.data = A.createFrame(B.data); const q = B.fn; F = B.data['partial-block'] = function (_) { const W = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1]; return W.data = A.createFrame(W.data), W.data['partial-block'] = O, q(_, W) }, q.partials && (B.partials = P.extend({}, B.partials, q.partials)) }()), L === void 0 && F && (L = F), L === void 0) throw new D.default('The partial ' + B.name + ' could not be found'); if (L instanceof Function) return L(R, B) } function s () { return '' } function u (L, R) { return R && 'root' in R || (R = R ? A.createFrame(R) : {}, R.root = L), R } function g (L, R, B, O, F, q) { if (L.decorator) { const _ = {}; R = L.decorator(R, _, B, O && O[0], F, q, O), P.extend(R, _) } return R } function i (L, R) { p(L).forEach(function (B) { const O = L[B]; L[B] = m(O, R) }) } function m (L, R) { const B = R.lookupProperty; return C.wrapHelper(L, function (O) { return P.extend({ lookupProperty: B }, O) }) } var d = h(39).default; var p = h(13).default; const b = h(3).default; const v = h(1).default; a.__esModule = !0, a.checkRevision = r, a.template = n, a.wrapProgram = c, a.resolvePartial = f, a.invokePartial = l, a.noop = s; const x = h(5); var P = b(x); const S = h(6); var D = v(S); var A = h(4); var T = h(10); var C = h(43); var N = h(33)
        }, function (y, a, h) { y.exports = { default: h(40), __esModule: !0 } }, function (y, a, h) { h(41), y.exports = h(21).Object.seal }, function (y, a, h) { const r = h(42); h(18)('seal', function (n) { return function (c) { return n && r(c) ? n(c) : c } }) }, function (y, a) { y.exports = function (h) { return typeof h === 'object' ? h !== null : typeof h === 'function' } }, function (y, a) { 'use strict'; function h (r, n) { if (typeof r !== 'function') return r; const c = function () { const f = arguments[arguments.length - 1]; return arguments[arguments.length - 1] = n(f), r.apply(this, arguments) }; return c }a.__esModule = !0, a.wrapHelper = h }, function (y, a) { (function (h) { 'use strict'; a.__esModule = !0, a.default = function (r) { const n = typeof h !== 'undefined' ? h : window; const c = n.Handlebars; r.noConflict = function () { return n.Handlebars === r && (n.Handlebars = c), r } }, y.exports = a.default }).call(a, (function () { return this }())) }, function (y, a) { 'use strict'; a.__esModule = !0; var h = { helpers: { helperExpression: function (r) { return r.type === 'SubExpression' || (r.type === 'MustacheStatement' || r.type === 'BlockStatement') && !!(r.params && r.params.length || r.hash) }, scopedId: function (r) { return /^\.|this\b/.test(r.original) }, simpleId: function (r) { return r.parts.length === 1 && !h.helpers.scopedId(r) && !r.depth } } }; a.default = h, y.exports = a.default }, function (y, a, h) { 'use strict'; function r (b, v) { if (b.type === 'Program') return b; s.default.yy = p, p.locInfo = function (P) { return new p.SourceLocation(v && v.srcName, P) }; const x = s.default.parse(b); return x } function n (b, v) { const x = r(b, v); const P = new g.default(v); return P.accept(x) } const c = h(1).default; const f = h(3).default; a.__esModule = !0, a.parseWithoutProcessing = r, a.parse = n; const l = h(47); var s = c(l); const u = h(48); var g = c(u); const i = h(50); const m = f(i); const d = h(5); a.parser = s.default; var p = {}; d.extend(p, m) }, function (y, a) {
          'use strict'; a.__esModule = !0; const h = (function () {
            function r () { this.yy = {} } const n = {
              trace: function () {},
              yy: {},
              symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, partialBlock: 12, content: 13, COMMENT: 14, CONTENT: 15, openRawBlock: 16, rawBlock_repetition0: 17, END_RAW_BLOCK: 18, OPEN_RAW_BLOCK: 19, helperName: 20, openRawBlock_repetition0: 21, openRawBlock_option0: 22, CLOSE_RAW_BLOCK: 23, openBlock: 24, block_option0: 25, closeBlock: 26, openInverse: 27, block_option1: 28, OPEN_BLOCK: 29, openBlock_repetition0: 30, openBlock_option0: 31, openBlock_option1: 32, CLOSE: 33, OPEN_INVERSE: 34, openInverse_repetition0: 35, openInverse_option0: 36, openInverse_option1: 37, openInverseChain: 38, OPEN_INVERSE_CHAIN: 39, openInverseChain_repetition0: 40, openInverseChain_option0: 41, openInverseChain_option1: 42, inverseAndProgram: 43, INVERSE: 44, inverseChain: 45, inverseChain_option0: 46, OPEN_ENDBLOCK: 47, OPEN: 48, mustache_repetition0: 49, mustache_option0: 50, OPEN_UNESCAPED: 51, mustache_repetition1: 52, mustache_option1: 53, CLOSE_UNESCAPED: 54, OPEN_PARTIAL: 55, partialName: 56, partial_repetition0: 57, partial_option0: 58, openPartialBlock: 59, OPEN_PARTIAL_BLOCK: 60, openPartialBlock_repetition0: 61, openPartialBlock_option0: 62, param: 63, sexpr: 64, OPEN_SEXPR: 65, sexpr_repetition0: 66, sexpr_option0: 67, CLOSE_SEXPR: 68, hash: 69, hash_repetition_plus0: 70, hashSegment: 71, ID: 72, EQUALS: 73, blockParams: 74, OPEN_BLOCK_PARAMS: 75, blockParams_repetition_plus0: 76, CLOSE_BLOCK_PARAMS: 77, path: 78, dataName: 79, STRING: 80, NUMBER: 81, BOOLEAN: 82, UNDEFINED: 83, NULL: 84, DATA: 85, pathSegments: 86, SEP: 87, $accept: 0, $end: 1 },
              terminals_: { 2: 'error', 5: 'EOF', 14: 'COMMENT', 15: 'CONTENT', 18: 'END_RAW_BLOCK', 19: 'OPEN_RAW_BLOCK', 23: 'CLOSE_RAW_BLOCK', 29: 'OPEN_BLOCK', 33: 'CLOSE', 34: 'OPEN_INVERSE', 39: 'OPEN_INVERSE_CHAIN', 44: 'INVERSE', 47: 'OPEN_ENDBLOCK', 48: 'OPEN', 51: 'OPEN_UNESCAPED', 54: 'CLOSE_UNESCAPED', 55: 'OPEN_PARTIAL', 60: 'OPEN_PARTIAL_BLOCK', 65: 'OPEN_SEXPR', 68: 'CLOSE_SEXPR', 72: 'ID', 73: 'EQUALS', 75: 'OPEN_BLOCK_PARAMS', 77: 'CLOSE_BLOCK_PARAMS', 80: 'STRING', 81: 'NUMBER', 82: 'BOOLEAN', 83: 'UNDEFINED', 84: 'NULL', 85: 'DATA', 87: 'SEP' },
              productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
              performAction: function (f, l, s, u, g, i, m) { const d = i.length - 1; switch (g) { case 1:return i[d - 1]; case 2:this.$ = u.prepareProgram(i[d]); break; case 3:this.$ = i[d]; break; case 4:this.$ = i[d]; break; case 5:this.$ = i[d]; break; case 6:this.$ = i[d]; break; case 7:this.$ = i[d]; break; case 8:this.$ = i[d]; break; case 9:this.$ = { type: 'CommentStatement', value: u.stripComment(i[d]), strip: u.stripFlags(i[d], i[d]), loc: u.locInfo(this._$) }; break; case 10:this.$ = { type: 'ContentStatement', original: i[d], value: i[d], loc: u.locInfo(this._$) }; break; case 11:this.$ = u.prepareRawBlock(i[d - 2], i[d - 1], i[d], this._$); break; case 12:this.$ = { path: i[d - 3], params: i[d - 2], hash: i[d - 1] }; break; case 13:this.$ = u.prepareBlock(i[d - 3], i[d - 2], i[d - 1], i[d], !1, this._$); break; case 14:this.$ = u.prepareBlock(i[d - 3], i[d - 2], i[d - 1], i[d], !0, this._$); break; case 15:this.$ = { open: i[d - 5], path: i[d - 4], params: i[d - 3], hash: i[d - 2], blockParams: i[d - 1], strip: u.stripFlags(i[d - 5], i[d]) }; break; case 16:this.$ = { path: i[d - 4], params: i[d - 3], hash: i[d - 2], blockParams: i[d - 1], strip: u.stripFlags(i[d - 5], i[d]) }; break; case 17:this.$ = { path: i[d - 4], params: i[d - 3], hash: i[d - 2], blockParams: i[d - 1], strip: u.stripFlags(i[d - 5], i[d]) }; break; case 18:this.$ = { strip: u.stripFlags(i[d - 1], i[d - 1]), program: i[d] }; break; case 19:var p = u.prepareBlock(i[d - 2], i[d - 1], i[d], i[d], !1, this._$); var b = u.prepareProgram([p], i[d - 1].loc); b.chained = !0, this.$ = { strip: i[d - 2].strip, program: b, chain: !0 }; break; case 20:this.$ = i[d]; break; case 21:this.$ = { path: i[d - 1], strip: u.stripFlags(i[d - 2], i[d]) }; break; case 22:this.$ = u.prepareMustache(i[d - 3], i[d - 2], i[d - 1], i[d - 4], u.stripFlags(i[d - 4], i[d]), this._$); break; case 23:this.$ = u.prepareMustache(i[d - 3], i[d - 2], i[d - 1], i[d - 4], u.stripFlags(i[d - 4], i[d]), this._$); break; case 24:this.$ = { type: 'PartialStatement', name: i[d - 3], params: i[d - 2], hash: i[d - 1], indent: '', strip: u.stripFlags(i[d - 4], i[d]), loc: u.locInfo(this._$) }; break; case 25:this.$ = u.preparePartialBlock(i[d - 2], i[d - 1], i[d], this._$); break; case 26:this.$ = { path: i[d - 3], params: i[d - 2], hash: i[d - 1], strip: u.stripFlags(i[d - 4], i[d]) }; break; case 27:this.$ = i[d]; break; case 28:this.$ = i[d]; break; case 29:this.$ = { type: 'SubExpression', path: i[d - 3], params: i[d - 2], hash: i[d - 1], loc: u.locInfo(this._$) }; break; case 30:this.$ = { type: 'Hash', pairs: i[d], loc: u.locInfo(this._$) }; break; case 31:this.$ = { type: 'HashPair', key: u.id(i[d - 2]), value: i[d], loc: u.locInfo(this._$) }; break; case 32:this.$ = u.id(i[d - 1]); break; case 33:this.$ = i[d]; break; case 34:this.$ = i[d]; break; case 35:this.$ = { type: 'StringLiteral', value: i[d], original: i[d], loc: u.locInfo(this._$) }; break; case 36:this.$ = { type: 'NumberLiteral', value: Number(i[d]), original: Number(i[d]), loc: u.locInfo(this._$) }; break; case 37:this.$ = { type: 'BooleanLiteral', value: i[d] === 'true', original: i[d] === 'true', loc: u.locInfo(this._$) }; break; case 38:this.$ = { type: 'UndefinedLiteral', original: void 0, value: void 0, loc: u.locInfo(this._$) }; break; case 39:this.$ = { type: 'NullLiteral', original: null, value: null, loc: u.locInfo(this._$) }; break; case 40:this.$ = i[d]; break; case 41:this.$ = i[d]; break; case 42:this.$ = u.preparePath(!0, i[d], this._$); break; case 43:this.$ = u.preparePath(!1, i[d], this._$); break; case 44:i[d - 2].push({ part: u.id(i[d]), original: i[d], separator: i[d - 1] }), this.$ = i[d - 2]; break; case 45:this.$ = [{ part: u.id(i[d]), original: i[d] }]; break; case 46:this.$ = []; break; case 47:i[d - 1].push(i[d]); break; case 48:this.$ = []; break; case 49:i[d - 1].push(i[d]); break; case 50:this.$ = []; break; case 51:i[d - 1].push(i[d]); break; case 58:this.$ = []; break; case 59:i[d - 1].push(i[d]); break; case 64:this.$ = []; break; case 65:i[d - 1].push(i[d]); break; case 70:this.$ = []; break; case 71:i[d - 1].push(i[d]); break; case 78:this.$ = []; break; case 79:i[d - 1].push(i[d]); break; case 82:this.$ = []; break; case 83:i[d - 1].push(i[d]); break; case 86:this.$ = []; break; case 87:i[d - 1].push(i[d]); break; case 90:this.$ = []; break; case 91:i[d - 1].push(i[d]); break; case 94:this.$ = []; break; case 95:i[d - 1].push(i[d]); break; case 98:this.$ = [i[d]]; break; case 99:i[d - 1].push(i[d]); break; case 100:this.$ = [i[d]]; break; case 101:i[d - 1].push(i[d]) } },
              table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
              defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
              parseError: function (f, l) { throw new Error(f) },
              parse: function (f) {
                function l () { let q; return q = s.lexer.lex() || 1, typeof q !== 'number' && (q = s.symbols_[q] || q), q } var s = this; let u = [0]; let g = [null]; let i = []; const m = this.table; let d = ''; let p = 0; let b = 0; let v = 0; this.lexer.setInput(f), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc === 'undefined' && (this.lexer.yylloc = {}); let x = this.lexer.yylloc; i.push(x); const P = this.lexer.options && this.lexer.options.ranges; typeof this.yy.parseError === 'function' && (this.parseError = this.yy.parseError); for (var S, D, A, T, C, N, L, R, B, O = {}; ;) {
                  if (A = u[u.length - 1], this.defaultActions[A] ? T = this.defaultActions[A] : (S !== null && typeof S !== 'undefined' || (S = l()), T = m[A] && m[A][S]), typeof T === 'undefined' || !T.length || !T[0]) {
                    let F = ''; if (!v) {
                      B = []; for (N in m[A]) this.terminals_[N] && N > 2 && B.push("'" + this.terminals_[N] + "'"); F = this.lexer.showPosition
                        ? 'Parse error on line ' + (p + 1) + `:
` + this.lexer.showPosition() + `
Expecting ` + B.join(', ') + ", got '" + (this.terminals_[S] || S) + "'"
                        : 'Parse error on line ' + (p + 1) + ': Unexpected ' + (S == 1 ? 'end of input' : "'" + (this.terminals_[S] || S) + "'"), this.parseError(F, { text: this.lexer.match, token: this.terminals_[S] || S, line: this.lexer.yylineno, loc: x, expected: B })
                    }
                  } if (T[0] instanceof Array && T.length > 1) throw new Error('Parse Error: multiple actions possible at state: ' + A + ', token: ' + S); switch (T[0]) { case 1:u.push(S), g.push(this.lexer.yytext), i.push(this.lexer.yylloc), u.push(T[1]), S = null, D ? (S = D, D = null) : (b = this.lexer.yyleng, d = this.lexer.yytext, p = this.lexer.yylineno, x = this.lexer.yylloc, v > 0 && v--); break; case 2:if (L = this.productions_[T[1]][1], O.$ = g[g.length - L], O._$ = { first_line: i[i.length - (L || 1)].first_line, last_line: i[i.length - 1].last_line, first_column: i[i.length - (L || 1)].first_column, last_column: i[i.length - 1].last_column }, P && (O._$.range = [i[i.length - (L || 1)].range[0], i[i.length - 1].range[1]]), C = this.performAction.call(O, d, b, p, this.yy, T[1], g, i), typeof C !== 'undefined') return C; L && (u = u.slice(0, -1 * L * 2), g = g.slice(0, -1 * L), i = i.slice(0, -1 * L)), u.push(this.productions_[T[1]][0]), g.push(O.$), i.push(O._$), R = m[u[u.length - 2]][u[u.length - 1]], u.push(R); break; case 3:return !0 }
                } return !0
              }
            }; const c = (function () {
              const f = {
                EOF: 1,
                parseError: function (l, s) { if (!this.yy.parser) throw new Error(l); this.yy.parser.parseError(l, s) },
                setInput: function (l) { return this._input = l, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = '', this.conditionStack = ['INITIAL'], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this },
                input: function () { const l = this._input[0]; this.yytext += l, this.yyleng++, this.offset++, this.match += l, this.matched += l; const s = l.match(/(?:\r\n?|\n).*/g); return s ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), l },
                unput: function (l) { const s = l.length; const u = l.split(/(?:\r\n?|\n)/g); this._input = l + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - s - 1), this.offset -= s; const g = this.match.split(/(?:\r\n?|\n)/g); this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), u.length - 1 && (this.yylineno -= u.length - 1); const i = this.yylloc.range; return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: u ? (u.length === g.length ? this.yylloc.first_column : 0) + g[g.length - u.length].length - u[0].length : this.yylloc.first_column - s }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - s]), this },
                more: function () { return this._more = !0, this },
                less: function (l) { this.unput(this.match.slice(l)) },
                pastInput: function () { const l = this.matched.substr(0, this.matched.length - this.match.length); return (l.length > 20 ? '...' : '') + l.substr(-20).replace(/\n/g, '') },
                upcomingInput: function () { let l = this.match; return l.length < 20 && (l += this._input.substr(0, 20 - l.length)), (l.substr(0, 20) + (l.length > 20 ? '...' : '')).replace(/\n/g, '') },
                showPosition: function () {
                  const l = this.pastInput(); const s = new Array(l.length + 1).join('-'); return l + this.upcomingInput() + `
` + s + '^'
                },
                next: function () {
                  if (this.done) return this.EOF; this._input || (this.done = !0); let l, s, u, g, i; this._more || (this.yytext = '', this.match = ''); for (var m = this._currentRules(), d = 0; d < m.length && (u = this._input.match(this.rules[m[d]]), !u || s && !(u[0].length > s[0].length) || (s = u, g = d, this.options.flex)); d++);return s
                    ? (i = s[0].match(/(?:\r\n?|\n).*/g), i && (this.yylineno += i.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + s[0].length }, this.yytext += s[0], this.match += s[0], this.matches = s, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(s[0].length), this.matched += s[0], l = this.performAction.call(this, this.yy, this, m[g], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), l || void 0)
                    : this._input === ''
                      ? this.EOF
                      : this.parseError('Lexical error on line ' + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: '', token: null, line: this.yylineno })
                },
                lex: function () { const l = this.next(); return typeof l !== 'undefined' ? l : this.lex() },
                begin: function (l) { this.conditionStack.push(l) },
                popState: function () { return this.conditionStack.pop() },
                _currentRules: function () { return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules },
                topState: function () { return this.conditionStack[this.conditionStack.length - 2] },
                pushState: function (l) { this.begin(l) }
              }; return f.options = {}, f.performAction = function (l, s, u, g) { function i (m, d) { return s.yytext = s.yytext.substring(m, s.yyleng - d + m) } switch (u) { case 0:if (s.yytext.slice(-2) === '\\\\' ? (i(0, 1), this.begin('mu')) : s.yytext.slice(-1) === '\\' ? (i(0, 1), this.begin('emu')) : this.begin('mu'), s.yytext) return 15; break; case 1:return 15; case 2:return this.popState(), 15; case 3:return this.begin('raw'), 15; case 4:return this.popState(), this.conditionStack[this.conditionStack.length - 1] === 'raw' ? 15 : (i(5, 9), 'END_RAW_BLOCK'); case 5:return 15; case 6:return this.popState(), 14; case 7:return 65; case 8:return 68; case 9:return 19; case 10:return this.popState(), this.begin('raw'), 23; case 11:return 55; case 12:return 60; case 13:return 29; case 14:return 47; case 15:return this.popState(), 44; case 16:return this.popState(), 44; case 17:return 34; case 18:return 39; case 19:return 51; case 20:return 48; case 21:this.unput(s.yytext), this.popState(), this.begin('com'); break; case 22:return this.popState(), 14; case 23:return 48; case 24:return 73; case 25:return 72; case 26:return 72; case 27:return 87; case 28:break; case 29:return this.popState(), 54; case 30:return this.popState(), 33; case 31:return s.yytext = i(1, 2).replace(/\\"/g, '"'), 80; case 32:return s.yytext = i(1, 2).replace(/\\'/g, "'"), 80; case 33:return 85; case 34:return 82; case 35:return 82; case 36:return 83; case 37:return 84; case 38:return 81; case 39:return 75; case 40:return 77; case 41:return 72; case 42:return s.yytext = s.yytext.replace(/\\([\\\]])/g, '$1'), 72; case 43:return 'INVALID'; case 44:return 5 } }, f.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], f.conditions = { mu: { rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], inclusive: !1 }, emu: { rules: [2], inclusive: !1 }, com: { rules: [6], inclusive: !1 }, raw: { rules: [3, 4, 5], inclusive: !1 }, INITIAL: { rules: [0, 1, 44], inclusive: !0 } }, f
            }()); return n.lexer = c, r.prototype = n, n.Parser = r, new r()
          }()); a.default = h, y.exports = a.default
        }, function (y, a, h) { 'use strict'; function r () { const i = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0]; this.options = i } function n (i, m, d) { m === void 0 && (m = i.length); const p = i[m - 1]; const b = i[m - 2]; return p ? p.type === 'ContentStatement' ? (b || !d ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(p.original) : void 0 : d } function c (i, m, d) { m === void 0 && (m = -1); const p = i[m + 1]; const b = i[m + 2]; return p ? p.type === 'ContentStatement' ? (b || !d ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(p.original) : void 0 : d } function f (i, m, d) { const p = i[m == null ? 0 : m + 1]; if (p && p.type === 'ContentStatement' && (d || !p.rightStripped)) { const b = p.value; p.value = p.value.replace(d ? /^\s+/ : /^[ \t]*\r?\n?/, ''), p.rightStripped = p.value !== b } } function l (i, m, d) { const p = i[m == null ? i.length - 1 : m - 1]; if (p && p.type === 'ContentStatement' && (d || !p.leftStripped)) { const b = p.value; return p.value = p.value.replace(d ? /\s+$/ : /[ \t]+$/, ''), p.leftStripped = p.value !== b, p.leftStripped } } const s = h(1).default; a.__esModule = !0; const u = h(49); const g = s(u); r.prototype = new g.default(), r.prototype.Program = function (i) { const m = !this.options.ignoreStandalone; const d = !this.isRootSeen; this.isRootSeen = !0; for (let p = i.body, b = 0, v = p.length; b < v; b++) { const x = p[b]; const P = this.accept(x); if (P) { const S = n(p, b, d); const D = c(p, b, d); const A = P.openStandalone && S; const T = P.closeStandalone && D; const C = P.inlineStandalone && S && D; P.close && f(p, b, !0), P.open && l(p, b, !0), m && C && (f(p, b), l(p, b) && x.type === 'PartialStatement' && (x.indent = /([ \t]+$)/.exec(p[b - 1].original)[1])), m && A && (f((x.program || x.inverse).body), l(p, b)), m && T && (f(p, b), l((x.inverse || x.program).body)) } } return i }, r.prototype.BlockStatement = r.prototype.DecoratorBlock = r.prototype.PartialBlockStatement = function (i) { this.accept(i.program), this.accept(i.inverse); const m = i.program || i.inverse; const d = i.program && i.inverse; let p = d; let b = d; if (d && d.chained) for (p = d.body[0].program; b.chained;)b = b.body[b.body.length - 1].program; const v = { open: i.openStrip.open, close: i.closeStrip.close, openStandalone: c(m.body), closeStandalone: n((p || m).body) }; if (i.openStrip.close && f(m.body, null, !0), d) { const x = i.inverseStrip; x.open && l(m.body, null, !0), x.close && f(p.body, null, !0), i.closeStrip.open && l(b.body, null, !0), !this.options.ignoreStandalone && n(m.body) && c(p.body) && (l(m.body), f(p.body)) } else i.closeStrip.open && l(m.body, null, !0); return v }, r.prototype.Decorator = r.prototype.MustacheStatement = function (i) { return i.strip }, r.prototype.PartialStatement = r.prototype.CommentStatement = function (i) { const m = i.strip || {}; return { inlineStandalone: !0, open: m.open, close: m.close } }, a.default = r, y.exports = a.default }, function (y, a, h) { 'use strict'; function r () { this.parents = [] } function n (g) { this.acceptRequired(g, 'path'), this.acceptArray(g.params), this.acceptKey(g, 'hash') } function c (g) { n.call(this, g), this.acceptKey(g, 'program'), this.acceptKey(g, 'inverse') } function f (g) { this.acceptRequired(g, 'name'), this.acceptArray(g.params), this.acceptKey(g, 'hash') } const l = h(1).default; a.__esModule = !0; const s = h(6); const u = l(s); r.prototype = { constructor: r, mutating: !1, acceptKey: function (g, i) { const m = this.accept(g[i]); if (this.mutating) { if (m && !r.prototype[m.type]) throw new u.default('Unexpected node type "' + m.type + '" found when accepting ' + i + ' on ' + g.type); g[i] = m } }, acceptRequired: function (g, i) { if (this.acceptKey(g, i), !g[i]) throw new u.default(g.type + ' requires ' + i) }, acceptArray: function (g) { for (let i = 0, m = g.length; i < m; i++) this.acceptKey(g, i), g[i] || (g.splice(i, 1), i--, m--) }, accept: function (g) { if (g) { if (!this[g.type]) throw new u.default('Unknown type: ' + g.type, g); this.current && this.parents.unshift(this.current), this.current = g; const i = this[g.type](g); return this.current = this.parents.shift(), !this.mutating || i ? i : i !== !1 ? g : void 0 } }, Program: function (g) { this.acceptArray(g.body) }, MustacheStatement: n, Decorator: n, BlockStatement: c, DecoratorBlock: c, PartialStatement: f, PartialBlockStatement: function (g) { f.call(this, g), this.acceptKey(g, 'program') }, ContentStatement: function () {}, CommentStatement: function () {}, SubExpression: n, PathExpression: function () {}, StringLiteral: function () {}, NumberLiteral: function () {}, BooleanLiteral: function () {}, UndefinedLiteral: function () {}, NullLiteral: function () {}, Hash: function (g) { this.acceptArray(g.pairs) }, HashPair: function (g) { this.acceptRequired(g, 'value') } }, a.default = r, y.exports = a.default }, function (y, a, h) { 'use strict'; function r (x, P) { if (P = P.path ? P.path.original : P, x.path.original !== P) { const S = { loc: x.path.loc }; throw new v.default(x.path.original + " doesn't match " + P, S) } } function n (x, P) { this.source = x, this.start = { line: P.first_line, column: P.first_column }, this.end = { line: P.last_line, column: P.last_column } } function c (x) { return /^\[.*\]$/.test(x) ? x.substring(1, x.length - 1) : x } function f (x, P) { return { open: x.charAt(2) === '~', close: P.charAt(P.length - 3) === '~' } } function l (x) { return x.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '') } function s (x, P, S) { S = this.locInfo(S); for (var D = x ? '@' : '', A = [], T = 0, C = 0, N = P.length; C < N; C++) { const L = P[C].part; const R = P[C].original !== L; if (D += (P[C].separator || '') + L, R || L !== '..' && L !== '.' && L !== 'this')A.push(L); else { if (A.length > 0) throw new v.default('Invalid path: ' + D, { loc: S }); L === '..' && T++ } } return { type: 'PathExpression', data: x, depth: T, parts: A, original: D, loc: S } } function u (x, P, S, D, A, T) { const C = D.charAt(3) || D.charAt(2); const N = C !== '{' && C !== '&'; const L = /\*/.test(D); return { type: L ? 'Decorator' : 'MustacheStatement', path: x, params: P, hash: S, escaped: N, strip: A, loc: this.locInfo(T) } } function g (x, P, S, D) { r(x, S), D = this.locInfo(D); const A = { type: 'Program', body: P, strip: {}, loc: D }; return { type: 'BlockStatement', path: x.path, params: x.params, hash: x.hash, program: A, openStrip: {}, inverseStrip: {}, closeStrip: {}, loc: D } } function i (x, P, S, D, A, T) { D && D.path && r(x, D); const C = /\*/.test(x.open); P.blockParams = x.blockParams; let N = void 0; let L = void 0; if (S) { if (C) throw new v.default('Unexpected inverse block on decorator', S); S.chain && (S.program.body[0].closeStrip = D.strip), L = S.strip, N = S.program } return A && (A = N, N = P, P = A), { type: C ? 'DecoratorBlock' : 'BlockStatement', path: x.path, params: x.params, hash: x.hash, program: P, inverse: N, openStrip: x.strip, inverseStrip: L, closeStrip: D && D.strip, loc: this.locInfo(T) } } function m (x, P) { if (!P && x.length) { const S = x[0].loc; const D = x[x.length - 1].loc; S && D && (P = { source: S.source, start: { line: S.start.line, column: S.start.column }, end: { line: D.end.line, column: D.end.column } }) } return { type: 'Program', body: x, strip: {}, loc: P } } function d (x, P, S, D) { return r(x, S), { type: 'PartialBlockStatement', name: x.path, params: x.params, hash: x.hash, program: P, openStrip: x.strip, closeStrip: S && S.strip, loc: this.locInfo(D) } } const p = h(1).default; a.__esModule = !0, a.SourceLocation = n, a.id = c, a.stripFlags = f, a.stripComment = l, a.preparePath = s, a.prepareMustache = u, a.prepareRawBlock = g, a.prepareBlock = i, a.prepareProgram = m, a.preparePartialBlock = d; const b = h(6); var v = p(b) }, function (y, a, h) { 'use strict'; function r () {} function n (v, x, P) { if (v == null || typeof v !== 'string' && v.type !== 'Program') throw new i.default('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + v); x = x || {}, 'data' in x || (x.data = !0), x.compat && (x.useDepths = !0); const S = P.parse(v, x); const D = new P.Compiler().compile(S, x); return new P.JavaScriptCompiler().compile(D, x) } function c (v, x, P) { function S () { const T = P.parse(v, x); const C = new P.Compiler().compile(T, x); const N = new P.JavaScriptCompiler().compile(C, x, void 0, !0); return P.template(N) } function D (T, C) { return A || (A = S()), A.call(this, T, C) } if (x === void 0 && (x = {}), v == null || typeof v !== 'string' && v.type !== 'Program') throw new i.default('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + v); x = m.extend({}, x), 'data' in x || (x.data = !0), x.compat && (x.useDepths = !0); var A = void 0; return D._setup = function (T) { return A || (A = S()), A._setup(T) }, D._child = function (T, C, N, L) { return A || (A = S()), A._child(T, C, N, L) }, D } function f (v, x) { if (v === x) return !0; if (m.isArray(v) && m.isArray(x) && v.length === x.length) { for (let P = 0; P < v.length; P++) if (!f(v[P], x[P])) return !1; return !0 } } function l (v) { if (!v.path.parts) { const x = v.path; v.path = { type: 'PathExpression', data: !1, depth: 0, parts: [x.original + ''], original: x.original + '', loc: x.loc } } } const s = h(34).default; const u = h(1).default; a.__esModule = !0, a.Compiler = r, a.precompile = n, a.compile = c; const g = h(6); var i = u(g); var m = h(5); const d = h(45); const p = u(d); const b = [].slice; r.prototype = { compiler: r, equals: function (v) { let x = this.opcodes.length; if (v.opcodes.length !== x) return !1; for (var P = 0; P < x; P++) { const S = this.opcodes[P]; const D = v.opcodes[P]; if (S.opcode !== D.opcode || !f(S.args, D.args)) return !1 }x = this.children.length; for (var P = 0; P < x; P++) if (!this.children[P].equals(v.children[P])) return !1; return !0 }, guid: 0, compile: function (v, x) { return this.sourceNode = [], this.opcodes = [], this.children = [], this.options = x, this.stringParams = x.stringParams, this.trackIds = x.trackIds, x.blockParams = x.blockParams || [], x.knownHelpers = m.extend(s(null), { helperMissing: !0, blockHelperMissing: !0, each: !0, if: !0, unless: !0, with: !0, log: !0, lookup: !0 }, x.knownHelpers), this.accept(v) }, compileProgram: function (v) { const x = new this.compiler(); const P = x.compile(v, this.options); const S = this.guid++; return this.usePartial = this.usePartial || P.usePartial, this.children[S] = P, this.useDepths = this.useDepths || P.useDepths, S }, accept: function (v) { if (!this[v.type]) throw new i.default('Unknown type: ' + v.type, v); this.sourceNode.unshift(v); const x = this[v.type](v); return this.sourceNode.shift(), x }, Program: function (v) { this.options.blockParams.unshift(v.blockParams); for (var x = v.body, P = x.length, S = 0; S < P; S++) this.accept(x[S]); return this.options.blockParams.shift(), this.isSimple = P === 1, this.blockParams = v.blockParams ? v.blockParams.length : 0, this }, BlockStatement: function (v) { l(v); let x = v.program; let P = v.inverse; x = x && this.compileProgram(x), P = P && this.compileProgram(P); const S = this.classifySexpr(v); S === 'helper' ? this.helperSexpr(v, x, P) : S === 'simple' ? (this.simpleSexpr(v), this.opcode('pushProgram', x), this.opcode('pushProgram', P), this.opcode('emptyHash'), this.opcode('blockValue', v.path.original)) : (this.ambiguousSexpr(v, x, P), this.opcode('pushProgram', x), this.opcode('pushProgram', P), this.opcode('emptyHash'), this.opcode('ambiguousBlockValue')), this.opcode('append') }, DecoratorBlock: function (v) { const x = v.program && this.compileProgram(v.program); const P = this.setupFullMustacheParams(v, x, void 0); const S = v.path; this.useDecorators = !0, this.opcode('registerDecorator', P.length, S.original) }, PartialStatement: function (v) { this.usePartial = !0; let x = v.program; x && (x = this.compileProgram(v.program)); const P = v.params; if (P.length > 1) throw new i.default('Unsupported number of partial arguments: ' + P.length, v); P.length || (this.options.explicitPartialContext ? this.opcode('pushLiteral', 'undefined') : P.push({ type: 'PathExpression', parts: [], depth: 0 })); const S = v.name.original; const D = v.name.type === 'SubExpression'; D && this.accept(v.name), this.setupFullMustacheParams(v, x, void 0, !0); let A = v.indent || ''; this.options.preventIndent && A && (this.opcode('appendContent', A), A = ''), this.opcode('invokePartial', D, S, A), this.opcode('append') }, PartialBlockStatement: function (v) { this.PartialStatement(v) }, MustacheStatement: function (v) { this.SubExpression(v), v.escaped && !this.options.noEscape ? this.opcode('appendEscaped') : this.opcode('append') }, Decorator: function (v) { this.DecoratorBlock(v) }, ContentStatement: function (v) { v.value && this.opcode('appendContent', v.value) }, CommentStatement: function () {}, SubExpression: function (v) { l(v); const x = this.classifySexpr(v); x === 'simple' ? this.simpleSexpr(v) : x === 'helper' ? this.helperSexpr(v) : this.ambiguousSexpr(v) }, ambiguousSexpr: function (v, x, P) { const S = v.path; const D = S.parts[0]; const A = x != null || P != null; this.opcode('getContext', S.depth), this.opcode('pushProgram', x), this.opcode('pushProgram', P), S.strict = !0, this.accept(S), this.opcode('invokeAmbiguous', D, A) }, simpleSexpr: function (v) { const x = v.path; x.strict = !0, this.accept(x), this.opcode('resolvePossibleLambda') }, helperSexpr: function (v, x, P) { const S = this.setupFullMustacheParams(v, x, P); const D = v.path; const A = D.parts[0]; if (this.options.knownHelpers[A]) this.opcode('invokeKnownHelper', S.length, A); else { if (this.options.knownHelpersOnly) throw new i.default('You specified knownHelpersOnly, but used the unknown helper ' + A, v); D.strict = !0, D.falsy = !0, this.accept(D), this.opcode('invokeHelper', S.length, D.original, p.default.helpers.simpleId(D)) } }, PathExpression: function (v) { this.addDepth(v.depth), this.opcode('getContext', v.depth); const x = v.parts[0]; const P = p.default.helpers.scopedId(v); const S = !v.depth && !P && this.blockParamIndex(x); S ? this.opcode('lookupBlockParam', S, v.parts) : x ? v.data ? (this.options.data = !0, this.opcode('lookupData', v.depth, v.parts, v.strict)) : this.opcode('lookupOnContext', v.parts, v.falsy, v.strict, P) : this.opcode('pushContext') }, StringLiteral: function (v) { this.opcode('pushString', v.value) }, NumberLiteral: function (v) { this.opcode('pushLiteral', v.value) }, BooleanLiteral: function (v) { this.opcode('pushLiteral', v.value) }, UndefinedLiteral: function () { this.opcode('pushLiteral', 'undefined') }, NullLiteral: function () { this.opcode('pushLiteral', 'null') }, Hash: function (v) { const x = v.pairs; let P = 0; const S = x.length; for (this.opcode('pushHash'); P < S; P++) this.pushParam(x[P].value); for (;P--;) this.opcode('assignToHash', x[P].key); this.opcode('popHash') }, opcode: function (v) { this.opcodes.push({ opcode: v, args: b.call(arguments, 1), loc: this.sourceNode[0].loc }) }, addDepth: function (v) { v && (this.useDepths = !0) }, classifySexpr: function (v) { const x = p.default.helpers.simpleId(v.path); const P = x && !!this.blockParamIndex(v.path.parts[0]); let S = !P && p.default.helpers.helperExpression(v); let D = !P && (S || x); if (D && !S) { const A = v.path.parts[0]; const T = this.options; T.knownHelpers[A] ? S = !0 : T.knownHelpersOnly && (D = !1) } return S ? 'helper' : D ? 'ambiguous' : 'simple' }, pushParams: function (v) { for (let x = 0, P = v.length; x < P; x++) this.pushParam(v[x]) }, pushParam: function (v) { let x = v.value != null ? v.value : v.original || ''; if (this.stringParams)x.replace && (x = x.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.')), v.depth && this.addDepth(v.depth), this.opcode('getContext', v.depth || 0), this.opcode('pushStringParam', x, v.type), v.type === 'SubExpression' && this.accept(v); else { if (this.trackIds) { let P = void 0; if (!v.parts || p.default.helpers.scopedId(v) || v.depth || (P = this.blockParamIndex(v.parts[0])), P) { const S = v.parts.slice(1).join('.'); this.opcode('pushId', 'BlockParam', P, S) } else x = v.original || x, x.replace && (x = x.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '')), this.opcode('pushId', v.type, x) } this.accept(v) } }, setupFullMustacheParams: function (v, x, P, S) { const D = v.params; return this.pushParams(D), this.opcode('pushProgram', x), this.opcode('pushProgram', P), v.hash ? this.accept(v.hash) : this.opcode('emptyHash', S), D }, blockParamIndex: function (v) { for (let x = 0, P = this.options.blockParams.length; x < P; x++) { const S = this.options.blockParams[x]; const D = S && m.indexOf(S, v); if (S && D >= 0) return [x, D] } } } }, function (y, a, h) {
          'use strict'; function r (p) { this.value = p } function n () {} function c (p, b, v, x) { let P = b.popStack(); let S = 0; let D = v.length; for (p && D--; S < D; S++)P = b.nameLookup(P, v[S], x); return p ? [b.aliasable('container.strict'), '(', P, ', ', b.quotedString(v[S]), ', ', JSON.stringify(b.source.currentLocation), ' )'] : P } const f = h(13).default; const l = h(1).default; a.__esModule = !0; const s = h(4); const u = h(6); const g = l(u); const i = h(5); const m = h(53); const d = l(m); n.prototype = {
            nameLookup: function (p, b) { return this.internalNameLookup(p, b) },
            depthedLookup: function (p) { return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(p), ')'] },
            compilerInfo: function () { const p = s.COMPILER_REVISION; const b = s.REVISION_CHANGES[p]; return [p, b] },
            appendToBuffer: function (p, b, v) { return i.isArray(p) || (p = [p]), p = this.source.wrap(p, b), this.environment.isSimple ? ['return ', p, ';'] : v ? ['buffer += ', p, ';'] : (p.appendToBuffer = !0, p) },
            initializeBuffer: function () { return this.quotedString('') },
            internalNameLookup: function (p, b) { return this.lookupPropertyFunctionIsUsed = !0, ['lookupProperty(', p, ',', JSON.stringify(b), ')'] },
            lookupPropertyFunctionIsUsed: !1,
            compile: function (p, b, v, x) {
              this.environment = p, this.options = b, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !x, this.name = this.environment.name, this.isChild = !!v, this.context = v || { decorators: [], programs: [], environments: [] }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = { list: [] }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(p, b), this.useDepths = this.useDepths || p.useDepths || p.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || p.useBlockParams; const P = p.opcodes; let S = void 0; let D = void 0; let A = void 0; let T = void 0; for (A = 0, T = P.length; A < T; A++)S = P[A], this.source.currentLocation = S.loc, D = D || S.loc, this[S.opcode].apply(this, S.args); if (this.source.currentLocation = D, this.pushSource(''), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new g.default('Compile completed with content left on stack'); this.decorators.isEmpty()
                ? this.decorators = void 0
                : (this.useDecorators = !0, this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), `;
`]), this.decorators.push('return fn;'), x
                    ? this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()])
                    : (this.decorators.prepend(`function(fn, props, container, depth0, data, blockParams, depths) {
`), this.decorators.push(`}
`), this.decorators = this.decorators.merge())); const C = this.createFunctionContext(x); if (this.isChild) return C; let N = { compiler: this.compilerInfo(), main: C }; this.decorators && (N.main_d = this.decorators, N.useDecorators = !0); const L = this.context; const R = L.programs; const B = L.decorators; for (A = 0, T = R.length; A < T; A++)R[A] && (N[A] = R[A], B[A] && (N[A + '_d'] = B[A], N.useDecorators = !0)); return this.environment.usePartial && (N.usePartial = !0), this.options.data && (N.useData = !0), this.useDepths && (N.useDepths = !0), this.useBlockParams && (N.useBlockParams = !0), this.options.compat && (N.compat = !0), x ? N.compilerOptions = this.options : (N.compiler = JSON.stringify(N.compiler), this.source.currentLocation = { start: { line: 1, column: 0 } }, N = this.objectLiteral(N), b.srcName ? (N = N.toStringWithSourceMap({ file: b.destName }), N.map = N.map && N.map.toString()) : N = N.toString()), N
            },
            preamble: function () { this.lastContext = 0, this.source = new d.default(this.options.srcName), this.decorators = new d.default(this.options.srcName) },
            createFunctionContext: function (p) {
              const b = this; let v = ''; const x = this.stackVars.concat(this.registers.list); x.length > 0 && (v += ', ' + x.join(', ')); let P = 0; f(this.aliases).forEach(function (A) { const T = b.aliases[A]; T.children && T.referenceCount > 1 && (v += ', alias' + ++P + '=' + A, T.children[0] = 'alias' + P) }), this.lookupPropertyFunctionIsUsed && (v += ', ' + this.lookupPropertyFunctionVarDeclaration()); const S = ['container', 'depth0', 'helpers', 'partials', 'data']; (this.useBlockParams || this.useDepths) && S.push('blockParams'), this.useDepths && S.push('depths'); const D = this.mergeSource(v); return p
                ? (S.push(D), Function.apply(this, S))
                : this.source.wrap(['function(', S.join(','), `) {
  `, D, '}'])
            },
            mergeSource: function (p) {
              const b = this.environment.isSimple; let v = !this.forceBuffer; let x = void 0; let P = void 0; let S = void 0; let D = void 0; return this.source.each(function (A) { A.appendToBuffer ? (S ? A.prepend('  + ') : S = A, D = A) : (S && (P ? S.prepend('buffer += ') : x = !0, D.add(';'), S = D = void 0), P = !0, b || (v = !1)) }), v ? S ? (S.prepend('return '), D.add(';')) : P || this.source.push('return "";') : (p += ', buffer = ' + (x ? '' : this.initializeBuffer()), S ? (S.prepend('return buffer + '), D.add(';')) : this.source.push('return buffer;')), p && this.source.prepend('var ' + p.substring(2) + (x
                ? ''
                : `;
`)), this.source.merge()
            },
            lookupPropertyFunctionVarDeclaration: function () {
              return `
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }
    `.trim()
            },
            blockValue: function (p) { const b = this.aliasable('container.hooks.blockHelperMissing'); const v = [this.contextName(0)]; this.setupHelperArgs(p, 0, v); const x = this.popStack(); v.splice(1, 0, x), this.push(this.source.functionCall(b, 'call', v)) },
            ambiguousBlockValue: function () { const p = this.aliasable('container.hooks.blockHelperMissing'); const b = [this.contextName(0)]; this.setupHelperArgs('', 0, b, !0), this.flushInline(); const v = this.topStack(); b.splice(1, 0, v), this.pushSource(['if (!', this.lastHelper, ') { ', v, ' = ', this.source.functionCall(p, 'call', b), '}']) },
            appendContent: function (p) { this.pendingContent ? p = this.pendingContent + p : this.pendingLocation = this.source.currentLocation, this.pendingContent = p },
            append: function () { if (this.isInline()) this.replaceStack(function (b) { return [' != null ? ', b, ' : ""'] }), this.pushSource(this.appendToBuffer(this.popStack())); else { const p = this.popStack(); this.pushSource(['if (', p, ' != null) { ', this.appendToBuffer(p, void 0, !0), ' }']), this.environment.isSimple && this.pushSource(['else { ', this.appendToBuffer("''", void 0, !0), ' }']) } },
            appendEscaped: function () { this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')'])) },
            getContext: function (p) { this.lastContext = p },
            pushContext: function () { this.pushStackLiteral(this.contextName(this.lastContext)) },
            lookupOnContext: function (p, b, v, x) { let P = 0; x || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(p[P++])), this.resolvePath('context', p, P, b, v) },
            lookupBlockParam: function (p, b) { this.useBlockParams = !0, this.push(['blockParams[', p[0], '][', p[1], ']']), this.resolvePath('context', b, 1) },
            lookupData: function (p, b, v) { p ? this.pushStackLiteral('container.data(data, ' + p + ')') : this.pushStackLiteral('data'), this.resolvePath('data', b, 0, !0, v) },
            resolvePath: function (p, b, v, x, P) { const S = this; if (this.options.strict || this.options.assumeObjects) return void this.push(c(this.options.strict && P, this, b, p)); for (let D = b.length; v < D; v++) this.replaceStack(function (A) { const T = S.nameLookup(A, b[v], p); return x ? [' && ', T] : [' != null ? ', T, ' : ', A] }) },
            resolvePossibleLambda: function () { this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']) },
            pushStringParam: function (p, b) { this.pushContext(), this.pushString(b), b !== 'SubExpression' && (typeof p === 'string' ? this.pushString(p) : this.pushStackLiteral(p)) },
            emptyHash: function (p) { this.trackIds && this.push('{}'), this.stringParams && (this.push('{}'), this.push('{}')), this.pushStackLiteral(p ? 'undefined' : '{}') },
            pushHash: function () { this.hash && this.hashes.push(this.hash), this.hash = { values: {}, types: [], contexts: [], ids: [] } },
            popHash: function () { const p = this.hash; this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(p.ids)), this.stringParams && (this.push(this.objectLiteral(p.contexts)), this.push(this.objectLiteral(p.types))), this.push(this.objectLiteral(p.values)) },
            pushString: function (p) { this.pushStackLiteral(this.quotedString(p)) },
            pushLiteral: function (p) { this.pushStackLiteral(p) },
            pushProgram: function (p) { p != null ? this.pushStackLiteral(this.programExpression(p)) : this.pushStackLiteral(null) },
            registerDecorator: function (p, b) { const v = this.nameLookup('decorators', b, 'decorator'); const x = this.setupHelperArgs(b, p); this.decorators.push(['fn = ', this.decorators.functionCall(v, '', ['fn', 'props', 'container', x]), ' || fn;']) },
            invokeHelper: function (p, b, v) { const x = this.popStack(); const P = this.setupHelper(p, b); const S = []; v && S.push(P.name), S.push(x), this.options.strict || S.push(this.aliasable('container.hooks.helperMissing')); const D = ['(', this.itemsSeparatedBy(S, '||'), ')']; const A = this.source.functionCall(D, 'call', P.callParams); this.push(A) },
            itemsSeparatedBy: function (p, b) { const v = []; v.push(p[0]); for (let x = 1; x < p.length; x++)v.push(b, p[x]); return v },
            invokeKnownHelper: function (p, b) { const v = this.setupHelper(p, b); this.push(this.source.functionCall(v.name, 'call', v.callParams)) },
            invokeAmbiguous: function (p, b) { this.useRegister('helper'); const v = this.popStack(); this.emptyHash(); const x = this.setupHelper(0, p, b); const P = this.lastHelper = this.nameLookup('helpers', p, 'helper'); const S = ['(', '(helper = ', P, ' || ', v, ')']; this.options.strict || (S[0] = '(helper = ', S.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'))), this.push(['(', S, x.paramsInit ? ['),(', x.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', x.callParams), ' : helper))']) },
            invokePartial: function (p, b, v) { const x = []; let P = this.setupParams(b, 1, x); p && (b = this.popStack(), delete P.name), v && (P.indent = JSON.stringify(v)), P.helpers = 'helpers', P.partials = 'partials', P.decorators = 'container.decorators', p ? x.unshift(b) : x.unshift(this.nameLookup('partials', b, 'partial')), this.options.compat && (P.depths = 'depths'), P = this.objectLiteral(P), x.push(P), this.push(this.source.functionCall('container.invokePartial', '', x)) },
            assignToHash: function (p) { const b = this.popStack(); let v = void 0; let x = void 0; let P = void 0; this.trackIds && (P = this.popStack()), this.stringParams && (x = this.popStack(), v = this.popStack()); const S = this.hash; v && (S.contexts[p] = v), x && (S.types[p] = x), P && (S.ids[p] = P), S.values[p] = b },
            pushId: function (p, b, v) { p === 'BlockParam' ? this.pushStackLiteral('blockParams[' + b[0] + '].path[' + b[1] + ']' + (v ? ' + ' + JSON.stringify('.' + v) : '')) : p === 'PathExpression' ? this.pushString(b) : p === 'SubExpression' ? this.pushStackLiteral('true') : this.pushStackLiteral('null') },
            compiler: n,
            compileChildren: function (p, b) { for (let v = p.children, x = void 0, P = void 0, S = 0, D = v.length; S < D; S++) { x = v[S], P = new this.compiler(); const A = this.matchExistingProgram(x); if (A == null) { this.context.programs.push(''); const T = this.context.programs.length; x.index = T, x.name = 'program' + T, this.context.programs[T] = P.compile(x, b, this.context, !this.precompile), this.context.decorators[T] = P.decorators, this.context.environments[T] = x, this.useDepths = this.useDepths || P.useDepths, this.useBlockParams = this.useBlockParams || P.useBlockParams, x.useDepths = this.useDepths, x.useBlockParams = this.useBlockParams } else x.index = A.index, x.name = 'program' + A.index, this.useDepths = this.useDepths || A.useDepths, this.useBlockParams = this.useBlockParams || A.useBlockParams } },
            matchExistingProgram: function (p) { for (let b = 0, v = this.context.environments.length; b < v; b++) { const x = this.context.environments[b]; if (x && x.equals(p)) return x } },
            programExpression: function (p) { const b = this.environment.children[p]; const v = [b.index, 'data', b.blockParams]; return (this.useBlockParams || this.useDepths) && v.push('blockParams'), this.useDepths && v.push('depths'), 'container.program(' + v.join(', ') + ')' },
            useRegister: function (p) { this.registers[p] || (this.registers[p] = !0, this.registers.list.push(p)) },
            push: function (p) { return p instanceof r || (p = this.source.wrap(p)), this.inlineStack.push(p), p },
            pushStackLiteral: function (p) { this.push(new r(p)) },
            pushSource: function (p) { this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), p && this.source.push(p) },
            replaceStack: function (p) { let b = ['(']; let v = void 0; let x = void 0; let P = void 0; if (!this.isInline()) throw new g.default('replaceStack on non-inline'); const S = this.popStack(!0); if (S instanceof r)v = [S.value], b = ['(', v], P = !0; else { x = !0; const D = this.incrStack(); b = ['((', this.push(D), ' = ', S, ')'], v = this.topStack() } const A = p.call(this, v); P || this.popStack(), x && this.stackSlot--, this.push(b.concat(A, ')')) },
            incrStack: function () { return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push('stack' + this.stackSlot), this.topStackName() },
            topStackName: function () { return 'stack' + this.stackSlot },
            flushInline: function () { const p = this.inlineStack; this.inlineStack = []; for (let b = 0, v = p.length; b < v; b++) { const x = p[b]; if (x instanceof r) this.compileStack.push(x); else { const P = this.incrStack(); this.pushSource([P, ' = ', x, ';']), this.compileStack.push(P) } } },
            isInline: function () { return this.inlineStack.length },
            popStack: function (p) { const b = this.isInline(); const v = (b ? this.inlineStack : this.compileStack).pop(); if (!p && v instanceof r) return v.value; if (!b) { if (!this.stackSlot) throw new g.default('Invalid stack pop'); this.stackSlot-- } return v },
            topStack: function () { const p = this.isInline() ? this.inlineStack : this.compileStack; const b = p[p.length - 1]; return b instanceof r ? b.value : b },
            contextName: function (p) { return this.useDepths && p ? 'depths[' + p + ']' : 'depth' + p },
            quotedString: function (p) { return this.source.quotedString(p) },
            objectLiteral: function (p) { return this.source.objectLiteral(p) },
            aliasable: function (p) { let b = this.aliases[p]; return b ? (b.referenceCount++, b) : (b = this.aliases[p] = this.source.wrap(p), b.aliasable = !0, b.referenceCount = 1, b) },
            setupHelper: function (p, b, v) { const x = []; const P = this.setupHelperArgs(b, p, x, v); const S = this.nameLookup('helpers', b, 'helper'); const D = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})'); return { params: x, paramsInit: P, name: S, callParams: [D].concat(x) } },
            setupParams: function (p, b, v) { const x = {}; const P = []; const S = []; const D = []; const A = !v; let T = void 0; A && (v = []), x.name = this.quotedString(p), x.hash = this.popStack(), this.trackIds && (x.hashIds = this.popStack()), this.stringParams && (x.hashTypes = this.popStack(), x.hashContexts = this.popStack()); const C = this.popStack(); const N = this.popStack(); (N || C) && (x.fn = N || 'container.noop', x.inverse = C || 'container.noop'); for (let L = b; L--;)T = this.popStack(), v[L] = T, this.trackIds && (D[L] = this.popStack()), this.stringParams && (S[L] = this.popStack(), P[L] = this.popStack()); return A && (x.args = this.source.generateArray(v)), this.trackIds && (x.ids = this.source.generateArray(D)), this.stringParams && (x.types = this.source.generateArray(S), x.contexts = this.source.generateArray(P)), this.options.data && (x.data = 'data'), this.useBlockParams && (x.blockParams = 'blockParams'), x },
            setupHelperArgs: function (p, b, v, x) { let P = this.setupParams(p, b, v); return P.loc = JSON.stringify(this.source.currentLocation), P = this.objectLiteral(P), x ? (this.useRegister('options'), v.push('options'), ['options=', P]) : v ? (v.push(P), '') : P }
          }, (function () { for (let p = 'break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false'.split(' '), b = n.RESERVED_WORDS = {}, v = 0, x = p.length; v < x; v++)b[p[v]] = !0 }()), n.isValidJavaScriptVariableName = function (p) { return !n.RESERVED_WORDS[p] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(p) }, a.default = n, y.exports = a.default
        }, function (y, a, h) {
          'use strict'; function r (s, u, g) { if (f.isArray(s)) { for (var i = [], m = 0, d = s.length; m < d; m++)i.push(u.wrap(s[m], g)); return i } return typeof s === 'boolean' || typeof s === 'number' ? s + '' : s } function n (s) { this.srcFile = s, this.source = [] } const c = h(13).default; a.__esModule = !0; var f = h(5); let l = void 0; try {} catch (s) {}l || (l = function (s, u, g, i) { this.src = '', i && this.add(i) }, l.prototype = { add: function (s) { f.isArray(s) && (s = s.join('')), this.src += s }, prepend: function (s) { f.isArray(s) && (s = s.join('')), this.src = s + this.src }, toStringWithSourceMap: function () { return { code: this.toString() } }, toString: function () { return this.src } }), n.prototype = {
            isEmpty: function () { return !this.source.length },
            prepend: function (s, u) { this.source.unshift(this.wrap(s, u)) },
            push: function (s, u) { this.source.push(this.wrap(s, u)) },
            merge: function () {
              const s = this.empty(); return this.each(function (u) {
                s.add(['  ', u, `
`])
              }), s
            },
            each: function (s) { for (let u = 0, g = this.source.length; u < g; u++)s(this.source[u]) },
            empty: function () { const s = this.currentLocation || { start: {} }; return new l(s.start.line, s.start.column, this.srcFile) },
            wrap: function (s) { const u = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1]; return s instanceof l ? s : (s = r(s, this, u), new l(u.start.line, u.start.column, this.srcFile, s)) },
            functionCall: function (s, u, g) { return g = this.generateList(g), this.wrap([s, u ? '.' + u + '(' : '(', g, ')']) },
            quotedString: function (s) { return '"' + (s + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + '"' },
            objectLiteral: function (s) { const u = this; const g = []; c(s).forEach(function (m) { const d = r(s[m], u); d !== 'undefined' && g.push([u.quotedString(m), ':', d]) }); const i = this.generateList(g); return i.prepend('{'), i.add('}'), i },
            generateList: function (s) { for (var u = this.empty(), g = 0, i = s.length; g < i; g++)g && u.add(','), u.add(r(s[g], this)); return u },
            generateArray: function (s) { const u = this.generateList(s); return u.prepend('['), u.add(']'), u }
          }, a.default = n, y.exports = a.default
        }]))
      })
    },
    9414: (w, y, a) => {
      let h;/*!
* Sizzle CSS Selector Engine v2.3.6
* https://sizzlejs.com/
*
* Copyright JS Foundation and other contributors
* Released under the MIT license
* https://js.foundation/
*
* Date: 2021-02-16
*/(function (r) { let n; let c; let f; let l; let s; let u; let g; let i; let m; let d; let p; let b; let v; let x; let P; let S; let D; let A; let T; const C = 'sizzle' + 1 * new Date(); const N = r.document; let L = 0; let R = 0; const B = tn(); const O = tn(); const F = tn(); const q = tn(); let _ = function (j, U) { return j === U && (p = !0), 0 }; const W = {}.hasOwnProperty; let H = []; const $ = H.pop; const K = H.push; let te = H.push; const oe = H.slice; const he = function (j, U) { for (let G = 0, re = j.length; G < re; G++) if (j[G] === U) return G; return -1 }; const Q = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'; const ye = '[\\x20\\t\\r\\n\\f]'; const Ae = '(?:\\\\[\\da-fA-F]{1,6}' + ye + '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+'; const Ke = '\\[' + ye + '*(' + Ae + ')(?:' + ye + '*([*^$|!~]?=)' + ye + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + Ae + '))|)' + ye + '*\\]'; const mt = ':(' + Ae + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + Ke + ')*)|.*)\\)|)'; const kt = new RegExp(ye + '+', 'g'); const Rt = new RegExp('^' + ye + '+|((?:^|[^\\\\])(?:\\\\.)*)' + ye + '+$', 'g'); const Lt = new RegExp('^' + ye + '*,' + ye + '*'); const Wt = new RegExp('^' + ye + '*([>+~]|' + ye + ')' + ye + '*'); const ze = new RegExp(ye + '|>'); const Mt = new RegExp(mt); const Ve = new RegExp('^' + Ae + '$'); const et = { ID: new RegExp('^#(' + Ae + ')'), CLASS: new RegExp('^\\.(' + Ae + ')'), TAG: new RegExp('^(' + Ae + '|[*])'), ATTR: new RegExp('^' + Ke), PSEUDO: new RegExp('^' + mt), CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + ye + '*(even|odd|(([+-]|)(\\d*)n|)' + ye + '*(?:([+-]|)' + ye + '*(\\d+)|))' + ye + '*\\)|)', 'i'), bool: new RegExp('^(?:' + Q + ')$', 'i'), needsContext: new RegExp('^' + ye + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + ye + '*((?:-\\d)?\\d*)' + ye + '*\\)|)(?=[^-]|$)', 'i') }; const Kt = /HTML$/i; const Mn = /^(?:input|select|textarea|button)$/i; const At = /^h\d$/i; const $t = /^[^{]+\{\s*\[native \w/; const vn = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/; const jt = /[+~]/; const lt = new RegExp('\\\\[\\da-fA-F]{1,6}' + ye + '?|\\\\([^\\r\\n\\f])', 'g'); const pt = function (j, U) { const G = '0x' + j.slice(1) - 65536; return U || (G < 0 ? String.fromCharCode(G + 65536) : String.fromCharCode(G >> 10 | 55296, G & 1023 | 56320)) }; const Cn = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g; const nr = function (j, U) { return U ? j === '\0' ? '\uFFFD' : j.slice(0, -1) + '\\' + j.charCodeAt(j.length - 1).toString(16) + ' ' : '\\' + j }; const en = function () { b() }; const vr = Ne(function (j) { return j.disabled === !0 && j.nodeName.toLowerCase() === 'fieldset' }, { dir: 'parentNode', next: 'legend' }); try { te.apply(H = oe.call(N.childNodes), N.childNodes), H[N.childNodes.length].nodeType } catch (j) { te = { apply: H.length ? function (U, G) { K.apply(U, oe.call(G)) } : function (U, G) { for (var re = U.length, Y = 0; U[re++] = G[Y++];);U.length = re - 1 } } } function tt (j, U, G, re) { let Y; let ie; let ae; let be; let Se; let Be; let Ie; let _e = U && U.ownerDocument; const Ye = U ? U.nodeType : 9; if (G = G || [], typeof j !== 'string' || !j || Ye !== 1 && Ye !== 9 && Ye !== 11) return G; if (!re && (b(U), U = U || v, P)) { if (Ye !== 11 && (Se = vn.exec(j))) if (Y = Se[1]) { if (Ye === 9) if (ae = U.getElementById(Y)) { if (ae.id === Y) return G.push(ae), G } else return G; else if (_e && (ae = _e.getElementById(Y)) && T(U, ae) && ae.id === Y) return G.push(ae), G } else { if (Se[2]) return te.apply(G, U.getElementsByTagName(j)), G; if ((Y = Se[3]) && c.getElementsByClassName && U.getElementsByClassName) return te.apply(G, U.getElementsByClassName(Y)), G } if (c.qsa && !q[j + ' '] && (!S || !S.test(j)) && (Ye !== 1 || U.nodeName.toLowerCase() !== 'object')) { if (Ie = j, _e = U, Ye === 1 && (ze.test(j) || Wt.test(j))) { for (_e = jt.test(j) && xe(U.parentNode) || U, (_e !== U || !c.scope) && ((be = U.getAttribute('id')) ? be = be.replace(Cn, nr) : U.setAttribute('id', be = C)), Be = u(j), ie = Be.length; ie--;)Be[ie] = (be ? '#' + be : ':scope') + ' ' + Fe(Be[ie]); Ie = Be.join(',') } try { return te.apply(G, _e.querySelectorAll(Ie)), G } catch (ot) { q(j, !0) } finally { be === C && U.removeAttribute('id') } } } return i(j.replace(Rt, '$1'), U, G, re) } function tn () { const j = []; function U (G, re) { return j.push(G + ' ') > f.cacheLength && delete U[j.shift()], U[G + ' '] = re } return U } function _t (j) { return j[C] = !0, j } function pe (j) { let U = v.createElement('fieldset'); try { return !!j(U) } catch (G) { return !1 } finally { U.parentNode && U.parentNode.removeChild(U), U = null } } function Z (j, U) { for (let G = j.split('|'), re = G.length; re--;)f.attrHandle[G[re]] = U } function de (j, U) { let G = U && j; const re = G && j.nodeType === 1 && U.nodeType === 1 && j.sourceIndex - U.sourceIndex; if (re) return re; if (G) { for (;G = G.nextSibling;) if (G === U) return -1 } return j ? 1 : -1 } function Pe (j) { return function (U) { const G = U.nodeName.toLowerCase(); return G === 'input' && U.type === j } } function ne (j) { return function (U) { const G = U.nodeName.toLowerCase(); return (G === 'input' || G === 'button') && U.type === j } } function me (j) { return function (U) { return 'form' in U ? U.parentNode && U.disabled === !1 ? 'label' in U ? 'label' in U.parentNode ? U.parentNode.disabled === j : U.disabled === j : U.isDisabled === j || U.isDisabled !== !j && vr(U) === j : U.disabled === j : 'label' in U ? U.disabled === j : !1 } } function fe (j) { return _t(function (U) { return U = +U, _t(function (G, re) { for (var Y, ie = j([], G.length, U), ae = ie.length; ae--;)G[Y = ie[ae]] && (G[Y] = !(re[Y] = G[Y])) }) }) } function xe (j) { return j && typeof j.getElementsByTagName !== 'undefined' && j }c = tt.support = {}, s = tt.isXML = function (j) { const U = j && j.namespaceURI; const G = j && (j.ownerDocument || j).documentElement; return !Kt.test(U || G && G.nodeName || 'HTML') }, b = tt.setDocument = function (j) { let U; let G; const re = j ? j.ownerDocument || j : N; return re == v || re.nodeType !== 9 || !re.documentElement || (v = re, x = v.documentElement, P = !s(v), N != v && (G = v.defaultView) && G.top !== G && (G.addEventListener ? G.addEventListener('unload', en, !1) : G.attachEvent && G.attachEvent('onunload', en)), c.scope = pe(function (Y) { return x.appendChild(Y).appendChild(v.createElement('div')), typeof Y.querySelectorAll !== 'undefined' && !Y.querySelectorAll(':scope fieldset div').length }), c.attributes = pe(function (Y) { return Y.className = 'i', !Y.getAttribute('className') }), c.getElementsByTagName = pe(function (Y) { return Y.appendChild(v.createComment('')), !Y.getElementsByTagName('*').length }), c.getElementsByClassName = $t.test(v.getElementsByClassName), c.getById = pe(function (Y) { return x.appendChild(Y).id = C, !v.getElementsByName || !v.getElementsByName(C).length }), c.getById ? (f.filter.ID = function (Y) { const ie = Y.replace(lt, pt); return function (ae) { return ae.getAttribute('id') === ie } }, f.find.ID = function (Y, ie) { if (typeof ie.getElementById !== 'undefined' && P) { const ae = ie.getElementById(Y); return ae ? [ae] : [] } }) : (f.filter.ID = function (Y) { const ie = Y.replace(lt, pt); return function (ae) { const be = typeof ae.getAttributeNode !== 'undefined' && ae.getAttributeNode('id'); return be && be.value === ie } }, f.find.ID = function (Y, ie) { if (typeof ie.getElementById !== 'undefined' && P) { let ae; let be; let Se; let Be = ie.getElementById(Y); if (Be) { if (ae = Be.getAttributeNode('id'), ae && ae.value === Y) return [Be]; for (Se = ie.getElementsByName(Y), be = 0; Be = Se[be++];) if (ae = Be.getAttributeNode('id'), ae && ae.value === Y) return [Be] } return [] } }), f.find.TAG = c.getElementsByTagName ? function (Y, ie) { if (typeof ie.getElementsByTagName !== 'undefined') return ie.getElementsByTagName(Y); if (c.qsa) return ie.querySelectorAll(Y) } : function (Y, ie) { let ae; const be = []; let Se = 0; const Be = ie.getElementsByTagName(Y); if (Y === '*') { for (;ae = Be[Se++];)ae.nodeType === 1 && be.push(ae); return be } return Be }, f.find.CLASS = c.getElementsByClassName && function (Y, ie) { if (typeof ie.getElementsByClassName !== 'undefined' && P) return ie.getElementsByClassName(Y) }, D = [], S = [], (c.qsa = $t.test(v.querySelectorAll)) && (pe(function (Y) { let ie; x.appendChild(Y).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", Y.querySelectorAll("[msallowcapture^='']").length && S.push('[*^$]=' + ye + '*(?:\'\'|"")'), Y.querySelectorAll('[selected]').length || S.push('\\[' + ye + '*(?:value|' + Q + ')'), Y.querySelectorAll('[id~=' + C + '-]').length || S.push('~='), ie = v.createElement('input'), ie.setAttribute('name', ''), Y.appendChild(ie), Y.querySelectorAll("[name='']").length || S.push('\\[' + ye + '*name' + ye + '*=' + ye + '*(?:\'\'|"")'), Y.querySelectorAll(':checked').length || S.push(':checked'), Y.querySelectorAll('a#' + C + '+*').length || S.push('.#.+[+~]'), Y.querySelectorAll('\\\f'), S.push('[\\r\\n\\f]') }), pe(function (Y) { Y.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"; const ie = v.createElement('input'); ie.setAttribute('type', 'hidden'), Y.appendChild(ie).setAttribute('name', 'D'), Y.querySelectorAll('[name=d]').length && S.push('name' + ye + '*[*^$|!~]?='), Y.querySelectorAll(':enabled').length !== 2 && S.push(':enabled', ':disabled'), x.appendChild(Y).disabled = !0, Y.querySelectorAll(':disabled').length !== 2 && S.push(':enabled', ':disabled'), Y.querySelectorAll('*,:x'), S.push(',.*:') })), (c.matchesSelector = $t.test(A = x.matches || x.webkitMatchesSelector || x.mozMatchesSelector || x.oMatchesSelector || x.msMatchesSelector)) && pe(function (Y) { c.disconnectedMatch = A.call(Y, '*'), A.call(Y, "[s!='']:x"), D.push('!=', mt) }), S = S.length && new RegExp(S.join('|')), D = D.length && new RegExp(D.join('|')), U = $t.test(x.compareDocumentPosition), T = U || $t.test(x.contains) ? function (Y, ie) { const ae = Y.nodeType === 9 ? Y.documentElement : Y; const be = ie && ie.parentNode; return Y === be || !!(be && be.nodeType === 1 && (ae.contains ? ae.contains(be) : Y.compareDocumentPosition && Y.compareDocumentPosition(be) & 16)) } : function (Y, ie) { if (ie) { for (;ie = ie.parentNode;) if (ie === Y) return !0 } return !1 }, _ = U ? function (Y, ie) { if (Y === ie) return p = !0, 0; let ae = !Y.compareDocumentPosition - !ie.compareDocumentPosition; return ae || (ae = (Y.ownerDocument || Y) == (ie.ownerDocument || ie) ? Y.compareDocumentPosition(ie) : 1, ae & 1 || !c.sortDetached && ie.compareDocumentPosition(Y) === ae ? Y == v || Y.ownerDocument == N && T(N, Y) ? -1 : ie == v || ie.ownerDocument == N && T(N, ie) ? 1 : d ? he(d, Y) - he(d, ie) : 0 : ae & 4 ? -1 : 1) } : function (Y, ie) { if (Y === ie) return p = !0, 0; let ae; let be = 0; const Se = Y.parentNode; const Be = ie.parentNode; const Ie = [Y]; const _e = [ie]; if (!Se || !Be) return Y == v ? -1 : ie == v ? 1 : Se ? -1 : Be ? 1 : d ? he(d, Y) - he(d, ie) : 0; if (Se === Be) return de(Y, ie); for (ae = Y; ae = ae.parentNode;)Ie.unshift(ae); for (ae = ie; ae = ae.parentNode;)_e.unshift(ae); for (;Ie[be] === _e[be];)be++; return be ? de(Ie[be], _e[be]) : Ie[be] == N ? -1 : _e[be] == N ? 1 : 0 }), v }, tt.matches = function (j, U) { return tt(j, null, null, U) }, tt.matchesSelector = function (j, U) { if (b(j), c.matchesSelector && P && !q[U + ' '] && (!D || !D.test(U)) && (!S || !S.test(U))) try { const G = A.call(j, U); if (G || c.disconnectedMatch || j.document && j.document.nodeType !== 11) return G } catch (re) { q(U, !0) } return tt(U, v, null, [j]).length > 0 }, tt.contains = function (j, U) { return (j.ownerDocument || j) != v && b(j), T(j, U) }, tt.attr = function (j, U) { (j.ownerDocument || j) != v && b(j); const G = f.attrHandle[U.toLowerCase()]; let re = G && W.call(f.attrHandle, U.toLowerCase()) ? G(j, U, !P) : void 0; return re !== void 0 ? re : c.attributes || !P ? j.getAttribute(U) : (re = j.getAttributeNode(U)) && re.specified ? re.value : null }, tt.escape = function (j) { return (j + '').replace(Cn, nr) }, tt.error = function (j) { throw new Error('Syntax error, unrecognized expression: ' + j) }, tt.uniqueSort = function (j) { let U; const G = []; let re = 0; let Y = 0; if (p = !c.detectDuplicates, d = !c.sortStable && j.slice(0), j.sort(_), p) { for (;U = j[Y++];)U === j[Y] && (re = G.push(Y)); for (;re--;)j.splice(G[re], 1) } return d = null, j }, l = tt.getText = function (j) { let U; let G = ''; let re = 0; const Y = j.nodeType; if (Y) { if (Y === 1 || Y === 9 || Y === 11) { if (typeof j.textContent === 'string') return j.textContent; for (j = j.firstChild; j; j = j.nextSibling)G += l(j) } else if (Y === 3 || Y === 4) return j.nodeValue } else for (;U = j[re++];)G += l(U); return G }, f = tt.selectors = { cacheLength: 50, createPseudo: _t, match: et, attrHandle: {}, find: {}, relative: { '>': { dir: 'parentNode', first: !0 }, ' ': { dir: 'parentNode' }, '+': { dir: 'previousSibling', first: !0 }, '~': { dir: 'previousSibling' } }, preFilter: { ATTR: function (j) { return j[1] = j[1].replace(lt, pt), j[3] = (j[3] || j[4] || j[5] || '').replace(lt, pt), j[2] === '~=' && (j[3] = ' ' + j[3] + ' '), j.slice(0, 4) }, CHILD: function (j) { return j[1] = j[1].toLowerCase(), j[1].slice(0, 3) === 'nth' ? (j[3] || tt.error(j[0]), j[4] = +(j[4] ? j[5] + (j[6] || 1) : 2 * (j[3] === 'even' || j[3] === 'odd')), j[5] = +(j[7] + j[8] || j[3] === 'odd')) : j[3] && tt.error(j[0]), j }, PSEUDO: function (j) { let U; const G = !j[6] && j[2]; return et.CHILD.test(j[0]) ? null : (j[3] ? j[2] = j[4] || j[5] || '' : G && Mt.test(G) && (U = u(G, !0)) && (U = G.indexOf(')', G.length - U) - G.length) && (j[0] = j[0].slice(0, U), j[2] = G.slice(0, U)), j.slice(0, 3)) } }, filter: { TAG: function (j) { const U = j.replace(lt, pt).toLowerCase(); return j === '*' ? function () { return !0 } : function (G) { return G.nodeName && G.nodeName.toLowerCase() === U } }, CLASS: function (j) { let U = B[j + ' ']; return U || (U = new RegExp('(^|' + ye + ')' + j + '(' + ye + '|$)')) && B(j, function (G) { return U.test(typeof G.className === 'string' && G.className || typeof G.getAttribute !== 'undefined' && G.getAttribute('class') || '') }) }, ATTR: function (j, U, G) { return function (re) { let Y = tt.attr(re, j); return Y == null ? U === '!=' : U ? (Y += '', U === '=' ? Y === G : U === '!=' ? Y !== G : U === '^=' ? G && Y.indexOf(G) === 0 : U === '*=' ? G && Y.indexOf(G) > -1 : U === '$=' ? G && Y.slice(-G.length) === G : U === '~=' ? (' ' + Y.replace(kt, ' ') + ' ').indexOf(G) > -1 : U === '|=' ? Y === G || Y.slice(0, G.length + 1) === G + '-' : !1) : !0 } }, CHILD: function (j, U, G, re, Y) { const ie = j.slice(0, 3) !== 'nth'; const ae = j.slice(-4) !== 'last'; const be = U === 'of-type'; return re === 1 && Y === 0 ? function (Se) { return !!Se.parentNode } : function (Se, Be, Ie) { let _e; let Ye; let ot; let je; let St; let Ct; let ve = ie !== ae ? 'nextSibling' : 'previousSibling'; const ce = Se.parentNode; const Ee = be && Se.nodeName.toLowerCase(); const we = !Ie && !be; let ke = !1; if (ce) { if (ie) { for (;ve;) { for (je = Se; je = je[ve];) if (be ? je.nodeName.toLowerCase() === Ee : je.nodeType === 1) return !1; Ct = ve = j === 'only' && !Ct && 'nextSibling' } return !0 } if (Ct = [ae ? ce.firstChild : ce.lastChild], ae && we) { for (je = ce, ot = je[C] || (je[C] = {}), Ye = ot[je.uniqueID] || (ot[je.uniqueID] = {}), _e = Ye[j] || [], St = _e[0] === L && _e[1], ke = St && _e[2], je = St && ce.childNodes[St]; je = ++St && je && je[ve] || (ke = St = 0) || Ct.pop();) if (je.nodeType === 1 && ++ke && je === Se) { Ye[j] = [L, St, ke]; break } } else if (we && (je = Se, ot = je[C] || (je[C] = {}), Ye = ot[je.uniqueID] || (ot[je.uniqueID] = {}), _e = Ye[j] || [], St = _e[0] === L && _e[1], ke = St), ke === !1) for (;(je = ++St && je && je[ve] || (ke = St = 0) || Ct.pop()) && !((be ? je.nodeName.toLowerCase() === Ee : je.nodeType === 1) && ++ke && (we && (ot = je[C] || (je[C] = {}), Ye = ot[je.uniqueID] || (ot[je.uniqueID] = {}), Ye[j] = [L, ke]), je === Se)););return ke -= Y, ke === re || ke % re === 0 && ke / re >= 0 } } }, PSEUDO: function (j, U) { let G; const re = f.pseudos[j] || f.setFilters[j.toLowerCase()] || tt.error('unsupported pseudo: ' + j); return re[C] ? re(U) : re.length > 1 ? (G = [j, j, '', U], f.setFilters.hasOwnProperty(j.toLowerCase()) ? _t(function (Y, ie) { for (var ae, be = re(Y, U), Se = be.length; Se--;)ae = he(Y, be[Se]), Y[ae] = !(ie[ae] = be[Se]) }) : function (Y) { return re(Y, 0, G) }) : re } }, pseudos: { not: _t(function (j) { const U = []; const G = []; const re = g(j.replace(Rt, '$1')); return re[C] ? _t(function (Y, ie, ae, be) { for (var Se, Be = re(Y, null, be, []), Ie = Y.length; Ie--;)(Se = Be[Ie]) && (Y[Ie] = !(ie[Ie] = Se)) }) : function (Y, ie, ae) { return U[0] = Y, re(U, null, ae, G), U[0] = null, !G.pop() } }), has: _t(function (j) { return function (U) { return tt(j, U).length > 0 } }), contains: _t(function (j) { return j = j.replace(lt, pt), function (U) { return (U.textContent || l(U)).indexOf(j) > -1 } }), lang: _t(function (j) { return Ve.test(j || '') || tt.error('unsupported lang: ' + j), j = j.replace(lt, pt).toLowerCase(), function (U) { let G; do if (G = P ? U.lang : U.getAttribute('xml:lang') || U.getAttribute('lang')) return G = G.toLowerCase(), G === j || G.indexOf(j + '-') === 0; while ((U = U.parentNode) && U.nodeType === 1); return !1 } }), target: function (j) { const U = r.location && r.location.hash; return U && U.slice(1) === j.id }, root: function (j) { return j === x }, focus: function (j) { return j === v.activeElement && (!v.hasFocus || v.hasFocus()) && !!(j.type || j.href || ~j.tabIndex) }, enabled: me(!1), disabled: me(!0), checked: function (j) { const U = j.nodeName.toLowerCase(); return U === 'input' && !!j.checked || U === 'option' && !!j.selected }, selected: function (j) { return j.parentNode && j.parentNode.selectedIndex, j.selected === !0 }, empty: function (j) { for (j = j.firstChild; j; j = j.nextSibling) if (j.nodeType < 6) return !1; return !0 }, parent: function (j) { return !f.pseudos.empty(j) }, header: function (j) { return At.test(j.nodeName) }, input: function (j) { return Mn.test(j.nodeName) }, button: function (j) { const U = j.nodeName.toLowerCase(); return U === 'input' && j.type === 'button' || U === 'button' }, text: function (j) { let U; return j.nodeName.toLowerCase() === 'input' && j.type === 'text' && ((U = j.getAttribute('type')) == null || U.toLowerCase() === 'text') }, first: fe(function () { return [0] }), last: fe(function (j, U) { return [U - 1] }), eq: fe(function (j, U, G) { return [G < 0 ? G + U : G] }), even: fe(function (j, U) { for (let G = 0; G < U; G += 2)j.push(G); return j }), odd: fe(function (j, U) { for (let G = 1; G < U; G += 2)j.push(G); return j }), lt: fe(function (j, U, G) { for (let re = G < 0 ? G + U : G > U ? U : G; --re >= 0;)j.push(re); return j }), gt: fe(function (j, U, G) { for (let re = G < 0 ? G + U : G; ++re < U;)j.push(re); return j }) } }, f.pseudos.nth = f.pseudos.eq; for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })f.pseudos[n] = Pe(n); for (n in { submit: !0, reset: !0 })f.pseudos[n] = ne(n); function Le () {}Le.prototype = f.filters = f.pseudos, f.setFilters = new Le(), u = tt.tokenize = function (j, U) { let G; let re; let Y; let ie; let ae; let be; let Se; const Be = O[j + ' ']; if (Be) return U ? 0 : Be.slice(0); for (ae = j, be = [], Se = f.preFilter; ae;) { (!G || (re = Lt.exec(ae))) && (re && (ae = ae.slice(re[0].length) || ae), be.push(Y = [])), G = !1, (re = Wt.exec(ae)) && (G = re.shift(), Y.push({ value: G, type: re[0].replace(Rt, ' ') }), ae = ae.slice(G.length)); for (ie in f.filter)(re = et[ie].exec(ae)) && (!Se[ie] || (re = Se[ie](re))) && (G = re.shift(), Y.push({ value: G, type: ie, matches: re }), ae = ae.slice(G.length)); if (!G) break } return U ? ae.length : ae ? tt.error(j) : O(j, be).slice(0) }; function Fe (j) { for (var U = 0, G = j.length, re = ''; U < G; U++)re += j[U].value; return re } function Ne (j, U, G) { const re = U.dir; const Y = U.next; const ie = Y || re; const ae = G && ie === 'parentNode'; const be = R++; return U.first ? function (Se, Be, Ie) { for (;Se = Se[re];) if (Se.nodeType === 1 || ae) return j(Se, Be, Ie); return !1 } : function (Se, Be, Ie) { let _e; let Ye; let ot; const je = [L, be]; if (Ie) { for (;Se = Se[re];) if ((Se.nodeType === 1 || ae) && j(Se, Be, Ie)) return !0 } else for (;Se = Se[re];) if (Se.nodeType === 1 || ae) if (ot = Se[C] || (Se[C] = {}), Ye = ot[Se.uniqueID] || (ot[Se.uniqueID] = {}), Y && Y === Se.nodeName.toLowerCase())Se = Se[re] || Se; else { if ((_e = Ye[ie]) && _e[0] === L && _e[1] === be) return je[2] = _e[2]; if (Ye[ie] = je, je[2] = j(Se, Be, Ie)) return !0 } return !1 } } function De (j) { return j.length > 1 ? function (U, G, re) { for (let Y = j.length; Y--;) if (!j[Y](U, G, re)) return !1; return !0 } : j[0] } function Me (j, U, G) { for (let re = 0, Y = U.length; re < Y; re++)tt(j, U[re], G); return G } function We (j, U, G, re, Y) { for (var ie, ae = [], be = 0, Se = j.length, Be = U != null; be < Se; be++)(ie = j[be]) && (!G || G(ie, re, Y)) && (ae.push(ie), Be && U.push(be)); return ae } function it (j, U, G, re, Y, ie) { return re && !re[C] && (re = it(re)), Y && !Y[C] && (Y = it(Y, ie)), _t(function (ae, be, Se, Be) { let Ie; let _e; let Ye; const ot = []; const je = []; const St = be.length; const Ct = ae || Me(U || '*', Se.nodeType ? [Se] : Se, []); const ve = j && (ae || !U) ? We(Ct, ot, j, Se, Be) : Ct; let ce = G ? Y || (ae ? j : St || re) ? [] : be : ve; if (G && G(ve, ce, Se, Be), re) for (Ie = We(ce, je), re(Ie, [], Se, Be), _e = Ie.length; _e--;)(Ye = Ie[_e]) && (ce[je[_e]] = !(ve[je[_e]] = Ye)); if (ae) { if (Y || j) { if (Y) { for (Ie = [], _e = ce.length; _e--;)(Ye = ce[_e]) && Ie.push(ve[_e] = Ye); Y(null, ce = [], Ie, Be) } for (_e = ce.length; _e--;)(Ye = ce[_e]) && (Ie = Y ? he(ae, Ye) : ot[_e]) > -1 && (ae[Ie] = !(be[Ie] = Ye)) } } else ce = We(ce === be ? ce.splice(St, ce.length) : ce), Y ? Y(null, be, ce, Be) : te.apply(be, ce) }) } function Pt (j) { for (var U, G, re, Y = j.length, ie = f.relative[j[0].type], ae = ie || f.relative[' '], be = ie ? 1 : 0, Se = Ne(function (_e) { return _e === U }, ae, !0), Be = Ne(function (_e) { return he(U, _e) > -1 }, ae, !0), Ie = [function (_e, Ye, ot) { const je = !ie && (ot || Ye !== m) || ((U = Ye).nodeType ? Se(_e, Ye, ot) : Be(_e, Ye, ot)); return U = null, je }]; be < Y; be++) if (G = f.relative[j[be].type])Ie = [Ne(De(Ie), G)]; else { if (G = f.filter[j[be].type].apply(null, j[be].matches), G[C]) { for (re = ++be; re < Y && !f.relative[j[re].type]; re++);return it(be > 1 && De(Ie), be > 1 && Fe(j.slice(0, be - 1).concat({ value: j[be - 2].type === ' ' ? '*' : '' })).replace(Rt, '$1'), G, be < re && Pt(j.slice(be, re)), re < Y && Pt(j = j.slice(re)), re < Y && Fe(j)) }Ie.push(G) } return De(Ie) } function Ge (j, U) { const G = U.length > 0; const re = j.length > 0; const Y = function (ie, ae, be, Se, Be) { let Ie; let _e; let Ye; let ot = 0; let je = '0'; const St = ie && []; let Ct = []; const ve = m; const ce = ie || re && f.find.TAG('*', Be); const Ee = L += ve == null ? 1 : Math.random() || 0.1; const we = ce.length; for (Be && (m = ae == v || ae || Be); je !== we && (Ie = ce[je]) != null; je++) { if (re && Ie) { for (_e = 0, !ae && Ie.ownerDocument != v && (b(Ie), be = !P); Ye = j[_e++];) if (Ye(Ie, ae || v, be)) { Se.push(Ie); break }Be && (L = Ee) }G && ((Ie = !Ye && Ie) && ot--, ie && St.push(Ie)) } if (ot += je, G && je !== ot) { for (_e = 0; Ye = U[_e++];)Ye(St, Ct, ae, be); if (ie) { if (ot > 0) for (;je--;)St[je] || Ct[je] || (Ct[je] = $.call(Se)); Ct = We(Ct) }te.apply(Se, Ct), Be && !ie && Ct.length > 0 && ot + U.length > 1 && tt.uniqueSort(Se) } return Be && (L = Ee, m = ve), St }; return G ? _t(Y) : Y }g = tt.compile = function (j, U) { let G; const re = []; const Y = []; let ie = F[j + ' ']; if (!ie) { for (U || (U = u(j)), G = U.length; G--;)ie = Pt(U[G]), ie[C] ? re.push(ie) : Y.push(ie); ie = F(j, Ge(Y, re)), ie.selector = j } return ie }, i = tt.select = function (j, U, G, re) { let Y; let ie; let ae; let be; let Se; const Be = typeof j === 'function' && j; const Ie = !re && u(j = Be.selector || j); if (G = G || [], Ie.length === 1) { if (ie = Ie[0] = Ie[0].slice(0), ie.length > 2 && (ae = ie[0]).type === 'ID' && U.nodeType === 9 && P && f.relative[ie[1].type]) { if (U = (f.find.ID(ae.matches[0].replace(lt, pt), U) || [])[0], U)Be && (U = U.parentNode); else return G; j = j.slice(ie.shift().value.length) } for (Y = et.needsContext.test(j) ? 0 : ie.length; Y-- && (ae = ie[Y], !f.relative[be = ae.type]);) if ((Se = f.find[be]) && (re = Se(ae.matches[0].replace(lt, pt), jt.test(ie[0].type) && xe(U.parentNode) || U))) { if (ie.splice(Y, 1), j = re.length && Fe(ie), !j) return te.apply(G, re), G; break } } return (Be || g(j, Ie))(re, U, !P, G, !U || jt.test(j) && xe(U.parentNode) || U), G }, c.sortStable = C.split('').sort(_).join('') === C, c.detectDuplicates = !!p, b(), c.sortDetached = pe(function (j) { return j.compareDocumentPosition(v.createElement('fieldset')) & 1 }), pe(function (j) { return j.innerHTML = "<a href='#'></a>", j.firstChild.getAttribute('href') === '#' }) || Z('type|href|height|width', function (j, U, G) { if (!G) return j.getAttribute(U, U.toLowerCase() === 'type' ? 1 : 2) }), (!c.attributes || !pe(function (j) { return j.innerHTML = '<input/>', j.firstChild.setAttribute('value', ''), j.firstChild.getAttribute('value') === '' })) && Z('value', function (j, U, G) { if (!G && j.nodeName.toLowerCase() === 'input') return j.defaultValue }), pe(function (j) { return j.getAttribute('disabled') == null }) || Z(Q, function (j, U, G) { let re; if (!G) return j[U] === !0 ? U.toLowerCase() : (re = j.getAttributeNode(U)) && re.specified ? re.value : null }); const yt = r.Sizzle; tt.noConflict = function () { return r.Sizzle === tt && (r.Sizzle = yt), tt }, h = (function () { return tt }.call(y, a, y, w)), h !== void 0 && (w.exports = h) })(window)
    },
    7178: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(2134), a(8663), a(454), a(6981), a(7661), a(8048), a(461), a(1045), a(6525), a(5385)], r = (function (n, c, f, l, s, u, g) { 'use strict'; const i = /%20/g; const m = /#.*$/; const d = /([?&])_=[^&]*/; const p = /^(.*?):[ \t]*([^\r\n]*)$/mg; const b = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/; const v = /^(?:GET|HEAD)$/; const x = /^\/\//; const P = {}; const S = {}; const D = '*/'.concat('*'); const A = c.createElement('a'); A.href = s.href; function T (B) { return function (O, F) { typeof O !== 'string' && (F = O, O = '*'); let q; let _ = 0; const W = O.toLowerCase().match(l) || []; if (f(F)) for (;q = W[_++];)q[0] === '+' ? (q = q.slice(1) || '*', (B[q] = B[q] || []).unshift(F)) : (B[q] = B[q] || []).push(F) } } function C (B, O, F, q) { const _ = {}; const W = B === S; function H ($) { let K; return _[$] = !0, n.each(B[$] || [], function (te, oe) { const he = oe(O, F, q); if (typeof he === 'string' && !W && !_[he]) return O.dataTypes.unshift(he), H(he), !1; if (W) return !(K = he) }), K } return H(O.dataTypes[0]) || !_['*'] && H('*') } function N (B, O) { let F; let q; const _ = n.ajaxSettings.flatOptions || {}; for (F in O)O[F] !== void 0 && ((_[F] ? B : q || (q = {}))[F] = O[F]); return q && n.extend(!0, B, q), B } function L (B, O, F) { for (var q, _, W, H, $ = B.contents, K = B.dataTypes; K[0] === '*';)K.shift(), q === void 0 && (q = B.mimeType || O.getResponseHeader('Content-Type')); if (q) { for (_ in $) if ($[_] && $[_].test(q)) { K.unshift(_); break } } if (K[0] in F)W = K[0]; else { for (_ in F) { if (!K[0] || B.converters[_ + ' ' + K[0]]) { W = _; break }H || (H = _) }W = W || H } if (W) return W !== K[0] && K.unshift(W), F[W] } function R (B, O, F, q) { let _; let W; let H; let $; let K; const te = {}; const oe = B.dataTypes.slice(); if (oe[1]) for (H in B.converters)te[H.toLowerCase()] = B.converters[H]; for (W = oe.shift(); W;) if (B.responseFields[W] && (F[B.responseFields[W]] = O), !K && q && B.dataFilter && (O = B.dataFilter(O, B.dataType)), K = W, W = oe.shift(), W) { if (W === '*')W = K; else if (K !== '*' && K !== W) { if (H = te[K + ' ' + W] || te['* ' + W], !H) { for (_ in te) if ($ = _.split(' '), $[1] === W && (H = te[K + ' ' + $[0]] || te['* ' + $[0]], H)) { H === !0 ? H = te[_] : te[_] !== !0 && (W = $[0], oe.unshift($[1])); break } } if (H !== !0) if (H && B.throws)O = H(O); else try { O = H(O) } catch (he) { return { state: 'parsererror', error: H ? he : 'No conversion from ' + K + ' to ' + W } } } } return { state: 'success', data: O } } return n.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: s.href, type: 'GET', isLocal: b.test(s.protocol), global: !0, processData: !0, async: !0, contentType: 'application/x-www-form-urlencoded; charset=UTF-8', accepts: { '*': D, text: 'text/plain', html: 'text/html', xml: 'application/xml, text/xml', json: 'application/json, text/javascript' }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' }, converters: { '* text': String, 'text html': !0, 'text json': JSON.parse, 'text xml': n.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (B, O) { return O ? N(N(B, n.ajaxSettings), O) : N(n.ajaxSettings, B) }, ajaxPrefilter: T(P), ajaxTransport: T(S), ajax: function (B, O) { typeof B === 'object' && (O = B, B = void 0), O = O || {}; let F; let q; let _; let W; let H; let $; let K; let te; let oe; let he; const Q = n.ajaxSetup({}, O); const ye = Q.context || Q; const Ae = Q.context && (ye.nodeType || ye.jquery) ? n(ye) : n.event; const Ke = n.Deferred(); const mt = n.Callbacks('once memory'); let kt = Q.statusCode || {}; const Rt = {}; const Lt = {}; let Wt = 'canceled'; var ze = { readyState: 0, getResponseHeader: function (Ve) { let et; if (K) { if (!W) for (W = {}; et = p.exec(_);)W[et[1].toLowerCase() + ' '] = (W[et[1].toLowerCase() + ' '] || []).concat(et[2]); et = W[Ve.toLowerCase() + ' '] } return et == null ? null : et.join(', ') }, getAllResponseHeaders: function () { return K ? _ : null }, setRequestHeader: function (Ve, et) { return K == null && (Ve = Lt[Ve.toLowerCase()] = Lt[Ve.toLowerCase()] || Ve, Rt[Ve] = et), this }, overrideMimeType: function (Ve) { return K == null && (Q.mimeType = Ve), this }, statusCode: function (Ve) { let et; if (Ve) if (K)ze.always(Ve[ze.status]); else for (et in Ve)kt[et] = [kt[et], Ve[et]]; return this }, abort: function (Ve) { const et = Ve || Wt; return F && F.abort(et), Mt(0, et), this } }; if (Ke.promise(ze), Q.url = ((B || Q.url || s.href) + '').replace(x, s.protocol + '//'), Q.type = O.method || O.type || Q.method || Q.type, Q.dataTypes = (Q.dataType || '*').toLowerCase().match(l) || [''], Q.crossDomain == null) { $ = c.createElement('a'); try { $.href = Q.url, $.href = $.href, Q.crossDomain = A.protocol + '//' + A.host != $.protocol + '//' + $.host } catch (Ve) { Q.crossDomain = !0 } } if (Q.data && Q.processData && typeof Q.data !== 'string' && (Q.data = n.param(Q.data, Q.traditional)), C(P, Q, O, ze), K) return ze; te = n.event && Q.global, te && n.active++ === 0 && n.event.trigger('ajaxStart'), Q.type = Q.type.toUpperCase(), Q.hasContent = !v.test(Q.type), q = Q.url.replace(m, ''), Q.hasContent ? Q.data && Q.processData && (Q.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && (Q.data = Q.data.replace(i, '+')) : (he = Q.url.slice(q.length), Q.data && (Q.processData || typeof Q.data === 'string') && (q += (g.test(q) ? '&' : '?') + Q.data, delete Q.data), Q.cache === !1 && (q = q.replace(d, '$1'), he = (g.test(q) ? '&' : '?') + '_=' + u.guid++ + he), Q.url = q + he), Q.ifModified && (n.lastModified[q] && ze.setRequestHeader('If-Modified-Since', n.lastModified[q]), n.etag[q] && ze.setRequestHeader('If-None-Match', n.etag[q])), (Q.data && Q.hasContent && Q.contentType !== !1 || O.contentType) && ze.setRequestHeader('Content-Type', Q.contentType), ze.setRequestHeader('Accept', Q.dataTypes[0] && Q.accepts[Q.dataTypes[0]] ? Q.accepts[Q.dataTypes[0]] + (Q.dataTypes[0] !== '*' ? ', ' + D + '; q=0.01' : '') : Q.accepts['*']); for (oe in Q.headers)ze.setRequestHeader(oe, Q.headers[oe]); if (Q.beforeSend && (Q.beforeSend.call(ye, ze, Q) === !1 || K)) return ze.abort(); if (Wt = 'abort', mt.add(Q.complete), ze.done(Q.success), ze.fail(Q.error), F = C(S, Q, O, ze), !F)Mt(-1, 'No Transport'); else { if (ze.readyState = 1, te && Ae.trigger('ajaxSend', [ze, Q]), K) return ze; Q.async && Q.timeout > 0 && (H = window.setTimeout(function () { ze.abort('timeout') }, Q.timeout)); try { K = !1, F.send(Rt, Mt) } catch (Ve) { if (K) throw Ve; Mt(-1, Ve) } } function Mt (Ve, et, Kt, Mn) { let At; let $t; let vn; let jt; let lt; let pt = et; K || (K = !0, H && window.clearTimeout(H), F = void 0, _ = Mn || '', ze.readyState = Ve > 0 ? 4 : 0, At = Ve >= 200 && Ve < 300 || Ve === 304, Kt && (jt = L(Q, ze, Kt)), !At && n.inArray('script', Q.dataTypes) > -1 && n.inArray('json', Q.dataTypes) < 0 && (Q.converters['text script'] = function () {}), jt = R(Q, jt, ze, At), At ? (Q.ifModified && (lt = ze.getResponseHeader('Last-Modified'), lt && (n.lastModified[q] = lt), lt = ze.getResponseHeader('etag'), lt && (n.etag[q] = lt)), Ve === 204 || Q.type === 'HEAD' ? pt = 'nocontent' : Ve === 304 ? pt = 'notmodified' : (pt = jt.state, $t = jt.data, vn = jt.error, At = !vn)) : (vn = pt, (Ve || !pt) && (pt = 'error', Ve < 0 && (Ve = 0))), ze.status = Ve, ze.statusText = (et || pt) + '', At ? Ke.resolveWith(ye, [$t, pt, ze]) : Ke.rejectWith(ye, [ze, pt, vn]), ze.statusCode(kt), kt = void 0, te && Ae.trigger(At ? 'ajaxSuccess' : 'ajaxError', [ze, Q, At ? $t : vn]), mt.fireWith(ye, [ze, pt]), te && (Ae.trigger('ajaxComplete', [ze, Q]), --n.active || n.event.trigger('ajaxStop'))) } return ze }, getJSON: function (B, O, F) { return n.get(B, O, F, 'json') }, getScript: function (B, O) { return n.get(B, void 0, O, 'script') } }), n.each(['get', 'post'], function (B, O) { n[O] = function (F, q, _, W) { return f(q) && (W = W || _, _ = q, q = void 0), n.ajax(n.extend({ url: F, type: O, dataType: W, data: q, success: _ }, n.isPlainObject(F) && F)) } }), n.ajaxPrefilter(function (B) { let O; for (O in B.headers)O.toLowerCase() === 'content-type' && (B.contentType = B.headers[O] || '') }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7533: (w, y, a) => { let h, r; h = [a(8934), a(2134), a(6981), a(7661), a(7178)], r = (function (n, c, f, l) { 'use strict'; const s = []; const u = /(=)\?(?=&|$)|\?\?/; n.ajaxSetup({ jsonp: 'callback', jsonpCallback: function () { const g = s.pop() || n.expando + '_' + f.guid++; return this[g] = !0, g } }), n.ajaxPrefilter('json jsonp', function (g, i, m) { let d; let p; let b; const v = g.jsonp !== !1 && (u.test(g.url) ? 'url' : typeof g.data === 'string' && (g.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && u.test(g.data) && 'data'); if (v || g.dataTypes[0] === 'jsonp') return d = g.jsonpCallback = c(g.jsonpCallback) ? g.jsonpCallback() : g.jsonpCallback, v ? g[v] = g[v].replace(u, '$1' + d) : g.jsonp !== !1 && (g.url += (l.test(g.url) ? '&' : '?') + g.jsonp + '=' + d), g.converters['script json'] = function () { return b || n.error(d + ' was not called'), b[0] }, g.dataTypes[0] = 'json', p = window[d], window[d] = function () { b = arguments }, m.always(function () { p === void 0 ? n(window).removeProp(d) : window[d] = p, g[d] && (g.jsonpCallback = i.jsonpCallback, s.push(d)), b && c(p) && p(b[0]), b = p = void 0 }), 'script' }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4581: (w, y, a) => { let h, r; h = [a(8934), a(4552), a(2134), a(2889), a(7178), a(8482), a(2632), a(655)], r = (function (n, c, f) { 'use strict'; n.fn.load = function (l, s, u) { let g; let i; let m; const d = this; const p = l.indexOf(' '); return p > -1 && (g = c(l.slice(p)), l = l.slice(0, p)), f(s) ? (u = s, s = void 0) : s && typeof s === 'object' && (i = 'POST'), d.length > 0 && n.ajax({ url: l, type: i || 'GET', dataType: 'html', data: s }).done(function (b) { m = arguments, d.html(g ? n('<div>').append(n.parseHTML(b)).find(g) : b) }).always(u && function (b, v) { d.each(function () { u.apply(this, m || [b.responseText, v, b]) }) }), this } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5488: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(7178)], r = (function (n, c) { 'use strict'; n.ajaxPrefilter(function (f) { f.crossDomain && (f.contents.script = !1) }), n.ajaxSetup({ accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { 'text script': function (f) { return n.globalEval(f), f } } }), n.ajaxPrefilter('script', function (f) { f.cache === void 0 && (f.cache = !1), f.crossDomain && (f.type = 'GET') }), n.ajaxTransport('script', function (f) { if (f.crossDomain || f.scriptAttrs) { let l, s; return { send: function (u, g) { l = n('<script>').attr(f.scriptAttrs || {}).prop({ charset: f.scriptCharset, src: f.url }).on('load error', s = function (i) { l.remove(), s = null, i && g(i.type === 'error' ? 404 : 200, i.type) }), c.head.appendChild(l[0]) }, abort: function () { s && s() } } } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    454: (w, y, a) => { let h; h = (function () { 'use strict'; return window.location }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    6981: (w, y, a) => { let h; h = (function () { 'use strict'; return { guid: Date.now() } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    7661: (w, y, a) => { let h; h = (function () { 'use strict'; return /\?/ }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    8853: (w, y, a) => { let h, r; h = [a(8934), a(9523), a(7178)], r = (function (n, c) { 'use strict'; n.ajaxSettings.xhr = function () { try { return new window.XMLHttpRequest() } catch (s) {} }; const f = { 0: 200, 1223: 204 }; let l = n.ajaxSettings.xhr(); c.cors = !!l && 'withCredentials' in l, c.ajax = l = !!l, n.ajaxTransport(function (s) { let u, g; if (c.cors || l && !s.crossDomain) return { send: function (i, m) { let d; const p = s.xhr(); if (p.open(s.type, s.url, s.async, s.username, s.password), s.xhrFields) for (d in s.xhrFields)p[d] = s.xhrFields[d]; s.mimeType && p.overrideMimeType && p.overrideMimeType(s.mimeType), !s.crossDomain && !i['X-Requested-With'] && (i['X-Requested-With'] = 'XMLHttpRequest'); for (d in i)p.setRequestHeader(d, i[d]); u = function (b) { return function () { u && (u = g = p.onload = p.onerror = p.onabort = p.ontimeout = p.onreadystatechange = null, b === 'abort' ? p.abort() : b === 'error' ? typeof p.status !== 'number' ? m(0, 'error') : m(p.status, p.statusText) : m(f[p.status] || p.status, p.statusText, (p.responseType || 'text') !== 'text' || typeof p.responseText !== 'string' ? { binary: p.response } : { text: p.responseText }, p.getAllResponseHeaders())) } }, p.onload = u(), g = p.onerror = p.ontimeout = u('error'), p.onabort !== void 0 ? p.onabort = g : p.onreadystatechange = function () { p.readyState === 4 && window.setTimeout(function () { u && g() }) }, u = u('abort'); try { p.send(s.hasContent && s.data || null) } catch (b) { if (u) throw b } }, abort: function () { u && u() } } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8468: (w, y, a) => { let h, r; h = [a(8934), a(2853), a(4043), a(4015), a(4580)], r = (function (n) { 'use strict'; return n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2853: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(7060), a(2941), a(8663), a(655)], r = (function (n, c, f, l, s) { 'use strict'; let u; const g = n.expr.attrHandle; n.fn.extend({ attr: function (i, m) { return c(this, n.attr, i, m, arguments.length > 1) }, removeAttr: function (i) { return this.each(function () { n.removeAttr(this, i) }) } }), n.extend({ attr: function (i, m, d) { let p; let b; const v = i.nodeType; if (!(v === 3 || v === 8 || v === 2)) { if (typeof i.getAttribute === 'undefined') return n.prop(i, m, d); if ((v !== 1 || !n.isXMLDoc(i)) && (b = n.attrHooks[m.toLowerCase()] || (n.expr.match.bool.test(m) ? u : void 0)), d !== void 0) { if (d === null) { n.removeAttr(i, m); return } return b && 'set' in b && (p = b.set(i, d, m)) !== void 0 ? p : (i.setAttribute(m, d + ''), d) } return b && 'get' in b && (p = b.get(i, m)) !== null ? p : (p = n.find.attr(i, m), p == null ? void 0 : p) } }, attrHooks: { type: { set: function (i, m) { if (!l.radioValue && m === 'radio' && f(i, 'input')) { const d = i.value; return i.setAttribute('type', m), d && (i.value = d), m } } } }, removeAttr: function (i, m) { let d; let p = 0; const b = m && m.match(s); if (b && i.nodeType === 1) for (;d = b[p++];)i.removeAttribute(d) } }), u = { set: function (i, m, d) { return m === !1 ? n.removeAttr(i, d) : i.setAttribute(d, d), d } }, n.each(n.expr.match.bool.source.match(/\w+/g), function (i, m) { const d = g[m] || n.find.attr; g[m] = function (p, b, v) { let x; let P; const S = b.toLowerCase(); return v || (P = g[S], g[S] = x, x = d(p, b, v) != null ? S : null, g[S] = P), x } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4015: (w, y, a) => { let h, r; h = [a(8934), a(4552), a(2134), a(8663), a(9081), a(8048)], r = (function (n, c, f, l, s) { 'use strict'; function u (i) { return i.getAttribute && i.getAttribute('class') || '' } function g (i) { return Array.isArray(i) ? i : typeof i === 'string' ? i.match(l) || [] : [] }n.fn.extend({ addClass: function (i) { let m; let d; let p; let b; let v; let x; let P; let S = 0; if (f(i)) return this.each(function (D) { n(this).addClass(i.call(this, D, u(this))) }); if (m = g(i), m.length) { for (;d = this[S++];) if (b = u(d), p = d.nodeType === 1 && ' ' + c(b) + ' ', p) { for (x = 0; v = m[x++];)p.indexOf(' ' + v + ' ') < 0 && (p += v + ' '); P = c(p), b !== P && d.setAttribute('class', P) } } return this }, removeClass: function (i) { let m; let d; let p; let b; let v; let x; let P; let S = 0; if (f(i)) return this.each(function (D) { n(this).removeClass(i.call(this, D, u(this))) }); if (!arguments.length) return this.attr('class', ''); if (m = g(i), m.length) { for (;d = this[S++];) if (b = u(d), p = d.nodeType === 1 && ' ' + c(b) + ' ', p) { for (x = 0; v = m[x++];) for (;p.indexOf(' ' + v + ' ') > -1;)p = p.replace(' ' + v + ' ', ' '); P = c(p), b !== P && d.setAttribute('class', P) } } return this }, toggleClass: function (i, m) { const d = typeof i; const p = d === 'string' || Array.isArray(i); return typeof m === 'boolean' && p ? m ? this.addClass(i) : this.removeClass(i) : f(i) ? this.each(function (b) { n(this).toggleClass(i.call(this, b, u(this), m), m) }) : this.each(function () { let b, v, x, P; if (p) for (v = 0, x = n(this), P = g(i); b = P[v++];)x.hasClass(b) ? x.removeClass(b) : x.addClass(b); else (i === void 0 || d === 'boolean') && (b = u(this), b && s.set(this, '__className__', b), this.setAttribute && this.setAttribute('class', b || i === !1 ? '' : s.get(this, '__className__') || '')) }) }, hasClass: function (i) { let m; let d; let p = 0; for (m = ' ' + i + ' '; d = this[p++];) if (d.nodeType === 1 && (' ' + c(u(d)) + ' ').indexOf(m) > -1) return !0; return !1 } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4043: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(2941), a(655)], r = (function (n, c, f) { 'use strict'; const l = /^(?:input|select|textarea|button)$/i; const s = /^(?:a|area)$/i; n.fn.extend({ prop: function (u, g) { return c(this, n.prop, u, g, arguments.length > 1) }, removeProp: function (u) { return this.each(function () { delete this[n.propFix[u] || u] }) } }), n.extend({ prop: function (u, g, i) { let m; let d; const p = u.nodeType; if (!(p === 3 || p === 8 || p === 2)) return (p !== 1 || !n.isXMLDoc(u)) && (g = n.propFix[g] || g, d = n.propHooks[g]), i !== void 0 ? d && 'set' in d && (m = d.set(u, i, g)) !== void 0 ? m : u[g] = i : d && 'get' in d && (m = d.get(u, g)) !== null ? m : u[g] }, propHooks: { tabIndex: { get: function (u) { const g = n.find.attr(u, 'tabindex'); return g ? parseInt(g, 10) : l.test(u.nodeName) || s.test(u.nodeName) && u.href ? 0 : -1 } } }, propFix: { for: 'htmlFor', class: 'className' } }), f.optSelected || (n.propHooks.selected = { get: function (u) { const g = u.parentNode; return g && g.parentNode && g.parentNode.selectedIndex, null }, set: function (u) { const g = u.parentNode; g && (g.selectedIndex, g.parentNode && g.parentNode.selectedIndex) } }), n.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function () { n.propFix[this.toLowerCase()] = this }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2941: (w, y, a) => { let h, r; h = [a(7792), a(9523)], r = (function (n, c) { 'use strict'; return (function () { let f = n.createElement('input'); const l = n.createElement('select'); const s = l.appendChild(n.createElement('option')); f.type = 'checkbox', c.checkOn = f.value !== '', c.optSelected = s.selected, f = n.createElement('input'), f.value = 't', f.type = 'radio', c.radioValue = f.value === 't' }()), c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4580: (w, y, a) => { let h, r; h = [a(8934), a(4552), a(2941), a(7060), a(2134), a(8048)], r = (function (n, c, f, l, s) { 'use strict'; const u = /\r/g; n.fn.extend({ val: function (g) { let i; let m; let d; const p = this[0]; return arguments.length ? (d = s(g), this.each(function (b) { let v; this.nodeType === 1 && (d ? v = g.call(this, b, n(this).val()) : v = g, v == null ? v = '' : typeof v === 'number' ? v += '' : Array.isArray(v) && (v = n.map(v, function (x) { return x == null ? '' : x + '' })), i = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], (!i || !('set' in i) || i.set(this, v, 'value') === void 0) && (this.value = v)) })) : p ? (i = n.valHooks[p.type] || n.valHooks[p.nodeName.toLowerCase()], i && 'get' in i && (m = i.get(p, 'value')) !== void 0 ? m : (m = p.value, typeof m === 'string' ? m.replace(u, '') : m == null ? '' : m)) : void 0 } }), n.extend({ valHooks: { option: { get: function (g) { const i = n.find.attr(g, 'value'); return i != null ? i : c(n.text(g)) } }, select: { get: function (g) { let i; let m; let d; const p = g.options; const b = g.selectedIndex; const v = g.type === 'select-one'; const x = v ? null : []; const P = v ? b + 1 : p.length; for (b < 0 ? d = P : d = v ? b : 0; d < P; d++) if (m = p[d], (m.selected || d === b) && !m.disabled && (!m.parentNode.disabled || !l(m.parentNode, 'optgroup'))) { if (i = n(m).val(), v) return i; x.push(i) } return x }, set: function (g, i) { for (var m, d, p = g.options, b = n.makeArray(i), v = p.length; v--;)d = p[v], (d.selected = n.inArray(n.valHooks.option.get(d), b) > -1) && (m = !0); return m || (g.selectedIndex = -1), b } } } }), n.each(['radio', 'checkbox'], function () { n.valHooks[this] = { set: function (g, i) { if (Array.isArray(i)) return g.checked = n.inArray(n(g).val(), i) > -1 } }, f.checkOn || (n.valHooks[this].get = function (g) { return g.getAttribute('value') === null ? 'on' : g.value }) }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8924: (w, y, a) => { let h, r; h = [a(8934), a(8082), a(2134), a(8663)], r = (function (n, c, f, l) { 'use strict'; function s (u) { const g = {}; return n.each(u.match(l) || [], function (i, m) { g[m] = !0 }), g } return n.Callbacks = function (u) { u = typeof u === 'string' ? s(u) : n.extend({}, u); let g; let i; let m; let d; let p = []; let b = []; let v = -1; const x = function () { for (d = d || u.once, m = g = !0; b.length; v = -1) for (i = b.shift(); ++v < p.length;)p[v].apply(i[0], i[1]) === !1 && u.stopOnFalse && (v = p.length, i = !1); u.memory || (i = !1), g = !1, d && (i ? p = [] : p = '') }; var P = { add: function () { return p && (i && !g && (v = p.length - 1, b.push(i)), (function S (D) { n.each(D, function (A, T) { f(T) ? (!u.unique || !P.has(T)) && p.push(T) : T && T.length && c(T) !== 'string' && S(T) }) }(arguments)), i && !g && x()), this }, remove: function () { return n.each(arguments, function (S, D) { for (var A; (A = n.inArray(D, p, A)) > -1;)p.splice(A, 1), A <= v && v-- }), this }, has: function (S) { return S ? n.inArray(S, p) > -1 : p.length > 0 }, empty: function () { return p && (p = []), this }, disable: function () { return d = b = [], p = i = '', this }, disabled: function () { return !p }, lock: function () { return d = b = [], !i && !g && (p = i = ''), this }, locked: function () { return !!d }, fireWith: function (S, D) { return d || (D = D || [], D = [S, D.slice ? D.slice() : D], b.push(D), g || x()), this }, fire: function () { return P.fireWith(this, arguments), this }, fired: function () { return !!m } }; return P }, n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8934: (w, y, a) => { let h, r; h = [a(3727), a(8045), a(3623), a(3932), a(1780), a(5431), a(5949), a(7763), a(9694), a(4194), a(3), a(9523), a(2134), a(9031), a(1224), a(8082)], r = (function (n, c, f, l, s, u, g, i, m, d, p, b, v, x, P, S) { 'use strict'; const D = '3.6.0'; var A = function (C, N) { return new A.fn.init(C, N) }; A.fn = A.prototype = { jquery: D, constructor: A, length: 0, toArray: function () { return f.call(this) }, get: function (C) { return C == null ? f.call(this) : C < 0 ? this[C + this.length] : this[C] }, pushStack: function (C) { const N = A.merge(this.constructor(), C); return N.prevObject = this, N }, each: function (C) { return A.each(this, C) }, map: function (C) { return this.pushStack(A.map(this, function (N, L) { return C.call(N, L, N) })) }, slice: function () { return this.pushStack(f.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, even: function () { return this.pushStack(A.grep(this, function (C, N) { return (N + 1) % 2 })) }, odd: function () { return this.pushStack(A.grep(this, function (C, N) { return N % 2 })) }, eq: function (C) { const N = this.length; const L = +C + (C < 0 ? N : 0); return this.pushStack(L >= 0 && L < N ? [this[L]] : []) }, end: function () { return this.prevObject || this.constructor() }, push: s, sort: n.sort, splice: n.splice }, A.extend = A.fn.extend = function () { let C; let N; let L; let R; let B; let O; let F = arguments[0] || {}; let q = 1; const _ = arguments.length; let W = !1; for (typeof F === 'boolean' && (W = F, F = arguments[q] || {}, q++), typeof F !== 'object' && !v(F) && (F = {}), q === _ && (F = this, q--); q < _; q++) if ((C = arguments[q]) != null) for (N in C)R = C[N], !(N === '__proto__' || F === R) && (W && R && (A.isPlainObject(R) || (B = Array.isArray(R))) ? (L = F[N], B && !Array.isArray(L) ? O = [] : !B && !A.isPlainObject(L) ? O = {} : O = L, B = !1, F[N] = A.extend(W, O, R)) : R !== void 0 && (F[N] = R)); return F }, A.extend({ expando: 'jQuery' + (D + Math.random()).replace(/\D/g, ''), isReady: !0, error: function (C) { throw new Error(C) }, noop: function () {}, isPlainObject: function (C) { let N, L; return !C || i.call(C) !== '[object Object]' ? !1 : (N = c(C), N ? (L = m.call(N, 'constructor') && N.constructor, typeof L === 'function' && d.call(L) === p) : !0) }, isEmptyObject: function (C) { let N; for (N in C) return !1; return !0 }, globalEval: function (C, N, L) { P(C, { nonce: N && N.nonce }, L) }, each: function (C, N) { let L; let R = 0; if (T(C)) for (L = C.length; R < L && N.call(C[R], R, C[R]) !== !1; R++);else for (R in C) if (N.call(C[R], R, C[R]) === !1) break; return C }, makeArray: function (C, N) { const L = N || []; return C != null && (T(Object(C)) ? A.merge(L, typeof C === 'string' ? [C] : C) : s.call(L, C)), L }, inArray: function (C, N, L) { return N == null ? -1 : u.call(N, C, L) }, merge: function (C, N) { for (var L = +N.length, R = 0, B = C.length; R < L; R++)C[B++] = N[R]; return C.length = B, C }, grep: function (C, N, L) { for (var R, B = [], O = 0, F = C.length, q = !L; O < F; O++)R = !N(C[O], O), R !== q && B.push(C[O]); return B }, map: function (C, N, L) { let R; let B; let O = 0; const F = []; if (T(C)) for (R = C.length; O < R; O++)B = N(C[O], O, L), B != null && F.push(B); else for (O in C)B = N(C[O], O, L), B != null && F.push(B); return l(F) }, guid: 1, support: b }), typeof Symbol === 'function' && (A.fn[Symbol.iterator] = n[Symbol.iterator]), A.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (C, N) { g['[object ' + N + ']'] = N.toLowerCase() }); function T (C) { const N = !!C && 'length' in C && C.length; const L = S(C); return v(C) || x(C) ? !1 : L === 'array' || N === 0 || typeof N === 'number' && N > 0 && N - 1 in C } return A }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1224: (w, y, a) => { let h, r; h = [a(7792)], r = (function (n) { 'use strict'; const c = { type: !0, src: !0, nonce: !0, noModule: !0 }; function f (l, s, u) { u = u || n; let g; let i; const m = u.createElement('script'); if (m.text = l, s) for (g in c)i = s[g] || s.getAttribute && s.getAttribute(g), i && m.setAttribute(g, i); u.head.appendChild(m).parentNode.removeChild(m) } return f }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7163: (w, y, a) => { let h, r; h = [a(8934), a(8082), a(2134)], r = (function (n, c, f) { 'use strict'; var l = function (s, u, g, i, m, d, p) { let b = 0; const v = s.length; let x = g == null; if (c(g) === 'object') { m = !0; for (b in g)l(s, u, b, g[b], !0, d, p) } else if (i !== void 0 && (m = !0, f(i) || (p = !0), x && (p ? (u.call(s, i), u = null) : (x = u, u = function (P, S, D) { return x.call(n(P), D) })), u)) for (;b < v; b++)u(s[b], g, p ? i : i.call(s[b], b, u(s[b], g))); return m ? s : x ? u.call(s) : v ? u(s[0], g) : d }; return l }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1133: (w, y) => { let a, h; a = [], h = (function () { 'use strict'; const r = /^-ms-/; const n = /-([a-z])/g; function c (l, s) { return s.toUpperCase() } function f (l) { return l.replace(r, 'ms-').replace(n, c) } return f }.apply(y, a)), h !== void 0 && (w.exports = h) },
    8048: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(2134), a(5250), a(1764)], r = (function (n, c, f, l) { 'use strict'; let s; const u = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/; const g = n.fn.init = function (i, m, d) { let p, b; if (!i) return this; if (d = d || s, typeof i === 'string') if (i[0] === '<' && i[i.length - 1] === '>' && i.length >= 3 ? p = [null, i, null] : p = u.exec(i), p && (p[1] || !m)) if (p[1]) { if (m = m instanceof n ? m[0] : m, n.merge(this, n.parseHTML(p[1], m && m.nodeType ? m.ownerDocument || m : c, !0)), l.test(p[1]) && n.isPlainObject(m)) for (p in m)f(this[p]) ? this[p](m[p]) : this.attr(p, m[p]); return this } else return b = c.getElementById(p[2]), b && (this[0] = b, this.length = 1), this; else return !m || m.jquery ? (m || d).find(i) : this.constructor(m).find(i); else { if (i.nodeType) return this[0] = i, this.length = 1, this; if (f(i)) return d.ready !== void 0 ? d.ready(i) : i(n) } return n.makeArray(i, this) }; return g.prototype = n.fn, s = n(c), g }.apply(y, h)), r !== void 0 && (w.exports = r) },
    70: (w, y, a) => { let h, r; h = [a(8934), a(7730), a(655)], r = (function (n, c) { 'use strict'; let f = function (s) { return n.contains(s.ownerDocument, s) }; const l = { composed: !0 }; return c.getRootNode && (f = function (s) { return n.contains(s.ownerDocument, s) || s.getRootNode(l) === s.ownerDocument }), f }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7060: (w, y, a) => { let h; h = (function () { 'use strict'; function r (n, c) { return n.nodeName && n.nodeName.toLowerCase() === c.toLowerCase() } return r }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    2889: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(5250), a(3360), a(1622)], r = (function (n, c, f, l, s) { 'use strict'; return n.parseHTML = function (u, g, i) { if (typeof u !== 'string') return []; typeof g === 'boolean' && (i = g, g = !1); let m, d, p; return g || (s.createHTMLDocument ? (g = c.implementation.createHTMLDocument(''), m = g.createElement('base'), m.href = c.location.href, g.head.appendChild(m)) : g = c), d = f.exec(u), p = !i && [], d ? [g.createElement(d[1])] : (d = l([u], g, p), p && p.length && n(p).remove(), n.merge([], d.childNodes)) }, n.parseHTML }.apply(y, h)), r !== void 0 && (w.exports = r) },
    461: (w, y, a) => {
      let h, r; h = [a(8934)], r = (function (n) {
        'use strict'; return n.parseXML = function (c) {
          let f, l; if (!c || typeof c !== 'string') return null; try { f = new window.DOMParser().parseFromString(c, 'text/xml') } catch (s) {} return l = f && f.getElementsByTagName('parsererror')[0], (!f || l) && n.error('Invalid XML: ' + (l
            ? n.map(l.childNodes, function (s) { return s.textContent }).join(`
`)
            : c)), f
        }, n.parseXML
      }.apply(y, h)), r !== void 0 && (w.exports = r)
    },
    5703: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(3442), a(6525)], r = (function (n, c) { 'use strict'; const f = n.Deferred(); n.fn.ready = function (s) { return f.then(s).catch(function (u) { n.readyException(u) }), this }, n.extend({ isReady: !1, readyWait: 1, ready: function (s) { (s === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, !(s !== !0 && --n.readyWait > 0) && f.resolveWith(c, [n])) } }), n.ready.then = f.then; function l () { c.removeEventListener('DOMContentLoaded', l), window.removeEventListener('load', l), n.ready() }c.readyState === 'complete' || c.readyState !== 'loading' && !c.documentElement.doScroll ? window.setTimeout(n.ready) : (c.addEventListener('DOMContentLoaded', l), window.addEventListener('load', l)) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3442: (w, y, a) => { let h, r; h = [a(8934)], r = (function (n) { 'use strict'; n.readyException = function (c) { window.setTimeout(function () { throw c }) } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4552: (w, y, a) => { let h, r; h = [a(8663)], r = (function (n) { 'use strict'; function c (f) { const l = f.match(n) || []; return l.join(' ') } return c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1622: (w, y, a) => { let h, r; h = [a(7792), a(9523)], r = (function (n, c) { 'use strict'; return c.createHTMLDocument = (function () { const f = n.implementation.createHTMLDocument('').body; return f.innerHTML = '<form></form><form></form>', f.childNodes.length === 2 }()), c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8082: (w, y, a) => { let h, r; h = [a(5949), a(7763)], r = (function (n, c) { 'use strict'; function f (l) { return l == null ? l + '' : typeof l === 'object' || typeof l === 'function' ? n[c.call(l)] || 'object' : typeof l } return f }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5250: (w, y, a) => { let h; h = (function () { 'use strict'; return /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    8515: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(1133), a(7060), a(6871), a(618), a(5057), a(3122), a(5410), a(610), a(7432), a(3781), a(4405), a(3997), a(8048), a(5703), a(655)], r = (function (n, c, f, l, s, u, g, i, m, d, p, b, v, x) { 'use strict'; const P = /^(none|table(?!-c[ea]).+)/; const S = /^--/; const D = { position: 'absolute', visibility: 'hidden', display: 'block' }; const A = { letterSpacing: '0', fontWeight: '400' }; function T (L, R, B) { const O = s.exec(R); return O ? Math.max(0, O[2] - (B || 0)) + (O[3] || 'px') : R } function C (L, R, B, O, F, q) { let _ = R === 'width' ? 1 : 0; let W = 0; let H = 0; if (B === (O ? 'border' : 'content')) return 0; for (;_ < 4; _ += 2)B === 'margin' && (H += n.css(L, B + g[_], !0, F)), O ? (B === 'content' && (H -= n.css(L, 'padding' + g[_], !0, F)), B !== 'margin' && (H -= n.css(L, 'border' + g[_] + 'Width', !0, F))) : (H += n.css(L, 'padding' + g[_], !0, F), B !== 'padding' ? H += n.css(L, 'border' + g[_] + 'Width', !0, F) : W += n.css(L, 'border' + g[_] + 'Width', !0, F)); return !O && q >= 0 && (H += Math.max(0, Math.ceil(L['offset' + R[0].toUpperCase() + R.slice(1)] - q - H - W - 0.5)) || 0), H } function N (L, R, B) { const O = i(L); const F = !v.boxSizingReliable() || B; let q = F && n.css(L, 'boxSizing', !1, O) === 'border-box'; let _ = q; let W = d(L, R, O); const H = 'offset' + R[0].toUpperCase() + R.slice(1); if (u.test(W)) { if (!B) return W; W = 'auto' } return (!v.boxSizingReliable() && q || !v.reliableTrDimensions() && l(L, 'tr') || W === 'auto' || !parseFloat(W) && n.css(L, 'display', !1, O) === 'inline') && L.getClientRects().length && (q = n.css(L, 'boxSizing', !1, O) === 'border-box', _ = H in L, _ && (W = L[H])), W = parseFloat(W) || 0, W + C(L, R, B || (q ? 'border' : 'content'), _, O, W) + 'px' } return n.extend({ cssHooks: { opacity: { get: function (L, R) { if (R) { const B = d(L, 'opacity'); return B === '' ? '1' : B } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function (L, R, B, O) { if (!(!L || L.nodeType === 3 || L.nodeType === 8 || !L.style)) { let F; let q; let _; const W = f(R); const H = S.test(R); const $ = L.style; if (H || (R = x(W)), _ = n.cssHooks[R] || n.cssHooks[W], B !== void 0) { if (q = typeof B, q === 'string' && (F = s.exec(B)) && F[1] && (B = p(L, R, F), q = 'number'), B == null || B !== B) return; q === 'number' && !H && (B += F && F[3] || (n.cssNumber[W] ? '' : 'px')), !v.clearCloneStyle && B === '' && R.indexOf('background') === 0 && ($[R] = 'inherit'), (!_ || !('set' in _) || (B = _.set(L, B, O)) !== void 0) && (H ? $.setProperty(R, B) : $[R] = B) } else return _ && 'get' in _ && (F = _.get(L, !1, O)) !== void 0 ? F : $[R] } }, css: function (L, R, B, O) { let F; let q; let _; const W = f(R); const H = S.test(R); return H || (R = x(W)), _ = n.cssHooks[R] || n.cssHooks[W], _ && 'get' in _ && (F = _.get(L, !0, B)), F === void 0 && (F = d(L, R, O)), F === 'normal' && R in A && (F = A[R]), B === '' || B ? (q = parseFloat(F), B === !0 || isFinite(q) ? q || 0 : F) : F } }), n.each(['height', 'width'], function (L, R) { n.cssHooks[R] = { get: function (B, O, F) { if (O) return P.test(n.css(B, 'display')) && (!B.getClientRects().length || !B.getBoundingClientRect().width) ? m(B, D, function () { return N(B, R, F) }) : N(B, R, F) }, set: function (B, O, F) { let q; const _ = i(B); const W = !v.scrollboxSize() && _.position === 'absolute'; const H = W || F; const $ = H && n.css(B, 'boxSizing', !1, _) === 'border-box'; let K = F ? C(B, R, F, $, _) : 0; return $ && W && (K -= Math.ceil(B['offset' + R[0].toUpperCase() + R.slice(1)] - parseFloat(_[R]) - C(B, R, 'border', !1, _) - 0.5)), K && (q = s.exec(O)) && (q[3] || 'px') !== 'px' && (B.style[R] = O, O = n.css(B, R)), T(B, O, K) } } }), n.cssHooks.marginLeft = b(v.reliableMarginLeft, function (L, R) { if (R) return (parseFloat(d(L, 'marginLeft')) || L.getBoundingClientRect().left - m(L, { marginLeft: 0 }, function () { return L.getBoundingClientRect().left })) + 'px' }), n.each({ margin: '', padding: '', border: 'Width' }, function (L, R) { n.cssHooks[L + R] = { expand: function (B) { for (var O = 0, F = {}, q = typeof B === 'string' ? B.split(' ') : [B]; O < 4; O++)F[L + g[O] + R] = q[O] || q[O - 2] || q[0]; return F } }, L !== 'margin' && (n.cssHooks[L + R].set = T) }), n.fn.extend({ css: function (L, R) { return c(this, function (B, O, F) { let q; let _; const W = {}; let H = 0; if (Array.isArray(O)) { for (q = i(B), _ = O.length; H < _; H++)W[O[H]] = n.css(B, O[H], !1, q); return W } return F !== void 0 ? n.style(B, O, F) : n.css(B, O) }, L, R, arguments.length > 1) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3781: (w, y, a) => { let h; h = (function () { 'use strict'; function r (n, c) { return { get: function () { if (n()) { delete this.get; return } return (this.get = c).apply(this, arguments) } } } return r }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    7432: (w, y, a) => { let h, r; h = [a(8934), a(6871)], r = (function (n, c) { 'use strict'; function f (l, s, u, g) { let i; let m; let d = 20; const p = g ? function () { return g.cur() } : function () { return n.css(l, s, '') }; let b = p(); let v = u && u[3] || (n.cssNumber[s] ? '' : 'px'); let x = l.nodeType && (n.cssNumber[s] || v !== 'px' && +b) && c.exec(n.css(l, s)); if (x && x[3] !== v) { for (b = b / 2, v = v || x[3], x = +b || 1; d--;)n.style(l, s, x + v), (1 - m) * (1 - (m = p() / b || 0.5)) <= 0 && (d = 0), x = x / m; x = x * 2, n.style(l, s, x + v), u = u || [] } return u && (x = +x || +b || 0, i = u[1] ? x + (u[1] + 1) * u[2] : +u[2], g && (g.unit = v, g.start = x, g.end = i)), i } return f }.apply(y, h)), r !== void 0 && (w.exports = r) },
    610: (w, y, a) => { let h, r; h = [a(8934), a(70), a(3151), a(618), a(3122), a(4405)], r = (function (n, c, f, l, s, u) { 'use strict'; function g (i, m, d) { let p; let b; let v; let x; const P = i.style; return d = d || s(i), d && (x = d.getPropertyValue(m) || d[m], x === '' && !c(i) && (x = n.style(i, m)), !u.pixelBoxStyles() && l.test(x) && f.test(m) && (p = P.width, b = P.minWidth, v = P.maxWidth, P.minWidth = P.maxWidth = P.width = x, x = d.width, P.width = p, P.minWidth = b, P.maxWidth = v)), x !== void 0 ? x + '' : x } return g }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3997: (w, y, a) => { let h, r; h = [a(7792), a(8934)], r = (function (n, c) { 'use strict'; const f = ['Webkit', 'Moz', 'ms']; const l = n.createElement('div').style; const s = {}; function u (i) { for (let m = i[0].toUpperCase() + i.slice(1), d = f.length; d--;) if (i = f[d] + m, i in l) return i } function g (i) { const m = c.cssProps[i] || s[i]; return m || (i in l ? i : s[i] = u(i) || i) } return g }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2365: (w, y, a) => { let h, r; h = [a(8934), a(655)], r = (function (n) { 'use strict'; n.expr.pseudos.hidden = function (c) { return !n.expr.pseudos.visible(c) }, n.expr.pseudos.visible = function (c) { return !!(c.offsetWidth || c.offsetHeight || c.getClientRects().length) } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8516: (w, y, a) => { let h, r; h = [a(8934), a(9081), a(5626)], r = (function (n, c, f) { 'use strict'; const l = {}; function s (g) { let i; const m = g.ownerDocument; const d = g.nodeName; let p = l[d]; return p || (i = m.body.appendChild(m.createElement(d)), p = n.css(i, 'display'), i.parentNode.removeChild(i), p === 'none' && (p = 'block'), l[d] = p, p) } function u (g, i) { for (var m, d, p = [], b = 0, v = g.length; b < v; b++)d = g[b], d.style && (m = d.style.display, i ? (m === 'none' && (p[b] = c.get(d, 'display') || null, p[b] || (d.style.display = '')), d.style.display === '' && f(d) && (p[b] = s(d))) : m !== 'none' && (p[b] = 'none', c.set(d, 'display', m))); for (b = 0; b < v; b++)p[b] != null && (g[b].style.display = p[b]); return g } return n.fn.extend({ show: function () { return u(this, !0) }, hide: function () { return u(this) }, toggle: function (g) { return typeof g === 'boolean' ? g ? this.show() : this.hide() : this.each(function () { f(this) ? n(this).show() : n(this).hide() }) } }), u }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4405: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(7730), a(9523)], r = (function (n, c, f, l) { 'use strict'; return (function () { function s () { if (x) { v.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0', x.style.cssText = 'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%', f.appendChild(v).appendChild(x); const P = window.getComputedStyle(x); g = P.top !== '1%', b = u(P.marginLeft) === 12, x.style.right = '60%', d = u(P.right) === 36, i = u(P.width) === 36, x.style.position = 'absolute', m = u(x.offsetWidth / 3) === 12, f.removeChild(v), x = null } } function u (P) { return Math.round(parseFloat(P)) } let g; let i; let m; let d; let p; let b; var v = c.createElement('div'); var x = c.createElement('div'); !x.style || (x.style.backgroundClip = 'content-box', x.cloneNode(!0).style.backgroundClip = '', l.clearCloneStyle = x.style.backgroundClip === 'content-box', n.extend(l, { boxSizingReliable: function () { return s(), i }, pixelBoxStyles: function () { return s(), d }, pixelPosition: function () { return s(), g }, reliableMarginLeft: function () { return s(), b }, scrollboxSize: function () { return s(), m }, reliableTrDimensions: function () { let P, S, D, A; return p == null && (P = c.createElement('table'), S = c.createElement('tr'), D = c.createElement('div'), P.style.cssText = 'position:absolute;left:-11111px;border-collapse:separate', S.style.cssText = 'border:1px solid', S.style.height = '1px', D.style.height = '9px', D.style.display = 'block', f.appendChild(P).appendChild(S).appendChild(D), A = window.getComputedStyle(S), p = parseInt(A.height, 10) + parseInt(A.borderTopWidth, 10) + parseInt(A.borderBottomWidth, 10) === S.offsetHeight, f.removeChild(P)), p } })) }()), l }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5057: (w, y, a) => { let h; h = (function () { 'use strict'; return ['Top', 'Right', 'Bottom', 'Left'] }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    3122: (w, y, a) => { let h; h = (function () { 'use strict'; return function (r) { let n = r.ownerDocument.defaultView; return (!n || !n.opener) && (n = window), n.getComputedStyle(r) } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    5626: (w, y, a) => { let h, r; h = [a(8934), a(70)], r = (function (n, c) { 'use strict'; return function (f, l) { return f = l || f, f.style.display === 'none' || f.style.display === '' && c(f) && n.css(f, 'display') === 'none' } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3151: (w, y, a) => { let h, r; h = [a(5057)], r = (function (n) { 'use strict'; return new RegExp(n.join('|'), 'i') }.apply(y, h)), r !== void 0 && (w.exports = r) },
    618: (w, y, a) => { let h, r; h = [a(8308)], r = (function (n) { 'use strict'; return new RegExp('^(' + n + ')(?!px)[a-z%]+$', 'i') }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5410: (w, y, a) => { let h; h = (function () { 'use strict'; return function (r, n, c) { let f; let l; const s = {}; for (l in n)s[l] = r.style[l], r.style[l] = n[l]; f = c.call(r); for (l in n)r.style[l] = s[l]; return f } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    1786: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(1133), a(9081), a(2109)], r = (function (n, c, f, l, s) { 'use strict'; const u = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/; const g = /[A-Z]/g; function i (d) { return d === 'true' ? !0 : d === 'false' ? !1 : d === 'null' ? null : d === +d + '' ? +d : u.test(d) ? JSON.parse(d) : d } function m (d, p, b) { let v; if (b === void 0 && d.nodeType === 1) if (v = 'data-' + p.replace(g, '-$&').toLowerCase(), b = d.getAttribute(v), typeof b === 'string') { try { b = i(b) } catch (x) {}s.set(d, p, b) } else b = void 0; return b } return n.extend({ hasData: function (d) { return s.hasData(d) || l.hasData(d) }, data: function (d, p, b) { return s.access(d, p, b) }, removeData: function (d, p) { s.remove(d, p) }, _data: function (d, p, b) { return l.access(d, p, b) }, _removeData: function (d, p) { l.remove(d, p) } }), n.fn.extend({ data: function (d, p) { let b; let v; let x; const P = this[0]; const S = P && P.attributes; if (d === void 0) { if (this.length && (x = s.get(P), P.nodeType === 1 && !l.get(P, 'hasDataAttrs'))) { for (b = S.length; b--;)S[b] && (v = S[b].name, v.indexOf('data-') === 0 && (v = f(v.slice(5)), m(P, v, x[v]))); l.set(P, 'hasDataAttrs', !0) } return x } return typeof d === 'object' ? this.each(function () { s.set(this, d) }) : c(this, function (D) { let A; if (P && D === void 0) return A = s.get(P, d), A !== void 0 || (A = m(P, d), A !== void 0) ? A : void 0; this.each(function () { s.set(this, d, D) }) }, null, p, arguments.length > 1, null, !0) }, removeData: function (d) { return this.each(function () { s.remove(this, d) }) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7172: (w, y, a) => { let h, r; h = [a(8934), a(1133), a(8663), a(2238)], r = (function (n, c, f, l) { 'use strict'; function s () { this.expando = n.expando + s.uid++ } return s.uid = 1, s.prototype = { cache: function (u) { let g = u[this.expando]; return g || (g = {}, l(u) && (u.nodeType ? u[this.expando] = g : Object.defineProperty(u, this.expando, { value: g, configurable: !0 }))), g }, set: function (u, g, i) { let m; const d = this.cache(u); if (typeof g === 'string')d[c(g)] = i; else for (m in g)d[c(m)] = g[m]; return d }, get: function (u, g) { return g === void 0 ? this.cache(u) : u[this.expando] && u[this.expando][c(g)] }, access: function (u, g, i) { return g === void 0 || g && typeof g === 'string' && i === void 0 ? this.get(u, g) : (this.set(u, g, i), i !== void 0 ? i : g) }, remove: function (u, g) { let i; const m = u[this.expando]; if (m !== void 0) { if (g !== void 0) for (Array.isArray(g) ? g = g.map(c) : (g = c(g), g = g in m ? [g] : g.match(f) || []), i = g.length; i--;) delete m[g[i]]; (g === void 0 || n.isEmptyObject(m)) && (u.nodeType ? u[this.expando] = void 0 : delete u[this.expando]) } }, hasData: function (u) { const g = u[this.expando]; return g !== void 0 && !n.isEmptyObject(g) } }, s }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2238: (w, y, a) => { let h; h = (function () { 'use strict'; return function (r) { return r.nodeType === 1 || r.nodeType === 9 || !+r.nodeType } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    9081: (w, y, a) => { let h, r; h = [a(7172)], r = (function (n) { 'use strict'; return new n() }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2109: (w, y, a) => { let h, r; h = [a(7172)], r = (function (n) { 'use strict'; return new n() }.apply(y, h)), r !== void 0 && (w.exports = r) },
    6525: (w, y, a) => { let h, r; h = [a(8934), a(2134), a(3623), a(8924)], r = (function (n, c, f) { 'use strict'; function l (g) { return g } function s (g) { throw g } function u (g, i, m, d) { let p; try { g && c(p = g.promise) ? p.call(g).done(i).fail(m) : g && c(p = g.then) ? p.call(g, i, m) : i.apply(void 0, [g].slice(d)) } catch (b) { m.apply(void 0, [b]) } } return n.extend({ Deferred: function (g) { const i = [['notify', 'progress', n.Callbacks('memory'), n.Callbacks('memory'), 2], ['resolve', 'done', n.Callbacks('once memory'), n.Callbacks('once memory'), 0, 'resolved'], ['reject', 'fail', n.Callbacks('once memory'), n.Callbacks('once memory'), 1, 'rejected']]; let m = 'pending'; var d = { state: function () { return m }, always: function () { return p.done(arguments).fail(arguments), this }, catch: function (b) { return d.then(null, b) }, pipe: function () { let b = arguments; return n.Deferred(function (v) { n.each(i, function (x, P) { const S = c(b[P[4]]) && b[P[4]]; p[P[1]](function () { const D = S && S.apply(this, arguments); D && c(D.promise) ? D.promise().progress(v.notify).done(v.resolve).fail(v.reject) : v[P[0] + 'With'](this, S ? [D] : arguments) }) }), b = null }).promise() }, then: function (b, v, x) { let P = 0; function S (D, A, T, C) { return function () { let N = this; let L = arguments; const R = function () { let O, F; if (!(D < P)) { if (O = T.apply(N, L), O === A.promise()) throw new TypeError('Thenable self-resolution'); F = O && (typeof O === 'object' || typeof O === 'function') && O.then, c(F) ? C ? F.call(O, S(P, A, l, C), S(P, A, s, C)) : (P++, F.call(O, S(P, A, l, C), S(P, A, s, C), S(P, A, l, A.notifyWith))) : (T !== l && (N = void 0, L = [O]), (C || A.resolveWith)(N, L)) } }; var B = C ? R : function () { try { R() } catch (O) { n.Deferred.exceptionHook && n.Deferred.exceptionHook(O, B.stackTrace), D + 1 >= P && (T !== s && (N = void 0, L = [O]), A.rejectWith(N, L)) } }; D ? B() : (n.Deferred.getStackHook && (B.stackTrace = n.Deferred.getStackHook()), window.setTimeout(B)) } } return n.Deferred(function (D) { i[0][3].add(S(0, D, c(x) ? x : l, D.notifyWith)), i[1][3].add(S(0, D, c(b) ? b : l)), i[2][3].add(S(0, D, c(v) ? v : s)) }).promise() }, promise: function (b) { return b != null ? n.extend(b, d) : d } }; var p = {}; return n.each(i, function (b, v) { const x = v[2]; const P = v[5]; d[v[1]] = x.add, P && x.add(function () { m = P }, i[3 - b][2].disable, i[3 - b][3].disable, i[0][2].lock, i[0][3].lock), x.add(v[3].fire), p[v[0]] = function () { return p[v[0] + 'With'](this === p ? void 0 : this, arguments), this }, p[v[0] + 'With'] = x.fireWith }), d.promise(p), g && g.call(p, p), p }, when: function (g) { let i = arguments.length; let m = i; const d = Array(m); const p = f.call(arguments); const b = n.Deferred(); const v = function (x) { return function (P) { d[x] = this, p[x] = arguments.length > 1 ? f.call(arguments) : P, --i || b.resolveWith(d, p) } }; if (i <= 1 && (u(g, b.done(v(m)).resolve, b.reject, !i), b.state() === 'pending' || c(p[m] && p[m].then))) return b.then(); for (;m--;)u(p[m], v(m), b.reject); return b.promise() } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1009: (w, y, a) => { let h, r; h = [a(8934), a(6525)], r = (function (n) { 'use strict'; const c = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/; n.Deferred.exceptionHook = function (f, l) { window.console && window.console.warn && f && c.test(f.name) && window.console.warn('jQuery.Deferred exception: ' + f.message, f.stack, l) } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7722: (w, y, a) => { let h, r; h = [a(8934), a(7060), a(1133), a(8082), a(2134), a(9031), a(3623), a(7982), a(8138)], r = (function (n, c, f, l, s, u, g) { 'use strict'; const i = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; n.proxy = function (m, d) { let p, b, v; if (typeof d === 'string' && (p = m[d], d = m, m = p), !!s(m)) return b = g.call(arguments, 2), v = function () { return m.apply(d || this, b.concat(g.call(arguments))) }, v.guid = m.guid = m.guid || n.guid++, v }, n.holdReady = function (m) { m ? n.readyWait++ : n.ready(!0) }, n.isArray = Array.isArray, n.parseJSON = JSON.parse, n.nodeName = c, n.isFunction = s, n.isWindow = u, n.camelCase = f, n.type = l, n.now = Date.now, n.isNumeric = function (m) { const d = n.type(m); return (d === 'number' || d === 'string') && !isNaN(m - parseFloat(m)) }, n.trim = function (m) { return m == null ? '' : (m + '').replace(i, '') } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7982: (w, y, a) => { let h, r; h = [a(8934), a(7178), a(7881)], r = (function (n) { 'use strict'; n.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (c, f) { n.fn[f] = function (l) { return this.on(f, l) } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8138: (w, y, a) => { let h, r; h = [a(8934), a(7881), a(1045)], r = (function (n) { 'use strict'; n.fn.extend({ bind: function (c, f, l) { return this.on(c, null, f, l) }, unbind: function (c, f) { return this.off(c, null, f) }, delegate: function (c, f, l, s) { return this.on(f, c, l, s) }, undelegate: function (c, f, l) { return arguments.length === 1 ? this.off(c, '**') : this.off(f, c || '**', l) }, hover: function (c, f) { return this.mouseenter(c).mouseleave(f || c) } }), n.each('blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(' '), function (c, f) { n.fn[f] = function (l, s) { return arguments.length > 0 ? this.on(f, null, l, s) : this.trigger(f) } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5126: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(9031), a(8515)], r = (function (n, c, f) { 'use strict'; return n.each({ Height: 'height', Width: 'width' }, function (l, s) { n.each({ padding: 'inner' + l, content: s, '': 'outer' + l }, function (u, g) { n.fn[g] = function (i, m) { const d = arguments.length && (u || typeof i !== 'boolean'); const p = u || (i === !0 || m === !0 ? 'margin' : 'border'); return c(this, function (b, v, x) { let P; return f(b) ? g.indexOf('outer') === 0 ? b['inner' + l] : b.document.documentElement['client' + l] : b.nodeType === 9 ? (P = b.documentElement, Math.max(b.body['scroll' + l], P['scroll' + l], b.body['offset' + l], P['offset' + l], P['client' + l])) : x === void 0 ? n.css(b, v, p) : n.style(b, v, x, p) }, s, d ? i : void 0, d) } }) }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7429: (w, y, a) => { let h, r; h = [a(8934), a(1133), a(7792), a(2134), a(6871), a(8663), a(5057), a(5626), a(7432), a(9081), a(8516), a(8048), a(1387), a(6525), a(8482), a(2632), a(8515), a(8314)], r = (function (n, c, f, l, s, u, g, i, m, d, p) { 'use strict'; let b; let v; const x = /^(?:toggle|show|hide)$/; const P = /queueHooks$/; function S () { v && (f.hidden === !1 && window.requestAnimationFrame ? window.requestAnimationFrame(S) : window.setTimeout(S, n.fx.interval), n.fx.tick()) } function D () { return window.setTimeout(function () { b = void 0 }), b = Date.now() } function A (R, B) { let O; let F = 0; const q = { height: R }; for (B = B ? 1 : 0; F < 4; F += 2 - B)O = g[F], q['margin' + O] = q['padding' + O] = R; return B && (q.opacity = q.width = R), q } function T (R, B, O) { for (var F, q = (L.tweeners[B] || []).concat(L.tweeners['*']), _ = 0, W = q.length; _ < W; _++) if (F = q[_].call(O, B, R)) return F } function C (R, B, O) { let F; let q; let _; let W; let H; let $; let K; let te; const oe = 'width' in B || 'height' in B; const he = this; const Q = {}; const ye = R.style; let Ae = R.nodeType && i(R); let Ke = d.get(R, 'fxshow'); O.queue || (W = n._queueHooks(R, 'fx'), W.unqueued == null && (W.unqueued = 0, H = W.empty.fire, W.empty.fire = function () { W.unqueued || H() }), W.unqueued++, he.always(function () { he.always(function () { W.unqueued--, n.queue(R, 'fx').length || W.empty.fire() }) })); for (F in B) if (q = B[F], x.test(q)) { if (delete B[F], _ = _ || q === 'toggle', q === (Ae ? 'hide' : 'show')) if (q === 'show' && Ke && Ke[F] !== void 0)Ae = !0; else continue; Q[F] = Ke && Ke[F] || n.style(R, F) } if ($ = !n.isEmptyObject(B), !(!$ && n.isEmptyObject(Q))) { oe && R.nodeType === 1 && (O.overflow = [ye.overflow, ye.overflowX, ye.overflowY], K = Ke && Ke.display, K == null && (K = d.get(R, 'display')), te = n.css(R, 'display'), te === 'none' && (K ? te = K : (p([R], !0), K = R.style.display || K, te = n.css(R, 'display'), p([R]))), (te === 'inline' || te === 'inline-block' && K != null) && n.css(R, 'float') === 'none' && ($ || (he.done(function () { ye.display = K }), K == null && (te = ye.display, K = te === 'none' ? '' : te)), ye.display = 'inline-block')), O.overflow && (ye.overflow = 'hidden', he.always(function () { ye.overflow = O.overflow[0], ye.overflowX = O.overflow[1], ye.overflowY = O.overflow[2] })), $ = !1; for (F in Q)$ || (Ke ? 'hidden' in Ke && (Ae = Ke.hidden) : Ke = d.access(R, 'fxshow', { display: K }), _ && (Ke.hidden = !Ae), Ae && p([R], !0), he.done(function () { Ae || p([R]), d.remove(R, 'fxshow'); for (F in Q)n.style(R, F, Q[F]) })), $ = T(Ae ? Ke[F] : 0, F, he), F in Ke || (Ke[F] = $.start, Ae && ($.end = $.start, $.start = 0)) } } function N (R, B) { let O, F, q, _, W; for (O in R) if (F = c(O), q = B[F], _ = R[O], Array.isArray(_) && (q = _[1], _ = R[O] = _[0]), O !== F && (R[F] = _, delete R[O]), W = n.cssHooks[F], W && 'expand' in W) { _ = W.expand(_), delete R[F]; for (O in _)O in R || (R[O] = _[O], B[O] = q) } else B[F] = q } function L (R, B, O) { let F; let q; let _ = 0; const W = L.prefilters.length; const H = n.Deferred().always(function () { delete $.elem }); var $ = function () { if (q) return !1; for (var oe = b || D(), he = Math.max(0, K.startTime + K.duration - oe), Q = he / K.duration || 0, ye = 1 - Q, Ae = 0, Ke = K.tweens.length; Ae < Ke; Ae++)K.tweens[Ae].run(ye); return H.notifyWith(R, [K, ye, he]), ye < 1 && Ke ? he : (Ke || H.notifyWith(R, [K, 1, 0]), H.resolveWith(R, [K]), !1) }; var K = H.promise({ elem: R, props: n.extend({}, B), opts: n.extend(!0, { specialEasing: {}, easing: n.easing._default }, O), originalProperties: B, originalOptions: O, startTime: b || D(), duration: O.duration, tweens: [], createTween: function (oe, he) { const Q = n.Tween(R, K.opts, oe, he, K.opts.specialEasing[oe] || K.opts.easing); return K.tweens.push(Q), Q }, stop: function (oe) { let he = 0; const Q = oe ? K.tweens.length : 0; if (q) return this; for (q = !0; he < Q; he++)K.tweens[he].run(1); return oe ? (H.notifyWith(R, [K, 1, 0]), H.resolveWith(R, [K, oe])) : H.rejectWith(R, [K, oe]), this } }); const te = K.props; for (N(te, K.opts.specialEasing); _ < W; _++) if (F = L.prefilters[_].call(K, R, te, K.opts), F) return l(F.stop) && (n._queueHooks(K.elem, K.opts.queue).stop = F.stop.bind(F)), F; return n.map(te, T, K), l(K.opts.start) && K.opts.start.call(R, K), K.progress(K.opts.progress).done(K.opts.done, K.opts.complete).fail(K.opts.fail).always(K.opts.always), n.fx.timer(n.extend($, { elem: R, anim: K, queue: K.opts.queue })), K } return n.Animation = n.extend(L, { tweeners: { '*': [function (R, B) { const O = this.createTween(R, B); return m(O.elem, R, s.exec(B), O), O }] }, tweener: function (R, B) { l(R) ? (B = R, R = ['*']) : R = R.match(u); for (var O, F = 0, q = R.length; F < q; F++)O = R[F], L.tweeners[O] = L.tweeners[O] || [], L.tweeners[O].unshift(B) }, prefilters: [C], prefilter: function (R, B) { B ? L.prefilters.unshift(R) : L.prefilters.push(R) } }), n.speed = function (R, B, O) { const F = R && typeof R === 'object' ? n.extend({}, R) : { complete: O || !O && B || l(R) && R, duration: R, easing: O && B || B && !l(B) && B }; return n.fx.off ? F.duration = 0 : typeof F.duration !== 'number' && (F.duration in n.fx.speeds ? F.duration = n.fx.speeds[F.duration] : F.duration = n.fx.speeds._default), (F.queue == null || F.queue === !0) && (F.queue = 'fx'), F.old = F.complete, F.complete = function () { l(F.old) && F.old.call(this), F.queue && n.dequeue(this, F.queue) }, F }, n.fn.extend({ fadeTo: function (R, B, O, F) { return this.filter(i).css('opacity', 0).show().end().animate({ opacity: B }, R, O, F) }, animate: function (R, B, O, F) { const q = n.isEmptyObject(R); const _ = n.speed(B, O, F); const W = function () { const H = L(this, n.extend({}, R), _); (q || d.get(this, 'finish')) && H.stop(!0) }; return W.finish = W, q || _.queue === !1 ? this.each(W) : this.queue(_.queue, W) }, stop: function (R, B, O) { const F = function (q) { const _ = q.stop; delete q.stop, _(O) }; return typeof R !== 'string' && (O = B, B = R, R = void 0), B && this.queue(R || 'fx', []), this.each(function () { let q = !0; let _ = R != null && R + 'queueHooks'; const W = n.timers; const H = d.get(this); if (_)H[_] && H[_].stop && F(H[_]); else for (_ in H)H[_] && H[_].stop && P.test(_) && F(H[_]); for (_ = W.length; _--;)W[_].elem === this && (R == null || W[_].queue === R) && (W[_].anim.stop(O), q = !1, W.splice(_, 1)); (q || !O) && n.dequeue(this, R) }) }, finish: function (R) { return R !== !1 && (R = R || 'fx'), this.each(function () { let B; const O = d.get(this); const F = O[R + 'queue']; const q = O[R + 'queueHooks']; const _ = n.timers; const W = F ? F.length : 0; for (O.finish = !0, n.queue(this, R, []), q && q.stop && q.stop.call(this, !0), B = _.length; B--;)_[B].elem === this && _[B].queue === R && (_[B].anim.stop(!0), _.splice(B, 1)); for (B = 0; B < W; B++)F[B] && F[B].finish && F[B].finish.call(this); delete O.finish }) } }), n.each(['toggle', 'show', 'hide'], function (R, B) { const O = n.fn[B]; n.fn[B] = function (F, q, _) { return F == null || typeof F === 'boolean' ? O.apply(this, arguments) : this.animate(A(B, !0), F, q, _) } }), n.each({ slideDown: A('show'), slideUp: A('hide'), slideToggle: A('toggle'), fadeIn: { opacity: 'show' }, fadeOut: { opacity: 'hide' }, fadeToggle: { opacity: 'toggle' } }, function (R, B) { n.fn[R] = function (O, F, q) { return this.animate(B, O, F, q) } }), n.timers = [], n.fx.tick = function () { let R; let B = 0; const O = n.timers; for (b = Date.now(); B < O.length; B++)R = O[B], !R() && O[B] === R && O.splice(B--, 1); O.length || n.fx.stop(), b = void 0 }, n.fx.timer = function (R) { n.timers.push(R), n.fx.start() }, n.fx.interval = 13, n.fx.start = function () { v || (v = !0, S()) }, n.fx.stop = function () { v = null }, n.fx.speeds = { slow: 600, fast: 200, _default: 400 }, n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8314: (w, y, a) => { let h, r; h = [a(8934), a(3997), a(8515)], r = (function (n, c) { 'use strict'; function f (l, s, u, g, i) { return new f.prototype.init(l, s, u, g, i) }n.Tween = f, f.prototype = { constructor: f, init: function (l, s, u, g, i, m) { this.elem = l, this.prop = u, this.easing = i || n.easing._default, this.options = s, this.start = this.now = this.cur(), this.end = g, this.unit = m || (n.cssNumber[u] ? '' : 'px') }, cur: function () { const l = f.propHooks[this.prop]; return l && l.get ? l.get(this) : f.propHooks._default.get(this) }, run: function (l) { let s; const u = f.propHooks[this.prop]; return this.options.duration ? this.pos = s = n.easing[this.easing](l, this.options.duration * l, 0, 1, this.options.duration) : this.pos = s = l, this.now = (this.end - this.start) * s + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), u && u.set ? u.set(this) : f.propHooks._default.set(this), this } }, f.prototype.init.prototype = f.prototype, f.propHooks = { _default: { get: function (l) { let s; return l.elem.nodeType !== 1 || l.elem[l.prop] != null && l.elem.style[l.prop] == null ? l.elem[l.prop] : (s = n.css(l.elem, l.prop, ''), !s || s === 'auto' ? 0 : s) }, set: function (l) { n.fx.step[l.prop] ? n.fx.step[l.prop](l) : l.elem.nodeType === 1 && (n.cssHooks[l.prop] || l.elem.style[c(l.prop)] != null) ? n.style(l.elem, l.prop, l.now + l.unit) : l.elem[l.prop] = l.now } } }, f.propHooks.scrollTop = f.propHooks.scrollLeft = { set: function (l) { l.elem.nodeType && l.elem.parentNode && (l.elem[l.prop] = l.now) } }, n.easing = { linear: function (l) { return l }, swing: function (l) { return 0.5 - Math.cos(l * Math.PI) / 2 }, _default: 'swing' }, n.fx = f.prototype.init, n.fx.step = {} }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8393: (w, y, a) => { let h, r; h = [a(8934), a(655), a(7429)], r = (function (n) { 'use strict'; n.expr.pseudos.animated = function (c) { return n.grep(n.timers, function (f) { return c === f.elem }).length } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7881: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(7730), a(2134), a(8663), a(8104), a(3623), a(2238), a(9081), a(7060), a(8048), a(655)], r = (function (n, c, f, l, s, u, g, i, m, d) { 'use strict'; const p = /^([^.]*)(?:\.(.+)|)/; function b () { return !0 } function v () { return !1 } function x (A, T) { return A === P() == (T === 'focus') } function P () { try { return c.activeElement } catch (A) {} } function S (A, T, C, N, L, R) { let B, O; if (typeof T === 'object') { typeof C !== 'string' && (N = N || C, C = void 0); for (O in T)S(A, O, C, N, T[O], R); return A } if (N == null && L == null ? (L = C, N = C = void 0) : L == null && (typeof C === 'string' ? (L = N, N = void 0) : (L = N, N = C, C = void 0)), L === !1)L = v; else if (!L) return A; return R === 1 && (B = L, L = function (F) { return n().off(F), B.apply(this, arguments) }, L.guid = B.guid || (B.guid = n.guid++)), A.each(function () { n.event.add(this, T, L, N, C) }) }n.event = { global: {}, add: function (A, T, C, N, L) { let R; let B; let O; let F; let q; let _; let W; let H; let $; let K; let te; const oe = m.get(A); if (i(A)) for (C.handler && (R = C, C = R.handler, L = R.selector), L && n.find.matchesSelector(f, L), C.guid || (C.guid = n.guid++), (F = oe.events) || (F = oe.events = Object.create(null)), (B = oe.handle) || (B = oe.handle = function (he) { return typeof n !== 'undefined' && n.event.triggered !== he.type ? n.event.dispatch.apply(A, arguments) : void 0 }), T = (T || '').match(s) || [''], q = T.length; q--;)O = p.exec(T[q]) || [], $ = te = O[1], K = (O[2] || '').split('.').sort(), $ && (W = n.event.special[$] || {}, $ = (L ? W.delegateType : W.bindType) || $, W = n.event.special[$] || {}, _ = n.extend({ type: $, origType: te, data: N, handler: C, guid: C.guid, selector: L, needsContext: L && n.expr.match.needsContext.test(L), namespace: K.join('.') }, R), (H = F[$]) || (H = F[$] = [], H.delegateCount = 0, (!W.setup || W.setup.call(A, N, K, B) === !1) && A.addEventListener && A.addEventListener($, B)), W.add && (W.add.call(A, _), _.handler.guid || (_.handler.guid = C.guid)), L ? H.splice(H.delegateCount++, 0, _) : H.push(_), n.event.global[$] = !0) }, remove: function (A, T, C, N, L) { let R; let B; let O; let F; let q; let _; let W; let H; let $; let K; let te; const oe = m.hasData(A) && m.get(A); if (!(!oe || !(F = oe.events))) { for (T = (T || '').match(s) || [''], q = T.length; q--;) { if (O = p.exec(T[q]) || [], $ = te = O[1], K = (O[2] || '').split('.').sort(), !$) { for ($ in F)n.event.remove(A, $ + T[q], C, N, !0); continue } for (W = n.event.special[$] || {}, $ = (N ? W.delegateType : W.bindType) || $, H = F[$] || [], O = O[2] && new RegExp('(^|\\.)' + K.join('\\.(?:.*\\.|)') + '(\\.|$)'), B = R = H.length; R--;)_ = H[R], (L || te === _.origType) && (!C || C.guid === _.guid) && (!O || O.test(_.namespace)) && (!N || N === _.selector || N === '**' && _.selector) && (H.splice(R, 1), _.selector && H.delegateCount--, W.remove && W.remove.call(A, _)); B && !H.length && ((!W.teardown || W.teardown.call(A, K, oe.handle) === !1) && n.removeEvent(A, $, oe.handle), delete F[$]) }n.isEmptyObject(F) && m.remove(A, 'handle events') } }, dispatch: function (A) { let T; let C; let N; let L; let R; let B; const O = new Array(arguments.length); const F = n.event.fix(A); const q = (m.get(this, 'events') || Object.create(null))[F.type] || []; const _ = n.event.special[F.type] || {}; for (O[0] = F, T = 1; T < arguments.length; T++)O[T] = arguments[T]; if (F.delegateTarget = this, !(_.preDispatch && _.preDispatch.call(this, F) === !1)) { for (B = n.event.handlers.call(this, F, q), T = 0; (L = B[T++]) && !F.isPropagationStopped();) for (F.currentTarget = L.elem, C = 0; (R = L.handlers[C++]) && !F.isImmediatePropagationStopped();)(!F.rnamespace || R.namespace === !1 || F.rnamespace.test(R.namespace)) && (F.handleObj = R, F.data = R.data, N = ((n.event.special[R.origType] || {}).handle || R.handler).apply(L.elem, O), N !== void 0 && (F.result = N) === !1 && (F.preventDefault(), F.stopPropagation())); return _.postDispatch && _.postDispatch.call(this, F), F.result } }, handlers: function (A, T) { let C; let N; let L; let R; let B; const O = []; const F = T.delegateCount; let q = A.target; if (F && q.nodeType && !(A.type === 'click' && A.button >= 1)) { for (;q !== this; q = q.parentNode || this) if (q.nodeType === 1 && !(A.type === 'click' && q.disabled === !0)) { for (R = [], B = {}, C = 0; C < F; C++)N = T[C], L = N.selector + ' ', B[L] === void 0 && (B[L] = N.needsContext ? n(L, this).index(q) > -1 : n.find(L, this, null, [q]).length), B[L] && R.push(N); R.length && O.push({ elem: q, handlers: R }) } } return q = this, F < T.length && O.push({ elem: q, handlers: T.slice(F) }), O }, addProp: function (A, T) { Object.defineProperty(n.Event.prototype, A, { enumerable: !0, configurable: !0, get: l(T) ? function () { if (this.originalEvent) return T(this.originalEvent) } : function () { if (this.originalEvent) return this.originalEvent[A] }, set: function (C) { Object.defineProperty(this, A, { enumerable: !0, configurable: !0, writable: !0, value: C }) } }) }, fix: function (A) { return A[n.expando] ? A : new n.Event(A) }, special: { load: { noBubble: !0 }, click: { setup: function (A) { const T = this || A; return u.test(T.type) && T.click && d(T, 'input') && D(T, 'click', b), !1 }, trigger: function (A) { const T = this || A; return u.test(T.type) && T.click && d(T, 'input') && D(T, 'click'), !0 }, _default: function (A) { const T = A.target; return u.test(T.type) && T.click && d(T, 'input') && m.get(T, 'click') || d(T, 'a') } }, beforeunload: { postDispatch: function (A) { A.result !== void 0 && A.originalEvent && (A.originalEvent.returnValue = A.result) } } } }; function D (A, T, C) { if (!C) { m.get(A, T) === void 0 && n.event.add(A, T, b); return }m.set(A, T, !1), n.event.add(A, T, { namespace: !1, handler: function (N) { let L; let R; let B = m.get(this, T); if (N.isTrigger & 1 && this[T]) { if (B.length)(n.event.special[T] || {}).delegateType && N.stopPropagation(); else if (B = g.call(arguments), m.set(this, T, B), L = C(this, T), this[T](), R = m.get(this, T), B !== R || L ? m.set(this, T, !1) : R = {}, B !== R) return N.stopImmediatePropagation(), N.preventDefault(), R && R.value } else B.length && (m.set(this, T, { value: n.event.trigger(n.extend(B[0], n.Event.prototype), B.slice(1), this) }), N.stopImmediatePropagation()) } }) } return n.removeEvent = function (A, T, C) { A.removeEventListener && A.removeEventListener(T, C) }, n.Event = function (A, T) { if (!(this instanceof n.Event)) return new n.Event(A, T); A && A.type ? (this.originalEvent = A, this.type = A.type, this.isDefaultPrevented = A.defaultPrevented || A.defaultPrevented === void 0 && A.returnValue === !1 ? b : v, this.target = A.target && A.target.nodeType === 3 ? A.target.parentNode : A.target, this.currentTarget = A.currentTarget, this.relatedTarget = A.relatedTarget) : this.type = A, T && n.extend(this, T), this.timeStamp = A && A.timeStamp || Date.now(), this[n.expando] = !0 }, n.Event.prototype = { constructor: n.Event, isDefaultPrevented: v, isPropagationStopped: v, isImmediatePropagationStopped: v, isSimulated: !1, preventDefault: function () { const A = this.originalEvent; this.isDefaultPrevented = b, A && !this.isSimulated && A.preventDefault() }, stopPropagation: function () { const A = this.originalEvent; this.isPropagationStopped = b, A && !this.isSimulated && A.stopPropagation() }, stopImmediatePropagation: function () { const A = this.originalEvent; this.isImmediatePropagationStopped = b, A && !this.isSimulated && A.stopImmediatePropagation(), this.stopPropagation() } }, n.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, char: !0, code: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: !0 }, n.event.addProp), n.each({ focus: 'focusin', blur: 'focusout' }, function (A, T) { n.event.special[A] = { setup: function () { return D(this, A, x), !1 }, trigger: function () { return D(this, A), !0 }, _default: function () { return !0 }, delegateType: T } }), n.each({ mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout' }, function (A, T) { n.event.special[A] = { delegateType: T, bindType: T, handle: function (C) { let N; const L = this; const R = C.relatedTarget; const B = C.handleObj; return (!R || R !== L && !n.contains(L, R)) && (C.type = B.origType, N = B.handler.apply(this, arguments), C.type = T), N } } }), n.fn.extend({ on: function (A, T, C, N) { return S(this, A, T, C, N) }, one: function (A, T, C, N) { return S(this, A, T, C, N, 1) }, off: function (A, T, C) { let N, L; if (A && A.preventDefault && A.handleObj) return N = A.handleObj, n(A.delegateTarget).off(N.namespace ? N.origType + '.' + N.namespace : N.origType, N.selector, N.handler), this; if (typeof A === 'object') { for (L in A) this.off(L, T, A[L]); return this } return (T === !1 || typeof T === 'function') && (C = T, T = void 0), C === !1 && (C = v), this.each(function () { n.event.remove(this, A, C, T) }) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    6611: (w, y, a) => { let h, r; h = [a(8934), a(9081), a(8266), a(7881), a(1045)], r = (function (n, c, f) { 'use strict'; return f.focusin || n.each({ focus: 'focusin', blur: 'focusout' }, function (l, s) { const u = function (g) { n.event.simulate(s, g.target, n.event.fix(g)) }; n.event.special[s] = { setup: function () { const g = this.ownerDocument || this.document || this; const i = c.access(g, s); i || g.addEventListener(l, u, !0), c.access(g, s, (i || 0) + 1) }, teardown: function () { const g = this.ownerDocument || this.document || this; const i = c.access(g, s) - 1; i ? c.access(g, s, i) : (g.removeEventListener(l, u, !0), c.remove(g, s)) } } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8266: (w, y, a) => { let h, r; h = [a(9523)], r = (function (n) { 'use strict'; return n.focusin = 'onfocusin' in window, n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1045: (w, y, a) => { let h, r; h = [a(8934), a(7792), a(9081), a(2238), a(9694), a(2134), a(9031), a(7881)], r = (function (n, c, f, l, s, u, g) { 'use strict'; const i = /^(?:focusinfocus|focusoutblur)$/; const m = function (d) { d.stopPropagation() }; return n.extend(n.event, { trigger: function (d, p, b, v) { let x; let P; let S; let D; let A; let T; let C; let N; const L = [b || c]; let R = s.call(d, 'type') ? d.type : d; let B = s.call(d, 'namespace') ? d.namespace.split('.') : []; if (P = N = S = b = b || c, !(b.nodeType === 3 || b.nodeType === 8) && !i.test(R + n.event.triggered) && (R.indexOf('.') > -1 && (B = R.split('.'), R = B.shift(), B.sort()), A = R.indexOf(':') < 0 && 'on' + R, d = d[n.expando] ? d : new n.Event(R, typeof d === 'object' && d), d.isTrigger = v ? 2 : 3, d.namespace = B.join('.'), d.rnamespace = d.namespace ? new RegExp('(^|\\.)' + B.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, d.result = void 0, d.target || (d.target = b), p = p == null ? [d] : n.makeArray(p, [d]), C = n.event.special[R] || {}, !(!v && C.trigger && C.trigger.apply(b, p) === !1))) { if (!v && !C.noBubble && !g(b)) { for (D = C.delegateType || R, i.test(D + R) || (P = P.parentNode); P; P = P.parentNode)L.push(P), S = P; S === (b.ownerDocument || c) && L.push(S.defaultView || S.parentWindow || window) } for (x = 0; (P = L[x++]) && !d.isPropagationStopped();)N = P, d.type = x > 1 ? D : C.bindType || R, T = (f.get(P, 'events') || Object.create(null))[d.type] && f.get(P, 'handle'), T && T.apply(P, p), T = A && P[A], T && T.apply && l(P) && (d.result = T.apply(P, p), d.result === !1 && d.preventDefault()); return d.type = R, !v && !d.isDefaultPrevented() && (!C._default || C._default.apply(L.pop(), p) === !1) && l(b) && A && u(b[R]) && !g(b) && (S = b[A], S && (b[A] = null), n.event.triggered = R, d.isPropagationStopped() && N.addEventListener(R, m), b[R](), d.isPropagationStopped() && N.removeEventListener(R, m), n.event.triggered = void 0, S && (b[A] = S)), d.result } }, simulate: function (d, p, b) { const v = n.extend(new n.Event(), b, { type: d, isSimulated: !0 }); n.event.trigger(v, null, p) } }), n.fn.extend({ trigger: function (d, p) { return this.each(function () { n.event.trigger(d, p, this) }) }, triggerHandler: function (d, p) { const b = this[0]; if (b) return n.event.trigger(d, p, b, !0) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    692: (w, y, a) => { var h, r, h, r; h = [a(8934)], r = (function (n) { 'use strict'; h = [], r = (function () { return n }.apply(y, h)), r !== void 0 && (w.exports = r) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4278: (w, y, a) => { let h, r; h = [a(8934)], r = (function (n) { 'use strict'; const c = window.jQuery; const f = window.$; n.noConflict = function (l) { return window.$ === n && (window.$ = f), l && window.jQuery === n && (window.jQuery = c), n }, typeof noGlobal === 'undefined' && (window.jQuery = window.$ = n) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4002: (w, y, a) => { let h, r; h = [a(8934), a(655), a(8482), a(8924), a(6525), a(1009), a(5703), a(1786), a(1387), a(6572), a(8468), a(7881), a(6611), a(2632), a(8123), a(5594), a(8515), a(2365), a(5385), a(7178), a(8853), a(5488), a(7533), a(4581), a(461), a(2889), a(7429), a(8393), a(5356), a(5126), a(7722), a(692), a(4278)], r = (function (n) { 'use strict'; return n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2632: (w, y, a) => { let h, r; h = [a(8934), a(70), a(3932), a(2134), a(1780), a(8104), a(7163), a(9422), a(8950), a(5219), a(2455), a(7162), a(3360), a(8771), a(9081), a(2109), a(2238), a(1224), a(7060), a(8048), a(8482), a(655), a(7881)], r = (function (n, c, f, l, s, u, g, i, m, d, p, b, v, x, P, S, D, A, T) { 'use strict'; const C = /<script|<style|<link/i; const N = /checked\s*(?:[^=]|=\s*.checked.)/i; const L = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function R (H, $) { return T(H, 'table') && T($.nodeType !== 11 ? $ : $.firstChild, 'tr') && n(H).children('tbody')[0] || H } function B (H) { return H.type = (H.getAttribute('type') !== null) + '/' + H.type, H } function O (H) { return (H.type || '').slice(0, 5) === 'true/' ? H.type = H.type.slice(5) : H.removeAttribute('type'), H } function F (H, $) { let K, te, oe, he, Q, ye, Ae; if ($.nodeType === 1) { if (P.hasData(H) && (he = P.get(H), Ae = he.events, Ae)) { P.remove($, 'handle events'); for (oe in Ae) for (K = 0, te = Ae[oe].length; K < te; K++)n.event.add($, oe, Ae[oe][K]) }S.hasData(H) && (Q = S.access(H), ye = n.extend({}, Q), S.set($, ye)) } } function q (H, $) { const K = $.nodeName.toLowerCase(); K === 'input' && u.test(H.type) ? $.checked = H.checked : (K === 'input' || K === 'textarea') && ($.defaultValue = H.defaultValue) } function _ (H, $, K, te) { $ = f($); let oe; let he; let Q; let ye; let Ae; let Ke; let mt = 0; const kt = H.length; const Rt = kt - 1; const Lt = $[0]; const Wt = l(Lt); if (Wt || kt > 1 && typeof Lt === 'string' && !x.checkClone && N.test(Lt)) return H.each(function (ze) { const Mt = H.eq(ze); Wt && ($[0] = Lt.call(this, ze, Mt.html())), _(Mt, $, K, te) }); if (kt && (oe = v($, H[0].ownerDocument, !1, H, te), he = oe.firstChild, oe.childNodes.length === 1 && (oe = he), he || te)) { for (Q = n.map(p(oe, 'script'), B), ye = Q.length; mt < kt; mt++)Ae = oe, mt !== Rt && (Ae = n.clone(Ae, !0, !0), ye && n.merge(Q, p(Ae, 'script'))), K.call(H[mt], Ae, mt); if (ye) for (Ke = Q[Q.length - 1].ownerDocument, n.map(Q, O), mt = 0; mt < ye; mt++)Ae = Q[mt], m.test(Ae.type || '') && !P.access(Ae, 'globalEval') && n.contains(Ke, Ae) && (Ae.src && (Ae.type || '').toLowerCase() !== 'module' ? n._evalUrl && !Ae.noModule && n._evalUrl(Ae.src, { nonce: Ae.nonce || Ae.getAttribute('nonce') }, Ke) : A(Ae.textContent.replace(L, ''), Ae, Ke)) } return H } function W (H, $, K) { for (var te, oe = $ ? n.filter($, H) : H, he = 0; (te = oe[he]) != null; he++)!K && te.nodeType === 1 && n.cleanData(p(te)), te.parentNode && (K && c(te) && b(p(te, 'script')), te.parentNode.removeChild(te)); return H } return n.extend({ htmlPrefilter: function (H) { return H }, clone: function (H, $, K) { let te; let oe; let he; let Q; const ye = H.cloneNode(!0); const Ae = c(H); if (!x.noCloneChecked && (H.nodeType === 1 || H.nodeType === 11) && !n.isXMLDoc(H)) for (Q = p(ye), he = p(H), te = 0, oe = he.length; te < oe; te++)q(he[te], Q[te]); if ($) if (K) for (he = he || p(H), Q = Q || p(ye), te = 0, oe = he.length; te < oe; te++)F(he[te], Q[te]); else F(H, ye); return Q = p(ye, 'script'), Q.length > 0 && b(Q, !Ae && p(H, 'script')), ye }, cleanData: function (H) { for (var $, K, te, oe = n.event.special, he = 0; (K = H[he]) !== void 0; he++) if (D(K)) { if ($ = K[P.expando]) { if ($.events) for (te in $.events)oe[te] ? n.event.remove(K, te) : n.removeEvent(K, te, $.handle); K[P.expando] = void 0 }K[S.expando] && (K[S.expando] = void 0) } } }), n.fn.extend({ detach: function (H) { return W(this, H, !0) }, remove: function (H) { return W(this, H) }, text: function (H) { return g(this, function ($) { return $ === void 0 ? n.text(this) : this.empty().each(function () { (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = $) }) }, null, H, arguments.length) }, append: function () { return _(this, arguments, function (H) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { const $ = R(this, H); $.appendChild(H) } }) }, prepend: function () { return _(this, arguments, function (H) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { const $ = R(this, H); $.insertBefore(H, $.firstChild) } }) }, before: function () { return _(this, arguments, function (H) { this.parentNode && this.parentNode.insertBefore(H, this) }) }, after: function () { return _(this, arguments, function (H) { this.parentNode && this.parentNode.insertBefore(H, this.nextSibling) }) }, empty: function () { for (var H, $ = 0; (H = this[$]) != null; $++)H.nodeType === 1 && (n.cleanData(p(H, !1)), H.textContent = ''); return this }, clone: function (H, $) { return H = H == null ? !1 : H, $ = $ == null ? H : $, this.map(function () { return n.clone(this, H, $) }) }, html: function (H) { return g(this, function ($) { let K = this[0] || {}; let te = 0; const oe = this.length; if ($ === void 0 && K.nodeType === 1) return K.innerHTML; if (typeof $ === 'string' && !C.test($) && !d[(i.exec($) || ['', ''])[1].toLowerCase()]) { $ = n.htmlPrefilter($); try { for (;te < oe; te++)K = this[te] || {}, K.nodeType === 1 && (n.cleanData(p(K, !1)), K.innerHTML = $); K = 0 } catch (he) {} }K && this.empty().append($) }, null, H, arguments.length) }, replaceWith: function () { const H = []; return _(this, arguments, function ($) { const K = this.parentNode; n.inArray(this, H) < 0 && (n.cleanData(p(this)), K && K.replaceChild($, this)) }, H) } }), n.each({ appendTo: 'append', prependTo: 'prepend', insertBefore: 'before', insertAfter: 'after', replaceAll: 'replaceWith' }, function (H, $) { n.fn[H] = function (K) { for (var te, oe = [], he = n(K), Q = he.length - 1, ye = 0; ye <= Q; ye++)te = ye === Q ? this : this.clone(!0), n(he[ye])[$](te), s.apply(oe, te.get()); return this.pushStack(oe) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8123: (w, y, a) => { let h, r; h = [a(7178)], r = (function (n) { 'use strict'; return n._evalUrl = function (c, f, l) { return n.ajax({ url: c, type: 'GET', dataType: 'script', cache: !0, async: !1, global: !1, converters: { 'text script': function () {} }, dataFilter: function (s) { n.globalEval(s, f, l) } }) }, n._evalUrl }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3360: (w, y, a) => { let h, r; h = [a(8934), a(8082), a(70), a(9422), a(8950), a(5219), a(2455), a(7162)], r = (function (n, c, f, l, s, u, g, i) { 'use strict'; const m = /<|&#?\w+;/; function d (p, b, v, x, P) { for (var S, D, A, T, C, N, L = b.createDocumentFragment(), R = [], B = 0, O = p.length; B < O; B++) if (S = p[B], S || S === 0) if (c(S) === 'object')n.merge(R, S.nodeType ? [S] : S); else if (!m.test(S))R.push(b.createTextNode(S)); else { for (D = D || L.appendChild(b.createElement('div')), A = (l.exec(S) || ['', ''])[1].toLowerCase(), T = u[A] || u._default, D.innerHTML = T[1] + n.htmlPrefilter(S) + T[2], N = T[0]; N--;)D = D.lastChild; n.merge(R, D.childNodes), D = L.firstChild, D.textContent = '' } for (L.textContent = '', B = 0; S = R[B++];) { if (x && n.inArray(S, x) > -1) { P && P.push(S); continue } if (C = f(S), D = g(L.appendChild(S), 'script'), C && i(D), v) for (N = 0; S = D[N++];)s.test(S.type || '') && v.push(S) } return L } return d }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2455: (w, y, a) => { let h, r; h = [a(8934), a(7060)], r = (function (n, c) { 'use strict'; function f (l, s) { let u; return typeof l.getElementsByTagName !== 'undefined' ? u = l.getElementsByTagName(s || '*') : typeof l.querySelectorAll !== 'undefined' ? u = l.querySelectorAll(s || '*') : u = [], s === void 0 || s && c(l, s) ? n.merge([l], u) : u } return f }.apply(y, h)), r !== void 0 && (w.exports = r) },
    7162: (w, y, a) => { let h, r; h = [a(9081)], r = (function (n) { 'use strict'; function c (f, l) { for (let s = 0, u = f.length; s < u; s++)n.set(f[s], 'globalEval', !l || n.get(l[s], 'globalEval')) } return c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8771: (w, y, a) => { let h, r; h = [a(7792), a(9523)], r = (function (n, c) { 'use strict'; return (function () { const f = n.createDocumentFragment(); const l = f.appendChild(n.createElement('div')); const s = n.createElement('input'); s.setAttribute('type', 'radio'), s.setAttribute('checked', 'checked'), s.setAttribute('name', 't'), l.appendChild(s), c.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, l.innerHTML = '<textarea>x</textarea>', c.noCloneChecked = !!l.cloneNode(!0).lastChild.defaultValue, l.innerHTML = '<option></option>', c.option = !!l.lastChild }()), c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8950: (w, y, a) => { let h; h = (function () { 'use strict'; return /^$|^module$|\/(?:java|ecma)script/i }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    9422: (w, y, a) => { let h; h = (function () { 'use strict'; return /<([a-z][^\/\0>\x20\t\r\n\f]*)/i }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    5219: (w, y, a) => { let h, r; h = [a(8771)], r = (function (n) { 'use strict'; const c = { thead: [1, '<table>', '</table>'], col: [2, '<table><colgroup>', '</colgroup></table>'], tr: [2, '<table><tbody>', '</tbody></table>'], td: [3, '<table><tbody><tr>', '</tr></tbody></table>'], _default: [0, '', ''] }; return c.tbody = c.tfoot = c.colgroup = c.caption = c.thead, c.th = c.td, n.option || (c.optgroup = c.option = [1, "<select multiple='multiple'>", '</select>']), c }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5356: (w, y, a) => { let h, r; h = [a(8934), a(7163), a(7730), a(2134), a(618), a(610), a(3781), a(4405), a(9031), a(8048), a(8515), a(655)], r = (function (n, c, f, l, s, u, g, i, m) { 'use strict'; return n.offset = { setOffset: function (d, p, b) { let v; let x; let P; let S; let D; let A; let T; const C = n.css(d, 'position'); const N = n(d); const L = {}; C === 'static' && (d.style.position = 'relative'), D = N.offset(), P = n.css(d, 'top'), A = n.css(d, 'left'), T = (C === 'absolute' || C === 'fixed') && (P + A).indexOf('auto') > -1, T ? (v = N.position(), S = v.top, x = v.left) : (S = parseFloat(P) || 0, x = parseFloat(A) || 0), l(p) && (p = p.call(d, b, n.extend({}, D))), p.top != null && (L.top = p.top - D.top + S), p.left != null && (L.left = p.left - D.left + x), 'using' in p ? p.using.call(d, L) : N.css(L) } }, n.fn.extend({ offset: function (d) { if (arguments.length) return d === void 0 ? this : this.each(function (x) { n.offset.setOffset(this, d, x) }); let p; let b; const v = this[0]; if (v) return v.getClientRects().length ? (p = v.getBoundingClientRect(), b = v.ownerDocument.defaultView, { top: p.top + b.pageYOffset, left: p.left + b.pageXOffset }) : { top: 0, left: 0 } }, position: function () { if (this[0]) { let d; let p; let b; const v = this[0]; let x = { top: 0, left: 0 }; if (n.css(v, 'position') === 'fixed')p = v.getBoundingClientRect(); else { for (p = this.offset(), b = v.ownerDocument, d = v.offsetParent || b.documentElement; d && (d === b.body || d === b.documentElement) && n.css(d, 'position') === 'static';)d = d.parentNode; d && d !== v && d.nodeType === 1 && (x = n(d).offset(), x.top += n.css(d, 'borderTopWidth', !0), x.left += n.css(d, 'borderLeftWidth', !0)) } return { top: p.top - x.top - n.css(v, 'marginTop', !0), left: p.left - x.left - n.css(v, 'marginLeft', !0) } } }, offsetParent: function () { return this.map(function () { for (var d = this.offsetParent; d && n.css(d, 'position') === 'static';)d = d.offsetParent; return d || f }) } }), n.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (d, p) { const b = p === 'pageYOffset'; n.fn[d] = function (v) { return c(this, function (x, P, S) { let D; if (m(x) ? D = x : x.nodeType === 9 && (D = x.defaultView), S === void 0) return D ? D[p] : x[P]; D ? D.scrollTo(b ? D.pageXOffset : S, b ? S : D.pageYOffset) : x[P] = S }, d, v, arguments.length) } }), n.each(['top', 'left'], function (d, p) { n.cssHooks[p] = g(i.pixelPosition, function (b, v) { if (v) return v = u(b, p), s.test(v) ? n(b).position()[p] + 'px' : v }) }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1387: (w, y, a) => { let h, r; h = [a(8934), a(9081), a(6525), a(8924)], r = (function (n, c) { 'use strict'; return n.extend({ queue: function (f, l, s) { let u; if (f) return l = (l || 'fx') + 'queue', u = c.get(f, l), s && (!u || Array.isArray(s) ? u = c.access(f, l, n.makeArray(s)) : u.push(s)), u || [] }, dequeue: function (f, l) { l = l || 'fx'; const s = n.queue(f, l); let u = s.length; let g = s.shift(); const i = n._queueHooks(f, l); const m = function () { n.dequeue(f, l) }; g === 'inprogress' && (g = s.shift(), u--), g && (l === 'fx' && s.unshift('inprogress'), delete i.stop, g.call(f, m, i)), !u && i && i.empty.fire() }, _queueHooks: function (f, l) { const s = l + 'queueHooks'; return c.get(f, s) || c.access(f, s, { empty: n.Callbacks('once memory').add(function () { c.remove(f, [l + 'queue', s]) }) }) } }), n.fn.extend({ queue: function (f, l) { let s = 2; return typeof f !== 'string' && (l = f, f = 'fx', s--), arguments.length < s ? n.queue(this[0], f) : l === void 0 ? this : this.each(function () { const u = n.queue(this, f, l); n._queueHooks(this, f), f === 'fx' && u[0] !== 'inprogress' && n.dequeue(this, f) }) }, dequeue: function (f) { return this.each(function () { n.dequeue(this, f) }) }, clearQueue: function (f) { return this.queue(f || 'fx', []) }, promise: function (f, l) { let s; let u = 1; const g = n.Deferred(); const i = this; let m = this.length; const d = function () { --u || g.resolveWith(i, [i]) }; for (typeof f !== 'string' && (l = f, f = void 0), f = f || 'fx'; m--;)s = c.get(i[m], f + 'queueHooks'), s && s.empty && (u++, s.empty.add(d)); return d(), g.promise(l) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    6572: (w, y, a) => { let h, r; h = [a(8934), a(1387), a(7429)], r = (function (n) { 'use strict'; return n.fn.delay = function (c, f) { return c = n.fx && n.fx.speeds[c] || c, f = f || 'fx', this.queue(f, function (l, s) { const u = window.setTimeout(l, c); s.stop = function () { window.clearTimeout(u) } }) }, n.fn.delay }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4338: (w, y, a) => { let h, r; h = [a(8934), a(9414)], r = (function (n, c) { 'use strict'; n.find = c, n.expr = c.selectors, n.expr[':'] = n.expr.pseudos, n.uniqueSort = n.unique = c.uniqueSort, n.text = c.getText, n.isXMLDoc = c.isXML, n.contains = c.contains, n.escapeSelector = c.escape }.apply(y, h)), r !== void 0 && (w.exports = r) },
    655: (w, y, a) => { let h, r; h = [a(4338)], r = (function () { 'use strict' }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5385: (w, y, a) => {
      let h, r; h = [a(8934), a(8082), a(8104), a(2134), a(8048), a(8482), a(4043)], r = (function (n, c, f, l) {
        'use strict'; const s = /\[\]$/; const u = /\r?\n/g; const g = /^(?:submit|button|image|reset|file)$/i; const i = /^(?:input|select|textarea|keygen)/i; function m (d, p, b, v) { let x; if (Array.isArray(p))n.each(p, function (P, S) { b || s.test(d) ? v(d, S) : m(d + '[' + (typeof S === 'object' && S != null ? P : '') + ']', S, b, v) }); else if (!b && c(p) === 'object') for (x in p)m(d + '[' + x + ']', p[x], b, v); else v(d, p) } return n.param = function (d, p) { let b; const v = []; const x = function (P, S) { const D = l(S) ? S() : S; v[v.length] = encodeURIComponent(P) + '=' + encodeURIComponent(D == null ? '' : D) }; if (d == null) return ''; if (Array.isArray(d) || d.jquery && !n.isPlainObject(d))n.each(d, function () { x(this.name, this.value) }); else for (b in d)m(b, d[b], p, x); return v.join('&') }, n.fn.extend({
          serialize: function () { return n.param(this.serializeArray()) },
          serializeArray: function () {
            return this.map(function () { const d = n.prop(this, 'elements'); return d ? n.makeArray(d) : this }).filter(function () { const d = this.type; return this.name && !n(this).is(':disabled') && i.test(this.nodeName) && !g.test(d) && (this.checked || !f.test(d)) }).map(function (d, p) {
              const b = n(this).val(); return b == null
                ? null
                : Array.isArray(b)
                  ? n.map(b, function (v) {
                      return {
                        name: p.name,
                        value: v.replace(u, `\r
`)
                      }
                    })
                  : {
                      name: p.name,
                      value: b.replace(u, `\r
`)
                    }
            }).get()
          }
        }), n
      }.apply(y, h)), r !== void 0 && (w.exports = r)
    },
    8482: (w, y, a) => { let h, r; h = [a(8934), a(8045), a(5431), a(1721), a(2495), a(8020), a(7060), a(8048), a(1764), a(655)], r = (function (n, c, f, l, s, u, g) { 'use strict'; const i = /^(?:parents|prev(?:Until|All))/; const m = { children: !0, contents: !0, next: !0, prev: !0 }; n.fn.extend({ has: function (p) { const b = n(p, this); const v = b.length; return this.filter(function () { for (let x = 0; x < v; x++) if (n.contains(this, b[x])) return !0 }) }, closest: function (p, b) { let v; let x = 0; const P = this.length; const S = []; const D = typeof p !== 'string' && n(p); if (!u.test(p)) { for (;x < P; x++) for (v = this[x]; v && v !== b; v = v.parentNode) if (v.nodeType < 11 && (D ? D.index(v) > -1 : v.nodeType === 1 && n.find.matchesSelector(v, p))) { S.push(v); break } } return this.pushStack(S.length > 1 ? n.uniqueSort(S) : S) }, index: function (p) { return p ? typeof p === 'string' ? f.call(n(p), this[0]) : f.call(this, p.jquery ? p[0] : p) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (p, b) { return this.pushStack(n.uniqueSort(n.merge(this.get(), n(p, b)))) }, addBack: function (p) { return this.add(p == null ? this.prevObject : this.prevObject.filter(p)) } }); function d (p, b) { for (;(p = p[b]) && p.nodeType !== 1;);return p } return n.each({ parent: function (p) { const b = p.parentNode; return b && b.nodeType !== 11 ? b : null }, parents: function (p) { return l(p, 'parentNode') }, parentsUntil: function (p, b, v) { return l(p, 'parentNode', v) }, next: function (p) { return d(p, 'nextSibling') }, prev: function (p) { return d(p, 'previousSibling') }, nextAll: function (p) { return l(p, 'nextSibling') }, prevAll: function (p) { return l(p, 'previousSibling') }, nextUntil: function (p, b, v) { return l(p, 'nextSibling', v) }, prevUntil: function (p, b, v) { return l(p, 'previousSibling', v) }, siblings: function (p) { return s((p.parentNode || {}).firstChild, p) }, children: function (p) { return s(p.firstChild) }, contents: function (p) { return p.contentDocument != null && c(p.contentDocument) ? p.contentDocument : (g(p, 'template') && (p = p.content || p), n.merge([], p.childNodes)) } }, function (p, b) { n.fn[p] = function (v, x) { let P = n.map(this, b, v); return p.slice(-5) !== 'Until' && (x = v), x && typeof x === 'string' && (P = n.filter(x, P)), this.length > 1 && (m[p] || n.uniqueSort(P), i.test(p) && P.reverse()), this.pushStack(P) } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1764: (w, y, a) => { let h, r; h = [a(8934), a(5431), a(2134), a(8020), a(655)], r = (function (n, c, f, l) { 'use strict'; function s (u, g, i) { return f(g) ? n.grep(u, function (m, d) { return !!g.call(m, d, m) !== i }) : g.nodeType ? n.grep(u, function (m) { return m === g !== i }) : typeof g !== 'string' ? n.grep(u, function (m) { return c.call(g, m) > -1 !== i }) : n.filter(g, u, i) }n.filter = function (u, g, i) { const m = g[0]; return i && (u = ':not(' + u + ')'), g.length === 1 && m.nodeType === 1 ? n.find.matchesSelector(m, u) ? [m] : [] : n.find.matches(u, n.grep(g, function (d) { return d.nodeType === 1 })) }, n.fn.extend({ find: function (u) { let g; let i; const m = this.length; const d = this; if (typeof u !== 'string') return this.pushStack(n(u).filter(function () { for (g = 0; g < m; g++) if (n.contains(d[g], this)) return !0 })); for (i = this.pushStack([]), g = 0; g < m; g++)n.find(u, d[g], i); return m > 1 ? n.uniqueSort(i) : i }, filter: function (u) { return this.pushStack(s(this, u || [], !1)) }, not: function (u) { return this.pushStack(s(this, u || [], !0)) }, is: function (u) { return !!s(this, typeof u === 'string' && l.test(u) ? n(u) : u || [], !1).length } }) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    1721: (w, y, a) => { let h, r; h = [a(8934)], r = (function (n) { 'use strict'; return function (c, f, l) { for (var s = [], u = l !== void 0; (c = c[f]) && c.nodeType !== 9;) if (c.nodeType === 1) { if (u && n(c).is(l)) break; s.push(c) } return s } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8020: (w, y, a) => { let h, r; h = [a(8934), a(655)], r = (function (n) { 'use strict'; return n.expr.match.needsContext }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2495: (w, y, a) => { let h; h = (function () { 'use strict'; return function (r, n) { for (var c = []; r; r = r.nextSibling)r.nodeType === 1 && r !== n && c.push(r); return c } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    3: (w, y, a) => { let h, r; h = [a(4194)], r = (function (n) { 'use strict'; return n.call(Object) }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3727: (w, y, a) => { let h; h = (function () { 'use strict'; return [] }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    5949: (w, y, a) => { let h; h = (function () { 'use strict'; return {} }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    7792: (w, y, a) => { let h; h = (function () { 'use strict'; return window.document }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    7730: (w, y, a) => { let h, r; h = [a(7792)], r = (function (n) { 'use strict'; return n.documentElement }.apply(y, h)), r !== void 0 && (w.exports = r) },
    3932: (w, y, a) => { let h, r; h = [a(3727)], r = (function (n) { 'use strict'; return n.flat ? function (c) { return n.flat.call(c) } : function (c) { return n.concat.apply([], c) } }.apply(y, h)), r !== void 0 && (w.exports = r) },
    4194: (w, y, a) => { let h, r; h = [a(9694)], r = (function (n) { 'use strict'; return n.toString }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8045: (w, y, a) => { let h; h = (function () { 'use strict'; return Object.getPrototypeOf }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    9694: (w, y, a) => { let h, r; h = [a(5949)], r = (function (n) { 'use strict'; return n.hasOwnProperty }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5431: (w, y, a) => { let h, r; h = [a(3727)], r = (function (n) { 'use strict'; return n.indexOf }.apply(y, h)), r !== void 0 && (w.exports = r) },
    2134: (w, y, a) => { let h; h = (function () { 'use strict'; return function (n) { return typeof n === 'function' && typeof n.nodeType !== 'number' && typeof n.item !== 'function' } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    9031: (w, y, a) => { let h; h = (function () { 'use strict'; return function (n) { return n != null && n === n.window } }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    8308: (w, y, a) => { let h; h = (function () { 'use strict'; return /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    1780: (w, y, a) => { let h, r; h = [a(3727)], r = (function (n) { 'use strict'; return n.push }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8104: (w, y, a) => { let h; h = (function () { 'use strict'; return /^(?:checkbox|radio)$/i }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    6871: (w, y, a) => { let h, r; h = [a(8308)], r = (function (n) { 'use strict'; return new RegExp('^(?:([+-])=|)(' + n + ')([a-z%]*)$', 'i') }.apply(y, h)), r !== void 0 && (w.exports = r) },
    8663: (w, y, a) => { let h; h = (function () { 'use strict'; return /[^\x20\t\r\n\f]+/g }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    3623: (w, y, a) => { let h, r; h = [a(3727)], r = (function (n) { 'use strict'; return n.slice }.apply(y, h)), r !== void 0 && (w.exports = r) },
    9523: (w, y, a) => { let h; h = (function () { 'use strict'; return {} }.call(y, a, y, w)), h !== void 0 && (w.exports = h) },
    7763: (w, y, a) => { let h, r; h = [a(5949)], r = (function (n) { 'use strict'; return n.toString }.apply(y, h)), r !== void 0 && (w.exports = r) },
    5594: (w, y, a) => { let h, r; h = [a(8934), a(2134), a(8048), a(2632), a(8482)], r = (function (n, c) { 'use strict'; return n.fn.extend({ wrapAll: function (f) { let l; return this[0] && (c(f) && (f = f.call(this[0])), l = n(f, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && l.insertBefore(this[0]), l.map(function () { for (var s = this; s.firstElementChild;)s = s.firstElementChild; return s }).append(this)), this }, wrapInner: function (f) { return c(f) ? this.each(function (l) { n(this).wrapInner(f.call(this, l)) }) : this.each(function () { const l = n(this); const s = l.contents(); s.length ? s.wrapAll(f) : l.append(f) }) }, wrap: function (f) { const l = c(f); return this.each(function (s) { n(this).wrapAll(l ? f.call(this, s) : f) }) }, unwrap: function (f) { return this.parent(f).not('body').each(function () { n(this).replaceWith(this.childNodes) }), this } }), n }.apply(y, h)), r !== void 0 && (w.exports = r) },
    6486: function (w, y, a) {
      w = a.nmd(w); let h;/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/(function () {
        let r; const n = '4.17.21'; const c = 200; const f = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'; const l = 'Expected a function'; const s = 'Invalid `variable` option passed into `_.template`'; const u = '__lodash_hash_undefined__'; const g = 500; const i = '__lodash_placeholder__'; const m = 1; const d = 2; const p = 4; const b = 1; const v = 2; const x = 1; const P = 2; const S = 4; const D = 8; const A = 16; const T = 32; const C = 64; const N = 128; const L = 256; const R = 512; const B = 30; const O = '...'; const F = 800; const q = 16; const _ = 1; const W = 2; const H = 3; const $ = 1 / 0; const K = 9007199254740991; const te = 17976931348623157e292; const oe = 0 / 0; const he = 4294967295; const Q = he - 1; const ye = he >>> 1; const Ae = [['ary', N], ['bind', x], ['bindKey', P], ['curry', D], ['curryRight', A], ['flip', R], ['partial', T], ['partialRight', C], ['rearg', L]]; const Ke = '[object Arguments]'; const mt = '[object Array]'; const kt = '[object AsyncFunction]'; const Rt = '[object Boolean]'; const Lt = '[object Date]'; const Wt = '[object DOMException]'; const ze = '[object Error]'; const Mt = '[object Function]'; const Ve = '[object GeneratorFunction]'; const et = '[object Map]'; const Kt = '[object Number]'; const Mn = '[object Null]'; const At = '[object Object]'; const $t = '[object Promise]'; const vn = '[object Proxy]'; const jt = '[object RegExp]'; const lt = '[object Set]'; const pt = '[object String]'; const Cn = '[object Symbol]'; const nr = '[object Undefined]'; const en = '[object WeakMap]'; const vr = '[object WeakSet]'; const tt = '[object ArrayBuffer]'; const tn = '[object DataView]'; const _t = '[object Float32Array]'; const pe = '[object Float64Array]'; const Z = '[object Int8Array]'; const de = '[object Int16Array]'; const Pe = '[object Int32Array]'; const ne = '[object Uint8Array]'; const me = '[object Uint8ClampedArray]'; const fe = '[object Uint16Array]'; const xe = '[object Uint32Array]'; const Le = /\b__p \+= '';/g; const Fe = /\b(__p \+=) '' \+/g; const Ne = /(__e\(.*?\)|\b__t\)) \+\n'';/g; const De = /&(?:amp|lt|gt|quot|#39);/g; const Me = /[&<>"']/g; const We = RegExp(De.source); const it = RegExp(Me.source); const Pt = /<%-([\s\S]+?)%>/g; const Ge = /<%([\s\S]+?)%>/g; const yt = /<%=([\s\S]+?)%>/g; const j = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/; const U = /^\w*$/; const G = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g; const re = /[\\^$.*+?()[\]{}|]/g; const Y = RegExp(re.source); const ie = /^\s+/; const ae = /\s/; const be = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/; const Se = /\{\n\/\* \[wrapped with (.+)\] \*/; const Be = /,? & /; const Ie = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g; const _e = /[()=,{}\[\]\/\s]/; const Ye = /\\(\\)?/g; const ot = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g; const je = /\w*$/; const St = /^[-+]0x[0-9a-f]+$/i; const Ct = /^0b[01]+$/i; const ve = /^\[object .+?Constructor\]$/; const ce = /^0o[0-7]+$/i; const Ee = /^(?:0|[1-9]\d*)$/; const we = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g; const ke = /($^)/; const st = /['\n\r\u2028\u2029\\]/g; const Oe = '\\ud800-\\udfff'; const qt = '\\u0300-\\u036f'; const An = '\\ufe20-\\ufe2f'; const Sn = '\\u20d0-\\u20ff'; const Dn = qt + An + Sn; const ht = '\\u2700-\\u27bf'; const gt = 'a-z\\xdf-\\xf6\\xf8-\\xff'; const Ei = '\\xac\\xb1\\xd7\\xf7'; const Ls = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf'; const Bs = '\\u2000-\\u206f'; const rr = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'; const Is = 'A-Z\\xc0-\\xd6\\xd8-\\xde'; const js = '\\ufe0e\\ufe0f'; const _s = Ei + Ls + Bs + rr; const Ai = "['\u2019]"; const sc = '[' + Oe + ']'; const Fs = '[' + _s + ']'; const Ir = '[' + Dn + ']'; const Ms = '\\d+'; const ac = '[' + ht + ']'; const Os = '[' + gt + ']'; const Hs = '[^' + Oe + _s + Ms + ht + gt + Is + ']'; const Si = '\\ud83c[\\udffb-\\udfff]'; const oc = '(?:' + Ir + '|' + Si + ')'; const qs = '[^' + Oe + ']'; const wi = '(?:\\ud83c[\\udde6-\\uddff]){2}'; const Ti = '[\\ud800-\\udbff][\\udc00-\\udfff]'; const ir = '[' + Is + ']'; const Us = '\\u200d'; const zs = '(?:' + Os + '|' + Hs + ')'; const cc = '(?:' + ir + '|' + Hs + ')'; const Ws = '(?:' + Ai + '(?:d|ll|m|re|s|t|ve))?'; const Ks = '(?:' + Ai + '(?:D|LL|M|RE|S|T|VE))?'; const $s = oc + '?'; const Gs = '[' + js + ']?'; const lc = '(?:' + Us + '(?:' + [qs, wi, Ti].join('|') + ')' + Gs + $s + ')*'; const uc = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])'; const fc = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])'; const Xs = Gs + $s + lc; const dc = '(?:' + [ac, wi, Ti].join('|') + ')' + Xs; const pc = '(?:' + [qs + Ir + '?', Ir, wi, Ti, sc].join('|') + ')'; const hc = RegExp(Ai, 'g'); const gc = RegExp(Ir, 'g'); const Pi = RegExp(Si + '(?=' + Si + ')|' + pc + Xs, 'g'); const mc = RegExp([ir + '?' + Os + '+' + Ws + '(?=' + [Fs, ir, '$'].join('|') + ')', cc + '+' + Ks + '(?=' + [Fs, ir + zs, '$'].join('|') + ')', ir + '?' + zs + '+' + Ws, ir + '+' + Ks, fc, uc, Ms, dc].join('|'), 'g'); const vc = RegExp('[' + Us + Oe + Dn + js + ']'); const yc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/; const bc = ['Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object', 'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout']; let xc = -1; const xt = {}; xt[_t] = xt[pe] = xt[Z] = xt[de] = xt[Pe] = xt[ne] = xt[me] = xt[fe] = xt[xe] = !0, xt[Ke] = xt[mt] = xt[tt] = xt[Rt] = xt[tn] = xt[Lt] = xt[ze] = xt[Mt] = xt[et] = xt[Kt] = xt[At] = xt[jt] = xt[lt] = xt[pt] = xt[en] = !1; const bt = {}; bt[Ke] = bt[mt] = bt[tt] = bt[tn] = bt[Rt] = bt[Lt] = bt[_t] = bt[pe] = bt[Z] = bt[de] = bt[Pe] = bt[et] = bt[Kt] = bt[At] = bt[jt] = bt[lt] = bt[pt] = bt[Cn] = bt[ne] = bt[me] = bt[fe] = bt[xe] = !0, bt[ze] = bt[Mt] = bt[en] = !1; const Ec = { \u00C0: 'A', \u00C1: 'A', \u00C2: 'A', \u00C3: 'A', \u00C4: 'A', \u00C5: 'A', \u00E0: 'a', \u00E1: 'a', \u00E2: 'a', \u00E3: 'a', \u00E4: 'a', \u00E5: 'a', \u00C7: 'C', \u00E7: 'c', \u00D0: 'D', \u00F0: 'd', \u00C8: 'E', \u00C9: 'E', \u00CA: 'E', \u00CB: 'E', \u00E8: 'e', \u00E9: 'e', \u00EA: 'e', \u00EB: 'e', \u00CC: 'I', \u00CD: 'I', \u00CE: 'I', \u00CF: 'I', \u00EC: 'i', \u00ED: 'i', \u00EE: 'i', \u00EF: 'i', \u00D1: 'N', \u00F1: 'n', \u00D2: 'O', \u00D3: 'O', \u00D4: 'O', \u00D5: 'O', \u00D6: 'O', \u00D8: 'O', \u00F2: 'o', \u00F3: 'o', \u00F4: 'o', \u00F5: 'o', \u00F6: 'o', \u00F8: 'o', \u00D9: 'U', \u00DA: 'U', \u00DB: 'U', \u00DC: 'U', \u00F9: 'u', \u00FA: 'u', \u00FB: 'u', \u00FC: 'u', \u00DD: 'Y', \u00FD: 'y', \u00FF: 'y', \u00C6: 'Ae', \u00E6: 'ae', \u00DE: 'Th', \u00FE: 'th', \u00DF: 'ss', \u0100: 'A', \u0102: 'A', \u0104: 'A', \u0101: 'a', \u0103: 'a', \u0105: 'a', \u0106: 'C', \u0108: 'C', \u010A: 'C', \u010C: 'C', \u0107: 'c', \u0109: 'c', \u010B: 'c', \u010D: 'c', \u010E: 'D', \u0110: 'D', \u010F: 'd', \u0111: 'd', \u0112: 'E', \u0114: 'E', \u0116: 'E', \u0118: 'E', \u011A: 'E', \u0113: 'e', \u0115: 'e', \u0117: 'e', \u0119: 'e', \u011B: 'e', \u011C: 'G', \u011E: 'G', \u0120: 'G', \u0122: 'G', \u011D: 'g', \u011F: 'g', \u0121: 'g', \u0123: 'g', \u0124: 'H', \u0126: 'H', \u0125: 'h', \u0127: 'h', \u0128: 'I', \u012A: 'I', \u012C: 'I', \u012E: 'I', \u0130: 'I', \u0129: 'i', \u012B: 'i', \u012D: 'i', \u012F: 'i', \u0131: 'i', \u0134: 'J', \u0135: 'j', \u0136: 'K', \u0137: 'k', \u0138: 'k', \u0139: 'L', \u013B: 'L', \u013D: 'L', \u013F: 'L', \u0141: 'L', \u013A: 'l', \u013C: 'l', \u013E: 'l', \u0140: 'l', \u0142: 'l', \u0143: 'N', \u0145: 'N', \u0147: 'N', \u014A: 'N', \u0144: 'n', \u0146: 'n', \u0148: 'n', \u014B: 'n', \u014C: 'O', \u014E: 'O', \u0150: 'O', \u014D: 'o', \u014F: 'o', \u0151: 'o', \u0154: 'R', \u0156: 'R', \u0158: 'R', \u0155: 'r', \u0157: 'r', \u0159: 'r', \u015A: 'S', \u015C: 'S', \u015E: 'S', \u0160: 'S', \u015B: 's', \u015D: 's', \u015F: 's', \u0161: 's', \u0162: 'T', \u0164: 'T', \u0166: 'T', \u0163: 't', \u0165: 't', \u0167: 't', \u0168: 'U', \u016A: 'U', \u016C: 'U', \u016E: 'U', \u0170: 'U', \u0172: 'U', \u0169: 'u', \u016B: 'u', \u016D: 'u', \u016F: 'u', \u0171: 'u', \u0173: 'u', \u0174: 'W', \u0175: 'w', \u0176: 'Y', \u0177: 'y', \u0178: 'Y', \u0179: 'Z', \u017B: 'Z', \u017D: 'Z', \u017A: 'z', \u017C: 'z', \u017E: 'z', \u0132: 'IJ', \u0133: 'ij', \u0152: 'Oe', \u0153: 'oe', \u0149: "'n", \u017F: 's' }; const Ac = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }; const Sc = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }; const wc = { '\\': '\\', "'": "'", '\n': 'n', '\r': 'r', '\u2028': 'u2028', '\u2029': 'u2029' }; const Tc = parseFloat; const Pc = parseInt; const Ys = typeof a.g === 'object' && a.g && a.g.Object === Object && a.g; const Cc = typeof self === 'object' && self && self.Object === Object && self; const Ot = Ys || Cc || Function('return this')(); const Vs = y && !y.nodeType && y; const yr = Vs && !0 && w && !w.nodeType && w; const Js = yr && yr.exports === Vs; const Ci = Js && Ys.process; const ln = (function () { try { const V = yr && yr.require && yr.require('util').types; return V || Ci && Ci.binding && Ci.binding('util') } catch (se) {} }()); const Zs = ln && ln.isArrayBuffer; const Qs = ln && ln.isDate; const ea = ln && ln.isMap; const ta = ln && ln.isRegExp; const na = ln && ln.isSet; const ra = ln && ln.isTypedArray; function nn (V, se, ee) { switch (ee.length) { case 0:return V.call(se); case 1:return V.call(se, ee[0]); case 2:return V.call(se, ee[0], ee[1]); case 3:return V.call(se, ee[0], ee[1], ee[2]) } return V.apply(se, ee) } function Dc (V, se, ee, Ce) { for (let $e = -1, ct = V == null ? 0 : V.length; ++$e < ct;) { const Bt = V[$e]; se(Ce, Bt, ee(Bt), V) } return Ce } function un (V, se) { for (let ee = -1, Ce = V == null ? 0 : V.length; ++ee < Ce && se(V[ee], ee, V) !== !1;);return V } function Nc (V, se) { for (let ee = V == null ? 0 : V.length; ee-- && se(V[ee], ee, V) !== !1;);return V } function ia (V, se) { for (let ee = -1, Ce = V == null ? 0 : V.length; ++ee < Ce;) if (!se(V[ee], ee, V)) return !1; return !0 } function On (V, se) { for (var ee = -1, Ce = V == null ? 0 : V.length, $e = 0, ct = []; ++ee < Ce;) { const Bt = V[ee]; se(Bt, ee, V) && (ct[$e++] = Bt) } return ct } function jr (V, se) { const ee = V == null ? 0 : V.length; return !!ee && sr(V, se, 0) > -1 } function Di (V, se, ee) { for (let Ce = -1, $e = V == null ? 0 : V.length; ++Ce < $e;) if (ee(se, V[Ce])) return !0; return !1 } function Et (V, se) { for (var ee = -1, Ce = V == null ? 0 : V.length, $e = Array(Ce); ++ee < Ce;)$e[ee] = se(V[ee], ee, V); return $e } function Hn (V, se) { for (let ee = -1, Ce = se.length, $e = V.length; ++ee < Ce;)V[$e + ee] = se[ee]; return V } function Ni (V, se, ee, Ce) { let $e = -1; const ct = V == null ? 0 : V.length; for (Ce && ct && (ee = V[++$e]); ++$e < ct;)ee = se(ee, V[$e], $e, V); return ee } function Rc (V, se, ee, Ce) { let $e = V == null ? 0 : V.length; for (Ce && $e && (ee = V[--$e]); $e--;)ee = se(ee, V[$e], $e, V); return ee } function Ri (V, se) { for (let ee = -1, Ce = V == null ? 0 : V.length; ++ee < Ce;) if (se(V[ee], ee, V)) return !0; return !1 } const kc = ki('length'); function Lc (V) { return V.split('') } function Bc (V) { return V.match(Ie) || [] } function sa (V, se, ee) { let Ce; return ee(V, function ($e, ct, Bt) { if (se($e, ct, Bt)) return Ce = ct, !1 }), Ce } function _r (V, se, ee, Ce) { for (let $e = V.length, ct = ee + (Ce ? 1 : -1); Ce ? ct-- : ++ct < $e;) if (se(V[ct], ct, V)) return ct; return -1 } function sr (V, se, ee) { return se === se ? Kc(V, se, ee) : _r(V, aa, ee) } function Ic (V, se, ee, Ce) { for (let $e = ee - 1, ct = V.length; ++$e < ct;) if (Ce(V[$e], se)) return $e; return -1 } function aa (V) { return V !== V } function oa (V, se) { const ee = V == null ? 0 : V.length; return ee ? Bi(V, se) / ee : oe } function ki (V) { return function (se) { return se == null ? r : se[V] } } function Li (V) { return function (se) { return V == null ? r : V[se] } } function ca (V, se, ee, Ce, $e) { return $e(V, function (ct, Bt, vt) { ee = Ce ? (Ce = !1, ct) : se(ee, ct, Bt, vt) }), ee } function jc (V, se) { let ee = V.length; for (V.sort(se); ee--;)V[ee] = V[ee].value; return V } function Bi (V, se) { for (var ee, Ce = -1, $e = V.length; ++Ce < $e;) { const ct = se(V[Ce]); ct !== r && (ee = ee === r ? ct : ee + ct) } return ee } function Ii (V, se) { for (var ee = -1, Ce = Array(V); ++ee < V;)Ce[ee] = se(ee); return Ce } function _c (V, se) { return Et(se, function (ee) { return [ee, V[ee]] }) } function la (V) { return V && V.slice(0, pa(V) + 1).replace(ie, '') } function rn (V) { return function (se) { return V(se) } } function ji (V, se) { return Et(se, function (ee) { return V[ee] }) } function br (V, se) { return V.has(se) } function ua (V, se) { for (var ee = -1, Ce = V.length; ++ee < Ce && sr(se, V[ee], 0) > -1;);return ee } function fa (V, se) { for (var ee = V.length; ee-- && sr(se, V[ee], 0) > -1;);return ee } function Fc (V, se) { for (var ee = V.length, Ce = 0; ee--;)V[ee] === se && ++Ce; return Ce } const Mc = Li(Ec); const Oc = Li(Ac); function Hc (V) { return '\\' + wc[V] } function qc (V, se) { return V == null ? r : V[se] } function ar (V) { return vc.test(V) } function Uc (V) { return yc.test(V) } function zc (V) { for (var se, ee = []; !(se = V.next()).done;)ee.push(se.value); return ee } function _i (V) { let se = -1; const ee = Array(V.size); return V.forEach(function (Ce, $e) { ee[++se] = [$e, Ce] }), ee } function da (V, se) { return function (ee) { return V(se(ee)) } } function qn (V, se) { for (var ee = -1, Ce = V.length, $e = 0, ct = []; ++ee < Ce;) { const Bt = V[ee]; (Bt === se || Bt === i) && (V[ee] = i, ct[$e++] = ee) } return ct } function Fr (V) { let se = -1; const ee = Array(V.size); return V.forEach(function (Ce) { ee[++se] = Ce }), ee } function Wc (V) { let se = -1; const ee = Array(V.size); return V.forEach(function (Ce) { ee[++se] = [Ce, Ce] }), ee } function Kc (V, se, ee) { for (let Ce = ee - 1, $e = V.length; ++Ce < $e;) if (V[Ce] === se) return Ce; return -1 } function $c (V, se, ee) { for (var Ce = ee + 1; Ce--;) if (V[Ce] === se) return Ce; return Ce } function or (V) { return ar(V) ? Xc(V) : kc(V) } function yn (V) { return ar(V) ? Yc(V) : Lc(V) } function pa (V) { for (var se = V.length; se-- && ae.test(V.charAt(se)););return se } const Gc = Li(Sc); function Xc (V) { for (var se = Pi.lastIndex = 0; Pi.test(V);)++se; return se } function Yc (V) { return V.match(Pi) || [] } function Vc (V) { return V.match(mc) || [] } const Jc = function V (se) {
          se = se == null ? Ot : Mr.defaults(Ot.Object(), se, Mr.pick(Ot, bc)); const ee = se.Array; const Ce = se.Date; const $e = se.Error; const ct = se.Function; const Bt = se.Math; const vt = se.Object; const Fi = se.RegExp; const Zc = se.String; const fn = se.TypeError; const Or = ee.prototype; const Qc = ct.prototype; const cr = vt.prototype; const Hr = se['__core-js_shared__']; const qr = Qc.toString; const dt = cr.hasOwnProperty; let el = 0; const ha = (function () { const e = /[^.]+$/.exec(Hr && Hr.keys && Hr.keys.IE_PROTO || ''); return e ? 'Symbol(src)_1.' + e : '' }()); const Ur = cr.toString; const tl = qr.call(vt); const nl = Ot._; const rl = Fi('^' + qr.call(dt).replace(re, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'); const zr = Js ? se.Buffer : r; const Un = se.Symbol; const Wr = se.Uint8Array; const ga = zr ? zr.allocUnsafe : r; const Kr = da(vt.getPrototypeOf, vt); const ma = vt.create; const va = cr.propertyIsEnumerable; const $r = Or.splice; const ya = Un ? Un.isConcatSpreadable : r; const xr = Un ? Un.iterator : r; const Xn = Un ? Un.toStringTag : r; const Gr = (function () { try { const e = Qn(vt, 'defineProperty'); return e({}, '', {}), e } catch (t) {} }()); const il = se.clearTimeout !== Ot.clearTimeout && se.clearTimeout; const sl = Ce && Ce.now !== Ot.Date.now && Ce.now; const al = se.setTimeout !== Ot.setTimeout && se.setTimeout; const Xr = Bt.ceil; const Yr = Bt.floor; const Mi = vt.getOwnPropertySymbols; const ol = zr ? zr.isBuffer : r; const ba = se.isFinite; const cl = Or.join; const ll = da(vt.keys, vt); const It = Bt.max; const Ut = Bt.min; const ul = Ce.now; const fl = se.parseInt; const xa = Bt.random; const dl = Or.reverse; const Oi = Qn(se, 'DataView'); const Er = Qn(se, 'Map'); const Hi = Qn(se, 'Promise'); const lr = Qn(se, 'Set'); const Ar = Qn(se, 'WeakMap'); const Sr = Qn(vt, 'create'); const Vr = Ar && new Ar(); const ur = {}; const pl = er(Oi); const hl = er(Er); const gl = er(Hi); const ml = er(lr); const vl = er(Ar); const Jr = Un ? Un.prototype : r; const wr = Jr ? Jr.valueOf : r; const Ea = Jr ? Jr.toString : r; function I (e) { if (Tt(e) && !Xe(e) && !(e instanceof rt)) { if (e instanceof dn) return e; if (dt.call(e, '__wrapped__')) return So(e) } return new dn(e) } const fr = (function () { function e () {} return function (t) { if (!wt(t)) return {}; if (ma) return ma(t); e.prototype = t; const o = new e(); return e.prototype = r, o } }()); function Zr () {} function dn (e, t) { this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = r }I.templateSettings = { escape: Pt, evaluate: Ge, interpolate: yt, variable: '', imports: { _: I } }, I.prototype = Zr.prototype, I.prototype.constructor = I, dn.prototype = fr(Zr.prototype), dn.prototype.constructor = dn; function rt (e) { this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = he, this.__views__ = [] } function yl () { const e = new rt(this.__wrapped__); return e.__actions__ = Vt(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Vt(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Vt(this.__views__), e } function bl () { if (this.__filtered__) { var e = new rt(this); e.__dir__ = -1, e.__filtered__ = !0 } else e = this.clone(), e.__dir__ *= -1; return e } function xl () { const e = this.__wrapped__.value(); const t = this.__dir__; const o = Xe(e); const E = t < 0; const k = o ? e.length : 0; const M = Lu(0, k, this.__views__); const z = M.start; const X = M.end; let J = X - z; let le = E ? X : z - 1; const ue = this.__iteratees__; const ge = ue.length; let Te = 0; const Re = Ut(J, this.__takeCount__); if (!o || !E && k == J && Re == J) return Ka(e, this.__actions__); const qe = []; e:for (;J-- && Te < Re;) { le += t; for (var Ze = -1, Ue = e[le]; ++Ze < ge;) { const nt = ue[Ze]; const at = nt.iteratee; const on = nt.type; const Yt = at(Ue); if (on == W)Ue = Yt; else if (!Yt) { if (on == _) continue e; break e } }qe[Te++] = Ue } return qe }rt.prototype = fr(Zr.prototype), rt.prototype.constructor = rt; function Yn (e) { let t = -1; const o = e == null ? 0 : e.length; for (this.clear(); ++t < o;) { const E = e[t]; this.set(E[0], E[1]) } } function El () { this.__data__ = Sr ? Sr(null) : {}, this.size = 0 } function Al (e) { const t = this.has(e) && delete this.__data__[e]; return this.size -= t ? 1 : 0, t } function Sl (e) { const t = this.__data__; if (Sr) { const o = t[e]; return o === u ? r : o } return dt.call(t, e) ? t[e] : r } function wl (e) { const t = this.__data__; return Sr ? t[e] !== r : dt.call(t, e) } function Tl (e, t) { const o = this.__data__; return this.size += this.has(e) ? 0 : 1, o[e] = Sr && t === r ? u : t, this }Yn.prototype.clear = El, Yn.prototype.delete = Al, Yn.prototype.get = Sl, Yn.prototype.has = wl, Yn.prototype.set = Tl; function Nn (e) { let t = -1; const o = e == null ? 0 : e.length; for (this.clear(); ++t < o;) { const E = e[t]; this.set(E[0], E[1]) } } function Pl () { this.__data__ = [], this.size = 0 } function Cl (e) { const t = this.__data__; const o = Qr(t, e); if (o < 0) return !1; const E = t.length - 1; return o == E ? t.pop() : $r.call(t, o, 1), --this.size, !0 } function Dl (e) { const t = this.__data__; const o = Qr(t, e); return o < 0 ? r : t[o][1] } function Nl (e) { return Qr(this.__data__, e) > -1 } function Rl (e, t) { const o = this.__data__; const E = Qr(o, e); return E < 0 ? (++this.size, o.push([e, t])) : o[E][1] = t, this }Nn.prototype.clear = Pl, Nn.prototype.delete = Cl, Nn.prototype.get = Dl, Nn.prototype.has = Nl, Nn.prototype.set = Rl; function Rn (e) { let t = -1; const o = e == null ? 0 : e.length; for (this.clear(); ++t < o;) { const E = e[t]; this.set(E[0], E[1]) } } function kl () { this.size = 0, this.__data__ = { hash: new Yn(), map: new (Er || Nn)(), string: new Yn() } } function Ll (e) { const t = fi(this, e).delete(e); return this.size -= t ? 1 : 0, t } function Bl (e) { return fi(this, e).get(e) } function Il (e) { return fi(this, e).has(e) } function jl (e, t) { const o = fi(this, e); const E = o.size; return o.set(e, t), this.size += o.size == E ? 0 : 1, this }Rn.prototype.clear = kl, Rn.prototype.delete = Ll, Rn.prototype.get = Bl, Rn.prototype.has = Il, Rn.prototype.set = jl; function Vn (e) { let t = -1; const o = e == null ? 0 : e.length; for (this.__data__ = new Rn(); ++t < o;) this.add(e[t]) } function _l (e) { return this.__data__.set(e, u), this } function Fl (e) { return this.__data__.has(e) }Vn.prototype.add = Vn.prototype.push = _l, Vn.prototype.has = Fl; function bn (e) { const t = this.__data__ = new Nn(e); this.size = t.size } function Ml () { this.__data__ = new Nn(), this.size = 0 } function Ol (e) { const t = this.__data__; const o = t.delete(e); return this.size = t.size, o } function Hl (e) { return this.__data__.get(e) } function ql (e) { return this.__data__.has(e) } function Ul (e, t) { let o = this.__data__; if (o instanceof Nn) { const E = o.__data__; if (!Er || E.length < c - 1) return E.push([e, t]), this.size = ++o.size, this; o = this.__data__ = new Rn(E) } return o.set(e, t), this.size = o.size, this }bn.prototype.clear = Ml, bn.prototype.delete = Ol, bn.prototype.get = Hl, bn.prototype.has = ql, bn.prototype.set = Ul; function Aa (e, t) { const o = Xe(e); const E = !o && tr(e); const k = !o && !E && Gn(e); const M = !o && !E && !k && gr(e); const z = o || E || k || M; const X = z ? Ii(e.length, Zc) : []; const J = X.length; for (const le in e)(t || dt.call(e, le)) && !(z && (le == 'length' || k && (le == 'offset' || le == 'parent') || M && (le == 'buffer' || le == 'byteLength' || le == 'byteOffset') || In(le, J))) && X.push(le); return X } function Sa (e) { const t = e.length; return t ? e[Ji(0, t - 1)] : r } function zl (e, t) { return di(Vt(e), Jn(t, 0, e.length)) } function Wl (e) { return di(Vt(e)) } function qi (e, t, o) { (o !== r && !xn(e[t], o) || o === r && !(t in e)) && kn(e, t, o) } function Tr (e, t, o) { const E = e[t]; (!(dt.call(e, t) && xn(E, o)) || o === r && !(t in e)) && kn(e, t, o) } function Qr (e, t) { for (let o = e.length; o--;) if (xn(e[o][0], t)) return o; return -1 } function Kl (e, t, o, E) { return zn(e, function (k, M, z) { t(E, k, o(k), z) }), E } function wa (e, t) { return e && Tn(t, Ft(t), e) } function $l (e, t) { return e && Tn(t, Zt(t), e) } function kn (e, t, o) { t == '__proto__' && Gr ? Gr(e, t, { configurable: !0, enumerable: !0, value: o, writable: !0 }) : e[t] = o } function Ui (e, t) { for (var o = -1, E = t.length, k = ee(E), M = e == null; ++o < E;)k[o] = M ? r : As(e, t[o]); return k } function Jn (e, t, o) { return e === e && (o !== r && (e = e <= o ? e : o), t !== r && (e = e >= t ? e : t)), e } function pn (e, t, o, E, k, M) { let z; const X = t & m; const J = t & d; const le = t & p; if (o && (z = k ? o(e, E, k, M) : o(e)), z !== r) return z; if (!wt(e)) return e; const ue = Xe(e); if (ue) { if (z = Iu(e), !X) return Vt(e, z) } else { const ge = zt(e); const Te = ge == Mt || ge == Ve; if (Gn(e)) return Xa(e, X); if (ge == At || ge == Ke || Te && !k) { if (z = J || Te ? {} : ho(e), !X) return J ? Su(e, $l(z, e)) : Au(e, wa(z, e)) } else { if (!bt[ge]) return k ? e : {}; z = ju(e, ge, X) } }M || (M = new bn()); const Re = M.get(e); if (Re) return Re; M.set(e, z), zo(e) ? e.forEach(function (Ue) { z.add(pn(Ue, t, o, Ue, e, M)) }) : qo(e) && e.forEach(function (Ue, nt) { z.set(nt, pn(Ue, t, o, nt, e, M)) }); const qe = le ? J ? cs : os : J ? Zt : Ft; const Ze = ue ? r : qe(e); return un(Ze || e, function (Ue, nt) { Ze && (nt = Ue, Ue = e[nt]), Tr(z, nt, pn(Ue, t, o, nt, e, M)) }), z } function Gl (e) { const t = Ft(e); return function (o) { return Ta(o, e, t) } } function Ta (e, t, o) { let E = o.length; if (e == null) return !E; for (e = vt(e); E--;) { const k = o[E]; const M = t[k]; const z = e[k]; if (z === r && !(k in e) || !M(z)) return !1 } return !0 } function Pa (e, t, o) { if (typeof e !== 'function') throw new fn(l); return Lr(function () { e.apply(r, o) }, t) } function Pr (e, t, o, E) { let k = -1; let M = jr; let z = !0; const X = e.length; const J = []; const le = t.length; if (!X) return J; o && (t = Et(t, rn(o))), E ? (M = Di, z = !1) : t.length >= c && (M = br, z = !1, t = new Vn(t)); e:for (;++k < X;) { let ue = e[k]; const ge = o == null ? ue : o(ue); if (ue = E || ue !== 0 ? ue : 0, z && ge === ge) { for (let Te = le; Te--;) if (t[Te] === ge) continue e; J.push(ue) } else M(t, ge, E) || J.push(ue) } return J } var zn = Qa(wn); const Ca = Qa(Wi, !0); function Xl (e, t) { let o = !0; return zn(e, function (E, k, M) { return o = !!t(E, k, M), o }), o } function ei (e, t, o) { for (let E = -1, k = e.length; ++E < k;) { const M = e[E]; const z = t(M); if (z != null && (X === r ? z === z && !an(z) : o(z, X))) var X = z, J = M } return J } function Yl (e, t, o, E) { const k = e.length; for (o = Je(o), o < 0 && (o = -o > k ? 0 : k + o), E = E === r || E > k ? k : Je(E), E < 0 && (E += k), E = o > E ? 0 : Ko(E); o < E;)e[o++] = t; return e } function Da (e, t) { const o = []; return zn(e, function (E, k, M) { t(E, k, M) && o.push(E) }), o } function Ht (e, t, o, E, k) { let M = -1; const z = e.length; for (o || (o = Fu), k || (k = []); ++M < z;) { const X = e[M]; t > 0 && o(X) ? t > 1 ? Ht(X, t - 1, o, E, k) : Hn(k, X) : E || (k[k.length] = X) } return k } const zi = eo(); const Na = eo(!0); function wn (e, t) { return e && zi(e, t, Ft) } function Wi (e, t) { return e && Na(e, t, Ft) } function ti (e, t) { return On(t, function (o) { return jn(e[o]) }) } function Zn (e, t) { t = Kn(t, e); for (var o = 0, E = t.length; e != null && o < E;)e = e[Pn(t[o++])]; return o && o == E ? e : r } function Ra (e, t, o) { const E = t(e); return Xe(e) ? E : Hn(E, o(e)) } function Gt (e) { return e == null ? e === r ? nr : Mn : Xn && Xn in vt(e) ? ku(e) : Wu(e) } function Ki (e, t) { return e > t } function Vl (e, t) { return e != null && dt.call(e, t) } function Jl (e, t) { return e != null && t in vt(e) } function Zl (e, t, o) { return e >= Ut(t, o) && e < It(t, o) } function $i (e, t, o) { for (var E = o ? Di : jr, k = e[0].length, M = e.length, z = M, X = ee(M), J = 1 / 0, le = []; z--;) { var ue = e[z]; z && t && (ue = Et(ue, rn(t))), J = Ut(ue.length, J), X[z] = !o && (t || k >= 120 && ue.length >= 120) ? new Vn(z && ue) : r }ue = e[0]; let ge = -1; const Te = X[0]; e:for (;++ge < k && le.length < J;) { let Re = ue[ge]; const qe = t ? t(Re) : Re; if (Re = o || Re !== 0 ? Re : 0, !(Te ? br(Te, qe) : E(le, qe, o))) { for (z = M; --z;) { const Ze = X[z]; if (!(Ze ? br(Ze, qe) : E(e[z], qe, o))) continue e }Te && Te.push(qe), le.push(Re) } } return le } function Ql (e, t, o, E) { return wn(e, function (k, M, z) { t(E, o(k), M, z) }), E } function Cr (e, t, o) { t = Kn(t, e), e = yo(e, t); const E = e == null ? e : e[Pn(gn(t))]; return E == null ? r : nn(E, e, o) } function ka (e) { return Tt(e) && Gt(e) == Ke } function eu (e) { return Tt(e) && Gt(e) == tt } function tu (e) { return Tt(e) && Gt(e) == Lt } function Dr (e, t, o, E, k) { return e === t ? !0 : e == null || t == null || !Tt(e) && !Tt(t) ? e !== e && t !== t : nu(e, t, o, E, Dr, k) } function nu (e, t, o, E, k, M) { let z = Xe(e); const X = Xe(t); let J = z ? mt : zt(e); let le = X ? mt : zt(t); J = J == Ke ? At : J, le = le == Ke ? At : le; let ue = J == At; const ge = le == At; const Te = J == le; if (Te && Gn(e)) { if (!Gn(t)) return !1; z = !0, ue = !1 } if (Te && !ue) return M || (M = new bn()), z || gr(e) ? uo(e, t, o, E, k, M) : Nu(e, t, J, o, E, k, M); if (!(o & b)) { const Re = ue && dt.call(e, '__wrapped__'); const qe = ge && dt.call(t, '__wrapped__'); if (Re || qe) { const Ze = Re ? e.value() : e; const Ue = qe ? t.value() : t; return M || (M = new bn()), k(Ze, Ue, o, E, M) } } return Te ? (M || (M = new bn()), Ru(e, t, o, E, k, M)) : !1 } function ru (e) { return Tt(e) && zt(e) == et } function Gi (e, t, o, E) { let k = o.length; const M = k; const z = !E; if (e == null) return !M; for (e = vt(e); k--;) { var X = o[k]; if (z && X[2] ? X[1] !== e[X[0]] : !(X[0] in e)) return !1 } for (;++k < M;) { X = o[k]; const J = X[0]; const le = e[J]; const ue = X[1]; if (z && X[2]) { if (le === r && !(J in e)) return !1 } else { const ge = new bn(); if (E) var Te = E(le, ue, J, e, t, ge); if (!(Te === r ? Dr(ue, le, b | v, E, ge) : Te)) return !1 } } return !0 } function La (e) { if (!wt(e) || Ou(e)) return !1; const t = jn(e) ? rl : ve; return t.test(er(e)) } function iu (e) { return Tt(e) && Gt(e) == jt } function su (e) { return Tt(e) && zt(e) == lt } function au (e) { return Tt(e) && yi(e.length) && !!xt[Gt(e)] } function Ba (e) { return typeof e === 'function' ? e : e == null ? Qt : typeof e === 'object' ? Xe(e) ? _a(e[0], e[1]) : ja(e) : nc(e) } function Xi (e) { if (!kr(e)) return ll(e); const t = []; for (const o in vt(e))dt.call(e, o) && o != 'constructor' && t.push(o); return t } function ou (e) { if (!wt(e)) return zu(e); const t = kr(e); const o = []; for (const E in e)E == 'constructor' && (t || !dt.call(e, E)) || o.push(E); return o } function Yi (e, t) { return e < t } function Ia (e, t) { let o = -1; const E = Jt(e) ? ee(e.length) : []; return zn(e, function (k, M, z) { E[++o] = t(k, M, z) }), E } function ja (e) { const t = us(e); return t.length == 1 && t[0][2] ? mo(t[0][0], t[0][1]) : function (o) { return o === e || Gi(o, e, t) } } function _a (e, t) { return ds(e) && go(t) ? mo(Pn(e), t) : function (o) { const E = As(o, e); return E === r && E === t ? Ss(o, e) : Dr(t, E, b | v) } } function ni (e, t, o, E, k) { e !== t && zi(t, function (M, z) { if (k || (k = new bn()), wt(M))cu(e, t, z, o, ni, E, k); else { let X = E ? E(hs(e, z), M, z + '', e, t, k) : r; X === r && (X = M), qi(e, z, X) } }, Zt) } function cu (e, t, o, E, k, M, z) { const X = hs(e, o); const J = hs(t, o); const le = z.get(J); if (le) { qi(e, o, le); return } let ue = M ? M(X, J, o + '', e, t, z) : r; let ge = ue === r; if (ge) { const Te = Xe(J); const Re = !Te && Gn(J); const qe = !Te && !Re && gr(J); ue = J, Te || Re || qe ? Xe(X) ? ue = X : Dt(X) ? ue = Vt(X) : Re ? (ge = !1, ue = Xa(J, !0)) : qe ? (ge = !1, ue = Ya(J, !0)) : ue = [] : Br(J) || tr(J) ? (ue = X, tr(X) ? ue = $o(X) : (!wt(X) || jn(X)) && (ue = ho(J))) : ge = !1 }ge && (z.set(J, ue), k(ue, J, E, M, z), z.delete(J)), qi(e, o, ue) } function Fa (e, t) { const o = e.length; if (o) return t += t < 0 ? o : 0, In(t, o) ? e[t] : r } function Ma (e, t, o) { t.length ? t = Et(t, function (M) { return Xe(M) ? function (z) { return Zn(z, M.length === 1 ? M[0] : M) } : M }) : t = [Qt]; let E = -1; t = Et(t, rn(He())); const k = Ia(e, function (M, z, X) { const J = Et(t, function (le) { return le(M) }); return { criteria: J, index: ++E, value: M } }); return jc(k, function (M, z) { return Eu(M, z, o) }) } function lu (e, t) { return Oa(e, t, function (o, E) { return Ss(e, E) }) } function Oa (e, t, o) { for (var E = -1, k = t.length, M = {}; ++E < k;) { const z = t[E]; const X = Zn(e, z); o(X, z) && Nr(M, Kn(z, e), X) } return M } function uu (e) { return function (t) { return Zn(t, e) } } function Vi (e, t, o, E) { const k = E ? Ic : sr; let M = -1; const z = t.length; let X = e; for (e === t && (t = Vt(t)), o && (X = Et(e, rn(o))); ++M < z;) for (let J = 0, le = t[M], ue = o ? o(le) : le; (J = k(X, ue, J, E)) > -1;)X !== e && $r.call(X, J, 1), $r.call(e, J, 1); return e } function Ha (e, t) { for (let o = e ? t.length : 0, E = o - 1; o--;) { const k = t[o]; if (o == E || k !== M) { var M = k; In(k) ? $r.call(e, k, 1) : es(e, k) } } return e } function Ji (e, t) { return e + Yr(xa() * (t - e + 1)) } function fu (e, t, o, E) { for (var k = -1, M = It(Xr((t - e) / (o || 1)), 0), z = ee(M); M--;)z[E ? M : ++k] = e, e += o; return z } function Zi (e, t) { let o = ''; if (!e || t < 1 || t > K) return o; do t % 2 && (o += e), t = Yr(t / 2), t && (e += e); while (t); return o } function Qe (e, t) { return gs(vo(e, t, Qt), e + '') } function du (e) { return Sa(mr(e)) } function pu (e, t) { const o = mr(e); return di(o, Jn(t, 0, o.length)) } function Nr (e, t, o, E) { if (!wt(e)) return e; t = Kn(t, e); for (let k = -1, M = t.length, z = M - 1, X = e; X != null && ++k < M;) { const J = Pn(t[k]); let le = o; if (J === '__proto__' || J === 'constructor' || J === 'prototype') return e; if (k != z) { const ue = X[J]; le = E ? E(ue, J, X) : r, le === r && (le = wt(ue) ? ue : In(t[k + 1]) ? [] : {}) }Tr(X, J, le), X = X[J] } return e } const qa = Vr ? function (e, t) { return Vr.set(e, t), e } : Qt; const hu = Gr ? function (e, t) { return Gr(e, 'toString', { configurable: !0, enumerable: !1, value: Ts(t), writable: !0 }) } : Qt; function gu (e) { return di(mr(e)) } function hn (e, t, o) { let E = -1; let k = e.length; t < 0 && (t = -t > k ? 0 : k + t), o = o > k ? k : o, o < 0 && (o += k), k = t > o ? 0 : o - t >>> 0, t >>>= 0; for (var M = ee(k); ++E < k;)M[E] = e[E + t]; return M } function mu (e, t) { let o; return zn(e, function (E, k, M) { return o = t(E, k, M), !o }), !!o } function ri (e, t, o) { let E = 0; let k = e == null ? E : e.length; if (typeof t === 'number' && t === t && k <= ye) { for (;E < k;) { const M = E + k >>> 1; const z = e[M]; z !== null && !an(z) && (o ? z <= t : z < t) ? E = M + 1 : k = M } return k } return Qi(e, t, Qt, o) } function Qi (e, t, o, E) { let k = 0; let M = e == null ? 0 : e.length; if (M === 0) return 0; t = o(t); for (let z = t !== t, X = t === null, J = an(t), le = t === r; k < M;) { const ue = Yr((k + M) / 2); const ge = o(e[ue]); const Te = ge !== r; const Re = ge === null; const qe = ge === ge; const Ze = an(ge); if (z) var Ue = E || qe; else le ? Ue = qe && (E || Te) : X ? Ue = qe && Te && (E || !Re) : J ? Ue = qe && Te && !Re && (E || !Ze) : Re || Ze ? Ue = !1 : Ue = E ? ge <= t : ge < t; Ue ? k = ue + 1 : M = ue } return Ut(M, Q) } function Ua (e, t) { for (var o = -1, E = e.length, k = 0, M = []; ++o < E;) { const z = e[o]; const X = t ? t(z) : z; if (!o || !xn(X, J)) { var J = X; M[k++] = z === 0 ? 0 : z } } return M } function za (e) { return typeof e === 'number' ? e : an(e) ? oe : +e } function sn (e) { if (typeof e === 'string') return e; if (Xe(e)) return Et(e, sn) + ''; if (an(e)) return Ea ? Ea.call(e) : ''; const t = e + ''; return t == '0' && 1 / e == -$ ? '-0' : t } function Wn (e, t, o) { let E = -1; let k = jr; const M = e.length; let z = !0; const X = []; let J = X; if (o)z = !1, k = Di; else if (M >= c) { const le = t ? null : Cu(e); if (le) return Fr(le); z = !1, k = br, J = new Vn() } else J = t ? [] : X; e:for (;++E < M;) { let ue = e[E]; const ge = t ? t(ue) : ue; if (ue = o || ue !== 0 ? ue : 0, z && ge === ge) { for (let Te = J.length; Te--;) if (J[Te] === ge) continue e; t && J.push(ge), X.push(ue) } else k(J, ge, o) || (J !== X && J.push(ge), X.push(ue)) } return X } function es (e, t) { return t = Kn(t, e), e = yo(e, t), e == null || delete e[Pn(gn(t))] } function Wa (e, t, o, E) { return Nr(e, t, o(Zn(e, t)), E) } function ii (e, t, o, E) { for (var k = e.length, M = E ? k : -1; (E ? M-- : ++M < k) && t(e[M], M, e););return o ? hn(e, E ? 0 : M, E ? M + 1 : k) : hn(e, E ? M + 1 : 0, E ? k : M) } function Ka (e, t) { let o = e; return o instanceof rt && (o = o.value()), Ni(t, function (E, k) { return k.func.apply(k.thisArg, Hn([E], k.args)) }, o) } function ts (e, t, o) { const E = e.length; if (E < 2) return E ? Wn(e[0]) : []; for (var k = -1, M = ee(E); ++k < E;) for (let z = e[k], X = -1; ++X < E;)X != k && (M[k] = Pr(M[k] || z, e[X], t, o)); return Wn(Ht(M, 1), t, o) } function $a (e, t, o) { for (var E = -1, k = e.length, M = t.length, z = {}; ++E < k;) { const X = E < M ? t[E] : r; o(z, e[E], X) } return z } function ns (e) { return Dt(e) ? e : [] } function rs (e) { return typeof e === 'function' ? e : Qt } function Kn (e, t) { return Xe(e) ? e : ds(e, t) ? [e] : Ao(ut(e)) } const vu = Qe; function $n (e, t, o) { const E = e.length; return o = o === r ? E : o, !t && o >= E ? e : hn(e, t, o) } const Ga = il || function (e) { return Ot.clearTimeout(e) }; function Xa (e, t) { if (t) return e.slice(); const o = e.length; const E = ga ? ga(o) : new e.constructor(o); return e.copy(E), E } function is (e) { const t = new e.constructor(e.byteLength); return new Wr(t).set(new Wr(e)), t } function yu (e, t) { const o = t ? is(e.buffer) : e.buffer; return new e.constructor(o, e.byteOffset, e.byteLength) } function bu (e) { const t = new e.constructor(e.source, je.exec(e)); return t.lastIndex = e.lastIndex, t } function xu (e) { return wr ? vt(wr.call(e)) : {} } function Ya (e, t) { const o = t ? is(e.buffer) : e.buffer; return new e.constructor(o, e.byteOffset, e.length) } function Va (e, t) { if (e !== t) { const o = e !== r; const E = e === null; const k = e === e; const M = an(e); const z = t !== r; const X = t === null; const J = t === t; const le = an(t); if (!X && !le && !M && e > t || M && z && J && !X && !le || E && z && J || !o && J || !k) return 1; if (!E && !M && !le && e < t || le && o && k && !E && !M || X && o && k || !z && k || !J) return -1 } return 0 } function Eu (e, t, o) { for (let E = -1, k = e.criteria, M = t.criteria, z = k.length, X = o.length; ++E < z;) { const J = Va(k[E], M[E]); if (J) { if (E >= X) return J; const le = o[E]; return J * (le == 'desc' ? -1 : 1) } } return e.index - t.index } function Ja (e, t, o, E) { for (var k = -1, M = e.length, z = o.length, X = -1, J = t.length, le = It(M - z, 0), ue = ee(J + le), ge = !E; ++X < J;)ue[X] = t[X]; for (;++k < z;)(ge || k < M) && (ue[o[k]] = e[k]); for (;le--;)ue[X++] = e[k++]; return ue } function Za (e, t, o, E) { for (var k = -1, M = e.length, z = -1, X = o.length, J = -1, le = t.length, ue = It(M - X, 0), ge = ee(ue + le), Te = !E; ++k < ue;)ge[k] = e[k]; for (var Re = k; ++J < le;)ge[Re + J] = t[J]; for (;++z < X;)(Te || k < M) && (ge[Re + o[z]] = e[k++]); return ge } function Vt (e, t) { let o = -1; const E = e.length; for (t || (t = ee(E)); ++o < E;)t[o] = e[o]; return t } function Tn (e, t, o, E) { const k = !o; o || (o = {}); for (let M = -1, z = t.length; ++M < z;) { const X = t[M]; let J = E ? E(o[X], e[X], X, o, e) : r; J === r && (J = e[X]), k ? kn(o, X, J) : Tr(o, X, J) } return o } function Au (e, t) { return Tn(e, fs(e), t) } function Su (e, t) { return Tn(e, fo(e), t) } function si (e, t) { return function (o, E) { const k = Xe(o) ? Dc : Kl; const M = t ? t() : {}; return k(o, e, He(E, 2), M) } } function dr (e) { return Qe(function (t, o) { let E = -1; let k = o.length; let M = k > 1 ? o[k - 1] : r; const z = k > 2 ? o[2] : r; for (M = e.length > 3 && typeof M === 'function' ? (k--, M) : r, z && Xt(o[0], o[1], z) && (M = k < 3 ? r : M, k = 1), t = vt(t); ++E < k;) { const X = o[E]; X && e(t, X, E, M) } return t }) } function Qa (e, t) { return function (o, E) { if (o == null) return o; if (!Jt(o)) return e(o, E); for (let k = o.length, M = t ? k : -1, z = vt(o); (t ? M-- : ++M < k) && E(z[M], M, z) !== !1;);return o } } function eo (e) { return function (t, o, E) { for (let k = -1, M = vt(t), z = E(t), X = z.length; X--;) { const J = z[e ? X : ++k]; if (o(M[J], J, M) === !1) break } return t } } function wu (e, t, o) { const E = t & x; const k = Rr(e); function M () { const z = this && this !== Ot && this instanceof M ? k : e; return z.apply(E ? o : this, arguments) } return M } function to (e) { return function (t) { t = ut(t); const o = ar(t) ? yn(t) : r; const E = o ? o[0] : t.charAt(0); const k = o ? $n(o, 1).join('') : t.slice(1); return E[e]() + k } } function pr (e) { return function (t) { return Ni(ec(Qo(t).replace(hc, '')), e, '') } } function Rr (e) { return function () { const t = arguments; switch (t.length) { case 0:return new e(); case 1:return new e(t[0]); case 2:return new e(t[0], t[1]); case 3:return new e(t[0], t[1], t[2]); case 4:return new e(t[0], t[1], t[2], t[3]); case 5:return new e(t[0], t[1], t[2], t[3], t[4]); case 6:return new e(t[0], t[1], t[2], t[3], t[4], t[5]); case 7:return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]) } const o = fr(e.prototype); const E = e.apply(o, t); return wt(E) ? E : o } } function Tu (e, t, o) { const E = Rr(e); function k () { for (var M = arguments.length, z = ee(M), X = M, J = hr(k); X--;)z[X] = arguments[X]; const le = M < 3 && z[0] !== J && z[M - 1] !== J ? [] : qn(z, J); if (M -= le.length, M < o) return ao(e, t, ai, k.placeholder, r, z, le, r, r, o - M); const ue = this && this !== Ot && this instanceof k ? E : e; return nn(ue, this, z) } return k } function no (e) { return function (t, o, E) { const k = vt(t); if (!Jt(t)) { var M = He(o, 3); t = Ft(t), o = function (X) { return M(k[X], X, k) } } const z = e(t, o, E); return z > -1 ? k[M ? t[z] : z] : r } } function ro (e) { return Bn(function (t) { const o = t.length; let E = o; const k = dn.prototype.thru; for (e && t.reverse(); E--;) { var M = t[E]; if (typeof M !== 'function') throw new fn(l); if (k && !z && ui(M) == 'wrapper') var z = new dn([], !0) } for (E = z ? E : o; ++E < o;) { M = t[E]; const X = ui(M); const J = X == 'wrapper' ? ls(M) : r; J && ps(J[0]) && J[1] == (N | D | T | L) && !J[4].length && J[9] == 1 ? z = z[ui(J[0])].apply(z, J[3]) : z = M.length == 1 && ps(M) ? z[X]() : z.thru(M) } return function () { const le = arguments; const ue = le[0]; if (z && le.length == 1 && Xe(ue)) return z.plant(ue).value(); for (var ge = 0, Te = o ? t[ge].apply(this, le) : ue; ++ge < o;)Te = t[ge].call(this, Te); return Te } }) } function ai (e, t, o, E, k, M, z, X, J, le) { const ue = t & N; const ge = t & x; const Te = t & P; const Re = t & (D | A); const qe = t & R; const Ze = Te ? r : Rr(e); function Ue () { for (var nt = arguments.length, at = ee(nt), on = nt; on--;)at[on] = arguments[on]; if (Re) var Yt = hr(Ue), cn = Fc(at, Yt); if (E && (at = Ja(at, E, k, Re)), M && (at = Za(at, M, z, Re)), nt -= cn, Re && nt < le) { const Nt = qn(at, Yt); return ao(e, t, ai, Ue.placeholder, o, at, Nt, X, J, le - nt) } const En = ge ? o : this; let Fn = Te ? En[e] : e; return nt = at.length, X ? at = Ku(at, X) : qe && nt > 1 && at.reverse(), ue && J < nt && (at.length = J), this && this !== Ot && this instanceof Ue && (Fn = Ze || Rr(Fn)), Fn.apply(En, at) } return Ue } function io (e, t) { return function (o, E) { return Ql(o, e, t(E), {}) } } function oi (e, t) { return function (o, E) { let k; if (o === r && E === r) return t; if (o !== r && (k = o), E !== r) { if (k === r) return E; typeof o === 'string' || typeof E === 'string' ? (o = sn(o), E = sn(E)) : (o = za(o), E = za(E)), k = e(o, E) } return k } } function ss (e) { return Bn(function (t) { return t = Et(t, rn(He())), Qe(function (o) { const E = this; return e(t, function (k) { return nn(k, E, o) }) }) }) } function ci (e, t) { t = t === r ? ' ' : sn(t); const o = t.length; if (o < 2) return o ? Zi(t, e) : t; const E = Zi(t, Xr(e / or(t))); return ar(t) ? $n(yn(E), 0, e).join('') : E.slice(0, e) } function Pu (e, t, o, E) { const k = t & x; const M = Rr(e); function z () { for (var X = -1, J = arguments.length, le = -1, ue = E.length, ge = ee(ue + J), Te = this && this !== Ot && this instanceof z ? M : e; ++le < ue;)ge[le] = E[le]; for (;J--;)ge[le++] = arguments[++X]; return nn(Te, k ? o : this, ge) } return z } function so (e) { return function (t, o, E) { return E && typeof E !== 'number' && Xt(t, o, E) && (o = E = r), t = _n(t), o === r ? (o = t, t = 0) : o = _n(o), E = E === r ? t < o ? 1 : -1 : _n(E), fu(t, o, E, e) } } function li (e) { return function (t, o) { return typeof t === 'string' && typeof o === 'string' || (t = mn(t), o = mn(o)), e(t, o) } } function ao (e, t, o, E, k, M, z, X, J, le) { const ue = t & D; const ge = ue ? z : r; const Te = ue ? r : z; const Re = ue ? M : r; const qe = ue ? r : M; t |= ue ? T : C, t &= ~(ue ? C : T), t & S || (t &= ~(x | P)); const Ze = [e, t, k, Re, ge, qe, Te, X, J, le]; const Ue = o.apply(r, Ze); return ps(e) && bo(Ue, Ze), Ue.placeholder = E, xo(Ue, e, t) } function as (e) { const t = Bt[e]; return function (o, E) { if (o = mn(o), E = E == null ? 0 : Ut(Je(E), 292), E && ba(o)) { let k = (ut(o) + 'e').split('e'); const M = t(k[0] + 'e' + (+k[1] + E)); return k = (ut(M) + 'e').split('e'), +(k[0] + 'e' + (+k[1] - E)) } return t(o) } } var Cu = lr && 1 / Fr(new lr([, -0]))[1] == $ ? function (e) { return new lr(e) } : Ds; function oo (e) { return function (t) { const o = zt(t); return o == et ? _i(t) : o == lt ? Wc(t) : _c(t, e(t)) } } function Ln (e, t, o, E, k, M, z, X) { const J = t & P; if (!J && typeof e !== 'function') throw new fn(l); let le = E ? E.length : 0; if (le || (t &= ~(T | C), E = k = r), z = z === r ? z : It(Je(z), 0), X = X === r ? X : Je(X), le -= k ? k.length : 0, t & C) { var ue = E; var ge = k; E = k = r } const Te = J ? r : ls(e); const Re = [e, t, o, E, k, ue, ge, M, z, X]; if (Te && Uu(Re, Te), e = Re[0], t = Re[1], o = Re[2], E = Re[3], k = Re[4], X = Re[9] = Re[9] === r ? J ? 0 : e.length : It(Re[9] - le, 0), !X && t & (D | A) && (t &= ~(D | A)), !t || t == x) var qe = wu(e, t, o); else t == D || t == A ? qe = Tu(e, t, X) : (t == T || t == (x | T)) && !k.length ? qe = Pu(e, t, o, E) : qe = ai.apply(r, Re); const Ze = Te ? qa : bo; return xo(Ze(qe, Re), e, t) } function co (e, t, o, E) { return e === r || xn(e, cr[o]) && !dt.call(E, o) ? t : e } function lo (e, t, o, E, k, M) { return wt(e) && wt(t) && (M.set(t, e), ni(e, t, r, lo, M), M.delete(t)), e } function Du (e) { return Br(e) ? r : e } function uo (e, t, o, E, k, M) { const z = o & b; const X = e.length; const J = t.length; if (X != J && !(z && J > X)) return !1; const le = M.get(e); const ue = M.get(t); if (le && ue) return le == t && ue == e; let ge = -1; let Te = !0; const Re = o & v ? new Vn() : r; for (M.set(e, t), M.set(t, e); ++ge < X;) { var qe = e[ge]; const Ze = t[ge]; if (E) var Ue = z ? E(Ze, qe, ge, t, e, M) : E(qe, Ze, ge, e, t, M); if (Ue !== r) { if (Ue) continue; Te = !1; break } if (Re) { if (!Ri(t, function (nt, at) { if (!br(Re, at) && (qe === nt || k(qe, nt, o, E, M))) return Re.push(at) })) { Te = !1; break } } else if (!(qe === Ze || k(qe, Ze, o, E, M))) { Te = !1; break } } return M.delete(e), M.delete(t), Te } function Nu (e, t, o, E, k, M, z) { switch (o) { case tn:if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1; e = e.buffer, t = t.buffer; case tt:return !(e.byteLength != t.byteLength || !M(new Wr(e), new Wr(t))); case Rt:case Lt:case Kt:return xn(+e, +t); case ze:return e.name == t.name && e.message == t.message; case jt:case pt:return e == t + ''; case et:var X = _i; case lt:var J = E & b; if (X || (X = Fr), e.size != t.size && !J) return !1; var le = z.get(e); if (le) return le == t; E |= v, z.set(e, t); var ue = uo(X(e), X(t), E, k, M, z); return z.delete(e), ue; case Cn:if (wr) return wr.call(e) == wr.call(t) } return !1 } function Ru (e, t, o, E, k, M) { const z = o & b; const X = os(e); const J = X.length; const le = os(t); const ue = le.length; if (J != ue && !z) return !1; for (var ge = J; ge--;) { var Te = X[ge]; if (!(z ? Te in t : dt.call(t, Te))) return !1 } const Re = M.get(e); const qe = M.get(t); if (Re && qe) return Re == t && qe == e; let Ze = !0; M.set(e, t), M.set(t, e); for (var Ue = z; ++ge < J;) { Te = X[ge]; const nt = e[Te]; const at = t[Te]; if (E) var on = z ? E(at, nt, Te, t, e, M) : E(nt, at, Te, e, t, M); if (!(on === r ? nt === at || k(nt, at, o, E, M) : on)) { Ze = !1; break }Ue || (Ue = Te == 'constructor') } if (Ze && !Ue) { const Yt = e.constructor; const cn = t.constructor; Yt != cn && 'constructor' in e && 'constructor' in t && !(typeof Yt === 'function' && Yt instanceof Yt && typeof cn === 'function' && cn instanceof cn) && (Ze = !1) } return M.delete(e), M.delete(t), Ze } function Bn (e) { return gs(vo(e, r, Po), e + '') } function os (e) { return Ra(e, Ft, fs) } function cs (e) { return Ra(e, Zt, fo) } var ls = Vr ? function (e) { return Vr.get(e) } : Ds; function ui (e) { for (var t = e.name + '', o = ur[t], E = dt.call(ur, t) ? o.length : 0; E--;) { const k = o[E]; const M = k.func; if (M == null || M == e) return k.name } return t } function hr (e) { const t = dt.call(I, 'placeholder') ? I : e; return t.placeholder } function He () { let e = I.iteratee || Ps; return e = e === Ps ? Ba : e, arguments.length ? e(arguments[0], arguments[1]) : e } function fi (e, t) { const o = e.__data__; return Mu(t) ? o[typeof t === 'string' ? 'string' : 'hash'] : o.map } function us (e) { for (var t = Ft(e), o = t.length; o--;) { const E = t[o]; const k = e[E]; t[o] = [E, k, go(k)] } return t } function Qn (e, t) { const o = qc(e, t); return La(o) ? o : r } function ku (e) { const t = dt.call(e, Xn); const o = e[Xn]; try { e[Xn] = r; var E = !0 } catch (M) {} const k = Ur.call(e); return E && (t ? e[Xn] = o : delete e[Xn]), k } var fs = Mi ? function (e) { return e == null ? [] : (e = vt(e), On(Mi(e), function (t) { return va.call(e, t) })) } : Ns; var fo = Mi ? function (e) { for (var t = []; e;)Hn(t, fs(e)), e = Kr(e); return t } : Ns; var zt = Gt; (Oi && zt(new Oi(new ArrayBuffer(1))) != tn || Er && zt(new Er()) != et || Hi && zt(Hi.resolve()) != $t || lr && zt(new lr()) != lt || Ar && zt(new Ar()) != en) && (zt = function (e) { const t = Gt(e); const o = t == At ? e.constructor : r; const E = o ? er(o) : ''; if (E) switch (E) { case pl:return tn; case hl:return et; case gl:return $t; case ml:return lt; case vl:return en } return t }); function Lu (e, t, o) { for (let E = -1, k = o.length; ++E < k;) { const M = o[E]; const z = M.size; switch (M.type) { case 'drop':e += z; break; case 'dropRight':t -= z; break; case 'take':t = Ut(t, e + z); break; case 'takeRight':e = It(e, t - z); break } } return { start: e, end: t } } function Bu (e) { const t = e.match(Se); return t ? t[1].split(Be) : [] } function po (e, t, o) { t = Kn(t, e); for (var E = -1, k = t.length, M = !1; ++E < k;) { var z = Pn(t[E]); if (!(M = e != null && o(e, z))) break; e = e[z] } return M || ++E != k ? M : (k = e == null ? 0 : e.length, !!k && yi(k) && In(z, k) && (Xe(e) || tr(e))) } function Iu (e) { const t = e.length; const o = new e.constructor(t); return t && typeof e[0] === 'string' && dt.call(e, 'index') && (o.index = e.index, o.input = e.input), o } function ho (e) { return typeof e.constructor === 'function' && !kr(e) ? fr(Kr(e)) : {} } function ju (e, t, o) { const E = e.constructor; switch (t) { case tt:return is(e); case Rt:case Lt:return new E(+e); case tn:return yu(e, o); case _t:case pe:case Z:case de:case Pe:case ne:case me:case fe:case xe:return Ya(e, o); case et:return new E(); case Kt:case pt:return new E(e); case jt:return bu(e); case lt:return new E(); case Cn:return xu(e) } } function _u (e, t) {
            const o = t.length; if (!o) return e; const E = o - 1; return t[E] = (o > 1 ? '& ' : '') + t[E], t = t.join(o > 2 ? ', ' : ' '), e.replace(be, `{
/* [wrapped with ` + t + `] */
`)
          } function Fu (e) { return Xe(e) || tr(e) || !!(ya && e && e[ya]) } function In (e, t) { const o = typeof e; return t = t == null ? K : t, !!t && (o == 'number' || o != 'symbol' && Ee.test(e)) && e > -1 && e % 1 == 0 && e < t } function Xt (e, t, o) { if (!wt(o)) return !1; const E = typeof t; return (E == 'number' ? Jt(o) && In(t, o.length) : E == 'string' && t in o) ? xn(o[t], e) : !1 } function ds (e, t) { if (Xe(e)) return !1; const o = typeof e; return o == 'number' || o == 'symbol' || o == 'boolean' || e == null || an(e) ? !0 : U.test(e) || !j.test(e) || t != null && e in vt(t) } function Mu (e) { const t = typeof e; return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean' ? e !== '__proto__' : e === null } function ps (e) { const t = ui(e); const o = I[t]; if (typeof o !== 'function' || !(t in rt.prototype)) return !1; if (e === o) return !0; const E = ls(o); return !!E && e === E[0] } function Ou (e) { return !!ha && ha in e } const Hu = Hr ? jn : Rs; function kr (e) { const t = e && e.constructor; const o = typeof t === 'function' && t.prototype || cr; return e === o } function go (e) { return e === e && !wt(e) } function mo (e, t) { return function (o) { return o == null ? !1 : o[e] === t && (t !== r || e in vt(o)) } } function qu (e) { const t = mi(e, function (E) { return o.size === g && o.clear(), E }); var o = t.cache; return t } function Uu (e, t) { const o = e[1]; const E = t[1]; let k = o | E; const M = k < (x | P | N); const z = E == N && o == D || E == N && o == L && e[7].length <= t[8] || E == (N | L) && t[7].length <= t[8] && o == D; if (!(M || z)) return e; E & x && (e[2] = t[2], k |= o & x ? 0 : S); let X = t[3]; if (X) { var J = e[3]; e[3] = J ? Ja(J, X, t[4]) : X, e[4] = J ? qn(e[3], i) : t[4] } return X = t[5], X && (J = e[5], e[5] = J ? Za(J, X, t[6]) : X, e[6] = J ? qn(e[5], i) : t[6]), X = t[7], X && (e[7] = X), E & N && (e[8] = e[8] == null ? t[8] : Ut(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = k, e } function zu (e) { const t = []; if (e != null) for (const o in vt(e))t.push(o); return t } function Wu (e) { return Ur.call(e) } function vo (e, t, o) { return t = It(t === r ? e.length - 1 : t, 0), function () { for (var E = arguments, k = -1, M = It(E.length - t, 0), z = ee(M); ++k < M;)z[k] = E[t + k]; k = -1; for (var X = ee(t + 1); ++k < t;)X[k] = E[k]; return X[t] = o(z), nn(e, this, X) } } function yo (e, t) { return t.length < 2 ? e : Zn(e, hn(t, 0, -1)) } function Ku (e, t) { for (let o = e.length, E = Ut(t.length, o), k = Vt(e); E--;) { const M = t[E]; e[E] = In(M, o) ? k[M] : r } return e } function hs (e, t) { if (!(t === 'constructor' && typeof e[t] === 'function') && t != '__proto__') return e[t] } var bo = Eo(qa); var Lr = al || function (e, t) { return Ot.setTimeout(e, t) }; var gs = Eo(hu); function xo (e, t, o) { const E = t + ''; return gs(e, _u(E, $u(Bu(E), o))) } function Eo (e) { let t = 0; let o = 0; return function () { const E = ul(); const k = q - (E - o); if (o = E, k > 0) { if (++t >= F) return arguments[0] } else t = 0; return e.apply(r, arguments) } } function di (e, t) { let o = -1; const E = e.length; const k = E - 1; for (t = t === r ? E : t; ++o < t;) { const M = Ji(o, k); const z = e[M]; e[M] = e[o], e[o] = z } return e.length = t, e } var Ao = qu(function (e) { const t = []; return e.charCodeAt(0) === 46 && t.push(''), e.replace(G, function (o, E, k, M) { t.push(k ? M.replace(Ye, '$1') : E || o) }), t }); function Pn (e) { if (typeof e === 'string' || an(e)) return e; const t = e + ''; return t == '0' && 1 / e == -$ ? '-0' : t } function er (e) { if (e != null) { try { return qr.call(e) } catch (t) {} try { return e + '' } catch (t) {} } return '' } function $u (e, t) { return un(Ae, function (o) { const E = '_.' + o[0]; t & o[1] && !jr(e, E) && e.push(E) }), e.sort() } function So (e) { if (e instanceof rt) return e.clone(); const t = new dn(e.__wrapped__, e.__chain__); return t.__actions__ = Vt(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t } function Gu (e, t, o) { (o ? Xt(e, t, o) : t === r) ? t = 1 : t = It(Je(t), 0); const E = e == null ? 0 : e.length; if (!E || t < 1) return []; for (var k = 0, M = 0, z = ee(Xr(E / t)); k < E;)z[M++] = hn(e, k, k += t); return z } function Xu (e) { for (var t = -1, o = e == null ? 0 : e.length, E = 0, k = []; ++t < o;) { const M = e[t]; M && (k[E++] = M) } return k } function Yu () { const e = arguments.length; if (!e) return []; for (var t = ee(e - 1), o = arguments[0], E = e; E--;)t[E - 1] = arguments[E]; return Hn(Xe(o) ? Vt(o) : [o], Ht(t, 1)) } const Vu = Qe(function (e, t) { return Dt(e) ? Pr(e, Ht(t, 1, Dt, !0)) : [] }); const Ju = Qe(function (e, t) { let o = gn(t); return Dt(o) && (o = r), Dt(e) ? Pr(e, Ht(t, 1, Dt, !0), He(o, 2)) : [] }); const Zu = Qe(function (e, t) { let o = gn(t); return Dt(o) && (o = r), Dt(e) ? Pr(e, Ht(t, 1, Dt, !0), r, o) : [] }); function Qu (e, t, o) { const E = e == null ? 0 : e.length; return E ? (t = o || t === r ? 1 : Je(t), hn(e, t < 0 ? 0 : t, E)) : [] } function ef (e, t, o) { const E = e == null ? 0 : e.length; return E ? (t = o || t === r ? 1 : Je(t), t = E - t, hn(e, 0, t < 0 ? 0 : t)) : [] } function tf (e, t) { return e && e.length ? ii(e, He(t, 3), !0, !0) : [] } function nf (e, t) { return e && e.length ? ii(e, He(t, 3), !0) : [] } function rf (e, t, o, E) { const k = e == null ? 0 : e.length; return k ? (o && typeof o !== 'number' && Xt(e, t, o) && (o = 0, E = k), Yl(e, t, o, E)) : [] } function wo (e, t, o) { const E = e == null ? 0 : e.length; if (!E) return -1; let k = o == null ? 0 : Je(o); return k < 0 && (k = It(E + k, 0)), _r(e, He(t, 3), k) } function To (e, t, o) { const E = e == null ? 0 : e.length; if (!E) return -1; let k = E - 1; return o !== r && (k = Je(o), k = o < 0 ? It(E + k, 0) : Ut(k, E - 1)), _r(e, He(t, 3), k, !0) } function Po (e) { const t = e == null ? 0 : e.length; return t ? Ht(e, 1) : [] } function sf (e) { const t = e == null ? 0 : e.length; return t ? Ht(e, $) : [] } function af (e, t) { const o = e == null ? 0 : e.length; return o ? (t = t === r ? 1 : Je(t), Ht(e, t)) : [] } function of (e) { for (var t = -1, o = e == null ? 0 : e.length, E = {}; ++t < o;) { const k = e[t]; E[k[0]] = k[1] } return E } function Co (e) { return e && e.length ? e[0] : r } function cf (e, t, o) { const E = e == null ? 0 : e.length; if (!E) return -1; let k = o == null ? 0 : Je(o); return k < 0 && (k = It(E + k, 0)), sr(e, t, k) } function lf (e) { const t = e == null ? 0 : e.length; return t ? hn(e, 0, -1) : [] } const uf = Qe(function (e) { const t = Et(e, ns); return t.length && t[0] === e[0] ? $i(t) : [] }); const ff = Qe(function (e) { let t = gn(e); const o = Et(e, ns); return t === gn(o) ? t = r : o.pop(), o.length && o[0] === e[0] ? $i(o, He(t, 2)) : [] }); const df = Qe(function (e) { let t = gn(e); const o = Et(e, ns); return t = typeof t === 'function' ? t : r, t && o.pop(), o.length && o[0] === e[0] ? $i(o, r, t) : [] }); function pf (e, t) { return e == null ? '' : cl.call(e, t) } function gn (e) { const t = e == null ? 0 : e.length; return t ? e[t - 1] : r } function hf (e, t, o) { const E = e == null ? 0 : e.length; if (!E) return -1; let k = E; return o !== r && (k = Je(o), k = k < 0 ? It(E + k, 0) : Ut(k, E - 1)), t === t ? $c(e, t, k) : _r(e, aa, k, !0) } function gf (e, t) { return e && e.length ? Fa(e, Je(t)) : r } const mf = Qe(Do); function Do (e, t) { return e && e.length && t && t.length ? Vi(e, t) : e } function vf (e, t, o) { return e && e.length && t && t.length ? Vi(e, t, He(o, 2)) : e } function yf (e, t, o) { return e && e.length && t && t.length ? Vi(e, t, r, o) : e } const bf = Bn(function (e, t) { const o = e == null ? 0 : e.length; const E = Ui(e, t); return Ha(e, Et(t, function (k) { return In(k, o) ? +k : k }).sort(Va)), E }); function xf (e, t) { const o = []; if (!(e && e.length)) return o; let E = -1; const k = []; const M = e.length; for (t = He(t, 3); ++E < M;) { const z = e[E]; t(z, E, e) && (o.push(z), k.push(E)) } return Ha(e, k), o } function ms (e) { return e == null ? e : dl.call(e) } function Ef (e, t, o) { const E = e == null ? 0 : e.length; return E ? (o && typeof o !== 'number' && Xt(e, t, o) ? (t = 0, o = E) : (t = t == null ? 0 : Je(t), o = o === r ? E : Je(o)), hn(e, t, o)) : [] } function Af (e, t) { return ri(e, t) } function Sf (e, t, o) { return Qi(e, t, He(o, 2)) } function wf (e, t) { const o = e == null ? 0 : e.length; if (o) { const E = ri(e, t); if (E < o && xn(e[E], t)) return E } return -1 } function Tf (e, t) { return ri(e, t, !0) } function Pf (e, t, o) { return Qi(e, t, He(o, 2), !0) } function Cf (e, t) { const o = e == null ? 0 : e.length; if (o) { const E = ri(e, t, !0) - 1; if (xn(e[E], t)) return E } return -1 } function Df (e) { return e && e.length ? Ua(e) : [] } function Nf (e, t) { return e && e.length ? Ua(e, He(t, 2)) : [] } function Rf (e) { const t = e == null ? 0 : e.length; return t ? hn(e, 1, t) : [] } function kf (e, t, o) { return e && e.length ? (t = o || t === r ? 1 : Je(t), hn(e, 0, t < 0 ? 0 : t)) : [] } function Lf (e, t, o) { const E = e == null ? 0 : e.length; return E ? (t = o || t === r ? 1 : Je(t), t = E - t, hn(e, t < 0 ? 0 : t, E)) : [] } function Bf (e, t) { return e && e.length ? ii(e, He(t, 3), !1, !0) : [] } function If (e, t) { return e && e.length ? ii(e, He(t, 3)) : [] } const jf = Qe(function (e) { return Wn(Ht(e, 1, Dt, !0)) }); const _f = Qe(function (e) { let t = gn(e); return Dt(t) && (t = r), Wn(Ht(e, 1, Dt, !0), He(t, 2)) }); const Ff = Qe(function (e) { let t = gn(e); return t = typeof t === 'function' ? t : r, Wn(Ht(e, 1, Dt, !0), r, t) }); function Mf (e) { return e && e.length ? Wn(e) : [] } function Of (e, t) { return e && e.length ? Wn(e, He(t, 2)) : [] } function Hf (e, t) { return t = typeof t === 'function' ? t : r, e && e.length ? Wn(e, r, t) : [] } function vs (e) { if (!(e && e.length)) return []; let t = 0; return e = On(e, function (o) { if (Dt(o)) return t = It(o.length, t), !0 }), Ii(t, function (o) { return Et(e, ki(o)) }) } function No (e, t) { if (!(e && e.length)) return []; const o = vs(e); return t == null ? o : Et(o, function (E) { return nn(t, r, E) }) } const qf = Qe(function (e, t) { return Dt(e) ? Pr(e, t) : [] }); const Uf = Qe(function (e) { return ts(On(e, Dt)) }); const zf = Qe(function (e) { let t = gn(e); return Dt(t) && (t = r), ts(On(e, Dt), He(t, 2)) }); const Wf = Qe(function (e) { let t = gn(e); return t = typeof t === 'function' ? t : r, ts(On(e, Dt), r, t) }); const Kf = Qe(vs); function $f (e, t) { return $a(e || [], t || [], Tr) } function Gf (e, t) { return $a(e || [], t || [], Nr) } const Xf = Qe(function (e) { const t = e.length; let o = t > 1 ? e[t - 1] : r; return o = typeof o === 'function' ? (e.pop(), o) : r, No(e, o) }); function Ro (e) { const t = I(e); return t.__chain__ = !0, t } function Yf (e, t) { return t(e), e } function pi (e, t) { return t(e) } const Vf = Bn(function (e) { const t = e.length; const o = t ? e[0] : 0; let E = this.__wrapped__; const k = function (M) { return Ui(M, e) }; return t > 1 || this.__actions__.length || !(E instanceof rt) || !In(o) ? this.thru(k) : (E = E.slice(o, +o + (t ? 1 : 0)), E.__actions__.push({ func: pi, args: [k], thisArg: r }), new dn(E, this.__chain__).thru(function (M) { return t && !M.length && M.push(r), M })) }); function Jf () { return Ro(this) } function Zf () { return new dn(this.value(), this.__chain__) } function Qf () { this.__values__ === r && (this.__values__ = Wo(this.value())); const e = this.__index__ >= this.__values__.length; const t = e ? r : this.__values__[this.__index__++]; return { done: e, value: t } } function ed () { return this } function td (e) { for (var t, o = this; o instanceof Zr;) { const E = So(o); E.__index__ = 0, E.__values__ = r, t ? k.__wrapped__ = E : t = E; var k = E; o = o.__wrapped__ } return k.__wrapped__ = e, t } function nd () { const e = this.__wrapped__; if (e instanceof rt) { let t = e; return this.__actions__.length && (t = new rt(this)), t = t.reverse(), t.__actions__.push({ func: pi, args: [ms], thisArg: r }), new dn(t, this.__chain__) } return this.thru(ms) } function rd () { return Ka(this.__wrapped__, this.__actions__) } const id = si(function (e, t, o) { dt.call(e, o) ? ++e[o] : kn(e, o, 1) }); function sd (e, t, o) { const E = Xe(e) ? ia : Xl; return o && Xt(e, t, o) && (t = r), E(e, He(t, 3)) } function ad (e, t) { const o = Xe(e) ? On : Da; return o(e, He(t, 3)) } const od = no(wo); const cd = no(To); function ld (e, t) { return Ht(hi(e, t), 1) } function ud (e, t) { return Ht(hi(e, t), $) } function fd (e, t, o) { return o = o === r ? 1 : Je(o), Ht(hi(e, t), o) } function ko (e, t) { const o = Xe(e) ? un : zn; return o(e, He(t, 3)) } function Lo (e, t) { const o = Xe(e) ? Nc : Ca; return o(e, He(t, 3)) } const dd = si(function (e, t, o) { dt.call(e, o) ? e[o].push(t) : kn(e, o, [t]) }); function pd (e, t, o, E) { e = Jt(e) ? e : mr(e), o = o && !E ? Je(o) : 0; const k = e.length; return o < 0 && (o = It(k + o, 0)), bi(e) ? o <= k && e.indexOf(t, o) > -1 : !!k && sr(e, t, o) > -1 } const hd = Qe(function (e, t, o) { let E = -1; const k = typeof t === 'function'; const M = Jt(e) ? ee(e.length) : []; return zn(e, function (z) { M[++E] = k ? nn(t, z, o) : Cr(z, t, o) }), M }); const gd = si(function (e, t, o) { kn(e, o, t) }); function hi (e, t) { const o = Xe(e) ? Et : Ia; return o(e, He(t, 3)) } function md (e, t, o, E) { return e == null ? [] : (Xe(t) || (t = t == null ? [] : [t]), o = E ? r : o, Xe(o) || (o = o == null ? [] : [o]), Ma(e, t, o)) } const vd = si(function (e, t, o) { e[o ? 0 : 1].push(t) }, function () { return [[], []] }); function yd (e, t, o) { const E = Xe(e) ? Ni : ca; const k = arguments.length < 3; return E(e, He(t, 4), o, k, zn) } function bd (e, t, o) { const E = Xe(e) ? Rc : ca; const k = arguments.length < 3; return E(e, He(t, 4), o, k, Ca) } function xd (e, t) { const o = Xe(e) ? On : Da; return o(e, vi(He(t, 3))) } function Ed (e) { const t = Xe(e) ? Sa : du; return t(e) } function Ad (e, t, o) { (o ? Xt(e, t, o) : t === r) ? t = 1 : t = Je(t); const E = Xe(e) ? zl : pu; return E(e, t) } function Sd (e) { const t = Xe(e) ? Wl : gu; return t(e) } function wd (e) { if (e == null) return 0; if (Jt(e)) return bi(e) ? or(e) : e.length; const t = zt(e); return t == et || t == lt ? e.size : Xi(e).length } function Td (e, t, o) { const E = Xe(e) ? Ri : mu; return o && Xt(e, t, o) && (t = r), E(e, He(t, 3)) } const Pd = Qe(function (e, t) { if (e == null) return []; const o = t.length; return o > 1 && Xt(e, t[0], t[1]) ? t = [] : o > 2 && Xt(t[0], t[1], t[2]) && (t = [t[0]]), Ma(e, Ht(t, 1), []) }); const gi = sl || function () { return Ot.Date.now() }; function Cd (e, t) { if (typeof t !== 'function') throw new fn(l); return e = Je(e), function () { if (--e < 1) return t.apply(this, arguments) } } function Bo (e, t, o) { return t = o ? r : t, t = e && t == null ? e.length : t, Ln(e, N, r, r, r, r, t) } function Io (e, t) { let o; if (typeof t !== 'function') throw new fn(l); return e = Je(e), function () { return --e > 0 && (o = t.apply(this, arguments)), e <= 1 && (t = r), o } } var ys = Qe(function (e, t, o) { let E = x; if (o.length) { var k = qn(o, hr(ys)); E |= T } return Ln(e, E, t, o, k) }); var jo = Qe(function (e, t, o) { let E = x | P; if (o.length) { var k = qn(o, hr(jo)); E |= T } return Ln(t, E, e, o, k) }); function _o (e, t, o) { t = o ? r : t; const E = Ln(e, D, r, r, r, r, r, t); return E.placeholder = _o.placeholder, E } function Fo (e, t, o) { t = o ? r : t; const E = Ln(e, A, r, r, r, r, r, t); return E.placeholder = Fo.placeholder, E } function Mo (e, t, o) { let E; let k; let M; let z; let X; let J; let le = 0; let ue = !1; let ge = !1; let Te = !0; if (typeof e !== 'function') throw new fn(l); t = mn(t) || 0, wt(o) && (ue = !!o.leading, ge = 'maxWait' in o, M = ge ? It(mn(o.maxWait) || 0, t) : M, Te = 'trailing' in o ? !!o.trailing : Te); function Re (Nt) { const En = E; const Fn = k; return E = k = r, le = Nt, z = e.apply(Fn, En), z } function qe (Nt) { return le = Nt, X = Lr(nt, t), ue ? Re(Nt) : z } function Ze (Nt) { const En = Nt - J; const Fn = Nt - le; const rc = t - En; return ge ? Ut(rc, M - Fn) : rc } function Ue (Nt) { const En = Nt - J; const Fn = Nt - le; return J === r || En >= t || En < 0 || ge && Fn >= M } function nt () { const Nt = gi(); if (Ue(Nt)) return at(Nt); X = Lr(nt, Ze(Nt)) } function at (Nt) { return X = r, Te && E ? Re(Nt) : (E = k = r, z) } function on () { X !== r && Ga(X), le = 0, E = J = k = X = r } function Yt () { return X === r ? z : at(gi()) } function cn () { const Nt = gi(); const En = Ue(Nt); if (E = arguments, k = this, J = Nt, En) { if (X === r) return qe(J); if (ge) return Ga(X), X = Lr(nt, t), Re(J) } return X === r && (X = Lr(nt, t)), z } return cn.cancel = on, cn.flush = Yt, cn } const Dd = Qe(function (e, t) { return Pa(e, 1, t) }); const Nd = Qe(function (e, t, o) { return Pa(e, mn(t) || 0, o) }); function Rd (e) { return Ln(e, R) } function mi (e, t) { if (typeof e !== 'function' || t != null && typeof t !== 'function') throw new fn(l); var o = function () { const E = arguments; const k = t ? t.apply(this, E) : E[0]; const M = o.cache; if (M.has(k)) return M.get(k); const z = e.apply(this, E); return o.cache = M.set(k, z) || M, z }; return o.cache = new (mi.Cache || Rn)(), o }mi.Cache = Rn; function vi (e) { if (typeof e !== 'function') throw new fn(l); return function () { const t = arguments; switch (t.length) { case 0:return !e.call(this); case 1:return !e.call(this, t[0]); case 2:return !e.call(this, t[0], t[1]); case 3:return !e.call(this, t[0], t[1], t[2]) } return !e.apply(this, t) } } function kd (e) { return Io(2, e) } const Ld = vu(function (e, t) { t = t.length == 1 && Xe(t[0]) ? Et(t[0], rn(He())) : Et(Ht(t, 1), rn(He())); const o = t.length; return Qe(function (E) { for (let k = -1, M = Ut(E.length, o); ++k < M;)E[k] = t[k].call(this, E[k]); return nn(e, this, E) }) }); var bs = Qe(function (e, t) { const o = qn(t, hr(bs)); return Ln(e, T, r, t, o) }); var Oo = Qe(function (e, t) { const o = qn(t, hr(Oo)); return Ln(e, C, r, t, o) }); const Bd = Bn(function (e, t) { return Ln(e, L, r, r, r, t) }); function Id (e, t) { if (typeof e !== 'function') throw new fn(l); return t = t === r ? t : Je(t), Qe(e, t) } function jd (e, t) { if (typeof e !== 'function') throw new fn(l); return t = t == null ? 0 : It(Je(t), 0), Qe(function (o) { const E = o[t]; const k = $n(o, 0, t); return E && Hn(k, E), nn(e, this, k) }) } function _d (e, t, o) { let E = !0; let k = !0; if (typeof e !== 'function') throw new fn(l); return wt(o) && (E = 'leading' in o ? !!o.leading : E, k = 'trailing' in o ? !!o.trailing : k), Mo(e, t, { leading: E, maxWait: t, trailing: k }) } function Fd (e) { return Bo(e, 1) } function Md (e, t) { return bs(rs(t), e) } function Od () { if (!arguments.length) return []; const e = arguments[0]; return Xe(e) ? e : [e] } function Hd (e) { return pn(e, p) } function qd (e, t) { return t = typeof t === 'function' ? t : r, pn(e, p, t) } function Ud (e) { return pn(e, m | p) } function zd (e, t) { return t = typeof t === 'function' ? t : r, pn(e, m | p, t) } function Wd (e, t) { return t == null || Ta(e, t, Ft(t)) } function xn (e, t) { return e === t || e !== e && t !== t } const Kd = li(Ki); const $d = li(function (e, t) { return e >= t }); var tr = ka(function () { return arguments }()) ? ka : function (e) { return Tt(e) && dt.call(e, 'callee') && !va.call(e, 'callee') }; var Xe = ee.isArray; const Gd = Zs ? rn(Zs) : eu; function Jt (e) { return e != null && yi(e.length) && !jn(e) } function Dt (e) { return Tt(e) && Jt(e) } function Xd (e) { return e === !0 || e === !1 || Tt(e) && Gt(e) == Rt } var Gn = ol || Rs; const Yd = Qs ? rn(Qs) : tu; function Vd (e) { return Tt(e) && e.nodeType === 1 && !Br(e) } function Jd (e) { if (e == null) return !0; if (Jt(e) && (Xe(e) || typeof e === 'string' || typeof e.splice === 'function' || Gn(e) || gr(e) || tr(e))) return !e.length; const t = zt(e); if (t == et || t == lt) return !e.size; if (kr(e)) return !Xi(e).length; for (const o in e) if (dt.call(e, o)) return !1; return !0 } function Zd (e, t) { return Dr(e, t) } function Qd (e, t, o) { o = typeof o === 'function' ? o : r; const E = o ? o(e, t) : r; return E === r ? Dr(e, t, r, o) : !!E } function xs (e) { if (!Tt(e)) return !1; const t = Gt(e); return t == ze || t == Wt || typeof e.message === 'string' && typeof e.name === 'string' && !Br(e) } function ep (e) { return typeof e === 'number' && ba(e) } function jn (e) { if (!wt(e)) return !1; const t = Gt(e); return t == Mt || t == Ve || t == kt || t == vn } function Ho (e) { return typeof e === 'number' && e == Je(e) } function yi (e) { return typeof e === 'number' && e > -1 && e % 1 == 0 && e <= K } function wt (e) { const t = typeof e; return e != null && (t == 'object' || t == 'function') } function Tt (e) { return e != null && typeof e === 'object' } var qo = ea ? rn(ea) : ru; function tp (e, t) { return e === t || Gi(e, t, us(t)) } function np (e, t, o) { return o = typeof o === 'function' ? o : r, Gi(e, t, us(t), o) } function rp (e) { return Uo(e) && e != +e } function ip (e) { if (Hu(e)) throw new $e(f); return La(e) } function sp (e) { return e === null } function ap (e) { return e == null } function Uo (e) { return typeof e === 'number' || Tt(e) && Gt(e) == Kt } function Br (e) { if (!Tt(e) || Gt(e) != At) return !1; const t = Kr(e); if (t === null) return !0; const o = dt.call(t, 'constructor') && t.constructor; return typeof o === 'function' && o instanceof o && qr.call(o) == tl } const Es = ta ? rn(ta) : iu; function op (e) { return Ho(e) && e >= -K && e <= K } var zo = na ? rn(na) : su; function bi (e) { return typeof e === 'string' || !Xe(e) && Tt(e) && Gt(e) == pt } function an (e) { return typeof e === 'symbol' || Tt(e) && Gt(e) == Cn } var gr = ra ? rn(ra) : au; function cp (e) { return e === r } function lp (e) { return Tt(e) && zt(e) == en } function up (e) { return Tt(e) && Gt(e) == vr } const fp = li(Yi); const dp = li(function (e, t) { return e <= t }); function Wo (e) { if (!e) return []; if (Jt(e)) return bi(e) ? yn(e) : Vt(e); if (xr && e[xr]) return zc(e[xr]()); const t = zt(e); const o = t == et ? _i : t == lt ? Fr : mr; return o(e) } function _n (e) { if (!e) return e === 0 ? e : 0; if (e = mn(e), e === $ || e === -$) { const t = e < 0 ? -1 : 1; return t * te } return e === e ? e : 0 } function Je (e) { const t = _n(e); const o = t % 1; return t === t ? o ? t - o : t : 0 } function Ko (e) { return e ? Jn(Je(e), 0, he) : 0 } function mn (e) { if (typeof e === 'number') return e; if (an(e)) return oe; if (wt(e)) { const t = typeof e.valueOf === 'function' ? e.valueOf() : e; e = wt(t) ? t + '' : t } if (typeof e !== 'string') return e === 0 ? e : +e; e = la(e); const o = Ct.test(e); return o || ce.test(e) ? Pc(e.slice(2), o ? 2 : 8) : St.test(e) ? oe : +e } function $o (e) { return Tn(e, Zt(e)) } function pp (e) { return e ? Jn(Je(e), -K, K) : e === 0 ? e : 0 } function ut (e) { return e == null ? '' : sn(e) } const hp = dr(function (e, t) { if (kr(t) || Jt(t)) { Tn(t, Ft(t), e); return } for (const o in t)dt.call(t, o) && Tr(e, o, t[o]) }); const Go = dr(function (e, t) { Tn(t, Zt(t), e) }); const xi = dr(function (e, t, o, E) { Tn(t, Zt(t), e, E) }); const gp = dr(function (e, t, o, E) { Tn(t, Ft(t), e, E) }); const mp = Bn(Ui); function vp (e, t) { const o = fr(e); return t == null ? o : wa(o, t) } const yp = Qe(function (e, t) { e = vt(e); let o = -1; let E = t.length; const k = E > 2 ? t[2] : r; for (k && Xt(t[0], t[1], k) && (E = 1); ++o < E;) for (let M = t[o], z = Zt(M), X = -1, J = z.length; ++X < J;) { const le = z[X]; const ue = e[le]; (ue === r || xn(ue, cr[le]) && !dt.call(e, le)) && (e[le] = M[le]) } return e }); const bp = Qe(function (e) { return e.push(r, lo), nn(Xo, r, e) }); function xp (e, t) { return sa(e, He(t, 3), wn) } function Ep (e, t) { return sa(e, He(t, 3), Wi) } function Ap (e, t) { return e == null ? e : zi(e, He(t, 3), Zt) } function Sp (e, t) { return e == null ? e : Na(e, He(t, 3), Zt) } function wp (e, t) { return e && wn(e, He(t, 3)) } function Tp (e, t) { return e && Wi(e, He(t, 3)) } function Pp (e) { return e == null ? [] : ti(e, Ft(e)) } function Cp (e) { return e == null ? [] : ti(e, Zt(e)) } function As (e, t, o) { const E = e == null ? r : Zn(e, t); return E === r ? o : E } function Dp (e, t) { return e != null && po(e, t, Vl) } function Ss (e, t) { return e != null && po(e, t, Jl) } const Np = io(function (e, t, o) { t != null && typeof t.toString !== 'function' && (t = Ur.call(t)), e[t] = o }, Ts(Qt)); const Rp = io(function (e, t, o) { t != null && typeof t.toString !== 'function' && (t = Ur.call(t)), dt.call(e, t) ? e[t].push(o) : e[t] = [o] }, He); const kp = Qe(Cr); function Ft (e) { return Jt(e) ? Aa(e) : Xi(e) } function Zt (e) { return Jt(e) ? Aa(e, !0) : ou(e) } function Lp (e, t) { const o = {}; return t = He(t, 3), wn(e, function (E, k, M) { kn(o, t(E, k, M), E) }), o } function Bp (e, t) { const o = {}; return t = He(t, 3), wn(e, function (E, k, M) { kn(o, k, t(E, k, M)) }), o } const Ip = dr(function (e, t, o) { ni(e, t, o) }); var Xo = dr(function (e, t, o, E) { ni(e, t, o, E) }); const jp = Bn(function (e, t) { let o = {}; if (e == null) return o; let E = !1; t = Et(t, function (M) { return M = Kn(M, e), E || (E = M.length > 1), M }), Tn(e, cs(e), o), E && (o = pn(o, m | d | p, Du)); for (let k = t.length; k--;)es(o, t[k]); return o }); function _p (e, t) { return Yo(e, vi(He(t))) } const Fp = Bn(function (e, t) { return e == null ? {} : lu(e, t) }); function Yo (e, t) { if (e == null) return {}; const o = Et(cs(e), function (E) { return [E] }); return t = He(t), Oa(e, o, function (E, k) { return t(E, k[0]) }) } function Mp (e, t, o) { t = Kn(t, e); let E = -1; let k = t.length; for (k || (k = 1, e = r); ++E < k;) { let M = e == null ? r : e[Pn(t[E])]; M === r && (E = k, M = o), e = jn(M) ? M.call(e) : M } return e } function Op (e, t, o) { return e == null ? e : Nr(e, t, o) } function Hp (e, t, o, E) { return E = typeof E === 'function' ? E : r, e == null ? e : Nr(e, t, o, E) } const Vo = oo(Ft); const Jo = oo(Zt); function qp (e, t, o) { const E = Xe(e); const k = E || Gn(e) || gr(e); if (t = He(t, 4), o == null) { const M = e && e.constructor; k ? o = E ? new M() : [] : wt(e) ? o = jn(M) ? fr(Kr(e)) : {} : o = {} } return (k ? un : wn)(e, function (z, X, J) { return t(o, z, X, J) }), o } function Up (e, t) { return e == null ? !0 : es(e, t) } function zp (e, t, o) { return e == null ? e : Wa(e, t, rs(o)) } function Wp (e, t, o, E) { return E = typeof E === 'function' ? E : r, e == null ? e : Wa(e, t, rs(o), E) } function mr (e) { return e == null ? [] : ji(e, Ft(e)) } function Kp (e) { return e == null ? [] : ji(e, Zt(e)) } function $p (e, t, o) { return o === r && (o = t, t = r), o !== r && (o = mn(o), o = o === o ? o : 0), t !== r && (t = mn(t), t = t === t ? t : 0), Jn(mn(e), t, o) } function Gp (e, t, o) { return t = _n(t), o === r ? (o = t, t = 0) : o = _n(o), e = mn(e), Zl(e, t, o) } function Xp (e, t, o) { if (o && typeof o !== 'boolean' && Xt(e, t, o) && (t = o = r), o === r && (typeof t === 'boolean' ? (o = t, t = r) : typeof e === 'boolean' && (o = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = _n(e), t === r ? (t = e, e = 0) : t = _n(t)), e > t) { const E = e; e = t, t = E } if (o || e % 1 || t % 1) { const k = xa(); return Ut(e + k * (t - e + Tc('1e-' + ((k + '').length - 1))), t) } return Ji(e, t) } const Yp = pr(function (e, t, o) { return t = t.toLowerCase(), e + (o ? Zo(t) : t) }); function Zo (e) { return ws(ut(e).toLowerCase()) } function Qo (e) { return e = ut(e), e && e.replace(we, Mc).replace(gc, '') } function Vp (e, t, o) { e = ut(e), t = sn(t); const E = e.length; o = o === r ? E : Jn(Je(o), 0, E); const k = o; return o -= t.length, o >= 0 && e.slice(o, k) == t } function Jp (e) { return e = ut(e), e && it.test(e) ? e.replace(Me, Oc) : e } function Zp (e) { return e = ut(e), e && Y.test(e) ? e.replace(re, '\\$&') : e } const Qp = pr(function (e, t, o) { return e + (o ? '-' : '') + t.toLowerCase() }); const eh = pr(function (e, t, o) { return e + (o ? ' ' : '') + t.toLowerCase() }); const th = to('toLowerCase'); function nh (e, t, o) { e = ut(e), t = Je(t); const E = t ? or(e) : 0; if (!t || E >= t) return e; const k = (t - E) / 2; return ci(Yr(k), o) + e + ci(Xr(k), o) } function rh (e, t, o) { e = ut(e), t = Je(t); const E = t ? or(e) : 0; return t && E < t ? e + ci(t - E, o) : e } function ih (e, t, o) { e = ut(e), t = Je(t); const E = t ? or(e) : 0; return t && E < t ? ci(t - E, o) + e : e } function sh (e, t, o) { return o || t == null ? t = 0 : t && (t = +t), fl(ut(e).replace(ie, ''), t || 0) } function ah (e, t, o) { return (o ? Xt(e, t, o) : t === r) ? t = 1 : t = Je(t), Zi(ut(e), t) } function oh () { const e = arguments; const t = ut(e[0]); return e.length < 3 ? t : t.replace(e[1], e[2]) } const ch = pr(function (e, t, o) { return e + (o ? '_' : '') + t.toLowerCase() }); function lh (e, t, o) { return o && typeof o !== 'number' && Xt(e, t, o) && (t = o = r), o = o === r ? he : o >>> 0, o ? (e = ut(e), e && (typeof t === 'string' || t != null && !Es(t)) && (t = sn(t), !t && ar(e)) ? $n(yn(e), 0, o) : e.split(t, o)) : [] } const uh = pr(function (e, t, o) { return e + (o ? ' ' : '') + ws(t) }); function fh (e, t, o) { return e = ut(e), o = o == null ? 0 : Jn(Je(o), 0, e.length), t = sn(t), e.slice(o, o + t.length) == t } function dh (e, t, o) {
            const E = I.templateSettings; o && Xt(e, t, o) && (t = r), e = ut(e), t = xi({}, t, E, co); const k = xi({}, t.imports, E.imports, co); const M = Ft(k); const z = ji(k, M); let X; let J; let le = 0; const ue = t.interpolate || ke; let ge = "__p += '"; const Te = Fi((t.escape || ke).source + '|' + ue.source + '|' + (ue === yt ? ot : ke).source + '|' + (t.evaluate || ke).source + '|$', 'g'); const Re = '//# sourceURL=' + (dt.call(t, 'sourceURL') ? (t.sourceURL + '').replace(/\s/g, ' ') : 'lodash.templateSources[' + ++xc + ']') + `
`;e.replace(Te, function (Ue, nt, at, on, Yt, cn) {
              return at || (at = on), ge += e.slice(le, cn).replace(st, Hc), nt && (X = !0, ge += `' +
__e(` + nt + `) +
'`), Yt && (J = !0, ge += `';
` + Yt + `;
__p += '`), at && (ge += `' +
((__t = (` + at + `)) == null ? '' : __t) +
'`), le = cn + Ue.length, Ue
            }), ge += `';
`;const qe = dt.call(t, 'variable') && t.variable; if (!qe) {
              ge = `with (obj) {
` + ge + `
}
`
            } else if (_e.test(qe)) throw new $e(s); ge = (J ? ge.replace(Le, '') : ge).replace(Fe, '$1').replace(Ne, '$1;'), ge = 'function(' + (qe || 'obj') + `) {
` + (qe
              ? ''
              : `obj || (obj = {});
`) + "var __t, __p = ''" + (X ? ', __e = _.escape' : '') + (J
              ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
              : `;
`) + ge + `return __p
}`;const Ze = tc(function () { return ct(M, Re + 'return ' + ge).apply(r, z) }); if (Ze.source = ge, xs(Ze)) throw Ze; return Ze
          } function ph (e) { return ut(e).toLowerCase() } function hh (e) { return ut(e).toUpperCase() } function gh (e, t, o) { if (e = ut(e), e && (o || t === r)) return la(e); if (!e || !(t = sn(t))) return e; const E = yn(e); const k = yn(t); const M = ua(E, k); const z = fa(E, k) + 1; return $n(E, M, z).join('') } function mh (e, t, o) { if (e = ut(e), e && (o || t === r)) return e.slice(0, pa(e) + 1); if (!e || !(t = sn(t))) return e; const E = yn(e); const k = fa(E, yn(t)) + 1; return $n(E, 0, k).join('') } function vh (e, t, o) { if (e = ut(e), e && (o || t === r)) return e.replace(ie, ''); if (!e || !(t = sn(t))) return e; const E = yn(e); const k = ua(E, yn(t)); return $n(E, k).join('') } function yh (e, t) { let o = B; let E = O; if (wt(t)) { var k = 'separator' in t ? t.separator : k; o = 'length' in t ? Je(t.length) : o, E = 'omission' in t ? sn(t.omission) : E }e = ut(e); let M = e.length; if (ar(e)) { var z = yn(e); M = z.length } if (o >= M) return e; let X = o - or(E); if (X < 1) return E; let J = z ? $n(z, 0, X).join('') : e.slice(0, X); if (k === r) return J + E; if (z && (X += J.length - X), Es(k)) { if (e.slice(X).search(k)) { let le; const ue = J; for (k.global || (k = Fi(k.source, ut(je.exec(k)) + 'g')), k.lastIndex = 0; le = k.exec(ue);) var ge = le.index; J = J.slice(0, ge === r ? X : ge) } } else if (e.indexOf(sn(k), X) != X) { const Te = J.lastIndexOf(k); Te > -1 && (J = J.slice(0, Te)) } return J + E } function bh (e) { return e = ut(e), e && We.test(e) ? e.replace(De, Gc) : e } const xh = pr(function (e, t, o) { return e + (o ? ' ' : '') + t.toUpperCase() }); var ws = to('toUpperCase'); function ec (e, t, o) { return e = ut(e), t = o ? r : t, t === r ? Uc(e) ? Vc(e) : Bc(e) : e.match(t) || [] } var tc = Qe(function (e, t) { try { return nn(e, r, t) } catch (o) { return xs(o) ? o : new $e(o) } }); const Eh = Bn(function (e, t) { return un(t, function (o) { o = Pn(o), kn(e, o, ys(e[o], e)) }), e }); function Ah (e) { const t = e == null ? 0 : e.length; const o = He(); return e = t ? Et(e, function (E) { if (typeof E[1] !== 'function') throw new fn(l); return [o(E[0]), E[1]] }) : [], Qe(function (E) { for (let k = -1; ++k < t;) { const M = e[k]; if (nn(M[0], this, E)) return nn(M[1], this, E) } }) } function Sh (e) { return Gl(pn(e, m)) } function Ts (e) { return function () { return e } } function wh (e, t) { return e == null || e !== e ? t : e } const Th = ro(); const Ph = ro(!0); function Qt (e) { return e } function Ps (e) { return Ba(typeof e === 'function' ? e : pn(e, m)) } function Ch (e) { return ja(pn(e, m)) } function Dh (e, t) { return _a(e, pn(t, m)) } const Nh = Qe(function (e, t) { return function (o) { return Cr(o, e, t) } }); const Rh = Qe(function (e, t) { return function (o) { return Cr(e, o, t) } }); function Cs (e, t, o) { const E = Ft(t); let k = ti(t, E); o == null && !(wt(t) && (k.length || !E.length)) && (o = t, t = e, e = this, k = ti(t, Ft(t))); const M = !(wt(o) && 'chain' in o) || !!o.chain; const z = jn(e); return un(k, function (X) { const J = t[X]; e[X] = J, z && (e.prototype[X] = function () { const le = this.__chain__; if (M || le) { const ue = e(this.__wrapped__); const ge = ue.__actions__ = Vt(this.__actions__); return ge.push({ func: J, args: arguments, thisArg: e }), ue.__chain__ = le, ue } return J.apply(e, Hn([this.value()], arguments)) }) }), e } function kh () { return Ot._ === this && (Ot._ = nl), this } function Ds () {} function Lh (e) { return e = Je(e), Qe(function (t) { return Fa(t, e) }) } const Bh = ss(Et); const Ih = ss(ia); const jh = ss(Ri); function nc (e) { return ds(e) ? ki(Pn(e)) : uu(e) } function _h (e) { return function (t) { return e == null ? r : Zn(e, t) } } const Fh = so(); const Mh = so(!0); function Ns () { return [] } function Rs () { return !1 } function Oh () { return {} } function Hh () { return '' } function qh () { return !0 } function Uh (e, t) { if (e = Je(e), e < 1 || e > K) return []; let o = he; const E = Ut(e, he); t = He(t), e -= he; for (var k = Ii(E, t); ++o < e;)t(o); return k } function zh (e) { return Xe(e) ? Et(e, Pn) : an(e) ? [e] : Vt(Ao(ut(e))) } function Wh (e) { const t = ++el; return ut(e) + t } const Kh = oi(function (e, t) { return e + t }, 0); const $h = as('ceil'); const Gh = oi(function (e, t) { return e / t }, 1); const Xh = as('floor'); function Yh (e) { return e && e.length ? ei(e, Qt, Ki) : r } function Vh (e, t) { return e && e.length ? ei(e, He(t, 2), Ki) : r } function Jh (e) { return oa(e, Qt) } function Zh (e, t) { return oa(e, He(t, 2)) } function Qh (e) { return e && e.length ? ei(e, Qt, Yi) : r } function e0 (e, t) { return e && e.length ? ei(e, He(t, 2), Yi) : r } const t0 = oi(function (e, t) { return e * t }, 1); const n0 = as('round'); const r0 = oi(function (e, t) { return e - t }, 0); function i0 (e) { return e && e.length ? Bi(e, Qt) : 0 } function s0 (e, t) { return e && e.length ? Bi(e, He(t, 2)) : 0 } return I.after = Cd, I.ary = Bo, I.assign = hp, I.assignIn = Go, I.assignInWith = xi, I.assignWith = gp, I.at = mp, I.before = Io, I.bind = ys, I.bindAll = Eh, I.bindKey = jo, I.castArray = Od, I.chain = Ro, I.chunk = Gu, I.compact = Xu, I.concat = Yu, I.cond = Ah, I.conforms = Sh, I.constant = Ts, I.countBy = id, I.create = vp, I.curry = _o, I.curryRight = Fo, I.debounce = Mo, I.defaults = yp, I.defaultsDeep = bp, I.defer = Dd, I.delay = Nd, I.difference = Vu, I.differenceBy = Ju, I.differenceWith = Zu, I.drop = Qu, I.dropRight = ef, I.dropRightWhile = tf, I.dropWhile = nf, I.fill = rf, I.filter = ad, I.flatMap = ld, I.flatMapDeep = ud, I.flatMapDepth = fd, I.flatten = Po, I.flattenDeep = sf, I.flattenDepth = af, I.flip = Rd, I.flow = Th, I.flowRight = Ph, I.fromPairs = of, I.functions = Pp, I.functionsIn = Cp, I.groupBy = dd, I.initial = lf, I.intersection = uf, I.intersectionBy = ff, I.intersectionWith = df, I.invert = Np, I.invertBy = Rp, I.invokeMap = hd, I.iteratee = Ps, I.keyBy = gd, I.keys = Ft, I.keysIn = Zt, I.map = hi, I.mapKeys = Lp, I.mapValues = Bp, I.matches = Ch, I.matchesProperty = Dh, I.memoize = mi, I.merge = Ip, I.mergeWith = Xo, I.method = Nh, I.methodOf = Rh, I.mixin = Cs, I.negate = vi, I.nthArg = Lh, I.omit = jp, I.omitBy = _p, I.once = kd, I.orderBy = md, I.over = Bh, I.overArgs = Ld, I.overEvery = Ih, I.overSome = jh, I.partial = bs, I.partialRight = Oo, I.partition = vd, I.pick = Fp, I.pickBy = Yo, I.property = nc, I.propertyOf = _h, I.pull = mf, I.pullAll = Do, I.pullAllBy = vf, I.pullAllWith = yf, I.pullAt = bf, I.range = Fh, I.rangeRight = Mh, I.rearg = Bd, I.reject = xd, I.remove = xf, I.rest = Id, I.reverse = ms, I.sampleSize = Ad, I.set = Op, I.setWith = Hp, I.shuffle = Sd, I.slice = Ef, I.sortBy = Pd, I.sortedUniq = Df, I.sortedUniqBy = Nf, I.split = lh, I.spread = jd, I.tail = Rf, I.take = kf, I.takeRight = Lf, I.takeRightWhile = Bf, I.takeWhile = If, I.tap = Yf, I.throttle = _d, I.thru = pi, I.toArray = Wo, I.toPairs = Vo, I.toPairsIn = Jo, I.toPath = zh, I.toPlainObject = $o, I.transform = qp, I.unary = Fd, I.union = jf, I.unionBy = _f, I.unionWith = Ff, I.uniq = Mf, I.uniqBy = Of, I.uniqWith = Hf, I.unset = Up, I.unzip = vs, I.unzipWith = No, I.update = zp, I.updateWith = Wp, I.values = mr, I.valuesIn = Kp, I.without = qf, I.words = ec, I.wrap = Md, I.xor = Uf, I.xorBy = zf, I.xorWith = Wf, I.zip = Kf, I.zipObject = $f, I.zipObjectDeep = Gf, I.zipWith = Xf, I.entries = Vo, I.entriesIn = Jo, I.extend = Go, I.extendWith = xi, Cs(I, I), I.add = Kh, I.attempt = tc, I.camelCase = Yp, I.capitalize = Zo, I.ceil = $h, I.clamp = $p, I.clone = Hd, I.cloneDeep = Ud, I.cloneDeepWith = zd, I.cloneWith = qd, I.conformsTo = Wd, I.deburr = Qo, I.defaultTo = wh, I.divide = Gh, I.endsWith = Vp, I.eq = xn, I.escape = Jp, I.escapeRegExp = Zp, I.every = sd, I.find = od, I.findIndex = wo, I.findKey = xp, I.findLast = cd, I.findLastIndex = To, I.findLastKey = Ep, I.floor = Xh, I.forEach = ko, I.forEachRight = Lo, I.forIn = Ap, I.forInRight = Sp, I.forOwn = wp, I.forOwnRight = Tp, I.get = As, I.gt = Kd, I.gte = $d, I.has = Dp, I.hasIn = Ss, I.head = Co, I.identity = Qt, I.includes = pd, I.indexOf = cf, I.inRange = Gp, I.invoke = kp, I.isArguments = tr, I.isArray = Xe, I.isArrayBuffer = Gd, I.isArrayLike = Jt, I.isArrayLikeObject = Dt, I.isBoolean = Xd, I.isBuffer = Gn, I.isDate = Yd, I.isElement = Vd, I.isEmpty = Jd, I.isEqual = Zd, I.isEqualWith = Qd, I.isError = xs, I.isFinite = ep, I.isFunction = jn, I.isInteger = Ho, I.isLength = yi, I.isMap = qo, I.isMatch = tp, I.isMatchWith = np, I.isNaN = rp, I.isNative = ip, I.isNil = ap, I.isNull = sp, I.isNumber = Uo, I.isObject = wt, I.isObjectLike = Tt, I.isPlainObject = Br, I.isRegExp = Es, I.isSafeInteger = op, I.isSet = zo, I.isString = bi, I.isSymbol = an, I.isTypedArray = gr, I.isUndefined = cp, I.isWeakMap = lp, I.isWeakSet = up, I.join = pf, I.kebabCase = Qp, I.last = gn, I.lastIndexOf = hf, I.lowerCase = eh, I.lowerFirst = th, I.lt = fp, I.lte = dp, I.max = Yh, I.maxBy = Vh, I.mean = Jh, I.meanBy = Zh, I.min = Qh, I.minBy = e0, I.stubArray = Ns, I.stubFalse = Rs, I.stubObject = Oh, I.stubString = Hh, I.stubTrue = qh, I.multiply = t0, I.nth = gf, I.noConflict = kh, I.noop = Ds, I.now = gi, I.pad = nh, I.padEnd = rh, I.padStart = ih, I.parseInt = sh, I.random = Xp, I.reduce = yd, I.reduceRight = bd, I.repeat = ah, I.replace = oh, I.result = Mp, I.round = n0, I.runInContext = V, I.sample = Ed, I.size = wd, I.snakeCase = ch, I.some = Td, I.sortedIndex = Af, I.sortedIndexBy = Sf, I.sortedIndexOf = wf, I.sortedLastIndex = Tf, I.sortedLastIndexBy = Pf, I.sortedLastIndexOf = Cf, I.startCase = uh, I.startsWith = fh, I.subtract = r0, I.sum = i0, I.sumBy = s0, I.template = dh, I.times = Uh, I.toFinite = _n, I.toInteger = Je, I.toLength = Ko, I.toLower = ph, I.toNumber = mn, I.toSafeInteger = pp, I.toString = ut, I.toUpper = hh, I.trim = gh, I.trimEnd = mh, I.trimStart = vh, I.truncate = yh, I.unescape = bh, I.uniqueId = Wh, I.upperCase = xh, I.upperFirst = ws, I.each = ko, I.eachRight = Lo, I.first = Co, Cs(I, (function () { const e = {}; return wn(I, function (t, o) { dt.call(I.prototype, o) || (e[o] = t) }), e }()), { chain: !1 }), I.VERSION = n, un(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (e) { I[e].placeholder = I }), un(['drop', 'take'], function (e, t) { rt.prototype[e] = function (o) { o = o === r ? 1 : It(Je(o), 0); const E = this.__filtered__ && !t ? new rt(this) : this.clone(); return E.__filtered__ ? E.__takeCount__ = Ut(o, E.__takeCount__) : E.__views__.push({ size: Ut(o, he), type: e + (E.__dir__ < 0 ? 'Right' : '') }), E }, rt.prototype[e + 'Right'] = function (o) { return this.reverse()[e](o).reverse() } }), un(['filter', 'map', 'takeWhile'], function (e, t) { const o = t + 1; const E = o == _ || o == H; rt.prototype[e] = function (k) { const M = this.clone(); return M.__iteratees__.push({ iteratee: He(k, 3), type: o }), M.__filtered__ = M.__filtered__ || E, M } }), un(['head', 'last'], function (e, t) { const o = 'take' + (t ? 'Right' : ''); rt.prototype[e] = function () { return this[o](1).value()[0] } }), un(['initial', 'tail'], function (e, t) { const o = 'drop' + (t ? '' : 'Right'); rt.prototype[e] = function () { return this.__filtered__ ? new rt(this) : this[o](1) } }), rt.prototype.compact = function () { return this.filter(Qt) }, rt.prototype.find = function (e) { return this.filter(e).head() }, rt.prototype.findLast = function (e) { return this.reverse().find(e) }, rt.prototype.invokeMap = Qe(function (e, t) { return typeof e === 'function' ? new rt(this) : this.map(function (o) { return Cr(o, e, t) }) }), rt.prototype.reject = function (e) { return this.filter(vi(He(e))) }, rt.prototype.slice = function (e, t) { e = Je(e); let o = this; return o.__filtered__ && (e > 0 || t < 0) ? new rt(o) : (e < 0 ? o = o.takeRight(-e) : e && (o = o.drop(e)), t !== r && (t = Je(t), o = t < 0 ? o.dropRight(-t) : o.take(t - e)), o) }, rt.prototype.takeRightWhile = function (e) { return this.reverse().takeWhile(e).reverse() }, rt.prototype.toArray = function () { return this.take(he) }, wn(rt.prototype, function (e, t) { const o = /^(?:filter|find|map|reject)|While$/.test(t); const E = /^(?:head|last)$/.test(t); const k = I[E ? 'take' + (t == 'last' ? 'Right' : '') : t]; const M = E || /^find/.test(t); !k || (I.prototype[t] = function () { let z = this.__wrapped__; const X = E ? [1] : arguments; let J = z instanceof rt; const le = X[0]; let ue = J || Xe(z); const ge = function (nt) { const at = k.apply(I, Hn([nt], X)); return E && Te ? at[0] : at }; ue && o && typeof le === 'function' && le.length != 1 && (J = ue = !1); var Te = this.__chain__; const Re = !!this.__actions__.length; const qe = M && !Te; const Ze = J && !Re; if (!M && ue) { z = Ze ? z : new rt(this); var Ue = e.apply(z, X); return Ue.__actions__.push({ func: pi, args: [ge], thisArg: r }), new dn(Ue, Te) } return qe && Ze ? e.apply(this, X) : (Ue = this.thru(ge), qe ? E ? Ue.value()[0] : Ue.value() : Ue) }) }), un(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (e) { const t = Or[e]; const o = /^(?:push|sort|unshift)$/.test(e) ? 'tap' : 'thru'; const E = /^(?:pop|shift)$/.test(e); I.prototype[e] = function () { const k = arguments; if (E && !this.__chain__) { const M = this.value(); return t.apply(Xe(M) ? M : [], k) } return this[o](function (z) { return t.apply(Xe(z) ? z : [], k) }) } }), wn(rt.prototype, function (e, t) { const o = I[t]; if (o) { const E = o.name + ''; dt.call(ur, E) || (ur[E] = []), ur[E].push({ name: t, func: o }) } }), ur[ai(r, P).name] = [{ name: 'wrapper', func: r }], rt.prototype.clone = yl, rt.prototype.reverse = bl, rt.prototype.value = xl, I.prototype.at = Vf, I.prototype.chain = Jf, I.prototype.commit = Zf, I.prototype.next = Qf, I.prototype.plant = td, I.prototype.reverse = nd, I.prototype.toJSON = I.prototype.valueOf = I.prototype.value = rd, I.prototype.first = I.prototype.head, xr && (I.prototype[xr] = ed), I
        }; var Mr = Jc(); Ot._ = Mr, h = (function () { return Mr }.call(y, a, y, w)), h !== r && (w.exports = h)
      }).call(this)
    },
    9593: (w, y, a) => { 'use strict'; const h = a(4411); const r = Symbol('max'); const n = Symbol('length'); const c = Symbol('lengthCalculator'); const f = Symbol('allowStale'); const l = Symbol('maxAge'); const s = Symbol('dispose'); const u = Symbol('noDisposeOnSet'); const g = Symbol('lruList'); const i = Symbol('cache'); const m = Symbol('updateAgeOnGet'); const d = () => 1; class p {constructor (T) { if (typeof T === 'number' && (T = { max: T }), T || (T = {}), T.max && (typeof T.max !== 'number' || T.max < 0)) throw new TypeError('max must be a non-negative number'); const C = this[r] = T.max || 1 / 0; const N = T.length || d; if (this[c] = typeof N !== 'function' ? d : N, this[f] = T.stale || !1, T.maxAge && typeof T.maxAge !== 'number') throw new TypeError('maxAge must be a number'); this[l] = T.maxAge || 0, this[s] = T.dispose, this[u] = T.noDisposeOnSet || !1, this[m] = T.updateAgeOnGet || !1, this.reset() } set max (T) { if (typeof T !== 'number' || T < 0) throw new TypeError('max must be a non-negative number'); this[r] = T || 1 / 0, x(this) } get max () { return this[r] } set allowStale (T) { this[f] = !!T } get allowStale () { return this[f] } set maxAge (T) { if (typeof T !== 'number') throw new TypeError('maxAge must be a non-negative number'); this[l] = T, x(this) } get maxAge () { return this[l] } set lengthCalculator (T) { typeof T !== 'function' && (T = d), T !== this[c] && (this[c] = T, this[n] = 0, this[g].forEach(C => { C.length = this[c](C.value, C.key), this[n] += C.length })), x(this) } get lengthCalculator () { return this[c] } get length () { return this[n] } get itemCount () { return this[g].length }rforEach (T, C) { C = C || this; for (let N = this[g].tail; N !== null;) { const L = N.prev; D(this, T, N, C), N = L } }forEach (T, C) { C = C || this; for (let N = this[g].head; N !== null;) { const L = N.next; D(this, T, N, C), N = L } }keys () { return this[g].toArray().map(T => T.key) }values () { return this[g].toArray().map(T => T.value) }reset () { this[s] && this[g] && this[g].length && this[g].forEach(T => this[s](T.key, T.value)), this[i] = new Map(), this[g] = new h(), this[n] = 0 }dump () { return this[g].map(T => v(this, T) ? !1 : { k: T.key, v: T.value, e: T.now + (T.maxAge || 0) }).toArray().filter(T => T) }dumpLru () { return this[g] }set (T, C, N) { if (N = N || this[l], N && typeof N !== 'number') throw new TypeError('maxAge must be a number'); const L = N ? Date.now() : 0; const R = this[c](C, T); if (this[i].has(T)) { if (R > this[r]) return P(this, this[i].get(T)), !1; const F = this[i].get(T).value; return this[s] && (this[u] || this[s](T, F.value)), F.now = L, F.maxAge = N, F.value = C, this[n] += R - F.length, F.length = R, this.get(T), x(this), !0 } const B = new S(T, C, R, L, N); return B.length > this[r] ? (this[s] && this[s](T, C), !1) : (this[n] += B.length, this[g].unshift(B), this[i].set(T, this[g].head), x(this), !0) }has (T) { if (!this[i].has(T)) return !1; const C = this[i].get(T).value; return !v(this, C) }get (T) { return b(this, T, !0) }peek (T) { return b(this, T, !1) }pop () { const T = this[g].tail; return T ? (P(this, T), T.value) : null }del (T) { P(this, this[i].get(T)) }load (T) { this.reset(); const C = Date.now(); for (let N = T.length - 1; N >= 0; N--) { const L = T[N]; const R = L.e || 0; if (R === 0) this.set(L.k, L.v); else { const B = R - C; B > 0 && this.set(L.k, L.v, B) } } }prune () { this[i].forEach((T, C) => b(this, C, !1)) }} const b = (A, T, C) => { const N = A[i].get(T); if (N) { const L = N.value; if (v(A, L)) { if (P(A, N), !A[f]) return } else C && (A[m] && (N.value.now = Date.now()), A[g].unshiftNode(N)); return L.value } }; const v = (A, T) => { if (!T || !T.maxAge && !A[l]) return !1; const C = Date.now() - T.now; return T.maxAge ? C > T.maxAge : A[l] && C > A[l] }; const x = A => { if (A[n] > A[r]) for (let T = A[g].tail; A[n] > A[r] && T !== null;) { const C = T.prev; P(A, T), T = C } }; const P = (A, T) => { if (T) { const C = T.value; A[s] && A[s](C.key, C.value), A[n] -= C.length, A[i].delete(C.key), A[g].removeNode(T) } }; class S {constructor (T, C, N, L, R) { this.key = T, this.value = C, this.length = N, this.now = L, this.maxAge = R || 0 }} const D = (A, T, C, N) => { let L = C.value; v(A, L) && (P(A, C), A[f] || (L = void 0)), L && T.call(N, L.value, L.key, A) }; w.exports = p },
    7874: () => { (function (w) { const y = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'; const a = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: !0, alias: 'punctuation', inside: null }; const h = { bash: a, environment: { pattern: RegExp('\\$' + y), alias: 'constant' }, variable: [{ pattern: /\$?\(\([\s\S]+?\)\)/, greedy: !0, inside: { variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/], number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/, operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/, punctuation: /\(\(?|\)\)?|,|;/ } }, { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } }, { pattern: /\$\{[^}]+\}/, greedy: !0, inside: { operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/, punctuation: /[\[\]]/, environment: { pattern: RegExp('(\\{)' + y), lookbehind: !0, alias: 'constant' } } }, /\$(?:\w+|[#?*!@$])/], entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/ }; w.languages.bash = { shebang: { pattern: /^#!\s*\/.*/, alias: 'important' }, comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 }, 'function-name': [{ pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: 'function' }, { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' }], 'for-or-select': { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: 'variable', lookbehind: !0 }, 'assign-left': { pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/, inside: { environment: { pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + y), lookbehind: !0, alias: 'constant' } }, alias: 'variable', lookbehind: !0 }, string: [{ pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: !0, greedy: !0, inside: h }, { pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/, lookbehind: !0, greedy: !0, inside: { bash: a } }, { pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/, lookbehind: !0, greedy: !0, inside: h }, { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 }, { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: !0, inside: { entity: h.entity } }], environment: { pattern: RegExp('\\$?' + y), alias: 'constant' }, variable: h.variable, function: { pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/, lookbehind: !0 }, keyword: { pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/, lookbehind: !0 }, builtin: { pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/, lookbehind: !0, alias: 'class-name' }, boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/, lookbehind: !0 }, 'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' }, operator: { pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/, inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } } }, punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/, number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 } }, a.inside = w.languages.bash; for (let r = ['comment', 'function-name', 'for-or-select', 'assign-left', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'], n = h.variable[1].inside, c = 0; c < r.length; c++)n[r[c]] = w.languages.bash[r[c]]; w.languages.shell = w.languages.bash })(Prism) },
    57: () => { (function (w) { function y (s) { return RegExp('(^(?:' + s + '):[ 	]*(?![ 	]))[^]+', 'i') }w.languages.http = { 'request-line': { pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m, inside: { method: { pattern: /^[A-Z]+\b/, alias: 'property' }, 'request-target': { pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/, lookbehind: !0, alias: 'url', inside: w.languages.uri }, 'http-version': { pattern: /^(\s)HTTP\/[\d.]+/, lookbehind: !0, alias: 'property' } } }, 'response-status': { pattern: /^HTTP\/[\d.]+ \d+ .+/m, inside: { 'http-version': { pattern: /^HTTP\/[\d.]+/, alias: 'property' }, 'status-code': { pattern: /^(\s)\d+(?=\s)/, lookbehind: !0, alias: 'number' }, 'reason-phrase': { pattern: /^(\s).+/, lookbehind: !0, alias: 'string' } } }, header: { pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m, inside: { 'header-value': [{ pattern: y(/Content-Security-Policy/.source), lookbehind: !0, alias: ['csp', 'languages-csp'], inside: w.languages.csp }, { pattern: y(/Public-Key-Pins(?:-Report-Only)?/.source), lookbehind: !0, alias: ['hpkp', 'languages-hpkp'], inside: w.languages.hpkp }, { pattern: y(/Strict-Transport-Security/.source), lookbehind: !0, alias: ['hsts', 'languages-hsts'], inside: w.languages.hsts }, { pattern: y(/[^:]+/.source), lookbehind: !0 }], 'header-name': { pattern: /^[^:]+/, alias: 'keyword' }, punctuation: /^:/ } } }; const a = w.languages; const h = { 'application/javascript': a.javascript, 'application/json': a.json || a.javascript, 'application/xml': a.xml, 'text/xml': a.xml, 'text/html': a.html, 'text/css': a.css, 'text/plain': a.plain }; const r = { 'application/json': !0, 'application/xml': !0 }; function n (s) { const u = s.replace(/^[a-z]+\//, ''); const g = '\\w+/(?:[\\w.-]+\\+)+' + u + '(?![+\\w.-])'; return '(?:' + s + '|' + g + ')' } let c; for (const f in h) if (h[f]) { c = c || {}; const l = r[f] ? n(f) : f; c[f.replace(/\//g, '-')] = { pattern: RegExp('(' + /content-type:\s*/.source + l + /(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source + ')' + /[^ \t\w-][\s\S]*/.source, 'i'), lookbehind: !0, inside: h[f] } }c && w.languages.insertBefore('http', 'header', c) })(Prism) },
    4277: () => { Prism.languages.json = { property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 }, string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 }, comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 }, number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, punctuation: /[{}[\],]/, operator: /:/, boolean: /\b(?:false|true)\b/, null: { pattern: /\bnull\b/, alias: 'keyword' } }, Prism.languages.webmanifest = Prism.languages.json },
    366: () => { Prism.languages.python = { comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 }, 'string-interpolation': { pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i, greedy: !0, inside: { interpolation: { pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/, lookbehind: !0, inside: { 'format-spec': { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 }, 'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' }, rest: null } }, string: /[\s\S]+/ } }, 'triple-quoted-string': { pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: 'string' }, string: { pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 }, function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 }, 'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 }, decorator: { pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m, lookbehind: !0, alias: ['annotation', 'punctuation'], inside: { punctuation: /\./ } }, keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/, builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/, boolean: /\b(?:False|None|True)\b/, number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i, operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/, punctuation: /[{}[\];(),.:]/ }, Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python },
    5660: (w, y, a) => {
      const h = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {}/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */const r = (function (n) { const c = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i; let f = 0; const l = {}; var s = { manual: n.Prism && n.Prism.manual, disableWorkerMessageHandler: n.Prism && n.Prism.disableWorkerMessageHandler, util: { encode: function S (D) { return D instanceof u ? new u(D.type, S(D.content), D.alias) : Array.isArray(D) ? D.map(S) : D.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ') }, type: function (S) { return Object.prototype.toString.call(S).slice(8, -1) }, objId: function (S) { return S.__id || Object.defineProperty(S, '__id', { value: ++f }), S.__id }, clone: function S (D, A) { A = A || {}; let T, C; switch (s.util.type(D)) { case 'Object':if (C = s.util.objId(D), A[C]) return A[C]; T = {}, A[C] = T; for (const N in D)D.hasOwnProperty(N) && (T[N] = S(D[N], A)); return T; case 'Array':return C = s.util.objId(D), A[C] ? A[C] : (T = [], A[C] = T, D.forEach(function (L, R) { T[R] = S(L, A) }), T); default:return D } }, getLanguage: function (S) { for (;S;) { const D = c.exec(S.className); if (D) return D[1].toLowerCase(); S = S.parentElement } return 'none' }, setLanguage: function (S, D) { S.className = S.className.replace(RegExp(c, 'gi'), ''), S.classList.add('language-' + D) }, currentScript: function () { if (typeof document === 'undefined') return null; if ('currentScript' in document && 1 < 2) return document.currentScript; try { throw new Error() } catch (T) { const S = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(T.stack) || [])[1]; if (S) { const D = document.getElementsByTagName('script'); for (const A in D) if (D[A].src == S) return D[A] } return null } }, isActive: function (S, D, A) { for (let T = 'no-' + D; S;) { const C = S.classList; if (C.contains(D)) return !0; if (C.contains(T)) return !1; S = S.parentElement } return !!A } }, languages: { plain: l, plaintext: l, text: l, txt: l, extend: function (S, D) { const A = s.util.clone(s.languages[S]); for (const T in D)A[T] = D[T]; return A }, insertBefore: function (S, D, A, T) { T = T || s.languages; const C = T[S]; const N = {}; for (const L in C) if (C.hasOwnProperty(L)) { if (L == D) for (const R in A)A.hasOwnProperty(R) && (N[R] = A[R]); A.hasOwnProperty(L) || (N[L] = C[L]) } const B = T[S]; return T[S] = N, s.languages.DFS(s.languages, function (O, F) { F === B && O != S && (this[O] = N) }), N }, DFS: function S (D, A, T, C) { C = C || {}; const N = s.util.objId; for (const L in D) if (D.hasOwnProperty(L)) { A.call(D, L, D[L], T || L); const R = D[L]; const B = s.util.type(R); B === 'Object' && !C[N(R)] ? (C[N(R)] = !0, S(R, A, null, C)) : B === 'Array' && !C[N(R)] && (C[N(R)] = !0, S(R, A, L, C)) } } }, plugins: {}, highlightAll: function (S, D) { s.highlightAllUnder(document, S, D) }, highlightAllUnder: function (S, D, A) { const T = { callback: A, container: S, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' }; s.hooks.run('before-highlightall', T), T.elements = Array.prototype.slice.apply(T.container.querySelectorAll(T.selector)), s.hooks.run('before-all-elements-highlight', T); for (var C = 0, N; N = T.elements[C++];)s.highlightElement(N, D === !0, T.callback) }, highlightElement: function (S, D, A) { const T = s.util.getLanguage(S); const C = s.languages[T]; s.util.setLanguage(S, T); let N = S.parentElement; N && N.nodeName.toLowerCase() === 'pre' && s.util.setLanguage(N, T); const L = S.textContent; const R = { element: S, language: T, grammar: C, code: L }; function B (F) { R.highlightedCode = F, s.hooks.run('before-insert', R), R.element.innerHTML = R.highlightedCode, s.hooks.run('after-highlight', R), s.hooks.run('complete', R), A && A.call(R.element) } if (s.hooks.run('before-sanity-check', R), N = R.element.parentElement, N && N.nodeName.toLowerCase() === 'pre' && !N.hasAttribute('tabindex') && N.setAttribute('tabindex', '0'), !R.code) { s.hooks.run('complete', R), A && A.call(R.element); return } if (s.hooks.run('before-highlight', R), !R.grammar) { B(s.util.encode(R.code)); return } if (D && n.Worker) { const O = new Worker(s.filename); O.onmessage = function (F) { B(F.data) }, O.postMessage(JSON.stringify({ language: R.language, code: R.code, immediateClose: !0 })) } else B(s.highlight(R.code, R.grammar, R.language)) }, highlight: function (S, D, A) { const T = { code: S, grammar: D, language: A }; if (s.hooks.run('before-tokenize', T), !T.grammar) throw new Error('The language "' + T.language + '" has no grammar.'); return T.tokens = s.tokenize(T.code, T.grammar), s.hooks.run('after-tokenize', T), u.stringify(s.util.encode(T.tokens), T.language) }, tokenize: function (S, D) { const A = D.rest; if (A) { for (const T in A)D[T] = A[T]; delete D.rest } const C = new m(); return d(C, C.head, S), i(S, C, D, C.head, 0), b(C) }, hooks: { all: {}, add: function (S, D) { const A = s.hooks.all; A[S] = A[S] || [], A[S].push(D) }, run: function (S, D) { const A = s.hooks.all[S]; if (!(!A || !A.length)) for (var T = 0, C; C = A[T++];)C(D) } }, Token: u }; n.Prism = s; function u (S, D, A, T) { this.type = S, this.content = D, this.alias = A, this.length = (T || '').length | 0 }u.stringify = function S (D, A) { if (typeof D === 'string') return D; if (Array.isArray(D)) { let T = ''; return D.forEach(function (B) { T += S(B, A) }), T } const C = { type: D.type, content: S(D.content, A), tag: 'span', classes: ['token', D.type], attributes: {}, language: A }; const N = D.alias; N && (Array.isArray(N) ? Array.prototype.push.apply(C.classes, N) : C.classes.push(N)), s.hooks.run('wrap', C); let L = ''; for (const R in C.attributes)L += ' ' + R + '="' + (C.attributes[R] || '').replace(/"/g, '&quot;') + '"'; return '<' + C.tag + ' class="' + C.classes.join(' ') + '"' + L + '>' + C.content + '</' + C.tag + '>' }; function g (S, D, A, T) { S.lastIndex = D; const C = S.exec(A); if (C && T && C[1]) { const N = C[1].length; C.index += N, C[0] = C[0].slice(N) } return C } function i (S, D, A, T, C, N) { for (const L in A) if (!(!A.hasOwnProperty(L) || !A[L])) { let R = A[L]; R = Array.isArray(R) ? R : [R]; for (let B = 0; B < R.length; ++B) { if (N && N.cause == L + ',' + B) return; const O = R[B]; const F = O.inside; const q = !!O.lookbehind; const _ = !!O.greedy; const W = O.alias; if (_ && !O.pattern.global) { const H = O.pattern.toString().match(/[imsuy]*$/)[0]; O.pattern = RegExp(O.pattern.source, H + 'g') } for (let $ = O.pattern || O, K = T.next, te = C; K !== D.tail && !(N && te >= N.reach); te += K.value.length, K = K.next) { let oe = K.value; if (D.length > S.length) return; if (!(oe instanceof u)) { let he = 1; var Q; if (_) { if (Q = g($, te, S, q), !Q || Q.index >= S.length) break; var mt = Q.index; const ye = Q.index + Q[0].length; let Ae = te; for (Ae += K.value.length; mt >= Ae;)K = K.next, Ae += K.value.length; if (Ae -= K.value.length, te = Ae, K.value instanceof u) continue; for (let Ke = K; Ke !== D.tail && (Ae < ye || typeof Ke.value === 'string'); Ke = Ke.next)he++, Ae += Ke.value.length; he--, oe = S.slice(te, Ae), Q.index -= te } else if (Q = g($, 0, oe, q), !Q) continue; var mt = Q.index; const kt = Q[0]; const Rt = oe.slice(0, mt); const Lt = oe.slice(mt + kt.length); const Wt = te + oe.length; N && Wt > N.reach && (N.reach = Wt); let ze = K.prev; Rt && (ze = d(D, ze, Rt), te += Rt.length), p(D, ze, he); const Mt = new u(L, F ? s.tokenize(kt, F) : kt, W, kt); if (K = d(D, ze, Mt), Lt && d(D, K, Lt), he > 1) { const Ve = { cause: L + ',' + B, reach: Wt }; i(S, D, A, K.prev, te, Ve), N && Ve.reach > N.reach && (N.reach = Ve.reach) } } } } } } function m () { const S = { value: null, prev: null, next: null }; const D = { value: null, prev: S, next: null }; S.next = D, this.head = S, this.tail = D, this.length = 0 } function d (S, D, A) { const T = D.next; const C = { value: A, prev: D, next: T }; return D.next = C, T.prev = C, S.length++, C } function p (S, D, A) { for (var T = D.next, C = 0; C < A && T !== S.tail; C++)T = T.next; D.next = T, T.prev = D, S.length -= C } function b (S) { for (var D = [], A = S.head.next; A !== S.tail;)D.push(A.value), A = A.next; return D } if (!n.document) return n.addEventListener && (s.disableWorkerMessageHandler || n.addEventListener('message', function (S) { const D = JSON.parse(S.data); const A = D.language; const T = D.code; const C = D.immediateClose; n.postMessage(s.highlight(T, s.languages[A], A)), C && n.close() }, !1)), s; const v = s.util.currentScript(); v && (s.filename = v.src, v.hasAttribute('data-manual') && (s.manual = !0)); function x () { s.manual || s.highlightAll() } if (!s.manual) { const P = document.readyState; P === 'loading' || P === 'interactive' && v && v.defer ? document.addEventListener('DOMContentLoaded', x) : window.requestAnimationFrame ? window.requestAnimationFrame(x) : window.setTimeout(x, 16) } return s }(h)); w.exports && (w.exports = r), typeof a.g !== 'undefined' && (a.g.Prism = r), r.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { 'internal-subset': { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, 'doctype-tag': /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: !0, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, 'special-attr': [], 'attr-value': { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] } }, punctuation: /\/?>/, 'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i] }, r.languages.markup.tag.inside['attr-value'].inside.entity = r.languages.markup.entity, r.languages.markup.doctype.inside['internal-subset'].inside = r.languages.markup, r.hooks.add('wrap', function (n) { n.type === 'entity' && (n.attributes.title = n.content.replace(/&amp;/, '&')) }), Object.defineProperty(r.languages.markup.tag, 'addInlined', { value: function (c, f) { const l = {}; l['language-' + f] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: r.languages[f] }, l.cdata = /^<!\[CDATA\[|\]\]>$/i; const s = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: l } }; s['language-' + f] = { pattern: /[\s\S]+/, inside: r.languages[f] }; const u = {}; u[c] = { pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return c }), 'i'), lookbehind: !0, greedy: !0, inside: s }, r.languages.insertBefore('markup', 'cdata', u) } }), Object.defineProperty(r.languages.markup.tag, 'addAttribute', { value: function (n, c) { r.languages.markup.tag.inside['special-attr'].push({ pattern: RegExp(/(^|["'\s])/.source + '(?:' + n + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'), lookbehind: !0, inside: { 'attr-name': /^[^\s=]+/, 'attr-value': { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [c, 'language-' + c], inside: r.languages[c] }, punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] } } } }) } }), r.languages.html = r.languages.markup, r.languages.mathml = r.languages.markup, r.languages.svg = r.languages.markup, r.languages.xml = r.languages.extend('markup', {}), r.languages.ssml = r.languages.xml, r.languages.atom = r.languages.xml, r.languages.rss = r.languages.xml, (function (n) { const c = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/; n.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/, inside: { rule: /^@[\w-]+/, 'selector-function-argument': { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: 'selector' }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp('\\burl\\((?:' + c.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp('^' + c.source + '$'), alias: 'url' } } }, selector: { pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + c.source + ')*(?=\\s*\\{)'), lookbehind: !0 }, string: { pattern: c, greedy: !0 }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 }, punctuation: /[(){};:,]/ }, n.languages.css.atrule.inside.rest = n.languages.css; const f = n.languages.markup; f && (f.tag.addInlined('style', 'css'), f.tag.addAttribute('style', 'css')) }(r)), r.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, 'class-name': { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ }, r.languages.javascript = r.languages.extend('clike', { 'class-name': [r.languages.clike['class-name'], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp(/(^|[^\w$])/.source + '(?:' + (/NaN|Infinity/.source + '|' + /0[bB][01]+(?:_[01]+)*n?/.source + '|' + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + /\d+(?:_\d+)*n/.source + '|' + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source), lookbehind: !0 }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), r.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, r.languages.insertBefore('javascript', 'keyword', { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/, lookbehind: !0, greedy: !0, inside: { 'regex-source': { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: 'language-regex', inside: r.languages.regex }, 'regex-delimiter': /^\/|\/$/, 'regex-flags': /^[a-z]+$/ } }, 'function-variable': { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: 'function' }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: r.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: r.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: r.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: r.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), r.languages.insertBefore('javascript', 'string', { hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' }, 'template-string': { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: !0, inside: { 'template-punctuation': { pattern: /^`|`$/, alias: 'string' }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { 'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' }, rest: r.languages.javascript } }, string: /[\s\S]+/ } }, 'string-property': { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: 'property' } }), r.languages.insertBefore('javascript', 'operator', { 'literal-property': { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: 'property' } }), r.languages.markup && (r.languages.markup.tag.addInlined('script', 'javascript'), r.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript')), r.languages.js = r.languages.javascript, (function () {
        if (typeof r === 'undefined' || typeof document === 'undefined') return; Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector); const n = 'Loading\u2026'; const c = function (v, x) { return '\u2716 Error ' + v + ' while fetching file: ' + x }; const f = '\u2716 Error: File does not exist or is empty'; const l = { js: 'javascript', py: 'python', rb: 'ruby', ps1: 'powershell', psm1: 'powershell', sh: 'bash', bat: 'batch', h: 'c', tex: 'latex' }; const s = 'data-src-status'; const u = 'loading'; const g = 'loaded'; const i = 'failed'; const m = 'pre[data-src]:not([' + s + '="' + g + '"]):not([' + s + '="' + u + '"])'; function d (v, x, P) { const S = new XMLHttpRequest(); S.open('GET', v, !0), S.onreadystatechange = function () { S.readyState == 4 && (S.status < 400 && S.responseText ? x(S.responseText) : S.status >= 400 ? P(c(S.status, S.statusText)) : P(f)) }, S.send(null) } function p (v) { const x = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(v || ''); if (x) { const P = Number(x[1]); const S = x[2]; const D = x[3]; return S ? D ? [P, Number(D)] : [P, void 0] : [P, P] } }r.hooks.add('before-highlightall', function (v) { v.selector += ', ' + m }), r.hooks.add('before-sanity-check', function (v) {
          const x = v.element; if (x.matches(m)) {
            v.code = '', x.setAttribute(s, u); const P = x.appendChild(document.createElement('CODE')); P.textContent = n; const S = x.getAttribute('data-src'); let D = v.language; if (D === 'none') { const A = (/\.(\w+)$/.exec(S) || [, 'none'])[1]; D = l[A] || A }r.util.setLanguage(P, D), r.util.setLanguage(x, D); const T = r.plugins.autoloader; T && T.loadLanguages(D), d(S, function (C) {
              x.setAttribute(s, g); const N = p(x.getAttribute('data-range')); if (N) {
                const L = C.split(/\r\n?|\n/g); let R = N[0]; let B = N[1] == null ? L.length : N[1]; R < 0 && (R += L.length), R = Math.max(0, Math.min(R - 1, L.length)), B < 0 && (B += L.length), B = Math.max(0, Math.min(B, L.length)), C = L.slice(R, B).join(`
`), x.hasAttribute('data-start') || x.setAttribute('data-start', String(R + 1))
              }P.textContent = C, r.highlightElement(P)
            }, function (C) { x.setAttribute(s, i), P.textContent = C })
          }
        }), r.plugins.fileHighlight = { highlight: function (x) { for (var P = (x || document).querySelectorAll(m), S = 0, D; D = P[S++];)r.highlightElement(D) } }; let b = !1; r.fileHighlight = function () { b || (console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'), b = !0), r.plugins.fileHighlight.highlight.apply(this, arguments) }
      }())
    },
    7129: (w, y) => { 'use strict'; const a = Object.prototype.hasOwnProperty; let h; function r (l) { try { return decodeURIComponent(l.replace(/\+/g, ' ')) } catch (s) { return null } } function n (l) { try { return encodeURIComponent(l) } catch (s) { return null } } function c (l) { for (var s = /([^=?#&]+)=?([^&]*)/g, u = {}, g; g = s.exec(l);) { const i = r(g[1]); const m = r(g[2]); i === null || m === null || i in u || (u[i] = m) } return u } function f (l, s) { s = s || ''; const u = []; let g; let i; typeof s !== 'string' && (s = '?'); for (i in l) if (a.call(l, i)) { if (g = l[i], !g && (g === null || g === h || isNaN(g)) && (g = ''), i = n(i), g = n(g), i === null || g === null) continue; u.push(i + '=' + g) } return u.length ? s + u.join('&') : '' }y.stringify = f, y.parse = c },
    7418: w => { 'use strict'; w.exports = function (a, h) { if (h = h.split(':')[0], a = +a, !a) return !1; switch (h) { case 'http':case 'ws':return a !== 80; case 'https':case 'wss':return a !== 443; case 'ftp':return a !== 21; case 'gopher':return a !== 70; case 'file':return !1 } return a !== 0 } },
    4564: (w, y, a) => { 'use strict'; const h = a(7418); const r = a(7129); const n = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/; const c = /[\n\r\t]/g; const f = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//; const l = /:\d+$/; const s = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i; const u = /^[a-zA-Z]:/; function g (D) { return (D || '').toString().replace(n, '') } const i = [['#', 'hash'], ['?', 'query'], function (A, T) { return p(T.protocol) ? A.replace(/\\/g, '/') : A }, ['/', 'pathname'], ['@', 'auth', 1], [NaN, 'host', void 0, 1, 1], [/:(\d*)$/, 'port', void 0, 1], [NaN, 'hostname', void 0, 1, 1]]; const m = { hash: 1, query: 1 }; function d (D) { let A; typeof window !== 'undefined' ? A = window : typeof a.g !== 'undefined' ? A = a.g : typeof self !== 'undefined' ? A = self : A = {}; const T = A.location || {}; D = D || T; let C = {}; const N = typeof D; let L; if (D.protocol === 'blob:')C = new x(unescape(D.pathname), {}); else if (N === 'string') { C = new x(D, {}); for (L in m) delete C[L] } else if (N === 'object') { for (L in D)L in m || (C[L] = D[L]); C.slashes === void 0 && (C.slashes = f.test(D.href)) } return C } function p (D) { return D === 'file:' || D === 'ftp:' || D === 'http:' || D === 'https:' || D === 'ws:' || D === 'wss:' } function b (D, A) { D = g(D), D = D.replace(c, ''), A = A || {}; const T = s.exec(D); const C = T[1] ? T[1].toLowerCase() : ''; const N = !!T[2]; const L = !!T[3]; let R = 0; let B; return N ? L ? (B = T[2] + T[3] + T[4], R = T[2].length + T[3].length) : (B = T[2] + T[4], R = T[2].length) : L ? (B = T[3] + T[4], R = T[3].length) : B = T[4], C === 'file:' ? R >= 2 && (B = B.slice(2)) : p(C) ? B = T[4] : C ? N && (B = B.slice(2)) : R >= 2 && p(A.protocol) && (B = T[4]), { protocol: C, slashes: N || p(C), slashesCount: R, rest: B } } function v (D, A) { if (D === '') return A; for (var T = (A || '/').split('/').slice(0, -1).concat(D.split('/')), C = T.length, N = T[C - 1], L = !1, R = 0; C--;)T[C] === '.' ? T.splice(C, 1) : T[C] === '..' ? (T.splice(C, 1), R++) : R && (C === 0 && (L = !0), T.splice(C, 1), R--); return L && T.unshift(''), (N === '.' || N === '..') && T.push(''), T.join('/') } function x (D, A, T) { if (D = g(D), D = D.replace(c, ''), !(this instanceof x)) return new x(D, A, T); let C; let N; let L; let R; let B; let O; const F = i.slice(); const q = typeof A; const _ = this; let W = 0; for (q !== 'object' && q !== 'string' && (T = A, A = null), T && typeof T !== 'function' && (T = r.parse), A = d(A), N = b(D || '', A), C = !N.protocol && !N.slashes, _.slashes = N.slashes || C && A.slashes, _.protocol = N.protocol || A.protocol || '', D = N.rest, (N.protocol === 'file:' && (N.slashesCount !== 2 || u.test(D)) || !N.slashes && (N.protocol || N.slashesCount < 2 || !p(_.protocol))) && (F[3] = [/(.*)/, 'pathname']); W < F.length; W++) { if (R = F[W], typeof R === 'function') { D = R(D, _); continue }L = R[0], O = R[1], L !== L ? _[O] = D : typeof L === 'string' ? (B = L === '@' ? D.lastIndexOf(L) : D.indexOf(L), ~B && (typeof R[2] === 'number' ? (_[O] = D.slice(0, B), D = D.slice(B + R[2])) : (_[O] = D.slice(B), D = D.slice(0, B)))) : (B = L.exec(D)) && (_[O] = B[1], D = D.slice(0, B.index)), _[O] = _[O] || C && R[3] && A[O] || '', R[4] && (_[O] = _[O].toLowerCase()) }T && (_.query = T(_.query)), C && A.slashes && _.pathname.charAt(0) !== '/' && (_.pathname !== '' || A.pathname !== '') && (_.pathname = v(_.pathname, A.pathname)), _.pathname.charAt(0) !== '/' && p(_.protocol) && (_.pathname = '/' + _.pathname), h(_.port, _.protocol) || (_.host = _.hostname, _.port = ''), _.username = _.password = '', _.auth && (B = _.auth.indexOf(':'), ~B ? (_.username = _.auth.slice(0, B), _.username = encodeURIComponent(decodeURIComponent(_.username)), _.password = _.auth.slice(B + 1), _.password = encodeURIComponent(decodeURIComponent(_.password))) : _.username = encodeURIComponent(decodeURIComponent(_.auth)), _.auth = _.password ? _.username + ':' + _.password : _.username), _.origin = _.protocol !== 'file:' && p(_.protocol) && _.host ? _.protocol + '//' + _.host : 'null', _.href = _.toString() } function P (D, A, T) { const C = this; switch (D) { case 'query':typeof A === 'string' && A.length && (A = (T || r.parse)(A)), C[D] = A; break; case 'port':C[D] = A, h(A, C.protocol) ? A && (C.host = C.hostname + ':' + A) : (C.host = C.hostname, C[D] = ''); break; case 'hostname':C[D] = A, C.port && (A += ':' + C.port), C.host = A; break; case 'host':C[D] = A, l.test(A) ? (A = A.split(':'), C.port = A.pop(), C.hostname = A.join(':')) : (C.hostname = A, C.port = ''); break; case 'protocol':C.protocol = A.toLowerCase(), C.slashes = !T; break; case 'pathname':case 'hash':if (A) { const N = D === 'pathname' ? '/' : '#'; C[D] = A.charAt(0) !== N ? N + A : A } else C[D] = A; break; case 'username':case 'password':C[D] = encodeURIComponent(A); break; case 'auth':var L = A.indexOf(':'); ~L ? (C.username = A.slice(0, L), C.username = encodeURIComponent(decodeURIComponent(C.username)), C.password = A.slice(L + 1), C.password = encodeURIComponent(decodeURIComponent(C.password))) : C.username = encodeURIComponent(decodeURIComponent(A)) } for (let R = 0; R < i.length; R++) { const B = i[R]; B[4] && (C[B[1]] = C[B[1]].toLowerCase()) } return C.auth = C.password ? C.username + ':' + C.password : C.username, C.origin = C.protocol !== 'file:' && p(C.protocol) && C.host ? C.protocol + '//' + C.host : 'null', C.href = C.toString(), C } function S (D) { (!D || typeof D !== 'function') && (D = r.stringify); let A; const T = this; let C = T.host; let N = T.protocol; N && N.charAt(N.length - 1) !== ':' && (N += ':'); let L = N + (T.protocol && T.slashes || p(T.protocol) ? '//' : ''); return T.username ? (L += T.username, T.password && (L += ':' + T.password), L += '@') : T.password ? (L += ':' + T.password, L += '@') : T.protocol !== 'file:' && p(T.protocol) && !C && T.pathname !== '/' && (L += '@'), (C[C.length - 1] === ':' || l.test(T.hostname) && !T.port) && (C += ':'), L += C + T.pathname, A = typeof T.query === 'object' ? D(T.query) : T.query, A && (L += A.charAt(0) !== '?' ? '?' + A : A), T.hash && (L += T.hash), L }x.prototype = { set: P, toString: S }, x.extractProtocol = b, x.location = d, x.trimLeft = g, x.qs = r, w.exports = x },
    9602: w => { 'use strict'; w.exports = function (y) { y.prototype[Symbol.iterator] = function * () { for (let a = this.head; a; a = a.next) yield a.value } } },
    4411: (w, y, a) => { 'use strict'; w.exports = h, h.Node = f, h.create = h; function h (l) { let s = this; if (s instanceof h || (s = new h()), s.tail = null, s.head = null, s.length = 0, l && typeof l.forEach === 'function')l.forEach(function (i) { s.push(i) }); else if (arguments.length > 0) for (let u = 0, g = arguments.length; u < g; u++)s.push(arguments[u]); return s }h.prototype.removeNode = function (l) { if (l.list !== this) throw new Error('removing node which does not belong to this list'); const s = l.next; const u = l.prev; return s && (s.prev = u), u && (u.next = s), l === this.head && (this.head = s), l === this.tail && (this.tail = u), l.list.length--, l.next = null, l.prev = null, l.list = null, s }, h.prototype.unshiftNode = function (l) { if (l !== this.head) { l.list && l.list.removeNode(l); const s = this.head; l.list = this, l.next = s, s && (s.prev = l), this.head = l, this.tail || (this.tail = l), this.length++ } }, h.prototype.pushNode = function (l) { if (l !== this.tail) { l.list && l.list.removeNode(l); const s = this.tail; l.list = this, l.prev = s, s && (s.next = l), this.tail = l, this.head || (this.head = l), this.length++ } }, h.prototype.push = function () { for (let l = 0, s = arguments.length; l < s; l++)n(this, arguments[l]); return this.length }, h.prototype.unshift = function () { for (let l = 0, s = arguments.length; l < s; l++)c(this, arguments[l]); return this.length }, h.prototype.pop = function () { if (this.tail) { const l = this.tail.value; return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, l } }, h.prototype.shift = function () { if (this.head) { const l = this.head.value; return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, l } }, h.prototype.forEach = function (l, s) { s = s || this; for (let u = this.head, g = 0; u !== null; g++)l.call(s, u.value, g, this), u = u.next }, h.prototype.forEachReverse = function (l, s) { s = s || this; for (let u = this.tail, g = this.length - 1; u !== null; g--)l.call(s, u.value, g, this), u = u.prev }, h.prototype.get = function (l) { for (var s = 0, u = this.head; u !== null && s < l; s++)u = u.next; if (s === l && u !== null) return u.value }, h.prototype.getReverse = function (l) { for (var s = 0, u = this.tail; u !== null && s < l; s++)u = u.prev; if (s === l && u !== null) return u.value }, h.prototype.map = function (l, s) { s = s || this; for (var u = new h(), g = this.head; g !== null;)u.push(l.call(s, g.value, this)), g = g.next; return u }, h.prototype.mapReverse = function (l, s) { s = s || this; for (var u = new h(), g = this.tail; g !== null;)u.push(l.call(s, g.value, this)), g = g.prev; return u }, h.prototype.reduce = function (l, s) { let u; let g = this.head; if (arguments.length > 1)u = s; else if (this.head)g = this.head.next, u = this.head.value; else throw new TypeError('Reduce of empty list with no initial value'); for (let i = 0; g !== null; i++)u = l(u, g.value, i), g = g.next; return u }, h.prototype.reduceReverse = function (l, s) { let u; let g = this.tail; if (arguments.length > 1)u = s; else if (this.tail)g = this.tail.prev, u = this.tail.value; else throw new TypeError('Reduce of empty list with no initial value'); for (let i = this.length - 1; g !== null; i--)u = l(u, g.value, i), g = g.prev; return u }, h.prototype.toArray = function () { for (var l = new Array(this.length), s = 0, u = this.head; u !== null; s++)l[s] = u.value, u = u.next; return l }, h.prototype.toArrayReverse = function () { for (var l = new Array(this.length), s = 0, u = this.tail; u !== null; s++)l[s] = u.value, u = u.prev; return l }, h.prototype.slice = function (l, s) { s = s || this.length, s < 0 && (s += this.length), l = l || 0, l < 0 && (l += this.length); const u = new h(); if (s < l || s < 0) return u; l < 0 && (l = 0), s > this.length && (s = this.length); for (var g = 0, i = this.head; i !== null && g < l; g++)i = i.next; for (;i !== null && g < s; g++, i = i.next)u.push(i.value); return u }, h.prototype.sliceReverse = function (l, s) { s = s || this.length, s < 0 && (s += this.length), l = l || 0, l < 0 && (l += this.length); const u = new h(); if (s < l || s < 0) return u; l < 0 && (l = 0), s > this.length && (s = this.length); for (var g = this.length, i = this.tail; i !== null && g > s; g--)i = i.prev; for (;i !== null && g > l; g--, i = i.prev)u.push(i.value); return u }, h.prototype.splice = function (l, s, ...u) { l > this.length && (l = this.length - 1), l < 0 && (l = this.length + l); for (var g = 0, i = this.head; i !== null && g < l; g++)i = i.next; for (var m = [], g = 0; i && g < s; g++)m.push(i.value), i = this.removeNode(i); i === null && (i = this.tail), i !== this.head && i !== this.tail && (i = i.prev); for (var g = 0; g < u.length; g++)i = r(this, i, u[g]); return m }, h.prototype.reverse = function () { for (var l = this.head, s = this.tail, u = l; u !== null; u = u.prev) { const g = u.prev; u.prev = u.next, u.next = g } return this.head = s, this.tail = l, this }; function r (l, s, u) { const g = s === l.head ? new f(u, null, s, l) : new f(u, s, s.next, l); return g.next === null && (l.tail = g), g.prev === null && (l.head = g), l.length++, g } function n (l, s) { l.tail = new f(s, l.tail, null, l), l.head || (l.head = l.tail), l.length++ } function c (l, s) { l.head = new f(s, null, l.head, l), l.tail || (l.tail = l.head), l.length++ } function f (l, s, u, g) { if (!(this instanceof f)) return new f(l, s, u, g); this.list = g, this.value = l, s ? (s.next = this, this.prev = s) : this.prev = null, u ? (u.prev = this, this.next = u) : this.next = null } try { a(9602)(h) } catch (l) {} }
  }; const ks = {}; function ft (w) { const y = ks[w]; if (y !== void 0) return y.exports; const a = ks[w] = { id: w, loaded: !1, exports: {} }; return ic[w].call(a.exports, a, a.exports, ft), a.loaded = !0, a.exports }ft.n = w => { const y = w && w.__esModule ? () => w.default : () => w; return ft.d(y, { a: y }), y }, ft.d = (w, y) => { for (const a in y)ft.o(y, a) && !ft.o(w, a) && Object.defineProperty(w, a, { enumerable: !0, get: y[a] }) }, ft.g = (function () { if (typeof globalThis === 'object') return globalThis; try { return this || new Function('return this')() } catch (w) { if (typeof window === 'object') return window } }()), ft.o = (w, y) => Object.prototype.hasOwnProperty.call(w, y), ft.nmd = w => (w.paths = [], w.children || (w.children = []), w); const a0 = {}; (() => {
    let _t; 'use strict'; const w = ft(4002); const y = ft.n(w); const a = ft(6486); const h = ft(7154); const r = ft.n(h); const n = ft(177); const c = ft.n(n); const f = ft(9737); const l = ft(6278); const s = ft(6927); const u = ft(3497); const g = ft(7814); const i = ft(5660); const m = ft.n(i); const d = ft(7874); const p = ft(4277); const b = ft(57); const v = ft(366); const x = ft(4564); function P (pe) { for (var Z = [], de = 0; de < pe.length;) { const Pe = pe[de]; if (Pe === '*' || Pe === '+' || Pe === '?') { Z.push({ type: 'MODIFIER', index: de, value: pe[de++] }); continue } if (Pe === '\\') { Z.push({ type: 'ESCAPED_CHAR', index: de++, value: pe[de++] }); continue } if (Pe === '{') { Z.push({ type: 'OPEN', index: de, value: pe[de++] }); continue } if (Pe === '}') { Z.push({ type: 'CLOSE', index: de, value: pe[de++] }); continue } if (Pe === ':') { for (var ne = '', me = de + 1; me < pe.length;) { const fe = pe.charCodeAt(me); if (fe >= 48 && fe <= 57 || fe >= 65 && fe <= 90 || fe >= 97 && fe <= 122 || fe === 95) { ne += pe[me++]; continue } break } if (!ne) throw new TypeError('Missing parameter name at ' + de); Z.push({ type: 'NAME', index: de, value: ne }), de = me; continue } if (Pe === '(') { let xe = 1; let Le = ''; var me = de + 1; if (pe[me] === '?') throw new TypeError('Pattern cannot start with "?" at ' + me); for (;me < pe.length;) { if (pe[me] === '\\') { Le += pe[me++] + pe[me++]; continue } if (pe[me] === ')') { if (xe--, xe === 0) { me++; break } } else if (pe[me] === '(' && (xe++, pe[me + 1] !== '?')) throw new TypeError('Capturing groups are not allowed at ' + me); Le += pe[me++] } if (xe) throw new TypeError('Unbalanced pattern at ' + de); if (!Le) throw new TypeError('Missing pattern at ' + de); Z.push({ type: 'PATTERN', index: de, value: Le }), de = me; continue }Z.push({ type: 'CHAR', index: de, value: pe[de++] }) } return Z.push({ type: 'END', index: de, value: '' }), Z } function S (pe, Z) { Z === void 0 && (Z = {}); for (var de = P(pe), Pe = Z.prefixes, ne = Pe === void 0 ? './' : Pe, me = '[^' + N(Z.delimiter || '/#?') + ']+?', fe = [], xe = 0, Le = 0, Fe = '', Ne = function (Y) { if (Le < de.length && de[Le].type === Y) return de[Le++].value }, De = function (Y) { const ie = Ne(Y); if (ie !== void 0) return ie; const ae = de[Le]; const be = ae.type; const Se = ae.index; throw new TypeError('Unexpected ' + be + ' at ' + Se + ', expected ' + Y) }, Me = function () { for (var Y = '', ie; ie = Ne('CHAR') || Ne('ESCAPED_CHAR');)Y += ie; return Y }; Le < de.length;) { const We = Ne('CHAR'); const it = Ne('NAME'); const Pt = Ne('PATTERN'); if (it || Pt) { var Ge = We || ''; ne.indexOf(Ge) === -1 && (Fe += Ge, Ge = ''), Fe && (fe.push(Fe), Fe = ''), fe.push({ name: it || xe++, prefix: Ge, suffix: '', pattern: Pt || me, modifier: Ne('MODIFIER') || '' }); continue } const yt = We || Ne('ESCAPED_CHAR'); if (yt) { Fe += yt; continue }Fe && (fe.push(Fe), Fe = ''); const j = Ne('OPEN'); if (j) { var Ge = Me(); const U = Ne('NAME') || ''; const G = Ne('PATTERN') || ''; const re = Me(); De('CLOSE'), fe.push({ name: U || (G ? xe++ : ''), pattern: U && !G ? me : G, prefix: Ge, suffix: re, modifier: Ne('MODIFIER') || '' }); continue }De('END') } return fe } function D (pe, Z) { return A(S(pe, Z), Z) } function A (pe, Z) { Z === void 0 && (Z = {}); const de = L(Z); const Pe = Z.encode; const ne = Pe === void 0 ? function (Le) { return Le } : Pe; const me = Z.validate; const fe = me === void 0 ? !0 : me; const xe = pe.map(function (Le) { if (typeof Le === 'object') return new RegExp('^(?:' + Le.pattern + ')$', de) }); return function (Le) { for (var Fe = '', Ne = 0; Ne < pe.length; Ne++) { const De = pe[Ne]; if (typeof De === 'string') { Fe += De; continue } const Me = Le ? Le[De.name] : void 0; const We = De.modifier === '?' || De.modifier === '*'; const it = De.modifier === '*' || De.modifier === '+'; if (Array.isArray(Me)) { if (!it) throw new TypeError('Expected "' + De.name + '" to not repeat, but got an array'); if (Me.length === 0) { if (We) continue; throw new TypeError('Expected "' + De.name + '" to not be empty') } for (let Pt = 0; Pt < Me.length; Pt++) { var Ge = ne(Me[Pt], De); if (fe && !xe[Ne].test(Ge)) throw new TypeError('Expected all "' + De.name + '" to match "' + De.pattern + '", but got "' + Ge + '"'); Fe += De.prefix + Ge + De.suffix } continue } if (typeof Me === 'string' || typeof Me === 'number') { var Ge = ne(String(Me), De); if (fe && !xe[Ne].test(Ge)) throw new TypeError('Expected "' + De.name + '" to match "' + De.pattern + '", but got "' + Ge + '"'); Fe += De.prefix + Ge + De.suffix; continue } if (!We) { const yt = it ? 'an array' : 'a string'; throw new TypeError('Expected "' + De.name + '" to be ' + yt) } } return Fe } } function T (pe, Z) { const de = []; const Pe = q(pe, de, Z); return C(Pe, de, Z) } function C (pe, Z, de) { de === void 0 && (de = {}); const Pe = de.decode; const ne = Pe === void 0 ? function (me) { return me } : Pe; return function (me) { const fe = pe.exec(me); if (!fe) return !1; for (var xe = fe[0], Le = fe.index, Fe = Object.create(null), Ne = function (Me) { if (fe[Me] === void 0) return 'continue'; const We = Z[Me - 1]; We.modifier === '*' || We.modifier === '+' ? Fe[We.name] = fe[Me].split(We.prefix + We.suffix).map(function (it) { return ne(it, We) }) : Fe[We.name] = ne(fe[Me], We) }, De = 1; De < fe.length; De++)Ne(De); return { path: xe, index: Le, params: Fe } } } function N (pe) { return pe.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1') } function L (pe) { return pe && pe.sensitive ? '' : 'i' } function R (pe, Z) { if (!Z) return pe; for (let de = /\((?:\?<(.*?)>)?(?!\?)/g, Pe = 0, ne = de.exec(pe.source); ne;)Z.push({ name: ne[1] || Pe++, prefix: '', suffix: '', modifier: '', pattern: '' }), ne = de.exec(pe.source); return pe } function B (pe, Z, de) { const Pe = pe.map(function (ne) { return q(ne, Z, de).source }); return new RegExp('(?:' + Pe.join('|') + ')', L(de)) } function O (pe, Z, de) { return F(S(pe, de), Z, de) } function F (pe, Z, de) { de === void 0 && (de = {}); for (var Pe = de.strict, ne = Pe === void 0 ? !1 : Pe, me = de.start, fe = me === void 0 ? !0 : me, xe = de.end, Le = xe === void 0 ? !0 : xe, Fe = de.encode, Ne = Fe === void 0 ? function (Y) { return Y } : Fe, De = '[' + N(de.endsWith || '') + ']|$', Me = '[' + N(de.delimiter || '/#?') + ']', We = fe ? '^' : '', it = 0, Pt = pe; it < Pt.length; it++) { const Ge = Pt[it]; if (typeof Ge === 'string')We += N(Ne(Ge)); else { const yt = N(Ne(Ge.prefix)); const j = N(Ne(Ge.suffix)); if (Ge.pattern) if (Z && Z.push(Ge), yt || j) if (Ge.modifier === '+' || Ge.modifier === '*') { const U = Ge.modifier === '*' ? '?' : ''; We += '(?:' + yt + '((?:' + Ge.pattern + ')(?:' + j + yt + '(?:' + Ge.pattern + '))*)' + j + ')' + U } else We += '(?:' + yt + '(' + Ge.pattern + ')' + j + ')' + Ge.modifier; else We += '(' + Ge.pattern + ')' + Ge.modifier; else We += '(?:' + yt + j + ')' + Ge.modifier } } if (Le)ne || (We += Me + '?'), We += de.endsWith ? '(?=' + De + ')' : '$'; else { const G = pe[pe.length - 1]; const re = typeof G === 'string' ? Me.indexOf(G[G.length - 1]) > -1 : G === void 0; ne || (We += '(?:' + Me + '(?=' + De + '))?'), re || (We += '(?=' + Me + '|' + De + ')') } return new RegExp(We, L(de)) } function q (pe, Z, de) { return pe instanceof RegExp ? R(pe, Z) : Array.isArray(pe) ? B(pe, Z, de) : O(pe, Z, de) } class _ {hydrate (Z, de) { const Pe = Z; const ne = new x(Z); const me = []; return q(ne.pathname, me), me.forEach(fe => { Z = Z.replace(':' + fe.name, encodeURIComponent(de[fe.name])) }), Z += Z.indexOf('?') === -1 ? '?' : '&', Object.keys(de).forEach(fe => { Pe.indexOf(':' + fe) === -1 && (Z += fe + '=' + encodeURIComponent(de[fe]) + '&') }), Z.replace(/[?&]$/, '') }} function W () { y()('.sample-request-send').off('click'), y()('.sample-request-send').on('click', function (pe) { pe.preventDefault(); const Z = y()(this).parents('article'); const de = Z.data('group'); const Pe = Z.data('name'); const ne = Z.data('version'); te(de, Pe, ne, y()(this).data('type')) }), y()('.sample-request-clear').off('click'), y()('.sample-request-clear').on('click', function (pe) { pe.preventDefault(); const Z = y()(this).parents('article'); const de = Z.data('group'); const Pe = Z.data('name'); const ne = Z.data('version'); oe(de, Pe, ne) }) } function H (pe) { return pe.replace(/{(.+?)}/g, ':$1') } function $ (pe, Z) { const de = pe.find('.sample-request-url').val(); const Pe = new _(); const ne = H(de); return Pe.hydrate(ne, Z) } function K (pe) { const Z = {}; ['header', 'query', 'body'].forEach(Pe => { const ne = {}; try { pe.find(y()(`[data-family="${Pe}"]:visible`)).each((me, fe) => { const xe = fe.dataset.name; let Le = fe.value; if (fe.type === 'checkbox') if (fe.checked)Le = 'on'; else return !0; if (!Le && !fe.dataset.optional && fe.type !== 'checkbox') return y()(fe).addClass('border-danger'), !0; ne[xe] = Le }) } catch (me) { return }Z[Pe] = ne }); const de = pe.find(y()('[data-family="body-json"]')); return de.is(':visible') ? (Z.body = de.val(), Z.header['Content-Type'] = 'application/json') : Z.header['Content-Type'] = 'multipart/form-data', Z } function te (pe, Z, de, Pe) {
      const ne = y()(`article[data-group="${pe}"][data-name="${Z}"][data-version="${de}"]`); const me = K(ne); const fe = {}; if (fe.url = $(ne, me.query), fe.headers = me.header, fe.headers['Content-Type'] === 'application/json')fe.data = me.body; else if (fe.headers['Content-Type'] === 'multipart/form-data') { const Fe = new FormData(); for (const [Ne, De] of Object.entries(me.body))Fe.append(Ne, De); fe.data = Fe, fe.processData = !1, (Pe === 'get' || Pe === 'delete') && delete fe.headers['Content-Type'] }fe.type = Pe, fe.success = xe, fe.error = Le, y().ajax(fe), ne.find('.sample-request-response').fadeTo(200, 1), ne.find('.sample-request-response-json').html('Loading...'); function xe (Fe, Ne, De) { let Me; try { Me = JSON.parse(De.responseText), Me = JSON.stringify(Me, null, 4) } catch (We) { Me = De.responseText }ne.find('.sample-request-response-json').text(Me), m().highlightAll() } function Le (Fe, Ne, De) {
        let Me = 'Error ' + Fe.status + ': ' + De; let We; try { We = JSON.parse(Fe.responseText), We = JSON.stringify(We, null, 4) } catch (it) { We = Fe.responseText }We && (Me += `
` + We), ne.find('.sample-request-response').is(':visible') && ne.find('.sample-request-response').fadeTo(1, 0.1), ne.find('.sample-request-response').fadeTo(250, 1), ne.find('.sample-request-response-json').text(Me), m().highlightAll()
      }
    } function oe (pe, Z, de) { const Pe = y()('article[data-group="' + pe + '"][data-name="' + Z + '"][data-version="' + de + '"]'); Pe.find('.sample-request-response-json').html(''), Pe.find('.sample-request-response').hide(), Pe.find('.sample-request-input').each((me, fe) => { fe.value = fe.placeholder !== fe.dataset.name ? fe.placeholder : '' }); const ne = Pe.find('.sample-request-url'); ne.val(ne.prop('defaultValue')) } const Kt = { ca: { 'Allowed values:': 'Valors permesos:', 'Compare all with predecessor': 'Comparar tot amb versi\xF3 anterior', 'compare changes to:': 'comparar canvis amb:', 'compared to': 'comparat amb', 'Default value:': 'Valor per defecte:', Description: 'Descripci\xF3', Field: 'Camp', General: 'General', 'Generated with': 'Generat amb', Name: 'Nom', 'No response values.': 'Sense valors en la resposta.', optional: 'opcional', Parameter: 'Par\xE0metre', 'Permission:': 'Permisos:', Response: 'Resposta', Send: 'Enviar', 'Send a Sample Request': "Enviar una petici\xF3 d'exemple", 'show up to version:': 'mostrar versi\xF3:', 'Size range:': 'Tamany de rang:', Type: 'Tipus', url: 'url' }, cs: { 'Allowed values:': 'Povolen\xE9 hodnoty:', 'Compare all with predecessor': 'Porovnat v\u0161e s p\u0159edchoz\xEDmi verzemi', 'compare changes to:': 'porovnat zm\u011Bny s:', 'compared to': 'porovnat s', 'Default value:': 'V\xFDchoz\xED hodnota:', Description: 'Popis', Field: 'Pole', General: 'Obecn\xE9', 'Generated with': 'Vygenerov\xE1no pomoc\xED', Name: 'N\xE1zev', 'No response values.': 'Nebyly vr\xE1ceny \u017E\xE1dn\xE9 hodnoty.', optional: 'voliteln\xE9', Parameter: 'Parametr', 'Permission:': 'Opr\xE1vn\u011Bn\xED:', Response: 'Odpov\u011B\u010F', Send: 'Odeslat', 'Send a Sample Request': 'Odeslat uk\xE1zkov\xFD po\u017Eadavek', 'show up to version:': 'zobrazit po verzi:', 'Size range:': 'Rozsah velikosti:', Type: 'Typ', url: 'url' }, de: { 'Allowed values:': 'Erlaubte Werte:', 'Compare all with predecessor': 'Vergleiche alle mit ihren Vorg\xE4ngern', 'compare changes to:': 'vergleiche \xC4nderungen mit:', 'compared to': 'verglichen mit', 'Default value:': 'Standardwert:', Description: 'Beschreibung', Field: 'Feld', General: 'Allgemein', 'Generated with': 'Erstellt mit', Name: 'Name', 'No response values.': 'Keine R\xFCckgabewerte.', optional: 'optional', Parameter: 'Parameter', 'Permission:': 'Berechtigung:', Response: 'Antwort', Send: 'Senden', 'Send a Sample Request': 'Eine Beispielanfrage senden', 'show up to version:': 'zeige bis zur Version:', 'Size range:': 'Gr\xF6\xDFenbereich:', Type: 'Typ', url: 'url' }, es: { 'Allowed values:': 'Valores permitidos:', 'Compare all with predecessor': 'Comparar todo con versi\xF3n anterior', 'compare changes to:': 'comparar cambios con:', 'compared to': 'comparado con', 'Default value:': 'Valor por defecto:', Description: 'Descripci\xF3n', Field: 'Campo', General: 'General', 'Generated with': 'Generado con', Name: 'Nombre', 'No response values.': 'Sin valores en la respuesta.', optional: 'opcional', Parameter: 'Par\xE1metro', 'Permission:': 'Permisos:', Response: 'Respuesta', Send: 'Enviar', 'Send a Sample Request': 'Enviar una petici\xF3n de ejemplo', 'show up to version:': 'mostrar a versi\xF3n:', 'Size range:': 'Tama\xF1o de rango:', Type: 'Tipo', url: 'url' }, en: {}, fr: { 'Allowed values:': 'Valeurs autoris\xE9es :', Body: 'Corps', 'Compare all with predecessor': 'Tout comparer avec ...', 'compare changes to:': 'comparer les changements \xE0 :', 'compared to': 'comparer \xE0', 'Default value:': 'Valeur par d\xE9faut :', Description: 'Description', Field: 'Champ', General: 'G\xE9n\xE9ral', 'Generated with': 'G\xE9n\xE9r\xE9 avec', Header: 'En-t\xEAte', Headers: 'En-t\xEAtes', Name: 'Nom', 'No response values.': 'Aucune valeur de r\xE9ponse.', 'No value': 'Aucune valeur', optional: 'optionnel', Parameter: 'Param\xE8tre', Parameters: 'Param\xE8tres', 'Permission:': 'Permission :', 'Query Parameter(s)': 'Param\xE8tre(s) de la requ\xEAte', 'Query Parameters': 'Param\xE8tres de la requ\xEAte', 'Request Body': 'Corps de la requ\xEAte', required: 'requis', Response: 'R\xE9ponse', Send: 'Envoyer', 'Send a Sample Request': 'Envoyer une requ\xEAte repr\xE9sentative', 'show up to version:': 'Montrer \xE0 partir de la version :', 'Size range:': 'Ordre de grandeur :', Type: 'Type', url: 'url' }, it: { 'Allowed values:': 'Valori permessi:', 'Compare all with predecessor': 'Confronta tutto con versioni precedenti', 'compare changes to:': 'confronta modifiche con:', 'compared to': 'confrontato con', 'Default value:': 'Valore predefinito:', Description: 'Descrizione', Field: 'Campo', General: 'Generale', 'Generated with': 'Creato con', Name: 'Nome', 'No response values.': 'Nessun valore di risposta.', optional: 'opzionale', Parameter: 'Parametro', 'Permission:': 'Permessi:', Response: 'Risposta', Send: 'Invia', 'Send a Sample Request': 'Invia una richiesta di esempio', 'show up to version:': 'mostra alla versione:', 'Size range:': 'Intervallo dimensione:', Type: 'Tipo', url: 'url' }, nl: { 'Allowed values:': 'Toegestane waarden:', 'Compare all with predecessor': 'Vergelijk alle met voorgaande versie', 'compare changes to:': 'vergelijk veranderingen met:', 'compared to': 'vergelijk met', 'Default value:': 'Standaard waarde:', Description: 'Omschrijving', Field: 'Veld', General: 'Algemeen', 'Generated with': 'Gegenereerd met', Name: 'Naam', 'No response values.': 'Geen response waardes.', optional: 'optioneel', Parameter: 'Parameter', 'Permission:': 'Permissie:', Response: 'Antwoorden', Send: 'Sturen', 'Send a Sample Request': 'Stuur een sample aanvragen', 'show up to version:': 'toon tot en met versie:', 'Size range:': 'Maatbereik:', Type: 'Type', url: 'url' }, pl: { 'Allowed values:': 'Dozwolone warto\u015Bci:', 'Compare all with predecessor': 'Por\xF3wnaj z poprzednimi wersjami', 'compare changes to:': 'por\xF3wnaj zmiany do:', 'compared to': 'por\xF3wnaj do:', 'Default value:': 'Warto\u015B\u0107 domy\u015Blna:', Description: 'Opis', Field: 'Pole', General: 'Generalnie', 'Generated with': 'Wygenerowano z', Name: 'Nazwa', 'No response values.': 'Brak odpowiedzi.', optional: 'opcjonalny', Parameter: 'Parametr', 'Permission:': 'Uprawnienia:', Response: 'Odpowied\u017A', Send: 'Wy\u015Blij', 'Send a Sample Request': 'Wy\u015Blij przyk\u0142adowe \u017C\u0105danie', 'show up to version:': 'poka\u017C do wersji:', 'Size range:': 'Zakres rozmiaru:', Type: 'Typ', url: 'url' }, pt: { 'Allowed values:': 'Valores permitidos:', 'Compare all with predecessor': 'Compare todos com antecessores', 'compare changes to:': 'comparar altera\xE7\xF5es com:', 'compared to': 'comparado com', 'Default value:': 'Valor padr\xE3o:', Description: 'Descri\xE7\xE3o', Field: 'Campo', General: 'Geral', 'Generated with': 'Gerado com', Name: 'Nome', 'No response values.': 'Sem valores de resposta.', optional: 'opcional', Parameter: 'Par\xE2metro', 'Permission:': 'Permiss\xE3o:', Response: 'Resposta', Send: 'Enviar', 'Send a Sample Request': 'Enviar um Exemplo de Pedido', 'show up to version:': 'aparecer para a vers\xE3o:', 'Size range:': 'Faixa de tamanho:', Type: 'Tipo', url: 'url' }, ro: { 'Allowed values:': 'Valori permise:', 'Compare all with predecessor': 'Compar\u0103 toate cu versiunea precedent\u0103', 'compare changes to:': 'compar\u0103 cu versiunea:', 'compared to': 'comparat cu', 'Default value:': 'Valoare implicit\u0103:', Description: 'Descriere', Field: 'C\xE2mp', General: 'General', 'Generated with': 'Generat cu', Name: 'Nume', 'No response values.': 'Nici o valoare returnat\u0103.', optional: 'op\u021Bional', Parameter: 'Parametru', 'Permission:': 'Permisiune:', Response: 'R\u0103spuns', Send: 'Trimite', 'Send a Sample Request': 'Trimite o cerere de prob\u0103', 'show up to version:': 'arat\u0103 p\xE2n\u0103 la versiunea:', 'Size range:': 'Interval permis:', Type: 'Tip', url: 'url' }, ru: { 'Allowed values:': '\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F:', 'Compare all with predecessor': '\u0421\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0441 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0439 \u0432\u0435\u0440\u0441\u0438\u0435\u0439', 'compare changes to:': '\u0441\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0441:', 'compared to': '\u0432 \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0438 \u0441', 'Default value:': '\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:', Description: '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435', Field: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435', General: '\u041E\u0431\u0449\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F', 'Generated with': '\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E', Name: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435', 'No response values.': '\u041D\u0435\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u043E\u0442\u0432\u0435\u0442\u0430.', optional: '\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439', Parameter: '\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440', 'Permission:': '\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043E:', Response: '\u041E\u0442\u0432\u0435\u0442', Send: '\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C', 'Send a Sample Request': '\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441', 'show up to version:': '\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0435\u0440\u0441\u0438\u044E:', 'Size range:': '\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F:', Type: '\u0422\u0438\u043F', url: 'URL' }, tr: { 'Allowed values:': '\u0130zin verilen de\u011Ferler:', 'Compare all with predecessor': 'T\xFCm\xFCn\xFC \xF6ncekiler ile kar\u015F\u0131la\u015Ft\u0131r', 'compare changes to:': 'de\u011Fi\u015Fiklikleri kar\u015F\u0131la\u015Ft\u0131r:', 'compared to': 'kar\u015F\u0131la\u015Ft\u0131r', 'Default value:': 'Varsay\u0131lan de\u011Fer:', Description: 'A\xE7\u0131klama', Field: 'Alan', General: 'Genel', 'Generated with': 'Olu\u015Fturan', Name: '\u0130sim', 'No response values.': 'D\xF6n\xFC\u015F verisi yok.', optional: 'opsiyonel', Parameter: 'Parametre', 'Permission:': '\u0130zin:', Response: 'D\xF6n\xFC\u015F', Send: 'G\xF6nder', 'Send a Sample Request': '\xD6rnek istek g\xF6nder', 'show up to version:': 'bu versiyona kadar g\xF6ster:', 'Size range:': 'Boyut aral\u0131\u011F\u0131:', Type: 'Tip', url: 'url' }, vi: { 'Allowed values:': 'Gi\xE1 tr\u1ECB ch\u1EA5p nh\u1EADn:', 'Compare all with predecessor': 'So s\xE1nh v\u1EDBi t\u1EA5t c\u1EA3 phi\xEAn b\u1EA3n tr\u01B0\u1EDBc', 'compare changes to:': 'so s\xE1nh s\u1EF1 thay \u0111\u1ED5i v\u1EDBi:', 'compared to': 'so s\xE1nh v\u1EDBi', 'Default value:': 'Gi\xE1 tr\u1ECB m\u1EB7c \u0111\u1ECBnh:', Description: 'Ch\xFA th\xEDch', Field: 'Tr\u01B0\u1EDDng d\u1EEF li\u1EC7u', General: 'T\u1ED5ng quan', 'Generated with': '\u0110\u01B0\u1EE3c t\u1EA1o b\u1EDFi', Name: 'T\xEAn', 'No response values.': 'Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3 tr\u1EA3 v\u1EC1.', optional: 'T\xF9y ch\u1ECDn', Parameter: 'Tham s\u1ED1', 'Permission:': 'Quy\u1EC1n h\u1EA1n:', Response: 'K\u1EBFt qu\u1EA3', Send: 'G\u1EEDi', 'Send a Sample Request': 'G\u1EEDi m\u1ED9t y\xEAu c\u1EA7u m\u1EABu', 'show up to version:': 'hi\u1EC3n th\u1ECB phi\xEAn b\u1EA3n:', 'Size range:': 'K\xEDch c\u1EE1:', Type: 'Ki\u1EC3u', url: 'li\xEAn k\u1EBFt' }, zh: { 'Allowed values:': '\u5141\u8BB8\u503C:', Body: '\u8BF7\u6C42\u4F53', 'Compare all with predecessor': '\u4E0E\u6240\u6709\u4E4B\u524D\u7684\u7248\u672C\u6BD4\u8F83', 'compare changes to:': '\u5C06\u5F53\u524D\u7248\u672C\u4E0E\u6307\u5B9A\u7248\u672C\u6BD4\u8F83:', 'compared to': '\u76F8\u6BD4\u4E8E', 'Default value:': '\u9ED8\u8BA4\u503C:', Description: '\u63CF\u8FF0', Field: '\u5B57\u6BB5', General: '\u6982\u8981', 'Generated with': '\u6784\u5EFA\u4E8E', Name: '\u540D\u79F0', 'No response values.': '\u65E0\u8FD4\u56DE\u503C.', optional: '\u53EF\u9009', Parameter: '\u53C2\u6570', Parameters: '\u53C2\u6570', Headers: '\u8BF7\u6C42\u5934', 'Permission:': '\u6743\u9650:', Response: '\u8FD4\u56DE', required: '\u5FC5\u9700\u7684', Send: '\u53D1\u9001', 'Send a Sample Request': '\u53D1\u9001\u793A\u4F8B\u8BF7\u6C42', 'show up to version:': '\u663E\u793A\u6307\u5B9A\u7248\u672C:', 'Size range:': '\u53D6\u503C\u8303\u56F4:', Type: '\u7C7B\u578B', url: '\u5730\u5740' } }; const Mn = ((_t = window.navigator.language) != null ? _t : 'en-GB').toLowerCase().substr(0, 2); let At = Kt[Mn] ? Kt[Mn] : Kt.en; function $t (pe) { const Z = At[pe]; return Z === void 0 ? pe : Z } function vn (pe) { At = Kt[pe] } const { defaultsDeep: jt } = a; const lt = (pe, Z) => { const de = (Pe, ne, me, fe) => ({ [ne]: me + 1 < fe.length ? Pe : Z }); return pe.reduceRight(de, {}) }; const pt = pe => { let Z = {}; return pe.forEach(de => { const Pe = lt(de[0].split('.'), de[1]); Z = jt(Z, Pe) }), Cn(Z) }; function Cn (pe) { return JSON.stringify(pe, null, 4) } function nr (pe) { const Z = []; return pe.forEach(de => { let Pe; switch (de.type.toLowerCase()) { case 'string':Pe = de.defaultValue || ''; break; case 'boolean':Pe = Boolean(de.defaultValue) || !1; break; case 'number':Pe = parseInt(de.defaultValue || 0, 10); break; case 'date':Pe = de.defaultValue || new Date().toLocaleDateString(window.navigator.language); break }Z.push([de.field, Pe]) }), pt(Z) } const en = ft(2027); class vr extends en {constructor (Z) { super(); this.testMode = Z }diffMain (Z, de, Pe, ne) { return super.diff_main(this._stripHtml(Z), this._stripHtml(de), Pe, ne) }diffPrettyHtml (Z) { const de = []; const Pe = /&/g; const ne = /</g; const me = />/g; const fe = /\n/g; for (let xe = 0; xe < Z.length; xe++) { const Le = Z[xe][0]; const Ne = Z[xe][1].replace(Pe, '&amp;').replace(ne, '&lt;').replace(me, '&gt;').replace(fe, '&para;<br>'); switch (Le) { case en.DIFF_INSERT:de[xe] = '<ins>' + Ne + '</ins>'; break; case en.DIFF_DELETE:de[xe] = '<del>' + Ne + '</del>'; break; case en.DIFF_EQUAL:de[xe] = '<span>' + Ne + '</span>'; break } } return de.join('') }diffCleanupSemantic (Z) { return this.diff_cleanupSemantic(Z) }_stripHtml (Z) { if (this.testMode) return Z; const de = document.createElement('div'); return de.innerHTML = Z, de.textContent || de.innerText || '' }} function tt () { c().registerHelper('markdown', function (ne) { return ne && (ne = ne.replace(/((\[(.*?)\])?\(#)((.+?):(.+?))(\))/mg, function (me, fe, xe, Le, Fe, Ne, De) { const Me = Le || Ne + '/' + De; return '<a href="#api-' + Ne + '-' + De + '">' + Me + '</a>' }), ne) }), c().registerHelper('setInputType', function (ne) { switch (ne) { case 'File':case 'Email':case 'Color':case 'Number':case 'Date':return ne[0].toLowerCase() + ne.substring(1); case 'Boolean':return 'checkbox'; default:return 'text' } }); let pe; c().registerHelper('startTimer', function (ne) { return pe = new Date(), '' }), c().registerHelper('stopTimer', function (ne) { return console.log(new Date() - pe), '' }), c().registerHelper('__', function (ne) { return $t(ne) }), c().registerHelper('cl', function (ne) { return console.log(ne), '' }), c().registerHelper('underscoreToSpace', function (ne) { return ne.replace(/(_+)/g, ' ') }), c().registerHelper('removeDblQuotes', function (ne) { return ne.replace(/"/g, '') }), c().registerHelper('assign', function (ne) { if (arguments.length > 0) { const me = typeof arguments[1]; let fe = null; (me === 'string' || me === 'number' || me === 'boolean') && (fe = arguments[1]), c().registerHelper(ne, function () { return fe }) } return '' }), c().registerHelper('nl2br', function (ne) { return de(ne) }), c().registerHelper('ifCond', function (ne, me, fe, xe) { switch (me) { case '==':return ne == fe ? xe.fn(this) : xe.inverse(this); case '===':return ne === fe ? xe.fn(this) : xe.inverse(this); case '!=':return ne != fe ? xe.fn(this) : xe.inverse(this); case '!==':return ne !== fe ? xe.fn(this) : xe.inverse(this); case '<':return ne < fe ? xe.fn(this) : xe.inverse(this); case '<=':return ne <= fe ? xe.fn(this) : xe.inverse(this); case '>':return ne > fe ? xe.fn(this) : xe.inverse(this); case '>=':return ne >= fe ? xe.fn(this) : xe.inverse(this); case '&&':return ne && fe ? xe.fn(this) : xe.inverse(this); case '||':return ne || fe ? xe.fn(this) : xe.inverse(this); default:return xe.inverse(this) } }); const Z = {}; c().registerHelper('subTemplate', function (ne, me) { Z[ne] || (Z[ne] = c().compile(document.getElementById('template-' + ne).innerHTML)); const fe = Z[ne]; const xe = y().extend({}, this, me.hash); return new (c()).SafeString(fe(xe)) }), c().registerHelper('toLowerCase', function (ne) { return ne && typeof ne === 'string' ? ne.toLowerCase() : '' }), c().registerHelper('splitFill', function (ne, me, fe) { const xe = ne.split(me); return new Array(xe.length).join(fe) + xe[xe.length - 1] }); function de (ne) { return ('' + ne).replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, me => me.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')) }c().registerHelper('each_compare_list_field', function (ne, me, fe) { const xe = fe.hash.field; const Le = []; ne && ne.forEach(function (Ne) { const De = Ne; De.key = Ne[xe], Le.push(De) }); const Fe = []; return me && me.forEach(function (Ne) { const De = Ne; De.key = Ne[xe], Fe.push(De) }), Pe('key', Le, Fe, fe) }), c().registerHelper('each_compare_keys', function (ne, me, fe) { const xe = []; ne && Object.keys(ne).forEach(function (Ne) { const De = {}; De.value = ne[Ne], De.key = Ne, xe.push(De) }); const Le = []; return me && Object.keys(me).forEach(function (Ne) { const De = {}; De.value = me[Ne], De.key = Ne, Le.push(De) }), Pe('key', xe, Le, fe) }), c().registerHelper('body2json', function (ne, me) { return nr(ne) }), c().registerHelper('each_compare_field', function (ne, me, fe) { return Pe('field', ne, me, fe) }), c().registerHelper('each_compare_title', function (ne, me, fe) { return Pe('title', ne, me, fe) }), c().registerHelper('reformat', function (ne, me) { if (me === 'json') try { return JSON.stringify(JSON.parse(ne.trim()), null, '    ') } catch (fe) {} return ne }), c().registerHelper('showDiff', function (ne, me, fe) { let xe = ''; if (ne === me)xe = ne; else { if (!ne) return me; if (!me) return ne; const Le = new vr(); const Fe = Le.diffMain(me, ne); Le.diffCleanupSemantic(Fe), xe = Le.diffPrettyHtml(Fe), xe = xe.replace(/&para;/gm, '') } return fe === 'nl2br' && (xe = de(xe)), xe }); function Pe (ne, me, fe, xe) { const Le = []; let Fe = 0; me && me.forEach(function (Me) { let We = !1; if (fe && fe.forEach(function (it) { if (Me[ne] === it[ne]) { const Pt = { typeSame: !0, source: Me, compare: it, index: Fe }; Le.push(Pt), We = !0, Fe++ } }), !We) { const it = { typeIns: !0, source: Me, index: Fe }; Le.push(it), Fe++ } }), fe && fe.forEach(function (Me) { let We = !1; if (me && me.forEach(function (it) { it[ne] === Me[ne] && (We = !0) }), !We) { const it = { typeDel: !0, compare: Me, index: Fe }; Le.push(it), Fe++ } }); let Ne = ''; const De = Le.length; for (const Me in Le)parseInt(Me, 10) === De - 1 && (Le[Me]._last = !0), Ne = Ne + xe.fn(Le[Me]); return Ne } }document.addEventListener('DOMContentLoaded', () => { tn(), W(), m().highlightAll() }); function tn () {
      let Ct; let pe = [{
        type: '',
        url: 'Address.detectAddressFormat()',
        title: 'detectAddressFormat()',
        name: 'detectAddressFormat',
        group: 'Address',
        description: '<p>Detect address format.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr

// cashaddr w/ no prefix
xecjs.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr

// legacy
xecjs.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// legacy

// cashaddr testnet
xecjs.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// cashaddr

// cashaddr testnet w/ no prefix
xecjs.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// cashaddr

// legacy testnet
xecjs.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// legacy`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.detectAddressNetwork()',
        title: 'detectAddressNetwork()',
        name: 'detectAddressNetwork',
        group: 'Address',
        description: '<p>Detect address network.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet

// cashaddr w/ no prefix
xecjs.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet

// legacy
xecjs.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// mainnet

// cashaddr testnet
xecjs.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// testnet

// cashaddr testnet w/ no prefix
xecjs.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// testnet

// legacy testnet
xecjs.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// testnet`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.detectAddressType()',
        title: 'detectAddressType()',
        name: 'detectAddressType',
        group: 'Address',
        description: '<p>Detect address type.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

// cashaddr w/ no prefix
xecjs.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

// legacy
xecjs.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
// p2pkh

// cashaddr testnet
xecjs.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
// p2pkh

// cashaddr testnet w/ no prefix
xecjs.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
// p2pkh

// legacy testnet
xecjs.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
// p2pkh`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.ecashtoCashAddress()',
        title: 'ecashtoCashAddress()',
        name: 'ecashtoCashAddress',
        group: 'Address',
        description: '<p>Convert legacy to cashAddress format</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
xecjs.Address.ecashtoCashAddress('ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da')
// bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2

// mainnet no prefix
xecjs.Address.ecashtoCashAddress('ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da', false)
// qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.fromOutputScript()',
        title: 'fromOutputScript()',
        name: 'fromOutputScript',
        group: 'Address',
        description: '<p>Detect an addess from an OutputScript..</p>',
        examples: [{
          title: 'Example usage:',
          content: `const scriptBuffer = xecjs.Script.encode([
  Buffer.from("BOX", "ascii"),
  xecjs.Script.opcodes.OP_CAT,
  Buffer.from("BITBOX", "ascii"),
  xecjs.Script.opcodes.OP_EQUAL
]);
const p2sh_hash160 = xecjs.Crypto.hash160(scriptBuffer);
const scriptPubKey = xecjs.Script.scriptHash.output.encode(p2sh_hash160);

// mainnet address from output script
xecjs.Address.fromOutputScript(scriptPubKey);
// bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl

// testnet address from output script
xecjs.Address.fromOutputScript(scriptPubKey, 'testnet');
// bchtest:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqh2hmtpyr`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.fromXPub()',
        title: 'fromXPub()',
        name: 'fromXPub',
        group: 'Address',
        description: '<p>Generates an address for an extended public key (xpub).</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // generate 5 mainnet external change addresses for xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA
let xpub = 'xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA';
for(let i = 0; i <= 4; i++) {
  console.log(xecjs.Address.fromXPub(xpub, "0/" + i))
}
// bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh
// bitcoincash:qrr2suh9yjsrkl2qp3p967uhfg6u0r6xxsn9h5vuvr
// bitcoincash:qpkfg4kck99wksyss6nvaqtafeahfnyrpsj0ed372t
// bitcoincash:qppgmuuwy07g0x39sx2z0x2u8e34tvfdxvy0c2jvx7
// bitcoincash:qryj8x4s7vfsc864jm0xaak9qfe8qgk245y9ska57l

// generate 5 testnet external change addresses for tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh
let xpub = 'tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh';
for(let i = 0; i <= 4; i++) {
  console.log(xecjs.Address.fromXPub(xpub, "0/" + i))
}
// bchtest:qrth8470sc9scek9u0jj2d0349t62gxzdstw2jukl8
// bchtest:qpm56zc5re0nhms96r7p985aajthp0vxvg6e4ux3kc
// bchtest:qqtu3tf6yyd73ejhk3a2ylqynpl3mzzhwuzt299jfd
// bchtest:qzd7dvlnfukggjqsf5ju0qqwwltakfumjsck33js6m
// bchtest:qq322ataqeas4n0pdn4gz2sdereh5ae43ylk4qdvus`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.hash160ToCash()',
        title: 'hash160ToCash()',
        name: 'hash160ToCash',
        group: 'Address',
        description: '<p>Convert hash160 to cash address. Accepts either hexadecimal or buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.Address.hash160ToCash("573d93b475be4f1925f3b74ed951201b0147eac1")
'bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh'
xecjs.Address.hash160ToCash("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
'bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug'
xecjs.Address.hash160ToCash("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
'bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946'`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.hash160ToLegacy()',
        title: 'hash160ToLegacy()',
        name: 'hash160ToLegacy',
        group: 'Address',
        description: '<p>Convert hash160 to legacy address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// legacy mainnet p2pkh
xecjs.Address.hash160ToLegacy("573d93b475be4f1925f3b74ed951201b0147eac1")
// 18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG

// legacy mainnet p2sh
xecjs.Address.hash160ToLegacy("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
// 3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm

// legacy testnet p2pkh
xecjs.Address.hash160ToLegacy("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
// mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isCashAddress()',
        title: 'isCashAddress()',
        name: 'isCashAddress',
        group: 'Address',
        description: '<p>Detect if cashAddr encoded address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet cashaddr
xecjs.Address.isCashAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet w/ no cashaddr prefix
xecjs.Address.isCashAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet legacy
xecjs.Address.isCashAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
// false

// testnet w/ cashaddr prefix
xecjs.Address.isCashAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet w/ no cashaddr prefix
xecjs.Address.isCashAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet legacy
xecjs.Address.isCashAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isHash160()',
        title: 'isHash160()',
        name: 'isHash160',
        group: 'Address',
        description: '<p>Detect if an addess is a hash160.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let hash160Address = '428df38e23fc879a25819427995c3e6355b12d33';
xecjs.Address.isHash160(hash160Address);
// true

let notHash160Address = 'bitcoincash:pz8a837lttkvjksg0jjmmulqvfkgpqrcdgufy8ns5s';
xecjs.Address.isHash160(notHash160Address);
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isLegacyAddress()',
        title: 'isLegacyAddress()',
        name: 'isLegacyAddress',
        group: 'Address',
        description: '<p>Detect if legacy base58check encoded address.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.isLegacyAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// w/ no cashaddr prefix
xecjs.Address.isLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// false

// legacy
xecjs.Address.isLegacyAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
// true

// testnet w/ cashaddr prefix
xecjs.Address.isLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet w/ no cashaddr prefix
xecjs.Address.isLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// legacy testnet
xecjs.Address.isLegacyAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isMainnetAddress()',
        title: 'isMainnetAddress()',
        name: 'isMainnetAddress',
        group: 'Address',
        description: '<p>Detect if mainnet address .</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // mainnet cashaddr
xecjs.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet cashaddr w/ no prefix
xecjs.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet legacy
xecjs.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// true

// testnet cashaddr
xecjs.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet w/ no cashaddr prefix
xecjs.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet legacy
xecjs.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isP2PKHAddress()',
        title: 'isP2PKHAddress()',
        name: 'isP2PKHAddress',
        group: 'Address',
        description: '<p>Detect if p2pkh address.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// w/ no cashaddr prefix
xecjs.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// legacy
xecjs.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// true

// legacy testnet
xecjs.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true

// testnet w/ no cashaddr prefix
xecjs.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// legacy testnet
xecjs.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isP2SHAddress()',
        title: 'isP2SHAddress()',
        name: 'isP2SHAddress',
        group: 'Address',
        description: '<p>Detect if p2sh address.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // cashaddr
xecjs.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// cashaddr w/ no prefix
xecjs.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// legacy
xecjs.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// false

// cashaddr testnet
xecjs.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// cashaddr testnet w/ no prefix
xecjs.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// legacy testnet
xecjs.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isRegTestAddress()',
        title: 'isRegTestAddress()',
        name: 'isRegTestAddress',
        group: 'Address',
        description: '<p>Detect if regtest address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `  // regtest
xecjs.Address.isRegTestAddress('bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
// true

// regtest w/ no prefix
xecjs.Address.isRegTestAddress('qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
// true

// cashaddr mainnet
xecjs.Address.isRegTestAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
//false

// w/ no cashaddr prefix
xecjs.Address.isRegTestAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// legacy mainnet
xecjs.Address.isRegTestAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// false

// cashaddr testnet
xecjs.Address.isRegTestAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet w/ no cashaddr prefix
xecjs.Address.isRegTestAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.isTestnetAddress()',
        title: 'isTestnetAddress()',
        name: 'isTestnetAddress',
        group: 'Address',
        description: '<p>Detect if testnet address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `  // cashaddr mainnet
xecjs.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
//false

// w/ no cashaddr prefix
xecjs.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// legacy mainnet
xecjs.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// false

// cashaddr testnet
xecjs.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet w/ no cashaddr prefix
xecjs.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet legacy
xecjs.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.toCashAddress()',
        title: 'toCashAddress()',
        name: 'toCashAddress',
        group: 'Address',
        description: '<p>Convert legacy to cashAddress format</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
xecjs.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
// bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet no prefix
xecjs.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
// qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// tesnet
xecjs.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
// bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

// testnet no prefix
xecjs.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.toEcashAddress()',
        title: 'toEcashAddress()',
        name: 'toEcashAddress',
        group: 'Address',
        description: '<p>Convert legacy to cashAddress format</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
xecjs.Address.toEcashAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2')
// ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da

// mainnet no prefix
xecjs.Address.toEcashAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2', false)
// qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.toHash160()',
        title: 'toHash160()',
        name: 'toHash160',
        group: 'Address',
        description: '<p>Converts any address format to hash160</p>',
        examples: [{
          title: 'Example usage:',
          content: `// cash address mainnet p2pkh
xecjs.Address.toHash160("bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh")
// 573d93b475be4f1925f3b74ed951201b0147eac1

// cash address mainnet p2sh
xecjs.Address.toHash160("bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug")
// 7dc85da64d1d93ef01ef62e0221c02f512e3942f`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'Address.toLegacyAddress()',
        title: 'toLegacyAddress()',
        name: 'toLegacyAddress',
        group: 'Address',
        description: '<p>Convert cashaddr to legacy address format</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet w/ prefix
xecjs.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// mainnet w/ no prefix
xecjs.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// testnet w/ prefix
xecjs.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi

// testnet w/ no prefix
xecjs.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'address.js',
        groupTitle: 'Address'
      }, {
        type: '',
        url: 'BitcoinCash.decodeBIP21()',
        title: 'decodeBIP21()',
        name: 'decodeBIP21',
        group: 'BitcoinCash',
        description: '<p>Decodes BIP21 uri.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let bip21 =
'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone'
xecjs.BitcoinCash.decodeBIP21(bip21)
// { address: 'qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s', options: { amount: 1, label: '#BCHForEveryone' } }

let bip21 =
'bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop'
xecjs.BitcoinCash.decodeBIP21(bip21)
// { address: 'qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny',
//   options:
//    { amount: 12.5,
//      label: 'coinbase donation',
//      message: 'and ya don\\'t stop'
//    }
// }

let bip21 =
'bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix'
xecjs.BitcoinCash.decodeBIP21(bip21)
// { address: 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03', options: { amount: 42, label: 'no prefix' } }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.decodeBase58Check()',
        title: 'decodeBase58Check()',
        name: 'decodeBase58Check',
        group: 'BitcoinCash',
        description: '<p>Decodes base58Check encoded string to hex.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// decode 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar to hex
let base58check = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
xecjs.BitcoinCash.decodeBase58Check(base58check)
// 0079bd35d306f648350818470c9f18903df6e06902a026f2a7

// decode 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK to hex
let base58check = '1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK'
xecjs.BitcoinCash.decodeBase58Check(base58check)
// 006da742680accf2282df5fade8e9b7a01a517e779289b52cc

// decode 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs to hex
let base58check = '1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs'
xecjs.BitcoinCash.decodeBase58Check(base58check)
// 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672

// decode 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6 to hex
let base58check = '1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6'
xecjs.BitcoinCash.decodeBase58Check(base58check)
// 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5

// decode 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg to hex
let base58check = '1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg'
xecjs.BitcoinCash.decodeBase58Check(base58check)
// 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.decryptBIP38()',
        title: 'decryptBIP38()',
        name: 'decryptBIP38',
        group: 'BitcoinCash',
        description: '<p>BIP38 encrypt privkey WIFs.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
xecjs.BitcoinCash.decryptBIP38(
'6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G',
'9GKVkabAHBMyAf',
'mainnet'
)
// L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu

// testnet
xecjs.BitcoinCash.decryptBIP38(
'6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735',
'1EBPIyj55eR8bVUov9',
'testnet'
)
// cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.encodeBIP21()',
        title: 'encodeBIP21()',
        name: 'encodeBIP21',
        group: 'BitcoinCash',
        description: '<p>Encodes address and options as BIP21 uri.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let address = 'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s'
let options = {
amount: 1,
label: '#BCHForEveryone',
}
xecjs.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone

let address = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
let options = {
amount: 12.5,
label: 'coinbase donation',
message: "and ya don't stop",
}
xecjs.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop

let address = 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03'
let options = {
 amount: 42,
 label: 'no prefix',
}
xecjs.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.encodeBase58Check()',
        title: 'encodeBase58Check()',
        name: 'encodeBase58Check',
        group: 'BitcoinCash',
        description: '<p>Encodes hex string as base58Check.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// encode 0079bd35d306f648350818470c9f18903df6e06902a026f2a7 as base58check
let hex = '0079bd35d306f648350818470c9f18903df6e06902a026f2a7'
xecjs.BitcoinCash.encodeBase58Check(hex)
// 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar

// encode 006da742680accf2282df5fade8e9b7a01a517e779289b52cc as base58check
let hex = '006da742680accf2282df5fade8e9b7a01a517e779289b52cc'
xecjs.BitcoinCash.encodeBase58Check(hex)
// 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK

// encode 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672 as base58check
let hex = '00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672'
xecjs.BitcoinCash.encodeBase58Check(hex)
// 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs

// encode 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5 as base58check
let hex = '00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5'
xecjs.BitcoinCash.encodeBase58Check(hex)
// 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6

// encode 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b as base58check
let hex = '00db04c2e6f104997cb04c956bf25da6078e559d303127f08b'
xecjs.BitcoinCash.encodeBase58Check(hex)
// 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.encryptBIP38()',
        title: 'encryptBIP38()',
        name: 'encryptBIP38',
        group: 'BitcoinCash',
        description: '<p>BIP38 encrypt privkey WIFs.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
xecjs.BitcoinCash.encryptBIP38(
 'L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu',
'9GKVkabAHBMyAf'
)
// 6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G

// testnet
xecjs.BitcoinCash.encryptBIP38(
 'cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm',
'1EBPIyj55eR8bVUov9'
)
// 6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.getByteCount()',
        title: 'getByteCount()',
        name: 'getByteCount',
        group: 'BitcoinCash',
        description: '<p>Get byte count of transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// 1 P2PKH input
let inputs = {
P2PKH: 1,
}
// 1 P2SH output
let outputs = {
 P2SH: 1,
}
xecjs.BitcoinCash.getByteCount(inputs, outputs)
// 190

// 4 MULTISIG-P2SH 2-of-4 and 10 P2PKH inputs
let inputs = {
'MULTISIG-P2SH:2-4': 4,
P2PKH: 10,
}
// 23 P2PKH outputs
let outputs = {
P2PKH: 23,
}
xecjs.BitcoinCash.getByteCount(inputs, outputs)
// 2750

// 2 MULTISIG-P2SH 3-of-5 inputs
let inputs = {
'MULTISIG-P2SH:3-5': 2,
}
// 2 P2PKH outputs
let outputs = {
P2PKH: 2,
}
xecjs.BitcoinCash.getByteCount(inputs, outputs)
// 565

// 111 P2PKH inputs
let inputs = {
P2PKH: 111,
}
// 2 P2PKH outputs
let outputs = {
P2PKH: 2,
}
xecjs.BitcoinCash.getByteCount(inputs, outputs)
// 16506

// 10 P2PKH and 1 MULTISIG-P2SH 1-of-2 input
let inputs = {
P2PKH: 10,
'MULTISIG-P2SH:1-2': 1,
}
// 2 P2PKH and 1 P2SH outputs
let outputs = {
P2PKH: 2,
P2SH: 1,
}
xecjs.BitcoinCash.getByteCount(inputs, outputs)
// 1780`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.signMessageWithPrivKey()',
        title: 'signMessageWithPrivKey()',
        name: 'signMessageWithPrivKey',
        group: 'BitcoinCash',
        description: '<p>Sign message with private key.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.BitcoinCash.signMessageWithPrivKey(
'KxtpRDUJDiutLaTV8Vuavhb6h7zq9YV9ZKA3dU79PCgYmNVmkkvS',
'EARTH'
)
// IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.toBitcoinCash()',
        title: 'toBitcoinCash()',
        name: 'toBitcoinCash',
        group: 'BitcoinCash',
        description: '<p>Converting satoshi units to Bitcoin Cash units.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// convert 900000000 satoshis to $BCH
xecjs.BitcoinCash.toBitcoinCash(900000000)
// 9

// convert 100000000 satoshis to $BCH
xecjs.BitcoinCash.toBitcoinCash(100000000)
// 1

// convert 10000000000 satoshis to $BCH
xecjs.BitcoinCash.toBitcoinCash(10000000000)
// 100

// convert 4200000000 satoshis to $BCH
xecjs.BitcoinCash.toBitcoinCash(4200000000)
// 42

// convert 50700000000 satoshis to $BCH
xecjs.BitcoinCash.toBitcoinCash(50700000000)
// 507`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.toBits()',
        title: 'toBits()',
        name: 'toBits',
        group: 'BitcoinCash',
        description: '<p>Converting satoshi units to Bits denomination.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// convert 4242323400 satoshis to 42423.234 bits
xecjs.BitcoinCash.toBits(4242323400)
// 42423.234
// convert 100000000 satoshis to 1000 bits
xecjs.BitcoinCash.toBits(100000000)
// 1000
// convert 314000000 satoshis to 3140 bits
xecjs.BitcoinCash.toBits(314000000)
// 3140
// convert 987600000000 satoshis to 9876000 bits
xecjs.BitcoinCash.toBits(987600000000)
// 9876000
// convert 12300 satoshis to 0.123 bits
xecjs.BitcoinCash.toBits(12300)
// 0.123`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.toSatoshi()',
        title: 'toSatoshi()',
        name: 'toSatoshi',
        group: 'BitcoinCash',
        description: '<p>Converting Bitcoin Cash units to satoshi units.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// convert 9 $BCH to satoshis
xecjs.BitcoinCash.toSatoshi(9)
// 900000000

// convert 1 $BCH to satoshis
xecjs.BitcoinCash.toSatoshi(1)
// 100000000

// convert 100 $BCH to satoshis
xecjs.BitcoinCash.toSatoshi(100)
// 10000000000

// convert 42 $BCH to satoshis
xecjs.BitcoinCash.toSatoshi(42)
// 4200000000

// convert 507 $BCH to satoshis
xecjs.BitcoinCash.toSatoshi(507)
// 50700000000`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'BitcoinCash.verifyMessage()',
        title: 'verifyMessage()',
        name: 'verifyMessage',
        group: 'BitcoinCash',
        description: '<p>Verify message.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.BitcoinCash.verifyMessage(
'bitcoincash:qp2zvw3zpk5xx43w4tve7mtekd9kaxwj4uenq9eupv',
'IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=',
'EARTH'
)
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'bitcoincash.js',
        groupTitle: 'BitcoinCash'
      }, {
        type: '',
        url: 'Blockchain.getBestBlockHash()',
        title: 'getBestBlockHash()',
        name: 'getBestBlockHash',
        group: 'Blockchain',
        description: '<p>Returns the hash of the best (tip) block in the longest blockchain.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBestBlockHash = await xecjs.Blockchain.getBestBlockHash();
console.log(getBestBlockHash);
} catch(error) {
console.error(error)
}
})()
// 241decef88889efac8e6ce428a8ac696fdde5972eceed97e1fb58d6106af31d5`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getBlock()',
        title: 'getBlock()',
        name: 'getBlock',
        group: 'Blockchain',
        description: "<p>If verbose is 0, returns a string that is serialized, hex-encoded data for block 'hash'. If verbose is 1, returns an Object with information about block hash. If verbose is 2, returns an Object with information about block hash and information about tx.</p>",
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBlock = await xecjs.Blockchain.getBlock("00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09");
console.log(getBlock);
} catch(error) {
console.error(error)
}
})()

// {
//  hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
//  confirmations: 528236,
//  size: 216,
//  height: 1000,
//  version: 1,
//  versionHex: '00000001',
//  merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
//  tx:
//   [ 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33' ],
//  time: 1232346882,
//  mediantime: 1232344831,
//  nonce: 2595206198,
//  bits: '1d00ffff',
//  difficulty: 1,
//  chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
//  previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
//  nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6'
// }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getBlockCount()',
        title: 'getBlockCount()',
        name: 'getBlockCount',
        group: 'Blockchain',
        description: '<p>Returns the number of blocks in the longest blockchain.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBlockCount = await xecjs.Blockchain.getBlockCount();
console.log(getBlockCount);
} catch(error) {
console.error(error)
}
})()
// 529235`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getBlockHash()',
        title: 'getBlockHash()',
        name: 'getBlockHash',
        group: 'Blockchain',
        description: '<p>Returns hash of block in best-block-chain at height provided.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBlockHash = await xecjs.Blockchain.getBlockHash([0]);
console.log(getBlockHash);
} catch(error) {
console.error(error)
}
})()
// [ '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getBlockHeader()',
        title: 'getBlockHeader()',
        name: 'getBlockHeader',
        group: 'Blockchain',
        description: "<p>If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'. If verbose is true, returns an Object with information about blockheader hash.</p>",
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBlockHeader = await xecjs.Blockchain.getBlockHeader(["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]);
console.log(getBlockHeader);
} catch(error) {
console.error(error)
}
})()

// [{ hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
// confirmations: 528236,
// height: 1000,
// version: 1,
// versionHex: '00000001',
// merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
// time: 1232346882,
// mediantime: 1232344831,
// nonce: 2595206198,
// bits: '1d00ffff',
// difficulty: 1,
// chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
// previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
// nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getBlockchainInfo()',
        title: 'getBlockchainInfo()',
        name: 'getBlockchainInfo',
        group: 'Blockchain',
        description: '<p>Returns an object containing various state info regarding blockchain processing.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getBlockchainInfo = await xecjs.Blockchain.getBlockchainInfo();
console.log(getBlockchainInfo);
} catch(error) {
console.error(error)
}
})()

// { chain: 'main',
// blocks: 529235,
// headers: 529235,
// bestblockhash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
// difficulty: 702784497476.8376,
// mediantime: 1525727823,
// verificationprogress: 0.9999892037620548,
// chainwork: '00000000000000000000000000000000000000000099f5e1cf7d4e462a493a51',
// pruned: false,
// softforks:
//  [ { id: 'bip34', version: 2, reject: [Object] },
//    { id: 'bip66', version: 3, reject: [Object] },
//    { id: 'bip65', version: 4, reject: [Object] } ],
// bip9_softforks:
//  { csv:
//     { status: 'active',
//       startTime: 1462060800,
//       timeout: 1493596800,
//       since: 419328 } } }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getChainTips()',
        title: 'getChainTips()',
        name: 'getChainTips',
        group: 'Blockchain',
        description: '<p>Return information about all known tips in the block tree, including the main chain as well as orphaned branches.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getChainTips = await xecjs.Blockchain.getChainTips();
console.log(getChainTips);
} catch(error) {
console.error(error)
}
})()

// [ { height: 529235,
//   hash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
//   branchlen: 0,
//   status: 'active' },
// { height: 527442,
//   hash: '0000000000000000014cbf7b7aa12e52dd97db4b1ba5f39dccae37773af9272e',
//   branchlen: 1,
//   status: 'invalid' },
// { height: 526861,
//   hash: '00000000000000000225b070818bbafd95842ecbd25edf39bff54a7aa5c8fd10',
//   branchlen: 1,
//   status: 'valid-headers' } ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getDifficulty()',
        title: 'getDifficulty()',
        name: 'getDifficulty',
        group: 'Blockchain',
        description: '<p>Returns the proof-of-work difficulty as a multiple of the minimum difficulty.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getDifficulty = await xecjs.Blockchain.getDifficulty();
console.log(getDifficulty);
} catch(error) {
console.error(error)
}
})()

// 702784497476.8376`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getMempoolEntry()',
        title: 'getMempoolEntry()',
        name: 'getMempoolEntry',
        group: 'Blockchain',
        description: '<p>Returns mempool data for given transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getMempoolEntry = await xecjs.Blockchain.getMempoolEntry("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
console.log(getMempoolEntry);
} catch(error) {
console.error(error)
}
})()

// {
//   "size": 372,
//   "fee": 0.00000374,
//   "modifiedfee": 0.00000374,
//   "time": 1547738850,
//   "height": 565716,
//   "startingpriority": 26524545.3974359,
//   "currentpriority": 26524545.3974359,
//   "descendantcount": 1,
//   "descendantsize": 372,
//   "descendantfees": 374,
//   "ancestorcount": 1,
//   "ancestorsize": 372,
//   "ancestorfees": 374,
//   "depends": []
// }

(async () => {
try {
let getMempoolEntry = await xecjs.Blockchain.getMempoolEntry([
  "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
  "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"
  ]);
console.log(getMempoolEntry);
} catch(error) {
console.error(error)
}
})()

// [
//   {
//     "size": 372,
//     "fee": 0.00000374,
//     "modifiedfee": 0.00000374,
//     "time": 1547738850,
//     "height": 565716,
//     "startingpriority": 26524545.3974359,
//     "currentpriority": 26524545.3974359,
//     "descendantcount": 1,
//     "descendantsize": 372,
//     "descendantfees": 374,
//     "ancestorcount": 1,
//     "ancestorsize": 372,
//     "ancestorfees": 374,
//     "depends": []
//   },
//   {
//     "size": 372,
//     "fee": 0.00000374,
//     "modifiedfee": 0.00000374,
//     "time": 1547738850,
//     "height": 565716,
//     "startingpriority": 26524545.3974359,
//     "currentpriority": 26524545.3974359,
//     "descendantcount": 1,
//     "descendantsize": 372,
//     "descendantfees": 374,
//     "ancestorcount": 1,
//     "ancestorsize": 372,
//     "ancestorfees": 374,
//     "depends": []
//   }
// ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getMempoolInfo()',
        title: 'getMempoolInfo()',
        name: 'getMempoolInfo',
        group: 'Blockchain',
        description: '<p>Returns details on the active state of the TX memory pool.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getMempoolInfo = await xecjs.Blockchain.getMempoolInfo();
console.log(getMempoolInfo);
} catch(error) {
console.error(error)
}
})()

// { size: 257,
// bytes: 98257,
// usage: 365840,
// maxmempool: 300000000,
// mempoolminfee: 0 }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getRawMempool()',
        title: 'getRawMempool()',
        name: 'getRawMempool',
        group: 'Blockchain',
        description: '<p>Returns all transaction ids in memory pool as a json array of string transaction ids.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getRawMempool = await xecjs.Blockchain.getRawMempool(true);
console.log(getRawMempool);
} catch(error) {
console.error(error)
}
})()

// [  {'2ae541af20db6f2b50410f418af56e349d08877d685f6cf54df54658e892db7a':
//  { size: 237,
//    fee: 0.00000238,
//    modifiedfee: 0.00000238,
//    time: 1525732015,
//    height: 529235,
//    startingpriority: 0,
//    currentpriority: 0,
//    descendantcount: 10,
//    descendantsize: 2376,
//    descendantfees: 2380,
//    ancestorcount: 3,
//    ancestorsize: 712,
//    ancestorfees: 714,
//    depends:
//     [ 'e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e' ] },]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getTxOut()',
        title: 'getTxOut()',
        name: 'getTxOut',
        group: 'Blockchain',
        description: '<p>Returns details about an unspent transaction output.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getTxOut = await xecjs.Blockchain.getTxOut("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e", 1);
console.log(getTxOut);
} catch(error) {
console.error(error)
}
})()

// null`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.getTxOutProof()',
        title: 'getTxOutProof()',
        name: 'getTxOutProof',
        group: 'Blockchain',
        description: '<p>Returns a hex-encoded proof that &quot;txid&quot; was included in a block.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let getTxOutProof = await xecjs.Blockchain.getTxOutProof("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e");
console.log(getTxOutProof);
} catch(error) {
console.error(error)
}
})()

// "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"

(async () => {
try {
let getTxOutProof = await xecjs.Blockchain.getTxOutProof([
  "e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e",
  "d16662463fd98eb96c8f6898d58a4461ac3d0120f4d0aea601d72b37759f261c"
]);
console.log(getTxOutProof);
} catch(error) {
console.error(error)
}
})()

// [
//   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101",
//   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101"
// ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Blockchain.verifyTxOutProof()',
        title: 'verifyTxOutProof()',
        name: 'verifyTxOutProof',
        group: 'Blockchain',
        description: '<p>Verifies that a proof points to a transaction in a block, returning the transaction it commits to and throwing an RPC error if the block is not in our best chain.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
let verifyTxOutProof = await xecjs.Blockchain.verifyTxOutProof(proof);
console.log(verifyTxOutProof);
} catch(error) {
console.error(error)
}
})()

// [
//   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
// ]

(async () => {
try {
const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
let verifyTxOutProof = await xecjs.Blockchain.verifyTxOutProof([proof, proof]);
console.log(verifyTxOutProof);
} catch(error) {
console.error(error)
}
})()

// [
//   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
//   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
// ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'blockchain.js',
        groupTitle: 'Blockchain'
      }, {
        type: '',
        url: 'Control.getNetworkInfo()',
        title: 'getNetworkInfo()',
        name: 'getNetworkInfo',
        group: 'Control',
        description: '<p>Returns an object containing various network info.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let getInfo = await xecjs.Control.getNetworkInfo();
    console.log(getInfo);
  } catch(error) {
   console.error(error)
  }
})()

// returns
{ version: 190500,
  subversion: '/Bitcoin ABC:0.19.5(EB32.0)/',
  protocolversion: 70015,
  localservices: '0000000000000425',
  localrelay: true,
  timeoffset: 0,
  networkactive: true,
  connections: 17,
  networks:
  [ { name: 'ipv4',
      limited: false,
      reachable: true,
      proxy: '',
      proxy_randomize_credentials: false },
    { name: 'ipv6',
      limited: false,
      reachable: true,
      proxy: '',
      proxy_randomize_credentials: false },
    { name: 'onion',
      limited: true,
      reachable: false,
      proxy: '',
      proxy_randomize_credentials: false } ],
  relayfee: 0.00001,
  excessutxocharge: 0,
  warnings:
  'Warning: Unknown block versions being mined! It\\'s possible unknown rules are in effect' }}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'control.js',
        groupTitle: 'Control'
      }, {
        type: '',
        url: 'Crypto.hash160()',
        title: 'hash160()',
        name: 'hash160',
        group: 'Crypto',
        description: '<p>Utility for creating ripemd160(sha256()) hash digests of buffer encoded data.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// buffer from hex
let buffer = Buffer.from('0101010101010101', 'hex')
xecjs.Crypto.hash160(buffer)
// <Buffer ab af 11 19 f8 3e 38 42 10 fe 8e 22 2e ac 76 e2 f0 da 39 dc>

// buffer from hex
let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
xecjs.Crypto.hash160(buffer)
// <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>

// buffer from hex
let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
xecjs.Crypto.hash160(buffer)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'crypto.js',
        groupTitle: 'Crypto'
      }, {
        type: '',
        url: 'Crypto.hash256()',
        title: 'hash256()',
        name: 'hash256',
        group: 'Crypto',
        description: '<p>Utility for creating double sha256 hash digests of buffer encoded data.</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // buffer from hex
let buffer = Buffer.from('0101010101010101', 'hex')
xecjs.Crypto.hash256(buffer)
// <Buffer 72 83 38 d9 9f 35 61 75 c4 94 5e f5 cc cf a6 1b 7b 56 14 3c bb f4 26 dd d0 e0 fc 7c fe 8c 3c 23>

// buffer from hex
let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
xecjs.Crypto.hash256(buffer)
// <Buffer 7a d2 a7 4b d5 96 98 71 4a 29 91 a8 2b 71 73 6f 35 42 b2 82 8b 6a c2 4d e4 27 c4 40 da 89 d0 1a>

// buffer from hex
let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
xecjs.Crypto.hash256(buffer)
// <Buffer 68 8f 1d 02 9e d5 4c 34 d0 32 0b 83 8b f6 fc 64 f6 2f 38 a6 e9 30 a0 af 5b db 4e 27 d1 a6 84 cd>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'crypto.js',
        groupTitle: 'Crypto'
      }, {
        type: '',
        url: 'Crypto.randomBytes()',
        title: 'randomBytes()',
        name: 'randomBytes',
        group: 'Crypto',
        description: '<p>Generates cryptographically strong pseudo-random data. The size argument is a number indicating the number of bytes to generate.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.Crypto.randomBytes(16)
// <Buffer 0e 87 d2 7b c4 c3 d0 06 ef bb f3 a4 e5 ea 87 02>

xecjs.Crypto.randomBytes(20)
// <Buffer 8b 42 7d ca 52 c0 77 69 a3 f2 32 90 6b a5 a8 50 56 e2 47 0f>

xecjs.Crypto.randomBytes(24)
// <Buffer 28 69 fc 81 f7 a8 dd 5e 25 92 c4 7b 87 31 02 e8 b3 4c 92 fa c4 c9 1a e2>

xecjs.Crypto.randomBytes(28)
// <Buffer 80 53 dd 21 b6 02 a9 c7 8f 1c 1d 64 1b 6e 21 3e 3f 01 e1 0f aa 6c 59 50 3a b3 41 a6>

xecjs.Crypto.randomBytes(32)
// <Buffer ec 44 73 72 ea 48 3e 08 a5 0a 62 b8 40 0f 69 64 a7 75 35 af 20 3d e1 6d ce 3b f9 37 11 19 2b c6>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'crypto.js',
        groupTitle: 'Crypto'
      }, {
        type: '',
        url: 'Crypto.ripemd160()',
        title: 'ripemd160()',
        name: 'ripemd160',
        group: 'Crypto',
        description: '<p>Utility for creating ripemd160 hash digests of data</p>',
        examples: [{
          title: 'Example usage:',
          content: `  // buffer from hex
let buffer = Buffer.from('0101010101010101', 'hex')
xecjs.Crypto.ripemd160(buffer)
// <Buffer 58 25 70 1b 4b 97 67 fd 35 06 3b 28 6d ca 35 82 85 3e 06 30>

// buffer from hex
let buffer = Buffer.from('75618d82d1f6251f2ef1f42f5f0d5040330948a707ff6d69720dbdcb00b48aab', 'hex')
xecjs.Crypto.ripemd160(buffer)
// <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>

// buffer from hex
let buffer = Buffer.from('978c09dd46091d1922fa01e9f4a975b91a371f26ba8399de27d53801152121de', 'hex')
xecjs.Crypto.ripemd160(buffer)
// <Buffer 5f 95 6a 88 86 30 51 ea 52 15 d8 97 0c ed 8e 21 8e b6 15 cf>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'crypto.js',
        groupTitle: 'Crypto'
      }, {
        type: '',
        url: 'Crypto.sha256()',
        title: 'sha256()',
        name: 'sha256',
        group: 'Crypto',
        description: '<p>Utility for creating sha256 hash digests of data</p>',
        examples: [{
          title: 'Example usage:',
          content: ` // buffer from hex
let buffer = Buffer.from('0101010101010101', 'hex')
xecjs.Crypto.sha256(buffer)
// <Buffer c0 35 7a 32 ed 1f 6a 03 be 92 dd 09 44 76 f7 f1 a2 e2 14 ec>

// buffer from hex
let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
xecjs.Crypto.sha256(buffer)
// <Buffer 98 ee ed 79 8e e9 58 d1 65 3e df 2d 85 7d 4a ea ba 97 19 32>

// buffer from hex
let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
xecjs.Crypto.sha256(buffer)
// <Buffer 97 8c 09 dd 46 09 1d 19 22 fa 01 e9 f4 a9 75 b9 1a 37 1f 26 ba 83 99 de 27 d5 38 01 15 21 21 de>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'crypto.js',
        groupTitle: 'Crypto'
      }, {
        type: '',
        url: 'DSProof.getDSProof()',
        title: 'getDSProof()',
        name: 'getDSProof',
        group: 'DSProof',
        description: "<p>Checks if a transaction generated a double-spend proof.</p> <p>If a double-spend is attempted, one of the transactions will generate a 'double spend proof'. This call can be used to check if a transaction generated such a proof.</p> <p>Merchants should wait 3-5 seconds after receiving notification of a transaction before calling this endpoint, to see if the TXID generated a proof. If this method returns no data, then the TX can be considered 'safe' and not a double spend. If proof data is returned by this method, then the transaction generated a proof and can be considered a 'double spend'.</p>",
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    const txid = 'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
    const result = await xecjs.DSProof.getDSProof(txid)
    console.log(result);
  } catch(error) {
   console.error(error)
  }
})()

// returns
null`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'dsproof.js',
        groupTitle: 'DSProof'
      }, {
        type: '',
        url: 'Ecpair.fromPublicKey()',
        title: 'fromPublicKey()',
        name: 'fromPublicKey',
        group: 'ECPair',
        description: '<p>Generates an ECPair from a public key buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create ECPair from mainnet pubkeyBuffer
let pubkeyBuffer = Buffer.from("02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
xecjs.ECPair.fromPublicKey(pubkeyBuffer);

// create ECPair from testnet pubkeyBuffer
let pubkeyBuffer = Buffer.from("024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6", 'hex');
xecjs.ECPair.fromPublicKey(pubkeyBuffer);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Ecpair.fromWIF()',
        title: 'fromWIF()',
        name: 'fromWIF',
        group: 'ECPair',
        description: '<p>Generates an ECPair from a private key in wallet import format (WIF). Follow these steps to go from a private key to a WIF. This method only works with a compressed private key.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet WIF
let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
xecjs.ECPair.fromWIF(wif);

// testnet WIF
let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW'
xecjs.ECPair.fromWIF(wif)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Ecpair.toCashAddress()',
        title: 'toCashAddress()',
        name: 'toCashAddress',
        group: 'ECPair',
        description: '<p>Get cash address of ECPair.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet wif
let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// to legacy address
xecjs.ECPair.toCashAddress(ecpair);
// bitcoincash:qz9nq206kteyv2t7trhdr4vzzkej60kqtytn7sxkxm

// testnet wif
let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// to legacy address
xecjs.ECPair.toCashAddress(ecpair);
// bchtest:qqzly4vrcxcjw62u4yq4nv86ltk2mc9v0yvq8mvj6m`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Ecpair.toLegacyAddress()',
        title: 'toLegacyAddress()',
        name: 'toLegacyAddress',
        group: 'ECPair',
        description: '<p>Get legacy address of ECPair.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet wif
let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// to legacy address
xecjs.ECPair.toLegacyAddress(ecpair);
// 1DgxdA5bbMcCNWg3yB2MgKqFazV92BXgxK

// testnet wif
let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// to legacy address
xecjs.ECPair.toLegacyAddress(ecpair);
// mg4PygFcXoyNJGJkM2Dcpe25av9wXzz1My`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Ecpair.toPublicKey()',
        title: 'toPublicKey()',
        name: 'toPublicKey',
        group: 'ECPair',
        description: '<p>Get the public key of an ECPair as a buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create ecpair from mainnet public key buffer
let ecpair = xecjs.ECPair.fromPublicKey(Buffer.from('02d305772e0873fba6c1c7ff353ce374233316eb5820acd7ff3d7d9b82d514126b', 'hex'));
// create public key buffer
xecjs.ECPair.toPublicKey(ecpair);
//

// create ecpair from testnet public key buffer
let ecpair = xecjs.ECPair.fromPublicKey(Buffer.from('024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6', 'hex'));
// create public key buffer
xecjs.ECPair.toPublicKey(ecpair);
//`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Ecpair.toWIF()',
        title: 'toWIF()',
        name: 'toWIF',
        group: 'ECPair',
        description: '<p>Gets a private key in wallet import format from an ECPair.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet wif
let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// wif from ecpair
xecjs.ECPair.toWIF(ecpair);
// L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1

// testnet wif
let wif = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
// ecpair from wif
let ecpair = xecjs.ECPair.fromWIF(wif);
// wif from ecpair
xecjs.ECPair.toWIF(ecpair);
// cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecpair.js',
        groupTitle: 'ECPair'
      }, {
        type: '',
        url: 'Electrumx.balance()',
        title: 'balance()',
        name: 'ElectrumX_Balance',
        group: 'ElectrumX',
        description: '<p>Return a list of balances for an address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let balance = await xecjs.Electrumx.balance('bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf');
    console.log(balance);
  } catch(error) {
   console.error(error)
  }
})()

  balance = {
    "success": true,
    "balance": {
      "confirmed": 1000,
      "unconfirmed": 0
    }
  }

(async () => {
  try {
    let balance = await xecjs.Electrumx.balance(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
    console.log(balance);
  } catch(error) {
   console.error(error)
  }
})()

  balance = {
    "success": true,
    "balances": [
      {
        "balance": {
          "confirmed": 7000,
          "unconfirmed": 0
        },
        "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      },
      {
        "balance": {
          "confirmed": 0,
          "unconfirmed": 0
        },
        "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      }
    ]
  }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.blockHeader()',
        title: 'blockHeader()',
        name: 'ElectrumX_Block_headers',
        group: 'ElectrumX',
        description: '<p>Return block headers for a given height</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let headers = await xecjs.Electrumx.blockHeaders(42);
    console.log(headers);
  } catch(error) {
   console.error(error)
  }
})()

headers = {
 "success": true,
 "headers": [
   "010000008b52bbd72c2f49569059f559c1b1794de5192e4f7d6d2b03c7482bad0000000083e4f8a9d502ed0c419075c1abb5d56f878a2e9079e5612bfb76a2dc37d9c42741dd6849ffff001d2b909dd6",
   "01000000f528fac1bcb685d0cd6c792320af0300a5ce15d687c7149548904e31000000004e8985a786d864f21e9cbb7cbdf4bc9265fe681b7a0893ac55a8e919ce035c2f85de6849ffff001d385ccb7c"
 ]
}

(async () => {
  try {
    let headers = await xecjs.Electrumx.blockHeaders(42, 1);
    console.log(headers);
  } catch(error) {
   console.error(error)
  }
})()

headers = {
 "success": true,
 "headers": [
   "010000008b52bbd72c2f49569059f559c1b1794de5192e4f7d6d2b03c7482bad0000000083e4f8a9d502ed0c419075c1abb5d56f878a2e9079e5612bfb76a2dc37d9c42741dd6849ffff001d2b909dd6"
 ]
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, { type: '', url: 'Electrumx.broadcast()', title: 'broadcast()', name: 'ElectrumX_Broadcast', group: 'ElectrumX', description: '<p>Broadcast a raw transaction and return the transaction ID on success or error on failure.</p> <p>(async () =&gt; { try { const txHex = &quot;020000000265d13ef402840c8a51f39779afb7ae4d49e4b0a3c24a3d0e7742038f2c679667010000006441dd1dd72770cadede1a7fd0363574846c48468a398ddfa41a9677c74cac8d2652b682743725a3b08c6c2021a629011e11a264d9036e9d5311e35b5f4937ca7b4e4121020797d8fd4d2fa6fd7cdeabe2526bfea2b90525d6e8ad506ec4ee3c53885aa309ffffffff65d13ef402840c8a51f39779afb7ae4d49e4b0a3c24a3d0e7742038f2c679667000000006441347d7f218c11c04487c1ad8baac28928fb10e5054cd4494b94d078cfa04ccf68e064fb188127ff656c0b98e9ce87f036d183925d0d0860605877d61e90375f774121028a53f95eb631b460854fc836b2e5d31cad16364b4dc3d970babfbdcc3f2e4954ffffffff035ac355000000000017a914189ce02e332548f4804bac65cba68202c9dbf822878dfd0800000000001976a914285bb350881b21ac89724c6fb6dc914d096cd53b88acf9ef3100000000001976a91445f1f1c4a9b9419a5088a3e9c24a293d7a150e6488ac00000000&quot; let result = await xecjs.Electrumx.broadcast(txHex) console.log(result); } catch(error) { console.error(error) } })()</p> <p>result = { &quot;success&quot;: true, &quot;txid&quot;: &quot;...&quot; }</p>', version: '0.0.0', filename: 'electrumx.js', groupTitle: 'ElectrumX' }, {
        type: '',
        url: 'Electrumx.transactions()',
        title: 'transactions()',
        name: 'ElectrumX_Transactions',
        group: 'ElectrumX',
        description: '<p>Return a transaction history for an address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let transactions = await xecjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v');
    console.log(utxo);
  } catch(error) {
   console.error(error)
  }
})()

  {
    "success": true,
    "transactions": [
      {
        "height": 560430,
        "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
      },
      {
        "height": 560534,
        "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
      }
    ]
  }

(async () => {
  try {
    let transactions = await xecjs.Electrumx.transactions(['bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
    console.log(utxo);
  } catch(error) {
   console.error(error)
  }
})()

  transactions = {
    "success": true,
    "transactions": [
      {
        "transactions": [
          {
            "height": 631219,
            "tx_hash": "ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f"
          }
        ],
        "address": "bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj"
      },
      {
        "transactions": [
          {
            "height": 560430,
            "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
          },
          {
            "height": 560534,
            "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
          }
        ],
        "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      }
    ]
  }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.unconfirmed()',
        title: 'unconfirmed()',
        name: 'ElectrumX_Unconfirmed',
        group: 'ElectrumX',
        description: '<p>Return a list of unconfirmed uxtos (mempool) for an address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `   (async () => {
  try {
    let mempool = await xecjs.Electrumx.unconfirmed('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
    console.log(mempool);
  } catch(error) {
   console.error(error)
  }
})()

mempool = {
 "success": true,
 "utxos": [
   {
     "height": 602405,
     "tx_hash": "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
     "fee": 24310
   }
 ]
}

(async () => {
  try {
    let mempool = await xecjs.Electrumx.unconfirmed(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
    console.log(mempool);
  } catch(error) {
   console.error(error)
  }
})()

  mempool = {
    "success": true,
    "utxos": [
      {
        "utxos": [
          {
            "height": 604392,
            "tx_hash": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
            "fee": 24310
          },
          {
            "height": 630834,
            "tx_hash": "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
            "fee": 3000
          }
        ],
        "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      },
      {
        "utxos": [],
        "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      }
    ]
  }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.utxo()',
        title: 'utxo()',
        name: 'ElectrumX_Utxo',
        group: 'ElectrumX',
        description: '<p>Return a list of uxtos for an address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `   (async () => {
  try {
    let utxo = await xecjs.Electrumx.utxo('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
    console.log(utxo);
  } catch(error) {
   console.error(error)
  }
})()

utxo = {
 "success": true,
 "utxos": [
   {
     "height": 602405,
    "tx_hash": "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
     "tx_pos": 0,
     "value": 1000
   }
 ]
}

(async () => {
  try {
    let utxo = await xecjs.Electrumx.utxo(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
    console.log(utxo);
  } catch(error) {
   console.error(error)
  }
})()

  utxos = {
    "success": true,
    "utxos": [
      {
        "utxos": [
          {
            "height": 604392,
            "tx_hash": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
            "tx_pos": 0,
            "value": 1000
          },
          {
            "height": 630834,
            "tx_hash": "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
            "tx_pos": 0,
            "value": 6000
          }
        ],
        "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      },
      {
        "utxos": [],
        "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      }
    ]
  }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.sortAllTxs()',
        title: 'sortAllTxs()',
        name: 'ElectrumX_sortAllTxs',
        group: 'ElectrumX',
        description: "<p>Sort the output of Electrum.transactions() by block height.</p> <p>A simple sort function for the output of Electrum.transactions(). Assumes that unconfirmed transactions will make it into the next block. Any unconfirmed transactions have their block height with the height of the next block. Returns a Promise.</p> <p>Sorts in 'ASCENDING' order by default, or 'DESCENDING' can be specified.</p>",
        examples: [{
          title: 'Example usage:',
          content: `   (async () => {
     const txs = await xecjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v')
     const sortedTxs = await xecjs.Electrumx.sortAllTxs(txs.transactions, 'ASCENDING')
     console.log(sortedTxs)
   })()

//   [
//     {
//       "height": 560430,
//       "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
//     },
//     {
//       "height": 560534,
//       "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
//     }
//   ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.sortConfTxs()',
        title: 'sortConfTxs()',
        name: 'ElectrumX_sortConfTxs',
        group: 'ElectrumX',
        description: "<p>Sort the output of Electrum.transactions() by block height.</p> <p>A simple sort function for the output of Electrum.transactions(). Ignores unconfirmed transactions.</p> <p>Sorts in 'DESCENDING' order by default, or 'ASCENDING' can be specified. Descending makes the first element the newest (largest block height).</p>",
        examples: [{
          title: 'Example usage:',
          content: `   (async () => {
     const txs = await xecjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v')
     const sortedTxs = xecjs.Electrumx.sortConfTxs(txs.transactions, 'ASCENDING')
     console.log(sortedTxs)
   })()

//   [
//     {
//       "height": 560430,
//       "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
//     },
//     {
//       "height": 560534,
//       "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
//     }
//   ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'Electrumx.txData()',
        title: 'txData()',
        name: 'ElectrumX_txData',
        group: 'ElectrumX',
        description: '<p>Returns an object with transaction details of the TXID</p>',
        examples: [{
          title: 'Example usage:',
          content: `   (async () => {
  try {
    let result = await xecjs.Electrumx.txData('4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251')
    console.log(result);
  } catch(error) {
   console.error(error)
  }
})()

result = {
  "success": true,
  "details": {
     "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
     "blocktime": 1578327094,
     "confirmations": 31861,
     "hash": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
     ...
     "vin": [
       {
         "scriptSig": {
         ...
     "vout": [
       {
         "n": 0,
         "scriptPubKey": {
         "addresses": [
            "bitcoincash: pqvfecpwxvj53ayqfwkxtjaxsgpvnklcyg8xewk9hl"
         ],
       }
     ...
}

   (async () => {
  try {
    let result = await xecjs.Electrumx.txData(['4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251', '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251'])
    console.log(result);
  } catch(error) {
   console.error(error)
  }
})()

result = {
  "transactions": [
    {
       "txid": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
       "details": {
          "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
          "blocktime": 1578327094,
          "confirmations": 31861,
          "hash": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
          ...
       }
    },
    {
       "txid": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
       "details": {
          "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
          "blocktime": 1578327094,
       ...
    }
  ]
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'electrumx.js',
        groupTitle: 'ElectrumX'
      }, {
        type: '',
        url: 'HDNode.createAccount()',
        title: 'createAccount()',
        name: 'createAccount',
        group: 'HDNode',
        description: '<p>Has getChainAddress and nextChainAddress helper methods.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create root seed buffer
let rootSeedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create master hd node
let masterHDNode = xecjs.HDNode.fromSeed(rootSeedBuffer);
// derive child node
let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
// create account
let account = xecjs.HDNode.createAccount([childNode]);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.derive()',
        title: 'derive()',
        name: 'derive',
        group: 'HDNode',
        description: '<p>Derive non hardened child HDNode</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// derive unhardened child HDNode
xecjs.HDNode.derive(hdNode, 0);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.deriveHardened()',
        title: 'deriveHardened()',
        name: 'deriveHardened',
        group: 'HDNode',
        description: '<p>Derive hardened child HDNode</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// derive hardened child HDNode
xecjs.HDNode.deriveHardened(hdNode, 0);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.derivePath()',
        title: 'derivePath()',
        name: 'derivePath',
        group: 'HDNode',
        description: '<p>Derive child HDNode from path</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// derive hardened child HDNode
xecjs.HDNode.derivePath(hdNode, "m/44'/145'/0'");`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.fromSeed()',
        title: 'fromSeed()',
        name: 'fromSeed',
        group: 'HDNode',
        description: '<p>HDNode stands for Hierarchically Deterministic node which can be used to create a HD wallet.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
xecjs.HDNode.fromSeed(seedBuffer);

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
xecjs.HDNode.fromSeed(seedBuffer);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.fromXPriv()',
        title: 'fromXPriv()',
        name: 'fromXPriv',
        group: 'HDNode',
        description: '<p>Generate HDNode from extended private key.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xpriv
xecjs.HDNode.fromXPriv('xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v');

// testnet xpriv
xecjs.HDNode.fromXPriv('tprv8gQ3zr1F5pRHMebqqhorrorYNvUG3XkcZjSWVs2cEtRwwJy1TRhgRx4XcF8dYHM2eyTbTCcdKYNhqgyBQphxwRoVyVKr9zuyoA8WxNDRvom');`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.fromXPub()',
        title: 'fromXPub()',
        name: 'fromXPub',
        group: 'HDNode',
        description: '<p>Generate HDNode from extended public key.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xpub
xecjs.HDNode.fromXPub('xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ');

// testnet xpub
xecjs.HDNode.fromXPub('tpubDD669G3VEC6xF7ddjMUTGDWewwzCCrwX933HnP4ufAELmoDn5pXGcSgPnLodjFvWQwRXkG94f77BatEDA8dfQ99yy97kRYynUpNLENEqTBo');`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.isPrivate()',
        title: 'isPrivate()',
        name: 'isPrivate',
        group: 'HDNode',
        description: '<p>Check if an HDNode can derive both public and private keys and children</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xpub
let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.isPrivate(node);
// false

// mainnet xpriv
let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
let node = xecjs.HDNode.fromXPriv(xpriv);
xecjs.HDNode.isPrivate(node);
// true

// testnet xpub
let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.isPrivate(node);
// false

// testnet xpriv
let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
let node = xecjs.HDNode.fromXPriv(xpriv);
xecjs.HDNode.isPrivate(node);
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.isPublic()',
        title: 'isPublic()',
        name: 'isPublic',
        group: 'HDNode',
        description: '<p>Check if an HDNode can only derive public keys and children</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xpub
let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.isPublic(node);
// true

// mainnet xpriv
let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
let node = xecjs.HDNode.fromXPriv(xpriv);
xecjs.HDNode.isPublic(node);
// false

// testnet xpub
let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.isPublic(node);
// true

// testnet xpriv
let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
let node = xecjs.HDNode.fromXPriv(xpriv);
xecjs.HDNode.isPublic(node);
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.sign()',
        title: 'sign()',
        name: 'sign',
        group: 'HDNode',
        description: '<p>Sign 32 byte hash encoded as a buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xpriv
let xpriv = 'xprv9z2uWrGjbYPxc728rvtMi4jt4SudRiSfYn6Tdif5XN17pJ1NTbHoHK6JePkPLY1NHXLaQcA6sWudpZDm7DwKhbsGQieAp9wx46Wbio4iXg9';
// hdnode from xpriv
let hdnode = xecjs.HDNode.fromXPriv(xpriv);
// 32 byte buffer
let buf = Buffer.from(xecjs.Crypto.sha256('EARTH'), 'hex');
// sign
xecjs.HDNode.sign(hdnode, buf);

// testnet xpriv
let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
// hdnode from xpriv
let hdnode = xecjs.HDNode.fromXPriv(xpriv);
// 32 byte buffer
let buf = Buffer.from(xecjs.Crypto.sha256('EARTH'), 'hex');
// sign
xecjs.HDNode.sign(hdnode, buf);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toCashAddress()',
        title: 'toCashAddress()',
        name: 'toCashAddress',
        group: 'HDNode',
        description: '<p>Get cash address of HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to cash address
xecjs.HDNode.toCashAddress(hdNode);
// bitcoincash:qqrz6kqw6nvhwgwrt4g7fggepvewtkr7nukkeqf4rw

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to cash address
xecjs.HDNode.toCashAddress(hdNode);
// bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toIdentifier()',
        title: 'toIdentifier()',
        name: 'toIdentifier',
        group: 'HDNode',
        description: '<p>hash160 of Node\u2019s public key. The same value you would see in a scriptPubKey.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet
let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.toIdentifier(node);
// <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
// the same as if we hash160ed it's publicKey
let publicKeyBuffer = xecjs.HDNode.toPublicKey(node);
xecjs.Crypto.hash160(publicKeyBuffer);
// <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>

// testnet
let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
let node = xecjs.HDNode.fromXPub(xpub);
xecjs.HDNode.toIdentifier(node);
// <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
// the same as if we hash160ed it's publicKey
let publicKeyBuffer = xecjs.HDNode.toPublicKey(node);
xecjs.Crypto.hash160(publicKeyBuffer);
// <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toKeyPair()',
        title: 'toKeyPair()',
        name: 'toKeyPair',
        group: 'HDNode',
        description: '<p>Get the ECPair of an HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create root seed buffer from mnemonic
let rootSeed= await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from root seed
let hdNode = xecjs.HDNode.fromSeed(rootSeed);
// create public key buffer from HDNode
xecjs.HDNode.toKeyPair(hdNode);

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// create public key buffer from HDNode
xecjs.HDNode.toKeyPair(hdNode);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toLegacyAddress()',
        title: 'toLegacyAddress()',
        name: 'toLegacyAddress',
        group: 'HDNode',
        description: '<p>Get legacy address of HDNode</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to legacy address
xecjs.HDNode.toLegacyAddress(hdNode);
// 14apxtw2LDQmXWsS5k4JEhG93Jzjswhvma

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to cash address
xecjs.HDNode.toLegacyAddress(hdNode);
// 14mVsq3H5Ep2Jb6AqoKsmY1BFHKCBGPDLi`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toPublicKey()',
        title: 'toPublicKey()',
        name: 'toPublicKey',
        group: 'HDNode',
        description: '<p>Get the public key of an HDNode as a buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create root seed buffer from mnemonic
let rootSeed= await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from root seed
let hdNode = xecjs.HDNode.fromSeed(rootSeed);
// create public key buffer from HDNode
xecjs.HDNode.toPublicKey(hdNode);
// <Buffer 03 86 d6 d3 db ec 1a 93 8c 2c a2 63 c9 79 8f eb e9 16 09 c5 a2 9b 07 65 c4 79 1f d9 0f fa 4d 27 20>

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// create public key buffer from HDNode
xecjs.HDNode.toPublicKey(hdNode);
// <Buffer 02 d2 26 74 6e 78 03 ac 11 e0 96 c6 24 de e8 dd 62 52 e7 8e 51 56 8a c1 18 62 aa 2a 72 50 1d ea 7d>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'SLP.HDNode.toSLPAddress()',
        title: 'toSLPAddress()',
        name: 'toSLPAddress',
        group: 'HDNode',
        description: '<p>Get slp address of HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.SLP.HDNode.fromSeed(seedBuffer);
// to cash address
xecjs.SLP.HDNode.toSLPAddress(hdNode);
// simpleledger:qpst7ganm0ucmj3yl7jxvdqrm7tg3zhveg89xjh25d

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.SLP.HDNode.fromSeed(seedBuffer);
// to cash address
xecjs.SLP.HDNode.toSLPAddress(hdNode);
// simpleledger:qqxh2z2z397m4c6u9s5x6wjtku742q8rpvm6al2nrf`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toWIF()',
        title: 'toWIF()',
        name: 'toWIF',
        group: 'HDNode',
        description: '<p>Get private key in wallet import format (WIF) of HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to WIF
xecjs.HDNode.toWIF(hdNode);
// L5E8QjFnLukp8BuF4uu9gmvvSrbafioURGdBve5tA3Eq5ptzbMCJ

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to WIF
xecjs.HDNode.toWIF(hdNode);
// KwobPFhv3AuXc3ps6YtWfMVRpLBDBA7jnJddurfELTyTNcFhZYpJ`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toXPriv()',
        title: 'toXPriv()',
        name: 'toXPriv',
        group: 'HDNode',
        description: '<p>Get extended private key of HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to extended private key
xecjs.HDNode.toXPriv(hdNode);
// xprv9s21ZrQH143K2eMCcbT4qwwRhw6qZaPaEDWB792bnrxQZPoP2JUk4kfEx9eeV1uGTAWAfCqYr4wDWo52qALiukizKwQzvEyNR1fWZJi97Kv

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to extended private key
xecjs.HDNode.toXPriv(hdNode);
// xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.toXPub()',
        title: 'toXPub()',
        name: 'toXPub',
        group: 'HDNode',
        description: '<p>Get extended public key of HDNode.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create mnemonic
let mnemonic = xecjs.Mnemonic.generate(128);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to extended public key
xecjs.HDNode.toXPub(hdNode);
// xpub661MyMwAqRbcG4CnhNYoK1r1TKLwQQ1UdC3LHoWFK61rsnzh7Hx35qQ9Z53ucYcE5WvA7GEDXhqqKjSY2e6Y8n7WNVLYHpXCuuX945VPuYn

// generate entropy
let entropy = xecjs.Crypto.randomBytes(32);
// create mnemonic from entropy
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// create seed buffer from mnemonic
let seedBuffer = await xecjs.Mnemonic.toSeed(mnemonic);
// create HDNode from seed buffer
let hdNode = xecjs.HDNode.fromSeed(seedBuffer);
// to extended public key
xecjs.HDNode.toXPub(hdNode);
// xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'HDNode.verify()',
        title: 'verify()',
        name: 'verify',
        group: 'HDNode',
        description: '<p>Verify signed 32 byte hash encoded as a buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet xprivs
let xpriv1 = 'xprv9ys4cvcoU8RoqvzxGj886r4Ey3w1WfVNYH8sMnVPVzyQtaPPM6Q8pHm3D9WPWvEupGEgcJ1xLaGaZDcvKfoAurE2AzHRRRup5FuHzDr8n15';
let xpriv2 = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
// hdnodes from xprivs
let hdnode1 = xecjs.HDNode.fromXPriv(xpriv1);
let hdnode2 = xecjs.HDNode.fromXPriv(xpriv2);
// 32 byte buffer
let buf = Buffer.from(xecjs.Crypto.sha256('EARTH'), 'hex');
// sign
let signature = xecjs.HDNode.sign(hdnode1, buf);
// verify
xecjs.HDNode.verify(hdnode1, buf, signature);
// true
xecjs.HDNode.verify(hdnode2, buf, signature);
// false

// testnet xprivs
let xpriv1 = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
let xpriv2 = 'tprv8ggxJ8SG5EdqiM6Dn63QwHScQ7HS5hXqUMxSD1NEbDyPw6VtoUMFZBAohpTMsPz9cYbpHELmA4Zm79NKRvEvFdhWRX2bSmu7V7PiNb364nv';
// hdnodes from xprivs
let hdnode1 = xecjs.HDNode.fromXPriv(xpriv1);
let hdnode2 = xecjs.HDNode.fromXPriv(xpriv2);
// 32 byte buffer
let buf = Buffer.from(xecjs.Crypto.sha256('EARTH'), 'hex');
// sign
let signature = xecjs.ECPair.sign(hdnode1, buf);
// verify
xecjs.HDNode.verify(hdnode1, buf, signature);
// true
xecjs.HDNode.verify(hdnode2, buf, signature);
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'hdnode.js',
        groupTitle: 'HDNode'
      }, {
        type: '',
        url: 'Mnemonic.findNearestWord()',
        title: 'findNearestWord()',
        name: 'findNearestWord',
        group: 'Mnemonic',
        description: '<p>Returns nearest matching word from provided word list.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// english
let word = 'ab';
let wordlist = xecjs.Mnemonic.wordLists().english;
xecjs.Mnemonic.findNearestWord(word, wordlist);
// abandon

// french
let word = 'octu';
let wordlist = xecjs.Mnemonic.wordLists().french;
xecjs.Mnemonic.findNearestWord(word, wordlist);
// octupler

// spanish
let word = 'foobaro';
let wordlist = xecjs.Mnemonic.wordLists().spanish;
xecjs.Mnemonic.findNearestWord(word, wordlist);
// forro

// italian
let word = 'nv';
let wordlist = xecjs.Mnemonic.wordLists().italian;
xecjs.Mnemonic.findNearestWord(word, wordlist);
// neve`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.fromEntropy()',
        title: 'fromEntropy()',
        name: 'fromEntropy',
        group: 'Mnemonic',
        description: '<p>Create mnemonic from entropy.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// generate 16 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(16);
//
// turn entropy to 12 word mnemonic
xecjs.Mnemonic.fromEntropy(entropy)
// security question relief cruel nephew jump chest copper axis assist gift correct

// generate 20 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(20);
//
// turn entropy to 15 word mnemonic
xecjs.Mnemonic.fromEntropy(entropy)
// impact hub pattern turkey cruel adult short moment make toe one actress roast yellow hurt

// generate 24 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(24);
//
// turn entropy to 18 word mnemonic
xecjs.Mnemonic.fromEntropy(entropy)
// bid quantum chronic marriage swing affair record amateur enhance heart object mind spoon speak toast piece chef real

// generate 28 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(28);
//
// turn entropy to 21 word mnemonic
xecjs.Mnemonic.fromEntropy(entropy)
// orchard rural giant okay tape pipe luggage clap bring wear ticket slot fiscal seminar crazy robot distance current dizzy swarm barrel

// generate 32 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(32);
//
// turn entropy to 24 word mnemonic
xecjs.Mnemonic.fromEntropy(entropy)
// vibrant solution level obtain cheap damage october giant chalk cushion assist fossil spawn artist rice edit proof hotel process survey gas sausage mouse property

// generate 16 bytes of entropy
let entropy = xecjs.Crypto.randomBytes(16);
//`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.generate()',
        title: 'generate()',
        name: 'generate',
        group: 'Mnemonic',
        description: '<p>Generate BIP39 mnemonic from entropy.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// generate 12 word mnemonic
xecjs.Mnemonic.generate(128);
// boil lonely casino manage habit where total glory muffin name limit mansion

// generate 15 word mnemonic
xecjs.Mnemonic.generate(160);
// steak prevent estate save dance design close noise cheap season among train sleep ketchup gas

// generate 18 word mnemonic
xecjs.Mnemonic.generate(192);
// fever endorse purpose normal fashion desert blood robust prevent clean guard display raise virtual again unit banana rich

// generate 21 word mnemonic
xecjs.Mnemonic.generate(224);
// scan pink shock describe chicken edit budget exit camera morning awesome silk inner pair sea few flock walnut write mountain surface

// generate 24 word mnemonic
xecjs.Mnemonic.generate(256);
// disagree tide elbow citizen jazz cinnamon bridge certain april settle pact film always inmate border inform solution that submit produce cloth balcony upper maid

// generate 12 french word mnemonic
xecjs.Mnemonic.generate(128, bitbox.Mnemonic.wordLists().french);
// annonce ampleur sanglier peser acheter cultiver abroger embellir r\xE9soudre dialogue grappin lanterne

// generate 256 bit korean word mnemonic
xecjs.Mnemonic.generate(256, bitbox.Mnemonic.wordLists().korean)
// \u1100\u1175\u1102\u1173\u11BC \u1103\u1161\u11AB\u110E\u116E \u1100\u116D\u110B\u1172\u11A8 \u1107\u1175\u1102\u1161\u11AB \u1109\u1175\u110C\u1175\u11B8 \u1100\u1173\u11AB\u110B\u1172\u11A8 \u110B\u116E\u11AB\u1103\u1169\u11BC \u110F\u1169\u1106\u1175\u1103\u1175 \u1109\u116E\u11AE\u1100\u1161\u1105\u1161\u11A8 \u1100\u116A\u1106\u1169\u11A8 \u1112\u1161\u11AB\u1103\u1169\u11BC\u110B\u1161\u11AB \u110B\u1172\u110C\u1165\u11A8 \u1109\u1175\u1105\u1175\u110C\u1173 \u1109\u1161\u11B7\u110B\u116F\u11AF \u110B\u1161\u11C1\u1102\u1161\u11AF \u110B\u1172\u1102\u1161\u11AB\u1112\u1175 \u1112\u1174\u11AB\u1109\u1162\u11A8 \u1109\u1161\u1109\u1175\u11AF \u1102\u1169\u11AB\u1106\u116E\u11AB \u110C\u1161\u11BC\u1109\u1161 \u110B\u1165\u1105\u1173\u11AB \u1102\u1169\u11AB\u1106\u116E\u11AB \u110B\u1174\u1102\u1169\u11AB \u110C\u1161\u11BC\u110E\u1161`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.toEntropy()',
        title: 'toEntropy()',
        name: 'toEntropy',
        group: 'Mnemonic',
        description: '<p>Turn mnemonic to entropy.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// turn 12 word mnemonic to entropy
let mnemonic = 'security question relief cruel nephew jump chest copper axis assist gift correct';
xecjs.Mnemonic.toEntropy(mnemonic)
// <Buffer c2 d5 f2 d5 1a 49 44 f1 c9 e1 7f 10 e1 b9 87 18>

// turn 15 word mnemonic to entropy
let mnemonic = 'impact hub pattern turkey cruel adult short moment make toe one actress roast yellow hurt';
xecjs.Mnemonic.toEntropy(mnemonic)
// <Buffer 71 cd d2 85 75 53 48 07 b1 b4 77 86 9c 72 6a 81 6b b1 fe 1b>

// turn 18 word mnemonic to entropy
let mnemonic = 'bid quantum chronic marriage swing affair record amateur enhance heart object mind spoon speak toast piece chef real';
xecjs.Mnemonic.toEntropy(mnemonic)
// <Buffer 16 15 e8 a1 c4 2d c0 08 ac f0 3d 4a 8d 4a 60 46 7d 29 a1 b8 c5 23 27 56>

// turn 21 word mnemonic to entropy
let mnemonic = 'orchard rural giant okay tape pipe luggage clap bring wear ticket slot fiscal seminar crazy robot distance current dizzy swarm barrel';
xecjs.Mnemonic.toEntropy(mnemonic)
// <Buffer 9c 17 b1 86 cc fd dd 4a a1 31 4e 1c 3f 0f 86 e6 05 79 87 0c b5 d9 3f a6 c1 00 ed b1>

// turn 24 word mnemonic to entropy
let mnemonic = 'vibrant solution level obtain cheap damage october giant chalk cushion assist fossil spawn artist rice edit proof hotel process survey gas sausage mouse property';
xecjs.Mnemonic.toEntropy(mnemonic)
// <Buffer f3 79 da 02 cc 42 6e 6e 26 43 0d 25 e6 cc 37 2d fd 0a 1a 2e 4a 33 ac 4d c6 ae 6d 56 01 7f 64 2d>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.toKeypairs()',
        title: 'toKeypairs()',
        name: 'toKeypairs',
        group: 'Mnemonic',
        description: '<p>Returns an array of privateKeyWIF/publicAddress pairs. It generates the addresses as the nth external change address of the first account from that mnemonic w/ this derivation path: m/44\u2019/145\u2019/0\u2019/0/n</p>',
        examples: [{
          title: 'Example usage:',
          content: `// First create a mnemonic from 32 bytes of random entropy
let entropy = xecjs.Crypto.randomBytes(32);
// <Buffer bd 94 ad 86 be 19 5e 6c 51 b1 aa 52 b3 61 0b f8 9a 5d db 43 ac ee 8a ea 3a 38 6c ac 75 9e b5 42>
let mnemonic = xecjs.Mnemonic.fromEntropy(entropy);
// rural pistol giant label nominee curtain egg crystal famous only drill van place unit attitude oven memory fade mix sun shrug soon steak easily

// Then call toKeypairs and pass in your mnemonic and how many keypairs you'd like
xecjs.Mnemonic.toKeypairs(mnemonic, 5)
// [ { privateKeyWIF: 'KwuSgSuV6m3U1oahRQEhSQ6e4gRE6LZXNGDTETGPGotKQJdH7ADd',
//     address: 'bitcoincash:qqvk7aculs8r6t29pj23de35t43tupks2ua6wmc2hy' },
//   { privateKeyWIF: 'L34pfoBm2swLBX5vAx1ReeYbSnpsvu7DRVaiLW8e9wNEJw5p3mV5',
//     address: 'bitcoincash:qzt8ju6au2075cpzrhzwe5n96ycqnurarur5k92nd5' },
//   { privateKeyWIF: 'L2nCRgDzmTRrQzSssFvVA7xiYHBJyfj62jdDwu1bTjHKVoLGxsqs',
//     address: 'bitcoincash:qpdjwtyvqqaapykxr3pr6cty4gpww30aucam9l0qzn' },
//   { privateKeyWIF: 'KyDLLa4RZKhnBP78Ue6557B55Jmffu1y8mH8p8WKA12knJUjiq4u',
//     address: 'bitcoincash:qq8kee4k4h9fn22xya9p5u203vg69aat3usqdvkdkn' },
//   { privateKeyWIF: 'L5gB66JqhfouEtZG5aRMQ9JaVS2ggkK3YozGfzZegBupaPXqdfaz',
//     address: 'bitcoincash:qphwlpu2wzjxrjts94pn4wh778fwsu2afg2aj5her9' } ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.toSeed()',
        title: 'toSeed()',
        name: 'toSeed',
        group: 'Mnemonic',
        description: '<p>Create root seed from mnemonic. Returns a Promise.</p>',
        examples: [{
          title: 'Example usage:',
          content: `await xecjs.Mnemonic.toSeed('enable stem left method one submit coach bid inspire cluster armed bracket')
// <Buffer 0a fa b7 46 8f 0c df 79 0f 0e 44 37 45 0c 33 c3 c8 27 17 42 75 d6 13 02 c3 55 de ef 2e 69 57 e4 f5 dd 55 b6 a8 73 78 6d b8 09 36 75 af 4f 6b 2c 52 63 ... >

await xecjs.Mnemonic.toSeed('vendor talk alone sick balance tissue number armor frequent plug transfer chest', 'password');
// <Buffer 2d a5 46 52 36 a4 1c 90 bf c5 38 c9 78 16 03 26 1f 70 7c 67 44 aa e0 97 fa 96 1b a1 23 16 a0 e2 0c f6 ac b6 09 cc 2f af 9a 99 50 b3 f9 a9 be c9 f4 19 ... >

await xecjs.Mnemonic.toSeed('idea relax weird defense body bronze champion ancient vocal peanut similar dose grit company peasant gate sunset deal library act include penalty annual main', '');
// <Buffer c1 56 36 5b 0f 2a 16 04 dd 6f 53 ad 7d 0a 4c 14 ba 38 f9 81 fb 18 0f df c3 14 6e 6a fc d8 af 2f 1f c4 2c b2 d3 65 8a 31 2e a8 48 59 12 bd f0 f1 8d e4 ... >

await xecjs.Mnemonic.toSeed('bus aware census desk orphan zebra fashion host try muscle pig close jealous slice elegant prison reject ship great program trumpet syrup tray remove', '');
// <Buffer f4 2c e8 e1 88 d1 5a 66 5c 18 c0 cf ae df 09 3c 75 d2 4c 47 9d 52 87 f4 be c0 6b 13 e7 da 04 01 a3 50 36 87 22 1f ee cf c8 57 e8 6e ae bb 17 4b 83 60 ... >

await xecjs.Mnemonic.toSeed('frost deliver coin clutch upon round scene wonder various wise luggage country', 'yayayayay');
// <Buffer 1d 00 9f a3 a8 86 51 a4 04 d5 03 3d eb 6d b1 01 e2 f1 3b c3 c8 6d 1f b9 93 b4 d1 33 dc 84 21 12 2c 9b 52 10 ba d8 96 15 e0 b0 9a 34 33 52 f8 07 c8 c4 ... >`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.validate()',
        title: 'validate()',
        name: 'validate',
        group: 'Mnemonic',
        description: '<p>Validate mnemonic.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.Mnemonic.validate('ca', xecjs.Mnemonic.wordLists().english)
// ca is not in wordlist, did you mean cabbage?

xecjs.Mnemonic.validate('boil lonely casino manage habit where total glory muffin name limit mansion', bitbox.Mnemonic.wordLists().english)
// Valid mnemonic

xecjs.Mnemonic.validate('boil lonely casino manage habit where total glory muffin name limit mansion boil lonely casino manage habit where total glory muffin name limit mansion', bitbox.Mnemonic.wordLists().english)
// Invalid mnemonic`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'Mnemonic.wordLists()',
        title: 'wordLists()',
        name: 'wordLists',
        group: 'Mnemonic',
        description: '<p>Return mnemonic word lists.</p>',
        examples: [{
          title: 'Example usage:',
          content: `xecjs.Mnemonic.wordLists();
// {
//   EN: [],
//   JA: [],
//   chinese_simplified: [],
//   chinese_traditional: [],
//   english: [],
//   french: [],
//   italian: [],
//   japanese: [],
//   korean: [],
//   spanish: []
// }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'mnemonic.js',
        groupTitle: 'Mnemonic'
      }, {
        type: '',
        url: 'PsfSlpIndexer.balance()',
        title: 'balance()',
        name: 'SLP_Balance',
        group: 'PSF_SLP',
        description: '<p>Return slp balance for a single address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let balance = await xecjs.PsfSlpIndexer.balance('bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n')
    console.log(balance)
  } catch(error) {
   console.error(error)
  }
})()

 {
   balance: {
     utxos: [
       {
         txid: 'a24a6a4abf06fabd799ecea4f8fac6a9ff21e6a8dd6169a3c2ebc03665329db9',
         vout: 1,
         type: 'token',
         qty: '1800',
         tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
         address: 'bitcoincash:qrqy3kj7r822ps6628vwqq5k8hyjl6ey3y4eea2m4s'
       }
     ],
     txs: [
       {
         txid: '078b2c48ed1db0d5d5996f2889b8d847a49200d0a781f6aa6752f740f312688f',
         height: 717796
       },
       {
         txid: 'a24a6a4abf06fabd799ecea4f8fac6a9ff21e6a8dd6169a3c2ebc03665329db9',
         height: 717832
       }
     ],
     balances: [
       {
         tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
         qty: '1800'
       }
     ]
   }
 }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'psf-slp-indexer.js',
        groupTitle: 'PSF_SLP'
      }, {
        type: '',
        url: 'PsfSlpIndexer.tx()',
        title: 'tx()',
        name: 'SLP_Transaction_Data',
        group: 'PSF_SLP',
        description: '<p>Return slp transaction data.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let txData = await xecjs.PsfSlpIndexer.tx('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2')
    console.log(txData)
  } catch(error) {
   console.error(error)
  }
})()

{
  txData: {
    txid: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
    hash: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
    version: 2,
    size: 339,
    locktime: 0,
    vin: [
      {
        txid: '8370db30d94761ab9a11b71ecd22541151bf6125c8c613f0f6fab8ab794565a7',
        vout: 0,
        scriptSig: {
          asm: '304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4[ALL|FORKID] 02791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851',
          hex: '47304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4412102791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851'
        },
        sequence: 4294967295,
        address: 'bitcoincash:qpvsg9vl9a5mlf37a7n3yce6pktdctn73qwgaqm3wq',
        value: 0.00051303,
        tokenQty: 0,
        tokenQtyStr: '0',
        tokenId: null
      }
    ],
    vout: [
      {
        value: 0,
        n: 0,
        scriptPubKey: {
          asm: 'OP_RETURN 5262419 1 47454e45534953 54524f5554 54726f75742773207465737420746f6b656e 74726f757473626c6f672e636f6d 0 2 2 000000174876e800',
          hex: '6a04534c500001010747454e455349530554524f55541254726f75742773207465737420746f6b656e0e74726f757473626c6f672e636f6d4c000102010208000000174876e800',
          type: 'nulldata'
        },
        tokenQtyStr: '0',
        tokenQty: 0
      }
    ],
    hex: '0200000001a7654579abb8faf6f013c6c82561bf51115422cd1eb7119aab6147d930db7083000000006a47304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4412102791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851ffffffff040000000000000000476a04534c500001010747454e455349530554524f55541254726f75742773207465737420746f6b656e0e74726f757473626c6f672e636f6d4c000102010208000000174876e80022020000000000001976a914db4d39ceb7794ffe5d06855f249e1d3a7f1b024088ac22020000000000001976a914db4d39ceb7794ffe5d06855f249e1d3a7f1b024088accec20000000000001976a9145904159f2f69bfa63eefa712633a0d96dc2e7e8888ac00000000',
    blockhash: '0000000000000000009f65225a3e12e23a7ea057c869047e0f36563a1f410267',
    confirmations: 97398,
    time: 1581773131,
    blocktime: 1581773131,
    blockheight: 622414,
    isSlpTx: true,
    tokenTxType: 'GENESIS',
    tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
    tokenType: 1,
    tokenTicker: 'TROUT',
    tokenName: "Trout's test token",
    tokenDecimals: 2,
    tokenUri: 'troutsblog.com',
    tokenDocHash: '',
    isValidSlp: true
  }
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'psf-slp-indexer.js',
        groupTitle: 'PSF_SLP'
      }, {
        type: '',
        url: 'PsfSlpIndexer.status()',
        title: 'status()',
        name: 'Status',
        group: 'PSF_SLP',
        description: '<p>Return status from psf slp indexer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let status = await xecjs.PsfSlpIndexer.status()
    console.log(status)
  } catch(error) {
   console.error(error)
  }
})()

 {
   "status": {
     "startBlockHeight": 543376,
     "syncedBlockHeight": 723249,
     "chainBlockHeight": 722679
    }
 }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'psf-slp-indexer.js',
        groupTitle: 'PSF_SLP'
      }, {
        type: '',
        url: 'PsfSlpIndexer.tokenStats()',
        title: 'tokenStats()',
        name: 'Token_Stats',
        group: 'PSF_SLP',
        description: '<p>Return list stats for a single slp token. The second input is a Boolean, which determins the the transaction history of the token is included in the returned data. The default is false.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let tokenStats = await xecjs.PsfSlpIndexer.tokenStats('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2', true)
    console.log(tokenStats)
  } catch(error) {
   console.error(error)
  }
})()

{
  tokenData: {
    type: 1,
    ticker: 'TROUT',
    name: "Trout's test token",
    tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
    documentUri: 'troutsblog.com',
    documentHash: '',
    decimals: 2,
    mintBatonIsActive: true,
    tokensInCirculationBN: '100098953386',
    tokensInCirculationStr: '100098953386',
    blockCreated: 622414,
    totalBurned: '1046614',
    totalMinted: '100100000000'
    txs: [
      {
        txid: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
        height: 622414,
        type: 'GENESIS',
        qty: '100000000000'
      }
    ]
  }
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'psf-slp-indexer.js',
        groupTitle: 'PSF_SLP'
      }, {
        type: '',
        url: 'price.getBchUsd()',
        title: 'getBchUsd()',
        name: 'Price_getBchUsd()',
        group: 'Price',
        description: '<p>Return current price of BCH in USD. This endpoint gets the USD price of BCH from the Coinex API. The price comes from bch-api, so it has a better chance of working in Tor.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
 try {
   let current = await xecjs.Price.getBchUsd();
   console.log(current);
 } catch(err) {
  console.error(err)
 }
})()

// 512.81`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'price.js',
        groupTitle: 'Price'
      }, {
        type: '',
        url: 'price.getBchaUsd()',
        title: 'getBchaUsd()',
        name: 'Price_getBchaUsd()',
        group: 'Price',
        description: '<p>Return current price of BCHA in USD. This endpoint gets the USD price of XEC from the Coinex API. The price denominated in BCHA comes from bch-api, so it has a better chance of working in Tor.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
 try {
   let current = await xecjs.Price.getBchaUsd();
   console.log(current);
 } catch(err) {
  console.error(err)
 }
})()

// 212.34`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'price.js',
        groupTitle: 'Price'
      }, {
        type: '',
        url: 'price.getUsd()',
        title: 'getUsd()',
        name: 'Price_getUsd()',
        group: 'Price',
        description: '<p>Return current price of BCH in USD. This endpoint gets the USD price of BCH from the Coinbase API. The price comes from bch-api, so it has a better chance of working in Tor.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
 try {
   let current = await xecjs.Price.getUsd();
   console.log(current);
 } catch(err) {
  console.error(err)
 }
})()

// 266.81`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'price.js',
        groupTitle: 'Price'
      }, {
        type: '',
        url: 'price.getXecUsd()',
        title: 'getXecUsd()',
        name: 'Price_getXecUsd()',
        group: 'Price',
        description: '<p>Return current price of XEC in USD. This endpoint gets the USD price of XEC from the Coinex API. The price comes from bch-api, so it has a better chance of working in Tor.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
 try {
   let current = await xecjs.Price.getXecUsd();
   console.log(current);
 } catch(err) {
  console.error(err)
 }
})()

// 0.00021234`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'price.js',
        groupTitle: 'Price'
      }, {
        type: '',
        url: 'price.rates()',
        title: 'rates()',
        name: 'Price_rates()',
        group: 'Price',
        description: '<p>Return current price of BCH in several different currencies. This endpoint gets the price of BCH from the Coinbase API in many different currencies. The price comes from bch-api, so it has a better chance of working in Tor.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
 try {
   let current = await xecjs.Price.rates();
   console.log(current);
 } catch(err) {
  console.error(err)
 }
})()

{
  AED: "915.049218",
  AFN: "19144.48874646",
  ALGO: "826.6633482661356600405",
  ...
  ZRX: "644.844402797695193656",
  ZWL: "80215.03"
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'price.js',
        groupTitle: 'Price'
      }, {
        type: '',
        url: 'RawTransactions.decodeRawTransaction()',
        title: 'decodeRawTransaction()',
        name: 'decodeRawTransaction',
        group: 'RawTransactions',
        description: '<p>Return an Array of JSON objects representing the serialized, hex-encoded transactions.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
let decodeRawTransaction = await xecjs.RawTransactions.decodeRawTransaction('01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000');
console.log(decodeRawTransaction);
} catch(error) {
console.error(error)
}
})()

// { txid: 'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   hash:
//    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   size: 191,
//   version: 1,
//   locktime: 0,
//   vin:
//    [ { txid:
//         '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
//        vout: 0,
//        scriptSig: [Object],
//        sequence: 4294967295 } ],
//   vout: [ { value: 12.5, n: 0, scriptPubKey: [Object] } ] }

(async () => {
 try {
   let decodeRawTransaction = await xecjs.RawTransactions.decodeRawTransaction([
     '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000',
     '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000'
   ]);
   console.log(decodeRawTransaction);
 } catch(error) {
  console.error(error)
 }
})()

// [ { txid:
//    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   hash:
//    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   size: 191,
//   version: 1,
//   locktime: 0,
//   vin: [ [Object] ],
//   vout: [ [Object] ] },
// { txid:
//    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   hash:
//    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
//   size: 191,
//   version: 1,
//   locktime: 0,
//   vin: [ [Object] ],
//   vout: [ [Object] ] } ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'raw-transactions.js',
        groupTitle: 'RawTransactions'
      }, {
        type: '',
        url: 'RawTransactions.decodeScript()',
        title: 'decodeScript()',
        name: 'decodeScript',
        group: 'RawTransactions',
        description: '<p>Decode hex-encoded scripts.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
 let decodeScript = await xecjs.RawTransactions.decodeScript('4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16');
 console.log(decodeScript);
} catch(error) {
 console.error(error)
}
})()

// { asm: '30450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed59201 02e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16', type: 'nonstandard', p2sh: 'bitcoincash:pqwndulzwft8dlmqrteqyc9hf823xr3lcc7ypt74ts' }


(async () => {
try {
 let decodeScript = await xecjs.RawTransactions.decodeScript(['4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16']);
 console.log(decodeScript);
} catch(error) {
console.error(error)
}
})()

// [{ asm: '30450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed59201 02e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16',
// type: 'nonstandard',
// p2sh: 'bitcoincash:pqwndulzwft8dlmqrteqyc9hf823xr3lcc7ypt74ts' }]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'raw-transactions.js',
        groupTitle: 'RawTransactions'
      }, {
        type: '',
        url: 'RawTransactions.getRawTransaction()',
        title: 'getRawTransaction()',
        name: 'getRawTransaction',
        group: 'RawTransactions',
        description: "<p>Return the raw transaction data. If verbose is 'true', returns an Object with information about 'txid'. If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.</p>",
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
 let getRawTransaction = await xecjs.RawTransactions.getRawTransaction("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
 console.log(getRawTransaction);
} catch(error) {
console.error(error)
}
})()

//  01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000

(async () => {
try {
 let getRawTransaction = await xecjs.RawTransactions.getRawTransaction([
   "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
   "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
 ], true);
 console.log(getRawTransaction);
} catch(error) {
console.error(error)
}
})()

// [ { hex:
//  '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000',
//   txid:
//    '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
//   hash:
//    '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
//   size: 134,
//   version: 1,
//   locktime: 0,
//   vin: [ [Object] ],
//   vout: [ [Object] ],
//   blockhash:
//    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
//   confirmations: 581882,
//   time: 1231469665,
//   blocktime: 1231469665 },
// { hex:
//    '01000000010f3cb469bc82f931ee77d80b3dd495d02f9ed7cdc455cea3e7baa4bdeea6a78d000000006a47304402205ce3e1dfe4b5207818ce27035bc7cc03a5631f806d351535b32ce77c8d136aed02204e66e1fa4c2e12feab0d41a5593aff9629cdbc6ccb6126bc3d1a20404be7760c412103d44946d17e00179bbfc3b723aedc1831d8604e6a04bbd91170f1d894d04657bbffffffff02e6ec8500000000001976a914b5befddad83d9180fd4082c5528cf5a779b0fa6688acdf220000000000001976a9142c21a1be4239eeed678a456627a08d5f813d5c9288ac00000000',
//   txid:
//    'b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f',
//   hash:
//    'b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f',
//   size: 225,
//   version: 1,
//   locktime: 0,
//   vin: [ [Object] ],
//   vout: [ [Object], [Object] ],
//   blockhash:
//    '000000000000000003a09a7d68a0d62fd0ab51c368372e46bac84277e2df47e2',
//   confirmations: 16151,
//   time: 1547752564,
//   blocktime: 1547752564 } ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'raw-transactions.js',
        groupTitle: 'RawTransactions'
      }, {
        type: '',
        url: 'RawTransactions.getTxData()',
        title: 'getTxData()',
        name: 'getTxData',
        group: 'RawTransactions',
        description: '<p>Returns an object of transaction data, including addresses for input UTXOs.</p> <p>This function is equivalent to running <code>getRawTransaction (txid, true)</code>, execept the <code>vin</code> array will be populated with an <code>address</code> property that contains the <code>bitcoincash:</code> address of the sender for each input.</p> <p>This function will only work with a single txid. It does not yet support an array of TXIDs.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
 let txData = await xecjs.RawTransactions.getTxData("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
 console.log(txData);
} catch(error) {
console.error(error)
}
})()`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'raw-transactions.js',
        groupTitle: 'RawTransactions'
      }, {
        type: '',
        url: 'RawTransactions.sendRawTransaction()',
        title: 'sendRawTransaction()',
        name: 'sendRawTransaction',
        group: 'RawTransactions',
        description: '<p>Submits raw transaction (serialized, hex-encoded) to local node and network. Also see createrawtransaction and signrawtransaction calls.</p> <p>For bulk uploads, transactions must use different UTXOs.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// single tx
(async () => {
try {
 let sendRawTransaction = await xecjs.RawTransactions.sendRawTransaction("01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000");
 console.log(sendRawTransaction);
} catch(error) {
 console.error(error)
}
})()
// 0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098

// single tx as array
(async () => {
try {
 let sendRawTransaction = await xecjs.RawTransactions.sendRawTransaction(["01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000"]);
 console.log(sendRawTransaction);
} catch(error) {
 console.error(error)
}
})()
// ['0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098']`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'raw-transactions.js',
        groupTitle: 'RawTransactions'
      }, {
        type: '',
        url: 'SLP.NFT1.generateNFTChildGenesisOpReturn()',
        title: 'generateNFTChildGenesisOpReturn()',
        name: 'generateNFTChildGenesisOpReturn',
        group: 'SLP_NFT1',
        description: "<p>Generate the OP_RETURN value needed to create an SLP NFT Child token. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
 const configObj = {
   name: "NFT Child",
   ticker: "NFTC",
   documentUrl: "https://FullStack.cash",
 }

 const result = await bchjs.SLP.NFT1.generateNFTChildGenesisOpReturn(
   configObj
 )

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.generateNFTChildSendOpReturn()',
        title: 'generateNFTChildSendOpReturn()',
        name: 'generateNFTChildSendOpReturn',
        group: 'SLP_NFT1',
        description: "<p>Generate the OP_RETURN value needed to send an SLP NFT Child token to another address. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the token UTXOs that match the user-provided token ID.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.tokenType === "token" && // UTXO is not a minting baton.
    utxo.tokenType === 65 // UTXO is for an NFT Child
  )
  return true;
});

// Generate the SEND OP_RETURN
const slpData = bchjs.SLP.NFT1.generateNFTChildSendOpReturn(
  tokenUtxos,
  TOKENQTY
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.generateNFTGroupSendOpReturn()',
        title: 'generateNFTGroupSendOpReturn()',
        name: 'generateNFTGroupSendOpReturn',
        group: 'SLP_NFT1',
        description: "<p>Generate the OP_RETURN value needed to send an SLP NFT Group token to another address. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the token UTXOs that match the user-provided token ID.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.tokenType === "token" && // UTXO is not a minting baton.
    utxo.tokenType === 129 // UTXO is for an NFT Group
  )
  return true;
});

// Generate the SEND OP_RETURN
const slpData = bchjs.SLP.NFT1.generateNFTGroupSendOpReturn(
  tokenUtxos,
  TOKENQTY
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.listNFTGroupChildren()',
        title: 'listNFTGroupChildren()',
        name: 'listNFTGroupChildren',
        group: 'SLP_NFT1',
        description: "<p>Return list of NFT children tokens in a NFT Group. It's assumed provided groupId parameter is for an NFT Group token (type=129)</p> <p>Returns an Array with GENESIS transaction IDs of the children tokens.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const groupId = '68cd33ecd909068fbea318ae5ff1d6207cf754e53b191327d6d73b6916424c0a'
const children = await bchjs.SLP.Nft1.listNFTGroupChildren(groupId)

children = {
 "nftChildren": [
   "45a30085691d6ea586e3ec2aa9122e9b0e0d6c3c1fd357decccc15d8efde48a9",
   "928ce61fe1006b1325a0ba0dce700bf83986a6f0691ba26e121c9ac035d12a55"
 ]
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.mintNFTGroupOpReturn()',
        title: 'mintNFTGroupOpReturn()',
        name: 'mintNFTGroupOpReturn',
        group: 'SLP_NFT1',
        description: "<p>Generate the OP_RETURN value needed to create an SLP Mint transaction for an NFT Group token. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the minting baton.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.utxoType === "minting-baton" && // UTXO is not a minting baton.
    utxo.tokenType === 129 // UTXO is for NFT Group
  )
  return true;
});

// Generate the SLP OP_RETURN
const slpData = bchjs.SLP.NFT1.mintNFTGroupOpReturn(
  tokenUtxos,
  1 // Mint 1 new token.
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.newNFTGroupOpReturn()',
        title: 'newNFTGroupOpReturn()',
        name: 'newNFTGroupOpReturn',
        group: 'SLP_NFT1',
        description: "<p>Generate the OP_RETURN value needed to create an SLP NFT Group token. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
 const configObj = {
   name: "SLP Test Token",
   ticker: "SLPTEST",
   documentUrl: "https://FullStack.cash",
   initialQty: 1
 }

 const result = await bchjs.SLP.NFT1.newNFTGroupOpReturn(
   configObj
 )

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.NFT1.parentNFTGroup()',
        title: 'parentNFTGroup()',
        name: 'parentNFTGroup',
        group: 'SLP_NFT1',
        description: "<p>Return parent NFT Group information for a given NFT child token. It's assumed provided groupId parameter is for an NFT Child token (type=65)</p> <p>Returns a JSON with NFT group information.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const tokenId = '45a30085691d6ea586e3ec2aa9122e9b0e0d6c3c1fd357decccc15d8efde48a9'
const group = await bchjs.SLP.Nft1.parentNFTGroup(tokenId)

group = {
  "nftGroup": {
    "decimals": 0,
    "timestamp": "2021-05-03 10:36:01",
    "timestamp_unix": 1620038161,
    "versionType": 129,
    "documentUri": "psfoundation.cash",
    "symbol": "PSF.TEST.GROUP",
    "name": "PSF Test NFT Group",
    "containsBaton": true,
    "id": "68cd33ecd909068fbea318ae5ff1d6207cf754e53b191327d6d73b6916424c0a",
    "documentHash": null,
    "initialTokenQty": 1000000,
    "blockCreated": 686117,
    "totalMinted": null,
    "totalBurned": null,
    "circulatingSupply": null
  }
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/nft1.js',
        groupTitle: 'SLP_NFT1'
      }, {
        type: '',
        url: 'SLP.TokenType1.generateBurnOpReturn()',
        title: 'generateBurnOpReturn()',
        name: 'generateBurnOpReturn',
        group: 'SLP_TokenType1',
        description: "<p>Generate the OP_RETURN value needed to create a SLP Send transaction that burns tokens. This is a slight variation of generateSendOpReturn(). It generates a SLP SEND transaction designed to burn a select quantity of tokens.</p> <p>It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the token UTXOs that match the user-provided token ID.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.tokenType === "token" // UTXO is not a minting baton.
  )
  return true;
});

// Generate the SEND OP_RETURN
const slpData = bchjs.SLP.TokenType1.generateBurnOpReturn(
  tokenUtxos,
  10 // Burn 10 tokens
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/burn-tokens/burn-tokens.js`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/tokentype1.js',
        groupTitle: 'SLP_TokenType1'
      }, {
        type: '',
        url: 'SLP.TokenType1.generateGenesisOpReturn()',
        title: 'generateGenesisOpReturn()',
        name: 'generateGenesisOpReturn',
        group: 'SLP_TokenType1',
        description: '<p>Generate the OP_RETURN value needed to create a new SLP token class.</p> <p>Expects a config object as input, see the example for properties.:</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
 const configObj = {
   name: "SLP Test Token",
   ticker: "SLPTEST",
   documentUrl: "https://FullStack.cash",
   documentHash: "",
   decimals: 8,
   initialQty: 10
 }

 const result = await bchjs.SLP.TokenType1.generateGenesisOpReturn(
   configObj
 )

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/create-token/create-token.js`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/tokentype1.js',
        groupTitle: 'SLP_TokenType1'
      }, {
        type: '',
        url: 'SLP.TokenType1.generateMintOpReturn()',
        title: 'generateMintOpReturn()',
        name: 'generateMintOpReturn',
        group: 'SLP_TokenType1',
        description: "<p>Generate the OP_RETURN value needed to create an SLP Mint transaction. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the minting baton.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.utxoType === "minting-baton" // UTXO is not a minting baton.
  )
  return true;
});

// Generate the SLP OP_RETURN
const slpData = bchjs.SLP.TokenType1.generateMintOpReturn(
  tokenUtxos,
  100 // Mint 100 new tokens.
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/mint-token/mint-token.js`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/tokentype1.js',
        groupTitle: 'SLP_TokenType1'
      }, {
        type: '',
        url: 'SLP.TokenType1.generateSendOpReturn()',
        title: 'generateSendOpReturn()',
        name: 'generateSendOpReturn',
        group: 'SLP_TokenType1',
        description: "<p>Generate the OP_RETURN value needed to create an SLP Send transaction. It's assumed all elements in the tokenUtxos array belong to the same token.</p> <p>Returns a Buffer representing a transaction output, ready to be added to the Transaction Builder.</p>",
        examples: [{
          title: 'Example usage:',
          content: `
const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
const utxos = await bchjs.Blockbook.utxos(addr)

// Identify the SLP token UTXOs.
let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);

// Filter out the token UTXOs that match the user-provided token ID.
tokenUtxos = tokenUtxos.filter((utxo, index) => {
  if (
    utxo && // UTXO is associated with a token.
    utxo.tokenId === TOKENID && // UTXO matches the token ID.
    utxo.tokenType === "token" // UTXO is not a minting baton.
  )
  return true;
});

// Generate the SEND OP_RETURN
const slpData = bchjs.SLP.TokenType1.generateSendOpReturn(
  tokenUtxos,
  TOKENQTY
);

...
// Add OP_RETURN as first output.
transactionBuilder.addOutput(slpData, 0);

// See additional code here:
// https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/send-token/send-token.js`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/tokentype1.js',
        groupTitle: 'SLP_TokenType1'
      }, {
        type: '',
        url: 'SLP.TokenType1.getHexOpReturn()',
        title: 'getHexOpReturn()',
        name: 'getHexOpReturn',
        group: 'SLP_TokenType1',
        description: '<p>Get hex representation of an SLP OP_RETURN This command returns a hex encoded OP_RETURN for SLP Send (Token Type 1) transactions. Rather than computing it directly, it calls bch-api to do the heavy lifting. This is easier and lighter weight for web apps.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
const tokenUtxos = [{
 tokenId: "0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1",
 decimals: 0,
 tokenQty: 2
}]

const sendQty = 1.5

const result = await bchjs.SLP.TokenType1.getHexOpReturn(tokenUtxos, sendQty)

// result:
{
  "script": "6a04534c500001010453454e44200a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1080000000000000001080000000000000000",
  "outputs": 2
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/tokentype1.js',
        groupTitle: 'SLP_TokenType1'
      }, {
        type: '',
        url: 'SLP.Utils.decodeOpReturn()',
        title: 'decodeOpReturn()',
        name: 'decodeOpReturn',
        group: 'SLP_Utils',
        description: '<p>Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.</p> <p>Throws an error if given a non-SLP txid.</p> <p>If optional associative array parameter cache is used, will cache and reuse responses for the same input.</p> <p>A third optional input, <code>usrObj</code>, is used by bch-api for managing rate limits. It can be safely ignored when writing apps using this call.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
(async () => {
try {
 const txid =
  "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"

 const data = await bchjs.SLP.Utils.decodeOpReturn(txid)

 console.log(\`Decoded OP_RETURN data: \${JSON.stringify(data,null,2)}\`)
} catch (error) {
 console.error(error)
}
})()

// returns
{
 "tokenType": 1,
 "txType": "SEND",
 "tokenId": "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
 "amounts": [
   "100000000",
   "99883300000000"
 ]
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/utils.js',
        groupTitle: 'SLP_Utils'
      }, {
        type: '',
        url: 'SLP.Address.detectAddressFormat()',
        title: 'detectAddressFormat()',
        name: 'detectAddressFormat',
        group: 'SLP',
        description: '<p>Detect address format.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet cashaddr
bchjs.SLP.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr

// mainnet cashaddr w/ no prefix
bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr

// mainnet slpaddr
bchjs.SLP.Address.detectAddressFormat('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// slpaddr

// mainnet slpaddr w/ no prefix
bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// slpaddr

// mainnet legacy
bchjs.SLP.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// legacy

// cashaddr testnet
bchjs.SLP.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// cashaddr

// cashaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// cashaddr

// slpaddr testnet
bchjs.SLP.Address.detectAddressFormat('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// slpaddr

// slpaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// slpaddr

// legacy testnet
bchjs.SLP.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// legacy`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.detectAddressNetwork()',
        title: 'detectAddressNetwork()',
        name: 'detectAddressNetwork',
        group: 'SLP',
        description: '<p>Detect address network.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet cashaddr
bchjs.SLP.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet

// mainnet cashaddr w/ no prefix
bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet

// mainnet slpaddr
bchjs.SLP.Address.detectAddressNetwork('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// mainnet

// mainnet slpaddr w/ no prefix
bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// mainnet

// mainnet legacy
bchjs.SLP.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// mainnet

// cashaddr testnet
bchjs.SLP.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// testnet

// cashaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// testnet

// slpaddr testnet
bchjs.SLP.Address.detectAddressNetwork('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// testnet

// slpaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// testnet

// legacy testnet
bchjs.SLP.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// testnet`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.detectAddressType()',
        title: 'detectAddressType()',
        name: 'detectAddressType',
        group: 'SLP',
        description: '<p>Detect address type.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainet cashaddr
bchjs.SLP.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

// mainet cashaddr w/ no prefix
bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

// mainet slpaddr
bchjs.SLP.Address.detectAddressType('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
// p2pkh

// mainet slpaddr w/ no prefix
bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
// p2pkh

// mainet legacy
bchjs.SLP.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
// p2pkh

// cashaddr testnet
bchjs.SLP.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
// p2pkh

// cashaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
// p2pkh

// slpaddr testnet
bchjs.SLP.Address.detectAddressType('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
// p2pkh

// slpaddr testnet w/ no prefix
bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
// p2pkh

// legacy testnet
bchjs.SLP.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
// p2pkh`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.isMainnetAddress()',
        title: 'isMainnetAddress()',
        name: 'isMainnetAddress',
        group: 'SLP',
        description: '<p>Detect if mainnet address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
// mainnet cashaddr
bchjs.SLP.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet cashaddr w/ no prefix
bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet slpaddr
bchjs.SLP.Address.isMainnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// mainnet slpaddr w/ no prefix
bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// mainnet legacy
bchjs.SLP.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// true

// testnet cashaddr
bchjs.SLP.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet w/ no cashaddr prefix
bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// testnet slpaddr
bchjs.SLP.Address.isMainnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// false

// testnet w/ no slpaddr prefix
bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// false

// testnet legacy
bchjs.SLP.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.isP2PKHAddress()',
        title: 'isP2PKHAddress()',
        name: 'isP2PKHAddress',
        group: 'SLP',
        description: '<p>Detect if p2pkh address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet cashaddr
bchjs.SLP.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet w/ no cashaddr prefix
bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true

// mainnet slpaddr
bchjs.SLP.Address.isP2PKHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// mainnet w/ no slpaddr prefix
bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// legacy
bchjs.SLP.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// true

// cashaddr testnet
bchjs.SLP.Address.isP2PKHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet w/ no cashaddr prefix
bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// slpaddr testnet
bchjs.SLP.Address.isP2PKHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// testnet w/ no slpaddr prefix
bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// legacy testnet
bchjs.SLP.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.isP2SHAddress()',
        title: 'isP2SHAddress()',
        name: 'isP2SHAddress',
        group: 'SLP',
        description: '<p>Detect if p2sh address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet cashaddr
bchjs.SLP.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// mainnet cashaddr w/ no prefix
bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// mainnet slpaddr
bchjs.SLP.Address.isP2SHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// false

// mainnet slpaddr w/ no prefix
bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// false

// mainnet legacy
bchjs.SLP.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
// false

// cashaddr testnet
bchjs.SLP.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// cashaddr testnet w/ no prefix
bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// false

// slpaddr testnet
bchjs.SLP.Address.isP2SHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// false

// slpaddr testnet w/ no prefix
bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// false

// legacy testnet
bchjs.SLP.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.isSLPAddress()',
        title: 'isSLPAddress()',
        name: 'isSLPAddress',
        group: 'SLP',
        description: '<p>Detect if slpAddr encoded address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
// mainnet slpaddr
bchjs.SLP.Address.isSLPAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// mainnet w/ no slpaddr prefix
bchjs.SLP.Address.isSLPAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// true

// mainnet legacy
bchjs.SLP.Address.isSLPAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
// false

// testnet w/ slpaddr prefix
bchjs.SLP.Address.isSLPAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// testnet w/ no slpaddr prefix
bchjs.SLP.Address.isSLPAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// testnet legacy
bchjs.SLP.Address.isSLPAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// false`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.isTestnetAddress()',
        title: 'isTestnetAddress()',
        name: 'isTestnetAddress',
        group: 'SLP',
        description: '<p>Detect if testnet address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// cashaddr mainnet
bchjs.SLP.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
//false

// w/ no cashaddr prefix
bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false

// slpaddr mainnet
bchjs.SLP.Address.isTestnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
//false

// w/ no slpaddr prefix
bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
// false

// legacy mainnet
bchjs.SLP.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
// false

// cashaddr testnet
bchjs.SLP.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// testnet w/ no cashaddr prefix
bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// true

// slpaddr testnet
bchjs.SLP.Address.isTestnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// testnet w/ no slpaddr prefix
bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// true

// testnet legacy
bchjs.SLP.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
// true`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.toCashAddress()',
        title: 'toCashAddress()',
        name: 'toCashAddress',
        group: 'SLP',
        description: '<p>Converting legacy or slpaddr to cashAddress format.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet legacy
bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
// bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet legacy return no prefix
bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
// qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet slpaddr
bchjs.SLP.Address.toCashAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
// bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet slpaddr no prefix
bchjs.SLP.Address.toCashAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
// qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// tesnet legacy
bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
// bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

// testnet legacy return no prefix
bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

// tesnet cashaddr
bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
// bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

// testnet cashaddr no prefix
bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.toLegacyAddress()',
        title: 'toLegacyAddress()',
        name: 'toLegacyAddress',
        group: 'SLP',
        description: '<p>Converting cashaddr or slpaddr to legacy address format.</p>',
        examples: [{
          title: 'Example usage:',
          content: `
// mainnet cashaddr w/ prefix
bchjs.SLP.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// mainnet cashaddr w/ no prefix
bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// mainnet slpaddr w/ prefix
bchjs.SLP.Address.toLegacyAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// mainnet slpaddr w/ no prefix
bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// testnet cashaddr w/ prefix
bchjs.SLP.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi

// testnet cashaddr w/ no prefix
bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi

// testnet slpaddr w/ prefix
bchjs.SLP.Address.toLegacyAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi

// testnet slpaddr w/ no prefix
bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.Address.toSLPAddress()',
        title: 'toSLPAddress()',
        name: 'toSLPAddress',
        group: 'SLP',
        description: '<p>Converting legacy or cashaddr to slpAddress format.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// mainnet legacy
bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
// simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzd

// mainnet legacy return no prefix
bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
// qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet cashaddr
bchjs.SLP.Address.toSLPAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp

// mainnet slpaddr no prefix
bchjs.SLP.Address.toSLPAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp

// testnet legacy
bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
// slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv

// testnet legacy return no prefix
bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv

// tesnet cashaddr
bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
// slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv

// testnet cashaddr no prefix
bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/address.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'SLP.ECPair.toSLPAddress()',
        title: 'toSLPAddress()',
        name: 'toSLPAddress',
        group: 'SLP',
        description: '<p>Get slp address of ECPair.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// create ecpair from wif
let ecpair = bchjs.SLP.ECPair.fromWIF('cUCSrdhu7mCzx4sWqL6irqzprkofxPmLHYgkSnG2WaWVqJDXtWRS')
// to slp address
bchjs.SLP.ECPair.toSLPAddress(ecpair);
// slptest:qq835u5srlcqwrtwt6xm4efwan30fxg9hcqag6fk03`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'slp/ecpair.js',
        groupTitle: 'SLP'
      }, {
        type: '',
        url: 'Schnorr.batchVerify()',
        title: 'batchVerify()',
        name: 'batchVerify',
        group: 'Schnorr',
        description: '<p>Verify a list of 64-byte signatures as a batch operation. Throws an Error if verification fails.</p>',
        examples: [{
          title: 'Example usage:',
          content: `const Buffer = require("safe-buffer").Buffer
const publicKeys = [
Buffer.from(
"02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
"hex"
),
Buffer.from(
"03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
"hex"
),
Buffer.from(
"026D7F1D87AB3BBC8BC01F95D9AECE1E659D6E33C880F8EFA65FACF83E698BBBF7",
"hex"
)
]
const messages = [
Buffer.from(
"243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
"hex"
),
Buffer.from(
"5E2D58D8B3BCDF1ABADEC7829054F90DDA9805AAB56C77333024B9D0A508B75C",
"hex"
),
Buffer.from(
"B2F0CD8ECB23C1710903F872C31B0FD37E15224AF457722A87C5E0C7F50FFFB3",
"hex"
)
]
const signatures = [
Buffer.from(
"2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
"hex"
),
Buffer.from(
"00DA9B08172A9B6F0466A2DEFD817F2D7AB437E0D253CB5395A963866B3574BE00880371D01766935B92D2AB4CD5C8A2A5837EC57FED7660773A05F0DE142380",
"hex"
),
Buffer.from(
"68CA1CC46F291A385E7C255562068357F964532300BEADFFB72DD93668C0C1CAC8D26132EB3200B86D66DE9C661A464C6B2293BB9A9F5B966E53CA736C7E504F",
"hex"
)
]
try {
xecjs.Schnorr.batchVerify(publicKeys, messages, signatures)
console.log("The signatures are valid.")
} catch (e) {
console.error("The signature verification failed: " + e)
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.computeEll()',
        title: 'computeEll()',
        name: 'computeEll',
        group: 'Schnorr',
        description: '<p>Generate ell which is the hash over all public keys participating in a session.</p>',
        examples: [{
          title: 'Example usage:',
          content: `const Buffer = require("safe-buffer").Buffer
const BigInteger = require("bigi")

const publicData = {
pubKeys: [
Buffer.from(
  "03846f34fdb2345f4bf932cb4b7d278fb3af24f44224fb52ae551781c3a3cad68a",
  "hex"
),
Buffer.from(
  "02cd836b1d42c51d80cef695a14502c21d2c3c644bc82f6a7052eb29247cf61f4f",
  "hex"
),
Buffer.from(
  "03b8c1765111002f09ba35c468fab273798a9058d1f8a4e276f45a1f1481dd0bdb",
  "hex"
)
],
message: xecjs.Schnorr.hash(Buffer.from("muSig is awesome!", "utf8")),
pubKeyHash: null,
pubKeyCombined: null,
commitments: [],
nonces: [],
nonceCombined: null,
partialSignatures: [],
signature: null
}

// data only known by the individual party, these values are never shared
// between the signers!
const signerPrivateData = [
// signer 1
{
privateKey: BigInteger.fromHex(
  "add2b25e2d356bec3770305391cbc80cab3a40057ad836bcb49ef3eed74a3fee"
),
session: null
},
// signer 2
{
privateKey: BigInteger.fromHex(
  "0a1645eef5a10e1f5011269abba9fd85c4f0cc70820d6f102fb7137f2988ad78"
),
session: null
},
// signer 3
{
privateKey: BigInteger.fromHex(
  "2031e7fed15c770519707bb092a6337215530e921ccea42030c15d86e8eaf0b8"
),
session: null
}
]

// -----------------------------------------------------------------------
// Step 1: Combine the public keys
// The public keys P_i are combined into the combined public key P.
// This can be done by every signer individually or by the initializing
// party and then be distributed to every participant.
// -----------------------------------------------------------------------
publicData.pubKeyHash = xecjs.Schnorr.computeEll(publicData.pubKeys)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.nonInteractive()',
        title: 'nonInteractive()',
        name: 'nonInteractive',
        group: 'Schnorr',
        description: '<p>Aggregates multiple signatures of different private keys over the same message into a single 64-byte signature using a scheme that is safe from rogue-key attacks.</p> <p>This non-interactive scheme requires the knowledge of all private keys that are participating in the multi-signature creation.</p>',
        examples: [{
          title: 'Example usage:',
          content: `const Buffer = require("safe-buffer").Buffer
const BigInteger = require("bigi")

const privateKey1 = BigInteger.fromHex(
"B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
)
const privateKey2 = BigInteger.fromHex(
"C90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B14E5C7"
)
const message = Buffer.from(
"243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
"hex"
)
const aggregatedSignature = xecjs.Schnorr.nonInteractive(
[privateKey1, privateKey2],
message
)

// verifying an aggregated signature
const publicKey1 = Buffer.from(
"02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
"hex"
)
const publicKey2 = Buffer.from(
"03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
"hex"
)
const X = xecjs.Schnorr.publicKeyCombine([publicKey1, publicKey2])
try {
xecjs.Schnorr.verify(X, message, aggregatedSignature)
console.log("The signature is valid.")
} catch (e) {
console.error("The signature verification failed: " + e)
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.partialSign()',
        title: 'partialSign()',
        name: 'partialSign',
        group: 'Schnorr',
        description: '<p>Creates a partial signature s_i for a participant.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
// -----------------------------------------------------------------------
// Step 6: Generate partial signatures
// Every participant can now create their partial signature s_i over the
// given message.
// -----------------------------------------------------------------------
signerPrivateData.forEach(data => {
data.session.partialSignature = xecjs.Schnorr.partialSign(
data.session,
publicData.message,
publicData.nonceCombined,
publicData.pubKeyCombined
)
})`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.partialSignatureVerify()',
        title: 'partialSignatureVerify()',
        name: 'partialSignatureVerify',
        group: 'Schnorr',
        description: "<p>Verifies a partial signature s_i against the participant's public key P_i. Throws an Error if verification fails.</p>",
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
// -----------------------------------------------------------------------
// Step 7: Exchange partial signatures (communication round 3)
// The partial signature of each signer is exchanged with the other
// participants. Simulated here by copying.
// -----------------------------------------------------------------------
for (let i = 0; i < publicData.pubKeys.length; i++) {
publicData.partialSignatures[i] =
signerPrivateData[i].session.partialSignature
}

// -----------------------------------------------------------------------
// Step 8: Verify individual partial signatures
// Every participant should verify the partial signatures received by the
// other participants.
// -----------------------------------------------------------------------
for (let i = 0; i < publicData.pubKeys.length; i++) {
xecjs.Schnorr.partialSignatureVerify(
signerSession,
publicData.partialSignatures[i],
publicData.nonceCombined,
i,
publicData.pubKeys[i],
publicData.nonces[i]
)
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.partialSignaturesCombine()',
        title: 'partialSignaturesCombine()',
        name: 'partialSignaturesCombine',
        group: 'Schnorr',
        description: '<p>Combines multiple partial signatures into a Schnorr signature (s, R) that can be verified against the combined public key P.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
// -----------------------------------------------------------------------
// Step 9: Combine partial signatures
// Finally, the partial signatures can be combined into the full signature
// (s, R) that can be verified against combined public key P.
// -----------------------------------------------------------------------
publicData.signature = xecjs.Schnorr.partialSignaturesCombine(
publicData.nonceCombined,
publicData.partialSignatures
)

// -----------------------------------------------------------------------
// Step 10: Verify signature
// The resulting signature can now be verified as a normal Schnorr
// signature (s, R) over the message m and public key P.
// -----------------------------------------------------------------------
xecjs.Schnorr.verify(
publicData.pubKeyCombined,
publicData.message,
publicData.signature
)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.publicKeyCombine()',
        title: 'publicKeyCombine()',
        name: 'publicKeyCombine',
        group: 'Schnorr',
        description: '<p>Creates the special rogue-key-resistant combined public key P by applying the MuSig coefficient to each public key P_i before adding them together.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
publicData.pubKeyCombined = xecjs.Schnorr.publicKeyCombine(
publicData.pubKeys,
publicData.pubKeyHash
)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.sessionInitialize()',
        title: 'sessionInitialize()',
        name: 'sessionInitialize',
        group: 'Schnorr',
        description: '<p>Creates a signing session. Each participant must create a session and must not share the content of the session apart from the commitment and later the nonce.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
// -----------------------------------------------------------------------
// Step 2: Create the private signing session
// Each signing party does this in private. The session ID *must* be
// unique for every call to sessionInitialize, otherwise it's trivial for
// an attacker to extract the secret key!
// -----------------------------------------------------------------------
signerPrivateData.forEach((data, idx) => {
const sessionId = xecjs.Crypto.randomBytes(32) // must never be reused between sessions!
data.session = xecjs.Schnorr.sessionInitialize(
sessionId,
data.privateKey,
publicData.message,
publicData.pubKeyCombined,
publicData.pubKeyHash,
idx
)
})
const signerSession = signerPrivateData[0].session`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.sessionNonceCombine()',
        title: 'sessionNonceCombine()',
        name: 'sessionNonceCombine',
        group: 'Schnorr',
        description: '<p>Combines multiple nonces R_i into the combined nonce R.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// continued from above
// -----------------------------------------------------------------------
// Step 3: Exchange commitments (communication round 1)
// The signers now exchange the commitments H(R_i). This is simulated here
// by copying the values from the private data to public data array.
// -----------------------------------------------------------------------
for (let i = 0; i < publicData.pubKeys.length; i++) {
publicData.commitments[i] = signerPrivateData[i].session.commitment
}

// -----------------------------------------------------------------------
// Step 4: Get nonces (communication round 2)
// Now that everybody has commited to the session, the nonces (R_i) can be
// exchanged. Again, this is simulated by copying.
// -----------------------------------------------------------------------
for (let i = 0; i < publicData.pubKeys.length; i++) {
publicData.nonces[i] = signerPrivateData[i].session.nonce
}

// -----------------------------------------------------------------------
// Step 5: Combine nonces
// The nonces can now be combined into R. Each participant should do this
// and keep track of whether the nonce was negated or not. This is needed
// for the later steps.
// -----------------------------------------------------------------------
publicData.nonceCombined = xecjs.Schnorr.sessionNonceCombine(
signerSession,
publicData.nonces
)
signerPrivateData.forEach(
data => (data.session.nonceIsNegated = signerSession.nonceIsNegated)
)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.sign()',
        title: 'sign()',
        name: 'sign',
        group: 'Schnorr',
        description: '<p>Sign a 32-byte message with the private key, returning a 64-byte signature.</p>',
        examples: [{
          title: 'Example usage:',
          content: `const Buffer = require("safe-buffer").Buffer
const BigInteger = require("bigi")

// signing
const privateKey = BigInteger.fromHex(
"B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
)
const message = Buffer.from(
"243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
"hex"
)
const createdSignature = xecjs.Schnorr.sign(privateKey, message)
console.log("The signature is: " + createdSignature.toString("hex"))
// The signature is: 2a298dacae57395a15d0795ddbfd1dcb564da82b0f269bc70a74f8220429ba1d1e51a22ccec35599b8f266912281f8365ffc2d035a230434a1a64dc59f7013fd`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Schnorr.verify()',
        title: 'verify()',
        name: 'verify',
        group: 'Schnorr',
        description: '<p>Verify a 64-byte signature of a 32-byte message against the public key. Throws an Error if verification fails.</p>',
        examples: [{
          title: 'Example usage:',
          content: `const Buffer = require("safe-buffer").Buffer
const publicKey = Buffer.from(
"02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
"hex"
)
const message = Buffer.from(
"243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
"hex"
)
const signatureToVerify = Buffer.from(
"2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
"hex"
)
try {
xecjs.Schnorr.verify(publicKey, message, signatureToVerify)
console.log("The signature is valid.")
} catch (e) {
console.error("The signature verification failed: " + e)
}`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'schnorr.js',
        groupTitle: 'Schnorr'
      }, {
        type: '',
        url: 'Script.classifyInput()',
        title: 'classifyInput()',
        name: 'classifyInput',
        group: 'Script',
        description: '<p>Classify transaction input.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let pubkeyInput = "3045022100ba2c3b717e023966cb16df65ca83f77029e2a5b80c47c47b6956474ac9ff281302201d48ee3292439e284a6654a0e79ac2b8f7fff5c6b0d715260aa296501a239c6441";
xecjs.Script.classifyInput(xecjs.Script.fromASM(pubkeyInput));
// pubkey

let pubkeyhashInput = "30440220280d4a9954c5afe24089bdd545466bd7a8caad8b295e30de9d3cb5e56fccf64e022036663b2c53b5fac674b4b935b53e2a4ea88dfc71c9b879870976d82887542ab441 02969479fa9bea3082697dce683ac05b13ae63016b41d5ca1a450ad40f6c543751";
xecjs.Script.classifyInput(xecjs.Script.fromASM(pubkeyhashInput));
// pubkeyhash

let multisigInput = "OP_0 3045022100fe324541215798b2df68cbd44039615e23c506d4ec1a05572064392a98196b82022068c849fa6699206da2fc6d7848efc1d3804a5816d6293615fe34c1a7f34e1c2f01 3044022001ab168e80b863fdec694350b587339bb72a37108ac3c989849251444d13ebba02201811272023e3c1038478eb972a82d3ad431bfc2408e88e4da990f1a7ecbb263901 3045022100aaeb7204c17eee2f2c4ff1c9f8b39b79e75e7fbf33e92cc67ac51be8f15b75f90220659eee314a4943a6384d2b154fa5821ef7a084814d7ee2c6f9f7f0ffb53be34b01";
xecjs.Script.classifyInput(xecjs.Script.fromASM(multisigInput));
// multisig

let scripthashInput = "OP_0 304402207515cf147d201f411092e6be5a64a6006f9308fad7b2a8fdaab22cd86ce764c202200974b8aca7bf51dbf54150d3884e1ae04f675637b926ec33bf75939446f6ca2801 3045022100ef253c1faa39e65115872519e5f0a33bbecf430c0f35cf562beabbad4da24d8d02201742be8ee49812a73adea3007c9641ce6725c32cd44ddb8e3a3af460015d140501 522102359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1210395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a52ae";
xecjs.Script.classifyInput(xecjs.Script.fromASM(scripthashInput));
// scripthash`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.classifyOutput()',
        title: 'classifyOutput()',
        name: 'classifyOutput',
        group: 'Script',
        description: '<p>Classify transaction output.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let nullDataOutput = "OP_RETURN 424348466f7245766572796f6e65";
xecjs.Script.classifyOutput(xecjs.Script.fromASM(nullDataOutput));
// nulldata

let pubkeyOutput = "02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 OP_CHECKSIG";
xecjs.Script.classifyOutput(xecjs.Script.fromASM(pubkeyOutput));
// pubkey

let pubkeyhashOutput = "OP_DUP OP_HASH160 aa4d7985c57e011a8b3dd8e0e5a73aaef41629c5 OP_EQUALVERIFY OP_CHECKSIG";
xecjs.Script.classifyOutput(xecjs.Script.fromASM(pubkeyhashOutput));
// pubkeyhash

let multisigOutput = "OP_2 02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 0395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a OP_2 OP_CHECKMULTISIG";
xecjs.Script.classifyOutput(xecjs.Script.fromASM(multisigOutput));
// multisig

let scripthashOutput = "OP_HASH160 722ff0bc2c3f47b35c20df646c395594da24e90e OP_EQUAL";
xecjs.Script.classifyOutput(xecjs.Script.fromASM(scripthashOutput));
// scripthash`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.decode()',
        title: 'decode()',
        name: 'decode',
        group: 'Script',
        description: '<p>Decode a Script buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// decode P2PKH scriptSig buffer
let scriptSigBuffer = Buffer.from("483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
xecjs.Script.decode(scriptSigBuffer);
// [ <Buffer 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 2b ... >, <Buffer 02 fb 72 1b 92 02 5e 77 5b 1b 84 77 4e 65 d5 68 d2 46 45 cb 63 32 75 f5 c2 6f 5c 31 01 b2 14 a8 fb> ]

// decode P2PKH scriptPubKey buffer
let scriptPubKeyBuffer = Buffer.from("76a91424e9c07804d0ee7e5bda934e0a3ae8710fc007dd88ac", 'hex');
xecjs.Script.decode(scriptPubKeyBuffer);
// [ 118,
// 169,
// <Buffer 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd>,
// 136,
// 172 ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.encode()',
        title: 'encode()',
        name: 'encode',
        group: 'Script',
        description: '<p>Encode a Script buffer with minimal push data. This function is used for Script files like CashScript. However, it will mangle the OP_RETURN of an SLP token transaction and will burn the tokens as a result. Use encode2() instead for that.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// encode P2PKH scriptSig to buffer
let scriptSig = [
Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
]
xecjs.Script.encode(scriptSig);
// <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >

// encode P2PKH scriptPubKey to buffer
let scriptPubKey = [
118,
169,
Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
136,
172
];
xecjs.Script.encode(scriptPubKey);
// <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.encode2()',
        title: 'encode2()',
        name: 'encode2',
        group: 'Script',
        description: '<p>Encode a Script buffer without minimal push data. This should be used if encode() does not produce the desired results. This should be used for compiling SLP OP_RETURNs.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// encode P2PKH scriptSig to buffer
let scriptSig = [
Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
]
xecjs.Script.encode2(scriptSig);
// <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >

// encode P2PKH scriptPubKey to buffer
let scriptPubKey = [
118,
169,
Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
136,
172
];
xecjs.Script.encode2(scriptPubKey);
// <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.fromASM()',
        title: 'fromASM()',
        name: 'fromASM',
        group: 'Script',
        description: '<p>Script ASM to buffer.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// P2PKH scriptSig
let scriptSigASM = "3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb";
xecjs.Script.fromASM(scriptSigASM);
// <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >

// P2PKH scriptPubKey
let scriptPubKeyASM = "OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG";
xecjs.Script.fromASM(scriptPubKeyASM);
// <Buffer 76 a9 14 be e4 18 2d 9f bc 89 31 a7 28 41 0a 0c d3 e0 f3 40 f2 99 5a 88 ac>`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Script.toASM()',
        title: 'toASM()',
        name: 'toASM',
        group: 'Script',
        description: '<p>Script buffer to ASM.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// P2PKH scriptSig
let scriptSigBuffer = Buffer.from('483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex');
xecjs.Script.toASM(scriptSigBuffer);
// 3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb

// P2PKH scriptPubKey
let scriptBuffer = Buffer.from("76a914bee4182d9fbc8931a728410a0cd3e0f340f2995a88ac", 'hex');
xecjs.Script.toASM(scriptBuffer);
// OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'script.js',
        groupTitle: 'Script'
      }, {
        type: '',
        url: 'Transaction-Builder.addInput()',
        title: 'addInput()',
        name: 'AddInput',
        group: 'TransactionBuilder',
        description: '<p>Add input to transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// txid of vout
let txid = 'f7890915febe580920df2681d2bac0909ae89bd0cc1d3ed763e5eeba7f337f0e';
// add input with txid and index of vout
transactionBuilder.addInput(txid, 0);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction-builder.js',
        groupTitle: 'TransactionBuilder'
      }, {
        type: '',
        url: 'Transaction-Builder.addOutput()',
        title: 'addOutput()',
        name: 'AddOutput',
        group: 'TransactionBuilder',
        description: '<p>Add output to transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let originalAmount = 100000;
let byteCount = xecjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
// amount to send to receiver. It's the original amount - 1 sat/byte for tx size
let sendAmount = originalAmount - byteCount;
// add output w/ address and amount to send
transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction-builder.js',
        groupTitle: 'TransactionBuilder'
      }, {
        type: '',
        url: 'Transaction-Builder.build()',
        title: 'build()',
        name: 'Build.',
        group: 'TransactionBuilder',
        description: '<p>Build transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `// build tx
let tx = xecjs.transactionBuilder.build();`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction-builder.js',
        groupTitle: 'TransactionBuilder'
      }, {
        type: '',
        url: 'Transaction-Builder.setLockTime()',
        title: 'setLockTime()',
        name: 'SetLockTime',
        group: 'TransactionBuilder',
        description: '<p>Set locktime.</p>',
        examples: [{
          title: 'Example usage:',
          content: `let originalAmount = 100000;
let byteCount = xecjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
// amount to send to receiver. It's the original amount - 1 sat/byte for tx size
let sendAmount = originalAmount - byteCount;
// add output w/ address and amount to send
transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
transactionBuilder.setLockTime(50000)`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction-builder.js',
        groupTitle: 'TransactionBuilder'
      }, {
        type: '',
        url: 'Transaction-Builder.sign()',
        title: 'sign()',
        name: 'Sign.',
        group: 'TransactionBuilder',
        description: "<p>Sign transaction. It creates the unlocking script needed to spend an input. Each input has its own script and thus 'sign' must be called for each input even if the keyPair is the same..</p>",
        examples: [{
          title: 'Example usage:',
          content: `let originalAmount = 100000;
// node of address which is going to spend utxo
let hdnode = xecjs.HDNode.fromXPriv("xprvA3eaDg64MwDr72PVGJ7CkvshNAzCDRz7rn98sYrZVAtDSWCAmNGQhEQeCLDcnmcpSkfjhHevXmu4ZL8ZcT9D4vEbG8LpiToZETrHZttw9Yw");
// keypair
let keyPair = xecjs.HDNode.toKeyPair(hdnode);
// empty redeemScript variable
let redeemScript;
// sign w/ keyPair
transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount, transactionBuilder.signatureAlgorithms.SCHNORR);`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction-builder.js',
        groupTitle: 'TransactionBuilder'
      }, {
        type: '',
        url: 'Transaction.get()',
        title: 'get()',
        name: 'get',
        group: 'Transaction',
        description: '<p>Returns an object of transaction data, including addresses for input UTXOs. If it is a SLP token transaction, the token information for inputs and outputs will also be included.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
 let txData = await bchjs.Transaction.get("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
 console.log(txData);
} catch(error) {
console.error(error)
}
})()`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction.js',
        groupTitle: 'Transaction'
      }, {
        type: '',
        url: 'Transaction.getTokenInfo()',
        title: 'getTokenInfo()',
        name: 'getTokenInfo',
        group: 'Transaction',
        description: '<p>Given the TXID of a token transaction, it will return data about that token by retrieving the data from the Genesis transaction and docoding the OP_RETURN.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
try {
 let txData = await bchjs.Transaction.getTokenInfo("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
 console.log(txData);
} catch(error) {
console.error(error)
}
})()`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'transaction.js',
        groupTitle: 'Transaction'
      }, {
        type: '',
        url: 'Utxo.findBiggestUtxo()',
        title: 'findBiggestUtxo()',
        name: 'findBiggestUtxo',
        group: 'UTXO',
        description: '<p>Get the biggest UTXO in an array.</p> <p>Given an array of BCH UTXOs, this method will return the biggest UTXO. This is often the simplest way to pick a UTXO for generating a transaction.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    const utxos = await bchjs.Utxo.get('bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z');
    const utxo = bchjs.Utxo.findBiggestUtxo(utxos[0].bchUtxos)
    console.log(utxo);
  } catch(error) {
   console.error(error)
  }
})()

// returns
 {
  "height": 655431,
  "tx_hash": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
  "tx_pos": 0,
  "value": 800,
  "txid": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
  "vout": 0,
  "isValid": false,
  "satoshis": 800
 }`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'utxo.js',
        groupTitle: 'UTXO'
      }, {
        type: '',
        url: 'Utxo.get()',
        title: 'get()',
        name: 'get',
        group: 'UTXO',
        description: '<p>Get UTXOs for an address (from psf-slp-indexer)</p> <p>Given an address, this function will return an object with thre following properties:</p> <ul> <li>address: &quot;&quot; - the address these UTXOs are associated with</li> <li>bchUtxos: [] - UTXOs confirmed to be spendable as normal BCH</li> <li>nullUtxo: [] - UTXOs that did not pass SLP validation. Should be ignored and not spent, to be safe.</li> <li>slpUtxos: {} - UTXOs confirmed to be colored as valid SLP tokens <ul> <li>type1: {} <ul> <li>tokens: [] - SLP token Type 1 tokens.</li> <li>mintBatons: [] - SLP token Type 1 mint batons.</li> </ul> </li> <li>nft: {} <ul> <li>tokens: [] - NFT tokens</li> <li>groupTokens: [] - NFT Group tokens, used to create NFT tokens.</li> <li>groupMintBatons: [] - Minting baton to create more NFT Group tokens.</li> </ul> </li> </ul> </li> </ul>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let utxos = await bchjs.Utxo.get('simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj');
    console.log(utxos);
  } catch(error) {
   console.error(error)
  }
})()

// returns
[
 {
  "address": "bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv",
  "bchUtxos": [
   {
     "height": 674513,
     "tx_hash": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
     "tx_pos": 3,
     "value": 38134,
     "txid": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
     "vout": 3,
     "isValid": false
   }
  ],`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'utxo.js',
        groupTitle: 'UTXO'
      }, {
        type: '',
        url: 'Util.validateAddress()',
        title: 'validateAddress()',
        name: 'Validate_Address.',
        group: 'Util',
        description: '<p>Return information about the given bitcoin address.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    let validateAddress = await bchjs.Util.validateAddress("bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f");
    console.log(validateAddress);
  } catch(error) {
   console.error(error)
  }
})()

// { isvalid: true,
// address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
// scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
// ismine: true,
// iswatchonly: false,
// isscript: false,
// pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
// iscompressed: true,
// account: 'Test' }

(async () => {
  try {
    let validateAddress = await bchjs.Util.validateAddress(["bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f"]);
    console.log(validateAddress);
  } catch(error) {
   console.error(error)
  }
})()

// [{ isvalid: true,
// address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
// scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
// ismine: true,
// iswatchonly: false,
// isscript: false,
// pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
// iscompressed: true,
// account: 'Test' }]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'Util.chunk100()',
        title: 'chunk100()',
        name: 'chunk100',
        group: 'Util',
        description: '<p>chunk up an array into multiple arrays of 100 elements each. Input: arrayToSlice - a one-dimensional array of elements. Returns a two-dimensional array. An array of 100-element arrays.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
     const bigArray = [0,1,2,3,4,5,6,7,8,9,10,...,148, 149, 150]

     const chunked = bchjs.Util.chunk20(bigArray)
     console.log(chunked)
  } catch(error) {
     console.error(error)
  }
})()

// returns
 [
   [0,1,2,3,4,5,6,7,8,9,10,11,...,98,99],
   [100,101,102,...,148,149,150]
 ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'Util.chunk20()',
        title: 'chunk20()',
        name: 'chunk20',
        group: 'Util',
        description: '<p>chunk up an array into multiple arrays of 20 elements each. Input: arrayToSlice - a one-dimensional array of elements. Returns a two-dimensional array. An array of 20-element arrays.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
     const bigArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]

     const chunked = bchjs.Util.chunk20(bigArray)
     console.log(chunked)
  } catch(error) {
     console.error(error)
  }
})()

// returns
 [
   [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
   [20,21,22,23,24,25,26]
 ]`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'Util.floor2()',
        title: 'floor2()',
        name: 'floor2',
        group: 'Util',
        description: '<p>Round a number down to 2 decimal places.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    const num = 1.234567891111
    const result = bchjs.Util.floor2(num)
    console.log(result)
  } catch(error) {
   console.error(error)
  }
})()

// returns
 1.23`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'Util.floor8()',
        title: 'floor8()',
        name: 'floor8',
        group: 'Util',
        description: '<p>Round a number down to 8 decimal places.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    const num = 1.234567891111
    const result = bchjs.Util.floor8(num)
    console.log(result)
  } catch(error) {
   console.error(error)
  }
})()

// returns
 1.23456789`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'Util.sleep()',
        title: 'sleep()',
        name: 'sleep',
        group: 'Util',
        description: '<p>Promise-based delay. Expects an integer as input, which represents milliseconds. This function will return a Promise that resolves that many milliseconds later.</p>',
        examples: [{
          title: 'Example usage:',
          content: `(async () => {
  try {
    const tenSeconds = 10000
    await bchjs.Util.sleep(tenSeconds)
  } catch(error) {
   console.error(error)
  }
})()`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'util.js',
        groupTitle: 'Util'
      }, {
        type: '',
        url: 'eCash.toSatoshi()',
        title: 'toSatoshi()',
        name: 'toSatoshi',
        group: 'eCash',
        description: '<p>Convert XEC units into satoshi units</p>',
        examples: [{
          title: 'Example usage:',
          content: `// convert 10,704.35 XEC to satoshis:
xecjs.eCash.toSatoshi(10704.35)
// 1070435`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecash.js',
        groupTitle: 'eCash'
      }, {
        type: '',
        url: 'eCash.toXec()',
        title: 'toXec()',
        name: 'toXec',
        group: 'eCash',
        description: '<p>Convert satoshi units to XEC units</p>',
        examples: [{
          title: 'Example usage:',
          content: `// convert 1,070,435 satoshis to XEC:
xecjs.eCash.toSatoshi(1070435)
// 10704.35`,
          type: 'json'
        }],
        version: '0.0.0',
        filename: 'ecash.js',
        groupTitle: 'eCash'
      }]; const Z = { name: 'xec-js', version: '0.0.1', description: 'A JavaScript library for working with eCash and eTokens', title: 'xec-js', url: 'xec-js.', sampleUrl: !1, defaultVersion: '0.0.0', apidoc: '0.3.0', generator: { name: 'apidoc', time: 'Sat May 21 2022 23:35:36 GMT+1000 (Australian Eastern Standard Time)', url: 'https://apidocjs.com', version: '0.50.5' } }; tt(); const de = c().compile(y()('#template-header').html()); const Pe = c().compile(y()('#template-footer').html()); const ne = c().compile(y()('#template-article').html()); const me = c().compile(y()('#template-compare-article').html()); const fe = c().compile(y()('#template-generator').html()); const xe = c().compile(y()('#template-project').html()); const Le = c().compile(y()('#template-sections').html()); const Fe = c().compile(y()('#template-sidenav').html()); const Ne = { aloneDisplay: !1, showRequiredLabels: !1, withGenerator: !0, withCompare: !0 }; Z.template = Object.assign(Ne, (Ct = Z.template) != null ? Ct : {}), Z.template.forceLanguage && vn(Z.template.forceLanguage); const De = (0, a.groupBy)(pe, ve => ve.group); const Me = {}; y().each(De, (ve, ce) => { Me[ve] = (0, a.groupBy)(ce, Ee => Ee.name) }); const We = []; y().each(Me, (ve, ce) => { let Ee = []; y().each(ce, (we, ke) => { const st = ke[0].title; st && Ee.push(st.toLowerCase() + '#~#' + we) }), Ee.sort(), Z.order && (Ee = je(Ee, Z.order, '#~#')), Ee.forEach(we => { const st = we.split('#~#')[1]; ce[st].forEach(Oe => { We.push(Oe) }) }) }), pe = We; let it = {}; const Pt = {}; let Ge = {}; Ge[Z.version] = 1, y().each(pe, (ve, ce) => { it[ce.group] = 1, Pt[ce.group] = ce.groupTitle || ce.group, Ge[ce.version] = 1 }), it = Object.keys(it), it.sort(), Z.order && (it = St(Pt, Z.order)), Ge = Object.keys(Ge), Ge.sort(r().compare), Ge.reverse(); const yt = []; it.forEach(ve => { yt.push({ group: ve, isHeader: !0, title: Pt[ve] }); let ce = ''; pe.forEach(Ee => { Ee.group === ve && (ce !== Ee.name ? yt.push({ title: Ee.title, group: ve, name: Ee.name, type: Ee.type, version: Ee.version, url: Ee.url }) : yt.push({ title: Ee.title, group: ve, hidden: !0, name: Ee.name, type: Ee.type, version: Ee.version, url: Ee.url }), ce = Ee.name) }) }); function j (ve, ce, Ee) { let we = !1; if (!ce) return we; const ke = ce.match(/<h(1|2).*?>(.+?)<\/h(1|2)>/gi); return ke && ke.forEach(function (st) { const Oe = st.substring(2, 3); const qt = st.replace(/<.+?>/g, ''); const An = st.match(/id="api-([^-]+)(?:-(.+))?"/); const Sn = An ? An[1] : null; const Dn = An ? An[2] : null; Oe === '1' && qt && Sn && (ve.splice(Ee, 0, { group: Sn, isHeader: !0, title: qt, isFixed: !0 }), Ee++, we = !0), Oe === '2' && qt && Sn && Dn && (ve.splice(Ee, 0, { group: Sn, name: Dn, isHeader: !1, title: qt, isFixed: !1, version: '1.0' }), Ee++) }), we } let U; if (Z.header && (U = j(yt, Z.header.content, 0), U || yt.unshift({ group: '_header', isHeader: !0, title: Z.header.title == null ? $t('General') : Z.header.title, isFixed: !0 })), Z.footer) { const ve = yt.length; U = j(yt, Z.footer.content, yt.length), !U && Z.footer.title != null && yt.splice(ve, 0, { group: '_footer', isHeader: !0, title: Z.footer.title, isFixed: !0 }) } const G = Z.title ? Z.title : 'apiDoc: ' + Z.name + ' - ' + Z.version; y()(document).attr('title', G), y()('#loader').remove(); const re = { nav: yt }; y()('#sidenav').append(Fe(re)), y()('#generator').append(fe(Z)), (0, a.extend)(Z, { versions: Ge }), y()('#project').append(xe(Z)), Z.header && y()('#header').append(de(Z.header)), Z.footer && (y()('#footer').append(Pe(Z.footer)), Z.template.aloneDisplay && document.getElementById('api-_footer').classList.add('hide')); const Y = {}; let ie = ''; it.forEach(function (ve) { const ce = []; let Ee = ''; let we = {}; let ke = ve; let st = ''; Y[ve] = {}, pe.forEach(function (Oe) { ve === Oe.group && (Ee !== Oe.name ? (pe.forEach(function (qt) { ve === qt.group && Oe.name === qt.name && (Object.prototype.hasOwnProperty.call(Y[Oe.group], Oe.name) || (Y[Oe.group][Oe.name] = []), Y[Oe.group][Oe.name].push(qt.version)) }), we = { article: Oe, versions: Y[Oe.group][Oe.name] }) : we = { article: Oe, hidden: !0, versions: Y[Oe.group][Oe.name] }, Z.sampleUrl && Z.sampleUrl === !0 && (Z.sampleUrl = window.location.origin), Z.url && we.article.url.substr(0, 4).toLowerCase() !== 'http' && (we.article.url = Z.url + we.article.url), _e(we, Oe), Oe.groupTitle && (ke = Oe.groupTitle), Oe.groupDescription && (st = Oe.groupDescription), ce.push({ article: ne(we), group: Oe.group, name: Oe.name, aloneDisplay: Z.template.aloneDisplay }), Ee = Oe.name) }), we = { group: ve, title: ke, description: st, articles: ce, aloneDisplay: Z.template.aloneDisplay }, ie += Le(we) }), y()('#sections').append(ie), Z.template.aloneDisplay || (document.body.dataset.spy = 'scroll', y()('body').scrollspy({ target: '#scrollingNav' })), y()('.form-control').on('focus change', function () { y()(this).removeClass('border-danger') }), y()('.sidenav').find('a').on('click', function (ve) { ve.preventDefault(); const ce = this.getAttribute('href'); if (Z.template.aloneDisplay) { const Ee = document.querySelector('.sidenav > li.active'); Ee && Ee.classList.remove('active'), this.parentNode.classList.add('active') } else { const Ee = document.querySelector(ce); Ee && y()('html,body').animate({ scrollTop: Ee.offsetTop }, 400) }window.location.hash = ce }); function ae (ve) { let ce = !1; return y().each(ve, Ee => { ce = ce || (0, a.some)(ve[Ee], we => we.type) }), ce } function be () { y()('button[data-toggle="popover"]').popover().click(function (ce) { ce.preventDefault() }); const ve = y()('#version strong').html(); if (y()('#sidenav li').removeClass('is-new'), Z.template.withCompare && y()("#sidenav li[data-version='" + ve + "']").each(function () { const ce = y()(this).data('group'); const Ee = y()(this).data('name'); const we = y()("#sidenav li[data-group='" + ce + "'][data-name='" + Ee + "']").length; const ke = y()("#sidenav li[data-group='" + ce + "'][data-name='" + Ee + "']").index(y()(this)); (we === 1 || ke === we - 1) && y()(this).addClass('is-new') }), y()('.nav-tabs-examples a').click(function (ce) { ce.preventDefault(), y()(this).tab('show') }), y()('.nav-tabs-examples').find('a:first').tab('show'), y()('.sample-request-content-type-switch').change(function () { y()(this).val() === 'body-form-data' ? (y()('#sample-request-body-json-input-' + y()(this).data('id')).hide(), y()('#sample-request-body-form-input-' + y()(this).data('id')).show()) : (y()('#sample-request-body-form-input-' + y()(this).data('id')).hide(), y()('#sample-request-body-json-input-' + y()(this).data('id')).show()) }), Z.template.aloneDisplay && (y()('.show-group').click(function () { const ce = '.' + y()(this).attr('data-group') + '-group'; const Ee = '.' + y()(this).attr('data-group') + '-article'; y()('.show-api-group').addClass('hide'), y()(ce).removeClass('hide'), y()('.show-api-article').addClass('hide'), y()(Ee).removeClass('hide') }), y()('.show-api').click(function () { const ce = this.getAttribute('href').substring(1); const Ee = document.getElementById('version').textContent.trim(); const we = `.${this.dataset.name}-article`; const ke = `[id="${ce}-${Ee}"]`; const st = `.${this.dataset.group}-group`; y()('.show-api-group').addClass('hide'), y()(st).removeClass('hide'), y()('.show-api-article').addClass('hide'); let Oe = y()(we); y()(ke).length && (Oe = y()(ke).parent()), Oe.removeClass('hide'), ce.match(/_(header|footer)/) && document.getElementById(ce).classList.remove('hide') })), Z.template.aloneDisplay || y()('body').scrollspy('refresh'), Z.template.aloneDisplay) { const ce = window.location.hash; if (ce != null && ce.length !== 0) { const Ee = document.getElementById('version').textContent.trim(); const we = document.querySelector(`li .${ce.slice(1)}-init`); const ke = document.querySelector(`li[data-version="${Ee}"] .show-api.${ce.slice(1)}-init`); let st = we; ke && (st = ke), st.click() } } } function Se (ve) { typeof ve === 'undefined' ? ve = y()('#version strong').html() : y()('#version strong').html(ve), y()('article').addClass('hide'), y()('#sidenav li:not(.nav-fixed)').addClass('hide'); const ce = {}; document.querySelectorAll('article[data-version]').forEach(Ee => { const we = Ee.dataset.group; const ke = Ee.dataset.name; const st = Ee.dataset.version; const Oe = we + ke; !ce[Oe] && r().lte(st, ve) && (ce[Oe] = !0, document.querySelector(`article[data-group="${we}"][data-name="${ke}"][data-version="${st}"]`).classList.remove('hide'), document.querySelector(`#sidenav li[data-group="${we}"][data-name="${ke}"][data-version="${st}"]`).classList.remove('hide'), document.querySelector(`#sidenav li.nav-header[data-group="${we}"]`).classList.remove('hide')) }), y()('article[data-version]').each(function (Ee) { const we = y()(this).data('group'); y()('section#api-' + we).removeClass('hide'), y()('section#api-' + we + ' article:visible').length === 0 ? y()('section#api-' + we).addClass('hide') : y()('section#api-' + we).removeClass('hide') }) } if (Se(), y()('#versions li.version a').on('click', function (ve) { ve.preventDefault(), Se(y()(this).html()) }), y()('#compareAllWithPredecessor').on('click', Ie), y()('article .versions li.version a').on('click', Be), y().urlParam = function (ve) { const ce = new RegExp('[\\?&amp;]' + ve + '=([^&amp;#]*)').exec(window.location.href); return ce && ce[1] ? ce[1] : null }, y().urlParam('compare') && y()('#compareAllWithPredecessor').trigger('click'), window.location.hash) { const ve = decodeURI(window.location.hash); y()(ve).length > 0 && y()('html,body').animate({ scrollTop: parseInt(y()(ve).offset().top) }, 0) }y()('#scrollingNav .sidenav-search input.search').focus(), y()('[data-action="filter-search"]').on('keyup', ve => { const ce = ve.currentTarget.value.toLowerCase(); y()('.sidenav').find('a.nav-list-item').each((Ee, we) => { y()(we).show(), we.innerText.toLowerCase().includes(ce) || y()(we).hide() }) }), y()('span.search-reset').on('click', function () { y()('#scrollingNav .sidenav-search input.search').val('').focus(), y()('.sidenav').find('a.nav-list-item').show() }); function Be (ve) { ve.preventDefault(); const ce = y()(this).parents('article'); const Ee = y()(this).html(); const we = ce.find('.version'); const ke = we.find('strong').html(); we.find('strong').html(Ee); const st = ce.data('group'); const Oe = ce.data('name'); const qt = ce.data('version'); const An = ce.data('compare-version'); if (An !== Ee && !(!An && qt === Ee)) { if (An && Y[st][Oe][0] === Ee || qt === Ee)ot(st, Oe, qt); else { let Sn = {}; let Dn = {}; y().each(Me[st][Oe], function (Bs, rr) { rr.version === qt && (Sn = rr), rr.version === Ee && (Dn = rr) }); const ht = { article: Sn, compare: Dn, versions: Y[st][Oe] }; ht.article.id = ht.article.group + '-' + ht.article.name + '-' + ht.article.version, ht.article.id = ht.article.id.replace(/\./g, '_'), ht.compare.id = ht.compare.group + '-' + ht.compare.name + '-' + ht.compare.version, ht.compare.id = ht.compare.id.replace(/\./g, '_'); let gt = Sn; gt.parameter && gt.parameter.fields && (ht._hasTypeInParameterFields = ae(gt.parameter.fields)), gt.error && gt.error.fields && (ht._hasTypeInErrorFields = ae(gt.error.fields)), gt.success && gt.success.fields && (ht._hasTypeInSuccessFields = ae(gt.success.fields)), gt.info && gt.info.fields && (ht._hasTypeInInfoFields = ae(gt.info.fields)), gt = Dn, ht._hasTypeInParameterFields !== !0 && gt.parameter && gt.parameter.fields && (ht._hasTypeInParameterFields = ae(gt.parameter.fields)), ht._hasTypeInErrorFields !== !0 && gt.error && gt.error.fields && (ht._hasTypeInErrorFields = ae(gt.error.fields)), ht._hasTypeInSuccessFields !== !0 && gt.success && gt.success.fields && (ht._hasTypeInSuccessFields = ae(gt.success.fields)), ht._hasTypeInInfoFields !== !0 && gt.info && gt.info.fields && (ht._hasTypeInInfoFields = ae(gt.info.fields)); const Ei = me(ht); ce.after(Ei), ce.next().find('.versions li.version a').on('click', Be), y()("#sidenav li[data-group='" + st + "'][data-name='" + Oe + "'][data-version='" + ke + "']").addClass('has-modifications'), ce.remove() }m().highlightAll() } } function Ie (ve) { ve.preventDefault(), y()('article:visible .versions').each(function () { const Ee = y()(this).parents('article').data('version'); let we = null; y()(this).find('li.version a').each(function () { y()(this).html() < Ee && !we && (we = y()(this)) }), we && we.trigger('click') }) } function _e (ve, ce) { ve.id = ve.article.group + '-' + ve.article.name + '-' + ve.article.version, ve.id = ve.id.replace(/\./g, '_'), ce.header && ce.header.fields && (ve._hasTypeInHeaderFields = ae(ce.header.fields)), ce.parameter && ce.parameter.fields && (ve._hasTypeInParameterFields = ae(ce.parameter.fields)), ce.error && ce.error.fields && (ve._hasTypeInErrorFields = ae(ce.error.fields)), ce.success && ce.success.fields && (ve._hasTypeInSuccessFields = ae(ce.success.fields)), ce.info && ce.info.fields && (ve._hasTypeInInfoFields = ae(ce.info.fields)), ve.template = Z.template } function Ye (ve, ce, Ee) { let we = {}; y().each(Me[ve][ce], function (st, Oe) { Oe.version === Ee && (we = Oe) }); const ke = { article: we, versions: Y[ve][ce] }; return _e(ke, we), ne(ke) } function ot (ve, ce, Ee) { const we = y()("article[data-group='" + ve + "'][data-name='" + ce + "']:visible"); const ke = Ye(ve, ce, Ee); we.after(ke), we.next().find('.versions li.version a').on('click', Be), y()("#sidenav li[data-group='" + ve + "'][data-name='" + ce + "'][data-version='" + Ee + "']").removeClass('has-modifications'), we.remove() } function je (ve, ce, Ee) { const we = []; return ce.forEach(function (ke) { Ee ? ve.forEach(function (st) { const Oe = st.split(Ee); (Oe[0] === ke || Oe[1] === ke) && we.push(st) }) : ve.forEach(function (st) { st === ke && we.push(ke) }) }), ve.forEach(function (ke) { we.indexOf(ke) === -1 && we.push(ke) }), we } function St (ve, ce) { const Ee = []; return ce.forEach(we => { Object.keys(ve).forEach(ke => { ve[ke].replace(/_/g, ' ') === we && Ee.push(ke) }) }), Object.keys(ve).forEach(we => { Ee.indexOf(we) === -1 && Ee.push(we) }), Ee }be()
    }
  })()
})()
