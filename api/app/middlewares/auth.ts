import jwt, { Secret, JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { UnauthorizedOperationError } from "../contexts/shared/domain/unauthorized-operation-error"

export interface AuthRequest extends Request {
  user: string | JwtPayload
}

export const Auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      throw new UnauthorizedOperationError("No token present")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret)
    req.user = decoded

    next()
  } catch (err) {
    console.log(err)
    res.status(401).send(`Error authenticating: ${err}`)
  }
}
