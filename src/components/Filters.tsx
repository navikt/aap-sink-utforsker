import { ReactElement } from 'react';
import { ResultatType } from '../../pages/sok';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

interface TopicFilterProps {
  data: ResultatType[];
  updateFilter: Function;
}
const TopicFilters = ({ data, updateFilter }: TopicFilterProps) => {
  function handle(val: string[]) {
    updateFilter(val);
  }
  const arr: ReactElement[] = [];
  new Set(data.map((rad) => rad.topic)).forEach((r) => {
    arr.push(
      <Checkbox type={'checkbox'} key={r} value={r}>
        {r}
      </Checkbox>
    );
  });
  return (
    <div>
      <CheckboxGroup legend={'Topics'} onChange={(val: string[]) => handle(val)}>
        {arr}
      </CheckboxGroup>
    </div>
  );
};

interface FilterProps {
  data: ResultatType[] | undefined;
  updateFilter: Function;
}
const Filters = ({ data, updateFilter }: FilterProps) => {
  if (!data) {
    return null;
  }
  return <TopicFilters data={data} updateFilter={updateFilter} />;
};

export { Filters };
