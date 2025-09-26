import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { AiOutlineMail, AiOutlineUser, AiOutlineDelete, AiOutlineSmile, AiOutlineLogout } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Greeting from './components/greeting';
import apiClient from './config/api';    

export default function Home() {
  const [profile, setProfile] = useState({name:'',username:'',email:''});
  const [todos, setTodos] = useState(null)
  const [motivation, setMotivation] = useState('')
  const [showForm, setShowForm] = useState(false) 
  const [judul, setJudul] = useState('') 
  const [deskripsi, setDeskripsi] = useState('') 
  const navigate = useNavigate()

  useEffect(() => {
      getTodos()
      getMotivation()

      const token = localStorage.getItem('token'); 
      if (token) {
            const decodedToken = jwtDecode(token);
            setProfile(decodedToken)
        }
  }, [])

  function getTodos(status = '') {
    apiClient.get(`/todos?status=${status}`)
      .then((res) => {
        setTodos(res.data)
      })
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  async function storeTodo(){
    event.preventDefault();

    const response = await apiClient.post('/todos', {name: judul, description: deskripsi, user_id: 1})
    
    if(response.status === 201){
        toast.success('Add todo successful');
        setJudul('');
        setDeskripsi('');
        getTodos()
    } else {
        toast.error('Failed to add todo');
    }
  }

  async function deleteTodo(id) {
    const token = localStorage.getItem('token');

    const response = await apiClient.delete('/todos/'+id)

    if(response.status === 204){
        toast.success('Delete todo successful');
        getTodos()
    } else {
        toast.error('Failed to delete todo');
    }
  }

  async function changeStatus(status, id) {
    event.preventDefault();

    const response = await apiClient.post(`/todos/${id}/change-status`, {status})

    if(response.status === 200){
        toast.success('Change status todo successful');
    } else {
        toast.error('Failed to change status todo');
    }
    
  }

  async function getMotivation() {
    const proxyUrl = 'https://cors-anywhere.com/';
    const targetUrl = 'https://zenquotes.io/api/random';
    const response = await fetch(proxyUrl + targetUrl);
    const motivations = await response.json();
    setMotivation(motivations[0].q + ' - ' + motivations[0].a)
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className='grid grid-cols-12 p-6 space-x-8  mx-auto mt-5'>
        <div className='rounded-lg bg-white shadow col-start-2 col-span-2 h-auto flex flex-col justify-between'>
            <div className='flex flex-row space-x-2 items-center py-1.5 px-2 ite'>
                <div className='ml-2 rounded-full w-15 h-15  border-gray-100 border-1'>
                  <AiOutlineSmile className='w-full h-full text-black'/>
                </div>
                <div className='text-sm flex flex-col space-y-1'>
                  <span>{profile.name}</span>
                  <div className='flex flex-row items-center space-x-1'><AiOutlineUser />  <span className='text-xs'> {profile.username}</span></div>
                  <div className='flex flex-row items-center space-x-1'><AiOutlineMail />  <span className='text-xs'>{profile.email}</span></div>
                </div>
            </div>

            <div className='p-4'>
              {motivation && <div className='text-xs italic border-t border-gray-200 mt-2 pt-2'>{motivation}</div>}
            </div>

            <div className='p-2 bg-gray-200 end'>
                <div className='flex flex-row items-center space-x-2 w-full cursor-pointer' onClick={()=>{logout()}}> <AiOutlineLogout /> <span >Logout</span></div>
            </div>
        </div>

        <div className='w-auto col-span-8 flex flex-col space-y-4'>
          
            <Greeting name={profile.name} />

            <div className='rounded-lg bg-white shadow'>
              <div className='py-6 px-4 flex flex-row justify-between'>
                <span>Tugas hari ini</span>
                <div>
                  <button className='rounded-lg bg-cyan-600 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-cyan-800' onClick={()=>{
                    setShowForm(!showForm)
                  }}>{showForm ? 'Tutup' : 'Tambah'}</button>
                </div>
              </div>

                {/* Form */}
                {showForm && <div>
                  <form onSubmit={storeTodo}>
                    <div className='flex flex-row space-x-4 px-6'>
                      <input type="text" placeholder='Judul' className='w-1/3 border text-xs border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-600' onChange={(e) => {
                        setJudul(e.target.value)
                      }} required value={judul} />

                      <input type="text" placeholder='Deskripsi' className='w-2/3 border text-xs border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-600' onChange={(e) => {
                        setDeskripsi(e.target.value)
                      }} required value={deskripsi}/>

                      <button className='rounded-lg bg-cyan-600 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-cyan-800' type='submit'>Simpan</button>
                    </div>  
                  </form>
                  
                </div>
                }

                {/* Tabel */}
                <div className='px-6 py-4'>
                  <table className='w-full text-left text-sm'>
                    <thead className='border-b border-gray-200'>
                      <tr>
                        <th className='px-4 py-2 w-1/12'>No</th>
                        <th className='px-4 py-2 w-5/12'>Judul</th>
                        <th className='px-4 py-2 w-3/12'>Deskripsi</th>
                        <th className='px-4 py-2 w-3/12'>
                        <select name="status" className="text-xs" onChange={(e)=>{
                            getTodos(e.target.value)
                          }}>
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            
                          </select>

                        Aksi</th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                    {todos && todos.map((todo, index) => (
                      <tr key={todo.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className='px-4 py-2 align-top'>{index + 1}</td>
                        <td className='px-4 py-2 align-top'>{todo.name}</td>
                        <td className='px-4 py-2 align-top'>{todo.description}</td>
                        <td className='px-4 py-2 align-top'>
                          <div className='flex flex-row space-x-1'>
                          <select name="status" className="text-xs" defaultValue={todo.status} onChange={(e)=>{
                            console.log(e.target.value)
                            changeStatus(e.target.value, todo.id)
                          }}>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            
                          </select>

                          <button className='cursor-pointer px-2 py-1 rounded text-sm flex flex-row items-center space-x-1' onClick={()=>{
                            deleteTodo(todo.id)
                          }}><AiOutlineDelete /></button>

                          </div>
                        </td>
                      </tr>
                    ))}
                    {!todos && 
                      <tr>
                        <td colSpan={4} className='text-center py-4'>Tidak ada data</td>
                      </tr>
                    } 
                    </tbody>
                  </table>
                </div>

            </div>
        </div>
      </main>
    </>
  )
}