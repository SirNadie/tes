import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
        // Anyone can create orders (checkout)
        create: () => true,
        // Only admins can read orders (in production you'd check user ownership)
        read: ({ req: { user } }) => {
            if (user) return true;
            return false;
        },
        // Only admins can update orders
        update: ({ req: { user } }) => {
            if (user) return true;
            return false;
        },
        // Only admins can delete
        delete: ({ req: { user } }) => {
            if (user) return true;
            return false;
        },
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'text',
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
                    options: ['pending_payment', 'awaiting_proof', 'verified'],
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
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' },
            ],
            defaultValue: 'pending',
        },
    ],
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
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
