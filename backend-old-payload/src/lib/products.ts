import { getPayload } from 'payload'
import config from '@/payload.config'

export interface Product {
    id: string
    title: string
    price: number
    image: string
    category: string
    description?: string
    features?: string[]
}

export async function getProducts(): Promise<Product[]> {
    try {
        const payloadConfig = await config
        const payload = await getPayload({ config: payloadConfig })

        const { docs: products } = await payload.find({
            collection: 'products',
            limit: 100,
        })

        return products.map((p: any) => ({
            id: String(p.id),
            title: p.title || 'Untitled Product',
            price: p.price || 0,
            image:
                p.image && typeof p.image === 'object' && p.image.url
                    ? p.image.url
                    : p.image && typeof p.image === 'string' && p.image.startsWith('http')
                        ? p.image
                        : 'https://placehold.co/600x400?text=No+Image',
            category:
                typeof p.category === 'object' && p.category !== null
                    ? p.category.name
                    : p.category || 'Uncategorized',
            description: p.description || '',
            features: p.features ? p.features.map((f: any) => f.feature) : [],
        }))
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const payloadConfig = await config
        const payload = await getPayload({ config: payloadConfig })

        const product = await payload.findByID({
            collection: 'products',
            id: parseInt(id),
        }) as any

        if (!product) return null

        return {
            id: String(product.id),
            title: product.title || 'Untitled Product',
            price: product.price || 0,
            image:
                product.image && typeof product.image === 'object' && product.image.url
                    ? product.image.url
                    : product.image &&
                        typeof product.image === 'string' &&
                        product.image.startsWith('http')
                        ? product.image
                        : 'https://placehold.co/600x400?text=No+Image',
            category:
                typeof product.category === 'object' && product.category !== null
                    ? product.category.name
                    : product.category || 'Uncategorized',
            description: product.description || '',
            features: product.features
                ? product.features.map((f: any) => f.feature)
                : [],
        }
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

export async function getCategories(): Promise<string[]> {
    try {
        const payloadConfig = await config
        const payload = await getPayload({ config: payloadConfig })

        const { docs: categories } = await payload.find({
            collection: 'categories',
            limit: 50,
        })

        return categories.map((c: any) => c.name)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}
