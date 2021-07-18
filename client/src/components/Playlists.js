import { useState } from 'react';
import { useSelector } from 'react-redux';
import Playlist from './Playlist';
import ReactLoading from 'react-loading';

function Playlists() {
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
    </div>
  ) : (
    <ReactLoading type="bars" color="#fff" width="120px" height="60px" />
  );
}

export default Playlists;
