import {useSelector, useDispatch} from 'react-redux'
import {deleteBug} from '../features/bugs/bugSlice'
import authService from '../features/auth/authService'
import { useState, useEffect} from 'react'

const {getName} = authService

function BugItem({bug}) {
  
  const dispatch = useDispatch()

  const [name, setName] = useState('') 

  useEffect(() => {
    async function getBugCreator(){
      const nameData = await getName({UserId: bug.user})
      console.log(nameData)
      setName(nameData.name)
    }
    getBugCreator()
    
    
    }, [])

  return (
    <div className="bug">
      
      <h2>{bug.text}</h2>
      <button onClick={() => dispatch(deleteBug(bug._id))}className="close"> RESOLVE</button>
      <h5>Created by {name}</h5>
      <div>
        {new Date(bug.createdAt).toLocaleString('en-US')}
        
      </div>
    </div>
  )
}

export default BugItem