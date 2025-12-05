import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
    slug: 'subscribers',
    admin: {
        useAsTitle: 'email',
        description: 'Newsletter subscribers',
    },
    access: {
        create: () => true, // Anyone can subscribe
        read: () => true, // Admin can see subscribers (in production, restrict to admin)
        update: () => false, // No one can update
        delete: () => true, // Admin can delete
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'subscribedAt',
            type: 'date',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'active',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
                if (operation === 'create') {
                    data.subscribedAt = new Date().toISOString();
                }
                return data;
            },
        ],
    },
}
