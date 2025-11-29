import { RootPage, generateMetadata } from '@payloadcms/next/views'
import { importMap } from '@/app/(payload)/admin/importMap'

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
    generateMetadata({ config: configPromise, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
    RootPage({ config: configPromise, params, searchParams, importMap })

export default Page
