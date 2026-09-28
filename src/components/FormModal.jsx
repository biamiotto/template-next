'use client';

import { Form, Input, InputNumber, Modal } from 'antd';

export default function FormModal({ openModal, serie, confirmLoading, onSubmit, onCancel }) {
    const [form] = Form.useForm();

    return (
        <Modal
            open={openModal}
            title={serie ? 'Editar Série' : 'Adicionar Série'}
            centered
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            destroyOnHidden>
            <Form form={form} layout='vertical' initialValues={serie} onFinish={onSubmit}>
                <Form.Item
                    name='title'
                    label='Título'
                    rules={[
                        {
                            require: true,
                            min: 3,
                            max: 120,
                            message: 'Por favor, insira o título da série contendo entre 3 e 120 caracteres!'

                        }
                    ]}>
                        <Input placeholder='ex: Breaking Bad' />
                </Form.Item>

                <Form.Item
                    name='genero'
                    label='Gênero'
                    rules={[
                        {
                            require: true,
                            message: 'Por favor, insira o gênero da série!'

                        }
                    ]}>
                        <Input placeholder='ex: Drama' />
                </Form.Item>

                <Form.Item
                    name='plataforma'
                    label='Plataforma'
                    rules={[
                        {
                            require: true,
                            message: 'Por favor, insira a plataforma da série!'

                        }
                    ]}>
                        <Input placeholder='ex: Netflix' />
                </Form.Item>

                <Form.Item
                    name='numero_temporadas'
                    label='Número de Temporadas'
                    rules={[
                        {
                            require: true,
                            type: 'number',
                            message: 'Por favor, insira o número de temporadas da série!'

                        }
                    ]}>
                    <InputNumber placeholder='ex: 5' min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name='ano_lancamento'
                    label='Ano de Lançamento'
                    rules={[
                        {
                            require: true,
                            type: 'number',
                            message: 'Por favor, insira o ano de lançamento da série!'

                        }
                    ]}>
                    <InputNumber placeholder='ex: 2008' min={1900} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name='imagemUrl'
                    label='URL da Imagem'
                    rules={[
                        {
                            type: 'url',
                            message: 'Por favor, insira uma URL válida!'

                        },
                    ]}>
                    <Input placeholder='ex: https://codeverse.dev.br/breaking-bad.png' />
                </Form.Item>
            </Form>
        </Modal>
    );
}