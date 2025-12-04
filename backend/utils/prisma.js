const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const User = prisma.user;
const Farm = prisma.farm;
const SoilData = prisma.soilData;

module.exports = {
    prisma,
    User,
    Farm,
    SoilData,
};