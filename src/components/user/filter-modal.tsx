import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '../ui';
import { Radio } from '../ui/checkbox';
import { Modal } from '../ui/modal';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';

type Option = { label: string; value: string };

type FilterModalProps = {
  modalRef: React.RefObject<any>;
  defaultField: string;
  defaultOrder: string;
  onApply: (field: string, order: string) => void;
  onReset: () => void;
};

const FILTER_FIELDS: Option[] = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Phone number', value: 'phone' },
];

const SORT_ORDERS: Option[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

export const FilterModal = ({
  modalRef,
  defaultField,
  defaultOrder,
  onApply,
  onReset,
}: FilterModalProps) => {
  const [selectedField, setSelectedField] = useState(defaultField);
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);

  useEffect(() => {
    setSelectedField(defaultField);
    setSelectedOrder(defaultOrder);
  }, [defaultField, defaultOrder]);

  return (
    <Modal ref={modalRef} snapPoints={['45%']}>
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

        <View className="mt-4">
          <Button
            label="Apply"
            className="bg-primary-500"
            onPress={() => onApply(selectedField, selectedOrder)}
          />
          <Button label="Reset Filter" variant="outline" onPress={onReset} />
        </View>
      </BottomSheetKeyboardAwareScrollView>
    </Modal>
  );
};
