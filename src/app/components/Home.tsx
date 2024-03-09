"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import TableContainer from "./table/TableContainer";
import { NameInfo
 } from "@/types/common";
import {columns} from './table/Columns';

const Home = () => {
    const [name, setName] = useState<string>("");
    const [nameData, setNameData] = useState<NameInfo[]>([]);
    const [loading, setloading] = useState<boolean>(false);

    const predictInfo = async()=>{
        setloading(true);
        const [resAge, resGen, resCountry] = await Promise.all([
            fetch(`https://api.agify.io/?name=${name}`),
            fetch(`https://api.genderize.io/?name=${name}`),
            fetch(`https://api.nationalize.io/?name=${name}`),
    ])
        const [predictedAge, predictedGender, predictedCountry] = await Promise.all([resAge.json(), resGen.json(), resCountry.json()]);
        const {age=0, gender='No info', country:countries=[] } = {...predictedAge, ...predictedGender, ...predictedCountry};
        setNameData((prevData)=>[{age, gender,countries, name},...prevData]);
        setloading(false);
    }

    const nameSearched = ()=>{
        if(nameData.find((eachName)=>eachName.name===name)){
            return true;
        }
        return false;
    }
    return (
        <div className="w-full">
            <div className="flex justify-center w-full px-4 sm:px-64">
                <div className="mb-2 w-full">
                    <Input type="name" placeholder="Enter a name" onChange={(e)=>{
                        const filteredChars = e.target.value.replace(/[^A-Za-z]/ig, '');
                        setName(filteredChars)}} value={name}/>
                    {
                        name.length>0 && name.length<3 ? <div className="text-red-500 text-xs p-2">* Enter atleast 3 characters</div> :
                        nameSearched() ? <div className="text-green-800 text-xs p-2">Results available below</div> : <div className="text-gray-600 text-xs p-2">Enter Only alphabets</div>
                    }
                </div>
                <Button className="ml-2" onClick={predictInfo} disabled={name.length===0 || nameSearched() || (name.length>0 && name.length<3)}>Predict</Button>
            </div>
            { loading ?
            <div className="mb-4 sm:px-48 h-64 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Loading...</div>
            :<div className="flex justify-center mt-5 w-full sm:px-48">
                {
                    <TableContainer columns={columns} data={nameData}/>
                }
            </div>
            }
        </div>
    )
}

export default Home