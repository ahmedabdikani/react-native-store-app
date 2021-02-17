import * as React from "react";

interface ListSmallProps<T> {
  data: T[];
  children: ({}: { item: T; index?: number }) => JSX.Element;
}

const ListSmall = <T extends {}>({ children, data }: ListSmallProps<T>) => {
  return (
    <React.Fragment>
      {data.map((item, index) => children({ item, index }))}
    </React.Fragment>
  );
};

export default ListSmall;
