import consume from '../../src/consumer';
import validEvent from '../_fixtures/valid-event';
describe('consumer', () => {
  it('should return true', async () => {
    const result = await consume({});

    expect(result).toEqual(true);
  });

  describe('Given invalid event data structure Then consumer receive them It should fail', () => {
    it('invalid evendId data', () => {
      // @ts-ignore
      const result = await consume({ ...validEvent, eventId: 1 });
      expect(result).toEqual(false);
    });

    it('invalid currency in payload', () => {
      const event =
    });
  });
});
