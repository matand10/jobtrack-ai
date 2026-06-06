type SectionIntroProps = {
  align?: 'center' | 'left'
  eyebrow: string
  title: string
}

export function SectionIntro({ align = 'left', eyebrow, title }: SectionIntroProps) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-12 max-w-3xl text-center' : 'mb-10 max-w-2xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-app-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold leading-tight tracking-[-0.025em] text-app-text sm:text-4xl">{title}</h2>
    </div>
  )
}
