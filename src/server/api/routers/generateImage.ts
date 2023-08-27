import { z } from "zod";
import {
  //adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

import { v2 as cloudinary } from "cloudinary";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
cloudinary.config({
  cloud_name: "diudkat4v",
  api_key: "113933954143142",
  api_secret: "-KHtF03fj1LsHmBdESyEgUlu2E0",
});

export const todosRouter = createTRPCRouter({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  createTodo: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const todo = await prisma.todo.create({
          data: {
            name: input.name,
            description: input.description,
            userId: ctx.session.user.id,
          },
        });
        return todo;
      } catch (error) {
        console.log(error);
      }
    }),

  updateTodo: protectedProcedure
    .input(
      z.object({ id: z.string(), name: z.string(), description: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const todo = await prisma.todo.update({
          where: { id: input.id },
          data: {
            name: input.name,
            description: input.description,
            userId: ctx.session.user.id,
          },
        });
        return todo;
      } catch (error) {
        console.log(error);
      }
    }),

  deleteTodo: protectedProcedure //adminProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deleteTeodo = await ctx.prisma.todo.delete({
          where: {
            id: input.todoId,
          },
        });
        return deleteTeodo;
      } catch (error) {
        console.log(error);
      }
    }),

  getImages: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.generateImage.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  saveImage: protectedProcedure
    .input(
      z.object({
        link: z.string(),
        prompt: z.string(),
        printType: z.string(),
        size: z.string(),
        amount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const response = await cloudinary.uploader.upload(input.link);
        //.then((result) => console.log(result));

        const generateImage = await prisma.generateImage.create({
          data: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            link: response.secure_url,
            prompt: input.prompt,
            userId: ctx.session?.user.id,
            size: input.size,
            printType: input.printType,
            amount: input.amount,
          },
        });
        return generateImage;
      } catch (error) {
        console.log(error);
      }
    }),

  deleteImage: protectedProcedure //adminProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deleteImage = await ctx.prisma.generateImage.delete({
          where: {
            id: input.imageId,
          },
        });
        return deleteImage;
      } catch (error) {
        console.log(error);
      }
    }),

  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      //ctx,
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const promptString = input.prompt; //body.prompt;
        console.log(promptString);
        if (!promptString) {
          return new Response("you need a prompt", { status: 400 });
        }

        const aiResponse = await openai.createImage({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          prompt: promptString,
          n: 1,
          size: "512x512",
        });

        return aiResponse.data.data[0]?.url;
      } catch (error) {
        console.log(error);
      }
    }),
});
