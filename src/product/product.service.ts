import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, state } from './entities/product.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = {
        design: createProductDto.design,
        state: createProductDto.state,
        quantity: createProductDto.quantity,
      };

      await this.productRepository.save(product);
      // Simulate saving to the database
      return {
        message: 'Produit créé avec succès',
        status: '201'
      };
    } catch (error) {
      throw new Error('Erreur lors de la création du produit');
    }
  }

  async findAll(search?: string) {
    try {
      const query = this.productRepository.createQueryBuilder('product');

      if (search) {
        query.where('product.design ILIKE :search', { search: `%${search}%` });
      }

      const products = await query.getMany();
      return products;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  async findOne(productId: string) {
    try {
      const product = await this.productRepository.findOne({ where: { productId } });
      if (!product) {
        throw new Error('Produit non trouvé');
      }
      return {
        message: 'Produit récupéré avec succès',
        status: '200',
        data: product
      };
    } catch (error) {
      throw new Error('Erreur lors de la récupération du produit');
    }
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { productId } });
      if (!product) {
        throw new Error('Produit non trouvé');
      }
      Object.assign(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la mise à jour du produit');
    }
  }

  async remove(productId: string) {
    try {
      const product = await this.productRepository.findOne({ where: { productId } });
      if (!product) {
        throw new Error('Produit non trouvé');
      }
      await this.productRepository.remove(product);
      return {
        message: 'Produit supprimé avec succès',
        status: '200'
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la suppression du produit');
    }
  }

  async statProductsByState() {
    try {
      const states = await this.productRepository
        .createQueryBuilder('product')
        .select('product.state', 'state')
        .addSelect('COUNT(*)', 'count')
        .addSelect('SUM(product.quantity)', 'totalQuantity')
        .groupBy('product.state')
        .getRawMany();
        
      return states.map(state => ({
        state: state.state,
        count: parseInt(state.count, 10),
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des statistiques des produits par état');
    }
  }

  async listProductsByState(state: state) {
    try {
      const products = await this.productRepository.find({ where: { state } });
      return products;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits par état');
    }
  }
}
