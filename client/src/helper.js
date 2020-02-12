

export const posToObj = (position)=>{
    let regex = /(\w)(\d)(\w?)/
    let positions = position.match(regex)
    let row = positions[1].charCodeAt(0) - 96
    return ({'row':row,'col':Number(positions[2])-1,'orr':positions[3].toLowerCase()})
}

export const objToPos =(obj)=>{
    let r = String.fromCharCode(96 + Number(obj.row)),
        c = obj.col+1,
        o = obj.orr;
    return (r+''+c+''+o)
}

export const arrToPos =(arr)=>{
    console.log(arr)
    let row = String.fromCharCode(96 + Number(arr[0]))
    let col = Number(arr[1])
    let result = row+''+col
    console.log(result)
    return result

}

// export const arrToPos = (arr)=>{
//     let regex = /(\d)(\d)(\w?)/
//     let arrs = arr.match(regex)
//     let row = String.fromCharCode(97 + arrs[1])
//     return (row+''+(Number(arrs[2])+1)+arrs[3])
// }
