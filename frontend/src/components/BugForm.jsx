import {useState} from 'react'
import {useDispatch} from 'react-redux' 
import {createBug} from '../features/bugs/bugSlice'
 
function BugForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()


  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createBug({text}))
    setText('')
  }
  return <section className='form'>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="text"> Bug Description </label>
        <input type="text" name='text' id='text' value={text} onChange={(e)=>setText(e.target.value)}/>

      </div>
      <div className="form-group">
        <button className="btn btn-block" type="submit">
          Add Bug
        </button>
      </div>
    </form>
  </section>
}

export default BugForm  