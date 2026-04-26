const express = require('express');
const router = express.Router();
const {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  getExamsByStudentId,
  getExamWithParticipants,
} = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam records with Student and Teacher microservice integration
 */

/**
 * @swagger
 * /api/exams:
 *   post:
 *     summary: Create an exam (validates student / teacher against other services when URLs are set)
 *     tags: [Exams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       201:
 *         description: Exam created
 *       400:
 *         description: Validation or referenced entity not found
 *   get:
 *     summary: List all exams
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 */
router.post('/', createExam);
router.get('/', getAllExams);

/**
 * @swagger
 * /api/exams/student/{studentId}:
 *   get:
 *     summary: Exams for a student (used by Student microservice aggregation)
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         example: S001
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/student/:studentId', getExamsByStudentId);

/**
 * @swagger
 * /api/exams/{id}/with-participants:
 *   get:
 *     summary: Exam plus student and teacher data from other microservices
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB _id or business examId
 *         example: E001
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Exam not found
 */
router.get('/:id/with-participants', getExamWithParticipants);

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Get one exam by MongoDB _id or examId
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: E001
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Exam not found
 *   put:
 *     summary: Update an exam
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: E001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Exam not found
 *   delete:
 *     summary: Delete an exam
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: E001
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Exam not found
 */
router.get('/:id', getExamById);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

module.exports = router;