import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../enum/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export const Auth = (role: Role) =>{
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard))
}