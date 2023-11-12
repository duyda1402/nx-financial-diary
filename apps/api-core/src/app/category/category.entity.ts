import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CategoryTaxonomy, CategoryType } from "../../common/enum/category.enum";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column({ type: "enum", enum: CategoryType })
  type: CategoryType;

  @Column({ type: "enum", enum: CategoryTaxonomy, default: CategoryTaxonomy.EXPENSE })
  taxonomy: CategoryTaxonomy;

  @Column({ nullable: true })
  categoryId?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  parentId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
