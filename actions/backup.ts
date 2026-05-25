"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Lista de campos de data no banco de dados para conversão
const DATE_FIELDS = [
  "createdAt",
  "updatedAt",
  "birthDate",
  "date",
  "validUntil",
  "uploadedAt",
  "expiresAt",
  "issuedAt",
  "consultationDate",
  "stripeCurrentPeriodEnd"
];

// Helper para converter strings de data para objetos Date
function parseDates(record: any) {
  if (!record) return record;
  const parsed = { ...record };
  for (const field of DATE_FIELDS) {
    if (parsed[field] !== undefined && parsed[field] !== null) {
      parsed[field] = new Date(parsed[field]);
    }
  }
  return parsed;
}

// Exportar TODOS os dados do banco de dados em formato JSON
export async function exportAllData() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Não autorizado. Apenas administradores podem exportar dados." };
  }

  try {
    // Consultando todas as tabelas em sequência para evitar sobrecarregar o pool de conexões
    const users = await db.user.findMany();
    const subscriptions = await db.subscription.findMany();
    const patients = await db.patient.findMany();
    const medicalRecords = await db.medicalRecord.findMany();
    const prescriptions = await db.prescription.findMany();
    const notifications = await db.notification.findMany();
    const appointments = await db.appointment.findMany();
    const doctorSchedules = await db.doctorSchedule.findMany();
    const exams = await db.exam.findMany();
    const plans = await db.plan.findMany();
    const siteInfos = await db.siteInfo.findMany();
    const transactions = await db.transaction.findMany();
    const leads = await db.lead.findMany();
    const anamnesis = await db.anamnesis.findMany();
    const weeklyCheckins = await db.weeklyCheckin.findMany();
    const documents = await db.document.findMany();
    const courses = await db.course.findMany();
    const purchases = await db.purchase.findMany();
    const modules = await db.module.findMany();
    const lessons = await db.lesson.findMany();
    const userLessonProgresses = await db.userLessonProgress.findMany();
    const epigeneticAnamneses = await db.epigeneticAnamnesis.findMany();
    const moduleMaterials = await db.moduleMaterial.findMany();
    const mentorships = await db.mentorship.findMany();
    const certificates = await db.certificate.findMany();
    const trialInvites = await db.trialInvite.findMany();
    const quizzes = await db.quiz.findMany();
    const questions = await db.question.findMany();
    const options = await db.option.findMany();

    // Normalizar Decimals para Numbers para serialização limpa no JSON
    const serializedPlans = plans.map(p => ({ ...p, price: Number(p.price) }));
    const serializedCourses = courses.map(c => ({ ...c, price: c.price ? Number(c.price) : 0 }));
    const serializedTransactions = transactions.map(t => ({ ...t, amount: Number(t.amount) }));

    const backupData = {
      users,
      plans: serializedPlans,
      siteInfos,
      mentorships,
      trialInvites,
      courses: serializedCourses,
      patients,
      subscriptions,
      doctorSchedules,
      notifications,
      leads,
      medicalRecords,
      prescriptions,
      exams,
      anamnesis,
      weeklyCheckins,
      documents,
      epigeneticAnamneses,
      appointments,
      transactions: serializedTransactions,
      purchases,
      modules,
      lessons,
      moduleMaterials,
      quizzes,
      questions,
      options,
      userLessonProgresses,
      certificates
    };

    return {
      success: true,
      data: JSON.stringify(backupData, null, 2)
    };
  } catch (error: any) {
    console.error("Erro ao exportar dados:", error);
    return {
      success: false,
      error: `Erro ao gerar backup: ${error.message || "Erro desconhecido"}`
    };
  }
}

// Importar os dados do JSON no banco, ignorando registros idênticos/duplicados
export async function importAllData(jsonData: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Não autorizado. Apenas administradores podem importar dados." };
  }

  try {
    const backup = JSON.parse(jsonData);

    // Contadores de controle
    const summary: Record<string, { imported: number; duplicates: number }> = {};

    // Inicializar resumo para todas as possíveis tabelas
    const tables = [
      "users", "plans", "siteInfos", "mentorships", "trialInvites", "courses",
      "patients", "subscriptions", "doctorSchedules", "notifications", "leads",
      "medicalRecords", "prescriptions", "exams", "anamnesis", "weeklyCheckins",
      "documents", "epigeneticAnamneses", "appointments", "transactions", "purchases",
      "modules", "lessons", "moduleMaterials", "quizzes", "questions", "options",
      "userLessonProgresses", "certificates"
    ];

    for (const table of tables) {
      summary[table] = { imported: 0, duplicates: 0 };
    }

    // --- 1. USER ---
    if (Array.isArray(backup.users)) {
      for (const record of backup.users) {
        const parsed = parseDates(record);
        const exists = await db.user.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { email: parsed.email },
              ...(parsed.stripeCustomerId ? [{ stripeCustomerId: parsed.stripeCustomerId }] : [])
            ]
          }
        });
        if (exists) {
          summary.users.duplicates++;
        } else {
          await db.user.create({ data: parsed });
          summary.users.imported++;
        }
      }
    }

    // --- 2. PLAN ---
    if (Array.isArray(backup.plans)) {
      for (const record of backup.plans) {
        const parsed = parseDates(record);
        const exists = await db.plan.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.plans.duplicates++;
        } else {
          await db.plan.create({ data: parsed });
          summary.plans.imported++;
        }
      }
    }

    // --- 3. SITEINFO ---
    if (Array.isArray(backup.siteInfos)) {
      for (const record of backup.siteInfos) {
        const parsed = parseDates(record);
        const exists = await db.siteInfo.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { key: parsed.key }
            ]
          }
        });
        if (exists) {
          summary.siteInfos.duplicates++;
        } else {
          await db.siteInfo.create({ data: parsed });
          summary.siteInfos.imported++;
        }
      }
    }

    // --- 4. MENTORSHIP ---
    if (Array.isArray(backup.mentorships)) {
      for (const record of backup.mentorships) {
        const parsed = parseDates(record);
        const exists = await db.mentorship.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.mentorships.duplicates++;
        } else {
          await db.mentorship.create({ data: parsed });
          summary.mentorships.imported++;
        }
      }
    }

    // --- 5. TRIALINVITE ---
    if (Array.isArray(backup.trialInvites)) {
      for (const record of backup.trialInvites) {
        const parsed = parseDates(record);
        const exists = await db.trialInvite.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { email: parsed.email },
              { token: parsed.token }
            ]
          }
        });
        if (exists) {
          summary.trialInvites.duplicates++;
        } else {
          await db.trialInvite.create({ data: parsed });
          summary.trialInvites.imported++;
        }
      }
    }

    // --- 6. COURSE ---
    if (Array.isArray(backup.courses)) {
      for (const record of backup.courses) {
        const parsed = parseDates(record);
        const exists = await db.course.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.courses.duplicates++;
        } else {
          await db.course.create({ data: parsed });
          summary.courses.imported++;
        }
      }
    }

    // --- 7. PATIENT ---
    if (Array.isArray(backup.patients)) {
      for (const record of backup.patients) {
        const parsed = parseDates(record);
        const exists = await db.patient.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { userId: parsed.userId }
            ]
          }
        });
        if (exists) {
          summary.patients.duplicates++;
        } else {
          // Garante integridade referencial: só insere se o usuário pai existir
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          const profExists = parsed.professionalId ? await db.user.findUnique({ where: { id: parsed.professionalId } }) : true;
          if (userExists && profExists) {
            await db.patient.create({ data: parsed });
            summary.patients.imported++;
          } else {
            summary.patients.duplicates++; // Descartado devido à falta de integridade
          }
        }
      }
    }

    // --- 8. SUBSCRIPTION ---
    if (Array.isArray(backup.subscriptions)) {
      for (const record of backup.subscriptions) {
        const parsed = parseDates(record);
        const exists = await db.subscription.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { userId: parsed.userId },
              ...(parsed.stripeSubscriptionId ? [{ stripeSubscriptionId: parsed.stripeSubscriptionId }] : []),
              ...(parsed.stripeCustomerId ? [{ stripeCustomerId: parsed.stripeCustomerId }] : [])
            ]
          }
        });
        if (exists) {
          summary.subscriptions.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          if (userExists) {
            await db.subscription.create({ data: parsed });
            summary.subscriptions.imported++;
          } else {
            summary.subscriptions.duplicates++;
          }
        }
      }
    }

    // --- 9. DOCTORSCHEDULE ---
    if (Array.isArray(backup.doctorSchedules)) {
      for (const record of backup.doctorSchedules) {
        const parsed = parseDates(record);
        const exists = await db.doctorSchedule.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              {
                userId: parsed.userId,
                dayOfWeek: parsed.dayOfWeek
              }
            ]
          }
        });
        if (exists) {
          summary.doctorSchedules.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          if (userExists) {
            await db.doctorSchedule.create({ data: parsed });
            summary.doctorSchedules.imported++;
          } else {
            summary.doctorSchedules.duplicates++;
          }
        }
      }
    }

    // --- 10. NOTIFICATION ---
    if (Array.isArray(backup.notifications)) {
      for (const record of backup.notifications) {
        const parsed = parseDates(record);
        const exists = await db.notification.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.notifications.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          if (userExists) {
            await db.notification.create({ data: parsed });
            summary.notifications.imported++;
          } else {
            summary.notifications.duplicates++;
          }
        }
      }
    }

    // --- 11. LEAD ---
    if (Array.isArray(backup.leads)) {
      for (const record of backup.leads) {
        const parsed = parseDates(record);
        const exists = await db.lead.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              ...(parsed.registrationToken ? [{ registrationToken: parsed.registrationToken }] : [])
            ]
          }
        });
        if (exists) {
          summary.leads.duplicates++;
        } else {
          const profExists = parsed.professionalId ? await db.user.findUnique({ where: { id: parsed.professionalId } }) : true;
          if (profExists) {
            await db.lead.create({ data: parsed });
            summary.leads.imported++;
          } else {
            summary.leads.duplicates++;
          }
        }
      }
    }

    // --- 12. MEDICALRECORD ---
    if (Array.isArray(backup.medicalRecords)) {
      for (const record of backup.medicalRecords) {
        const parsed = parseDates(record);
        const exists = await db.medicalRecord.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.medicalRecords.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.medicalRecord.create({ data: parsed });
            summary.medicalRecords.imported++;
          } else {
            summary.medicalRecords.duplicates++;
          }
        }
      }
    }

    // --- 13. PRESCRIPTION ---
    if (Array.isArray(backup.prescriptions)) {
      for (const record of backup.prescriptions) {
        const parsed = parseDates(record);
        const exists = await db.prescription.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.prescriptions.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.prescription.create({ data: parsed });
            summary.prescriptions.imported++;
          } else {
            summary.prescriptions.duplicates++;
          }
        }
      }
    }

    // --- 14. EXAM ---
    if (Array.isArray(backup.exams)) {
      for (const record of backup.exams) {
        const parsed = parseDates(record);
        const exists = await db.exam.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.exams.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.exam.create({ data: parsed });
            summary.exams.imported++;
          } else {
            summary.exams.duplicates++;
          }
        }
      }
    }

    // --- 15. ANAMNESIS ---
    if (Array.isArray(backup.anamnesis)) {
      for (const record of backup.anamnesis) {
        const parsed = parseDates(record);
        const exists = await db.anamnesis.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { patientId: parsed.patientId }
            ]
          }
        });
        if (exists) {
          summary.anamnesis.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.anamnesis.create({ data: parsed });
            summary.anamnesis.imported++;
          } else {
            summary.anamnesis.duplicates++;
          }
        }
      }
    }

    // --- 16. WEEKLYCHECKIN ---
    if (Array.isArray(backup.weeklyCheckins)) {
      for (const record of backup.weeklyCheckins) {
        const parsed = parseDates(record);
        const exists = await db.weeklyCheckin.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.weeklyCheckins.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.weeklyCheckin.create({ data: parsed });
            summary.weeklyCheckins.imported++;
          } else {
            summary.weeklyCheckins.duplicates++;
          }
        }
      }
    }

    // --- 17. DOCUMENT ---
    if (Array.isArray(backup.documents)) {
      for (const record of backup.documents) {
        const parsed = parseDates(record);
        const exists = await db.document.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.documents.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.document.create({ data: parsed });
            summary.documents.imported++;
          } else {
            summary.documents.duplicates++;
          }
        }
      }
    }

    // --- 18. EPIGENETICANAMNESIS ---
    if (Array.isArray(backup.epigeneticAnamneses)) {
      for (const record of backup.epigeneticAnamneses) {
        const parsed = parseDates(record);
        const exists = await db.epigeneticAnamnesis.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.epigeneticAnamneses.duplicates++;
        } else {
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (patientExists) {
            await db.epigeneticAnamnesis.create({ data: parsed });
            summary.epigeneticAnamneses.imported++;
          } else {
            summary.epigeneticAnamneses.duplicates++;
          }
        }
      }
    }

    // --- 19. APPOINTMENT ---
    if (Array.isArray(backup.appointments)) {
      for (const record of backup.appointments) {
        const parsed = parseDates(record);
        const exists = await db.appointment.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              {
                doctorId: parsed.doctorId,
                date: parsed.date
              }
            ]
          }
        });
        if (exists) {
          summary.appointments.duplicates++;
        } else {
          const docExists = await db.user.findUnique({ where: { id: parsed.doctorId } });
          const patientExists = await db.patient.findUnique({ where: { id: parsed.patientId } });
          if (docExists && patientExists) {
            await db.appointment.create({ data: parsed });
            summary.appointments.imported++;
          } else {
            summary.appointments.duplicates++;
          }
        }
      }
    }

    // --- 20. TRANSACTION ---
    if (Array.isArray(backup.transactions)) {
      for (const record of backup.transactions) {
        const parsed = parseDates(record);
        const exists = await db.transaction.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.transactions.duplicates++;
        } else {
          const patientExists = parsed.patientId ? await db.patient.findUnique({ where: { id: parsed.patientId } }) : true;
          const userExists = parsed.userId ? await db.user.findUnique({ where: { id: parsed.userId } }) : true;
          if (patientExists && userExists) {
            await db.transaction.create({ data: parsed });
            summary.transactions.imported++;
          } else {
            summary.transactions.duplicates++;
          }
        }
      }
    }

    // --- 21. PURCHASE ---
    if (Array.isArray(backup.purchases)) {
      for (const record of backup.purchases) {
        const parsed = parseDates(record);
        const exists = await db.purchase.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              {
                userId: parsed.userId,
                courseId: parsed.courseId
              }
            ]
          }
        });
        if (exists) {
          summary.purchases.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          const courseExists = await db.course.findUnique({ where: { id: parsed.courseId } });
          if (userExists && courseExists) {
            await db.purchase.create({ data: parsed });
            summary.purchases.imported++;
          } else {
            summary.purchases.duplicates++;
          }
        }
      }
    }

    // --- 22. MODULE ---
    if (Array.isArray(backup.modules)) {
      for (const record of backup.modules) {
        const parsed = parseDates(record);
        const exists = await db.module.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.modules.duplicates++;
        } else {
          const courseExists = await db.course.findUnique({ where: { id: parsed.courseId } });
          if (courseExists) {
            await db.module.create({ data: parsed });
            summary.modules.imported++;
          } else {
            summary.modules.duplicates++;
          }
        }
      }
    }

    // --- 23. LESSON ---
    if (Array.isArray(backup.lessons)) {
      for (const record of backup.lessons) {
        const parsed = parseDates(record);
        const exists = await db.lesson.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.lessons.duplicates++;
        } else {
          const moduleExists = await db.module.findUnique({ where: { id: parsed.moduleId } });
          if (moduleExists) {
            await db.lesson.create({ data: parsed });
            summary.lessons.imported++;
          } else {
            summary.lessons.duplicates++;
          }
        }
      }
    }

    // --- 24. MODULEMATERIAL ---
    if (Array.isArray(backup.moduleMaterials)) {
      for (const record of backup.moduleMaterials) {
        const parsed = parseDates(record);
        const exists = await db.moduleMaterial.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.moduleMaterials.duplicates++;
        } else {
          const moduleExists = await db.module.findUnique({ where: { id: parsed.moduleId } });
          if (moduleExists) {
            await db.moduleMaterial.create({ data: parsed });
            summary.moduleMaterials.imported++;
          } else {
            summary.moduleMaterials.duplicates++;
          }
        }
      }
    }

    // --- 25. QUIZ ---
    if (Array.isArray(backup.quizzes)) {
      for (const record of backup.quizzes) {
        const parsed = parseDates(record);
        const exists = await db.quiz.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { moduleId: parsed.moduleId }
            ]
          }
        });
        if (exists) {
          summary.quizzes.duplicates++;
        } else {
          const moduleExists = await db.module.findUnique({ where: { id: parsed.moduleId } });
          if (moduleExists) {
            await db.quiz.create({ data: parsed });
            summary.quizzes.imported++;
          } else {
            summary.quizzes.duplicates++;
          }
        }
      }
    }

    // --- 26. QUESTION ---
    if (Array.isArray(backup.questions)) {
      for (const record of backup.questions) {
        const parsed = parseDates(record);
        const exists = await db.question.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.questions.duplicates++;
        } else {
          const quizExists = await db.quiz.findUnique({ where: { id: parsed.quizId } });
          if (quizExists) {
            await db.question.create({ data: parsed });
            summary.questions.imported++;
          } else {
            summary.questions.duplicates++;
          }
        }
      }
    }

    // --- 27. OPTION ---
    if (Array.isArray(backup.options)) {
      for (const record of backup.options) {
        const parsed = parseDates(record);
        const exists = await db.option.findUnique({ where: { id: parsed.id } });
        if (exists) {
          summary.options.duplicates++;
        } else {
          const questionExists = await db.question.findUnique({ where: { id: parsed.questionId } });
          if (questionExists) {
            await db.option.create({ data: parsed });
            summary.options.imported++;
          } else {
            summary.options.duplicates++;
          }
        }
      }
    }

    // --- 28. USERLESSONPROGRESS ---
    if (Array.isArray(backup.userLessonProgresses)) {
      for (const record of backup.userLessonProgresses) {
        const parsed = parseDates(record);
        const exists = await db.userLessonProgress.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              {
                userId: parsed.userId,
                lessonId: parsed.lessonId
              }
            ]
          }
        });
        if (exists) {
          summary.userLessonProgresses.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          const lessonExists = await db.lesson.findUnique({ where: { id: parsed.lessonId } });
          if (userExists && lessonExists) {
            await db.userLessonProgress.create({ data: parsed });
            summary.userLessonProgresses.imported++;
          } else {
            summary.userLessonProgresses.duplicates++;
          }
        }
      }
    }

    // --- 29. CERTIFICATE ---
    if (Array.isArray(backup.certificates)) {
      for (const record of backup.certificates) {
        const parsed = parseDates(record);
        const exists = await db.certificate.findFirst({
          where: {
            OR: [
              { id: parsed.id },
              { code: parsed.code },
              {
                userId: parsed.userId,
                courseId: parsed.courseId
              }
            ]
          }
        });
        if (exists) {
          summary.certificates.duplicates++;
        } else {
          const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
          const courseExists = await db.course.findUnique({ where: { id: parsed.courseId } });
          if (userExists && courseExists) {
            await db.certificate.create({ data: parsed });
            summary.certificates.imported++;
          } else {
            summary.certificates.duplicates++;
          }
        }
      }
    }

    // Revalidar rotas importantes após alteração no banco
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/patients");
    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      summary
    };

  } catch (error: any) {
    console.error("Erro ao importar dados:", error);
    return {
      success: false,
      error: `Erro ao ler ou processar arquivo JSON: ${error.message || "Erro desconhecido"}`
    };
  }
}
