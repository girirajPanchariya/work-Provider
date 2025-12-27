import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(400).json({  // <-- fixed .json here
        message: "The token not provided"
      })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = { id: decoded.id }  // ✅ sets req.user.id for use downstream
    next()

  } catch (error) {
    return res.status(400).json({  // <-- fixed .json here
      message: "User authentication error",
      error: error.message
    })
  }
}
