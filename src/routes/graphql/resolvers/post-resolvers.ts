import { PrismaClient } from "@prisma/client";
import { IPostInput } from "../types/post.js";

export async function getPost(id: string, prisma: PrismaClient) {
  const post = await prisma.post.findUnique({ where: { id } });

  return post;
}

export async function getPosts(prisma: PrismaClient) {
  const posts = await prisma.post.findMany();

  return posts;
}

export async function getPostsByAuthorId(id: string, prisma: PrismaClient) {
  const posts = await prisma.post.findMany({ where: { authorId: id } });

  return posts;
}

export async function createPost(createPostInfo: IPostInput, prisma: PrismaClient) {
  const post = await prisma.post.create({ data: createPostInfo });

  return post;
}

export async function changePost(id: string, changePostInfo: IPostInput, prisma: PrismaClient) {
  const updatedPost = await prisma.post.update({
    where: { id },
    data: changePostInfo,
  });

  return updatedPost;
}

export async function deletePost(id: string, prisma: PrismaClient) {
  const deletedPost = await prisma.post.delete({ where: { id } });

  return deletedPost.id;
}