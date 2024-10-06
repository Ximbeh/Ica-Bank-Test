"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Nome de usuário deve ter no mínimo 2 caractéres" })
    .max(100, { message: "Nome de usuário pode ter no máximo 100 caractéres" }),
  email: z
    .string()
    .min(3, { message: "Email deve ter no mínimo 3 caractéres" })
    .max(100, { message: "Email deve ter no máximo 100 caractéres" }),
  CPF: z
    .string()
    .min(11, { message: "CPF Inválido" })
    .max(15, { message: "CPF Inválido" }),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export default function Login() {
  const [step, setStep] = useState<"details" | "password">("details");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      CPF: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmitDetails(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep("password");
  }

  function onSubmitPassword(values: z.infer<typeof passwordSchema>) {
    console.log(values);
    window.location.href = "/admin/accounts";
  }

  return (
    <div className="bg-black text-white h-screen p-8">
      {step === "details" && (
        <>
          <h3 className="text-lg mb-2">Queremos conhecer você melhor.</h3>
          <p className="text-xs mb-16">
            Preencha os dados abaixo para continuarmos com o seu cadastro
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CPF"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="CPF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="fixed bottom-5 left-0 right-0 px-8">
                <button type="submit" className={buttonVariants({ variant: "submit", size:"lg" })}>
                  Continuar
                </button>
              </div>
            </form>
          </Form>
        </>
      )}

      {step === "password" && (
        <>
          <h3 className="text-lg mb-2">Crie sua senha.</h3>
          <p className="text-xs mb-16">
            Digite sua senha abaixo e confirme para finalizar o cadastro
          </p>

          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-8">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Senha"
                          {...field}
                        />
                        <span
                          className="absolute right-2 top-1/4 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)} 
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirmar Senha"
                          {...field}
                        />
                        <span
                          className="absolute right-2 top-1/4 cursor-pointer"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="fixed bottom-5 left-0 right-0 px-8">
                <button type="submit" className={buttonVariants({ variant: "submit", size:"lg" })}>
                  Finalizar
                </button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
