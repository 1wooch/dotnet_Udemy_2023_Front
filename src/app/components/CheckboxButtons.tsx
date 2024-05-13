import { FormControl, RadioGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props{
    items: string[];
    checked?: string [] ;
    onChange: (item:string[])=>void;
}

export default function CheckBoxButtons({items,checked,onChange}:Props){
    const [ checkedItems,setCheckedItems] = useState(checked ||[])

    function handleChecked(value:string){
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked :string[] =[];
        if(currentIndex === -1){
            newChecked = [...checkedItems,value];
        }else{
            newChecked = checkedItems.filter(item => item !== value);
        }

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return(
        <FormControl component="fieldset">
                    <RadioGroup>
                        {items.map(item => (
                            <FormControlLabel key={item} value={item} control={<Checkbox 
                                checked={checkedItems.indexOf(item) !==-1}
                                onClick={()=>handleChecked(item)}
                            />} label={item}/>
                        ))}
                    </RadioGroup>
                </FormControl>
    )
}