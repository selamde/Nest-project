

import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';


const prisma = new PrismaService()

async function main(){
    const hashedPassword = await bcrypt.hash('admin123', 10);


   const admin= await prisma.admin.upsert({
        where: {email:"admin@gmail.com"},
        update:{},
        create:{
            name:"admin",
            email:"admin@gmail.com",
            password: hashedPassword
        }

    
    }

);

console.log(admin)
console.log("Data seeded successfully!")



}
//call the function
    main()
    .catch((e)=>{
        console.log(e)
        process.exit(1)
    })
    .finally(async ()=>{
        prisma.$disconnect();
    })