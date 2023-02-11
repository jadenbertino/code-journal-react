import { useAuthContext } from '../../hooks/useAuthContext'
import { AuthPrompt } from '../../components/components'

// styles
import './ViewEntries.css'

export default function ViewEntries() {
  const { user } = useAuthContext()

  return (
    <main>
      {!user && <AuthPrompt />}
    </main>
  )
}