const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const professionals = await prisma.user.findMany({
        where: { role: 'PROFESSIONAL' },
        include: { doctorSchedules: true }
    });

    console.log(`Found ${professionals.length} professionals.`);

    for (const prof of professionals) {
        if (prof.doctorSchedules.length === 0) {
            console.log(`Creating default schedule for Professional ${prof.name} (${prof.id})...`);
            const schedules = [1, 2, 3, 4, 5].map(day => ({
                userId: prof.id,
                dayOfWeek: day,
                startTime: '09:00',
                endTime: '18:00',
                isEnabled: true
            }));
            await prisma.doctorSchedule.createMany({ data: schedules });
        }
    }

    console.log("Done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
