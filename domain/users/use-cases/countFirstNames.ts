import { IUserRepository } from "../repository/IUserRepository";

export const countFirstNames = async (userRepository:IUserRepository) => {
    const users = await userRepository.list()
    return users.reduce( (frequencies:Array<{name:string, occurences:number}>, user) => {
        const frequency = frequencies.find(f => f.name === user.name)
        if (frequency) {
            frequency.occurences+=1
            return frequencies
        } else {
            return [...frequencies, {name:user.name, occurences:1}]
        }
    }, [])
}