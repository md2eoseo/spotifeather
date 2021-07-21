import qs from 'querystring';

function Login() {
  const onClickLogin = () => {
    fetch('api/login')
      .then(res => res.json())
      .then(data => {
        const { state, scope } = data;
        window.location.href =
          'https://accounts.spotify.com/authorize?' +
          qs.stringify({
            response_type: 'code',
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            redirect_uri:
              process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_REDIRECT_URI : process.env.REACT_APP_REDIRECT_URI,
            scope,
            state,
          });
      });
  };

  return (
    <button className="login" onClick={onClickLogin}>
      Login
    </button>
  );
}

export default Login;
