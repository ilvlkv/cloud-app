import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const auth = () => {
  return async (dispatch) => {
    try {
      const responce = await axios.get('http://localhost:3000/auth/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch(setUser(responce.data));
      localStorage.setItem('token', responce.data.token);
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem('token');
    }
  };
};
