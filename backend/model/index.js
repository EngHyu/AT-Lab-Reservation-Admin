import csv from 'csvtojson'
import { join } from 'path'
import sqlite from 'better-sqlite3'

const dbPath = join(__dirname, '../../../AT-Lab-Reservation/resources/src/static/db.db')

function getUserRowsQueryAndCallback(query) {
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

function getSeatRowsQueryAndCallback(query) {
  return {
    query: `${query} ORDER BY roomNum, type;`,
    callback: (rows) => rows.map(
      (row, idx) => {
        row.id = idx + 1
        return row
      }
    ),
  }
}

function getLogRowsQueryAndCallback(query) {
  return {
    query: `${query} ORDER BY id DESC;`,
    callback: (rows) => rows,
  }
}

export function getRowsDB(type) {
  const db = sqlite(dbPath)
  const defaultQuery = `SELECT * FROM ${type}`
  let settings = {}

  if (type === 'user')
    settings = getUserRowsQueryAndCallback(defaultQuery)
  
  else if (type === 'seat')
    settings = getSeatRowsQueryAndCallback(defaultQuery)
  
  else if (type === 'log')
    settings = getLogRowsQueryAndCallback(defaultQuery)
  
  else
    throw `type error! type not found: ${type}`

  const {
    query,
    callback,
  } = settings

  return callback(db.prepare(query).all())
}

function setUserRows(filePath) {
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

function setSeatRows(filePath) {
  const db = sqlite(dbPath)
  csv().fromFile(filePath).then(jsonObj => {
    jsonObj.forEach((seat) => {
      // 좌석을 새로 만드는 경우, 정보를 입력합니다.
      try {
        db.prepare(`
          INSERT INTO seat VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);
        `).run(Object.values(seat))
      }
      
      // info가 다를 경우, info를 업데이트 해줍니다.
      // reservable이 다를 경우, reservable을 업데이트 해줍니다.
      catch (err) {
        const { info, reservable, roomNum, seatNum, type } = seat
        const old = db.prepare(`
          SELECT info, reservable
          FROM seat
          WHERE roomNum=? and seatNum=? and type=?;
        `).get([ roomNum, seatNum, type ])

        if (old.info !== info) {
          db.prepare(`
            UPDATE seat
            SET info=?
            WHERE roomNum=? and seatNum=? and type=?;
          `).run([ info, roomNum, seatNum, type ])
        }

        if (old.reservable !== parseInt(reservable)) {
          db.prepare(`
            UPDATE seat
            SET reservable=?
            WHERE roomNum=? and seatNum=? and type=?;
          `).run([ reservable, roomNum, seatNum, type ])
        }
      }
    })
  })
}

export function setRowsDB(type, file) {
  const filePath = join(__dirname, `../uploads/${file.filename}`)
  let settings = {}

  if (type === 'user') {
    setTimeout(
      ()=>setUserRows(filePath),
      300,
    )
    return true
  }

  if (type === 'seat') {
    setTimeout(
      ()=>setSeatRows(filePath),
      300,
    )
    return true
  }

  else {
    return false
  }
}

export function deleteRowsAllDB(type) {
  const db = sqlite(dbPath)
  const result = db.prepare(`DELETE from ${type};`).run()
  return result
}