const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'Blog title is missing'
    })
  } else if (!body.url) {
    return response.status(400).json({
      error: 'Blog URL is missing'
    })
  }

  const user = request.user

  if(!user){
    return response.status(401).json({
      error: 'JWT token is missing or wrong'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(!user){
    return response.status(401).json({
      error: 'JWT token is missing or wrong'
    })
  }

  if(blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(400).json({
      error: 'Only the creator of the blog can delete it'
    })
  }

})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
    url: body.url,
    title: body.title
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter