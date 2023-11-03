import { EmployeeService } from '../employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  const repository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    service = new EmployeeService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new employee', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      name: 'John Doe',
      cpf: '12345678909',
      age: '30',
      position: 'Developer',
    };
    const createdEmployee: Employee = {
      id: '113c81b3-6b6b-45b7-984b-e9fb9081c643',
      ...createEmployeeDto,
    };
    repository.save.mockResolvedValue(createdEmployee);

    const result = await service.create(createEmployeeDto);
    expect(result).toBe(createdEmployee);
  });

  it('should find all employees', async () => {
    const employees: Employee[] = [
      {
        id: 'e3857261-d13c-47c8-b1f3-b29981994959',
        name: 'Gabriel Ruan Matheus da Mata',
        cpf: '20713164794',
        age: '48',
        position: 'Manager',
      },
      {
        id: 'f312c32f-9b49-496c-ae5e-9d7c50e2cb23',
        name: 'Nicole Gabriela Marina Rodrigues',
        cpf: '23704992143',
        age: '37',
        position: 'Designer',
      },
      {
        id: 'bd326656-7a51-469a-b108-1413570395b2',
        name: 'Murilo Enrico Marcos Sales',
        cpf: '98765432100',
        age: '23',
        position: 'QA',
      },
    ];
    repository.find.mockResolvedValue(employees);

    const result = await service.findAll();
    expect(result).toEqual(employees);
  });

  it('should find one employee by id', async () => {
    const id = 'd808c0b7-62cc-4789-b54d-8fd36afc55ee';
    const employee: Employee = {
      id,
      name: 'Bryan Iago Duarte',
      cpf: '67972650616',
      age: '51',
      position: 'Developer',
    };
    repository.findOne.mockResolvedValue(employee);

    const result = await service.findOne(id);
    expect(result).toBe(employee);
  });

  it('should update an employee', async () => {
    const id = 'd808c0b7-62cc-4789-b54d-8fd36afc55ee';
    const updateEmployeeDto: UpdateEmployeeDto = {
      name: 'John Doe Jane',
      age: '31',
    };
    const updatedEmployee: Partial<Employee> = {
      id,
      ...updateEmployeeDto,
    };
    repository.update.mockResolvedValue({ affected: 1 });
    repository.findOne.mockResolvedValue(updatedEmployee);

    const result = await service.update(id, updateEmployeeDto);
    expect(result).toBe(updatedEmployee);
  });

  it('should remove an employee', async () => {
    const id = '62ee6d6d-1d7c-4da2-858e-14696b02b301';
    repository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(id);
    expect(result).toStrictEqual({ affected: 1 });
  });
});
