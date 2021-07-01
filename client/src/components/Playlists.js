import { useSelector } from 'react-redux';
import Playlist from './Playlist';

function Playlists() {
  const playlists = useSelector(state => state.playlists);
  return (
    <div className="playlists">
      {playlists?.map(pl => (
        <Playlist key={pl.id} id={pl.id} />
      ))}
    </div>
  );
}

export default Playlists;
