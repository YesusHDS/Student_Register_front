'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import axios from 'axios'

export default function Home() {

  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const [nomeCheck, setNomeCheck] = useState(false)
  const [senhaCheck, setSenhaCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)

  useEffect(()=>{
    axios({
      method: 'post',
      url: 'https://student-register-bnaf.onrender.com/sessionCheck',
      data: {
        token: localStorage.getItem('token')
      }
    }).then(({data})=>{
      if (data.length == 1) window.location.assign('https://sr-front.vercel.app/studentList')
    })
  },[])

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
          if(resp.data.length != 0) {

            setLoginCheck(false)
            
            localStorage.setItem('nm_login',resp.data[0].nm_login)
            localStorage.setItem('token',resp.data[0].cd_token)
            localStorage.setItem('nm_tipo',resp.data[0].nm_tipo)
            localStorage.setItem('cd_curso',resp.data[0].cd_curso)
            localStorage.setItem('nm_curso',resp.data[0].nm_curso)

            if(resp.data[0].nm_tipo == 'professor') window.location.replace("https://sr-front.vercel.app/studentList")
            else window.location.replace("https://sr-front.vercel.app/studentListDir")

          } else setLoginCheck(true)
          
      })
    }
  }

  return (
    <div className="h-screen">
        <header className="w-full flex flex-row px-10 pt-3">
          <Image className="w-[15%] h-[10vh]" src="/Logo_Fatec.png" width={291} height={126} alt="Logo da Fatec Praia Grande"/>
          <div className="w-full flex flex-row-reverse gap-16">
          <Image className="w-[15%] h-[10vh]" src="/Logo_SP.png" width={402} height={140} alt="Logo do Governo do Estado de São Paulo"/>
          <Image className="w-[10%] h-[10vh]" src="/Logo_CPS.png" width={168} height={110} alt="Logo do Centro Paula Souza"/>
          </div>
        </header>
        <div className="w-full mt-2">
          <h1 className="mx-auto font-bold text-[18pt] text-red-800 w-[30%] text-center">SISTEMA DE MONITORAMENTO DE ESTÁGIO</h1>
          <div className="mx-auto p-5 mt-3 w-[30%] bg-red-800">
            <h2 className="pb-8 pt-3 font-bold text-white text-[1.5vw] text-center">LOGIN</h2>
            <form className="bg-white flex flex-col py-4" onSubmit={e=>{e.preventDefault()}}>
              <div className="flex flex-col w-11/12 mx-auto">
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

              <span className={`text-red-600 py-9 font-bold text-2xl text-center ${loginCheck?'visible':'invisible'}`}>Login inválido!</span>
              <input onClick={e=>{validation()}} className="bg-red-800 cursor-pointer text-white w-[40%] h-16 font-bold text-[16pt] mx-auto" type="submit" value="ENTRAR" />
            </form>
          </div>
        </div>
    </div>
  );
}
