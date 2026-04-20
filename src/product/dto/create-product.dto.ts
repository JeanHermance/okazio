import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { state } from "../entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ description: 'Désignation du produit', example: 'Chaise en bois' })
    @IsNotEmpty({message: 'La désignation est obligatoire'})
    @IsString()
    design!: string;

    @ApiProperty({ description: 'État du produit', example: 'bon' })
    @IsNotEmpty({message: 'L\'état est obligatoire'})
    @IsEnum(state, {message: 'L\'état doit être l\'un des suivants: mauvais, bon, abime'})
    state!: state;

    @ApiProperty({ description: 'Quantité du produit', example: 10 })
    @IsNotEmpty({message: 'La quantité est obligatoire'})
    @IsInt({message: 'La quantité doit être un entier'})
    @Min(1, {message: 'La quantité doit être un nombre positif'})
    quantity!: number;
}
