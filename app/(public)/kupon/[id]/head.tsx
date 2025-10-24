import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Basit başlık - backend’den fetch edilebilir
  const title = `Kupon #${params.id} | İddaa Tahmini ve Banko Kupon`
  const description = 'Kupon detaylarını görüntüle, tahmin ve oranları incele.'
  const url = `https://iddaasohbet.com/kupon/${params.id}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description }
  }
}

export default function Head() { return null }


