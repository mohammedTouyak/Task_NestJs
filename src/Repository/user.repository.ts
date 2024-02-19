import { PaginatedDto } from "src/DTO/pagination.dto";
import { UserTache } from "src/DTO/userTache.dto";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "src/user/DTO/CreayeUser.dto";

export interface UserRepository{
    findAll(page: number , limit: number):Promise<PaginatedDto<User>>;
    findTachesUser(id : string) : Promise<UserTache>;
}