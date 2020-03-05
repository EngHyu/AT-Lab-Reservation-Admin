import express, { Router } from 'express'
import { getRows, setRows, deleteRowsAll } from "../controller"

const router = Router()

router.get('/:type', getRows)
router.post('/:type', setRows)
router.delete('/:type', deleteRowsAll)

export default router