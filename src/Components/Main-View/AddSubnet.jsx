import React, {useState, useEffect} from "react";
import { db } from '../../db';

function AddSubnet({ setActiveAdd }) {

    const [newSubnet, setNewSubnet] = useState({
        collection: '',
        name: '',
        subnet: '',
        vlan: '',
        vrf: '',
        gw: '',
        location: '',
        state: '0',
    });

    function handleChange(e) {
        const { value } = e.target;
        setNewSubnet({
            ...newSubnet,
            [e.target.name]: value
        });
    }



    async function addNewSubnet() {

        console.log(newSubnet)
        try {
            await db.subnet.add({
                "collection" : newSubnet.collection,
                "name": newSubnet.name,
                "subnet": newSubnet.subnet,
                "vlan": newSubnet.vlan,
                "vrf": newSubnet.vrf,
                "gw": newSubnet.gw,
                "location": newSubnet.location,
                "state": newSubnet.state
            });
        } catch (error) {
        }
    }

    return (
        <>
            <div className='p-5'/>
            <div className="h-full w-[90%] border rounded-t-lg border-cookie-brown py-10">
                <form className="w-full w-3/4 ml-[10%]">

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Name
                            </label>
                            <input type="text" className="appearance-none block w-full md:h-10 py-3 px-4 mb-3 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                                value={newSubnet.name} onChange={handleChange} name='name' />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Subnet
                            </label>
                            <input type="text" className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                                value={newSubnet.subnet} onChange={handleChange} name='subnet'/>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 w-1/2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                VLAN
                            </label>
                            <input type="text" className="appearance-none block w-full md:h-10 py-3 px-4 mb-3 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                                value={newSubnet.vlan} onChange={handleChange} name='vlan'/>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Gateway
                            </label>
                            <input type="text" className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                                value={newSubnet.gw} onChange={handleChange} name='gw'/>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Status?
                            </label>
                            <input className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                        value={newSubnet.state} onChange={handleChange} name='state' type="text"/>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Field
                        </label>
                        <input className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                        value={newSubnet.collection} onChange={handleChange} name='collection' type="text"/>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                VRF
                            </label>
                            <input className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                        value={newSubnet.vrf} onChange={handleChange} name='vrf' type="vrf"/>
                        </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Location
                            </label>
                            <input className="appearance-none block w-full md:h-10 py-3 px-4 rounded-sm border-2 bg-cookie-dull/20 border-cookie-hazel hover:bg-cookie-white focus:border-cookie-brown/50 focus:bg-cookie-white focus:outline-none"
                        value={newSubnet.location} onChange={handleChange} name='location' type="text"/>
                        </div>
                    </div>

                    <div className="flex flex-wrap mt-4 w-full justify-center">
                        <button type='button' className='text-white bg-cookie-dull/20 font-normal rounded-md text-sm w-[20%] p-3 mt-6 mr-6 text-cookie-brown hover:bg-cookie-hazel hover:border-cookie-brown' 
                        onClick={() => {setActiveAdd(false)}}>Cancel</button>
                        <button type='button' className='bg-cookie-brown font-normal rounded-md text-sm w-[20%] p-3 mt-6 text-cookie-white hover:bg-cookie-hazel' onClick={addNewSubnet}>Save Subnet</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddSubnet