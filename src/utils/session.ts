import { getServerSession } from 'next-auth/next';
import authOptions from '@/auth';
import { PrismaClient } from '@prisma/client';
import { User } from "@/interfaces"

const prisma = new PrismaClient();

export const sessionUtils = {
  // Récupère les informations complètes de l'utilisateur connecté

  // Vérifie si l'utilisateur est connecté
  async isConnected(): Promise<boolean> {
    const session = await this.getSession();

    if (!session?.user?.email) {
      return false; // Indicate the user is not connected
    }

    return true; // Indicate the user is connected
  },

  // Vérifie si l'utilisateur est connecté et admin
  async isAdminConnected(): Promise<boolean> {
    const session = await this.getSession();

    if (!session?.user?.email) {
      return false; // Indicate the user is not connected
    }

    const user = await this.getUserFromSession();

    if (!user.isAdmin) {
      return false; // Indicate the user is not an admin
    }

    return true; // Indicate the user is an admin
  },

  async getSession(){
    return(await getServerSession(authOptions));
  },

  async userFromSessionExist(): Promise<boolean>{
    const session = await this.getSession();

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const email:string = session.user.email

    //Check if user exists
    const checkUser = await prisma.user.findUnique(
      {
        where:{
          email:email
        }
      }
    )

    if (checkUser){
      return true;
    }else{
      return false;
    }
  },

  async getUserFromSession(): Promise<User> {
    const session = await this.getSession();

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const email:string = session.user.email

    //Check if user exists
    const checkUser = await prisma.user.findUnique(
      {
        where:{
          email:email
        }
      }
    )

    if (!checkUser){
      throw new Error("User does not exists");
    }

    return checkUser;
  },

  async createUserFromSession({first_name, last_name, phone} : {first_name: string, last_name: string, phone: string | number}): Promise<User>{
    const session = await this.getSession();

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const email: string = session.user.email;

    const newUser = await prisma.user.create(
      {
        data: {
          first_name,
          last_name,
          phone: phone.toString(),
          email,
          isAdmin:false
        }
      }
    );

    return newUser;
  },

  async editAdminUser({id, status} : {id:string, status:boolean}){

    //Check if the user is admin
    const session = await this.getSession();

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const callUser = this.getUserFromSession()

    if (!callUser){
      throw new Error("User is not authenticated");
    }

    if ((await callUser).isAdmin !== true){
      throw new Error("User is not admin");
    }

    const userToUpdate = await prisma.user.findUnique(
      {
        where:{
          id:id
        }
      }
    )

    if (!userToUpdate){
      throw new Error("User unknow");
    }

    await prisma.user.update(
      {
        where:{
          id:id
        },
        data:{
          isAdmin:status
        }
      }
    )
  },

};