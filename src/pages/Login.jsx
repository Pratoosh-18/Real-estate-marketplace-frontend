import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const {user,setUser} = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_API, { email, password });
      
      setUserData(response.data.updatedUser);
      setUser(response.data.updatedUser)
      localStorage.setItem("realestatert", response.data.updatedUser.refreshToken);
      setError('');
      console.log(user)
      toast.success('You are logged in !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      navigate("/listings")
    } catch (err) {
      setIsLoading(false)
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            {
              isLoading ? <div
              type="submit"
              className="w-full flex justify-center items-center bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Loading ...
            </div>:<button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
            }
            

          </div>
        </form>
        {userData && (
          <div className="mt-6 text-center">
            <p>Welcome, {userData.username}!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
