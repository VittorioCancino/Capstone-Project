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
    MaterialName: z.string().min(1,"El nombre es obligatorio"),
    GroupName: z.string()
});
export type CreateMaterial = z.infer<typeof CreateMaterialSchema>;

export const DeleteMaterialSchema = z.object({
    MaterialName: z.string().min(1,"El nombre es obligatorio"),
});
export type DeleteMaterial = z.infer<typeof DeleteMaterialSchema>;

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
    MaterialName: z.string().min(1,"El material es obligaorio"),
    GroupName: z.string().min(1,"El tipo es obligaorio"),
    ProductLarge: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
    ProductWidth: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
    ProductThickness: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
})
export type CreateProduct = z.infer<typeof CreateProductSchema>

export const CreateProductAreaSchema = z.object({
    AreaId: z.number().int().min(1, "El AreaId debe ser un número entero y mayor a 0"),
    ProductId: z.number().int().min(1, "El ProductId debe ser un número entero y mayor a 0"),
})
export type CreateProductArea = z.infer<typeof CreateProductAreaSchema>

export const DeleteProductAreaSchema = z.object({
    ProductAreaId: z.number().int().min(1, "El ProductId debe ser un número entero y mayor a 0"),
})
export type DeleteProductArea = z.infer<typeof DeleteProductAreaSchema>

export const AddStockSchema = z.object({
    StockId: z.number(),
    Quantity: z.number().positive().int().min(1, "La cantidad debe ser al menos 1"),
  });
export type AddStock = z.infer<typeof AddStockSchema>;