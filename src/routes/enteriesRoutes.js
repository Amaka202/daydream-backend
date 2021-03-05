const express = require('express');
const Entries = require('../controllers/enteriesController');
const AuthenticateUser = require('../middleware/checkTokenFunction');

const router = express.Router();

router.get('/entries', AuthenticateUser.checkToken, Entries.getAllEnteries);
router.put('/entries/:entryId/edit', AuthenticateUser.checkToken, Entries.editEntry);
router.delete('/entries/:entryId/delete', AuthenticateUser.checkToken, Entries.deleteEntry);
router.post('/entries', AuthenticateUser.checkToken, Entries.createEntry);

module.exports = router;