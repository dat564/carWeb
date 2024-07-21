import { isAuthenticateAtom } from '@/atom/auth';
import { redirect } from 'next/navigation';
import { useRecoilValue } from 'recoil';

const withLogged = (WrappedComponent) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticate = useRecoilValue(isAuthenticateAtom);
  if (isAuthenticate) {
    redirect('/');
  }
  // eslint-disable-next-line react/display-name
  return (props) => <WrappedComponent {...props} />;
};

export default withLogged;
