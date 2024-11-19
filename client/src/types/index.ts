import { z } from "zod";

const InitialSchema = 
z.object({
    Name: z.string().min(1,"El nombre es obligatorio"),
});

export const CreateTypeSchema = z.object({
    GroupName: z.string().min(1,"El nombre es obligatorio"),
});
export type CreateType = z.infer<typeof CreateTypeSchema>;

export const CreateMaterialSchema = z.object({
    Name: z.string().min(1,"El nombre es obligatorio"),
});
export type CreateMaterial = z.infer<typeof CreateMaterialSchema>;

export const DeleteMaterialSchema = z.object({
    MaterialName: z.string().min(1,"El nombre es obligatorio"),
});
export type DeleteMaterial = z.infer<typeof CreateMaterialSchema>;

export const CreateWarehouseSchema = 
z.object({
    WarehouseName: z.string().min(1,"El nombre es obligatorio"),
    WarehouseAdress: z.string().min(1,"La dirección es obligatorio"),
    WarehouseManager: z.string().min(1,"El administrador es obligatorio"),
    WarehousePhone: z.string().min(1,"El número es obligatorio"),
    WarehouseEmail: z.string().min(1,"El email es obligatorio"),
    WarehouseSchedule: z.string().min(1,"El horario es obligatorio"),
})
export type CreateWarehouse = z.infer<typeof CreateWarehouseSchema>

export const DeleteWarehouseSchema = 
z.object({
    WarehouseName: z.string().min(1,"El nombre es obligatorio"),
})
export type DeleteWarehouse = z.infer<typeof DeleteWarehouseSchema>

export const CreateAreaSchema = 
z.object({
    AreaName: z.string().min(1,"El nombre es obligatorio"),
    WarehouseName: z.string().min(1,"El nombre de bodega es obligatorio"),
})
export type CreateArea = z.infer<typeof CreateAreaSchema>

export const DeleteAreaSchema = 
z.object({
    AreaName: z.string().min(1,"El nombre es obligatorio"),
    WarehouseName: z.string().min(1,"El nombre de bodega es obligatorio"),
})
export type DeleteArea = z.infer<typeof DeleteAreaSchema>

export const CreateProductSchema = z.object({
    Material: z.string().min(1,"El material es obligaorio"),
    Type: z.string().min(1,"El tipo es obligaorio"),
    Large: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
    Width: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
    Thickness: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
})
export type CreateProduct = z.infer<typeof CreateProductSchema>

export const AddProductsSchema = CreateProductSchema.extend({
    Quantity: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
  });
  export type AddProduct = z.infer<typeof AddProductsSchema>;