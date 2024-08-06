const express = require('express');
const { savefree, getfree, getonefree, deleteonefree, modifyonefree } = require('../controllers/freelancers');
const router = express.Router();

router.post('/',savefree);
router.get('/',getfree);
router.get('/:id', getonefree);
router.delete('/:id', deleteonefree);
router.put('/:id', modifyonefree);

module.exports = router;