import { useAuthContext } from '../../hooks/useAuthContext'
import { AuthPrompt } from '../../components/components'
import { useCollection } from '../../hooks/useCollection'

// styles
import './ViewEntries.css'

export default function ViewEntries() {
  const { user } = useAuthContext()
  const { documents } = useCollection('entries', ["uid", "==", user && user.uid])
  return (<>
    {!user && <AuthPrompt />}
    {user && <>
      <div className="view-entries">
        
      </div>
    </>}
  </>)
}