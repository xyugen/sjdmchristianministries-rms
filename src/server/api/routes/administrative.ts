import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { getAllOrganizationalPolicies } from "@/lib/api/administrative/query";
import { createOrganizationalPolicy, deleteOrganizationalPolicy, editOrganizationalPolicy } from "@/lib/api/administrative/mutation";


export const administrativeRouter = createTRPCRouter({
  getAllOrganizationalPolicies: protectedProcedure.query(async () => {
    try {
      return await getAllOrganizationalPolicies();
    } catch (error) {
      console.log(error);
    }
  }),
  createOrganizationalPolicy: protectedProcedure.input(z.object({
    title: z.string(),
    description: z.string(),
  })).mutation(async ({ input }) => {
    try {
      return await createOrganizationalPolicy(input);
    } catch (error) {
      console.log(error);
    }
  }),
  editOrganizationalPolicy: publicProcedure.input(z.object({
    id: z.string(),
    data: z.object({ 
      title: z.string().optional(), 
      description: z.string().optional()
    })
  })).mutation(async ({ input }) => {
    try {
      return await editOrganizationalPolicy(input.id, input.data);
    } catch (error) {
      console.log(error);
    }
  }),
  deleteOrganizationalPolicy: protectedProcedure.input(
    z.object({ id: z.string() })
  ).mutation(async ({ input }) => {
    return await deleteOrganizationalPolicy(input.id);
  })
});