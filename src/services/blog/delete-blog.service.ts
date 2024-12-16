import { prisma } from "../../lib/prisma";

export const deleteBlogService = async (id: number, userId: number) => {
  try {
    const blog = await prisma.blog.delete({
      where: { id },
    });
    if (!blog) {
      throw new Error("Invalid blog id");
    }

    if (blog.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.blog.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: "Blog deleted successfully" };
  } catch (error) {
    throw error;
  }
};
