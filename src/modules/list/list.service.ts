import { Injectable, Inject, forwardRef } from '@nestjs/common';
import ListHeader from './list-header.entity';
import ListDetail from './list-detail.entity';
import { ListGateway } from './list.gateway';
import { IFindOptions } from 'sequelize-typescript';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ListService {

  user;

  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => ListGateway))
    private listGateway: ListGateway,
  ) { }

  async createList(list){
    console.log(list);
    return await ListHeader.create(list);
  }

  async addDetail(listId: number, record: any){
    record.list_header_id = listId;
    const newItem =  await ListDetail.create(record);
    this.listGateway.publishUpdate(listId, newItem);
  }

  async deleteDetail(listId, itemId) {
    await ListDetail.destroy({where: { id: itemId, list_header_id: listId } });
    const newItem = {id: itemId, deleted: true};
    this.listGateway.publishUpdate(listId, newItem);
  }

  async findOne(id){
    return await ListHeader.findById(id);
  }

  async findAll(options?: IFindOptions<ListHeader>) {
    return await ListHeader.findAll(options);
  }

  async getDetails(id) {
    return await ListDetail.findAll({
      where: {
        list_header_id: id,
      },
    });
  }

  async updateDetail(listId, item: ListDetail) {
    await ListDetail.update(item, {where: {id: item.id}});
    const newRecord = await ListDetail.findById(item.id);
    this.listGateway.publishUpdate(listId, newRecord);
  }

}
