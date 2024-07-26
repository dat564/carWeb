import { getLocalStorage } from '@/utils/localStorage';

const withLogged = (WrappedComponent) => {
  const isAuthenticated = getLocalStorage('isAuthenticated');
  0;
  if (!isAuthenticated) {
    window.location.href = '/';
    return;
  }
  // eslint-disable-next-line react/display-name
  return (props) => <WrappedComponent {...props} />;
};

export default withLogged;
