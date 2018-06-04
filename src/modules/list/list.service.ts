import { Injectable, Inject, forwardRef } from '@nestjs/common';
import ListHeader from './list-header.entity';
import ListDetail from './list-detail.entity';
import { RequesterService } from 'services/requester.service';
import { ListGateway } from './list.gateway';

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
    this.listGateway.publishUpdate();
    // record.list_header_id = listId;
    // return await ListDetail.create(record);
  }

  async findOne(id){
    return await ListHeader.findById(id);
  }

}
