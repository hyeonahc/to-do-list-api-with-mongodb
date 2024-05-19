import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import todoRoutes from './router/todo'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const connectDB = async () => {
  try {
    console.log('Connecting to the database...')
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mybr4dl.mongodb.net/todoList?retryWrites=true&w=majority`
    )
    console.log('Database connection established.')
  } catch (error) {
    console.error('Error connecting to the database:', error.message)
    process.exit(1)
  }
}

connectDB()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', todoRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
