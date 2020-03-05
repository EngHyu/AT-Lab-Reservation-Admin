import upload from './upload'
import { getRowsDB, setRowsDB, deleteRowsAllDB } from '../model'
import multer from 'multer'

export function getRows(req, res) {
  const { type } = req.params
  res.status(200).json(
    getRowsDB(type)
  )
}

export function setRows(req, res, next) {
  const { type } = req.params
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return next(err)
    } else if (err) {
      return next(err)
    }

    if (!setRowsDB(type, req.file))
      return next(err)

    return res.json({
      success: type,
      file: req.file,
    })
  })
}

export function deleteRowsAll(req, res) {
  const { type } = req.params
  res.status(200).json(
    deleteRowsAllDB(type)
  )
}