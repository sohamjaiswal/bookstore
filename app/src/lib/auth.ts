import { env } from '$env/dynamic/private';
import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

export const JWT_COOKIE_NAME = 'ZenStack-Blog-Token';

export async function createToken(user: User) {
    const session = await prisma.userSession.create({
        data: {
            userId: user.id,
        }
    })
    return jwt.sign(
        {
            sub: session.id,
            email: user.email,
        },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}