const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.get('/', (req, res) => res.json({ username: 'Seongtae~~~' }));

router.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = 'user-read-private user-read-email';
  return res.json({ state, scope });
  // res.redirect(
  //   'https://accounts.spotify.com/authorize?' +
  //     querystring.stringify({
  //       response_type: 'code',
  //       client_id: client_id,
  //       scope: scope,
  //       redirect_uri: redirect_uri,
  //       state: state,
  //     })
  // );
});

router.get('/callback', function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: 'Basic ' + new Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        // var options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { Authorization: 'Bearer ' + access_token },
        //   json: true,
        // };

        // request.get(options, function (error, response, body) {
        //   console.log(body);
        // });

        res.redirect(
          '/?' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

module.exports = router;
