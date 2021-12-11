import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity } from 'src/core/base/entity';
import { Repository } from 'src/core/base/repository';

@Injectable()
export class InMemoryRepository<
  TEntity extends Entity,
> extends Repository<TEntity> {
  protected readonly inmemoryData: TEntity[];

  constructor() {
    super();
    this.inmemoryData = [];
  }
  public create(data: TEntity): Observable<TEntity> {
    data.id =
      this.inmemoryData.length > 0 ? this.inmemoryData.slice(-1)[0].id + 1 : 1;

    const count = this.inmemoryData.push(data);

    return of(this.inmemoryData[count - 1]);
  }

  public getAll(): Observable<TEntity[]> {
    return of(this.inmemoryData);
  }

  public getById(id: number): Observable<TEntity> {
    const data = this.inmemoryData.find((item) => item.id === id);
    return of(data);
  }

  public getMany(filter: Partial<TEntity>): Observable<TEntity[]> {
    let filtered = this.inmemoryData;

    for (const key in filter) {
      filtered = filtered.filter((item) => item[key] === filter[key]);
    }
    return of(filtered);
  }

  public getOne(filter: Partial<TEntity>): Observable<TEntity> {
    return this.getMany(filter).pipe(map((item) => item[0]));
  }

  public patch(id: number, data: Partial<TEntity>): Observable<TEntity> {
    const index = this.getIndexById(id);

    if (index) {
      for (const key in data) {
        this.inmemoryData[index][key] = data[key];
      }

      return of(this.inmemoryData[index]);
    }

    return undefined;
  }

  public update(id: number, data: TEntity): Observable<TEntity> {
    const index = this.getIndexById(id);

    if (index) {
      this.inmemoryData[index] = data;
      return of(this.inmemoryData[index]);
    }
    return undefined;
  }

  public delete(id: number): Observable<void> {
    const index = this.getIndexById(id);

    if (index) {
      this.inmemoryData.splice(index, 1);
      return of(undefined);
    }
    return undefined;
  }

  private getIndexById(id: number) {
    return this.inmemoryData.findIndex((item) => item.id === id);
  }
}
