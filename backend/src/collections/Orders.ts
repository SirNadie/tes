import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'text', // Changed from relationship to text to support hardcoded IDs
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                    min: 1,
                },
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                },
            ],
        },
        {
            name: 'total',
            type: 'number',
            required: true,
        },
        {
            name: 'customer',
            type: 'group',
            fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'email', type: 'email', required: true },
                { name: 'address', type: 'textarea', required: true },
                { name: 'phone', type: 'text', required: true },
            ],
        },
        {
            name: 'payment',
            type: 'group',
            fields: [
                {
                    name: 'method',
                    type: 'select',
                    options: ['cod', 'online'],
                    required: true,
                },
                {
                    name: 'transactionId',
                    type: 'text',
                },
                {
                    name: 'status',
                    type: 'select',
                    options: ['pending_payment', 'awaiting_proof'],
                    defaultValue: 'pending_payment',
                },
            ],
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Verifying', value: 'verifying' },
                { label: 'Paid', value: 'paid' },
                { label: 'Shipped', value: 'shipped' },
            ],
            defaultValue: 'pending',
        },
    ],
    hooks: {
        beforeChange: [
            ({ data, req, operation }) => {
                if (operation === 'create') {
                    if (data.payment?.method === 'online' && data.payment?.transactionId) {
                        data.status = 'verifying';
                        data.payment.status = 'awaiting_proof';
                    } else if (data.payment?.method === 'cod') {
                        data.status = 'pending';
                        data.payment.status = 'pending_payment';
                    }
                }
                return data;
            },
        ],
    },
}
