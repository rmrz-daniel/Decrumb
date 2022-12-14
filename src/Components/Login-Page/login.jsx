import { liveQuery } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState, useEffect} from "react";
import { db } from "../../db";
import { JSHash, JSHmac, CONSTANTS } from "react-hash";

import Cookie from './Cookie.png';
import Monster from './Cookie_Monster.webp';

const initialState = {
    Username: '',
    Password: '',
    ConfirmPassword: ''
  };


function Login({setLoginStatus}) {

    const [signup, setActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    
    const [user, setUser] = useState(initialState);
    const [dbUser, setDBUser] = useState({
        username: "",
        password: "",
        salt: "",
    });
    const [userCount, setUserCount] = useState(0);

    function handleChange(e) {
        const { value } = e.target;
        setUser({
            ...user,
            [e.target.name]: value
        });
    };

    useEffect(() =>{
        db.user
        .where('username')
        .equals(user.Username)
        .first(function(data){
            setDBUser(data)
        })

        db.user.count(function(data){
            setUserCount(data)
        })
    },[user])

    async function handleSignup() {
        console.log(userCount)
        if(userCount < 1){
            const salt = Math.floor(100000 + Math.random() * 900000);

            if(user.Password === user.ConfirmPassword){
                JSHash(user.Password + salt, CONSTANTS.HashAlgorithms.sha256)
                .then(hash =>{
                    db.user.add(
                    {
                    username: user.Username,
                    password: hash,
                    salt: salt.toString()
                    });
                })  


                setUser(initialState);
                setSuccess(success => !success);
                setActive(signup => !signup);
            } else {
                setFailed(failed => !failed);
            }
        } else {
            setFailed(failed => !failed);
        }
    }

    async function checkLogin() {
        JSHash(user.Password + dbUser.salt, CONSTANTS.HashAlgorithms.sha256)
            .then(hash =>{
                if(hash === dbUser.password){
                    setLoginStatus(true);
                } else {
                    setFailed(true);
                }
            })  
    }


    return (
        
        <div className='bg-cookie-white'>
            {
            success && <div className="absolute top-0 w-full z-10 bg-green-100 rounded-lg py-5 px-6 text-green-700 text-center">
                Signup was successful <span className="absolute left-[98%] select-none cursor-pointer text-green-800" onClick={() => {setSuccess(success => !success)}}>X</span>
            </div>
            }
            {
            failed && <div className="absolute top-0 w-full z-10 bg-red-100 rounded-lg py-5 px-6 text-red-700 text-center">
                Something went wrong!<span className="absolute left-[98%] select-none cursor-pointer text-red-800" onClick={() => {setFailed(failed => !failed)}}>X</span>
            </div>
            }

            <div className='flex flex-col md:flex-row h-screen items-center'>
                <div className='flex items-center justify-center w-full md:w-1/2 xl:w-1/3 md:mx-auto px-6 lg:px-16 xl:px-12'>
                {
                    signup
                    ?
                    // If the signup is true then this is displayed
                    <div className='w-4/5 h-100'>
                        <div className='font-bold text-3xl text-black '>Sign Up to your
                            <div className='inline-block pl-4 text-cookie-hazel text-left'>
                                <h1>Cookie</h1>
                                <h1>Decrumbler</h1>
                            </div>
                        </div>
                        <h2 className='mt-6 font-medium text-lg'>Something inspirational inserted here to motivate you to work!</h2>
                        <div className='mt-10'>
                            <div>
                                <label className='block pl-1 text-xl'>Username</label>
                                <input type='text' className='px-4 py-3 mt-2 w-full rounded-sm border-2 bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                                value={user.Username} onChange={handleChange} name='Username'/>
                            </div>

                            <div className='mt-4'>
                                <label className='block pl-1 text-xl'>Password</label>
                                <input type='password' className='px-4 py-3 mt-2 w-full rounded-sm border-2 bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none.'
                                value={user.Password} onChange={handleChange} name='Password'/>
                            </div>
                            <div className='mt-4'>
                                <label className='block pl-1 text-xl'>Confirm Password</label>
                                <input type='password' className='px-4 py-3 mt-2 w-full rounded-sm border-2 bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none.'
                                value={user.ConfirmPassword} onChange={handleChange} name='ConfirmPassword'/>
                            </div>
                            <div className="pt-3"/>
                            <h1 className="font-semibold text-lg text-right">Returning user? <span className="text-cookie-hazel select-none cursor-pointer hover:text-cookie-hazel/70"
                            onClick={() => {setActive(signup => !signup)}}>Login.</span></h1>
                            <div className='pt-16'>
                                <button type='button' className='text-white bg-cookie-brown font-medium rounded-md text-2xl w-full p-3 mt-5 text-cookie-dull'
                                onClick={handleSignup}>Signup</button>
                            </div>
                        </div>
                    </div>
                    :
                    // this will display by default as signup is defaulted to false //JO sets it to true first
                    <div className='w-4/5 h-100'>
                        <div className='font-bold text-3xl text-black '>Welcome to your
                            <div className='inline-block pl-4 text-2xl text-cookie-hazel text-left'>
                                <h1>Cookie</h1>
                                <h1>Decrumbler</h1>
                            </div>
                        </div>
                        <h2 className='mt-6 font-medium text-lg'>Something inspirational inserted here to motivate you to work!</h2>
                        <div className='mt-10'>
                            <div>
                                <label className='block pl-1 text-xl'>Username</label>
                                <input type='text' className='px-4 py-3 mt-2 w-full rounded-sm border-2 bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                                value={user.Username} onChange={handleChange} name='Username'/>
                            </div>

                            <div className='mt-4'>
                                <label className='block pl-1 text-xl'>Password</label>
                                <input type='password' className='px-4 py-3 mt-2 w-full rounded-sm border-2 bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none.'
                                value={user.Password} onChange={handleChange} name='Password'/>
                            </div>

                            <h1 className="font-semibold text-lg text-right">New user? <span className="text-cookie-hazel select-none cursor-pointer hover:text-cookie-hazel/70"
                            onClick={() => {setActive(signup => !signup)}}>Signup.</span></h1>
                            
                            <div className='pt-20'>
                                <button type='button' className='text-white bg-cookie-brown font-medium rounded-md text-2xl w-full p-3 mt-5 text-cookie-dull' onClick={checkLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                }
                    
                    
                </div>
                <div className='flex items-center justify-center h-[95%] hidden bg-cookie-dull/20 w-1/2 lg:block xl:w-2/3 m-10 rounded-3xl p-20 bg-blob bg-cover overflow-hidden relative'>
                    {/* <img src={Cookie} className="w-[80%] absolute -bottom-96 -right-96 opacity-75"></img> */}
                    <div className="w-[80%] h-full hidden 2xl:block m-auto rounded-3xl bg-cookie-white/50 shadow-lg backdrop-blur-sm border-2 border-white overflow-hidden" >
                        <h1 className=' text-cookie-brown font-bold w-1/2 text-3xl p-20 hidden 2xl:block'>???Something cool here a quote from one of us or something??? - C Monster</h1>
                        <img src={Cookie} className=" absolute -bottom-96 -right-96"></img>
                        {/* <img src={Monster} className="w-[65%] absolute -bottom-80 -left-46"></img> */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login