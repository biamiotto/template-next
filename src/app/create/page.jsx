'use client';

import FormModal from '@components/FormModal';
import { Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePage() {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        console.log('Dados enviados:', values);

        setLoading(true);

        try {
            const response = await axios.post('/api/series', values);

            console.log('Resposta da API:', response.data);

            setOpenModal(false);

            toast.success('Série criada!', { id: 'create' });
        } catch (error) {
            console.error('Erro ao criar a série:', error);

            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Resposta:', error.response.data);
            }

            toast.error(
                error.response?.data?.error || 'Erro ao criar a série',
                { id: 'create' }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h2>Post - Create</h2>

            <p>
                O navegador envia o formulário (modal) para /api/series (nosso route.js); o servidor
                cria a série na API com a api-key privada.
            </p>

            <p>
                Abra o DevTools → Network → series → Payload:
                os dados enviados, sem x-api-key.
            </p>

            <Button
                type='primary'
                onClick={() => setOpenModal(true)}
                style={{
                    backgroundColor: '#4B1D6B',
                    borderColor: '#4B1D6B',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9b12a0';
                    e.currentTarget.style.borderColor = '#621092';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#621092';
                    e.currentTarget.style.borderColor = '#621092';
                }}
            >
                Nova série
            </Button>

            <FormModal
                openModal={openModal}
                confirmLoading={loading}
                onSubmit={handleSubmit}
                onCancel={() => setOpenModal(false)}
            />
        </main>
    );
}
