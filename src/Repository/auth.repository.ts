import { LoginDto } from "src/DTO/login.dto";


export interface auth {
    login(loginDto: LoginDto): Promise<{ token: string }> ;
}