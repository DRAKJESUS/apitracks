// src/App.js
import React, { useState, useEffect } from 'react';
import { getTracks, saveTrack, deleteTrack } from './services/trackService';

function App() {
    const [tracks, setTracks] = useState([]);
    const [newTrack, setNewTrack] = useState({ track: '', artista: '', genero: '' });

    useEffect(() => {
        loadTracks();
    }, []);

    const loadTracks = async () => {
        const data = await getTracks();
        setTracks(data);
    };

    const handleSaveTrack = async () => {
        await saveTrack(newTrack);
        setNewTrack({ track: '', artista: '', genero: '' });
        loadTracks();
    };

    const handleDeleteTrack = async (id) => {
        await deleteTrack(id);
        loadTracks();
    };

    return (
        <div>
            <h1>Tracks List</h1>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.track} by {track.artista} ({track.genero})
                        <button onClick={() => handleDeleteTrack(track.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Track</h2>
                <input
                    type="text"
                    placeholder="Track Name"
                    value={newTrack.track}
                    onChange={(e) => setNewTrack({ ...newTrack, track: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={newTrack.artista}
                    onChange={(e) => setNewTrack({ ...newTrack, artista: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newTrack.genero}
                    onChange={(e) => setNewTrack({ ...newTrack, genero: e.target.value })}
                />
                <button onClick={handleSaveTrack}>Save Track</button>
            </div>
        </div>
    );
}

export default App;
