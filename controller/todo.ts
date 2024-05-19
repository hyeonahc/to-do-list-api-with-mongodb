import { Request, Response } from 'express'
import todoSchema from '../schema/todoSchema'
import { getNanoId } from '../util/getNanoId'

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const alltodos = await todoSchema.find()
    if (alltodos.length > 0) {
      res.status(200).json({
        message: 'Successfully retrieved all to do lists',
        data: alltodos,
      })
    } else {
      res.status(200).json({
        message: 'To do list is empty',
        data: [],
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        message: 'Invalid or missing id parameter',
      })
    }

    const filteredTodo = await todoSchema.findOne({ id })
    if (filteredTodo) {
      res.status(200).json({
        message: 'Successfully retrieved todo',
        data: filteredTodo,
      })
    } else {
      res.status(404).json({
        message: 'To do list not found',
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({
        message: 'Text is a required field',
      })
    }

    const id = getNanoId()
    const newTodo = new todoSchema({ id, ...req.body })
    const updatedTodo = await newTodo.save()
    res.status(201).json({
      message: 'Successfully added to do list',
      updatedTodo,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id, text } = req.body
    if (!id || !text || !text.trim()) {
      return res.status(400).json({
        error: 'Both id and text are required',
      })
    }

    const updatedTodo = await todoSchema.findOneAndUpdate({ id }, { text })
    res.status(200).json({
      message: 'successfully updated to do list',
      data: updatedTodo,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({
        error: 'id is required',
      })
    }

    const updatedTodo = await todoSchema.findOneAndDelete({ id })
    res.status(200).json({
      message: 'Successfully deleted to do list',
      data: updatedTodo,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}
