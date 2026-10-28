import type { JhuriStage, Mood } from './types'

export const STAGE_LABELS: Record<JhuriStage, string> = {
  empty: 'খালি',
  little: 'একটু ভরা',
  half: 'অর্ধেক ভরা',
  almost: 'প্রায় ভরা',
}

export const MOOD_LABELS: Record<Mood, string> = {
  happy: 'খুশি',
  sad: 'মন খারাপ',
}

export function stageForProductCount(count: number): JhuriStage {
  if (count <= 0) return 'empty'
  if (count < 3) return 'little'
  if (count < 6) return 'half'
  return 'almost'
}

export function moodForEarning(earnedMoney: boolean): Mood {
  return earnedMoney ? 'happy' : 'sad'
}
