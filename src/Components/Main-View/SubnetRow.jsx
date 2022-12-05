import React, { useState, useEffect, useRef } from "react";
import { db } from "../../db";
import classNames from "classnames";


function SubnetRow(props) {

	const [edit, setEdit] = useState(true)
  	const [updatedJson, setupdatedJson] = useState(props.subnet);

    function handleChange(e) {
        const { value } = e.target;
        setupdatedJson({
            ...updatedJson,
            [e.target.name]: value
        });
    };

    function handleUpdate() {

    	db.subnet
    	.update(props.subnet.id,{
    		gw: updatedJson.gw,
    		location: updatedJson.location,
    		name: updatedJson.name,
    		subnet: updatedJson.subnet,
    		vlan: updatedJson.vlan,
    		vrf: updatedJson.vrf
    	});

    	props.setFlag(current => !current);
    };


    function handleDelete() {

    	db.subnet
    	.delete(props.subnet.id);

    	props.setFlag(current => !current);
    };

    function ping(){
        fetch(`http://localhost:8080/priv-ping-api/6f95caf8-a4b3-4be8-9b3e-1b567fd32bcf@${props.subnet.subnet}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
    }

    return ( 
    	<>
    		{
		    	edit
		    	?
			        <tr key={props.subnet.id}>
				        <td>{props.subnet.name}</td>
				        <td>{props.subnet.subnet}</td>
				        <td>{props.subnet.vlan}</td>
				        <td>{props.subnet.vrf}</td>
				        <td>{props.subnet.gw}</td>
				        <td>{props.subnet.location}</td>
				        <td>
				        	<div className="flex items-center justify-center">
				        		<div className={classNames("rounded-full w-4 h-4", {"bg-orange-300":props.subnet.state == -1, "bg-red-300":props.subnet.state == 0, "bg-green-400":props.subnet.state==1} )}/>
				        	</div>
				        </td>
				        <td>N/A</td>
				        <td>
				            <span className="group">
				                 <button type='button' className='border-2 border-cookie-hazel/60 rounded-full px-1 py-1 mr-2 group-hover:bg-cookie-hazel' onClick={() => { setEdit(current => !current);}}>
				                    <svg className="fill-cookie-hazel w-5 group-hover:fill-cookie-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z" fill-rule="nonzero"/></svg>
				                </button>
				            </span>
				            <span className="group">
				                <button type='button' className='border-2 border-cookie-hazel/60 rounded-full px-1 py-1 group-hover:bg-cookie-hazel' onClick={ping}>
				                    <svg className="fill-cookie-hazel group-hover:fill-cookie-white w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.043 19.496l-1.482 1.505c-2.791-2.201-4.561-5.413-4.561-9.001s1.77-6.8 4.561-9l1.482 1.504c-2.326 1.835-3.804 4.512-3.804 7.496s1.478 5.661 3.804 7.496zm.675-7.496c0-1.791.887-3.397 2.282-4.498l-1.481-1.502c-1.86 1.467-3.04 3.608-3.04 6s1.18 4.533 3.04 6l1.481-1.502c-1.396-1.101-2.282-2.707-2.282-4.498zm15.043 0c0-2.984-1.478-5.661-3.804-7.496l1.482-1.504c2.791 2.2 4.561 5.412 4.561 9s-1.77 6.8-4.561 9.001l-1.482-1.505c2.326-1.835 3.804-4.512 3.804-7.496zm-6.761 4.498l1.481 1.502c1.86-1.467 3.04-3.608 3.04-6s-1.18-4.533-3.04-6l-1.481 1.502c1.396 1.101 2.282 2.707 2.282 4.498s-.886 3.397-2.282 4.498zm-3-7.498c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3z"/></svg>
				                </button>
				            </span>
				        </td>
					</tr>
				:
			        <tr key={props.subnet.id}>
				        <td>
			        		<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.name} onChange={handleChange} name='name'/>
                        </td>
				        <td>
			        		<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.subnet} onChange={handleChange} name='subnet'/>
				        </td>
				        <td>
		        			<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.vlan} onChange={handleChange} name='vlan'/>
				        </td>
				        <td>
			        		<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.vrf} onChange={handleChange} name='vrf'/>
				        </td>
				        <td>
			        		<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.gw} onChange={handleChange} name='gw'/>
				        </td>
				        <td>
			        		<input type='text' className='w-32 rounded-sm border-[1px] bg-cookie-dull/20 border-cookie-brown hover:bg-cookie-white hover:border-cookie-hazel bg-cookie-white focus:border-cookie-hazel focus:bg-cookie-white focus:outline-none'
                            value={updatedJson.location} onChange={handleChange} name='location'/>
				        </td>
				        <td>
							{props.subnet.state}
				        </td>
				        <td>N/A</td>
				        <td>
				            <span className="group" >
				                 <button type='button' className='border-2 border-green-400 rounded-full px-1 py-1 mr-2 group-hover:bg-green-400 group-hover:border-green-400'  onClick={() => { setEdit(current => !current); handleUpdate()}}>
									<svg className="fill-green-400 group-hover:fill-cookie-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
				                </button>
				            </span>
				            <span className="group">
				                <button type='button' className='border-2 border-red-400 rounded-full px-1 py-1 group-hover:bg-red-400 group-hover:border-red-400' onClick={() => {handleDelete(); setEdit(current => !current) } } >
				                	<svg className="fill-red-400 group-hover:fill-cookie-white w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"/></svg>

				                </button>
				            </span>
				        </td>
					</tr>
			}
        </>
    )
}

export default SubnetRow