"use client"

import { CountryType, NameInfo } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import More from "../SVGIcons/More"

const getCountryCode = new Intl.DisplayNames("en-US", {
    type:"region"
}) 

export const columns: ColumnDef<NameInfo>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "age",
    header: "AGE",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    accessorKey: "countries",
    header: "COUNTRIES",
    cell: ({ row }) => {
        if(row.original.countries && row.original.countries.length){
            const firstCountryCode = row.original.countries[0].country_id;
            const firstCountryPblty = (row.original.countries[0].probability)*100;  
            return <div className="font-medium">{getCountryCode.of(firstCountryCode)} {firstCountryPblty.toFixed(0)} %</div>
        }
        return <div>Not Found</div>
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const countryData = row.original.countries;
 
      if(row.original.countries && row.original.countries.length>1){
        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <div className="h-4 w-4">
                    <More />
                </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>REST COUNTRIES</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    countryData.map((country:CountryType)=><DropdownMenuItem key={country.country_id}>{getCountryCode.of(country.country_id)} {((country.probability)*100).toFixed(0)} %</DropdownMenuItem>)
                }
            </DropdownMenuContent>
            </DropdownMenu>
        )
      }
    },
  },
]
