import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './index';

describe('Chip', () => {
  it('기본 텍스트를 올바르게 렌더링한다', () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('기본 variant는 neutral이다', () => {
    render(<Chip>Default</Chip>);
    const chip = screen.getByRole('status');
    expect(chip).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('variant를 올바르게 적용한다', () => {
    render(<Chip variant="success">Success</Chip>);
    const chip = screen.getByRole('status');
    expect(chip).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('추가 className을 올바르게 적용한다', () => {
    render(<Chip className="custom-class">Custom</Chip>);
    const chip = screen.getByRole('status');
    expect(chip).toHaveClass('custom-class');
  });

  it('aria-label을 올바르게 적용한다', () => {
    render(<Chip ariaLabel="상태 표시">Status</Chip>);
    const chip = screen.getByLabelText('상태 표시');
    expect(chip).toBeInTheDocument();
  });

  it('기본 클래스들이 포함된다', () => {
    render(<Chip>Test</Chip>);
    const chip = screen.getByRole('status');
    expect(chip).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'font-medium');
  });
});
