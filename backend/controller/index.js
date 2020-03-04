import upload from './upload'
import { getTableDB, setTableDB } from '../model'
import multer from 'multer'

export function getTable(req, res) {
  const type = req.params.type
  res.header("Access-Control-Allow-Origin", "http://localhost:5000")
  res.status(200).json(
    getTableDB(type)
  )
}

export function setTable(req, res, next) {
  const { type } = req.params
  res.header("Access-Control-Allow-Origin", "http://localhost:5000")
  
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return next(err)
    } else if (err) {
      return next(err)
    }

    if (!setTableDB(type, req.file))
      return next(err)

    return res.json({ success: type, file: req.file })
  })
}