import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="border p-2 w-full mb-2" placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        
        <select className="border p-2 w-full mb-4" 
          onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-green-500 text-white w-full p-2 rounded">Register</button>
        <p className="mt-2 text-sm">Have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};
export default Register;