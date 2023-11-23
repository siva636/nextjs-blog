import { auth } from '@/auth';

export const middleware = auth;

export const config = { matcher: ['/create', '/drafts'] };
