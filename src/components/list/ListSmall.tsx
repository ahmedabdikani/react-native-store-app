import React from "react";

interface ListSmallProps<T> {
  data: T[];
  children: ({}: { item: T; index?: number }) => JSX.Element | null;
}

const ListSmall = <T extends {}>({ children, data }: ListSmallProps<T>) => {
  return <>{data.map((item, index) => children({ item, index }))}</>;
};

export default ListSmall;
