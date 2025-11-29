import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from '@/app/(payload)/admin/importMap'
import './custom.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout config={configPromise} importMap={importMap}>
        {children}
    </RootLayout>
)

export default Layout
