import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  console.log("test");
  const inputData = {
    idealHourlyRate: 20,
    gigPayment: 100,
    gigHours: 5,
    mileage: 10,
    babysittingHours: 2,
    babysittingHourlyRate: 15,
  };
  const shouldITakeThis = await prisma.shouldITakeThis.create({
    data: inputData,
  });
  console.log(shouldITakeThis);
}

main();
