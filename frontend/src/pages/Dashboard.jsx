import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import BugForm from '../components/BugForm'
import BugItem from '../components/BugItem'
import Spinner from '../components/Spinner'
import {getBugs, reset} from '../features/bugs/bugSlice'



function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {bugs, isLoading, isError, message} = useSelector((state) => state.bugs)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    
    dispatch(getBugs())
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  

 if(isLoading){
  return <Spinner />
 }

  return (
    <>
      <section className= "heading">
        <h1>Welcome {user.name}</h1>
        <p> Bugs Dashboard</p>
      </section>


      <BugForm />

      <section className = "content">
        {bugs.length > 0 ? (
          <div className="bugs">
            {bugs.map((bug) =>(
              <BugItem key={bug._id} bug={bug} />


          ))}
            </div>
        ) :(<h3> No unresolved Issues</h3>)}
      </section>
    </>



  ) 
}

export default Dashboard