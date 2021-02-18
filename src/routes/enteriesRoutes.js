const express = require('express');
const Entries = require('../controllers/enteriesController');
const AuthenticateUser = require('../middleware/checkTokenFunction');

const router = express.Router();

router.get('/enteries', AuthenticateUser.checkToken, Entries.getAllEnteries);
router.put('/enteries/:entryId/edit', AuthenticateUser.checkToken, Entries.editEntry);
router.delete('/enteries/:entryId/delete', AuthenticateUser.checkToken, Entries.deleteEntry);
router.post('/entry', AuthenticateUser.checkToken, Entries.createEntry);

module.exports = router;