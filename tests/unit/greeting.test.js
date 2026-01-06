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

  it('returns personalized greeting when name is a number', () => {
    expect(getGreeting(123)).toBe('Hello world! From 123');
  });

  it('returns personalized greeting when name is an object', () => {
    const obj = { toString: () => 'ObjectName' };
    expect(getGreeting(obj)).toBe('Hello world! From ObjectName');
  });

  it('returns personalized greeting when name is a boolean true', () => {
    expect(getGreeting(true)).toBe('Hello world! From true');
  });

  it('returns personalized greeting when name is a boolean false', () => {
    expect(getGreeting(false)).toBe('Hello world!');
  });

  it('returns personalized greeting when name is a symbol', () => {
    const sym = Symbol('test');
    expect(getGreeting(sym)).toBe('Hello world! From Symbol(test)');
  });

  it('returns personalized greeting when name is an array', () => {
    expect(getGreeting(['Alice', 'Bob'])).toBe('Hello world! From Alice,Bob');
  });

  it('returns personalized greeting when name is a function', () => {
    const fn = () => 'test';
    expect(getGreeting(fn)).toBe('Hello world! From () => "test"');
  });
});
