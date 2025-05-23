import { createDocumentSchema } from "@/app/(app)/administrative/legal-documents/create/_components/schema";
import {
  createLegalDocument,
  createMeetingAgenda,
  createOrganizationalPolicy,
  deleteOrganizationalPolicy,
  editOrganizationalPolicy,
} from "@/lib/api/administrative/mutation";
import {
  getAllLegalDocuments,
  getAllMeetingAgendas,
  getAllOrganizationalPolicies,
} from "@/lib/api/administrative/query";
import { generateUUID } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const administrativeRouter = createTRPCRouter({
  getAllOrganizationalPolicies: protectedProcedure.query(async () => {
    try {
      return await getAllOrganizationalPolicies();
    } catch (error) {
      console.log(error);
    }
  }),
  createOrganizationalPolicy: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await createOrganizationalPolicy({
          id: generateUUID(),
          ...input,
        });
      } catch (error) {
        console.log(error);
      }
    }),
  editOrganizationalPolicy: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await editOrganizationalPolicy(input.id, input.data);
      } catch (error) {
        console.log(error);
      }
    }),
  deleteOrganizationalPolicy: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteOrganizationalPolicy(input.id);
    }),

  /**
   * Legal Documents
   */
  createLegalDocument: protectedProcedure
    .input(createDocumentSchema)
    .mutation(async ({ input }) => {
      try {
        return await createLegalDocument({
          id: generateUUID(),
          ...input,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating legal document");
      }
    }),
  getAllLegalDocuments: publicProcedure.query(async () => {
    try {
      return await getAllLegalDocuments();
    } catch (error) {
      console.log(error);
    }
  }),

  /**
   * Meeting Agendas
   */
  createMeetingAgenda: protectedProcedure
    .input(
      z.object({
        meetingDate: z.string().transform((val) => new Date(val)),
        startTime: z
          .string()
          .optional()
          .transform((val) => (val ? new Date(val) : undefined)),
        endTime: z
          .string()
          .optional()
          .transform((val) => (val ? new Date(val) : undefined)),
        presidingOfficer: z.string(),
        agenda: z.string(),
        summary: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await createMeetingAgenda({
          id: generateUUID(),
          ...input,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating meeting agenda");
      }
    }),
  getAllMeetingAgendas: protectedProcedure.query(async () => {
    try {
      return await getAllMeetingAgendas();
    } catch (error) {
      console.log(error);
    }
  }),
});
