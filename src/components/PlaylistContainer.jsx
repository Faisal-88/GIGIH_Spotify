import {useEffect,useState} from 'react';
import PlaylistItem from './PlaylistItem';

function PlaylistContainer({tracks}) {
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [combinedTracks,setCombinedTracks] = useState([]);

    // Pilih trek, jika sudah dipilih, hapus dari daftar trek yang dipilih. 
    //  Jika tidak, tambahkan ke daftar trek yang dipilih.
    const handleSelectTrack = (track) => {
      const alreadySelected = selectedTracks.find((t) => t.id === track.id);
      if (alreadySelected) {
        setSelectedTracks(selectedTracks.filter((t) => t.id !== track.id));
      } else {
        setSelectedTracks([...selectedTracks, track]);
      }
    };

    useEffect(() => {
      const combinedTracksWithSelectedTrack = tracks.map((track) => ({
        ...track,
        isSelected: setSelectedTracks.find((t) => t.id === track.id ),
      }));
      setCombinedTracks(combinedTracksWithSelectedTrack);
    }, [selectedTracks,tracks]);

    function renderPlaylistItems() {
    return combinedTracks.map((item) =>{
      const {id} = item;
      return (
        <PlaylistItem key={id} track ={item} onSelectTrack={handleSelectTrack} />
      );
    });
  }

  return <div className="playlist-container">{renderPlaylistItems()}</div>;
}

export default PlaylistContainer;