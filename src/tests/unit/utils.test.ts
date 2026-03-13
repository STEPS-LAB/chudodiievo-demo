import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatPrice, slugify, truncate } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
      expect(cn('foo', null, 'bar')).toBe('foo bar');
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      expect(cn('base', isActive && 'active')).toBe('base active');
    });

    it('should handle tailwind-merge', () => {
      expect(cn('px-4', 'px-8')).toBe('px-8');
    });
  });

  describe('formatDate', () => {
    it('should format date in Ukrainian locale', () => {
      const date = new Date('2026-01-15');
      expect(formatDate(date, 'uk-UA')).toContain('2026');
    });

    it('should format date in English locale', () => {
      const date = new Date('2026-01-15');
      expect(formatDate(date, 'en-US')).toContain('2026');
    });
  });

  describe('formatPrice', () => {
    it('should format price in UAH', () => {
      expect(formatPrice(8500, 'UAH')).toContain('8 500');
    });

    it('should format price without decimals', () => {
      expect(formatPrice(8500, 'UAH')).not.toContain('kop');
    });
  });

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short text', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });

    it('should handle exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });
});
