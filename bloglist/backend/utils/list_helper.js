const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let likesArray = blogs.map(blog => blog.likes)
  return likesArray.reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes) ? a : b)
}

const mostBlogs = (blogs) => {
  let blogArray = []

  blogs.forEach((blog) => {
    if (!blogArray.find(b => b.author === blog.author)){
      let authorEntry = {
        author: blog.author,
        blogs: 1
      }
      blogArray = blogArray.concat(authorEntry)
    } else {
      let currentAuthor = blogArray.find(b => b.author === blog.author)
      currentAuthor.blogs = currentAuthor.blogs + 1
    }
  })
  return blogArray.reduce((a, b) => (a.blogs > b.blogs) ? a : b)
}

const mostLikes = (blogs) => {
  let likeArray = []

  blogs.forEach((blog) => {
    if (!likeArray.find(b => b.author === blog.author)){
      let authorEntry = {
        author: blog.author,
        likes: blog.likes
      }
      likeArray = likeArray.concat(authorEntry)
    } else {
      let currentAuthor = likeArray.find(b => b.author === blog.author)
      currentAuthor.likes = currentAuthor.likes + blog.likes
    }
  })
  return likeArray.reduce((a, b) => (a.likes > b.likes) ? a : b)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}