import {useSelector, useDispatch} from 'react-redux'
import {deleteBug} from '../features/bugs/bugSlice'
function BugItem({bug}) {
  
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  return (
    <div className="bug">
      
      <h2>{bug.text}</h2>
      <button onClick={() => dispatch(deleteBug(bug._id))}className="close"> RESOLVE</button>
      <h5>Created by {user.name}</h5>
      <div>
        {new Date(bug.createdAt).toLocaleString('en-US')}
        
      </div>
    </div>
  )
}

export default BugItem