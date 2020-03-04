import express, { Router } from 'express'
import { getTable, setTable } from "../controller"

const router = Router()

router.get('/:type', getTable)
router.post('/:type', setTable)

export default router