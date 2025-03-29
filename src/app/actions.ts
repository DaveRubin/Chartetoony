'use server'

import { createClient } from "redis"
import { Language } from "./types"

export async function clearHistory(lang: Language) {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();
    await redis.del(`history-${lang}`);
} 