# Evento

```typescript
export class EventEntity extends Entity {
    public readonly name: string;
    public readonly description: string;
    public readonly date: Date;
    public readonly location: string;
    public readonly image: string;
    public readonly positions: Array<any>;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
```

## Inputs

    input EventInput {
        name: String!
        description: String!
        date: DateTime!
        location: LocationInput!
        owner: ID!
        participants: [ID!]!
    }

### Regras de Negócio

    - Evento deve ter um nome.
    - Evento deve ter uma descrição.
    - Evento deve ter uma data.
    - Evento deve ter um local.
    - Evento deve ter um dono.
    - Evento deve ter participantes.
    - Evento deve ter uma data de criação.
    - Evento deve ter uma data de atualização.
    - Evento deve ter uma disponibilidade de ingressos.
    - Evento deve ter uma posição de ingressos.
    - Evento deve ter uma capacidade de ingressos.

### Requisitos Funcionais

    - Evento não deve ser criado com um nome duplicado.
    - Evento não deve ser atualizado com um nome duplicado.
    - Evento não deve ser deletado com um nome duplicado.
    - Evento não deve ser criado com um nome vazio.
    - Evento não deve ser criado com uma descrição vazia.
    - Evento não deve ser criado com uma data vazia.
    - Evento não deve ser criado com um local vazio.
    - Evento não deve ser criado com um dono vazio.
    - Evento não deve ser criado com participantes vazios.
    - Evento não deve ser atualizado com um nome vazio.
    - Evento não deve ser atualizado com uma descrição vazia.
    - Evento não deve ser atualizado com uma data vazia.
    - Evento não deve ser atualizado com um local vazio.
    - Evento não deve ser atualizado com um dono vazio.
    - Evento não deve ser atualizado com participantes vazios.
    - Evento não deve ser deletado.

### Requisitos Não Funcionais


## Entradas

### Usuário

    - Usuário deve existir.
    - Usuário deve esta logado.
    - Usuário deve consultar disponibilidade.
    - Usuário deve conseguir comprar um ingresso.

### Dono

    - Dono deve existir.
    - Dono deve esta logado.
    - Dono deve cadastrar um evento.
    - Dono deve cadastrar disponibilidade de ingresos.
    - Dono deve atualizar disponibilidade de ingresos.
    - Dono deve deletar disponibilidade de ingresos.
    - Dono deve cadastrar um local.

### Local

    - Local deve exitir.
    - Local precisa ter um dono.
    - Local deve ter a capacidade de ingressos.
    - Local deve ter a posições de ingressos.
    - Local deve ter a disponibilidade de ingressos.


# Domains

## Eventos

### Use-cases

```typescript

    declare class CreateEventUseCase {
        execute(event: EventInput): Event
    }

    declare class UpdateEventUseCase {
        execute(event: EventInput): Event
    }

    declare class DeleteEventUseCase {
        execute(event: EventInput): Event
    }

    declare class GetEventUseCase {
        execute(event: EventInput): Event
    }

    declare class GetEventsUseCase {
        execute(): [Event]
    }

    declare class GetEventsByOwnerUseCase {
        execute(owner: ID): [Event]
    }

    declare class GetEventsByLocationUseCase {
        execute(location: LocationInput): [Event]
    }

    declare class GetEventsByDateUseCase {
        execute(date: DateTime): [Event]
    }

    declare class GetEventsByNameUseCase {
        execute(name: String): [Event]
    }

    declare class GetEventsByDescriptionUseCase {
        execute(description: String): [Event]
    }

    declare class GetEventsByCapacityUseCase {
        execute(capacity: Int): [Event]
    }

    declare class GetEventsByAvailabilityUseCase {
        execute(availability: Boolean): [Event]
    }

    declare class GetEventsByDateRangeUseCase {
        execute(startDate: DateTime, endDate: DateTime): [Event]
    }

    declare class GetEventsByPositionRangeUseCase {
        execute(startPosition: Int, endPosition: Int): [Event]
    }

    declare class GetEventsByAvailabilityRangeUseCase {
        execute(startAvailability: Boolean, endAvailability: Boolean): [Event]
    }

    declare class GetEventsByLocationRangeUseCase {
        execute(startLocation: LocationInput, endLocation: LocationInput): [Event]
    }

    declare class GetEventsByNameRangeUseCase {
        execute(startName: String, endName: String): [Event]
    }

    declare class GetEventsByDescriptionRangeUseCase {
        execute(startDescription: String, endDescription: String): [Event]
    }

    declare class GetEventsByOwnerRangeUseCase {
        execute(startOwner: ID, endOwner: ID): [Event]
    }
```