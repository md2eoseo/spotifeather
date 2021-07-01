function Playlist({ id }) {
  return <iframe className="playlist" src={`https://open.spotify.com/embed/playlist/${id}`} allow="encrypted-media"></iframe>;
}
export default Playlist;
