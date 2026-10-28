import './mascot.css'
import type { JhuriStage, MascotProps } from './types'
import bodyEmpty from './assets/body-empty.png'
import bodyLittle from './assets/body-little.png'
import bodyHalf from './assets/body-half.png'
import bodyAlmost from './assets/body-almost.png'
import faceSad from './assets/face-sad.png'
import legBack from './assets/leg-back.png'
import legFront from './assets/leg-front.png'

const BODY_BY_STAGE: Record<JhuriStage, string> = {
  empty: bodyEmpty,
  little: bodyLittle,
  half: bodyHalf,
  almost: bodyAlmost,
}

export default function Mascot({
  mood = 'happy',
  stage = 'half',
  direction = 'right',
  walking = false,
  speed = 110,
  width = 240,
  className = '',
  alt = 'ঝুড়ি মাথায় হাঁটা মানুষ',
}: MascotProps) {
  const cycle = `${Math.max(0.2, 60 / Math.max(1, speed)).toFixed(2)}s`
  const classes = [
    'mascot',
    direction === 'left' ? 'mascot-left' : 'mascot-right',
    walking ? 'mascot-walking' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={{ width }} role="img" aria-label={alt}>
      <div className="mascot-flip">
        <div
          className={`mascot-rig ${mood === 'sad' ? 'mascot-sad' : 'mascot-happy'}`}
          style={{ animationDuration: cycle }}
        >
          <img
            className="mascot-leg-back"
            src={legBack}
            alt=""
            style={{ animationDuration: cycle }}
          />
          <img className="mascot-body" src={BODY_BY_STAGE[stage]} alt="" />
          <img
            className="mascot-leg-front"
            src={legFront}
            alt=""
            style={{ animationDuration: cycle }}
          />
          <img className="mascot-face-sad" src={faceSad} alt="" />
        </div>
      </div>
    </div>
  )
}
