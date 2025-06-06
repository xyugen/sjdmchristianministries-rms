import { z } from "zod";

const formSchema = z.object({
   title:z.string().min(1, "Title is required"),
   description:z.string().min(1, "Description is required"),
});

export { formSchema }