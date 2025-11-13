import { Router } from 'express';
import {
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoard,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
} from '../controllers/boardController';
import { schemas } from '../models/board';
import { validateBody } from '../middlewares/validateBody';
import { validateIds } from '../middlewares/validateIds';

const router = Router();

// ------------------- Boards ------------------- //

router.post('/', validateBody(schemas.boardAddSchema), createBoard);

router.get('/:boardId', validateIds(['boardId']), getBoardById);

router.patch(
    '/:boardId',
    validateIds(['boardId']),
    validateBody(schemas.boardUpdateSchema),
    updateBoard,
);

router.delete('/:boardId', validateIds(['boardId']), deleteBoard);

// ------------------- CARDS ------------------- //

router.post(
    '/:boardId/cards',
    validateIds(['boardId']),
    validateBody(schemas.cardAddSchema),
    addCard,
);

router.patch(
    '/:boardId/cards/:cardId',
    validateIds(['boardId', 'cardId']),
    validateBody(schemas.cardUpdateSchema),
    updateCard,
);

router.delete(
    '/:boardId/cards/:cardId',
    validateIds(['boardId', 'cardId']),
    deleteCard,
);

// ------------------- Move a card (drag and drop) ------------------- //

router.patch(
    '/:boardId/cards/:cardId/move',
    validateIds(['boardId', 'cardId']),
    validateBody(schemas.cardMoveSchema),
    moveCard,
);

export default router;
