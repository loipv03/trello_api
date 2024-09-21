import jwt, { Secret } from 'jsonwebtoken'

const generateToken = (_id: number | string, time: string) => {
    const token = jwt.sign({ user: { _id } }, process.env.JWT_SECRET as Secret, {
        expiresIn: time,
    });
    return token
}

export default generateToken