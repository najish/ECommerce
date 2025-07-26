// src/components/GoogleLogin.jsx
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
import axios from 'axios';
import {useUser} from '../../contexts/UserContext'
const GoogleLogin = ({closeModal}) => {
  const { setUser, setToken } = useUser()
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
    window.google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      {
        theme: 'outline',
        size: 'large',
      }
    );

    window.google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential); // ✅ Correct usage
      console.log('Decoded Token:', decoded);

      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: response.credential,
      });

      console.log('Backend response:', res.data);
      setUser(res.data.user)
      closeModal()
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <div id="google-signin"></div>;
};

export default GoogleLogin;
