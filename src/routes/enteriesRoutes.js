const express = require('express');
const Entries = require('../controllers/enteriesController');
const checkUserToken = require('../middleware/checkTokenFunction');

const router = express.Router();

router.get('/entries', checkUserToken, Entries.getAllEnteries);
router.put('/entries/:entryId/edit', checkUserToken, Entries.editEntry);
router.delete('/entries/:entryId/delete', checkUserToken, Entries.deleteEntry);
router.post('/entries', checkUserToken, Entries.createEntry);

module.exports = router;