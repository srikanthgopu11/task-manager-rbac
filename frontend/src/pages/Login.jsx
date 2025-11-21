import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      login(data.token, data.user);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        <input className="border p-2 w-full mb-2" placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
        <p className="mt-2 text-sm">No account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
};
export default Login;