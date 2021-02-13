import * as React from "react";

interface ISmallListProps<T> {
  data: T[];
  children: (item: T, index?: number) => JSX.Element;
}

const SmallList = <T extends {}>({ children, data }: ISmallListProps<T>) => {
  return (
    <React.Fragment>
      {data.map((item, index) => children(item, index))}
    </React.Fragment>
  );
};

export default SmallList;
