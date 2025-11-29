import configPromise from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { ServerFunctionClient } from 'payload'
import React from 'react'

import { importMap } from '@/app/(payload)/admin/importMap'
import './custom.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => {
    const serverFunction: ServerFunctionClient = async (args) => {
        'use server'
        return handleServerFunctions({
            ...args,
            config: configPromise,
            importMap,
        })
    }

    return (
        <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
            {children}
        </RootLayout>
    )
}

export default Layout
