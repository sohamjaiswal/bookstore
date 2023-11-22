// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { PrismaClient, User } from '@prisma/client';
declare global {
	namespace App {
		interface Locals {
			user?: User;
			db: PrismaClient;
		}
	}
}

export {};