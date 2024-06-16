import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { passwordGenerated } from 'src/utils/passwordGenerator';
import { sendEmailClient } from 'src/utils/sendMail';
import { generateHash } from 'src/utils/handleBcrypt';
import { configDotenv } from 'dotenv';
configDotenv()

const { SMTP_EMAIL, PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION } = process.env;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
 
  async create(createUserDto: CreateUserDto) {
    const existEmail = await this.userRepository.findOneBy({ email: createUserDto.email });
    if(existEmail) throw new BadRequestException("Email Already Exist");

    let password = passwordGenerated();
    console.log(password)
    const hashedPassword = await generateHash(password);

    sendEmailClient(SMTP_EMAIL, +PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION, createUserDto.email , password);

    return await this.userRepository.save({...createUserDto, password: hashedPassword});
  }
  
  async findOneByEmail(email: string) {
    const findEmail = await this.userRepository.findOneBy({ email });
    if(!findEmail) throw new NotFoundException("User Not Found");
    return findEmail;
  }
  async findAll() {
    const userList = await this.userRepository.find();
    if(!userList || userList.length === 0) throw new NotFoundException("Users Not Found");
    return userList;
  }

  async findOne(id: string) {
    const exist = await this.userRepository.findOne({where:{ user_id:id } });
    if(!exist) throw new NotFoundException(`User with id ${id} Not Found`);
    return exist;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = this.findOne(id)
    const updatedUser = this.userRepository.save({...userFound,...updateUserDto });
    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
