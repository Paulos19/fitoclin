const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({ select: { id: true, name: true, role: true } });
    const schedules = await prisma.doctorSchedule.findMany({});
    const appointments = await prisma.appointment.findMany({});
    console.log("USERS:", JSON.stringify(users, null, 2));
    console.log("SCHEDULES:", JSON.stringify(schedules, null, 2));
    console.log("APPOINTMENTS:", JSON.stringify(appointments, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
