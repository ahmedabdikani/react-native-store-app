import React from "react";
import { Fragment } from "react";

interface ListSmallProps<T> {
  data: T[];
  children: ({}: { item: T; index?: number }) => JSX.Element;
}

const ListSmall = <T extends {}>({ children, data }: ListSmallProps<T>) => {
  return (
    <Fragment>{data.map((item, index) => children({ item, index }))}</Fragment>
  );
};

export default ListSmall;
