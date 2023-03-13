import { ResultatType } from '../../pages/sok';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

interface TopicFilterProps {
  data: ResultatType[];
  updateFilter: Function;
  disableGroup: boolean;
}

const TopicFilters = ({ data, updateFilter, disableGroup }: TopicFilterProps) => {
  function handle(val: string[]) {
    updateFilter(val);
  }

  const uniqueTopicsWithCount = data
    .map((rad) => rad.topic)
    .reduce((acc: { [key: string]: number }, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});

  const checkBoxList = Object.keys(uniqueTopicsWithCount).map((key) => (
    <Checkbox key={key} value={key}>
      {key} ({uniqueTopicsWithCount[key]})
    </Checkbox>
  ));

  return (
    <div>
      <CheckboxGroup legend={'Topics'} onChange={(val: string[]) => handle(val)} disabled={disableGroup}>
        {checkBoxList}
      </CheckboxGroup>
    </div>
  );
};

interface FilterProps {
  data: ResultatType[] | undefined;
  updateFilter: Function;
  isLoading: boolean;
}
const Filters = ({ data, updateFilter, isLoading }: FilterProps) => {
  if (!data) {
    return null;
  }
  return (
    <section>
      <p>Antall i response: {data.length}</p>
      <TopicFilters data={data} updateFilter={updateFilter} disableGroup={isLoading} />
    </section>
  );
};

export { Filters };
