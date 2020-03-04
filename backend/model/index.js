import csv from 'csvtojson'
import { join } from 'path'
import sqlite from 'better-sqlite3'
import { fstat } from 'fs'
const dbPath = `${__dirname}/../db.db`

function getUserTableQueryAndCallback(query) {
  return {
    query: `${query} ORDER BY count DESC;`,
    callback: (rows) => rows.map(
      (row, idx, arr) => {
        if (idx === 0)
          row.id = 1
        else if (arr[idx-1].count === row.count)
          row.id = arr[idx-1].id
        else
          row.id = arr[idx-1].id + 1
        return row
      }
    ),
  }
}

function getSeatTableQueryAndCallback(query) {
  return {
    query: `${query} ORDER BY roomNum;`,
    callback: (rows) => rows,
  }
}

function getLogTableQueryAndCallback(query) {
  return {
    query: `${query} ORDER BY id DESC;`,
    callback: (rows) => rows,
  }
}

export function getTableDB(type) {
  const db = sqlite(dbPath)
  const defaultQuery = `SELECT * FROM ${type}`
  let settings = {}

  if (type === 'user')
    settings = getUserTableQueryAndCallback(defaultQuery)
  
  else if (type === 'seat')
    settings = getSeatTableQueryAndCallback(defaultQuery)
  
  else if (type === 'log')
    settings = getLogTableQueryAndCallback(defaultQuery)
  
  else
    throw `type error! type not found: ${type}`

  const {
    query,
    callback,
  } = settings

  return callback(db.prepare(query).all())
}

function setUserTable(filePath) {
  const db = sqlite(dbPath)
  csv().fromFile(filePath).then(jsonObj => {
    jsonObj.forEach(({ studentID, name, count }) => {
      try {
        db.prepare(`
          INSERT INTO user(
            studentID, name, count
          ) VALUES(?, ?, ?)
        `).run([ studentID, name, count ])
      } catch (err) {
        db.prepare(`
          UPDATE user SET
          name=?, count=?
          WHERE studentID=?
        `).run([ name, count, studentID ])
      }
    })
  })
}

function setSeatTable(filePath) {
  const db = sqlite(dbPath)
  csv().fromFile(filePath).then(jsonObj => {
    jsonObj.forEach(({ roomNum, seatNum, info }) => {
      try {
        db.prepare(`
          INSERT INTO seat(
            roomNum, seatNum, info
          ) VALUES(?, ?, ?)
        `).run([ roomNum, seatNum, info ])
      } catch (err) {
        db.prepare(`
          UPDATE seat SET
          info=?
          WHERE roomNum=? and seatNum=?
        `).run([ info, roomNum, seatNum ])
      }
    })
  })
}

export function setTableDB(type, file) {
  const filePath = join(__dirname, `../uploads/${file.filename}`)
  let settings = {}

  if (type === 'user') {
    setTimeout(
      ()=>setUserTable(filePath),
      3000,
    )
    return true
  }

  if (type === 'seat') {
    setTimeout(
      ()=>setSeatTable(filePath),
      3000,
    )
    return true
  }

  else {
    return false
  }
}