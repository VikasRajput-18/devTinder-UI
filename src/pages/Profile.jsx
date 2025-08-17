import { useSelector } from "react-redux"
import EditProfile from "../components/edit-profile"


const Profile = () => {
  const user = useSelector(state => state.user)
  return (
    user ? <div>
      <EditProfile user={user} />
    </div> : null
  )
}

export default Profile