
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
    const { id } = await params;

    try {
        const resp = await axios.get(
            `${process.env.API_URL_SERIES}/${id}`,
            {
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            }
        );

        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || {
            error: "Erro ao buscar a série.",
        };

        return NextResponse.json(data, { status });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();

    try {
        const resp = await axios.put(
            `${process.env.API_URL_SERIES}/${id}`,
            body,
            {
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            }
        );

        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || {
            error: "Erro ao atualizar a série.",
        };

        return NextResponse.json(data, { status });
    }
}

export async function DELETE(_request, { params }) {
    const { id } = await params;

    try {
        const resp = await axios.delete(
            `${process.env.API_URL_SERIES}/${id}`,
            {
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            }
        );

        return NextResponse.json({
            message: "Série excluída com sucesso.",
            data: resp.data,
        });
    } catch (error) {
        console.error("Erro ao excluir série:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });

        const status = error.response?.status || 500;
        const data = error.response?.data || {
            error: "Erro ao excluir a série.",
        };

        return NextResponse.json(data, { status });
    }
}
