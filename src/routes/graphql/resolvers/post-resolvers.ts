import { PrismaClient } from "@prisma/client";
import { ICreatePostInput } from "../types/post.js";

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

export async function createPost(createPostInfo: ICreatePostInput, prisma: PrismaClient) {
  const post = await prisma.post.create({ data: createPostInfo });

  return post;
}

export async function deletePost(id: string, prisma: PrismaClient) {
  const deletePost = await prisma.post.delete({ where: { id } });

  return deletePost.id;
}