import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { getAllOrganizationalPolicies,
  getAllMeetingAgendas,
  getAllLegalDocuments } from "@/lib/api/administrative/query";
import { createOrganizationalPolicy, 
  deleteOrganizationalPolicy, 
  editOrganizationalPolicy, 
  createMeetingAgenda,
  createLegalDocument } from "@/lib/api/administrative/mutation";

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
  editOrganizationalPolicy: protectedProcedure.input(z.object({
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
  }),

  /**
   * Legal Documents
   */
  createLegalDocument: protectedProcedure.input(z.object({
    documentType: z.string(),
    documentNumber: z.string(),
    documentOrigin: z.string(),
    issuerId: z.string(),
    issueDate: z.string().transform((val) => new Date(val)),
    expiryDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined))
  })).mutation(async ({ input }) => {
    try {
      return await createLegalDocument(input);
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
  createMeetingAgenda: protectedProcedure.input(
    z.object({
      meetingDate: z.string().transform((val) => new Date(val)),
      startTime: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
      endTime: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
      presidingOfficer: z.string(),
      agenda: z.string(),
      summary: z.string().optional()
    })
  ).mutation(async ({ input }) => {
    try {
      return await createMeetingAgenda(input);
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
  })
});