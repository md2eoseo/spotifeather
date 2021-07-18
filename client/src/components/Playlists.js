import { useState } from 'react';
import { useSelector } from 'react-redux';
import Playlist from './Playlist';

function Playlists() {
  const playlists = useSelector(state => state.playlists);
  const [page, setPage] = useState(playlists.length);
  return (
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
  );
}

export default Playlists;
