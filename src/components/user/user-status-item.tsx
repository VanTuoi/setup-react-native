/* eslint-disable max-lines-per-function */
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useChangeStatusUser, type User } from '@/api';
import { Options, type OptionType } from '@/components/ui/select';

type Props = {
  User: User;
};

const statusColors: Record<User['status'], string> = {
  active: 'bg-green-100',
  block: 'bg-red-100',
  graduated: 'bg-yellow-100',
};

const textColors: Record<User['status'], string> = {
  active: 'text-green-800',
  block: 'text-red-800',
  graduated: 'text-yellow-800',
};

export const UserStatusItem = ({ User }: Props) => {
  const changeStatus = useChangeStatusUser();
  const modalRef = useRef<BottomSheetModal>(null);

  const options: OptionType[] = [
    { label: 'Active', value: 'active' },
    { label: 'Blocked', value: 'block' },
    { label: 'Graduated', value: 'graduated' },
  ];

  const handleSelect = useCallback(
    (option: OptionType) => {
      changeStatus.mutate(
        {
          id: User.id,
          status: option.value as User['status'],
        },
        {
          onSuccess: () => {
            modalRef.current?.dismiss();
            showMessage({
              message: 'Success!',
              description: 'The User status has been updated.',
              type: 'success',
              backgroundColor: '#22c55e',
              color: '#fff',
              icon: 'success',
              duration: 3000,
            });
          },
          onError: () => {
            showMessage({
              message: 'Error!',
              description: 'The User status has not been updated.',
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
    [User.id, changeStatus]
  );

  const statusLabel =
    options.find((o) => o.value === User.status)?.label ?? User.status;

  return (
    <>
      <Pressable
        className={`w-[80px] rounded-md px-3 py-2 ${statusColors[User.status]} flex-row items-center justify-center`}
        onPress={() => modalRef.current?.present()}
        disabled={changeStatus.isPending}
      >
        {changeStatus.isPending ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text className={`text-sm font-semibold ${textColors[User.status]}`}>
            {statusLabel}
          </Text>
        )}
      </Pressable>

      <Options
        ref={modalRef}
        options={options}
        value={User.status}
        onSelect={handleSelect}
        testID={`User-${User.id}-status`}
      />
    </>
  );
};
