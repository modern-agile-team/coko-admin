import { JSX, useEffect, useMemo, useState } from 'react';
import { Placeholder } from 'react-bootstrap';

interface SkeletionLoaderProps {
  columnsCount: number;
  rowsCount: number;
}
import './styles.css';
export default function SkeletonLoader({
  columnsCount,
  rowsCount,
}: SkeletionLoaderProps) {
  const columns = useMemo(() => {
    const skeletons: JSX.Element[] = [];
    for (let i = 0; i < columnsCount; i++) {
      skeletons.push(
        <Placeholder
          bg="light"
          as={'td'}
          animation="glow"
          key={`column-${i}`}
          size="lg"
          style={{ flex: 1 }}
        >
          <Placeholder
            bg="secondary"
            xs={12}
            style={{ height: '36px', borderRadius: 6 }}
          />
        </Placeholder>
      );
    }
    return skeletons;
  }, [columnsCount]);

  const rows = useMemo(() => {
    const rowSkeletons: JSX.Element[] = [];
    for (let i = 0; i < rowsCount; i++) {
      rowSkeletons.push(<tr key={`row-${i}`}>{columns}</tr>);
    }
    return rowSkeletons;
  }, [columns, rowsCount]);

  return <>{rows}</>;
}
