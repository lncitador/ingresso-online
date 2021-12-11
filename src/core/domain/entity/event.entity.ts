import { Entity } from '../../base/entity';

export class EventEntity extends Entity {
  public name: string;
  public description: string;
  public date: Date;
  public location: string;
  public image: string;
  public positions: Array<any>;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date;
}
