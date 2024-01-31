'use client'

import Image from "next/image";
import { useState } from "react";

import axios from 'axios'

export default function Home() {

  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const [nomeCheck, setNomeCheck] = useState(false)
  const [senhaCheck, setSenhaCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)

  const [login, setLogin] = useState({
    nm_login: '',
    cd_senha: '',
    cd_token: ''
  })


  function validation(){
    if (nome.length > 0){
      setNomeCheck(false)
    } else{
      setNomeCheck(true);
    }

    if (senha.length > 0){
      setSenhaCheck(false)
    } else{
      setSenhaCheck(true)
    }

    if(nome.length > 0 && senha.length > 0){
      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/login',
        data:{
          nm_login: nome,
          cd_senha: senha
        }
      }).then(resp=>{
        
        console.log('Abc');
          setLogin({
            nm_login: resp.data.nm_login,
            cd_senha: resp.data.cd_senha,
            cd_token: resp.headers.token
          })

      })
    }
  }

  return (
    <div className="h-screen">
        <header className="w-full flex flex-row px-10">
          <Image className="" src="/Logo_Fatec.png" width={291} height={126} alt="Logo da Fatec Praia Grande"/>
          <div className="w-full flex flex-row-reverse">
          <Image className="" src="/Logo_SP.png" width={402} height={140} alt="Logo do Governo do Estado de São Paulo"/>
          <Image className="" src="/Logo_CPS.png" width={168} height={110} alt="Logo do Centro Paula Souza"/>
          </div>
        </header>
        <div className="w-full mt-2">
          <h1 className="mx-auto font-bold text-4xl text-red-800 w-2/5 text-center">SISTEMA DE MONITORAMENTO DE ESTÁGIO</h1>
          <div className="mx-auto p-5 mt-3 w-2/5 bg-red-800">
            <h2 className="pb-8 pt-3 font-bold text-white text-3xl text-center">LOGIN</h2>
            <form className="bg-white flex flex-col py-4" onSubmit={e=>{e.preventDefault()}}>
              <div className="flex flex-col w-11/12 mx-auto group">
                <span className="font-bold text-2xl">
                  Nome {nomeCheck && <span className="font-bold text-xl text-red-600">Campo obrigatório</span>}
                </span> 
                <input onChange={e=>{setNome(e.target.value)}} className="bg-zinc-300 h-16 pl-5 text-2xl" type="text"/>
              </div>

              <div className="mt-2 flex flex-col w-11/12 mx-auto">
                <span className="font-bold text-2xl">
                  Senha {senhaCheck && <span className="text-xl text-red-600">Campo obrigatório</span>}
                </span>
                <input onChange={e=>{setSenha(e.target.value)}} className="bg-zinc-300 h-16 pl-5 text-2xl" type="password"/>
              </div>

              <span className="text-red-600 py-9 font-bold text-2xl text-center">Login inválido!</span>
              <input onClick={e=>{validation()}} className="bg-red-800 text-white w-48 h-16 font-bold text-2xl mx-auto" type="submit" value="ENTRAR" />
            </form>
          </div>
        </div>
    </div>
  );
}
