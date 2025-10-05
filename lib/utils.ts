import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function calculateWinRate(won: number, total: number): number {
  if (total === 0) return 0
  return Math.round((won / total) * 100)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount)
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2)
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    FUTBOL: 'bg-green-500',
    BASKETBOL: 'bg-orange-500',
    TENIS: 'bg-yellow-500',
    VOLEYBOL: 'bg-blue-500',
    HENTBOL: 'bg-purple-500',
    BUZ_HOKEYI: 'bg-cyan-500',
    DIGER: 'bg-gray-500'
  }
  return colors[category] || colors.DIGER
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    FUTBOL: 'Futbol',
    BASKETBOL: 'Basketbol',
    TENIS: 'Tenis',
    VOLEYBOL: 'Voleybol',
    HENTBOL: 'Hentbol',
    BUZ_HOKEYI: 'Buz Hokeyi',
    DIGER: 'Diğer'
  }
  return labels[category] || labels.DIGER
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Bekliyor',
    WON: 'Kazandı',
    LOST: 'Kaybetti',
    VOID: 'İptal'
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'text-yellow-500',
    WON: 'text-green-500',
    LOST: 'text-red-500',
    VOID: 'text-gray-500'
  }
  return colors[status] || colors.PENDING
}

