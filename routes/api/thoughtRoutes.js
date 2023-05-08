const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)

// /api/thoughts/:thoughtId/reactions/reactionId
router
.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;
