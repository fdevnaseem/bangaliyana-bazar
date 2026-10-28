import { useEffect, useRef, useState } from 'react'
import Mascot from './Mascot'
import type { MascotWalkerProps } from './types'

export default function MascotWalker({
  mood = 'happy',
  stage = 'half',
  direction = 'right',
  walking = false,
  speed = 110,
  width = 240,
  startPosition = 8,
  className = '',
  alt,
  onWalkEnd,
}: MascotWalkerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const walkerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const dirRef = useRef(direction === 'left' ? -1 : 1)
  const walkingRef = useRef(walking)
  const endedRef = useRef(false)
  const onWalkEndRef = useRef(onWalkEnd)
  const [stopped, setStopped] = useState(false)
  const [prevWalking, setPrevWalking] = useState(walking)

  if (prevWalking !== walking) {
    setPrevWalking(walking)
    if (walking) setStopped(false)
  }

  useEffect(() => {
    onWalkEndRef.current = onWalkEnd
  }, [onWalkEnd])

  useEffect(() => {
    dirRef.current = direction === 'left' ? -1 : 1
  }, [direction])

  useEffect(() => {
    walkingRef.current = walking
    if (walking) endedRef.current = false
  }, [walking])

  useEffect(() => {
    const track = trackRef.current
    const walker = walkerRef.current
    if (!track || !walker) return
    const start = (startPosition / 100) * track.offsetWidth
    posRef.current = start
    walker.style.left = `${start}px`
  }, [startPosition])

  useEffect(() => {
    let raf = 0
    let last: number | null = null
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const step = (time: number) => {
      if (last === null) last = time
      const dt = Math.min(50, time - last)
      last = time
      const track = trackRef.current
      const walker = walkerRef.current
      if (walkingRef.current && !reduced && track && walker) {
        const maxPos = Math.max(0, track.offsetWidth - walker.offsetWidth - 8)
        let next = posRef.current + (dirRef.current * speed * dt) / 1000
        if (next >= maxPos || next <= 0) {
          next = Math.min(Math.max(next, 0), maxPos)
          walkingRef.current = false
          setStopped(true)
          if (!endedRef.current) {
            endedRef.current = true
            onWalkEndRef.current?.()
          }
        }
        posRef.current = next
        walker.style.left = `${next}px`
      }
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div ref={trackRef} className={`mascot-track ${className}`}>
      <div ref={walkerRef} className="mascot-walker">
        <Mascot
          mood={mood}
          stage={stage}
          direction={direction}
          walking={walking && !stopped}
          speed={speed}
          width={width}
          alt={alt}
        />
      </div>
    </div>
  )
}
