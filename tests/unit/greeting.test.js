const { getGreeting } = require('../../src/greeting');

describe('getGreeting', () => {
  it('returns the hello world message', () => {
    expect(getGreeting()).toBe('Hello world!');
  });

  it('returns personalized greeting when name is provided', () => {
    expect(getGreeting('Alice')).toBe('Hello world! From Alice');
  });

  it('returns hello world when name is empty string', () => {
    expect(getGreeting('')).toBe('Hello world!');
  });

  it('returns hello world when name is null', () => {
    expect(getGreeting(null)).toBe('Hello world!');
  });

  it('returns hello world when name is undefined', () => {
    expect(getGreeting(undefined)).toBe('Hello world!');
  });
});
