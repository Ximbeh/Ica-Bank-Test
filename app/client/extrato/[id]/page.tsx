'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function ExtratoInformacoes() {
    const [transacao, setTransacao] = useState<any>(null);
    const { id } = useParams(); 


    const parsedId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        if (parsedId) {
            fetch('/data/transacoes.json') 
                .then(response => response.json())
                .then(data => {
                    const transacaoEncontrada = data.find((t: any) => t.id === parseInt(parsedId)); 
                    setTransacao(transacaoEncontrada);
                });
        }
    }, [parsedId]);

    if (!transacao) {
        return <p>Carregando...</p>;
    }

    const textoTransacao = transacao.valor < 0 ? 'Você transferiu' : 'Você recebeu';

    return (
        <div className="bg-black text-white h-screen p-8">
            <Image
                src="/fonts/LogoBranco.svg"
                width={50}
                height={18}
                alt="logo Ica-Bank"
                className="mb-4"
            />
            <h2 className="text-xl mb-8">Extrato</h2>
            <p className='text-sm text-neutral-500'>{textoTransacao}</p>
            <h3 className={`text-2xl`}>R$ {Math.abs(transacao.valor).toFixed(2)}</h3>
            <p className='text-sm text-neutral-500'>De {transacao.nome}</p>
            <p className='text-sm text-neutral-500'>CPF: {transacao.cpf}</p>
            <p className='text-sm text-neutral-500'>No dia: {new Date(transacao.data).toLocaleDateString('pt-BR')}</p>
            <Link href="/client/extrato" className="mt-4 inline-block text-blue-500">Voltar</Link>
        </div>
    );
}
