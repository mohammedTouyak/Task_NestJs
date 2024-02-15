import { PaginatedDto } from "src/DTO/pagination.dto";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "src/user/DTO/CreayeUser.dto";

export interface UserRepository{
    findAll(page: number , limit: number):Promise<PaginatedDto<User>>;
}