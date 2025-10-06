const recentMap = new Map<string, number[]>()

export function allowMessage(userId: string, now = Date.now()) {
  const windowMs = 10_000 // 10s
  const limit = 5 // 5 messages / 10s
  const arr = recentMap.get(userId) || []
  const filtered = arr.filter((t) => now - t < windowMs)
  if (filtered.length >= limit) return false
  filtered.push(now)
  recentMap.set(userId, filtered)
  return true
}


