/* eslint-disable max-lines-per-function */
'use client';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '../ui';
import { Radio } from '../ui/checkbox';
import { Filter } from '../ui/icons';
import { Modal, useModal } from '../ui/modal';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';
import { SearchInput } from '../ui/search-input';

type Props = {};

const FILTER_FIELDS = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Phone number', value: 'phone' },
];

const SORT_ORDERS = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

export const SearchComponent = ({}: Props) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { ref, present, dismiss } = useModal();

  const search = typeof params.search === 'string' ? params.search : '';
  const filterField = typeof params.sortBy === 'string' ? params.sortBy : 'id';
  const order = typeof params.order === 'string' ? params.order : 'asc';

  const [selectedField, setSelectedField] = useState(filterField);
  const [selectedOrder, setSelectedOrder] = useState(order);

  const handleSearchChange = (text: string) => {
    router.setParams({ search: text || '' });
  };

  const handleFilterPress = () => {
    present();
  };

  const applyFilter = () => {
    router.setParams({
      sortBy: selectedField,
      order: selectedOrder,
    });
    dismiss();
  };

  const resetFilter = () => {
    setSelectedField('id');
    setSelectedOrder('asc');

    router.setParams({
      sortBy: 'id',
      order: 'asc',
    });

    dismiss();
  };

  return (
    <>
      <View className="mb-2 flex-row items-center gap-5">
        <View className="flex-1">
          <SearchInput value={search} onChangeText={handleSearchChange} />
        </View>
        <Button
          size="default"
          className="h-12 rounded-3xl border-gray-300"
          variant="outline"
          onPress={handleFilterPress}
        >
          <View className="flex-row items-center gap-1">
            <Filter width={32} height={32} />
            <Text className="text-gray-700">Filter</Text>
          </View>
        </Button>
      </View>

      <Modal ref={ref} snapPoints={['42%']}>
        <BottomSheetKeyboardAwareScrollView className="px-4">
          <Text className="mb-2 text-base font-semibold">Sort by</Text>
          <View className="mb-4 gap-2">
            {FILTER_FIELDS.map((item) => (
              <Radio
                key={item.value}
                label={item.label}
                checked={selectedField === item.value}
                onChange={() => setSelectedField(item.value)}
                accessibilityLabel={item.label}
              />
            ))}
          </View>

          <Text className="mb-2 text-base font-semibold">Order</Text>
          <View className="gap-2">
            {SORT_ORDERS.map((item) => (
              <Radio
                key={item.value}
                label={item.label}
                checked={selectedOrder === item.value}
                onChange={() => setSelectedOrder(item.value)}
                accessibilityLabel={item.label}
              />
            ))}
          </View>

          <View className="mt-2">
            <Button
              label="Apply"
              className="bg-primary-500"
              onPress={applyFilter}
            />
            <Button
              className="no-underline"
              label="Reset Filter"
              variant="ghost"
              onPress={resetFilter}
            />
          </View>
        </BottomSheetKeyboardAwareScrollView>
      </Modal>
    </>
  );
};
