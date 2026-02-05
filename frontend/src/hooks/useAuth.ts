import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getInfo, logoutUser } from '~/features/userSlice';
import type { RootState } from '~/store/store';
import LocalStorage from '~/utils/localstorage';
import { useAppDispatch } from './useRedux';
const useAuth = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isLoading } = useSelector((state: RootState) => state.user);
  const isLogin = userInfo.isLogin;
  const navigate = useNavigate();

  const getUserInfo = () => {
    if (isLogin) return;
    LocalStorage.setItem('login', 'true');
    dispatch(getInfo());
  };

  const logout = () => {
    LocalStorage.removeItem('login');
    LocalStorage.removeItem('access_token');
    LocalStorage.removeItem('role');

    dispatch(logoutUser());
    navigate('/login');
  };
  return {
    user: userInfo,
    getUserInfo,
    isChecking: userInfo.isChecking,
    isLogin,
    logout,
    isLoading,
  };
};
export default useAuth;
