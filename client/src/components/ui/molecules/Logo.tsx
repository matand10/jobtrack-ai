import { BriefcaseIcon } from '../icons/BriefcaseIcon'

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-base font-bold tracking-[-0.015em] text-app-text">
      <span
        className="inline-flex items-center justify-center rounded-[7px] bg-[linear-gradient(135deg,var(--color-app-primary),var(--color-app-violet))] text-white shadow-[0_1px_2px_rgba(79,70,229,.3),inset_0_1px_0_rgba(255,255,255,.2)]"
        style={{ height: size, width: size }}
        aria-hidden="true"
      >
        <BriefcaseIcon size={Math.round(size * 0.62)} />
      </span>
      <span>
        JobTrack <span className="text-app-primary">AI</span>
      </span>
    </span>
  )
}
