import { Request, Response } from "express"
import { createPostsModel, replyToPostModel } from "../models/postsModels"

export const createPost = async (req: Request, res: Response) => {
  const {thread_id, user_id, post_content} = req.body

  if(!post_content) return res.status(400).send({error: "Missing parameters"})

  try {
    const post = await createPostsModel(thread_id, user_id, post_content)

    if(!post) throw new Error ()

    res.status(201).send({ post })
  } catch (error) {
    res.status(500).send({ error: "Internal server error" })
  }
}

export const replyToPost = async (req: Request, res: Response) => {
  const { post_content, user_id, thread_id, reply_to_post_id } = req.body
  if(!post_content) return res.status(400).send({ error: "Missing parameters" })

  try {
    const reply = await replyToPostModel(post_content, user_id, thread_id, reply_to_post_id)

    if(!reply) throw new Error()

    res.status(201).send({ reply })

  } catch (error) {
    res.status(500).send({ error: "Internal server error"})
  }
}
