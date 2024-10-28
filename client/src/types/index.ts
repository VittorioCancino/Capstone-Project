import { z } from "zod";

const InitialSchema = 
z.object({
    Name: z.string().min(1,"El nombre es obligatorio"),
});

export const CreateTypeSchema = InitialSchema;
export type CreateType = z.infer<typeof CreateTypeSchema>;