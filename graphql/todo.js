import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

export function GET_TODO(options) {
  const query = useQuery(
    gql`
      query {
        todos {
          id
          title
          completed
        }
      }
    `,
    options
  );
  return { ...query };
}

export function CREATE_TODO(options) {
  const query = useMutation(
    gql`
      mutation create($title: String, $completed: Boolean = false) {
        createTodo(input: { title: $title, completed: $completed }) {
          title
          completed
        }
      }
    `,
    options
  );
  return [...query];
}

export function UPDATE_TODO(options) {
  const query = useMutation(
    gql`
      mutation update($id: String!, $completed: Boolean) {
        updateTodo(input: { completed: $completed }, id: $id) {
          title
          completed
        }
      }
    `,
    options
  );
  return [...query];
}

export function DELETE_TODO(options) {
  const query = useMutation(
    gql`
      mutation RemoveTodo($id: String!) {
        deleteTodo(id: $id) {
          title
          completed
        }
      }
    `,
    options
  );
  return [...query];
}
