import { CheckNullPipe } from './check-null.pipe';

describe('CheckNullPipe', () => {
  let pipe: CheckNullPipe;

  beforeEach(() => {
    pipe = new CheckNullPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "null" to "0"', () => {
    const transformedValue = pipe.transform('null');
    expect(transformedValue).toEqual('0');
  });

  it('should transform any other value to itself', () => {
    const transformedValue = pipe.transform('hi');
    expect(transformedValue).toEqual('hi');
  });
});
