"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ════════════════════════════════════════════════════════════════
   WORLD CONSTANTS  (all game coordinates live in a 480×270 viewBox)
   ════════════════════════════════════════════════════════════════ */
const W = 480
const GROUND = 214
const CHAR_H = 42
const CHAR_Y = GROUND - CHAR_H // standing position
const JUMP_Y = CHAR_Y - 26 // apex: head meets the underside of a block
const BLOCK_TOP = 116
const BLOCK_SIZE = 33
const BX = [150, 290] // question-block x positions
const SPEED = 106 // running speed (units / second)
const PORTAL_X = 440

/* ════════════════════════════════════════════════════════════════
   PIXEL ART  — drawn from string grids, rendered as one <path> per colour
   ════════════════════════════════════════════════════════════════ */
function toPaths(rows, palette, px) {
    const byColor = {}
    rows.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
            const c = palette[row[x]]
            if (!c) continue
                ; (byColor[c] ||= []).push(`M${x * px} ${y * px}h${px}v${px}h-${px}z`)
        }
    })
    return Object.entries(byColor).map(([fill, d]) => ({ fill, d: d.join("") }))
}

function rng(seed) {
    let s = seed
    return () => (s = (s * 16807) % 2147483647) / 2147483647
}

/* ── Hero: an original hooded dev with a gamer headset ── */
const CHAR_PAL = { H: "#4d7c0f", B: "#A3E635", S: "#fcd9b6", E: "#0a0a0a", P: "#475569", D: "#f5f5f5", V: "#d9f99d" }
const TOP = [
    "..HHHHHH..",
    ".HHHHHHHH.",
    ".HSSSSSSH.",
    "VHSESSESHV",
    "VHSSSSSSHV",
    "..SSSSSS..",
    ".BBBBBBBB.",
    "BBBBBBBBBB",
    "SBBBBBBBBS",
    "SBBBBBBBBS",
    ".BBBBBBBB.",
]
const TOP_JUMP = [
    ...TOP.slice(0, 5),
    "S.SSSSSS.S",
    "SBBBBBBBBS",
    "BBBBBBBBBB",
    ".BBBBBBBB.",
    ".BBBBBBBB.",
    ".BBBBBBBB.",
]
const FRAMES = {
    idle: [...TOP, "..PPPPPP..", "..PP..PP..", ".DDD..DDD."],
    run1: [...TOP, "..PPPPPP..", ".PPP..PPP.", "DDD....DDD"],
    run2: [...TOP, "..PPPPPP..", "...PP.PP..", "..DDD.DD.."],
    jump: [...TOP_JUMP, ".PPPPPPPP.", "PPP....PPP", "DD......DD"],
}
const FRAME_PATHS = Object.fromEntries(Object.entries(FRAMES).map(([k, rows]) => [k, toPaths(rows, CHAR_PAL, 3)]))

/* ── Question block ── */
const BLOCK_ROWS = [
    "eeeeeeeeeee",
    "edaaaaaaade",
    "eaaaaaaaaae",
    "eaaakkkaaae",
    "eaaaaakaaae",
    "eaaaakkaaae",
    "eaaaaaaaaae",
    "eaaaakaaaae",
    "eaaaaaaaaae",
    "edaaaaaaade",
    "eeeeeeeeeee",
]
const BLOCK_LIVE = toPaths(BLOCK_ROWS, { e: "#4d7c0f", a: "#A3E635", d: "#3f6212", k: "#1a2e05" }, 3)
const BLOCK_USED = toPaths(BLOCK_ROWS.map((r) => r.replace(/k/g, "a")), { e: "#27272a", a: "#3f3f46", d: "#52525b" }, 3)

/* ── Coin ── */
const COIN = toPaths([".aaa.", "abbba", "abbba", "abbba", "abbba", "abbba", ".aaa."], { a: "#FACC15", b: "#FDE68A" }, 2)
const COINS = [
    [70, 150],
    [214, 146],
    [236, 146],
    [362, 146],
    [384, 146],
]

/* ── Skill power-ups (11×11 icons, each its own silhouette, glow and particle effect) ── */
const SKILLS = [
    {
        id: "js", name: "JavaScript", desc: "Core Programming", color: "#FACC15", fx: "burst",
        rows: ["aaaaaaaaaaa", "aaaaaaaaaaa", "aaaaaaaaaaa", "aaaakaakkaa", "aaaakakaaaa", "aaaakaakaaa", "aakakaaakaa", "aaakaakkaaa", "aaaaaaaaaaa", "aaaaaaaaaaa", "aaaaaaaaaaa"],
    },
    {
        id: "react", name: "React", desc: "Frontend Development", color: "#38BDF8", fx: "ring",
        rows: ["...aaaaa...", "..a.....a..", ".a.......a.", "a....w....a", "a....w....a", "a...www...a", "a....w....a", "a....w....a", ".a.......a.", "..a.....a..", "...aaaaa..."],
    },
    {
        id: "node", name: "Node.js", desc: "Backend Development", color: "#4ADE80", fx: "rise",
        rows: ["...aaaaa...", "..aaaaaaa..", ".aaaaaaaaa.", "aaaaaaaaaaa", "aaaaakaaaaa", "aaaakkkaaaa", "aaaaakaaaaa", "aaaaaaaaaaa", ".aaaaaaaaa.", "..aaaaaaa..", "...aaaaa..."],
    },
    {
        id: "mongo", name: "MongoDB", desc: "Database Management", color: "#2DD4BF", fx: "drip",
        rows: ["..wwwwwww..", ".aaaaaaaaa.", ".aaaaaaaaa.", "..kkkkkkk..", ".aaaaaaaaa.", ".aaaaaaaaa.", "..kkkkkkk..", ".aaaaaaaaa.", ".aaaaaaaaa.", "..aaaaaaa..", "...aaaaa..."],
    },
    {
        id: "dsa", name: "DSA", desc: "Problem Solving", color: "#FB923C", fx: "cross",
        rows: ["...........", "....aaa....", "....aaa....", "...a...a...", "..a.....a..", ".aaa...aaa.", ".aaa...aaa.", ".aaa...aaa.", "..a.....a..", ".aaa...aaa.", ".aaa...aaa."],
    },
    {
        id: "ai", name: "AI", desc: "Intelligent Integrations", color: "#C084FC", fx: "spark",
        rows: [".....a.....", ".....a.....", "....aaa....", "....aaa....", "...aaaaa...", "aaaaawaaaaa", "...aaaaa...", "....aaa....", "....aaa....", ".....a.....", ".....a....."],
    },
    {
        id: "rest", name: "REST APIs", desc: "Application Communication", color: "#F5F5F5", fx: "stream",
        rows: ["...........", "........a..", "........aa.", "aaaaaaaaaaa", "........aa.", "........a..", "..a........", ".aa........", "aaaaaaaaaaa", ".aa........", "..a........"],
    },
]
const ICON_PATHS = SKILLS.map((s) => toPaths(s.rows, { a: s.color, w: "#ffffff", k: "#0a0a0a" }, 2))

/* ── Parallax layers (periodic, so a linear drift loops seamlessly) ── */
const FAR_P = 120
const MID_P = 240
const STARS_D = (() => {
    const r = rng(11)
    const pts = Array.from({ length: 10 }, () => [Math.floor(r() * FAR_P), 10 + Math.floor(r() * 110), r() > 0.75 ? 3 : 2])
    let d = ""
    for (let k = 0; k < 5; k++) pts.forEach(([x, y, s]) => (d += `M${x + k * FAR_P} ${y}h${s}v${s}h-${s}z`))
    return d
})()
const { SKY_D, WIN_D } = (() => {
    const r = rng(5)
    const cols = []
    let h = 30
    for (let i = 0; i < MID_P / 8; i++) {
        if (i % 3 === 0) h = 20 + Math.floor(r() * 6) * 8
        cols.push(h)
    }
    let sky = ""
    let win = ""
    for (let k = 0; k < 3; k++)
        cols.forEach((ch, i) => {
            const x = k * MID_P + i * 8
            sky += `M${x} ${GROUND - ch}h8v${ch}h-8z`
            if (r() > 0.72) win += `M${x + 3} ${GROUND - ch + 6 + Math.floor(r() * 3) * 8}h2v2h-2z`
        })
    return { SKY_D: sky, WIN_D: win }
})()
const BRICK_D = (() => {
    let d = ""
    for (let r = 0; r < 3; r++) {
        const y = 222 + r * 16
        d += `M0 ${y}H${W}`
        for (let x = (r % 2) * 16; x < W; x += 32) d += `M${x} ${y}v16`
    }
    return d
})()

/* ── Particle recipes: each skill gets its own signature ── */
const rnd = gsap.utils.random
const ringFx = (n, r0, r1, d) => (x, y) =>
    Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2
        return { x: x + Math.cos(a) * r0, y: y + Math.sin(a) * r0, dx: Math.cos(a) * (r1 - r0), dy: Math.sin(a) * (r1 - r0), d }
    })
const FX = {
    burst: ringFx(10, 4, 32, 0.55),
    ring: ringFx(14, 12, 38, 0.7),
    cross: (x, y) =>
        Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            const r = i % 2 ? 22 : 34
            return { x, y, dx: Math.cos(a) * r, dy: Math.sin(a) * r, d: 0.6 }
        }),
    rise: (x, y) => Array.from({ length: 9 }, (_, i) => ({ x: x + rnd(-10, 10), y: y + rnd(0, 8), dx: rnd(-6, 6), dy: -rnd(26, 52), d: 0.7, delay: i * 0.04 })),
    drip: (x, y) => Array.from({ length: 8 }, (_, i) => ({ x: x + rnd(-12, 12), y: y - 10, dx: rnd(-3, 3), dy: rnd(22, 42), d: 0.6, delay: i * 0.04, ease: "power2.in" })),
    spark: (x, y) => Array.from({ length: 10 }, () => ({ x, y, dx: rnd(-34, 34), dy: rnd(-34, 34), d: rnd(0.35, 0.7), ease: "power1.in" })),
    stream: (x, y) => Array.from({ length: 10 }, (_, i) => ({ x, y: y + rnd(-6, 6), dx: (i % 2 ? 1 : -1) * rnd(24, 54), dy: rnd(-4, 4), d: 0.6 })),
    dust: (x, y) => Array.from({ length: 5 }, (_, i) => ({ x: x + (i - 2) * 4, y, dx: (i - 2) * 7, dy: -rnd(3, 9), d: 0.35 })),
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function DeveloperGame({ className = "" }) {
    const rootRef = useRef(null)
    const cursor = useRef(0) // sequential skill counter → deterministic, bug-free rotation

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const q = (s) => root.querySelector(s)
        const qa = (s) => Array.from(root.querySelectorAll(s))
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const scene = q("[data-scene]")
        const stage = q("[data-stage]")
        const char = q("[data-char]")
        const frames = Object.fromEntries(Object.keys(FRAMES).map((k) => [k, q(`[data-frame="${k}"]`)]))
        const blocks = [0, 1].map((i) => ({
            root: q(`[data-block="${i}"]`),
            live: q(`[data-block="${i}"] [data-live]`),
            used: q(`[data-block="${i}"] [data-used]`),
        }))
        const bglows = qa("[data-bglow]")
        const pus = [0, 1].map((i) => ({
            root: q(`[data-pu="${i}"]`),
            halo: qa(`[data-pu="${i}"] [data-halo]`),
            icons: qa(`[data-pu="${i}"] [data-icon]`),
        }))
        const pool = qa("[data-p]")
        const flash = q("[data-flash]")
        const portal = { frame: q('[data-hover="portal"]'), glow: q("[data-portal-glow]"), core: q("[data-portal-core]") }
        const toastPos = q("[data-toast-pos]")
        const toast = q("[data-toast]")
        const toastText = q("[data-toast-text]")
        const status = q("[data-status]")
        const count = q("[data-count]")
        const pips = qa("[data-pip]")
        const coins = qa("[data-coin]")
        const layers = { far: q('[data-layer="far"]'), mid: q('[data-layer="mid"]') }
        const pars = { far: q('[data-par="far"]'), mid: q('[data-par="mid"]') }

        // Reset DOM state (also makes React StrictMode's double-mount safe)
        Object.values(frames).forEach((f) => (f.style.display = "none"))
        frames.idle.style.display = "block"
        let curFrame = "idle"

        const cleanups = []
        let ctx
        let toastTl = null

        ctx = gsap.context(() => {
            /* ── small helpers ── */
            const setFrame = (name) => {
                if (name === curFrame) return
                frames[curFrame].style.display = "none"
                frames[name].style.display = "block"
                curFrame = name
            }
            const setStatus = (text, color = "") => {
                status.textContent = text
                status.style.color = color
            }
            const lit = new Set()
            const setCount = () => (count.textContent = `${String(lit.size).padStart(2, "0")}/${String(SKILLS.length).padStart(2, "0")}`)
            const slotSkill = [0, 0]
            const nextSkill = () => cursor.current++ % SKILLS.length
            const showSkill = (slot, idx) => {
                pus[slot].icons.forEach((el, i) => (el.style.display = i === idx ? "block" : "none"))
                pus[slot].halo.forEach((h) => h.setAttribute("fill", SKILLS[idx].color))
            }

            let pi = 0
            const emit = (type, cx, cy, color) => {
                FX[type](cx, cy).forEach((s) => {
                    const el = pool[pi++ % pool.length]
                    gsap.killTweensOf(el)
                    gsap.set(el, { opacity: 0, attr: { fill: color } })
                    gsap.fromTo(
                        el,
                        { x: s.x, y: s.y, opacity: 1, scale: 1 },
                        { x: s.x + s.dx, y: s.y + s.dy, opacity: 0, scale: 0.2, duration: s.d, delay: s.delay || 0, ease: s.ease || "power2.out", immediateRender: false }
                    )
                })
            }
            const flashAt = (x, y, color) => {
                gsap.killTweensOf(flash)
                gsap.set(flash, { attr: { stroke: color } })
                gsap.fromTo(flash, { x, y, scale: 0.4, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 0.45, ease: "power2.out", immediateRender: false })
            }
            const charCenter = () => [gsap.getProperty(char, "x") + 15, gsap.getProperty(char, "y") + 16]

            const showToast = (sk) => {
                if (toastTl) toastTl.kill()
                toastText.textContent = `+ ${sk.name}`
                toast.style.borderColor = sk.color
                toast.style.color = sk.color
                const follow = () => {
                    const s = stage.clientWidth / W
                    gsap.set(toastPos, {
                        x: gsap.utils.clamp(48, stage.clientWidth - 48, (gsap.getProperty(char, "x") + 15) * s),
                        y: Math.max(26, (gsap.getProperty(char, "y") - 6) * s),
                    })
                }
                follow()
                toastTl = gsap
                    .timeline({ onUpdate: follow })
                    .fromTo(toast, { opacity: 0, y: 6, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(2)" })
                    .to(toast, { opacity: 0, y: -14, duration: 0.35, ease: "power1.in" }, "+=1")
            }

            /* ── game events (always invoked from timeline callbacks via at()) ── */
            const hit = (slot) => {
                const b = blocks[slot]
                gsap.timeline().to(b.root, { y: -9, duration: 0.07, ease: "power2.out" }).to(b.root, { y: 0, duration: 0.22, ease: "bounce.out" })
                gsap.set(b.live, { opacity: 0 })
                gsap.set(b.used, { opacity: 1 })
                const idx = nextSkill()
                slotSkill[slot] = idx
                showSkill(slot, idx)
                gsap.set(pus[slot].root, { x: BX[slot] + BLOCK_SIZE / 2, y: 136, scale: 0.6, opacity: 1 }) // <-- add this line
                emit(SKILLS[idx].fx, BX[slot] + BLOCK_SIZE / 2, BLOCK_TOP - 4, SKILLS[idx].color)
            }
            const collect = (slot) => {
                const idx = slotSkill[slot]
                const sk = SKILLS[idx]
                const [cx, cy] = charCenter()
                gsap.set(pus[slot].root, { opacity: 0 })
                emit(sk.fx, cx, cy, sk.color)
                flashAt(cx, cy, sk.color)
                if (idx === 0) {
                    lit.clear()
                    pips.forEach((p) => gsap.set(p, { backgroundColor: "#262626" }))
                }
                lit.add(idx)
                setCount()
                gsap.fromTo(pips[idx], { scaleY: 2.4, backgroundColor: "#ffffff" }, { scaleY: 1, backgroundColor: sk.color, duration: 0.4, ease: "power2.out" })
                setStatus(`SKILL UNLOCKED ▸ ${sk.name} — ${sk.desc}`, sk.color)
                gsap.fromTo(status, { opacity: 0.2 }, { opacity: 1, duration: 0.3 })
                showToast(sk)
            }

            const rearm = () => {
                blocks.forEach((b) => {
                    gsap.to(b.live, { opacity: 1, duration: 0.5 })
                    gsap.to(b.used, { opacity: 0, duration: 0.5 })
                    gsap.set(b.root, { y: 0 })
                })
                pus.forEach((p) => gsap.set(p.root, { opacity: 0 }))
                setStatus("RUN ▸ COLLECT SKILLS")
            }

            /* ── initial / static states ── */
            gsap.set(char, { x: -40, y: CHAR_Y, transformOrigin: "50% 100%" })
            gsap.set(pars.far, { x: 0 })
            gsap.set(coins, { transformOrigin: "50% 50%" })
            gsap.set(portal.glow, { opacity: 0.08 })
            gsap.set(portal.core, { opacity: 0.35 })
            gsap.set(bglows, { opacity: 0.12 })
            gsap.set(pool, { opacity: 0 })
            gsap.set(flash, { opacity: 0 })
            gsap.set(toast, { opacity: 0 })
            gsap.set(pus.map((p) => p.root), { opacity: 0 })
            setStatus("PRESS START")
            pips.forEach((p) => gsap.set(p, { backgroundColor: "#262626" }))
            setCount()

            if (reduce) {
                // Static composition: no timeline, no ScrollTrigger, nothing moving.
                gsap.set(scene, { opacity: 1, y: 0 })
                gsap.set(char, { x: 196, y: CHAR_Y })
                gsap.set(blocks[0].live, { opacity: 0 })
                gsap.set(blocks[0].used, { opacity: 1 })
                slotSkill[0] = 0
                showSkill(0, 0)
                gsap.set(pus[0].root, { x: BX[0] + BLOCK_SIZE / 2, y: 78, opacity: 1 })
                gsap.set(pips[0], { backgroundColor: SKILLS[0].color })
                lit.add(0)
                setCount()
                setStatus(`SKILL UNLOCKED ▸ ${SKILLS[0].name} — ${SKILLS[0].desc}`, SKILLS[0].color)
                return
            }

            gsap.set(scene, { opacity: 0, y: 24 })

            /* ════════════ MASTER TIMELINE — one loop = one level run ════════════ */
            const tl = gsap.timeline({ paused: true, repeat: -1 })
            const at = (time, fn) => tl.call(() => ctx.add(fn), null, time)
            const dur = (a, b) => (b - a) / SPEED
            const runProxy = { f: 0 }

            // Running: x movement + frame flipping share one tween window
            const run = (t0, x0, x1) => {
                const d = dur(x0, x1)
                tl.fromTo(char, { x: x0 }, { x: x1, duration: d, ease: "none", immediateRender: false }, t0)
                tl.fromTo(
                    runProxy,
                    { f: 0 },
                    { f: d / 0.11, duration: d, ease: "none", immediateRender: false, onUpdate: () => setFrame(Math.floor(runProxy.f) % 2 ? "run2" : "run1") },
                    t0
                )
                return d
            }

            // Power-up life: emerge → float → home in on the player → collect
            const powerUp = (slot, hitT) => {
                const p = pus[slot]
                const cx = BX[slot] + BLOCK_SIZE / 2
                tl.fromTo(
                    p.root,
                    { x: cx, y: 136, scale: 0.6, opacity: 1 },
                    { x: cx, y: 84, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false },
                    hitT
                )
                tl.fromTo(p.root, { y: 84 }, { y: 76, duration: 0.25, ease: "sine.inOut", immediateRender: false }, hitT + 0.45)
                tl.fromTo(p.halo, { scale: 0.9 }, { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, hitT + 0.1)
                const homing = { p: 0, sx: 0, sy: 0 }
                tl.fromTo(
                    homing,
                    { p: 0 },
                    {
                        p: 1,
                        duration: 0.4,
                        ease: "power2.in",
                        immediateRender: false,
                        onStart: () => {
                            homing.sx = gsap.getProperty(p.root, "x")
                            homing.sy = gsap.getProperty(p.root, "y")
                        },
                        onUpdate: () => {
                            const [tx, ty] = charCenter()
                            gsap.set(p.root, { x: homing.sx + (tx - homing.sx) * homing.p, y: homing.sy + (ty - homing.sy) * homing.p, scale: 1 - 0.5 * homing.p })
                        },
                        onComplete: () => ctx.add(() => collect(slot)),
                    },
                    hitT + 0.7
                )
            }

            // Jump → head hits block → block bumps → fall → land with dust & squash
            const jumpHit = (t0, slot) => {
                const x0 = BX[slot] - 20
                const bx = BX[slot]
                at(t0, () => setFrame("jump"))
                tl.fromTo(char, { x: x0, y: CHAR_Y }, { x: bx, y: JUMP_Y, duration: 0.26, ease: "power2.out", immediateRender: false }, t0)
                at(t0 + 0.26, () => hit(slot))
                tl.fromTo(char, { x: bx, y: JUMP_Y }, { x: bx + 14, y: CHAR_Y, duration: 0.3, ease: "power2.in", immediateRender: false }, t0 + 0.26)
                at(t0 + 0.56, () => {
                    setFrame("run1")
                    emit("dust", charCenter()[0], GROUND - 2, "#9ca3af")
                })
                tl.fromTo(char, { scaleX: 1.12, scaleY: 0.82 }, { scaleX: 1, scaleY: 1, duration: 0.18, ease: "power2.out", immediateRender: false }, t0 + 0.56)
                powerUp(slot, t0 + 0.26)
                return 0.56
            }

            let t = 0
            tl.set(char, { x: -40, y: CHAR_Y, scale: 1, opacity: 1 }, 0)
            at(0, () => {
                setFrame("run1")
                setStatus("RUN ▸ COLLECT SKILLS")
            })

            // PHASE 1 · entry — hero runs in from the left
            t += run(t, -40, BX[0] - 20)
            // PHASE 2 · first block
            t += jumpHit(t, 0)
            // PHASE 3 · progression — second block, different skill
            t += run(t, BX[0] + 14, BX[1] - 20)
            t += jumpHit(t, 1)
            t += run(t, BX[1] + 14, 410)

            // PHASE 4 · portal → reset → loop
            const tp = t
            at(tp, () => setFrame("idle"))
            tl.fromTo(char, { x: 410, scale: 1, opacity: 1 }, { x: PORTAL_X - 15, scale: 0.2, opacity: 0, duration: 0.4, ease: "power2.in", immediateRender: false }, tp)
            tl.fromTo(portal.core, { opacity: 0.35 }, { opacity: 0.95, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, tp)
            at(tp + 0.25, () => {
                emit("ring", PORTAL_X, 184, "#A3E635")
                setStatus("LEVEL CLEAR ▸ LOADING NEXT RUN", "#A3E635")
            })
            at(tp + 0.5, rearm)
            tl.to({}, { duration: 0.9 }, tp + 0.4) // quiet beat so the loop never snaps

            // Parallax tied to the same master timeline → seamless on every repeat
            const total = tl.duration()
            tl.fromTo(layers.far, { x: 0 }, { x: -FAR_P, duration: total, ease: "none", immediateRender: false }, 0)
            tl.fromTo(layers.mid, { x: 0 }, { x: -MID_P, duration: total, ease: "none", immediateRender: false }, 0)

            /* ── ambient life (paused/played together with the master timeline) ── */
            const ambient = []
            coins.forEach((c, i) => ambient.push(gsap.to(c, { y: -3, duration: 0.7 + (i % 3) * 0.12, delay: i * 0.1, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true })))
            ambient.push(gsap.to(portal.glow, { opacity: 0.22, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }))
            ambient.push(gsap.to(bglows, { opacity: 0.34, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }))
            ambient.push(gsap.to(layers.far, { opacity: 0.55, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }))

            /* ── ScrollTrigger: ONE instance — reveal + play/pause by visibility ── */
            let revealed = false
            const enter = () => {
                if (!revealed) {
                    revealed = true
                    gsap.to(scene, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
                    tl.play(0)
                } else tl.play()
                ambient.forEach((a) => a.play())
            }
            const leave = () => {
                tl.pause()
                ambient.forEach((a) => a.pause())
            }
            const st = ScrollTrigger.create({
                trigger: root,
                start: "top 90%",
                end: "bottom 10%",
                onEnter: enter,
                onEnterBack: enter,
                onLeave: leave,
                onLeaveBack: leave,
            })
            if (st.isActive) enter()

            /* ── pointer interactions: parallax tilt + hover fx ── */
            const xFar = gsap.quickTo(pars.far, "x", { duration: 0.8, ease: "power3.out" })
            const xMid = gsap.quickTo(pars.mid, "x", { duration: 0.8, ease: "power3.out" })
            const onMove = (e) => {
                const r = stage.getBoundingClientRect()
                const nx = (e.clientX - r.left) / r.width - 0.5
                xFar(-nx * 8)
                xMid(-nx * 16)
            }
            let lastHover = null
            const onOver = (e) => {
                const el = e.target.closest ? e.target.closest("[data-hover]") : null
                if (el === lastHover) return
                lastHover = el
                if (!el) return
                ctx.add(() => {
                    if (el.getAttribute("data-hover") === "coin") {
                        gsap.fromTo(el, { scaleX: 1 }, { scaleX: 0.1, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", overwrite: "auto" })
                        emit("spark", +el.dataset.cx, +el.dataset.cy, "#FACC15")
                    } else {
                        gsap.fromTo(el, { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" })
                        emit("rise", PORTAL_X, 200, "#A3E635")
                    }
                })
            }
            const onLeave = () => {
                lastHover = null
                xFar(0)
                xMid(0)
            }
            stage.addEventListener("pointermove", onMove)
            stage.addEventListener("pointerover", onOver)
            stage.addEventListener("pointerleave", onLeave)
            cleanups.push(() => {
                stage.removeEventListener("pointermove", onMove)
                stage.removeEventListener("pointerover", onOver)
                stage.removeEventListener("pointerleave", onLeave)
            })
        }, root)

        return () => {
            cleanups.forEach((fn) => fn())
            if (toastTl) toastTl.kill()
            gsap.killTweensOf(pool)
            ctx.revert() // kills every tween/timeline AND the ScrollTrigger created inside
        }
    }, [])

    return (
        <div ref={rootRef} className={`relative w-full ${className}`}>
            <div
                data-scene
                className="relative overflow-hidden border border-neutral-700/60 bg-[#060806] shadow-[0_0_60px_-24px_rgba(163,230,53,0.35)]"
            >
                {/* HUD · top */}
                <div className="flex items-center justify-between gap-2 border-b border-neutral-800 bg-black/40 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] sm:text-[10px]">
                    <span className="flex shrink-0 items-center gap-1.5 text-[#A3E635]">
                        <span className="h-1.5 w-1.5 bg-[#A3E635] motion-safe:animate-pulse" />
                        PLAYER 01
                    </span>
                    <span className="truncate text-neutral-500">
                        LEVEL: <span className="text-neutral-300">FULL STACK DEVELOPER</span>
                    </span>
                </div>

                {/* Stage */}
                <div data-stage className="relative aspect-video w-full touch-pan-y select-none overflow-hidden bg-gradient-to-b from-[#0b1408] to-[#060806]">
                    <svg
                        viewBox={`0 0 ${W} 270`}
                        className="absolute inset-0 h-full w-full"
                        shapeRendering="crispEdges"
                        role="img"
                        aria-label="Animated pixel platformer: a developer character hits question blocks and collects skill power-ups"
                    >
                        {/* far layer · stars */}
                        <g data-par="far">
                            <g data-layer="far">
                                <path d={STARS_D} fill="#A3E635" fillOpacity="0.55" />
                            </g>
                        </g>
                        {/* mid layer · skyline */}
                        <g data-par="mid">
                            <g data-layer="mid">
                                <path d={SKY_D} fill="#0f1c0a" />
                                <path d={WIN_D} fill="#A3E635" fillOpacity="0.3" />
                            </g>
                        </g>

                        {/* ground */}
                        <rect x="0" y={GROUND} width={W} height="56" fill="#0a0f08" />
                        <rect x="0" y={GROUND} width={W} height="3" fill="#A3E635" />
                        <rect x="0" y={GROUND + 3} width={W} height="3" fill="#4d7c0f" />
                        <path d={BRICK_D} fill="none" stroke="#1a2614" strokeWidth="1" />

                        {/* coins */}
                        {COINS.map(([x, y], i) => (
                            <g key={i} transform={`translate(${x} ${y})`}>
                                <g data-coin data-hover="coin" data-cx={x + 5} data-cy={y + 7}>
                                    {COIN.map((p, k) => (
                                        <path key={k} d={p.d} fill={p.fill} />
                                    ))}
                                </g>
                            </g>
                        ))}

                        {/* portal */}
                        <rect data-portal-glow x="408" y="136" width="64" height="80" fill="#A3E635" opacity="0.08" />
                        <g data-hover="portal">
                            <rect x="408" y="140" width="64" height="74" fill="transparent" />
                            <rect data-portal-core x="424" y="156" width="32" height="58" fill="#A3E635" opacity="0.35" />
                            <rect x="420" y="152" width="40" height="4" fill="#A3E635" />
                            <rect x="420" y="156" width="4" height="58" fill="#A3E635" />
                            <rect x="456" y="156" width="4" height="58" fill="#A3E635" />
                            <rect x="428" y="164" width="2" height="2" fill="#fff" opacity="0.5" />
                            <rect x="448" y="180" width="2" height="2" fill="#fff" opacity="0.5" />
                            <rect x="434" y="196" width="2" height="2" fill="#fff" opacity="0.5" />
                        </g>

                        {/* power-ups (behind blocks so they emerge from inside) */}
                        {[0, 1].map((slot) => (
                            <g key={slot} data-pu={slot} style={{ opacity: 0 }}>
                                <circle data-halo r="20" fill="#fff" opacity="0.12" />
                                <circle data-halo r="13" fill="#fff" opacity="0.2" />
                                {SKILLS.map((s, k) => (
                                    <g key={s.id} data-icon={k} style={{ display: "none" }} transform="translate(-11 -11)">
                                        {ICON_PATHS[k].map((p, n) => (
                                            <path key={n} d={p.d} fill={p.fill} />
                                        ))}
                                    </g>
                                ))}
                            </g>
                        ))}

                        {/* question blocks */}
                        {BX.map((bx, i) => (
                            <g key={i} transform={`translate(${bx} ${BLOCK_TOP})`}>
                                <g data-block={i}>
                                    <g data-live>
                                        <rect data-bglow x="-5" y="-5" width="43" height="43" fill="#A3E635" opacity="0.12" />
                                        {BLOCK_LIVE.map((p, k) => (
                                            <path key={k} d={p.d} fill={p.fill} />
                                        ))}
                                    </g>
                                    <g data-used style={{ opacity: 0 }}>
                                        {BLOCK_USED.map((p, k) => (
                                            <path key={k} d={p.d} fill={p.fill} />
                                        ))}
                                    </g>
                                </g>
                            </g>
                        ))}

                        {/* hero */}
                        <g data-char>
                            {Object.keys(FRAMES).map((name) => (
                                <g key={name} data-frame={name} style={{ display: name === "idle" ? "block" : "none" }}>
                                    {FRAME_PATHS[name].map((p, k) => (
                                        <path key={k} d={p.d} fill={p.fill} />
                                    ))}
                                </g>
                            ))}
                        </g>

                        {/* particle pool + collect ring */}
                        {Array.from({ length: 28 }, (_, i) => (
                            <rect key={i} data-p x="-1.5" y="-1.5" width="3" height="3" fill="#A3E635" opacity="0" />
                        ))}
                        <circle data-flash r="12" fill="none" stroke="#A3E635" strokeWidth="2" opacity="0" />
                    </svg>

                    {/* skill toast follows the player */}
                    <div data-toast-pos className="pointer-events-none absolute left-0 top-0 z-10">
                        <div className="-translate-x-1/2 -translate-y-full">
                            <div
                                data-toast
                                style={{ opacity: 0 }}
                                className="whitespace-nowrap border bg-black/85 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-widest sm:text-[10px]"
                            >
                                <span data-toast-text />
                            </div>
                        </div>
                    </div>

                    {/* CRT scanlines + vignette */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_3px)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
                </div>

                {/* HUD · bottom */}
                <div className="flex items-center justify-between gap-3 border-t border-neutral-800 bg-black/40 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] sm:text-[10px]">
                    <span data-status className="min-w-0 truncate text-neutral-400" />
                    <div className="flex shrink-0 items-center gap-2">
                        <div className="flex gap-1">
                            {SKILLS.map((s) => (
                                <span key={s.id} data-pip className="h-1.5 w-2.5 bg-neutral-800 sm:w-4" />
                            ))}
                        </div>
                        <span data-count className="text-neutral-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}