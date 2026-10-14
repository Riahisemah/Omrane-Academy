import { useEffect, useState, type RefObject } from 'react'

interface HeroPathProps {
  container: RefObject<HTMLElement | null>
  /** Where the path starts — the location marker. */
  from: RefObject<HTMLElement | null>
  /** The arched image the path climbs towards. */
  to: RefObject<HTMLElement | null>
}

/**
 * « Le chemin vers la réussite », drawn literally: a gold line leaving the
 * neighbourhood marker and climbing around the arch. Geometry is measured from
 * the live layout so it stays attached to both ends at every desktop width.
 */
export function HeroPath({ container, from, to }: HeroPathProps) {
  const [geometry, setGeometry] = useState<{ d: string; end: [number, number]; w: number; h: number; rtl: boolean } | null>(
    null,
  )

  useEffect(() => {
    const root = container.current
    if (!root) return

    const measure = () => {
      const start = from.current
      const target = to.current
      if (!start || !target || !window.matchMedia('(min-width: 1024px)').matches) {
        setGeometry(null)
        return
      }
      const base = root.getBoundingClientRect()
      const s = start.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      // In right-to-left layouts the hero is mirrored: compute in mirrored
      // coordinates (x → width − x), then flip the drawing back with CSS.
      const rtl = getComputedStyle(root).direction === 'rtl'
      const x = (value: number) => (rtl ? base.right - value : value - base.left)

      const sx = x(s.left + s.width / 2)
      const sy = s.bottom - base.top + 6
      const left = rtl ? x(t.right) : x(t.left)
      const top = t.top - base.top
      const bottom = t.bottom - base.top
      const radius = t.width / 2

      // Arch centre, then a point on a slightly larger concentric circle (upper-left).
      const cx = left + radius
      const cy = top + radius
      const r = radius + 26
      const angle = (-128 * Math.PI) / 180
      const ex = cx + r * Math.cos(angle)
      const ey = cy + r * Math.sin(angle)

      const lowY = Math.max(sy + 70, bottom + 24)
      const midX = left - 34
      const midY = bottom - t.height * 0.32

      const d = [
        `M${sx} ${sy}`,
        `C${sx} ${sy + 48} ${sx + 70} ${lowY} ${(sx + midX) / 2} ${lowY}`,
        `S${midX} ${midY + 120} ${midX} ${midY}`,
        `S${ex - 36} ${ey + 70} ${ex} ${ey}`,
      ].join(' ')

      setGeometry({ d, end: [ex, ey], w: base.width, h: base.height, rtl })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [container, from, to])

  if (!geometry) return null

  return (
    <svg
      aria-hidden="true"
      width={geometry.w}
      height={geometry.h}
      viewBox={`0 0 ${geometry.w} ${geometry.h}`}
      fill="none"
      className="pointer-events-none absolute inset-0 overflow-visible"
      style={geometry.rtl ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d={geometry.d}
        stroke="var(--color-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        className="path-draw"
      />
      <circle cx={geometry.end[0]} cy={geometry.end[1]} r="6" fill="var(--color-gold)" className="path-dot" />
      <circle cx={geometry.end[0]} cy={geometry.end[1]} r="12" fill="var(--color-gold)" opacity="0.18" className="path-dot" />
    </svg>
  )
}
