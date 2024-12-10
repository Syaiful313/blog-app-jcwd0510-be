import { error } from "console";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/argon";

export const ResetPasswordService = async (
  userId: number,
  password: string
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Account not found");
    }
    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { message: "Reset Password Success" };
  } catch (error) {
    throw error;
  }
};
