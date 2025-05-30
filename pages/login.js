import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import EmailForm from '../components/email-form';
import { navInfo } from '../components/constants';

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);

  // Redirec to /profile if the user is logged in
  useEffect(() => {
    user?.issuer && Router.push('/profile');
  }, [user]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
        Router.push('/profile');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      <style jsx>{`
        .login {
          flex:1;
          max-width: 20rem;
          height: max-content;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Login;


export async function getStaticProps(context) {
  return {
    props: {
      title:`Login`,
      slug:[navInfo.login]
    },
  }
}