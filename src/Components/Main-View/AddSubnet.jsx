import React, {useState, useEffect} from "react";
import { db } from '../../db';

function AddSubnet() {

    const [newSubnet, setNewSubnet] = useState({
        collection: '',
        subnet: '',
        vlan: '',
        vrf: '',
        gw: '',
        location: '',
        state: '',
    });

    function handleChange(e) {
        const { value } = e.target;
        setNewSubnet({
            ...newSubnet,
            [e.target.name]: value
        });
    }



    // async function addFriend() {
    //     try {
    //         await db.subnet.add({
    //             "collection" : "17-34",
    //             "name": "testname2",
    //             "subnet": "testsubnet2",
    //             "vlan": "testvlan2",
    //             "vrf": "testvrf2",
    //             "gw": "testgws2",
    //             "location": "testlocations2",
    //             "state": "0"
    //         });
    //     } catch (error) {
    //     }
    // }

    return (
        <>
            <div className="flex flex-row w-full bg-cookie-brown text-cookie-white h-10 items-center ">
                <p className="px-5">Add Subnet</p>
                </div>
                <div className='p-5'/>
                <div className="h-full w-[90%] border rounded-t-lg border-cookie-brown py-10">
                    <form className="w-full w-3/4 ml-[10%]">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Name
                                </label>
                                <input type="text" className="appearance-none block w-full py-3 px-4 mb-3 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='name' />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Subnet
                                </label>
                                <input type="text" className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='subnet'/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 w-1/2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    VLAN
                                </label>
                                <input type="text" className="appearance-none block w-full py-3 px-4 mb-3 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                                value={newSubnet.name} onChange={handleChange} name='vlan'/>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Gateway
                                </label>
                                <input type="text" className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='gateway'/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Status?
                                </label>
                                <input className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='status' type="text"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Fields
                            </label>
                            <input className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='fields' type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    VRF
                                </label>
                                <input className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='gateway' type="vrf"/>
                            </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                    Location
                                </label>
                                <input className="appearance-none block w-full py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                            value={newSubnet.name} onChange={handleChange} name='location' type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-4 w-full justify-center">
                            <button type='button' className='text-white bg-cookie-dull/20 font-normal rounded-md text-sm w-[20%] p-3 mt-6 mr-6 text-cookie-brown hover:bg-cookie-hazel hover:border-cookie-brown'>Cancel</button>
                            <button type='button' className='bg-cookie-brown font-normal rounded-md text-sm w-[20%] p-3 mt-6 text-cookie-white hover:bg-cookie-hazel'>Save Subnet</button>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default AddSubnet