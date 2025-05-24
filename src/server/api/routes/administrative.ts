import { createDocumentSchema } from "@/app/(app)/administrative/legal-documents/create/_components/schema";
import {
  createLegalDocument,
  createMeetingAgenda,
  createOrganizationalPolicy,
  deleteOrganizationalPolicy,
  deleteMeetingAgenda,
  deleteLegalDocument,
  editOrganizationalPolicy,
  editMeetingAgenda,
  editLegalDocument
} from "@/lib/api/administrative/mutation";
import {
  getAllLegalDocuments,
  getAllMeetingAgendas,
  getAllOrganizationalPolicies,
} from "@/lib/api/administrative/query";
import { generateUUID } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { DOCUMENT_ORIGIN, DOCUMENT_TYPE } from "@/constants/document";

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
    .input(
      z.object({
        documentType: z.enum(DOCUMENT_TYPE),
        documentNumber: z.string(),
        documentOrigin: z.enum(DOCUMENT_ORIGIN),
        issuerId: z.string().optional(),
        issueDate: z.date(),
        expiryDate: z.date(),
      })
    )
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
        data: z.object({
          documentType: z.enum(DOCUMENT_TYPE).optional(),
          documentNumber: z.string().optional(),
          documentOrigin: z.enum(DOCUMENT_ORIGIN).optional(),
          issuerId: z.string().optional(),
          issueDate: z.date().optional(),
          expiryDate: z.date().optional(),
        }),
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
    }
  ),

  /**
   * Meeting Agendas
   */
  createMeetingAgenda: protectedProcedure
    .input(
      z.object({
        meetingDate: z.date(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
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
          meetingDate: z.date().optional(),
          startTime: z.date().optional(),
          endTime: z.date().optional(),
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
    }
  ),
  

});
