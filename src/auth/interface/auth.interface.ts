import { Request } from "express";

interface RequestWhitUser extends Request{
  user: {user_id: string, email: string, username: string, role:string }
}

export default RequestWhitUser;