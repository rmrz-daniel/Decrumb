import logo from './logo.png'
import React, { useState, useEffect } from "react";
import { db } from '../../db';
import { useLiveQuery } from "dexie-react-hooks";
function NavWindow({ setCol, setActiveAdd, setLoginStatus }) {

    const collections = useLiveQuery(() => db.subnet
        .orderBy('collection')
        .uniqueKeys()
    );

    return (
        <div className='flex flex-col w-full hidden lg:flex md:flex pt-6'>
            <div className='flex flex-row w-full h-[10%] items-center justify-center pl-4 srink-0'>
                <div className='flex flex-col font-black w-[80%] text-cookie-hazel lg:text-[200%] md:text-2xl select-none mt-5 py-2'>
                    <p>Cookie </p>
                    <p>Decrumbler</p>
                </div>
                <img src={logo} className="lg:w-1/3 md:w-1/3 shrink-0 lg:block pr-5 pb-5 mt-5"></img>
            </div>
            <div className='w-full bg-cookie-brown hover:bg-cookie-hazel select-none cursor-pointer mt-10 h-8'>
                <h1 className='text-center font-light text-cookie-white pt-1' onClick={() => {setCol(undefined); setActiveAdd(false)}} >View Subnets</h1>
            </div>
            <div className='h-[65%] overflow-hidden'>
                {
                collections?.map(
                    function (res) {
                        return (
                            <div className='flex flex-row group select-none cursor-pointer'>
                                <div className='px-3 group-hover:bg-cookie-hazel'/>
                                <svg className='w-5 fill-cookie-brown group-hover:fill-cookie-white group-hover:bg-cookie-hazel' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                                <div key={res} className='w-full group-hover:bg-cookie-hazel text-cookie-brown group-hover:text-cookie-white' onClick={() => {setCol(res); setActiveAdd(false) } }>{res}</div>
                            </div>
                        )
                    }
                )
                }
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row w-full justify-center gap-x-2 group select-none cursor-pointer' onClick={() => setActiveAdd(true)}>
                    <svg className='w-5 group-hover:fill-cookie-hazel fill-cookie-brown' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                    <p className='group-hover:text-cookie-hazel text-cookie-brown'>Add Subnet</p>
                </div>
                <div className='p-3'/>
                <button type='button' className='text-white bg-cookie-brown font-medium text-2xl w-full text-center text-cookie-dull h-10 hover:bg-cookie-hazel' onClick={() => {setLoginStatus(false)} }>Logout</button>
            </div>

            

        </div>
    )
}

export default NavWindow