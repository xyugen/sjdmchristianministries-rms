import { createDocumentSchema } from "@/app/(app)/administrative/legal-documents/create/_components/schema";
import {
  createLegalDocument,
  createMeetingAgenda,
  createOrganizationalPolicy,
  deleteLegalDocument,
  deleteMeetingAgenda,
  deleteOrganizationalPolicy,
  editLegalDocument,
  editMeetingAgenda,
  editOrganizationalPolicy,
  uploadLegalDocument as uploadLegalDocumentFile,
} from "@/lib/api/administrative/mutation";
import {
  getAllLegalDocuments,
  getAllMeetingAgendas,
  getAllOrganizationalPolicies,
  getLegalDocumentFileById,
} from "@/lib/api/administrative/query";
import {
  coerceDateOptional,
  coerceDateRequired,
  generateUUID,
} from "@/lib/utils";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export type CreateLegalDocument = z.infer<typeof createDocumentSchema>;

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
  editLegalDocument: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createDocumentSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await editLegalDocument(input.id, input.data);
      } catch (error) {
        console.log(error);
      }
    }),
  deleteLegalDocument: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteLegalDocument(input.id);
    }),
  uploadLegalDocumentFile: protectedProcedure
    .input(zfd.formData({ file: zfd.file() }))
    .mutation(async ({ input }) => {
      try {
        return await uploadLegalDocumentFile(input.file);
      } catch (error) {
        console.log(error);
      }
    }),
  getLegalDocumentFileById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getLegalDocumentFileById(input.id);
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
        meetingDate: coerceDateRequired(),
        startTime: coerceDateOptional(),
        endTime: coerceDateOptional(),
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
  editMeetingAgenda: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          meetingDate: coerceDateOptional(),
          startTime: coerceDateOptional(),
          endTime: coerceDateOptional(),
          presidingOfficer: z.string().optional(),
          agenda: z.string().optional(),
          summary: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await editMeetingAgenda(input.id, input.data);
      } catch (error) {
        console.log(error);
      }
    }),
  deleteMeetingAgenda: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteMeetingAgenda(input.id);
    }),
});
