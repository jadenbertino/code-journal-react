import { useAuthContext } from '../../hooks/useAuthContext'
import { AuthPrompt } from '../../components/components'

// styles
import './ViewEntries.css'

export default function ViewEntries() {
  const { user } = useAuthContext()

  return (<>
    {!user && <AuthPrompt />}
    {user && <>
      <div className="view-entries">
        
      </div>
    </>}
  </>)
}