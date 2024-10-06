"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Transferir() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [fullName, setFullName] = useState("");
    const [cpf, setCpf] = useState("");
    const router = useRouter();


    const handleContinue = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            router.push("/client");
        }
    };

    return (
        <div className="bg-black text-white h-screen">
            <div className="p-8">
                <Link href="/client">
                    <Image
                        src="/fonts/LogoBranco.svg"
                        width={50}
                        height={18}
                        alt="logo Ica-Bank"
                        className="mb-4"
                    />
                </Link>


                {step === 1 ? (
                    <>
                        <h2 className="text-xl">Transferir</h2>
                        <p className="text-neutral-500 mb-16 text-sm">Qual a quantia da fatura?</p>
                        <Input
                            placeholder="R$ 00,00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </>
                ) : step === 2 ? (
                    <>
                        <h2 className="text-xl">Transferir para:</h2>
                        <p className="text-neutral-500 mb-16 text-sm">Insira as informações do Destinatário</p>
                        <Input
                            placeholder="Nome completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mb-4"
                        />
                        <Input
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-xl mb-4">Transferir</h2>
                        <div className="text-neutral-500 text-sm">
                            <p>Você estará pagando</p>
                            <p className="text-white text-2xl mb-2">R${amount}</p>
                            <p>Para {fullName}</p>
                            <p> CPF: {cpf}</p>

                        </div>
                    </>
                )}
            </div>

            <div className="fixed bottom-5 left-0 right-0 px-8">
                <button
                    type="button"
                    className={buttonVariants({ variant: "submit", size: "md" })}
                    onClick={handleContinue}
                >
                    {step === 3 ? "Finalizar" : "Continuar"}
                </button>
            </div>
        </div>
    );
}
