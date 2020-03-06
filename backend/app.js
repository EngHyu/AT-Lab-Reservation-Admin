import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
const port = 3000
const options = {
  origin: 'http://localhost:5000',
}

app.use(cors(options))
app.use('/', router)

app.listen(port, ()=>{
  console.log(`express runs at localhost:${port}`)
})

export default app