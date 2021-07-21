import { useState } from 'react';
import { useSelector } from 'react-redux';
import Playlist from './Playlist';
import ReactLoading from 'react-loading';
import SpotifyWebPlayer from 'react-spotify-web-playback';

function Playlists() {
  const user = useSelector(state => state.user);
  const playlists = useSelector(state => state.playlists);
  const [page, setPage] = useState(playlists.length);
  return playlists.length !== 0 ? (
    <div className="playlists">
      <button
        className="pageBtn"
        onClick={() => {
          setPage((page - 1 + playlists.length) % playlists.length);
        }}
      >
        <span>{'<'}</span>
      </button>
      {playlists?.map((pl, idx) => (
        <Playlist key={pl.id} id={pl.id} show={idx === page} />
      ))}

      <button
        className="pageBtn"
        onClick={() => {
          setPage((page + 1) % playlists.length);
        }}
      >
        <span>{'>'}</span>
      </button>
      <SpotifyWebPlayer
        token={user.accessToken}
        uris={playlists.map(pl => pl.uri)[page]}
        styles={{
          activeColor: '#fff',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
        autoPlay
        magnifySliderOnHover
        name="Spotifeather"
        showSaveIcon
      />
    </div>
  ) : (
    <ReactLoading type="bars" color="#fff" width="120px" height="60px" />
  );
}

export default Playlists;
