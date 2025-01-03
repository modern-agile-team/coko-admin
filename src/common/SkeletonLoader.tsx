import { JSX, useMemo } from 'react';
import { Placeholder } from 'react-bootstrap';

interface SkeletionLoaderProps {
  columnsCount: number;
  rowsCount: number;
}

export default function SkeletonLoader({
  columnsCount,
  rowsCount,
}: SkeletionLoaderProps) {
  const skeletonColumns = useMemo(() => {
    return Array.from({ length: columnsCount }, (_, index) => (
      <Placeholder
        bg="light"
        as={'td'}
        animation="glow"
        key={`column-${index}`}
        size="lg"
        style={{ flex: 1 }}
      >
        <Placeholder
          bg="secondary"
          xs={12}
          style={{ height: '36px', borderRadius: 6 }}
        />
      </Placeholder>
    ));
  }, [columnsCount]);

  const rowSkeletons = useMemo(() => {
    return Array.from({ length: rowsCount }, (_, index) => (
      <tr key={`row-${index}`}>{skeletonColumns}</tr>
    ));
  }, [skeletonColumns, rowsCount]);

  return <>{rowSkeletons}</>;
}
