

interface AbstractUser {
    id?:string
    name?:string
    address?:string
}
interface AbstractUserNumbers {
    id?:string
    numbers?: string[]
}

export {AbstractUserNumbers, AbstractUser}