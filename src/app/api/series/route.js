import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(_req) {
    const { searchParams } = new URL(_req.url);

    try {
        const resp = await axios.get(process.env.API_URL_SERIES, {
            params: Object.fromEntries(searchParams),
            headers: { 'x-api-key': process.env.API_KEY },
        });
        
        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao buscar as séries.'};
        
        return NextResponse.json(data, { status });

    }
}

export async function POST(req) {
    const body = await req.json();

    try {
        const resp = await axios.post(process.env.API_URL_SERIES, body, {
            headers: { 'x-api-key': process.env.API_KEY },
        });
        
        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data ||{ error: 'Erro ao criar série.' };
        
        return NextResponse.json(data, { status });

    }
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();

    try {
        const resp = await axios.put(`${process.env.API_URL_SERIES}/${id}`, body, {
            headers: { 'x-api-key': process.env.API_KEY },
        });

        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao atualizar série.' };

        return NextResponse.json(data, { status });
    }
}


export async function DELETE(_req, { params }) {
    const { id } = await params;

    try {
        const url = `${process.env.API_URL_SERIES}/${id}`;

        console.log('Tentando excluir série:', url);

        const resp = await axios.delete(url, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        });

        console.log('Série excluída. Status:', resp.status);

        return NextResponse.json({
            message: 'Série excluída com sucesso.',
        });
    } catch (error) {
        console.error('Erro ao excluir série:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });

        return NextResponse.json(
            {
                error: 'Erro ao excluir série.',
                detalhes: error.response?.data || error.message,
            },
            { status: error.response?.status || 500 }
        );
    }
}
