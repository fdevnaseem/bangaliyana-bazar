export type Mood = 'happy' | 'sad'

export type JhuriStage = 'empty' | 'little' | 'half' | 'almost'

export type Direction = 'left' | 'right'

export interface MascotProps {
  mood?: Mood
  stage?: JhuriStage
  direction?: Direction
  walking?: boolean
  speed?: number
  width?: number | string
  className?: string
  alt?: string
}

export interface MascotWalkerProps {
  mood?: Mood
  stage?: JhuriStage
  direction?: Direction
  walking?: boolean
  speed?: number
  width?: number | string
  startPosition?: number
  className?: string
  alt?: string
  onWalkEnd?: () => void
}
