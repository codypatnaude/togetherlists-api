import { Injectable, Inject, forwardRef } from '@nestjs/common';
import ListHeader from './list-header.entity';
import ListDetail from './list-detail.entity';
import { RequesterService } from 'services/requester.service';
import { ListGateway } from './list.gateway';
import { IFindOptions } from 'sequelize-typescript';

@Injectable()
export class ListService {

  user;

  constructor(
    private requesterService: RequesterService,
    @Inject(forwardRef(() => ListGateway))
    private listGateway: ListGateway,
  ) { }

  async createList(list){
    const requester = this.requesterService.getUser();
    list.user_id = requester.id;
    return await ListHeader.create(list);
  }

  async addDetail(listId: number, record: any){
    record.list_header_id = listId;
    const newItem =  await ListDetail.create(record);
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
