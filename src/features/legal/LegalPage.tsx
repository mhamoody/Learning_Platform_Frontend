import TaskPlaceholder from '../../shared/components/TaskPlaceholder'
import type { LegalPageProps } from './types'

// TODO (legal task): build the reusable layout, anchors, language switch and print styles.
export default function LegalPage({ title, lang }: LegalPageProps) {
  return (
    <TaskPlaceholder
      title={title}
      folder="src/features/legal/LegalPage.tsx"
      lang={lang}
    />
  )
}
