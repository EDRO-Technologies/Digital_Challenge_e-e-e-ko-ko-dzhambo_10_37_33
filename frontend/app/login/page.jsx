"use client"

import React from 'react'
import Header from '@/components/Header'
import ModelVishka from '@/components/3d models/ModelVishka'
const page = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='max-w-[859px] w-full h-[587px] bg-white rounded-[23px] pl-[58px] flex justify-between items-center mr-[20px]'>
                <div className='flex flex-col'>
                    <div className='flex flex-col mt-[80px]'>
                        <span className='text-[24px] font-medium'>Начать прямо сейчас</span>
                        <span className='text-[14px] font-normal text-[#ABABAB]'>Авторизоваться в аккаунт</span>
                    </div>
                    <div className='flex flex-col mt-[79px]'>
                        <span className='font-medium text-[14px]'>Почта</span>
                        <div className='max-w-[294px] w-full h-[32px] border border-[#E3E2E7] rounded-[5px]'>
                            <input placeholder='wingwingwing@gmail.com' className='w-full h-full text-[12px] indent-4'></input>
                        </div>
                        <span className='font-medium text-[14px] mt-[13px]'>Пароль</span>
                        <div className='max-w-[294px] w-full h-[32px] border border-[#E3E2E7] rounded-[5px]'>
                            <input type='password' placeholder='Введите свой пароль' className='w-full h-full text-[12px] indent-4'></input>
                        </div>
                        <a className='max-w-[294px] w-full h-[32px] bg-black flex justify-center items-center text-white rounded-[5px] text-[12px] font-medium mt-[13px]' href='/wells/1111' >
                            Войти
                        </a>
                    </div>
                    <div className='flex mt-[115px]'>
                        <span className='text-[14px] font-normal text-[#ABABAB] '>Нету аккаунта?</span>
                        <span className='text-[14px] font-normal text-[#B591EF] ml-[2px]'>Регистрация</span>
                    </div>
                </div>
                <div className='max-w-[353px] w-full h-[547px] bg-[#3F3F3F] flex rounded-[19px] mr-[20px]'>
                    <ModelVishka/>
                </div>
            </div>
        </div>
    )
}

export default page