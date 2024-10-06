'use client'

import { useState, useEffect } from 'react';
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Extrato() {
    const [transacoes, setTransacoes] = useState<any[]>([]);

    useEffect(() => {
        fetch('/data/transacoes.json')
            .then(response => response.json())
            .then(data => setTransacoes(data))
            
    }, []);

    

    

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
            <div className='flex flex-col gap-4'>
                {transacoes.map(transacao => {
                     const corValor = transacao.valor < 0 ? 'text-red-500' : 'text-green-500';
                    return(
                        <Link
                            key={transacao.id}
                            href={`/client/extrato/${transacao.id}`}
                            className={buttonVariants({ variant: "extrato" })}
                        >
                            <h3 className="text-lg">{transacao.nome}</h3>
                            <div className="flex flex-col items-end">
                                <p className="text-xs text-neutral-500">
                                    {new Date(transacao.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                </p>
                                <p className={`text-sm ${corValor}`}>R$ {transacao.valor.toFixed(2)}</p>
                            </div>
                        </Link>

                    )
                })}
            </div>
        </div>
    );
}
