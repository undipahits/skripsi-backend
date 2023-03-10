import { PrismaClient } from '@prisma/client'
import config from './config/config'
import passwordService from './services/password.service'
import * as permissions from './config/permissions'

const prisma = new PrismaClient()

const admins = [
  {
    name: 'Andi Tenri Musharifa, Skm',
    email: 'anditenrimusharifa@gmail.com ',
  },
  {
    name: 'Ramlah Purnama Putri, S.Kom',
    email: 'Putriadzra83@gmail.com ',
  },
]

const fileds = [
  'Sekretariat',
  'Bidang Sumber Daya Kesehatan',
  'Bidang Pelayanan Kesehatan',
  'Bidang Pencegahan dan Pengendalian Penyakit',
  'Bidang Kesehatan Masyarakat',
  'Kelompok Jabatan Fungsional',
]

async function main() {
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'Super Admin' },
    update: { name: 'Super Admin', permissions: JSON.stringify([]) },
    create: { name: 'Super Admin', permissions: JSON.stringify([]) },
  })

  const dataSeperAdmin = {
    name: config.superAdmin.name,
    email: config.superAdmin.email,
    password: await passwordService.hash(config.superAdmin.password),
    roleId: superAdminRole.id,
  }
  await prisma.user.upsert({
    where: { email: config.superAdmin.email },
    update: dataSeperAdmin,
    create: dataSeperAdmin,
  })

  const adminRole = await prisma.role.upsert({
    where: { name: 'Administrator' },
    update: { name: 'Administrator', permissions: JSON.stringify(Object.values(permissions)) },
    create: { name: 'Administrator', permissions: JSON.stringify(Object.values(permissions)) },
  })

  await prisma.role.upsert({
    where: { name: 'User' },
    update: { name: 'User', permissions: JSON.stringify([]) },
    create: { name: 'User', permissions: JSON.stringify([]) },
  })

  for (let name of fileds) {
    await prisma.field.upsert({
      where: { name },
      create: { name },
      update: { name },
    })
  }

  for (let i of admins) {
    let data = {
      name: i.name,
      email: i.email,
      password: await passwordService.hash(i.email),
      roleId: adminRole.id,
      fieldId: 1,
    }
    await prisma.user.upsert({
      where: { email: i.email },
      create: data,
      update: data,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
