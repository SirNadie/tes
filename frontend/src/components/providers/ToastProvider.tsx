'use client';

import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/lib/toast';

export default function ToastProvider() {
    const { toasts, removeToast } = useToast();

    return <ToastContainer toasts={toasts} removeToast={removeToast} />;
}
