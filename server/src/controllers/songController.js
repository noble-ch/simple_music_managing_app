import Song from '../models/song.js';

// Create a new song
export const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a song
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a song
export const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get statistics
export const getStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const genres = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);
    const artists = await Song.aggregate([
      { $group: { _id: '$artist', songCount: { $sum: 1 }, albumCount: { $addToSet: '$album' } } }
    ]);
    res.json({ totalSongs, genres, artists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
