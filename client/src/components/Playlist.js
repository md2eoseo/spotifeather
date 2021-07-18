function Playlist({ id, show }) {
  return (
    <iframe
      title={id}
      className="playlist"
      src={`https://open.spotify.com/embed/playlist/${id}`}
      allow="encrypted-media"
      style={{ display: show ? 'block' : 'none' }}
    ></iframe>
  );
}
export default Playlist;
