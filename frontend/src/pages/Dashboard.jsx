import { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/tasks', newTask);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard ({user.role})</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Create Task Form */}
      <form onSubmit={handleCreate} className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-xl mb-2">Create New Task</h3>
        <input className="border p-2 mr-2 w-64" placeholder="Title" value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})} required />
        <input className="border p-2 mr-2 w-64" placeholder="Description" value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="border p-4 rounded shadow bg-white relative">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-400 mt-2">Status: {task.status}</p>
            {user.role === 'admin' && <p className="text-xs text-blue-500">Created by: {task.creator || task.createdBy}</p>}
            
            <button 
              onClick={() => handleDelete(task.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;