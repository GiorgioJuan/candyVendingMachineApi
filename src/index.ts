import express from 'express'
import adminRouter from './routes/admin'
import maintenanceRouter from './routes/maintenance'
import saleRouter from './routes/sale'
import userRouter from './routes/user'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')

require('./utils/mongo') // connect to mongo

const app = express()
app.use(cors())
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.use('/api/admin', adminRouter)
app.use('/api/maintenance', maintenanceRouter)
app.use('/api/sale', saleRouter)
app.use('/api/user', userRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
