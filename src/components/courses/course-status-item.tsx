/* eslint-disable max-lines-per-function */
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { type Course, useChangeStatusCourse } from '@/api';
import { Options, type OptionType } from '@/components/ui/select';

type Props = {
  Course: Course;
};

const statusColors: Record<Course['status'], string> = {
  show: 'bg-green-100 dark:bg-green-900',
  hidden: 'bg-red-100 dark:bg-red-900',
};

const textColors: Record<Course['status'], string> = {
  show: 'text-green-800 dark:text-green-200',
  hidden: 'text-red-800 dark:text-red-200',
};

export const CourseStatusItem = ({ Course }: Props) => {
  const changeStatus = useChangeStatusCourse();
  const modalRef = useRef<BottomSheetModal>(null);

  const options: OptionType[] = [
    { label: 'Show', value: 'show' },
    { label: 'Hidden', value: 'hidden' },
  ];

  const handleSelect = useCallback(
    (option: OptionType) => {
      changeStatus.mutate(
        {
          id: Course.id,
          status: option.value as Course['status'],
        },
        {
          onSuccess: () => {
            modalRef.current?.dismiss();
            showMessage({
              message: 'The Course status has been updated.',
              type: 'success',
              backgroundColor: '#22c55e',
              color: '#fff',
              icon: 'success',
              duration: 3000,
            });
          },
          onError: () => {
            showMessage({
              message: 'The Course status has not been updated.',
              type: 'danger',
              backgroundColor: '#ef4444',
              color: '#fff',
              icon: 'danger',
              duration: 3000,
            });
          },
        }
      );
    },
    [Course.id, changeStatus]
  );

  const statusLabel =
    options.find((o) => o.value === Course.status)?.label ?? Course.status;

  return (
    <>
      <Pressable
        className={`w-[110px] rounded-lg px-3 py-2 ${statusColors[Course.status]} flex-row items-center justify-center`}
        onPress={() => modalRef.current?.present()}
        disabled={changeStatus.isPending}
      >
        {changeStatus.isPending ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text
            className={`text-sm font-semibold ${textColors[Course.status]}`}
          >
            {statusLabel}
          </Text>
        )}
      </Pressable>

      <Options
        ref={modalRef}
        options={options}
        value={Course.status}
        onSelect={handleSelect}
        testID={`Course-${Course.id}-status`}
      />
    </>
  );
};
