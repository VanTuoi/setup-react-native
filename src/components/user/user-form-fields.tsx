import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import { ControlledInput, ControlledSelect, View } from '@/components/ui';
import { translate } from '@/lib';
import type { FormData } from '@/types';

const genderOptions = [
  { label: translate('new_user.gender.male'), value: 'male' },
  { label: translate('new_user.gender.female'), value: 'female' },
  { label: translate('new_user.gender.other'), value: 'other' },
];

interface UserFormFieldsProps {
  control: Control<FormData>;
  errors?: FieldErrors<FormData>;
  isEdit?: boolean;
  disabled?: boolean;
}

export function UserFormFields({
  control,
  isEdit = false,
}: UserFormFieldsProps) {
  return (
    <View className="space-y-3">
      {isEdit && (
        <ControlledInput
          name="id"
          control={control}
          label={translate('new_user.form.id')}
          disabled={true}
          readOnly={true}
        />
      )}

      <ControlledInput
        name="name"
        control={control}
        label={translate('new_user.form.name')}
      />
      <ControlledInput
        name="email"
        control={control}
        label={translate('new_user.form.email')}
        keyboardType="email-address"
      />
      <ControlledInput
        name="phone"
        control={control}
        label={translate('new_user.form.phone')}
        keyboardType="phone-pad"
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={translate('new_user.form.gender')}
        options={genderOptions}
        placeholder={translate('new_user.form.gender_placeholder')}
      />
    </View>
  );
}
