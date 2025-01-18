import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Personnel, Unit, HandReceipt } from '@/features/personnel/types';

// Memoized base selectors
const selectPersonnel = (state: RootState) => state.personnel.personnel;
const selectUnits = (state: RootState) => state.personnel.units;
const selectHandReceipts = (state: RootState) => state.personnel.handReceipts;
const selectFilters = (state: RootState) => state.personnel.filters;

// Memoized derived selectors
export const selectFilteredPersonnel = createSelector(
  [selectPersonnel, selectFilters],
  (personnel, filters) => {
    return personnel.filter((person) => {
      const matchesUnit = !filters.unit || person.unitId === filters.unit;
      const matchesStatus = !filters.status || person.status === filters.status;
      const matchesSearch = !filters.searchQuery || 
        `${person.firstName} ${person.lastName} ${person.rank}`.toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
      return matchesUnit && matchesStatus && matchesSearch;
    });
  }
);

export const selectPersonnelByUnit = createSelector(
  [selectPersonnel, (_, unitId: string) => unitId],
  (personnel, unitId) => personnel.filter((p) => p.unitId === unitId)
);

export const selectUnitWithPersonnel = createSelector(
  [selectUnits, selectPersonnel, (_, unitId: string) => unitId],
  (units, personnel, unitId) => {
    const unit = units.find((u) => u.id === unitId);
    if (!unit) return null;
    return {
      ...unit,
      personnel: personnel.filter((p) => p.unitId === unitId),
    };
  }
);

export const selectActiveHandReceipts = createSelector(
  [selectHandReceipts],
  (handReceipts) => handReceipts.filter((hr) => hr.status === 'active')
);

// Custom hooks
export const usePersonnel = () => useSelector(selectPersonnel);
export const useFilteredPersonnel = () => useSelector(selectFilteredPersonnel);
export const usePersonnelByUnit = (unitId: string) => 
  useSelector((state: RootState) => selectPersonnelByUnit(state, unitId));
export const useUnits = () => useSelector(selectUnits);
export const useUnitWithPersonnel = (unitId: string) => 
  useSelector((state: RootState) => selectUnitWithPersonnel(state, unitId));
export const useHandReceipts = () => useSelector(selectHandReceipts);
export const useActiveHandReceipts = () => useSelector(selectActiveHandReceipts);

// Type-safe personnel search hook
export const usePersonnelSearch = (searchTerm: string) => {
  return useSelector(createSelector(
    [selectPersonnel],
    (personnel) => personnel.filter((p) => 
      `${p.firstName} ${p.lastName} ${p.rank} ${p.dodId}`.toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  ));
}; 