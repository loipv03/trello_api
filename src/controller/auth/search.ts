import { NextFunction, Request, Response } from 'express';
import User from '../../model/user';

const searchUser = async (req: Request, res: Response, next: NextFunction) => {
    const { searchTerm, isActive } = req.query;

    try {
        const searchCriteria: any = {
            $or: [
                { name: new RegExp(searchTerm as string, 'i') },
                { email: new RegExp(searchTerm as string, 'i') },
            ],
        };

        if (isActive) {
            searchCriteria.isActive = isActive === 'true';
        }

        const users = await User.find(searchCriteria).select('name email');
        return res.status(200).json(users);
    } catch (error) {
        return next(error)
    };
}

export default searchUser
