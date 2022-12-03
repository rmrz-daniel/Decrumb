import { liveQuery } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState} from "react";
import { db } from "../../db";
import Cookie from './Cookie.png';
import Monster from './Cookie_Monster.webp';


const initialState = {
    Username: '',
    Password: '',
    ConfirmPassword: ''
  };

const sanitizationSearch = /[\W\s]/i;


function Login({setLoginStatus}) {

    const [signup, setActive] = useState(true);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    
    const [user, setUser] = useState(initialState);

    function handleChange(e) {
        const { value } = e.target;
        setUser({
            ...user,
            [e.target.name]: value
        });
    };


    //debug
    // function passwordSecure() {

    //     //Salting & Hash
    //     const salt = Math.floor(100000 + Math.random() * 900000).toString();
    //     const encryption = CryptoJS.AES.encrypt(user.Password, salt);
    //     alert('hello')
    
    //     return encryption;
    // }


    async function handleSignup() {

        try {
            
            //Security against JSON attack & Checking new usernames at Signup
            if(user.Username.search(sanitizationSearch) != -1 || user.Password.search(sanitizationSearch) != -1 || user.ConfirmPassword.search(sanitizationSearch) != -1 ) { 
                
                alert('Try a different input.');
                throw "exit";
            } 

            //debug
            //Checking for uniqueness of username
            // const userQuery = await db.useraccount.where("username").equalsIgnoreCase(user.Username).first();
            // if(userQuery !== null || userQuery !== undefined) {

            //     alert('That username already exists.');
            //     throw "exit";
            // }


            //Persist the new account
            const salt = Math.floor(100000 + Math.random() * 900000);
            if(user.Password === user.ConfirmPassword){  
                await db.useraccount.add({
                    username: user.Username,
                    password: user.Password + salt,
                    salt: salt.toString()
                    });
                setUser(initialState);
                setSuccess(success => !success);
                setActive(signup => !signup);
            } else {
                setFailed(failed => !failed);
            }

            } catch (e) {
            }


        //debug
        //Persist the account with Encrypted Password
        // const encryption = passwordSecure();
        // await db.useraccount.add({
        //     username: user.Username,
        //     password: encryption.key.toString(),
        //     salt: encryption.salt.toString()
        // });
    }



    async function checkLogin() {

        try {
            
            //Security against JSON attack at Login
            if(user.Username.search(sanitizationSearch) != -1 || user.Password.search(sanitizationSearch) != -1) { 
                
                alert('Try a different input.')
                throw "exit";
            } 

            //Login Validation
            const userQuery = await db.useraccount.where("username").equalsIgnoreCase(user.Username).first();
            const passwordCheck = userQuery.password.substr(0, userQuery.password.length -userQuery.salt.length)
            if(user.Username === userQuery.username && user.Password === passwordCheck) {

                //Ramirez here
                setLoginStatus(true);
            }

        } catch (e) {
        }


        //debug
        // try {
           
        //     const userQuery = await db.useraccount.where("username").equalsIgnoreCase(user.Username).first();
        //     const decryptedPassword = CryptoJS.AES.decrypt(userQuery.password, userQuery.salt);
        //     if(userQuery === null || userQuery === undefined) {

        //         alert('That username does not exist.')
        //         console.log('Invalid login attempt: Incorrect Username')
        //         throw "exit";
        //     } else if (userQuery.password !== decryptedPassword) {

        //         alert('The password is incorrect.')
        //         console.log('Invalid login attempt: Incorrect Password')
        //         throw "exit";
        //     }
        // } catch (error) {
        // }
        
    }


    return (
        
        <div className='bg-cookie-white'>
            {
            success && <div class="absolute top-0 w-full z-10 bg-green-100 rounded-lg py-5 px-6 text-green-700 text-center">
                Signup was successfull <span className="absolute left-[98%] select-none cursor-pointer text-green-800" onClick={() => {setSuccess(success => !success)}}>X</span>
            </div>
            }
            {
            failed && <div class="absolute top-0 w-full z-10 bg-red-100 rounded-lg py-5 px-6 text-red-700 text-center">
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
                        <h1 className=' text-cookie-brown font-bold w-1/2 text-3xl p-20 hidden 2xl:block'>“Something cool here a quote from one of us or something” - C Monster</h1>
                        <img src={Cookie} className=" absolute -bottom-96 -right-96"></img>
                        {/* <img src={Monster} className="w-[65%] absolute -bottom-80 -left-46"></img> */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login