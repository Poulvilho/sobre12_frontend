interface ICategory {
  id: number;
  description: string;
}

export default Array<ICategory> (
  { id: 1, description: 'Transporte' },
  { id: 2, description: 'Alimentação' },
  { id: 3, description: 'Hospedagem' },
  { id: 4, description: 'Lazer' },
);
