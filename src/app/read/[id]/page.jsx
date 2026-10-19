'use client';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import FormModal from '@components/FormModal';
import {Button, Card, Skeleton} from 'antd';
import ConfirmDelete from '@components/ConfirmDelete';
export default function ReadById() {

    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    useEffect(() => {
        async function buscarSerie() {
            try {
                const response = await axios.get(`/api/series/${id}`);
                setSerie(response.data);
            } catch (error) {
                toast.error("Série não encontrada.", { id: 'read-id' });
            } finally {
                setLoading(false);
            }
        }
        buscarSerie();
    }, [id]);
    const handleUpdate = async (values) => {
        setSaving(true);
        try {
        await axios.put(`/api/series/${id}`, values);
        setSerie({ ...serie, ...values });
        setEditOpen(false);
        toast.success('Série atualizada com sucesso.', { id: 'update-success' });
        } catch (error) {
         toast.error('Erro ao atualizar a série.', { id: 'update-error' });
         console.error(error);
        } finally {
            setSaving(false);
        }
    };
    const handleDelete = async () => {
    setDeleting(true);

    try {
        const response = await axios.delete(`/api/series/${id}`);

        console.log('Resposta da exclusão:', response.data);

        setSerie(null);
        setDeleteOpen(false);

        toast.success('Série excluída com sucesso.');
    } catch (error) {
        console.error('Status:', error.response?.status);
        console.error('Resposta:', error.response?.data);
        console.error('URL:', error.config?.url);
        console.error('Método:', error.config?.method);

        toast.error(
            error.response?.data?.detalhes ||
            error.response?.data?.error ||
            'Erro ao excluir a série.'
        );
    } finally {
        setDeleting(false);
    }
};
    return (
        <main>
            <h2>Get By Id - read</h2>
            <p>O navegador busca, edita e exclui pelo /api/series/[id] (nosso route.js); o servidor fala com a API usando a api-key privada.</p>
            <p>Abra o DevTools - Network: aparece a série (GET/PUT/DELETE), sem x-api-key.</p>
            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                    </div>
                    ) : (
                        serie && (
                            <>
                            <Card title={serie.title}>
                                <p>Gênero: {serie.genero}</p>
                                <p>Plataforma: {serie.plataforma}</p>
                                <p>Temporadas: {serie.numero_temporadas}</p>
                                <p>Ano do lançamento: {serie.ano_lancamento}</p>
                            </Card>
                            <div className="actions">
                                <Button type="primary" onClick={() => setEditOpen(true)}>
                                    Editar
                                </Button>
                                <Button danger onClick={() => setDeleteOpen(true)}>
                                    Excluir
                                </Button>
                            </div>
                            <FormModal
                                openModal={editOpen}
                                confirmLoading={saving}
                                serie={serie}
                                onSubmit={handleUpdate}
                                onCancel={() => setEditOpen(false)}
                            />
                            <ConfirmDelete
                                openModal={deleteOpen}
                                serie={serie}
                                confirmLoading={deleting}
                                onConfirm={handleDelete}
                                onCancel={() => setDeleteOpen(false)}
                            />
                            </>
                        )
                    )}
        </main>
    );
}