import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiParam, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { state } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ description: 'Créer un nouveau produit' })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ description: 'Récupérer tous les produits' })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Filtrer les produits par désignation' 
  })
  findAll(@Query('search') search?: string) {
    return this.productService.findAll(search);
  }

  @Get(':productId')
  @ApiOperation({ description: 'Récupérer un produit par son ID' })
  @ApiParam({ name: 'productId', description: 'ID du produit à récupérer' })
  findOne(@Param('productId') productId: string) {
    return this.productService.findOne(productId);
  }

  @Patch(':productId')
  @ApiOperation({ description: 'Mettre à jour un produit existant' })
  @ApiParam({ name: 'productId', description: 'ID du produit à mettre à jour' })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  update(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @ApiOperation({ description: 'Supprimer un produit par son ID' })
  @ApiParam({ name: 'productId', description: 'ID du produit à supprimer' })
  remove(@Param('productId') productId: string) {
    return this.productService.remove(productId);
  }

  @Get('stats/state')
  @ApiOperation({ description: 'Obtenir les statistiques des produits par état' })
  statProductsByState() {
    return this.productService.statProductsByState();
  }

  @Get('state/:state')
  @ApiOperation({ description: 'Lister les produits par état' })
  @ApiParam({ name:'state', description: 'État des produits à lister (mauvais, bon, abime)' })
  listProductsByState(@Param('state') state: state) {
    return this.productService.listProductsByState(state);
  }
}
