import { UseCase } from 'src/core/base/use-case';
import { EventEntity } from 'src/core/domain/entity/event.entity';
import { Observable } from 'rxjs';
import { Mapper } from 'src/core/base/mapper';
import { Repository } from 'src/core/base/repository';
import { InMemoryRepository } from 'src/data/inmemory/in-memory-repository.service';

class CreateEventDto implements Partial<EventEntity> {
  id?: number;
  name: string;
  description: string;
  date: Date;
  image: string;
  location: string;
  positions: Array<any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

class EventCreateMapper implements Mapper<CreateEventDto, EventEntity> {
  public mapFrom(param: CreateEventDto): EventEntity {
    const event = new EventEntity();

    const {
      createdAt,
      location,
      positions,
      updatedAt,
      name,
      image,
      description,
      date,
    } = param;

    event.name = name;
    event.description = description;
    event.date = date;
    event.image = image;
    event.location = location;
    event.positions = positions;
    event.createdAt = createdAt;
    event.updatedAt = updatedAt;

    return event;
  }

  public mapTo(param: EventEntity): CreateEventDto {
    const event = new CreateEventDto();

    event.name = param.name;
    event.description = param.description;
    event.date = param.date;
    event.image = param.image;
    event.location = param.location;
    event.positions = param.positions;
    event.createdAt = param.createdAt;
    event.updatedAt = param.updatedAt;
    event.deletedAt = param.deletedAt;

    return event;
  }
}

export abstract class EventRepository extends Repository<EventEntity> {}

class CreateEventUseCaseSpec implements UseCase<CreateEventDto> {
  private eventCreateMapper: EventCreateMapper;

  constructor(private readonly repository: EventRepository) {
    this.eventCreateMapper = new EventCreateMapper();
  }

  public execute(data: EventEntity): Observable<CreateEventDto> {
    const event = this.eventCreateMapper.mapTo(data);
    return this.repository.create(event);
  }
}

class EventInMemoryRepository extends InMemoryRepository<EventEntity> {}

describe('CreateEventUseCase', () => {
  it('should be defined', () => {
    const repository = new EventInMemoryRepository();
    expect(new CreateEventUseCaseSpec(repository)).toBeDefined();
  });

  it('should be instantiable', () => {
    const repository = new EventInMemoryRepository();
    expect(new CreateEventUseCaseSpec(repository)).toBeInstanceOf(
      CreateEventUseCaseSpec,
    );
  });

  it('should be able to create an event', () => {
    const repository = new EventInMemoryRepository();
    const useCase = new CreateEventUseCaseSpec(repository);
    const event = useCase.execute({
      name: 'Test Event',
      description: 'Test Description',
      date: new Date(),
      image: 'Test Image',
      location: 'Test Location',
      positions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    });

    event.subscribe((data) => {
      expect(data).toBeDefined();
      expect(data.name).toBe('Test Event');
      expect(data.description).toBe('Test Description');
      expect(data.date).toBeInstanceOf(Date);
      expect(data.image).toBe('Test Image');
      expect(data.location).toBe('Test Location');
      expect(data.positions).toBeInstanceOf(Array);
      expect(data.createdAt).toBeInstanceOf(Date);
      expect(data.updatedAt).toBeInstanceOf(Date);
      expect(data.deletedAt).toBeInstanceOf(Date);
    });
  });
});
