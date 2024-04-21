import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, saveTodo } from './store/todoSlice';
import './App.css';
import { useState } from 'react';

function App() {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [selectedID, setSelectedID] = useState(null)
  const [newTitle, setNewTitle] = useState("")

  const submitForm = (e) => {
    e.preventDefault();
    let inputVal = e.target[0].value;
    let todoObj = {
      title: inputVal,
      id: Date.now(),
      checked: false
    };
    dispatch(addTodo(todoObj));
    e.target[0].value = ''; // Clearing the input after submission
  };

  const editTodo = (id) => {
    setSelectedID(id)

  }
  const saveFunc = (id, title) => {
    dispatch(saveTodo({ id, title }))
    setSelectedID(null)
  }
  console.log(selectedID)
  return (
    <div className='flex items-center flex-col pt-10 bg-gray-800 h-[100vh]'>
      <div className='flex items-center flex-col w-[500px]'>
        <form onSubmit={(e) => submitForm(e)} className="mb-5 w-[500px] flex gap-5">
          <input type="text" placeholder='to do title' className='w-[350px] h-[50px] capitalize pl-2 outline-none' />
          <button type='submit' className='w-[150px] h-[50px] bg-red-800 text-white capitalize font-bold text-[20px]'>Submit</button>
        </form>
        <div>
          {
            state.list.length > 0 ? state.list.map((todo) => (
              <div key={todo.id} className="bg-gray-600 w-full pl-2 pr-2 flex justify-center h-[130px] items-center flex-col">
                {
                  selectedID === todo.id ? (
                    <input type="text" defaultValue={todo.title} onChange={(e) => setNewTitle(e.target.value)} className="capitalize w-full outline-none h-[30px] mb-3 pl-2" />
                  ) : (
                    <p className='capitalize mb-4 mt-2'>{todo.title}</p>
                  )
                }
                <div className='mb-3 flex gap-3 pb-2'>
                  <button className='font-bold text-[20px] text-white  bg-red-600 w-[100px] h-[40px] capitalize flex items-center justify-center' onClick={() => dispatch(deleteTodo(todo.id))}>delete</button>
                  <button className='font-bold text-[20px] text-white  bg-green-600 w-[100px] h-[40px] capitalize flex items-center justify-center' onClick={() => dispatch(editTodo(todo.id))}>edit</button>
                  <button className='font-bold text-[20px] text-white  bg-black w-[100px] h-[40px] capitalize flex items-center justify-center' onClick={() => saveFunc(todo.id, newTitle)}>save</button>
                </div>
              </div>
            )) : (
              <p className='text-red-800 font-bold text-[25px]'>No todos text 😁</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
