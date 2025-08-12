import { render, screen } from '@testing-library/react';
import FormField from '.';
import Input from '../input';

describe('FormField 컴포넌트', () => {
  test('자식 컴포넌트가 올바르게 렌더링되어야 한다', () => {
    render(
      <FormField>
        <Input placeholder="테스트 입력" />
      </FormField>,
    );

    const inputElement = screen.getByPlaceholderText('테스트 입력');
    expect(inputElement).toBeInTheDocument();
  });

  test('라벨이 올바르게 렌더링되어야 한다', () => {
    render(
      <FormField label={{ id: 'test-input', content: '테스트 라벨' }}>
        <Input id="test-input" placeholder="라벨 테스트" />
      </FormField>,
    );

    const labelElement = screen.getByText('테스트 라벨');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  test('에러 메시지가 올바르게 렌더링되어야 한다', () => {
    render(
      <FormField
        label={{ id: 'error-input', content: '에러 필드' }}
        error={{ type: 'required', message: '필수 입력 항목입니다.' }}
      >
        <Input id="error-input" placeholder="에러 테스트" />
      </FormField>,
    );

    const errorElement = screen.getByText('필수 입력 항목입니다.');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('role', 'alert');
  });

  test('isLineBreak가 true일 때 레이아웃이 변경되어야 한다', () => {
    render(
      <FormField label={{ id: 'line-break-input', content: '줄바꿈 라벨' }} isLineBreak={true}>
        <Input id="line-break-input" placeholder="줄바꿈 테스트" />
      </FormField>,
    );

    const container = screen.getByText('줄바꿈 라벨').closest('div');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-baseline');

    const labelElement = screen.getByText('줄바꿈 라벨');
    expect(labelElement).toHaveClass('w-full');
  });

  test('labelClassName prop이 올바르게 적용되어야 한다', () => {
    render(
      <FormField label={{ id: 'styled-label-input', content: '스타일 라벨' }} labelClassName="test-label-class">
        <Input id="styled-label-input" placeholder="라벨 스타일 테스트" />
      </FormField>,
    );

    const labelElement = screen.getByText('스타일 라벨');
    expect(labelElement).toHaveClass('test-label-class');
  });

  test('className prop이 적용되어야 한다', () => {
    render(
      <FormField className="test-form-field-class">
        <Input placeholder="폼필드 스타일 테스트" />
      </FormField>,
    );

    const inputElement = screen.getByPlaceholderText('폼필드 스타일 테스트');
    expect(inputElement).toBeInTheDocument();
  });
});
