import { Router } from 'express';

import Entries from '../controllers/enteriesController';
import checkTokenFunction from '../middleware/checkTokenFunction';

const router = Router();

router.get('/enteries', checkTokenFunction, Entries.getAllEnteries);
router.put('/enteries/:entryId/edit', checkTokenFunction, Entries.editEntry);
router.delete('/enteries/:entryId/delete', checkTokenFunction, Entries.deleteEntry);
router.post('/entry', checkTokenFunction, Entries.createEntry);

export default router;