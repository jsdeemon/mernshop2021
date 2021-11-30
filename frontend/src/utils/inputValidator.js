export function inputValidator(name, text, maxLength, className) {
    if (text.length === 0) {
        return ''
    } else if (text.length <= maxLength) {
        return <span className={className}>{name} should be more than {maxLength}</span>
    } else {
        return ''
    }
}

export function comparePasswords(pass1, pass2, className) {
    if (pass1 !== pass2) {
        return <span className={className}>Passowords not match!</span>
    }
}

// export function disableButtonValidator(obj) {
//     let res = []
//     let keys = Object.keys(obj) 
//     let values = Object.values(obj)
//     for (let i = 0; i < keys.length; i++) {
//        // res.push((keys[i].length <= values[i]))
//        if (keys[i].length <= values[i]) {
//            console.log(keys[1])
//         res.push(true) 
//     } else {
//         res.push(false)
//     }
//     }
//     // console.log(res);
//     // checking
//     if(!res) {
//         return true
//     }
//     if (res.includes(false)) {
//         return true
//     } else {
//         return false 
//     }
// }

// export function isFalse(() => disableButtonValidator(obj)) {
//     if (arr.includes(false)) {
//         return false
//     } else {
//         return true
//     }
// }

// function ifValueIs(text, val) {
//     if ( text.length <= val) {
//         return disabled 
//     }
// }