const express = require('express');
const { createSong, getSongs, updateSong, deleteSong, getStatistics } = require('../controllers/songController');
const router = express.Router();

router.post('/songs', createSong);
router.get('/songs', getSongs);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);
router.get('/statistics', getStatistics);

module.exports = router;