export function RemoveElementFromObjectArray(key: string , objectArray:any):any {
    objectArray.forEach((value,index)=>{
        if(value.id==key) objectArray.splice(index,1);
        return objectArray
    });
} 