

export const posToArr = (position)=>{
    let regex = /(\w)(\d)(\w?)/
    let positions = position.match(regex)
    let row = positions[1].charCodeAt(0) - 96
    return ({'row':row,'col':Number(positions[2])-1,'orr':positions[3]})
}
export const arrToPos = (arr)=>{
    let regex = /(\d)(\d)(\w?)/
    let arrs = arr.match(regex)
    let row = String.fromCharCode(97 + arrs[1])
    return (row+''+(Number(arrs[2])+1)+arrs[3])
}
