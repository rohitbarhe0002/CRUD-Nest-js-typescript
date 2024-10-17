import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto,  } from 'src/dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';
import { Item } from 'src/schemas/item.schema';


@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(id, updateItemDto, {
      new: true,
    }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
