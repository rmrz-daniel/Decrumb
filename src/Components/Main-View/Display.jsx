import React, {useState, useEffect} from "react";
import NavWindow from "../Side-View/NavWindow";
import DisplaySubnet from "./DisplaySubnet";
import DisplayColl from "./DisplayColl";
import AddSubnet from "./AddSubnet";

function Display({setLoginStatus}) {

    const [col, setCol] = useState();
    const [add, setActiveAdd] = useState(false);
    const [tabs, setTabs] = useState([]);

    useEffect(() =>{
        if(col !== undefined && !tabs.includes(col)){
            setTabs(oldArray => [...oldArray, col]);
        }
    },[col]);

    function handleTabs(e) {
        setTabs(tabs.filter(tab => tab !== e));
        setCol(undefined)
    }
    

    return (
        <div className='bg-cookie-white'>
            <div className='flex flex-row h-screen '>
                <div className='flex lg:w-[20%] md:w-[25%]'>
                    <NavWindow setCol = {setCol} setActiveAdd = {setActiveAdd} setLoginStatus = {setLoginStatus}/>
                </div>
                <div className="w-[1px] h-screen bg-cookie-brown"></div>

                <div className='flex flex-col items-center w-full overflow-hidden'>
                <div className="flex flex-row w-full bg-cookie-brown text-cookie-white h-10 items-center py-5">
                    {
                        tabs.map(
                            function (res) {
                                return (
                                    <div className="flex flex-row items-center justify-center gap-4 border-r-[1px] border-cookie-hazel/50 px-3 h-10 hover:bg-cookie-hazel/30">
                                        <p className="select-none cursor-pointer hover:text-cookie-hazel" onClick={() => {setCol(res); setActiveAdd(false);} }>
                                            {res}
                                        </p>
                                        <svg onClick={() => {handleTabs(res)}}className="h-4 fill-cookie-white/70 hover:fill-cookie-hazel cursor-pointer"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                                    </div>
                                )
                            }
                        )   
                    }
                </div>
                    {
                    add !== true 
                    ?
                        col !== undefined
                        ? <DisplaySubnet col={col}/>
                        : <DisplayColl col={col} setCol = {setCol}/>
                    :
                        <AddSubnet setActiveAdd = {setActiveAdd}/>
                    }

                    
                </div>
            </div>
        </div>
    );

}

export default Display;