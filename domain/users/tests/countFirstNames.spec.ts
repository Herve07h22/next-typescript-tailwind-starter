import { IUserRepository } from "../repository/IUserRepository"
import { countFirstNames } from "../use-cases/countFirstNames"
import { UserRepositoryTest } from "./UserRepositoryTest"

var userRepository:IUserRepository

beforeEach(()=> {
    userRepository = new UserRepositoryTest()
})

it("Return an empty array if no user", async () => {
    const userRepositoryWithNoUser = new UserRepositoryTest(true)
    const frequencies = await countFirstNames(userRepositoryWithNoUser)
    expect(frequencies).toEqual([])
})

it("Calculates the right nb of elements", async () => {
    const frequencies = await countFirstNames(userRepository)
    expect(frequencies).toHaveLength(4)
})

it("Calculates the correct frequency for Bob", async () => {
    const frequencies = await countFirstNames(userRepository)
    const bob = frequencies.find(f => f.name === 'Bob')
    expect(bob?.occurences).toEqual(2)
})

it("Calculates the correct frequency for Caroline", async () => {
    const frequencies = await countFirstNames(userRepository)
    const bob = frequencies.find(f => f.name === 'Caroline')
    expect(bob?.occurences).toEqual(1)
})