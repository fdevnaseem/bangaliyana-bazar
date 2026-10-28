import { useState } from 'react'
import {
  Mascot,
  MascotWalker,
  MOOD_LABELS,
  STAGE_LABELS,
  moodForEarning,
  stageForProductCount,
} from '../../libs/mascot'
import type { Direction, JhuriStage, Mood } from '../../libs/mascot'

const STAGES: JhuriStage[] = ['empty', 'little', 'half', 'almost']

export default function MascotLibDemo() {
  const [walking, setWalking] = useState(true)
  const [direction, setDirection] = useState<Direction>('right')
  const [mood, setMood] = useState<Mood>('happy')
  const [stage, setStage] = useState<JhuriStage>('half')
  const [count, setCount] = useState(4)
  const [earned, setEarned] = useState(true)
  const [note, setNote] = useState('')

  const walk = (dir: Direction) => {
    setDirection(dir)
    setWalking(true)
    setNote('')
  }

  const onCountChange = (value: number) => {
    const safe = Number.isNaN(value) ? 0 : Math.max(0, value)
    setCount(safe)
    setStage(stageForProductCount(safe))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm tracking-widest text-rickshaw">মাসকট লাইব্রেরি</p>
      <h1 className="mt-1 text-4xl">মাসকট, আবার ব্যবহারের মতো করে</h1>
      <p className="mt-3 max-w-3xl text-stone-700">
        এই পাতা শুধু দেখানোর জন্য। এখানে মাসকট libs/mascot থেকে এসেছে, নতুন করে
        লেখা হয়নি। উপরের মাসকট এক জায়গায় দাঁড়িয়ে আছে, নিচের মাসকট ট্র্যাক
        ধরে হাঁটে।
      </p>

      <section className="mt-8 rounded-3xl border-2 border-amber-200 bg-white p-6">
        <h2 className="text-2xl">দাঁড়ানো মাসকট</h2>
        <div className="mt-4 flex justify-center">
          <Mascot mood={mood} stage={stage} direction={direction} walking={walking} />
        </div>
        <p className="mt-4 text-center text-lg">
          {MOOD_LABELS[mood]}, ঝুড়ি {STAGE_LABELS[stage]}
        </p>
      </section>

      <section className="mt-8 rounded-3xl border-2 border-amber-200 bg-white p-6">
        <h2 className="text-2xl">হাঁটা মাসকট</h2>
        <div className="mt-4 overflow-hidden rounded-2xl">
          <MascotWalker
            mood={mood}
            stage={stage}
            direction={direction}
            walking={walking}
            onWalkEnd={() => {
              setWalking(false)
              setNote('হাঁটা শেষ, কিনারায় পৌঁছেছে।')
            }}
          />
        </div>
        {note ? <p className="mt-3 text-center text-stone-600">{note}</p> : null}
      </section>

      <section className="mt-8 rounded-3xl border-2 border-amber-200 bg-white p-6">
        <h2 className="text-2xl">নিয়ন্ত্রণ</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => walk('left')}
            className="rounded-full bg-rickshaw px-5 py-2 text-white"
          >
            বামে হাঁটো
          </button>
          <button
            type="button"
            onClick={() => walk('right')}
            className="rounded-full bg-rickshaw px-5 py-2 text-white"
          >
            ডানে হাঁটো
          </button>
          <button
            type="button"
            onClick={() => setWalking(false)}
            className="rounded-full border-2 border-amber-300 px-5 py-2"
          >
            থামো
          </button>
          <button
            type="button"
            onClick={() => setMood('happy')}
            className="rounded-full border-2 border-amber-300 px-5 py-2"
          >
            খুশি
          </button>
          <button
            type="button"
            onClick={() => setMood('sad')}
            className="rounded-full border-2 border-amber-300 px-5 py-2"
          >
            মন খারাপ
          </button>
        </div>

        <h3 className="mt-6 text-xl">ঝুড়ি</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className="rounded-full border-2 border-amber-300 px-5 py-2"
            >
              {STAGE_LABELS[s]}
            </button>
          ))}
        </div>

        <h3 className="mt-6 text-xl">পণ্যের সংখ্যা থেকে ঝুড়ি</h3>
        <label className="mt-3 block text-stone-700">
          ঝুড়িতে পণ্য কয়টি
          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => onCountChange(Number(e.target.value))}
            className="ml-3 w-24 rounded-lg border-2 border-amber-300 px-3 py-2"
          />
        </label>
        <p className="mt-2 text-stone-600">
          {count}টি পণ্য মানে ঝুড়ি {STAGE_LABELS[stageForProductCount(count)]}।
        </p>

        <label className="mt-4 flex items-center gap-2 text-stone-700">
          <input
            type="checkbox"
            checked={earned}
            onChange={(e) => setEarned(e.target.checked)}
          />
          এই কাজে টাকা এসেছে
        </label>
        <p className="mt-2 text-stone-600">
          টাকা {earned ? 'এসেছে' : 'আসেনি'}, তাই মন {MOOD_LABELS[moodForEarning(earned)]}।
        </p>
      </section>
    </div>
  )
}
