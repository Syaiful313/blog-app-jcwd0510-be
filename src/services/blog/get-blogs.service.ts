import { Prisma } from "@prisma/client";
import { paginationQueriesParams } from "../../types/pagination";
import { prisma } from "../../lib/prisma";


interface GetBlogQuery extends paginationQueriesParams {
  search: string;
}

export const getBlogsService = async (query: GetBlogQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;

    const whereClause: Prisma.BlogWhereInput = { deletedAt: null };

    if (search) {
      whereClause.OR = [
        { category: { contains: search,mode:'insensitive' } },
        { title: { contains: search,mode:'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      skip: (page - 1) * take, // offset
      take: take, // limit
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const count = await prisma.blog.count({where: whereClause});
    return {
      data: blogs,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
