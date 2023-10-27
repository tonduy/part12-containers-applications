import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('Todo component displayed correctly', () => {
    const todo = {
        text: 'test todo',
        done: false,
    };

    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();

    const { getByText } = render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    expect(getByText('test todo')).toBeInTheDocument();

    fireEvent.click(getByText('Delete'));
    expect(deleteTodo).toHaveBeenCalled();

    if (!todo.done) {
        fireEvent.click(getByText('Set as done'));
        expect(completeTodo).toHaveBeenCalled();
    }
});